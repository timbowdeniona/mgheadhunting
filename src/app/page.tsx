import type { Metadata } from 'next';
import { draftMode, headers } from 'next/headers';
import { HomepageClient } from '../components/HomepageClient';
import { fetchHomepageData } from '../lib/contentful/api';
import { SITE_URL, shouldUsePreviewData } from '../lib/seo';

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    url: SITE_URL,
  },
};

interface HomePageProps {
  searchParams?: Promise<{ preview?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const [{ isEnabled }, headerList, params] = await Promise.all([
    draftMode(),
    headers(),
    searchParams ? searchParams : Promise.resolve(undefined),
  ]);

  const hasPreviewParam = params?.preview === 'true';
  const host = headerList.get('host');
  const isPreview = shouldUsePreviewData({
    isDraftEnabled: isEnabled,
    hasPreviewParam,
    host,
  });

  const data = await fetchHomepageData(isPreview);

  return <HomepageClient data={data} />;
}
