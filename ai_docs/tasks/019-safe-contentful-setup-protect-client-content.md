# Task List: Safe Contentful Setup & Client Content Protection

## Overview
Make `scripts/contentful-setup.ts` non-destructive to ensure running `npm run contentful:setup` never overwrites or resets client-edited content in Contentful, remove cascade deletion from `ensureContentType`, and add a dedicated `--schema-only` mode.

## Prerequisites
- [x] User approval on non-destructive setup plan and schema-only mode

## Tasks
- [x] <!-- id: 0 --> Add CLI flags (`--schema-only`, `--force-seed`) to `scripts/contentful-setup.ts`
- [x] <!-- id: 1 --> Update `seedEntry` to skip overwriting existing entries unless `--force-seed` is explicitly provided
- [x] <!-- id: 2 --> Update `ensureAsset` to preserve existing assets without overwriting
- [x] <!-- id: 3 --> Remove destructive cascade deletion loops from `ensureContentType`
- [x] <!-- id: 4 --> Support `--schema-only` flag to bypass all asset/entry seeding and only provision models & editor interfaces
- [x] <!-- id: 5 --> Add `contentful:setup:schema` script to `package.json`
- [x] <!-- id: 6 --> Run build, typecheck, and lint verification

## Verification
- [x] TypeScript compile verification (`npx tsc --noEmit`)
- [x] Lint check (`npm run lint`)
- [x] Next.js build verification (`npm run build`)
