/**
 * Canonical SEO & Entity Constants for MG Headhunting (UK)
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://mgheadhunting.co.uk'
).replace(/\/+$/, '');

export const CANONICAL_EMAIL = 'mgoldsmith@mgheadhunting.co.uk';
export const CANONICAL_PHONE = '07570 740490';
export const CANONICAL_PHONE_E164 = '+447570740490';
export const CANONICAL_LINKEDIN = 'https://www.linkedin.com/in/markgoldsmith2/';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/MGH%20Full%20Logo.png`;

/**
 * Strips duplicate trailing "| MG Headhunting..." brand suffixes from CMS or
 * fallback page titles so root layout's `title.template` never stamps it twice.
 */
export function stripBrandSuffix(rawTitle?: string | null): string {
  if (!rawTitle) return '';
  return rawTitle
    .replace(/\s*\|\s*MG Headhunting(?:\s*\(MGH\)|\s*Intelligence|\s*Executive Search|\s*Retained Search)?\s*$/i, '')
    .trim();
}

const MONTH_INDEX: Record<string, string> = {
  january: '01',
  jan: '01',
  february: '02',
  feb: '02',
  march: '03',
  mar: '03',
  april: '04',
  apr: '04',
  may: '05',
  june: '06',
  jun: '06',
  july: '07',
  jul: '07',
  august: '08',
  aug: '08',
  september: '09',
  sep: '09',
  sept: '09',
  october: '10',
  oct: '10',
  november: '11',
  nov: '11',
  december: '12',
  dec: '12',
};

/**
 * Normalizes human-readable dates (e.g. "September 2026") or ISO timestamps
 * into valid ISO 8601 date strings (YYYY-MM-DD or full ISO) for JSON-LD and sitemaps.
 */
export function toIsoDateString(dateInput?: string | null, fallbackIso?: string): string | undefined {
  if (!dateInput) return fallbackIso;
  const trimmed = dateInput.trim();

  // Already YYYY-MM-DD or full ISO 8601
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    return trimmed;
  }

  // Match "September 2026" or "Sep 2026"
  const monthYearMatch = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYearMatch) {
    const monthNum = MONTH_INDEX[monthYearMatch[1].toLowerCase()];
    if (monthNum) {
      return `${monthYearMatch[2]}-${monthNum}-01`;
    }
  }

  // Match "15 September 2026"
  const dayMonthYearMatch = trimmed.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (dayMonthYearMatch) {
    const day = dayMonthYearMatch[1].padStart(2, '0');
    const monthNum = MONTH_INDEX[dayMonthYearMatch[2].toLowerCase()];
    if (monthNum) {
      return `${dayMonthYearMatch[3]}-${monthNum}-${day}`;
    }
  }

  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString();
  }

  return fallbackIso;
}

/**
 * Determines whether Contentful Preview API (unpublished drafts) should be used.
 * Live production (`mgheadhunting.co.uk`) ALWAYS serves published Contentful Delivery API
 * unless Next.js Draft Mode or `?preview=true` is explicitly active.
 * Staging (`*.netlify.app`) and local dev continue supporting real-time draft previews.
 */
export function shouldUsePreviewData({
  isDraftEnabled,
  hasPreviewParam,
  host,
}: {
  isDraftEnabled: boolean;
  hasPreviewParam: boolean;
  host?: string | null;
}): boolean {
  if (isDraftEnabled || hasPreviewParam) return true;
  if (process.env.NODE_ENV === 'development') return true;
  if (host && host.toLowerCase().endsWith('.netlify.app')) return true;
  return false;
}
