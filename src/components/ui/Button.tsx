import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'blueprint';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-display font-semibold transition-all duration-150 relative select-none disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-xs';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[11px] gap-1.5',
    md: 'px-5 py-2.5 text-xs gap-2',
    lg: 'px-7 py-3.5 text-sm gap-2.5',
  };

  const variantStyles = {
    // Medium Teal (#138D90) CTA - Directional Focus
    primary: 'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 border border-teal-600 rounded-none shadow-none hover:shadow-[0_2px_8px_rgba(19,141,144,0.3)]',
    
    // Deep Navy (#163A5F) Solid - Executive Seniority
    secondary: 'bg-navy-800 text-white hover:bg-navy-900 active:bg-navy-950 border border-navy-800 rounded-none shadow-none',
    
    // Concrete / Steel Grey (#D0D4D6) Hairline Outline
    outline: 'bg-transparent text-navy-900 hover:text-teal-600 border border-steel-300 hover:border-teal-600 hover:bg-teal-50/40 rounded-none',
    
    // Ghost / Muted
    ghost: 'bg-transparent text-navy-800 hover:text-teal-600 hover:bg-steel-100/60 border border-transparent rounded-none',
    
    // Blueprint Engineered Button with architectural corner accents
    blueprint: 'bg-navy-900 text-white hover:bg-navy-800 border border-steel-400/40 rounded-none relative after:absolute after:bottom-0 after:right-0 after:w-2 after:h-2 after:border-b after:border-r after:border-teal-400',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0 transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
};
