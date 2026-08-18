import React, { useState } from 'react';
import Link from 'next/link';
import { SectionDivider } from '../ui/SectionDivider';
import { InsightCard } from '../ui/InsightCard';
import { Button } from '../ui/Button';
import { BookOpen, Download, ArrowRight } from 'lucide-react';
import { InsightArticleFields, InsightsSectionData } from '../../lib/contentful/types';
import { fallbackInsightArticles } from '../../lib/contentful/fallbacks';
import { trackInsightView, trackEvent } from '../../lib/analytics';

export interface InsightsSectionProps {
  data?: InsightsSectionData;
  articles?: InsightArticleFields[];
  onReadArticle?: (article: InsightArticleFields) => void;
  onRequestReport?: () => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  data,
  articles,
  onReadArticle,
  onRequestReport,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  const articleList = articles || data?.articles || fallbackInsightArticles;
  const sectionLabel = data?.sectionLabel || 'Market Intelligence';
  const sectionTitle = data?.title || 'Executive Briefings & Market Insights';
  const sectionDesc =
    data?.description ||
    'Proprietary intelligence on executive talent flows, board compensation dynamics, and regulatory shifts across the Building Products landscape.';
  const reportCategory = data?.reportBannerCategory || 'Special Research Publication';
  const reportTitle =
    data?.reportBannerTitle || '2026/2027 Building Products Executive Salary & Retention Benchmark';
  const reportDesc =
    data?.reportBannerDescription ||
    'Comprehensive compensation analysis covering 400+ board appointments across UK & European manufacturing, merchants, and fabricators.';
  const reportCta = data?.reportBannerCtaText || 'Request Confidential Report';

  const filteredArticles =
    selectedTag === 'ALL'
      ? articleList
      : articleList.filter((a) => a.category.toUpperCase().includes(selectedTag));

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
              {['ALL', 'COMPENSATION', 'REGULATORY', 'M&A', 'SUSTAINABILITY'].map((tag) => (
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
                  {tag}
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
          {filteredArticles.map((article) => {
            const coverUrl =
              article.coverImage?.fields?.file?.url ||
              article.featuredImage?.fields?.file?.url;

            return (
              <InsightCard
                key={article.slug || article.title}
                category={article.category}
                readTime={article.readTime}
                date={article.publishedDate}
                title={article.title}
                excerpt={article.excerpt}
                keyTakeaways={article.keyTakeaways}
                coverImage={coverUrl}
                href={`/insights/${article.slug}`}
                author={
                  article.author
                    ? {
                        name: article.author.fields?.name || 'Mark Goldsmith',
                        title: article.author.fields?.roleTitle || 'Managing Director, MGH',
                      }
                    : undefined
                }
                onClick={() => {
                  trackInsightView(article.slug, article.title, article.category);
                  if (onReadArticle) onReadArticle(article);
                }}
              />
            );
          })}
        </div>

        {/* Annual Executive Salary Report Download Bar */}
        <div className="mt-12 p-6 sm:p-8 bg-navy-900 text-white border border-navy-700 flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          <div className="absolute top-0 left-0 w-16 h-[2px] bg-teal-400" />
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span className="font-sans font-medium tracking-wide text-teal-300">
                {reportCategory}
              </span>
            </div>
            <h3 className="font-display text-xl font-bold">
              {reportTitle}
            </h3>
            <p className="text-xs text-steel-300 max-w-xl">
              {reportDesc}
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={<Download className="w-4 h-4" />}
            onClick={() => {
              trackEvent('file_download', 'Research Report', reportTitle);
              if (onRequestReport) {
                onRequestReport();
              } else {
                alert('Download requested: 2026/2027 Building Products Executive Salary Benchmark Report has been queued for delivery.');
              }
            }}
          >
            {reportCta}
          </Button>
        </div>

      </div>
    </section>
  );
};
