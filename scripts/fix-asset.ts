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
  const newUploadUrl = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop';
  
  console.log(`Updating asset ${assetId} with reliable image URL...`);
  let asset = await client.asset.get({ assetId });
  
  asset = await client.asset.update(
    { assetId },
    {
      fields: {
        title: { 'en-US': 'Modern Facade & Engineering Envelope' },
        description: { 'en-US': 'Architectural facade engineering and Building Safety Act technical compliance' },
        file: {
          'en-US': {
            contentType: 'image/jpeg',
            fileName: 'asset-cover-building-safety-act.jpg',
            upload: newUploadUrl,
          },
        },
      },
      sys: asset.sys,
    }
  );

  console.log('Processing asset...');
  await client.asset.processForAllLocales({}, asset);

  let processed = false;
  let attempts = 0;
  while (!processed && attempts < 15) {
    await new Promise((r) => setTimeout(r, 1000));
    const current = await client.asset.get({ assetId });
    if (current.fields.file?.['en-US']?.url) {
      asset = current;
      processed = true;
    }
    attempts++;
  }

  console.log('Publishing asset...');
  asset = await client.asset.publish({ assetId }, asset);
  console.log('✓ Successfully published asset:', assetId, 'URL:', asset.fields.file?.['en-US']?.url);

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
  console.log('✓ Successfully updated and published entry:', entryId);
}

fixAsset().catch(console.error);
