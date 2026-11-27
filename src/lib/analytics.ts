/**
 * Google Analytics (GA4) Telemetry & Event Dispatcher
 * Tailored for MG Headhunting retained executive search metrics.
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetIdOrAction: string | Date,
      params?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-2SW09PVDCF';

/**
 * Suppresses GA4 telemetry on staging (*.netlify.app), localhost,
 * and internal workbench routes (/design-system, /storybook) so dev/CMS
 * activity never pollutes live production analytics.
 */
export function shouldTrackCurrentPage(pathname?: string): boolean {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname.toLowerCase();
  if (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host.endsWith('.netlify.app')
  ) {
    return false;
  }

  const path = pathname || window.location.pathname || '';
  if (path.startsWith('/design-system') || path.startsWith('/storybook')) {
    return false;
  }

  return true;
}

/**
 * Dispatches SPA client-navigation pageviews in Next.js App Router.
 */
export const trackPageView = (pagePath: string) => {
  if (!shouldTrackCurrentPage(pagePath) || !window.gtag) {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
};

/**
 * Generic event tracker with safety checks for SSR, staging hosts, and ad-blockers.
 */
export const trackEvent = (
  action: string,
  category?: string,
  label?: string,
  value?: number,
  additionalParams?: Record<string, any>
) => {
  if (!shouldTrackCurrentPage() || !window.gtag) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...additionalParams,
  });
};

/**
 * Retained Search Conversion: Form submission / Mandate inquiry
 */
export const trackLeadSubmission = (
  inquiryType: 'mandate' | 'candidate' | 'general' = 'mandate',
  sector?: string
) => {
  trackEvent('generate_lead', 'Conversion', inquiryType, 1, {
    inquiry_type: inquiryType,
    sector_interest: sector || 'general',
    currency: 'GBP',
  });
};

/**
 * Direct Partner Contact click (email or tel link)
 */
export const trackDirectContact = (
  type: 'email' | 'phone' | 'linkedin',
  value: string,
  location: string
) => {
  trackEvent('contact_direct_click', 'Engagement', type, undefined, {
    contact_type: type,
    contact_value: value,
    click_location: location,
  });
};

/**
 * Primary Call-to-Action button click
 */
export const trackCtaClick = (
  ctaText: string,
  location: string,
  destination?: string
) => {
  trackEvent('cta_click', 'Navigation', ctaText, undefined, {
    cta_text: ctaText,
    cta_location: location,
    destination: destination,
  });
};

/**
 * Sector Matrix interaction (exploring specific executive search sectors)
 */
export const trackSectorInteraction = (
  sectorName: string,
  action: 'select_tab' | 'view_details' = 'select_tab'
) => {
  trackEvent('sector_matrix_interact', 'Sector Matrix', sectorName, undefined, {
    sector_name: sectorName,
    interaction_action: action,
  });
};

/**
 * Insights / Whitepaper view & reading tracking
 */
export const trackInsightView = (
  articleSlug: string,
  articleTitle: string,
  category?: string
) => {
  trackEvent('view_insight_article', 'Insights', articleTitle, undefined, {
    article_slug: articleSlug,
    article_title: articleTitle,
    category: category || 'General',
  });
};

/**
 * Google Consent Mode v2 updater
 */
export const updateGoogleConsent = (granted: boolean) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  const state = granted ? 'granted' : 'denied';
  window.gtag('consent', 'update', {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });

  if (granted && shouldTrackCurrentPage()) {
    window.gtag('event', 'page_view', {
      page_path: window.location.pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
};
