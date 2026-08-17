import React from 'react';

export interface SectionDividerProps {
  label?: string;
  code?: string;
  tealAccent?: boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  label,
  code,
  tealAccent = true,
  align = 'left',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center w-full py-4 ${className}`}>
      {/* Left line */}
      <div className="flex-grow flex items-center">
        <div className="h-[1px] w-full bg-steel-300 relative">
          {tealAccent && align === 'left' && (
            <div className="absolute top-0 left-0 w-16 h-[2px] -translate-y-[0.5px] bg-teal-600" />
          )}
        </div>
      </div>

      {/* Center / Aligned Content */}
      {(label || code) && (
        <div className="flex items-center gap-3 px-4 shrink-0">
          {code && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-teal-600 font-semibold bg-steel-100/80 px-2 py-0.5 border border-steel-300/60">
              {code}
            </span>
          )}
          {label && (
            <span className="font-display text-xs uppercase tracking-widest text-steel-700 font-medium">
              {label}
            </span>
          )}
          {tealAccent && align === 'center' && (
            <div className="w-8 h-[2px] bg-teal-600" />
          )}
        </div>
      )}

      {/* Right line */}
      <div className="flex-grow flex items-center">
        <div className="h-[1px] w-full bg-steel-300 relative">
          {tealAccent && align === 'right' && (
            <div className="absolute top-0 right-0 w-16 h-[2px] -translate-y-[0.5px] bg-teal-600" />
          )}
        </div>
      </div>
    </div>
  );
};
