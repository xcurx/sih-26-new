'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';

export default function FacultyMentorshipPage() {
  const { mentorshipRecords } = useApp();
  const [records, setRecords] = useState(mentorshipRecords);
  const [feedbackInput, setFeedbackInput] = useState<{ [id: string]: string }>({});

  const handleSaveFeedback = (id: string) => {
    const text = feedbackInput[id];
    if (!text) return;

    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, lastFeedback: text, lastUpdated: 'Just now' } : r))
    );
    setFeedbackInput((prev) => ({ ...prev, [id]: '' }));
    alert('Weekly feedback recorded and synced with Student Capstone Diary & TPO.');
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">group_work</span>
              Co-Op Capstone Supervision
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Student Internship Mentorship &amp; Milestones
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Monitor student sprint deliverables during industry internships, provide weekly faculty evaluation feedback, and endorse milestone credits required for graduation.
            </p>
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl text-center border border-surface-container">
            <span className="text-[10px] text-outline font-bold uppercase block">Supervised Interns</span>
            <span className="text-sm font-bold text-primary">{records.length} Active Mentees</span>
          </div>
        </section>

        {/* Mentorship Cards List */}
        <div className="flex flex-col gap-5">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs flex flex-col gap-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-base">
                    {rec.studentName.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-title-md text-base font-bold text-on-surface">
                        {rec.studentName}
                      </h3>
                      <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-[11px] font-semibold rounded-md">
                        {rec.company}
                      </span>
                    </div>
                    <span className="text-xs text-primary font-semibold mt-0.5">
                      Project: {rec.projectTitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-tertiary-fixed text-on-tertiary-fixed">
                    {rec.status} ({rec.progressPercent}%)
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div
                  className="bg-tertiary h-full rounded-full transition-all duration-500"
                  style={{ width: `${rec.progressPercent}%` }}
                />
              </div>

              {/* Feedback History */}
              <div className="p-3 bg-surface-container-low rounded-xl text-xs flex flex-col gap-1">
                <span className="font-bold text-on-surface">Last Evaluator Feedback:</span>
                <span className="text-on-surface-variant italic">"{rec.lastFeedback}"</span>
                <span className="text-[10px] text-outline mt-1">Logged on {rec.lastUpdated}</span>
              </div>

              {/* Add Feedback Input */}
              <div className="pt-2 border-t border-surface-container/60 flex items-center gap-3">
                <input
                  type="text"
                  value={feedbackInput[rec.id] || ''}
                  onChange={(e) =>
                    setFeedbackInput((prev) => ({ ...prev, [rec.id]: e.target.value }))
                  }
                  placeholder="Record sprint evaluation, sprint check-in, or mid-term distinction..."
                  className="flex-1 px-3 py-2 bg-surface-container-low border border-surface-container rounded-xl text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  onClick={() => handleSaveFeedback(rec.id)}
                  className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold transition-all shadow-xs shrink-0"
                >
                  Save Feedback
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
