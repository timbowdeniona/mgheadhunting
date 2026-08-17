import React from 'react';
import { SectionDivider } from '../ui/SectionDivider';
import { DifferenceCard } from '../ui/DifferenceCard';
import { Target, UserCheck, ShieldCheck, Compass, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { DifferencePillarFields } from '../../lib/contentful/types';
import { fallbackDifferencePillars } from '../../lib/contentful/api';

export interface DifferenceSectionProps {
  onInitiateSearch: () => void;
  pillars?: DifferencePillarFields[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  target: Target,
  userCheck: UserCheck,
  compass: Compass,
  shieldCheck: ShieldCheck,
};

export const DifferenceSection: React.FC<DifferenceSectionProps> = ({
  onInitiateSearch,
  pillars = fallbackDifferencePillars,
}) => {
  return (
    <section id="difference" className="py-20 lg:py-28 bg-canvas-light border-b border-steel-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Divider */}
        <SectionDivider code="SECTION // 02" label="THE MGH DIFFERENCE" tealAccent align="left" />

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight uppercase">
              Engineered Executive Search vs Recruitment Clichés
            </h2>
            <p className="text-sm sm:text-base text-steel-700 mt-2 max-w-2xl">
              Why CEOs, Private Equity investors, and Board Chairs choose MG Headhunting over generic recruitment agencies.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={onInitiateSearch}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Commission Mandate
          </Button>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(pillars || fallbackDifferencePillars).map((diff, index) => {
            const IconComponent = (diff.iconIdentifier && iconMap[diff.iconIdentifier]) || [Target, UserCheck, Compass, ShieldCheck][index % 4];
            return (
              <DifferenceCard
                key={diff.pillarIndex || diff.title}
                index={diff.pillarIndex}
                title={diff.title}
                highlight={diff.highlight}
                description={diff.description}
                retainedAdvantage={diff.retainedAdvantage}
                contingentFlaw={diff.contingentFlaw}
                icon={IconComponent}
              />
            );
          })}
        </div>

        {/* Comparison Table / Summary Bar */}
        <div className="mt-12 bg-navy-900 text-white p-6 sm:p-8 border border-navy-700 relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-teal-500" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="space-y-1">
              <div className="font-mono text-xs text-teal-400 uppercase tracking-widest">
                THE RETAINED ASSURANCE
              </div>
              <h3 className="font-display text-xl font-bold">
                100% Commitment to Mandate Completion
              </h3>
              <p className="text-xs text-steel-300">
                Unlike transactional agents who drop searches when difficult, MGH guarantees persistence until the exact candidate profile is secured.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 bg-navy-800/80 border border-navy-700">
                <div className="text-teal-300 font-bold mb-1">CANDIDATE QUALITY</div>
                <div className="text-steel-200">
                  Targeted approach to top 5% performers who are not on job boards.
                </div>
              </div>
              <div className="p-3.5 bg-navy-800/80 border border-navy-700">
                <div className="text-teal-300 font-bold mb-1">REPLACEMENT GUARANTEE</div>
                <div className="text-steel-200">
                  Full 12-month candidate replacement warranty on executive placements.
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
