# Task List: SEO and AI Search Strategy Implementation

## Overview
Implement a comprehensive SEO and AI Search Strategy (AIO - Artificial Intelligence Optimization) for MG Headhunting. This involves technical Next.js SEO enhancements, Contentful CMS metadata modeling, and structuring content to be easily indexable by traditional search engines (Google, Bing) and LLM-based search/RAG engines (Perplexity, ChatGPT, Gemini).

## Prerequisites
- [ ] Contentful CLI and environment access to update content models.
- [ ] Next.js app running locally to verify metadata and sitemaps.

## Tasks
- [x] <!-- id: 0 --> **Global SEO & Metadata Configuration**: Update `src/app/layout.tsx` to include robust default `metadata` (Title, Description, OpenGraph, Twitter cards) using Next.js Metadata API.
- [x] <!-- id: 1 --> **Contentful SEO Fields**: Extend the `siteSettings` and page models (e.g., `insightArticle`, homepage) in Contentful with dedicated SEO fields (Meta Title, Meta Description, canonical URLs, OG Image).
- [x] <!-- id: 2 --> **Dynamic Routing SEO**: Update `src/app/insights/[slug]/page.tsx` and other dynamic pages to use `generateMetadata` fetching SEO data from Contentful.
- [x] <!-- id: 3 --> **Technical SEO Essentials**: Implement `app/sitemap.ts` and `app/robots.txt` dynamically to include all pages, insights, and sectors.
- [x] <!-- id: 4 --> **Schema Markup (JSON-LD) for Traditional & AI Search**: Inject structured data (Organization, Person for Mark Goldsmith, Article for insights, and Breadcrumbs). This helps AI search engines understand the entities and context.
- [x] <!-- id: 5 --> **AI-Optimized Content Formatting**: Ensure Contentful Rich Text renderer components output semantic HTML (proper heading hierarchy `<h1>`, `<h2>`, `<ul>`, `<article>`). AI bots rely heavily on semantic structure to parse facts and context.
- [x] <!-- id: 6 --> **Semantic FAQ & Entity Association**: Add a "Key Takeaways" or "FAQ" block to `insightArticle` in Contentful to explicitly feed AI models concise, authoritative answers about the firm's specific industry focus (Building Products & Construction).
- [x] <!-- id: 7 --> **Image Accessibility**: Enforce `alt` text requirements for all images coming from Contentful to improve accessibility and image search AI context.

## Verification
- [ ] Verify `robots.txt` and `sitemap.xml` are rendering correctly.
- [ ] Check page `<head>` for correct metadata, OpenGraph tags, and JSON-LD schema on homepage and an insight article.
- [ ] Validate structured data using the Google Rich Results Test tool.
- [ ] Ensure HTML structure is highly semantic using a screen reader or semantic HTML checker.
