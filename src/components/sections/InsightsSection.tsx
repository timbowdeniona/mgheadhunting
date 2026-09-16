'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SectionDivider } from '../ui/SectionDivider';
import { InsightCard } from '../ui/InsightCard';
import { ArrowRight } from 'lucide-react';
import { InsightArticleFields, InsightsSectionData } from '../../lib/contentful/types';
import { getArticleCoverAlt, getArticleCoverUrl } from '../../lib/contentful/api';
import { fallbackInsightArticles } from '../../lib/contentful/fallbacks';
import { trackInsightView, trackEvent } from '../../lib/analytics';

export interface InsightsSectionProps {
  data?: InsightsSectionData;
  articles?: (InsightArticleFields | any)[];
  onReadArticle?: (article: InsightArticleFields) => void;
  onRequestReport?: () => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  data,
  articles,
  onReadArticle,
}) => {
  const [selectedTag, setSelectedTag] = useState<'ALL' | 'CASE STUDIES' | 'INSIGHTS'>('ALL');

  const rawArticles = articles || data?.articles || fallbackInsightArticles;

  // Normalize articles so that both flat fallback objects and raw Contentful Entry items
  // ({ sys: ..., fields: { ... } }) are seamlessly supported with complete type safety.
  const normalizedArticles: (InsightArticleFields & { sys?: any })[] = useMemo(() => {
    if (!Array.isArray(rawArticles)) return [];
    return rawArticles.map((item: any) => {
      if (item?.fields) {
        return {
          ...item.fields,
          sys: item.sys,
        };
      }
      return item;
    });
  }, [rawArticles]);

  const sectionLabel = data?.sectionLabel || 'Market Intelligence';
  const sectionTitle = data?.title || 'Case Studies & Market Insights';
  const sectionDesc =
    data?.description ||
    'Proprietary intelligence on executive talent flows, board compensation dynamics, and placement case studies across the Building Products landscape.';

  const filteredArticles = useMemo(() => {
    if (selectedTag === 'ALL') {
      return normalizedArticles;
    }
    return normalizedArticles.filter((a) => {
      const cat = (a.category || '').toUpperCase();
      const title = (a.title || '').toUpperCase();
      const slug = (a.slug || '').toUpperCase();
      const isCaseStudy =
        cat.includes('CASE') ||
        cat.includes('STUDY') ||
        title.includes('CASE STUDY') ||
        slug.includes('CASE-STUDY');

      if (selectedTag === 'CASE STUDIES') {
        return isCaseStudy;
      }
      if (selectedTag === 'INSIGHTS') {
        return !isCaseStudy;
      }
      return true;
    });
  }, [selectedTag, normalizedArticles]);

  return (
    <section id="insights" className="py-20 lg:py-28 bg-canvas-light border-b border-steel-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionDivider label={sectionLabel} tealAccent align="left" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              {sectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-steel-700 mt-2 max-w-2xl">
              {sectionDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-steel-100 border border-steel-300">
              {(['ALL', 'CASE STUDIES', 'INSIGHTS'] as const).map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    trackEvent('filter_change', 'Insights Filter', tag);
                    setSelectedTag(tag);
                  }}
                  className={`px-3 py-1.5 text-xs font-sans tracking-wider transition-all select-none uppercase font-medium ${
                    selectedTag === tag
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'text-steel-700 hover:text-navy-900 hover:bg-steel-200/60'
                  }`}
                >
                  {tag === 'ALL' ? 'All' : tag === 'CASE STUDIES' ? 'Case Studies' : 'Insights'}
                </button>
              ))}
            </div>

            <Link
              href="/insights"
              onClick={() => trackEvent('cta_click', 'Navigation', 'View All Intelligence')}
              className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-teal-800 hover:text-navy-900 transition-colors px-3 py-2 bg-white border border-steel-300 hover:border-steel-400"
            >
              <span>View All Intelligence</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article, index) => {
            const coverUrl = getArticleCoverUrl(article);
            const coverAlt = getArticleCoverAlt(article);
            const articleKey =
              article.sys?.id ||
              article.slug ||
              (article.title ? `${article.title}-${index}` : `insight-${index}`);

            return (
              <InsightCard
                key={articleKey}
                category={article.category || 'MARKET INTELLIGENCE'}
                readTime={article.readTime || '5 min read'}
                date={article.publishedDate || 'Recent'}
                title={article.title || 'Executive Briefing'}
                excerpt={article.excerpt || ''}
                keyTakeaways={article.keyTakeaways}
                coverImage={coverUrl}
                coverImageAlt={coverAlt}
                href={article.slug ? `/insights/${article.slug}` : '/insights'}
                author={
                  article.author
                    ? {
                        name: (article.author as any).fields?.name || (article.author as any).name || 'Mark Goldsmith',
                        title: (article.author as any).fields?.roleTitle || (article.author as any).title || 'Managing Director, MGH',
                      }
                    : undefined
                }
                onClick={() => {
                  trackInsightView(article.slug || '', article.title || '', article.category || '');
                  if (onReadArticle) onReadArticle(article);
                }}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};
