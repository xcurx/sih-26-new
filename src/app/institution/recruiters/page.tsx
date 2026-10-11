'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';

export default function RecruiterManagementPage() {
  const [recruiters, setRecruiters] = useState([
    {
      id: 'rec_01',
      company: 'Microsoft India',
      tier: 'Tier-1 Super Dream',
      roles: 'Cloud SRE, Software Engineer',
      ctcRange: '₹45.0 - ₹52.0 LPA',
      visitDate: 'Oct 15 - 18, 2024',
      status: 'Slots Finalized',
      shortlistedCount: 48,
    },
    {
      id: 'rec_02',
      company: 'Atlassian',
      tier: 'Tier-1 Super Dream',
      roles: 'Full Stack AI Platform Engineer',
      ctcRange: '₹54.0 LPA',
      visitDate: 'Oct 22 - 24, 2024',
      status: 'Interview Round 1',
      shortlistedCount: 24,
    },
    {
      id: 'rec_03',
      company: 'Razorpay',
      tier: 'FinTech High-Growth',
      roles: 'Distributed Backend Systems Intern/PPO',
      ctcRange: '₹32.0 LPA / ₹55k Stipend',
      visitDate: 'Nov 02 - 04, 2024',
      status: 'Drive Scheduled',
      shortlistedCount: 38,
    },
    {
      id: 'rec_04',
      company: 'Palo Alto Networks',
      tier: 'Cybersecurity Tier-1',
      roles: 'Cloud Security Associate',
      ctcRange: '₹32.0 LPA',
      visitDate: 'Nov 10 - 12, 2024',
      status: 'PPT Completed',
      shortlistedCount: 31,
    },
  ]);

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">corporate_fare</span>
              Campus Recruitment Administration
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Recruiter Management &amp; Campus Drive Slots
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Schedule corporate pre-placement talks (PPTs), manage on-campus interview slots, assign lab interview rooms, and monitor offer issuance logs.
            </p>
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl text-center border border-surface-container">
            <span className="text-[10px] text-outline font-bold uppercase block">Visiting Companies</span>
            <span className="text-sm font-bold text-primary">142 Registered</span>
          </div>
        </section>

        {/* Recruiter Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {recruiters.map((rec) => (
            <div
              key={rec.id}
              className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs flex flex-col justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-surface-container text-primary">
                    {rec.tier}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-tertiary-fixed text-on-tertiary-fixed">
                    {rec.status}
                  </span>
                </div>

                <h3 className="font-title-md text-lg font-bold text-on-surface">
                  {rec.company}
                </h3>

                <span className="text-xs text-on-surface-variant font-medium">
                  Requisitions: <strong className="text-on-surface">{rec.roles}</strong>
                </span>

                <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs font-semibold">
                  <span>Compensation: <strong className="text-primary">{rec.ctcRange}</strong></span>
                  <span>{rec.shortlistedCount} Shortlisted Candidates</span>
                </div>
              </div>

              <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs">
                <span className="text-on-surface-variant">Slot: <strong>{rec.visitDate}</strong></span>
                <button
                  onClick={() => alert(`Slot details and interview panel rooms exported for ${rec.company}.`)}
                  className="px-3.5 py-1.5 bg-surface-container hover:bg-surface-container-high text-primary rounded-xl font-bold transition-colors"
                >
                  Manage Drive Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
