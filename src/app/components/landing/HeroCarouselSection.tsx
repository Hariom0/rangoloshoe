"use client"
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ShoppingBag, Sparkles, Percent } from "lucide-react";

type SlideItem = {
    id: number;
    type: "video" | "image";
    src: string;
    badge: string;
    badgeIcon: React.ReactNode;
    titleFirstLine: string;
    titleSecondLine: string;
    subtitle: string;
    actionUrl: string;
    discountText?: string;
    theme: "dark" | "light";
};

export const HeroCarouselSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const slides: SlideItem[] = [
        {
            id: 1,
            type: "video",
            src: "/images/crocs.mp4", // Crocs Video Asset
            badge: "Street Comfort",
            badgeIcon: <Sparkles className="w-3 h-3" />,
            titleFirstLine: "The Crocs",
            titleSecondLine: "Evolution",
            subtitle: "Redefining utility footwear. Ultra-lightweight contours with bold statement silhouettes.",
            actionUrl: "/collections?category=Crocs",
            discountText: "Bestseller",
            theme: "dark"
        },
        {
            id: 2,
            type: "video",
            src: "/images/slides.mp4", // Slides Video Asset
            badge: "Limited Release",
            badgeIcon: <Sparkles className="w-3 h-3" />,
            titleFirstLine: "Fresh Style",
            titleSecondLine: "Premium Slides",
            subtitle: "Earthy tonal palettes mixed with pure molded ergonomics. Architectural minimalism for your feet.",
            actionUrl: "/collections?category=Slides",
            discountText: "Live Offer",
            theme: "light"
        },
        {
            id: 3,
            type: "image",
            src: "/images/sneaker.png", // High contrast premium running shoe asset matching your banner reference layout
            badge: "New Men's Collection",
            badgeIcon: <Percent className="w-3 h-3" />,
            titleFirstLine: "High-Performance",
            titleSecondLine: "Running Shoes",
            subtitle: "Engineered for daily resilience and casual styling. Available in premium contrast colorways.",
            actionUrl: "/collections?category=Sports",
            discountText: "40% OFF",
            theme: "dark"
        }
    ];

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const handleNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        if (!isAutoplayPaused) {
            resetTimeout();
            timeoutRef.current = setTimeout(handleNextSlide, 6000); // Smooth 6-second rotation interval
        }
        return () => resetTimeout();
    }, [currentIndex, isAutoplayPaused]);

    return (
        <section 
            className="relative w-full h-[78vh] sm:h-[85vh] md:h-[90vh] bg-neutral-950 overflow-hidden select-none"
            onMouseEnter={() => setIsAutoplayPaused(true)}
            onMouseLeave={() => setIsAutoplayPaused(false)}
        >
            {/* Infinite Horizontal Carousel Track */}
            <div 
                className="w-full h-full flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="w-full h-full shrink-0 relative flex flex-col justify-end">
                        
                        {/* Media Container Layer (Optimized for 9:16 viewport crops) */}
                        <div className="absolute inset-0 w-full h-full bg-neutral-900 z-0">
                            {slide.type === "video" ? (
                                <video 
                                    className="w-full h-full object-cover object-center pointer-events-none transform scale-[1.01]"
                                    src={slide.src}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                            ) : (
                                <div className="relative w-full h-full">
                                    {/* Abstract High-Contrast Angular Split Overlay (Matches Shopify Banner reference asset) */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/40 via-rose-500/30 to-black/10 z-10 mix-blend-multiply" />
                                    <img 
                                        className="w-full h-full object-cover object-center pointer-events-none"
                                        src={slide.src}
                                        alt={slide.titleSecondLine}
                                        loading="eager"
                                    />
                                </div>
                            )}
                            {/* Premium Cinematic Vignette Overlay gradient protection */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 z-10" />
                        </div>

                        {/* Interactive Banner Copy Content */}
                        <div className="relative z-20 w-full mx-auto max-w-7xl px-4 sm:px-6 md:px-10 pb-14 sm:pb-20 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div className="max-w-xl space-y-3 sm:space-y-4">
                                
                                {/* Header Pill Label */}
                                <div className="inline-flex items-center gap-1.5 mx-auto md:mx-0 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest animate-fade-in">
                                    {slide.badgeIcon}
                                    <span>{slide.badge}</span>
                                </div>

                                {/* Dynamic Headline Text Layer */}
                                <div className="space-y-1">
                                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-none italic font-headline">
                                        {slide.titleFirstLine} <br />
                                        <span className="text-primary bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                                            {slide.titleSecondLine}
                                        </span>
                                    </h2>
                                </div>

                                {/* Paragraph Copy Block */}
                                <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed max-w-md mx-auto md:mx-0">
                                    {slide.subtitle}
                                </p>
                            </div>

                            {/* Call to Action Trigger Blocks */}
                            <div className="flex flex-col items-center md:items-end shrink-0 gap-3">
                                {slide.discountText && (
                                    <div className="hidden sm:flex items-center justify-center bg-rose-600 text-white text-xs font-black uppercase px-4 py-1.5 rounded-xl rotate-3 shadow-lg border border-rose-500 tracking-wider">
                                        {slide.discountText}
                                    </div>
                                )}
                                <a 
                                    href={slide.actionUrl} 
                                    className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto min-w-[200px] bg-white text-neutral-950 font-bold px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <ShoppingBag className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                                    <span className="uppercase text-xs tracking-wider">Shop Collection</span>
                                </a>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {/* Desktop Fine Navigation Controller Handles */}
            <button 
                onClick={handlePrevSlide}
                className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-neutral-900/50 backdrop-blur-md border border-white/10 text-white transition-all hover:bg-white hover:text-neutral-950 hover:scale-110 active:scale-95"
                aria-label="Previous Slide Layout"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
                onClick={handleNextSlide}
                className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-neutral-900/50 backdrop-blur-md border border-white/10 text-white transition-all hover:bg-white hover:text-neutral-950 hover:scale-110 active:scale-95"
                aria-label="Next Slide Layout"
            >
                <ArrowRight className="w-5 h-5" />
            </button>

            {/* Premium Micro-Indicator Navigation Strip */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className="group relative h-1 rounded-full overflow-hidden bg-white/20 transition-all duration-300"
                        style={{ width: currentIndex === index ? "2.5rem" : "0.75rem" }}
                        aria-label={`Jump to catalog item frame ${index + 1}`}
                    >
                        {currentIndex === index && (
                            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-400 to-rose-500 animate-carousel-progress origin-left h-full w-full" />
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
};