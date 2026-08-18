'use client';

import React, { useState, useEffect } from 'react';
import { updateGoogleConsent } from '@/lib/analytics';
import { ShieldCheck, X } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user already gave consent
    const storedConsent = localStorage.getItem('mgh_cookie_consent');
    if (storedConsent === 'granted') {
      updateGoogleConsent(true);
    } else if (storedConsent === 'denied') {
      updateGoogleConsent(false);
    } else {
      // First visit - display banner after brief delay
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('mgh_cookie_consent', 'granted');
    updateGoogleConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('mgh_cookie_consent', 'denied');
    updateGoogleConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="bg-navy-900/95 backdrop-blur-md border border-navy-700/80 rounded-xl p-5 shadow-2xl text-white">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex-1 text-xs text-navy-200 leading-relaxed">
            <h4 className="text-sm font-semibold text-white mb-1">
              Privacy & Analytics
            </h4>
            <p>
              We use analytics cookies to measure website performance and refine the executive search advisory experience. We respect your privacy and never store personal identification without your consent.
            </p>
          </div>
          <button
            onClick={handleDecline}
            aria-label="Dismiss cookie notice"
            className="text-navy-400 hover:text-navy-200 transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2.5 pt-2 border-t border-navy-800">
          <button
            onClick={handleDecline}
            className="px-3.5 py-1.5 text-xs font-medium text-navy-300 hover:text-white transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 text-xs font-semibold text-navy-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-sm transition-all"
          >
            Accept Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
