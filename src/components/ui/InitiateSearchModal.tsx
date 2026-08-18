import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Lock } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import { trackLeadSubmission } from '../../lib/analytics';

export interface InitiateSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSector?: string;
}

export const InitiateSearchModal: React.FC<InitiateSearchModalProps> = ({
  isOpen,
  onClose,
  defaultSector,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    roleTitle: '',
    company: '',
    email: '',
    phone: '',
    targetLevel: 'Managing Director / CEO',
    sectorSpecialism: defaultSector || 'Heavy Building Materials',
    timeframe: 'Immediate (< 30 days)',
    notes: '',
  });

  useEffect(() => {
    if (defaultSector) {
      setFormData((prev) => ({ ...prev, sectorSpecialism: defaultSector }));
    }
  }, [defaultSector]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackLeadSubmission('mandate', formData.sectorSpecialism);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white border border-steel-300 shadow-2xl p-6 sm:p-8 rounded-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Hairline Teal Accent Rule */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-teal-600" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 mb-6 border-b border-steel-200">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="navy" size="sm">Confidential intake</Badge>
            </div>
            <h2 className="font-display text-2xl font-bold text-navy-900 tracking-tight">
              Initiate Retained Search
            </h2>
            <p className="text-xs sm:text-sm text-steel-600 mt-1">
              Direct engagement with Mark Goldsmith for board and director-level appointments in building products.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-steel-500 hover:text-navy-900 transition-colors border border-transparent hover:border-steel-300"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-navy-900">
              Search Briefing Received
            </h3>
            <p className="text-sm text-steel-700 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.name || 'Executive'}</strong>. Mark Goldsmith will personally review your search mandate and reach out within 24 hours under strict Non-Disclosure Protocol.
            </p>
            <div className="p-4 bg-steel-50 border border-steel-200 text-xs font-mono text-steel-600 max-w-md mx-auto text-left space-y-1">
              <div><strong>Target Appointment:</strong> {formData.targetLevel}</div>
              <div><strong>Sector Focus:</strong> {formData.sectorSpecialism}</div>
              <div><strong>Confirmation Dispatch:</strong> {formData.email || 'mgoldsmith@mgheadhunting.co.uk'}</div>
            </div>
            <div className="pt-4">
              <Button variant="secondary" onClick={handleReset}>
                Close Search Briefing
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-sm font-medium text-navy-800 mb-1">
                  Your Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. David Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-steel-50 border border-steel-300 focus:border-teal-600 focus:bg-white outline-none rounded-sm transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-navy-800 mb-1">
                  Company / Group *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Saint-Gobain UK / PE Fund"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-steel-50 border border-steel-300 focus:border-teal-600 focus:bg-white outline-none rounded-sm transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-sm font-medium text-navy-800 mb-1">
                  Work Email *
                </label>
                <input
                  required
                  type="email"
                  placeholder="d.vance@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-steel-50 border border-steel-300 focus:border-teal-600 focus:bg-white outline-none rounded-sm transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-navy-800 mb-1">
                  Direct Telephone
                </label>
                <input
                  type="tel"
                  placeholder="+44 7..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-steel-50 border border-steel-300 focus:border-teal-600 focus:bg-white outline-none rounded-sm transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-sm font-medium text-navy-800 mb-1">
                  Target Level / Role
                </label>
                <select
                  value={formData.targetLevel}
                  onChange={(e) => setFormData({ ...formData, targetLevel: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-steel-50 border border-steel-300 focus:border-teal-600 focus:bg-white outline-none rounded-sm transition-colors"
                >
                  <option value="Managing Director / CEO">Managing Director / CEO</option>
                  <option value="Chief Operating Officer (COO)">Chief Operating Officer (COO)</option>
                  <option value="Chief Commercial Officer / Sales Director">Chief Commercial Officer / Sales Director</option>
                  <option value="Chief Financial Officer (CFO)">Chief Financial Officer (CFO)</option>
                  <option value="Technical / R&D Director">Technical / R&D Director</option>
                  <option value="Non-Executive Director / Chair">Non-Executive Director / Chair</option>
                </select>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-navy-800 mb-1">
                  Sector Specialism Focus
                </label>
                <select
                  value={formData.sectorSpecialism}
                  onChange={(e) => setFormData({ ...formData, sectorSpecialism: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-steel-50 border border-steel-300 focus:border-teal-600 focus:bg-white outline-none rounded-sm transition-colors"
                >
                  <option value="Heavy Building Materials">Heavy Building Materials (Concrete, Cement, Aggregates)</option>
                  <option value="Building Envelope & Façades">Building Envelope, Glazing & Façades</option>
                  <option value="HVAC & Building Services">HVAC, Mechanical & Building Services</option>
                  <option value="Timber & Modular / MMC">Timber & Modern Methods of Construction (MMC)</option>
                  <option value="Merchant & Distribution Networks">Merchant & Distribution Networks</option>
                  <option value="Interior Finishing & Fit-out Systems">Interior Finishing & Fit-out Systems</option>
                  <option value="Managing Directors & CEOs">Managing Directors & CEOs</option>
                  <option value="Commercial & Sales Directors">Commercial & Sales Directors</option>
                  <option value="Operations & Supply Chain">Operations & Supply Chain</option>
                  <option value="Technical, R&D & Compliance">Technical, R&D & Compliance</option>
                  <option value="Finance & Corporate Development">Finance & Corporate Development</option>
                  <option value="Sustainability & ESG Leadership">Sustainability & ESG Leadership</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-navy-800 mb-1">
                Mandate Context &amp; Confidential Briefing
              </label>
              <textarea
                rows={3}
                placeholder="Key drivers (e.g. strategic growth, PE acquisition, succession planning, technical turnaround)..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-steel-50 border border-steel-300 focus:border-teal-600 focus:bg-white outline-none rounded-sm transition-colors"
              />
            </div>

            {/* Confidentiality Notice */}
            <div className="flex items-start gap-2.5 p-3 bg-navy-50/60 border border-steel-300 text-xs text-navy-900 rounded-sm">
              <Lock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Executive Search Protocol:</strong> All discussions and data transmissions are governed by UK GDPR and strict Non-Disclosure. Placements are conducted exclusively by senior partners.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-steel-200">
              <div className="text-[11px] font-sans text-steel-500">
                Direct: <span className="text-navy-900 font-semibold">mgoldsmith@mgheadhunting.co.uk</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button type="button" variant="outline" size="md" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  Submit Search Mandate
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
