# MG Headhunting (MGH) — Executive Search Platform & Design System

A comprehensive, production-ready **Next.js (App Router)** and **Contentful Headless CMS** platform for **MG Headhunting (MGH)** — a boutique executive search firm specializing in retained C-suite, Board, and Director-level placements across the **Building Products & Construction** sectors.

---

## 1. Architecture & Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/) with TypeScript, Server Components, and Incremental Static Regeneration (ISR).
- **Headless CMS**: [Contentful](https://www.contentful.com/) via Content Delivery API (CDA) and Preview API (CPA).
- **Styling**: Tailwind CSS with custom architectural design tokens ([`tokens.json`](./tokens.json)).
- **Rich Text Engine**: `@contentful/rich-text-react-renderer` configured with MGH typography rules.
- **Icons**: Lucide React.

---

## 2. Contentful CMS Model (`hssdcxeme8fc`)

The platform is powered by 6 structured content models:

1. **`author`**: Executive leader profiles (Mark Goldsmith) and research advisory desk.
2. **`sectorSpecialism`**: 6 core practice disciplines (Managing Directors & CEOs, Commercial & Sales, Operations & Supply Chain, Technical & Compliance, Finance & M&A, Sustainability & ESG).
3. **`differencePillar`**: 4 pillars comparing retained executive search rigor against contingent recruitment.
4. **`processStep`**: 5-stage search methodology milestones (Calibration, Mapping, Assessment, Presentation, Integration).
5. **`insightArticle`**: Executive briefings, salary benchmarks, and regulatory insights with key takeaways and rich text body.
6. **`siteSettings`**: Global site configuration, contact desk, and UK GDPR/ICO compliance details.

---

## 3. Brand Palette & Design Tokens

| Token | Hex Value | Role & Architectural Meaning |
| :--- | :--- | :--- |
| **Primary Brand — Deep Navy** | `#163A5F` | Authority, seniority, industrial gravitas. High-emphasis headers and dark sections. |
| **Accent — Medium Teal** | `#138D90` | Subtle directional focus, precision micro-accents, wordmark divider, and primary CTAs. |
| **Structural Neutral — Steel Grey** | `#D0D4D6` | Architectural substrate, 1px hairline borders, blueprint grid guides. |
| **Canvas Off-White** | `#F8FAFB` | Clean white / off-white for optimal contrast and readability. |
| **Surface Muted Wash** | `#F1F4F5` | Light architectural wash (5% tint). |

---

## 4. Key Routes & Pages

- **`/`**: Dynamic Executive Homepage with live Contentful ISR hydration, interactive Sector Practice Matrix, Retained Search Intake Modal, and Executive Briefing previewer.
- **`/insights/[slug]`**: Dedicated Executive Briefing reading pages with dynamic SEO metadata, rich text rendering, strategic takeaways, and partner mandate consultation banner.

---

## 5. Development & Build Commands

```bash
# 1. Install dependencies
npm install

# 2. Test Contentful Delivery API & Preview API connection
npm run contentful:test

# 3. Provision Contentful Schema & Seed Data
npm run contentful:setup

# 4. Start local Next.js development server
npm run dev

# 5. Build optimized production bundle
npm run build

# 6. Start production server
npm run start
```
