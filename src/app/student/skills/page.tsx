'use client';

import React from 'react';
import Link from 'next/link';
import AppShell from '@/components/layout/AppShell';
import SkillRadarChart from '@/components/common/SkillRadarChart';
import { useApp } from '@/context/AppContext';

export default function StudentSkillsPage() {
  const { student } = useApp();

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg border border-surface-container shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
          <div className="flex flex-col gap-space-xs max-w-3xl">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-label-sm text-xs bg-surface-container-high text-primary font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                AI-Synthesized Matrix • Updated 2 hours ago
              </span>
              <span className="text-outline font-label-sm text-xs">|</span>
              <span className="text-on-surface-variant font-label-sm text-xs">
                Cohort 2025 Benchmarking
              </span>
            </div>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface tracking-tight mt-1">
              Skill Intelligence &amp; Dynamic Gap Analysis
            </h1>
            <div className="flex items-center gap-2 flex-wrap text-sm">
              <span className="text-on-surface-variant font-medium">Targeting:</span>
              <span className="bg-surface-container-low px-2 py-0.5 rounded-md text-primary font-semibold">
                {student?.targetRole || 'Cloud Solutions Architect & Distributed Systems Engineer'}
              </span>
              <span className="text-outline text-xs">
                (Tier-1 Industry Benchmark: Google, AWS, Microsoft)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm w-full sm:w-auto shrink-0 flex-wrap">
            <Link
              href="/student/assessment"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-semibold text-xs border border-surface-container transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                refresh
              </span>
              <span>Retake Aptitude Assessment</span>
            </Link>
            <button
              onClick={() => alert('Official Verified Academic Skill Transcript downloaded with cryptographic institutional seal.')}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-xs transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Download Verified Skill Transcript</span>
            </button>
          </div>
        </div>

        {/* Top Key Metrics Cards (Bento 4-Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Readiness Index */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Readiness Index
                </span>
                <span className="font-headline-lg text-3xl font-bold text-on-surface mt-1">
                  {student?.readinessIndex || 84.5}%
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">insights</span>
              </div>
            </div>
            <div className="mt-4 pt-1 flex items-center gap-1.5 bg-surface-container-low px-2 py-1 rounded">
              <span className="material-symbols-outlined text-tertiary text-[16px]">trending_up</span>
              <span className="text-xs font-bold text-tertiary">+6.2%</span>
              <span className="text-xs text-on-surface-variant truncate">since baseline test</span>
            </div>
          </div>

          {/* Verified Competencies */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Verified Competencies
                </span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="font-headline-lg text-3xl font-bold text-on-surface">
                    {student?.verifiedCredentialsCount || 19}
                  </span>
                  <span className="text-sm font-semibold text-outline">/ 24</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">fact_check</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                <span>Core Curriculum</span>
                <span className="font-semibold text-on-surface">79% Target Met</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '79%' }}></div>
              </div>
            </div>
          </div>

          {/* Critical Skill Gaps */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  High-Impact Gaps
                </span>
                <span className="font-headline-lg text-3xl font-bold text-error mt-1">
                  3 Identified
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">warning</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap mt-3">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container-low text-error">
                Kubernetes (62%)
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container-low text-error">
                Consensus (54%)
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container-low text-error">
                Observability (58%)
              </span>
            </div>
          </div>

          {/* Matched Opportunities */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Role Matching
                </span>
                <span className="font-headline-lg text-3xl font-bold text-primary mt-1">
                  42 Roles
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">work_outline</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">&gt;80% Skill Affinity</span>
              <Link
                href="/student/internships"
                className="font-semibold text-primary hover:underline flex items-center gap-0.5"
              >
                View Live Roles
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Grid: 65% Interactive Competency Matrix & Radar / 35% Bridge Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Interactive Matrix Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg border border-surface-container shadow-xs flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-surface-container gap-3">
                <div>
                  <h2 className="font-title-lg text-lg font-bold text-on-surface">
                    Interactive Skill Competency Matrix
                  </h2>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Your proctored test results vs. aggregate hiring bar across Tier-1 Cloud &amp; Distributed Systems employers.
                  </p>
                </div>
                {/* Legend */}
                <div className="flex items-center gap-4 shrink-0 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                    <span className="font-semibold text-on-surface">Your Score</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-outline-variant"></span>
                    <span className="text-on-surface-variant">Industry Benchmark</span>
                  </div>
                </div>
              </div>

              {/* Radar Chart & Visual Summary Sub-grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 bg-surface-container-low rounded-xl">
                {/* SVG Radar */}
                <div className="md:col-span-5 flex flex-col items-center justify-center">
                  <SkillRadarChart />
                </div>

                {/* Radar Insights */}
                <div className="md:col-span-7 flex flex-col justify-center space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-title-md text-sm font-bold text-on-surface">
                      Benchmark Comparison
                    </span>
                    <span className="text-tertiary text-xs font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Top Quartile in DSA
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Your algorithmic foundation outpaces the hiring threshold by{' '}
                    <strong className="text-on-surface">+10%</strong>. However, microservices orchestration and distributed observability remain the critical gating factor for senior internships at AWS and Google.
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <div className="bg-surface-container-lowest px-3 py-2 rounded-xl text-center flex-1 border border-surface-container">
                      <span className="block text-[10px] text-outline uppercase font-bold">
                        Strongest Domain
                      </span>
                      <span className="text-xs font-bold text-on-surface">
                        Data Structures (95%)
                      </span>
                    </div>
                    <div className="bg-surface-container-lowest px-3 py-2 rounded-xl text-center flex-1 border border-surface-container">
                      <span className="block text-[10px] text-outline uppercase font-bold">
                        Primary Gap
                      </span>
                      <span className="text-xs font-bold text-error">
                        Observability (58%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown Bars */}
              <div className="flex flex-col gap-4">
                {student?.skills.map((skill, index) => {
                  const isGap = skill.status === 'gap';
                  const diff = skill.proficiency - skill.benchmark;
                  return (
                    <div
                      key={index}
                      className="p-3.5 bg-surface rounded-xl hover:bg-surface-container-low transition-colors border border-surface-container/60"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-title-md text-xs sm:text-sm font-bold text-on-surface">
                            {skill.name}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isGap
                                ? 'bg-error-container text-on-error-container'
                                : 'bg-surface-container-high text-tertiary'
                            }`}
                          >
                            {isGap ? 'Gap Identified' : 'Mastery Level'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-primary font-bold">
                            Assessed: {skill.proficiency}%
                          </span>
                          <span className="text-outline">Target: {skill.benchmark}%</span>
                          <span
                            className={`font-bold ${
                              diff >= 0 ? 'text-tertiary' : 'text-error'
                            }`}
                          >
                            {diff >= 0 ? `+${diff}%` : `${diff}%`}
                          </span>
                        </div>
                      </div>

                      <div className="relative w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
                        {/* Target marker */}
                        <div
                          className="absolute top-0 bottom-0 w-1 bg-on-surface-variant z-10"
                          style={{ left: `${skill.benchmark}%` }}
                          title={`Target: ${skill.benchmark}%`}
                        />
                        {/* Progress */}
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isGap ? 'bg-error' : 'bg-primary'
                          }`}
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between mt-1.5 text-[11px] text-on-surface-variant">
                        <span>Attestation: {skill.verifiedBy || 'Proctored Coding Lab'}</span>
                        <span className="text-outline">Target Hiring Bar Marked</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: AI Bridge Pathways (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <h3 className="font-title-md text-sm font-bold text-on-surface">
                  Recommended Bridge Pathways
                </h3>
                <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed rounded-full text-[10px] font-bold">
                  AI Calibrated
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <span className="font-semibold text-xs text-on-surface">
                      Kubernetes Production Engineering
                    </span>
                    <span className="text-[10px] text-primary font-bold">4 Weeks</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    Sponsored by CNCF. Resolves container orchestration deficit for Azure &amp; AWS requisitions.
                  </p>
                  <Link
                    href="/student/learning"
                    className="mt-1 w-full py-1.5 text-center bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container transition-colors"
                  >
                    Enroll in Fast-Track
                  </Link>
                </div>

                <div className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <span className="font-semibold text-xs text-on-surface">
                      Full-Stack Observability &amp; OTel
                    </span>
                    <span className="text-[10px] text-primary font-bold">3 Weeks</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    Certified by Microsoft Azure. Bridges the 58% telemetry gap to 80% benchmark.
                  </p>
                  <Link
                    href="/student/learning"
                    className="mt-1 w-full py-1.5 text-center bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container transition-colors"
                  >
                    Enroll in Fast-Track
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
