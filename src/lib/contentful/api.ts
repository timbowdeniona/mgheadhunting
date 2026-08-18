import { getContentfulClient } from './client';
import {
  AuthorFields,
  SectorSpecialismFields,
  DifferencePillarFields,
  ProcessStepFields,
  InsightArticleFields,
  SiteSettingsFields,
  HeroSectionData,
  SectorMatrixSectionData,
  DifferenceSectionData,
  SearchProcessSectionData,
  InsightsSectionData,
  AboutPartnerSectionData,
  ContactFooterSectionData,
  HomepageContentfulData,
  ModularPageData,
  PageSectionBlock,
} from './types';


export * from './fallbacks';
import {
  fallbackSiteSettings,
  fallbackHeroData,
  fallbackSpecialisms,
  fallbackSubDisciplines,
  fallbackDifferencePillars,
  fallbackProcessSteps,
  fallbackInsightArticles,
  fallbackAboutPartnerData,
  fallbackContactFooterData,
  fallbackModularPages,
} from './fallbacks';


// API Fetchers

export async function fetchSiteSettings(preview = false): Promise<SiteSettingsFields> {
  try {
    const client = getContentfulClient(preview);
    const response = await client.getEntries<any>({
      content_type: 'siteSettings',
      limit: 1,
    });
    if (response.items && response.items.length > 0) {
      const fields = response.items[0].fields;
      return {
        ...fallbackSiteSettings,
        ...(fields as unknown as Partial<SiteSettingsFields>),
      };
    }
  } catch (err) {
    console.warn('[Contentful API] Using fallback site settings:', err);
  }
  return fallbackSiteSettings;
}

export async function fetchSectorSpecialisms(preview = false): Promise<SectorSpecialismFields[]> {
  try {
    const client = getContentfulClient(preview);
    const response = await client.getEntries<any>({
      content_type: 'sectorSpecialism',
      order: ['fields.order', 'fields.title'] as any,
    });
    if (response.items && response.items.length > 0) {
      return response.items.map((item) => item.fields as unknown as SectorSpecialismFields);
    }
  } catch (err) {
    console.warn('[Contentful API] Using fallback sector specialisms:', err);
  }
  return fallbackSpecialisms;
}

export async function fetchDifferencePillars(preview = false): Promise<DifferencePillarFields[]> {
  try {
    const client = getContentfulClient(preview);
    const response = await client.getEntries<any>({
      content_type: 'differencePillar',
      order: ['fields.order', 'fields.title'] as any,
    });
    if (response.items && response.items.length > 0) {
      return response.items.map((item) => item.fields as unknown as DifferencePillarFields);
    }
  } catch (err) {
    console.warn('[Contentful API] Using fallback difference pillars:', err);
  }
  return fallbackDifferencePillars;
}

export async function fetchProcessSteps(preview = false): Promise<ProcessStepFields[]> {
  try {
    const client = getContentfulClient(preview);
    const response = await client.getEntries<any>({
      content_type: 'processStep',
      order: ['fields.order', 'fields.stepNumber'] as any,
    });
    if (response.items && response.items.length > 0) {
      return response.items.map((item) => item.fields as unknown as ProcessStepFields);
    }
  } catch (err) {
    console.warn('[Contentful API] Using fallback process steps:', err);
  }
  return fallbackProcessSteps;
}

export async function fetchInsightArticles(preview = false): Promise<InsightArticleFields[]> {
  try {
    const client = getContentfulClient(preview);
    const response = await client.getEntries<any>({
      content_type: 'insightArticle',
      include: 2,
    });
    if (response.items && response.items.length > 0) {
      return response.items.map((item) => item.fields as unknown as InsightArticleFields);
    }
  } catch (err) {
    console.warn('[Contentful API] Using fallback insight articles:', err);
  }
  return fallbackInsightArticles;
}

export async function fetchInsightBySlug(slug: string, preview = false): Promise<InsightArticleFields | null> {
  try {
    const client = getContentfulClient(preview);
    const response = await client.getEntries<any>({
      content_type: 'insightArticle',
      'fields.slug': slug,
      include: 2,
      limit: 1,
    });
    if (response.items && response.items.length > 0) {
      return response.items[0].fields as unknown as InsightArticleFields;
    }
  } catch (err) {
    console.warn(`[Contentful API] fetchInsightBySlug(${slug}) error:`, err);
  }
  return fallbackInsightArticles.find((a) => a.slug === slug) || null;
}

