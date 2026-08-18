'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, Palette, Box, BookOpen, Layers, ExternalLink } from 'lucide-react';
import { Monogram } from '../brand/Monogram';

export interface DesignSystemNavProps {
  onOpenSearchModal?: () => void;
}

export const DesignSystemNav: React.FC<DesignSystemNavProps> = ({
  onOpenSearchModal,
}) => {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Overview Hub',
      href: '/design-system',
      icon: Layers,
      exact: true,
    },
    {
      label: 'Design Tokens',
      href: '/design-system/tokens',
      icon: Palette,
      exact: false,
    },
    {
      label: 'Component Kit',
      href: '/design-system/components',
      icon: Box,
      exact: false,
    },
    {
      label: 'Brand Identity',
      href: '/design-system/brand',
      icon: BookOpen,
      exact: false,
    },
  ];

  const isActive = (itemHref: string, exact: boolean) => {
    if (exact) {
      return pathname === itemHref;
    }
    return pathname.startsWith(itemHref);
  };

  return (
    <header className="bg-navy-950 text-white border-b border-navy-800 sticky top-0 z-40">
      {/* Top Banner / System Metadata */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-3 gap-3">
          
          {/* Brand & Breadcrumb */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-steel-400 hover:text-teal-400 transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Main Site</span>
            </Link>
            <span className="text-steel-700">|</span>
            <div className="flex items-center gap-2">
              <Monogram size="sm" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xs uppercase tracking-wider text-white">
                  MGH Design System
                </span>
                <span className="font-mono text-[9px] text-teal-400 tracking-widest uppercase">
                  v1.0.0 • Production Spec
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions / Main Site Links */}
          <div className="flex items-center gap-3">
            <Link
              href="/insights"
              className="hidden md:inline-flex items-center gap-1 text-xs text-steel-400 hover:text-white transition-colors"
            >
              <span>Market Intelligence</span>
              <ExternalLink className="w-3 h-3 text-steel-500" />
            </Link>
            {onOpenSearchModal && (
              <button
                onClick={onOpenSearchModal}
                className="px-2.5 py-1 text-[11px] font-sans font-semibold uppercase tracking-wider bg-teal-600 hover:bg-teal-500 text-white transition-colors"
              >
                Test Modal
              </button>
            )}
          </div>
        </div>

        {/* Sub-Route Navigation Tabs */}
        <div className="flex items-center space-x-1 border-t border-navy-900 pt-1 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-sans tracking-wider font-semibold border-b-2 whitespace-nowrap transition-all ${
                  active
                    ? 'border-teal-400 text-teal-300 bg-navy-900/60'
                    : 'border-transparent text-steel-400 hover:text-white hover:bg-navy-900/30'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-teal-400' : 'text-steel-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};
