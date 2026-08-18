# Task List: 002 - Insights Route & Contentful Content Model Extension

## Overview
Implement the full `/insights` route (listing page and detail pages), extend the `insightArticle` content type in Contentful with a `body` (Rich Text) and `coverImage` (Asset) field, run the migration/seeding script to populate the Contentful entries with rich text and cover images, and connect the Next.js pages with the design system.

## Prerequisites
- [x] Verify Contentful CMA credentials in `.env.local` (`CONTENTFUL_MANAGEMENT_TOKEN`, `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`)
- [x] Verify `@contentful/rich-text-react-renderer` and `@contentful/rich-text-types` dependencies

## Tasks
- [x] <!-- id: 0 --> Extend `insightArticle` content type schema in Contentful CMA with `body` (RichText) and `coverImage` (Asset Link)
- [x] <!-- id: 1 --> Create/upload cover image assets and seed rich text article body content for all insight articles via CMA script
- [x] <!-- id: 2 --> Update TypeScript interfaces in `src/lib/contentful/types.ts` and fallback data in `src/lib/contentful/api.ts`
- [x] <!-- id: 3 --> Enhance `RichTextRenderer.tsx` and `InsightCard.tsx` to support cover images and rich text styling
- [x] <!-- id: 4 --> Build `/insights` listing page (`src/app/insights/page.tsx`, `src/app/insights/InsightsClient.tsx`) with category filtering, featured article spotlight, search, and report CTA
- [x] <!-- id: 5 --> Refactor `/insights/[slug]` detail page (`src/app/insights/[slug]/page.tsx`) with hero cover image, breadcrumbs, executive summary, takeaways, rich text body, and author card
- [x] <!-- id: 6 --> Update `HeaderNav.tsx` and homepage `InsightsSection.tsx` to support direct routing to `/insights`
- [x] <!-- id: 7 --> Run automated build and typecheck (`npm run build`) to verify all routes and static generation

## Verification
- [x] Run Contentful migration script and verify entries are published with `body` and `coverImage` (Verified live on Contentful CDA)
- [x] Validate `/insights` listing page renders all articles, category filters, and cover images
- [x] Validate `/insights/[slug]` pages render full rich text body, cover image, and metadata for all articles
- [x] Run Next.js build (`npm run build`) with zero TypeScript or linting errors (Prerendered all 8 dynamic routes)
