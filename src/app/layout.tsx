import type { Metadata } from 'next';
import { Suspense } from 'react';
import { draftMode } from 'next/headers';
import Script from 'next/script';
import './globals.css';
import { ContentfulLivePreviewProvider } from '../components/contentful/ContentfulLivePreviewProvider';
import { DraftModeBar } from '../components/ui/DraftModeBar';
import { CookieConsent } from '../components/ui/CookieConsent';
import { OrganizationSchema } from '../components/seo/JsonLd';
import { AnalyticsRouteTracker } from '../components/seo/AnalyticsRouteTracker';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MG Headhunting (MGH) | Retained Executive Search for Building Products & Construction',
    template: '%s | MG Headhunting',
  },
  description:
    'Boutique retained executive search delivering Board, Managing Director, and C-Suite appointments across the UK and European Building Products and Built Environment sectors. Partner-led, rigorously assessed, and strictly confidential.',
  keywords: [
    'Executive Search',
    'Headhunting',
    'Building Products',
    'Construction Materials',
    'Fenestration Headhunter',
    'Board Appointments',
    'Managing Director',
    'C-Suite',
    'Retained Search',
    'Mark Goldsmith',
    'MG Headhunting',
  ],
  authors: [{ name: 'Mark Goldsmith', url: `${SITE_URL}/about` }],
  creator: 'MG Headhunting',
  publisher: 'MG Headhunting',
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'MG Headhunting (MGH) | Retained Executive Search for Building Products',
    description:
      'Precision-engineered executive search for manufacturers, distributors, and PE investors across the UK & European Building Products sector.',
    url: SITE_URL,
    siteName: 'MG Headhunting',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'MG Headhunting — Retained Executive Search for Building Products & Construction',
      },
    ],
  },
  icons: {
    icon: [{ url: '/mgh-favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/mgh-logo-light.png', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MG Headhunting (MGH) | Retained Executive Search for Building Products',
    description:
      'Precision-engineered executive search for manufacturers, distributors, and PE investors across the UK & European Building Products sector.',
    images: [DEFAULT_OG_IMAGE],
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-2SW09PVDCF';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en-GB" className="scroll-smooth">
      <head>
        {GA_ID && (
          <>
            {/* Google Consent Mode v2 Initialization */}
            <Script
              id="google-consent-mode"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  var savedConsent = null;
                  try { savedConsent = window.localStorage.getItem('mgh_cookie_consent'); } catch (e) {}
                  var initialConsent = savedConsent === 'granted' ? 'granted' : 'denied';
                  gtag('consent', 'default', {
                    'analytics_storage': initialConsent,
                    'ad_storage': 'denied',
                    'ad_user_data': initialConsent,
                    'ad_personalization': 'denied',
                    'wait_for_update': 500
                  });
                  gtag('set', 'ads_data_redaction', true);
                  gtag('set', 'url_passthrough', true);
                `,
              }}
            />
            {/* Google Tag (gtag.js) */}
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
              id="google-analytics-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  var host = (window.location.hostname || '').toLowerCase();
                  var path = window.location.pathname || '';
                  var isNonProdOrInternal =
                    host === 'localhost' ||
                    host === '127.0.0.1' ||
                    host.endsWith('.netlify.app') ||
                    path.indexOf('/design-system') === 0 ||
                    path.indexOf('/storybook') === 0;
                  if (!isNonProdOrInternal) {
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}', {
                      page_path: path + (window.location.search || ''),
                      send_page_view: true
                    });
                  }
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen bg-canvas-light text-navy-900 font-sans selection:bg-teal-600 selection:text-white antialiased">
        <OrganizationSchema />
        <Suspense fallback={null}>
          <AnalyticsRouteTracker />
        </Suspense>
        <ContentfulLivePreviewProvider locale="en-US" enableLiveUpdates={true} enableInspectorMode={true}>
          {children}
          <DraftModeBar isEnabled={isEnabled} />
          <CookieConsent />
        </ContentfulLivePreviewProvider>
      </body>
    </html>
  );
}
