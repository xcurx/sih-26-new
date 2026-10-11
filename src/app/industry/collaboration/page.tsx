'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';

export default function IndustryCollaborationPage() {
  const { facultyPrograms } = useApp();
  const [showRfpModal, setShowRfpModal] = useState(false);
  const [rfpTitle, setRfpTitle] = useState('');
  const [budget, setBudget] = useState('₹25,00,000');
  const [domain, setDomain] = useState('Electrical / AI Systems');

  const handlePostRfp = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Corporate RFP "${rfpTitle}" published to University Academic Council.`);
    setShowRfpModal(false);
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">handshake</span>
              University Relations &amp; R&amp;D Partnerships
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Corporate Academic Collaboration &amp; RFPs
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Sponsor joint applied R&amp;D grants, post corporate consultancy problems, host guest lecture series, and recruit faculty fellows for industrial sabbaticals.
            </p>
          </div>

          <button
            onClick={() => setShowRfpModal(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Post Corporate Consultancy RFP</span>
          </button>
        </section>

        {/* Existing Open Collaboration Opportunities */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-title-lg text-base font-bold text-on-surface">
              Active Industry-Academic Programs &amp; Grants
            </h2>
            <span className="text-xs text-on-surface-variant">
              Co-Funded with Apex Institute Research Council
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {facultyPrograms.map((prog) => (
              <div
                key={prog.id}
                className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-surface-container text-primary">
                      {prog.type.toUpperCase()}
                    </span>
                    <span className="text-xs font-bold text-tertiary">
                      {prog.fundingAmount || 'Sponsored Fellowship'}
                    </span>
                  </div>

                  <h3 className="font-title-md text-base font-bold text-on-surface">
                    {prog.title}
                  </h3>

                  <span className="text-xs text-on-surface-variant font-medium">
                    Organization: <strong className="text-on-surface">{prog.organization}</strong> • {prog.domain}
                  </span>

                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant">Duration: {prog.duration} • Closes {prog.deadline}</span>
                  <span className="px-2.5 py-1 bg-surface-container text-primary rounded-lg font-bold">
                    {prog.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RFP Modal */}
        {showRfpModal && (
          <div className="fixed inset-0 z-50 bg-secondary/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 border border-surface-container shadow-xl">
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-3">
                Post Corporate Consultancy RFP
              </h3>
              <form onSubmit={handlePostRfp} className="flex flex-col gap-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">RFP Problem Title</label>
                  <input
                    type="text"
                    required
                    value={rfpTitle}
                    onChange={(e) => setRfpTitle(e.target.value)}
                    placeholder="e.g. Real-Time Telemetry Anomaly Detection"
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Sanctioned Budget</label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. ₹25,00,000"
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Academic Domain</label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-surface-container">
                  <button
                    type="button"
                    onClick={() => setShowRfpModal(false)}
                    className="px-4 py-2 bg-surface-container rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-on-primary rounded-lg font-bold"
                  >
                    Post RFP
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
