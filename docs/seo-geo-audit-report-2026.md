# MG Headhunting — Complete Post-Launch SEO & GEO Audit Report (November 2026)

**Audit Date:** 27 November 2026  
**Live Canonical Property:** `https://mgheadhunting.co.uk` (`sc-domain:mgheadhunting.co.uk`)  
**GA4 Property:** `MG Headhunting Web` (`G-2SW09PVDCF`, Property ID `550403885`)  
**Follow-Up Remediation Plan:** `ai_docs/tasks/022-seo-and-geo-remediation.md`

---

## 1. Executive Summary & Scorecard

| Audit Pillar | Score | Key Diagnosis |
|---|---:|---|
| **Technical SEO & Crawlability** | **36 / 100** | `sitemap.xml` outputs 12x `https://mgheadhunting.com/insights/undefined`; zero `<link rel="canonical">` tags; `mgheadhunting.netlify.app` publicly indexable; `SITE_ENV=production` unset. |
| **Google Indexation & Architecture** | **35 / 100** | Only 12 URLs indexed (`/` + 11 Insights). **0 of 8 core pages** (`/about`, `/sectors`, `/retained-search`, `/difference`, `/contact`, `/faq`, `/insights`, `/privacy`) are indexed; 0 sitemaps submitted in GSC. |
| **On-Page SEO & Content Quality** | **64 / 100** | 6 Insights/Case Studies already rank Page 1 (Pos 4.4–7.7), but suffer 0% CTR from double-suffixed `<title>` tags, missing `<h1>` spaces (`forBuilding`), `/insights/undefined` related links, and `"September 2027"` dates. |
| **GEO & AI Search Readiness** | **48 / 100** | Cited #1 in UK Building Products specialist AI synthesis and already receiving `chatgpt.com` referrals, but poisoned by `mgheadhunting.com` (*Match & Grow* in Mexico/Ecuador) entity collision, 404s in `/llms.txt`, hidden FAQ DOM answers, and conflicting metrics. |
| **GA4 & Conversion Telemetry** | **42 / 100** | Stream set to `https://mgheadhunting.netlify.app` (`MGH Dev`); `0.00` Key Events configured despite `generate_lead` & `contact_direct_click` firing; `analytics_storage` consent signals inactive; Netlify Forms dropping `roleTitle` & `timeframe`. |
| **Off-Page & UK Entity Authority** | **32 / 100** | Only 1 referring domain in GSC (`peopleinglazing.co.uk`, plus mention on `thejoinerynetwork.co.uk`). |
| **Overall Health Score** | **43 / 100** | Strong niche editorial authority held back by fixable technical/domain plumbing. |

---

## 2. Key Telemetry Baseline (GSC + GA4)

### Google Search Console (`sc-domain:mgheadhunting.co.uk`, 25 Sep – 25 Nov 2026)
- **Performance:** `24` clicks · `439` impressions · `5.5%` CTR · `30.0` average position (`20` clicks / `302` impressions in UK).
- **Indexation:** `12` indexed URLs (`/` + 11 Insights), `3` excluded redirects (`http://mgheadhunting.co.uk/`, `http://www.mgheadhunting.co.uk/`, `https://www.mgheadhunting.co.uk/` -> all redirecting to `https://mgheadhunting.co.uk/`).
- **Sitemaps & Enhancements:** `0` submitted sitemaps; `0` Rich Result enhancement reports active.
- **Page-1 Zero-Click Rankings:**
  - `/insights/fenestration-headhunts-delivered` — Pos `4.4` (`25` impr, `1` click)
  - `/insights/Case-Study-Regional-Sales-Manager-Building-Products` — Pos `6.0` (`23` impr, `0` clicks)
  - `/insights/Case-Study-Utility-Head-of-Water` — Pos `6.9` (`10` impr, `0` clicks)
  - `/insights/Case-Study-Operations-Supply-Chain-Director` — Pos `7.0` (`9` impr, `0` clicks)
  - `/insights/Insights-Finance-Director-attributes` — Pos `7.3` (`32` impr, `0` clicks)
  - `/insights/Finance-director-case-study-building-products` — Pos `7.7` (`43` impr, `0` clicks)
- **Top Non-Branded Impression Driver:** `/insights/insights-executive-search-cost-versus-wrong-hire` (`111` impressions on headhunter fee queries at Pos `54.0`), plus `"construction headhunter"` already at Pos `9.3`.

