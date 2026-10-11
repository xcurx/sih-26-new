'use client';

import React from 'react';
import AppShell from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';

export default function DigitalPortfolioPage() {
  const { student } = useApp();

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header Profile Hero Block */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={student?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={student?.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-primary/10 shadow-md shrink-0"
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-headline-lg text-2xl font-bold text-on-surface">
                  {student?.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-tertiary-fixed text-on-tertiary-fixed flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  TPO Verified Profile
                </span>
              </div>
              <span className="text-sm font-semibold text-primary">
                {student?.targetRole}
              </span>
              <span className="text-xs text-on-surface-variant">
                Roll No: {student?.rollNo} • {student?.branch} • {student?.college} • CGPA: {student?.cgpa}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap self-stretch sm:self-auto">
            <button
              onClick={() => alert('Official Verified Academic & Skill Transcript downloaded (cryptographically signed by Registrar).')}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Download Verified Transcript</span>
            </button>
            <a
              href="https://github.com/aaravsharma-cloud"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">code</span>
              <span>GitHub</span>
            </a>
          </div>
        </section>

        {/* 3-Column Bento of Verified Assets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Verified Technical Competencies */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <h2 className="font-title-md text-sm font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[20px]">fact_check</span>
                Verified Skills ({student?.skills.length})
              </h2>
              <span className="text-[10px] text-tertiary font-bold bg-tertiary-fixed px-2 py-0.5 rounded-full">
                Blockchain Attested
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {student?.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-surface-container-low rounded-xl flex items-center justify-between text-xs"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-on-surface">{skill.name}</span>
                    <span className="text-[10px] text-on-surface-variant truncate max-w-[180px]">
                      {skill.verifiedBy}
                    </span>
                  </div>
                  <span className="font-bold text-primary">{skill.proficiency}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Projects & Repositories */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <h2 className="font-title-md text-sm font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[20px]">terminal</span>
                Vetted Capstone Projects
              </h2>
              <span className="text-[10px] text-outline font-semibold">3 Highlighted</span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-on-surface">
                    Raft Consensus Distributed Key-Value Store
                  </span>
                  <span className="text-[10px] font-bold text-tertiary">Grade A+</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Engineered leader election and atomic log replication in Go with simulated network partitions.
                </p>
                <div className="flex items-center gap-1 text-[10px] text-outline font-medium pt-1">
                  <span>Go</span> • <span>Docker</span> • <span>Distributed Systems Lab</span>
                </div>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-on-surface">
                    Autonomous Kubernetes Pod Autoscaler
                  </span>
                  <span className="text-[10px] font-bold text-tertiary">Grade A+</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Custom CRD and controller predicting memory spikes via sliding window linear regression.
                </p>
                <div className="flex items-center gap-1 text-[10px] text-outline font-medium pt-1">
                  <span>Kubernetes CRD</span> • <span>Prometheus</span> • <span>Python</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secure Document Vault */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <h2 className="font-title-md text-sm font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[20px]">folder_shared</span>
                Document Vault
              </h2>
              <span className="text-[10px] text-tertiary font-bold">Encrypted</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-[20px]">picture_as_pdf</span>
                  <div className="flex flex-col">
                    <span className="font-semibold text-on-surface">Aarav_Sharma_Resume_2025.pdf</span>
                    <span className="text-[10px] text-on-surface-variant">ATS Score: 96/100</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Resume preview opened.')}
                  className="text-primary font-bold text-xs hover:underline"
                >
                  View
                </button>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                  <div className="flex flex-col">
                    <span className="font-semibold text-on-surface">AWS_Solutions_Architect.pdf</span>
                    <span className="text-[10px] text-on-surface-variant">Validated via Credly</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Credential Certificate verified.')}
                  className="text-primary font-bold text-xs hover:underline"
                >
                  Verify
                </button>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">description</span>
                  <div className="flex flex-col">
                    <span className="font-semibold text-on-surface">Official_Grade_Transcript_Sem6.pdf</span>
                    <span className="text-[10px] text-on-surface-variant">Digitally Signed by Dean</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Official Grade Transcript opened.')}
                  className="text-primary font-bold text-xs hover:underline"
                >
                  View
                </button>
              </div>
            </div>

            <button
              onClick={() => alert('Upload Document dialog opened: Please select PDF/DOCX to attach.')}
              className="mt-2 w-full py-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">upload</span>
              <span>Upload New Certificate / Achievement</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
