"use client";
import { useState, useRef, useEffect, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function ChatInterface() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hello! Ask me anything about Shubhang's skills, projects, poetries or experience." }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false); // New state for locking input during typing
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  // Scroll whenever messages change (including during typing effect)
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- THE HACKER TYPING ENGINE ---
  const typeOutResponse = async (fullText: string) => {
    setIsTyping(true);
    setIsLoading(false); // Stop the "Thinking" loader immediately

    // 1. Add an empty AI message to start filling
    setMessages((prev) => [...prev, { role: "ai", content: "" }]);

    // 2. Loop through characters
    for (let i = 0; i < fullText.length; i++) {
      // Speed control: 15-20ms is the "sweet spot" for reading speed
      await new Promise((resolve) => setTimeout(resolve, 25));

      setMessages((prev) => {
        const newMessages = [...prev];
        // Target the last message (which is our AI message)
        const lastMsgIndex = newMessages.length - 1;
        // Update its content safely
        newMessages[lastMsgIndex] = {
            ...newMessages[lastMsgIndex],
            content: fullText.substring(0, i + 1)
        };
        return newMessages;
      });
    }

    setIsTyping(false);
  };

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return; // Prevent sending while typing

    const userMessage = input;
    // Add User Message immediately
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      
      // Instead of setting text directly, trigger the Hacker Effect
      const responseText = data.text || "Sorry, I couldn't process that.";
      await typeOutResponse(responseText);

    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", content: "Error: Connection lost. Please try again." }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-full w-full flex flex-col bg-linear-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-800 px-6 py-4 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-lg border border-accent/20">
            <Bot className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-mono text-sm text-accent tracking-wider">Shubhang&apos;s AI Voice</h3>
            <p className="text-xs text-zinc-500 font-mono">Status: Online • RAG Active</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent" 
        ref={scrollAreaRef}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${
                msg.role === "user" 
                  ? "bg-accent/10 border-accent/20" 
                  : "bg-zinc-800 border-zinc-700"
              }`}>
                {msg.role === "user" ? (
                  <User className="w-4 h-4 text-accent" />
                ) : (
                  <Bot className="w-4 h-4 text-zinc-400" />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[85%] px-4 py-3 rounded-xl ${
                msg.role === "user"
                  ? "bg-accent/10 border border-accent/20 text-white"
                  : "bg-zinc-800/50 border border-zinc-700 text-zinc-300"
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap font-mono">
                  {msg.content}
                  
                  {/* BLINKING CURSOR LOGIC */}
                  {msg.role === "ai" && isTyping && index === messages.length - 1 && (
                    <span className="inline-block w-2 h-4 bg-accent ml-1 align-middle animate-pulse"/>
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading State (Thinking) */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
              <Bot className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="bg-zinc-800/50 border border-zinc-700 px-4 py-3 rounded-xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-sm p-4">
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            placeholder={isTyping ? "AI is typing..." : "Initialize query sequence..."}
            disabled={isLoading || isTyping}
            className="flex-1 bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 px-4 py-3 rounded-lg outline-none focus:border-accent/50 focus:bg-zinc-800 transition-all font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || isTyping}
            className="bg-accent hover:bg-accent/80 disabled:bg-zinc-700 disabled:cursor-not-allowed text-black font-bold px-5 py-3 rounded-lg transition-all flex items-center gap-2 group"
          >
            <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>
        <div className="flex justify-between items-center mt-2">
            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">System Secure</p>
            <p className="text-[10px] text-zinc-600 font-mono">Pinecone x Gemini</p>
        </div>
      </div>
    </div>
  );
}