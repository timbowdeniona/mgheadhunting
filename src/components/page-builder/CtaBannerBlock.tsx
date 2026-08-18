'use client';

import React from 'react';
import { CtaBannerBlockData } from '../../lib/contentful/types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import Link from 'next/link';

export interface CtaBannerBlockProps {
  data: CtaBannerBlockData;
  onInitiateSearch: () => void;
}

export const CtaBannerBlock: React.FC<CtaBannerBlockProps> = ({
  data,
  onInitiateSearch,
}) => {
  const isNavy = data.variant === 'navy' || data.variant === 'dark' || !data.variant;
  const isBlueprint = data.variant === 'blueprint';

  return (
    <section
      className={`relative py-16 sm:py-20 border-b overflow-hidden ${
        isNavy
          ? 'bg-navy-900 text-white border-navy-800'
          : isBlueprint
          ? 'bg-teal-900 text-white border-teal-800'
          : 'bg-white text-navy-900 border-steel-300'
      }`}
    >
      {/* Blueprint grid texture for dark/navy/blueprint variants */}
      {(isNavy || isBlueprint) && (
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
          }}
        />
      )}

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Overline & Tag */}
        <div className="flex items-center justify-center gap-2">
          <Badge
            variant={isNavy || isBlueprint ? 'teal' : 'navy'}
            size="sm"
            dot
          >
            {data.overline || 'CONFIDENTIAL EXECUTIVE MANDATES'}
          </Badge>
        </div>

        {/* Title */}
        <h2
          className={`font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight ${
            isNavy || isBlueprint ? 'text-white' : 'text-navy-900'
          }`}
        >
          {data.title}
        </h2>

        {/* Description */}
        <p
          className={`text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed ${
            isNavy || isBlueprint ? 'text-steel-300' : 'text-steel-600'
          }`}
        >
          {data.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {data.primaryCtaAction === 'link' && data.primaryCtaHref ? (
            <Link href={data.primaryCtaHref}>
              <Button
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {data.primaryCtaText || 'Initiate Mandate'}
              </Button>
            </Link>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={onInitiateSearch}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {data.primaryCtaText || 'Initiate Search Mandate'}
            </Button>
          )}

          {data.secondaryCtaText && data.secondaryCtaHref && (
            <Link href={data.secondaryCtaHref}>
              <Button
                variant={isNavy || isBlueprint ? 'outline' : 'secondary'}
                size="md"
              >
                {data.secondaryCtaText}
              </Button>
            </Link>
          )}
        </div>

        {/* Guarantee Notice */}
        {data.guaranteeNotice && (
          <div className="flex items-center justify-center gap-2 pt-2 text-xs font-mono text-steel-400">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>{data.guaranteeNotice}</span>
          </div>
        )}

      </div>
    </section>
  );
};
