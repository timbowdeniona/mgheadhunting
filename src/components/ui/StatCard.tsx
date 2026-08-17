import React from 'react';

export interface StatCardProps {
  value: string;
  label: string;
  sublabel?: string;
  code?: string;
  trend?: string;
  isDark?: boolean;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  sublabel,
  code,
  trend,
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
      {/* Top Hairline Indicator */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-teal-600 transition-colors" />

      {/* Header index / coordinate */}
      <div className="flex items-center justify-between mb-4">
        {code ? (
          <span className="font-mono text-[10px] uppercase tracking-widest text-teal-600 font-semibold">
            {code}
          </span>
        ) : (
          <span className="w-1.5 h-1.5 bg-teal-600 rounded-none" />
        )}
        {trend && (
          <span
            className={`text-[11px] font-mono font-medium px-1.5 py-0.5 ${
              isDark ? 'bg-navy-800 text-teal-300' : 'bg-steel-100 text-teal-800'
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      {/* Main Metric Value */}
      <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-2">
        <span className={isDark ? 'text-white' : 'text-navy-900'}>{value}</span>
      </div>

      {/* Label and Sublabel */}
      <div className="space-y-1">
        <div
          className={`text-xs font-display uppercase tracking-wider font-semibold ${
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

      {/* Subtle corner architectural tick */}
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-teal-600/40" />
    </div>
  );
};
