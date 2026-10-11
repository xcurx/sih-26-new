'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import AppShell from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';

export default function LearningProgramsPage() {
  const { learningPrograms, student } = useApp();
  const [enrolledCourses, setEnrolledCourses] = useState<{ [id: string]: boolean }>({
    lp_01: true,
  });

  const handleEnroll = (id: string, title: string) => {
    setEnrolledCourses((prev) => ({ ...prev, [id]: true }));
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    alert(`Successfully enrolled in "${title}"! Module labs unlocked.`);
  };

  const bridgePrograms = learningPrograms.filter((p) => p.isBridgeCourse);
  const generalPrograms = learningPrograms.filter((p) => !p.isBridgeCourse);

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">school</span>
              Industry Learning &amp; Upskilling Hub
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Co-Sponsored Industry Learning &amp; Bridge Modules
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Targeted curriculum published by tech leaders (CNCF, Google Cloud, Microsoft Azure, Razorpay) designed specifically to resolve verified candidate skill gaps.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-surface-container-low rounded-xl text-center border border-surface-container">
              <span className="text-[10px] text-outline font-bold uppercase block">Enrolled Courses</span>
              <span className="text-sm font-bold text-primary">
                {Object.keys(enrolledCourses).length} Modules
              </span>
            </div>
            <div className="p-3 bg-tertiary-fixed/30 rounded-xl text-center border border-tertiary/20">
              <span className="text-[10px] text-tertiary font-bold uppercase block">Certifications</span>
              <span className="text-sm font-bold text-tertiary">3 Verified</span>
            </div>
          </div>
        </section>

        {/* Section 1: AI Recommended Bridge Programs */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-title-lg text-lg font-bold text-on-surface">
                Recommended Bridge Programs (Skill Gap Resolvers)
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-error-container text-on-error-container">
                Calibrated to Gaps
              </span>
            </div>
            <span className="text-xs text-on-surface-variant">
              Guaranteed boost to interview shortlisting rates
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {bridgePrograms.map((prog) => {
              const isEnrolled = !!enrolledCourses[prog.id];
              return (
                <div
                  key={prog.id}
                  className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col justify-between gap-4 hover:shadow-md transition-shadow group"
                >
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-surface-container text-primary">
                        {prog.domain}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-error-container text-on-error-container">
                        Bridges: {prog.targetGapSkill}
                      </span>
                    </div>

                    <h3 className="font-title-md text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                      {prog.title}
                    </h3>

                    <span className="text-xs text-primary font-semibold">
                      {prog.provider}
                    </span>

                    <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                      {prog.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {prog.skillsTaught.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 bg-surface-container-low text-on-surface text-[11px] font-medium rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-surface-container flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                      <span>{prog.duration}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-tertiary font-bold">
                        ★ {prog.rating}
                      </span>
                    </div>

                    {isEnrolled ? (
                      <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-tertiary-fixed text-on-tertiary-fixed flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span>In Progress</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleEnroll(prog.id, prog.title)}
                        className="px-3.5 py-1.5 bg-primary hover:bg-primary-container text-on-primary rounded-lg text-xs font-bold transition-all shadow-xs"
                      >
                        Enroll Fast-Track
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Advanced Electives & Masterclasses */}
        <div className="flex flex-col gap-4 mt-2">
          <h2 className="font-title-lg text-lg font-bold text-on-surface">
            Industry Masterclasses &amp; Corporate Certifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {generalPrograms.map((prog) => {
              const isEnrolled = !!enrolledCourses[prog.id];
              return (
                <div
                  key={prog.id}
                  className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col justify-between gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <span className="px-2 py-0.5 self-start rounded-md text-[10px] font-bold uppercase bg-surface-container text-primary">
                      {prog.domain}
                    </span>
                    <h3 className="font-title-md text-base font-bold text-on-surface">
                      {prog.title}
                    </h3>
                    <span className="text-xs text-on-surface-variant font-medium">
                      Instructor: {prog.provider}
                    </span>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {prog.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-surface-container flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant">{prog.duration} • {prog.enrolledCount} Students Enrolled</span>
                    {isEnrolled ? (
                      <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-tertiary-fixed text-on-tertiary-fixed">
                        Enrolled
                      </span>
                    ) : (
                      <button
                        onClick={() => handleEnroll(prog.id, prog.title)}
                        className="px-3.5 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg text-xs font-bold transition-colors"
                      >
                        Enroll Free
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
