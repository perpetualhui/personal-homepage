// components/ui/SectionTitle.tsx
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ title, subtitle, className = '' }: SectionTitleProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-white/60">
          {subtitle}
        </p>
      )}
    </div>
  );
}
