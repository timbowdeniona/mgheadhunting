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
  coverImage?: ContentfulAsset;
  featuredImage?: ContentfulAsset;
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
