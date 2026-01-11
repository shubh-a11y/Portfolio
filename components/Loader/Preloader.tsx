'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Code2 } from 'lucide-react';

export default function Preloader({ isLoading }: { isLoading: boolean }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isLoading) {
            // Simulate progress if needed, or rely on real loading. 
            // Since we don't have real bytes progress, we'll just confirm it's loading.
            // But for visual effect, let's animate it to 90% and wait for finish.
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) return prev;
                    return prev + Math.random() * 10;
                });
            }, 200);
            return () => clearInterval(interval);
        } else {
            setProgress(100);
        }
    }, [isLoading]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoading ? 1 : 0, pointerEvents: isLoading ? 'auto' : 'none' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
            <div className="flex flex-col items-center gap-6 w-64">
                <div className="relative">
                    <Code2 className="w-16 h-16 text-white" />
                    <motion.div
                        className="absolute inset-0 text-accent blur-lg opacity-50"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Code2 className="w-16 h-16" />
                    </motion.div>
                </div>

                <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-accent"
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                    />
                </div>

                <span className="font-mono text-accent text-sm">
                    {Math.round(progress)}%
                </span>
            </div>
        </motion.div>
    );
}
