'use client';
import { motion } from 'framer-motion';

const techGroups = [
    {
        category: "Languages",
        items: ["C++", "JavaScript", "TypeScript", "Python"]
    },
    {
        category: "Web Development",
        items: ["MongoDB", "Express.js", "React", "Node.js", "Next.js," , "Tailwind CSS", "React-Three-Fiber" ]
    },
    {
        category: "Tools & Data",
        items: ["Git", "GitHub", "SQL", "Pandas", "Seaborn", "Google Colab",  ]
    },
    {
        category: "Fundamentals",
        items: ["Data Structures", "OOAD", "Data Communication", "Networking"]
    }
];

export default function TechStack() {
    return (
        <section className="py-24 bg-zinc-950/50">
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-sm font-mono text-accent mb-2">02. THE ARSENAL</h2>
                    <h3 className="text-4xl md:text-5xl font-bold">Tech Stack</h3>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {techGroups.map((group, groupIdx) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <h4 className="text-xl font-bold text-zinc-300 border-b border-zinc-800 pb-2">{group.category}</h4>
                            <div className="flex flex-wrap gap-3">
                                {group.items.map((tech) => (
                                    <div
                                        key={tech}
                                        className="group relative px-4 py-2 bg-zinc-900/50 rounded-lg border border-zinc-800 overflow-hidden hover:border-accent/50 transition-colors"
                                    >
                                        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="relative z-10 text-zinc-400 group-hover:text-white transition-colors font-mono text-sm">
                                            {tech}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
