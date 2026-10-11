'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import MetricCard from '@/components/common/MetricCard';

export default function InstitutionDashboardPage() {
  const [cohort, setCohort] = useState('B.Tech 2025 Graduating Batch');
  const [dept, setDept] = useState('All Departments');
  const [exportOpen, setExportOpen] = useState(false);

  const branchReadiness = [
    { branch: 'Computer Science & Cloud Systems', placed: '94.2%', avgCtc: '₹18.4 LPA', readiness: 92 },
    { branch: 'Data Science & Artificial Intelligence', placed: '88.5%', avgCtc: '₹16.8 LPA', readiness: 89 },
    { branch: 'Electronics & Communication', placed: '74.1%', avgCtc: '₹12.2 LPA', readiness: 78 },
    { branch: 'Mechanical & Robotics Automation', placed: '62.5%', avgCtc: '₹9.4 LPA', readiness: 71 },
  ];

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header Section with Live Status & Controls (Stitch Screen 4) */}
        <section className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-surface-container text-primary uppercase tracking-wider">
                Apex Institute of Technology
              </span>
              <span className="flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold bg-tertiary-fixed text-on-tertiary-fixed">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                NBA • NAAC A++ • ABET Tier-1 (94.8% Metric Compliance)
              </span>
            </div>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface tracking-tight mt-1">
              Institutional Placement &amp; Skill Readiness Analytics
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Academic Year 2024-2025 • Cohort: Engineering &amp; Technology (1,480 Active Candidates) • Last Synced 12m ago
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Cohort Select */}
            <select
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
              className="px-3 py-2 bg-surface-container-low text-on-surface text-xs font-semibold rounded-xl border border-surface-container cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option>B.Tech 2025 Graduating Batch</option>
              <option>M.Tech / Dual Degree 2025</option>
              <option>B.Tech 2026 Pre-Final Cohort</option>
            </select>

            {/* Department Filter */}
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="px-3 py-2 bg-surface-container-low text-on-surface text-xs font-semibold rounded-xl border border-surface-container cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option>All Departments</option>
              <option>Computer Science &amp; Eng.</option>
              <option>Data Science &amp; AI</option>
              <option>Electronics &amp; Comm.</option>
              <option>Mechanical &amp; Robotics</option>
            </select>

            {/* Export Dropdown */}
            <div className="relative">
              <button
                onClick={() => setExportOpen(!exportOpen)}
                className="flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-xl hover:bg-primary-container transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">ios_share</span>
                <span>Export Audit Report</span>
                <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
              </button>

              {exportOpen && (
                <div
                  className="absolute right-0 mt-1 w-52 bg-surface-container-lowest rounded-xl shadow-lg border border-surface-container py-1 z-30"
                  onClick={() => setExportOpen(false)}
                >
                  <button
                    onClick={() => alert('Executive PDF Summary downloaded.')}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-container-low"
                  >
                    <span className="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span>
                    <span>Executive PDF Summary</span>
                  </button>
                  <button
                    onClick={() => alert('Full TPO Matrix (XLSX) exported.')}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-container-low"
                  >
                    <span className="material-symbols-outlined text-[16px] text-tertiary">table_view</span>
                    <span>Full TPO Matrix (XLSX)</span>
                  </button>
                  <button
                    onClick={() => alert('NBA Accreditation Log generated.')}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-container-low"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">analytics</span>
                    <span>NBA Accreditation Log</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Executive KPI Summary Cards (Bento 4-Column Layout from Stitch Screen 4) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Cohort Readiness Score"
            value="87.2%"
            deltaText="+11.4% YoY"
            deltaType="positive"
            subtext="Target: 80.0% (Exceeding)"
            icon="verified_user"
            progressPercent={87.2}
            highlightColor="tertiary"
          />
          <MetricCard
            title="Placed & Pre-Offers"
            value="1,124"
            deltaText="75.9% Placement Rate"
            deltaType="positive"
            subtext="/ 1,480 (4 mos. to convocation)"
            icon="work"
            progressPercent={75.9}
            highlightColor="primary"
          />
          <MetricCard
            title="Average Package (CTC)"
            value="₹14.8 LPA"
            subtext="Highest: ₹54.0 LPA (Atlassian)"
            icon="payments"
            highlightColor="primary"
          />
          <MetricCard
            title="Visiting Recruiters"
            value="142"
            deltaText="+28 New Companies"
            deltaType="positive"
            subtext="84 Tier-1 Tech, 28 Unicorns"
            icon="domain"
            highlightColor="secondary"
          />
        </section>

        {/* 2-Column Analytical Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Department Placement Matrix (8 cols) */}
          <div className="lg:col-span-8 bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div>
                <h2 className="font-title-lg text-base font-bold text-on-surface">
                  Department-Wise Placement &amp; Skill Readiness Index
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Comparison across academic disciplines for Batch 2025.
                </p>
              </div>
              <span className="text-xs text-tertiary font-bold bg-tertiary-fixed px-2.5 py-0.5 rounded-full">
                All Cleared NAAC Benchmark
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {branchReadiness.map((b, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-surface-container-low rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-on-surface">{b.branch}</span>
                    <span className="text-[11px] text-on-surface-variant">
                      Average CTC: <strong className="text-on-surface">{b.avgCtc}</strong> • Placement Conversion: <strong className="text-tertiary">{b.placed}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-28 bg-surface-container h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${b.readiness}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-primary w-12 text-right">
                      {b.readiness}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Insights & Industry Hiring Bar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                TPO Key Finding
              </span>
              <h3 className="font-title-md text-sm font-bold text-on-surface">
                Skill Gap Resolution Impact
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Students who completed industry-sponsored bridge modules in <strong className="text-on-surface">Kubernetes and Distributed Observability</strong> demonstrated a <strong className="text-tertiary">3.2x higher interview conversion rate</strong> in Microsoft and Amazon hiring pipelines.
              </p>
              <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface font-semibold flex items-center justify-between">
                <span>Recommendation:</span>
                <span className="text-primary font-bold">Mandate in 7th Sem Syllabus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
