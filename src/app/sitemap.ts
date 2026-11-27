import { MetadataRoute } from 'next';
import { fetchInsightArticles, fetchAllModularPageSlugs } from '@/lib/contentful/api';
import { SITE_URL, toIsoDateString } from '@/lib/seo';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seenUrls = new Set<string>();
  const sitemapData: MetadataRoute.Sitemap = [];

  const pushUnique = (entry: MetadataRoute.Sitemap[number]) => {
    if (seenUrls.has(entry.url)) return;
    seenUrls.add(entry.url);
    sitemapData.push(entry);
  };

  pushUnique({
    url: SITE_URL,
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  pushUnique({
    url: `${SITE_URL}/insights`,
    changeFrequency: 'weekly',
    priority: 0.9,
  });

  try {
    const [articles, modularSlugs] = await Promise.all([
      fetchInsightArticles(false),
      fetchAllModularPageSlugs(false),
    ]);

    modularSlugs.forEach((rawSlug) => {
      const slug = (rawSlug || '').trim();
      if (!slug || slug === 'home' || slug === 'index' || slug === 'design-system') {
        return;
      }
      pushUnique({
        url: `${SITE_URL}/${encodeURIComponent(slug)}`,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });

    articles.forEach((rawArticle) => {
      const fields = rawArticle?.fields || rawArticle;
      const rawSlug = typeof fields?.slug === 'string' ? fields.slug.trim() : '';
      if (!rawSlug || rawSlug === 'undefined') {
        return;
      }

      const isoMod =
        rawArticle?.sys?.updatedAt ||
        toIsoDateString(fields?.publishedDate) ||
        undefined;

      pushUnique({
        url: `${SITE_URL}/insights/${encodeURIComponent(rawSlug)}`,
        ...(isoMod ? { lastModified: new Date(isoMod) } : {}),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  } catch (error) {
    console.warn('[sitemap] Failed to fetch data for sitemap:', error);
  }

  pushUnique({
    url: `${SITE_URL}/privacy`,
    changeFrequency: 'yearly',
    priority: 0.3,
  });

  return sitemapData;
}
