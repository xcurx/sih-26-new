'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function RoleSidebar() {
  const pathname = usePathname();
  const { role, logout } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Clean, simple sidebar navigation items for each role
  const navItems = {
    student: [
      {
        label: 'Dashboard & Readiness',
        href: '/student/dashboard',
        icon: 'dashboard',
      },
      {
        label: 'Skill Assessment & Quiz',
        href: '/student/assessment',
        icon: 'quiz',
      },
      {
        label: 'Skill Gap & Radar Intelligence',
        href: '/student/skills',
        icon: 'radar',
      },
      {
        label: 'Internships & Opportunities',
        href: '/student/internships',
        icon: 'work_outline',
      },
      {
        label: 'Campus Placements & Drives',
        href: '/student/placements',
        icon: 'domain',
      },
      {
        label: 'My Application Tracker',
        href: '/student/applications',
        icon: 'assignment_turned_in',
      },
      {
        label: 'Industry Learning Hub',
        href: '/student/learning',
        icon: 'school',
      },
      {
        label: 'Verified Digital Portfolio',
        href: '/student/portfolio',
        icon: 'badge',
      },
    ],
    industry: [
      {
        label: 'Recruiter Dashboard',
        href: '/industry/dashboard',
        icon: 'dashboard',
      },
      {
        label: 'Post Internship / Job',
        href: '/industry/postings',
        icon: 'add_circle',
      },
      {
        label: 'Candidate Matchmaking',
        href: '/industry/candidates',
        icon: 'person_search',
      },
      {
        label: 'Applicant Pipeline (ATS)',
        href: '/industry/applicants',
        icon: 'view_kanban',
      },
      {
        label: 'Training & Bridge Programs',
        href: '/industry/programs',
        icon: 'cast_for_education',
      },
      {
        label: 'Academia Collaboration & RFPs',
        href: '/industry/collaboration',
        icon: 'handshake',
      },
    ],
    faculty: [
      {
        label: 'Faculty Hub Overview',
        href: '/faculty/dashboard',
        icon: 'dashboard',
      },
      {
        label: 'Faculty Internships & FDPs',
        href: '/faculty/internships',
        icon: 'business_center',
      },
      {
        label: 'Corporate Consultancy & RFPs',
        href: '/faculty/consultancy',
        icon: 'gavel',
      },
      {
        label: 'Joint Applied R&D Grants',
        href: '/faculty/grants',
        icon: 'science',
      },
      {
        label: 'Student Mentorship & Capstone',
        href: '/faculty/mentorship',
        icon: 'group_work',
      },
      {
        label: 'Guest Lectures & Exchange',
        href: '/faculty/lectures',
        icon: 'co_present',
      },
    ],
    institution: [
      {
        label: 'Placement & Readiness Analytics',
        href: '/institution/dashboard',
        icon: 'analytics',
      },
      {
        label: 'Curriculum vs Industry Gaps',
        href: '/institution/curriculum-gap',
        icon: 'balance',
      },
      {
        label: 'Student Verification & Roster',
        href: '/institution/students',
        icon: 'verified_user',
      },
      {
        label: 'Recruiter Management & Drives',
        href: '/institution/recruiters',
        icon: 'corporate_fare',
      },
      {
        label: 'Accreditation Reports (NAAC/NIRF)',
        href: '/institution/reports',
        icon: 'description',
      },
    ],
  };

  const currentItems = navItems[role] || navItems.student;

  const roleHeaders: Record<string, { title: string; subtitle: string; icon: string }> = {
    student: {
      title: 'Student Suite',
      subtitle: 'Candidate Skill & Career Hub',
      icon: 'school',
    },
    industry: {
      title: 'Industry Workspace',
      subtitle: 'Talent Acquisition & ATS',
      icon: 'corporate_fare',
    },
    faculty: {
      title: 'Academic Faculty Hub',
      subtitle: 'Research, FDPs & Consultancy',
      icon: 'psychology',
    },
    institution: {
      title: 'TPO Placement Cell',
      subtitle: 'Institutional Governance',
      icon: 'account_balance',
    },
  };

  const headerInfo = roleHeaders[role];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-3 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center"
          aria-label="Toggle navigation"
        >
          <span className="material-symbols-outlined text-[24px]">
            {isMobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 w-72 bg-surface-container-lowest border-r border-surface-container flex flex-col justify-between z-30 transition-transform duration-200 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto px-4 py-5 justify-between">
          <div>
            {/* Section Header */}
            <div className="flex items-center gap-3 px-2 pb-4 mb-3 border-b border-surface-container">
              <div className="w-9 h-9 rounded-xl bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">{headerInfo.icon}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-md text-sm text-on-surface font-bold leading-tight">
                  {headerInfo.title}
                </span>
                <span className="text-[11px] text-on-surface-variant leading-tight">
                  {headerInfo.subtitle}
                </span>
              </div>
            </div>

            {/* Simple Clean Nav Items List */}
            <nav className="flex flex-col gap-1">
              {currentItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                      isActive
                        ? 'bg-primary-fixed text-on-primary-fixed font-semibold shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] transition-colors shrink-0 ${
                        isActive
                          ? 'text-primary'
                          : 'text-on-surface-variant group-hover:text-primary'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Simple Clean Logout Action in Sidebar Footer */}
          <div className="pt-4 mt-4 border-t border-surface-container">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-error hover:bg-error-container/40 transition-colors w-full group"
            >
              <span className="material-symbols-outlined text-[20px] text-error group-hover:translate-x-0.5 transition-transform">
                logout
              </span>
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
