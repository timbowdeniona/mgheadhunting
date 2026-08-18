import React from 'react';

export interface StatCardProps {
  value: string;
  label: string;
  sublabel?: string;
  isDark?: boolean;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  sublabel,
  isDark = false,
  className = '',
}) => {
  return (
    <div
      className={`relative p-6 transition-all duration-200 border ${
        isDark
          ? 'bg-navy-900 border-navy-700 text-white hover:border-teal-500/50'
          : 'bg-white border-steel-300 text-navy-900 hover:border-steel-400'
      } rounded-none ${className}`}
    >
      {/* Main Metric Value */}
      <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-2">
        <span className={isDark ? 'text-white' : 'text-navy-900'}>{value}</span>
      </div>

      {/* Label and Sublabel */}
      <div className="space-y-1">
        <div
          className={`text-xs font-sans tracking-wide font-medium ${
            isDark ? 'text-steel-200' : 'text-steel-700'
          }`}
        >
          {label}
        </div>
        {sublabel && (
          <p
            className={`text-xs leading-relaxed ${
              isDark ? 'text-steel-400' : 'text-steel-500'
            }`}
          >
            {sublabel}
          </p>
        )}
      </div>
    </div>
  );
};
