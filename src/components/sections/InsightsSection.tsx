import React, { useState } from 'react';
import { SectionDivider } from '../ui/SectionDivider';
import { InsightCard } from '../ui/InsightCard';
import { Button } from '../ui/Button';
import { BookOpen, Download } from 'lucide-react';
import { InsightArticleFields } from '../../lib/contentful/types';
import { fallbackInsightArticles } from '../../lib/contentful/api';

export interface InsightsSectionProps {
  articles?: InsightArticleFields[];
  onReadArticle?: (article: InsightArticleFields) => void;
  onRequestReport?: () => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  articles = fallbackInsightArticles,
  onReadArticle,
  onRequestReport,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  const articleList = articles || fallbackInsightArticles;

  const filteredArticles = selectedTag === 'ALL'
    ? articleList
    : articleList.filter((a) => a.category.toUpperCase().includes(selectedTag));

  return (
    <section id="insights" className="py-20 lg:py-28 bg-canvas-light border-b border-steel-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionDivider code="SECTION // 04" label="MARKET INTELLIGENCE" tealAccent align="left" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight uppercase">
              Executive Briefings &amp; Market Insights
            </h2>
            <p className="text-sm sm:text-base text-steel-700 mt-2 max-w-2xl">
              Proprietary intelligence on executive talent flows, board compensation dynamics, and regulatory shifts across the Building Products landscape.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-steel-100 border border-steel-300">
            {['ALL', 'COMPENSATION', 'REGULATORY', 'M&A', 'SUSTAINABILITY'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 text-[11px] font-mono tracking-wider transition-all select-none uppercase font-semibold ${
                  selectedTag === tag
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-steel-700 hover:text-navy-900 hover:bg-steel-200/60'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <InsightCard
              key={article.slug || article.title}
              category={article.category}
              readTime={article.readTime}
              date={article.publishedDate}
              title={article.title}
              excerpt={article.excerpt}
              keyTakeaways={article.keyTakeaways}
              author={article.author ? {
                name: article.author.fields?.name || 'Mark Goldsmith',
                title: article.author.fields?.roleTitle || 'Managing Director, MGH',
              } : undefined}
              onClick={() => onReadArticle && onReadArticle(article)}
            />
          ))}
        </div>

        {/* Annual Executive Salary Report Download Bar */}
        <div className="mt-12 p-6 sm:p-8 bg-navy-900 text-white border border-navy-700 flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          <div className="absolute top-0 left-0 w-16 h-[2px] bg-teal-400" />
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-teal-300 font-bold">
                Special Research Publication
              </span>
            </div>
            <h3 className="font-display text-xl font-bold">
              2026/2027 Building Products Executive Salary &amp; Retention Benchmark
            </h3>
            <p className="text-xs text-steel-300 max-w-xl">
              Comprehensive compensation analysis covering 400+ board appointments across UK &amp; European manufacturing, merchants, and fabricators.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={<Download className="w-4 h-4" />}
            onClick={() => {
              if (onRequestReport) {
                onRequestReport();
              } else {
                alert('Download requested: 2026/2027 Building Products Executive Salary Benchmark Report has been queued for delivery.');
              }
            }}
          >
            Request Confidential Report
          </Button>
        </div>

      </div>
    </section>
  );
};
