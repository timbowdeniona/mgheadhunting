import React from 'react';
import { SectionDivider } from '../ui/SectionDivider';
import { ProcessStepFields } from '../../lib/contentful/types';
import { fallbackProcessSteps } from '../../lib/contentful/api';

export interface SearchProcessSectionProps {
  steps?: ProcessStepFields[];
}

export const SearchProcessSection: React.FC<SearchProcessSectionProps> = ({
  steps = fallbackProcessSteps,
}) => {
  return (
    <section id="process" className="py-20 lg:py-28 bg-white border-b border-steel-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionDivider code="SECTION // 03" label="SEARCH METHODOLOGY" tealAccent align="left" />

        <div className="mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight uppercase">
            The 5-Stage Search Blueprint
          </h2>
          <p className="text-sm sm:text-base text-steel-700 mt-2 max-w-2xl">
            A disciplined, milestone-driven framework designed to identify, attract, and secure top-tier executive leadership without disruption.
          </p>
        </div>

        {/* Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {(steps || fallbackProcessSteps).map((step) => (
            <div
              key={step.stepNumber || step.title}
              className="relative bg-canvas-light border border-steel-300 p-5 flex flex-col justify-between hover:border-teal-600 transition-all duration-150 group"
            >
              {/* Top Accent Step Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-steel-300 group-hover:bg-teal-600 transition-colors" />

              <div>
                {/* Step number and phase */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-2xl font-bold text-navy-900 group-hover:text-teal-700">
                    {step.stepNumber}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-teal-700 font-bold bg-teal-50 px-1.5 py-0.5 border border-teal-200">
                    {step.timeline}
                  </span>
                </div>

                <div className="text-[10px] font-mono uppercase tracking-widest text-steel-500 font-semibold mb-1">
                  PHASE // {step.phaseName}
                </div>

                <h3 className="font-display text-base font-bold text-navy-900 mb-2 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs text-steel-700 leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              {/* Deliverable badge */}
              <div className="pt-3 border-t border-steel-200">
                <div className="text-[10px] font-mono text-steel-500 uppercase">Deliverable:</div>
                <div className="text-[11px] font-medium text-navy-900 mt-0.5 leading-tight">
                  {step.deliverable}
                </div>
              </div>

              {/* Blueprint corner */}
              <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-steel-400 group-hover:border-teal-600 transition-colors" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
