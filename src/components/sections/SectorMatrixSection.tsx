import React, { useState } from 'react';
import { SectionDivider } from '../ui/SectionDivider';
import { MatrixCard } from '../ui/MatrixCard';
import { SectorSpecialismFields, SectorMatrixSectionData } from '../../lib/contentful/types';
import { fallbackSpecialisms, fallbackSubDisciplines } from '../../lib/contentful/fallbacks';

export interface SectorMatrixSectionProps {
  data?: SectorMatrixSectionData;
  specialisms?: SectorSpecialismFields[];
  onSelectSector: (sectorName: string) => void;
}

export const SectorMatrixSection: React.FC<SectorMatrixSectionProps> = ({
  data,
  specialisms,
  onSelectSector,
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'EXECUTIVE' | 'COMMERCIAL' | 'OPERATIONS' | 'TECHNICAL'>('ALL');

  const specialismList = specialisms || data?.specialisms || fallbackSpecialisms;
  const sectionLabel = data?.sectionLabel || 'Sector Specialism Matrix';
  const sectionTitle = data?.title || 'Core Practice Matrix';
  const sectionDesc = data?.description || 'Specialized search focused exclusively on executive roles across manufacturing, distribution, and contracting in the Building Products & Construction materials ecosystem.';
  const subDisciplines = data?.subDisciplines || fallbackSubDisciplines;

  const filteredSpecialisms = specialismList.filter((item) => {
    if (activeFilter === 'ALL') return true;
    return item.category === activeFilter;
  });

  return (
    <section id="specialisms" className="py-20 lg:py-28 bg-white border-b border-steel-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Divider Header */}
        <SectionDivider label={sectionLabel} tealAccent align="left" />

        {/* Section Title & Positioning */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              {sectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-steel-700 mt-2 max-w-2xl">
              {sectionDesc}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-steel-100 border border-steel-300">
            {(['ALL', 'EXECUTIVE', 'COMMERCIAL', 'OPERATIONS', 'TECHNICAL'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-xs font-sans tracking-wider transition-all select-none uppercase font-medium ${
                  activeFilter === filter
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-steel-700 hover:text-navy-900 hover:bg-steel-200/60'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecialisms.map((spec) => (
            <MatrixCard
              key={spec.code || spec.title}
              title={spec.title}
              subtitle={spec.subtitle}
              description={spec.description}
              sampleRoles={spec.sampleRoles}
              keyClients={spec.keyClients}
              onClick={() => onSelectSector(spec.title)}
            />
          ))}
        </div>

        {/* Sub-Sector Blueprints Strip */}
        <div className="mt-12 p-6 sm:p-8 bg-canvas-light border border-steel-300 relative">
          <div className="absolute top-0 left-0 w-8 h-[2px] bg-teal-600" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs uppercase tracking-widest text-teal-700 font-bold">
                  Sector Sub-Disciplines Covered
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-navy-900">
                End-to-End Built Environment Supply Chain
              </h4>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-sans">
              {subDisciplines.map((sub, idx) => (
                <span
                  key={idx}
                  className="bg-white border border-steel-300 text-navy-900 px-3 py-1.5 hover:border-teal-600 transition-colors"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
