'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import NirmaanLogo from '@/components/common/NirmaanLogo';

export default function LoginPage() {
  const { login } = useApp();
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRole, setLoadingRole] = useState<UserRole | null>(null);
  const [loadingAccountName, setLoadingAccountName] = useState<string>('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Automatically reset any lingering loading state whenever the login page mounts or is navigated to
  useEffect(() => {
    setIsLoading(false);
    setLoadingRole(null);
    setLoadingAccountName('');
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setIsLoading(false);
      setLoadingRole(null);
      setLoadingAccountName('');
    };
  }, [pathname]);

  const demoAccounts = [
    {
      role: 'student' as UserRole,
      name: 'Aarav Sharma',
      badge: 'Student / Candidate',
      affiliation: 'Computer Science, B.Tech \'25 • Apex Institute',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      description: 'Access proctored skill testing, AI gap radar, curated internships, and digital portfolios.',
      highlight: '84.5% Readiness • 19 Verified Competencies',
      icon: 'school',
      colorClass: 'border-primary/30 hover:border-primary',
    },
    {
      role: 'industry' as UserRole,
      name: 'Sarah Jenkins',
      badge: 'Industry / Recruiter',
      affiliation: 'University Talent Acquisition • Microsoft Cloud Systems',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      description: 'Post verified requisitions, review matched candidates, and manage campus ATS pipelines.',
      highlight: '5 Active Requisitions • 42 Candidates Funnel',
      icon: 'corporate_fare',
      colorClass: 'border-secondary/30 hover:border-primary',
    },
    {
      role: 'faculty' as UserRole,
      name: 'Dr. Ramesh Rao',
      badge: 'Faculty / Academician',
      affiliation: 'Dean of Research & Partnerships • Apex Institute',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      description: 'Explore corporate sabbaticals, submit consultancy bids, and supervise student capstones.',
      highlight: '$2.4M Sanctioned Grants • 142 Supervised Mentees',
      icon: 'psychology',
      colorClass: 'border-primary/30 hover:border-primary',
    },
    {
      role: 'institution' as UserRole,
      name: 'Prof. K. Verma',
      badge: 'Institutional TPO Cell',
      affiliation: 'Chief Placement Officer (CPO) • Apex Institute',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      description: 'Monitor cohort placement readiness, audit curriculum gaps, and export NAAC audit reports.',
      highlight: '87.2% Readiness Index • NAAC Criterion 3.5 Active',
      icon: 'account_balance',
      colorClass: 'border-primary/30 hover:border-primary',
    },
  ];

  const handleDemoLogin = (roleKey: UserRole, accountName: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setLoadingRole(roleKey);
    setLoadingAccountName(accountName);

    timerRef.current = setTimeout(() => {
      setIsLoading(false);
      setLoadingRole(null);
      setLoadingAccountName('');
      login(roleKey);
    }, 2000);
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setLoadingRole(selectedRole);
    const matched = demoAccounts.find((a) => a.role === selectedRole);
    setLoadingAccountName(matched ? matched.name : selectedRole.toUpperCase());

    timerRef.current = setTimeout(() => {
      setIsLoading(false);
      setLoadingRole(null);
      setLoadingAccountName('');
      login(selectedRole);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between relative">
      {/* 2-Second Simulated Auth Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-[32px] animate-spin">
                progress_activity
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                Authenticating Session
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Signing in as <span className="font-semibold text-primary">{loadingAccountName}</span>...
              </p>
            </div>

            {/* Visual 2-Second Progress Bar */}
            <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-pulse w-full" />
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-outline font-medium">
              <span className="material-symbols-outlined text-[14px] text-primary">verified_user</span>
              <span>Establishing secure credentials &amp; cache...</span>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="w-full bg-surface-container-lowest border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center shrink-0 group">
            <NirmaanLogo size="md" />
          </Link>

          <Link
            href="/"
            className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Login Workspace */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-10 flex-1 justify-center w-full">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-fixed text-on-primary-fixed">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Single Sign-On &amp; Role-Based Authorization
          </span>
          <h1 className="font-headline-lg text-3xl sm:text-4xl font-bold text-on-surface tracking-tight">
            Sign In to Nirmaan
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl leading-relaxed">
            Choose a demo account below for instantaneous access to verified candidate portfolios, recruiter ATS workflows, or academic governance.
          </p>
        </div>

        {/* 1-Click Demo Accounts Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-title-lg text-base font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
              Instant Demo Login (Select Persona)
            </h2>
            <span className="text-xs text-primary font-semibold">
              Pre-configured with realistic campus datasets
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {demoAccounts.map((account) => (
              <div
                key={account.role}
                onClick={() => handleDemoLogin(account.role, account.name)}
                className={`bg-surface-container-lowest p-5 rounded-2xl border shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between gap-4 group ${account.colorClass} ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <img
                      src={account.avatar}
                      alt={account.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-primary/10 shadow-xs"
                    />
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-surface-container text-primary">
                      {account.badge.split('/')[0]}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="font-title-md text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                      {account.name}
                    </h3>
                    <span className="text-[11px] text-on-surface-variant font-medium mt-0.5 leading-snug">
                      {account.affiliation}
                    </span>
                  </div>

                  <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                    {account.description}
                  </p>

                  <div className="p-2.5 bg-surface-container-low rounded-xl text-[11px] font-semibold text-primary">
                    {account.highlight}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isLoading}
                  className="w-full py-2 bg-primary group-hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  {isLoading && loadingRole === account.role ? (
                    <>
                      <span className="material-symbols-outlined text-[16px] animate-spin">
                        progress_activity
                      </span>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In as {account.name.split(' ')[0]}</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Alternative Standard Form */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container shadow-xs max-w-xl mx-auto w-full">
          <h3 className="font-title-md text-sm font-bold text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-outline text-[18px]">lock</span>
            Or Sign In with University Credentials
          </h3>

          <form onSubmit={handleCustomLogin} className="flex flex-col gap-3 text-xs">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-on-surface">Email Address / Institutional ID</label>
              <input
                type="email"
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav.sharma@apex.edu"
                className="w-full px-3.5 py-2.5 bg-surface-container-low border border-surface-container rounded-xl text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-on-surface">Password</label>
              <input
                type="password"
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-surface-container-low border border-surface-container rounded-xl text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-on-surface">Target Persona Portal</label>
              <select
                disabled={isLoading}
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full px-3.5 py-2.5 bg-surface-container-low border border-surface-container rounded-xl text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-medium disabled:opacity-60"
              >
                <option value="student">Student / Candidate Hub</option>
                <option value="industry">Industry / Corporate Recruiter Hub</option>
                <option value="faculty">Faculty &amp; Academic Research Hub</option>
                <option value="institution">Institutional Placement Cell (TPO)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading && loadingAccountName && !loadingRole ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">
                    progress_activity
                  </span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In with Selected Role</span>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest border-t border-surface-container py-4 text-center text-xs text-on-surface-variant">
        <span>Nirmaan • Role-Based Security &amp; Local IndexedDB Storage Engine</span>
      </footer>
    </div>
  );
}
