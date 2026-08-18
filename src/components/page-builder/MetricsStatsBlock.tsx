'use client';

import React from 'react';
import { MetricsStatsBlockData } from '../../lib/contentful/types';
import { Badge } from '../ui/Badge';
import { SectionDivider } from '../ui/SectionDivider';

export interface MetricsStatsBlockProps {
  data: MetricsStatsBlockData;
}

export const MetricsStatsBlock: React.FC<MetricsStatsBlockProps> = ({ data }) => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-steel-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header if title is provided */}
        {(data.title || data.sectionLabel) && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="navy" size="sm">
                {data.sectionLabel || 'PERFORMANCE AUDIT'}
              </Badge>
              <Badge variant="teal" size="sm" dot>
                VERIFIED METRICS
              </Badge>
            </div>

            {data.title && (
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900 uppercase">
                {data.title}
              </h2>
            )}

            {data.subtitle && (
              <p className="text-sm sm:text-base text-steel-600 max-w-3xl mt-2 font-light">
                {data.subtitle}
              </p>
            )}

            <div className="mt-6">
              <SectionDivider align="left" tealAccent />
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(data.stats.length, 4)} gap-6`}>
          {data.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 bg-canvas-light border border-steel-300 relative group hover:border-teal-600 transition-colors"
            >
              {/* Technical corner coordinate */}
              <div className="absolute top-2 right-3 font-mono text-[9px] text-steel-400">
                0{idx + 1} //
              </div>

              {stat.tag && (
                <div className="mb-3">
                  <Badge variant="steel" size="sm">
                    {stat.tag}
                  </Badge>
                </div>
              )}

              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight">
                {stat.value}
              </div>

              <div className="font-display text-xs sm:text-sm font-bold text-navy-900 uppercase tracking-wide mt-2">
                {stat.label}
              </div>

              {stat.description && (
                <p className="text-xs text-steel-600 mt-2 font-light leading-relaxed">
                  {stat.description}
                </p>
              )}

              {/* Bottom hairline accent */}
              <div className="w-8 h-0.5 bg-teal-600 mt-4 group-hover:w-full transition-all duration-300" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