export async function fetchHomepageData(preview = false): Promise<HomepageContentfulData> {
  const [siteSettings, specialisms, pillars, steps, articles] = await Promise.all([
    fetchSiteSettings(preview),
    fetchSectorSpecialisms(preview),
    fetchDifferencePillars(preview),
    fetchProcessSteps(preview),
    fetchInsightArticles(preview),
  ]);

  return {
    siteSettings,
    hero: {
      ...fallbackHeroData,
    },
    sectorMatrix: {
      sectionLabel: 'Sector Specialism Matrix',
      title: 'Core Practice Matrix',
      description: 'Specialized search focused exclusively on executive roles across manufacturing, distribution, and contracting in the Building Products & Construction materials ecosystem.',
      subDisciplines: fallbackSubDisciplines,
      specialisms,
    },
    difference: {
      sectionLabel: 'The MGH Difference',
      title: 'Engineered Executive Search vs Recruitment Clichés',
      description: 'Why CEOs, Private Equity investors, and Board Chairs choose MG Headhunting over generic recruitment agencies.',
      assuranceTitle: '100% Commitment to Mandate Completion',
      assuranceDescription: 'Unlike transactional agents who drop searches when difficult, MGH guarantees persistence until the exact candidate profile is secured.',
      candidateQualityTitle: 'Candidate quality',
      candidateQualityText: 'Targeted approach to top 5% performers who are not on job boards.',
      replacementGuaranteeTitle: 'Replacement guarantee',
      replacementGuaranteeText: 'Full 12-month candidate replacement warranty on executive placements.',
      pillars,
    },
    process: {
      sectionLabel: 'Search Methodology',
      title: 'The 5-Stage Search Blueprint',
      description: 'A disciplined, milestone-driven framework designed to identify, attract, and secure top-tier executive leadership without disruption.',
      steps,
    },
    insights: {
      sectionLabel: 'Market Intelligence',
      title: 'Executive Briefings & Market Insights',
      description: 'Proprietary intelligence on executive talent flows, board compensation dynamics, and regulatory shifts across the Building Products landscape.',
      reportBannerCategory: 'Special Research Publication',
      reportBannerTitle: '2026/2027 Building Products Executive Salary & Retention Benchmark',
      reportBannerDescription: 'Comprehensive compensation analysis covering 400+ board appointments across UK & European manufacturing, merchants, and fabricators.',
      reportBannerCtaText: 'Request Confidential Report',
      articles,
    },
    aboutPartner: {
      ...fallbackAboutPartnerData,
    },
    contactFooter: {
      ...fallbackContactFooterData,
      navLinks: siteSettings.navLinks,
      footerSpecialisms: siteSettings.footerSpecialisms,
      footerSubSectors: siteSettings.footerSubSectors,
      directDeskEmail: siteSettings.primaryEmail,
      headquarters: siteSettings.headquarters || fallbackContactFooterData.headquarters,
      complianceNotice: siteSettings.icoRegistrationNumber || fallbackContactFooterData.complianceNotice,
      copyright: siteSettings.copyrightText || fallbackContactFooterData.copyright,
      linkedinUrl: siteSettings.linkedinUrl || fallbackContactFooterData.linkedinUrl,
    },
  };
}

// -------------------------------------------------------------
// MODULAR PAGE BUILDER FETCHERS & NORMALIZERS
// -------------------------------------------------------------

