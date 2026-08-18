# Task List: 005 - Componentised Webpages & Modular Page Builder Architecture

## Overview
Implement a comprehensive modular page-building architecture for MG Headhunting (MGH). This enables the creation and rendering of custom, componentised pages (such as `/about`, `/sectors`, `/retained-search`, `/difference`, `/contact`, and custom landing pages) powered by Contentful CMS with local fallback. Every component in the MGH Design System will be available as a configurable page block, rendered within consistent, high-fidelity headers and footers with global modal integrations.

## Prerequisites
- [x] Contentful SDK and CMA credentials configured
- [x] Design system tokens, typography, and atomic/composite components in place
- [x] Dynamic App Router structure and Rich Text Renderer available

## Tasks
- [x] <!-- id: 0 --> Define modular component block types and `ModularPage` schema in `src/lib/contentful/types.ts`
- [x] <!-- id: 1 --> Create modular component registry and section components in `src/components/page-builder/` (HeroBanner, EditorialRichText, SectorGrid, DifferencePillars, ProcessTimeline, InsightsTeaser, TeamPartnerProfile, MetricStatsBar, FaqAccordion, CtaBanner, ContactDesk)
- [x] <!-- id: 2 --> Build the dynamic Section Dispatcher / Component Registry (`src/components/page-builder/PageSectionRenderer.tsx`) and client wrapper (`src/components/page-builder/ModularPageClient.tsx`) with consistent HeaderNav, ContactFooterSection, and Search/Article Modals
- [x] <!-- id: 3 --> Implement Contentful Delivery API fetchers and robust local fallback data for modular pages in `src/lib/contentful/fallbacks.ts` and `src/lib/contentful/api.ts`
- [x] <!-- id: 4 --> Build Next.js dynamic route `src/app/[slug]/page.tsx` with static parameter generation (`generateStaticParams`), metadata generation (`generateMetadata`), and ISR support
- [x] <!-- id: 5 --> Update Contentful CMA provisioning script (`scripts/contentful-setup.ts`) to add the `modularPage` content type and seed example modular pages into Contentful
- [x] <!-- id: 6 --> Update Design System showcase with interactive Modular Page Builder block previews and layout documentation
- [x] <!-- id: 7 --> Run automated TypeScript compilation, Next.js build verification, and lint checks

## Verification
- [x] Test dynamic routes (e.g. `/about`, `/sectors`, `/retained-search`, `/difference`, `/contact`) with consistent headers, footers, and modal interactions
- [x] Verify Contentful API fetching and offline fallback rendering
- [x] Run `npm run build` to confirm clean SSR/SSG generation with zero errors

