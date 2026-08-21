import { Document } from '@contentful/rich-text-types';

export interface ContentfulAsset {
  sys: {
    id: string;
  };
  fields?: {
    title?: string;
    description?: string;
    file?: {
      url: string;
      details?: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName?: string;
      contentType?: string;
    };
  };
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface AuthorFields {
  name: string;
  roleTitle: string;
  organization?: string;
  avatar?: ContentfulAsset;
  email?: string;
  linkedinUrl?: string;
  bioShort?: string;
  bioFull?: Document;
  practiceTenure?: string;
  placementLevel?: string;
}

export interface SectorSpecialismFields {
  code?: string;
  category: 'EXECUTIVE' | 'COMMERCIAL' | 'OPERATIONS' | 'TECHNICAL';
  title: string;
  subtitle?: string;
  description: string;
  sampleRoles: string[];
  keyClients: string;
  order?: number;
}

export interface DifferencePillarFields {
  pillarIndex?: string;
  title: string;
  highlight: string;
  description: string;
  retainedAdvantage: string;
  contingentFlaw: string;
  iconIdentifier?: 'target' | 'userCheck' | 'compass' | 'shieldCheck';
  order?: number;
}

export interface ProcessStepFields {
  stepNumber: string;
  phaseName: string;
  title: string;
  timeline: string;
  description: string;
  deliverable: string;
  order?: number;
}

export interface MediaAssetFields {
  internalName: string;
  image?: ContentfulAsset;
  altText: string;
  caption?: string;
  credit?: string;
}

export interface InsightArticleFields {
  title: string;
  slug: string;
  category: string;
  publishedDate: string;
  readTime: string;
  excerpt: string;
  keyTakeaways: string[];
  body?: Document;
  author?: {
    fields: AuthorFields;
  };
  coverImage?: ContentfulAsset | { fields: MediaAssetFields; sys: { id: string } };
  coverImageAlt?: string;
  isFeatured?: boolean;
}

export interface SiteSettingsFields {
  siteName: string;
  tagline?: string;
  primaryEmail: string;
  phone?: string;
  headquarters?: string;
  linkedinUrl?: string;
  icoRegistrationNumber?: string;
  metaTitleDefault?: string;
  metaDescriptionDefault?: string;
  navLinks: NavigationItem[];
  footerSpecialisms: string[];
  footerSubSectors: string[];
  copyrightText: string;
}

export interface HeroSectionData {
  badgeOverline: string;
  badgeCategory: string;
  headline: string;
  highlightedPhrase: string;
  subtitle: string;
  keyValues: string[];
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  complianceNotice: string;
  partnerName: string;
  partnerTitle: string;
  partnerBio: string;
  metricPlacements: string;
  metricTenure: string;
  metricRetention: string;
  metricCoverage: string;
}

export interface SectorMatrixSectionData {
  sectionLabel: string;
  title: string;
  description: string;
  subDisciplines: string[];
  specialisms: SectorSpecialismFields[];
}

export interface DifferenceSectionData {
  sectionLabel: string;
  title: string;
  description: string;
  assuranceTitle: string;
  assuranceDescription: string;
  candidateQualityTitle: string;
  candidateQualityText: string;
  replacementGuaranteeTitle: string;
  replacementGuaranteeText: string;
  pillars: DifferencePillarFields[];
}

export interface SearchProcessSectionData {
  sectionLabel: string;
  title: string;
  description: string;
  steps: ProcessStepFields[];
}

export interface InsightsSectionData {
  sectionLabel: string;
  title: string;
  description: string;
  reportBannerCategory: string;
  reportBannerTitle: string;
  reportBannerDescription: string;
  reportBannerCtaText: string;
  articles: InsightArticleFields[];
}

export interface AboutPartnerSectionData {
  sectionLabel: string;
  badge: string;
  badgeSecondary: string;
  headline: string;
  partnerName: string;
  partnerRole: string;
  partnerPracticeTenure: string;
  partnerSpecialization: string;
  partnerPlacementLevel: string;
  partnerEmail: string;
  partnerLinkedinUrl: string;
  paragraphs: string[];
  credentialsChecklist: string[];
}

export interface ContactFooterSectionData {
  bannerOverline: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerCtaText: string;
  ndaTitle: string;
  ndaStatement: string;
  siteDescription: string;
  directDeskEmail: string;
  headquarters: string;
  responseGuarantee: string;
  complianceNotice: string;
  copyright: string;
  navLinks: NavigationItem[];
  footerSpecialisms: string[];
  footerSubSectors: string[];
  linkedinUrl: string;
}

export interface HomepageEntryFields {
  // Hero Section
  heroBadgeOverline?: string;
  heroBadgeCategory?: string;
  heroHeadline?: string;
  heroHighlightedPhrase?: string;
  heroSubtitle?: string;
  heroKeyValues?: string[];
  heroCtaPrimaryText?: string;
  heroCtaSecondaryText?: string;
  heroComplianceNotice?: string;
  heroPartnerName?: string;
  heroPartnerTitle?: string;
  heroPartnerBio?: string;
  heroMetricPlacements?: string;
  heroMetricTenure?: string;
  heroMetricRetention?: string;
  heroMetricCoverage?: string;

  // Sector Matrix Section
  sectorMatrixSectionLabel?: string;
  sectorMatrixTitle?: string;
  sectorMatrixDescription?: string;
  sectorMatrixSubDisciplines?: string[];

  // Difference Section
  differenceSectionLabel?: string;
  differenceTitle?: string;
  differenceDescription?: string;
  differenceAssuranceTitle?: string;
  differenceAssuranceDescription?: string;
  differenceCandidateQualityTitle?: string;
  differenceCandidateQualityText?: string;
  differenceReplacementGuaranteeTitle?: string;
  differenceReplacementGuaranteeText?: string;

