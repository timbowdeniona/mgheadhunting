'use client';

import React from 'react';
import { EditorialRichTextBlockData } from '../../lib/contentful/types';
import { Badge } from '../ui/Badge';
import { SectionDivider } from '../ui/SectionDivider';
import { RichTextRenderer } from '../ui/RichTextRenderer';
import { Quote, CheckCircle2 } from 'lucide-react';

export interface EditorialRichTextBlockProps {
  data: EditorialRichTextBlockData;
}

export const EditorialRichTextBlock: React.FC<EditorialRichTextBlockProps> = ({ data }) => {
  const isSidebar = data.layout === 'sidebar';
  const isTwoCol = data.layout === 'two-column';

  return (
    <section className="py-16 sm:py-20 bg-canvas-light border-b border-steel-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Optional Section Header */}
        {(data.title || data.sectionLabel) && (
          <div className="mb-12">
            {data.sectionLabel && (
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="navy" size="sm">
                  {data.sectionLabel}
                </Badge>
              </div>
            )}

            {data.title && (
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 uppercase">
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

        {/* Layout: Sidebar (Main Body + Sidebar Box) */}
        {isSidebar && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Main Editorial Content */}
            <div className="lg:col-span-8 space-y-6">
              {data.leadParagraph && (
                <p className="font-serif text-lg sm:text-xl text-navy-900 leading-relaxed font-normal border-l-2 border-teal-600 pl-4 py-1 italic">
                  {data.leadParagraph}
                </p>
              )}

              {data.body && (
                <div className="prose-mgh">
                  <RichTextRenderer document={data.body} />
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Quote Callout */}
              {data.quoteCallout && (
                <div className="p-6 bg-navy-900 text-white border border-navy-800 space-y-4">
                  <Quote className="w-8 h-8 text-teal-400 opacity-60" />
                  <blockquote className="font-serif text-base italic leading-relaxed text-steel-200">
                    "{data.quoteCallout.quote}"
                  </blockquote>
                  {(data.quoteCallout.attribution || data.quoteCallout.role) && (
                    <div className="pt-2 border-t border-navy-800 text-xs font-mono">
                      {data.quoteCallout.attribution && (
                        <span className="text-teal-400 block font-bold uppercase">
                          {data.quoteCallout.attribution}
                        </span>
                      )}
                      {data.quoteCallout.role && (
                        <span className="text-steel-400 block">
                          {data.quoteCallout.role}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Key Takeaways Card */}
              {data.keyTakeaways && data.keyTakeaways.length > 0 && (
                <div className="p-6 bg-white border border-steel-300 space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="teal" size="sm" dot>
                      KEY HIGHLIGHTS
                    </Badge>
                  </div>
                  <h4 className="font-display text-sm font-bold uppercase text-navy-900">
                    Executive Focus Areas
                  </h4>
                  <ul className="space-y-3 pt-2 text-xs sm:text-sm text-steel-700">
                    {data.keyTakeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

          </div>
        )}

        {/* Layout: Two Column */}
        {isTwoCol && (
          <div className="space-y-8">
            {data.leadParagraph && (
              <p className="font-serif text-lg sm:text-xl text-navy-900 leading-relaxed font-normal border-l-2 border-teal-600 pl-4 py-1 italic max-w-4xl">
                {data.leadParagraph}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-steel-700 leading-relaxed font-light">
              {data.body && (
                <div className="col-span-2">
                  <RichTextRenderer document={data.body} />
                </div>
              )}
            </div>

            {data.quoteCallout && (
              <div className="p-6 bg-white border border-teal-600 max-w-3xl">
                <Quote className="w-6 h-6 text-teal-600 mb-2" />
                <p className="font-serif text-base sm:text-lg italic text-navy-900">
                  "{data.quoteCallout.quote}"
                </p>
                {data.quoteCallout.attribution && (
                  <p className="text-xs font-mono text-teal-700 mt-2 uppercase">
                    — {data.quoteCallout.attribution}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Layout: Single Standard Column */}
        {!isSidebar && !isTwoCol && (
          <div className="max-w-4xl space-y-6">
            {data.leadParagraph && (
              <p className="font-serif text-lg sm:text-xl text-navy-900 leading-relaxed font-normal border-l-2 border-teal-600 pl-4 py-1 italic">
                {data.leadParagraph}
              </p>
            )}

            {data.body && (
              <div className="prose-mgh">
                <RichTextRenderer document={data.body} />
              </div>
            )}

            {data.quoteCallout && (
              <div className="my-8 p-6 bg-navy-900 text-white border-l-4 border-teal-500">
                <Quote className="w-6 h-6 text-teal-400 mb-2" />
                <blockquote className="font-serif text-lg italic text-steel-200">
                  "{data.quoteCallout.quote}"
                </blockquote>
                {data.quoteCallout.attribution && (
                  <p className="text-xs font-mono text-teal-400 mt-3 uppercase tracking-wider">
                    — {data.quoteCallout.attribution} {data.quoteCallout.role ? `(${data.quoteCallout.role})` : ''}
                  </p>
                )}
              </div>
            )}

            {data.keyTakeaways && data.keyTakeaways.length > 0 && (
              <div className="p-6 bg-white border border-steel-300 space-y-4 my-8">
                <div className="flex items-center gap-2">
                  <Badge variant="teal" size="sm" dot>
                    CORE APPOINTMENT FACTORS
                  </Badge>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-steel-700 pt-2">
                  {data.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
