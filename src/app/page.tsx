import { HomepageClient } from '../components/HomepageClient';
import {
  fetchSectorSpecialisms,
  fetchDifferencePillars,
  fetchProcessSteps,
  fetchInsightArticles,
} from '../lib/contentful/api';

export const revalidate = 60; // Incremental Static Regeneration every 60s

export default async function HomePage() {
  const [specialisms, differencePillars, processSteps, insightArticles] = await Promise.all([
    fetchSectorSpecialisms(),
    fetchDifferencePillars(),
    fetchProcessSteps(),
    fetchInsightArticles(),
  ]);

  return (
    <HomepageClient
      specialisms={specialisms}
      differencePillars={differencePillars}
      processSteps={processSteps}
      insightArticles={insightArticles}
    />
  );
}
