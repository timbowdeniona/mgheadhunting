# Task List: Client Feedback Pre-Launch Refinements & Go-Live Preparation

## Overview
Implement the final client adjustments prior to launch: remove the dead 'About Mark Goldsmith' link from the header banner navigation (in code fallbacks, component filtering, and Contentful configuration), update the CTA modal to 'Initiate Confidential Conversation' (deleting the 'Sector Specialism Focus' dropdown and retitling/updating 'Target Level / Role' to 'Function Required' with specified options), update the footer box heading to 'Assignment Disclosure Protocol', and provide complete go-live deployment documentation.

## Prerequisites
- [x] User approval on implementation plan
- [x] Working tree clean and ready for changes

## Tasks
- [x] <!-- id: 0 --> Remove 'About Mark Goldsmith' / 'About' link from header navigation: update `HeaderNav.tsx` (default links and dynamic filter to omit 'About' links), update `src/lib/contentful/fallbacks.ts`, and update `scripts/contentful-setup.ts`
- [x] <!-- id: 1 --> Refactor `InitiateSearchModal.tsx`:
  - Change modal title from 'Initiate Retained Search' to 'Initiate Confidential Conversation'
  - Remove the 'Sector Specialism Focus' dropdown and simplify form layout
  - Retitle 'Target Level / Role' to 'Function Required'
  - Update dropdown options strictly to: `C-Suite / MD`, `Sales / Commercial`, `Finance`, `Operations / Technical`, `HR`, `Other`
  - Update confirmation screen and submission payload to reflect 'Function Required'
- [x] <!-- id: 2 --> Update disclosure protocol title from 'Modular Placement Disclosure Protocol' to 'Assignment Disclosure Protocol' in `src/lib/contentful/fallbacks.ts` (and normalize in `src/lib/contentful/api.ts` if Contentful supplies old string)
- [x] <!-- id: 3 --> Create targeted non-destructive Contentful update script (`scripts/patch-client-feedback.ts`) that only patches `navLinks` and `ndaTitle` without wiping or resetting client changes
- [x] <!-- id: 4 --> Compile comprehensive Go-Live Guide (`docs/go-live-guide.md`) documenting Netlify custom domain configuration (`mgheadhunting.co.uk`), DNS setup, production environment variables, SSL provisioning, Contentful publishing checklist, and post-launch verification
- [x] <!-- id: 5 --> Run type checking (`tsc --noEmit`), linter check, and production build (`npm run build`) to ensure zero errors or regressions

## Verification
- [x] Navigation bar verified on desktop and mobile: no 'About Mark Goldsmith' or broken link appears
- [x] All site CTAs ('Start the Conversation') open the updated modal with new title 'Initiate Confidential Conversation'
- [x] Modal contains 'Function Required' dropdown with exact 6 specified options and no 'Sector Specialism Focus' dropdown
- [x] Modal submission and confirmation screen display 'Function Required'
- [x] Footer disclosure box renders 'Assignment Disclosure Protocol'
- [x] Production build succeeds cleanly (`npm run build` - 33 routes generated)
- [x] Go-live step-by-step instructions compiled and ready for client in `docs/go-live-guide.md`
