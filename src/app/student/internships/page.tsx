'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppShell from '@/components/layout/AppShell';
import MetricCard from '@/components/common/MetricCard';
import JobCard from '@/components/common/JobCard';
import { useApp } from '@/context/AppContext';

export default function InternshipsPage() {
  const { jobs, applications, student, searchQuery } = useApp();

  const [locationFilter, setLocationFilter] = useState('All');
  const [facultyOnly, setFacultyOnly] = useState(false);
  const [minMatch80, setMinMatch80] = useState(true);

  // Filter internships only
  const internships = jobs.filter((j) => j.roleType === 'internship');

  // Apply filters
  const filteredJobs = internships.filter((job) => {
    if (facultyOnly && !job.facultyMentored) return false;
    if (locationFilter !== 'All') {
      if (locationFilter === 'Remote' && !job.isRemote) return false;
      if (locationFilter === 'Bangalore' && !job.location.includes('Bangalore')) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.requiredSkills.some((s) => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header Section with Context */}
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
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface tracking-tight">
              Industry Internships &amp; Apprenticeships
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Personalized recommendations calibrated to your verified academic transcript and project repo index (
              <strong className="text-primary font-semibold">Computer Science &amp; Cloud Systems</strong>).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface px-3 py-2 rounded-xl transition-all shadow-xs text-xs font-semibold">
              <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
              <span>Credential Status: Active</span>
            </button>
            <Link
              href="/student/assessment"
              className="flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-xl shadow-xs transition-all text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Calibrate Skills</span>
            </Link>
          </div>
        </section>

        {/* Quick Stats Metric Strip (Exact Stitch Screen 1) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Applied (Active)"
            value="6"
            deltaText="2 this week"
            deltaType="positive"
            icon="send"
            subtext="Live Campus ATS"
            highlightColor="primary"
          />
          <MetricCard
            title="Interview Rounds"
            value="2"
            subtext="Microsoft, Razorpay"
            icon="event_available"
            highlightColor="primary"
          />
          <MetricCard
            title="Skill Match Avg"
            value="86%"
            deltaText="Top 8% in Cohort"
            deltaType="positive"
            icon="radar"
            highlightColor="tertiary"
          />
          <MetricCard
            title="Offers Received"
            value="1"
            subtext="Pre-Placement (PPO)"
            icon="workspace_premium"
            highlightColor="tertiary"
          />
        </section>

        {/* Interactive Search and Filter Bar */}
        <section className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container shadow-xs flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                type="text"
                defaultValue="Kubernetes, Backend, Cloud Systems"
                placeholder="Search keywords: Kubernetes, Backend, Data Science, Microservices..."
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low text-on-surface rounded-xl text-xs font-medium focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-primary border border-transparent focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 text-xs">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-3 py-2 bg-surface-container text-on-surface rounded-xl font-semibold hover:bg-surface-container-high transition-colors appearance-none cursor-pointer pr-7"
              >
                <option value="All">Location: All</option>
                <option value="Bangalore">Bangalore (Hybrid)</option>
                <option value="Remote">Remote Only</option>
              </select>

              <button
                onClick={() => setMinMatch80(!minMatch80)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold transition-all shrink-0 ${
                  minMatch80
                    ? 'bg-primary-fixed text-on-primary-fixed'
                    : 'bg-surface-container text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                <span>Skill Match &gt;80%</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-on-surface-variant border-t border-surface-container/60">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={facultyOnly}
                onChange={(e) => setFacultyOnly(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
              />
              <span className="text-on-surface font-medium">
                Faculty Mentored Capstone Projects Only
              </span>
            </label>
            <div className="flex items-center gap-1 text-on-surface font-semibold">
              <span>Sort by:</span>
              <span className="text-primary flex items-center gap-0.5 cursor-pointer">
                AI Affinity Score
                <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
              </span>
            </div>
          </div>
        </section>

        {/* Main Body Grid: 65% Openings Feed / 35% Tracker & Verification Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Job Cards */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-title-lg text-base font-bold text-on-surface">
                  Curated Industry Openings
                </span>
                <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant rounded-full text-[11px] font-bold">
                  {filteredJobs.length} Highlighted
                </span>
              </div>
              <span className="text-xs text-on-surface-variant flex items-center gap-1 font-medium">
                <span className="inline-block w-2 h-2 rounded-full bg-tertiary"></span>
                Live-Sync with Campus ATS
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>

          {/* Right Column: Pre-Interview Verification & Active Applications */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Active Pipeline Preview */}
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <h3 className="font-title-md text-sm font-bold text-on-surface">
                  Live Application Status
                </h3>
                <Link
                  href="/student/applications"
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  View Full ATS
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                {applications.slice(0, 3).map((app) => (
                  <div
                    key={app.id}
                    className="p-3 bg-surface-container-low rounded-xl flex items-start justify-between gap-3"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-xs text-on-surface">{app.company}</span>
                      <span className="text-[11px] text-on-surface-variant line-clamp-1">
                        {app.jobTitle}
                      </span>
                      <span className="text-[10px] text-outline mt-1">{app.notes}</span>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase shrink-0 ${
                        app.status === 'interview'
                          ? 'bg-primary text-on-primary'
                          : app.status === 'shortlisted'
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Faculty Supervision Card */}
            <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">co_present</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-on-surface">Faculty Mentor Assigned</span>
                  <span className="text-[11px] text-on-surface-variant">
                    Dr. Ramesh Rao (Head of Cloud Systems)
                  </span>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                All 6-month industry internships earn 12 academic credits toward the Capstone Engineering requirement. Weekly attendance and sprint deliverables are logged automatically.
              </p>
              <Link
                href="/faculty/dashboard"
                className="mt-1 text-xs text-primary font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Academic Guideline &amp; NAAC Criteria</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
