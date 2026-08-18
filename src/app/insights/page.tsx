import type { Metadata } from 'next';
import { fetchInsightArticles, fetchSiteSettings } from '../../lib/contentful/api';
import { InsightsClient } from './InsightsClient';

export const metadata: Metadata = {
  title: 'Market Intelligence & Strategic Briefings | MG Headhunting',
  description:
    'Proprietary executive briefings, board remuneration benchmarks, Building Safety Act compliance analysis, and talent intelligence across the UK and European Building Products sector.',
  openGraph: {
    title: 'Market Intelligence & Strategic Briefings | MG Headhunting',
    description:
      'Proprietary executive briefings, board remuneration benchmarks, Building Safety Act compliance analysis, and talent intelligence across the UK and European Building Products sector.',
    type: 'website',
  },
};

export default async function InsightsPage() {
  const [articles, siteSettings] = await Promise.all([
    fetchInsightArticles(),
    fetchSiteSettings(),
  ]);

  return <InsightsClient articles={articles} siteSettings={siteSettings} />;
}
