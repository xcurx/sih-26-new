'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { ApplicationStatus } from '@/types';

export default function StudentApplicationsPage() {
  const { applications, student } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredApps = applications.filter((app) => {
    if (selectedStatus === 'all') return true;
    return app.status === selectedStatus;
  });

  const stages: { label: string; key: string }[] = [
    { label: 'All Applications', key: 'all' },
    { label: 'Applied', key: 'applied' },
    { label: 'Shortlisted', key: 'shortlisted' },
    { label: 'Interview Scheduled', key: 'interview' },
    { label: 'Offer / PPO', key: 'offer' },
  ];

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">assignment_turned_in</span>
              Centralized Recruitment ATS
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              My Applications &amp; Interview Pipeline
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Track multi-stage recruitment status, technical interview schedules, and recruiter feedback synchronized across campus portals.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/student/internships"
              className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Explore More Openings</span>
            </Link>
          </div>
        </section>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {stages.map((st) => (
            <button
              key={st.key}
              onClick={() => setSelectedStatus(st.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStatus === st.key
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {st.label} ({st.key === 'all' ? applications.length : applications.filter((a) => a.status === st.key).length})
            </button>
          ))}
        </div>

        {/* Applications List */}
        <div className="flex flex-col gap-4">
          {filteredApps.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-lowest rounded-xl border border-surface-container">
              <span className="material-symbols-outlined text-outline text-[48px]">inbox</span>
              <h3 className="font-title-md text-base font-semibold text-on-surface mt-2">
                No applications in this stage
              </h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Browse recommended openings and apply using 1-Click verified credentials.
              </p>
              <Link
                href="/student/internships"
                className="mt-4 inline-block px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold"
              >
                Find Internships
              </Link>
            </div>
          ) : (
            filteredApps.map((app) => (
              <div
                key={app.id}
                className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">business</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h3 className="font-title-md text-base font-bold text-on-surface">
                          {app.jobTitle}
                        </h3>
                        <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-[11px] font-semibold rounded-md">
                          {app.company}
                        </span>
                      </div>
                      <span className="text-xs text-on-surface-variant mt-0.5">
                        Applied on {app.appliedDate} • Candidate ID: {app.studentId}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-xs font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                      {app.matchScore}% Match
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        app.status === 'interview'
                          ? 'bg-primary text-on-primary'
                          : app.status === 'shortlisted'
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : app.status === 'offer'
                          ? 'bg-tertiary text-on-tertiary'
                          : 'bg-surface-container text-on-surface'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                </div>

                {/* Progress Pipeline Strip */}
                <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      info
                    </span>
                    <span className="text-on-surface font-medium">{app.notes}</span>
                  </div>
                  {app.interviewDate && (
                    <div className="flex items-center gap-1.5 bg-primary-fixed px-2.5 py-1 rounded-lg text-on-primary-fixed font-bold text-xs shrink-0">
                      <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                      <span>Interview: Oct 18, 2024 at 2:00 PM</span>
                    </div>
                  )}
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-on-surface-variant font-medium">Matched Competencies:</span>
                  {app.matchedSkills.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full bg-surface-container text-tertiary font-semibold flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[12px]">check</span>
                      {m}
                    </span>
                  ))}
                  {app.gapSkills.length > 0 && (
                    <span className="text-error font-medium">
                      ({app.gapSkills.length} Gap Recommended to study)
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
