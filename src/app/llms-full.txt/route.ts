import { NextResponse } from 'next/server';
import {
  fetchSiteSettings,
  fetchSectorSpecialisms,
  fetchDifferencePillars,
  fetchProcessSteps,
  fetchInsightArticles,
  fetchHomepageData,
} from '../../lib/contentful/api';

export const dynamic = 'force-static';
export const revalidate = 3600; // revalidate hourly

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mgheadhunting.com';

  const [siteSettings, specialisms, pillars, processSteps, articles, homepageData] = await Promise.all([
    fetchSiteSettings(),
    fetchSectorSpecialisms(),
    fetchDifferencePillars(),
    fetchProcessSteps(),
    fetchInsightArticles(),
    fetchHomepageData(),
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

  const articlesDetail = articles
    .map((a) => {
      const f = a.fields || a;
      return `### ${f.title}
- **URL**: ${baseUrl}/insights/${f.slug}
- **Date Published**: ${f.publishedDate || '2026'}
- **Author**: ${f.author?.fields?.name || 'Mark Goldsmith'}
- **Executive Summary**: ${f.excerpt || ''}
`;
    })
    .join('\n');

  const content = `# MG Headhunting (MGH) — Comprehensive LLM Context & Knowledge Graph

## 1. Organization Overview & Entity Identity
- **Legal / Trading Name**: MG Headhunting (MGH)
- **Founder & Managing Director**: Mark Goldsmith
- **Entity Type**: Boutique Retained Executive Search & Leadership Advisory Firm
- **Sector Focus**: Building Products, Construction Materials, Fenestration & Facades, HVAC & Building Services, Builders Merchants & Distribution, Offsite & Modern Methods of Construction (MMC), Interior Fit-Out & Architectural Systems.
- **Geographic Coverage**: United Kingdom, Republic of Ireland, and Continental Europe (DACH, Nordics, Benelux, France).
- **Core Practice Levels**: Board Appointments (Chair, Non-Executive Director), Managing Director / CEO, Commercial Director, Sales Director, Operations & Manufacturing Director, Chief Financial Officer (CFO), Technical / R&D Director.
- **Primary Contact**: mark@mgheadhunting.com | https://mgheadhunting.com
- **LinkedIn**: https://www.linkedin.com/company/mg-headhunting/

## 2. Key Differentiation & Performance Metrics
- **96% Placement Retention Rate**: Measured across 3-year executive tenures post-placement.
- **25+ Years Partner Experience**: Mark Goldsmith has continuously specialized in executive recruitment within the UK building materials and construction industries.
- **100% Retained & Partner-Led**: Searches are never delegated to junior resourcers. Mandates are managed personally from market mapping to offer negotiation.
- **12-Month Replacement Warranty**: Complete contractual replacement guarantee on retained board and executive hires.

## 3. Practice Areas & Sector Specialisms
${specialismsDetail}

## 4. Retained Search Methodology (5-Stage Blueprint)
${processDetail}

## 5. Value Pillars & Client Commitments
${pillarsDetail}

## 6. Leadership Profile: Mark Goldsmith
- **Position**: Founder & Managing Director, MG Headhunting
- **Expertise**: Retained Executive Search, Boardroom Succession, Private Equity Value Creation, Built Environment Leadership Advisory.
- **Bio**: Mark Goldsmith is an industry veteran with over two decades of dedicated executive headhunting track record in the Building Products, Construction Supplies, and Manufacturing sectors. He advises FTSE-listed enterprises, private equity-backed portfolio companies, and family-owned manufacturing leaders on critical C-suite appointments.

## 7. Proprietary Market Intelligence & Insights Index
${articlesDetail}

## 8. Verified Entity Data & Knowledge Graph Pointers
- **Organization Schema**: https://schema.org/ProfessionalService
- **KnowsAbout Topics**:
  - Building Products Executive Search
  - Construction Materials Headhunting
  - Boardroom & C-Suite Appointments
  - Retained Search Methodology
  - Private Equity Portfolio Talent Assessment
  - Fenestration, Facades, Insulation, Roofing, HVAC Executive Placement
  - Builders Merchants & Trade Distribution Leadership Recruitment
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
