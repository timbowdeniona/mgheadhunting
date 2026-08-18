import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'steel' | 'navy' | 'teal' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'steel',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center font-sans font-medium tracking-wide transition-colors rounded-none select-none';
  
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5 leading-none',
    md: 'text-xs px-2.5 py-1 gap-2 leading-none',
  };

  const variantStyles = {
    // Concrete / Steel Grey Secondary Badge
    steel: 'bg-steel-100 text-steel-700 border border-steel-300',
    
    // Deep Navy Executive Authority Badge
    navy: 'bg-navy-900 text-white border border-navy-700',
    
    // Medium Teal Active / Indicator Badge
    teal: 'bg-teal-50 text-teal-800 border border-teal-200',
    
    // Minimal Outline
    outline: 'bg-transparent text-navy-800 border border-steel-300',
  };

  const dotColors = {
    steel: 'bg-steel-500',
    navy: 'bg-teal-400',
    teal: 'bg-teal-600',
    outline: 'bg-teal-600',
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />
      )}
      <span>{children}</span>
    </span>
  );
};
