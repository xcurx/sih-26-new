'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';

export default function Navbar() {
  const {
    role,
    logout,
    student,
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const roleLabels: Record<UserRole, { title: string; subtitle: string; name: string; avatar: string }> = {
    student: {
      title: 'Student / Candidate',
      subtitle: `${student?.branch || 'Computer Science'} • Apex Institute`,
      name: student?.name || 'Aarav Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    industry: {
      title: 'Industry / Recruiter',
      subtitle: 'Talent Acquisition • Microsoft Cloud Systems',
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    faculty: {
      title: 'Faculty / Academician',
      subtitle: 'Dean of Research • Apex Institute of Technology',
      name: 'Dr. Ramesh Rao',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    institution: {
      title: 'Institutional TPO Cell',
      subtitle: 'Chief Placement Officer (CPO) • Apex Institute',
      name: 'Prof. K. Verma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
  };

  const currentPersona = roleLabels[role];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container h-16">
      <div className="w-full max-w-[1440px] mx-auto px-margin-sm lg:px-margin-lg h-full flex items-center justify-between gap-space-md">
        {/* Logo & Brand */}
        <div className="flex items-center gap-space-lg flex-1">
          <Link href={`/${role}/dashboard`} className="flex items-center gap-space-sm shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm group-hover:bg-primary-container transition-colors">
              <span className="material-symbols-outlined text-[22px]">hub</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">
                NexusBridge
              </span>
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                Academia-Industry Portal
              </span>
            </div>
          </Link>

          {/* Global Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills, companies, internships, research grants, syllabus..."
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all border border-transparent focus:border-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-sm"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-space-md shrink-0">
          {/* Notification Menu */}
          <div className="relative">
            <button
              onClick={() => setNotifMenuOpen(!notifMenuOpen)}
              aria-label="Notifications"
              className="relative p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-error text-on-error font-label-sm text-[10px] leading-tight font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Notification Drawer Popover */}
            {notifMenuOpen && (
              <div className="absolute right-0 top-12 w-80 sm:w-96 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <span className="font-title-md text-title-md text-on-surface">Notifications</span>
                  <button
                    onClick={() => setNotifMenuOpen(false)}
                    className="text-on-surface-variant hover:text-on-surface text-sm font-semibold"
                  >
                    Close
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-surface-container">
                  {notifications.filter((n) => n.targetRole === role).length === 0 ? (
                    <div className="py-6 text-center text-outline text-sm">No notifications right now</div>
                  ) : (
                    notifications
                      .filter((n) => n.targetRole === role)
                      .map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationAsRead(notif.id)}
                          className={`p-2.5 transition-colors cursor-pointer rounded-lg hover:bg-surface-container-low ${
                            !notif.read ? 'bg-primary-fixed/20' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-title-md text-sm text-on-surface font-semibold">
                              {notif.title}
                            </span>
                            <span className="text-[10px] text-outline shrink-0">{notif.timestamp}</span>
                          </div>
                          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                            {notif.message}
                          </p>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile & Account Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-space-sm pl-space-sm hover:bg-surface-container-low py-1 px-2 rounded-xl transition-colors border border-transparent hover:border-surface-container"
            >
              <img
                src={currentPersona.avatar}
                alt={currentPersona.name}
                className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-primary/20"
              />
              <div className="hidden xl:flex flex-col text-left">
                <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">
                  {currentPersona.name}
                </span>
                <span className="font-label-sm text-[11px] text-on-surface-variant leading-tight truncate max-w-[180px]">
                  {currentPersona.subtitle}
                </span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                arrow_drop_down
              </span>
            </button>

            {profileMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setProfileMenuOpen(false)}
              >
                <div className="px-4 py-2 border-b border-surface-container">
                  <span className="font-bold text-sm text-on-surface block">{currentPersona.name}</span>
                  <span className="text-[11px] text-primary font-semibold block">{currentPersona.title}</span>
                  <span className="text-[11px] text-on-surface-variant block mt-0.5">{currentPersona.subtitle}</span>
                </div>

                <div className="py-1">
                  <Link
                    href="/login"
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-on-surface hover:bg-surface-container-low flex items-center gap-2.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">switch_account</span>
                    <span>Switch Account (Demo Login)</span>
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-error hover:bg-error-container/30 flex items-center gap-2.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-error">logout</span>
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Logout Button in Header */}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-error-container/40 text-on-surface hover:text-error text-xs font-semibold transition-colors border border-surface-container"
            title="Log out of current account"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
