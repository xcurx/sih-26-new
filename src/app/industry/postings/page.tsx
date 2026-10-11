'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import AppShell from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';

export default function IndustryPostingsPage() {
  const router = useRouter();
  const { createJobPosting, jobs } = useApp();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('Microsoft Azure');
  const [roleType, setRoleType] = useState<'internship' | 'placement'>('internship');
  const [location, setLocation] = useState('Bangalore (Hybrid)');
  const [isRemote, setIsRemote] = useState(false);
  const [compensation, setCompensation] = useState('₹70,000 / month');
  const [duration, setDuration] = useState('6 Months');
  const [startDate, setStartDate] = useState('Jan 2025');
  const [skillsText, setSkillsText] = useState('Go / Python, Kubernetes Orchestration, Cloud Architecture');
  const [industrySector, setIndustrySector] = useState('Cloud & Infrastructure');
  const [facultyMentored, setFacultyMentored] = useState(true);
  const [ppoAvailable, setPpoAvailable] = useState(true);
  const [description, setDescription] = useState(
    'Collaborate with cloud infrastructure architects on autonomous remediation, distributed microservices, and cluster resilience. Opportunity for full-time pre-placement offer (PPO) upon milestone completion.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim()) {
      alert('Please fill in required fields.');
      return;
    }

    setIsSubmitting(true);
    const requiredSkills = skillsText.split(',').map((s) => s.trim()).filter(Boolean);

    await createJobPosting({
      title,
      company,
      roleType,
      location,
      isRemote,
      stipend: roleType === 'internship' ? compensation : undefined,
      ctc: roleType === 'placement' ? compensation : undefined,
      duration: roleType === 'internship' ? duration : undefined,
      startDate,
      requiredSkills,
      industrySector,
      facultyMentored,
      ppoAvailable,
      description,
      deadline: '2024-12-15',
    });

    setIsSubmitting(false);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
    });
    alert('Requisition published successfully! Synced across Student portals and IndexedDB.');
    router.push('/industry/dashboard');
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              Corporate Requisition Dispatcher
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Post Internship or Placement Opening
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Define target skills and requirements to trigger AI affinity matchmaking against Apex Institute student portfolios.
            </p>
          </div>

          <div className="p-3 bg-surface-container-low rounded-xl text-center border border-surface-container">
            <span className="text-[10px] text-outline font-bold uppercase block">Active Listings</span>
            <span className="text-sm font-bold text-primary">{jobs.length} Published</span>
          </div>
        </section>

        {/* Creation Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs flex flex-col gap-5 max-w-4xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface">
                Job / Internship Title <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cloud Security & SRE Intern"
                className="w-full px-3.5 py-2.5 bg-surface-container-low border border-surface-container rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface">
                Company Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Microsoft Azure"
                className="w-full px-3.5 py-2.5 bg-surface-container-low border border-surface-container rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface">Role Type</label>
              <select
                value={roleType}
                onChange={(e) => setRoleType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-surface-container-low border border-surface-container rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="internship">Industry Internship</option>
                <option value="placement">Campus Placement (Full-Time)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface">Industry Sector</label>
              <input
                type="text"
                value={industrySector}
                onChange={(e) => setIndustrySector(e.target.value)}
                placeholder="e.g. Cloud & Infrastructure, FinTech"
                className="w-full px-3.5 py-2.5 bg-surface-container-low border border-surface-container rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface">
                {roleType === 'internship' ? 'Monthly Stipend' : 'Annual CTC Package'}
              </label>
              <input
                type="text"
                value={compensation}
                onChange={(e) => setCompensation(e.target.value)}
                placeholder={roleType === 'internship' ? 'e.g. ₹65,000 / month' : 'e.g. ₹48.0 LPA'}
                className="w-full px-3.5 py-2.5 bg-surface-container-low border border-surface-container rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bangalore (Hybrid)"
                className="w-full px-3.5 py-2.5 bg-surface-container-low border border-surface-container rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface">Duration &amp; Start</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 6 Months"
                  className="w-full px-3.5 py-2.5 bg-surface-container-low border border-surface-container rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="e.g. Jan 2025"
                  className="w-full px-3.5 py-2.5 bg-surface-container-low border border-surface-container rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface">
                Required Skills (Comma separated)
              </label>
              <input
                type="text"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                placeholder="e.g. Go / Python, Linux Kernel, Terraform, Kubernetes"
                className="w-full px-3.5 py-2.5 bg-surface-container-low border border-surface-container rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-on-surface">Description &amp; Scope</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-surface-container-low border border-surface-container rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Checkbox Options */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={facultyMentored}
                onChange={(e) => setFacultyMentored(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
              />
              <span className="font-semibold text-on-surface">
                Faculty-Mentored Capstone Program (12 Academic Credits)
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={ppoAvailable}
                onChange={(e) => setPpoAvailable(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
              />
              <span className="font-semibold text-on-surface">
                Pre-Placement Offer (PPO) Conversion Eligible
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-surface-container flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[18px]">publish</span>
              <span>{isSubmitting ? 'Publishing...' : 'Publish Requisition'}</span>
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
