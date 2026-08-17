import React, { useState } from 'react';
import { SectionDivider } from '../ui/SectionDivider';
import { MatrixCard } from '../ui/MatrixCard';
import { SectorSpecialismFields } from '../../lib/contentful/types';
import { fallbackSpecialisms } from '../../lib/contentful/api';

export interface SectorMatrixSectionProps {
  onSelectSector: (sectorName: string) => void;
  specialisms?: SectorSpecialismFields[];
}

export const SectorMatrixSection: React.FC<SectorMatrixSectionProps> = ({
  onSelectSector,
  specialisms = fallbackSpecialisms,
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'EXECUTIVE' | 'COMMERCIAL' | 'OPERATIONS' | 'TECHNICAL'>('ALL');

  const filteredSpecialisms = (specialisms || fallbackSpecialisms).filter((item) => {
    if (activeFilter === 'ALL') return true;
    return item.category === activeFilter;
  });

  return (
    <section id="specialisms" className="py-20 lg:py-28 bg-white border-b border-steel-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Divider Header */}
        <SectionDivider code="SECTION // 01" label="SECTOR SPECIALISM MATRIX" tealAccent align="left" />

        {/* Section Title & Positioning */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight uppercase">
              Core Practice Matrix
            </h2>
            <p className="text-sm sm:text-base text-steel-700 mt-2 max-w-2xl">
              Specialized search focused exclusively on executive roles across manufacturing, distribution, and contracting in the Building Products &amp; Construction materials ecosystem.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-steel-100 border border-steel-300">
            {(['ALL', 'EXECUTIVE', 'COMMERCIAL', 'OPERATIONS', 'TECHNICAL'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-[11px] font-mono tracking-wider transition-all select-none uppercase font-semibold ${
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
              code={spec.code}
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
                <span className="w-1.5 h-1.5 bg-teal-600" />
                <span className="font-mono text-xs uppercase tracking-widest text-teal-700 font-bold">
                  Sector Sub-Disciplines Covered
                </span>
              </div>
              <h4 className="font-display text-lg font-bold text-navy-900">
                End-to-End Built Environment Supply Chain
              </h4>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                'Heavy Materials & Aggregates',
                'Curtain Walling & Glazing',
                'Structural Timber & Engineered Wood',
                'Offsite & Modular Manufacturing',
                'HVAC, M&E and Pumps',
                'Drylining, Plaster & Insulation',
                'Builders Merchants & Distribution',
                'Roofing, Waterproofing & Cladding',
              ].map((sub, idx) => (
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
