'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  UserRole,
  StudentProfile,
  JobOpportunity,
  Application,
  AssessmentQuestion,
  LearningProgram,
  FacultyOpportunity,
  StudentMentorshipRecord,
  AppNotification,
  ApplicationStatus,
} from '@/types';
import {
  db,
  initSeedData,
  INITIAL_STUDENT,
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_QUESTIONS,
  INITIAL_LEARNING_PROGRAMS,
  INITIAL_FACULTY_PROGRAMS,
  INITIAL_MENTORSHIPS,
  INITIAL_NOTIFICATIONS,
} from '@/lib/db';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  student: StudentProfile | null;
  jobs: JobOpportunity[];
  applications: Application[];
  questions: AssessmentQuestion[];
  learningPrograms: LearningProgram[];
  facultyPrograms: FacultyOpportunity[];
  mentorshipRecords: StudentMentorshipRecord[];
  notifications: AppNotification[];
  unreadNotificationCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDbLoaded: boolean;
  applyToJob: (jobId: string) => Promise<boolean>;
  createJobPosting: (job: Omit<JobOpportunity, 'id' | 'applicantsCount' | 'postedDate'>) => Promise<string>;
  updateApplicationStatus: (applicationId: string, newStatus: ApplicationStatus, notes?: string) => Promise<void>;
  submitAssessmentQuiz: (answers: { [questionId: string]: number }) => Promise<{ score: number; passed: boolean }>;
  submitConsultancyProposal: (opportunityId: string, proposalTitle: string, budget: string) => Promise<void>;
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [role, setRoleState] = useState<UserRole>('student');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [student, setStudent] = useState<StudentProfile | null>(INITIAL_STUDENT);
  const [jobs, setJobs] = useState<JobOpportunity[]>(INITIAL_JOBS);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>(INITIAL_QUESTIONS);
  const [learningPrograms, setLearningPrograms] = useState<LearningProgram[]>(INITIAL_LEARNING_PROGRAMS);
  const [facultyPrograms, setFacultyPrograms] = useState<FacultyOpportunity[]>(INITIAL_FACULTY_PROGRAMS);
  const [mentorshipRecords, setMentorshipRecords] = useState<StudentMentorshipRecord[]>(INITIAL_MENTORSHIPS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDbLoaded, setIsDbLoaded] = useState(false);

  // Read saved session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuth = (localStorage.getItem('nirmaan_auth') || localStorage.getItem('nexus_auth')) as UserRole | null;
      if (savedAuth) {
        setIsAuthenticated(true);
        setRoleState(savedAuth);
      }
    }
  }, []);

  // Sync role with pathname if URL indicates role
  useEffect(() => {
    if (pathname.startsWith('/student')) {
      setRoleState('student');
    } else if (pathname.startsWith('/industry')) {
      setRoleState('industry');
    } else if (pathname.startsWith('/faculty')) {
      setRoleState('faculty');
    } else if (pathname.startsWith('/institution')) {
      setRoleState('institution');
    }
  }, [pathname]);

  const login = (targetRole: UserRole) => {
    setIsAuthenticated(true);
    setRoleState(targetRole);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nirmaan_auth', targetRole);
    }
    router.push(`/${targetRole}/dashboard`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nirmaan_auth');
      localStorage.removeItem('nexus_auth');
    }
    router.push('/login');
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nirmaan_auth', newRole);
    }
    if (newRole === 'student') router.push('/student/dashboard');
    else if (newRole === 'industry') router.push('/industry/dashboard');
    else if (newRole === 'faculty') router.push('/faculty/dashboard');
    else if (newRole === 'institution') router.push('/institution/dashboard');
  };

  const refreshData = async () => {
    try {
      const studentData = await db.students.get('std_01');
      if (studentData) setStudent(studentData);

      const allJobs = await db.jobs.toArray();
      if (allJobs.length) setJobs(allJobs);

      const allApps = await db.applications.toArray();
      if (allApps.length) setApplications(allApps);

      const allQuestions = await db.questions.toArray();
      if (allQuestions.length) setQuestions(allQuestions);

      const allPrograms = await db.learningPrograms.toArray();
      if (allPrograms.length) setLearningPrograms(allPrograms);

      const allFaculty = await db.facultyPrograms.toArray();
      if (allFaculty.length) setFacultyPrograms(allFaculty);

      const allMentorship = await db.mentorshipRecords.toArray();
      if (allMentorship.length) setMentorshipRecords(allMentorship);

      const allNotifs = await db.notifications.toArray();
      if (allNotifs.length) setNotifications(allNotifs);
    } catch (e) {
      console.warn('Could not read from IndexedDB, using fallback state:', e);
    }
  };

  useEffect(() => {
    async function loadDatabase() {
      await initSeedData();
      await refreshData();
      setIsDbLoaded(true);
    }
    loadDatabase();
  }, []);

  const unreadNotificationCount = notifications.filter(
    (n) => n.targetRole === role && !n.read
  ).length;

  const markNotificationAsRead = async (id: string) => {
    try {
      await db.notifications.update(id, { read: true });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const applyToJob = async (jobId: string): Promise<boolean> => {
    const targetJob = jobs.find((j) => j.id === jobId);
    if (!targetJob || !student) return false;

    // Check if already applied
    const existing = applications.find(
      (a) => a.jobId === jobId && a.studentId === student.id
    );
    if (existing) return false;

    // Calculate match score based on student skills
    const studentSkillNames = student.skills.map((s) => s.name.toLowerCase());
    const matchedSkills = targetJob.requiredSkills.filter((req) =>
      studentSkillNames.some((s) => s.includes(req.toLowerCase()) || req.toLowerCase().includes(s.split(' ')[0].toLowerCase()))
    );
    const gapSkills = targetJob.requiredSkills.filter(
      (req) => !matchedSkills.includes(req)
    );

    const calculatedScore = Math.max(
      65,
      Math.min(98, Math.round((matchedSkills.length / targetJob.requiredSkills.length) * 100))
    );

    const newApp: Application = {
      id: `app_${Date.now()}`,
      jobId: targetJob.id,
      studentId: student.id,
      studentName: student.name,
      studentEmail: student.email,
      studentBranch: student.branch,
      studentCgpa: student.cgpa,
      jobTitle: targetJob.title,
      company: targetJob.company,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'applied',
      matchScore: calculatedScore,
      matchedSkills,
      gapSkills,
      notes: 'Application submitted via 1-Click Verified Campus Pipeline.',
    };

    // Save to IndexedDB
    try {
      await db.applications.put(newApp);
      await db.jobs.update(jobId, { applicantsCount: targetJob.applicantsCount + 1 });

      const newNotif: AppNotification = {
        id: `notif_${Date.now()}`,
        targetRole: 'industry',
        title: `New Applicant: ${student.name}`,
        message: `${student.name} (${calculatedScore}% match) applied for ${targetJob.title}.`,
        timestamp: 'Just now',
        read: false,
        type: 'info',
        link: '/industry/applicants',
      };
      await db.notifications.put(newNotif);

      setApplications((prev) => [newApp, ...prev]);
      setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j))
      );
      setNotifications((prev) => [newNotif, ...prev]);
      return true;
    } catch (err) {
      console.error('Error applying to job in IndexedDB:', err);
      return false;
    }
  };

  const createJobPosting = async (
    jobData: Omit<JobOpportunity, 'id' | 'applicantsCount' | 'postedDate'>
  ): Promise<string> => {
    const newId = `job_${Date.now()}`;
    const newJob: JobOpportunity = {
      ...jobData,
      id: newId,
      applicantsCount: 0,
      postedDate: new Date().toISOString().split('T')[0],
    };

    try {
      await db.jobs.put(newJob);
      setJobs((prev) => [newJob, ...prev]);

      const notif: AppNotification = {
        id: `notif_${Date.now()}`,
        targetRole: 'student',
        title: `New Opening: ${newJob.title}`,
        message: `${newJob.company} posted a new ${newJob.roleType} in ${newJob.location}.`,
        timestamp: 'Just now',
        read: false,
        type: 'info',
        link: newJob.roleType === 'internship' ? '/student/internships' : '/student/placements',
      };
      await db.notifications.put(notif);
      setNotifications((prev) => [notif, ...prev]);

      return newId;
    } catch (err) {
      console.error('Error creating job posting in IndexedDB:', err);
      return '';
    }
  };

  const updateApplicationStatus = async (
    applicationId: string,
    newStatus: ApplicationStatus,
    notes?: string
  ) => {
    try {
      const existing = applications.find((a) => a.id === applicationId);
      if (!existing) return;

      const updated = {
        ...existing,
        status: newStatus,
        notes: notes || existing.notes,
      };

      await db.applications.put(updated);
      setApplications((prev) =>
        prev.map((a) => (a.id === applicationId ? updated : a))
      );

      // Notify student
      const notif: AppNotification = {
        id: `notif_${Date.now()}`,
        targetRole: 'student',
        title: `Application Update: ${existing.company}`,
        message: `Your status for ${existing.jobTitle} changed to ${newStatus.toUpperCase()}.`,
        timestamp: 'Just now',
        read: false,
        type: newStatus === 'offer' ? 'success' : newStatus === 'rejected' ? 'alert' : 'info',
        link: '/student/applications',
      };
      await db.notifications.put(notif);
      setNotifications((prev) => [notif, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const submitAssessmentQuiz = async (answers: { [questionId: string]: number }) => {
    if (!student) return { score: 0, passed: false };

    let correctCount = 0;
    const total = questions.length;

    questions.forEach((q) => {
      if (answers[q.id] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / total) * 100);
    const passed = calculatedScore >= 70;

    // Recalculate student readiness
    const updatedSkills = student.skills.map((s) => {
      if (s.name.includes('Distributed Consensus') && calculatedScore >= 60) {
        return { ...s, proficiency: Math.min(95, s.proficiency + 20), status: 'matched' as const };
      }
      if (s.name.includes('Kubernetes') && calculatedScore >= 60) {
        return { ...s, proficiency: Math.min(92, s.proficiency + 18), status: 'matched' as const };
      }
      return s;
    });

    const newReadiness = Math.min(98, Math.round(student.readinessIndex + (passed ? 4.5 : 1.2)));

    const updatedStudent: StudentProfile = {
      ...student,
      readinessIndex: newReadiness,
      skills: updatedSkills,
      verifiedCredentialsCount: student.verifiedCredentialsCount + (passed ? 1 : 0),
    };

    try {
      await db.students.put(updatedStudent);
      setStudent(updatedStudent);

      const notif: AppNotification = {
        id: `notif_${Date.now()}`,
        targetRole: 'student',
        title: 'Assessment Evaluated!',
        message: `You scored ${calculatedScore}% (${correctCount}/${total}). Readiness Index boosted to ${newReadiness}%.`,
        timestamp: 'Just now',
        read: false,
        type: passed ? 'success' : 'warning',
        link: '/student/skills',
      };
      await db.notifications.put(notif);
      setNotifications((prev) => [notif, ...prev]);
    } catch (err) {
      console.error(err);
    }

    return { score: calculatedScore, passed };
  };

  const submitConsultancyProposal = async (
    opportunityId: string,
    proposalTitle: string,
    budget: string
  ) => {
    try {
      const opp = facultyPrograms.find((f) => f.id === opportunityId);
      if (!opp) return;

      const notif: AppNotification = {
        id: `notif_${Date.now()}`,
        targetRole: 'industry',
        title: `Faculty Proposal Received`,
        message: `Dr. Ramesh Rao submitted bid "${proposalTitle}" (${budget}) for ${opp.title}.`,
        timestamp: 'Just now',
        read: false,
        type: 'info',
        link: '/industry/collaboration',
      };
      await db.notifications.put(notif);
      setNotifications((prev) => [notif, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        isAuthenticated,
        login,
        logout,
        student,
        jobs,
        applications,
        questions,
        learningPrograms,
        facultyPrograms,
        mentorshipRecords,
        notifications,
        unreadNotificationCount,
        searchQuery,
        setSearchQuery,
        isDbLoaded,
        applyToJob,
        createJobPosting,
        updateApplicationStatus,
        submitAssessmentQuiz,
        submitConsultancyProposal,
        markNotificationAsRead,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
