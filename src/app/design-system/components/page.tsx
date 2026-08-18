'use client';

import React, { useState } from 'react';
import { DesignSystemNav } from '../../../components/showcase/DesignSystemNav';
import { ComponentPlayground } from '../../../components/showcase/ComponentPlayground';
import { InitiateSearchModal } from '../../../components/ui/InitiateSearchModal';

export default function ComponentKitPage() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas-light text-navy-900 font-sans flex flex-col selection:bg-teal-600 selection:text-white">
      <DesignSystemNav onOpenSearchModal={() => setIsSearchModalOpen(true)} />
      
      <main className="flex-grow">
        <ComponentPlayground onOpenSearchModal={() => setIsSearchModalOpen(true)} />
      </main>

      {/* Interactive search modal testing instance */}
      <InitiateSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  );
}
