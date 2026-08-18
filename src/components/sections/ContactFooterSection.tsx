import React, { useState } from 'react';
import Link from 'next/link';
import { Wordmark } from '../brand/Wordmark';
import { Button } from '../ui/Button';
import { Mail, Shield, Lock, Check, Clock } from 'lucide-react';
import { ContactFooterSectionData } from '../../lib/contentful/types';
import { fallbackContactFooterData } from '../../lib/contentful/fallbacks';

export interface ContactFooterSectionProps {
  data?: ContactFooterSectionData;
  onInitiateSearch: () => void;
}

export const ContactFooterSection: React.FC<ContactFooterSectionProps> = ({
  data = fallbackContactFooterData,
  onInitiateSearch,
}) => {
  const footer = data || fallbackContactFooterData;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(footer.directDeskEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer id="contact" className="bg-navy-950 text-white border-t border-navy-800 relative overflow-hidden">
      {/* Main Executive Contact Hub */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        
        {/* Top Engagement Bar */}
        <div className="bg-navy-900 border border-navy-700 p-8 sm:p-12 mb-16 relative">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-teal-500" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs tracking-wide text-teal-400 font-semibold">
                  {footer.bannerOverline}
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {footer.bannerTitle}
              </h2>
              <p className="text-sm text-steel-300 max-w-2xl leading-relaxed">
                {footer.bannerSubtitle}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={onInitiateSearch}
                fullWidth
              >
                {footer.bannerCtaText}
              </Button>
              
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-navy-800 hover:bg-navy-700 border border-steel-400/30 text-xs font-sans tracking-wider text-steel-200 hover:text-white transition-colors"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-teal-400" /> : <Mail className="w-4 h-4 text-teal-400" />}
                <span>{copiedEmail ? 'Email Copied' : 'Copy Direct Email'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modular Slot: Past Placements & Restrictive Covenant Statement */}
        <div className="p-6 bg-navy-900/60 border border-navy-800 mb-16">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-sans text-xs text-steel-400 font-semibold uppercase tracking-wide">
                {footer.ndaTitle}
              </div>
              <p className="text-xs text-steel-300 leading-relaxed">
                {footer.ndaStatement}
              </p>
            </div>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-navy-800">
          
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <Wordmark variant="light" size="sm" showSubtitle />
            <p className="text-xs text-steel-400 leading-relaxed">
              {footer.siteDescription}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={footer.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center bg-navy-800 hover:bg-teal-600 text-steel-300 hover:text-white border border-navy-700 transition-colors"
                aria-label="MG Headhunting LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href={`mailto:${footer.directDeskEmail}`}
                className="w-8 h-8 flex items-center justify-center bg-navy-800 hover:bg-teal-600 text-steel-300 hover:text-white border border-navy-700 transition-colors"
                aria-label="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Sector Matrix */}
          <div className="space-y-3">
            <div className="font-sans text-xs text-steel-400 font-semibold uppercase tracking-wide pb-1 border-b border-navy-800">
              Practice Specialisms
            </div>
            <ul className="space-y-2 text-xs text-steel-300">
              {footer.footerSpecialisms.map((spec, idx) => (
                <li key={idx}>
                  <a href="#specialisms" className="hover:text-teal-400 transition-colors">
                    {spec}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Sub-Sectors */}
          <div className="space-y-3">
            <div className="font-sans text-xs text-steel-400 font-semibold uppercase tracking-wide pb-1 border-b border-navy-800">
              Built Environment Sectors
            </div>
            <ul className="space-y-2 text-xs text-steel-300">
              {footer.footerSubSectors.map((sub, idx) => (
                <li key={idx}>{sub}</li>
              ))}
            </ul>
          </div>

          {/* Col 4: Direct Desk & Compliance */}
          <div className="space-y-3">
            <div className="font-sans text-xs text-steel-400 font-semibold uppercase tracking-wide pb-1 border-b border-navy-800">
              Direct Practice Desk
            </div>
            <div className="space-y-2 text-xs text-steel-300 font-sans">
              <div>
                <span className="text-steel-400 block text-[11px]">Practice Leader</span>
                <span className="text-white font-bold">Mark Goldsmith</span>
              </div>
              <div>
                <span className="text-steel-400 block text-[11px]">Direct Mandate Email</span>
                <a href={`mailto:${footer.directDeskEmail}`} className="text-teal-300 hover:underline">
                  {footer.directDeskEmail}
                </a>
              </div>
              <div>
                <span className="text-steel-400 block text-[11px]">Headquarters</span>
                <span>{footer.headquarters}</span>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-steel-400 text-[11px]">
                <Clock className="w-3 h-3 text-teal-400" />
                <span>{footer.responseGuarantee}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory & GDPR Compliance Statement */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-steel-400 font-sans">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              {footer.complianceNotice}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span>{footer.copyright}</span>
            <Link href="/design-system" className="hover:text-teal-400 transition-colors">
              Design System
            </Link>
            <a href="#about" className="hover:text-teal-400 transition-colors">Privacy &amp; Data Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
