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
  code: string; // e.g. "SPEC_01 // BOARD & P&L"
  category: 'EXECUTIVE' | 'COMMERCIAL' | 'OPERATIONS' | 'TECHNICAL';
  title: string; // e.g. "Managing Directors & CEOs"
  subtitle?: string; // e.g. "General Management & Executive Leadership"
  description: string;
  sampleRoles: string[];
  keyClients: string;
  order?: number;
}

export interface DifferencePillarFields {
  pillarIndex: string; // e.g. "PILLAR // 01"
  title: string;
  highlight: string;
  description: string;
  retainedAdvantage: string;
  contingentFlaw: string;
  iconIdentifier?: 'target' | 'userCheck' | 'compass' | 'shieldCheck';
  order?: number;
}

export interface ProcessStepFields {
  stepNumber: string; // e.g. "01"
  phaseName: string; // e.g. "CALIBRATION"
  title: string;
  timeline: string; // e.g. "Week 1"
  description: string;
  deliverable: string;
  order?: number;
}

export interface InsightArticleFields {
  title: string;
  slug: string;
  category: 'EXECUTIVE COMPENSATION' | 'REGULATORY & COMPLIANCE' | 'M&A & EXPANSION' | 'SUSTAINABILITY & TECH' | string;
  publishedDate: string;
  readTime: string;
  excerpt: string;
  keyTakeaways: string[];
  body?: Document;
  author?: {
    fields: AuthorFields;
  };
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
}

export interface ContentfulEntry<T> {
  sys: {
    id: string;
    createdAt?: string;
    updatedAt?: string;
  };
  fields: T;
}
