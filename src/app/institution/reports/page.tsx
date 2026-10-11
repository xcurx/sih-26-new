'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';

export default function AccreditationReportsPage() {
  const reports = [
    {
      id: 'rep_01',
      title: 'NAAC Criterion 3.5: Industry Collaboration & Consultancy Audits',
      period: 'Academic Year 2024-2025',
      metric: '94.8% Compliance Score',
      details: 'Logs all industry collaborative research grants, FDP attendance, and sanctioned corporate consultancy funds.',
      fileType: 'PDF / Audit XML',
    },
    {
      id: 'rep_02',
      title: 'NIRF Ranking Metric 3: Graduate Placement & Higher Studies Matrix',
      period: 'Class of 2024 & 2025 Cohort',
      metric: 'Top Decile Placement Ratio',
      details: 'Contains median CTC, verified offer letters, employer verification records, and PPO conversion ratios.',
      fileType: 'XLSX Data Dump',
    },
    {
      id: 'rep_03',
      title: 'NBA Accreditation Criterion 4: Student Performance & Employability',
      period: 'B.Tech Engineering Programs',
      metric: 'Tier-1 ABET / NBA Aligned',
      details: 'Maps student program outcomes (POs) to verified competencies evaluated by industry assessment rubrics.',
      fileType: 'PDF Dossier',
    },
    {
      id: 'rep_04',
      title: 'Ministry of Education & AICTE Internship Compliance Log',
      period: 'Summer & Autumn 2024 Terms',
      metric: '100% Mandatory Credit Sync',
      details: 'Attests that all graduating engineers have completed at least 14 weeks of supervised industry immersion.',
      fileType: 'Certified PDF',
    },
  ];

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">description</span>
              Institutional Governance &amp; Regulatory Compliance
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Accreditation Reports &amp; NIRF/NAAC Audit Vault
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Export verified data logs and institutional portfolios for NAAC, NIRF, NBA, and AICTE audits with automated metric attestation.
            </p>
          </div>

          <button
            onClick={() => alert('Comprehensive Institutional Accreditation Bundle (ZIP containing PDFs & XML) downloaded.')}
            className="px-4 py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download Full Audit Bundle</span>
          </button>
        </section>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs flex flex-col justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-surface-container text-primary">
                    {rep.fileType}
                  </span>
                  <span className="text-xs font-bold text-tertiary">
                    {rep.metric}
                  </span>
                </div>

                <h3 className="font-title-md text-base font-bold text-on-surface">
                  {rep.title}
                </h3>

                <span className="text-xs text-on-surface-variant font-medium">
                  {rep.period}
                </span>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {rep.details}
                </p>
              </div>

              <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs">
                <span className="text-outline">Registrar Cryptographically Signed</span>
                <button
                  onClick={() => alert(`Downloaded "${rep.title}" report dossier.`)}
                  className="px-3.5 py-1.5 bg-surface-container hover:bg-surface-container-high text-primary rounded-xl font-bold transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">file_download</span>
                  <span>Export Report</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
