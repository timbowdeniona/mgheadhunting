import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';

export interface InsightCardProps {
  category: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  keyTakeaways?: string[];
  coverImage?: string;
  coverImageAlt?: string;
  href?: string;
  author?: {
    name: string;
    title: string;
  };
  onClick?: () => void;
  className?: string;
  variant?: 'standard' | 'compact' | 'featured';
}

export const InsightCard: React.FC<InsightCardProps> = ({
  category,
  readTime,
  date,
  title,
  excerpt,
  keyTakeaways,
  coverImage,
  coverImageAlt,
  href,
  author,
  onClick,
  className = '',
  variant = 'standard',
}) => {
  const cardContent = (
    <article
      onClick={onClick}
      className={`group relative bg-white border border-steel-300 flex flex-col justify-between hover:border-navy-800 hover:shadow-md transition-all duration-200 cursor-pointer rounded-none overflow-hidden ${className}`}
    >
      {/* Optional Cover Image */}
      {coverImage && (
        <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-steel-100 border-b border-steel-200">
          <Image
            src={coverImage.startsWith('//') ? `https:${coverImage}` : coverImage}
            alt={coverImageAlt || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-transparent transition-colors duration-300" />
          <div className="absolute top-3 left-3">
            <span className="font-sans text-[11px] font-semibold text-navy-900 bg-white/95 backdrop-blur-sm px-2.5 py-1 shadow-sm border border-steel-200/80 uppercase tracking-wider">
              {category}
            </span>
          </div>
        </div>
      )}

      <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between">
        <div>
          {/* Meta Header if no cover image */}
          {!coverImage && (
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-steel-200 text-xs">
              <span className="font-sans text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 border border-teal-200">
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
          )}

          {/* Date & Read Time strip if cover image is present */}
          {coverImage && (
            <div className="flex items-center gap-3 text-steel-500 font-sans text-xs mb-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-steel-400" />
                {readTime}
              </span>
              <span>•</span>
              <span>{date}</span>
            </div>
          )}

          {/* Headline */}
          <h3 className="font-display text-lg sm:text-xl font-bold text-navy-900 group-hover:text-teal-700 transition-colors tracking-tight leading-snug mb-3">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-steel-700 leading-relaxed mb-4 line-clamp-3">
            {excerpt}
          </p>

          {/* Optional Bulleted Takeaways */}
          {keyTakeaways && keyTakeaways.length > 0 && variant !== 'compact' && (
            <div className="mb-4 p-3 bg-steel-50 border-l-2 border-teal-600">
              <span className="font-sans text-[11px] text-navy-800 font-semibold block mb-1 uppercase tracking-wide">
                Key Strategic Takeaways:
              </span>
              <ul className="space-y-1 text-xs text-steel-700 list-disc list-inside">
                {keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                  <li key={idx} className="leading-tight">
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
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};
