import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { fetchInsightBySlug, fetchInsightArticles, fetchSiteSettings, getArticleCoverAlt, getArticleCoverUrl } from '../../../lib/contentful/api';
import { getContentfulImageUrl } from '../../../lib/contentful/imageLoader';
import { InsightArticleFields } from '../../../lib/contentful/types';
import { InsightDetailClient } from './InsightDetailClient';
import { ArticleSchema } from '../../../components/seo/JsonLd';

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const rawArticle = await fetchInsightBySlug(slug);
  if (!rawArticle) {
    return {
      title: 'Executive Briefing Not Found | MG Headhunting',
    };
  }

  const article: InsightArticleFields = rawArticle?.fields
    ? { ...rawArticle.fields, sys: rawArticle.sys }
    : rawArticle;

  const coverUrl = getArticleCoverUrl(article);
  const normalizedCover = getContentfulImageUrl(coverUrl, {
    width: 1200,
    height: 630,
    fit: 'fill',
    quality: 85,
    format: 'jpg',
  });
  const coverAlt = getArticleCoverAlt(article);

  return {
    title: `${article.title} | MG Headhunting Intelligence`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedDate,
      images: [
        {
          url: normalizedCover,
          width: 1200,
          height: 630,
          alt: coverAlt,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const articles = await fetchInsightArticles();
  return articles.map((article) => ({
    slug: article.fields?.slug || article.slug,
  }));
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();

  const [rawArticle, allArticles, siteSettings] = await Promise.all([
    fetchInsightBySlug(slug, isEnabled),
    fetchInsightArticles(isEnabled),
    fetchSiteSettings(isEnabled),
  ]);

  if (!rawArticle) {
    notFound();
  }

  const article: InsightArticleFields = rawArticle?.fields
    ? { ...rawArticle.fields, sys: rawArticle.sys }
    : rawArticle;

  const relatedArticles = allArticles
    .filter((a) => (a.fields?.slug || a.slug) !== slug)
    .slice(0, 2);

  return (
    <>
      <ArticleSchema article={article} />
      <InsightDetailClient
        initialArticle={rawArticle}
        relatedArticles={relatedArticles}
        siteSettings={siteSettings}
      />
    </>
  );
}
