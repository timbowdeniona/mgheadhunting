# Task List: 001 - Contentful CMS Content Model, Migration & Next.js Architecture

## Overview
Design, build, and deploy the Contentful CMS content model, content types, CMA automated provisioning script, client SDK service layer, Next.js App Router architecture, and React component integration for MG Headhunting (MGH) using space `hssdcxeme8fc`.

## Prerequisites
- [x] Contentful space credentials verified (`hssdcxeme8fc`, CDA, CPA verified with live responses)
- [x] Install `next`, `contentful`, `contentful-management`, `@contentful/rich-text-react-renderer`, `@contentful/rich-text-types`, `tsx`

## Tasks
- [x] <!-- id: 0 --> Set up environment variables (`.env.local`, `.env.example`) with Contentful space and API keys
- [x] <!-- id: 1 --> Create TypeScript data schemas and interfaces in `src/lib/contentful/types.ts`
- [x] <!-- id: 2 --> Develop the automated Contentful Management API (CMA) provisioning and seeding script in `scripts/contentful-setup.ts` and schema export in `scripts/contentful-schema-export.json`
- [x] <!-- id: 3 --> Implement Contentful Delivery API client and fetcher utilities in `src/lib/contentful/client.ts` and `src/lib/contentful/api.ts` with local fallback support
- [x] <!-- id: 4 --> Build bespoke MGH Design System Rich Text Renderer component in `src/components/ui/RichTextRenderer.tsx`
- [x] <!-- id: 5 --> Build Next.js App Router architecture (`src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `next.config.mjs`)
- [x] <!-- id: 6 --> Refactor and connect Homepage Section components to consume live Contentful data (Hero, Sector Matrix, Difference, Search Process, Insights, About Partner, Contact Footer)
- [x] <!-- id: 7 --> Add executive briefing reader modal (`src/components/ui/ArticleModal.tsx`) and dynamic Next.js route (`src/app/insights/[slug]/page.tsx`)
- [x] <!-- id: 8 --> Run automated verification, type checking, and production build

## Verification
- [x] Test Contentful Delivery API & Preview API connection (`npm run contentful:test`)
- [x] Test schema export and provisioning script (`npm run contentful:setup`)
- [x] Run `npm run build` to confirm zero TypeScript and linting errors (Prerendered 7 routes cleanly)
