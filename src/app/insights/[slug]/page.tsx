import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { draftMode, headers } from 'next/headers';
import {
  fetchInsightBySlug,
  fetchInsightArticles,
  fetchSiteSettings,
  getArticleCoverAlt,
  getArticleCoverUrl,
} from '../../../lib/contentful/api';
import { getContentfulImageUrl } from '../../../lib/contentful/imageLoader';
import { InsightArticleFields } from '../../../lib/contentful/types';
import { InsightDetailClient } from './InsightDetailClient';
import { ArticleSchema, BreadcrumbSchema } from '../../../components/seo/JsonLd';
import { SITE_URL, stripBrandSuffix, toIsoDateString, shouldUsePreviewData } from '../../../lib/seo';

interface InsightPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ preview?: string }>;
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const rawArticle = await fetchInsightBySlug(decodedSlug, false);
  if (!rawArticle) {
    return {
      title: 'Executive Briefing Not Found',
      robots: { index: false, follow: false },
    };
  }

  const article: InsightArticleFields = rawArticle?.fields
    ? { ...rawArticle.fields, sys: rawArticle.sys }
    : rawArticle;

  const cleanTitle = stripBrandSuffix(article.title) || article.title;
  const canonicalSlug = (article.slug || decodedSlug).trim();
  const canonicalUrl = `${SITE_URL}/insights/${encodeURIComponent(canonicalSlug)}`;

  const coverUrl = getArticleCoverUrl(article);
  const normalizedCover = getContentfulImageUrl(coverUrl, {
    width: 1200,
    height: 630,
    fit: 'fill',
    quality: 85,
    format: 'jpg',
  });
  const coverAlt = getArticleCoverAlt(article);
  const isoPublished = toIsoDateString(article.publishedDate);

  return {
    title: cleanTitle,
    description: article.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${cleanTitle} | MG Headhunting`,
      description: article.excerpt,
      url: canonicalUrl,
      type: 'article',
      ...(isoPublished ? { publishedTime: isoPublished } : {}),
      images: [
        {
          url: normalizedCover,
          width: 1200,
          height: 630,
          alt: coverAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cleanTitle} | MG Headhunting`,
      description: article.excerpt,
      images: [normalizedCover],
    },
  };
}

export async function generateStaticParams() {
  const articles = await fetchInsightArticles(false);
  return articles
    .map((article) => {
      const slug = (article?.fields?.slug || article?.slug || '').trim();
      return slug && slug !== 'undefined' ? { slug } : null;
    })
    .filter((entry): entry is { slug: string } => entry !== null);
}

export default async function InsightDetailPage({ params, searchParams }: InsightPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const [{ isEnabled }, headerList, query] = await Promise.all([
    draftMode(),
    headers(),
    searchParams ? searchParams : Promise.resolve(undefined),
  ]);

  const hasPreviewParam = query?.preview === 'true';
  const host = headerList.get('host');
  const isPreview = shouldUsePreviewData({
    isDraftEnabled: isEnabled,
    hasPreviewParam,
    host,
  });

  const [rawArticle, allArticles, siteSettings] = await Promise.all([
    fetchInsightBySlug(decodedSlug, isPreview),
    fetchInsightArticles(isPreview),
    fetchSiteSettings(isPreview),
  ]);

  if (!rawArticle) {
    notFound();
  }

  const article: InsightArticleFields = rawArticle?.fields
    ? { ...rawArticle.fields, sys: rawArticle.sys }
    : rawArticle;

  const currentSlug = (article.slug || decodedSlug).trim();
  const canonicalUrl = `${SITE_URL}/insights/${encodeURIComponent(currentSlug)}`;

  const relatedArticles = allArticles
    .map((a) => (a?.fields ? { ...a.fields, sys: a.sys } : a))
    .filter((a) => a?.slug && a.slug !== 'undefined' && a.slug !== currentSlug)
    .slice(0, 2);

  return (
    <>
      <ArticleSchema article={article} updatedAt={rawArticle?.sys?.updatedAt} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Market Intelligence', url: `${SITE_URL}/insights` },
          { name: article.title, url: canonicalUrl },
        ]}
      />
      <InsightDetailClient
        initialArticle={rawArticle}
        relatedArticles={relatedArticles}
        siteSettings={siteSettings}
      />
    </>
  );
}