  // Process Section
  processSectionLabel?: string;
  processTitle?: string;
  processDescription?: string;

  // Insights Section
  insightsSectionLabel?: string;
  insightsTitle?: string;
  insightsDescription?: string;
  insightsReportBannerCategory?: string;
  insightsReportBannerTitle?: string;
  insightsReportBannerDescription?: string;
  insightsReportBannerCtaText?: string;

  // About Partner Section (Reference to blockTeamProfile)
  aboutPartnerBlock?: any; // Entry reference

  // Contact Footer Section (Reference to blockContactDesk)
  contactFooterBlock?: any; // Entry reference
}

export interface HomepageContentfulData {
  siteSettings: SiteSettingsFields;
  hero: HeroSectionData;
  sectorMatrix: SectorMatrixSectionData;
  difference: DifferenceSectionData;
  process: SearchProcessSectionData;
  insights: InsightsSectionData;
  aboutPartner: AboutPartnerSectionData;
  contactFooter: ContactFooterSectionData;
}

// -------------------------------------------------------------
// MODULAR PAGE BUILDER TYPES & COMPONENT BLOCKS
// -------------------------------------------------------------

export interface HeroBlockData {
  type: 'hero';
  badgeOverline?: string;
  badgeCategory?: string;
  headline: string;
  highlightedPhrase?: string;
  subtitle?: string;
  keyValues?: string[];
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
  complianceNotice?: string;
  partnerName?: string;
  partnerTitle?: string;
  partnerBio?: string;
  metricPlacements?: string;
  metricTenure?: string;
  metricRetention?: string;
  metricCoverage?: string;
}

export interface PageHeaderBlockData {
  type: 'pageHeader';
  badge?: string;
  overline?: string;
  title: string;
  highlightedPhrase?: string;
  subtitle?: string;
  coordinate?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export interface EditorialRichTextBlockData {
  type: 'editorialRichText';
  sectionLabel?: string;
  title?: string;
  subtitle?: string;
  layout?: 'single' | 'two-column' | 'sidebar';
  body?: Document;
  leadParagraph?: string;
  quoteCallout?: {
    quote: string;
    attribution?: string;
    role?: string;
  };
  keyTakeaways?: string[];
}

export interface SectorGridBlockData {
  type: 'sectorGrid';
  sectionLabel?: string;
  title?: string;
  description?: string;
  specialisms?: SectorSpecialismFields[];
  categories?: Array<'EXECUTIVE' | 'COMMERCIAL' | 'OPERATIONS' | 'TECHNICAL'>;
}

export interface DifferencePillarsBlockData {
  type: 'differencePillars';
  sectionLabel?: string;
  title?: string;
  description?: string;
  assuranceTitle?: string;
  assuranceDescription?: string;
  candidateQualityTitle?: string;
  candidateQualityText?: string;
  replacementGuaranteeTitle?: string;
  replacementGuaranteeText?: string;
  pillars?: DifferencePillarFields[];
}

export interface ProcessTimelineBlockData {
  type: 'processTimeline';
  sectionLabel?: string;
  title?: string;
  description?: string;
  steps?: ProcessStepFields[];
}

export interface InsightsTeaserBlockData {
  type: 'insightsTeaser';
  sectionLabel?: string;
  title?: string;
  description?: string;
  filterCategory?: string;
  limit?: number;
  featuredOnly?: boolean;
  showReportBanner?: boolean;
  reportBannerCategory?: string;
  reportBannerTitle?: string;
  reportBannerDescription?: string;
  reportBannerCtaText?: string;
  articles?: InsightArticleFields[];
}

export interface TeamProfileBlockData {
  type: 'teamProfile';
  sectionLabel?: string;
  badge?: string;
  badgeSecondary?: string;
  headline?: string;
  partnerName?: string;
  partnerRole?: string;
  partnerPracticeTenure?: string;
  partnerSpecialization?: string;
  partnerPlacementLevel?: string;
  partnerEmail?: string;
  partnerLinkedinUrl?: string;
  paragraphs?: string[];
  credentialsChecklist?: string[];
}

export interface MetricsStatsBlockData {
  type: 'metricsStats';
  sectionLabel?: string;
  title?: string;
  subtitle?: string;
  stats: Array<{
    label: string;
    value: string;
    description?: string;
    tag?: string;
  }>;
}

export interface FaqAccordionBlockData {
  type: 'faqAccordion';
  sectionLabel?: string;
  title?: string;
  description?: string;
  items: Array<{
    question: string;
    answer: string;
    category?: string;
  }>;
}

export interface CtaBannerBlockData {
  type: 'ctaBanner';
  variant?: 'blueprint' | 'navy' | 'dark' | 'outline';
  overline?: string;
  title: string;
  description: string;
  primaryCtaText?: string;
  primaryCtaAction?: 'searchModal' | 'link';
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  guaranteeNotice?: string;
}

export interface ContactDeskBlockData {
  type: 'contactDesk';
  sectionLabel?: string;
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  headquarters?: string;
  ndaNotice?: string;
}

export type PageSectionBlock =
  | HeroBlockData
  | PageHeaderBlockData
  | EditorialRichTextBlockData
  | SectorGridBlockData
  | DifferencePillarsBlockData
  | ProcessTimelineBlockData
  | InsightsTeaserBlockData
  | TeamProfileBlockData
  | MetricsStatsBlockData
  | FaqAccordionBlockData
  | CtaBannerBlockData
  | ContactDeskBlockData;

export interface ModularPageData {
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  sections: PageSectionBlock[];
  siteSettings: SiteSettingsFields;
}

