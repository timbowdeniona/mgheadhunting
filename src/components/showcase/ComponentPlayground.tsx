import React from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SectionDivider } from '../ui/SectionDivider';
import { Wordmark } from '../brand/Wordmark';
import { Monogram } from '../brand/Monogram';
import { ArrowRight, Download, Target, ChevronRight } from 'lucide-react';

export interface ComponentPlaygroundProps {
  onOpenSearchModal: () => void;
}

export const ComponentPlayground: React.FC<ComponentPlaygroundProps> = ({
  onOpenSearchModal,
}) => {
  return (
    <div className="py-12 bg-canvas-light border-b border-steel-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="navy" size="sm">ATOMIC &amp; COMPOSITE LIBRARY</Badge>
            <Badge variant="teal" size="sm">PRODUCTION READY</Badge>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900 uppercase">
            UI Component Kit Playground
          </h2>
          <p className="text-xs sm:text-sm text-steel-600">
            Engineered UI components with strict industrial design language, architectural hairlines, and precise hover micro-interactions.
          </p>
        </div>

        {/* 1. Buttons & CTAs */}
        <div className="p-6 bg-white border border-steel-300 space-y-6">
          <div className="pb-3 border-b border-steel-200 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-navy-900 uppercase">
              1. Button System (Sharp, Engineered, Unrounded)
            </h3>
            <span className="font-mono text-xs text-teal-700">5 Variants • 3 Sizes</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Primary Teal CTA */}
            <div className="p-4 bg-canvas-light border border-steel-200 space-y-3">
              <span className="text-[10px] font-mono uppercase text-steel-500 block">Primary (Medium Teal #138D90)</span>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary" size="sm">Search (SM)</Button>
                <Button variant="primary" size="md" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Initiate Search (MD)
                </Button>
              </div>
            </div>

            {/* Secondary Navy Solid */}
            <div className="p-4 bg-canvas-light border border-steel-200 space-y-3">
              <span className="text-[10px] font-mono uppercase text-steel-500 block">Secondary (Deep Navy #163A5F)</span>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm">Mandate (SM)</Button>
                <Button variant="secondary" size="md" icon={<ChevronRight className="w-3.5 h-3.5" />}>
                  Executive Brief (MD)
                </Button>
              </div>
            </div>

            {/* Outline Steel Hairline */}
            <div className="p-4 bg-canvas-light border border-steel-200 space-y-3">
              <span className="text-[10px] font-mono uppercase text-steel-500 block">Outline (Steel #D0D4D6)</span>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Sector Spec</Button>
                <Button variant="outline" size="md">
                  View Practice Matrix
                </Button>
              </div>
            </div>

            {/* Ghost */}
            <div className="p-4 bg-canvas-light border border-steel-200 space-y-3">
              <span className="text-[10px] font-mono uppercase text-steel-500 block">Ghost &amp; Action</span>
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" size="sm">Subtle</Button>
                <Button variant="ghost" size="md" icon={<Download className="w-3.5 h-3.5" />}>
                  Download Spec
                </Button>
              </div>
            </div>

            {/* Blueprint Button */}
            <div className="p-4 bg-canvas-light border border-steel-200 space-y-3">
              <span className="text-[10px] font-mono uppercase text-steel-500 block">Blueprint Accent Button</span>
              <div className="flex flex-wrap gap-2">
                <Button variant="blueprint" size="md" icon={<Target className="w-3.5 h-3.5" />}>
                  Retained Mandate
                </Button>
              </div>
            </div>

            {/* Interactive Search Modal Trigger */}
            <div className="p-4 bg-navy-900 text-white border border-navy-700 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-teal-300 block">Interactive Modal Test</span>
                <p className="text-xs text-steel-300 mt-1">Open the retained search intake dialog.</p>
              </div>
              <Button variant="primary" size="md" onClick={onOpenSearchModal}>
                Test Search Modal
              </Button>
            </div>

          </div>
        </div>

        {/* 2. Badges & Architectural Tags */}
        <div className="p-6 bg-white border border-steel-300 space-y-6">
          <div className="pb-3 border-b border-steel-200 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-navy-900 uppercase">
              2. Badges, Indicators &amp; Coordinate Tags
            </h3>
            <span className="font-mono text-xs text-teal-700">Strict Non-Pill Architectural</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="navy" size="md">Navy Seniority</Badge>
            <Badge variant="teal" size="md" dot>Teal Active State</Badge>
            <Badge variant="steel" size="md">Concrete Neutral</Badge>
            <Badge variant="mono" size="md">REF // MGH-2026</Badge>
            <Badge variant="outline" size="md">Minimal Outline</Badge>
            <Badge variant="teal" size="sm" dot>Micro Dot (SM)</Badge>
          </div>
        </div>

        {/* 3. Section Dividers & Blueprint Rules */}
        <div className="p-6 bg-white border border-steel-300 space-y-6">
          <div className="pb-3 border-b border-steel-200 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-navy-900 uppercase">
              3. Section Dividers with Teal Accent Strokes
            </h3>
            <span className="font-mono text-xs text-teal-700">Architectural Lines</span>
          </div>

          <div className="space-y-4">
            <SectionDivider code="SEC_01" label="LEFT ALIGNED ACCENT RULE" tealAccent align="left" />
            <SectionDivider code="SEC_02" label="CENTER TICK COORDINATE" tealAccent align="center" />
            <SectionDivider code="SEC_03" label="RIGHT ACCENT RULE" tealAccent align="right" />
          </div>
        </div>

        {/* 4. Brand Monograms & Wordmarks */}
        <div className="p-6 bg-white border border-steel-300 space-y-6">
          <div className="pb-3 border-b border-steel-200 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-navy-900 uppercase">
              4. Brand Wordmarks &amp; Monogram Support
            </h3>
            <span className="font-mono text-xs text-teal-700">Desktop &amp; Compact Dual-State</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Light canvas rendering */}
            <div className="p-6 bg-canvas-light border border-steel-300 space-y-4">
              <span className="text-[10px] font-mono uppercase text-steel-500">Light Canvas Rendering</span>
              <div>
                <Wordmark variant="dark" size="md" showSubtitle />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Monogram size="sm" variant="dark" />
                <Monogram size="md" variant="dark" />
                <Monogram size="lg" variant="dark" />
                <Monogram size="md" variant="solid-teal" />
              </div>
            </div>

            {/* Dark canvas rendering */}
            <div className="p-6 bg-navy-900 text-white border border-navy-800 space-y-4">
              <span className="text-[10px] font-mono uppercase text-steel-400">Dark Canvas Rendering</span>
              <div>
                <Wordmark variant="light" size="md" showSubtitle />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Monogram size="sm" variant="light" />
                <Monogram size="md" variant="light" />
                <Monogram size="lg" variant="light" />
                <Monogram size="md" variant="solid-teal" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
