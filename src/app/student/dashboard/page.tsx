'use client';

import React from 'react';
import Link from 'next/link';
import AppShell from '@/components/layout/AppShell';
import MetricCard from '@/components/common/MetricCard';
import JobCard from '@/components/common/JobCard';
import { useApp } from '@/context/AppContext';

export default function StudentDashboard() {
  const { student, jobs, applications } = useApp();

  const activeApps = applications.filter((a) => a.status !== 'rejected');
  const interviewApps = applications.filter((a) => a.status === 'interview');
  const offerApps = applications.filter((a) => a.status === 'offer');

  const recommendedJobs = jobs.slice(0, 3);
  const gapSkills = student?.skills.filter((s) => s.status === 'gap') || [];

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Breadcrumb & Header Context */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-on-surface-variant font-semibold uppercase tracking-wider">
              <span className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-[16px]">school</span>
                Apex Institute • Class of '25
              </span>
              <span>/</span>
              <span>Verified Skill Pipeline</span>
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
              Candidate Overview &amp; Readiness Dashboard
            </h1>
            <p className="text-sm text-on-surface-variant max-w-2xl">
              Real-time calibration based on verified academic credentials, proctored assessments, and Tier-1 industry hiring bars.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/student/assessment"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs shadow-xs transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">quiz</span>
              <span>Take Skill Assessment</span>
            </Link>
            <Link
              href="/student/skills"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-xs shadow-xs transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">radar</span>
              <span>View Gap Radar</span>
            </Link>
          </div>
        </section>

        {/* Quick Stats Metric Strip */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Applied (Active)"
            value={activeApps.length}
            deltaText="2 this week"
            deltaType="positive"
            icon="send"
            subtext="Campus ATS Sync"
            highlightColor="primary"
          />
          <MetricCard
            title="Interview Rounds"
            value={interviewApps.length}
            subtext="Microsoft, Razorpay"
            icon="event_available"
            highlightColor="primary"
          />
          <MetricCard
            title="Readiness Index"
            value={`${student?.readinessIndex || 84.5}%`}
            deltaText="Top 8% in Batch"
            deltaType="positive"
            icon="radar"
            progressPercent={student?.readinessIndex || 84.5}
            highlightColor="tertiary"
          />
          <MetricCard
            title="Verified Offers / PPO"
            value={offerApps.length > 0 ? offerApps.length : '1 Pre-PPO'}
            deltaText="Conversion Active"
            deltaType="positive"
            icon="workspace_premium"
            highlightColor="tertiary"
          />
        </section>

        {/* Upcoming Interview Alert Banner */}
        {interviewApps.length > 0 && (
          <div className="bg-primary-fixed/30 border border-primary/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">video_camera_front</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Upcoming Technical Interview
                </span>
                <span className="font-title-md text-sm text-on-surface font-semibold">
                  {interviewApps[0].company} • {interviewApps[0].jobTitle}
                </span>
                <span className="text-xs text-on-surface-variant">
                  Oct 18, 2024 at 2:00 PM IST (Microsoft Teams) • Round 2 System Architecture
                </span>
              </div>
            </div>
            <Link
              href="/student/applications"
              className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-semibold hover:bg-primary-container transition-all text-center shrink-0"
            >
              Prepare &amp; View Rubric
            </Link>
          </div>
        )}

        {/* 2-Column Split: High Affinity Opportunities vs Skill Gaps & Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Recommended Openings (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-title-lg text-lg font-bold text-on-surface">
                  High-Affinity Opportunities
                </h2>
                <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant rounded-full text-xs font-semibold">
                  Calibrated to Cloud Skills
                </span>
              </div>
              <Link
                href="/student/internships"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
              >
                View All ({jobs.length})
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {recommendedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>

          {/* Right: Skill Intelligence & Bridge Courses (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Gap Action Card */}
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-[22px]">warning</span>
                  <h3 className="font-title-md text-sm font-bold text-on-surface">
                    Critical Skill Gaps Identified
                  </h3>
                </div>
                <span className="text-xs text-error font-semibold bg-error-container px-2 py-0.5 rounded-full">
                  {gapSkills.length} High-Impact
                </span>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed">
                Hiring algorithms at Tier-1 employers (Google, AWS, Azure) require at least 75% proficiency in these competencies for senior intern shortlisting:
              </p>

              <div className="flex flex-col gap-2.5">
                {gapSkills.map((gap, i) => (
                  <div
                    key={i}
                    className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-on-surface">{gap.name}</span>
                      <span className="text-[11px] text-on-surface-variant">
                        Current: <strong className="text-error">{gap.proficiency}%</strong> • Hiring Bar: {gap.benchmark}%
                      </span>
                    </div>
                    <Link
                      href="/student/learning"
                      className="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high text-primary rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>Bridge</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                  </div>
                ))}
              </div>

              <Link
                href="/student/learning"
                className="w-full py-2.5 text-center bg-primary-fixed text-on-primary-fixed hover:bg-primary hover:text-on-primary rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">school</span>
                <span>Browse Recommended Bridge Courses</span>
              </Link>
            </div>

            {/* Quick Digital Credential Card */}
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-title-md text-sm font-bold text-on-surface">
                  Verified Digital Credentials
                </span>
                <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold rounded-full">
                  19 / 24 Verified
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Your coursework grades, Git commits, and CodeSignal proctored assessments are cryptographically attested by Apex Institute TPO.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Link
                  href="/student/portfolio"
                  className="flex-1 py-2 text-center bg-surface-container text-on-surface hover:bg-surface-container-high rounded-xl text-xs font-semibold transition-colors"
                >
                  View Digital Portfolio
                </Link>
                <button
                  onClick={() => alert('Official Verified Academic & Skill Transcript downloaded (PDF signed by Registrar).')}
                  className="px-3 py-2 bg-primary text-on-primary rounded-xl text-xs font-semibold hover:bg-primary-container transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>Transcript</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
