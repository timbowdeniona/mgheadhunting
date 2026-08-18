import React from 'react';
import Image from 'next/image';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { Document, BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

interface RichTextRendererProps {
  document?: Document;
  className?: string;
}

const renderOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong className="font-semibold text-navy-950">{text}</strong>,
    [MARKS.ITALIC]: (text) => <em className="italic text-steel-800">{text}</em>,
    [MARKS.CODE]: (text) => (
      <code className="font-mono text-xs bg-steel-100 text-teal-900 px-1.5 py-0.5 border border-steel-200">
        {text}
      </code>
    ),
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-10 mb-4 pb-2 border-b border-steel-200">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-900 tracking-tight mt-8 mb-3 pb-2 border-b border-steel-200">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="font-display text-lg font-bold text-navy-900 tracking-tight mt-6 mb-2">
        {children}
      </h3>
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="text-sm sm:text-base text-steel-700 leading-relaxed mb-5 font-normal">
        {children}
      </p>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc list-outside ml-5 space-y-2.5 mb-6 text-sm sm:text-base text-steel-700">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="list-decimal list-outside ml-5 space-y-2.5 mb-6 text-sm sm:text-base text-steel-700">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li className="leading-relaxed pl-1">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className="border-l-4 border-teal-600 pl-5 py-3 my-6 bg-steel-50 text-navy-900 italic text-sm sm:text-base font-sans leading-relaxed">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="border-t border-steel-300 my-8" />,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const asset = node.data?.target?.fields;
      if (!asset?.file?.url) return null;
      const imageUrl = asset.file.url.startsWith('//') ? `https:${asset.file.url}` : asset.file.url;
      const title = asset.title || 'Briefing Asset';
      return (
        <div className="my-8 overflow-hidden border border-steel-300 bg-steel-100">
          <div className="relative w-full h-64 sm:h-80 md:h-96">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
          {asset.description && (
            <div className="p-2.5 bg-steel-50 border-t border-steel-200 text-xs text-steel-500 font-sans italic text-center">
              {asset.description}
            </div>
          )}
        </div>
      );
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-teal-700 font-medium underline decoration-teal-500 underline-offset-2 hover:text-teal-900 transition-colors"
      >
        {children}
      </a>
    ),
  },
};

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({ document, className = '' }) => {
  if (!document) return null;
  return <div className={`rich-text-content ${className}`}>{documentToReactComponents(document, renderOptions)}</div>;
};
