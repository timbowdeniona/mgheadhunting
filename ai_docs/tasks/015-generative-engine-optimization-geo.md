# Task List: Generative Engine Optimization (GEO) Implementation

## Overview
Implement a comprehensive Generative Engine Optimization (GEO) framework for MG Headhunting. GEO ensures the platform is recognized, trusted, cited, and recommended by modern AI search engines and answer engines (ChatGPT Search, Perplexity AI, Google AI Overviews, Gemini, Claude, and Copilot) as the leading authority in Executive Search for the Building Products and Built Environment sectors.

## Prerequisites
- [x] Next.js 14/15 App Router architecture in place.
- [x] Contentful CMS connection and API access configured.
- [x] Existing SEO foundations (metadata, sitemap, basic JSON-LD).

## Tasks
- [x] <!-- id: 0 --> **AI Crawler Configuration (`robots.txt`)**: Update `src/app/robots.ts` with explicit rules allowing AI search crawlers (`GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `cohere-ai`) while preserving protected system routes.
- [x] <!-- id: 1 --> **Implement `llms.txt` and `llms-full.txt` Endpoints**: Build dynamic Route Handlers (`src/app/llms.txt/route.ts` and `src/app/llms-full.txt/route.ts`) following the `llmstxt.org` specification to provide structured, markdown-formatted company summaries, services, leadership bios, and insight directory for LLM scrapers.
- [x] <!-- id: 2 --> **Deep Knowledge Graph & Entity Schema (JSON-LD)**: Expand `src/components/seo/JsonLd.tsx` with enhanced entity definitions:
  - Enrich `OrganizationSchema` with `knowsAbout`, `hasOfferCatalog` / `Service`, `areaServed`, `founder`, and verifiable `sameAs` authority links.
  - Enrich `PersonSchema` for Mark Goldsmith with credentials, industry tenure, and topic expertise.
  - Add `FAQPage` and `ServiceSchema` structured data components for service and modular pages.
- [x] <!-- id: 3 --> **RAG Content Chunking & Direct Answer Optimization**:
  - Implement a `KeyTakeaways` / `ExecutiveSummary` block component for insights to serve high-density 40-60 word summaries tailored for zero-shot RAG retrieval.
  - Ensure Rich Text rendering outputs semantic hierarchy (`<article>`, `<header>`, `<h2>`, `<section>`) with question-based subheadings.
- [x] <!-- id: 4 --> **Quotable Data & Authority Metrics Component**:
  - Enhance `MetricsStatsBlock` and editorial callouts to render verifiable statistics and data points (e.g. retention rate, sector tenure) that LLMs prioritize for factual citations.
- [x] <!-- id: 5 --> **Contentful CMS Schema Support for GEO**:
  - Add optional `faqItems` (question/answer pairs) to modular pages and `insightArticle` models.
  - Add `geoSummary` / `directAnswer` helper fields or guidance for content editors.
- [x] <!-- id: 6 --> **GEO Editorial Guidelines & Prompt Benchmarking Strategy**:
  - Author `docs/geo-optimization-guide.md` covering conversational keyword targeting, inverted-pyramid writing, citation building, and a benchmark prompt testing suite (ChatGPT Search, Perplexity, Claude, Gemini).

## Verification
- [x] Verify `robots.txt` allows all target AI crawlers (`curl -I http://localhost:3000/robots.txt`).
- [x] Test `/llms.txt` and `/llms-full.txt` endpoints for proper markdown formatting and content completeness.
- [x] Validate expanded JSON-LD schemas using Google Rich Results and Schema Markup Validator.
- [x] Test RAG extraction and answer readiness on a sample Insight article.
- [x] Run benchmark queries across Perplexity and ChatGPT Search to evaluate baseline entity retrieval.
