'use client';

import React from 'react';
import Link from 'next/link';
import AppShell from '@/components/layout/AppShell';
import MetricCard from '@/components/common/MetricCard';
import { useApp } from '@/context/AppContext';

export default function FacultyDashboardPage() {
  const { facultyPrograms, mentorshipRecords } = useApp();

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Sub-header Breadcrumb & Context */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-on-surface-variant font-medium">
          <div className="flex items-center gap-1.5">
            <span>Apex Institute of Technology</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Office of Academic-Industry Relations</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-bold">Faculty &amp; Research Hub</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
              AY 2024-25 Industry Grant Window Active
            </span>
            <span className="text-outline text-[11px] hidden sm:inline">
              NAAC Criterion 3.5 &amp; NIRF Metric Tracker Live
            </span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-surface-container-low p-space-lg rounded-2xl border border-surface-container shadow-xs">
          <div className="flex flex-col gap-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-primary text-on-primary text-[10px] rounded-lg uppercase tracking-wider font-bold">
                Faculty Portal
              </span>
              <span className="text-xs font-semibold text-secondary">
                Dr. Ramesh Rao • Dean of Research &amp; Industry Partnerships
              </span>
            </div>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface tracking-tight">
              Academic Faculty &amp; Research Hub
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Industry sabbaticals, Faculty Development Programs (FDPs), corporate consultancy bids, and joint applied research grants co-sponsored with enterprise partners.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
            <Link
              href="/faculty/grants"
              className="px-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface text-xs font-bold hover:bg-surface-container transition-all flex items-center justify-center gap-1.5 border border-surface-container shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">upload_file</span>
              <span>Submit Research Proposal</span>
            </Link>
            <Link
              href="/faculty/lectures"
              className="px-4 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">co_present</span>
              <span>Host Industry Workshop</span>
            </Link>
          </div>
        </div>

        {/* 4 KPI Metric Cards Grid (Stitch Screen 3) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Active Sabbaticals & FDPs"
            value="18"
            deltaText="+4 Q1"
            deltaType="positive"
            subtext="Open Fellowships"
            icon="school"
            highlightColor="primary"
          />
          <MetricCard
            title="Sponsored R&D Pool"
            value="$2.4M"
            subtext="₹18.5 Cr Sanctioned"
            icon="account_balance"
            highlightColor="tertiary"
          />
          <MetricCard
            title="Consultancy Requests"
            value="7"
            subtext="₹68L Open Pipeline"
            icon="request_quote"
            highlightColor="secondary"
          />
          <MetricCard
            title="Faculty Mentored Interns"
            value="142"
            deltaText="94% Retention"
            deltaType="positive"
            subtext="Active Capstones"
            icon="group_work"
            highlightColor="tertiary"
          />
        </section>

        {/* 2-Column Split: Active Programs vs Mentored Students Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Featured Faculty Programs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-title-lg text-base font-bold text-on-surface">
                Featured Industry Opportunities for Faculty
              </h2>
              <Link
                href="/faculty/internships"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
              >
                Browse All ({facultyPrograms.length})
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {facultyPrograms.map((prog) => (
                <div
                  key={prog.id}
                  className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col gap-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-surface-container text-primary">
                          {prog.type.toUpperCase()}
                        </span>
                        <h3 className="font-title-md text-sm font-bold text-on-surface">
                          {prog.title}
                        </h3>
                      </div>
                      <span className="text-xs text-on-surface-variant mt-1 font-medium">
                        {prog.organization} • {prog.domain}
                      </span>
                    </div>
                    {prog.fundingAmount && (
                      <span className="text-xs font-bold text-tertiary bg-tertiary-fixed/40 px-2 py-0.5 rounded-md shrink-0">
                        {prog.fundingAmount.split('/')[0]}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                    {prog.description}
                  </p>

                  <div className="pt-2 border-t border-surface-container/60 flex items-center justify-between text-xs">
                    <span className="text-outline">Duration: {prog.duration}</span>
                    <Link
                      href={
                        prog.type === 'consultancy'
                          ? '/faculty/consultancy'
                          : prog.type === 'grant'
                          ? '/faculty/grants'
                          : '/faculty/internships'
                      }
                      className="px-3 py-1 bg-primary text-on-primary rounded-lg text-xs font-bold hover:bg-primary-container transition-colors"
                    >
                      Apply / Submit Bid
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Mentored Student Capstones Progress (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <h3 className="font-title-md text-sm font-bold text-on-surface">
                  Assigned Capstone Interns
                </h3>
                <Link
                  href="/faculty/mentorship"
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  View All ({mentorshipRecords.length})
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                {mentorshipRecords.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-on-surface">
                        {m.studentName} ({m.company})
                      </span>
                      <span className="text-[10px] font-bold text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded-full">
                        {m.progressPercent}% Complete
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-primary">
                      {m.projectTitle}
                    </span>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      "{m.lastFeedback}"
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-outline pt-1">
                      <span>Updated {m.lastUpdated}</span>
                      <Link
                        href="/faculty/mentorship"
                        className="text-primary font-bold hover:underline"
                      >
                        Log Feedback
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
