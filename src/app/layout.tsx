import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Script from 'next/script';
import './globals.css';
import { ContentfulLivePreviewProvider } from '../components/contentful/ContentfulLivePreviewProvider';
import { DraftModeBar } from '../components/ui/DraftModeBar';
import { CookieConsent } from '../components/ui/CookieConsent';
import { OrganizationSchema } from '../components/seo/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mgheadhunting.com'),
  title: {
    default: 'MG Headhunting (MGH) | Retained Executive Search for Building Products & Construction',
    template: '%s | MG Headhunting (MGH)',
  },
  description:
    'Boutique retained executive search delivering Board, Managing Director, and C-Suite appointments across the UK and European Building Products and Built Environment sectors. Partner-led, rigorously assessed, and strictly confidential.',
  keywords: [
    'Executive Search',
    'Headhunting',
    'Building Products',
    'Construction Materials',
    'Board Appointments',
    'Managing Director',
    'C-Suite',
    'Retained Search',
    'Mark Goldsmith',
    'MG Headhunting',
  ],
  authors: [{ name: 'Mark Goldsmith' }],
  creator: 'MG Headhunting',
  publisher: 'MG Headhunting',
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
    title: 'MG Headhunting (MGH) | Retained Executive Search',
    description:
      'Precision-engineered executive search for manufacturers, distributors, and PE investors across the Building Products sector.',
    url: '/',
    siteName: 'MG Headhunting (MGH)',
    type: 'website',
    locale: 'en_GB',
  },
  icons: {
    icon: [
      { url: '/mgh-favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/mgh-favicon.svg', type: 'image/svg+xml' }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MG Headhunting (MGH) | Retained Executive Search',
    description: 'Precision-engineered executive search for manufacturers, distributors, and PE investors across the Building Products sector.',
    creator: '@mgheadhunting',
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
    <html lang="en" className="scroll-smooth">
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
                  gtag('consent', 'default', {
                    'analytics_storage': 'denied',
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied',
                    'wait_for_update': 500
                  });
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
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                    send_page_view: true
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen bg-canvas-light text-navy-900 font-sans selection:bg-teal-600 selection:text-white antialiased">
        <OrganizationSchema />
        <ContentfulLivePreviewProvider locale="en-US" enableLiveUpdates={true} enableInspectorMode={true}>
          {children}
          <DraftModeBar isEnabled={isEnabled} />
          <CookieConsent />
        </ContentfulLivePreviewProvider>
      </body>
    </html>
  );
}

