'use client';

import React from 'react';
import { ContactDeskBlockData } from '../../lib/contentful/types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SectionDivider } from '../ui/SectionDivider';
import { Mail, Phone, MapPin, ShieldCheck, Lock } from 'lucide-react';

export interface ContactDeskBlockProps {
  data: ContactDeskBlockData;
  onInitiateSearch: () => void;
}

export const ContactDeskBlock: React.FC<ContactDeskBlockProps> = ({
  data,
  onInitiateSearch,
}) => {
  return (
    <section className="py-20 bg-white border-b border-steel-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct Desk Information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="navy" size="sm">
                {data.sectionLabel || 'DIRECT DESK'}
              </Badge>
              <Badge variant="teal" size="sm" dot>
                STRICTLY CONFIDENTIAL
              </Badge>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900 uppercase tracking-tight">
              {data.title || 'Engage Mark Goldsmith Directly'}
            </h2>

            <p className="text-base text-steel-600 font-light leading-relaxed">
              {data.description ||
                'For confidential Board, C-Suite, or Managing Director retained search inquiries across the UK and European Building Products market.'}
            </p>

            <SectionDivider align="left" tealAccent />

            <div className="space-y-4 pt-2">
              {data.email && (
                <div className="flex items-start gap-4 p-4 bg-canvas-light border border-steel-200">
                  <div className="w-10 h-10 bg-navy-900 text-white flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-teal-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-steel-500 block">
                      Direct Partner Email
                    </span>
                    <a
                      href={`mailto:${data.email}`}
                      className="font-display text-base font-bold text-navy-900 hover:text-teal-700 transition-colors"
                    >
                      {data.email}
                    </a>
                  </div>
                </div>
              )}

              {data.phone && (
                <div className="flex items-start gap-4 p-4 bg-canvas-light border border-steel-200">
                  <div className="w-10 h-10 bg-navy-900 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-teal-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-steel-500 block">
                      Direct Office Telephone
                    </span>
                    <a
                      href={`tel:${data.phone}`}
                      className="font-display text-base font-bold text-navy-900 hover:text-teal-700 transition-colors"
                    >
                      {data.phone}
                    </a>
                  </div>
                </div>
              )}

              {data.headquarters && (
                <div className="flex items-start gap-4 p-4 bg-canvas-light border border-steel-200">
                  <div className="w-10 h-10 bg-navy-900 text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-teal-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-steel-500 block">
                      Headquarters &amp; Jurisdiction
                    </span>
                    <span className="font-display text-sm font-bold text-navy-900">
                      {data.headquarters}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Consultation Intake Card */}
          <div className="lg:col-span-6 p-8 bg-navy-900 text-white border border-navy-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-navy-800">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-400" />
                <span className="font-mono text-xs text-teal-400 uppercase tracking-wider">
                  ENCRYPTED MANDATE INTAKE
                </span>
              </div>
              <span className="text-[10px] font-mono text-steel-400">
                REF // EXEC-INTAKE
              </span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold uppercase">
              Schedule a Strategic Consultation
            </h3>

            <p className="text-xs sm:text-sm text-steel-300 font-light leading-relaxed">
              Launch our confidential retained search intake dialog to outline your role specification, target candidate profile, timeline, and search requirements.
            </p>

            <div className="p-4 bg-navy-800/80 border border-navy-700 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Strict Non-Disclosure Guarantee</span>
              </div>
              <p className="text-[11px] text-steel-400 leading-relaxed font-light">
                {data.ndaNotice ||
                  'All initial inquiries and strategic mandates are handled under strict partner-level non-disclosure with ICO-registered compliance.'}
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={onInitiateSearch}
              className="w-full justify-center"
            >
              Launch Retained Search Intake
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
};
