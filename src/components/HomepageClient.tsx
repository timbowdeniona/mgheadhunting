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
import {
  HomepageContentfulData,
  InsightArticleFields,
} from '../lib/contentful/types';

export interface HomepageClientProps {
  data: HomepageContentfulData;
}

export function HomepageClient({ data }: HomepageClientProps) {
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
      
      {/* Navigation - 100% Supplied from Contentful */}
      <HeaderNav
        navLinks={data.siteSettings.navLinks}
        directEmail={data.siteSettings.primaryEmail}
        siteName={data.siteSettings.siteName}
        tagline={data.siteSettings.tagline}
        onInitiateSearch={() => handleOpenSearchModal()}
      />

      {/* Main Content Sections - 100% Supplied from Contentful */}
      <main className="flex-grow">
        <HeroSection
          data={data.hero}
          onInitiateSearch={() => handleOpenSearchModal()}
          onExploreSpecialisms={() => scrollToSection('specialisms')}
        />

        <SectorMatrixSection
          data={data.sectorMatrix}
          specialisms={data.sectorMatrix.specialisms}
          onSelectSector={(sector) => handleOpenSearchModal(sector)}
        />

        <DifferenceSection
          data={data.difference}
          pillars={data.difference.pillars}
          onInitiateSearch={() => handleOpenSearchModal()}
        />

        <SearchProcessSection
          data={data.process}
          steps={data.process.steps}
        />

        <InsightsSection
          data={data.insights}
          articles={data.insights.articles}
          onReadArticle={(article) => setSelectedArticle(article)}
          onRequestReport={() => handleOpenSearchModal('Executive Remuneration Benchmark')}
        />

        <AboutPartnerSection
          data={data.aboutPartner}
          onInitiateSearch={() => handleOpenSearchModal()}
        />
      </main>

      {/* Footer - 100% Supplied from Contentful */}
      <ContactFooterSection
        data={data.contactFooter}
        onInitiateSearch={() => handleOpenSearchModal()}
      />

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
