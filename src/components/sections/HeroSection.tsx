import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, CheckCircle2, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StatCard } from '../ui/StatCard';
import { HeroSectionData } from '../../lib/contentful/types';
import { fallbackHeroData } from '../../lib/contentful/fallbacks';
import { trackCtaClick, trackDirectContact } from '../../lib/analytics';

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
                onClick={() => {
                  trackCtaClick(hero.ctaPrimaryText || 'Start the Conversation', 'hero_primary');
                  onInitiateSearch();
                }}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {hero.ctaPrimaryText || 'Start the Conversation'}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  trackCtaClick(hero.ctaSecondaryText, 'hero_secondary');
                  onExploreSpecialisms();
                }}
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

          {/* Right Column: Personalised Executive Portrait Card & Live Search Metrics */}
          <div className="lg:col-span-5 relative">
            
            {/* Outer Card */}
            <div className="relative bg-white border border-steel-300 p-3 sm:p-4 shadow-md">
              
              {/* Suited Portrait Frame */}
              <div className="relative bg-navy-950 text-white overflow-hidden aspect-[16/11] flex flex-col justify-end border border-navy-800 group">
                <Image
                  src="/mark-goldsmith-suited.jpg"
                  alt="Mark Goldsmith - Lead Search Partner"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top group-hover:scale-102 transition-transform duration-500 ease-out"
                />
                
                {/* Subtle vignette gradient for text clarity */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent pointer-events-none" />

                {/* Bottom Overlay Info */}
                <div className="relative z-10 p-4 sm:p-5">
                  <div className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white mb-0.5">
                    {hero.partnerName || 'Mark Goldsmith'}
                  </div>
                  <div className="text-xs font-sans tracking-wide text-teal-300 font-medium">
                    {hero.partnerTitle || 'Managing Director & Lead Search Partner'}
                  </div>
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-steel-700 leading-relaxed font-sans pt-3 px-1">
                {hero.partnerBio}
              </p>

              {/* Contact Strip: Mobile + LinkedIn */}
              <div className="mt-3 pt-3 border-t border-steel-200 flex items-center justify-between gap-3 text-xs font-sans">
                <a
                  href="tel:07570740490"
                  onClick={() => trackDirectContact('phone', '07570 740490', 'hero_partner_card')}
                  className="inline-flex items-center gap-2 text-navy-900 hover:text-teal-700 font-semibold transition-colors group"
                  title="Direct Mobile"
                >
                  <span className="w-6 h-6 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <Phone className="w-3 h-3" />
                  </span>
                  <span>07570 740490</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/markgoldsmith2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackDirectContact('linkedin', 'https://www.linkedin.com/in/markgoldsmith2/', 'hero_partner_card')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-steel-100 hover:bg-teal-600 text-steel-700 hover:text-white border border-steel-300 hover:border-teal-600 transition-colors text-xs font-medium"
                  aria-label="Mark Goldsmith LinkedIn Profile"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>

              {/* Live Metric Overlay Bar */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-steel-200">
                <div className="bg-canvas-light p-2.5 sm:p-3 border border-steel-200">
                  <div className="text-lg sm:text-xl font-display font-bold text-navy-900">
                    {hero.metricPlacements}
                  </div>
                  <div className="text-[11px] font-sans text-steel-600">
                    Executive Placements
                  </div>
                </div>
                <div className="bg-canvas-light p-2.5 sm:p-3 border border-steel-200">
                  <div className="text-lg sm:text-xl font-display font-bold text-teal-700">
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
