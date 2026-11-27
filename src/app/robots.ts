import { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';

const DISALLOWED_PATHS = [
  '/api/',
  '/design-system',
  '/design-system/',
  '/storybook',
  '/storybook/',
  '/netlify-forms.html',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOWED_PATHS,
      },
      {
        // Explicitly allow and prioritize AI search engines and RAG retrieval bots
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-SearchBot',
          'anthropic-ai',
          'Google-Extended',
          'Applebot-Extended',
          'cohere-ai',
          'Meta-ExternalAgent',
        ],
        allow: '/',
        disallow: DISALLOWED_PATHS,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
