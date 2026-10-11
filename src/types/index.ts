export type UserRole = 'student' | 'industry' | 'faculty' | 'institution';

export interface SkillItem {
  name: string;
  category: 'core' | 'framework' | 'tools' | 'soft';
  proficiency: number; // 0 to 100
  benchmark: number; // industry target (e.g. 85)
  status: 'matched' | 'gap' | 'emerging';
  verifiedBy?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  college: string;
  degree: string;
  branch: string;
  batch: string;
  cgpa: number;
  avatarUrl: string;
  targetRole: string;
  readinessIndex: number; // e.g. 84.5
  skills: SkillItem[];
  verifiedCredentialsCount: number;
  totalCompetencies: number;
  portfolioUrl?: string;
  githubUrl?: string;
  resumeFileName?: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  roleType: 'internship' | 'placement' | 'apprenticeship';
  location: string;
  isRemote: boolean;
  stipend?: string;
  ctc?: string;
  duration?: string;
  startDate?: string;
  requiredSkills: string[];
  preferredSkills?: string[];
  description: string;
  facultyMentored: boolean;
  ppoAvailable: boolean;
  applicantsCount: number;
  postedDate: string;
  deadline: string;
  industrySector: string;
}

export type ApplicationStatus = 'applied' | 'screening' | 'shortlisted' | 'interview' | 'offer' | 'rejected';

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentBranch: string;
  studentCgpa: number;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: ApplicationStatus;
  matchScore: number; // e.g. 94
  matchedSkills: string[];
  gapSkills: string[];
  interviewDate?: string;
  mentorFeedback?: string;
  offerLetterUrl?: string;
  notes?: string;
}

export interface AssessmentQuestion {
  id: string;
  domain: string;
  skillTag: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface AssessmentResult {
  id: string;
  studentId: string;
  domain: string;
  score: number; // 0 to 100
  totalQuestions: number;
  correctQuestions: number;
  dateTaken: string;
  skillGapsIdentified: string[];
  recommendedPrograms: string[];
}

export interface LearningProgram {
  id: string;
  title: string;
  provider: string;
  domain: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  enrolledCount: number;
  rating: number;
  skillsTaught: string[];
  isBridgeCourse: boolean;
  targetGapSkill?: string;
  description: string;
}

export interface FacultyOpportunity {
  id: string;
  type: 'fdp' | 'sabbatical' | 'consultancy' | 'grant';
  title: string;
  organization: string;
  fundingAmount?: string;
  duration: string;
  domain: string;
  deadline: string;
  status: 'open' | 'applied' | 'sanctioned' | 'completed';
  description: string;
  slotsAvailable?: number;
}

export interface StudentMentorshipRecord {
  id: string;
  studentId: string;
  studentName: string;
  facultyName: string;
  company: string;
  projectTitle: string;
  progressPercent: number;
  status: 'In Progress' | 'Mid-Term Review' | 'Completed' | 'Pending Verification';
  lastFeedback: string;
  lastUpdated: string;
}

export interface AppNotification {
  id: string;
  targetRole: UserRole;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'alert';
  link?: string;
}
