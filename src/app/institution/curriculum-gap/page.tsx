'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';

export default function CurriculumGapPage() {
  const [selectedDept, setSelectedDept] = useState('Computer Science');

  const gapAnalysis = [
    {
      domain: 'Cloud Orchestration & Containers',
      curriculumStatus: 'Basic Docker introduced in Elective',
      industryDemand: 'Production Kubernetes (CRDs, Helm, Service Mesh) in 84% of postings',
      gapSeverity: 'Critical Deficit',
      recommendedAction: 'Replace traditional VM lab with hands-on CNCF Kubernetes cluster in 6th Sem.',
      severityColor: 'text-error bg-error-container',
    },
    {
      domain: 'Distributed Observability & Telemetry',
      curriculumStatus: 'Standard syslog and print debugging',
      industryDemand: 'OpenTelemetry, Prometheus metrics, distributed tracing expected in Tier-1',
      gapSeverity: 'High Gap',
      recommendedAction: 'Integrate OpenTelemetry instrumentation into Cloud Systems Lab.',
      severityColor: 'text-error bg-error-container',
    },
    {
      domain: 'Distributed Consensus & Replication',
      curriculumStatus: 'Theoretical mention of 2PC (Two-Phase Commit)',
      industryDemand: 'Practical Raft, Paxos, and quorum protocols required for backend roles',
      gapSeverity: 'Moderate Gap',
      recommendedAction: 'Add Raft key-value store programming project to Operating Systems.',
      severityColor: 'text-primary bg-primary-fixed',
    },
    {
      domain: 'Infrastructure as Code (IaC)',
      curriculumStatus: 'Not included in baseline syllabus',
      industryDemand: 'Terraform, Pulumi, and CloudFormation required across SRE roles',
      gapSeverity: 'High Gap',
      recommendedAction: 'Adopt AWS Educate Terraform modules as mandatory credit module.',
      severityColor: 'text-error bg-error-container',
    },
    {
      domain: 'Data Structures & Algorithmic Foundations',
      curriculumStatus: 'Covered extensively in 3rd & 4th Sem (95% mastery)',
      industryDemand: 'Aligns well with Tier-1 coding screening bars',
      gapSeverity: 'Syllabus Aligned',
      recommendedAction: 'Maintain current CodeSignal / LeetCode integrated lab format.',
      severityColor: 'text-tertiary bg-tertiary-fixed',
    },
  ];

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">balance</span>
              Curriculum Intelligence &amp; Industry Alignment
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Curriculum vs. Real-Time Industry Skill Gap Matrix
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Automated synthesis benchmarking current academic syllabus against aggregate requisitions posted by Tier-1 corporate partners.
            </p>
          </div>

          <button
            onClick={() => alert('Curriculum Revision Advisory Report generated for Academic Senate.')}
            className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">summarize</span>
            <span>Export Senate Revision Report</span>
          </button>
        </section>

        {/* Matrix Table Card */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-container">
            <h2 className="font-title-lg text-base font-bold text-on-surface">
              Domain Competency Deficit Matrix
            </h2>
            <span className="text-xs text-outline">
              Calibrated against 142 visiting tech recruiters
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-surface-container text-outline uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-2">Domain</th>
                  <th className="py-3 px-2">Current Syllabus Offering</th>
                  <th className="py-3 px-2">Industry Market Demand</th>
                  <th className="py-3 px-2">Deficit Status</th>
                  <th className="py-3 px-2">Actionable Revision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {gapAnalysis.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3.5 px-2 font-bold text-on-surface">{row.domain}</td>
                    <td className="py-3.5 px-2 text-on-surface-variant">{row.curriculumStatus}</td>
                    <td className="py-3.5 px-2 text-on-surface font-medium">{row.industryDemand}</td>
                    <td className="py-3.5 px-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${row.severityColor}`}>
                        {row.gapSeverity}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-primary font-medium">{row.recommendedAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
