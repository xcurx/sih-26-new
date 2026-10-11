'use client';

import React from 'react';
import Navbar from './Navbar';
import RoleSidebar from './RoleSidebar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <div className="flex-1 flex w-full">
        <RoleSidebar />
        <main className="flex-1 w-full pt-16 lg:pl-72 transition-all duration-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
