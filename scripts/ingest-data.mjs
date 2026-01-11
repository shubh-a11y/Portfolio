
import fs from "fs";
import path from "path";
import { createRequire } from "module";
import dotenv from "dotenv";

// AI & DB Imports (These are working fine)
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { TaskType } from "@google/generative-ai";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// Robust way to import 'pdf-parse' in ES modules
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse") 

dotenv.config({ path: '.env' });

// --- CUSTOM LOADER FUNCTION (Bypasses broken imports) ---
async function loadMyDocuments(dirPath) {
  const files = fs.readdirSync(dirPath);
  const docs = [];

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const ext = path.extname(file).toLowerCase();
    
    console.log(`reading ${file}...`);

    if (ext === ".txt" || ext === ".md") {
      // Read Text Files
      const content = fs.readFileSync(fullPath, "utf-8");
      docs.push(new Document({
        pageContent: content,
        metadata: { source: file }
      }));
    } else if (ext === ".pdf") {
      // Read PDF Files
      const dataBuffer = fs.readFileSync(fullPath);
      const pdfData = await pdf(dataBuffer);
      docs.push(new Document({
        pageContent: pdfData.text,
        metadata: { source: file }
      }));
    }
  }
  return docs;
}

async function ingestData() {
  console.log("🚀 Starting Manual Ingestion...");

  if (!process.env.PINECONE_API_KEY || !process.env.GOOGLE_API_KEY) {
    throw new Error("Missing API Keys");
  }

  // 1. Load Files Manually
  const dataPath = path.join(process.cwd(), "data");
  
  try {
    const rawDocs = await loadMyDocuments(dataPath);
    console.log(`📄 Loaded ${rawDocs.length} documents.`);

    // 2. Split (Standard Splitter)
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const docs = await splitter.splitDocuments(rawDocs);
    console.log(`🧩 Split into ${docs.length} chunks.`);

    // 3. Upload to Pinecone
    const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    const index = pinecone.Index(process.env.PINECONE_INDEX);

    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "text-embedding-004",
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      apiKey: process.env.GOOGLE_API_KEY,
    });

    console.log("💾 Uploading to Pinecone...");
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
    });

    console.log("✅ Success! Your brain is uploaded.");

  } catch (error) {
    console.error("❌ Error:", error);
  }
}

ingestData();

