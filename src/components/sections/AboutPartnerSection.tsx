import React from 'react';
import { SectionDivider } from '../ui/SectionDivider';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export interface AboutPartnerSectionProps {
  onInitiateSearch: () => void;
}

export const AboutPartnerSection: React.FC<AboutPartnerSectionProps> = ({
  onInitiateSearch,
}) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-steel-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionDivider code="SECTION // 05" label="LEADERSHIP & PRACTICE ADVISORY" tealAccent align="left" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Architectural Portrait Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-navy-900 border border-steel-300 p-6 text-white">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal-500" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-teal-500" />
              
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-navy-700">
                <span className="font-mono text-xs text-teal-400 font-bold uppercase tracking-wider">
                  FOUNDER &amp; MANAGING DIRECTOR
                </span>
                <span className="font-mono text-[10px] text-steel-400">UK &amp; EUROPE</span>
              </div>

              {/* Graphical Monogram Header */}
              <div className="my-6 text-center py-6 bg-navy-950/80 border border-navy-800">
                <div className="font-display text-4xl font-extrabold tracking-widest text-white mb-1">
                  MARK GOLDSMITH
                </div>
                <div className="h-[2px] w-24 bg-teal-500 mx-auto my-2" />
                <div className="font-mono text-xs uppercase tracking-widest text-steel-300">
                  Head of Executive Search
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono text-steel-300 border-t border-navy-700 pt-4">
                <div className="flex justify-between">
                  <span className="text-steel-400">Practice Tenure:</span>
                  <span className="text-white font-semibold">20+ Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel-400">Specialization:</span>
                  <span className="text-white font-semibold">Building Products &amp; Construction</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel-400">Placement Level:</span>
                  <span className="text-white font-semibold">Board / MD / C-Suite</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-steel-400">Direct Desk:</span>
                  <a href="mailto:mgoldsmith@mgheadhunting.co.uk" className="text-teal-300 hover:underline">
                    mgoldsmith@mgheadhunting.co.uk
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-navy-700 flex items-center justify-between">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-teal-300 hover:text-white transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
                <span className="text-[10px] font-mono text-steel-400">STATUS: ACTIVE MANDATES</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Pedigree */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge variant="navy" size="md">BOUTIQUE EXECUTIVE SEARCH</Badge>
              <Badge variant="steel" size="md">PARTNER-LED RIGOR</Badge>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight uppercase leading-tight">
              Two Decades of High-Impact Board &amp; C-Suite Placements
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-steel-700 leading-relaxed font-sans">
              <p>
                <strong>Mark Goldsmith</strong> founded MG Headhunting to provide a bespoke, rigorously engineered alternative to the impersonal assembly-line recruitment models dominating the built environment sector.
              </p>
              <p>
                Having advised international manufacturing conglomerates, family-owned merchant groups, and Private Equity investment firms, Mark combines an intricate technical understanding of construction products with direct access to non-active, high-performing executive leaders.
              </p>
              <p>
                Every mandate undertaken by MGH is managed with unwavering discretion, meticulous candidate assessment, and a relentless commitment to long-term leadership retention.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-navy-900">
              <div className="flex items-center gap-2 p-2.5 bg-steel-50 border border-steel-200">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Strict Non-Disclosure Protocols</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-steel-50 border border-steel-200">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Proven PE Value-Creation Placements</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-steel-50 border border-steel-200">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Deep European Manufacturing Networks</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-steel-50 border border-steel-200">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Zero Off-Limit Conflicts on Core Searches</span>
              </div>
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
