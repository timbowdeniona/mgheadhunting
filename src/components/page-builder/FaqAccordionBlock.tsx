'use client';

import React, { useState } from 'react';
import { FaqAccordionBlockData } from '../../lib/contentful/types';
import { Badge } from '../ui/Badge';
import { SectionDivider } from '../ui/SectionDivider';
import { ChevronDown, Plus, Minus } from 'lucide-react';

export interface FaqAccordionBlockProps {
  data: FaqAccordionBlockData;
}

export const FaqAccordionBlock: React.FC<FaqAccordionBlockProps> = ({ data }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-20 bg-canvas-light border-b border-steel-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="navy" size="sm">
              {data.sectionLabel || 'PRACTICE PROTOCOL'}
            </Badge>
            <Badge variant="teal" size="sm" dot>
              FAQ &amp; ADVISORY
            </Badge>
          </div>
          
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 uppercase">
            {data.title || 'Frequently Asked Questions'}
          </h2>
          
          {data.description && (
            <p className="text-sm sm:text-base text-steel-600 max-w-3xl mt-3 font-light leading-relaxed">
              {data.description}
            </p>
          )}

          <div className="mt-6">
            <SectionDivider align="left" tealAccent />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {data.items.map((item, idx) => {
            const isOpen = openIndices.includes(idx);

            return (
              <div
                key={idx}
                className={`border transition-all duration-200 bg-white ${
                  isOpen
                    ? 'border-teal-600 shadow-sm'
                    : 'border-steel-300 hover:border-steel-400'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none"
                >
                  <div className="space-y-1">
                    {item.category && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-teal-700 block">
                        {item.category}
                      </span>
                    )}
                    <span className="font-display text-base sm:text-lg font-bold text-navy-900 block uppercase">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`mt-1 w-6 h-6 flex items-center justify-center border shrink-0 transition-colors ${
                      isOpen
                        ? 'border-teal-600 bg-teal-50 text-teal-700'
                        : 'border-steel-300 text-steel-500'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-steel-700 leading-relaxed border-t border-steel-100 pt-4 font-light">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
