import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchInsightBySlug, fetchInsightArticles } from '../../../lib/contentful/api';
import { RichTextRenderer } from '../../../components/ui/RichTextRenderer';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { SectionDivider } from '../../../components/ui/SectionDivider';
import { ArrowLeft, Calendar, Clock, User, CheckCircle2, ArrowRight } from 'lucide-react';

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchInsightBySlug(slug);
  if (!article) {
    return {
      title: 'Executive Briefing Not Found | MG Headhunting',
    };
  }

  return {
    title: `${article.title} | MG Headhunting Intelligence`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedDate,
    },
  };
}

export async function generateStaticParams() {
  const articles = await fetchInsightArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const article = await fetchInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-canvas-light text-navy-900 font-sans flex flex-col selection:bg-teal-600 selection:text-white">
      
      {/* Top Engineering Breadcrumb Header */}
      <header className="bg-navy-950 text-white border-b border-navy-800 py-3 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Executive Desk</span>
          </Link>
          <span className="font-mono text-[10px] text-steel-400 hidden sm:inline">
            SPEC // MARKET INTELLIGENCE
          </span>
        </div>
      </header>

      {/* Article Container */}
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Category & Badge */}
        <div className="mb-4">
          <Badge variant="teal" size="md" dot>
            {article.category}
          </Badge>
        </div>

        {/* Article Headline */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight uppercase leading-[1.15] mb-6">
          {article.title}
        </h1>

        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-steel-600 border-y border-steel-300 py-4 mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>PUBLISHED: {article.publishedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>READ TIME: {article.readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-teal-600" />
            <span>AUTHOR: {article.author?.fields?.name || 'Mark Goldsmith'}</span>
          </div>
        </div>

        {/* Executive Summary Box */}
        <div className="p-6 bg-steel-100 border-l-4 border-teal-600 mb-10">
          <div className="font-mono text-xs uppercase tracking-wider text-teal-800 font-bold mb-2">
            Executive Summary &amp; Context
          </div>
          <p className="text-base text-navy-900 leading-relaxed font-sans">
            {article.excerpt}
          </p>
        </div>

        {/* Key Strategic Takeaways */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="mb-10 p-6 bg-white border border-steel-300">
            <div className="font-mono text-xs uppercase tracking-widest text-navy-900 font-bold mb-3 pb-2 border-b border-steel-200">
              Key Strategic Takeaways
            </div>
            <div className="space-y-2.5">
              {article.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-steel-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rich Text Body Content */}
        <div className="bg-white p-6 sm:p-10 border border-steel-300 mb-12">
          {article.body ? (
            <RichTextRenderer document={article.body} />
          ) : (
            <div className="text-sm sm:text-base text-steel-700 leading-relaxed space-y-4">
              <p>
                The UK and European Building Products manufacturing landscape is undergoing significant leadership recalibration. Heightened regulatory mandates under the Building Safety Act 2022, shifting supply-chain economics, and Private Equity value-creation cycles are redefining the competencies required of executive leaders.
              </p>
              <p>
                Organizations navigating these transitions require proven, non-active executive talent capable of executing strategic growth while maintaining rigorous compliance and operational discipline.
              </p>
            </div>
          )}
        </div>

        {/* Practice Consultation Banner */}
        <div className="p-8 bg-navy-900 text-white border border-navy-700 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-teal-500" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-teal-400 font-bold">
                COMMISSION EXECUTIVE SEARCH
              </span>
              <h3 className="font-display text-xl font-bold">
                Discuss Sector Leadership with Mark Goldsmith
              </h3>
              <p className="text-xs text-steel-300 max-w-xl">
                Confidential advisory on C-suite remuneration benchmarking, board composition, and retained search mandates.
              </p>
            </div>

            <Link href="/#contact">
              <Button
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Initiate Confidential Search
              </Button>
            </Link>
          </div>
        </div>

      </main>

      {/* Simplified Footer */}
      <footer className="bg-navy-950 text-steel-400 py-6 px-4 border-t border-navy-800 text-xs font-mono text-center">
        <span>© 2026 MG Headhunting Ltd. All rights reserved. • UK GDPR Compliant</span>
      </footer>

    </div>
  );
}
