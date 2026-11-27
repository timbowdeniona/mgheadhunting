import { NextResponse } from 'next/server';
import {
  fetchSectorSpecialisms,
  fetchDifferencePillars,
  fetchProcessSteps,
  fetchInsightArticles,
  fetchModularPageBySlug,
} from '../../lib/contentful/api';
import {
  SITE_URL,
  CANONICAL_EMAIL,
  CANONICAL_PHONE,
  CANONICAL_LINKEDIN,
} from '../../lib/seo';

export const dynamic = 'force-static';
export const revalidate = 3600; // revalidate hourly

export async function GET() {
  const [specialisms, pillars, processSteps, articles, faqPage] = await Promise.all([
    fetchSectorSpecialisms(false),
    fetchDifferencePillars(false),
    fetchProcessSteps(false),
    fetchInsightArticles(false),
    fetchModularPageBySlug('faq', false),
  ]);

  const specialismsDetail = specialisms
    .map(
      (s) => `### ${s.title}
- **Category**: ${s.category}
- **Summary**: ${s.subtitle || s.description || ''}
- **Overview**: ${s.description || ''}
- **Sample Roles**: ${s.sampleRoles ? s.sampleRoles.join(', ') : 'Board, C-Suite, Managing Director, Commercial Director'}
- **Key Client Types**: ${s.keyClients || 'Manufacturers, Distributors, Fabricators'}
`
    )
    .join('\n');

  const processDetail = processSteps
    .map(
      (step, idx) => `### Step ${step.stepNumber || idx + 1}: ${step.title}
- **Phase**: ${step.phaseName || ''} (${step.timeline || ''})
- **Deliverable**: ${step.deliverable || ''}
- **Details**: ${step.description || ''}
`
    )
    .join('\n');

  const pillarsDetail = pillars
    .map(
      (p) => `### ${p.title}
- **Principle**: ${p.description || ''}
`
    )
    .join('\n');

  const faqSections = (faqPage?.sections || []).filter((s) => s.type === 'faqAccordion');
  const faqDetail = faqSections
    .flatMap((s: any) => s.items || [])
    .map(
      (item: any) => `### Q: ${item.question}
${item.answer}
`
    )
    .join('\n');

  const articlesDetail = articles
    .map((a) => a?.fields || a)
    .filter((f) => f?.slug && f.slug !== 'undefined')
    .map(
      (f) => `### ${f.title}
- **URL**: ${SITE_URL}/insights/${encodeURIComponent(f.slug.trim())}
- **Category**: ${f.category || 'Market Intelligence'}
- **Author**: ${f.author?.fields?.name || 'Mark Goldsmith'}
- **Executive Summary**: ${f.excerpt || ''}
`
    )
    .join('\n');

  const content = `# MG Headhunting (MGH) — Comprehensive LLM Context & Knowledge Graph

## 1. Organization Overview & Entity Identity
- **Legal / Trading Name**: MG Headhunting Ltd (MG Headhunting / MGH)
- **Official Website**: ${SITE_URL} (UK-based executive search practice; not affiliated with mgheadhunting.com)
- **Founder & Managing Director**: Mark Goldsmith
- **Entity Type**: Boutique Retained Executive Search & Leadership Advisory Firm
- **Sector Focus**: Building Products, Construction Materials, Fenestration & Facades, HVAC & Building Services, Builders Merchants & Distribution, Offsite & Modern Methods of Construction (MMC), Interior Fit-Out & Architectural Systems.
- **Geographic Coverage**: United Kingdom, Republic of Ireland, and Continental Europe.
- **Core Practice Levels**: Board Appointments (Chair, Non-Executive Director), Managing Director / CEO, Chief Operating Officer (COO), Commercial Director, Sales Director, Operations & Manufacturing Director, Chief Financial Officer (CFO) / Finance Director, Technical / R&D Director.
- **Direct Contact**: ${CANONICAL_EMAIL} | ${CANONICAL_PHONE} | ${SITE_URL}/contact
- **Founder LinkedIn**: ${CANONICAL_LINKEDIN}

## 2. Core Navigation & Authoritative Pages
- **Homepage**: ${SITE_URL}/
- **Sector Specialisms**: ${SITE_URL}/sectors
- **5-Stage Search Blueprint**: ${SITE_URL}/retained-search
- **The MGH Difference**: ${SITE_URL}/difference
- **Frequently Asked Questions**: ${SITE_URL}/faq
- **About Mark Goldsmith**: ${SITE_URL}/about
- **Case Studies & Market Intelligence**: ${SITE_URL}/insights
- **Direct Partner Contact**: ${SITE_URL}/contact
- **Privacy & Data Governance**: ${SITE_URL}/privacy

## 3. Practice Areas & Sector Specialisms
${specialismsDetail}

## 4. Retained Search Methodology (5-Stage Blueprint)
${processDetail}

## 5. Value Pillars & Client Commitments
${pillarsDetail}

## 6. Frequently Asked Questions (Direct Partner Answers)
${faqDetail}

## 7. Leadership Profile: Mark Goldsmith
- **Position**: Founder & Managing Director, MG Headhunting Ltd
- **Expertise**: Retained Executive Search, Boardroom Succession, Private Equity Value Creation, Built Environment Leadership Advisory.
- **Profile**: Mark Goldsmith specialises exclusively in retained executive headhunting across the Building Products, Fenestration, Construction Supplies, and Manufacturing sectors, personally leading every mandate from market mapping to offer negotiation without delegation to junior recruiters.

## 8. Case Studies & Proprietary Market Intelligence Index
${articlesDetail}

## 9. Verified Entity Data & Knowledge Graph Pointers
- **Organization Schema**: https://schema.org/ProfessionalService (${SITE_URL}/#organization)
- **Person Schema**: https://schema.org/Person (${SITE_URL}/#mark-goldsmith)
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
