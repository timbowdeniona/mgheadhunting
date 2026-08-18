'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import {
  Search,
  ArrowRight,
  Clock,
  User,
  Download,
  BookOpen,
  ArrowLeft,
  Briefcase,
} from 'lucide-react';
import { InsightArticleFields, SiteSettingsFields } from '../../lib/contentful/types';
import { InsightCard } from '../../components/ui/InsightCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { InitiateSearchModal } from '../../components/ui/InitiateSearchModal';
import { Wordmark } from '../../components/brand/Wordmark';
import { Monogram } from '../../components/brand/Monogram';
import { trackInsightView, trackCtaClick, trackDirectContact, trackEvent } from '../../lib/analytics';

interface InsightsClientProps {
  articles: InsightArticleFields[];
  siteSettings: SiteSettingsFields;
}

const CATEGORIES = [
  'ALL',
  'EXECUTIVE COMPENSATION',
  'REGULATORY & COMPLIANCE',
  'M&A & EXPANSION',
  'SUSTAINABILITY & TECH',
];

export function InsightsClient({ articles: initialArticles, siteSettings: initialSiteSettings }: InsightsClientProps) {
  const articles = useContentfulLiveUpdates(initialArticles);
  const siteSettings = useContentfulLiveUpdates(initialSiteSettings);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [modalDefaultSector, setModalDefaultSector] = useState<string | undefined>(undefined);

  const handleOpenSearchModal = (sector?: string) => {
    setModalDefaultSector(sector);
    setIsSearchModalOpen(true);
  };

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'ALL' ||
        article.category.toUpperCase().includes(selectedCategory);

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        (article.author?.fields?.name && article.author.fields.name.toLowerCase().includes(query)) ||
        (article.keyTakeaways && article.keyTakeaways.some((t) => t.toLowerCase().includes(query)));

      return matchesCategory && matchesQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Featured Article (First article marked featured or first in list)
  const featuredArticle = useMemo(() => {
    return articles.find((a) => a.isFeatured) || articles[0];
  }, [articles]);

  const featuredCoverUrl =
    featuredArticle?.coverImage?.fields?.file?.url ||
    featuredArticle?.featuredImage?.fields?.file?.url ||
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop';

  const normalizedFeaturedCover = featuredCoverUrl.startsWith('//')
    ? `https:${featuredCoverUrl}`
    : featuredCoverUrl;

  return (
    <div className="min-h-screen bg-canvas-light text-navy-900 font-sans flex flex-col selection:bg-teal-600 selection:text-white">
      
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-steel-200 shadow-sm py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="hidden sm:block">
                <Wordmark size="sm" showSubtitle={false} />
              </div>
              <div className="sm:hidden flex items-center gap-2">
                <Monogram size="sm" />
                <span className="font-display font-bold text-xs uppercase tracking-wider text-navy-900">
                  MGH
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-4 text-xs font-sans text-steel-500 border-l border-steel-300 pl-4">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 hover:text-navy-900 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Executive Desk</span>
              </Link>
              <span>/</span>
              <span className="text-navy-900 font-semibold">Market Intelligence</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center text-xs font-medium text-steel-600 hover:text-navy-900 transition-colors mr-2"
            >
              Main Portal
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleOpenSearchModal()}
              icon={<Briefcase className="w-3.5 h-3.5" />}
            >
              Commission Search
            </Button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Editorial Hero Header */}
        <section className="bg-navy-950 text-white py-16 sm:py-20 lg:py-24 border-b border-navy-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-teal-950/80 border border-teal-800 text-teal-400 text-xs uppercase font-sans tracking-widest font-semibold mb-6">
                Executive Search Market Intelligence
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                Strategic Briefings &amp; Boardroom Intelligence
              </h1>

              <p className="text-base sm:text-lg text-steel-300 leading-relaxed font-sans max-w-2xl">
                Proprietary analyses on executive compensation, Building Safety Act compliance, private equity buy-and-build consolidation, and low-carbon leadership transitions across the UK &amp; European Building Products sector.
              </p>
            </div>
          </div>
        </section>

        {/* Lead Featured Article Spotlight (if no active search/category filter) */}
        {selectedCategory === 'ALL' && !searchQuery && featuredArticle && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20 mb-16">
            <div className="bg-white border border-steel-300 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 group">
              
              {/* Cover Image */}
              <div className="relative lg:col-span-7 h-64 sm:h-80 lg:h-auto min-h-[300px] overflow-hidden bg-steel-100">
                <Image
                  src={normalizedFeaturedCover}
                  alt={featuredArticle.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-navy-950/15 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute top-4 left-4">
                  <Badge variant="teal" size="sm">
                    Featured Briefing
                  </Badge>
                </div>
              </div>

              {/* Article Content */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-steel-500 font-sans mb-3">
                    <span className="font-semibold text-teal-700 uppercase tracking-wider">
                      {featuredArticle.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight leading-tight group-hover:text-teal-700 transition-colors mb-4">
                    <Link href={`/insights/${featuredArticle.slug}`}>
                      {featuredArticle.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-steel-700 leading-relaxed font-sans mb-6 line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>

                  {/* Takeaways Preview */}
                  {featuredArticle.keyTakeaways && featuredArticle.keyTakeaways.length > 0 && (
                    <div className="mb-6 p-4 bg-steel-50 border-l-2 border-teal-600">
                      <span className="font-sans text-[11px] text-navy-800 font-semibold block mb-2 uppercase tracking-wide">
                        Key Strategic Implication:
                      </span>
                      <p className="text-xs text-steel-700 leading-relaxed">
                        {featuredArticle.keyTakeaways[0]}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-steel-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <User className="w-3.5 h-3.5 text-teal-600" />
                    <span className="font-medium text-navy-900">
                      {featuredArticle.author?.fields?.name || 'Mark Goldsmith'}
                    </span>
                  </div>

                  <Link
                    href={`/insights/${featuredArticle.slug}`}
                    onClick={() => trackInsightView(featuredArticle.slug, featuredArticle.title, featuredArticle.category)}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Read Briefing
                    </Button>
                  </Link>
                </div>

              </div>

            </div>
          </section>
        )}

        {/* Filter and Search Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-steel-300">
            
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-steel-100 border border-steel-300">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    trackEvent('filter_change', 'Insights Practice Area', cat);
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 text-xs font-sans tracking-wider transition-all select-none uppercase font-medium ${
                    selectedCategory === cat
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'text-steel-700 hover:text-navy-900 hover:bg-steel-200/70'
                  }`}
                >
                  {cat === 'ALL' ? 'All Practice Areas' : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <input
                type="text"
                placeholder="Search briefings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  if (searchQuery.trim()) {
                    trackEvent('search_query', 'Insights Search', searchQuery.trim());
                  }
                }}
                className="w-full pl-9 pr-4 py-2 bg-white border border-steel-300 text-xs font-sans text-navy-900 placeholder:text-steel-400 focus:outline-none focus:border-navy-900 focus:ring-1 focus:ring-navy-900 transition-colors"
              />
              <Search className="w-4 h-4 text-steel-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-xs text-steel-400 hover:text-navy-900 font-mono"
                >
                  ✕
                </button>
              )}
            </div>

          </div>

          {/* Results Count Strip */}
          <div className="flex items-center justify-between pt-4 pb-2 text-xs text-steel-500 font-sans">
            <span>
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'briefing' : 'briefings'}
              {selectedCategory !== 'ALL' && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            {(selectedCategory !== 'ALL' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                className="text-teal-700 hover:underline font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => {
                const coverUrl =
                  article.coverImage?.fields?.file?.url ||
                  article.featuredImage?.fields?.file?.url ||
                  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop';
                
                return (
                  <InsightCard
                    key={article.slug}
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
                    onClick={() => trackInsightView(article.slug, article.title, article.category)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-steel-300 p-8">
              <BookOpen className="w-8 h-8 text-steel-400 mx-auto mb-3" />
              <h3 className="font-display text-lg font-bold text-navy-900 mb-1">
                No matching briefings found
              </h3>
              <p className="text-xs text-steel-500 max-w-sm mx-auto mb-4">
                No market intelligence publications matched your current filter criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-navy-900 text-white text-xs font-sans font-medium hover:bg-navy-800 transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </section>

        {/* Lead Gen Banner: Executive Salary Benchmark Report */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="p-8 sm:p-10 bg-navy-900 text-white border border-navy-700 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-teal-400" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-400" />
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-teal-300">
                    Annual Sector Publication
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  2026/2027 Building Products Executive Salary &amp; Retention Benchmark
                </h3>
                <p className="text-xs sm:text-sm text-steel-300 leading-relaxed">
                  Comprehensive compensation analysis covering 400+ board appointments across UK &amp; European manufacturing, merchants, and fabricators. Includes base pay matrices, LTIP structures, and PE equity sweat allocations.
                </p>
              </div>

              <div className="shrink-0">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<Download className="w-4 h-4" />}
                  onClick={() => {
                    trackEvent('file_download', 'Research Report', '2026/2027 Building Products Executive Salary Benchmark');
                    handleOpenSearchModal('Executive Salary Benchmark Report');
                  }}
                >
                  Request Confidential Report
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Commission Search Advisory Callout */}
        <section className="bg-steel-100 border-t border-steel-300 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <span className="font-sans text-xs uppercase tracking-widest text-teal-800 font-semibold">
              Retained Executive Search Mandates
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Calibrate Your Board &amp; Executive Leadership
            </h2>
            <p className="text-sm sm:text-base text-steel-700 leading-relaxed font-sans max-w-2xl mx-auto">
              Discuss confidential Managing Director, Commercial, Technical, or Operational appointments directly with lead search partner Mark Goldsmith.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  trackCtaClick('Initiate Confidential Search', 'insights_cta_footer');
                  handleOpenSearchModal();
                }}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Initiate Confidential Search
              </Button>
              <a
                href={`mailto:${siteSettings.primaryEmail}`}
                onClick={() => trackDirectContact('email', siteSettings.primaryEmail, 'insights_footer')}
                className="px-5 py-2.5 bg-white border border-steel-300 text-xs font-sans font-semibold text-navy-900 hover:bg-steel-50 transition-colors shadow-sm"
              >
                Direct Partner Desk: {siteSettings.primaryEmail}
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-navy-950 text-steel-400 py-10 px-4 sm:px-8 border-t border-navy-800 text-xs font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white font-display font-bold uppercase tracking-wider">
              {siteSettings.siteName}
            </Link>
            <span>•</span>
            <span>{siteSettings.copyrightText}</span>
          </div>
          <div className="text-steel-400 text-center md:text-right">
            <span>{siteSettings.icoRegistrationNumber}</span>
          </div>
        </div>
      </footer>

      {/* Search Mandate Intake Modal */}
      <InitiateSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        defaultSector={modalDefaultSector}
      />

    </div>
  );
}
