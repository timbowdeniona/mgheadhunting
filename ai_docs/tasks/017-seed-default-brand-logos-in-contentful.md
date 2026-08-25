# Task List: Seed Default Brand Logos & Media Assets in Contentful

## Overview
Generate standalone SVG brand logo assets (Main Wordmark Light, Main Wordmark Dark, and Mini Monogram) and seed them as official `Asset` and `mediaAsset` wrapper entries in Contentful CMS linked to `global-site-settings`. This allows the client to immediately see and understand the brand assets in Contentful's "Brand & Visual Identity" tab, and replace or edit them with ease.

## Prerequisites
- [x] Contentful management API access / `scripts/contentful-setup.ts` available.
- [x] `mediaAsset` content type and `siteSettings` logo fields (`mainLogo`, `mainLogoDark`, `miniLogo`) in place.

## Tasks
- [x] <!-- id: 0 --> **Generate Standalone SVG Logo Files**: Create clean, high-resolution vector SVG files in `public/`:
  - `public/mgh-wordmark-light.svg` (Dark Navy lettering `#0F243A` + Teal rule `#138D90` + Subtitle for light backgrounds)
  - `public/mgh-wordmark-dark.svg` (Pure White lettering `#FFFFFF` + Teal rule `#138D90` + Subtitle for dark navy backgrounds)
  - `public/mgh-monogram.svg` (High-definition geometric MGH monogram badge with teal accent)
- [x] <!-- id: 1 --> **Update Asset Provisioning in Setup Script**: Extend `ensureAsset` in `scripts/contentful-setup.ts` to support `image/svg+xml` and local file uploads via Contentful upload API (`client.upload.create`).
- [x] <!-- id: 2 --> **Seed Logo Assets in Contentful**: Provision Contentful assets for:
  - `asset-logo-wordmark-light` ("MG Headhunting - Wordmark Logo (Light Backgrounds)")
  - `asset-logo-wordmark-dark` ("MG Headhunting - Wordmark Logo (Dark Backgrounds / Footer)")
  - `asset-logo-monogram` ("MG Headhunting - Mini Monogram / Favicon")
- [x] <!-- id: 3 --> **Create `mediaAsset` Wrapper Entries**: Seed `mediaAsset` entries for each logo with descriptive alt text and captions:
  - `media-logo-wordmark-light`
  - `media-logo-wordmark-dark`
  - `media-logo-monogram`
- [x] <!-- id: 4 --> **Link Logos to `global-site-settings`**: Update `siteSettings` entry seeding in `contentful-setup.ts` to attach `mainLogo`, `mainLogoDark`, and `miniLogo` links.
- [x] <!-- id: 5 --> **Run Contentful Provisioning**: Executed `npm run contentful:setup` to upload the assets, create wrappers, and update `global-site-settings` in Contentful space `hssdcxeme8fc`.

## Verification
- [x] Verify `npm run contentful:setup` executes cleanly with exit code 0.
- [x] Check Contentful CMS web UI under `Content → Site Settings & Config → Brand & Visual Identity` to confirm all 3 logo cards are populated.
- [x] Verify `npm run build` succeeds and renders the CMS logos in the Header, Footer, and Insights views.
