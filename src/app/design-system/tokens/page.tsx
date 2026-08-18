import type { Metadata } from 'next';
import { DesignSystemNav } from '../../../components/showcase/DesignSystemNav';
import { TokenExplorer } from '../../../components/showcase/TokenExplorer';

export const metadata: Metadata = {
  title: 'Design Tokens Specification | MGH Design System',
  description:
    'Complete token registry for MG Headhunting: Deep Navy palettes, Accent Teal, Structural Concrete, Typography Scales, and JSON token exports.',
};

export default function DesignTokensPage() {
  return (
    <div className="min-h-screen bg-canvas-light text-navy-900 font-sans flex flex-col selection:bg-teal-600 selection:text-white">
      <DesignSystemNav />
      <main className="flex-grow">
        <TokenExplorer />
      </main>
    </div>
  );
}
