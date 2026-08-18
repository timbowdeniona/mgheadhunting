'use client';

import React, { useState } from 'react';
import { Wordmark } from '../brand/Wordmark';
import { Monogram } from '../brand/Monogram';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Check, Copy, Shield, Sparkles, Layout, Type, Compass, Award } from 'lucide-react';

export const BrandGuidelines: React.FC = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyRule = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="py-12 bg-canvas-light text-navy-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="navy" size="sm">BRAND IDENTITY &amp; SPECIFICATION</Badge>
            <Badge variant="teal" size="sm">OFFICIAL GUIDELINES</Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight uppercase">
            MGH Brand &amp; Visual Identity System
          </h1>
          <p className="text-sm sm:text-base text-steel-600 max-w-3xl mt-2 leading-relaxed">
            The visual identity of MG Headhunting embodies senior industrial authority, architectural precision, and discreet executive rigor. Engineered specifically for the Building Products, Construction Materials, and Built Environment sectors.
          </p>
        </div>

        {/* 1. Primary Wordmark Anatomy */}
        <section className="bg-white border border-steel-300 p-6 sm:p-8 space-y-8">
          <div className="border-b border-steel-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-display text-xl font-bold uppercase text-navy-900 flex items-center gap-2">
                <Layout className="w-5 h-5 text-teal-600" />
                <span>1. Primary Wordmark Anatomy</span>
              </h2>
              <p className="text-xs text-steel-500 mt-1">
                Composed of uppercase serif display lettering, signature teal horizontal divider rule, and secondary sector descriptor.
              </p>
            </div>
            <span className="font-mono text-xs text-teal-700 font-semibold">Cinzel Display • Pure Geometric Alignment</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Light Canvas Context */}
            <div className="p-8 bg-white border border-steel-200 flex flex-col items-center justify-center min-h-[220px] text-center relative group">
              <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest text-steel-400 bg-steel-100 px-2 py-0.5">
                Light Background (Canvas Surface)
              </span>
              <div className="py-6">
                <Wordmark variant="dark" size="lg" showSubtitle={true} />
              </div>
              <span className="text-xs text-steel-500 font-mono mt-2">
                Primary Brand Navy (#163A5F) + Teal Divider (#138D90)
              </span>
            </div>

            {/* Dark Navy 950 Context */}
            <div className="p-8 bg-navy-950 border border-navy-800 flex flex-col items-center justify-center min-h-[220px] text-center relative group">
              <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest text-teal-400 bg-navy-900 px-2 py-0.5 border border-navy-700">
                Dark Background (Boardroom Slate)
              </span>
              <div className="py-6">
                <Wordmark variant="light" size="lg" showSubtitle={true} />
              </div>
              <span className="text-xs text-steel-400 font-mono mt-2">
                White Pure Text (#FFFFFF) + Teal Rule (#138D90)
              </span>
            </div>
          </div>

          {/* Size Matrix */}
          <div className="border-t border-steel-200 pt-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-steel-500 mb-4">
              Responsive Scale Matrix
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-canvas-light border border-steel-200 space-y-3">
                <span className="text-xs font-semibold text-navy-900 block">Small (Header Scrolled / Compact)</span>
                <div className="py-2">
                  <Wordmark size="sm" showSubtitle={false} />
                </div>
                <p className="text-[11px] text-steel-600">Sub-navigation bars and compact headers.</p>
              </div>

              <div className="p-4 bg-canvas-light border border-steel-200 space-y-3">
                <span className="text-xs font-semibold text-navy-900 block">Medium (Standard Desktop Nav)</span>
                <div className="py-2">
                  <Wordmark size="md" showSubtitle={true} />
                </div>
                <p className="text-[11px] text-steel-600">Default for desktop header navigation.</p>
              </div>

              <div className="p-4 bg-canvas-light border border-steel-200 space-y-3">
                <span className="text-xs font-semibold text-navy-900 block">Large (Hero &amp; Document Covers)</span>
                <div className="py-2">
                  <Wordmark size="lg" showSubtitle={true} />
                </div>
                <p className="text-[11px] text-steel-600">Executive report covers and hero layouts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Monogram Emblem & Construction */}
        <section className="bg-white border border-steel-300 p-6 sm:p-8 space-y-8">
          <div className="border-b border-steel-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-display text-xl font-bold uppercase text-navy-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-teal-600" />
                <span>2. Geometric Monogram Emblem</span>
              </h2>
              <p className="text-xs text-steel-500 mt-1">
                Precision interlocking M and G glyph with architectural beveling, square bounding perimeter, and calibrated stroke weight.
              </p>
            </div>
            <span className="font-mono text-xs text-teal-700 font-semibold">Strict 1:1 Aspect Ratio</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-canvas-light border border-steel-200 flex flex-col items-center justify-center text-center space-y-4">
              <Monogram size="sm" />
              <div>
                <span className="text-xs font-bold text-navy-900 block">Small (24px × 24px)</span>
                <span className="text-[11px] text-steel-500">Favicon, compact mobile indicator, metadata tag</span>
              </div>
            </div>

            <div className="p-6 bg-canvas-light border border-steel-200 flex flex-col items-center justify-center text-center space-y-4">
              <Monogram size="md" />
              <div>
                <span className="text-xs font-bold text-navy-900 block">Medium (36px × 36px)</span>
                <span className="text-[11px] text-steel-500">Mobile nav bar, executive cards, dialog badges</span>
              </div>
            </div>

            <div className="p-6 bg-canvas-light border border-steel-200 flex flex-col items-center justify-center text-center space-y-4">
              <Monogram size="lg" />
              <div>
                <span className="text-xs font-bold text-navy-900 block">Large (48px × 48px)</span>
                <span className="text-[11px] text-steel-500">Watermarks, profile avatars, report seal</span>
              </div>
            </div>
          </div>

          {/* Rules & Clear Space */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-steel-50 p-6 border border-steel-200">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-navy-900 font-bold mb-2">
                Clear Space Requirements
              </h4>
              <p className="text-xs text-steel-700 leading-relaxed">
                Always maintain a minimum exclusion zone equal to half the monogram height (<code className="bg-white px-1.5 py-0.5 border border-steel-300 text-teal-800">0.5X</code>) on all four sides. Do not crowd with headlines, decorative rules, or secondary typography.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-navy-900 font-bold mb-2">
                Prohibited Modifications
              </h4>
              <ul className="text-xs text-steel-700 space-y-1 list-disc list-inside">
                <li>Never stretch, skew, or distort the aspect ratio.</li>
                <li>Never apply soft drop shadows, neon glows, or 3D extrusions.</li>
                <li>Never enclose in circular badges or rounded pills.</li>
                <li>Never substitute arbitrary non-brand colors.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Color Harmony & Usage Ratio */}
        <section className="bg-white border border-steel-300 p-6 sm:p-8 space-y-8">
          <div className="border-b border-steel-200 pb-4">
            <h2 className="font-display text-xl font-bold uppercase text-navy-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-teal-600" />
              <span>3. Color Distribution &amp; Harmony (70 / 20 / 10 Rule)</span>
            </h2>
            <p className="text-xs text-steel-500 mt-1">
              Strict balance to maintain executive authority and avoid visual clutter.
            </p>
          </div>

          {/* Proportional Color Bar */}
          <div className="space-y-2">
            <div className="h-10 w-full flex overflow-hidden border border-steel-300 shadow-inner">
              <div className="w-[70%] bg-navy-950 flex items-center justify-center text-white text-xs font-mono font-semibold">
                70% Dominant (Deep Navy &amp; Canvas)
              </div>
              <div className="w-[20%] bg-steel-300 flex items-center justify-center text-navy-900 text-xs font-mono font-semibold">
                20% Structural
              </div>
              <div className="w-[10%] bg-teal-600 flex items-center justify-center text-white text-xs font-mono font-semibold">
                10%
              </div>
            </div>
            <div className="flex justify-between text-[11px] font-mono text-steel-500">
              <span>Primary Canvas &amp; Senior Slate</span>
              <span>Hairline Concrete &amp; Borders</span>
              <span>Teal Focus &amp; CTAs</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-navy-950 text-white space-y-2 border border-navy-900">
              <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400">70% Dominant Base</span>
              <h4 className="font-bold text-sm">Deep Navy #163A5F &amp; Canvas Light</h4>
              <p className="text-xs text-steel-300">
                Forms the backdrop, typography hierarchy, and corporate bedrock. Communicates stability and deep board-level tenure.
              </p>
            </div>

            <div className="p-4 bg-steel-100 text-navy-900 space-y-2 border border-steel-300">
              <span className="text-[10px] font-mono uppercase tracking-wider text-steel-600">20% Structural Grid</span>
              <h4 className="font-bold text-sm">Concrete Grey #D0D4D6</h4>
              <p className="text-xs text-steel-700">
                1px hairline grid boundaries, card partitions, table dividers, and subtle architectural substrate washes.
              </p>
            </div>

            <div className="p-4 bg-teal-600 text-white space-y-2 border border-teal-700">
              <span className="text-[10px] font-mono uppercase tracking-wider text-teal-200">10% Precision Accent</span>
              <h4 className="font-bold text-sm">Medium Teal #138D90</h4>
              <p className="text-xs text-teal-100">
                Reserved exclusively for primary action triggers, metric callouts, active indicator dots, and signature divider rules.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Executive Typography Pairing */}
        <section className="bg-white border border-steel-300 p-6 sm:p-8 space-y-8">
          <div className="border-b border-steel-200 pb-4">
            <h2 className="font-display text-xl font-bold uppercase text-navy-900 flex items-center gap-2">
              <Type className="w-5 h-5 text-teal-600" />
              <span>4. Executive Typography Pairing</span>
            </h2>
            <p className="text-xs text-steel-500 mt-1">
              A bespoke architectural tension between classical Roman monumental type and high-precision contemporary grotesque sans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-canvas-light border border-steel-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-700 font-bold">Display &amp; Headings</span>
                <span className="text-xs font-mono text-steel-500">Google Fonts: Cinzel</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-navy-900 tracking-tight">
                ARCHITECTURAL GRAVITAS
              </h3>
              <p className="text-xs text-steel-600 leading-relaxed">
                Applied to all primary page headings, section headers, card titles, and the MGH wordmark. Conveys heritage, institutional trust, and retained executive stature.
              </p>
              <div className="font-display text-base text-navy-800 tracking-widest uppercase border-t border-steel-300 pt-3">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
              </div>
            </div>

            <div className="p-6 bg-canvas-light border border-steel-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-700 font-bold">Body &amp; Technical UI</span>
                <span className="text-xs font-mono text-steel-500">Google Fonts: Plus Jakarta Sans</span>
              </div>
              <h3 className="font-sans text-xl font-semibold text-navy-900">
                Precision Executive Copy
              </h3>
              <p className="text-xs text-steel-600 leading-relaxed">
                Applied to narrative text, executive bios, briefing excerpts, data tables, and interactive form controls. Engineered for crisp readability across mobile and 4K displays.
              </p>
              <div className="font-sans text-sm text-navy-800 tracking-normal border-t border-steel-300 pt-3">
                abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
              </div>
            </div>
          </div>
        </section>

        {/* 5. Editorial Voice & Sector Terminology */}
        <section className="bg-white border border-steel-300 p-6 sm:p-8 space-y-6">
          <div className="border-b border-steel-200 pb-4">
            <h2 className="font-display text-xl font-bold uppercase text-navy-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-600" />
              <span>5. Editorial Voice &amp; Tone Guidelines</span>
            </h2>
            <p className="text-xs text-steel-500 mt-1">
              How MGH communicates across digital touchpoints, market briefings, and client mandates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-canvas-light border border-steel-200 space-y-2">
              <span className="font-bold text-xs text-navy-900 uppercase">Partner-Led Rigor</span>
              <p className="text-xs text-steel-600">
                Every mandate is directly handled by Mark Goldsmith. No delegation to junior researchers or automated volume funnels.
              </p>
            </div>

            <div className="p-4 bg-canvas-light border border-steel-200 space-y-2">
              <span className="font-bold text-xs text-navy-900 uppercase">Strict Discretion</span>
              <p className="text-xs text-steel-600">
                Non-disclosure assured. We never expose client vulnerability or broadcast confidential succession mandates publicly.
              </p>
            </div>

            <div className="p-4 bg-canvas-light border border-steel-200 space-y-2">
              <span className="font-bold text-xs text-navy-900 uppercase">Technical Literacy</span>
              <p className="text-xs text-steel-600">
                Fluency in Building Safety Act, low-carbon embodied carbon, MMC, thermal insulation, fenestration, and heavy materials manufacturing.
              </p>
            </div>

            <div className="p-4 bg-canvas-light border border-steel-200 space-y-2">
              <span className="font-bold text-xs text-navy-900 uppercase">Boardroom Authority</span>
              <p className="text-xs text-steel-600">
                Clear, concise, data-backed communications without trendy buzzwords, exaggerated marketing claims, or hyperbole.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
