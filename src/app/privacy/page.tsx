import type { Metadata } from 'next';
import { PrivacyClient } from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy & Data Policy | MG Headhunting (MGH)',
  description:
    'UK GDPR compliant data protection policy and strict candidate confidentiality protocols for MG Headhunting retained executive search practice.',
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
