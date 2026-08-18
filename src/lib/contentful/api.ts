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
} from './types';

export const fallbackSiteSettings: SiteSettingsFields = {
  siteName: 'MG Headhunting',
  tagline: 'Building Products',
  primaryEmail: 'mgoldsmith@mgheadhunting.co.uk',
  phone: '+44 (0) 20 7946 0198',
  headquarters: 'London & Home Counties, United Kingdom',
  linkedinUrl: 'https://www.linkedin.com',
  icoRegistrationNumber: "UK GDPR Compliant • Registered with Information Commissioner's Office (ICO) • Strict Non-Disclosure Assured",
  metaTitleDefault: 'MG Headhunting (MGH) | Retained Executive Search for Building Products & Construction',
  metaDescriptionDefault: 'Boutique retained executive search delivering Board, Managing Director, and C-Suite appointments across the UK and European Building Products and Built Environment sectors.',
  navLinks: [
    { label: 'Specialisms', href: '#specialisms' },
    { label: 'The MGH Difference', href: '#difference' },
    { label: 'Search Process', href: '#process' },
    { label: 'Market Intelligence', href: '#insights' },
    { label: 'About Mark Goldsmith', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  footerSpecialisms: [
    'Managing Directors & CEOs',
    'Commercial & Sales Directors',
    'Operations & Plant Heads',
    'Technical & R&D Directors',
    'Finance & Corporate Development',
    'Sustainability & ESG Leadership',
  ],
  footerSubSectors: [
    'Heavy Materials, Concrete & Aggregates',
    'Building Envelope, Façades & Glazing',
    'HVAC, Mechanical & Building Services',
    'Structural Timber & Offsite MMC',
    'Builders Merchant & Trade Distribution',
    'Roofing, Cladding & Waterproofing',
  ],
  copyrightText: '© 2026 MG Headhunting Ltd. All rights reserved.',
};

export const fallbackHeroData: HeroSectionData = {
  badgeOverline: 'Retained Executive Search',
  badgeCategory: 'Building Products & Construction',
  headline: 'Board, Managing Director & C-Suite Appointments for the',
  highlightedPhrase: 'Built Environment',
  subtitle: 'MG Headhunting (MGH) delivers precision-engineered executive search for manufacturers, distributors, and private equity investors across the Building Products sector. Partner-led, rigorously assessed, and strictly confidential.',
  keyValues: [
    'Zero Transactional Recruitment',
    '100% Partner Execution',
    'Deep Sector Discretion',
  ],
  ctaPrimaryText: 'Initiate Confidential Search',
  ctaSecondaryText: 'View Sector Specialisms',
  complianceNotice: 'Operating under UK Executive Search Code of Conduct & Strict Data Protection protocols.',
  partnerName: 'Mark Goldsmith',
  partnerTitle: 'Managing Director & Lead Search Partner',
  partnerBio: 'Specialist in board appointments, P&L leaders, and commercial turnarounds across heavy building materials, façades, HVAC, and timber systems.',
  metricPlacements: '200+',
  metricTenure: '20+ Yrs',
  metricRetention: '96%',
  metricCoverage: 'UK & EU',
};

export const fallbackSpecialisms: SectorSpecialismFields[] = [
  {
    category: 'EXECUTIVE',
    title: 'Managing Directors & CEOs',
    subtitle: 'General Management & Executive Leadership',
    description: 'Retained search for full P&L owners responsible for driving EBITDA expansion, navigating private equity ownership, organizational restructuring, or scale-up manufacturing.',
    sampleRoles: ['Managing Director', 'Chief Executive Officer', 'Divisional President', 'General Manager', 'Operating Partner'],
    keyClients: 'PE Portfolio Companies, Global Building Materials PLCs',
    order: 1,
  },
  {
    category: 'COMMERCIAL',
    title: 'Commercial & Sales Directors',
    subtitle: 'Specification & Trade Distribution',
    description: 'High-performing commercial leaders experienced with architectural specification, main contractor frameworks, builders merchant distribution networks, and digital pricing models.',
    sampleRoles: ['Chief Commercial Officer', 'Commercial Director', 'Sales Director UK & Ireland', 'Head of Specification', 'National Merchant Controller'],
    keyClients: 'Façade Systems, Heavy Materials, Insulation & Drylining',
    order: 2,
  },
  {
    category: 'OPERATIONS',
    title: 'Operations & Supply Chain',
    subtitle: 'Manufacturing Excellence & Multi-Site Logistics',
    description: 'Engineering-led leaders with deep command of modern manufacturing techniques, Lean Six Sigma, capital plant investment, health & safety culture, and resilient supply chains.',
    sampleRoles: ['Chief Operating Officer', 'Operations Director', 'Plant / Site Director', 'Supply Chain Director', 'Continuous Improvement Head'],
    keyClients: 'Precast Concrete, Glass & Glazing, Brick & Ceramic Plants',
    order: 3,
  },
  {
    category: 'TECHNICAL',
    title: 'Technical, R&D & Compliance',
    subtitle: 'Building Safety Act & Product Engineering',
    description: 'Crucial appointments safeguarding technical integrity, fire safety conformity, Building Safety Act 2022 adherence, thermal acoustics, and Modern Methods of Construction (MMC).',
    sampleRoles: ['Technical Director', 'Head of Product Development', 'Certification & Standards Director', 'Chief Engineer', 'Quality Director'],
    keyClients: 'Cladding & Roofing, Structural Timber, Fire Protection Systems',
    order: 4,
  },
  {
    category: 'EXECUTIVE',
    title: 'Finance & Corporate Development',
    subtitle: 'CFOs & Transaction Specialists',
    description: 'Strategically minded finance directors capable of leading debt refinancing, buy-and-build M&A integrations, supply-chain cost containment, and PE value-creation plans.',
    sampleRoles: ['Chief Financial Officer', 'Finance Director', 'Head of Corporate Development', 'M&A Director', 'Financial Controller'],
    keyClients: 'Building Merchants, Fabricators, Distribution Groups',
    order: 5,
  },
  {
    category: 'TECHNICAL',
    title: 'Sustainability & ESG Leadership',
    subtitle: 'Decarbonization & Circular Materials',
    description: 'Executive drivers of Scope 1-3 carbon reduction, Environmental Product Declarations (EPDs), embodied carbon minimization, and green building product accreditations.',
    sampleRoles: ['Head of Sustainability', 'ESG Director', 'Circular Economy Lead', 'Carbon Transition Strategist'],
    keyClients: 'Cement, Low-Carbon Concrete, Timber Systems',
    order: 6,
  },
];

export const fallbackSubDisciplines = [
  'Heavy Materials & Aggregates',
  'Curtain Walling & Glazing',
  'Structural Timber & Engineered Wood',
  'Offsite & Modular Manufacturing',
  'HVAC, M&E and Pumps',
  'Drylining, Plaster & Insulation',
  'Builders Merchants & Distribution',
  'Roofing, Waterproofing & Cladding',
];

export const fallbackDifferencePillars: DifferencePillarFields[] = [
  {
    title: 'Exclusively Retained Rigour',
    highlight: 'Dedicated Mandates Over Transactional Volume',
    description: 'We do not run high-volume contingent CV races. Every search is a fully retained partnership where we commit our full operational capacity until the ideal executive is placed and integrated.',
    retainedAdvantage: 'Exhaustive 100% market sweep of passive talent with verified track records.',
    contingentFlaw: 'Speed-focused CV spamming of active job seekers already in circulation.',
    iconIdentifier: 'target',
    order: 1,
  },
  {
    title: 'Direct Partner Accountability',
    highlight: 'Zero Junior Consultant Delegation',
    description: 'In traditional search firms, senior partners win the mandate and hand execution to junior researchers. At MGH, Mark Goldsmith personally maps the market, conducts candidate interviews, and leads board negotiations.',
    retainedAdvantage: 'Direct peer-to-peer discussions between C-suite candidates and a seasoned search leader.',
    contingentFlaw: 'Junior recruiters failing to understand technical nuances and boardroom dynamics.',
    iconIdentifier: 'userCheck',
    order: 2,
  },
  {
    title: 'Architectural Blueprint Process',
    highlight: 'Systematic 5-Stage Assessment Protocol',
    description: 'Every candidate undergoes structured competency evaluation, cultural calibration, referencing against previous board peers, and deep commercial validation before presentation.',
    retainedAdvantage: 'Detailed 360° candidate briefing dossiers with verified metrics and leadership impact.',
    contingentFlaw: 'Unvetted CV forwards relying on superficial candidate self-declarations.',
    iconIdentifier: 'compass',
    order: 3,
  },
  {
    title: 'Restricted Covenant Discretion',
    highlight: 'Strict Confidentiality & PE Alignment',
    description: 'We safeguard corporate strategy, sensitive leadership transitions, and competitive positioning under strict non-disclosure, ensuring your brand equity is protected at every touchpoint.',
    retainedAdvantage: 'Discrete approach protocol protecting strategic market intentions and executive reputations.',
    contingentFlaw: 'Public job board advertisements exposing sensitive company restructuring.',
    iconIdentifier: 'shieldCheck',
    order: 4,
  },
];

export const fallbackProcessSteps: ProcessStepFields[] = [
  {
    stepNumber: '01',
    phaseName: 'Calibration',
    title: 'Briefing & Strategic Calibration',
    timeline: 'Week 1',
    description: 'Comprehensive discovery with Board / PE stakeholders to establish operational metrics, cultural leadership requirements, and exact compensation structures.',
    deliverable: 'Role Specification & Search Strategy Dossier',
    order: 1,
  },
  {
    stepNumber: '02',
    phaseName: 'Mapping',
    title: 'Deep Market Mapping & Intelligence',
    timeline: 'Weeks 2–3',
    description: 'Exhaustive research of direct and adjacent competitors across the Building Products ecosystem to identify high-performing passive executives.',
    deliverable: 'Longlist Market Map (~30–50 targets)',
    order: 2,
  },
  {
    stepNumber: '03',
    phaseName: 'Assessment',
    title: 'Confidential Approach & Evaluation',
    timeline: 'Weeks 4–5',
    description: 'Direct partner-led outreach to pre-qualified candidates. In-depth competency interviews, commercial track-record verification, and leadership style assessment.',
    deliverable: 'Calibrated Shortlist & Detailed Candidate Profiles',
    order: 3,
  },
  {
    stepNumber: '04',
    phaseName: 'Presentation',
    title: 'Board Presentation & Negotiation',
    timeline: 'Weeks 6–7',
    description: 'Structured client-candidate interviews, psychometric appraisal alignment, references from previous board peers, and nuanced remuneration structuring.',
    deliverable: 'Shortlist Presentation & Offer Structuring',
    order: 4,
  },
  {
    stepNumber: '05',
    phaseName: 'Integration',
    title: 'Executive Onboarding & 12M Assurance',
    timeline: 'Months 1–12',
    description: 'Active onboarding support during resignation/notice periods, 30/60/90-day progress check-ins with client and appointee, backed by a 12-month placement warranty.',
    deliverable: '100-Day Review & Placement Assurance',
    order: 5,
  },
];

export const fallbackInsightArticles: InsightArticleFields[] = [
  {
    title: 'C-Suite Remuneration Benchmarks in UK Building Materials: Private Equity vs PLC',
    slug: 'c-suite-remuneration-benchmarks-building-materials',
    category: 'EXECUTIVE COMPENSATION',
    publishedDate: 'August 2026',
    readTime: '6 min read',
    excerpt: 'An analysis of base salary trends, LTIP structuring, and co-investment models for Managing Directors and CFOs across European building product manufacturing.',
    keyTakeaways: [
      'PE-backed portfolio MDs seeing equity sweat value outpace base salary expansion',
      'Commercial leadership packages shifting toward EBITDA-linked milestone bonuses',
    ],
    author: {
      fields: {
        name: 'Mark Goldsmith',
        roleTitle: 'Managing Director, MGH',
      },
    },
  },
  {
    title: 'The Building Safety Act 2022 and the Acute Shortage of Technical Directors',
    slug: 'building-safety-act-technical-director-shortage',
    category: 'REGULATORY & COMPLIANCE',
    publishedDate: 'July 2026',
    readTime: '5 min read',
    excerpt: 'How stricter compliance, Golden Thread documentation, and heightened personal liability have elevated the strategic importance and salary premiums of Technical & Compliance Directors.',
    keyTakeaways: [
      'Demand for chartered facade and fire safety engineers in board roles up 42%',
      'Cross-sector recruitment from aerospace and defense entering high-spec cladding',
    ],
    author: {
      fields: {
        name: 'MGH Research Desk',
        roleTitle: 'Industry Advisory Group',
      },
    },
  },
  {
    title: 'Consolidation in Merchant Distribution: Appointing Leaders for Buy-and-Build Integrations',
    slug: 'consolidation-merchant-distribution-leadership',
    category: 'M&A & EXPANSION',
    publishedDate: 'June 2026',
    readTime: '7 min read',
    excerpt: 'Why traditional merchant networks require a new profile of Commercial Director capable of uniting fragmented regional acquisitions under centralized digital pricing engines.',
    keyTakeaways: [
      'Omnichannel merchant leaders commanding significant premium over branch-only profiles',
      'Integration velocity directly correlates with pre-existing supplier framework tenure',
    ],
    author: {
      fields: {
        name: 'Mark Goldsmith',
        roleTitle: 'Managing Director, MGH',
      },
    },
  },
  {
    title: 'Decarbonizing Heavy Materials: The Leadership Profile for Low-Carbon Concrete & Timber',
    slug: 'decarbonizing-heavy-materials-leadership-profile',
    category: 'SUSTAINABILITY & TECH',
    publishedDate: 'May 2026',
    readTime: '4 min read',
    excerpt: 'Transitioning legacy manufacturing assets toward Net Zero requires General Managers who combine deep operational metallurgy/cement chemistry with investor-grade ESG reporting.',
    keyTakeaways: [
      'Carbon-tax implications forcing boards to seek operations leaders with EPD track records',
      'Modern Methods of Construction (MMC) scale-ups prioritizing plant automation experts',
    ],
    author: {
      fields: {
        name: 'MGH Research Desk',
        roleTitle: 'Industry Advisory Group',
      },
    },
  },
];

export const fallbackAboutPartnerData: AboutPartnerSectionData = {
  sectionLabel: 'Leadership & Practice Advisory',
  badge: 'Boutique Executive Search',
  badgeSecondary: 'Partner-led Rigor',
  headline: 'Two Decades of High-Impact Board & C-Suite Placements',
  partnerName: 'MARK GOLDSMITH',
  partnerRole: 'Head of Executive Search',
  partnerPracticeTenure: '20+ Years',
  partnerSpecialization: 'Building Products & Construction',
  partnerPlacementLevel: 'Board / MD / C-Suite',
  partnerEmail: 'mgoldsmith@mgheadhunting.co.uk',
  partnerLinkedinUrl: 'https://www.linkedin.com',
  paragraphs: [
    'Mark Goldsmith founded MG Headhunting to provide a bespoke, rigorously engineered alternative to the impersonal assembly-line recruitment models dominating the built environment sector.',
    'Having advised international manufacturing conglomerates, family-owned merchant groups, and Private Equity investment firms, Mark combines an intricate technical understanding of construction products with direct access to non-active, high-performing executive leaders.',
    'Every mandate undertaken by MGH is managed with unwavering discretion, meticulous candidate assessment, and a relentless commitment to long-term leadership retention.',
  ],
  credentialsChecklist: [
    'Strict Non-Disclosure Protocols',
    'Proven PE Value-Creation Placements',
    'Deep European Manufacturing Networks',
    'Zero Off-Limit Conflicts on Core Searches',
  ],
};

export const fallbackContactFooterData: ContactFooterSectionData = {
  bannerOverline: 'Confidential executive mandates',
  bannerTitle: 'Discuss an Executive Appointment with Mark Goldsmith',
  bannerSubtitle: 'Whether commissioning a confidential Managing Director search, restructuring commercial leadership, or seeking board advisory on compensation, connect directly with our practice leader.',
  bannerCtaText: 'Initiate Confidential Search',
  ndaTitle: 'Modular Placement Disclosure Protocol',
  ndaStatement: 'In strict adherence to executive restrictive covenants and client non-disclosure agreements, specific placement case studies and client references are shared selectively with verified clients during the calibration phase under bilateral NDA.',
  siteDescription: 'Boutique retained executive search specializing in C-suite, Board, and Director appointments across the UK and European Building Products and Construction sectors.',
  directDeskEmail: 'mgoldsmith@mgheadhunting.co.uk',
  headquarters: 'London & Home Counties, United Kingdom',
  responseGuarantee: 'Confidential Enquiries Responded < 24h',
  complianceNotice: "UK GDPR Compliant • Registered with Information Commissioner's Office (ICO) • Strict Non-Disclosure Assured",
  copyright: '© 2026 MG Headhunting Ltd. All rights reserved.',
  navLinks: fallbackSiteSettings.navLinks,
  footerSpecialisms: fallbackSiteSettings.footerSpecialisms,
  footerSubSectors: fallbackSiteSettings.footerSubSectors,
  linkedinUrl: 'https://www.linkedin.com',
};

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
