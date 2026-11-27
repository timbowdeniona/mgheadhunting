import type { Metadata } from 'next';
import { PrivacyClient } from './PrivacyClient';
import { BreadcrumbSchema } from '../../components/seo/JsonLd';
import { SITE_URL } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Privacy & Data Protection Policy',
  description:
    'UK GDPR compliant data protection policy and strict candidate confidentiality protocols for MG Headhunting retained executive search practice.',
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: 'Privacy & Data Protection Policy | MG Headhunting',
    description:
      'UK GDPR compliant data protection policy and strict candidate confidentiality protocols for MG Headhunting retained executive search practice.',
    url: `${SITE_URL}/privacy`,
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Privacy & Data Policy', url: `${SITE_URL}/privacy` },
        ]}
      />
      <PrivacyClient />
    </>
  );
}
