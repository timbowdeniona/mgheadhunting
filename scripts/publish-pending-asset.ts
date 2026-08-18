import { createClient } from 'contentful-management';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || 'hssdcxeme8fc';
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN || '';
const ENVIRONMENT_ID = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master';

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

async function fixAsset() {
  const assetId = 'asset-cover-building-safety-act';
  console.log(`Checking asset ${assetId}...`);
  let asset = await client.asset.get({ assetId });
  console.log('Current file info:', asset.fields.file?.['en-US']);

  if (!asset.fields.file?.['en-US']?.url) {
    console.log('Processing asset...');
    await client.asset.processForAllLocales({}, asset);
    await new Promise((r) => setTimeout(r, 4000));
    asset = await client.asset.get({ assetId });
  }

  console.log('Publishing asset...');
  asset = await client.asset.publish({ assetId }, asset);
  console.log('✓ Published asset:', assetId);

  // Update insight article 2
  const entryId = 'insight-02-building-safety-act';
  let entry = await client.entry.get({ entryId });
  entry.fields.coverImage = {
    'en-US': {
      sys: { type: 'Link', linkType: 'Asset', id: assetId },
    },
  };
  entry = await client.entry.update({ entryId }, entry);
  await client.entry.publish({ entryId }, entry);
  console.log('✓ Updated and published entry:', entryId);
}

fixAsset().catch(console.error);
