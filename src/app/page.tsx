import { HomepageClient } from '../components/HomepageClient';
import { fetchHomepageData } from '../lib/contentful/api';

export const revalidate = 60; // Incremental Static Regeneration (ISR) every 60s

export default async function HomePage() {
  const data = await fetchHomepageData();

  return <HomepageClient data={data} />;
}
