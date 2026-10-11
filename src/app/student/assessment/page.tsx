'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import AppShell from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';

export default function AssessmentPage() {
  const { questions, submitAssessmentQuiz, student } = useApp();
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(null);
  const [activeTab, setActiveTab] = useState<'quiz' | 'history'>('quiz');

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(selectedAnswers).length < questions.length) {
      if (!confirm('You have unanswered questions. Are you sure you want to submit?')) {
        return;
      }
    }

    const res = await submitAssessmentQuiz(selectedAnswers);
    setResult(res);
    setSubmitted(true);

    if (res.passed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setResult(null);
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs">
          <div className="flex flex-col gap-1 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Proctored Technical Benchmark Simulator
            </div>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Aptitude &amp; Technical Competency Assessment
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Complete the industry-curated questionnaire to benchmark your domain mastery, calibrate your Skill Radar, and earn verified credentials recognized by partner recruiters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'quiz'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              Active Assessment ({questions.length} Qs)
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'history'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              Proctored History
            </button>
          </div>
        </div>

        {activeTab === 'history' ? (
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs">
            <h2 className="font-title-lg text-base font-bold text-on-surface mb-3">
              Past Assessment Transcripts
            </h2>
            <div className="divide-y divide-surface-container">
              <div className="py-3 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-semibold text-xs text-on-surface">
                    CodeSignal DSA Baseline Benchmark
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    Oct 4, 2024 • Proctored by CodeSignal • Score: 840/850 (95%)
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-xs font-bold">
                  Verified Grade A+
                </span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-semibold text-xs text-on-surface">
                    Unix &amp; Operating Systems Lab Final
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    Sep 20, 2024 • Apex Faculty Board • Score: 86%
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-xs font-bold">
                  Verified
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Status bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface-container-low rounded-xl border border-surface-container">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
                <span className="text-xs font-bold text-on-surface">
                  Proctoring Active • Browser Lockdown Sim
                </span>
                <span className="text-outline text-xs hidden sm:inline">|</span>
                <span className="text-xs text-on-surface-variant hidden sm:inline">
                  Answered: {Object.keys(selectedAnswers).length} of {questions.length}
                </span>
              </div>

              {submitted && result && (
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      result.passed
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                        : 'bg-error-container text-on-error-container'
                    }`}
                  >
                    Score: {result.score}% ({result.passed ? 'PASSED & ATTESTED' : 'NEEDS BRIDGE COURSE'})
                  </span>
                  <button
                    onClick={handleReset}
                    className="text-xs font-semibold text-primary underline"
                  >
                    Reset &amp; Retake
                  </button>
                </div>
              )}
            </div>

            {/* Questions List */}
            <div className="flex flex-col gap-5">
              {questions.map((q, qIndex) => {
                const selectedOption = selectedAnswers[q.id];
                const isCorrect = selectedOption === q.correctOptionIndex;

                return (
                  <div
                    key={q.id}
                    className={`bg-surface-container-lowest p-5 rounded-xl border shadow-xs flex flex-col gap-4 transition-all ${
                      submitted
                        ? isCorrect
                          ? 'border-tertiary/40 bg-tertiary-container/5'
                          : 'border-error/40 bg-error-container/5'
                        : 'border-surface-container'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-primary-fixed text-on-primary-fixed text-xs font-bold flex items-center justify-center shrink-0">
                          {qIndex + 1}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-surface-container px-2 py-0.5 rounded-md">
                          {q.domain}
                        </span>
                      </div>
                      <span className="text-[11px] text-outline font-medium">
                        Skill Tag: {q.skillTag}
                      </span>
                    </div>

                    <h3 className="font-title-md text-sm font-semibold text-on-surface leading-snug">
                      {q.question}
                    </h3>

                    {/* Options list */}
                    <div className="flex flex-col gap-2 pt-1">
                      {q.options.map((option, optIdx) => {
                        const isSelected = selectedOption === optIdx;
                        let optionStyle =
                          'border-surface-container bg-surface hover:bg-surface-container-low text-on-surface';

                        if (submitted) {
                          if (optIdx === q.correctOptionIndex) {
                            optionStyle =
                              'border-tertiary bg-tertiary-fixed/30 text-on-surface font-semibold';
                          } else if (isSelected && !isCorrect) {
                            optionStyle =
                              'border-error bg-error-container/40 text-error line-through';
                          }
                        } else if (isSelected) {
                          optionStyle =
                            'border-primary bg-primary-fixed text-on-primary-fixed font-semibold shadow-xs';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            disabled={submitted}
                            className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-3 ${optionStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1">{option}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation if submitted */}
                    {submitted && (
                      <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant flex items-start gap-2 border-t border-surface-container/60 mt-1">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                          info
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <strong className="text-on-surface">Explanation:</strong>
                          <span>{q.explanation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Submit Action */}
            <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-surface-container">
              <span className="text-xs text-on-surface-variant">
                Your evaluation automatically updates your verified readiness index in IndexedDB.
              </span>
              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Submit Assessment for Grading</span>
                </button>
              ) : (
                <Link
                  href="/student/skills"
                  className="px-6 py-2.5 bg-tertiary text-on-tertiary font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">insights</span>
                  <span>View Updated Gap Radar</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
