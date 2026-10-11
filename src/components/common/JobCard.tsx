'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { JobOpportunity } from '@/types';
import { useApp } from '@/context/AppContext';

interface JobCardProps {
  job: JobOpportunity;
}

export default function JobCard({ job }: JobCardProps) {
  const { student, applications, applyToJob } = useApp();
  const [isApplying, setIsApplying] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const existingApplication = applications.find(
    (a) => a.jobId === job.id && a.studentId === student?.id
  );
  const isApplied = !!existingApplication;

  // Calculate matching vs gap skills
  const studentSkillNames = student?.skills.map((s) => s.name.toLowerCase()) || [];
  const matchedSkills = job.requiredSkills.filter((req) =>
    studentSkillNames.some((s) => s.includes(req.toLowerCase()) || req.toLowerCase().includes(s.split(' ')[0].toLowerCase()))
  );
  const gapSkills = job.requiredSkills.filter((req) => !matchedSkills.includes(req));

  const matchPercent = Math.max(
    65,
    Math.min(98, Math.round((matchedSkills.length / job.requiredSkills.length) * 100))
  );

  const handleApply = async () => {
    if (isApplied || isApplying) return;
    setIsApplying(true);
    const success = await applyToJob(job.id);
    setIsApplying(false);

    if (success) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  return (
    <article className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs hover:shadow-md transition-all flex flex-col gap-space-md border border-surface-container group">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-space-sm">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0 text-primary">
            <span className="material-symbols-outlined text-[28px]">
              {job.roleType === 'internship' ? 'cloud' : 'business_center'}
            </span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors font-semibold">
              {job.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-on-surface-variant font-body-sm text-xs mt-0.5">
              <span className="font-semibold text-on-surface">{job.company}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[15px]">pin_drop</span>
                {job.location}
              </span>
              {job.duration && (
                <>
                  <span>•</span>
                  <span>{job.duration} Duration</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="px-2.5 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full font-label-sm text-xs font-semibold flex items-center gap-1 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            {matchPercent}% Skill Match
          </span>
          <span className="font-label-sm text-[11px] text-tertiary font-medium">
            {matchPercent >= 85 ? 'Top 5% Candidate' : 'Qualified Applicant'}
          </span>
        </div>
      </div>

      {/* Compensation & Conversion Info */}
      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 bg-surface-container-low px-space-md py-2.5 rounded-xl text-xs font-semibold">
        <div className="flex items-center gap-1.5 text-on-surface">
          <span className="material-symbols-outlined text-primary text-[18px]">payments</span>
          <span>{job.stipend || job.ctc || 'Competitive Industry Scale'}</span>
        </div>
        {job.ppoAvailable && (
          <>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-1.5 text-tertiary font-semibold">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Conversion to PPO Available</span>
            </div>
          </>
        )}
        {job.startDate && (
          <>
            <span className="text-outline-variant">•</span>
            <span className="text-on-surface-variant">Starts {job.startDate}</span>
          </>
        )}
        {job.facultyMentored && (
          <>
            <span className="text-outline-variant">•</span>
            <span className="text-primary font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">school</span>
              Faculty Capstone Endorsed
            </span>
          </>
        )}
      </div>

      {/* Description Snippet */}
      <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
        {job.description}
      </p>

      {/* Skills Comparison Grid */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-xs">
          <span>Required vs. Verified Skills:</span>
          <span className="text-tertiary">
            {matchedSkills.length} Matched • {gapSkills.length} Gap Suggested
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {matchedSkills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-surface-container text-tertiary rounded-full font-label-sm text-xs flex items-center gap-1 font-semibold"
            >
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              {skill} (Match)
            </span>
          ))}
          {gapSkills.map((gap, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-surface-container-high text-error rounded-full font-label-sm text-xs flex items-center gap-1 font-semibold"
            >
              <span className="material-symbols-outlined text-[14px]">warning</span>
              {gap} (Skill Gap)
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-surface-container/60">
        <span className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px] text-primary">history_edu</span>
          Verified via Operating Systems &amp; Cloud Lab
        </span>
        <div className="flex items-center gap-space-xs">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-xl transition-colors"
            title="Bookmark Requisition"
          >
            <span className="material-symbols-outlined text-[20px]">
              {bookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>

          {isApplied ? (
            <span className="px-4 py-2 bg-surface-container text-tertiary rounded-xl font-label-md text-xs font-semibold flex items-center gap-1.5 border border-tertiary/20">
              <span className="material-symbols-outlined text-[16px]">task_alt</span>
              Applied ({existingApplication.status.toUpperCase()})
            </span>
          ) : (
            <button
              onClick={handleApply}
              disabled={isApplying}
              className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-md text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-70"
            >
              <span>{isApplying ? 'Submitting...' : '1-Click Apply'}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
