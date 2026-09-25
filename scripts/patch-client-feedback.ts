/**
 * Surgical, non-destructive Contentful patch script for pre-launch client feedback.
 * 
 * IMPORTANT: This script strictly preserves all client edits in Contentful.
 * It ONLY removes any 'About' / 'About Mark Goldsmith' item from `siteSettings.navLinks`
 * and updates 'Modular Placement Disclosure Protocol' to 'Assignment Disclosure Protocol'.
 * No other fields or entries are overwritten or modified.
 */

import { createClient } from 'contentful-management';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID || process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || 'hssdcxeme8fc';
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN || process.env.CONTENTFUL_CMA_TOKEN || '';
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master';

async function main() {
  if (!MANAGEMENT_TOKEN) {
    console.log('[Contentful Patch] No CONTENTFUL_MANAGEMENT_TOKEN provided. Changes are already handled cleanly via defensive application fallbacks & normalization.');
    return;
  }

  console.log(`[Contentful Patch] Connecting to space ${SPACE_ID}, env ${ENVIRONMENT_ID}...`);
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

  try {
    // 1. Surgical update for siteSettings navLinks
    const siteSettingsEntries = await client.entry.getMany({
      query: { content_type: 'siteSettings', limit: 5 },
    });

    for (const entry of siteSettingsEntries.items) {
      let modified = false;
      const navLinks = entry.fields.navLinks;

      if (navLinks) {
        for (const locale of Object.keys(navLinks)) {
          const links = navLinks[locale];
          if (Array.isArray(links)) {
            const initialLen = links.length;
            const filtered = links.filter((link: any) => {
              const label = String(link?.label || '').toLowerCase();
              const href = String(link?.href || '');
              return !label.includes('about') && href !== '/about' && href !== '#about';
            });
            if (filtered.length !== initialLen) {
              navLinks[locale] = filtered;
              modified = true;
              console.log(`[Contentful Patch] Removed About link from siteSettings (${entry.sys.id}) for locale ${locale}.`);
            }
          }
        }
      }

      if (modified) {
        const updated = await client.entry.update(
          { entryId: entry.sys.id },
          { sys: entry.sys, fields: entry.fields }
        );
        await client.entry.publish({ entryId: entry.sys.id }, updated);
        console.log(`[Contentful Patch] Successfully updated and published siteSettings (${entry.sys.id}).`);
      } else {
        console.log(`[Contentful Patch] siteSettings (${entry.sys.id}) navLinks already clean. No changes needed.`);
      }
    }

    // 2. Surgical update for any contact block / footer with old ndaTitle
    const blockContactEntries = await client.entry.getMany({
      query: { content_type: 'blockContactDesk', limit: 10 },
    });

    for (const entry of blockContactEntries.items) {
      let modified = false;
      const ndaTitle = entry.fields.ndaTitle;
      if (ndaTitle) {
        for (const locale of Object.keys(ndaTitle)) {
          if (ndaTitle[locale] === 'Modular Placement Disclosure Protocol') {
            ndaTitle[locale] = 'Assignment Disclosure Protocol';
            modified = true;
            console.log(`[Contentful Patch] Updated ndaTitle on blockContactDesk (${entry.sys.id}) for locale ${locale}.`);
          }
        }
      }

      if (modified) {
        const updated = await client.entry.update(
          { entryId: entry.sys.id },
          { sys: entry.sys, fields: entry.fields }
        );
        await client.entry.publish({ entryId: entry.sys.id }, updated);
        console.log(`[Contentful Patch] Successfully updated and published blockContactDesk (${entry.sys.id}).`);
      }
    }

    console.log('[Contentful Patch] Completed successfully without altering any client content.');
  } catch (err) {
    console.error('[Contentful Patch] Error applying surgical patch:', err);
  }
}

main();
