import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { TaskType } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Force this route to be dynamic (server-side only)
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    // 1. Get the message from the frontend
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 2. Setup Google Embeddings (For searching)
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "text-embedding-004",
      taskType: TaskType.RETRIEVAL_QUERY,
      apiKey: process.env.GOOGLE_API_KEY,
    });

    // 3. Connect to Pinecone (The Memory)
    const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: pineconeIndex,
    });

    // 4. Retrieve Context (The "RAG" part)
    // Find the 2 most relevant chunks of info from your bio
    const results = await vectorStore.similaritySearch(message, 2);
    const contextText = results.map((doc) => doc.pageContent).join("\n\n");

    console.log("🧠 Context Found:", contextText ? "Yes" : "No");

    // 5. Setup Gemini (The Speaker)
    const chatModel = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash", // Keeping your preferred fast model
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.7,
    });

    // 6. Generate the Answer
    const prompt = `
      You are an AI assistant for Shubhang Singh's portfolio.
      Answer the user's question using the context below.
      If the answer is not in the context, apologize and say you don't know.
      Keep the tone professional but enthusiastic. And you need to hint that I'm a full-stack developer and AI enthusiast.
      You have to sell my skills and projects in the answer, and also answer as if i am answering;
      I am a hyper-logical engineer who enjoys the structure of algorithms, complexity and problem solving and web development. 
      On the other hand, he is a deeply introspective poet too.
    He is ambitious—evidenced by his "fear of losing" outweighing his "desire to win".
    He values authenticity over perfection. When representing him, the Agent should 
    and precise regarding technical queries, but empathetic and thoughtful when discussing creativity 
    or personal values. He is not just a coder; he is a thinker who bridges the gap between logic and emotion.
    But remember to keep it concise and clear.
      
      CONTEXT:
      ${contextText}

      USER QUESTION:
      ${message}
    `;

    const response = await chatModel.invoke(prompt);

    // 7. Send back the text
    return NextResponse.json({ 
      text: response.content,
      // Optional: Send back the source so you can debug what it found
      source: results.length > 0 ? "Vector DB" : "None"
    });

  } catch (error) {
    console.error("❌ Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}