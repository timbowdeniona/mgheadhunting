import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mgheadhunting.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/design-system/'],
      },
      {
        // Explicitly allow and prioritize AI search engines and RAG retrieval bots
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Applebot-Extended',
          'cohere-ai',
          'Meta-ExternalAgent',
        ],
        allow: '/',
        disallow: ['/api/', '/design-system/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

