// components/ui/Tag.tsx
import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'blue' | 'green' | 'purple';
  className?: string;
}

export default function Tag({ children, variant = 'default', className = '' }: TagProps) {
  const baseStyles = 'inline-block px-2 py-1 rounded text-xs font-medium';

  const variantStyles = {
    default: 'bg-white/10 text-white/80 hover:bg-white/20',
    blue: 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30',
    green: 'bg-green-500/20 text-green-400 hover:bg-green-500/30',
    purple: 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className} transition-all duration-200`}>
      {children}
    </span>
  );
}
