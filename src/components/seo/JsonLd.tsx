import React from 'react';

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
    "@type": "Organization",
    "name": "MG Headhunting",
    "url": "https://mgheadhunting.com",
    "logo": "https://mgheadhunting.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.linkedin.com/company/mg-headhunting/"
    ]
  };
  return <JsonLd schema={schema} />;
}

export function PersonSchema({ name, role, url }: { name: string, role?: string, url?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": role,
    "url": url,
    "worksFor": {
      "@type": "Organization",
      "name": "MG Headhunting"
    }
  };
  return <JsonLd schema={schema} />;
}

export function ArticleSchema({ article }: { article: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.coverImage?.fields?.file?.url ? (article.coverImage.fields.file.url.startsWith('//') ? `https:${article.coverImage.fields.file.url}` : article.coverImage.fields.file.url) : "",
    "datePublished": article.publishedDate,
    "author": [{
      "@type": "Person",
      "name": article.author?.fields?.name || "Mark Goldsmith"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "MG Headhunting",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mgheadhunting.com/logo.png"
      }
    }
  };
  return <JsonLd schema={schema} />;
}
