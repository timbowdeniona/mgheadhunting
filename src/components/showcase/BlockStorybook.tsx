'use client';

import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Code,
  Sliders,
  FileJson,
  Layers,
  Sparkles,
  Info,
  ExternalLink,
  Laptop,
} from 'lucide-react';
import { BLOCK_CATALOG, BlockMeta } from './storybookPresets';
import { PageSectionBlock } from '../../lib/contentful/types';
import { PageSectionRenderer } from '../page-builder/PageSectionRenderer';

export interface BlockStorybookProps {
  onOpenSearchModal?: () => void;
  onOpenArticleModal?: (article: any) => void;
}

type ViewportSize = 'desktop' | 'laptop' | 'tablet' | 'mobile';
type CanvasBg = 'canvas' | 'white' | 'navy' | 'grid';
type ControlTab = 'controls' | 'json' | 'jsx' | 'schema';
type WorkbenchMode = 'single' | 'assembler';

export const BlockStorybook: React.FC<BlockStorybookProps> = ({
  onOpenSearchModal,
  onOpenArticleModal,
}) => {
  // Navigation & Mode
  const [workbenchMode, setWorkbenchMode] = useState<WorkbenchMode>('single');
  const [selectedBlockId, setSelectedBlockId] = useState<string>('pageHeader');

  // Active Block State & Props
  const selectedMeta = BLOCK_CATALOG.find((b) => b.id === selectedBlockId) || BLOCK_CATALOG[0];
  const [currentProps, setCurrentProps] = useState<PageSectionBlock>(selectedMeta.defaultProps);

  // Assembled Page Mode State
  const [assembledBlocks, setAssembledBlocks] = useState<PageSectionBlock[]>([
    BLOCK_CATALOG[0].defaultProps,
    BLOCK_CATALOG[2].defaultProps,
    BLOCK_CATALOG[9].defaultProps,
  ]);

  // Canvas Viewport & Theme Controls
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [canvasBg, setCanvasBg] = useState<CanvasBg>('canvas');
  const [activeTab, setActiveTab] = useState<ControlTab>('controls');
  const [copied, setCopied] = useState<string | null>(null);

  // Switch Selected Block
  const handleSelectBlock = (meta: BlockMeta) => {
    setSelectedBlockId(meta.id);
    setCurrentProps(JSON.parse(JSON.stringify(meta.defaultProps)));
  };

  // Load Variant Preset
  const handleLoadVariant = (variantProps: PageSectionBlock) => {
    setCurrentProps(JSON.parse(JSON.stringify(variantProps)));
  };

  // Reset to Default
  const handleResetProps = () => {
    setCurrentProps(JSON.parse(JSON.stringify(selectedMeta.defaultProps)));
  };

  // Update a single field in currentProps
  const updateField = (field: string, value: any) => {
    setCurrentProps((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  // Get Viewport Width CSS
  const getViewportWidthClass = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-[375px] shadow-2xl border-x border-steel-300';
      case 'tablet':
        return 'max-w-[768px] shadow-2xl border-x border-steel-300';
      case 'laptop':
        return 'max-w-[1024px] shadow-xl';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  // Canvas Background Style
  const getCanvasBgClass = () => {
    switch (canvasBg) {
      case 'white':
        return 'bg-white';
      case 'navy':
        return 'bg-navy-950 text-white';
      case 'grid':
        return 'bg-canvas-light bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]';
      case 'canvas':
      default:
        return 'bg-canvas-light';
    }
  };

  // Render Form Knobs for the selected component
  const renderPropControls = () => {
    const p = currentProps as any;

    return (
      <div className="space-y-5 text-xs">
        {/* Preset Selector */}
        {selectedMeta.variants && selectedMeta.variants.length > 0 && (
          <div className="p-3 bg-navy-900 text-white space-y-2 border border-navy-700">
            <span className="font-mono text-[10px] text-teal-400 uppercase tracking-widest block font-bold">
              PRESET VARIANTS
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={handleResetProps}
                className="px-2 py-1 bg-navy-800 hover:bg-navy-700 text-white font-sans text-xs border border-navy-600 transition-colors"
              >
                Default Spec
              </button>
              {selectedMeta.variants.map((v, i) => (
                <button
                  key={i}
                  onClick={() => handleLoadVariant(v.props)}
                  className="px-2 py-1 bg-navy-800 hover:bg-teal-700 text-white font-sans text-xs border border-navy-600 transition-colors"
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 1. Page Header Controls */}
        {currentProps.type === 'pageHeader' && (
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Badge</label>
              <input
                type="text"
                value={p.badge || ''}
                onChange={(e) => updateField('badge', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Overline</label>
              <input
                type="text"
                value={p.overline || ''}
                onChange={(e) => updateField('overline', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Headline Prefix</label>
              <input
                type="text"
                value={p.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Highlighted Phrase</label>
              <input
                type="text"
                value={p.highlightedPhrase || ''}
                onChange={(e) => updateField('highlightedPhrase', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none text-teal-400 font-semibold"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Subtitle</label>
              <textarea
                rows={3}
                value={p.subtitle || ''}
                onChange={(e) => updateField('subtitle', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Coordinate</label>
              <input
                type="text"
                value={p.coordinate || ''}
                onChange={(e) => updateField('coordinate', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none font-mono"
              />
            </div>
          </div>
        )}

        {/* 2. Metrics & Stats Controls */}
        {currentProps.type === 'metricsStats' && (
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Section Label</label>
              <input
                type="text"
                value={p.sectionLabel || ''}
                onChange={(e) => updateField('sectionLabel', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Section Title</label>
              <input
                type="text"
                value={p.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Subtitle</label>
              <textarea
                rows={2}
                value={p.subtitle || ''}
                onChange={(e) => updateField('subtitle', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>

            {/* Dynamic Metric Cards List */}
            <div className="pt-2 border-t border-navy-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-steel-300 font-bold">
                  METRIC CARDS ({p.stats?.length || 0})
                </span>
                <button
                  onClick={() => {
                    const newStats = [
                      ...(p.stats || []),
                      { label: 'New Metric', value: '99%', description: 'Verified audit note', tag: 'CUSTOM' },
                    ];
                    updateField('stats', newStats);
                  }}
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-teal-400 hover:text-teal-300 bg-navy-800 px-2 py-0.5"
                >
                  <Plus className="w-3 h-3" /> Add Metric
                </button>
              </div>

              <div className="space-y-3">
                {p.stats?.map((stat: any, idx: number) => (
                  <div key={idx} className="p-2.5 bg-navy-900 border border-navy-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-teal-400">CARD #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const newStats = p.stats.filter((_: any, i: number) => i !== idx);
                          updateField('stats', newStats);
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Value (e.g. 100%)"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...p.stats];
                          newStats[idx].value = e.target.value;
                          updateField('stats', newStats);
                        }}
                        className="bg-navy-950 text-white border border-navy-800 px-2 py-1 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Tag (e.g. AUDIT)"
                        value={stat.tag || ''}
                        onChange={(e) => {
                          const newStats = [...p.stats];
                          newStats[idx].tag = e.target.value;
                          updateField('stats', newStats);
                        }}
                        className="bg-navy-950 text-white border border-navy-800 px-2 py-1 text-xs font-mono"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Label"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...p.stats];
                        newStats[idx].label = e.target.value;
                        updateField('stats', newStats);
                      }}
                      className="w-full bg-navy-950 text-white border border-navy-800 px-2 py-1 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={stat.description || ''}
                      onChange={(e) => {
                        const newStats = [...p.stats];
                        newStats[idx].description = e.target.value;
                        updateField('stats', newStats);
                      }}
                      className="w-full bg-navy-950 text-white border border-navy-800 px-2 py-1 text-xs text-steel-400"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. CTA Banner Controls */}
        {currentProps.type === 'ctaBanner' && (
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Theme Variant</label>
              <select
                value={p.variant || 'navy'}
                onChange={(e) => updateField('variant', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              >
                <option value="navy">Navy (Solid Midnight)</option>
                <option value="blueprint">Blueprint (Teal Accent)</option>
                <option value="outline">Outline (White / Architectural Border)</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Overline</label>
              <input
                type="text"
                value={p.overline || ''}
                onChange={(e) => updateField('overline', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Headline</label>
              <input
                type="text"
                value={p.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Description</label>
              <textarea
                rows={2}
                value={p.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Primary CTA Text</label>
                <input
                  type="text"
                  value={p.primaryCtaText || ''}
                  onChange={(e) => updateField('primaryCtaText', e.target.value)}
                  className="w-full bg-navy-950 text-white border border-navy-800 px-2 py-1 text-xs"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Action</label>
                <select
                  value={p.primaryCtaAction || 'searchModal'}
                  onChange={(e) => updateField('primaryCtaAction', e.target.value)}
                  className="w-full bg-navy-950 text-white border border-navy-800 px-2 py-1 text-xs"
                >
                  <option value="searchModal">Open Search Modal</option>
                  <option value="link">Direct URL Link</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Secondary CTA Text</label>
              <input
                type="text"
                value={p.secondaryCtaText || ''}
                onChange={(e) => updateField('secondaryCtaText', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Guarantee Sub-notice</label>
              <input
                type="text"
                value={p.guaranteeNotice || ''}
                onChange={(e) => updateField('guaranteeNotice', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none font-mono text-[11px]"
              />
            </div>
          </div>
        )}

        {/* 4. FAQ Accordion Controls */}
        {currentProps.type === 'faqAccordion' && (
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Section Label</label>
              <input
                type="text"
                value={p.sectionLabel || ''}
                onChange={(e) => updateField('sectionLabel', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Section Title</label>
              <input
                type="text"
                value={p.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Description</label>
              <textarea
                rows={2}
                value={p.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>

            {/* Dynamic FAQ Items */}
            <div className="pt-2 border-t border-navy-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-steel-300 font-bold">
                  FAQ QUESTIONS ({p.items?.length || 0})
                </span>
                <button
                  onClick={() => {
                    const newItems = [
                      ...(p.items || []),
                      { category: 'GENERAL', question: 'New Question Here?', answer: 'Detailed response here.' },
                    ];
                    updateField('items', newItems);
                  }}
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-teal-400 hover:text-teal-300 bg-navy-800 px-2 py-0.5"
                >
                  <Plus className="w-3 h-3" /> Add Question
                </button>
              </div>

              <div className="space-y-3">
                {p.items?.map((item: any, idx: number) => (
                  <div key={idx} className="p-2.5 bg-navy-900 border border-navy-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-teal-400">QUESTION #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const newItems = p.items.filter((_: any, i: number) => i !== idx);
                          updateField('items', newItems);
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Category (e.g. SCOPING)"
                      value={item.category || ''}
                      onChange={(e) => {
                        const newItems = [...p.items];
                        newItems[idx].category = e.target.value;
                        updateField('items', newItems);
                      }}
                      className="w-full bg-navy-950 text-white border border-navy-800 px-2 py-1 text-xs font-mono"
                    />
                    <input
                      type="text"
                      placeholder="Question"
                      value={item.question}
                      onChange={(e) => {
                        const newItems = [...p.items];
                        newItems[idx].question = e.target.value;
                        updateField('items', newItems);
                      }}
                      className="w-full bg-navy-950 text-white border border-navy-800 px-2 py-1 text-xs font-semibold"
                    />
                    <textarea
                      rows={2}
                      placeholder="Answer"
                      value={item.answer}
                      onChange={(e) => {
                        const newItems = [...p.items];
                        newItems[idx].answer = e.target.value;
                        updateField('items', newItems);
                      }}
                      className="w-full bg-navy-950 text-white border border-navy-800 px-2 py-1 text-xs text-steel-400"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. Editorial Rich Text Controls */}
        {currentProps.type === 'editorialRichText' && (
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Layout Variant</label>
              <select
                value={p.layout || 'sidebar'}
                onChange={(e) => updateField('layout', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              >
                <option value="sidebar">Sidebar (Quote + Key Takeaways Column)</option>
                <option value="two-column">Two Column Layout</option>
                <option value="single-column">Single Column Centered</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Section Label</label>
              <input
                type="text"
                value={p.sectionLabel || ''}
                onChange={(e) => updateField('sectionLabel', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Title</label>
              <input
                type="text"
                value={p.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Subtitle</label>
              <input
                type="text"
                value={p.subtitle || ''}
                onChange={(e) => updateField('subtitle', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Lead Intro Paragraph</label>
              <textarea
                rows={3}
                value={p.leadParagraph || ''}
                onChange={(e) => updateField('leadParagraph', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Pull Quote</label>
              <textarea
                rows={2}
                value={p.quoteText || ''}
                onChange={(e) => updateField('quoteText', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none italic"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Quote Author"
                value={p.quoteAuthor || ''}
                onChange={(e) => updateField('quoteAuthor', e.target.value)}
                className="bg-navy-950 text-white border border-navy-800 px-2 py-1 text-xs"
              />
              <input
                type="text"
                placeholder="Quote Role"
                value={p.quoteRole || ''}
                onChange={(e) => updateField('quoteRole', e.target.value)}
                className="bg-navy-950 text-white border border-navy-800 px-2 py-1 text-xs"
              />
            </div>
          </div>
        )}

        {/* 6. Contact Desk Controls */}
        {currentProps.type === 'contactDesk' && (
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Section Label</label>
              <input
                type="text"
                value={p.sectionLabel || ''}
                onChange={(e) => updateField('sectionLabel', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Title</label>
              <input
                type="text"
                value={p.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Description</label>
              <textarea
                rows={2}
                value={p.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Direct Email</label>
              <input
                type="text"
                value={p.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Direct Phone</label>
              <input
                type="text"
                value={p.phone || ''}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Headquarters</label>
              <input
                type="text"
                value={p.headquarters || ''}
                onChange={(e) => updateField('headquarters', e.target.value)}
                className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* 7. Generic Fallback Header / Section Controls for other blocks */}
        {['hero', 'sectorGrid', 'differencePillars', 'processTimeline', 'insightsTeaser', 'teamProfile'].includes(currentProps.type) && (
          <div className="space-y-4">
            {p.sectionLabel !== undefined && (
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Section Label</label>
                <input
                  type="text"
                  value={p.sectionLabel || ''}
                  onChange={(e) => updateField('sectionLabel', e.target.value)}
                  className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
                />
              </div>
            )}
            {p.badge !== undefined && (
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Badge</label>
                <input
                  type="text"
                  value={p.badge || ''}
                  onChange={(e) => updateField('badge', e.target.value)}
                  className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
                />
              </div>
            )}
            {p.title !== undefined && (
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Title</label>
                <input
                  type="text"
                  value={p.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
                />
              </div>
            )}
            {p.headline !== undefined && (
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Headline</label>
                <input
                  type="text"
                  value={p.headline || ''}
                  onChange={(e) => updateField('headline', e.target.value)}
                  className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
                />
              </div>
            )}
            {p.description !== undefined && (
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={p.description || ''}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
                />
              </div>
            )}
            {p.partnerName !== undefined && (
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1">Partner Name</label>
                <input
                  type="text"
                  value={p.partnerName || ''}
                  onChange={(e) => updateField('partnerName', e.target.value)}
                  className="w-full bg-navy-950 text-white border border-navy-800 px-2.5 py-1.5 focus:border-teal-500 focus:outline-none"
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Generate JSX Code Snippet
  const getGeneratedJsx = () => {
    return `<PageSectionRenderer\n  section={${JSON.stringify(currentProps, null, 2)}}\n  onOpenSearchModal={handleOpenSearchModal}\n/>`;
  };

  // Group catalog by category
  const categories = ['Headers & Heroes', 'Performance & Proof', 'Structure & Process', 'Editorial & Content', 'Advisory & Conversion'] as const;

  return (
    <div className="min-h-screen bg-navy-950 text-white flex flex-col">
      {/* Top Storybook Header & Mode Bar */}
      <div className="bg-navy-900 border-b border-navy-800 px-4 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-teal-600/20 border border-teal-500/40 text-teal-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-sm tracking-wide uppercase text-white">
                MGH Block Storybook & Workbench
              </h1>
              <span className="px-1.5 py-0.5 font-mono text-[9px] bg-teal-900/60 text-teal-300 border border-teal-700/50">
                LIVE INTERACTION
              </span>
            </div>
            <p className="text-[11px] text-steel-400 font-sans">
              Client-side component sandbox, prop knobs, and modular page composer
            </p>
          </div>
        </div>

        {/* Mode Switcher: Single Block vs Page Assembler */}
        <div className="flex items-center gap-1 bg-navy-950 p-1 border border-navy-800">
          <button
            onClick={() => setWorkbenchMode('single')}
            className={`px-3 py-1 text-xs font-mono font-medium transition-colors ${
              workbenchMode === 'single'
                ? 'bg-teal-600 text-white'
                : 'text-steel-400 hover:text-white'
            }`}
          >
            Single Block Sandbox
          </button>
          <button
            onClick={() => setWorkbenchMode('assembler')}
            className={`px-3 py-1 text-xs font-mono font-medium transition-colors flex items-center gap-1.5 ${
              workbenchMode === 'assembler'
                ? 'bg-teal-600 text-white'
                : 'text-steel-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Page Assembler ({assembledBlocks.length})</span>
          </button>
        </div>

        {/* Viewport & Canvas Toolbar */}
        <div className="flex items-center gap-3">
          {/* Viewport buttons */}
          <div className="flex items-center bg-navy-950 border border-navy-800 p-0.5">
            <button
              onClick={() => setViewport('desktop')}
              title="Desktop 100%"
              className={`p-1.5 transition-colors ${
                viewport === 'desktop' ? 'bg-navy-800 text-teal-400' : 'text-steel-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('laptop')}
              title="Laptop (1024px)"
              className={`p-1.5 transition-colors ${
                viewport === 'laptop' ? 'bg-navy-800 text-teal-400' : 'text-steel-400 hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('tablet')}
              title="Tablet (768px)"
              className={`p-1.5 transition-colors ${
                viewport === 'tablet' ? 'bg-navy-800 text-teal-400' : 'text-steel-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              title="Mobile (375px)"
              className={`p-1.5 transition-colors ${
                viewport === 'mobile' ? 'bg-navy-800 text-teal-400' : 'text-steel-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Background switcher */}
          <div className="flex items-center bg-navy-950 border border-navy-800 p-0.5 text-[10px] font-mono">
            <button
              onClick={() => setCanvasBg('canvas')}
              className={`px-2 py-1 transition-colors ${
                canvasBg === 'canvas' ? 'bg-navy-800 text-teal-400' : 'text-steel-400 hover:text-white'
              }`}
            >
              Canvas
            </button>
            <button
              onClick={() => setCanvasBg('grid')}
              className={`px-2 py-1 transition-colors ${
                canvasBg === 'grid' ? 'bg-navy-800 text-teal-400' : 'text-steel-400 hover:text-white'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setCanvasBg('white')}
              className={`px-2 py-1 transition-colors ${
                canvasBg === 'white' ? 'bg-navy-800 text-teal-400' : 'text-steel-400 hover:text-white'
              }`}
            >
              White
            </button>
            <button
              onClick={() => setCanvasBg('navy')}
              className={`px-2 py-1 transition-colors ${
                canvasBg === 'navy' ? 'bg-navy-800 text-teal-400' : 'text-steel-400 hover:text-white'
              }`}
            >
              Navy
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Component Catalog */}
        <aside className="w-64 bg-navy-900 border-r border-navy-800 flex flex-col overflow-y-auto shrink-0">
          <div className="p-3 border-b border-navy-800">
            <span className="font-mono text-[10px] text-teal-400 uppercase tracking-widest block font-bold">
              BLOCK DIRECTORY ({BLOCK_CATALOG.length})
            </span>
          </div>

          <div className="p-2 space-y-4">
            {categories.map((cat) => {
              const blocks = BLOCK_CATALOG.filter((b) => b.category === cat);
              return (
                <div key={cat} className="space-y-1">
                  <span className="px-2 font-mono text-[9px] text-steel-400 tracking-wider uppercase font-semibold">
                    {cat}
                  </span>
                  <div className="space-y-0.5">
                    {blocks.map((block) => {
                      const isSelected = selectedBlockId === block.id && workbenchMode === 'single';
                      return (
                        <button
                          key={block.id}
                          onClick={() => {
                            setWorkbenchMode('single');
                            handleSelectBlock(block);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-xs font-sans transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-teal-600 text-white font-semibold'
                              : 'text-steel-300 hover:bg-navy-800 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{block.name}</span>
                          <span className="font-mono text-[9px] opacity-60 ml-1 shrink-0">
                            {block.type}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Center: Live Render Canvas */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-navy-950/80 p-4 lg:p-6 items-center">
          {/* Component Info Card / Toolbar */}
          <div className="w-full max-w-5xl mb-4 bg-navy-900 border border-navy-800 p-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] bg-teal-950 text-teal-400 border border-teal-800/80 px-2 py-0.5 uppercase">
                {workbenchMode === 'single' ? selectedMeta.contentfulModel : `PAGE STACK (${assembledBlocks.length} BLOCKS)`}
              </span>
              <h2 className="font-display font-bold text-sm text-white">
                {workbenchMode === 'single' ? selectedMeta.name : 'Multi-Block Page Composition'}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-steel-400">
              <span>Viewport: <strong className="text-teal-400 uppercase">{viewport}</strong></span>
              <span>•</span>
              <button
                onClick={handleResetProps}
                className="inline-flex items-center gap-1 text-steel-400 hover:text-white transition-colors"
                title="Reset to component default"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>
          </div>

          {/* Canvas Wrapper */}
          <div className={`transition-all duration-300 flex-1 overflow-x-hidden ${getViewportWidthClass()} ${getCanvasBgClass()}`}>
            {workbenchMode === 'single' ? (
              <div className="p-0 border border-steel-200/50 shadow-sm">
                <PageSectionRenderer
                  section={currentProps}
                  onOpenSearchModal={onOpenSearchModal}
                  onOpenArticleModal={onOpenArticleModal}
                />
              </div>
            ) : (
              <div className="space-y-0 border border-steel-200/50 shadow-sm divide-y divide-steel-200/30">
                {assembledBlocks.map((block, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute top-2 left-2 z-20 bg-navy-950/80 backdrop-blur text-white px-2 py-0.5 font-mono text-[9px] border border-navy-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      #{idx + 1} {block.type}
                    </div>
                    <PageSectionRenderer
                      section={block}
                      onOpenSearchModal={onOpenSearchModal}
                      onOpenArticleModal={onOpenArticleModal}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar: Interactive Controls & Code Inspector */}
        <aside className="w-80 lg:w-96 bg-navy-900 border-l border-navy-800 flex flex-col shrink-0">
          {/* Tab Selector */}
          <div className="flex border-b border-navy-800 bg-navy-950 text-xs font-mono">
            {workbenchMode === 'single' ? (
              <>
                <button
                  onClick={() => setActiveTab('controls')}
                  className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
                    activeTab === 'controls'
                      ? 'bg-navy-900 text-teal-400 border-b-2 border-teal-500 font-semibold'
                      : 'text-steel-400 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" /> Knobs
                </button>
                <button
                  onClick={() => setActiveTab('json')}
                  className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
                    activeTab === 'json'
                      ? 'bg-navy-900 text-teal-400 border-b-2 border-teal-500 font-semibold'
                      : 'text-steel-400 hover:text-white'
                  }`}
                >
                  <FileJson className="w-3.5 h-3.5" /> JSON
                </button>
                <button
                  onClick={() => setActiveTab('jsx')}
                  className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
                    activeTab === 'jsx'
                      ? 'bg-navy-900 text-teal-400 border-b-2 border-teal-500 font-semibold'
                      : 'text-steel-400 hover:text-white'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" /> JSX
                </button>
              </>
            ) : (
              <div className="py-2.5 px-4 font-mono text-xs font-bold text-teal-400 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" /> Page Block Stack Manager
              </div>
            )}
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 overflow-y-auto p-4">
            {workbenchMode === 'single' ? (
              <>
                {/* 1. Form Knobs */}
                {activeTab === 'controls' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-navy-800">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-steel-400 font-bold">
                        PROPERTIES & KNOBS
                      </span>
                      <button
                        onClick={handleResetProps}
                        className="text-[10px] font-mono text-steel-400 hover:text-teal-400"
                      >
                        Reset Defaults
                      </button>
                    </div>
                    {renderPropControls()}
                  </div>
                )}

                {/* 2. JSON Payload */}
                {activeTab === 'json' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-steel-400 uppercase tracking-wider">
                        CONTENTFUL COMPONENT JSON
                      </span>
                      <button
                        onClick={() => handleCopy(JSON.stringify(currentProps, null, 2), 'json')}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-teal-400 hover:text-white bg-navy-800 px-2 py-1 border border-navy-700"
                      >
                        {copied === 'json' ? <Check className="w-3 h-3 text-teal-400" /> : <Copy className="w-3 h-3" />}
                        {copied === 'json' ? 'Copied' : 'Copy JSON'}
                      </button>
                    </div>
                    <pre className="bg-navy-950 p-3 text-[11px] font-mono text-teal-300 border border-navy-800 overflow-x-auto whitespace-pre-wrap">
                      {JSON.stringify(currentProps, null, 2)}
                    </pre>
                  </div>
                )}

                {/* 3. React JSX Snippet */}
                {activeTab === 'jsx' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-steel-400 uppercase tracking-wider">
                        REACT JSX USAGE
                      </span>
                      <button
                        onClick={() => handleCopy(getGeneratedJsx(), 'jsx')}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-teal-400 hover:text-white bg-navy-800 px-2 py-1 border border-navy-700"
                      >
                        {copied === 'jsx' ? <Check className="w-3 h-3 text-teal-400" /> : <Copy className="w-3 h-3" />}
                        {copied === 'jsx' ? 'Copied' : 'Copy JSX'}
                      </button>
                    </div>
                    <pre className="bg-navy-950 p-3 text-[11px] font-mono text-steel-300 border border-navy-800 overflow-x-auto">
                      {getGeneratedJsx()}
                    </pre>
                  </div>
                )}
              </>
            ) : (
              /* Page Assembler Stack Manager */
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-navy-800">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-steel-400 font-bold">
                    ACTIVE PAGE BLOCKS ({assembledBlocks.length})
                  </span>
                  <button
                    onClick={() => handleCopy(JSON.stringify(assembledBlocks, null, 2), 'stack')}
                    className="inline-flex items-center gap-1 text-[10px] font-mono text-teal-400 hover:text-white bg-navy-800 px-2 py-0.5"
                  >
                    {copied === 'stack' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    Copy Full Page JSON
                  </button>
                </div>

                {/* Stack Items */}
                <div className="space-y-2">
                  {assembledBlocks.map((blk, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-navy-950 border border-navy-800 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="font-mono text-[10px] text-teal-400 shrink-0">#{i + 1}</span>
                        <div className="truncate">
                          <span className="font-sans text-xs font-semibold text-white block truncate">
                            {BLOCK_CATALOG.find((b) => b.type === blk.type)?.name || blk.type}
                          </span>
                          <span className="font-mono text-[9px] text-steel-500 uppercase">{blk.type}</span>
                        </div>
                      </div>

                      {/* Reorder / Delete Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          disabled={i === 0}
                          onClick={() => {
                            if (i === 0) return;
                            const next = [...assembledBlocks];
                            const temp = next[i];
                            next[i] = next[i - 1];
                            next[i - 1] = temp;
                            setAssembledBlocks(next);
                          }}
                          className="p-1 text-steel-400 hover:text-white disabled:opacity-30"
                          title="Move Up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={i === assembledBlocks.length - 1}
                          onClick={() => {
                            if (i === assembledBlocks.length - 1) return;
                            const next = [...assembledBlocks];
                            const temp = next[i];
                            next[i] = next[i + 1];
                            next[i + 1] = temp;
                            setAssembledBlocks(next);
                          }}
                          className="p-1 text-steel-400 hover:text-white disabled:opacity-30"
                          title="Move Down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setAssembledBlocks(assembledBlocks.filter((_, idx) => idx !== i));
                          }}
                          className="p-1 text-red-400 hover:text-red-300 ml-1"
                          title="Delete Block"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Block to Stack Dropdown */}
                <div className="pt-2 border-t border-navy-800">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-steel-400 mb-1.5">
                    APPEND COMPONENT BLOCK
                  </label>
                  <div className="grid grid-cols-1 gap-1">
                    {BLOCK_CATALOG.map((catBlock) => (
                      <button
                        key={catBlock.id}
                        onClick={() => {
                          setAssembledBlocks([...assembledBlocks, JSON.parse(JSON.stringify(catBlock.defaultProps))]);
                        }}
                        className="text-left px-2.5 py-1.5 bg-navy-950 hover:bg-teal-900/60 border border-navy-800 text-steel-300 hover:text-white text-xs font-sans flex items-center justify-between transition-colors"
                      >
                        <span>{catBlock.name}</span>
                        <Plus className="w-3 h-3 text-teal-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
