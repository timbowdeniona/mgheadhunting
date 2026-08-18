'use client';

import React, { useState } from 'react';
import { Copy, Check, Palette, Type, Box, Code } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const TokenExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'geometry' | 'json'>('colors');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const colorPalettes = [
    {
      name: 'Primary Brand — Deep Navy',
      description: 'Authority, seniority, calm, industrial gravitas. Used for primary text, dark section backgrounds, navigation.',
      primaryHex: '#163A5F',
      shades: [
        { name: 'navy-950', hex: '#07111D', label: 'Deepest Slate', role: 'Ultra-dark contrast' },
        { name: 'navy-900', hex: '#0F243A', label: 'Dark Surface', role: 'Header & surface text' },
        { name: 'navy-800', hex: '#163A5F', label: 'Primary Brand', role: 'Core Brand Navy' },
        { name: 'navy-700', hex: '#1E4C7A', label: 'Active Navy', role: 'Hover & border state' },
        { name: 'navy-600', hex: '#2A649E', label: 'Medium Navy', role: 'Secondary accent' },
        { name: 'navy-500', hex: '#3D7DC0', label: 'Navy Tint', role: 'Active elements' },
        { name: 'navy-300', hex: '#8BB4DF', label: 'Light Navy', role: 'Muted borders' },
        { name: 'navy-100', hex: '#D8E6F5', label: 'Navy Wash', role: 'Subtle hover' },
        { name: 'navy-50',  hex: '#F1F6FB', label: 'Navy Canvas', role: 'Light surface' },
      ],
    },
    {
      name: 'Accent — Medium Teal',
      description: 'Subtle directional focus, precision micro-accents. Used for horizontal divider strokes, active indicators, CTAs.',
      primaryHex: '#138D90',
      shades: [
        { name: 'teal-900', hex: '#094648', label: 'Deep Teal', role: 'Dark active state' },
        { name: 'teal-800', hex: '#0D5F61', label: 'Darker Hover', role: 'Button hover' },
        { name: 'teal-600', hex: '#138D90', label: 'Primary Accent', role: 'Core Teal Accent' },
        { name: 'teal-500', hex: '#17A9AC', label: 'Interactive', role: 'Focus & hover' },
        { name: 'teal-400', hex: '#22C8CB', label: 'Vibrant Teal', role: 'Metric highlight' },
        { name: 'teal-200', hex: '#8CE5E7', label: 'Soft Indicator', role: 'Badge border' },
        { name: 'teal-100', hex: '#D2F5F6', label: 'Light Teal', role: 'Tag background' },
        { name: 'teal-50',  hex: '#F0FBFC', label: 'Teal Tint', role: 'Subtle highlight' },
      ],
    },
    {
      name: 'Structural Neutral — Concrete / Steel Grey',
      description: 'Architectural substrate, engineered precision, structure. Used for 1px hairline borders, card outlines, grid guides.',
      primaryHex: '#D0D4D6',
      shades: [
        { name: 'steel-900', hex: '#252B2E', label: 'Engineering Dark', role: 'High contrast grey' },
        { name: 'steel-700', hex: '#4B5458', label: 'Editorial Grey', role: 'Secondary body text' },
        { name: 'steel-500', hex: '#7A858A', label: 'Muted Grey', role: 'Metadata & captions' },
        { name: 'steel-400', hex: '#A9B2B6', label: 'Medium Line', role: 'Structural line' },
        { name: 'steel-300', hex: '#D0D4D6', label: 'Structural Concrete', role: 'Core 1px Hairlines' },
        { name: 'steel-200', hex: '#E2E5E7', label: 'Light Border', role: 'Divider stroke' },
        { name: 'steel-100', hex: '#EFF1F2', label: 'Architectural Wash', role: 'Card surface' },
        { name: 'steel-50',  hex: '#F8FAFB', label: 'Off-White Canvas', role: 'Base background' },
      ],
    },
  ];

  const typographySpec = [
    {
      name: 'Display / Headers (H1–H3)',
      fontFamily: "'Space Grotesk', 'Plus Jakarta Sans'",
      style: 'Uppercase wide-tracked geometric engineering sans',
      weights: '600 (Semibold), 700 (Bold), 800 (Extrabold)',
      tracking: 'tracking-wider (0.08em) / tracking-widest (0.15em)',
      sample: 'MANAGING DIRECTORS & C-SUITE SEARCH',
    },
    {
      name: 'Body & Editorial',
      fontFamily: "'Inter', 'Public Sans'",
      style: 'Crisp neutral sans-serif with relaxed line-height (1.65)',
      weights: '400 (Regular), 500 (Medium)',
      tracking: 'normal (0em) / tight (-0.02em)',
      sample: 'MG Headhunting delivers precision-engineered executive search for manufacturers, distributors, and private equity investors across the Building Products sector.',
    },
    {
      name: 'Technical & Engineering Coordinate',
      fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
      style: 'Disciplined monospace for phase codes, deliverables, and indices',
      weights: '400 (Regular), 600 (Semibold)',
      tracking: 'tracking-widest (0.15em) / tracking-blueprint (0.28em)',
      sample: 'SPEC_01 // REF: MGH-RET-2026 // STAGE_01',
    },
  ];

  const geometrySpec = [
    {
      title: 'Border Radii',
      rule: 'Sharp to subtly architectural (rounded-none or max 2px). Strictly no pill badges or soft UI bubbles.',
      tokens: [
        { name: 'rounded-none', value: '0px', usage: 'Buttons, Cards, Inputs, Modals' },
        { name: 'rounded-sm', value: '2px', usage: 'Micro-accents & subtle indicators' },
      ],
    },
    {
      title: 'Structural Accents & Dividers',
      rule: 'Crisp 1px horizontal and vertical engineering lines (#D0D4D6) with 2px medium teal (#138D90) focus rules.',
      tokens: [
        { name: 'border-1 (hairline)', value: '1px solid #D0D4D6', usage: 'Card outlines, section splits' },
        { name: 'teal-rule', value: '2px solid #138D90', usage: 'Wordmark divider, active step markers' },
        { name: 'bg-blueprint', value: '32px grid @ 25% opacity', usage: 'Architectural canvas substrate' },
      ],
    },
    {
      title: 'Elevation & Shadow Philosophy',
      rule: 'Minimalist elevation (shadow-none or crisp 1px borders) rather than heavy organic drop shadows.',
      tokens: [
        { name: 'shadow-none', value: 'none', usage: 'Standard state' },
        { name: 'shadow-flat-steel', value: '3px 3px 0px #D0D4D6', usage: 'Engineered offset accent' },
      ],
    },
  ];

  const rawJsonTokens = {
    $schema: "https://design-tokens.github.io/community-group/format/",
    name: "MG Headhunting Design Tokens",
    version: "1.0.0",
    color: {
      brand: {
        navy: { primary: "#163A5F", text: "#0F243A", dark: "#07111D" },
        teal: { accent: "#138D90", hover: "#0D5F61", light: "#D2F5F6" },
        steel: { concrete: "#D0D4D6", subtle: "#E2E5E7", wash: "#F1F4F5" },
      },
      canvas: { white: "#FFFFFF", light: "#F8FAFB", dark: "#0F243A" },
    },
    typography: {
      display: "Space Grotesk, Plus Jakarta Sans, sans-serif",
      body: "Inter, Public Sans, sans-serif",
      mono: "JetBrains Mono, SF Mono, monospace",
    },
    radii: { default: "0px", architectural: "2px" },
    border: { hairline: "1px solid #D0D4D6", accent: "2px solid #138D90" },
  };

  return (
    <div className="py-12 bg-white border-b border-steel-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-steel-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="navy" size="sm">DESIGN SPECIFICATION</Badge>
              <Badge variant="teal" size="sm">DTCG / W3C STANDARD</Badge>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900 uppercase">
              Brand Tokens &amp; Architectural Specifications
            </h2>
            <p className="text-xs sm:text-sm text-steel-600">
              The foundational three-colour system, geometric typography, and architectural geometry for MG Headhunting.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 p-1 bg-steel-100 border border-steel-300">
            {[
              { id: 'colors', label: 'Palette Tokens', icon: Palette },
              { id: 'typography', label: 'Typography Spec', icon: Type },
              { id: 'geometry', label: 'Geometry & Rules', icon: Box },
              { id: 'json', label: 'tokens.json', icon: Code },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'text-steel-700 hover:text-navy-900 hover:bg-steel-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Colors */}
        {activeTab === 'colors' && (
          <div className="space-y-10">
            {colorPalettes.map((palette) => (
              <div key={palette.name} className="p-6 bg-canvas-light border border-steel-300">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 mb-4 border-b border-steel-200 gap-2">
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy-900">{palette.name}</h3>
                    <p className="text-xs text-steel-600">{palette.description}</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-teal-700 bg-white px-2 py-1 border border-steel-300">
                    Primary: {palette.primaryHex}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
                  {palette.shades.map((shade) => {
                    const isDark = shade.hex.startsWith('#0') || shade.hex.startsWith('#1') || shade.hex.startsWith('#2') || shade.hex.startsWith('#3') || shade.hex.startsWith('#4');
                    return (
                      <div
                        key={shade.name}
                        onClick={() => copyToClipboard(shade.hex, shade.name)}
                        className="group bg-white border border-steel-300 p-2.5 flex flex-col justify-between hover:border-navy-900 cursor-pointer transition-all rounded-none relative"
                      >
                        <div
                          className="w-full h-14 border border-steel-300/60 mb-2.5 flex items-end p-1.5"
                          style={{ backgroundColor: shade.hex }}
                        >
                          <span
                            className={`text-[9px] font-mono uppercase font-bold px-1 ${
                              isDark ? 'text-white/90 bg-black/30' : 'text-black/90 bg-white/70'
                            }`}
                          >
                            {shade.hex}
                          </span>
                        </div>

                        <div>
                          <div className="font-mono text-xs font-bold text-navy-900 truncate">
                            {shade.name}
                          </div>
                          <div className="text-[10px] text-steel-500 truncate">
                            {shade.label}
                          </div>
                          <div className="text-[9px] font-mono text-teal-700 mt-1 truncate">
                            {shade.role}
                          </div>
                        </div>

                        {copiedKey === shade.name && (
                          <div className="absolute inset-0 bg-navy-900/90 text-white flex items-center justify-center text-[10px] font-mono gap-1">
                            <Check className="w-3 h-3 text-teal-400" />
                            <span>Copied</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Typography */}
        {activeTab === 'typography' && (
          <div className="space-y-6">
            {typographySpec.map((item) => (
              <div key={item.name} className="p-6 bg-canvas-light border border-steel-300">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 mb-4 border-b border-steel-200 gap-2">
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy-900">{item.name}</h3>
                    <p className="text-xs text-steel-600">{item.style}</p>
                  </div>
                  <span className="font-mono text-xs text-teal-700 bg-white px-2 py-1 border border-steel-300">
                    {item.fontFamily}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-white border border-steel-200">
                    <div className="text-[10px] font-mono uppercase text-steel-500 mb-1">Specimen Rendering:</div>
                    <div className={`text-xl text-navy-900 ${item.name.includes('Display') ? 'font-display uppercase font-bold tracking-wider' : item.name.includes('Technical') ? 'font-mono' : 'font-sans'}`}>
                      {item.sample}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-steel-700">
                    <div className="p-2.5 bg-white border border-steel-200">
                      <strong>Weights:</strong> {item.weights}
                    </div>
                    <div className="p-2.5 bg-white border border-steel-200">
                      <strong>Tracking / Kerning:</strong> {item.tracking}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Geometry & Rules */}
        {activeTab === 'geometry' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {geometrySpec.map((spec) => (
              <div key={spec.title} className="p-6 bg-canvas-light border border-steel-300 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-navy-900 mb-1">{spec.title}</h3>
                  <p className="text-xs text-steel-600 mb-4">{spec.rule}</p>

                  <div className="space-y-2">
                    {spec.tokens.map((token) => (
                      <div key={token.name} className="p-2.5 bg-white border border-steel-200 text-xs">
                        <div className="font-mono font-bold text-navy-900">{token.name}</div>
                        <div className="font-mono text-[11px] text-teal-700">{token.value}</div>
                        <div className="text-[10px] text-steel-500 mt-1">{token.usage}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-steel-200 flex justify-end">
                  <span className="font-mono text-[10px] text-steel-500 uppercase">RULE: NON-ROUNDED</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: JSON Raw Specification */}
        {activeTab === 'json' && (
          <div className="p-6 bg-navy-900 text-white border border-navy-700">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-navy-700">
              <span className="font-mono text-xs text-teal-400 font-bold">
                tokens.json (W3C Standard Format)
              </span>
              <Button
                variant="primary"
                size="sm"
                icon={<Copy className="w-3.5 h-3.5" />}
                onClick={() => copyToClipboard(JSON.stringify(rawJsonTokens, null, 2), 'raw-json')}
              >
                {copiedKey === 'raw-json' ? 'Copied' : 'Copy JSON'}
              </Button>
            </div>

            <pre className="p-4 bg-navy-950 text-teal-300 font-mono text-xs overflow-x-auto border border-navy-800 leading-relaxed max-h-96">
              {JSON.stringify(rawJsonTokens, null, 2)}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
};
