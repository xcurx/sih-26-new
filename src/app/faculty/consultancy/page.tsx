'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import AppShell from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';

export default function FacultyConsultancyPage() {
  const { facultyPrograms, submitConsultancyProposal } = useApp();
  const [selectedRfp, setSelectedRfp] = useState<string | null>(null);
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposedBudget, setProposedBudget] = useState('₹22,50,000');
  const [methodology, setMethodology] = useState('');

  const consultancyRfpe = facultyPrograms.filter((p) => p.type === 'consultancy');

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRfp) return;

    await submitConsultancyProposal(selectedRfp, proposalTitle, proposedBudget);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    alert('Consultancy proposal submitted to corporate client and Dean of Sponsored Research!');
    setSelectedRfp(null);
    setProposalTitle('');
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">gavel</span>
              Corporate Problem Statements &amp; Consultancy Pipeline
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Corporate Consultancy &amp; Industry RFPs
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Explore sanctioned technical challenges posted by enterprise partners. Submit university research bids, whitepaper methodology blueprints, and commercial consultation budgets.
            </p>
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl text-center border border-surface-container">
            <span className="text-[10px] text-outline font-bold uppercase block">Active Pipeline</span>
            <span className="text-sm font-bold text-primary">₹68 Lakhs Sanctioned</span>
          </div>
        </section>

        {/* Consultancy RFPs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {consultancyRfpe.map((rfp) => (
            <div
              key={rfp.id}
              className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs flex flex-col justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-surface-container text-primary">
                    Corporate RFP
                  </span>
                  <span className="text-xs font-bold text-tertiary">
                    Sanctioned: {rfp.fundingAmount}
                  </span>
                </div>

                <h3 className="font-title-md text-base font-bold text-on-surface">
                  {rfp.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                  <span className="font-bold text-on-surface">{rfp.organization}</span>
                  <span>•</span>
                  <span>{rfp.domain}</span>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {rfp.description}
                </p>

                <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
                  <span>Project Duration: <strong>{rfp.duration}</strong></span>
                  <span>Submission Deadline: <strong>{rfp.deadline}</strong></span>
                </div>
              </div>

              <div className="pt-3 border-t border-surface-container flex items-center justify-between">
                <span className="text-xs text-on-surface-variant">NAAC Criterion 3.5 Eligible</span>
                <button
                  onClick={() => {
                    setSelectedRfp(rfp.id);
                    setProposalTitle(`Proposal: ${rfp.title}`);
                  }}
                  className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold shadow-xs transition-all"
                >
                  Submit Proposal / Bid
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Proposal Submission Modal */}
        {selectedRfp && (
          <div className="fixed inset-0 z-50 bg-secondary/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 border border-surface-container shadow-xl">
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-2">
                Submit Consultancy Bid
              </h3>
              <p className="text-xs text-on-surface-variant mb-4">
                Routing to Corporate Review Board with endorsement from Apex Office of Research.
              </p>
              <form onSubmit={handleSubmitBid} className="flex flex-col gap-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">Proposal Title</label>
                  <input
                    type="text"
                    required
                    value={proposalTitle}
                    onChange={(e) => setProposalTitle(e.target.value)}
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Commercial Budget Quotation</label>
                  <input
                    type="text"
                    required
                    value={proposedBudget}
                    onChange={(e) => setProposedBudget(e.target.value)}
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Methodology &amp; Deliverables Summary</label>
                  <textarea
                    rows={3}
                    required
                    value={methodology}
                    onChange={(e) => setMethodology(e.target.value)}
                    placeholder="Outline laboratory setup, researcher allocation, and milestone timelines..."
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-surface-container">
                  <button
                    type="button"
                    onClick={() => setSelectedRfp(null)}
                    className="px-4 py-2 bg-surface-container rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-on-primary rounded-lg font-bold"
                  >
                    Submit Official Proposal
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
