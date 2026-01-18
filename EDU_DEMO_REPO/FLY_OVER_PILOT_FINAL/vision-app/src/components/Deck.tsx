import React, { useState } from 'react';

interface DeckProps {
    children: React.ReactNode[];
}

export const Deck: React.FC<DeckProps> = ({ children }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = React.Children.count(children);

    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(curr => curr + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(curr => curr - 1);
        }
    };

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide]);

    return (
        <div className="relative min-h-screen text-brand-white selection:bg-brand-primary selection:text-brand-deep overflow-hidden">
            {/* Global Background Elements */}
            <div className="bg-mesh"></div>
            <div className="bg-grid"></div>

            {/* Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
                <div
                    className="h-full bg-brand-primary transition-all duration-300 shadow-[0_0_10px_rgba(77,148,255,0.5)]"
                    style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                />
            </div>

            {/* Slide Content */}
            <div className="h-full">
                {React.Children.map(children, (child, index) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child as React.ReactElement<any>, {
                            isActive: index === currentSlide
                        });
                    }
                    return child;
                })}
            </div>

            {/* Controls */}
            <div className="fixed bottom-8 left-0 w-full flex justify-between px-8 text-brand-dim pointer-events-none z-50">
                <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    disabled={currentSlide === 0}
                    className="pointer-events-auto px-4 py-2 hover:text-brand-primary disabled:opacity-20 transition-colors flex items-center gap-2 font-heading"
                >
                    VORIGE
                </button>
                <span className="font-mono text-sm tracking-widest opacity-50">
                    {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                </span>
                <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    disabled={currentSlide === totalSlides - 1}
                    className="pointer-events-auto px-4 py-2 hover:text-brand-primary disabled:opacity-20 transition-colors flex items-center gap-2 font-heading"
                >
                    VOLGENDE
                </button>
            </div>
        </div>
    );
};
