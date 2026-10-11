'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';

export default function IndustryProgramsPage() {
  const { learningPrograms } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('Cloud Infrastructure');
  const [duration, setDuration] = useState('4 Weeks');
  const [gapSkill, setGapSkill] = useState('Kubernetes Orchestration');
  const [description, setDescription] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Program "${title}" submitted to Academic Board for accreditation!`);
    setShowModal(false);
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">cast_for_education</span>
              Corporate Curriculum &amp; Upskilling Initiative
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Co-Sponsored Industry Learning Programs
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Publish structured micro-credentials, hackathons, and bridge courses to nurture talent with the exact tools and paradigms needed by your engineering teams.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Publish New Course / Module</span>
          </button>
        </section>

        {/* Existing Published Programs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {learningPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-surface-container text-primary">
                    {prog.domain}
                  </span>
                  {prog.isBridgeCourse && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-error-container text-on-error-container">
                      Bridge: {prog.targetGapSkill}
                    </span>
                  )}
                </div>
                <h3 className="font-title-md text-base font-bold text-on-surface">
                  {prog.title}
                </h3>
                <span className="text-xs text-primary font-semibold">
                  Partner: {prog.provider}
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {prog.description}
                </p>
              </div>

              <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs text-on-surface-variant">
                <span>{prog.duration} • {prog.enrolledCount} Active Students</span>
                <span className="text-tertiary font-bold">★ {prog.rating} (Rating)</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-secondary/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 border border-surface-container shadow-xl">
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-3">
                Publish Industry Upskilling Course
              </h3>
              <form onSubmit={handleCreate} className="flex flex-col gap-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">Course Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Production Microservices with Go"
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Target Skill Gap to Resolve</label>
                  <input
                    type="text"
                    value={gapSkill}
                    onChange={(e) => setGapSkill(e.target.value)}
                    placeholder="e.g. Kubernetes, Observability"
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe laboratory exercises and learning goals..."
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-surface-container">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-surface-container rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-on-primary rounded-lg font-bold"
                  >
                    Publish Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
