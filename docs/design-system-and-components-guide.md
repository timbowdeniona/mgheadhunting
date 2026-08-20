# Design System & Component Architecture Guide: Next.js & Contentful

This guide explains the architecture of the **MG Headhunting (MGH)** Design System, detailing how **Design Tokens**, **React Components in Next.js**, and **Content Models in Contentful** connect in a unified 1-to-1 system.

---

## 1. High-Level Architecture (The 3-Layer Pipeline)

The system is built as a 3-layer pipeline ensuring brand consistency, developer velocity, and non-technical editorial freedom:

```mermaid
graph TD
    subgraph Layer1 [Layer 1: Visual Design Tokens]
        Tokens[tokens.json & Tailwind Theme]
        Colors[Navy #0F243A | Teal #138D90 | Steel #D0D4D6]
        Typography[Display: Syne / Sans: Inter / Serif: Playfair]
    end

    subgraph Layer2 [Layer 2: React Component Hierarchy in Next.js]
        UIAtoms[UI Atoms: Button, Badge, Divider, Modal]
        BlockRenderers[Block Components: Header, Stats, FAQ, CTA, RichText]
        PageRenderer[PageSectionRenderer & ModularPageClient]
    end

    subgraph Layer3 [Layer 3: Contentful Headless CMS]
        ContentModels[Content Models: modularPage, block...]
        EditorForm[Entry Editor Form Fields]
        LivePreviewSDK[@contentful/live-preview Hook]
    end

    Layer1 --> Layer2
    Layer3 --> Layer2
    Layer3 -.->|Live Delta window.postMessage| Layer2
```

---

## 2. Layer 1: The Design Token Foundation

Rather than hardcoding colors, fonts, or margins in multiple places, every visual rule originates from centralized **Design Tokens** defined in `tokens.json` and mirrored in `tailwind.config.ts`.

### A. The Core Color Palette
* **Deep Architectural Navy (`#07111D` to `#0F243A`)**:
  * Represents boardroom gravitas, confidential advisory, and authority.
  * Used for major hero sections, footer hubs, and primary text.
* **Medium Architectural Teal (`#0D5F61` to `#138D90`)**:
  * Represents engineering precision, action triggers, and active states.
  * Used for CTA buttons, status indicators, active pills, and divider accents.
* **Concrete & Structural Slate (`#D0D4D6` to `#F8FAFB`)**:
  * Represents structural materials, blueprint grid lines, and light canvas backdrops.
  * Used for hairline card borders (`border-steel-300`) and editorial backgrounds.

### B. Typography Roles
* **Display / Headings (`font-display` $\rightarrow$ Syne / Heavy Gothic)**: High-impact uppercase titles, section labels, and key statistics.
* **Body / UI (`font-sans` $\rightarrow$ Inter)**: High-legibility sans-serif for descriptions, metadata, and form inputs.
* **Editorial / Quotes (`font-serif` $\rightarrow$ Playfair / Cormorant)**: Refined serif for lead paragraphs and quotes from Managing Partner Mark Goldsmith.

---

## 3. Layer 2 & 3: 1-to-1 Mapping Between Contentful & Next.js

Every section on a page is a standalone component. Contentful editors compose pages by stacking these block components like building blocks.

### The 1-to-1 Component Mapping Matrix:

