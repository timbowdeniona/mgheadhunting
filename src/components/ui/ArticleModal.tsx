import React from 'react';
import Link from 'next/link';
import { X, Calendar, Clock, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';
import { RichTextRenderer } from './RichTextRenderer';
import { InsightArticleFields } from '../../lib/contentful/types';
import { trackCtaClick } from '../../lib/analytics';

export interface ArticleModalProps {
  article: InsightArticleFields | null;
  isOpen: boolean;
  onClose: () => void;
  onInitiateSearch: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  onInitiateSearch,
}) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      <div className="relative bg-white border border-steel-300 w-full max-w-3xl shadow-2xl overflow-hidden my-8 rounded-lg">
        
        {/* Top Blueprint Accent Bar */}
        <div className="h-1 bg-teal-600 w-full" />

        {/* Modal Header */}
        <div className="bg-canvas-light px-6 py-4 border-b border-steel-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="teal" size="sm" dot>
              {article.category}
            </Badge>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-steel-400 hover:text-navy-900 hover:bg-steel-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* Article Title */}
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900 leading-tight tracking-tight">
            {article.title}
          </h2>

          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-steel-600 border-y border-steel-200 py-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              <span>{article.publishedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-teal-600" />
              <span>{article.author?.fields?.name || 'Mark Goldsmith'}</span>
            </div>
          </div>

          {/* Executive Summary / Excerpt */}
          <div className="p-4 bg-steel-50 border-l-2 border-teal-600 text-sm text-navy-900 leading-relaxed font-sans">
            <strong className="block font-sans text-sm tracking-wide text-teal-700 font-bold mb-1">
              Executive Summary
            </strong>
            {article.excerpt}
          </div>

          {/* Key Findings / Takeaways */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-sans text-sm font-bold tracking-wide text-navy-900">
                Key Strategic Takeaways:
              </h4>
              <div className="space-y-1.5">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-steel-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rich Text Body Content */}
          {article.body ? (
            <RichTextRenderer document={article.body} />
          ) : (
            <div className="text-sm text-steel-700 leading-relaxed space-y-4 pt-2 border-t border-steel-200">
              <p>
                In an increasingly complex macroeconomic environment, leadership succession within the Building Products and Built Environment supply chain requires a proactive, highly calibrated search methodology.
              </p>
              <p>
                To request the complete unredacted benchmarking data or schedule a confidential advisory consultation with Mark Goldsmith, please contact our practice desk.
              </p>
            </div>
          )}

          {/* Author Card */}
          <div className="mt-8 p-4 bg-navy-900 text-white border border-navy-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="font-sans text-xs tracking-wide text-teal-400 font-medium">
                Briefing Author
              </div>
              <div className="font-display text-base font-bold text-white">
                {article.author?.fields?.name || 'Mark Goldsmith'}
              </div>
              <div className="text-xs text-steel-300 font-sans">
                {article.author?.fields?.roleTitle || 'Managing Director & Lead Search Partner'}
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                trackCtaClick('Discuss Mandate', 'article_modal_author_card', `/insights/${article.slug}`);
                onClose();
                onInitiateSearch();
              }}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Discuss Mandate
            </Button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-canvas-light px-6 py-3 border-t border-steel-200 flex items-center justify-between">
          <Link
            href={`/insights/${article.slug}`}
            className="text-xs font-sans text-teal-800 hover:text-navy-900 font-semibold inline-flex items-center gap-1.5"
            onClick={() => {
              trackCtaClick('Open Dedicated Briefing Page', 'article_modal_footer', `/insights/${article.slug}`);
              onClose();
            }}
          >
            <span>Open Dedicated Briefing Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

      </div>
    </div>
  );
};
