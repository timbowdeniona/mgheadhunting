import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, ArrowRight } from 'lucide-react';
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
  { label: 'The MGH Difference', href: '#difference' },
  { label: 'Search Process', href: '#process' },
  { label: 'Market Intelligence', href: '#insights' },
  { label: 'About Mark Goldsmith', href: '#about' },
  { label: 'Contact', href: '#contact' },
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = navLinks && navLinks.length > 0 ? navLinks : defaultNavLinks;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-steel-300 shadow-sm py-2.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-steel-200 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo container - Responsive Dual State (Monogram on mobile, Wordmark on desktop) */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
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
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-sm font-sans tracking-normal text-navy-900 hover:text-teal-600 font-medium transition-colors relative group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-teal-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-150" />
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 text-xs font-sans text-steel-600 border-r border-steel-300 pr-4">
              <a
                href={`mailto:${directEmail}`}
                className="flex items-center gap-1.5 hover:text-navy-900 transition-colors"
                title="Direct partner email"
              >
                <Mail className="w-4 h-4 text-teal-600" />
              </a>
            </div>

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
              className="lg:hidden p-2 text-navy-900 hover:text-teal-600 hover:bg-steel-100 border border-steel-300 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-steel-300 px-4 pt-3 pb-6 space-y-3 mt-2 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-1 gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-2 text-sm font-sans tracking-normal text-navy-900 hover:bg-steel-100 font-medium"
              >
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-steel-200 flex flex-col gap-2">
            <a
              href={`mailto:${directEmail}`}
              className="flex items-center gap-2 text-sm text-steel-700 py-1 font-sans"
            >
              <Mail className="w-4 h-4 text-teal-600" />
              <span>{directEmail}</span>
            </a>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => {
                setMobileMenuOpen(false);
                onInitiateSearch();
              }}
            >
              Initiate Search Mandate
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
