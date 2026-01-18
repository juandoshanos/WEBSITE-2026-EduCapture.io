import React from 'react';

interface SlideProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    isActive?: boolean;
}

export const Slide: React.FC<SlideProps> = ({ title, subtitle, children, isActive = false }) => {
    if (!isActive) return null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 animate-fade-in relative z-10">
            <div className="max-w-5xl w-full">
                <div className="glass-card p-12 md:p-16">
                    <div className="mb-12 border-l-4 border-brand-primary pl-6">
                        {subtitle && (
                            <div className="text-brand-primary font-bold tracking-wider uppercase text-sm mb-2 font-heading">
                                {subtitle}
                            </div>
                        )}
                        <h1 className="text-4xl md:text-5xl font-bold text-white font-heading leading-tight">
                            {title}
                        </h1>
                    </div>

                    <div className="text-lg md:text-xl leading-relaxed space-y-6 text-brand-dim font-light">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
