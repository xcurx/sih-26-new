'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import AppShell from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';

export default function FacultyInternshipsPage() {
  const { facultyPrograms } = useApp();
  const [applied, setApplied] = useState<{ [id: string]: boolean }>({});

  const fdpsAndSabbaticals = facultyPrograms.filter(
    (p) => p.type === 'sabbatical' || p.type === 'fdp'
  );

  const handleApply = (id: string, title: string) => {
    setApplied((prev) => ({ ...prev, [id]: true }));
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    alert(`Nomination submitted for "${title}"! Sabbatical leave workflow routed to Vice Chancellor.`);
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">business_center</span>
              Academic Upskilling &amp; Corporate Immersions
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Faculty Industry Internships &amp; FDPs
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Industrial sabbatical fellowships, Faculty Development Programs (AICTE &amp; Corporate co-funded), and corporate residencies to align university curriculum with modern engineering practices.
            </p>
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl text-center border border-surface-container">
            <span className="text-[10px] text-outline font-bold uppercase block">Open Fellowships</span>
            <span className="text-sm font-bold text-primary">18 Corporate Opportunities</span>
          </div>
        </section>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fdpsAndSabbaticals.map((prog) => {
            const isApplied = !!applied[prog.id];
            return (
              <div
                key={prog.id}
                className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs flex flex-col justify-between gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-surface-container text-primary">
                      {prog.type === 'sabbatical' ? 'Industrial Sabbatical' : 'Faculty Development Program'}
                    </span>
                    <span className="text-xs font-bold text-tertiary">
                      {prog.slotsAvailable} Slots Available
                    </span>
                  </div>

                  <h3 className="font-title-md text-base font-bold text-on-surface">
                    {prog.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                    <span className="font-bold text-on-surface">{prog.organization}</span>
                    <span>•</span>
                    <span>{prog.domain}</span>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs font-semibold">
                    <span className="text-on-surface">Grant / Honorarium:</span>
                    <span className="text-primary">{prog.fundingAmount}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs">
                  <span className="text-outline">Duration: {prog.duration} • Closes {prog.deadline}</span>
                  {isApplied ? (
                    <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-tertiary-fixed text-on-tertiary-fixed">
                      Nomination Submitted
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(prog.id, prog.title)}
                      className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold shadow-xs transition-all"
                    >
                      Apply for Fellowship
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
