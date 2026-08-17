import { createClient } from 'contentful-management';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID || process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || 'hssdcxeme8fc';
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN || process.env.CONTENTFUL_CMA_TOKEN || '';
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master';

if (!MANAGEMENT_TOKEN) {
  console.error('Error: CONTENTFUL_MANAGEMENT_TOKEN or CONTENTFUL_CMA_TOKEN environment variable is required.');
  process.exit(1);
}

const client = createClient(
  { accessToken: MANAGEMENT_TOKEN },
  {
    type: 'plain',
    defaults: {
      spaceId: SPACE_ID,
      environmentId: ENVIRONMENT_ID,
    },
  }
);

async function runSetup() {
  console.log(`\n-----------------------------------------------------------`);
  console.log(`[MGH CMS Setup] Initializing Contentful Provisioning (Plain Client API)`);
  console.log(`Space ID: ${SPACE_ID}`);
  console.log(`Environment: ${ENVIRONMENT_ID}`);
  console.log(`-----------------------------------------------------------\n`);

  const space = await client.space.get({ spaceId: SPACE_ID });
  console.log(`✓ Connected to Contentful Space "${space.name}" (${space.sys.id})`);

  // Helper to safely create/update & publish a content type
  async function ensureContentType(id: string, name: string, displayField: string, fields: any[]) {
    let contentType;
    try {
      const existing = await client.contentType.get({ contentTypeId: id });
      console.log(`  - Updating existing content type: ${id} ("${name}")`);
      contentType = await client.contentType.update(
        { contentTypeId: id },
        {
          name,
          description: name,
          displayField,
          fields,
          sys: existing.sys,
        }
      );
    } catch (e: any) {
      console.log(`  + Creating new content type: ${id} ("${name}")`);
      contentType = await client.contentType.createWithId(
        { contentTypeId: id },
        {
          name,
          description: name,
          displayField,
          fields,
        }
      );
    }
    contentType = await client.contentType.publish(
      { contentTypeId: id },
      contentType
    );
    console.log(`  ✓ Published content type: ${id}`);
    return contentType;
  }

  // 1. Author Content Type
  await ensureContentType('author', 'Author / Partner Profile', 'name', [
    { id: 'name', name: 'Name', type: 'Symbol', required: true },
    { id: 'roleTitle', name: 'Role Title', type: 'Symbol', required: true },
    { id: 'organization', name: 'Organization', type: 'Symbol', required: false },
    { id: 'email', name: 'Direct Desk Email', type: 'Symbol', required: false },
    { id: 'linkedinUrl', name: 'LinkedIn URL', type: 'Symbol', required: false },
    { id: 'bioShort', name: 'Short Bio', type: 'Text', required: false },
    { id: 'practiceTenure', name: 'Practice Tenure', type: 'Symbol', required: false },
    { id: 'placementLevel', name: 'Placement Level', type: 'Symbol', required: false },
  ]);

  // 2. Sector Specialism Content Type
  await ensureContentType('sectorSpecialism', 'Sector Specialism', 'title', [
    { id: 'code', name: 'Practice Code (e.g. SPEC_01)', type: 'Symbol', required: true },
    {
      id: 'category',
      name: 'Category',
      type: 'Symbol',
      required: true,
      validations: [{ in: ['EXECUTIVE', 'COMMERCIAL', 'OPERATIONS', 'TECHNICAL'] }],
    },
    { id: 'title', name: 'Title', type: 'Symbol', required: true },
    { id: 'subtitle', name: 'Subtitle', type: 'Symbol', required: false },
    { id: 'description', name: 'Description', type: 'Text', required: true },
    { id: 'sampleRoles', name: 'Sample Roles', type: 'Array', items: { type: 'Symbol' }, required: true },
    { id: 'keyClients', name: 'Key Clients / Sub-Sectors', type: 'Symbol', required: true },
    { id: 'order', name: 'Display Order', type: 'Integer', required: false },
  ]);

  // 3. Difference Pillar Content Type
  await ensureContentType('differencePillar', 'The MGH Difference Pillar', 'title', [
    { id: 'pillarIndex', name: 'Pillar Index (e.g. PILLAR // 01)', type: 'Symbol', required: true },
    { id: 'title', name: 'Pillar Title', type: 'Symbol', required: true },
    { id: 'highlight', name: 'Highlight Sub-line', type: 'Symbol', required: true },
    { id: 'description', name: 'Description', type: 'Text', required: true },
    { id: 'retainedAdvantage', name: 'Retained MGH Advantage', type: 'Text', required: true },
    { id: 'contingentFlaw', name: 'Contingent Recruitment Flaw', type: 'Text', required: true },
    { id: 'iconIdentifier', name: 'Icon Key', type: 'Symbol', required: false },
    { id: 'order', name: 'Display Order', type: 'Integer', required: false },
  ]);

  // 4. Process Step Content Type
  await ensureContentType('processStep', 'Search Blueprint Step', 'title', [
    { id: 'stepNumber', name: 'Step Number (e.g. 01)', type: 'Symbol', required: true },
    { id: 'phaseName', name: 'Phase Name (e.g. CALIBRATION)', type: 'Symbol', required: true },
    { id: 'title', name: 'Step Title', type: 'Symbol', required: true },
    { id: 'timeline', name: 'Timeline (e.g. Week 1)', type: 'Symbol', required: true },
    { id: 'description', name: 'Description', type: 'Text', required: true },
    { id: 'deliverable', name: 'Deliverable Output', type: 'Symbol', required: true },
    { id: 'order', name: 'Display Order', type: 'Integer', required: false },
  ]);

  // 5. Insight Article Content Type
  await ensureContentType('insightArticle', 'Executive Insight Article', 'title', [
    { id: 'title', name: 'Article Title', type: 'Symbol', required: true },
    { id: 'slug', name: 'URL Slug', type: 'Symbol', required: true, validations: [{ unique: true }] },
    { id: 'category', name: 'Category Tag', type: 'Symbol', required: true },
    { id: 'publishedDate', name: 'Published Date / Month', type: 'Symbol', required: true },
    { id: 'readTime', name: 'Estimated Read Time', type: 'Symbol', required: true },
    { id: 'excerpt', name: 'Executive Excerpt', type: 'Text', required: true },
    { id: 'keyTakeaways', name: 'Key Takeaways', type: 'Array', items: { type: 'Symbol' }, required: true },
    { id: 'isFeatured', name: 'Featured on Homepage', type: 'Boolean', required: false },
    {
      id: 'author',
      name: 'Author Reference',
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['author'] }],
      required: false,
    },
  ]);

  // 6. Site Settings Content Type
  await ensureContentType('siteSettings', 'Site Settings & Config', 'siteName', [
    { id: 'siteName', name: 'Site Name', type: 'Symbol', required: true },
    { id: 'tagline', name: 'Tagline', type: 'Symbol', required: false },
    { id: 'primaryEmail', name: 'Primary Desk Email', type: 'Symbol', required: true },
    { id: 'phone', name: 'Telephone', type: 'Symbol', required: false },
    { id: 'headquarters', name: 'Headquarters Location', type: 'Symbol', required: false },
    { id: 'linkedinUrl', name: 'LinkedIn URL', type: 'Symbol', required: false },
    { id: 'icoRegistrationNumber', name: 'ICO Registration Statement', type: 'Symbol', required: false },
    { id: 'metaTitleDefault', name: 'Default SEO Title', type: 'Symbol', required: false },
    { id: 'metaDescriptionDefault', name: 'Default SEO Description', type: 'Text', required: false },
  ]);

  console.log(`\n===========================================================`);
  console.log(`[MGH CMS Setup] Seeding Initial Content`);
  console.log(`===========================================================\n`);

  // Helper to create or update entry
  async function seedEntry(contentTypeId: string, entryId: string, fields: Record<string, any>) {
    const formattedFields: Record<string, { 'en-US': any }> = {};
    for (const [key, value] of Object.entries(fields)) {
      formattedFields[key] = { 'en-US': value };
    }

    let entry;
    try {
      const existing = await client.entry.get({ entryId });
      console.log(`  - Updating entry [${contentTypeId}]: ${entryId}`);
      entry = await client.entry.update(
        { entryId },
        {
          fields: formattedFields,
          sys: existing.sys,
        }
      );
    } catch (e) {
      console.log(`  + Creating entry [${contentTypeId}]: ${entryId}`);
      entry = await client.entry.createWithId(
        { contentTypeId, entryId },
        {
          fields: formattedFields,
        }
      );
    }

    try {
      entry = await client.entry.publish({ entryId }, entry);
      console.log(`  ✓ Published entry: ${entryId}`);
    } catch (publishErr: any) {
      console.log(`  ! Notice on publishing ${entryId}: ${publishErr.message}`);
    }
    return entry;
  }

  // Seed Author: Mark Goldsmith
  const markAuthor = await seedEntry('author', 'author-mark-goldsmith', {
    name: 'Mark Goldsmith',
    roleTitle: 'Managing Director & Lead Search Partner',
    organization: 'MG Headhunting',
    email: 'mgoldsmith@mgheadhunting.co.uk',
    linkedinUrl: 'https://www.linkedin.com',
    bioShort: 'Head of Executive Search specializing in Board, MD, and C-Suite placements across the UK & European Building Products and Construction materials industry.',
    practiceTenure: '20+ Years',
    placementLevel: 'Board / MD / C-Suite',
  });

  // Seed Author: MGH Research Desk
  const researchDeskAuthor = await seedEntry('author', 'author-mgh-research-desk', {
    name: 'MGH Research Desk',
    roleTitle: 'Industry Advisory & Talent Intelligence Group',
    organization: 'MG Headhunting',
    email: 'mgoldsmith@mgheadhunting.co.uk',
    bioShort: 'Proprietary talent mapping and executive compensation advisory group.',
    practiceTenure: '20+ Years Cumulative',
    placementLevel: 'Executive Advisory',
  });

  // Seed Sector Specialisms
  const specialismsData = [
    {
      id: 'sec-01-md-ceo',
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
      id: 'sec-02-commercial-sales',
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
      id: 'sec-03-operations-supply-chain',
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
      id: 'sec-04-technical-rd',
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
      id: 'sec-05-finance-corp-dev',
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
      id: 'sec-06-sustainability-esg',
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

  for (const spec of specialismsData) {
    const { id, ...fields } = spec;
    await seedEntry('sectorSpecialism', id, fields);
  }

  // Seed Difference Pillars
  const pillarsData = [
    {
      id: 'pillar-01-retained-rigour',
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
      id: 'pillar-02-partner-accountability',
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
      id: 'pillar-03-blueprint-process',
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
      id: 'pillar-04-discretion',
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

  for (const pillar of pillarsData) {
    const { id, ...fields } = pillar;
    await seedEntry('differencePillar', id, fields);
  }

  // Seed Process Steps
  const processStepsData = [
    {
      id: 'step-01-calibration',
      stepNumber: '01',
      phaseName: 'CALIBRATION',
      title: 'Briefing & Strategic Calibration',
      timeline: 'Week 1',
      description: 'Comprehensive discovery with Board / PE stakeholders to establish operational metrics, cultural leadership requirements, and exact compensation structures.',
      deliverable: 'Role Specification & Search Strategy Dossier',
      order: 1,
    },
    {
      id: 'step-02-mapping',
      stepNumber: '02',
      phaseName: 'MAPPING',
      title: 'Deep Market Mapping & Intelligence',
      timeline: 'Weeks 2–3',
      description: 'Exhaustive research of direct and adjacent competitors across the Building Products ecosystem to identify high-performing passive executives.',
      deliverable: 'Longlist Market Map (~30–50 targets)',
      order: 2,
    },
    {
      id: 'step-03-assessment',
      stepNumber: '03',
      phaseName: 'ASSESSMENT',
      title: 'Confidential Approach & Evaluation',
      timeline: 'Weeks 4–5',
      description: 'Direct partner-led outreach to pre-qualified candidates. In-depth competency interviews, commercial track-record verification, and leadership style assessment.',
      deliverable: 'Calibrated Shortlist & Detailed Candidate Profiles',
      order: 3,
    },
    {
      id: 'step-04-presentation',
      stepNumber: '04',
      phaseName: 'PRESENTATION',
      title: 'Board Presentation & Negotiation',
      timeline: 'Weeks 6–7',
      description: 'Structured client-candidate interviews, psychometric appraisal alignment, references from previous board peers, and nuanced remuneration structuring.',
      deliverable: 'Shortlist Presentation & Offer Structuring',
      order: 4,
    },
    {
      id: 'step-05-integration',
      stepNumber: '05',
      phaseName: 'INTEGRATION',
      title: 'Executive Onboarding & 12M Assurance',
      timeline: 'Months 1–12',
      description: 'Active onboarding support during resignation/notice periods, 30/60/90-day progress check-ins with client and appointee, backed by a 12-month placement warranty.',
      deliverable: '100-Day Review & Placement Assurance',
      order: 5,
    },
  ];

  for (const step of processStepsData) {
    const { id, ...fields } = step;
    await seedEntry('processStep', id, fields);
  }

  // Seed Insight Articles
  const articlesData = [
    {
      id: 'insight-01-c-suite-remuneration',
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
      isFeatured: true,
      author: {
        sys: { type: 'Link', linkType: 'Entry', id: markAuthor.sys.id },
      },
    },
    {
      id: 'insight-02-building-safety-act',
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
      isFeatured: true,
      author: {
        sys: { type: 'Link', linkType: 'Entry', id: researchDeskAuthor.sys.id },
      },
    },
    {
      id: 'insight-03-consolidation-merchant-distribution',
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
      isFeatured: true,
      author: {
        sys: { type: 'Link', linkType: 'Entry', id: markAuthor.sys.id },
      },
    },
    {
      id: 'insight-04-decarbonizing-heavy-materials',
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
      isFeatured: true,
      author: {
        sys: { type: 'Link', linkType: 'Entry', id: researchDeskAuthor.sys.id },
      },
    },
  ];

  for (const article of articlesData) {
    const { id, ...fields } = article;
    await seedEntry('insightArticle', id, fields);
  }

  // Seed Site Settings
  await seedEntry('siteSettings', 'global-site-settings', {
    siteName: 'MG Headhunting',
    tagline: 'Retained Executive Search for the Built Environment',
    primaryEmail: 'mgoldsmith@mgheadhunting.co.uk',
    phone: '+44 (0) 20 7946 0198',
    headquarters: 'London & Home Counties, United Kingdom',
    linkedinUrl: 'https://www.linkedin.com',
    icoRegistrationNumber: 'UK GDPR Compliant • Registered with Information Commissioner\'s Office (ICO)',
    metaTitleDefault: 'MG Headhunting | Retained Executive Search for Building Products & Construction',
    metaDescriptionDefault: 'Boutique retained executive search delivering Board, Managing Director, and C-Suite appointments across the UK and European Building Products and Built Environment sectors.',
  });

  console.log(`\n===========================================================`);
  console.log(`✓ [MGH CMS Setup] All 6 Content Types & Entries Provisioned & Published in Space: ${SPACE_ID}!`);
  console.log(`===========================================================\n`);
}

runSetup().catch((err) => {
  console.error('[MGH CMS Setup] Failed:', err);
  process.exit(1);
});