export function normalizeSectionBlock(rawBlock: any): PageSectionBlock | null {
  if (!rawBlock) return null;

  // 1. If it's already a plain object with a valid type (legacy JSON or fallback)
  if (rawBlock.type && typeof rawBlock.type === 'string' && !rawBlock.sys?.contentType) {
    return rawBlock as PageSectionBlock;
  }

  // 2. If it's a Contentful Entry with sys.contentType
  const contentTypeId = rawBlock.sys?.contentType?.sys?.id;
  const f = rawBlock.fields || rawBlock;

  switch (contentTypeId) {
    case 'blockPageHeader': {
      let breadcrumbs: Array<{ label: string; href?: string }> | undefined;
      if (Array.isArray(f.breadcrumbs)) {
        breadcrumbs = f.breadcrumbs.map((b: any) => {
          if (typeof b === 'string') {
            if (b.includes(':')) {
              const [label, href] = b.split(':');
              return { label: label.trim(), href: href.trim() };
            }
            return { label: b, href: '#' };
          }
          if (typeof b === 'object' && b.label) return b;
          return { label: String(b) };
        });
      }
      return {
        type: 'pageHeader',
        badge: f.badge,
        overline: f.overline,
        title: f.title || '',
        highlightedPhrase: f.highlightedPhrase,
        subtitle: f.subtitle,
        coordinate: f.coordinate,
        breadcrumbs,
      };
    }

    case 'blockMetricsStats': {
      const stats = Array.isArray(f.stats)
        ? f.stats.map((s: any) => {
            const sf = s.fields || s;
            return {
              label: sf.label || '',
              value: sf.value || '',
              description: sf.description || '',
              tag: sf.tag,
            };
          })
        : undefined;
      return {
        type: 'metricsStats',
        sectionLabel: f.sectionLabel,
        title: f.title || '',
        subtitle: f.subtitle,
        stats,
      };
    }

    case 'blockFaqAccordion': {
      const items = Array.isArray(f.items)
        ? f.items.map((i: any) => {
            const itemF = i.fields || i;
            return {
              category: itemF.category,
              question: itemF.question || '',
              answer: itemF.answer || '',
            };
          })
        : [];
      return {
        type: 'faqAccordion',
        sectionLabel: f.sectionLabel,
        title: f.title || '',
        description: f.description,
        items,
      };
    }

    case 'blockCtaBanner': {
      return {
        type: 'ctaBanner',
        variant: f.variant || 'navy',
        overline: f.overline,
        title: f.title || '',
        description: f.description,
        primaryCtaText: f.primaryCtaText,
        primaryCtaAction: f.primaryCtaAction,
        primaryCtaHref: f.primaryCtaHref,
        secondaryCtaText: f.secondaryCtaText,
        secondaryCtaHref: f.secondaryCtaHref,
        guaranteeNotice: f.guaranteeNotice,
      };
    }

    case 'blockEditorialRichText': {
      return {
        type: 'editorialRichText',
        sectionLabel: f.sectionLabel,
        title: f.title,
        subtitle: f.subtitle,
        layout: f.layout || 'sidebar',
        leadParagraph: f.leadParagraph,
        quoteCallout: f.quoteText
          ? {
              quote: f.quoteText,
              attribution: f.quoteAuthor || 'Mark Goldsmith',
              role: f.quoteRole || 'Managing Partner',
            }
          : undefined,
        keyTakeaways: f.keyTakeaways,
      };
    }

    case 'blockContactDesk': {
      return {
        type: 'contactDesk',
        sectionLabel: f.sectionLabel,
        title: f.title || '',
        description: f.description,
        email: f.email,
        phone: f.phone,
        headquarters: f.headquarters,
        ndaNotice: f.ndaNotice,
      };
    }

    case 'blockSectorGrid': {
      return {
        type: 'sectorGrid',
        sectionLabel: f.sectionLabel,
        title: f.title,
        description: f.description,
      };
    }

    case 'blockDifferencePillars': {
      return {
        type: 'differencePillars',
        sectionLabel: f.sectionLabel,
        title: f.title,
        description: f.description,
      };
    }

    case 'blockProcessTimeline': {
      return {
        type: 'processTimeline',
        sectionLabel: f.sectionLabel,
        title: f.title,
        description: f.description,
      };
    }

    case 'blockTeamProfile': {
      return {
        type: 'teamProfile',
        sectionLabel: f.sectionLabel,
        badge: f.badge,
        badgeSecondary: f.badgeSecondary,
        headline: f.headline || '',
        partnerName: f.partnerName || 'Mark Goldsmith',
        partnerRole: f.partnerRole || 'Founder & Managing Partner',
        partnerPracticeTenure: f.partnerPracticeTenure,
        partnerSpecialization: f.partnerSpecialization,
        partnerPlacementLevel: f.partnerPlacementLevel,
        partnerEmail: f.partnerEmail,
        partnerLinkedinUrl: f.partnerLinkedinUrl,
        paragraphs: f.paragraphs,
        credentialsChecklist: f.credentialsChecklist,
      };
    }

    case 'blockInsightsTeaser': {
      return {
        type: 'insightsTeaser',
        sectionLabel: f.sectionLabel,
        title: f.title,
        description: f.description,
      };
    }

    case 'blockHero': {
      return {
        type: 'hero',
        badgeCategory: f.badge,
        headline: f.title || '',
        subtitle: f.description,
      };
    }

    default:
      if (f.type) {
        return f as PageSectionBlock;
      }
      return null;
  }
}

