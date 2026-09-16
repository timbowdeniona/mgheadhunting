# Task List: Client Feedback Refinements & Personalisation

## Overview
Implement the 10 client feedback points across the MG Headhunting web platform: enlarge and refine the brand logo, unify all primary CTAs to "Start the Conversation", incorporate suited (above-the-fold) and seated (bottom contact) photos of Mark Goldsmith, support subtle construction background imagery, add Mark's direct mobile and LinkedIn links to the hero card, remove the sector sub-disciplines strip, update insights filters to "All, Case Studies, Insights", remove the salary report box, remove the redundant homepage Practice Leadership section, and implement a dedicated `/privacy` page with updated footer link.

## Prerequisites
- [x] User approval on implementation plan
- [x] Client photo assets placed in `assets/` and `public/`:
  - Preferred logo styling / SVG line adjustments updated
  - Suited photo of Mark Goldsmith (`mark-goldsmith-suited.jpg` integrated into Hero)
  - Seated photo of Mark Goldsmith (`mark-goldsmith-seated.jpg` integrated into Footer Engagement Banner)
  - Comprehensive UK GDPR & ICO compliant executive search privacy policy established at `/privacy`

## Tasks
- [x] <!-- id: 0 --> Enlarge brand logo in navigation and header, adjust rule divider length, and integrate preferred logo asset
- [x] <!-- id: 1 --> Standardize all primary site CTAs to 'Start the Conversation' across navigation, hero, difference, footer, and fallbacks
- [x] <!-- id: 2 --> Personalise Hero Section: replace right-column placeholder with Mark Goldsmith's suited photo card, mobile number (`07570 740490`), and LinkedIn link (`https://www.linkedin.com/in/markgoldsmith2/`)
- [x] <!-- id: 3 --> Personalise Contact & Footer: integrate Mark Goldsmith's seated photo into the bottom engagement banner alongside direct contact details
- [x] <!-- id: 4 --> Add subtle faded construction/materials background imagery support to key text boxes with low opacity and high text contrast
- [x] <!-- id: 5 --> Remove 'Sector Sub-disciplines Covered' box from Core Practice section (`SectorMatrixSection.tsx`)
- [x] <!-- id: 6 --> Update Insights section filter tabs to 'All, Case Studies, Insights' and adjust filtering logic to handle Case Studies vs Insights
- [x] <!-- id: 7 --> Remove 'Special Research Publication' salary report box from `InsightsSection.tsx`
- [x] <!-- id: 8 --> Remove 'Practice Leadership' (`AboutPartnerSection`) from Homepage flow to prevent repetition, and re-route header 'About' link to `/about`
- [x] <!-- id: 9 --> Create dedicated `/privacy` page with UK GDPR & ICO compliant policy content and update footer link from `#about` to `/privacy`
- [x] <!-- id: 10 --> Update Contentful fallback schemas and mock data to align with new structure
- [x] <!-- id: 11 --> Run typecheck, linting, and build verification
- [x] <!-- id: 12 --> Fix Next.js runtime console warnings for missing loader width on non-Contentful URLs and missing keys on Contentful-provided articles in InsightsSection

## Verification
- [x] TypeScript compile verification (`npx tsc --noEmit`)
- [x] Lint check (`npm run lint` - 0 errors)
- [x] Next.js build verification (`npm run build` - all 27 static/dynamic routes compiled successfully)
- [x] Visual verification of all 10 client feedback adjustments across desktop and mobile
