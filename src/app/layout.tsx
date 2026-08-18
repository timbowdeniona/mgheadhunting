import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import './globals.css';
import { ContentfulLivePreviewProvider } from '../components/contentful/ContentfulLivePreviewProvider';
import { DraftModeBar } from '../components/ui/DraftModeBar';

export const metadata: Metadata = {
  title: 'MG Headhunting (MGH) | Retained Executive Search for Building Products & Construction',
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
  openGraph: {
    title: 'MG Headhunting (MGH) | Retained Executive Search',
    description:
      'Precision-engineered executive search for manufacturers, distributors, and PE investors across the Building Products sector.',
    type: 'website',
    locale: 'en_GB',
  },
};

export default async function RootLayout({

  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-canvas-light text-navy-900 font-sans selection:bg-teal-600 selection:text-white antialiased">
        <ContentfulLivePreviewProvider locale="en-US" enableLiveUpdates={true} enableInspectorMode={true}>
          {children}
          <DraftModeBar isEnabled={isEnabled} />
        </ContentfulLivePreviewProvider>
      </body>
    </html>
  );
}

