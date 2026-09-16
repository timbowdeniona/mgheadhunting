'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, CheckCircle2, Mail, Phone } from 'lucide-react';
import { HeaderNav } from '../../components/sections/HeaderNav';
import { ContactFooterSection } from '../../components/sections/ContactFooterSection';
import { InitiateSearchModal } from '../../components/ui/InitiateSearchModal';
import { fallbackSiteSettings, fallbackContactFooterData } from '../../lib/contentful/fallbacks';

export function PrivacyClient() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas-light text-navy-900 font-sans flex flex-col selection:bg-teal-600 selection:text-white">
      {/* Header */}
      <HeaderNav
        navLinks={fallbackSiteSettings.navLinks}
        directEmail={fallbackSiteSettings.primaryEmail}
        siteName={fallbackSiteSettings.siteName}
        tagline={fallbackSiteSettings.tagline}
        onInitiateSearch={() => setIsSearchModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-teal-800 hover:text-navy-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Executive Desk</span>
            </Link>
          </div>

          {/* Hero Header */}
          <div className="bg-navy-950 text-white p-8 sm:p-12 border border-navy-800 relative overflow-hidden mb-12 shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-teal-500" />
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-teal-400" />
              <span className="font-sans text-xs text-teal-400 font-semibold tracking-widest uppercase">
                UK GDPR &amp; ICO Governance
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Privacy &amp; Data Protection Policy
            </h1>
            <p className="text-sm sm:text-base text-steel-300 leading-relaxed max-w-2xl font-sans">
              Strict Non-Disclosure Protocols, Executive Discretion, and Rigorous Candidate Data Governance for Retained Executive Search.
            </p>
            <div className="mt-6 pt-6 border-t border-navy-800 flex flex-wrap items-center gap-6 text-xs text-steel-400 font-sans">
              <div>
                <span className="text-steel-500">Effective Date:</span>{' '}
                <span className="text-white font-medium">September 2026</span>
              </div>
              <div>
                <span className="text-steel-500">Practice Leader:</span>{' '}
                <span className="text-white font-medium">Mark Goldsmith</span>
              </div>
              <div>
                <span className="text-steel-500">Jurisdiction:</span>{' '}
                <span className="text-white font-medium">United Kingdom &amp; EU</span>
              </div>
            </div>
          </div>

          {/* Policy Body */}
          <div className="bg-white border border-steel-300 p-8 sm:p-12 shadow-sm space-y-10 text-steel-800 font-sans leading-relaxed text-sm sm:text-base">
            
            {/* 1. Introduction */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
                <span className="w-7 h-7 bg-steel-100 border border-steel-300 rounded-none flex items-center justify-center text-xs font-mono font-bold text-teal-700">
                  01
                </span>
                <span>Data Controller &amp; Practice Commitment</span>
              </h2>
              <p>
                MG Headhunting Ltd (&ldquo;MGH&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), led by Managing Director Mark Goldsmith, operates as a boutique retained executive search firm specializing in Board, Managing Director, and C-suite appointments across the UK and European Building Products and Built Environment sectors.
              </p>
              <p>
                We are committed to maintaining the highest standards of data protection, executive confidentiality, and integrity. MGH operates in full compliance with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018 (DPA 2018), and is formally registered with the UK Information Commissioner&rsquo;s Office (ICO).
              </p>
            </section>

            {/* 2. Retained Executive Search Model */}
            <section className="space-y-3 pt-6 border-t border-steel-200">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
                <span className="w-7 h-7 bg-steel-100 border border-steel-300 rounded-none flex items-center justify-center text-xs font-mono font-bold text-teal-700">
                  02
                </span>
                <span>Bilateral NDA &amp; Candidate Discretion Protocol</span>
              </h2>
              <p>
                Unlike transactional recruitment agencies, MG Headhunting operates exclusively on a retained search basis:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 bg-canvas-light border border-steel-200 space-y-1">
                  <div className="flex items-center gap-2 text-navy-900 font-bold text-xs uppercase tracking-wide">
                    <Lock className="w-4 h-4 text-teal-600" />
                    <span>Zero CV Circulation</span>
                  </div>
                  <p className="text-xs text-steel-700">
                    We never circulate, broadcast, or transmit candidate profiles, CVs, or identifying information to third parties without prior express bilateral consent.
                  </p>
                </div>
                <div className="p-4 bg-canvas-light border border-steel-200 space-y-1">
                  <div className="flex items-center gap-2 text-navy-900 font-bold text-xs uppercase tracking-wide">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>Confidential Calibration</span>
                  </div>
                  <p className="text-xs text-steel-700">
                    Client references, confidential restructurings, and candidate benchmarks are shared selectively only with pre-verified principals under bilateral non-disclosure agreements.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Lawful Basis for Processing */}
            <section className="space-y-3 pt-6 border-t border-steel-200">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
                <span className="w-7 h-7 bg-steel-100 border border-steel-300 rounded-none flex items-center justify-center text-xs font-mono font-bold text-teal-700">
                  03
                </span>
                <span>Lawful Basis for Processing</span>
              </h2>
              <p>
                We process personal information under the following lawful bases recognized by Article 6 of the UK GDPR:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-steel-700">
                <li>
                  <strong className="text-navy-900">Legitimate Interests (Article 6(1)(f)):</strong> Processing is necessary for our legitimate commercial interests in providing bespoke retained executive search services to corporate clients, evaluating candidate suitability for board-level leadership roles, and maintaining professional market mapping intelligence across the built environment sector.
                </li>
                <li>
                  <strong className="text-navy-900">Consent (Article 6(1)(a)):</strong> We obtain your explicit consent prior to submitting your formal candidacy dossier to a hiring client board or commissioning confidential referencing checks.
                </li>
                <li>
                  <strong className="text-navy-900">Contractual Necessity (Article 6(1)(b)):</strong> To execute search mandates agreed with corporate clients, sponsors, or institutional investors.
                </li>
              </ul>
            </section>

            {/* 4. Information We Collect */}
            <section className="space-y-3 pt-6 border-t border-steel-200">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
                <span className="w-7 h-7 bg-steel-100 border border-steel-300 rounded-none flex items-center justify-center text-xs font-mono font-bold text-teal-700">
                  04
                </span>
                <span>Categories of Data Collected</span>
              </h2>
              <p>
                During the execution of executive search mandates and industry research, we may collect and process:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-steel-700">
                <li>Professional identity details (full name, current and historic executive titles, corporate board history).</li>
                <li>Direct contact information (executive telephone number, business and personal email address, professional LinkedIn URL).</li>
                <li>Career credentials (employment history, verified commercial track record, qualifications, P&amp;L scale managed).</li>
                <li>Remuneration parameters (base salary, LTIP, bonus structure, co-investment expectations — collected solely under strict confidentiality).</li>
                <li>Third-party boardroom referencing and peer appraisals (obtained strictly with candidate pre-authorization).</li>
              </ul>
            </section>

            {/* 5. Retention & Security */}
            <section className="space-y-3 pt-6 border-t border-steel-200">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
                <span className="w-7 h-7 bg-steel-100 border border-steel-300 rounded-none flex items-center justify-center text-xs font-mono font-bold text-teal-700">
                  05
                </span>
                <span>Data Retention &amp; Cybersecurity</span>
              </h2>
              <p>
                We retain candidate data only for as long as necessary to fulfill the purposes of executive search engagement, regulatory compliance, and post-placement 12-month assurance warranties. Inactive candidate records undergo structured biennial reviews.
              </p>
              <p>
                All executive data is secured using enterprise-grade encryption in transit (TLS 1.3) and at rest (AES-256), multi-factor authentication, and strict access controls restricted exclusively to authorized partners.
              </p>
            </section>

            {/* 6. Individual Rights */}
            <section className="space-y-3 pt-6 border-t border-steel-200">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
                <span className="w-7 h-7 bg-steel-100 border border-steel-300 rounded-none flex items-center justify-center text-xs font-mono font-bold text-teal-700">
                  06
                </span>
                <span>Your Individual Rights Under UK GDPR</span>
              </h2>
              <p>
                Under UK data protection law, you have specific enforceable rights regarding your personal information:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 bg-steel-50 border border-steel-200">
                  <strong className="text-navy-900 block mb-1">Right of Access (SAR)</strong>
                  You may request a copy of the personal information we hold concerning you.
                </div>
                <div className="p-3 bg-steel-50 border border-steel-200">
                  <strong className="text-navy-900 block mb-1">Right to Rectification</strong>
                  You may require us to correct any inaccurate or incomplete records.
                </div>
                <div className="p-3 bg-steel-50 border border-steel-200">
                  <strong className="text-navy-900 block mb-1">Right to Erasure</strong>
                  You may request the deletion of your personal records from our executive talent pool.
                </div>
                <div className="p-3 bg-steel-50 border border-steel-200">
                  <strong className="text-navy-900 block mb-1">Right to Object &amp; Restrict</strong>
                  You may object at any time to the processing of your data for talent mapping purposes.
                </div>
              </div>
            </section>

            {/* 7. Contact Desk */}
            <section className="space-y-3 pt-6 border-t border-steel-200">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
                <span className="w-7 h-7 bg-steel-100 border border-steel-300 rounded-none flex items-center justify-center text-xs font-mono font-bold text-teal-700">
                  07
                </span>
                <span>Data Protection Officer &amp; Inquiries</span>
              </h2>
              <p>
                To exercise any of your statutory rights, update your professional records, or submit a data privacy inquiry, please contact our Lead Practice Partner directly:
              </p>
              
              <div className="p-4 bg-canvas-light border border-steel-300 space-y-2 text-xs font-sans">
                <div className="font-display text-base font-bold text-navy-900">
                  Mark Goldsmith &mdash; Managing Director
                </div>
                <div className="text-steel-600">
                  MG Headhunting Ltd | London &amp; Home Counties, United Kingdom
                </div>
                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <a href="tel:07570740490" className="inline-flex items-center gap-1.5 text-teal-800 hover:underline font-semibold">
                    <Phone className="w-3.5 h-3.5" />
                    <span>07570 740490</span>
                  </a>
                  <a href="mailto:mgoldsmith@mgheadhunting.co.uk" className="inline-flex items-center gap-1.5 text-teal-800 hover:underline font-semibold">
                    <Mail className="w-3.5 h-3.5" />
                    <span>mgoldsmith@mgheadhunting.co.uk</span>
                  </a>
                </div>
              </div>

              <p className="text-xs text-steel-500 pt-2">
                If you are not satisfied with our response or believe our processing does not comply with UK data protection laws, you have the right to lodge a complaint with the UK Information Commissioner&rsquo;s Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline">ico.org.uk</a>.
              </p>
            </section>

          </div>

        </div>
      </main>

      {/* Footer */}
      <ContactFooterSection
        data={fallbackContactFooterData}
        onInitiateSearch={() => setIsSearchModalOpen(true)}
      />

      {/* Intake Modal */}
      <InitiateSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  );
}
