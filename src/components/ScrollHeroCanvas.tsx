import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SequenceMeta {
    frameCount: number;
    filePrefix: string;
    fileExtension: string;
    startFrame: number;
    digits: number;
}

export default function ScrollHeroCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const frameIndex = useRef({ value: 0 });

    // Load Metadata and Images
    useEffect(() => {
        const loadSequence = async () => {
            try {
                const response = await fetch('/sequence/meta.json');
                const meta: SequenceMeta = await response.json();

                const loadedImages: HTMLImageElement[] = [];
                let loadedCount = 0;

                const updateProgress = () => {
                    loadedCount++;
                    if (loadedCount === meta.frameCount) {
                        setImages(loadedImages);
                        setIsLoaded(true);
                    }
                };

                for (let i = 0; i < meta.frameCount; i++) {
                    const img = new Image();
                    const frameNum = (meta.startFrame + i).toString().padStart(meta.digits, '0');
                    img.src = `/sequence/${meta.filePrefix}${frameNum}.${meta.fileExtension}`;
                    img.onload = updateProgress;
                    img.onerror = updateProgress; // Handle missing frames gracefully
                    loadedImages.push(img);
                }
            } catch (error) {
                console.error("Failed to load sequence metadata", error);
            }
        };

        loadSequence();
    }, []);

    // GSAP Animation
    useGSAP(() => {
        if (!isLoaded || images.length === 0 || !containerRef.current) return;

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: `+=${images.length * 25}`, // Adjusted scroll length factor for better feel
                scrub: 0.5, // Smooth scrubbing
                pin: true,
                anticipatePin: 1,
            },
        });

        timeline.to(frameIndex.current, {
            value: images.length - 1,
            snap: 'value',
            ease: 'none',
            onUpdate: () => {
                // Force re-render of canvas on frame update
                renderFrame();
            },
        });

    }, { scope: containerRef, dependencies: [isLoaded, images] });

    // Canvas Rendering
    const renderFrame = () => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // High quality scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const img = images[Math.round(frameIndex.current.value)];
        if (!img) return;

        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Calculate Aspect Ratio "Cover" Logic (Fill Screen)
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;

        let drawWidth, drawHeight, offsetX, offsetY;

        // If canvas is wider than image, fit width (crop top/bottom)
        if (canvasRatio > imgRatio) {
            drawWidth = width;
            drawHeight = width / imgRatio;
            offsetX = 0;
            offsetY = (height - drawHeight) / 2;
        } else {
            // If canvas is taller than image, fit height (crop left/right)
            // This usually happens on MOBILE (Portrait) displaying LANDSCAPE image
            drawHeight = height;
            drawWidth = height * imgRatio;

            // Offset calculation:
            // (width - drawWidth) is a negative number representing the total overflow.
            // * 0.5 centers it. 
            // * 0.0 aligns to left edge (shows left side of image).
            // * 1.0 aligns to right edge (shows right side of image).
            // The subject is on the Right/Center-Right.
            // We use 0.75 to shift the view towards the right side.
            offsetX = (width - drawWidth) * 0.75;

            offsetY = 0;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Resize Handler
    useEffect(() => {
        const handleResize = () => {
            if (!canvasRef.current) return;

            const canvas = canvasRef.current;
            // Use devicePixelRatio for sharpness
            const dpr = window.devicePixelRatio || 1;

            // Mobile-safe viewport dimensions
            const clientWidth = document.documentElement.clientWidth;
            const clientHeight = window.innerHeight; // Better for mobile than documentElement.clientHeight in some cases

            canvas.width = clientWidth * dpr;
            canvas.height = clientHeight * dpr;

            const ctx = canvas.getContext('2d');
            if (ctx) ctx.scale(dpr, dpr);

            canvas.style.width = '100%';
            canvas.style.height = '100%';

            // Re-render immediately on resize
            renderFrame();
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, [images]);

    // Initial draw when loaded
    useEffect(() => {
        if (isLoaded) renderFrame();
    }, [isLoaded]);


    return (
        <div ref={containerRef} className="relative w-full bg-black overflow-hidden" style={{ minHeight: '100svh' }}>
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-white z-10">
                    Loading Cinematic Experience...
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover"
            />
            {/* Scroll indicator or overlay can go here */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
                Scroll to Explore
            </div>
        </div>
    );
}
