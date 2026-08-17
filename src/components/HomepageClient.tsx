'use client';

import { useState } from 'react';
import { HeaderNav } from './sections/HeaderNav';
import { HeroSection } from './sections/HeroSection';
import { SectorMatrixSection } from './sections/SectorMatrixSection';
import { DifferenceSection } from './sections/DifferenceSection';
import { SearchProcessSection } from './sections/SearchProcessSection';
import { InsightsSection } from './sections/InsightsSection';
import { AboutPartnerSection } from './sections/AboutPartnerSection';
import { ContactFooterSection } from './sections/ContactFooterSection';
import { InitiateSearchModal } from './ui/InitiateSearchModal';
import { ArticleModal } from './ui/ArticleModal';
import { TokenExplorer } from './showcase/TokenExplorer';
import { ComponentPlayground } from './showcase/ComponentPlayground';
import { Layout, Palette, Box } from 'lucide-react';
import {
  SectorSpecialismFields,
  DifferencePillarFields,
  ProcessStepFields,
  InsightArticleFields,
} from '../lib/contentful/types';

export interface HomepageClientProps {
  specialisms?: SectorSpecialismFields[];
  differencePillars?: DifferencePillarFields[];
  processSteps?: ProcessStepFields[];
  insightArticles?: InsightArticleFields[];
}

export function HomepageClient({
  specialisms,
  differencePillars,
  processSteps,
  insightArticles,
}: HomepageClientProps) {
  const [currentView, setCurrentView] = useState<'homepage' | 'tokens' | 'components'>('homepage');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<InsightArticleFields | null>(null);

  const handleOpenSearchModal = (sector?: string) => {
    if (sector) {
      setSelectedSector(sector);
    }
    setIsSearchModalOpen(true);
  };

  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
    setSelectedSector(null);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-canvas-light text-navy-900 font-sans flex flex-col selection:bg-teal-600 selection:text-white">
      
      {/* Top Engineering Mode / Switcher Bar */}
      <div className="bg-navy-950 text-white border-b border-navy-800 py-1.5 px-4 sticky top-0 z-50 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-teal-400" />
            <span className="font-bold tracking-wider text-teal-300">MG HEADHUNTING (MGH)</span>
            <span className="text-steel-400 hidden md:inline">// NEXT.JS &amp; CONTENTFUL CMS PLATFORM</span>
          </div>

          <div className="flex items-center gap-1 bg-navy-900 p-0.5 border border-navy-700">
            <button
              onClick={() => setCurrentView('homepage')}
              className={`flex items-center gap-1.5 px-3 py-1 text-[11px] uppercase tracking-wider font-semibold transition-all ${
                currentView === 'homepage'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-steel-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <Layout className="w-3 h-3" />
              <span>Live Site</span>
            </button>

            <button
              onClick={() => setCurrentView('tokens')}
              className={`flex items-center gap-1.5 px-3 py-1 text-[11px] uppercase tracking-wider font-semibold transition-all ${
                currentView === 'tokens'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-steel-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <Palette className="w-3 h-3" />
              <span>Design Tokens</span>
            </button>

            <button
              onClick={() => setCurrentView('components')}
              className={`flex items-center gap-1.5 px-3 py-1 text-[11px] uppercase tracking-wider font-semibold transition-all ${
                currentView === 'components'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-steel-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <Box className="w-3 h-3" />
              <span>Component Kit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area based on Selected View */}
      {currentView === 'homepage' && (
        <>
          <HeaderNav
            onInitiateSearch={() => handleOpenSearchModal()}
          />

          <main className="flex-grow">
            <HeroSection
              onInitiateSearch={() => handleOpenSearchModal()}
              onExploreSpecialisms={() => scrollToSection('specialisms')}
            />

            <SectorMatrixSection
              specialisms={specialisms}
              onSelectSector={(sector) => handleOpenSearchModal(sector)}
            />

            <DifferenceSection
              pillars={differencePillars}
              onInitiateSearch={() => handleOpenSearchModal()}
            />

            <SearchProcessSection
              steps={processSteps}
            />

            <InsightsSection
              articles={insightArticles}
              onReadArticle={(article) => setSelectedArticle(article)}
              onRequestReport={() => handleOpenSearchModal('Executive Remuneration Benchmark')}
            />

            <AboutPartnerSection
              onInitiateSearch={() => handleOpenSearchModal()}
            />
          </main>

          <ContactFooterSection
            onInitiateSearch={() => handleOpenSearchModal()}
          />
        </>
      )}

      {currentView === 'tokens' && (
        <main className="flex-grow">
          <TokenExplorer />
        </main>
      )}

      {currentView === 'components' && (
        <main className="flex-grow">
          <ComponentPlayground
            onOpenSearchModal={() => handleOpenSearchModal()}
          />
        </main>
      )}

      {/* Retained Search Intake Modal */}
      <InitiateSearchModal
        isOpen={isSearchModalOpen}
        onClose={handleCloseSearchModal}
        defaultSector={selectedSector || undefined}
      />

      {/* Executive Briefing Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onInitiateSearch={() => {
          setSelectedArticle(null);
          handleOpenSearchModal();
        }}
      />
    </div>
  );
}
