'use client';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

const certs = [

    {
        title: "HackerRank Problem Solving",
        img: "/Certificate_Images/HackerRank_ProblemSolving.png",
        pdf: "/certificates/HackerRank_problem_solving_intermediate certificate.pdf"
    },
    {
        title: "MERN Stack Development",
        img: "/Certificate_Images/GFG_Internship.png",
        pdf: "/certificates/MERN_Internship_Certificate.pdf"
    },
    {
        title: "Full Stack Development",
        img: "/Certificate_Images/Full_Stack.png",
        pdf: "/certificates/Full-Stack-Development.pdf"
    },
    {
        title: "Oracle Cloud Infrastructure",
        img: "/Certificate_Images/Oracle.png",
        pdf: "/certificates/OracleCertficate.pdf"
    },
    {
        title: "Frontend Development",
        img: "/Certificate_Images/Frontend-Developer.png",
        pdf: "/certificates/FrontEnd_Developer.pdf"
    },
    {
        title: "Backend Development",
        img: "/Certificate_Images/Backend-Development.png",
        pdf: "/certificates/Backend-Development.pdf"
    },
    {
        title: "React Specialist",
        img: "/Certificate_Images/React.png",
        pdf: "/certificates/React.pdf"
    },
    {
        title: "Delloite Virtual Internship",
        img: "/Certificate_Images/Delloite.png",
        pdf: "/certificates/Delloite_Virtual_Intership.pdf"
    },
    {
        title: "C++ Programming",
        img: "/Certificate_Images/C++.png",
        pdf: "/certificates/C++ Certficate.pdf"
    }
    
];

export default function Certifications() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="certifications" className="py-24 bg-black relative">
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-12 flex items-end justify-between"
                >
                    <div>
                        <h2 className="text-sm font-mono text-accent mb-2">03. CREDENTIALS</h2>
                        <h3 className="text-4xl md:text-5xl font-bold">Certifications</h3>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => scroll('left')} className="p-2 border border-zinc-800 rounded-full hover:bg-zinc-900 text-white transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button onClick={() => scroll('right')} className="p-2 border border-zinc-800 rounded-full hover:bg-zinc-900 text-white transition-colors">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </motion.div>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-8 pb-12 scrollbar-hide snap-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {certs.map((cert, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="min-w-[300px] md:min-w-[400px] snap-start"
                        >
                            <div className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                                <img src={cert.img} alt={cert.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <a
                                        href={cert.pdf}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full font-medium hover:bg-accent/80 transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" /> View Certificate
                                    </a>
                                </div>
                            </div>
                            <h4 className="mt-4 text-xl font-bold">{cert.title}</h4>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
