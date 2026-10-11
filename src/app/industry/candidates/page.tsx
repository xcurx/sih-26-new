'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import AppShell from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';

export default function IndustryCandidatesPage() {
  const { student } = useApp();
  const [filterSkill, setFilterSkill] = useState('All');
  const [invited, setInvited] = useState<{ [id: string]: boolean }>({});

  // Mock a pool of candidates including active student
  const candidates = [
    {
      id: student?.id || 'std_01',
      name: student?.name || 'Aarav Sharma',
      branch: student?.branch || 'Computer Science & Cloud Systems',
      cgpa: student?.cgpa || 8.82,
      readinessIndex: student?.readinessIndex || 84.5,
      targetRole: student?.targetRole || 'Cloud Solutions Architect',
      skills: ['Data Structures (95%)', 'Cloud Architecture (88%)', 'Go/Python (92%)', 'Linux (86%)'],
      affinityScore: 94,
      avatar: student?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'std_02',
      name: 'Priya Patel',
      branch: 'Data Science & Artificial Intelligence',
      cgpa: 9.15,
      readinessIndex: 89.0,
      targetRole: 'Machine Learning Infrastructure Engineer',
      skills: ['PyTorch (94%)', 'Distributed Training (86%)', 'CUDA (78%)', 'MLOps (82%)'],
      affinityScore: 91,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'std_03',
      name: 'Rohan Deshmukh',
      branch: 'Computer Science & Engineering',
      cgpa: 8.45,
      readinessIndex: 81.2,
      targetRole: 'Site Reliability Engineer',
      skills: ['Kubernetes (88%)', 'Terraform (85%)', 'Observability (84%)', 'Golang (79%)'],
      affinityScore: 87,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    },
  ];

  const handleInvite = (id: string, name: string) => {
    setInvited((prev) => ({ ...prev, [id]: true }));
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    alert(`Fast-track interview invitation dispatched to ${name}!`);
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">person_search</span>
              AI Talent Matchmaking Engine
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Verified Candidate Talent Pool
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Explore students across accredited departments ranked by proctored test percentiles, verified GitHub commits, and syllabus match matrices.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-tertiary-fixed text-on-tertiary-fixed rounded-xl text-xs font-bold">
              1,480 Verified Cohort Profiles
            </span>
          </div>
        </section>

        {/* Candidate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {candidates.map((cand) => {
            const isInvited = !!invited[cand.id];
            return (
              <div
                key={cand.id}
                className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col justify-between gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={cand.avatar}
                        alt={cand.name}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-primary/10 shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="font-title-md text-sm font-bold text-on-surface">
                          {cand.name}
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          {cand.branch} • CGPA: {cand.cgpa}
                        </span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-xs font-bold flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                      {cand.affinityScore}% Match
                    </span>
                  </div>

                  <div className="p-2.5 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant">Readiness Benchmark:</span>
                    <span className="font-bold text-primary">{cand.readinessIndex}% Readiness</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                      Verified Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cand.skills.map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 bg-surface-container text-on-surface rounded-md text-[11px] font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-surface-container flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant">Class of 2025</span>
                  {isInvited ? (
                    <span className="px-3 py-1.5 bg-tertiary-fixed text-on-tertiary-fixed rounded-xl text-xs font-bold">
                      Interview Dispatched
                    </span>
                  ) : (
                    <button
                      onClick={() => handleInvite(cand.id, cand.name)}
                      className="px-3.5 py-1.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">mail</span>
                      <span>Invite to Interview</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
