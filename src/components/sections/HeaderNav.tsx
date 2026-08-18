import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Mail, ArrowRight, ChevronRight } from 'lucide-react';
import { Wordmark } from '../brand/Wordmark';
import { Monogram } from '../brand/Monogram';
import { Button } from '../ui/Button';
import { NavigationItem } from '../../lib/contentful/types';

export interface HeaderNavProps {
  navLinks?: NavigationItem[];
  directEmail?: string;
  siteName?: string;
  tagline?: string;
  onInitiateSearch: () => void;
}

const defaultNavLinks: NavigationItem[] = [
  { label: 'Specialisms', href: '#specialisms' },
  { label: 'The Difference', href: '#difference' },
  { label: 'Search Process', href: '#process' },
  { label: 'Market Intelligence', href: '/insights' },
  { label: 'About', href: '#about' },
];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  navLinks = defaultNavLinks,
  directEmail = 'mgoldsmith@mgheadhunting.co.uk',
  siteName = 'MG Headhunting',
  tagline = 'Building Products',
  onInitiateSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = navLinks && navLinks.length > 0 ? navLinks : defaultNavLinks;

  // Resolve href for anchor links when not on root page
  const resolveHref = (href: string) => {
    if (href.startsWith('#') && pathname && pathname !== '/') {
      return `/${href}`;
    }
    return href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-steel-300 shadow-sm py-2.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-steel-200 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo container - Responsive Dual State (Monogram on mobile, Wordmark on desktop) */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none shrink-0">
            {/* Desktop Wordmark */}
            <div className="hidden sm:block">
              <Wordmark size={isScrolled ? 'sm' : 'md'} showSubtitle={!isScrolled} />
            </div>
            
            {/* Mobile / Small Screen Monogram */}
            <div className="sm:hidden flex items-center gap-2.5">
              <Monogram size="md" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xs uppercase tracking-wider text-navy-900 leading-tight">
                  {siteName}
                </span>
                <span className="font-sans text-[9px] text-teal-700 uppercase tracking-widest leading-none">
                  {tagline}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-4">
            {links.map((link) => {
              const targetHref = resolveHref(link.href);
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={targetHref}
                  className={`px-3 py-2 text-sm font-sans font-medium transition-colors relative group whitespace-nowrap ${
                    isActive
                      ? 'text-teal-700 font-semibold'
                      : 'text-navy-900 hover:text-teal-700'
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0.5 left-3 right-3 h-[2px] bg-teal-600 transition-transform origin-left duration-150 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA & Actions Area */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Direct Desk Email */}
            <a
              href={`mailto:${directEmail}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-sans text-steel-600 hover:text-navy-900 hover:bg-steel-100 transition-colors border border-transparent hover:border-steel-200"
              title={`Direct Mandate Desk: ${directEmail}`}
            >
              <Mail className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="hidden xl:inline font-medium">Direct Desk</span>
            </a>

            <span className="hidden sm:block h-4 w-px bg-steel-300" aria-hidden="true" />

            <Button
              variant="primary"
              size="md"
              onClick={onInitiateSearch}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Initiate Search
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-navy-900 hover:text-teal-700 hover:bg-steel-100 border border-steel-300 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-steel-300 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2">
          <div className="grid grid-cols-1 divide-y divide-steel-100">
            {links.map((link) => {
              const targetHref = resolveHref(link.href);
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={targetHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-3 px-2 text-sm font-sans font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50/60 text-teal-800 font-semibold pl-3 border-l-2 border-teal-600'
                      : 'text-navy-900 hover:bg-steel-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-steel-400'}`} />
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-steel-200 flex flex-col gap-3">
            <a
              href={`mailto:${directEmail}`}
              className="flex items-center gap-2 text-xs text-steel-700 bg-steel-50 border border-steel-200 px-3 py-2.5 font-sans hover:bg-steel-100 transition-colors"
            >
              <Mail className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="truncate">{directEmail}</span>
            </a>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => {
                setMobileMenuOpen(false);
                onInitiateSearch();
              }}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Initiate Search Mandate
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

