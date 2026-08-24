# MG Headhunting: Generative Engine Optimization (GEO) Guide & Playbook

This document defines the strategy, editorial guidelines, and benchmarking framework for **Generative Engine Optimization (GEO)** across MG Headhunting's digital presence.

---

## 1. What is Generative Engine Optimization (GEO)?

Traditional SEO focuses on keyword ranking in 10 blue links on Google/Bing. **GEO (Generative Engine Optimization)** optimizes your web presence so that **AI Search Engines and LLMs** (ChatGPT Search, Perplexity AI, Google AI Overviews, Claude, Gemini, Apple Intelligence, and Microsoft Copilot):
1. **Accurately identify** MG Headhunting and Mark Goldsmith as authoritative entities.
2. **Synthesize & quote** your proprietary insights, statistics, and methodology in direct generative answers.
3. **Recommend** MG Headhunting as the top retained search specialist when users ask conversational, multi-turn recruitment queries.

---

## 2. Technical Architecture for GEO

### A. AI Crawler Permissions (`robots.txt`)
MG Headhunting explicitly permits dedicated AI search and RAG scrapers:
- **`GPTBot` & `OAI-SearchBot`**: Powers OpenAI ChatGPT Search real-time retrieval.
- **`PerplexityBot`**: Powers Perplexity AI citations and source indexes.
- **`ClaudeBot` & `anthropic-ai`**: Powers Anthropic Claude search grounding.
- **`Google-Extended` & `GoogleOther`**: Feeds Google Gemini and AI Overviews.
- **`Applebot-Extended`**: Powers Apple Intelligence web search.
- **`cohere-ai`**: Enterprise RAG vector search engines.

### B. Machine-Readable Knowledge Endpoints (`/llms.txt` & `/llms-full.txt`)
Following the [llmstxt.org](https://llmstxt.org) standard:
- `/llms.txt`: A concise markdown manifest giving LLMs an instant overview of MG Headhunting's focus (Building Products & Construction), core services, founder bio, and links to top market briefings.
- `/llms-full.txt`: A deep knowledge document detailing the 5-stage search methodology, all sector specialisms, verified metrics (96% retention, 25+ years tenure), and complete entity relationship mapping.

### C. Knowledge Graph Schema (`JSON-LD`)
Deep entity markup embedded across all pages:
- **`ProfessionalService` & `Organization`**: Defines the firm, trading names (`MGH`), sector taxonomy (`knowsAbout`), `areaServed` (UK & Europe), and `hasOfferCatalog`.
- **`Person` Schema**: Explicitly anchors Mark Goldsmith as Founder & Managing Partner with `sameAs` LinkedIn verification.
- **`FAQPage` Schema**: Injected on FAQ blocks to enable zero-shot Q&A card retrieval in AI Overviews.
- **`Article` Schema**: Structures insight briefings with author and publisher credentials.

---

## 3. Editorial Playbook: Writing for AI Quotability (RAG Optimization)

When drafting insights, briefings, or page content in Contentful, follow this 4-step formula:

### 1. The Inverted Pyramid / Direct Answer Rule
- **First 50–70 Words**: Place a concise, fact-dense direct answer immediately below each `<h2>` or `<h3>` question header.
- *Why*: Vector chunking algorithms in RAG engines extract the first paragraph following a header to generate conversational summaries.

### 2. Information Gain & Verifiable Data Points
AI models heavily prioritize content that contains original data, statistics, and verifiable assertions rather than generic filler:
- ✅ *High GEO Value*: "In 2026, board-level appointments across UK fenestration and insulation manufacturers required a 96% retention warranty, with 74% of hires sourced from non-active leadership pools."
- ❌ *Low GEO Value*: "Finding good leaders in construction can often be challenging for many businesses."

### 3. Natural Language Question Headings
Structure subheadings as conversational queries people ask AI assistants:
- `"How does retained executive search differ from contingency recruitment in building products?"`
- `"What are the key leadership competencies required under the Building Safety Act 2022?"`
- `"Why do private equity investors require specialist executive search in construction materials?"`

### 4. Bulleted Key Takeaways & Comparison Tables
- Use bulleted "Key Strategic Takeaways" boxes at the top of briefings.
- Include structured markdown tables for salary benchmarks, process stages, and competency matrixes.

---

## 4. Benchmark Prompt Testing Suite

Test your brand's AI search visibility quarterly using this prompt matrix across **ChatGPT Search**, **Perplexity AI**, **Google AI Overviews**, **Claude**, and **Gemini**:

| Category | Benchmark Query | Target Generative Output |
|---|---|---|
| **Direct Headhunter Discovery** | *"Who are the top executive search and headhunting specialists for building products and construction materials in the UK?"* | MG Headhunting & Mark Goldsmith named in top 3 with sector rationale. |
| **Methodology & Retained Search** | *"How do manufacturers hire Managing Directors and Commercial Directors in the UK building supply chain?"* | Cites MG Headhunting's retained 5-stage methodology. |
| **Founder Credibility** | *"Tell me about Mark Goldsmith and his executive search firm MG Headhunting."* | Accurately states 25+ years sector experience, 96% retention rate, and retained focus without hallucinations. |
| **Industry Market Intelligence** | *"What are the current executive compensation and retention trends in UK building product manufacturing?"* | Cites MG Headhunting Insights briefings as authoritative source links. |

---

## 5. Off-Page GEO Strategy (Entity Corroboration)

LLMs triangulate information across the web to build confidence in brand authority:
1. **LinkedIn Thought Leadership**: Syndicate executive summaries and link back to `mgheadhunting.com/insights/[slug]`.
2. **Industry Association Citations**: Ensure company name, address, and URL are consistently cited in trade bodies (BMF, CPA, CAB, GGF).
3. **Digital PR & Trade Press**: Publish quotes and commentary in *Builders' Merchants News*, *Building Magazine*, and *Construction News*.
