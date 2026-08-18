'use client';

import React from 'react';
import { PageHeaderBlockData } from '../../lib/contentful/types';
import { Badge } from '../ui/Badge';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface PageHeaderBlockProps {
  data: PageHeaderBlockData;
}

export const PageHeaderBlock: React.FC<PageHeaderBlockProps> = ({ data }) => {
  return (
    <section className="relative bg-navy-900 text-white border-b border-navy-800 pt-16 pb-14 sm:pt-20 sm:pb-16 overflow-hidden">
      {/* Blueprint grid background texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative vertical blueprint lines */}
      <div className="absolute top-0 left-8 sm:left-16 w-px h-full bg-navy-800/80 pointer-events-none" />
      <div className="absolute top-0 right-8 sm:right-16 w-px h-full bg-navy-800/80 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs & Technical Coordinate */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-navy-800">
          {data.breadcrumbs && data.breadcrumbs.length > 0 ? (
            <nav className="flex items-center gap-1.5 text-xs text-steel-400 font-mono">
              <Link href="/" className="hover:text-teal-400 transition-colors">
                HOME
              </Link>
              {data.breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight className="w-3 h-3 text-steel-600" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-teal-400 transition-colors uppercase">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-teal-400 uppercase">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          ) : (
            <div className="flex items-center gap-2">
              <Badge variant="teal" size="sm" dot>
                {data.badge || 'PRACTICE OVERVIEW'}
              </Badge>
            </div>
          )}

          <div className="text-[11px] font-mono text-steel-400 tracking-wider">
            {data.coordinate || 'MGH // EXECUTIVE SPECIFICATION'}
          </div>
        </div>

        {/* Header Content */}
        <div className="max-w-4xl space-y-4">
          {data.overline && (
            <span className="text-xs font-mono tracking-widest text-teal-400 uppercase block">
              {data.overline}
            </span>
          )}

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
            {data.title}
            {data.highlightedPhrase && (
              <span className="block text-teal-400 font-sans normal-case text-2xl sm:text-3xl lg:text-4xl font-normal mt-2">
                {data.highlightedPhrase}
              </span>
            )}
          </h1>

          {data.subtitle && (
            <p className="text-base sm:text-lg text-steel-300 leading-relaxed max-w-3xl pt-2 font-light">
              {data.subtitle}
            </p>
          )}
        </div>

      </div>
    </section>
  );
};
