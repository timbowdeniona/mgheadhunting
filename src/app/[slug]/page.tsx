import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { fetchModularPageBySlug, fetchAllModularPageSlugs } from '../../lib/contentful/api';
import { ModularPageClient } from '../../components/page-builder/ModularPageClient';

export const revalidate = 60;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
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

export default async function ModularPage({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const pageData = await fetchModularPageBySlug(slug, isEnabled);

  if (!pageData) {
    notFound();
  }

  return <ModularPageClient data={pageData} />;
}

