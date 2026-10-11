'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import AppShell from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';

export default function FacultyGrantsPage() {
  const { facultyPrograms } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [grantTitle, setGrantTitle] = useState('');

  const grants = facultyPrograms.filter((p) => p.type === 'grant');

  const handleSubmitGrant = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    alert(`Grant dossier for "${grantTitle}" registered with Department of Telecom & Industry Sponsors.`);
    setShowModal(false);
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">science</span>
              Funded Applied Research &amp; Co-Patents
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Joint Applied R&amp;D Grants &amp; Fellowships
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Co-funded research partnerships between accredited university laboratories and global corporate technology divisions (Qualcomm, NVIDIA, Google Research).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-surface-container-low rounded-xl text-center border border-surface-container">
              <span className="text-[10px] text-outline font-bold uppercase block">Sanctioned Pool</span>
              <span className="text-sm font-bold text-tertiary">$2.4M (₹18.5 Cr)</span>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">upload_file</span>
              <span>Submit Whitepaper / Grant Dossier</span>
            </button>
          </div>
        </section>

        {/* Grants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {grants.map((grant) => (
            <div
              key={grant.id}
              className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-surface-container text-primary">
                    Multi-Year Research Grant
                  </span>
                  <span className="text-xs font-bold text-tertiary">
                    Sanctioned Pool: {grant.fundingAmount}
                  </span>
                </div>

                <h3 className="font-title-md text-base font-bold text-on-surface">
                  {grant.title}
                </h3>

                <span className="text-xs text-on-surface-variant font-medium">
                  Sponsors: <strong className="text-on-surface">{grant.organization}</strong> • {grant.domain}
                </span>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {grant.description}
                </p>

                <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
                  <span>Tenure: <strong>{grant.duration}</strong></span>
                  <span>Co-PI Slots: <strong>{grant.slotsAvailable} Available</strong></span>
                </div>
              </div>

              <div className="pt-3 border-t border-surface-container flex items-center justify-between">
                <span className="text-xs text-on-surface-variant">NIRF Metric 3.1 &amp; 3.2 Aligned</span>
                <button
                  onClick={() => {
                    setGrantTitle(grant.title);
                    setShowModal(true);
                  }}
                  className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold shadow-xs transition-all"
                >
                  Join as Co-Investigator
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-secondary/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 border border-surface-container shadow-xl">
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-2">
                Submit Applied Research Whitepaper
              </h3>
              <form onSubmit={handleSubmitGrant} className="flex flex-col gap-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={grantTitle}
                    onChange={(e) => setGrantTitle(e.target.value)}
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Principal Investigator (PI) &amp; Co-PIs</label>
                  <input
                    type="text"
                    defaultValue="Dr. Ramesh Rao (Head of Cloud Systems)"
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Abstract &amp; Industrial Relevance</label>
                  <textarea
                    rows={3}
                    placeholder="Describe technical novelty, proposed lab architecture, and commercialization roadmap..."
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-surface-container">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-surface-container rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-on-primary rounded-lg font-bold"
                  >
                    Submit Grant Dossier
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
