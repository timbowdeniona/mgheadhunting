import React from 'react';

export interface DifferenceCardProps {
  title: string;
  highlight: string;
  description: string;
  retainedAdvantage: string;
  contingentFlaw: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export const DifferenceCard: React.FC<DifferenceCardProps> = ({
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
      className={`relative bg-white border border-steel-300 p-6 sm:p-8 flex flex-col justify-between hover:border-navy-700 transition-all duration-200 rounded-sm group ${className}`}
    >
      {/* Top Hairline accent */}
      <div className="absolute top-0 left-0 w-8 h-[2px] bg-teal-600" />

      <div>
        {/* Header with icon */}
        <div className="flex items-center justify-end mb-6">
          {Icon && (
            <div className="w-8 h-8 flex items-center justify-center bg-steel-50 border border-steel-200">
              <Icon className="w-4 h-4 text-navy-700" />
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-navy-900 mb-1 tracking-tight">
          {title}
        </h3>
        <p className="font-sans text-sm text-teal-700 font-medium mb-3">
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
          <span className="font-sans text-[11px] font-semibold px-1.5 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 shrink-0 mt-0.5">
            MGH Standard
          </span>
          <span className="text-navy-900 font-medium leading-tight">
            {retainedAdvantage}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-sans text-[11px] font-semibold px-1.5 py-0.5 bg-steel-100 text-steel-500 border border-steel-300 shrink-0 mt-0.5">
            Industry Norm
          </span>
          <span className="text-steel-500 leading-tight">
            {contingentFlaw}
          </span>
        </div>
      </div>
    </div>
  );
};
