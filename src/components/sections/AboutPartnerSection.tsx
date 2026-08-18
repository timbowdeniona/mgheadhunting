import React from 'react';
import { SectionDivider } from '../ui/SectionDivider';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { AboutPartnerSectionData } from '../../lib/contentful/types';
import { fallbackAboutPartnerData } from '../../lib/contentful/api';

export interface AboutPartnerSectionProps {
  data?: AboutPartnerSectionData;
  onInitiateSearch: () => void;
}

export const AboutPartnerSection: React.FC<AboutPartnerSectionProps> = ({
  data = fallbackAboutPartnerData,
  onInitiateSearch,
}) => {
  const about = data || fallbackAboutPartnerData;

  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-steel-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionDivider label={about.sectionLabel} tealAccent align="left" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Architectural Portrait Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-navy-900 border border-steel-300 p-6 text-white">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-navy-700">
                <span className="font-sans text-xs text-teal-400 font-semibold tracking-wide">
                  Founder &amp; Managing Director
                </span>
                <span className="font-sans text-xs text-steel-400">UK &amp; Europe</span>
              </div>

              {/* Graphical Monogram Header */}
              <div className="my-6 text-center py-6 bg-navy-950/80 border border-navy-800">
                <div className="font-display text-4xl font-extrabold tracking-wide text-white mb-1">
                  {about.partnerName}
                </div>
                <div className="h-[2px] w-24 bg-teal-500 mx-auto my-2" />
                <div className="font-sans text-xs text-steel-300 font-medium">
                  {about.partnerRole}
                </div>
              </div>

              <div className="space-y-2 text-xs font-sans text-steel-300 border-t border-navy-700 pt-4">
                <div className="flex justify-between">
                  <span className="text-steel-400">Practice Tenure:</span>
                  <span className="text-white font-semibold">{about.partnerPracticeTenure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel-400">Specialization:</span>
                  <span className="text-white font-semibold">{about.partnerSpecialization}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel-400">Placement Level:</span>
                  <span className="text-white font-semibold">{about.partnerPlacementLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel-400">Direct Desk:</span>
                  <a href={`mailto:${about.partnerEmail}`} className="text-teal-300 hover:underline">
                    {about.partnerEmail}
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-navy-700 flex items-center justify-between">
                <a
                  href={about.partnerLinkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-teal-300 hover:text-white transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Pedigree */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge variant="navy" size="md">{about.badge}</Badge>
              <Badge variant="steel" size="md">{about.badgeSecondary}</Badge>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
              {about.headline}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-steel-700 leading-relaxed font-sans">
              {about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-navy-900 font-medium">
              {about.credentialsChecklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 bg-steel-50 border border-steel-200">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button
                variant="primary"
                size="md"
                onClick={onInitiateSearch}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Schedule Confidential Consultation
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
