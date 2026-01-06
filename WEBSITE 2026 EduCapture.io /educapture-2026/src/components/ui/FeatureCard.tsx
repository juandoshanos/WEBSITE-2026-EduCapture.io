import React from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col items-start h-full group">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 text-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-primary-dark mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
