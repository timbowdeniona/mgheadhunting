import React from 'react';
import { getContentfulImageUrl } from '../../lib/contentful/imageLoader';

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
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://mgheadhunting.com/#organization",
    "name": "MG Headhunting",
    "alternateName": ["MGH", "MG Headhunting Executive Search"],
    "url": "https://mgheadhunting.com",
    "logo": "https://mgheadhunting.com/mgh-favicon.svg",
    "description": "Boutique retained executive search delivering Board, Managing Director, and C-Suite appointments across the UK and European Building Products and Built Environment sectors.",
    "priceRange": "$$$$",
    "areaServed": [
      {
        "@type": "Country",
        "name": "United Kingdom"
      },
      {
        "@type": "Country",
        "name": "Republic of Ireland"
      },
      {
        "@type": "Continent",
        "name": "Europe"
      }
    ],
    "founder": {
      "@type": "Person",
      "@id": "https://mgheadhunting.com/#mark-goldsmith",
      "name": "Mark Goldsmith",
      "jobTitle": "Founder & Managing Director",
      "url": "https://mgheadhunting.com/about",
      "sameAs": [
        "https://www.linkedin.com/in/mark-goldsmith-mgh/"
      ],
      "knowsAbout": [
        "Executive Search",
        "Building Products",
        "Construction Materials",
        "Board Appointments",
        "C-Suite Recruitment",
        "Executive Succession Planning"
      ]
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Executive Search Inquiries",
      "email": "mark@mgheadhunting.com",
      "availableLanguage": ["en"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/mg-headhunting/"
    ],
    "knowsAbout": [
      "Building Products Executive Search",
      "Construction Materials Headhunting",
      "Fenestration and Facades Leadership Search",
      "HVAC and Building Services Recruitment",
      "Builders Merchants and Distribution Executive Search",
      "Offsite and Modular Construction Appointments",
      "Managing Director and Board Level Recruitment",
      "Retained Executive Search Methodology",
      "Private Equity Talent Advisory in Built Environment"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Executive Search & Leadership Advisory Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Retained Executive Search",
            "description": "Partner-led retained headhunting for Board, Managing Director, and C-Suite leadership roles across the Building Products and Construction sectors."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Board & Non-Executive Advisory",
            "description": "Appointing Independent Board Chairs, Non-Executive Directors, and governance advisors for manufacturing and distribution enterprises."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Talent & Market Mapping",
            "description": "Confidential competitor talent benchmarking, compensation analysis, and executive leadership pipeline mapping."
          }
        }
      ]
    }
  };
  return <JsonLd schema={schema} />;
}

export function PersonSchema({
  name = "Mark Goldsmith",
  role = "Founder & Managing Director",
  url = "https://mgheadhunting.com/about",
}: {
  name?: string;
  role?: string;
  url?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://mgheadhunting.com/#mark-goldsmith",
    "name": name,
    "jobTitle": role,
    "url": url,
    "worksFor": {
      "@type": "Organization",
      "@id": "https://mgheadhunting.com/#organization",
      "name": "MG Headhunting"
    },
    "knowsAbout": [
      "Retained Executive Search",
      "Building Products Industry",
      "Construction Materials Supply Chain",
      "Board Appointments",
      "C-Suite Leadership Assessment"
    ],
    "sameAs": [
      "https://www.linkedin.com/in/mark-goldsmith-mgh/"
    ]
  };
  return <JsonLd schema={schema} />;
}

export function ArticleSchema({ article }: { article: any }) {
  const coverUrl = article.coverImage?.fields?.file?.url || article.coverImage?.fields?.image?.fields?.file?.url || "";
  const imageUrl = coverUrl ? getContentfulImageUrl(coverUrl, { width: 1200, height: 630, fit: 'fill', quality: 85, format: 'jpg' }) : "";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": imageUrl,
    "datePublished": article.publishedDate,
    "inLanguage": "en-GB",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mgheadhunting.com/insights/${article.slug}`
    },
    "author": [{
      "@type": "Person",
      "@id": "https://mgheadhunting.com/#mark-goldsmith",
      "name": article.author?.fields?.name || "Mark Goldsmith",
      "jobTitle": "Founder & Managing Director",
      "worksFor": {
        "@type": "Organization",
        "name": "MG Headhunting"
      }
    }],
    "publisher": {
      "@type": "Organization",
      "@id": "https://mgheadhunting.com/#organization",
      "name": "MG Headhunting",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mgheadhunting.com/mgh-favicon.svg"
      }
    }
  };
  return <JsonLd schema={schema} />;
}

export function FaqSchema({ items }: { items: Array<{ question: string; answer: string }> }) {
  if (!items || items.length === 0) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
  return <JsonLd schema={schema} />;
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  if (!items || items.length === 0) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
  return <JsonLd schema={schema} />;
}

