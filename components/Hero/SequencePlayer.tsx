'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 43;

export default function SequencePlayer({ onLoadComplete, children }: { onLoadComplete?: () => void, children?: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const imagePromises: Promise<void>[] = [];

            for (let i = 0; i < FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const frameIndex = i.toString().padStart(2, '0');
                    img.src = `/webp_sequence/frame_${frameIndex}.webp`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                    img.onerror = () => resolve();
                });
                imagePromises.push(promise);
            }

            await Promise.all(imagePromises);

            const validImages = loadedImages.filter(Boolean);
            setImages(validImages);
            setIsLoading(false);
            onLoadComplete?.();
        };

        loadImages();
    }, [onLoadComplete]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        const render = (index: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            // Use floor/round to get integer frame
            const img = images[Math.round(index)];

            if (canvas && ctx && img) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;

                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        const unsubscribe = frameIndex.on("change", (latest) => {
            if (!isLoading && images.length > 0) {
                render(latest);
            }
        });

        if (!isLoading && images.length > 0) {
            render(frameIndex.get());
        }

        return () => unsubscribe();
    }, [frameIndex, isLoading, images]);

    useEffect(() => {
        const handleResize = () => {
            if (!isLoading && images.length > 0) {
                // Trigger re-render by forcing update or just valid check
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoading, images]);

    return (
        <div ref={containerRef} className="h-[400vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                {children}
            </div>
        </div>
    );
}
