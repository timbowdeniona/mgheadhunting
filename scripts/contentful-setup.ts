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

function createRichTextDoc(elements: Array<{ type: 'h2' | 'h3' | 'p' | 'quote' | 'ul'; text?: string; items?: string[] }>) {
  return {
    nodeType: 'document',
    data: {},
    content: elements.map((el) => {
      if (el.type === 'h2') {
        return {
          nodeType: 'heading-2',
          data: {},
          content: [{ nodeType: 'text', value: el.text || '', marks: [], data: {} }],
        };
      }
      if (el.type === 'h3') {
        return {
          nodeType: 'heading-3',
          data: {},
          content: [{ nodeType: 'text', value: el.text || '', marks: [], data: {} }],
        };
      }
      if (el.type === 'quote') {
        return {
          nodeType: 'blockquote',
          data: {},
          content: [
            {
              nodeType: 'paragraph',
              data: {},
              content: [{ nodeType: 'text', value: el.text || '', marks: [{ type: 'italic' }], data: {} }],
            },
          ],
        };
      }
      if (el.type === 'ul') {
        return {
          nodeType: 'unordered-list',
          data: {},
          content: (el.items || []).map((item) => ({
            nodeType: 'list-item',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                data: {},
                content: [{ nodeType: 'text', value: item, marks: [], data: {} }],
              },
            ],
          })),
        };
      }
      return {
        nodeType: 'paragraph',
        data: {},
        content: [{ nodeType: 'text', value: el.text || '', marks: [], data: {} }],
      };
    }),
  };
}

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
      try {
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
      } catch (updateErr: any) {
        console.log(`  ! Incompatible field change detected for "${id}". Recreating content type cleanly...`);
        // If field types changed incompatibly (e.g. Object -> Array), unpublish and delete old entries
        try {
          const entries = await client.entry.getMany({
            query: { content_type: id, limit: 100 },
          });
          for (const item of entries.items) {
            try {
              await client.entry.unpublish({ entryId: item.sys.id });
            } catch (_) {}
            try {
              await client.entry.delete({ entryId: item.sys.id });
            } catch (_) {}
          }
        } catch (_) {}

        // Unpublish content type
        try {
          await client.contentType.unpublish({ contentTypeId: id });
        } catch (_) {}
        // Delete content type
        try {
          await client.contentType.delete({ contentTypeId: id });
        } catch (_) {}

        // Create new content type with updated fields
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

  // Helper to safely create/update & publish an Asset
  async function ensureAsset(id: string, title: string, description: string, uploadUrl: string) {
    let asset;
    try {
      const existing = await client.asset.get({ assetId: id });
      console.log(`  - Updating existing asset: ${id} ("${title}")`);
      asset = await client.asset.update(
        { assetId: id },
        {
          fields: {
            title: { 'en-US': title },
            description: { 'en-US': description },
            file: {
              'en-US': {
                contentType: 'image/jpeg',
                fileName: `${id}.jpg`,
                upload: uploadUrl,
              },
            },
          },
          sys: existing.sys,
        }
      );
    } catch (e) {
      console.log(`  + Creating new asset: ${id} ("${title}")`);
      asset = await client.asset.createWithId(
        { assetId: id },
        {
          fields: {
            title: { 'en-US': title },
            description: { 'en-US': description },
            file: {
              'en-US': {
                contentType: 'image/jpeg',
                fileName: `${id}.jpg`,
                upload: uploadUrl,
              },
            },
          },
        }
      );
    }

    try {
      await client.asset.processForAllLocales({}, asset);
      let processed = false;
      let attempts = 0;
      while (!processed && attempts < 15) {
        await new Promise((r) => setTimeout(r, 1000));
        const current = await client.asset.get({ assetId: id });
        if (current.fields.file?.['en-US']?.url) {
          asset = current;
          processed = true;
        }
        attempts++;
      }
      asset = await client.asset.publish({ assetId: id }, asset);
      console.log(`  ✓ Published asset: ${id}`);
    } catch (err: any) {
      console.log(`  ! Notice processing asset ${id}: ${err.message}`);
    }
    return asset;
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

  // 5. Insight Article Content Type (Extended with body and coverImage)
  await ensureContentType('insightArticle', 'Executive Insight Article', 'title', [
    { id: 'title', name: 'Article Title', type: 'Symbol', required: true },
    { id: 'slug', name: 'URL Slug', type: 'Symbol', required: true, validations: [{ unique: true }] },
    { id: 'category', name: 'Category Tag', type: 'Symbol', required: true },
    { id: 'publishedDate', name: 'Published Date / Month', type: 'Symbol', required: true },
    { id: 'readTime', name: 'Estimated Read Time', type: 'Symbol', required: true },
    { id: 'excerpt', name: 'Executive Excerpt', type: 'Text', required: true },
    { id: 'keyTakeaways', name: 'Key Takeaways', type: 'Array', items: { type: 'Symbol' }, required: true },
    { id: 'body', name: 'Article Body (Rich Text)', type: 'RichText', required: false },
    {
      id: 'coverImage',
      name: 'Cover Image',
      type: 'Link',
      linkType: 'Asset',
      required: false,
    },
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
    { id: 'navLinks', name: 'Navigation Menu Items (JSON)', type: 'Object', required: false },
    { id: 'footerSpecialisms', name: 'Footer Specialisms List', type: 'Array', items: { type: 'Symbol' }, required: false },
    { id: 'footerSubSectors', name: 'Footer Sub Sectors List', type: 'Array', items: { type: 'Symbol' }, required: false },
    { id: 'copyrightText', name: 'Copyright Statement', type: 'Symbol', required: false },
    { id: 'icoRegistrationNumber', name: 'ICO Registration Statement', type: 'Symbol', required: false },
    { id: 'metaTitleDefault', name: 'Default SEO Title', type: 'Symbol', required: false },
    { id: 'metaDescriptionDefault', name: 'Default SEO Description', type: 'Text', required: false },
  ]);

  // -----------------------------------------------------------
  // 7. Composable Design System Block Content Types
  // -----------------------------------------------------------

  // 7a. Block: Page Header
  await ensureContentType('blockPageHeader', 'Block: Page Header', 'internalName', [
    { id: 'internalName', name: 'Internal Name', type: 'Symbol', required: true },
    { id: 'badge', name: 'Badge Label', type: 'Symbol', required: false },
    { id: 'overline', name: 'Overline', type: 'Symbol', required: false },
    { id: 'title', name: 'Headline Prefix', type: 'Symbol', required: true },
    { id: 'highlightedPhrase', name: 'Highlighted Phrase', type: 'Symbol', required: false },
    { id: 'subtitle', name: 'Subtitle / Description', type: 'Text', required: false },
    { id: 'coordinate', name: 'Technical Coordinate', type: 'Symbol', required: false },
    { id: 'breadcrumbs', name: 'Breadcrumbs List', type: 'Array', items: { type: 'Symbol' }, required: false },
  ]);

  // 7b. Block: Metric Item
  await ensureContentType('blockMetricItem', 'Block: Metric Item', 'label', [
    { id: 'label', name: 'Metric Label', type: 'Symbol', required: true },
    { id: 'value', name: 'Metric Value', type: 'Symbol', required: true },
    { id: 'description', name: 'Audit Note / Description', type: 'Symbol', required: false },
    { id: 'tag', name: 'Category Tag', type: 'Symbol', required: false },
  ]);

  // 7c. Block: Metrics & Stats Section
  await ensureContentType('blockMetricsStats', 'Block: Metrics & Stats Section', 'internalName', [
    { id: 'internalName', name: 'Internal Name', type: 'Symbol', required: true },
    { id: 'sectionLabel', name: 'Section Label', type: 'Symbol', required: false },
    { id: 'title', name: 'Section Title', type: 'Symbol', required: true },
    { id: 'subtitle', name: 'Section Subtitle', type: 'Text', required: false },
    {
      id: 'stats',
      name: 'Metric Cards List',
      type: 'Array',
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [{ linkContentType: ['blockMetricItem'] }],
      },
      required: true,
    },
  ]);

  // 7d. Block: FAQ Item
  await ensureContentType('blockFaqItem', 'Block: FAQ Item', 'question', [
    { id: 'question', name: 'Question', type: 'Symbol', required: true },
    { id: 'category', name: 'Category Label', type: 'Symbol', required: false },
    { id: 'answer', name: 'Answer', type: 'Text', required: true },
  ]);

  // 7e. Block: FAQ Accordion Section
  await ensureContentType('blockFaqAccordion', 'Block: FAQ Accordion Section', 'internalName', [
    { id: 'internalName', name: 'Internal Name', type: 'Symbol', required: true },
    { id: 'sectionLabel', name: 'Section Label', type: 'Symbol', required: false },
    { id: 'title', name: 'Section Title', type: 'Symbol', required: true },
    { id: 'description', name: 'Section Description', type: 'Text', required: false },
    {
      id: 'items',
      name: 'FAQ Questions List',
      type: 'Array',
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [{ linkContentType: ['blockFaqItem'] }],
      },
      required: true,
    },
  ]);

  // 7f. Block: CTA Banner
  await ensureContentType('blockCtaBanner', 'Block: CTA Banner', 'internalName', [
    { id: 'internalName', name: 'Internal Name', type: 'Symbol', required: true },
    {
      id: 'variant',
      name: 'Theme Variant',
      type: 'Symbol',
      required: false,
      validations: [{ in: ['navy', 'blueprint', 'outline'] }],
    },
    { id: 'overline', name: 'Overline Badge', type: 'Symbol', required: false },
    { id: 'title', name: 'Banner Headline', type: 'Symbol', required: true },
    { id: 'description', name: 'Banner Subtitle', type: 'Text', required: false },
    { id: 'primaryCtaText', name: 'Primary Button Label', type: 'Symbol', required: false },
    {
      id: 'primaryCtaAction',
      name: 'Primary Button Action',
      type: 'Symbol',
      required: false,
      validations: [{ in: ['searchModal', 'link'] }],
    },
    { id: 'primaryCtaHref', name: 'Primary Button Link', type: 'Symbol', required: false },
    { id: 'secondaryCtaText', name: 'Secondary Button Label', type: 'Symbol', required: false },
    { id: 'secondaryCtaHref', name: 'Secondary Button Link', type: 'Symbol', required: false },
    { id: 'guaranteeNotice', name: 'Guarantee Notice', type: 'Symbol', required: false },
  ]);

  // 7g. Block: Editorial Rich Text
  await ensureContentType('blockEditorialRichText', 'Block: Editorial Rich Text', 'internalName', [
    { id: 'internalName', name: 'Internal Name', type: 'Symbol', required: true },
    { id: 'sectionLabel', name: 'Section Label', type: 'Symbol', required: false },
    { id: 'title', name: 'Article Title', type: 'Symbol', required: true },
    { id: 'subtitle', name: 'Article Subtitle', type: 'Text', required: false },
    {
      id: 'layout',
      name: 'Layout Variant',
      type: 'Symbol',
      required: false,
      validations: [{ in: ['sidebar', 'two-column', 'single-column'] }],
    },
    { id: 'leadParagraph', name: 'Lead Intro Paragraph', type: 'Text', required: false },
    { id: 'quoteText', name: 'Pull Quote Text', type: 'Text', required: false },
    { id: 'quoteAuthor', name: 'Pull Quote Author', type: 'Symbol', required: false },
    { id: 'quoteRole', name: 'Pull Quote Role', type: 'Symbol', required: false },
    { id: 'keyTakeaways', name: 'Key Takeaways Checklist', type: 'Array', items: { type: 'Symbol' }, required: false },
  ]);

  // 7h. Block: Contact Direct Desk
  await ensureContentType('blockContactDesk', 'Block: Contact Direct Desk', 'internalName', [
    { id: 'internalName', name: 'Internal Name', type: 'Symbol', required: true },
    { id: 'sectionLabel', name: 'Section Label', type: 'Symbol', required: false },
    { id: 'title', name: 'Section Title', type: 'Symbol', required: true },
    { id: 'description', name: 'Section Description', type: 'Text', required: false },
    { id: 'email', name: 'Desk Email Address', type: 'Symbol', required: false },
    { id: 'phone', name: 'Direct Phone Number', type: 'Symbol', required: false },
    { id: 'headquarters', name: 'Headquarters Location', type: 'Symbol', required: false },
    { id: 'ndaNotice', name: 'NDA Notice', type: 'Text', required: false },
  ]);

  // 7i. Block: Sector Specialisms Grid
  await ensureContentType('blockSectorGrid', 'Block: Sector Specialisms Grid', 'internalName', [
    { id: 'internalName', name: 'Internal Name', type: 'Symbol', required: true },
    { id: 'sectionLabel', name: 'Section Label', type: 'Symbol', required: false },
    { id: 'title', name: 'Section Title', type: 'Symbol', required: true },
    { id: 'description', name: 'Section Description', type: 'Text', required: false },
  ]);

  // 7j. Block: Difference Pillars
  await ensureContentType('blockDifferencePillars', 'Block: Difference Pillars', 'internalName', [
    { id: 'internalName', name: 'Internal Name', type: 'Symbol', required: true },
    { id: 'sectionLabel', name: 'Section Label', type: 'Symbol', required: false },
    { id: 'title', name: 'Section Title', type: 'Symbol', required: true },
    { id: 'description', name: 'Section Description', type: 'Text', required: false },
  ]);

  // 7k. Block: Process Timeline
  await ensureContentType('blockProcessTimeline', 'Block: Process Timeline', 'internalName', [
    { id: 'internalName', name: 'Internal Name', type: 'Symbol', required: true },
    { id: 'sectionLabel', name: 'Section Label', type: 'Symbol', required: false },
    { id: 'title', name: 'Section Title', type: 'Symbol', required: true },
    { id: 'description', name: 'Section Description', type: 'Text', required: false },
  ]);

  // 7l. Block: Team / Partner Profile
  await ensureContentType('blockTeamProfile', 'Block: Team / Partner Profile', 'internalName', [
    { id: 'internalName', name: 'Internal Name', type: 'Symbol', required: true },
    { id: 'sectionLabel', name: 'Section Label', type: 'Symbol', required: false },
    { id: 'badge', name: 'Primary Badge', type: 'Symbol', required: false },
    { id: 'badgeSecondary', name: 'Secondary Badge', type: 'Symbol', required: false },
    { id: 'headline', name: 'Dossier Headline', type: 'Symbol', required: true },
    { id: 'partnerName', name: 'Partner Full Name', type: 'Symbol', required: true },
    { id: 'partnerRole', name: 'Partner Role Title', type: 'Symbol', required: false },
    { id: 'partnerPracticeTenure', name: 'Practice Tenure', type: 'Symbol', required: false },
    { id: 'partnerSpecialization', name: 'Specialization Focus', type: 'Symbol', required: false },
    { id: 'partnerPlacementLevel', name: 'Placement Level', type: 'Symbol', required: false },
    { id: 'partnerEmail', name: 'Direct Email', type: 'Symbol', required: false },
    { id: 'partnerLinkedinUrl', name: 'LinkedIn URL', type: 'Symbol', required: false },
    { id: 'paragraphs', name: 'Biography Paragraphs', type: 'Array', items: { type: 'Symbol' }, required: false },
    { id: 'credentialsChecklist', name: 'Credentials Checklist', type: 'Array', items: { type: 'Symbol' }, required: false },
  ]);

  // 7m. Block: Insights Teaser
  await ensureContentType('blockInsightsTeaser', 'Block: Insights Teaser', 'internalName', [
    { id: 'internalName', name: 'Internal Name', type: 'Symbol', required: true },
    { id: 'sectionLabel', name: 'Section Label', type: 'Symbol', required: false },
    { id: 'title', name: 'Section Title', type: 'Symbol', required: true },
    { id: 'description', name: 'Section Description', type: 'Text', required: false },
  ]);

  // 7n. Block: Architectural Hero
  await ensureContentType('blockHero', 'Block: Architectural Hero', 'internalName', [
    { id: 'internalName', name: 'Internal Name', type: 'Symbol', required: true },
    { id: 'badge', name: 'Top Badge', type: 'Symbol', required: false },
    { id: 'title', name: 'Hero Headline', type: 'Symbol', required: true },
    { id: 'description', name: 'Hero Subtitle', type: 'Text', required: false },
  ]);

  // 8. Modular Drag-and-Drop Page Content Type
  await ensureContentType('modularPage', 'Modular Componentised Page', 'title', [
    { id: 'title', name: 'Page Title', type: 'Symbol', required: true },
    { id: 'slug', name: 'URL Slug', type: 'Symbol', required: true, validations: [{ unique: true }] },
    { id: 'metaTitle', name: 'Meta SEO Title', type: 'Symbol', required: false },
    { id: 'metaDescription', name: 'Meta SEO Description', type: 'Text', required: false },
    { id: 'showHeader', name: 'Show Header Navigation', type: 'Boolean', required: false },
    { id: 'showFooter', name: 'Show Contact Footer', type: 'Boolean', required: false },
    {
      id: 'sections',
      name: 'Sections (Drag & Drop Blocks)',
      type: 'Array',
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [
          {
            linkContentType: [
              'blockPageHeader',
              'blockMetricsStats',
              'blockFaqAccordion',
              'blockCtaBanner',
              'blockEditorialRichText',
              'blockContactDesk',
              'blockSectorGrid',
              'blockDifferencePillars',
              'blockProcessTimeline',
              'blockTeamProfile',
              'blockInsightsTeaser',
              'blockHero',
            ],
          },
        ],
      },
      required: true,
    },
  ]);

  // 9. Homepage Content Type
  await ensureContentType('homepage', 'Homepage Configuration', 'internalTitle', [
    { id: 'internalTitle', name: 'Internal Title', type: 'Symbol', required: true, validations: [{ unique: true }] },
    
    // Hero Section
    { id: 'heroBadgeOverline', name: 'Hero Badge Overline', type: 'Symbol', required: false },
    { id: 'heroBadgeCategory', name: 'Hero Badge Category', type: 'Symbol', required: false },
    { id: 'heroHeadline', name: 'Hero Headline', type: 'Symbol', required: false },
    { id: 'heroHighlightedPhrase', name: 'Hero Highlighted Phrase', type: 'Symbol', required: false },
    { id: 'heroSubtitle', name: 'Hero Subtitle', type: 'Text', required: false },
    { id: 'heroKeyValues', name: 'Hero Key Values', type: 'Array', items: { type: 'Symbol' }, required: false },
    { id: 'heroCtaPrimaryText', name: 'Hero CTA Primary Text', type: 'Symbol', required: false },
    { id: 'heroCtaSecondaryText', name: 'Hero CTA Secondary Text', type: 'Symbol', required: false },
    { id: 'heroComplianceNotice', name: 'Hero Compliance Notice', type: 'Symbol', required: false },
    { id: 'heroPartnerName', name: 'Hero Partner Name', type: 'Symbol', required: false },
    { id: 'heroPartnerTitle', name: 'Hero Partner Title', type: 'Symbol', required: false },
    { id: 'heroPartnerBio', name: 'Hero Partner Bio', type: 'Text', required: false },
    { id: 'heroMetricPlacements', name: 'Hero Metric Placements', type: 'Symbol', required: false },
    { id: 'heroMetricTenure', name: 'Hero Metric Tenure', type: 'Symbol', required: false },
    { id: 'heroMetricRetention', name: 'Hero Metric Retention', type: 'Symbol', required: false },
    { id: 'heroMetricCoverage', name: 'Hero Metric Coverage', type: 'Symbol', required: false },
    
    // Sector Matrix Section
    { id: 'sectorMatrixSectionLabel', name: 'Sector Matrix Section Label', type: 'Symbol', required: false },
    { id: 'sectorMatrixTitle', name: 'Sector Matrix Title', type: 'Symbol', required: false },
    { id: 'sectorMatrixDescription', name: 'Sector Matrix Description', type: 'Text', required: false },
    { id: 'sectorMatrixSubDisciplines', name: 'Sector Matrix Sub Disciplines', type: 'Array', items: { type: 'Symbol' }, required: false },
    
    // Difference Section
    { id: 'differenceSectionLabel', name: 'Difference Section Label', type: 'Symbol', required: false },
    { id: 'differenceTitle', name: 'Difference Title', type: 'Symbol', required: false },
    { id: 'differenceDescription', name: 'Difference Description', type: 'Text', required: false },
    { id: 'differenceAssuranceTitle', name: 'Difference Assurance Title', type: 'Symbol', required: false },
    { id: 'differenceAssuranceDescription', name: 'Difference Assurance Description', type: 'Text', required: false },
    { id: 'differenceCandidateQualityTitle', name: 'Difference Candidate Quality Title', type: 'Symbol', required: false },
    { id: 'differenceCandidateQualityText', name: 'Difference Candidate Quality Text', type: 'Text', required: false },
    { id: 'differenceReplacementGuaranteeTitle', name: 'Difference Replacement Guarantee Title', type: 'Symbol', required: false },
    { id: 'differenceReplacementGuaranteeText', name: 'Difference Replacement Guarantee Text', type: 'Text', required: false },
    
    // Process Section
    { id: 'processSectionLabel', name: 'Process Section Label', type: 'Symbol', required: false },
    { id: 'processTitle', name: 'Process Title', type: 'Symbol', required: false },
    { id: 'processDescription', name: 'Process Description', type: 'Text', required: false },
    
    // Insights Section
    { id: 'insightsSectionLabel', name: 'Insights Section Label', type: 'Symbol', required: false },
    { id: 'insightsTitle', name: 'Insights Title', type: 'Symbol', required: false },
    { id: 'insightsDescription', name: 'Insights Description', type: 'Text', required: false },
    { id: 'insightsReportBannerCategory', name: 'Insights Report Banner Category', type: 'Symbol', required: false },
    { id: 'insightsReportBannerTitle', name: 'Insights Report Banner Title', type: 'Symbol', required: false },
    { id: 'insightsReportBannerDescription', name: 'Insights Report Banner Description', type: 'Text', required: false },
    { id: 'insightsReportBannerCtaText', name: 'Insights Report Banner CTA Text', type: 'Symbol', required: false },
    
    // About Partner Section
    { id: 'aboutPartnerBlock', name: 'About Partner Block', type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['blockTeamProfile'] }], required: false },
    
    // Contact Footer Section
    { id: 'contactFooterBlock', name: 'Contact Footer Block', type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['blockContactDesk', 'blockCtaBanner'] }], required: false },
  ]);



  console.log(`\n===========================================================`);
  console.log(`[MGH CMS Setup] Provisioning Cover Image Assets`);
  console.log(`===========================================================\n`);

  // Provision 4 high-quality architectural / executive cover images
  const asset1 = await ensureAsset(
    'asset-cover-c-suite-remuneration',
    'Executive Boardroom & High-Rise Architecture',
    'Executive boardroom and architectural glass high-rise reflecting executive compensation and corporate governance',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop'
  );

  const asset2 = await ensureAsset(
    'asset-cover-building-safety-act',
    'Modern Facade & Engineering Envelope',
    'Precision engineered architectural building facade demonstrating Building Safety Act technical compliance',
    'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=1600&auto=format&fit=crop'
  );

  const asset3 = await ensureAsset(
    'asset-cover-merchant-distribution',
    'Modern Distribution Logistics Architecture',
    'High-volume commercial distribution and building merchant logistics facility',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop'
  );

  const asset4 = await ensureAsset(
    'asset-cover-decarbonizing-materials',
    'Sustainable Mass Timber & Structural Engineering',
    'Engineered sustainable mass timber and low-carbon structural building components',
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1600&auto=format&fit=crop'
  );

  console.log(`\n===========================================================`);
  console.log(`[MGH CMS Setup] Seeding Initial Content & Rich Text Bodies`);
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

  // Rich Text Bodies for Insight Articles
  const bodyArticle1 = createRichTextDoc([
    {
      type: 'p',
      text: 'Executive compensation in the European and UK building products sector is witnessing an unprecedented bifurcation. While publicly listed PLCs continue to navigate institutional shareholder scrutiny and formulaic LTIP structures, mid-market Private Equity (PE) sponsors are reshaping executive incentives around high-conviction value-creation milestones.',
    },
    {
      type: 'h2',
      text: 'The Structural Divergence: PE Sweat Equity vs PLC Remuneration',
    },
    {
      type: 'p',
      text: 'For Managing Directors and Chief Financial Officers, the financial calculus has fundamentally shifted. In PLC environments, base salaries for divisional leaders typically range between £185,000 and £265,000, supplemented by 50–100% annual performance bonuses and rolling 3-year performance share plans (PSPs). However, vesting thresholds are increasingly tied to complex TSR (Total Shareholder Return) benchmarks and non-financial ESG metrics that individual operational leaders find difficult to influence.',
    },
    {
      type: 'quote',
      text: 'Top-quartile Managing Directors in building products are increasingly willing to accept disciplined base compensation in exchange for meaningful sweet equity pools offering 3.0x to 5.0x cash-on-cash realization at exit.',
    },
    {
      type: 'h2',
      text: 'Key Compensation Trends Observed Across 2026 Mandates',
    },
    {
      type: 'ul',
      items: [
        'Sweet Equity Hurdles: Typical management equity pools (MIP) range from 8% to 15% of total equity value, with ratchets accelerating sharply past a 2.5x Money-on-Invested-Capital (MoIC) return.',
        'Co-Investment Models: Sponsor funds increasingly require incoming CEOs and CFOs to make meaningful personal skin-in-the-game investments, often structured at 0.5x–1.0x gross base salary.',
        'Milestone Cash Triggers: Commercial turnarounds and M&A bolt-on integrations are being rewarded with immediate EBITDA-gated milestone bonuses rather than deferred vesting.',
      ],
    },
    {
      type: 'h2',
      text: 'Negotiating Restrictive Covenants and Buy-Out Structures',
    },
    {
      type: 'p',
      text: 'Attracting non-active executive talent who are in-flight within an existing value-creation cycle requires sophisticated search craftsmanship. Search partners must structure transition compensation that compensates for unvested LTIPs without inflaming investor equity hurdles.',
    },
    {
      type: 'p',
      text: 'MG Headhunting advises sponsor boards and remuneration committees to model rollover equity and bridge bonuses carefully during the calibration phase to guarantee immediate candidate buy-in and total alignment with exit time horizons.',
    },
  ]);

  const bodyArticle2 = createRichTextDoc([
    {
      type: 'p',
      text: 'The enforcement of the Building Safety Act 2022 and the establishment of the Building Safety Regulator (BSR) have permanently altered the risk architecture for construction materials manufacturers. What was once treated as a compliance support function has transformed into a critical board-level discipline.',
    },
    {
      type: 'h2',
      text: 'The Shift from Routine Testing to Personal Boardroom Liability',
    },
    {
      type: 'p',
      text: 'Historically, Technical Directors within facade, insulation, structural timber, and roofing businesses spent substantial time on product optimization, cost engineering, and certification testing. Under Gateway 2 and Gateway 3 protocols, the emphasis has shifted decisively toward Golden Thread digital traceability, systemic product safety conformity, and statutory accountability.',
    },
    {
      type: 'quote',
      text: 'The modern Technical & Compliance Director is no longer just a laboratory scientist; they are corporate risk officers with personal liability exposure who must withstand forensic cross-examination from tier-1 contractors and insurers.',
    },
    {
      type: 'h2',
      text: 'The Acute Talent Shortage and Cross-Sector Migration',
    },
    {
      type: 'p',
      text: 'Because traditional construction recruitment pipelines failed to produce leaders with both structural engineering depth and statutory governance acumen, search mandates in 2026 are heavily focused on non-traditional talent pools:',
    },
    {
      type: 'ul',
      items: [
        'Aerospace & Defense Systems: Importing certified safety engineers experienced in high-consequence failure modes and AS9100 quality rigor into architectural cladding systems.',
        'Automotive Homologation: Tapping regulatory specialists skilled at multi-jurisdictional compliance and automated product passport traceability.',
        'Fire & Structural Engineering Consultancies: Attracting chartered fire engineers into product manufacturer executive committees to direct R&D pipelines.',
      ],
    },
    {
      type: 'h2',
      text: 'Remuneration Pressures in Technical Appointments',
    },
    {
      type: 'p',
      text: 'Due to the acute talent supply bottleneck, board-level Technical Directors are commanding salary premiums of 35% to 50% above historical levels, often commanding parity with Commercial and Operations Directors. Forward-thinking manufacturers are building robust technical succession pipelines to protect long-term market access.',
    },
  ]);

  const bodyArticle3 = createRichTextDoc([
    {
      type: 'p',
      text: 'The UK and European builders merchant and specialist trade distribution landscape is undergoing aggressive consolidation. Private equity funds and strategic trade buyers are deploying buy-and-build playbooks to capture regional distribution density, optimize supplier rebates, and unlock omnichannel economies of scale.',
    },
    {
      type: 'h2',
      text: 'The Failure of Conventional Branch-Network Leadership',
    },
    {
      type: 'p',
      text: 'In post-acquisition integrations, the most common failure point is not capital allocation or product availability; it is leadership mismatch. Traditional merchant directors who achieved success through localized branch autonomy often struggle when required to centralize supplier framework agreements, harmonize ERP architectures, and implement dynamic digital pricing algorithms.',
    },
    {
      type: 'quote',
      text: 'Uniting 15 to 40 acquired regional merchant branches requires a commercial strategist who can preserve entrepreneurial local customer relationships while enforcing group-wide margin discipline.',
    },
    {
      type: 'h2',
      text: 'Critical Competencies for Buy-and-Build Commercial Leaders',
    },
    {
      type: 'ul',
      items: [
        'Centralized Rebate & Margin Architecture: Ability to renegotiate tier-1 manufacturing terms without disrupting regional delivery reliability.',
        'Omnichannel Trade Portal Rollouts: Driving branch adoption of online trade accounts, digital click-and-deliver, and automated credit limit scoring.',
        'Cultural Integration Velocity: Harmonizing founder-led branch teams into corporate governance standards within the first 100 days.',
      ],
    },
    {
      type: 'h2',
      text: 'Structuring Search Mandates for Distribution Scale-Ups',
    },
    {
      type: 'p',
      text: 'When executing searches for Chief Commercial Officers or Integration Managing Directors in distribution, MG Headhunting employs proprietary assessment matrices that evaluate past synergy realization metrics and supplier network influence. The resulting appointments consistently accelerate EBITDA expansion prior to secondary exit.',
    },
  ]);

  const bodyArticle4 = createRichTextDoc([
    {
      type: 'p',
      text: 'As embodied carbon limits become mandatory across UK planning authorities and institutional real estate developments, heavy materials manufacturers—spanning cement, precast concrete, brick, and structural steel—face a generational transformation.',
    },
    {
      type: 'h2',
      text: 'The Race for Low-Carbon Binders and Mass Timber Systems',
    },
    {
      type: 'p',
      text: 'The transition from Ordinary Portland Cement (OPC) to calcined clays, alkali-activated geopolymers, and carbon-cured precast elements has moved from experimental trial batches into mainstream specification. Concurrently, engineered mass timber (CLT and Glulam) is capturing significant market share in mid-rise commercial construction.',
    },
    {
      type: 'quote',
      text: 'Plant Directors must now master the complex chemistry of supplementary cementitious materials (SCMs) while simultaneously delivering high OEE (Overall Equipment Effectiveness) in continuous kiln and batching environments.',
    },
    {
      type: 'h2',
      text: 'The New Hybrid Executive Profile',
    },
    {
      type: 'p',
      text: 'Boards commissioning search mandates for Operations and General Management leaders in heavy materials require individuals who bridge two distinct operational worlds:',
    },
    {
      type: 'ul',
      items: [
        'Deep Industrial Metallurgy & Chemical Engineering: Hands-on mastery of thermal processing, raw material substitution, and plant automation.',
        'Investor-Grade ESG Governance: Proven ability to author and defend Environmental Product Declarations (EPDs), PAS 2080 carbon management, and Science Based Targets (SBTi).',
        'Commercial Specification Defense: Equipping national sales forces to defend pricing premiums based on verified whole-life carbon savings.',
      ],
    },
    {
      type: 'h2',
      text: 'Executive Talent Strategies for the Net Zero Era',
    },
    {
      type: 'p',
      text: 'Securing progressive operations talent requires looking beyond incumbent direct competitors. MGH actively targets executive leaders across specialty chemical processing, glass manufacture, and advanced offsite fabrication to bring fresh manufacturing agility into legacy heavy materials operations.',
    },
  ]);

  // Seed Insight Articles (with coverImage and rich text body)
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
        'Co-investment requirements solidifying alignment between sponsor funds and incoming executive teams',
      ],
      body: bodyArticle1,
      coverImage: {
        sys: { type: 'Link', linkType: 'Asset', id: asset1.sys.id },
      },
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
        'Gateway 2 and Gateway 3 requirements enforcing personal board liability and documentation integrity',
      ],
      body: bodyArticle2,
      coverImage: {
        sys: { type: 'Link', linkType: 'Asset', id: asset2.sys.id },
      },
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
        'Centralized rebate optimization and ERP harmonization separating successful PE rollups from stalled integrations',
      ],
      body: bodyArticle3,
      coverImage: {
        sys: { type: 'Link', linkType: 'Asset', id: asset3.sys.id },
      },
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
        'Low-carbon binders and engineered mass timber capturing commercial specification volume',
      ],
      body: bodyArticle4,
      coverImage: {
        sys: { type: 'Link', linkType: 'Asset', id: asset4.sys.id },
      },
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
    tagline: 'Building Products',
    primaryEmail: 'mgoldsmith@mgheadhunting.co.uk',
    phone: '+44 (0) 20 7946 0198',
    headquarters: 'London & Home Counties, United Kingdom',
    linkedinUrl: 'https://www.linkedin.com',
    navLinks: [
      { label: 'Specialisms', href: '/#specialisms' },
      { label: 'The MGH Difference', href: '/#difference' },
      { label: 'Search Process', href: '/#process' },
      { label: 'Market Intelligence', href: '/insights' },
      { label: 'About Mark Goldsmith', href: '/#about' },
      { label: 'Contact', href: '/#contact' },
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
    icoRegistrationNumber: 'UK GDPR Compliant • Registered with Information Commissioner\'s Office (ICO) • Strict Non-Disclosure Assured',
    metaTitleDefault: 'MG Headhunting | Retained Executive Search for Building Products & Construction',
    metaDescriptionDefault: 'Boutique retained executive search delivering Board, Managing Director, and C-Suite appointments across the UK and European Building Products and Built Environment sectors.',
  });

  // Seed Default Modular Pages
  console.log(`\n===========================================================`);
  console.log(`[MGH CMS Setup] Seeding Modular Componentised Pages`);
  console.log(`===========================================================\n`);

  // Helper for entry links
  function entryLink(id: string) {
    return { sys: { type: 'Link', linkType: 'Entry', id } };
  }

  // Seed Default Modular Pages & Linked Drag-and-Drop Blocks
  console.log(`\n===========================================================`);
  console.log(`[MGH CMS Setup] Seeding Modular Componentised Pages & Drag-and-Drop Blocks`);
  console.log(`===========================================================\n`);

  // --- 1. ABOUT PAGE BLOCKS ---
  await seedEntry('blockPageHeader', 'block-about-header', {
    internalName: 'About - Hero Header',
    badge: 'FIRM OVERVIEW',
    overline: 'BOUTIQUE RETAINED SEARCH',
    title: 'Executive Search Precision Engineered for',
    highlightedPhrase: 'Building Products & Construction Leadership',
    subtitle: 'Dedicated partner-led executive search connecting leading manufacturers, merchants, and private equity investors with board-level and operational leadership.',
    coordinate: 'MGH // PRACTICE-OVERVIEW',
    breadcrumbs: ['About:/about'],
  });

  await seedEntry('blockTeamProfile', 'block-about-team', {
    internalName: 'About - Mark Goldsmith Dossier',
    sectionLabel: 'PRACTICE LEADERSHIP',
    badge: 'MANAGING PARTNER',
    badgeSecondary: '20+ YEARS SECTOR FOCUS',
    headline: 'Direct Partner Delivery on Every Single Mandate',
    partnerName: 'Mark Goldsmith',
    partnerRole: 'Founder & Managing Partner',
    partnerPracticeTenure: '20+ Years in Executive Search',
    partnerSpecialization: 'Building Products, Materials & Offsite Systems',
    partnerPlacementLevel: 'Board, CEO, Managing Director & Operations Heads',
    partnerEmail: 'mgoldsmith@mgheadhunting.co.uk',
    partnerLinkedinUrl: 'https://www.linkedin.com',
    paragraphs: [
      'MG Headhunting was founded on a singular principle: executive search in the Building Products sector requires deep domain mastery, rigorous competency assessment, and personal accountability from start to finish.',
      'Unlike volume recruitment agencies that delegate critical assignments to junior resourcers, Managing Partner Mark Goldsmith personally leads every search—from initial board scoping through direct confidential headhunting to final placement.',
    ],
    credentialsChecklist: [
      'Member of the Association of Executive Search and Leadership Consultants (AESC)',
      'Certified in British Psychological Society (BPS) Level A & B Assessment',
      'Over 250 Successful Board and Executive Appointments across UK & Europe',
      'Strict Single-Point Confidentiality for Sensitive Succession Planning',
    ],
  });

  await seedEntry('blockMetricItem', 'metric-about-completion', {
    label: 'Mandate Completion Rate',
    value: '100%',
    description: 'Every retained search is pursued to completion with zero drop-off.',
    tag: 'AUDIT',
  });
  await seedEntry('blockMetricItem', 'metric-about-retention', {
    label: 'Executive Retention (24 Mo)',
    value: '98.4%',
    description: 'Placed executives who remain in role and deliver measurable ROI beyond 2 years.',
    tag: 'LONGEVITY',
  });
  await seedEntry('blockMetricItem', 'metric-about-shortlist', {
    label: 'Average Shortlist Delivery',
    value: '22 Days',
    description: 'Comprehensive market mapping and rigorous assessment delivered in under 4 weeks.',
    tag: 'SPEED',
  });
  await seedEntry('blockMetricItem', 'metric-about-guarantee', {
    label: 'Candidate Replacement Guarantee',
    value: '12 Months',
    description: 'Complete fee-free replacement backing every executive appointment.',
    tag: 'SECURITY',
  });

  await seedEntry('blockMetricsStats', 'block-about-metrics', {
    internalName: 'About - Verified Performance Benchmarks',
    sectionLabel: 'TRACK RECORD',
    title: 'Verified Performance Benchmarks',
    subtitle: 'Our boutique model delivers industry-leading completion rates, shortlist velocity, and executive retention longevity.',
    stats: [
      entryLink('metric-about-completion'),
      entryLink('metric-about-retention'),
      entryLink('metric-about-shortlist'),
      entryLink('metric-about-guarantee'),
    ],
  });

  await seedEntry('blockEditorialRichText', 'block-about-editorial', {
    internalName: 'About - Why Domain Expertise Matters',
    sectionLabel: 'OPERATING ETHOS',
    title: 'Why Domain Expertise Matters in Executive Search',
    subtitle: 'Understanding the commercial, technical, and regulatory dynamics of the Building Products market is what separates successful hires from costly mis-hires.',
    layout: 'sidebar',
    leadParagraph: 'A Managing Director in heavy clay or precast concrete requires fundamentally different leadership instincts than one in architectural glazing or building management systems. Generic executive recruiters lack the industry vocabulary to differentiate true operators from polished interviewees.',
    quoteText: 'In executive recruitment, domain immersion is not optional—it is the single highest determinant of candidate quality and cultural retention.',
    quoteAuthor: 'Mark Goldsmith',
    quoteRole: 'Managing Partner',
    keyTakeaways: [
      'Deep understanding of UK Building Regulations (Part L, Future Homes Standard, Fire Safety)',
      'Extensive passive network of senior leaders across manufacturers and merchant chains',
      'Rigorous structured competency & psychometric evaluation',
      'Complete discretion protecting sensitive market positioning',
    ],
  });

  await seedEntry('blockCtaBanner', 'block-about-cta', {
    internalName: 'About - Confidential Mandates CTA',
    variant: 'navy',
    overline: 'CONFIDENTIAL MANDATES',
    title: 'Discuss Your Executive Hiring Requirements',
    description: 'Schedule a private consultation with Mark Goldsmith to evaluate your upcoming leadership requirements.',
    primaryCtaText: 'Initiate Search Mandate',
    primaryCtaAction: 'searchModal',
    secondaryCtaText: 'Explore Specialisms',
    secondaryCtaHref: '/sectors',
    guaranteeNotice: 'Strict Single-Point Confidentiality & Non-Disclosure Assured',
  });

  await seedEntry('modularPage', 'page-about', {
    title: 'About MG Headhunting',
    slug: 'about',
    metaTitle: 'About Mark Goldsmith & MG Headhunting | Retained Search Practice',
    metaDescription: 'Specialist retained executive search for Building Products and Built Environment leadership. Founded and personally led by Mark Goldsmith.',
    showHeader: true,
    showFooter: true,
    sections: [
      entryLink('block-about-header'),
      entryLink('block-about-team'),
      entryLink('block-about-metrics'),
      entryLink('block-about-editorial'),
      entryLink('block-about-cta'),
    ],
  });

  // --- 2. SECTORS PAGE BLOCKS ---
  await seedEntry('blockPageHeader', 'block-sectors-header', {
    internalName: 'Sectors - Hero Header',
    badge: 'PRACTICE COVERAGE',
    overline: 'SECTOR SPECIALISM MATRIX',
    title: 'Comprehensive Practice Coverage Across the',
    highlightedPhrase: 'Building Products & Construction Supply Chain',
    subtitle: 'From heavy masonry and offsite manufacturing to advanced building envelopes and architectural interior products.',
    coordinate: 'MGH // SECTOR-MATRIX',
    breadcrumbs: ['Specialisms:/sectors'],
  });

  await seedEntry('blockMetricItem', 'metric-sectors-focus', {
    label: 'Practice Focus',
    value: '100%',
    description: 'Exclusively focused on Building Products and the Built Environment.',
    tag: 'SECTOR',
  });
  await seedEntry('blockMetricItem', 'metric-sectors-breadth', {
    label: 'Sub-Sectors Covered',
    value: '18+',
    description: 'From heavy building materials and MMC to HVAC and smart building controls.',
    tag: 'BREADTH',
  });
  await seedEntry('blockMetricItem', 'metric-sectors-level', {
    label: 'Placements by Seniority',
    value: 'C-Suite',
    description: 'Chairs, CEOs, Managing Directors, and functional Board heads.',
    tag: 'LEVEL',
  });
  await seedEntry('blockMetricItem', 'metric-sectors-markets', {
    label: 'Geographic Reach',
    value: 'UK & EU',
    description: 'Cross-border search capability across the UK, Nordics, DACH, and Western Europe.',
    tag: 'MARKETS',
  });

  await seedEntry('blockMetricsStats', 'block-sectors-metrics', {
    internalName: 'Sectors - Practice Metrics',
    sectionLabel: 'PRACTICE METRICS',
    title: 'Built Environment Domain Depth',
    subtitle: 'Our recruitment practice is strictly dedicated to Building Products, Construction Materials, and Associated Technologies.',
    stats: [
      entryLink('metric-sectors-focus'),
      entryLink('metric-sectors-breadth'),
      entryLink('metric-sectors-level'),
      entryLink('metric-sectors-markets'),
    ],
  });

  await seedEntry('blockSectorGrid', 'block-sectors-grid', {
    internalName: 'Sectors - Practice Divisions Grid',
    sectionLabel: 'CORE SPECIALISMS',
    title: 'Sector Specialism Matrix',
    description: 'Explore our dedicated practice divisions across Executive Leadership, Commercial & Sales, Operations & Manufacturing, and Technical & R&D.',
  });

  await seedEntry('blockCtaBanner', 'block-sectors-cta', {
    internalName: 'Sectors - Practice Advisory CTA',
    variant: 'blueprint',
    overline: 'RETAINED SEARCH ADVISORY',
    title: 'Commission a Dedicated Sector Mandate',
    description: 'Target specific leadership talent across our four core building products practice disciplines.',
    primaryCtaText: 'Initiate Practice Search',
    primaryCtaAction: 'searchModal',
    secondaryCtaText: 'View Search Blueprint',
    secondaryCtaHref: '/retained-search',
    guaranteeNotice: 'Backed by our 12-Month Executive Replacement Guarantee',
  });

  await seedEntry('modularPage', 'page-sectors', {
    title: 'Sector Specialisms',
    slug: 'sectors',
    metaTitle: 'Building Products Sector Matrix | MG Headhunting Practice Areas',
    metaDescription: 'Specialised executive search across Executive, Commercial, Operations, and Technical leadership in the Building Products industry.',
    showHeader: true,
    showFooter: true,
    sections: [
      entryLink('block-sectors-header'),
      entryLink('block-sectors-metrics'),
      entryLink('block-sectors-grid'),
      entryLink('block-sectors-cta'),
    ],
  });

  // --- 3. RETAINED SEARCH PAGE BLOCKS ---
  await seedEntry('blockPageHeader', 'block-search-header', {
    internalName: 'Search - Hero Header',
    badge: 'METHODOLOGY',
    overline: 'THE MGH SEARCH BLUEPRINT',
    title: 'A Disciplined 5-Stage Framework for',
    highlightedPhrase: 'Securing Transformational Executive Talent',
    subtitle: 'Our rigorous search process combines exhaustive market mapping, structured psychometric assessment, and 100-day post-placement integration.',
    coordinate: 'MGH // SEARCH-METHODOLOGY',
    breadcrumbs: ['Search Process:/retained-search'],
  });

  await seedEntry('blockProcessTimeline', 'block-search-timeline', {
    internalName: 'Search - 5-Stage Execution Timeline',
    sectionLabel: '5-STAGE BLUEPRINT',
    title: 'Structured Milestone-Driven Execution',
    description: 'From initial mandate scoping to the 100-day onboarding review, every stage is transparently reported and partner-executed.',
  });

  await seedEntry('blockDifferencePillars', 'block-search-pillars', {
    internalName: 'Search - Retained vs Contingent Advantage',
    sectionLabel: 'RETAINED ADVANTAGE',
    title: 'Retained Search vs Contingent Recruitment',
    description: 'Why leading building products manufacturers and PE funds mandate MGH for their most critical leadership hires.',
  });

  await seedEntry('blockFaqItem', 'faq-search-timelines', {
    question: 'How quickly will we receive the initial assessed shortlist?',
    category: 'TIMELINES & SPEED',
    answer: 'Our standard search timeline delivers a fully assessed, benchmarked shortlist of 3 to 5 qualified candidates within 20 to 25 working days from mandate approval. We provide weekly pipeline dashboards throughout the mapping phase.',
  });
  await seedEntry('blockFaqItem', 'faq-search-offlimits', {
    question: 'How do you handle off-limits agreements and talent poaching?',
    category: 'OFF-LIMITS & ACCESS',
    answer: 'As a boutique practice, we maintain very limited off-limits constraints compared to massive global search firms. This gives us unrestricted access to tap top-performing executives across 95%+ of the Building Products market.',
  });
  await seedEntry('blockFaqItem', 'faq-search-assessment', {
    question: 'What psychometric and competency assessment tools do you use?',
    category: 'ASSESSMENT RIGOUR',
    answer: 'Mark Goldsmith is BPS Level A & B certified. Every shortlisted finalist undergoes structured competency-based interviewing, leadership derailer profiling, and verified peer referencing before presentation.',
  });
  await seedEntry('blockFaqItem', 'faq-search-warranty', {
    question: 'What happens if a placed executive leaves within the first year?',
    category: 'WARRANTY & RISK',
    answer: 'Every retained executive appointment is backed by our comprehensive 12-Month Placement Guarantee. In the unlikely event an appointee departs or fails probation within 12 months, we execute a full replacement search at zero additional professional fee.',
  });

  await seedEntry('blockFaqAccordion', 'block-search-faq', {
    internalName: 'Search - Retained Mandates FAQ',
    sectionLabel: 'PRACTICE ADVISORY',
    title: 'Frequently Asked Questions on Retained Mandates',
    description: 'Clear answers on fee structures, timelines, confidentiality, and candidate warranties.',
    items: [
      entryLink('faq-search-timelines'),
      entryLink('faq-search-offlimits'),
      entryLink('faq-search-assessment'),
      entryLink('faq-search-warranty'),
    ],
  });

  await seedEntry('blockCtaBanner', 'block-search-cta', {
    internalName: 'Search - Retained Protocol CTA',
    variant: 'navy',
    overline: 'EXECUTIVE MANDATES',
    title: 'Ready to Commission a Retained Mandate?',
    description: 'Speak directly with Managing Partner Mark Goldsmith to outline your requirements and establish a timeline.',
    primaryCtaText: 'Initiate Search Protocol',
    primaryCtaAction: 'searchModal',
    secondaryCtaText: 'Contact Direct Desk',
    secondaryCtaHref: '/contact',
  });

  await seedEntry('modularPage', 'page-retained-search', {
    title: 'Retained Search Blueprint',
    slug: 'retained-search',
    metaTitle: '5-Stage Executive Search Blueprint | MG Headhunting Methodology',
    metaDescription: 'Discover our disciplined, milestone-driven executive search framework designed to secure top-tier leadership without business disruption.',
    showHeader: true,
    showFooter: true,
    sections: [
      entryLink('block-search-header'),
      entryLink('block-search-timeline'),
      entryLink('block-search-pillars'),
      entryLink('block-search-faq'),
      entryLink('block-search-cta'),
    ],
  });

  // --- 4. DIFFERENCE PAGE BLOCKS ---
  await seedEntry('blockPageHeader', 'block-diff-header', {
    internalName: 'Difference - Hero Header',
    badge: 'THE MGH DIFFERENCE',
    overline: 'STRUCTURAL ADVANTAGES',
    title: 'Engineered Executive Search vs',
    highlightedPhrase: 'Transactional Recruitment Clichés',
    subtitle: 'Why CEOs, Private Equity investors, and Board Chairs choose MG Headhunting for high-stakes leadership appointments.',
    coordinate: 'MGH // VALUE-PROPOSITION',
    breadcrumbs: ['The Difference:/difference'],
  });

  await seedEntry('blockDifferencePillars', 'block-diff-pillars', {
    internalName: 'Difference - 4 Core Pillars',
    sectionLabel: 'FOUR CORE PILLARS',
    title: 'Built on Accountability, Rigour, and Domain Depth',
    description: 'How our boutique retained search model eliminates the flaws inherent in high-volume contingency agencies.',
  });

  await seedEntry('blockMetricItem', 'metric-diff-exclusivity', {
    label: 'Exclusivity Guarantee',
    value: '100%',
    description: 'Your mandate receives our undivided focus until completed.',
    tag: 'DEDICATION',
  });
  await seedEntry('blockMetricItem', 'metric-diff-warranty', {
    label: 'Placement Warranty',
    value: '12 Months',
    description: 'Full fee-free replacement policy on all executive appointments.',
    tag: 'SECURITY',
  });
  await seedEntry('blockMetricItem', 'metric-diff-coverage', {
    label: 'Market Coverage',
    value: '360°',
    description: 'Systematic mapping of both active and passive candidates.',
    tag: 'RIGOUR',
  });
  await seedEntry('blockMetricItem', 'metric-diff-partner', {
    label: 'Direct Partner Contact',
    value: 'Single Point',
    description: 'Zero delegation to junior researchers or account handlers.',
    tag: 'ACCOUNTABILITY',
  });

  await seedEntry('blockMetricsStats', 'block-diff-metrics', {
    internalName: 'Difference - Assurance Metrics',
    sectionLabel: 'ASSURANCE METRICS',
    title: 'Commitment Backed by Proof',
    subtitle: 'Measurable standards that protect your capital and leadership continuity.',
    stats: [
      entryLink('metric-diff-exclusivity'),
      entryLink('metric-diff-warranty'),
      entryLink('metric-diff-coverage'),
      entryLink('metric-diff-partner'),
    ],
  });

  await seedEntry('blockCtaBanner', 'block-diff-cta', {
    internalName: 'Difference - Experience Precision CTA',
    variant: 'blueprint',
    overline: 'STRATEGIC APPOINTMENTS',
    title: 'Experience Precision Retained Search',
    description: 'Commission a mandate backed by full 12-month warranties and direct partner accountability.',
    primaryCtaText: 'Initiate Search Mandate',
    primaryCtaAction: 'searchModal',
  });

  await seedEntry('modularPage', 'page-difference', {
    title: 'The MGH Difference',
    slug: 'difference',
    metaTitle: 'The MGH Difference | Retained Search vs Contingency Recruitment',
    metaDescription: 'Explore the structural advantages of retained executive search over transactional contingency recruitment in the Building Products sector.',
    showHeader: true,
    showFooter: true,
    sections: [
      entryLink('block-diff-header'),
      entryLink('block-diff-pillars'),
      entryLink('block-diff-metrics'),
      entryLink('block-diff-cta'),
    ],
  });

  // --- 5. CONTACT PAGE BLOCKS ---
  await seedEntry('blockPageHeader', 'block-contact-header', {
    internalName: 'Contact - Hero Header',
    badge: 'CONFIDENTIAL ENGAGEMENT',
    overline: 'DIRECT PARTNER DESK',
    title: 'Engage Mark Goldsmith Directly for',
    highlightedPhrase: 'Board & Executive Search Mandates',
    subtitle: 'All inquiries and consultations are conducted under strict non-disclosure with ICO-registered data compliance.',
    coordinate: 'MGH // DESK-CONTACT',
    breadcrumbs: ['Contact:/contact'],
  });

  await seedEntry('blockContactDesk', 'block-contact-desk', {
    internalName: 'Contact - Direct Desk Consultation',
    sectionLabel: 'DIRECT ENGAGEMENT',
    title: 'Schedule a Confidential Strategic Consultation',
    description: 'Reach out directly to Managing Partner Mark Goldsmith to discuss executive recruitment, succession planning, or compensation benchmarking.',
    email: 'mgoldsmith@mgheadhunting.co.uk',
    phone: '+44 (0) 20 7946 0198',
    headquarters: 'London & Home Counties, United Kingdom',
    ndaNotice: 'All conversations and documents exchanged are subject to strict non-disclosure obligations and professional confidentiality standards.',
  });

  await seedEntry('blockFaqItem', 'faq-contact-initial', {
    question: 'What is covered during the initial consultation call?',
    category: 'INITIAL CALL',
    answer: 'We review the strategic mandate objectives, organizational reporting lines, ideal candidate profile, compensation parameters, target market landscape, and timeline requirements.',
  });
  await seedEntry('blockFaqItem', 'faq-contact-fees', {
    question: 'How are retained search fees structured?',
    category: 'FEES & RETAINERS',
    answer: 'Our professional fees are billed on a standard milestone basis (typically 1/3 at mandate initiation, 1/3 at delivery of the agreed shortlist, and 1/3 upon completion/signing of the executive appointee).',
  });
  await seedEntry('blockFaqItem', 'faq-contact-confidentiality', {
    question: 'Can a search be conducted covertly without market leakage?',
    category: 'CONFIDENTIALITY',
    answer: 'Yes. Over 40% of our mandates are confidential succession or sensitive replacements. We maintain strict non-disclosure, anonymised candidate briefs, and NDAs signed prior to disclosing client identities.',
  });

  await seedEntry('blockFaqAccordion', 'block-contact-faq', {
    internalName: 'Contact - Scoping FAQ',
    sectionLabel: 'ENGAGEMENT FAQ',
    title: 'Mandate Scoping & Initial Consultation',
    description: 'Common questions regarding initial discovery calls, mandate scoping, and fee structures.',
    items: [
      entryLink('faq-contact-initial'),
      entryLink('faq-contact-fees'),
      entryLink('faq-contact-confidentiality'),
    ],
  });

  await seedEntry('modularPage', 'page-contact', {
    title: 'Contact Direct Desk',
    slug: 'contact',
    metaTitle: 'Contact Mark Goldsmith | Retained Search Direct Partner Desk',
    metaDescription: 'Get in direct contact with Managing Partner Mark Goldsmith for confidential Board, C-Suite, and Managing Director retained search inquiries.',
    showHeader: true,
    showFooter: true,
    sections: [
      entryLink('block-contact-header'),
      entryLink('block-contact-desk'),
      entryLink('block-contact-faq'),
    ],
  });

  await seedEntry('homepage', 'homepage-default', {
    internalTitle: 'MGH Global Homepage (Seeded)',
    aboutPartnerBlock: entryLink('block-about-team'),
    contactFooterBlock: entryLink('block-contact-desk'),
    
    // Hero Section
    heroBadgeOverline: 'Retained Executive Search',
    heroBadgeCategory: 'Building Products & Construction',
    heroHeadline: 'Board, Managing Director & C-Suite Appointments for the',
    heroHighlightedPhrase: 'Built Environment',
    heroSubtitle: 'MG Headhunting (MGH) delivers precision-engineered executive search for manufacturers, distributors, and private equity investors across the Building Products sector. Partner-led, rigorously assessed, and strictly confidential.',
    heroKeyValues: [
      'Zero Transactional Recruitment',
      '100% Partner Execution',
      'Deep Sector Discretion',
    ],
    heroCtaPrimaryText: 'Initiate Confidential Search',
    heroCtaSecondaryText: 'View Sector Specialisms',
    heroComplianceNotice: 'Operating under UK Executive Search Code of Conduct & Strict Data Protection protocols.',
    heroPartnerName: 'Mark Goldsmith',
    heroPartnerTitle: 'Managing Director & Lead Search Partner',
    heroPartnerBio: 'Specialist in board appointments, P&L leaders, and commercial turnarounds across heavy building materials, façades, HVAC, and timber systems.',
    heroMetricPlacements: '200+',
    heroMetricTenure: '20+ Yrs',
    heroMetricRetention: '96%',
    heroMetricCoverage: 'UK & EU',

    // Sector Matrix Section
    sectorMatrixSectionLabel: 'Sector Specialism Matrix',
    sectorMatrixTitle: 'Core Practice Matrix',
    sectorMatrixDescription: 'Specialized search focused exclusively on executive roles across manufacturing, distribution, and contracting in the Building Products & Construction materials ecosystem.',
    sectorMatrixSubDisciplines: [
      'Heavy Materials & Aggregates',
      'Curtain Walling & Glazing',
      'Structural Timber & Engineered Wood',
      'Offsite & Modular Manufacturing',
      'HVAC, M&E and Pumps',
      'Drylining, Plaster & Insulation',
      'Builders Merchants & Distribution',
      'Roofing, Waterproofing & Cladding',
    ],

    // Difference Section
    differenceSectionLabel: 'The MGH Difference',
    differenceTitle: 'Engineered Executive Search vs Recruitment Clichés',
    differenceDescription: 'Why CEOs, Private Equity investors, and Board Chairs choose MG Headhunting over generic recruitment agencies.',
    differenceAssuranceTitle: '100% Commitment to Mandate Completion',
    differenceAssuranceDescription: 'Unlike transactional agents who drop searches when difficult, MGH guarantees persistence until the exact candidate profile is secured.',
    differenceCandidateQualityTitle: 'Candidate quality',
    differenceCandidateQualityText: 'Targeted approach to top 5% performers who are not on job boards.',
    differenceReplacementGuaranteeTitle: 'Replacement guarantee',
    differenceReplacementGuaranteeText: 'Full 12-month candidate replacement warranty on executive placements.',

    // Process Section
    processSectionLabel: 'Search Methodology',
    processTitle: 'The 5-Stage Search Blueprint',
    processDescription: 'A disciplined, milestone-driven framework designed to identify, attract, and secure top-tier executive leadership without disruption.',

    // Insights Section
    insightsSectionLabel: 'Market Intelligence',
    insightsTitle: 'Executive Briefings & Market Insights',
    insightsDescription: 'Proprietary intelligence on executive talent flows, board compensation dynamics, and regulatory shifts across the Building Products landscape.',
    insightsReportBannerCategory: 'Special Research Publication',
    insightsReportBannerTitle: '2026/2027 Building Products Executive Salary & Retention Benchmark',
    insightsReportBannerDescription: 'Comprehensive compensation analysis covering 400+ board appointments across UK & European manufacturing, merchants, and fabricators.',
    insightsReportBannerCtaText: 'Request Confidential Report',
  });

  console.log(`\n===========================================================`);
  console.log(`✓ [MGH CMS Setup] All Content Types, Assets, & Rich Text Articles Provisioned in Space: ${SPACE_ID}!`);
  console.log(`===========================================================\n`);

}

runSetup().catch((err) => {
  console.error('[MGH CMS Setup] Failed:', err);
  process.exit(1);
});
