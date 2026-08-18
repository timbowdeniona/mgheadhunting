import React from 'react';
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
      <code className="font-mono text-xs bg-steel-100 text-teal-800 px-1.5 py-0.5 border border-steel-200">
        {text}
      </code>
    ),
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-8 mb-4">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-900 tracking-tight mt-6 mb-3 border-b border-steel-200 pb-2">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="font-display text-lg font-bold text-navy-900 tracking-tight mt-5 mb-2">
        {children}
      </h3>
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="text-sm sm:text-base text-steel-700 leading-relaxed mb-4 font-normal">
        {children}
      </p>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-sm text-steel-700 pl-2">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-sm text-steel-700 pl-2 font-mono">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li className="leading-relaxed">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className="border-l-2 border-teal-600 pl-4 py-2 my-4 bg-canvas-light text-navy-900 italic text-sm sm:text-base font-sans">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="border-t border-steel-300 my-6" />,
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-teal-700 underline decoration-teal-500 underline-offset-2 hover:text-teal-900 transition-colors"
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
