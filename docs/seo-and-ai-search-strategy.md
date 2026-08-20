# MG Headhunting: SEO and AI Search Strategy

This document outlines the approach for optimizing the MG Headhunting platform for both traditional search engines (Google, Bing) and next-generation AI Search Engines (Perplexity, ChatGPT, Gemini, Claude).

## 1. Traditional SEO (Search Engine Optimization)

Traditional SEO ensures the website ranks highly on standard SERPs (Search Engine Results Pages). For an executive search firm, the goal is to capture high-intent queries related to "executive search building products", "construction C-suite recruitment", etc.

### Next.js Metadata API
- **Implementation**: We will leverage the Next.js `metadata` and `generateMetadata` APIs in the App Router.
- **Global Metadata**: A strong foundational `metadata` object in `src/app/layout.tsx` for fallbacks (Title, Description, OpenGraph, Twitter).
- **Dynamic Metadata**: For dynamic pages (like `/insights/[slug]`), we will fetch specific SEO fields from Contentful to populate page titles and descriptions.

### Technical Foundations
- **Sitemap & Robots.txt**: Dynamically generated `sitemap.xml` (using `app/sitemap.ts`) to ensure search bots discover all new Insights and Sectors automatically. `robots.txt` will allow all standard crawlers.
- **Canonical URLs**: Prevent duplicate content issues by ensuring every page has a definitive self-referencing canonical tag.
- **Performance (Core Web Vitals)**: Utilizing Next.js Image component and optimized fonts to ensure fast loading, a key ranking factor for Google.

## 2. AIO (Artificial Intelligence Optimization) / LLM Strategy

AI Search engines (like Perplexity) operate differently than traditional indexers. They use LLMs (Large Language Models) combined with RAG (Retrieval-Augmented Generation) to read web pages, extract facts, and generate conversational answers.

Our strategy is to ensure that when AI reads the MG Headhunting site, it clearly understands the firm's niche, authority, and personnel.

### Structured Data (JSON-LD Schema Markup)
AI models rely heavily on structured data to confidently extract entities and relationships. We will inject JSON-LD into the `<head>` of our pages:
- **`Organization` Schema**: Explicitly defines "MG Headhunting" as an Executive Search firm, linking to social profiles and contact info.
- **`Person` Schema**: Defines "Mark Goldsmith", linking his expertise directly to the firm.
- **`Article` Schema**: Applied to Insights to ensure AI recognizes the content as authoritative industry publishing.
- **`BreadcrumbList`**: Helps AI understand site hierarchy.

### Semantic HTML and Content Structure
AI parsers read the DOM to understand context.
- **Strict Hierarchy**: Enforcing strict `<h1>` to `<h4>` flow without skipping levels.
- **Semantic Tags**: Wrapping main content in `<article>`, navigation in `<nav>`, and key sections in `<section>`.
- **Entity Density**: Ensuring the text naturally includes specific entities (e.g., "Building Products", "Construction", "Board Level", "Retained Search").

### Key Takeaways / Executive Summaries
AI models prefer concise, dense information.
- For all long-form content (Insights), we will encourage the use of "Key Takeaways" bullet lists at the top of the article. This makes it incredibly easy for an AI to extract and quote the firm's insights in its generated answers.

## 3. Contentful CMS Integration

To give the editorial team control over this strategy without needing code changes, we will extend the Contentful models:

1. **SEO Meta Fields**: Adding `seoTitle`, `seoDescription`, and `seoImage` to page models.
2. **Schema Control**: Allowing editors to toggle specific schema types or provide custom JSON-LD (optional, but powerful).
3. **Rich Text Constraints**: Configuring the Rich Text editor to enforce semantic headings and prevent messy, unparseable HTML from being generated.

## Summary

By combining Next.js's server-side rendering and metadata capabilities with rich JSON-LD schema and strict semantic HTML from Contentful, the MG Headhunting platform will be positioned as a highly authoritative, easily parsable entity for both human-driven Google searches and AI-driven conversational assistants.
