import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { fetchInsightArticles, fetchSiteSettings } from '../../lib/contentful/api';
import { InsightsClient } from './InsightsClient';
import { BreadcrumbSchema } from '../../components/seo/JsonLd';
import { SITE_URL } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Case Studies & Market Intelligence',
  description:
    'Executive search case studies, board remuneration insights, Building Safety Act leadership analysis, and talent intelligence across the UK and European Building Products sector.',
  alternates: {
    canonical: `${SITE_URL}/insights`,
  },
  openGraph: {
    title: 'Case Studies & Market Intelligence | MG Headhunting',
    description:
      'Executive search case studies, board remuneration insights, Building Safety Act leadership analysis, and talent intelligence across the UK and European Building Products sector.',
    url: `${SITE_URL}/insights`,
    type: 'website',
  },
};

export default async function InsightsPage() {
  const { isEnabled } = await draftMode();
  const [articles, siteSettings] = await Promise.all([
    fetchInsightArticles(isEnabled),
    fetchSiteSettings(isEnabled),
  ]);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Market Intelligence', url: `${SITE_URL}/insights` },
        ]}
      />
      <InsightsClient articles={articles} siteSettings={siteSettings} />
    </>
  );
}
