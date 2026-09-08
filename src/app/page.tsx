import { draftMode } from 'next/headers';
import { HomepageClient } from '../components/HomepageClient';
import { fetchHomepageData } from '../lib/contentful/api';

// Staging (mgheadhunting.netlify.app) is 100% dynamic for real-time Contentful preview.
// Live production (www.mgheadhunting.co.uk) switches to static ISR when SITE_ENV=production.
const isLiveProduction =
  process.env.SITE_ENV === 'production' ||
  process.env.NEXT_PUBLIC_SITE_ENV === 'production';

// Force dynamic rendering on dev/staging deployment so Contentful draft changes appear in real-time.
export const dynamic = 'force-dynamic';

interface HomePageProps {
  searchParams?: Promise<{ preview?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { isEnabled } = await draftMode();
  const params = searchParams ? await searchParams : undefined;
  const hasPreviewParam = params?.preview === 'true';

  // In dev/staging, always fetch latest drafts from Contentful Preview API.
  // In live production, fetch preview drafts only when draft mode or ?preview=true is active.
  const isPreview = !isLiveProduction || isEnabled || hasPreviewParam;
  const data = await fetchHomepageData(isPreview);

  return <HomepageClient data={data} />;
}

