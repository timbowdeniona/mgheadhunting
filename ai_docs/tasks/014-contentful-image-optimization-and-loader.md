# Task List: Contentful Image Optimisation & Custom Next.js Loader

## Overview
Implement Contentful image optimisation best practices across the application: offload image transformations to Contentful's global CDN via a custom Next.js image loader, set default compression to `q=80`, request next-gen format `fm=webp`, enforce responsive `sizes` attributes, and document editor media upload rules (100MB limit and source resolution guidelines).

## Prerequisites
- [x] Review all components rendering images (`InsightCard`, `RichTextRenderer`, `InsightsClient`, `InsightDetailClient`, Page Builder blocks)
- [x] Verify Contentful Images API query parameter specifications (`w`, `q`, `fm`, `fit`, `f`)

## Tasks

### Phase 1: Custom Contentful Image Loader Utility
- [x] <!-- id: 0 --> Create `src/lib/contentful/imageLoader.ts` implementing Next.js `ImageLoader` for Contentful CDN (`images.ctfassets.net`)
- [x] <!-- id: 1 --> Configure default query parameters: `w={width}`, `q={quality || 80}`, `fm=webp`
- [x] <!-- id: 2 --> Support protocol-relative URLs (`//images.ctfassets.net/...`) and safe pass-through for non-Contentful URLs

### Phase 2: Component Integration
- [x] <!-- id: 3 --> Update `src/components/ui/InsightCard.tsx` with `contentfulImageLoader` and verify responsive `sizes`
- [x] <!-- id: 4 --> Update `src/components/ui/RichTextRenderer.tsx` embedded asset handler with `contentfulImageLoader` and responsive `sizes`
- [x] <!-- id: 5 --> Update `src/app/insights/InsightsClient.tsx` featured hero image with `contentfulImageLoader`
- [x] <!-- id: 6 --> Update `src/app/insights/[slug]/InsightDetailClient.tsx` detail hero image with `contentfulImageLoader`
- [x] <!-- id: 7 --> Audit and update any Page Builder blocks rendering images (e.g. `MediaWrapper`, `TeamProfile`, etc.)

### Phase 3: Documentation & Editor Guidelines
- [x] <!-- id: 8 --> Add Media & Image Optimisation guidelines to `docs/how-to-edit-content-with-live-preview.md` (covering 100MB limit, 5MB–15MB upload recommendation, and CDN caching behavior)

## Verification
- [x] `npx tsc --noEmit` passes with 0 type errors
- [x] `npm run build` succeeds (22/22 static pages generated)
- [x] Verify generated image `src` and `srcset` URLs query Contentful with `w`, `q=80`, and `fm=webp`
