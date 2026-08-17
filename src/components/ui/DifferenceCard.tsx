import React from 'react';

export interface DifferenceCardProps {
  index: string;
  title: string;
  highlight: string;
  description: string;
  retainedAdvantage: string;
  contingentFlaw: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export const DifferenceCard: React.FC<DifferenceCardProps> = ({
  index,
  title,
  highlight,
  description,
  retainedAdvantage,
  contingentFlaw,
  icon: Icon,
  className = '',
}) => {
  return (
    <div
      className={`relative bg-white border border-steel-300 p-6 sm:p-8 flex flex-col justify-between hover:border-navy-700 transition-all duration-200 rounded-none group ${className}`}
    >
      {/* Top Hairline accent */}
      <div className="absolute top-0 left-0 w-12 h-[2px] bg-teal-600" />

      <div>
        {/* Header with index and icon */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs text-teal-600 font-bold tracking-widest bg-steel-100 px-2 py-0.5 border border-steel-300">
            {index}
          </span>
          {Icon && (
            <div className="w-8 h-8 flex items-center justify-center bg-navy-50 text-navy-800 border border-steel-200">
              <Icon className="w-4 h-4 text-teal-600" />
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-navy-900 mb-1 tracking-tight">
          {title}
        </h3>
        <p className="text-xs font-display uppercase tracking-wider text-teal-700 font-semibold mb-3">
          {highlight}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-steel-700 leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Comparison Grid: Retained Rigor vs Contingent Recruitment */}
      <div className="pt-4 border-t border-steel-200 space-y-2.5 text-xs">
        <div className="flex items-start gap-2">
          <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 shrink-0 mt-0.5 font-bold">
            MGH Standard
          </span>
          <span className="text-navy-900 font-medium leading-tight">
            {retainedAdvantage}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-steel-100 text-steel-500 border border-steel-300 shrink-0 mt-0.5 font-bold">
            Industry Norm
          </span>
          <span className="text-steel-500 leading-tight">
            {contingentFlaw}
          </span>
        </div>
      </div>

      {/* Bottom corner architectural detail */}
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-steel-400 group-hover:border-navy-900 transition-colors" />
    </div>
  );
};