### Google Analytics 4 (`MG Headhunting Web`, `G-2SW09PVDCF`)
- **Full History (Jan 1 – Nov 27, 2026):** `321` sessions · `70` active users · `564` views · `50.47%` engagement rate · `51s` avg engagement time · `0.00` configured Key Events.
- **90-Day Sources (`265` sessions):** `direct` (`195`), `google / organic` (`42`, `1m 07s` avg engagement), `linkedin.com / referral` (`11`, `81.8%` engagement rate), **`chatgpt.com / ai-assistant` (`4` sessions)**, `app.contentful.com` (`4`), `bing / organic` (`3`), `facebook` (`4`), `uk.search.yahoo.com` (`1`), `li.crm.dynamics.com` (`1`).
- **Actual Conversion Events Fired (Unmarked as Key Events):** `generate_lead` (`2`), `contact_direct_click` (`3`), `form_start` (`3`), `cta_click` (`29`), `view_insight_article` (`121`).
- **Anomalies:** `38` `(not set)` landing page sessions; `37` views on `/design-system*`; `21` views on `/sitemap-index.xml` & `/sitemap_index.xml`; `1` live view on `/insights/undefined`.

---

## 3. Master Issue Register (`P0` – `P2`)

1. **`[P0]` Foreign `.com` Domain Split-Brain (`mgheadhunting.com` = *Match & Grow* in Mexico/Ecuador):** `layout.tsx`, `robots.ts`, `sitemap.ts`, `JsonLd.tsx`, `llms.txt`, and `llms-full.txt` all output `https://mgheadhunting.com` instead of `https://mgheadhunting.co.uk`.
2. **`[P0]` Broken `sitemap.xml` (`/insights/undefined` x12) & Unsubmitted Sitemap:** `src/app/sitemap.ts` reads `article.slug` on raw Contentful entries (`article.fields.slug`), outputting 12 duplicate `/insights/undefined` URLs and omitting `/insights` and `/privacy`.
3. **`[P0]` Broken Related Articles (`/insights/undefined`):** `InsightDetailClient.tsx` reads un-flattened `rel.slug` and `rel.title`, rendering empty headings and `/insights/undefined` links on every Insight article.
4. **`[P0]` Staging Duplicate Indexed (`mgheadhunting.netlify.app`) + React Error `#418`:** Publicly accessible with `index, follow` and no canonical.
5. **`[P0]` Production Draft Mode / `force-dynamic` Leak:** Missing `SITE_ENV=production` causes `/`, `/[slug]`, and `/insights/[slug]` to query Contentful Preview API (drafts) and bypass static ISR caching.
6. **`[P0]` Netlify Forms Dropping `roleTitle` & `timeframe`:** `public/netlify-forms.html` omits `<input name="roleTitle" />` and `<input name="timeframe" />` submitted by `InitiateSearchModal.tsx`.
7. **`[P1]` Zero Canonical Tags & Double `<title>` Suffixes:** No route sets `alternates.canonical`; child routes duplicate `| MG Headhunting (MGH)` on top of `layout.tsx` template.
8. **`[P1]` Core Commercial Pages Unindexed Due to `#anchor` Nav:** Homepage nav uses `#specialisms`, `#difference`, `#process` instead of crawlable links to `/sectors`, `/difference`, `/retained-search`, leaving all 8 secondary pages unindexed in Google.
9. **`[P1]` Missing Spaces in Modular `<h1>`s & Exposed Dev Routes:** `PageHeaderBlock.tsx` concatenates `forBuilding`, `forSecuring`, `forBoard`; `/design-system` (linked in footer!), `/storybook/index.html`, and `/netlify-forms.html` return `200` without `noindex`.
10. **`[P1]` GEO `/llms.txt` 404s, Hidden FAQ DOM & Entity Contradictions:** `/llms.txt` links to `/specialisms` and `/process` (404s); `FaqAccordionBlock.tsx` omits collapsed answers #2–#8 from SSR HTML; `PersonSchema` & `BreadcrumbSchema` are unused; emails, phones (`+44 (0) 20 7946 0198`), LinkedIn URLs, warranties (`6` vs `12` months), tenure (`20+`/`22+`/`25+`), and HQ (`West Midlands` vs `London & Home Counties`) conflict across pages.
11. **`[P1]` GA4 Stream, Consent Signals & Key Events Misconfigured:** Stream URL set to `mgheadhunting.netlify.app`; GSC unlinked; `generate_lead` & `contact_direct_click` unmarked as Key Events; `analytics_storage` consent signals inactive.
12. **`[P2]` Contentful Slug & Date Hygiene + `/insights` Legacy Banner:** Fix `%20` space-containing slug, trailing hyphen slug, `"September 2027"` future dates, and remove the legacy *"2026/2027 Salary Benchmark (400+ board appointments)"* banner from `InsightsClient.tsx`.
