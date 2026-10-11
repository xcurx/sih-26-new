'use client';

import React from 'react';

interface NirmaanLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
  markOnly?: boolean;
}

export default function NirmaanLogo({
  size = 'md',
  showSubtitle = true,
  subtitleText = 'Academia-Industry Synergy Platform',
  className = '',
  markOnly = false,
}: NirmaanLogoProps) {
  // Dimensions for the icon container
  const iconDimensions = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl',
  }[size];

  // Title typography
  const titleSize = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl sm:text-2xl',
  }[size];

  // Subtitle typography
  const subtitleSize = {
    sm: 'text-[9px] sm:text-[10px]',
    md: 'text-[10px] sm:text-[11px]',
    lg: 'text-xs',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Geometric Nirmaan Emblem */}
      <div
        className={`${iconDimensions} bg-gradient-to-br from-[#004ac6] via-[#00389e] to-[#001f5c] text-white flex items-center justify-center shrink-0 shadow-sm shadow-primary/20 transition-transform duration-200 group-hover:scale-105 p-1.5`}
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Left Academic Pillar */}
          <path
            d="M9 27V9"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Diagonal Architectural Synergy Truss */}
          <path
            d="M9 10.5L27 25.5"
            stroke="#9ec0ff"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Right Industry Pillar */}
          <path
            d="M27 27V9"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Central Synergy Keystone (Innovation & Creation) */}
          <circle cx="18" cy="18" r="2.2" fill="#2dd4bf" />
        </svg>
      </div>

      {/* Brand Typography */}
      {!markOnly && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-headline-sm ${titleSize} text-primary font-extrabold tracking-tight group-hover:text-primary-container transition-colors leading-none`}
            >
              Nirmaan
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary hidden sm:inline-block"></span>
          </div>
          {showSubtitle && (
            <span
              className={`${subtitleSize} text-on-surface-variant uppercase tracking-wider font-semibold leading-tight mt-0.5 hidden xs:inline`}
            >
              {subtitleText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
