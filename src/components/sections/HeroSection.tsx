import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StatCard } from '../ui/StatCard';

export interface HeroSectionProps {
  onInitiateSearch: () => void;
  onExploreSpecialisms: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onInitiateSearch,
  onExploreSpecialisms,
}) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-steel-300 bg-canvas-light">
      {/* Engineered Blueprint Background Grid */}
      <div className="absolute inset-0 bg-blueprint pointer-events-none opacity-60" />

      {/* Decorative Technical Coordinates / Elevation Markers */}
      <div className="absolute top-24 left-6 hidden xl:block font-mono text-[10px] text-steel-500 uppercase tracking-widest leading-relaxed">
        <div>LOC // UK & EUROPE</div>
        <div>SPEC // BUILDING PRODUCTS</div>
        <div>METHOD // 100% RETAINED SEARCH</div>
      </div>

      <div className="absolute top-24 right-6 hidden xl:block font-mono text-[10px] text-steel-500 uppercase tracking-widest text-right leading-relaxed">
        <div>ELEV // C-SUITE & BOARD</div>
        <div>STATUS // PARTNER-LED</div>
        <div>COORDINATE // 51.5074° N, 0.1278° W</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Positioning & Headlines */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Architectural Sub-header Pill / Badge */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="navy" size="md">
                RETAINED EXECUTIVE SEARCH
              </Badge>
              <Badge variant="teal" size="md" dot>
                BUILDING PRODUCTS & CONSTRUCTION
              </Badge>
            </div>

            {/* Main Headline with wide geometric tracking */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.15] uppercase">
              Board, Managing Director &amp; C-Suite Appointments for the{' '}
              <span className="text-teal-700 relative inline-block">
                Built Environment
                {/* Precision Teal Hairline Underline */}
                <span className="absolute bottom-1 left-0 right-0 h-[2.5px] bg-teal-600" />
              </span>
            </h1>

            {/* Senior Executive Subtitle */}
            <p className="text-base sm:text-lg text-steel-700 leading-relaxed max-w-2xl font-normal">
              MG Headhunting (MGH) delivers precision-engineered executive search for manufacturers, distributors, and private equity investors across the Building Products sector. Partner-led, rigorously assessed, and strictly confidential.
            </p>

            {/* Key Value Micro-pills */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 text-xs font-mono text-navy-900">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Zero Transactional Recruitment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>100% Partner Execution</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Deep Sector Discretion</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Button
                variant="primary"
                size="lg"
                onClick={onInitiateSearch}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Initiate Confidential Search
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onExploreSpecialisms}
              >
                View Sector Specialisms
              </Button>
            </div>

            {/* Regulatory & Client Endorsement Indicator */}
            <div className="pt-4 flex items-center gap-3 text-xs text-steel-600 border-t border-steel-200">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="leading-tight">
                Operating under UK Executive Search Code of Conduct &amp; Strict Data Protection protocols.
              </span>
            </div>
          </div>

          {/* Right Column: Architectural Photography Frame & Live Search Metrics */}
          <div className="lg:col-span-5 relative">
            
            {/* Outer Engineered Frame with blueprint crosshairs */}
            <div className="relative bg-white border border-steel-300 p-3 sm:p-4 shadow-sm">
              
              {/* Corner crosshairs */}
              <div className="absolute -top-2 -left-2 text-steel-400 font-mono text-xs">+</div>
              <div className="absolute -top-2 -right-2 text-steel-400 font-mono text-xs">+</div>
              <div className="absolute -bottom-2 -left-2 text-steel-400 font-mono text-xs">+</div>
              <div className="absolute -bottom-2 -right-2 text-steel-400 font-mono text-xs">+</div>

              {/* Architectural Image Placeholder Frame */}
              <div className="relative bg-navy-900 text-white overflow-hidden aspect-[4/3] flex flex-col justify-between p-6 border border-navy-800">
                
                {/* Blueprint grid overlay inside image */}
                <div className="absolute inset-0 bg-blueprint-dark opacity-30 pointer-events-none" />
                
                {/* Architectural diagonal line graphic */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-teal-600/20 to-transparent pointer-events-none" />

                {/* Top header badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-400" />
                    <span className="font-mono text-[10px] tracking-widest text-teal-300 uppercase">
                      EXECUTIVE MANDATE DESK
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-steel-400">STAGE // CALIBRATION</span>
                </div>

                {/* Center Visual Content */}
                <div className="relative z-10 my-auto py-4">
                  <div className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-2">
                    Mark Goldsmith
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-teal-300 mb-3">
                    Managing Director &amp; Lead Search Partner
                  </div>
                  <p className="text-xs text-steel-300 leading-relaxed font-sans max-w-sm">
                    Specialist in board appointments, P&amp;L leaders, and commercial turnarounds across heavy building materials, façades, HVAC, and timber systems.
                  </p>
                </div>

                {/* Bottom Signature Line */}
                <div className="relative z-10 pt-3 border-t border-navy-700 flex items-center justify-between text-[11px] font-mono text-steel-300">
                  <span>CONFIDENTIALITY: LEVEL 1</span>
                  <span className="text-teal-300 font-bold">20+ YRS SECTOR TENURE</span>
                </div>
              </div>

              {/* Live Metric Overlay Bar */}
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-steel-200">
                <div className="bg-canvas-light p-3 border border-steel-200">
                  <div className="font-display text-xl font-bold text-navy-900">96.4%</div>
                  <div className="text-[10px] font-mono uppercase text-steel-600">Completion Rate</div>
                </div>
                <div className="bg-canvas-light p-3 border border-steel-200">
                  <div className="font-display text-xl font-bold text-teal-700">58 Days</div>
                  <div className="text-[10px] font-mono uppercase text-steel-600">Avg. Mandate Time</div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Metric Strip */}
        <div className="mt-12 pt-8 border-t border-steel-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            code="METRIC_01"
            value="100%"
            label="Retained Mandates"
            sublabel="Exclusively dedicated search with complete commitment to assignment outcome"
          />
          <StatCard
            code="METRIC_02"
            value="£2M–£500M+"
            label="Client P&L Scale"
            sublabel="From high-growth PE-backed specialists to global plc manufacturing entities"
          />
          <StatCard
            code="METRIC_03"
            value="0%"
            label="Junior Delegation"
            sublabel="Every search researched, approached, and negotiated directly by Mark Goldsmith"
          />
          <StatCard
            code="METRIC_04"
            value="12 Month"
            label="Placement Guarantee"
            sublabel="Rigorous calibration and assessment backed by long-term executive assurance"
            isDark
          />
        </div>

      </div>
    </section>
  );
};
