'use client';

import React from 'react';
import Link from 'next/link';
import AppShell from '@/components/layout/AppShell';
import MetricCard from '@/components/common/MetricCard';
import { useApp } from '@/context/AppContext';

export default function IndustryDashboard() {
  const { jobs, applications, updateApplicationStatus } = useApp();

  const totalApplicants = applications.length;
  const shortlisted = applications.filter((a) => a.status === 'shortlisted').length;
  const interviews = applications.filter((a) => a.status === 'interview').length;
  const offers = applications.filter((a) => a.status === 'offer').length;

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header Block */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">corporate_fare</span>
              Corporate Talent Acquisition Suite • Microsoft Cloud Systems
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Recruiter &amp; Industry Partner Hub
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Post verified internships, discover vetted student talent with AI skill match scoring, manage recruitment ATS pipelines, and sponsor academic research.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/industry/postings"
              className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Post New Requisition</span>
            </Link>
          </div>
        </section>

        {/* Recruiter Metrics Strip */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Active Requisitions"
            value={jobs.length}
            subtext="3 Internships • 2 Placements"
            icon="work"
            highlightColor="primary"
          />
          <MetricCard
            title="Total Applicants"
            value={totalApplicants}
            deltaText="+12 this cycle"
            deltaType="positive"
            icon="group"
            highlightColor="primary"
          />
          <MetricCard
            title="In Interview Pipeline"
            value={interviews}
            subtext="Oct 18-24 Rounds"
            icon="calendar_month"
            highlightColor="tertiary"
          />
          <MetricCard
            title="Offers / PPOs Extended"
            value={offers > 0 ? offers : '1 PPO'}
            deltaText="94% Acceptance Rate"
            deltaType="positive"
            icon="how_to_reg"
            highlightColor="tertiary"
          />
        </section>

        {/* Pipeline Overview & Fast Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Recent High-Affinity Applicants (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-title-lg text-base font-bold text-on-surface">
                  High-Affinity Campus Candidates
                </h2>
                <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant rounded-full text-xs font-semibold">
                  Matched via Verified Transcript
                </span>
              </div>
              <Link
                href="/industry/applicants"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
              >
                View Full ATS ({applications.length})
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col gap-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-sm">
                        {app.studentName.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-title-md text-sm font-bold text-on-surface">
                            {app.studentName}
                          </span>
                          <span className="text-[11px] text-tertiary font-bold bg-tertiary-fixed px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                            {app.matchScore}% Match
                          </span>
                        </div>
                        <span className="text-xs text-on-surface-variant">
                          Applied for: <strong className="text-on-surface">{app.jobTitle}</strong> • {app.studentBranch} (CGPA: {app.studentCgpa})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-surface-container text-on-surface">
                        Stage: {app.status}
                      </span>
                    </div>
                  </div>

                  {/* Skills match chip row */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-on-surface-variant font-medium">Matched:</span>
                    {app.matchedSkills.map((m, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-surface-container text-tertiary font-semibold rounded-md text-[11px]"
                      >
                        ✓ {m}
                      </span>
                    ))}
                    {app.gapSkills.length > 0 && (
                      <span className="px-2 py-0.5 bg-error-container text-on-error-container font-semibold rounded-md text-[11px]">
                        Gap: {app.gapSkills.join(', ')}
                      </span>
                    )}
                  </div>

                  {/* Quick Stage Progression Buttons */}
                  <div className="pt-2 border-t border-surface-container/60 flex items-center justify-between">
                    <span className="text-[11px] text-outline font-medium">
                      Applied {app.appliedDate} • {app.notes}
                    </span>
                    <div className="flex items-center gap-2">
                      {app.status !== 'interview' && (
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'interview', 'Interview round invited.')}
                          className="px-3 py-1 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container transition-colors"
                        >
                          Schedule Interview
                        </button>
                      )}
                      {app.status !== 'offer' && (
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'offer', 'Official PPO offer extended.')}
                          className="px-3 py-1 bg-tertiary text-on-tertiary rounded-lg text-xs font-semibold hover:bg-tertiary-container transition-colors"
                        >
                          Extend Offer
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Campus Engagement & Quick Tools (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* Quick Post Card */}
            <div className="bg-primary-fixed/20 p-5 rounded-xl border border-primary/20 flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Quick Requisition Action
              </span>
              <h3 className="font-title-md text-sm font-bold text-on-surface">
                Hire Directly from Verified Campus Talent
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Post an internship or entry-level job with your required skill set to automatically receive candidates ranked by compatibility.
              </p>
              <Link
                href="/industry/postings"
                className="mt-1 w-full py-2.5 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs rounded-xl text-center transition-all shadow-xs"
              >
                + Create New Opening
              </Link>
            </div>

            {/* Academic Collaboration Card */}
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-title-md text-sm font-bold text-on-surface">
                  Faculty Sabbatical &amp; RFPs
                </span>
                <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold rounded-full">
                  Active Window
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Connect directly with Apex Institute academic deans to sponsor applied R&amp;D grants, faculty immersion fellowships, or joint IP patenting.
              </p>
              <Link
                href="/industry/collaboration"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <span>Browse Academic Proposals</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
