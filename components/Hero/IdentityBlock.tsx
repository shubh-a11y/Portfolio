// IdentityBlock.tsx

'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function IdentityBlock() {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const y = useTransform(scrollY, [0, 400], [0, -100]);

    // Stagger animation for initial reveal
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.5
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            style={{ opacity, y }}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 z-10 pointer-events-none"
        >
            <div className="max-w-5xl space-y-4 md:space-y-6">
                <motion.p variants={itemVariants} className="text-accent text-lg md:text-xl font-medium tracking-wide">
                    Hey, welcome to the world of
                </motion.p>

                <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.9]">
                    SHUBHANG<br />SINGH
                </motion.h1>

                <motion.nav variants={itemVariants} className="flex flex-wrap gap-4 md:gap-12 text-sm md:text-base text-gray-400 font-mono mt-8 md:mt-12 pointer-events-auto">
                    {[
                        { id: '01', name: 'Home', href: '#' },
                        { id: '02', name: 'About Me', href: '#about-me' },
                        { id: '03', name: 'Certifications', href: '#certifications' },
                        { id: '04', name: 'My Projects', href: '#my-projects' }
                    ].map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            className="group flex items-center gap-2 hover:text-white transition-colors"
                        >
                            <span className="text-accent group-hover:text-accent/80 transition-colors">#{item.id}</span>
                            <span className="border-b border-transparent group-hover:border-accent pb-0.5 transition-all">{item.name}</span>
                        </a>
                    ))}
                </motion.nav>
            </div>
        </motion.div>
    );
}
