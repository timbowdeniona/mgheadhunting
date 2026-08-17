import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface MatrixCardProps {
  code: string;
  title: string;
  subtitle?: string;
  description: string;
  sampleRoles: string[];
  keyClients?: string;
  onClick?: () => void;
  className?: string;
}

export const MatrixCard: React.FC<MatrixCardProps> = ({
  code,
  title,
  subtitle,
  description,
  sampleRoles,
  keyClients,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative bg-white border border-steel-300 p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-steel-500 hover:bg-canvas-light cursor-pointer rounded-none ${className}`}
    >
      {/* Top Hairline Active Indicator */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-teal-600 transition-colors" />

      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-steel-200">
          <span className="font-mono text-[10px] tracking-widest text-teal-600 font-semibold uppercase bg-teal-50 px-2 py-0.5 border border-teal-200">
            {code}
          </span>
          <div className="flex items-center gap-1.5 text-steel-500 group-hover:text-teal-600 transition-colors">
            <span className="text-[10px] font-mono tracking-wider uppercase font-medium">Practice Spec</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-3">
          <h3 className="font-display text-lg sm:text-xl font-bold text-navy-900 group-hover:text-navy-800 tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs font-display uppercase tracking-wider text-teal-700 font-semibold mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-steel-700 leading-relaxed mb-5">
          {description}
        </p>

        {/* Sample Placements / Roles */}
        <div className="space-y-2 pt-4 border-t border-steel-200/80">
          <span className="text-[10px] font-mono uppercase tracking-widest text-steel-500 font-semibold block">
            Executive Appointments:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleRoles.map((role, idx) => (
              <span
                key={idx}
                className="text-[11px] font-sans bg-steel-100 text-navy-900 px-2 py-1 border border-steel-300/80 rounded-none group-hover:border-steel-400/80 transition-colors"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      {keyClients && (
        <div className="mt-5 pt-3 border-t border-dashed border-steel-300 flex items-center justify-between text-[11px] text-steel-600">
          <span className="font-mono text-[10px] uppercase text-steel-500">Market Coverage</span>
          <span className="font-medium">{keyClients}</span>
        </div>
      )}

      {/* Blueprint corner crosshair */}
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-r border-b border-steel-300 group-hover:border-teal-600 transition-colors" />
    </div>
  );
};
