# Task List: 007 - Interactive Block Storybook & Component Playground

## Overview
Build an interactive, client-side Storybook-like component workbench at `/design-system/blocks` (and integrated into the Design System navigation) that allows designers, clients, and developers to explore, live-edit (via prop controls/knobs), test across responsive viewports, and assemble all 14 modular page-builder block components in real-time.

## Prerequisites
- [x] Composable block React components in `src/components/page-builder/`
- [x] Design System navigation and layout in `src/components/showcase/`
- [x] Type definitions and schemas in `src/lib/contentful/types.ts`

## Tasks
- [x] <!-- id: 0 --> Design and build the Storybook workbench architecture (`src/components/showcase/BlockStorybook.tsx`) featuring a Component Directory sidebar, Viewport Canvas, Live Prop Controls (Knobs), and Schema/Code Exporters
- [x] <!-- id: 1 --> Create preset configurations and default state fixtures for all 14 block components (`blockPageHeader`, `blockMetricsStats`, `blockFaqAccordion`, `blockCtaBanner`, `blockEditorialRichText`, `blockContactDesk`, `blockSectorGrid`, `blockDifferencePillars`, `blockProcessTimeline`, `blockTeamProfile`, `blockInsightsTeaser`, `blockHero`)
- [x] <!-- id: 2 --> Implement live interactive form controls (text fields, selects, toggle pills, and dynamic child item array builders for stats & FAQs) with instant canvas re-rendering
- [x] <!-- id: 3 --> Add Viewport Resizing (Desktop, Tablet 768px, Mobile 375px), Background Grid toggle, and Dark/Light context switching
- [x] <!-- id: 4 --> Add Multi-Block "Live Page Assembler" mode enabling dragging, reordering, and previewing chained blocks as a full simulated page
- [x] <!-- id: 5 --> Implement JSON Payload & React JSX Code Exporter for copying generated configurations directly into Contentful or codebases
- [x] <!-- id: 6 --> Create dedicated route `src/app/design-system/blocks/page.tsx` and update `DesignSystemNav` and `src/app/design-system/page.tsx` with prominent links and badges
- [x] <!-- id: 7 --> Run TypeScript typechecking (`npx tsc --noEmit`) and build verification (`npm run build`)

## Verification
- [x] Verify that all 14 block components render properly in isolated Storybook mode
- [x] Verify that adjusting props/knobs updates the rendered canvas in real time
- [x] Verify that viewport controls resize the preview iframe/container accurately
- [x] Verify that the JSON/JSX exporter outputs valid data
- [x] Verify `npm run build` succeeds with zero errors
