'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Radio, EyeOff, CheckCircle2, ChevronRight, X } from 'lucide-react';

export interface DraftModeBarProps {
  isEnabled: boolean;
}

export const DraftModeBar: React.FC<DraftModeBarProps> = ({ isEnabled }) => {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isEnabled) return null;

  const exitUrl = `/api/disable-draft?redirect=${encodeURIComponent(pathname || '/')}`;

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-navy-950/90 border border-teal-500/40 text-teal-400 px-3 py-1.5 rounded-full shadow-2xl backdrop-blur-md text-xs font-mono tracking-wide hover:border-teal-400 transition-all hover:scale-105"
        title="Show Live Preview Controls"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
        </span>
        Live Preview Active
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[92vw] sm:max-w-xl">
      <div className="bg-navy-950/95 border border-teal-500/50 shadow-2xl shadow-navy-950/80 rounded-2xl p-3 sm:px-4 sm:py-2.5 backdrop-blur-md flex items-center justify-between gap-3 text-white">
        
        {/* Status indicator & context */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-mono font-semibold text-teal-400">
                Contentful Live Preview
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-teal-950/80 text-teal-300 border border-teal-800/40">
                Draft Mode
              </span>
            </div>
            <p className="text-xs text-steel-300 truncate hidden sm:block">
              Side-by-side real-time edits & unpublished content enabled.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={exitUrl}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-200 bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/30 border border-white/10 transition-all"
            title="Exit Draft Mode and view published content"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Exit Preview</span>
          </a>

          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded-md text-steel-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Minimize preview badge"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
