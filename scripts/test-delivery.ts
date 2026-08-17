import { createClient } from 'contentful';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID || process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || 'hssdcxeme8fc';
const ACCESS_TOKEN = process.env.VITE_CONTENTFUL_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_DELIVERY_TOKEN || '';
const PREVIEW_TOKEN = process.env.CONTENTFUL_PREVIEW_TOKEN || process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN || '';

async function testDelivery() {
  console.log('Testing CDA (Content Delivery API)...');
  try {
    const cdaClient = createClient({
      space: SPACE_ID,
      accessToken: ACCESS_TOKEN,
      environment: 'master',
    });
    const space = await cdaClient.getSpace();
    console.log('✓ CDA Success! Space Name:', space.name, 'ID:', space.sys.id);

    const types = await cdaClient.getContentTypes();
    console.log('✓ Content Types in Space:', types.items.length);
    for (const t of types.items) {
      console.log(`  - ${t.sys.id} (${t.name})`);
    }
  } catch (err: any) {
    console.error('✗ CDA Error:', err.message || err);
  }

  console.log('\nTesting CPA (Content Preview API)...');
  try {
    const previewClient = createClient({
      space: SPACE_ID,
      accessToken: PREVIEW_TOKEN,
      host: 'preview.contentful.com',
      environment: 'master',
    });
    const space = await previewClient.getSpace();
    console.log('✓ CPA Success! Space Name:', space.name, 'ID:', space.sys.id);
  } catch (err: any) {
    console.error('✗ CPA Error:', err.message || err);
  }
}

testDelivery();
