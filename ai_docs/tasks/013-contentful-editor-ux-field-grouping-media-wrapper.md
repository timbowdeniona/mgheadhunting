# Task List: Contentful Editor UX — Field Grouping & Media Wrapper

## Overview
Improve the Contentful editing experience by logically grouping fields into collapsible fieldsets and introducing a `mediaAsset` wrapper content type for images with required alt text.

## Prerequisites
- [x] Review existing content types and fields
- [x] Research Contentful Editor Interface API (editorLayout/groupControls)

## Tasks

### Phase 1: Content Type Changes
- [x] <!-- id: 0 --> Add `mediaAsset` content type to `contentful-setup.ts`
- [x] <!-- id: 1 --> Update `insightArticle` `coverImage` field from Link→Asset to Link→Entry(mediaAsset)
- [x] <!-- id: 2 --> Create `mediaAsset` wrapper entries for the 4 existing cover image assets in seed data
- [x] <!-- id: 3 --> Update article seed data to link to wrapper entries instead of raw assets

### Phase 2: Editor Interface Field Grouping
- [x] <!-- id: 4 --> Add entity-based client setup for editor interface API
- [x] <!-- id: 5 --> Add `configureEditorInterfaces()` function with grouping for `homepage`
- [x] <!-- id: 6 --> Add grouping for `insightArticle`
- [x] <!-- id: 7 --> Add grouping for `blockCtaBanner`
- [x] <!-- id: 8 --> Add grouping for `blockTeamProfile`
- [x] <!-- id: 9 --> Add grouping for `blockEditorialRichText`
- [x] <!-- id: 10 --> Add grouping for `siteSettings`
- [x] <!-- id: 11 --> Add grouping for `modularPage`
- [x] <!-- id: 12 --> Wire `configureEditorInterfaces()` into the main `runSetup()` flow

### Phase 3: Frontend Updates
- [x] <!-- id: 13 --> Add `MediaAssetFields` type to `types.ts`
- [x] <!-- id: 14 --> Update `InsightArticleFields` to support mediaAsset wrapper
- [x] <!-- id: 15 --> Update `api.ts` with normalisation logic for mediaAsset unwrapping
- [x] <!-- id: 16 --> Update `fallbacks.ts` cover images with altText
- [x] <!-- id: 17 --> Update `InsightCard.tsx` to accept and render `coverImageAlt`
- [x] <!-- id: 18 --> Update `InsightsClient.tsx` to pass alt text
- [x] <!-- id: 19 --> Update `InsightDetailClient.tsx` to use alt text
- [x] <!-- id: 20 --> Update `InsightsSection.tsx` to pass alt text

## Verification
- [x] `npx tsc --noEmit` passes with 0 errors
- [x] `npm run build` succeeds (22 static routes rendered)
