import { createClient } from 'contentful';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || 'hssdcxeme8fc';
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '';
const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master';

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
  environment: ENVIRONMENT,
});

async function testFetch() {
  console.log('Testing CDA Fetch for insightArticle...');
  const res = await client.getEntries({
    content_type: 'insightArticle',
    include: 2,
  });

  console.log(`Found ${res.items.length} articles in CDA:`);
  for (const item of res.items) {
    const fields: any = item.fields;
    console.log(`\n- Title: "${fields.title}"`);
    console.log(`  Slug: ${fields.slug}`);
    console.log(`  Category: ${fields.category}`);
    console.log(`  Has Rich Text Body: ${!!fields.body}`);
    console.log(`  Has Cover Image: ${!!fields.coverImage}`);
    if (fields.coverImage?.fields?.file?.url) {
      console.log(`  Cover Image URL: ${fields.coverImage.fields.file.url}`);
    }
  }
}

testFetch().catch(console.error);
