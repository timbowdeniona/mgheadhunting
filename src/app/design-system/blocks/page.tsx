'use client';

import React, { useState } from 'react';
import { DesignSystemNav } from '../../../components/showcase/DesignSystemNav';
import { BlockStorybook } from '../../../components/showcase/BlockStorybook';
import { InitiateSearchModal } from '../../../components/ui/InitiateSearchModal';
import { ArticleModal } from '../../../components/ui/ArticleModal';
import { InsightArticle } from '../../../lib/contentful/types';

export default function BlockStorybookPage() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);

  return (
    <div className="min-h-screen bg-navy-950 text-white font-sans flex flex-col selection:bg-teal-600 selection:text-white">
      <DesignSystemNav onOpenSearchModal={() => setIsSearchModalOpen(true)} />
      
      <main className="flex-grow flex flex-col">
        <BlockStorybook
          onOpenSearchModal={() => setIsSearchModalOpen(true)}
          onOpenArticleModal={(article) => setSelectedArticle(article)}
        />
      </main>

      {/* Global Interactive Mandate Search Modal */}
      <InitiateSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      {/* Global Article Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenSearchModal={() => {
          setSelectedArticle(null);
          setIsSearchModalOpen(true);
        }}
      />
    </div>
  );
}
