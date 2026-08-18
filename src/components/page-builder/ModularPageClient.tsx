'use client';

import React, { useState } from 'react';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { ModularPageData, InsightArticleFields } from '../../lib/contentful/types';
import { HeaderNav } from '../sections/HeaderNav';
import { ContactFooterSection } from '../sections/ContactFooterSection';
import { PageSectionRenderer } from './PageSectionRenderer';
import { InitiateSearchModal } from '../ui/InitiateSearchModal';
import { ArticleModal } from '../ui/ArticleModal';

export interface ModularPageClientProps {
  data: ModularPageData;
}

export const ModularPageClient: React.FC<ModularPageClientProps> = ({ data: initialData }) => {
  const data = useContentfulLiveUpdates(initialData);
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

  const showHeader = data.showHeader !== false;
  const showFooter = data.showFooter !== false;

  return (
    <div className="min-h-screen bg-canvas-light text-navy-900 font-sans flex flex-col selection:bg-teal-600 selection:text-white">
      
      {/* Consistent Header Navigation */}
      {showHeader && (
        <HeaderNav
          navLinks={data.siteSettings.navLinks}
          directEmail={data.siteSettings.primaryEmail}
          siteName={data.siteSettings.siteName}
          tagline={data.siteSettings.tagline}
          onInitiateSearch={() => handleOpenSearchModal()}
        />
      )}

      {/* Main Dynamic Sections */}
      <main className="flex-grow">
        {data.sections && data.sections.length > 0 ? (
          data.sections.map((section, idx) => (
            <PageSectionRenderer
              key={`${section.type}-${idx}`}
              section={section}
              onInitiateSearch={(sector) => handleOpenSearchModal(sector)}
              onReadArticle={(article) => setSelectedArticle(article)}
            />
          ))
        ) : (
          <div className="py-24 text-center">
            <p className="text-steel-500 font-mono text-sm">
              No sections configured for this page.
            </p>
          </div>
        )}
      </main>

      {/* Consistent Contact Footer */}
      {showFooter && (
        <ContactFooterSection
          data={{
            bannerOverline: 'RETAINED SEARCH ADVISORY',
            bannerTitle: 'Commission a Board or Executive Search Mandate',
            bannerSubtitle: 'Discuss your talent requirements in strict confidence with Managing Partner Mark Goldsmith.',
            bannerCtaText: 'Initiate Search Mandate',
            ndaTitle: 'Strict Non-Disclosure Notice',
            ndaStatement: 'All initial discussions and client briefings are conducted under absolute confidentiality and strict non-disclosure.',
            siteDescription: data.siteSettings.tagline || 'Boutique retained executive search delivering Board, Managing Director, and C-Suite appointments across the UK and European Building Products and Built Environment sectors.',
            directDeskEmail: data.siteSettings.primaryEmail,
            headquarters: data.siteSettings.headquarters || 'London & Midlands, United Kingdom',
            responseGuarantee: 'Immediate Direct Partner Response',
            complianceNotice: 'Registered with the Information Commissioner’s Office (ICO). AESC Code of Professional Practice compliant.',
            copyright: data.siteSettings.copyrightText,
            navLinks: data.siteSettings.navLinks,
            footerSpecialisms: data.siteSettings.footerSpecialisms,
            footerSubSectors: data.siteSettings.footerSubSectors,
            linkedinUrl: data.siteSettings.linkedinUrl || 'https://www.linkedin.com',
          }}
          onInitiateSearch={() => handleOpenSearchModal()}
        />
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
};
