# Task List: Google Analytics, GTM, and Consent Mode v2 Integration

## Overview
Implement a comprehensive, performant, and UK GDPR-compliant analytics tracking system for MG Headhunting using `@next/third-parties/google`, Google Analytics 4 (GA4) / Google Tag Manager (GTM), Google Consent Mode v2, and custom event telemetry for retained search conversions. Support deployment and verification on the Netlify preview environment (`https://mgheadhunting.netlify.app/`).

## Prerequisites
- [ ] Dependencies: `@next/third-parties` package installed
- [ ] Google Analytics 4 Measurement ID (`NEXT_PUBLIC_GA_ID`, format: `G-XXXXXXXXXX`) or Google Tag Manager Container ID (`NEXT_PUBLIC_GTM_ID`, format: `GTM-XXXXXXX`)
- [ ] Netlify site environment variables configured in Netlify Dashboard for `mgheadhunting.netlify.app`

## Tasks
- [ ] <!-- id: 0 --> Install `@next/third-parties` package to provide optimized Google Analytics / GTM script loading in Next.js 16.
- [ ] <!-- id: 1 --> Update `.env.example` and `.env.local` to include `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_GTM_ID` configuration options.
- [ ] <!-- id: 2 --> Create `src/lib/analytics.ts` utility providing type-safe event tracking helpers (`trackEvent`, `trackConversion`, `trackLead`, `trackDirectContact`, `trackSectorInteraction`).
- [ ] <!-- id: 3 --> Create a lightweight, accessible, and on-brand `CookieConsent` component (`src/components/ui/CookieConsent.tsx`) implementing Google Consent Mode v2 (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`).
- [ ] <!-- id: 4 --> Update `src/app/layout.tsx` to embed the Google Analytics / GTM script loader with Consent Mode v2 default initialization and the `CookieConsent` banner.
- [ ] <!-- id: 5 --> Instrument custom event telemetry in `ContactFooterSection.tsx` to track contact form mandate inquiries, telephone clicks (`tel:`), and email clicks (`mailto:`).
- [ ] <!-- id: 6 --> Instrument CTA click tracking across `HeaderNav.tsx`, `HeroSection.tsx`, `AboutPartnerSection.tsx`, and `SectorMatrixSection.tsx`.
- [ ] <!-- id: 7 --> Instrument insights consumption tracking (article views, scroll milestones, and external social shares) in `src/app/insights/`.

## Verification
- [ ] Run `npm run build` locally to verify type safety, linting, and Next.js static/dynamic build completion.
- [ ] Set `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID` in Netlify Dashboard under Site Configuration > Environment Variables.
- [ ] Trigger a Netlify deploy and verify the preview site (`https://mgheadhunting.netlify.app/`):
  - [ ] Check Google Consent Mode v2 default `denied` state prior to consent banner interaction.
  - [ ] Accept cookies and verify consent state updates to `granted`.
  - [ ] Open GA4 DebugView / Realtime Overview and confirm page views and custom events (`generate_lead`, `contact_direct_click`, `cta_click`) are successfully received.
