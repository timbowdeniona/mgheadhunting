import type { Metadata } from 'next';
import { DesignSystemNav } from '../../../components/showcase/DesignSystemNav';
import { BrandGuidelines } from '../../../components/showcase/BrandGuidelines';

export const metadata: Metadata = {
  title: 'Brand Guidelines & Identity System | MGH Design System',
  description:
    'Official Brand Identity standards for MG Headhunting: Wordmark anatomy, geometric Monogram construction, clear space rules, and executive tone.',
};

export default function BrandIdentityPage() {
  return (
    <div className="min-h-screen bg-canvas-light text-navy-900 font-sans flex flex-col selection:bg-teal-600 selection:text-white">
      <DesignSystemNav />
      <main className="flex-grow">
        <BrandGuidelines />
      </main>
    </div>
  );
}
