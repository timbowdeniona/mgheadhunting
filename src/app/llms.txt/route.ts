import { NextResponse } from 'next/server';
import {
  fetchSectorSpecialisms,
  fetchInsightArticles,
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
  const [specialisms, articles] = await Promise.all([
    fetchSectorSpecialisms(false),
    fetchInsightArticles(false),
  ]);

  const specialismsList = specialisms
    .map(
      (s) =>
        `- [${s.title}](${SITE_URL}/sectors): ${s.subtitle || s.description || 'Specialist executive search practice.'}`
    )
    .join('\n');

  const articlesList = articles
    .map((a) => a?.fields || a)
    .filter((f) => f?.slug && f.slug !== 'undefined')
    .slice(0, 8)
    .map(
      (f) =>
        `- [${f.title}](${SITE_URL}/insights/${encodeURIComponent(f.slug.trim())}): ${f.excerpt || 'Executive market intelligence briefing.'}`
    )
    .join('\n');

  const content = `# MG Headhunting (MGH)

> Boutique retained executive search delivering Board, Managing Director, and C-Suite appointments across the UK and European Building Products, Construction Materials, Fenestration, and Built Environment sectors.

MG Headhunting Ltd operates exclusively on retained, partner-led mandates at ${SITE_URL}. Founded and personally directed by Mark Goldsmith, MGH partners with manufacturers, distributors, fabricators, contractors, and private equity investors to appoint transformative executive leaders.

- **Official Website**: ${SITE_URL}
- **Direct Partner Email**: ${CANONICAL_EMAIL}
- **Direct Telephone**: ${CANONICAL_PHONE}
- **LinkedIn**: ${CANONICAL_LINKEDIN}

## Core Specialisms
${specialismsList}

## Executive Search Methodology & Value Proposition
- **Partner-Led Execution**: Every search mandate is directly researched, managed, and executed by Mark Goldsmith.
- **Deep Industry Network**: Targeted approach to the passive executive leadership pool across the UK & Europe.
- **Confidential & Retained**: Strict confidentiality protocol for sensitive leadership transitions and Board appointments.

## Primary Resources & Links
- [Home](${SITE_URL}/): Overview of retained executive search services and practice track record.
- [Sector Specialisms](${SITE_URL}/sectors): Dedicated practice areas across Building Products, HVAC, Fenestration, Heavy Materials & Trade Distribution.
- [Retained Search Methodology](${SITE_URL}/retained-search): The 5-stage disciplined search blueprint.
- [The MGH Difference](${SITE_URL}/difference): Structural advantages of partner-led retained headhunting vs contingency recruitment.
- [Frequently Asked Questions](${SITE_URL}/faq): Candid answers from Mark Goldsmith on retained fees, timelines, confidentiality, and warranties.
- [About Mark Goldsmith](${SITE_URL}/about): Leadership bio, credentials, and practice history.
- [Case Studies & Market Intelligence](${SITE_URL}/insights): Placement case studies and industry leadership briefings.
- [Contact & Confidential Consultation](${SITE_URL}/contact): Direct partner desk contact (${CANONICAL_EMAIL} / ${CANONICAL_PHONE}).

## Latest Case Studies & Executive Briefings
${articlesList}

## Full AI Context Document
- [llms-full.txt](${SITE_URL}/llms-full.txt): Complete detailed practice manual, leadership profile, methodology blueprints, and extended knowledge graph.
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
