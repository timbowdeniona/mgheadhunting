import React from 'react';
import { getContentfulImageUrl } from '../../lib/contentful/imageLoader';
import {
  SITE_URL,
  CANONICAL_EMAIL,
  CANONICAL_PHONE_E164,
  CANONICAL_LINKEDIN,
  toIsoDateString,
} from '../../lib/seo';

export function JsonLd({ schema }: { schema: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: 'MG Headhunting',
    legalName: 'MG Headhunting Ltd',
    alternateName: ['MGH', 'MG Headhunting Executive Search'],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/mgh-logo-light.png`,
    },
    image: `${SITE_URL}/MGH%20Full%20Logo.png`,
    description:
      'Boutique retained executive search delivering Board, Managing Director, and C-Suite appointments across the UK and European Building Products and Built Environment sectors.',
    telephone: CANONICAL_PHONE_E164,
    email: CANONICAL_EMAIL,
    priceRange: '$$$$',
    areaServed: [
      {
        '@type': 'Country',
        name: 'United Kingdom',
      },
      {
        '@type': 'Country',
        name: 'Republic of Ireland',
      },
      {
        '@type': 'Continent',
        name: 'Europe',
      },
    ],
    founder: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#mark-goldsmith`,
      name: 'Mark Goldsmith',
      jobTitle: 'Founder & Managing Director',
      url: `${SITE_URL}/about`,
      email: CANONICAL_EMAIL,
      telephone: CANONICAL_PHONE_E164,
      sameAs: [CANONICAL_LINKEDIN],
      knowsAbout: [
        'Executive Search',
        'Building Products',
        'Construction Materials',
        'Fenestration and Glazing',
        'Board Appointments',
        'C-Suite Recruitment',
        'Executive Succession Planning',
      ],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Executive Search Inquiries',
      email: CANONICAL_EMAIL,
      telephone: CANONICAL_PHONE_E164,
      url: `${SITE_URL}/contact`,
      availableLanguage: ['en-GB', 'en'],
    },
    sameAs: [CANONICAL_LINKEDIN],
    knowsAbout: [
      'Building Products Executive Search',
      'Construction Materials Headhunting',
      'Fenestration and Facades Leadership Search',
      'HVAC and Building Services Recruitment',
      'Builders Merchants and Distribution Executive Search',
      'Offsite and Modular Construction Appointments',
      'Managing Director and Board Level Recruitment',
      'Retained Executive Search Methodology',
      'Private Equity Talent Advisory in Built Environment',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Executive Search & Leadership Advisory Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Retained Executive Search',
            url: `${SITE_URL}/retained-search`,
            description:
              'Partner-led retained headhunting for Board, Managing Director, and C-Suite leadership roles across the Building Products and Construction sectors.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Board & Non-Executive Advisory',
            url: `${SITE_URL}/sectors`,
            description:
              'Appointing Independent Board Chairs, Non-Executive Directors, and governance advisors for manufacturing and distribution enterprises.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Talent & Market Mapping',
            url: `${SITE_URL}/retained-search`,
            description:
              'Confidential competitor talent benchmarking, compensation analysis, and executive leadership pipeline mapping.',
          },
        },
      ],
    },
  };
  return <JsonLd schema={schema} />;
}

export function PersonSchema({
  name = 'Mark Goldsmith',
  role = 'Founder & Managing Director',
  url = `${SITE_URL}/about`,
}: {
  name?: string;
  role?: string;
  url?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#mark-goldsmith`,
    name,
    jobTitle: role,
    url,
    email: CANONICAL_EMAIL,
    telephone: CANONICAL_PHONE_E164,
    image: `${SITE_URL}/mark-goldsmith-suited.jpg`,
    worksFor: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'MG Headhunting',
      url: SITE_URL,
    },
    knowsAbout: [
      'Retained Executive Search',
      'Building Products Industry',
      'Construction Materials Supply Chain',
      'Fenestration and Facades Recruitment',
      'Board Appointments',
      'C-Suite Leadership Assessment',
    ],
    sameAs: [CANONICAL_LINKEDIN],
  };
  return <JsonLd schema={schema} />;
}

export function ArticleSchema({
  article,
  updatedAt,
}: {
  article: any;
  updatedAt?: string;
}) {
  const coverUrl =
    article.coverImage?.fields?.file?.url ||
    article.coverImage?.fields?.image?.fields?.file?.url ||
    '';
  const imageUrl = coverUrl
    ? getContentfulImageUrl(coverUrl, {
        width: 1200,
        height: 630,
        fit: 'fill',
        quality: 85,
        format: 'jpg',
      })
    : `${SITE_URL}/MGH%20Full%20Logo.png`;

  const slug = typeof article.slug === 'string' ? article.slug.trim() : '';
  const canonicalUrl = `${SITE_URL}/insights/${encodeURIComponent(slug)}`;
  const isoPublished = toIsoDateString(article.publishedDate, updatedAt);
  const isoModified = toIsoDateString(updatedAt || article.publishedDate, isoPublished);

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: [imageUrl],
    ...(isoPublished ? { datePublished: isoPublished } : {}),
    ...(isoModified ? { dateModified: isoModified } : {}),
    inLanguage: 'en-GB',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    author: [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#mark-goldsmith`,
        name: article.author?.fields?.name || 'Mark Goldsmith',
        jobTitle: 'Founder & Managing Director',
        url: `${SITE_URL}/about`,
        sameAs: [CANONICAL_LINKEDIN],
        worksFor: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'MG Headhunting',
        },
      },
    ],
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'MG Headhunting',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/mgh-logo-light.png`,
      },
    },
  };
  return <JsonLd schema={schema} />;
}

export function FaqSchema({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  if (!items || items.length === 0) return null;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
  return <JsonLd schema={schema} />;
}

export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  if (!items || items.length === 0) return null;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLd schema={schema} />;
}
