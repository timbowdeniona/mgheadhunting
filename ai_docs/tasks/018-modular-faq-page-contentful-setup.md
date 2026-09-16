# Task List: Modular FAQ Page & Contentful Setup

## Overview
Generate a modular FAQ page from Mark Goldsmith's retained executive search Q&A copy, seed all corresponding entries and blocks into `scripts/contentful-setup.ts`, and provide static fallbacks in `src/lib/contentful/fallbacks.ts` so that `/faq` is immediately functional and editable via Contentful CMS.

## Prerequisites
- [x] Existing modular page architecture (`modularPage`, `blockPageHeader`, `blockMetricsStats`, `blockFaqAccordion`, `blockFaqItem`, `blockCtaBanner`)
- [x] User approval on content categorization, block structure, and navigation integration

## Tasks
- [x] <!-- id: 0 --> Structure FAQ Q&A copy into 8 categorized `blockFaqItem` entries with clean paragraph formatting
- [x] <!-- id: 1 --> Construct modular blocks: `blockPageHeader` (hero banner), `blockMetricsStats` (key metrics from text: 22+ years, 300+ placements, max 3 assignments, 6-month warranty), `blockFaqAccordion` (all 8 items), and `blockCtaBanner` (Mark's direct phone number and quote)
- [x] <!-- id: 2 --> Assemble `modularPage` entry (`page-faq` with slug `faq`)
- [x] <!-- id: 3 --> Update `scripts/contentful-setup.ts` to provision and seed all FAQ items, blocks, and the modular page entry
- [x] <!-- id: 4 --> Add `faq` fallback entry to `fallbackModularPages` and update `navLinks` in `src/lib/contentful/fallbacks.ts`
- [x] <!-- id: 5 --> Run build, typecheck, and lint verification

## Verification
- [x] TypeScript compile / build verification (`npm run build`)
- [x] Lint check (`npm run lint`)
- [x] Confirm `/faq` route resolves properly via dynamic slug handler
