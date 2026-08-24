import React from 'react';
import Image from 'next/image';
import { contentfulImageLoader, normalizeImageUrl } from '../../lib/contentful/imageLoader';

export interface WordmarkProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  customLogoUrl?: string;
  customLogoAlt?: string;
}

export const Wordmark: React.FC<WordmarkProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  className = '',
  customLogoUrl,
  customLogoAlt = 'MG Headhunting Logo',
}) => {
  const isLight = variant === 'light';

  // If custom logo image is provided from CMS, render it
  if (customLogoUrl) {
    const heightMap = {
      sm: 'h-7 sm:h-8 max-w-[200px]',
      md: 'h-9 sm:h-10 max-w-[260px]',
      lg: 'h-12 sm:h-14 max-w-[340px]',
    };

    const normalized = normalizeImageUrl(customLogoUrl);

    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={normalized}
          alt={customLogoAlt}
          className={`${heightMap[size]} w-auto object-contain`}
        />
      </div>
    );
  }

  const sizeClasses = {
    sm: {
      mg: 'text-base tracking-[0.16em]',
      headhunting: 'text-[9px] tracking-[0.24em]',
      gap: 'gap-0.5',
      rule: 'h-[1.5px] my-1',
    },
    md: {
      mg: 'text-lg sm:text-xl tracking-[0.18em]',
      headhunting: 'text-[10px] sm:text-[11px] tracking-[0.28em]',
      gap: 'gap-1',
      rule: 'h-[2px] my-1.5',
    },
    lg: {
      mg: 'text-2xl sm:text-3xl tracking-[0.2em]',
      headhunting: 'text-xs sm:text-sm tracking-[0.32em]',
      gap: 'gap-1.5',
      rule: 'h-[2.5px] my-2',
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      {/* Top Main Title: MG HEADHUNTING */}
      <div className="flex items-baseline gap-2">
        <span
          className={`font-display font-bold uppercase ${currentSize.mg} ${
            isLight ? 'text-white' : 'text-navy-900'
          }`}
        >
          MG <span className="font-semibold">HEADHUNTING</span>
        </span>
      </div>

      {/* Signature Fine Teal Rule Divider */}
      <div className={`w-full bg-teal-600 ${currentSize.rule}`} />

      {/* Subtitle: Executive Search • Building Products */}
      {showSubtitle && (
        <div className="flex items-center justify-between">
          <span
            className={`font-display uppercase font-medium ${currentSize.headhunting} ${
              isLight ? 'text-steel-300' : 'text-steel-600'
            }`}
          >
            Executive Search
          </span>
          <span className="w-1 h-1 bg-teal-600 rounded-none shrink-0 mx-1.5" />
          <span
            className={`font-display uppercase font-medium ${currentSize.headhunting} ${
              isLight ? 'text-steel-300' : 'text-steel-600'
            }`}
          >
            Building Products
          </span>
        </div>
      )}
    </div>
  );
};
