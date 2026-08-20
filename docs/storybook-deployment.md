# Storybook Component Deployment Guide

This guide details how to build, preview, and deploy the **MG Headhunting** Storybook component library.

---

## 1. Local Storybook Development

To start the interactive Storybook development workbench locally:

```bash
npm run storybook
```

This starts Storybook at `http://localhost:6006` with hot module reloading, controls/knobs, and responsive viewport switching.

---

## 2. Generating the Static Storybook Build

To build the static HTML/CSS/JS export for deployment:

```bash
npm run build-storybook
```

This compiles all stories and static assets into `storybook-static/`.

---

## 3. Deployment Options

### Option A: Standalone Netlify Deployment
You can deploy Storybook as its own isolated site on Netlify:
1. Connect your GitHub repository in Netlify.
2. Set **Build command**: `npm run build-storybook`
3. Set **Publish directory**: `storybook-static`

### Option B: Standalone Vercel Deployment
1. Import repository in Vercel.
2. Set **Framework Preset**: `Other`
3. Set **Build command**: `npm run build-storybook`
4. Set **Output Directory**: `storybook-static`

### Option C: Embedded with Next.js Build
To serve Storybook alongside Next.js under `/storybook`, you can copy `storybook-static` into `public/storybook` after building.


---

## 4. Component Directory Map in Storybook

* **Brand Identity**:
  * `Monogram`: Gold, Teal, Navy, and White variants across 4 sizes.
  * `Wordmark`: Complete typography lockups with subtitle and light/dark themes.
* **Core UI**:
  * `Button`: Primary (Teal), Secondary (Navy), Outline, and Ghost buttons.
  * `Badge`: Status dots and variant pills.
  * `InsightCard`: Featured briefing and standard cards with cover images.
  * `DraftModeBar`: Floating live preview control indicator.
  * `CookieConsent`: Google Consent Mode v2 privacy banner.
* **Page Builder Blocks**:
  * `PageHeaderBlock`, `MetricsStatsBlock`, `FaqAccordionBlock`, `CtaBannerBlock`, `EditorialRichTextBlock`, `ContactDeskBlock`, `PageSectionRenderer`.
* **Page Sections**:
  * `HeaderNav`, `HeroSection`, `SectorMatrixSection`, `DifferenceSection`, `SearchProcessSection`, `InsightsSection`, `AboutPartnerSection`, `ContactFooterSection`.
