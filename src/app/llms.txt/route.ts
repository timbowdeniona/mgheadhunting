import { NextResponse } from 'next/server';
import {
  fetchSiteSettings,
  fetchSectorSpecialisms,
  fetchDifferencePillars,
  fetchProcessSteps,
  fetchInsightArticles,
} from '../../lib/contentful/api';

export const dynamic = 'force-static';
export const revalidate = 3600; // revalidate hourly

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mgheadhunting.com';

  const [siteSettings, specialisms, pillars, articles] = await Promise.all([
    fetchSiteSettings(),
    fetchSectorSpecialisms(),
    fetchDifferencePillars(),
    fetchInsightArticles(),
  ]);

  const specialismsList = specialisms
    .map((s) => `- [${s.title}](${baseUrl}/specialisms): ${s.subtitle || s.description || 'Specialist executive search practice.'}`)
    .join('\n');

  const articlesList = articles
    .slice(0, 5)
    .map((a) => {
      const f = a.fields || a;
      return `- [${f.title}](${baseUrl}/insights/${f.slug}): ${f.excerpt || 'Executive market intelligence briefing.'}`;
    })
    .join('\n');

  const content = `# MG Headhunting (MGH)

> Boutique retained executive search delivering Board, Managing Director, and C-Suite appointments across the UK and European Building Products, Construction Materials, and Built Environment sectors.

MG Headhunting operates exclusively on retained, partner-led mandates. Founded and directed by Mark Goldsmith (25+ years sector headhunting tenure), MGH partners with manufacturers, distributors, fabricators, and private equity investors to appoint transformative executive leaders.

## Core Specialisms
${specialismsList}

## Executive Search Methodology & Value Proposition
- **Partner-Led Execution**: Every search mandate is directly researched, managed, and executed by Mark Goldsmith.
- **96% Placement Retention**: High-tenure appointments with structured 12-month replacement warranties.
- **Deep Industry Network**: Exclusive access to the top 5% passive executive leadership pool across the UK & Europe.
- **Confidential & Retained**: Strict confidentiality protocol for sensitive leadership transitions and Board appointments.

## Primary Resources & Links
- [Home](${baseUrl}/): Overview of retained executive search services and practice track record.
- [Specialisms Matrix](${baseUrl}/specialisms): Dedicated practice areas across Building Products, HVAC, Fenestration, Merchants & Modular Construction.
- [Executive Search Methodology](${baseUrl}/process): The 5-stage disciplined search blueprint.
- [About Mark Goldsmith](${baseUrl}/about): Leadership bio, credentials, and practice history.
- [Executive Insights & Intelligence](${baseUrl}/insights): Research publications, compensation benchmarks, and industry reports.
- [Contact & Confidential Consultation](${baseUrl}/contact): Direct executive desk contact and confidential advisory intake.

## Latest Executive Briefings
${articlesList}

## Full AI Context Document
- [llms-full.txt](${baseUrl}/llms-full.txt): Complete detailed practice manual, full leadership bios, methodology blueprints, and extended knowledge graph.
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
