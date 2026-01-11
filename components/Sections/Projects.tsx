'use client';
import { motion } from 'framer-motion';
import { Github, Play, ExternalLink } from 'lucide-react';

const projects = [
    {
        title: "ChainCred",
        desc: "A blockchain-based trust verification system using smart contracts.",
        img: "/ProjectImages/Chaincred_image.jpeg",
        tech: ["Solidity", "Next.js", "Ethereum"],
        links: {
            demo: "#", // Add live link if known
            code: "https://github.com/shubh-a11y/ChainCred", // Placeholder or from prompt if available
            video: "https://www.youtube.com/watch?v=w7jUP6GIWoc"
        }
    },
    {
        title: "Lumen",
        desc: "Advanced data visualization dashboard for distributed systems.",
        img: "/ProjectImages/Lumen_image.jpeg",
        tech: ["Next JS", "MongoDB", "Node.js"],
        links: {
            demo: "#",
            code: "#",
            video: "https://www.youtube.com/watch?v=fte-gQ27nQc"
        }
    },
    {
        title: "Medcare",
        desc: "Comprehensive healthcare management platform with patient tracking.",
        img: "/ProjectImages/Medcare_image.jpeg",
        tech: ["MERN Stack"],
        links: {
            demo: "#",
            code: "https://github.com/shubh-a11y/Hospital-Management",
            video: "https://www.youtube.com/watch?v=H08UPDzBQUk"
        }
    }
];

export default function Projects() {
    return (
        <section id="my-projects" className="py-24 bg-zinc-950">
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-sm font-mono text-accent mb-2">04. PORTFOLIO</h2>
                    <h3 className="text-4xl md:text-5xl font-bold">Selected Projects</h3>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-accent/50 transition-all hover:shadow-[0_0_30px_rgba(255,107,0,0.1)]"
                        >
                            <div className="aspect-video overflow-hidden">
                                <img src={project.img} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />

                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    {project.links.code && (
                                        <a href={project.links.code} target="_blank" rel="noopener" className="p-3 bg-zinc-800 rounded-full text-white hover:bg-accent hover:text-white transition-colors" title="View Code">
                                            <Github className="w-5 h-5" />
                                        </a>
                                    )}
                                    {project.links.video && (
                                        <a href={project.links.video} target="_blank" rel="noopener" className="p-3 bg-zinc-800 rounded-full text-white hover:bg-accent hover:text-white transition-colors" title="Watch Demo">
                                            <Play className="w-5 h-5" />
                                        </a>
                                    )}
                                    {project.links.demo && (
                                        <a href={project.links.demo} target="_blank" rel="noopener" className="p-3 bg-zinc-800 rounded-full text-white hover:bg-accent hover:text-white transition-colors" title="Live Demo">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="p-6">
                                <h4 className="text-2xl font-bold mb-2">{project.title}</h4>
                                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{project.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map(t => (
                                        <span key={t} className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
