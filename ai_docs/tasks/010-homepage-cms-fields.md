# Task List: Homepage CMS Fields

## Overview
Migrating the homepage from hardcoded fallbacks to be fully content managed via Contentful, replacing hardcoded fallback data with dynamic content types.

## Prerequisites
- [ ] Ensure Next.js and Contentful integrations are functional

## Tasks
- [x] <!-- id: 0 --> Update `src/lib/contentful/types.ts` to include `HomepageEntryFields`
- [x] <!-- id: 1 --> Update `src/lib/contentful/api.ts` to fetch the `homepage` entry and map its fields
- [x] <!-- id: 2 --> Verify application builds without type errors

## Verification
- [x] Verify that homepage layout still compiles successfully with the new data types
