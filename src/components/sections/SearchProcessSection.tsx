import React from 'react';
import { SectionDivider } from '../ui/SectionDivider';
import { ProcessStepFields, SearchProcessSectionData } from '../../lib/contentful/types';
import { fallbackProcessSteps } from '../../lib/contentful/api';

export interface SearchProcessSectionProps {
  data?: SearchProcessSectionData;
  steps?: ProcessStepFields[];
}

export const SearchProcessSection: React.FC<SearchProcessSectionProps> = ({
  data,
  steps,
}) => {
  const stepList = steps || data?.steps || fallbackProcessSteps;
  const sectionLabel = data?.sectionLabel || 'Search Methodology';
  const sectionTitle = data?.title || 'The 5-Stage Search Blueprint';
  const sectionDesc = data?.description || 'A disciplined, milestone-driven framework designed to identify, attract, and secure top-tier executive leadership without disruption.';

  return (
    <section id="process" className="py-20 lg:py-28 bg-white border-b border-steel-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionDivider label={sectionLabel} tealAccent align="left" />

        <div className="mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            {sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-steel-700 mt-2 max-w-2xl">
            {sectionDesc}
          </p>
        </div>

        {/* Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {stepList.map((step) => (
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
                  <span className="font-sans text-[11px] text-teal-700 font-medium bg-teal-50 px-1.5 py-0.5 border border-teal-200">
                    {step.timeline}
                  </span>
                </div>

                <div className="text-xs font-sans text-steel-500 font-medium mb-1">
                  {step.phaseName}
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
                <div className="text-xs font-sans text-steel-500 font-medium">Deliverable:</div>
                <div className="text-[11px] font-medium text-navy-900 mt-0.5 leading-tight">
                  {step.deliverable}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
