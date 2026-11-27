# Task List: Complete SEO & Generative Engine Optimization (GEO) Site Review

## Overview
Conduct an end-to-end post-launch **Traditional SEO** and **Generative Engine Optimization (GEO)** audit of the live MG Headhunting platform, combining live **Google Search Console (GSC)** and **Google Analytics 4 (GA4)** telemetry with technical crawl verification, Core Web Vitals profiling, Contentful CMS metadata/content inspection, Knowledge Graph (`JSON-LD` & `llms.txt`) validation, and live AI Search Engine benchmark testing. Deliver a scored, evidence-backed **SEO & GEO Audit Report** and a prioritised remediation task list (`P0`–`P3`) before executing any code or CMS changes.

## Prerequisites
- [x] Confirm primary live canonical domain (`https://mgheadhunting.co.uk` — verified live 301 from `www.mgheadhunting.co.uk`; `.com` is not owned).
- [x] Establish read-only access to **Google Search Console (GSC)** and **Google Analytics 4 (GA4)** via authenticated built-in browser session.
- [x] User approval of this review plan prior to executing live crawls and AI benchmark queries.

## Tasks
- [x] <!-- id: 0 --> **Domain, Canonical & Indexation Architecture Audit**: Inspected live HTTP responses, redirects (`www.mgheadhunting.co.uk` -> `mgheadhunting.co.uk`, `mgheadhunting.netlify.app` duplicate), `robots.txt`, missing `<link rel="canonical">` tags, and exposed public routes (`/design-system`, `/storybook/index.html`, `/netlify-forms.html`).
- [x] <!-- id: 1 --> **Google Search Console (GSC) Performance & Coverage Analysis**: Extracted full telemetry from `sc-domain:mgheadhunting.co.uk` (24 clicks, 439 impressions, 12 indexed URLs, 0 core pages indexed, 0 submitted sitemaps, 6 Page-1 zero-click Insights/Case Studies).
- [x] <!-- id: 2 --> **Google Analytics 4 (GA4) Traffic, Consent Mode & Conversion Funnel Audit**: Audited `MG Headhunting Web` (`G-2SW09PVDCF`) across 90-day and full 2026 history (321 sessions, 4 `chatgpt.com / ai-assistant` sessions, `MGH Dev` Netlify stream config, `0.00` configured Key Events despite `generate_lead` & `contact_direct_click` firing, inactive `analytics_storage` consent signals).
- [x] <!-- id: 3 --> **Sitemap, Metadata & SERP Snippet Audit (Code + Live Contentful Entries)**: Confirmed live `sitemap.xml` outputs 12x `https://mgheadhunting.com/insights/undefined`, audited double `<title>` suffixes, missing OG default image, `"September 2027"` dates, and malformed Contentful slugs.
- [x] <!-- id: 4 --> **Semantic HTML, SSR Visibility & Core Web Vitals Audit**: Verified missing spaces in modular `<h1>` tags (`forBuilding`, `forSecuring`, `forBoard`), collapsed `FaqAccordionBlock` answers absent from SSR HTML, broken `/insights/undefined` related cards, and `force-dynamic` Preview API leak on live routes.
- [x] <!-- id: 5 --> **Structured Data (`JSON-LD`) & Knowledge Graph Validation**: Audited `ProfessionalService`, `Article`, `FAQPage`, and unused `PersonSchema`/`BreadcrumbSchema` (`mgheadhunting.com` `@id`s, non-ISO dates, `.svg` publisher logo, wrong LinkedIn `sameAs`).
- [x] <!-- id: 6 --> **GEO Technical & Entity Consistency Audit (`/llms.txt`, `/llms-full.txt`, AI Crawlers)**: Confirmed 404 links (`/specialisms`, `/process`) and `.com` URLs in `/llms.txt`, plus reconciled all conflicting emails, phone numbers, LinkedIn URLs, HQ locations, tenures, placement counts, and warranty periods.
- [x] <!-- id: 7 --> **Live AI Answer Engine Visibility & Citation Benchmarking**: Executed benchmark suite confirming #1 category inclusion in UK Building Products specialist search, `chatgpt.com` referrals, and urgent `mgheadhunting.com` (*Match & Grow* Mexico/Ecuador) entity collision.
- [x] <!-- id: 8 --> **Off-Page Authority, Local/UK Entity Signals & Backlink Footprint Review**: Verified 1 linking domain in GSC (`peopleinglazing.co.uk`) + `thejoinerynetwork.co.uk` citation, and mapped UK trade association (BMF, GGF, CPA, CAB), Bing Webmaster Tools, and GBP opportunities.
- [x] <!-- id: 9 --> **Compile Comprehensive SEO & GEO Review Report + Prioritised Fix Roadmap**: Published `docs/seo-geo-audit-report-2026.md` and generated ready-to-approve remediation task list `ai_docs/tasks/022-seo-and-geo-remediation.md`.

## Verification
- [x] Every finding in the final audit report is backed by concrete evidence (GSC/GA4 metrics, live HTTP/DOM checks, exact file/line references, and live search grounding results).
- [x] All published Contentful routes (`/` + modular pages + `/insights/[slug]` + `/privacy`) inventoried and cross-checked against `sitemap.xml` and GSC index status.
- [x] Entity reconciliation table confirms a single source of truth for domain, email, phone, LinkedIn `sameAs`, and practice metrics.
- [x] Prioritised remediation roadmap (`022-seo-and-geo-remediation.md`) clearly separates code changes, Netlify/GA4/GSC configuration, Contentful CMS edits, and off-page authority actions without executing premature code edits.
