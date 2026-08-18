# Task List: Design System Route, Landing Page, and Top Navigation Integration

## Overview
Create a comprehensive, executive-grade Design System portal at `/design-system` featuring a centralized landing hub with dedicated sub-routes (`/design-system/tokens`, `/design-system/components`, `/design-system/brand`), shared navigation headers, and integrate the Design System directly into the main site top navigation.

## Prerequisites
- [x] Next.js App Router routing structure confirmed in `src/app/`
- [x] Existing `TokenExplorer` and `ComponentPlayground` showcase components operational
- [x] Existing `HeaderNav` and fallback `mockSiteSettings` in `src/lib/contentful/api.ts`

## Tasks
- [x] <!-- id: 0 --> Design System Portal Layout & Shared Header: Create a reusable `DesignSystemNav` with breadcrumb navigation, sub-route links (Overview, Tokens, Components, Brand Guidelines), back-to-site link, and active states.
- [x] <!-- id: 1 --> Design System Hub Landing Page (`src/app/design-system/page.tsx`): Build an architectural overview landing page showcasing the brand identity philosophy, core design pillars, live token statistics, visual cards linking to all design system sections, and quick spec downloads.
- [x] <!-- id: 2 --> Dedicated Token Explorer Route (`src/app/design-system/tokens/page.tsx`): Create a dedicated sub-route wrapping `TokenExplorer` with tabbed controls (Colors, Typography, Geometry/Borders, JSON export).
- [x] <!-- id: 3 --> Dedicated Component Kit Route (`src/app/design-system/components/page.tsx`): Create a dedicated sub-route wrapping `ComponentPlayground` with interactive search modal test, live variants, and state inspectors.
- [x] <!-- id: 4 --> Dedicated Brand Guidelines Route (`src/app/design-system/brand/page.tsx`): Create a dedicated page for MGH Brand Guidelines featuring the Wordmark, Monogram, Clear Space rules, Typography pairings, Tone & Voice principles, and Asset specifications.
- [x] <!-- id: 5 --> Top Navigation Integration: Update `HeaderNav.tsx` and `api.ts` fallback settings to include "Design System" in the top navigation, with robust URL handling for cross-route navigation (linking seamlessly between root anchor sections and route pages like `/design-system` and `/insights`).

## Verification
- [x] Verify `/design-system` landing page renders with links and visual cards to all 3 sub-routes (`/tokens`, `/components`, `/brand`)
- [x] Verify `/design-system/tokens`, `/design-system/components`, and `/design-system/brand` load and render correctly
- [x] Verify Top Navigation in `HeaderNav` includes "Design System" and navigates properly
- [x] Run `npm run build` or `npm run lint` / TypeScript check to confirm zero compilation errors
