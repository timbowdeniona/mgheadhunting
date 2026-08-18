import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StatCard } from '../ui/StatCard';
import { HeroSectionData } from '../../lib/contentful/types';
import { fallbackHeroData } from '../../lib/contentful/api';

export interface HeroSectionProps {
  data?: HeroSectionData;
  onInitiateSearch: () => void;
  onExploreSpecialisms: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  data = fallbackHeroData,
  onInitiateSearch,
  onExploreSpecialisms,
}) => {
  const hero = data || fallbackHeroData;

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-steel-300 bg-canvas-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Positioning & Headlines */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Architectural Sub-header Pill / Badge */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="navy" size="md">
                {hero.badgeOverline}
              </Badge>
              <Badge variant="teal" size="md" dot>
                {hero.badgeCategory}
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.15]">
              {hero.headline}{' '}
              <span className="text-teal-700 relative inline-block">
                {hero.highlightedPhrase}
                {/* Precision Teal Hairline Underline */}
                <span className="absolute bottom-1 left-0 right-0 h-[2.5px] bg-teal-600" />
              </span>
            </h1>

            {/* Senior Executive Subtitle */}
            <p className="text-base sm:text-lg text-steel-700 leading-relaxed max-w-2xl font-normal">
              {hero.subtitle}
            </p>

            {/* Key Value Micro-pills */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 text-xs font-sans text-navy-900">
              {hero.keyValues.map((val, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>{val}</span>
                </div>
              ))}
            </div>

            {/* Call to Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Button
                variant="primary"
                size="lg"
                onClick={onInitiateSearch}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {hero.ctaPrimaryText}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onExploreSpecialisms}
              >
                {hero.ctaSecondaryText}
              </Button>
            </div>

            {/* Regulatory & Client Endorsement Indicator */}
            <div className="pt-4 flex items-center gap-3 text-xs text-steel-600 border-t border-steel-200">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="leading-tight">
                {hero.complianceNotice}
              </span>
            </div>
          </div>

          {/* Right Column: Architectural Photography Frame & Live Search Metrics */}
          <div className="lg:col-span-5 relative">
            
            {/* Outer Frame */}
            <div className="relative bg-white border border-steel-300 p-3 sm:p-4 shadow-sm">
              
              {/* Architectural Image Placeholder Frame */}
              <div className="relative bg-navy-900 text-white overflow-hidden aspect-[4/3] flex flex-col justify-center p-8 border border-navy-800">
                
                {/* Center Visual Content */}
                <div className="relative z-10 text-center">
                  <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                    {hero.partnerName}
                  </div>
                  <div className="text-sm font-sans tracking-wide text-teal-300 mb-4 font-medium">
                    {hero.partnerTitle}
                  </div>
                  <p className="text-sm text-steel-300 leading-relaxed font-sans max-w-sm mx-auto">
                    {hero.partnerBio}
                  </p>
                </div>

              </div>

              {/* Live Metric Overlay Bar */}
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-steel-200">
                <div className="bg-canvas-light p-3 border border-steel-200">
                  <div className="text-xl font-display font-bold text-navy-900">
                    {hero.metricPlacements}
                  </div>
                  <div className="text-[11px] font-sans text-steel-600">
                    Executive Placements
                  </div>
                </div>
                <div className="bg-canvas-light p-3 border border-steel-200">
                  <div className="text-xl font-display font-bold text-teal-700">
                    {hero.metricTenure}
                  </div>
                  <div className="text-[11px] font-sans text-steel-600">
                    Sector Tenure
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
