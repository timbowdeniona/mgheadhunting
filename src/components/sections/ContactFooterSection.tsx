'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Wordmark } from '../brand/Wordmark';
import { Button } from '../ui/Button';
import { Mail, Shield, Lock, Check, Clock, Phone } from 'lucide-react';
import { ContactFooterSectionData } from '../../lib/contentful/types';
import { fallbackContactFooterData } from '../../lib/contentful/fallbacks';
import { trackDirectContact, trackCtaClick } from '../../lib/analytics';

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
  const bannerCta = footer.bannerCtaText || 'Start the Conversation';

  const handleCopyEmail = () => {
    trackDirectContact('email', footer.directDeskEmail, 'footer_copy_email');
    navigator.clipboard.writeText(footer.directDeskEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer id="contact" className="bg-navy-950 text-white border-t border-navy-800 relative overflow-hidden">
      {/* Main Executive Contact Hub */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        
        {/* Top Engagement Bar with Personal Seated Portrait */}
        <div className="bg-navy-900 border border-navy-700 p-6 sm:p-10 lg:p-12 mb-16 relative">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-teal-500" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Seated Portrait Card */}
            <div className="lg:col-span-4">
              <div className="relative aspect-[16/11] sm:aspect-[3/2] lg:aspect-[4/3] w-full overflow-hidden bg-navy-950 border border-navy-700 shadow-md group">
                <Image
                  src="/mark-goldsmith-seated.jpg"
                  alt="Mark Goldsmith - Lead Search Partner"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-sans text-teal-300 font-semibold uppercase tracking-wider block">
                    Practice Leader &amp; Founder
                  </span>
                  <span className="font-display text-base font-bold text-white">
                    Mark Goldsmith
                  </span>
                </div>
              </div>
            </div>

            {/* Engagement Text */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs tracking-wide text-teal-400 font-semibold uppercase">
                  {footer.bannerOverline}
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {footer.bannerTitle}
              </h2>
              <p className="text-xs sm:text-sm text-steel-300 leading-relaxed font-sans">
                {footer.bannerSubtitle}
              </p>

              {/* Direct Reach Strip */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-sans text-steel-300">
                <a
                  href="tel:07570740490"
                  onClick={() => trackDirectContact('phone', '07570 740490', 'footer_banner')}
                  className="inline-flex items-center gap-1.5 text-white hover:text-teal-300 font-medium transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  <span>07570 740490</span>
                </a>
                <span>•</span>
                <a
                  href={`mailto:${footer.directDeskEmail}`}
                  onClick={() => trackDirectContact('email', footer.directDeskEmail, 'footer_banner')}
                  className="inline-flex items-center gap-1.5 text-white hover:text-teal-300 font-medium transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-teal-400" />
                  <span>{footer.directDeskEmail}</span>
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="lg:col-span-3 flex flex-col gap-3 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  trackCtaClick(bannerCta, 'footer_banner');
                  onInitiateSearch();
                }}
                fullWidth
              >
                {bannerCta}
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
            <Wordmark
              variant="light"
              size="sm"
              showSubtitle
              customLogoUrl={footer.logoDarkUrl || footer.logoUrl}
              customLogoAlt={footer.logoDarkAlt || footer.logoAlt}
            />
            <p className="text-xs text-steel-400 leading-relaxed">
              {footer.siteDescription}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={footer.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDirectContact('linkedin', footer.linkedinUrl, 'footer_social')}
                className="w-8 h-8 flex items-center justify-center bg-navy-800 hover:bg-teal-600 text-steel-300 hover:text-white border border-navy-700 transition-colors"
                aria-label="MG Headhunting LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href={`mailto:${footer.directDeskEmail}`}
                onClick={() => trackDirectContact('email', footer.directDeskEmail, 'footer_icon')}
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
                <span className="text-steel-400 block text-[11px]">Direct Mobile</span>
                <a href="tel:07570740490" className="text-teal-300 hover:underline">
                  07570 740490
                </a>
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
            <Link href="/privacy" className="hover:text-teal-400 transition-colors">
              Privacy &amp; Data Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