| Contentful Content Type (`sys.id`) | Next.js Component File | Visual Elements & Editorial Controls |
| :--- | :--- | :--- |
| **`blockPageHeader`** | `src/components/page-builder/PageHeaderBlock.tsx` | Technical coordinate, overline pill, headline with highlighted teal phrase, breadcrumbs, and subtitle. |
| **`blockMetricsStats`** | `src/components/page-builder/MetricsStatsBlock.tsx` | 3 or 4-column performance cards (`value`, `label`, and `tag` badge pills) with animated hover states. |
| **`blockEditorialRichText`** | `src/components/page-builder/EditorialRichTextBlock.tsx` | Layout selector (`sidebar`, `two-column`, `single`), lead paragraph, rich text body, pull-quote callout, and boardroom key takeaways checklist. |
| **`blockFaqAccordion`** | `src/components/page-builder/FaqAccordionBlock.tsx` | Collapsible accordion categorized by topic (Confidentiality, Fees, Timelines) with smooth animations. |
| **`blockCtaBanner`** | `src/components/page-builder/CtaBannerBlock.tsx` | High-contrast conversion section with background variant selector (`navy`, `blueprint`, `light`), primary CTA button, secondary link, and NDA guarantee badge. |
| **`blockContactDesk`** | `src/components/page-builder/ContactDeskBlock.tsx` | Direct partner hotline, direct partner email, headquarters address card, and confidential mandate intake modal trigger. |
| **`blockSectorGrid`** | `src/components/sections/SectorMatrixSection.tsx` | Interactive practice matrix displaying executive, commercial, and technical sub-disciplines with modal drawers. |
| **`blockDifferencePillars`** | `src/components/sections/DifferenceSection.tsx` | Retained advantage vs. contingent recruitment flaws comparison cards. |
| **`blockProcessTimeline`** | `src/components/sections/SearchProcessSection.tsx` | 5-stage milestone-driven search blueprint timeline. |
| **`blockTeamProfile`** | `src/components/sections/AboutPartnerSection.tsx` | Architectural dossier card for Managing Partner Mark Goldsmith with tenure metrics and bio. |
| **`blockInsightsTeaser`** | `src/components/sections/InsightsSection.tsx` | Market intelligence cards, salary benchmark download banner, and category filters. |

---

## 4. How the Dynamic Page Builder Works in Next.js

When a user visits any modular page (e.g. `https://mgheadhunting.netlify.app/about`):

```tsx
// 1. Next.js Server Component (src/app/[slug]/page.tsx)
const pageData = await getModularPage(slug, { preview: isDraftMode });

// 2. Client Component with Contentful Live Updates
export function ModularPageClient({ initialData }) {
  // Live listener updates state as Contentful editor types
  const data = useContentfulLiveUpdates(initialData);

  return (
    <main>
      {data.sections.map((section, idx) => (
        // 3. Dynamic Section Dispatcher
        <PageSectionRenderer key={idx} section={section} />
      ))}
    </main>
  );
}
```

### The `PageSectionRenderer` Dispatcher
`PageSectionRenderer.tsx` acts as the central traffic controller. It inspects `section.type` or `section.sys.contentType.sys.id` and renders the exact React component with full TypeScript type safety.

---

## 5. How Contentful Editors Assemble Pages

Non-technical team members assemble pages in three simple steps:

1. **Create Page Entry**: In Contentful, create a `Modular Webpage` entry and assign a title and URL slug (e.g. `slug: sectors/hvac-systems`).
2. **Stack Blocks**: Under the **Sections** reference field, add and reorder blocks (e.g., `Page Header` $\rightarrow$ `Metrics & Stats` $\rightarrow$ `Editorial Rich Text` $\rightarrow$ `FAQ Accordion` $\rightarrow$ `CTA Banner`).
3. **Reorder via Drag-and-Drop**: Drag blocks up or down to instantly rearrange the page layout in the side-by-side Live Preview.

---

## 6. How Developers Test & Maintain the Design System

1. **Interactive Web Workbench (`/design-system/blocks`)**:
   * Visit `https://mgheadhunting.netlify.app/design-system/blocks` in any browser.
   * Test live component props (knobs), switch viewports (Mobile / Tablet / Desktop), chain multi-block layouts, and export Contentful-ready JSON schemas.
2. **Storybook 8 Component Suite (`npm run storybook`)**:
   * Isolated development environment testing every atomic component and block with automated accessibility checks (`@storybook/addon-a11y`).
3. **Strict TypeScript Types (`src/lib/contentful/types.ts`)**:
   * Prevents runtime bugs by ensuring Contentful field names match Next.js React props exactly at build time.
