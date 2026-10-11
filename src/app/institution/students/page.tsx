'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';

export default function StudentVerificationPage() {
  const { student } = useApp();
  const [verifiedStatus, setVerifiedStatus] = useState<{ [id: string]: boolean }>({
    std_01: true,
  });

  const studentsList = [
    {
      id: student?.id || 'std_01',
      name: student?.name || 'Aarav Sharma',
      rollNo: student?.rollNo || '21CS042',
      branch: student?.branch || 'Computer Science & Cloud Systems',
      cgpa: student?.cgpa || 8.82,
      readiness: `${student?.readinessIndex || 84.5}%`,
      activeApps: 3,
      status: 'Verified A++',
    },
    {
      id: 'std_02',
      name: 'Priya Patel',
      rollNo: '21DS018',
      branch: 'Data Science & AI',
      cgpa: 9.15,
      readiness: '89.0%',
      activeApps: 4,
      status: 'Verified A++',
    },
    {
      id: 'std_03',
      name: 'Rohan Deshmukh',
      rollNo: '21CS089',
      branch: 'Computer Science & Engineering',
      cgpa: 8.45,
      readiness: '81.2%',
      activeApps: 2,
      status: 'Pending Verification',
    },
  ];

  const toggleVerify = (id: string) => {
    setVerifiedStatus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              Academic Integrity &amp; Credential Attestation
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Student Verification Roster &amp; Credentials
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Verify academic grades, check disciplinary standing, validate external certificates, and issue cryptographically attested transcripts for campus recruitment drives.
            </p>
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl text-center border border-surface-container">
            <span className="text-[10px] text-outline font-bold uppercase block">Cohort Roster</span>
            <span className="text-sm font-bold text-primary">1,480 Active Candidates</span>
          </div>
        </section>

        {/* Student Roster Table */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-container">
            <h2 className="font-title-lg text-base font-bold text-on-surface">
              Candidate Credential Attestation List
            </h2>
            <span className="text-xs text-outline">Batch of 2025</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-surface-container text-outline uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3">Roll No</th>
                  <th className="py-3 px-3">Department</th>
                  <th className="py-3 px-3">CGPA</th>
                  <th className="py-3 px-3">Readiness</th>
                  <th className="py-3 px-3">Active Apps</th>
                  <th className="py-3 px-3">TPO Attestation</th>
                  <th className="py-3 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {studentsList.map((st) => {
                  const isV = !!verifiedStatus[st.id];
                  return (
                    <tr key={st.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="py-3.5 px-3 font-bold text-on-surface">{st.name}</td>
                      <td className="py-3.5 px-3 text-on-surface-variant">{st.rollNo}</td>
                      <td className="py-3.5 px-3 text-on-surface-variant">{st.branch}</td>
                      <td className="py-3.5 px-3 font-bold text-on-surface">{st.cgpa}</td>
                      <td className="py-3.5 px-3 font-semibold text-primary">{st.readiness}</td>
                      <td className="py-3.5 px-3">{st.activeApps} Drives</td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            isV
                              ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                              : 'bg-surface-container text-on-surface-variant'
                          }`}
                        >
                          {isV ? 'Verified ✓' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <button
                          onClick={() => toggleVerify(st.id)}
                          className="px-3 py-1 bg-surface-container hover:bg-surface-container-high text-primary rounded-lg font-bold text-xs transition-colors"
                        >
                          {isV ? 'Revoke' : 'Attest'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
