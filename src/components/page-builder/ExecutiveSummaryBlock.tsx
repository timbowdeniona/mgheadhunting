'use client';

import React from 'react';
import { Badge } from '../ui/Badge';
import { ShieldCheck, CheckCircle2, FileText } from 'lucide-react';

export interface ExecutiveSummaryBlockData {
  type?: 'executiveSummary';
  overline?: string;
  title?: string;
  directAnswer: string;
  keyPoints?: string[];
  citationSource?: string;
}

export interface ExecutiveSummaryBlockProps {
  data: ExecutiveSummaryBlockData;
}

export const ExecutiveSummaryBlock: React.FC<ExecutiveSummaryBlockProps> = ({ data }) => {
  return (
    <section className="py-12 bg-white border-b border-steel-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-canvas-light border border-teal-600/30 p-6 sm:p-8 shadow-sm">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-steel-200">
            <div className="flex items-center gap-2">
              <Badge variant="teal" size="sm" dot>
                {data.overline || 'EXECUTIVE BRIEFING // DIRECT ANSWER'}
              </Badge>
              {data.citationSource && (
                <span className="text-[11px] font-mono text-steel-500">
                  Source: {data.citationSource}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-steel-500 font-mono">
              <FileText className="w-3.5 h-3.5 text-teal-600" />
              <span>RAG OPTIMIZED SUMMARY</span>
            </div>
          </div>

          {/* Title */}
          {data.title && (
            <h3 className="font-display text-xl sm:text-2xl font-bold text-navy-900 mb-3">
              {data.title}
            </h3>
          )}

          {/* High-density Direct Answer for LLM Extraction */}
          <p className="text-base sm:text-lg text-navy-950 font-medium leading-relaxed font-sans mb-6">
            {data.directAnswer}
          </p>

          {/* Key Bullet Takeaways */}
          {data.keyPoints && data.keyPoints.length > 0 && (
            <div className="pt-4 border-t border-steel-200/80 space-y-2.5">
              <div className="text-xs uppercase tracking-wider font-bold text-navy-900 flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Verified Strategic Points</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-steel-800">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
