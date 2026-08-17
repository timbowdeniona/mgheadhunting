import { getContentfulClient } from './client';
import {
  AuthorFields,
  SectorSpecialismFields,
  DifferencePillarFields,
  ProcessStepFields,
  InsightArticleFields,
} from './types';

// Fallback Mock Data in case of network interruption or offline development
export const fallbackSpecialisms: SectorSpecialismFields[] = [
  {
    code: 'SPEC_01 // BOARD & P&L',
    category: 'EXECUTIVE',
    title: 'Managing Directors & CEOs',
    subtitle: 'General Management & Executive Leadership',
    description: 'Retained search for full P&L owners responsible for driving EBITDA expansion, navigating private equity ownership, organizational restructuring, or scale-up manufacturing.',
    sampleRoles: ['Managing Director', 'Chief Executive Officer', 'Divisional President', 'General Manager', 'Operating Partner'],
    keyClients: 'PE Portfolio Companies, Global Building Materials PLCs',
    order: 1,
  },
  {
    code: 'SPEC_02 // REVENUE & SPEC',
    category: 'COMMERCIAL',
    title: 'Commercial & Sales Directors',
    subtitle: 'Specification & Trade Distribution',
    description: 'High-performing commercial leaders experienced with architectural specification, main contractor frameworks, builders merchant distribution networks, and digital pricing models.',
    sampleRoles: ['Chief Commercial Officer', 'Commercial Director', 'Sales Director UK & Ireland', 'Head of Specification', 'National Merchant Controller'],
    keyClients: 'Façade Systems, Heavy Materials, Insulation & Drylining',
    order: 2,
  },
  {
    code: 'SPEC_03 // PLANT & LEAN',
    category: 'OPERATIONS',
    title: 'Operations & Supply Chain',
    subtitle: 'Manufacturing Excellence & Multi-Site Logistics',
    description: 'Engineering-led leaders with deep command of modern manufacturing techniques, Lean Six Sigma, capital plant investment, health & safety culture, and resilient supply chains.',
    sampleRoles: ['Chief Operating Officer', 'Operations Director', 'Plant / Site Director', 'Supply Chain Director', 'Continuous Improvement Head'],
    keyClients: 'Precast Concrete, Glass & Glazing, Brick & Ceramic Plants',
    order: 3,
  },
  {
    code: 'SPEC_04 // R&D & STANDARDS',
    category: 'TECHNICAL',
    title: 'Technical, R&D & Compliance',
    subtitle: 'Building Safety Act & Product Engineering',
    description: 'Crucial appointments safeguarding technical integrity, fire safety conformity, Building Safety Act 2022 adherence, thermal acoustics, and Modern Methods of Construction (MMC).',
    sampleRoles: ['Technical Director', 'Head of Product Development', 'Certification & Standards Director', 'Chief Engineer', 'Quality Director'],
    keyClients: 'Cladding & Roofing, Structural Timber, Fire Protection Systems',
    order: 4,
  },
  {
    code: 'SPEC_05 // CAPITAL & M&A',
    category: 'EXECUTIVE',
    title: 'Finance & Corporate Development',
    subtitle: 'CFOs & Transaction Specialists',
    description: 'Strategically minded finance directors capable of leading debt refinancing, buy-and-build M&A integrations, supply-chain cost containment, and PE value-creation plans.',
    sampleRoles: ['Chief Financial Officer', 'Finance Director', 'Head of Corporate Development', 'M&A Director', 'Financial Controller'],
    keyClients: 'Building Merchants, Fabricators, Distribution Groups',
    order: 5,
  },
  {
    code: 'SPEC_06 // SUSTAINABILITY',
    category: 'TECHNICAL',
    title: 'Sustainability & ESG Leadership',
    subtitle: 'Decarbonization & Circular Materials',
    description: 'Executive drivers of Scope 1-3 carbon reduction, Environmental Product Declarations (EPDs), embodied carbon minimization, and green building product accreditations.',
    sampleRoles: ['Head of Sustainability', 'ESG Director', 'Circular Economy Lead', 'Carbon Transition Strategist'],
    keyClients: 'Cement, Low-Carbon Concrete, Timber Systems',
    order: 6,
  },
];

