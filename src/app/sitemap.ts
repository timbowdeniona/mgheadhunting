import { MetadataRoute } from 'next';
import { fetchInsightArticles, fetchAllModularPageSlugs } from '@/lib/contentful/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mgheadhunting.com';

  const sitemapData: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  try {
    const [articles, modularSlugs] = await Promise.all([
      fetchInsightArticles(),
      fetchAllModularPageSlugs(),
    ]);

    articles.forEach((article) => {
      sitemapData.push({
        url: `${baseUrl}/insights/${article.slug}`,
        lastModified: article.publishedDate ? new Date(article.publishedDate) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    modularSlugs.forEach((slug) => {
      if (slug !== 'home' && slug !== 'index') {
        sitemapData.push({
          url: `${baseUrl}/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      }
    });
  } catch (error) {
    console.warn('[sitemap] Failed to fetch data for sitemap:', error);
  }

  return sitemapData;
}
