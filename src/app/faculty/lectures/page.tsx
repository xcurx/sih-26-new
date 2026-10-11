'use client';

import React, { useState } from 'react';
import AppShell from '@/components/layout/AppShell';

export default function FacultyLecturesPage() {
  const [sessions, setSessions] = useState([
    {
      id: 'lec_01',
      title: 'Architecting for Multi-Region Kubernetes & Global Resiliency',
      speaker: 'Siddharth Nair (Principal Engineer, Microsoft Cloud)',
      date: 'Oct 25, 2024 at 11:00 AM IST',
      venue: 'Apex Computing Auditorium / Hybrid Live Stream',
      attendees: 184,
      status: 'Confirmed',
    },
    {
      id: 'lec_02',
      title: 'Designing Real-Time Low Latency Settlement Engines',
      speaker: 'Neha Sen (VP Engineering, Razorpay)',
      date: 'Nov 04, 2024 at 2:30 PM IST',
      venue: 'Virtual Keynote & Discord Hackathon',
      attendees: 210,
      status: 'Confirmed',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [topic, setTopic] = useState('');
  const [speakerName, setSpeakerName] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession = {
      id: `lec_${Date.now()}`,
      title: topic,
      speaker: speakerName,
      date: 'TBD (Scheduling Window)',
      venue: 'Apex Seminar Hall / Virtual',
      attendees: 0,
      status: 'Invited',
    };
    setSessions((prev) => [newSession, ...prev]);
    setShowModal(false);
    alert('Guest lecture invitation dispatched to corporate speaker!');
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">co_present</span>
              Industry-Academia Exchange
            </span>
            <h1 className="font-headline-lg text-2xl lg:text-3xl font-bold text-on-surface">
              Guest Lectures, Masterclasses &amp; Hackathons
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Coordinate technical keynotes, corporate advisory board sessions, and innovation hackathons connecting students directly with senior industry practitioners.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Invite Corporate Speaker</span>
          </button>
        </section>

        {/* Sessions List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sessions.map((sesh) => (
            <div
              key={sesh.id}
              className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-surface-container text-primary">
                    Corporate Masterclass
                  </span>
                  <span className="text-xs font-bold text-tertiary">
                    {sesh.status}
                  </span>
                </div>
                <h3 className="font-title-md text-base font-bold text-on-surface">
                  {sesh.title}
                </h3>
                <span className="text-xs text-primary font-semibold">
                  Speaker: {sesh.speaker}
                </span>
                <div className="p-3 bg-surface-container-low rounded-xl text-xs flex flex-col gap-1 text-on-surface-variant">
                  <span>Schedule: <strong className="text-on-surface">{sesh.date}</strong></span>
                  <span>Venue: {sesh.venue}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs">
                <span>{sesh.attendees} Registered Attendees</span>
                <button
                  onClick={() => alert('Attendance roster exported.')}
                  className="text-primary font-bold hover:underline"
                >
                  Manage Roster
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-secondary/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 border border-surface-container shadow-xl">
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-3">
                Invite Corporate Speaker for Guest Lecture
              </h3>
              <form onSubmit={handleCreate} className="flex flex-col gap-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">Lecture Topic / Workshop Title</label>
                  <input
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Distributed Consensus in Cloud Storage"
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Speaker Name &amp; Corporate Title</label>
                  <input
                    type="text"
                    required
                    value={speakerName}
                    onChange={(e) => setSpeakerName(e.target.value)}
                    placeholder="e.g. John Doe (VP Cloud Engineering, Google)"
                    className="w-full p-2 bg-surface-container-low border border-surface-container rounded-lg"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-surface-container">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-surface-container rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-on-primary rounded-lg font-bold"
                  >
                    Send Formal Invitation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
