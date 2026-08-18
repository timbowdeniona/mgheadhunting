# Task List: 006 - Drag-and-Drop Contentful Block Containers & Visual Page Builder

## Overview
Transform the `modularPage` Contentful content model from a raw JSON Object field into a native Contentful Drag-and-Drop container (an Array of Reference Entries: `Link -> Entry`). Provision dedicated Contentful Content Types for each design system block (`blockPageHeader`, `blockMetricsStats`, `blockMetricItem`, `blockFaqAccordion`, `blockFaqItem`, `blockCtaBanner`, `blockEditorialRichText`, `blockContactDesk`, `blockSectorGrid`, `blockDifferencePillars`, `blockProcessTimeline`, `blockTeamProfile`, `blockInsightsTeaser`, `blockHero`), update the Contentful CMA setup script to create these content types and seed linked entries, and update the Next.js Contentful Delivery API parsing layer to normalize linked entries into `PageSectionBlock` types.

## Prerequisites
- [x] Contentful SDK and CMA script architecture ready (`scripts/contentful-setup.ts`)
- [x] Composable block React components and dispatcher in `src/components/page-builder/`
- [x] Fallback data layer in `src/lib/contentful/fallbacks.ts`

## Tasks
- [x] <!-- id: 0 --> Design and document individual Contentful Content Type schemas for each block type (`blockPageHeader`, `blockMetricsStats` + `blockMetricItem`, `blockFaqAccordion` + `blockFaqItem`, `blockCtaBanner`, `blockEditorialRichText`, `blockContactDesk`, `blockSectorGrid`, `blockDifferencePillars`, `blockProcessTimeline`, `blockTeamProfile`, `blockInsightsTeaser`, `blockHero`)
- [x] <!-- id: 1 --> Update `scripts/contentful-setup.ts` to provision all block content types with friendly field names, help text, dropdowns, and link validations
- [x] <!-- id: 2 --> Update `modularPage` content type in `scripts/contentful-setup.ts` to replace the JSON `sections` field with an Array of References (`Link -> Entry`) restricted to the block content types, enabling native Contentful drag-and-drop UI
- [x] <!-- id: 3 --> Update `scripts/contentful-setup.ts` entry seeding logic to create separate block entries and link them into the 5 core modular pages (`about`, `sectors`, `retained-search`, `difference`, `contact`)
- [x] <!-- id: 4 --> Update Contentful API delivery parser (`src/lib/contentful/api.ts`) to resolve and map both linked Contentful Entry objects (`sys.contentType.sys.id === 'blockPageHeader'`, etc.) and legacy/fallback objects into strongly-typed `PageSectionBlock` structures
- [x] <!-- id: 5 --> Update `src/lib/contentful/types.ts` with Contentful Entry interface mappings if needed
- [x] <!-- id: 6 --> Run TypeScript typechecking (`npx tsc --noEmit`) and Next.js build verification (`npm run build`)

## Verification
- [x] Verify that Contentful CMA setup script provisions all block models cleanly
- [x] Verify that the Next.js delivery API correctly resolves nested reference blocks with `include: 4`
- [x] Verify that `npm run build` succeeds with zero errors

