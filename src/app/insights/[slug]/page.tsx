import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { fetchInsightBySlug, fetchInsightArticles, fetchSiteSettings } from '../../../lib/contentful/api';
import { RichTextRenderer } from '../../../components/ui/RichTextRenderer';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { InsightCard } from '../../../components/ui/InsightCard';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Mail,
  ShieldCheck,
} from 'lucide-react';

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

  const coverUrl =
    article.coverImage?.fields?.file?.url ||
    article.featuredImage?.fields?.file?.url ||
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop';

  const normalizedCover = coverUrl.startsWith('//') ? `https:${coverUrl}` : coverUrl;

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
          alt: article.title,
        },
      ],
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
  const [article, allArticles, siteSettings] = await Promise.all([
    fetchInsightBySlug(slug),
    fetchInsightArticles(),
    fetchSiteSettings(),
  ]);

  if (!article) {
    notFound();
  }

  const relatedArticles = allArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 2);

  const coverUrl =
    article.coverImage?.fields?.file?.url ||
    article.featuredImage?.fields?.file?.url ||
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop';

  const normalizedCover = coverUrl.startsWith('//') ? `https:${coverUrl}` : coverUrl;
  const authorName = article.author?.fields?.name || 'Mark Goldsmith';
  const authorRole = article.author?.fields?.roleTitle || 'Managing Director & Lead Search Partner';
  const authorTenure = article.author?.fields?.practiceTenure || '20+ Years';
  const authorBio =
    article.author?.fields?.bioShort ||
    'Lead Partner at MG Headhunting specializing in Board, MD, and C-Suite retained executive search across the UK and European Building Products sector.';

  return (
    <div className="min-h-screen bg-canvas-light text-navy-900 font-sans flex flex-col selection:bg-teal-600 selection:text-white">
      
      {/* Top Header & Breadcrumbs */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-steel-200 shadow-sm py-3 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3 text-xs font-sans text-steel-600">
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-navy-900 hover:text-teal-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Market Intelligence</span>
            </Link>
            <span className="text-steel-300">/</span>
            <span className="text-steel-500 hidden sm:inline truncate max-w-xs">
              {article.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-steel-500 hover:text-navy-900 transition-colors hidden sm:inline">
              Executive Desk
            </Link>
            <Link href="/#contact">
              <Button variant="primary" size="sm" icon={<Briefcase className="w-3.5 h-3.5" />}>
                Commission Search
              </Button>
            </Link>
          </div>

        </div>
      </header>

      {/* Main Article Container */}
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Category & Badge */}
        <div className="mb-4">
          <Badge variant="teal" size="md" dot>
            {article.category}
          </Badge>
        </div>

        {/* Article Headline */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.15] mb-6">
          {article.title}
        </h1>

        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-sans text-steel-600 border-y border-steel-300 py-4 mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>Published: {article.publishedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>Read Time: {article.readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-teal-600" />
            <span>Author: {authorName}</span>
          </div>
        </div>

        {/* Hero Cover Image Display */}
        <div className="relative w-full h-72 sm:h-96 lg:h-[420px] mb-10 overflow-hidden bg-steel-100 border border-steel-300 shadow-sm">
          <Image
            src={normalizedCover}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy-950/15 pointer-events-none" />
          {article.coverImage?.fields?.description && (
            <div className="absolute bottom-0 inset-x-0 bg-navy-950/80 backdrop-blur-sm text-steel-300 text-[11px] font-sans px-4 py-2 text-right">
              {article.coverImage.fields.description}
            </div>
          )}
        </div>

        {/* Executive Summary Box */}
        <div className="p-6 sm:p-8 bg-steel-100 border-l-4 border-teal-600 mb-10 shadow-sm">
          <div className="font-sans text-xs uppercase tracking-wider text-teal-900 font-bold mb-2">
            Executive Summary &amp; Market Context
          </div>
          <p className="text-base text-navy-950 leading-relaxed font-sans font-medium">
            {article.excerpt}
          </p>
        </div>

        {/* Key Strategic Takeaways */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="mb-10 p-6 bg-white border border-steel-300 shadow-sm">
            <div className="font-sans text-xs uppercase tracking-wider text-navy-900 font-bold mb-4 pb-2 border-b border-steel-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Key Strategic Takeaways for Boards &amp; Investors</span>
            </div>
            <div className="space-y-3">
              {article.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-steel-800">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-sans">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rich Text Body Content */}
        <article className="bg-white p-6 sm:p-10 border border-steel-300 mb-12 shadow-sm">
          {article.body ? (
            <RichTextRenderer document={article.body} />
          ) : (
            <div className="text-sm sm:text-base text-steel-700 leading-relaxed space-y-4 font-sans">
              <p>
                The UK and European Building Products manufacturing landscape is undergoing significant leadership recalibration. Heightened regulatory mandates under the Building Safety Act 2022, shifting supply-chain economics, and Private Equity value-creation cycles are redefining the competencies required of executive leaders.
              </p>
              <p>
                Organizations navigating these transitions require proven, non-active executive talent capable of executing strategic growth while maintaining rigorous compliance and operational discipline.
              </p>
            </div>
          )}
        </article>

        {/* Author Bio Card */}
        <div className="p-6 sm:p-8 bg-white border border-steel-300 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-sans text-teal-700 font-semibold uppercase tracking-wider">
              <span>Author Profile</span>
              <span>•</span>
              <span>{authorTenure} Practice Tenure</span>
            </div>
            <h3 className="font-display text-xl font-bold text-navy-900">
              {authorName}
            </h3>
            <p className="font-mono text-xs text-steel-600 uppercase">
              {authorRole}
            </p>
            <p className="text-xs text-steel-700 leading-relaxed pt-1">
              {authorBio}
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-2 w-full sm:w-auto">
            <Link href="/#contact">
              <Button variant="outline" size="sm" fullWidth icon={<Mail className="w-3.5 h-3.5" />}>
                Contact Author
              </Button>
            </Link>
          </div>
        </div>

        {/* Related Briefings */}
        {relatedArticles.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-steel-300">
              <h3 className="font-display text-xl font-bold text-navy-900">
                Related Market Intelligence
              </h3>
              <Link
                href="/insights"
                className="text-xs font-sans font-semibold text-teal-700 hover:text-navy-900 transition-colors inline-flex items-center gap-1"
              >
                <span>View all publications</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => {
                const relCover =
                  rel.coverImage?.fields?.file?.url ||
                  rel.featuredImage?.fields?.file?.url ||
                  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop';
                return (
                  <InsightCard
                    key={rel.slug}
                    category={rel.category}
                    readTime={rel.readTime}
                    date={rel.publishedDate}
                    title={rel.title}
                    excerpt={rel.excerpt}
                    coverImage={relCover}
                    href={`/insights/${rel.slug}`}
                    variant="compact"
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Practice Consultation Banner */}
        <div className="p-8 sm:p-10 bg-navy-900 text-white border border-navy-700 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-teal-400" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-1.5 max-w-xl">
              <span className="font-sans text-xs uppercase tracking-wider text-teal-400 font-semibold">
                Commission Retained Search
              </span>
              <h3 className="font-display text-2xl font-bold text-white">
                Discuss Sector Leadership with Mark Goldsmith
              </h3>
              <p className="text-xs text-steel-300 leading-relaxed">
                Confidential advisory on C-suite remuneration benchmarking, board composition, and executive search mandates across Building Products &amp; Construction.
              </p>
            </div>

            <Link href="/#contact" className="shrink-0">
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
      <footer className="bg-navy-950 text-steel-400 py-8 px-4 sm:px-8 border-t border-navy-800 text-xs font-sans">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
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

    </div>
  );
}
