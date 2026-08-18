import React from 'react';

export interface MonogramProps {
  variant?: 'light' | 'dark' | 'outline' | 'solid-teal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Monogram: React.FC<MonogramProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-2xl',
  };

  const variantMap = {
    dark: 'bg-navy-900 text-white border border-steel-400/30',
    light: 'bg-white text-navy-900 border border-steel-300 shadow-sm',
    outline: 'bg-transparent text-navy-900 border border-steel-300',
    'solid-teal': 'bg-teal-600 text-white border border-teal-600',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center font-display font-bold tracking-widest rounded-none select-none ${sizeMap[size]} ${variantMap[variant]} ${className}`}
    >
      <span>MGH</span>
      {/* Precision Engineered Teal Base Accent */}
      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-600" />
    </div>
  );
};
