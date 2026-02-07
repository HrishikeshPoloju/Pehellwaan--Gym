import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollHeroCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const text1Ref = useRef<HTMLHeadingElement>(null);
    const text2Ref = useRef<HTMLAnchorElement>(null);

    // Parallax effect (Desktop) & Text Animation
    useGSAP(() => {
        if (!videoRef.current || !containerRef.current) return;

        // Reset state
        gsap.set([text1Ref.current, text2Ref.current], { opacity: 0, pointerEvents: 'none' });

        // Timeline with infinite loop and 3s delay between loops
        const tl = gsap.timeline({
            delay: 0.5,
            repeat: -1,
            repeatDelay: 3
        });

        // Sequence 1: "UNLEASH THE PEHELWAAN IN YOU"
        if (text1Ref.current) {
            tl.to(text1Ref.current, {
                opacity: 1,
                scale: 1.1,
                duration: 2,
                ease: "power2.out",
                filter: "blur(0px)",
                onStart: () => gsap.set(text1Ref.current, { filter: "blur(10px)", scale: 0.9 })
            })
                .to(text1Ref.current, {
                    opacity: 0,
                    scale: 1.2,
                    filter: "blur(10px)",
                    duration: 1,
                    ease: "power2.in"
                }, "+=0.5"); // Hold for 0.5s
        }

        // Sequence 2: "JOIN NOW"
        if (text2Ref.current) {
            tl.fromTo(text2Ref.current,
                { y: 50, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "back.out(1.7)", // Impact effect
                    pointerEvents: 'auto'
                }
            )
                // Continuous breathing glow effect (Simulated via timeline to allow clean exit)
                .to(text2Ref.current, {
                    textShadow: "0 0 20px rgba(255, 165, 0, 0.8), 0 0 40px rgba(255, 69, 0, 0.6)",
                    duration: 1.5,
                    yoyo: true,
                    repeat: 1, // Repeat blink a couple of times before loop ends
                    ease: "sine.inOut"
                }, "-=0.5")
                // Fade out at end to reset loop
                .to(text2Ref.current, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    pointerEvents: 'none'
                }, "+=0.5");
        }

        // Parallax Logic
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            gsap.to(videoRef.current, {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full min-h-[100svh] overflow-hidden bg-black font-sans">
            <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
                src="/videos/veo-studio-creation.mp4"
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />

            {/* Cinematic Text Layer */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-20 pointer-events-none">

                {/* Text 1 - Lighter weight, slightly reduced opacity */}
                <h1
                    ref={text1Ref}
                    className="absolute text-3xl md:text-5xl lg:text-7xl font-bold text-center text-white/90 uppercase tracking-wider leading-tight"
                    style={{ textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}
                >
                    Unleash The <span className="text-orange-400">Pehelwaan</span><br />In You
                </h1>

                {/* Text 2 - CTA */}
                <a
                    href="#categories" // Assuming this links to categories/membership
                    ref={text2Ref}
                    className="absolute text-4xl md:text-6xl lg:text-8xl font-bold text-center text-white/95 uppercase tracking-tighter leading-none cursor-pointer hover:scale-105 transition-transform duration-300 pointer-events-auto"
                    style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                >
                    Join Now
                </a>
            </div>

            {/* Existing Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce z-10 font-light tracking-widest text-sm uppercase">
                Scroll to Explore
            </div>
        </div>
    );
}
