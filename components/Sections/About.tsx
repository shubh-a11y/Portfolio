'use client';

import { motion } from 'framer-motion';
import { Code, Server, Zap, Book } from 'lucide-react';
import ChatInterface from './ChatInterface';

export default function About() {
    const highlights = [
        {
            title: 'Problem Solver',
            desc: '1700+ DSA and competitive programming problems solved across LeetCode, Codeforces, CodeChef, and GeeksforGeeks.',
            icon: <Zap className="w-5 h-5 text-accent" />
        },
        {
            title: 'AI & Full-Stack Builder',
            desc: 'Building production-oriented AI systems with React, Node.js, LangChain, LangGraph, microservices, RAG, and modern cloud infrastructure.',
            icon: <Server className="w-5 h-5 text-accent" />
        },
        {
            title: 'Academic Achiever',
            desc: 'Computer Science Engineering student at IIIT Naya Raipur with a 9.64/10 CGPA.',
            icon: <Book className="w-5 h-5 text-accent" />
        },
        {
            title: 'Creative Mind',
            desc: 'A part-time poet exploring the intersection of technology, systems, and human emotion.',
            icon: <Code className="w-5 h-5 text-accent" />
        }
    ];

    return (
        <section
            id="about-me"
            className="py-24 md:py-32 bg-black text-white relative overflow-hidden"
        >
            {/* Background Grid or Noise */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">

                {/* Left: AI Chat Interface */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden"
                >
                    <ChatInterface />
                </motion.div>

                {/* Right: Content */}
                <div className="space-y-8">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-sm font-mono text-accent mb-2">
                            01. ABOUT ME
                        </h2>

                        <h3 className="text-4xl md:text-5xl font-bold mb-6">
                            Engineering Systems, Not Just Code
                        </h3>

                        <p className="text-zinc-400 leading-relaxed text-lg">
                            A Computer Science Engineering student passionate about
                            problem-solving, AI systems, and full-stack engineering.
                            I enjoy turning complex ideas into practical systems —
                            from competitive programming and distributed architectures
                            to multi-agent AI platforms and secure, data-sovereign
                            applications.
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        {highlights.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: idx * 0.1
                                }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-900/50 transition-colors border border-transparent hover:border-zinc-800"
                            >
                                <div className="mt-1 p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                                    {item.icon}
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg">
                                        {item.title}
                                    </h4>

                                    <p className="text-sm text-zinc-500 mt-1">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}