# Task List: Contentful Site Settings Brand Logos & Media Integration

## Overview
Enable the client to upload, edit, and replace the Main Logo (light/dark) and Mini/Monogram Logo directly in Contentful CMS under the `siteSettings` content type as `mediaAsset` references. Update the frontend components (`HeaderNav`, `ContactFooterSection`, `Wordmark`, `Monogram`, and `BrandGuidelines`) to dynamically render CMS-managed logos with seamless fallback to existing vector components.

## Prerequisites
- [x] Contentful management credentials / `contentful-setup.ts` script available.
- [x] `mediaAsset` content type already established in Contentful space.

## Tasks
- [x] <!-- id: 0 --> **Update Contentful Setup & Content Model**: Update `scripts/contentful-setup.ts` to add `mainLogo`, `mainLogoDark`, and `miniLogo` fields (linking to `mediaAsset`) to the `siteSettings` content type and add a dedicated "Brand & Visual Identity" fieldset group in the Contentful editor interface.
- [x] <!-- id: 1 --> **TypeScript Type Definitions**: Update `SiteSettingsFields` in `src/lib/contentful/types.ts` to include `mainLogo`, `mainLogoDark`, and `miniLogo` (`MediaAssetFields` or `ContentfulAsset`).
- [x] <!-- id: 2 --> **Contentful API Fetching & Normalization**: Update `src/lib/contentful/api.ts` to ensure `siteSettings` query includes linked media assets (`include: 2`) and resolves image URLs and alt texts with `getMediaAssetUrl` and `getMediaAssetAlt` helpers.
- [x] <!-- id: 3 --> **Dynamic Brand Components (`Wordmark` & `Monogram`)**:
  - Update `Wordmark.tsx` to accept optional `customLogoUrl` and `customLogoAlt` while maintaining responsive sizing and fallback.
  - Update `Monogram.tsx` to accept optional `customLogoUrl` and `customLogoAlt`.
  - Add `CustomImageLogo` and `CustomImageMonogram` Storybook stories.
- [x] <!-- id: 4 --> **Header & Footer Integration**:
  - Update `src/components/sections/HeaderNav.tsx` to pass `mainLogo` (desktop) and `miniLogo` (mobile).
  - Update `src/components/sections/ContactFooterSection.tsx` to pass `mainLogoDark` (or `mainLogo`).
  - Update `HomepageClient.tsx`, `ModularPageClient.tsx`, and `InsightsClient.tsx` to forward CMS logo properties.
- [x] <!-- id: 5 --> **Brand Guidelines & Design System UX**:
  - Update `src/components/showcase/BrandGuidelines.tsx` with a prominent informational banner explaining how to edit/replace logos in Contentful CMS.
- [x] <!-- id: 6 --> **Contentful Seed & Migration**: Updated setup script and verified TypeScript and build pipelines.

## Verification
- [x] Verify `npx tsc --noEmit` succeeds with 0 errors.
- [x] Verify `npm run build` succeeds (24 static & SSG routes rendered).
- [x] Verify HeaderNav, Footer, and Insights components render custom uploaded logo when provided in Contentful, or default SVG when empty.
- [x] Verify `/design-system/brand` provides clear editorial guidance and link to Contentful CMS.
