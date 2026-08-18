import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

export interface InsightCardProps {
  category: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  keyTakeaways?: string[];
  author?: {
    name: string;
    title: string;
  };
  onClick?: () => void;
  className?: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  category,
  readTime,
  date,
  title,
  excerpt,
  keyTakeaways,
  author,
  onClick,
  className = '',
}) => {
  return (
    <article
      onClick={onClick}
      className={`group relative bg-white border border-steel-300 p-6 sm:p-7 flex flex-col justify-between hover:border-navy-800 transition-all duration-200 cursor-pointer rounded-sm ${className}`}
    >
      <div>
        {/* Meta Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-steel-200 text-xs">
          <span className="font-sans text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 border border-teal-100">
            {category}
          </span>
          <div className="flex items-center gap-3 text-steel-500 font-sans text-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-steel-400" />
              {readTime}
            </span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>

        {/* Headline */}
        <h3 className="font-display text-lg sm:text-xl font-bold text-navy-900 group-hover:text-teal-700 transition-colors tracking-tight leading-snug mb-3">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-steel-700 leading-relaxed mb-4">
          {excerpt}
        </p>

        {/* Optional Bulleted Takeaways */}
        {keyTakeaways && keyTakeaways.length > 0 && (
          <div className="mb-4 p-3 bg-steel-50 border-l-2 border-teal-600">
            <span className="font-sans text-xs text-steel-600 font-semibold block mb-1.5">
              Key Strategic Takeaways:
            </span>
            <ul className="space-y-1 text-xs text-navy-900 list-disc list-inside">
              {keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="leading-tight text-steel-700">
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer / Author & Read Action */}
      <div className="pt-4 border-t border-steel-200 flex items-center justify-between mt-4">
        {author ? (
          <div>
            <div className="text-xs font-semibold text-navy-900">{author.name}</div>
            <div className="text-[10px] font-mono text-steel-500 uppercase">{author.title}</div>
          </div>
        ) : (
          <span className="font-sans text-xs text-steel-500">
            MGH Research Desk
          </span>
        )}

        <div className="inline-flex items-center gap-1 text-xs font-sans text-navy-900 group-hover:text-teal-600 font-semibold transition-colors">
          <span>Read briefing</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
};
