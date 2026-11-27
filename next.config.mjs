import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
  serverExternalPackages: ['contentful', 'contentful-management'],
  async redirects() {
    return [
      {
        source: '/sitemap-index.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/sitemap_index.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/specialisms',
        destination: '/sectors',
        permanent: true,
      },
      {
        source: '/process',
        destination: '/retained-search',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Prevent staging / deploy-preview *.netlify.app domains from being indexed as duplicates
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'host',
            value: '.*\\.netlify\\.app$',
          },
        ],
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: '/design-system',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/design-system/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/storybook/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/netlify-forms.html',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default nextConfig;
