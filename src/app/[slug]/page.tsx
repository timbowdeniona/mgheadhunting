import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { fetchModularPageBySlug, fetchAllModularPageSlugs } from '../../lib/contentful/api';
import { ModularPageClient } from '../../components/page-builder/ModularPageClient';

// Staging (mgheadhunting.netlify.app) is 100% dynamic for real-time Contentful preview.
// Live production (www.mgheadhunting.co.uk) switches to static ISR when SITE_ENV=production.
const isLiveProduction =
  process.env.SITE_ENV === 'production' ||
  process.env.NEXT_PUBLIC_SITE_ENV === 'production';

export const dynamic = 'auto';
export const revalidate = 0;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{ preview?: string }>;
}

export async function generateStaticParams() {
  const slugs = await fetchAllModularPageSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchModularPageBySlug(slug);

  if (!page) {
    return {
      title: 'Page Not Found | MG Headhunting',
    };
  }

  return {
    title: page.metaTitle || `${page.title} | MG Headhunting (MGH)`,
    description:
      page.metaDescription ||
      'Boutique retained executive search delivering Board, Managing Director, and C-Suite appointments across the UK and European Building Products sector.',
    openGraph: {
      title: page.metaTitle || `${page.title} | MG Headhunting (MGH)`,
      description: page.metaDescription,
    },
  };
}

export default async function ModularPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const query = searchParams ? await searchParams : undefined;
  const hasPreviewParam = query?.preview === 'true';

  const isPreview = !isLiveProduction || isEnabled || hasPreviewParam;
  const pageData = await fetchModularPageBySlug(slug, isPreview);

  if (!pageData) {
    notFound();
  }

  return <ModularPageClient data={pageData} />;
}

