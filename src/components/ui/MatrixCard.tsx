import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface MatrixCardProps {
  title: string;
  subtitle?: string;
  description: string;
  sampleRoles: string[];
  keyClients?: string;
  onClick?: () => void;
  className?: string;
}

export const MatrixCard: React.FC<MatrixCardProps> = ({
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
      className={`group relative bg-white border border-steel-300 p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-steel-400 hover:bg-canvas-light cursor-pointer rounded-sm ${className}`}
    >
      <div>

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
          <span className="text-xs font-sans text-steel-500 font-medium block">
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
          <span className="font-sans text-xs text-steel-500">Market Coverage</span>
          <span className="font-medium">{keyClients}</span>
        </div>
      )}
    </div>
  );
};
