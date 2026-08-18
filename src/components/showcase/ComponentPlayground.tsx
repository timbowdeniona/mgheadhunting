'use client';

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
                <Button variant="primary" size="md" icon={<Target className="w-3.5 h-3.5" />}>
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
            <Badge variant="steel" size="md">REF // MGH-2026</Badge>
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
            <SectionDivider label="LEFT ALIGNED ACCENT RULE" tealAccent align="left" />
            <SectionDivider label="CENTER TICK COORDINATE" tealAccent align="center" />
            <SectionDivider label="RIGHT ACCENT RULE" tealAccent align="right" />
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

        {/* 5. Modular Page Builder Palette & Live Previews */}
        <div className="p-6 bg-white border border-steel-300 space-y-8">
          <div className="pb-3 border-b border-steel-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="teal" size="sm" dot>NEW PAGE BUILDER</Badge>
                <Badge variant="navy" size="sm">12 COMPOSABLE BLOCKS</Badge>
              </div>
              <h3 className="font-display text-lg font-bold text-navy-900 uppercase">
                5. Modular Page Builder Palette &amp; Template Routes
              </h3>
            </div>
            <span className="font-mono text-xs text-teal-700">Dynamic App Router / [slug]</span>
          </div>

          <p className="text-xs sm:text-sm text-steel-600 font-light">
            Every section below is part of the MGH modular page architecture. Editors can compose custom pages via Contentful CMS or use built-in template routes with consistent navigation, sticky mobile triggers, and retained search intake modals.
          </p>

          {/* Quick Route Navigator */}
          <div className="p-5 bg-navy-900 text-white border border-navy-800 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 block">
              Pre-Seeded Componentised Webpages (Click to inspect live)
            </span>
            <div className="flex flex-wrap gap-2.5">
              <a
                href="/about"
                className="px-3.5 py-2 bg-navy-800 border border-navy-700 text-xs font-mono uppercase text-steel-200 hover:text-white hover:border-teal-500 transition-colors flex items-center gap-1.5"
              >
                <span>/about</span>
                <ChevronRight className="w-3 h-3 text-teal-400" />
              </a>
              <a
                href="/sectors"
                className="px-3.5 py-2 bg-navy-800 border border-navy-700 text-xs font-mono uppercase text-steel-200 hover:text-white hover:border-teal-500 transition-colors flex items-center gap-1.5"
              >
                <span>/sectors</span>
                <ChevronRight className="w-3 h-3 text-teal-400" />
              </a>
              <a
                href="/retained-search"
                className="px-3.5 py-2 bg-navy-800 border border-navy-700 text-xs font-mono uppercase text-steel-200 hover:text-white hover:border-teal-500 transition-colors flex items-center gap-1.5"
              >
                <span>/retained-search</span>
                <ChevronRight className="w-3 h-3 text-teal-400" />
              </a>
              <a
                href="/difference"
                className="px-3.5 py-2 bg-navy-800 border border-navy-700 text-xs font-mono uppercase text-steel-200 hover:text-white hover:border-teal-500 transition-colors flex items-center gap-1.5"
              >
                <span>/difference</span>
                <ChevronRight className="w-3 h-3 text-teal-400" />
              </a>
              <a
                href="/contact"
                className="px-3.5 py-2 bg-navy-800 border border-navy-700 text-xs font-mono uppercase text-steel-200 hover:text-white hover:border-teal-500 transition-colors flex items-center gap-1.5"
              >
                <span>/contact</span>
                <ChevronRight className="w-3 h-3 text-teal-400" />
              </a>
            </div>
          </div>

          {/* Block Palette Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Block 1: Page Header */}
            <div className="p-5 bg-canvas-light border border-steel-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-steel-500">Block 01</span>
                <Badge variant="teal" size="sm">Header</Badge>
              </div>
              <h4 className="font-display text-sm font-bold text-navy-900 uppercase">
                PageHeaderBlock
              </h4>
              <p className="text-xs text-steel-600 font-light">
                Architectural blueprint banner with coordinate stamps, overline, and breadcrumb navigation.
              </p>
            </div>

            {/* Block 2: Metrics Stats */}
            <div className="p-5 bg-canvas-light border border-steel-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-steel-500">Block 02</span>
                <Badge variant="teal" size="sm">Proof Points</Badge>
              </div>
              <h4 className="font-display text-sm font-bold text-navy-900 uppercase">
                MetricsStatsBlock
              </h4>
              <p className="text-xs text-steel-600 font-light">
                High-impact numeric stat cards with responsive grids, subtle hairlines, and verification tags.
              </p>
            </div>

            {/* Block 3: Editorial Rich Text */}
            <div className="p-5 bg-canvas-light border border-steel-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-steel-500">Block 03</span>
                <Badge variant="teal" size="sm">Rich Text</Badge>
              </div>
              <h4 className="font-display text-sm font-bold text-navy-900 uppercase">
                EditorialRichTextBlock
              </h4>
              <p className="text-xs text-steel-600 font-light">
                Multi-column and sidebar editorial layouts with pull-quotes, take-away checklists, and custom typography.
              </p>
            </div>

            {/* Block 4: Sector Matrix */}
            <div className="p-5 bg-canvas-light border border-steel-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-steel-500">Block 04</span>
                <Badge variant="teal" size="sm">Matrix</Badge>
              </div>
              <h4 className="font-display text-sm font-bold text-navy-900 uppercase">
                SectorGridBlock
              </h4>
              <p className="text-xs text-steel-600 font-light">
                Categorized sector specialization cards with interactive mandate intake pre-population.
              </p>
            </div>

            {/* Block 5: Search Blueprint Timeline */}
            <div className="p-5 bg-canvas-light border border-steel-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-steel-500">Block 05</span>
                <Badge variant="teal" size="sm">Process</Badge>
              </div>
              <h4 className="font-display text-sm font-bold text-navy-900 uppercase">
                ProcessTimelineBlock
              </h4>
              <p className="text-xs text-steel-600 font-light">
                5-Stage executive search methodology timeline with deliverable indicators and milestones.
              </p>
            </div>

            {/* Block 6: FAQ Accordion */}
            <div className="p-5 bg-canvas-light border border-steel-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-steel-500">Block 06</span>
                <Badge variant="teal" size="sm">Advisory</Badge>
              </div>
              <h4 className="font-display text-sm font-bold text-navy-900 uppercase">
                FaqAccordionBlock
              </h4>
              <p className="text-xs text-steel-600 font-light">
                Sharp, unrounded industrial accordions for terms of engagement, off-limits rules, and guarantees.
              </p>
            </div>

            {/* Block 7: CTA Conversion Banner */}
            <div className="p-5 bg-canvas-light border border-steel-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-steel-500">Block 07</span>
                <Badge variant="teal" size="sm">Conversion</Badge>
              </div>
              <h4 className="font-display text-sm font-bold text-navy-900 uppercase">
                CtaBannerBlock
              </h4>
              <p className="text-xs text-steel-600 font-light">
                Configurable high-conversion banners in Navy, Blueprint, and Light variants with direct modal triggers.
              </p>
            </div>

            {/* Block 8: Direct Desk Contact */}
            <div className="p-5 bg-canvas-light border border-steel-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-steel-500">Block 08</span>
                <Badge variant="teal" size="sm">Contact</Badge>
              </div>
              <h4 className="font-display text-sm font-bold text-navy-900 uppercase">
                ContactDeskBlock
              </h4>
              <p className="text-xs text-steel-600 font-light">
                Direct partner telephone, direct email, jurisdiction credentials, and encrypted consultation intake.
              </p>
            </div>

            {/* Block 9: Team Profile */}
            <div className="p-5 bg-canvas-light border border-steel-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-steel-500">Block 09</span>
                <Badge variant="teal" size="sm">Profile</Badge>
              </div>
              <h4 className="font-display text-sm font-bold text-navy-900 uppercase">
                TeamProfileBlock
              </h4>
              <p className="text-xs text-steel-600 font-light">
                Partner credentials, British Psychological Society accreditation, track record, and bio checklist.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

