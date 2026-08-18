'use client';

import React from 'react';
import {
  PageSectionBlock,
  InsightArticleFields,
  SectorSpecialismFields,
  DifferencePillarFields,
  ProcessStepFields,
  HeroSectionData,
  SectorMatrixSectionData,
  DifferenceSectionData,
  SearchProcessSectionData,
  InsightsSectionData,
  AboutPartnerSectionData,
} from '../../lib/contentful/types';

import { HeroSection } from '../sections/HeroSection';
import { SectorMatrixSection } from '../sections/SectorMatrixSection';
import { DifferenceSection } from '../sections/DifferenceSection';
import { SearchProcessSection } from '../sections/SearchProcessSection';
import { InsightsSection } from '../sections/InsightsSection';
import { AboutPartnerSection } from '../sections/AboutPartnerSection';

import { PageHeaderBlock } from './PageHeaderBlock';
import { EditorialRichTextBlock } from './EditorialRichTextBlock';
import { MetricsStatsBlock } from './MetricsStatsBlock';
import { FaqAccordionBlock } from './FaqAccordionBlock';
import { CtaBannerBlock } from './CtaBannerBlock';
import { ContactDeskBlock } from './ContactDeskBlock';

export interface PageSectionRendererProps {
  section: PageSectionBlock;
  onInitiateSearch: (sector?: string) => void;
  onReadArticle?: (article: InsightArticleFields) => void;
}

