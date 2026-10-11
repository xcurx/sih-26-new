'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import JobCard from '@/components/common/JobCard';
import MetricCard from '@/components/common/MetricCard';
import { useApp } from '@/context/AppContext';

export default function PlacementsPage() {
  const { jobs, student } = useApp();

  const placements = jobs.filter((j) => j.roleType === 'placement');

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">domain</span>
              Training &amp; Placement Cell • Class of 2025
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Campus Placements &amp; Full-Time Drives
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Tier-1 Dream &amp; Super-Dream requisitions with verified skill matching. Eligibility criteria verified by TPO Cell.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-surface-container-low rounded-xl text-center border border-surface-container">
              <span className="text-[10px] text-outline font-bold uppercase block">Your CGPA</span>
              <span className="text-sm font-bold text-on-surface">{student?.cgpa || '8.82'} / 10.0</span>
            </div>
            <div className="p-3 bg-tertiary-fixed/30 rounded-xl text-center border border-tertiary/20">
              <span className="text-[10px] text-tertiary font-bold uppercase block">Eligibility</span>
              <span className="text-sm font-bold text-tertiary">Tier-1 Cleared</span>
            </div>
          </div>
        </section>

        {/* Placements KPI Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Highest Offer (Dream)"
            value="₹54.0 LPA"
            subtext="Atlassian Bengaluru"
            icon="payments"
            highlightColor="primary"
          />
          <MetricCard
            title="Average Package"
            value="₹14.8 LPA"
            deltaText="+11.4% YoY"
            icon="trending_up"
            highlightColor="tertiary"
          />
          <MetricCard
            title="Visiting Recruiters"
            value="142"
            subtext="Amazon, Microsoft, Palo Alto"
            icon="corporate_fare"
            highlightColor="secondary"
          />
          <MetricCard
            title="Drive Compliance"
            value="100%"
            subtext="0 Backlogs • Verified Resume"
            icon="verified_user"
            highlightColor="tertiary"
          />
        </section>

        {/* Placements Job Feed */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-title-lg text-base font-bold text-on-surface">
              Active Placement Requisitions
            </h2>
            <span className="text-xs text-on-surface-variant">
              Showing {placements.length} eligible full-time opportunities
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {placements.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
