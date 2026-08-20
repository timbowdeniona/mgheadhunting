import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { getContentfulClient } from '../src/lib/contentful/client';
import {
  fetchHomepageData,
  fetchModularPageBySlug,
  fetchInsightArticles,
  fetchInsightBySlug,
} from '../src/lib/contentful/api';

async function runPreviewDiagnostic() {
  console.log('====================================================');
  console.log('   MG HEADHUNTING - CONTENTFUL LIVE PREVIEW TEST   ');
  console.log('====================================================\n');

  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || process.env.VITE_CONTENTFUL_SPACE_ID;
  const previewToken = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN || process.env.CONTENTFUL_PREVIEW_TOKEN;
  const previewSecret = process.env.CONTENTFUL_PREVIEW_SECRET || process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_SECRET;

  console.log('1. Configuration Check:');
  console.log('   - Space ID:', spaceId ? '✓ Present (' + spaceId + ')' : '✗ Missing');
  console.log('   - Preview API Token (CPA):', previewToken ? '✓ Present (' + previewToken.substring(0, 8) + '...)' : '✗ Missing');
  console.log('   - Live Preview Secret:', previewSecret ? '✓ Configured (' + previewSecret + ')' : '✗ Missing');

  console.log('\n2. Testing Contentful Preview Client Connection (preview.contentful.com):');
  try {
    const previewClient = getContentfulClient(true);
    const space = await previewClient.getSpace();
    console.log(`   ✓ Connected to Space: "${space.name}" (sys.id: ${space.sys.id})`);

    const entries = await previewClient.getEntries({ limit: 5 });
    console.log(`   ✓ Retrieved ${entries.total} total items from Preview API (including unpublished drafts)`);
  } catch (err: any) {
    console.log('   ✗ Preview Client connection error:', err.message || err);
  }

  console.log('\n3. Testing Homepage Draft Fetching (preview = true):');
  try {
    const homeData = await fetchHomepageData(true);
    console.log('   ✓ Homepage data loaded with preview flag:');
    console.log('     - Site Name:', homeData.siteSettings.siteName);
    console.log('     - Hero Headline:', homeData.hero.headline);
    console.log('     - Specialisms Loaded:', homeData.sectorMatrix.specialisms.length);
    console.log('     - Insights Articles Loaded:', homeData.insights.articles.length);
  } catch (err: any) {
    console.log('   ✗ Error fetching preview homepage data:', err.message || err);
  }

  console.log('\n4. Testing Modular Page Draft Fetching (preview = true):');
  try {
    const sampleSlug = 'about';
    const pageData = await fetchModularPageBySlug(sampleSlug, true);
    if (pageData) {
      console.log(`   ✓ Modular Page "/${sampleSlug}" loaded successfully:`);
      console.log('     - Page Title:', pageData.title);
      console.log('     - Sections Count:', pageData.sections.length);
      console.log('     - Section Types:', pageData.sections.map((s) => s.type).join(', '));
    } else {
      console.log(`   ⚠ Page "/${sampleSlug}" not found in remote, fallback will be used.`);
    }
  } catch (err: any) {
    console.log('   ✗ Error fetching modular page preview:', err.message || err);
  }

  console.log('\n5. Testing Insights Article Draft Fetching (preview = true):');
  try {
    const articles = await fetchInsightArticles(true);
    console.log(`   ✓ Fetched ${articles.length} insight articles via Preview API`);
    if (articles.length > 0) {
      const firstSlug = articles[0].slug;
      const articleDetail = await fetchInsightBySlug(firstSlug, true);
      console.log(`   ✓ Detailed article preview for "${firstSlug}":`);
      console.log('     - Title:', articleDetail?.title);
      console.log('     - Category:', articleDetail?.category);
      console.log('     - Read Time:', articleDetail?.readTime);
    }
  } catch (err: any) {
    console.log('   ✗ Error fetching insights draft:', err.message || err);
  }

  console.log('\n====================================================');
  console.log('   PREVIEW URL FORMULAS FOR CONTENTFUL SETTINGS     ');
  console.log('====================================================');
  console.log('• Modular Pages:');
  console.log(`  http://localhost:3000/api/draft?secret=${previewSecret}&slug={entry.fields.slug}`);
  console.log('• Homepage:');
  console.log(`  http://localhost:3000/api/draft?secret=${previewSecret}&slug=`);
  console.log('• Insight Articles:');
  console.log(`  http://localhost:3000/api/draft?secret=${previewSecret}&type=insight&slug={entry.fields.slug}`);
  console.log('====================================================\n');
}

runPreviewDiagnostic();