export const PageSectionRenderer: React.FC<PageSectionRendererProps> = ({
  section,
  onInitiateSearch,
  onReadArticle,
}) => {
  switch (section.type) {
    case 'pageHeader':
      return <PageHeaderBlock data={section} />;

    case 'hero': {
      const heroData: HeroSectionData = {
        badgeOverline: section.badgeOverline || 'MEMBER // THE AESC & RSA EXECUTIVE SEARCH NETWORK',
        badgeCategory: section.badgeCategory || 'EXCLUSIVE RETAINED SEARCH',
        headline: section.headline || 'Bespoke Executive Search for Building Products & Construction',
        highlightedPhrase: section.highlightedPhrase || 'Precision-Appointed Leadership for Heavy Building Materials, HVAC, and Construction Technologies.',
        subtitle: section.subtitle || 'Delivering C-Suite, Managing Directors, and Functional Leaders across the UK and Europe. Partner-led, rigorously assessed, and strictly confidential.',
        keyValues: section.keyValues || [
          'Direct Partner Delivery',
          '3-Tier Scientific Assessment',
          '12-Month Placement Guarantee',
          'Strict Non-Disclosure',
        ],
        ctaPrimaryText: section.ctaPrimaryText || 'Initiate Retained Mandate',
        ctaSecondaryText: section.ctaSecondaryText || 'Explore Sector Specialisms',
        complianceNotice: section.complianceNotice || 'All mandates executed under strict partner confidentiality and AESC ethical codes.',
        partnerName: section.partnerName || 'Mark Goldsmith',
        partnerTitle: section.partnerTitle || 'Founder & Managing Partner',
        partnerBio: section.partnerBio || '20+ years dedicated executive search across UK/European building products, construction materials, and manufacturing sectors.',
        metricPlacements: section.metricPlacements || '250+',
        metricTenure: section.metricTenure || '20+',
        metricRetention: section.metricRetention || '98.4%',
        metricCoverage: section.metricCoverage || 'UK & EU',
      };

      return (
        <HeroSection
          data={heroData}
          onInitiateSearch={() => onInitiateSearch()}
          onExploreSpecialisms={() => {
            const el = document.getElementById('specialisms');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      );
    }

    case 'editorialRichText':
      return <EditorialRichTextBlock data={section} />;

    case 'sectorGrid': {
      const sectorData: SectorMatrixSectionData = {
        sectionLabel: section.sectionLabel || 'PRACTICE AREAS',
        title: section.title || 'Specialised Sector Matrix',
        description: section.description || 'Dedicated practice coverage spanning core industrial and commercial sectors across the built environment.',
        subDisciplines: [
          'Board Appointments (Chair, NED)',
          'Chief Executive Officer (CEO)',
          'Managing Director (MD)',
          'Chief Commercial Officer (CCO)',
          'Operations Director (COO)',
          'Technical & Engineering Director',
        ],
        specialisms: section.specialisms || [],
      };

      return (
        <SectorMatrixSection
          data={sectorData}
          specialisms={sectorData.specialisms}
          onSelectSector={(sector) => onInitiateSearch(sector)}
        />
      );
    }

    case 'differencePillars': {
      const diffData: DifferenceSectionData = {
        sectionLabel: section.sectionLabel || 'THE MGH DIFFERENCE',
        title: section.title || 'Why Retained Search Outperforms Contingent Recruitment',
        description: section.description || 'When hiring Board and C-Suite leaders in Building Products, contingent contingency models fail. Here is how our retained methodology guarantees success.',
        assuranceTitle: section.assuranceTitle || 'Direct Partner Engagement',
        assuranceDescription: section.assuranceDescription || 'Every search is personally executed from mandate specification to final appointment by Mark Goldsmith.',
        candidateQualityTitle: section.candidateQualityTitle || 'Exclusively Passive Talent',
        candidateQualityText: section.candidateQualityText || 'We do not broadcast on job boards. We systematically map 100% of the active and passive market.',
        replacementGuaranteeTitle: section.replacementGuaranteeTitle || '12-Month Placement Guarantee',
        replacementGuaranteeText: section.replacementGuaranteeText || 'Full fee-free replacement backing every executive appointment.',
        pillars: section.pillars || [],
      };

      return (
        <DifferenceSection
          data={diffData}
          pillars={diffData.pillars}
          onInitiateSearch={() => onInitiateSearch()}
        />
      );
    }

    case 'processTimeline': {
      const processData: SearchProcessSectionData = {
        sectionLabel: section.sectionLabel || 'SEARCH BLUEPRINT',
        title: section.title || 'Our 5-Stage Executive Search Methodology',
        description: section.description || 'A structured, transparent, and rigorous search protocol from initial scoping to 100-day onboarding review.',
        steps: section.steps || [],
      };

      return (
        <SearchProcessSection
          data={processData}
          steps={processData.steps}
        />
      );
    }

    case 'insightsTeaser': {
      const insightsData: InsightsSectionData = {
        sectionLabel: section.sectionLabel || 'EXECUTIVE BRIEFINGS',
        title: section.title || 'Market Intelligence & Remuneration Benchmarks',
        description: section.description || 'Exclusive industry analyses and executive market reports for Building Products leadership.',
        reportBannerCategory: section.reportBannerCategory || 'SPECIAL REPORT 2026',
        reportBannerTitle: section.reportBannerTitle || '2026 Building Products Executive Remuneration Benchmark',
        reportBannerDescription: section.reportBannerDescription || 'Comprehensive salary, bonus structure, and equity analysis for C-Suite and Board leaders across UK & European manufacturing.',
        reportBannerCtaText: section.reportBannerCtaText || 'Request Confidential Copy',
        articles: section.articles || [],
      };

      return (
        <InsightsSection
          data={insightsData}
          articles={insightsData.articles}
          onReadArticle={(article) => onReadArticle && onReadArticle(article)}
          onRequestReport={() => onInitiateSearch('Executive Remuneration Benchmark')}
        />
      );
    }

    case 'teamProfile': {
      const partnerData: AboutPartnerSectionData = {
        sectionLabel: section.sectionLabel || 'PARTNER PROFILE',
        badge: section.badge || 'FOUNDING PARTNER',
        badgeSecondary: section.badgeSecondary || '20+ YEARS SECTOR FOCUS',
        headline: section.headline || 'Partner-Led Retained Search. No Delegation. Absolute Accountability.',
        partnerName: section.partnerName || 'Mark Goldsmith',
        partnerRole: section.partnerRole || 'Managing Partner',
        partnerPracticeTenure: section.partnerPracticeTenure || '20+ Years in Executive Search',
        partnerSpecialization: section.partnerSpecialization || 'Building Products & Construction Materials',
        partnerPlacementLevel: section.partnerPlacementLevel || 'Board, CEO, MD & C-Suite',
        partnerEmail: section.partnerEmail || 'mark.goldsmith@mgheadhunting.com',
        partnerLinkedinUrl: section.partnerLinkedinUrl || 'https://www.linkedin.com',
        paragraphs: section.paragraphs || [
          'With over two decades of dedicated executive search experience, Mark Goldsmith has established a preeminent track record of placing Board and Executive leaders across the UK and European Building Products market.',
          'Unlike volume recruitment agencies, Mark personally leads every mandate from initial market mapping through psychometric assessment to final contract negotiations.',
        ],
        credentialsChecklist: section.credentialsChecklist || [
          'Member of the Association of Executive Search and Leadership Consultants (AESC)',
          'Certified in British Psychological Society (BPS) Level A & B Assessment',
          'Over 250 Successful Board and Executive Appointments',
          'Strict Single-Point Confidentiality for Sensitive Succession Planning',
        ],
      };

      return (
        <AboutPartnerSection
          data={partnerData}
          onInitiateSearch={() => onInitiateSearch()}
        />
      );
    }

    case 'metricsStats':
      return <MetricsStatsBlock data={section} />;

    case 'faqAccordion':
      return <FaqAccordionBlock data={section} />;

    case 'ctaBanner':
      return (
        <CtaBannerBlock
          data={section}
          onInitiateSearch={() => onInitiateSearch()}
        />
      );

    case 'contactDesk':
      return (
        <ContactDeskBlock
          data={section}
          onInitiateSearch={() => onInitiateSearch()}
        />
      );

    default:
      return null;
  }
};
