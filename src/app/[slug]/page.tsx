import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { draftMode, headers } from 'next/headers';
import { fetchModularPageBySlug, fetchAllModularPageSlugs } from '../../lib/contentful/api';
import { ModularPageClient } from '../../components/page-builder/ModularPageClient';
import { BreadcrumbSchema, PersonSchema } from '../../components/seo/JsonLd';
import { SITE_URL, stripBrandSuffix, shouldUsePreviewData } from '../../lib/seo';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{ preview?: string }>;
}

export async function generateStaticParams() {
  const slugs = await fetchAllModularPageSlugs(false);
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchModularPageBySlug(slug, false);

  if (!page) {
    return {
      title: 'Page Not Found',
      robots: { index: false, follow: false },
    };
  }

  const cleanTitle = stripBrandSuffix(page.metaTitle || page.title) || page.title;
  const canonicalUrl = `${SITE_URL}/${encodeURIComponent(slug)}`;
  const description =
    page.metaDescription ||
    'Boutique retained executive search delivering Board, Managing Director, and C-Suite appointments across the UK and European Building Products sector.';

  return {
    title: cleanTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${cleanTitle} | MG Headhunting`,
      description,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function ModularPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
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

  const pageData = await fetchModularPageBySlug(slug, isPreview);

  if (!pageData) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/${encodeURIComponent(slug)}`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: pageData.title, url: canonicalUrl },
        ]}
      />
      {slug === 'about' && <PersonSchema />}
      <ModularPageClient data={pageData} />
    </>
  );
}
