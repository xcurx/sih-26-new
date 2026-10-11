'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import NirmaanLogo from '@/components/common/NirmaanLogo';

export default function HomePage() {
  const router = useRouter();
  const { login } = useApp();

  const handleLaunchRole = (roleKey: 'student' | 'industry' | 'faculty' | 'institution') => {
    login(roleKey);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      {/* Top Simple Brand Header */}
      <header className="w-full bg-surface-container-lowest border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center shrink-0">
            <NirmaanLogo size="md" />
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">login</span>
              <span>Sign In / Demo Accounts</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-12 flex flex-col items-center text-center gap-8 flex-1 justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          <span>Unified SIH-26 Academia-Industry Synergy Architecture</span>
        </div>

        <h1 className="font-headline-lg text-3xl sm:text-5xl lg:text-6xl font-bold text-on-surface tracking-tight max-w-4xl leading-tight">
          Bridging the Gap Between Academic Potential &amp; Industry Excellence
        </h1>

        <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
          A centralized, role-based ecosystem connecting <strong className="text-on-surface">Students</strong>, <strong className="text-on-surface">Corporate Recruiters</strong>, <strong className="text-on-surface">Academic Faculty</strong>, and <strong className="text-on-surface">Institutions</strong> for skill mapping, proctored assessments, internships, R&amp;D grants, and verified placements.
        </p>

        {/* 4 Role Gateway Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-4 text-left">
          {/* Card 1: Student */}
          <div
            onClick={() => handleLaunchRole('student')}
            className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container shadow-xs hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer flex flex-col justify-between gap-4 group"
          >
            <div className="flex flex-col gap-2">
              <div className="w-12 h-12 rounded-xl bg-surface-container-low text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[26px]">school</span>
              </div>
              <h3 className="font-title-md text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                Student / Candidate
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Take proctored assessments, analyze dynamic radar gaps, apply to verified internships, and build digital portfolios.
              </p>
            </div>
            <span className="text-xs font-bold text-primary flex items-center gap-1">
              <span>Open Student Hub</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </div>

          {/* Card 2: Industry */}
          <div
            onClick={() => handleLaunchRole('industry')}
            className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container shadow-xs hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer flex flex-col justify-between gap-4 group"
          >
            <div className="flex flex-col gap-2">
              <div className="w-12 h-12 rounded-xl bg-surface-container-low text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[26px]">corporate_fare</span>
              </div>
              <h3 className="font-title-md text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                Industry &amp; Recruiter
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Post requisitions, discover talent via AI compatibility matching, run ATS pipelines, and sponsor academic grants.
              </p>
            </div>
            <span className="text-xs font-bold text-primary flex items-center gap-1">
              <span>Open Recruiter Suite</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </div>

          {/* Card 3: Faculty */}
          <div
            onClick={() => handleLaunchRole('faculty')}
            className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container shadow-xs hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer flex flex-col justify-between gap-4 group"
          >
            <div className="flex flex-col gap-2">
              <div className="w-12 h-12 rounded-xl bg-surface-container-low text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[26px]">psychology</span>
              </div>
              <h3 className="font-title-md text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                Faculty &amp; Academician
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Explore corporate sabbaticals, submit consultancy bids, supervise student capstones, and coordinate guest lectures.
              </p>
            </div>
            <span className="text-xs font-bold text-primary flex items-center gap-1">
              <span>Open Faculty Hub</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </div>

          {/* Card 4: Institution */}
          <div
            onClick={() => handleLaunchRole('institution')}
            className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container shadow-xs hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer flex flex-col justify-between gap-4 group"
          >
            <div className="flex flex-col gap-2">
              <div className="w-12 h-12 rounded-xl bg-surface-container-low text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[26px]">account_balance</span>
              </div>
              <h3 className="font-title-md text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                Institution &amp; TPO Cell
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Monitor placement readiness, review curriculum vs industry gaps, attest credentials, and export NAAC audit reports.
              </p>
            </div>
            <span className="text-xs font-bold text-primary flex items-center gap-1">
              <span>Open TPO Analytics</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest border-t border-surface-container py-4 text-center text-xs text-on-surface-variant">
        <span>Powered by Nirmaan • Local IndexedDB Cache Engine Active • Exact Stitch Design System</span>
      </footer>
    </div>
  );
}
