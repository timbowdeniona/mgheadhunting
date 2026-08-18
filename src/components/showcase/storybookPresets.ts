import { PageSectionBlock } from '../../lib/contentful/types';

export interface BlockMeta {
  id: string;
  type: PageSectionBlock['type'];
  name: string;
  category: 'Headers & Heroes' | 'Performance & Proof' | 'Structure & Process' | 'Editorial & Content' | 'Advisory & Conversion';
  description: string;
  contentfulModel: string;
  defaultProps: PageSectionBlock;
  variants?: { label: string; props: PageSectionBlock }[];
}

export const BLOCK_CATALOG: BlockMeta[] = [
  // 1. Page Header Block
  {
    id: 'pageHeader',
    type: 'pageHeader',
    name: 'Page Header Block',
    category: 'Headers & Heroes',
    description: 'High-impact subpage hero with category badges, technical coordinates, highlighted phrase, and breadcrumb trails.',
    contentfulModel: 'blockPageHeader',
    defaultProps: {
      type: 'pageHeader',
      badge: 'FIRM OVERVIEW',
      overline: 'BOUTIQUE RETAINED SEARCH',
      title: 'Executive Search Precision Engineered for',
      highlightedPhrase: 'Building Products & Construction Leadership',
      subtitle: 'Dedicated partner-led executive search connecting leading manufacturers, merchants, and private equity investors with board-level and operational leadership.',
      coordinate: 'MGH // PRACTICE-OVERVIEW',
      breadcrumbs: [
        { label: 'About', href: '/about' },
      ],
    },
    variants: [
      {
        label: 'Sectors Variant',
        props: {
          type: 'pageHeader',
          badge: 'PRACTICE AREAS',
          overline: 'SPECIALIST EXECUTIVE SEARCH',
          title: 'Deep Domain Expertise Across the',
          highlightedPhrase: 'Built Environment Ecosystem',
          subtitle: 'From heavyside manufacturing to national distribution networks, we place C-suite and senior operational leaders who drive transformational growth.',
          coordinate: 'MGH // SECTOR-MATRIX',
          breadcrumbs: [{ label: 'Sectors', href: '/sectors' }],
        },
      },
      {
        label: 'Search Blueprint Variant',
        props: {
          type: 'pageHeader',
          badge: 'METHODOLOGY',
          overline: '5-STAGE BLUEPRINT',
          title: 'Disciplined, Milestone-Driven',
          highlightedPhrase: 'Retained Search Protocol',
          subtitle: 'Our structured search process delivers 100% shortlist presentation within 22 working days, led personally by our Managing Partner.',
          coordinate: 'MGH // SEARCH-PROTOCOL',
          breadcrumbs: [{ label: 'Retained Search', href: '/retained-search' }],
        },
      },
    ],
  },

  // 2. Architectural Hero Block
  {
    id: 'hero',
    type: 'hero',
    name: 'Architectural Hero Block',
    category: 'Headers & Heroes',
    description: 'Full homepage hero banner with executive trust metrics, coordinate indicators, and search initiation triggers.',
    contentfulModel: 'blockHero',
    defaultProps: {
      type: 'hero',
      badgeOverline: 'EXECUTIVE SEARCH PRACTICE',
      badgeCategory: 'EXCLUSIVE RETAINED SEARCH',
      headline: 'Retained Search for the Built Environment',
      subtitle: 'Placing Board-Level Executives, Managing Directors, and Functional Heads across Heavy Building Materials, Specialist Distribution, and Construction Technologies.',
    },

  },

  // 3. Metrics & Performance Stats Block
  {
    id: 'metricsStats',
    type: 'metricsStats',
    name: 'Metrics & Performance Stats',
    category: 'Performance & Proof',
    description: 'Numeric credibility cards displaying placement rates, timelines, and retention benchmarks with verification audit tags.',
    contentfulModel: 'blockMetricsStats',
    defaultProps: {
      type: 'metricsStats',
      sectionLabel: 'VERIFIED TRACK RECORD',
      title: 'Performance Benchmarks That Define Our Practice',
      subtitle: 'Every mandate is measured against strict performance guarantees and transparent milestone reporting.',
      stats: [
        {
          label: 'Mandate Completion Rate',
          value: '100%',
          description: 'Every retained search commissioned is delivered to signed contract.',
          tag: 'AUDIT',
        },
        {
          label: 'Average Days to Shortlist',
          value: '22',
          description: 'Calibrated candidates presented within 4.4 weeks.',
          tag: 'SPEED',
        },
        {
          label: '24-Month Retention Rate',
          value: '98.4%',
          description: 'Long-term leadership impact verified post-placement.',
          tag: 'STABILITY',
        },
        {
          label: 'Partner-Led Delivery',
          value: '1:1',
          description: 'Direct accountability from Managing Partner Mark Goldsmith.',
          tag: 'GOVERNANCE',
        },
      ],
    },
  },

  // 4. Difference Pillars Block
  {
    id: 'differencePillars',
    type: 'differencePillars',
    name: 'Difference Pillars Block',
    category: 'Performance & Proof',
    description: 'Structural advantage comparison cards contrasting boutique retained executive search against contingency agency models.',
    contentfulModel: 'blockDifferencePillars',
    defaultProps: {
      type: 'differencePillars',
      sectionLabel: 'STRUCTURAL ADVANTAGES',
      title: 'Engineered for Precision, Not Volume',
      description: 'Why PE firms and boards choose boutique retained search over transactional contingency headhunting.',
    },
  },

  // 5. Sector Specialisms Grid Block
  {
    id: 'sectorGrid',
    type: 'sectorGrid',
    name: 'Sector Specialisms Grid',
    category: 'Structure & Process',
    description: 'Interactive 4-column practice matrix spanning Executive, Commercial, Operations, and Technical functional disciplines.',
    contentfulModel: 'blockSectorGrid',
    defaultProps: {
      type: 'sectorGrid',
      sectionLabel: 'CORE SPECIALISMS',
      title: 'Executive Appointments Across Four Core Pillars',
      description: 'We recruit the board and operational leaders who shape the manufacturing, supply, and installation of building products.',
    },
  },

  // 6. Process Timeline Blueprint Block
  {
    id: 'processTimeline',
    type: 'processTimeline',
    name: 'Process Timeline Blueprint',
    category: 'Structure & Process',
    description: 'Interactive 5-stage milestone blueprint with timing, deliverables, and partner-led governance at each phase.',
    contentfulModel: 'blockProcessTimeline',
    defaultProps: {
      type: 'processTimeline',
      sectionLabel: 'SEARCH BLUEPRINT',
      title: 'A Disciplined 5-Stage Executive Search Methodology',
      description: 'Precision-engineered from initial stakeholder calibration to executive onboarding and post-placement audit.',
    },
  },

  // 7. Editorial Rich Text Block
  {
    id: 'editorialRichText',
    type: 'editorialRichText',
    name: 'Editorial Rich Text Block',
    category: 'Editorial & Content',
    description: 'Structured long-form editorial section with lead text, pull quotes with author attribution, and key takeaway checklist pills.',
    contentfulModel: 'blockEditorialRichText',
    defaultProps: {
      type: 'editorialRichText',
      sectionLabel: 'OPERATING ETHOS',
      title: 'Why Deep Domain Expertise Outperforms Generalist Agencies',
      subtitle: 'The building materials sector is defined by complex distribution channels, regulatory compliance, and tight margins.',
      layout: 'sidebar',
      leadParagraph: 'In an industry undergoing rapid decarbonisation, regulatory scrutiny under the Building Safety Act, and channel consolidation, generic recruitment algorithms fail. Executive appointments demand granular understanding of heavyside manufacturing, merchant trade dynamics, and installer relationships.',
      quoteCallout: {
        quote: 'We do not operate as CV brokers. We act as confidential strategic advisors to boards making decisive leadership appointments.',
        attribution: 'Mark Goldsmith',
        role: 'Managing Partner',
      },
      keyTakeaways: [
        'Proprietary network across 2,400+ verified C-suite & Director-level executives',
        'Strict off-limits protection ensuring uncompromised talent access',
        'Direct partner accountability with zero junior consultant delegation',
        'Comprehensive 12-month post-placement warranty on all mandates',
      ],
    },
    variants: [
      {
        label: 'Two Column Layout',
        props: {
          type: 'editorialRichText',
          sectionLabel: 'SEARCH METHODOLOGY',
          title: 'The Discipline of Off-Limits and Talent Access',
          subtitle: 'Why boutique search firms offer broader access to premier leadership than global mega-agencies.',
          layout: 'two-column',
          leadParagraph: 'Global agency conglomerates are constrained by massive client off-limits lists, preventing them from approaching top performers at competitor organizations. Our boutique structure ensures minimal conflicts of interest.',
          quoteCallout: {
            quote: 'Boutique retained search is the only model that aligns 100% with client exclusivity and unfettered candidate access.',
            attribution: 'Mark Goldsmith',
            role: 'Managing Partner',
          },
          keyTakeaways: [
            'Full access to 95%+ of target organizations in the sector',
            'Zero passive reliance on job boards or inbound applications',
            'Rigorous candidate psychological & capability assessments',
          ],
        },
      },
    ],
  },

  // 8. Team / Partner Leadership Profile Block
  {
    id: 'teamProfile',
    type: 'teamProfile',
    name: 'Team / Partner Profile Block',
    category: 'Editorial & Content',
    description: 'Detailed practice leadership dossier for Mark Goldsmith with credentials checklist, tenure badges, and direct contact details.',
    contentfulModel: 'blockTeamProfile',
    defaultProps: {
      type: 'teamProfile',
      sectionLabel: 'PRACTICE LEADERSHIP',
      badge: 'MANAGING PARTNER',
      badgeSecondary: '20+ YEARS SECTOR FOCUS',
      headline: 'Dedicated Executive Search Built on Decades of Domain Depth',
      partnerName: 'Mark Goldsmith',
      partnerRole: 'Managing Partner',
      partnerPracticeTenure: '20+ Years in Executive Search',
      partnerSpecialization: 'Building Products & Construction Leadership',
      partnerPlacementLevel: 'Board, C-Suite & Functional Directors',
      partnerEmail: 'mark@mgheadhunting.co.uk',
      partnerLinkedinUrl: 'https://www.linkedin.com/in/markgoldsmith-mgh',
      paragraphs: [
        'Mark Goldsmith has spent over two decades advising chairpersons, chief executives, and private equity investors on critical leadership appointments across the built environment.',
        'Prior to founding MG Headhunting, Mark led executive search practices for top-tier search firms, developing an unparallelled proprietary network spanning the UK and European building materials supply chains.',
      ],
      credentialsChecklist: [
        'Personal oversight and delivery of 250+ senior executive appointments',
        'Trusted advisor to PE portfolio companies and FTSE 250 boards',
        'Recognized specialist in Building Safety Act & ESG leadership transitions',
        'Active member of the Executive Search Committee for the Built Environment',
      ],
    },
  },

  // 9. FAQ Accordion Block
  {
    id: 'faqAccordion',
    type: 'faqAccordion',
    name: 'FAQ Accordion Block',
    category: 'Advisory & Conversion',
    description: 'Interactive expanding accordion panels for legal scoping, fee structures, off-limits policies, and warranties.',
    contentfulModel: 'blockFaqAccordion',
    defaultProps: {
      type: 'faqAccordion',
      sectionLabel: 'PRACTICE ADVISORY',
      title: 'Frequently Asked Questions Regarding Retained Mandates',
      description: 'Clear answers on fee structures, timelines, confidentiality protocols, and placement warranties.',
      items: [
        {
          question: 'How does your retained fee structure work?',
          category: 'COMMERCIAL TERMS',
          answer: 'Our fees are structured into three milestone-driven stages: 1/3 upon mandate initiation and calibration, 1/3 upon presentation of the qualified shortlist, and 1/3 upon signed contract acceptance. We do not charge speculative contingency fees.',
        },
        {
          question: 'What is your placement warranty and guarantee policy?',
          category: 'ASSURANCE',
          answer: 'All executive placements come with a comprehensive 12-month placement warranty. In the rare event that an appointed executive departs within 12 months, we re-conduct the entire search at zero additional professional fee.',
        },
        {
          question: 'What are your off-limits policies?',
          category: 'TALENT ACCESS',
          answer: 'Because we operate as a focused boutique, our client list is selectively managed to ensure we have uninhibited talent access to over 95% of target companies across the sector.',
        },
        {
          question: 'How do you protect confidentiality on sensitive appointments?',
          category: 'SECURITY & NDA',
          answer: 'We enforce strict NDAs prior to disclosing any client identification. Initial calibration and market mapping are conducted discreetly under code names when commissioning confidential replacements.',
        },
      ],
    },
  },

  // 10. CTA Banner Block
  {
    id: 'ctaBanner',
    type: 'ctaBanner',
    name: 'CTA Conversion Banner',
    category: 'Advisory & Conversion',
    description: 'High-converting conversion banner with theme variants (navy, blueprint, outline) and mandate modal trigger hooks.',
    contentfulModel: 'blockCtaBanner',
    defaultProps: {
      type: 'ctaBanner',
      variant: 'navy',
      overline: 'CONFIDENTIAL EXECUTIVE SEARCH',
      title: 'Commission a Retained Executive Search Mandate',
      description: 'Discuss your talent requirements directly with Managing Partner Mark Goldsmith under strict mutual NDA.',
      primaryCtaText: 'Initiate Search Protocol',
      primaryCtaAction: 'searchModal',
      secondaryCtaText: 'Contact Direct Desk',
      secondaryCtaHref: '/contact',
      guaranteeNotice: 'Strict NDA Compliance • 100% Delivery Commitment',
    },
    variants: [
      {
        label: 'Blueprint Theme',
        props: {
          type: 'ctaBanner',
          variant: 'blueprint',
          overline: 'STRATEGIC TALENT BENCHMARKING',
          title: 'Planning a Critical Leadership Succession?',
          description: 'Benchmark internal candidates against market leaders across the UK and European built environment.',
          primaryCtaText: 'Initiate Search Protocol',
          primaryCtaAction: 'searchModal',
          secondaryCtaText: 'Explore Specialisms',
          secondaryCtaHref: '/sectors',
          guaranteeNotice: 'Milestone-driven calibration • 22-day shortlist presentation',
        },
      },
      {
        label: 'Outline Theme',
        props: {
          type: 'ctaBanner',
          variant: 'outline',
          overline: 'DIRECT ENGAGEMENT',
          title: 'Speak Directly With Our Practice Leader',
          description: 'Get immediate clarity on market availability, compensation benchmarks, and timeline feasibility.',
          primaryCtaText: 'Contact Direct Desk',
          primaryCtaHref: '/contact',
          secondaryCtaText: 'Download Firm Overview',
          secondaryCtaHref: '/about',
          guaranteeNotice: 'Encrypted intake • Response within 24 business hours',
        },
      },
    ],
  },

  // 11. Contact Direct Desk Block
  {
    id: 'contactDesk',
    type: 'contactDesk',
    name: 'Contact Direct Desk Block',
    category: 'Advisory & Conversion',
    description: 'Partner desk intake with direct phone, email, London headquarters, and NDA security commitments.',
    contentfulModel: 'blockContactDesk',
    defaultProps: {
      type: 'contactDesk',
      sectionLabel: 'DIRECT ENGAGEMENT',
      title: 'Partner-Level Access From Day One',
      description: 'Every client engagement begins with a confidential briefing directly with Managing Partner Mark Goldsmith.',
      email: 'mark@mgheadhunting.co.uk',
      phone: '+44 (0) 20 7946 0912',
      headquarters: '100 Pall Mall, St. James’s, London SW1Y 5NQ',
      ndaNotice: 'All correspondence and preliminary discussions are handled under strict professional confidentiality and mutual non-disclosure agreements.',
    },
  },

  // 12. Insights Teaser Block
  {
    id: 'insightsTeaser',
    type: 'insightsTeaser',
    name: 'Market Intelligence Teaser',
    category: 'Advisory & Conversion',
    description: 'Executive briefing cards teaser highlighting latest C-suite remuneration and industry regulatory analysis.',
    contentfulModel: 'blockInsightsTeaser',
    defaultProps: {
      type: 'insightsTeaser',
      sectionLabel: 'MARKET INTELLIGENCE',
      title: 'Executive Insights for Built Environment Leaders',
      description: 'Proprietary research and analysis on executive compensation, leadership talent pipelines, and regulatory shifts.',
    },
  },
];
