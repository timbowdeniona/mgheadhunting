# Task List: 008 - Contentful Live Preview Side-by-Side Setup

## Overview
Set up Contentful Live Preview and Next.js Draft Mode so editors in the Contentful web app can view real-time changes side by side in the Contentful Entry Editor while editing content across Modular Pages, the Homepage, and Insight Articles.

## Prerequisites
- [x] Contentful Delivery and Preview API Tokens configured in `.env.local` / `client.ts`
- [x] Dynamic Page Builder and Contentful Fetchers in `src/lib/contentful/`
- [x] Modular Page and Homepage Client components

## Tasks
- [x] <!-- id: 0 --> Install `@contentful/live-preview` and set up the Live Preview client provider/hook bridge
- [x] <!-- id: 1 --> Create Next.js App Router Draft Mode route handlers (`src/app/api/draft/route.ts` and `src/app/api/disable-draft/route.ts`) with secure token verification and automatic slug routing
- [x] <!-- id: 2 --> Update Server Component pages (`src/app/page.tsx`, `src/app/[slug]/page.tsx`, `src/app/insights/page.tsx`, `src/app/insights/[slug]/page.tsx`) to check Next.js Draft Mode status and query Contentful with the Preview Client
- [x] <!-- id: 3 --> Integrate `useContentfulLiveUpdates` and Live Preview subscriptions into client components (`ModularPageClient`, `HomepageClient`, `InsightsClient`, and `PageSectionRenderer`) so edits in the side-by-side pane update reactively in real time
- [x] <!-- id: 4 --> Add Inspector Mode tagging data-attributes (`data-ctfl-entry-id`, `data-ctfl-field-id`) across modular section blocks for click-to-edit highlighting
- [x] <!-- id: 5 --> Create a floating `DraftModeBar` banner that shows when Draft Mode is active with an "Exit Preview" button
- [x] <!-- id: 6 --> Create complete Contentful configuration documentation (`docs/contentful-live-preview-setup.md`) with exact URL templates for Content Preview in the Contentful web app
- [x] <!-- id: 7 --> Run TypeScript typechecking (`npx tsc --noEmit`) and build verification (`npm run build`)

## Verification
- [x] Verify `/api/draft?secret=...&slug=...` enables draft mode and loads unpublished draft content
- [x] Verify `/api/disable-draft` disables draft mode and returns to published delivery mode
- [x] Verify client components subscribe to Contentful live updates when rendered within an iframe/preview
- [x] Verify `npm run build` succeeds without type or build errors

