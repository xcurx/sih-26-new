'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { ApplicationStatus } from '@/types';

export default function IndustryApplicantsPage() {
  const { applications, updateApplicationStatus } = useApp();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const statuses: { label: string; value: string }[] = [
    { label: 'All Applicants', value: 'all' },
    { label: 'Applied (New)', value: 'applied' },
    { label: 'Shortlisted', value: 'shortlisted' },
    { label: 'Interview Scheduled', value: 'interview' },
    { label: 'Offer Extended', value: 'offer' },
  ];

  const filtered = applications.filter((a) => {
    if (activeTab === 'all') return true;
    return a.status === activeTab;
  });

  const handleStatusChange = (appId: string, newStatus: ApplicationStatus) => {
    updateApplicationStatus(appId, newStatus);
  };

  const handleSaveNotes = (appId: string) => {
    const existing = applications.find((a) => a.id === appId);
    if (existing) {
      updateApplicationStatus(appId, existing.status, noteText);
    }
    setEditingNotesId(null);
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">view_kanban</span>
              Corporate Applicant Tracking System (ATS)
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Recruitment Pipeline &amp; Candidate Reviews
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Review applicant skill compatibility, schedule panel interviews, record evaluation rubrics, and extend verified campus offers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 bg-primary-fixed text-on-primary-fixed rounded-xl text-xs font-bold">
              {applications.length} Candidates in Pipeline
            </span>
          </div>
        </section>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {statuses.map((st) => (
            <button
              key={st.value}
              onClick={() => setActiveTab(st.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === st.value
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {st.label} ({st.value === 'all' ? applications.length : applications.filter((a) => a.status === st.value).length})
            </button>
          ))}
        </div>

        {/* Applicants List */}
        <div className="flex flex-col gap-4">
          {filtered.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-lowest rounded-xl border border-surface-container">
              <span className="material-symbols-outlined text-outline text-[48px]">inbox</span>
              <h3 className="font-title-md text-base font-semibold text-on-surface mt-2">
                No candidates in this pipeline stage
              </h3>
            </div>
          ) : (
            filtered.map((app) => (
              <div
                key={app.id}
                className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-base shrink-0">
                      {app.studentName.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-title-md text-base font-bold text-on-surface">
                          {app.studentName}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-tertiary-fixed text-on-tertiary-fixed flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                          {app.matchScore}% Skill Match
                        </span>
                      </div>
                      <span className="text-xs text-on-surface-variant mt-0.5">
                        Applied for: <strong className="text-on-surface">{app.jobTitle}</strong> ({app.company}) • Applied {app.appliedDate}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        Branch: {app.studentBranch} • CGPA: {app.studentCgpa}
                      </span>
                    </div>
                  </div>

                  {/* Move Pipeline Status Control */}
                  <div className="flex items-center gap-2 flex-wrap self-start lg:self-auto">
                    <span className="text-xs font-semibold text-on-surface-variant">Stage:</span>
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                      className="px-3 py-1.5 rounded-xl border border-surface-container bg-surface-container-low text-on-surface text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    >
                      <option value="applied">Applied</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="interview">Interview Scheduled</option>
                      <option value="offer">Offer Extended (PPO)</option>
                      <option value="rejected">Archive / Reject</option>
                    </select>

                    <button
                      onClick={() => alert(`Official Verified Academic Transcript for ${app.studentName} downloaded.`)}
                      className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">description</span>
                      <span>Transcript</span>
                    </button>
                  </div>
                </div>

                {/* Match vs Gap breakdown */}
                <div className="flex flex-wrap items-center gap-2 text-xs p-3 bg-surface-container-low rounded-xl">
                  <span className="font-semibold text-on-surface">Skills Compatibility:</span>
                  {app.matchedSkills.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-surface-container text-tertiary font-bold rounded-md text-[11px]"
                    >
                      ✓ {m}
                    </span>
                  ))}
                  {app.gapSkills.map((g, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-error-container text-on-error-container font-semibold rounded-md text-[11px]"
                    >
                      Gap: {g}
                    </span>
                  ))}
                </div>

                {/* Recruiter Evaluation Notes */}
                <div className="flex items-start justify-between gap-3 text-xs pt-1">
                  {editingNotesId === app.id ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Add recruitment note, evaluation feedback, or interview slot..."
                        className="flex-1 px-3 py-1.5 bg-surface-container-low border border-surface-container rounded-lg text-xs"
                      />
                      <button
                        onClick={() => handleSaveNotes(app.id)}
                        className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-bold"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingNotesId(null)}
                        className="px-3 py-1.5 bg-surface-container text-on-surface rounded-lg text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 flex-1">
                      <span className="material-symbols-outlined text-outline text-[16px]">notes</span>
                      <span className="text-on-surface-variant font-medium">
                        {app.notes || 'No evaluator feedback recorded yet.'}
                      </span>
                      <button
                        onClick={() => {
                          setEditingNotesId(app.id);
                          setNoteText(app.notes || '');
                        }}
                        className="text-primary font-semibold hover:underline ml-2"
                      >
                        Edit Note
                      </button>
                    </div>
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
