'use client';

import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  deltaText?: string;
  deltaType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  progressPercent?: number;
  highlightColor?: 'primary' | 'tertiary' | 'error' | 'secondary';
}

export default function MetricCard({
  title,
  value,
  subtext,
  deltaText,
  deltaType = 'positive',
  icon,
  progressPercent,
  highlightColor = 'primary',
}: MetricCardProps) {
  const iconBgClasses = {
    primary: 'bg-primary-fixed text-on-primary-fixed',
    tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed',
    error: 'bg-error-container text-on-error-container',
    secondary: 'bg-secondary-fixed text-on-secondary-fixed',
  };

  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container flex flex-col justify-between hover:shadow-md transition-all group">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
            {title}
          </span>
          <div className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface mt-1">
            {value}
          </div>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBgClasses[highlightColor]}`}>
          <span className="material-symbols-outlined text-[22px]">{icon}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        {progressPercent !== undefined && (
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                highlightColor === 'tertiary' ? 'bg-tertiary' : 'bg-primary'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        <div className="flex items-center justify-between text-xs">
          {deltaText && (
            <span
              className={`font-semibold flex items-center gap-0.5 ${
                deltaType === 'positive'
                  ? 'text-tertiary'
                  : deltaType === 'negative'
                  ? 'text-error'
                  : 'text-on-surface-variant'
              }`}
            >
              {deltaType === 'positive' && (
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
              )}
              {deltaText}
            </span>
          )}
          {subtext && (
            <span className="text-on-surface-variant truncate ml-auto">{subtext}</span>
          )}
        </div>
      </div>
    </div>
  );
}