export async function fetchModularPageBySlug(slug: string, preview = false): Promise<ModularPageData | null> {
  const [siteSettings, specialisms, pillars, steps, articles] = await Promise.all([
    fetchSiteSettings(preview),
    fetchSectorSpecialisms(preview),
    fetchDifferencePillars(preview),
    fetchProcessSteps(preview),
    fetchInsightArticles(preview),
  ]);

  try {
    const client = getContentfulClient(preview);
    const response = await client.getEntries<any>({
      content_type: 'modularPage',
      'fields.slug': slug,
      include: 4,
      limit: 1,
    });

    if (response.items && response.items.length > 0) {
      const entry = response.items[0];
      const fields = entry.fields as any;
      const rawSections = Array.isArray(fields.sections) ? fields.sections : [];
      const parsedSections: PageSectionBlock[] = rawSections
        .map(normalizeSectionBlock)
        .filter((sec: PageSectionBlock | null): sec is PageSectionBlock => sec !== null);

      // Hydrate dynamically if any section relies on global data
      const hydratedSections = parsedSections.map((sec: PageSectionBlock): PageSectionBlock => {
        if (sec.type === 'sectorGrid') {
          return { ...sec, specialisms: sec.specialisms || specialisms };
        }
        if (sec.type === 'differencePillars') {
          return { ...sec, pillars: sec.pillars || pillars };
        }
        if (sec.type === 'processTimeline') {
          return { ...sec, steps: sec.steps || steps };
        }
        if (sec.type === 'insightsTeaser') {
          return { ...sec, articles: sec.articles || articles };
        }
        return sec;
      });

      return {
        title: (fields.title as string) || slug,
        slug: (fields.slug as string) || slug,
        metaTitle: fields.metaTitle ? (fields.metaTitle as string) : undefined,
        metaDescription: fields.metaDescription ? (fields.metaDescription as string) : undefined,
        showHeader: fields.showHeader !== false,
        showFooter: fields.showFooter !== false,
        sections: hydratedSections,
        siteSettings,
      };
    }
  } catch (err) {
    console.warn(`[Contentful API] fetchModularPageBySlug(${slug}) error:`, err);
  }



  // Fallback data lookup
  const fallback = fallbackModularPages[slug];
  if (fallback) {
    // Populate dynamic items into sections if needed
    const hydratedSections = fallback.sections.map((sec) => {
      if (sec.type === 'sectorGrid') {
        return { ...sec, specialisms: sec.specialisms || specialisms };
      }
      if (sec.type === 'differencePillars') {
        return { ...sec, pillars: sec.pillars || pillars };
      }
      if (sec.type === 'processTimeline') {
        return { ...sec, steps: sec.steps || steps };
      }
      if (sec.type === 'insightsTeaser') {
        return { ...sec, articles: sec.articles || articles };
      }
      return sec;
    });

    return {
      ...fallback,
      sections: hydratedSections,
      siteSettings,
    };
  }

  return null;
}

export async function fetchAllModularPageSlugs(preview = false): Promise<string[]> {
  const staticSlugs = Object.keys(fallbackModularPages);

  try {
    const client = getContentfulClient(preview);
    const response = await client.getEntries<any>({
      content_type: 'modularPage',
      select: ['fields.slug'],
      limit: 100,
    });

    if (response.items && response.items.length > 0) {
      const remoteSlugs = response.items
        .map((item) => item.fields?.slug)
        .filter((s): s is string => typeof s === 'string' && s.length > 0);
      return Array.from(new Set([...staticSlugs, ...remoteSlugs]));
    }
  } catch (err) {
    console.warn('[Contentful API] fetchAllModularPageSlugs error:', err);
  }

  return staticSlugs;
}

