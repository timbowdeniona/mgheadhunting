# Task List: Clean and Streamline Navigation Header

## Overview
Refactor the top navigation header on branch `feature/clean-nav-header` to eliminate visual clutter, optimize information hierarchy, and align with the MGH executive search design system.

## Prerequisites
- [x] Switched to new git branch `feature/clean-nav-header`
- [x] Confirmed typography, color tokens, and spacing scales from MGH Brand Guidelines

## Tasks
- [x] <!-- id: 0 --> Streamline Nav Item Architecture: Refactor `defaultNavLinks` and Contentful fallback settings from 7 dense items down to 5 focused, high-impact executive navigation links (`Specialisms`, `The Difference`, `Search Process`, `Market Intelligence`, `About`), removing duplicate "Contact" (already handled by direct email and CTA) and moving "Design System" to the footer utility bar.
- [x] <!-- id: 1 --> Modernize Desktop Header Layout & Spacing: Refine `HeaderNav.tsx` container padding, responsive breakpoints (`md`, `lg`, `xl`), typography tracking, active state indicator styling, and direct partner email micro-interaction.
- [x] <!-- id: 2 --> Footer Utility Link Integration: Update `ContactFooterSection.tsx` to include a discreet "Design System" link in the footer utility links for developer and review access without cluttering the primary header.
- [x] <!-- id: 3 --> Polish Responsive Mobile Drawer: Enhance the mobile slide-out menu with cleaner typography, subtle dividing rules, direct partner contact drawer, and prominent mandate search action.

## Verification
- [x] Verify header renders cleanly on desktop with balanced whitespace and zero visual overlap across standard viewport widths (1024px, 1280px, 1440px)
- [x] Verify responsive mobile menu drawer opens, displays streamlined links, and closes properly on navigation
- [x] Verify `/design-system` is accessible via footer utility link and all sub-routes work
- [x] Verify TypeScript and Next.js build passes with zero errors (`npm run build`)