export const fallbackDifferencePillars: DifferencePillarFields[] = [
  {
    pillarIndex: 'PILLAR // 01',
    title: 'Exclusively Retained Rigour',
    highlight: 'Dedicated Mandates Over Transactional Volume',
    description: 'We do not run high-volume contingent CV races. Every search is a fully retained partnership where we commit our full operational capacity until the ideal executive is placed and integrated.',
    retainedAdvantage: 'Exhaustive 100% market sweep of passive talent with verified track records.',
    contingentFlaw: 'Speed-focused CV spamming of active job seekers already in circulation.',
    iconIdentifier: 'target',
    order: 1,
  },
  {
    pillarIndex: 'PILLAR // 02',
    title: 'Direct Partner Accountability',
    highlight: 'Zero Junior Consultant Delegation',
    description: 'In traditional search firms, senior partners win the mandate and hand execution to junior researchers. At MGH, Mark Goldsmith personally maps the market, conducts candidate interviews, and leads board negotiations.',
    retainedAdvantage: 'Direct peer-to-peer discussions between C-suite candidates and a seasoned search leader.',
    contingentFlaw: 'Junior recruiters failing to understand technical nuances and boardroom dynamics.',
    iconIdentifier: 'userCheck',
    order: 2,
  },
  {
    pillarIndex: 'PILLAR // 03',
    title: 'Architectural Blueprint Process',
    highlight: 'Systematic 5-Stage Assessment Protocol',
    description: 'Every candidate undergoes structured competency evaluation, cultural calibration, referencing against previous board peers, and deep commercial validation before presentation.',
    retainedAdvantage: 'Detailed 360° candidate briefing dossiers with verified metrics and leadership impact.',
    contingentFlaw: 'Unvetted CV forwards relying on superficial candidate self-declarations.',
    iconIdentifier: 'compass',
    order: 3,
  },
  {
    pillarIndex: 'PILLAR // 04',
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
    phaseName: 'CALIBRATION',
    title: 'Briefing & Strategic Calibration',
    timeline: 'Week 1',
    description: 'Comprehensive discovery with Board / PE stakeholders to establish operational metrics, cultural leadership requirements, and exact compensation structures.',
    deliverable: 'Role Specification & Search Strategy Dossier',
    order: 1,
  },
  {
    stepNumber: '02',
    phaseName: 'MAPPING',
    title: 'Deep Market Mapping & Intelligence',
    timeline: 'Weeks 2–3',
    description: 'Exhaustive research of direct and adjacent competitors across the Building Products ecosystem to identify high-performing passive executives.',
    deliverable: 'Longlist Market Map (~30–50 targets)',
    order: 2,
  },
  {
    stepNumber: '03',
    phaseName: 'ASSESSMENT',
    title: 'Confidential Approach & Evaluation',
    timeline: 'Weeks 4–5',
    description: 'Direct partner-led outreach to pre-qualified candidates. In-depth competency interviews, commercial track-record verification, and leadership style assessment.',
    deliverable: 'Calibrated Shortlist & Detailed Candidate Profiles',
    order: 3,
  },
  {
    stepNumber: '04',
    phaseName: 'PRESENTATION',
    title: 'Board Presentation & Negotiation',
    timeline: 'Weeks 6–7',
    description: 'Structured client-candidate interviews, psychometric appraisal alignment, references from previous board peers, and nuanced remuneration structuring.',
    deliverable: 'Shortlist Presentation & Offer Structuring',
    order: 4,
  },
  {
    stepNumber: '05',
    phaseName: 'INTEGRATION',
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

export async function fetchSectorSpecialisms(preview = false): Promise<SectorSpecialismFields[]> {
  try {
    const client = getContentfulClient(preview);
    const response = await client.getEntries<any>({
      content_type: 'sectorSpecialism',
      order: ['fields.order', 'fields.code'] as any,
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
      order: ['fields.order', 'fields.pillarIndex'] as any,
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

export async function fetchAuthorBySlugOrId(id: string, preview = false): Promise<AuthorFields | null> {
  try {
    const client = getContentfulClient(preview);
    const entry = await client.getEntry<any>(id);
    if (entry && entry.fields) {
      return entry.fields as unknown as AuthorFields;
    }
  } catch (err) {
    console.warn(`[Contentful API] fetchAuthorBySlugOrId(${id}) error:`, err);
  }
  return {
    name: 'Mark Goldsmith',
    roleTitle: 'Managing Director & Lead Search Partner',
    organization: 'MG Headhunting',
    email: 'mgoldsmith@mgheadhunting.co.uk',
    practiceTenure: '20+ Years',
    placementLevel: 'Board / MD / C-Suite',
  };
}
