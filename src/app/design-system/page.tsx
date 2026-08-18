'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Palette,
  Box,
  BookOpen,
  ArrowRight,
  Code2,
  Copy,
  Check,
  ShieldCheck,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { DesignSystemNav } from '../../components/showcase/DesignSystemNav';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Wordmark } from '../../components/brand/Wordmark';
import { Monogram } from '../../components/brand/Monogram';
import { InitiateSearchModal } from '../../components/ui/InitiateSearchModal';

export default function DesignSystemHubPage() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [copiedTokens, setCopiedTokens] = useState(false);

  const handleCopyTokensSnippet = () => {
    const snippet = `{
  "name": "MG Headhunting Design Tokens",
  "version": "1.0.0",
  "color": {
    "brand": {
      "navy": { "950": "#07111D", "900": "#0F243A", "800": "#163A5F" },
      "teal": { "600": "#138D90", "500": "#17A9AC", "400": "#22C8CB" },
      "steel": { "900": "#252B2E", "300": "#D0D4D6", "50": "#F8FAFB" }
    }
  }
}`;
    navigator.clipboard.writeText(snippet);
    setCopiedTokens(true);
    setTimeout(() => setCopiedTokens(false), 2000);
  };

  const sections = [
    {
      title: 'Design Tokens & Foundations',
      description:
        'Architectural color palettes, mathematical typography scales, 1px concrete structural hairlines, and W3C-compliant JSON token exports.',
      href: '/design-system/tokens',
      icon: Palette,
      badge: 'FOUNDATION',
      stats: '25+ Tokens • 3 Palettes • 7 Scales',
      preview: (
        <div className="flex items-center gap-1.5 pt-2">
          <div className="w-6 h-6 bg-navy-950 border border-navy-800" title="Navy 950" />
          <div className="w-6 h-6 bg-navy-800 border border-navy-700" title="Navy 800" />
          <div className="w-6 h-6 bg-teal-600 border border-teal-500" title="Teal 600" />
          <div className="w-6 h-6 bg-steel-300 border border-steel-400" title="Steel 300" />
          <div className="w-6 h-6 bg-steel-50 border border-steel-200" title="Steel 50" />
          <span className="text-[10px] font-mono text-steel-500 ml-2">#07111D / #138D90</span>
        </div>
      ),
    },
    {
      title: 'UI Component Kit',
      description:
        'Engineered UI components including sharp-edged buttons, status badges, executive cards, retained intake modals, and hairline section dividers.',
      href: '/design-system/components',
      icon: Box,
      badge: 'LIBRARY',
      stats: '10+ Components • 100% Accessible',
      preview: (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Badge variant="navy" size="sm">Executive</Badge>
          <Badge variant="teal" size="sm">Retained Search</Badge>
          <div className="px-2.5 py-0.5 bg-teal-600 text-white text-[10px] font-sans font-semibold">
            Action CTA
          </div>
        </div>
      ),
    },
    {
      title: 'Brand Identity & Guidelines',
      description:
        'Official standards for the MGH Wordmark, geometric Monogram construction, clear space rules, 70/20/10 color harmony, and executive editorial voice.',
      href: '/design-system/brand',
      icon: BookOpen,
      badge: 'STANDARDS',
      stats: 'Logos • Construction • Voice & Tone',
      preview: (
        <div className="flex items-center gap-3 pt-2">
          <Monogram size="sm" />
          <div className="font-display text-xs font-bold uppercase text-navy-900 tracking-wider">
            MG <span className="text-teal-700">HEADHUNTING</span>
          </div>
        </div>
      ),
    },
  ];

  const pillars = [
    {
      title: 'Architectural Rigor',
      description:
        'Crisp, unrounded geometry, 1px structural hairlines, and precise tabular alignment inspired by blueprints and industrial engineering drawings.',
    },
    {
      title: 'Boardroom Gravitas',
      description:
        'A palette anchored by Deep Navy and slate with restrained teal focus accents, tailored specifically for C-suite and Boardroom stakeholders.',
    },
    {
      title: 'High-Density Restraint',
      description:
        'Zero decorative fluff or trendy gimmicks. Every pixel and component is purposeful, accessible, and fast-loading.',
    },
    {
      title: 'Executive Typography',
      description:
        'An intentional pairing of classical Roman monumental serif (Cinzel) with high-legibility geometric sans (Plus Jakarta Sans).',
    },
  ];

  return (
    <div className="min-h-screen bg-canvas-light text-navy-900 font-sans flex flex-col selection:bg-teal-600 selection:text-white">
      {/* Design System Header */}
      <DesignSystemNav onOpenSearchModal={() => setIsSearchModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow">
        
        {/* Editorial Hero Header */}
        <section className="bg-navy-950 text-white py-16 sm:py-20 lg:py-24 border-b border-navy-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/25 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-teal-950/80 border border-teal-800 text-teal-400 text-xs uppercase font-sans tracking-widest font-semibold mb-6">
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-none animate-pulse" />
                MGH Executive Design System • v1.0.0
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                Architectural Precision for Executive Search
              </h1>

              <p className="text-base sm:text-lg text-steel-300 leading-relaxed font-sans max-w-2xl mb-8">
                The official design system and component architecture powering MG Headhunting. Engineered for board-level authority, technical clarity, and high-stakes mandate conversion in the Building Products sector.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/design-system/tokens">
                  <Button
                    variant="primary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Explore Design Tokens
                  </Button>
                </Link>
                <Link href="/design-system/components">
                  <Button
                    variant="secondary"
                    size="md"
                    icon={<Box className="w-4 h-4" />}
                  >
                    Component Library
                  </Button>
                </Link>
                <Link href="/design-system/brand">
                  <Button
                    variant="outline"
                    size="md"
                    icon={<BookOpen className="w-4 h-4" />}
                  >
                    Brand Guidelines
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Quick System Telemetry / Stats Bar */}
        <section className="bg-navy-900 border-b border-navy-800 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
              <div className="border-l-2 border-teal-500 pl-4">
                <div className="font-display text-2xl font-bold text-white">25+</div>
                <div className="text-xs text-steel-400 uppercase tracking-wider font-mono">Calibrated Tokens</div>
              </div>
              <div className="border-l-2 border-teal-500 pl-4">
                <div className="font-display text-2xl font-bold text-white">10+</div>
                <div className="text-xs text-steel-400 uppercase tracking-wider font-mono">Atomic Components</div>
              </div>
              <div className="border-l-2 border-teal-500 pl-4">
                <div className="font-display text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-steel-400 uppercase tracking-wider font-mono">Unrounded Hairlines</div>
              </div>
              <div className="border-l-2 border-teal-500 pl-4">
                <div className="font-display text-2xl font-bold text-white">AAA</div>
                <div className="text-xs text-steel-400 uppercase tracking-wider font-mono">Contrast Standard</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Gateway Hub (3 Nav Cards) */}
        <section className="py-16 bg-canvas-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="navy" size="sm">SYSTEM ARCHITECTURE</Badge>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900 uppercase">
                Explore Design System Specifications
              </h2>
              <p className="text-sm text-steel-600">
                Navigate directly into token variables, live interactive components, or brand identity guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sections.map((sec) => {
                const Icon = sec.icon;
                return (
                  <Link
                    key={sec.href}
                    href={sec.href}
                    className="group bg-white border border-steel-300 p-6 flex flex-col justify-between hover:border-teal-600 hover:shadow-lg transition-all duration-200 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-teal-600 transition-colors" />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 bg-navy-950 text-teal-400 border border-navy-800 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 border border-teal-200">
                          {sec.badge}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-navy-900 group-hover:text-teal-700 transition-colors">
                        {sec.title}
                      </h3>

                      <p className="text-xs text-steel-600 leading-relaxed">
                        {sec.description}
                      </p>

                      <div className="pt-2 border-t border-steel-200">
                        {sec.preview}
                      </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-steel-200 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-steel-500">
                        {sec.stats}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 group-hover:translate-x-1 transition-transform">
                        <span>View Spec</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4 Core Design Pillars */}
        <section className="py-16 bg-white border-y border-steel-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="teal" size="sm">FOUNDATIONAL PRINCIPLES</Badge>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900 uppercase">
                Core Design Pillars
              </h2>
              <p className="text-sm text-steel-600">
                The visual and functional criteria guiding all interface and brand decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar, idx) => (
                <div
                  key={pillar.title}
                  className="p-6 bg-canvas-light border border-steel-200 space-y-3 relative"
                >
                  <span className="font-mono text-xs font-bold text-teal-700">0{idx + 1}.</span>
                  <h3 className="font-display text-base font-bold text-navy-900 uppercase">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-steel-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Tokens Specification Snapshot */}
        <section className="py-16 bg-canvas-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="navy" size="sm">TOKENS.JSON SPECIFICATION</Badge>
                </div>
                <h2 className="font-display text-2xl font-bold text-navy-900 uppercase">
                  W3C Design Token Definition
                </h2>
                <p className="text-xs text-steel-600 mt-1">
                  Machine-readable design tokens synced across Tailwind CSS, Figma tokens, and Next.js styles.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyTokensSnippet}
                  icon={copiedTokens ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                >
                  {copiedTokens ? 'Copied Token JSON' : 'Copy Tokens JSON'}
                </Button>
                <Link href="/design-system/tokens">
                  <Button variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Open Token Registry
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-navy-950 border border-navy-800 p-6 text-white overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-navy-800 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-steel-400">
                  <Code2 className="w-4 h-4 text-teal-400" />
                  <span>tokens.json • Community Group Standard</span>
                </div>
                <span className="text-[10px] font-mono uppercase text-teal-400 bg-teal-950 px-2 py-0.5 border border-teal-800">
                  W3C Valid
                </span>
              </div>
              <pre className="font-mono text-xs text-teal-300 overflow-x-auto leading-relaxed">
{`{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "name": "MG Headhunting Design Tokens",
  "version": "1.0.0",
  "color": {
    "brand": {
      "navy": {
        "950": { "$value": "#07111D", "$description": "Deepest architectural slate" },
        "900": { "$value": "#0F243A", "$description": "Header & high-emphasis surface text" },
        "800": { "$value": "#163A5F", "$description": "Primary Brand Navy - Industrial Gravitas" }
      },
      "teal": {
        "600": { "$value": "#138D90", "$description": "Accent Medium Teal - Precision Micro-accents & CTAs" },
        "500": { "$value": "#17A9AC", "$description": "Teal interactive hover" }
      },
      "steel": {
        "300": { "$value": "#D0D4D6", "$description": "Structural Concrete - 1px Architectural Hairlines" },
        "50":  { "$value": "#F8FAFB", "$description": "Off-white architectural canvas" }
      }
    }
  }
}`}
              </pre>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-navy-950 border-t border-navy-800 py-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-steel-400">
          <div className="flex items-center gap-3">
            <Monogram size="sm" />
            <span>© {new Date().getFullYear()} MG Headhunting. Design System &amp; Component Specification.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition-colors">
              Main Site
            </Link>
            <span>•</span>
            <Link href="/insights" className="hover:text-white transition-colors">
              Market Intelligence
            </Link>
            <span>•</span>
            <Link href="/design-system/tokens" className="hover:text-white transition-colors">
              Tokens
            </Link>
          </div>
        </div>
      </footer>

      {/* Interactive Search Intake Modal instance for testing */}
      <InitiateSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  );
}
