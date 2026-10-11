import Dexie, { type Table } from 'dexie';
import {
  StudentProfile,
  JobOpportunity,
  Application,
  AssessmentQuestion,
  AssessmentResult,
  LearningProgram,
  FacultyOpportunity,
  StudentMentorshipRecord,
  AppNotification,
} from '@/types';

export class NexusBridgeDatabase extends Dexie {
  students!: Table<StudentProfile, string>;
  jobs!: Table<JobOpportunity, string>;
  applications!: Table<Application, string>;
  questions!: Table<AssessmentQuestion, string>;
  assessments!: Table<AssessmentResult, string>;
  learningPrograms!: Table<LearningProgram, string>;
  facultyPrograms!: Table<FacultyOpportunity, string>;
  mentorshipRecords!: Table<StudentMentorshipRecord, string>;
  notifications!: Table<AppNotification, string>;

  constructor() {
    super('NexusBridgeDB');
    this.version(1).stores({
      students: 'id, rollNo, email, batch',
      jobs: 'id, company, roleType, industrySector, postedDate',
      applications: 'id, jobId, studentId, status, appliedDate',
      questions: 'id, domain, skillTag',
      assessments: 'id, studentId, domain, dateTaken',
      learningPrograms: 'id, domain, isBridgeCourse',
      facultyPrograms: 'id, type, domain, status',
      mentorshipRecords: 'id, studentId, status',
      notifications: 'id, targetRole, read',
    });
  }
}

export const db = new NexusBridgeDatabase();

// Default seed data
export const INITIAL_STUDENT: StudentProfile = {
  id: 'std_01',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@apex.edu',
  rollNo: '21CS042',
  college: 'Apex Institute of Technology',
  degree: 'B.Tech',
  branch: 'Computer Science & Cloud Systems',
  batch: '2025',
  cgpa: 8.82,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  targetRole: 'Cloud Solutions Architect & Distributed Systems Engineer',
  readinessIndex: 84.5,
  verifiedCredentialsCount: 19,
  totalCompetencies: 24,
  portfolioUrl: 'https://aarav-sharma.dev',
  githubUrl: 'https://github.com/aaravsharma-cloud',
  resumeFileName: 'Aarav_Sharma_Resume_2025.pdf',
  skills: [
    { name: 'Data Structures & Algorithms', category: 'core', proficiency: 95, benchmark: 85, status: 'matched', verifiedBy: 'Operating Systems Lab (Grade A+)' },
    { name: 'Cloud Architecture & HA Design', category: 'core', proficiency: 88, benchmark: 90, status: 'matched', verifiedBy: 'AWS Certified Solutions Architect' },
    { name: 'Go / Python Backend', category: 'tools', proficiency: 92, benchmark: 80, status: 'matched', verifiedBy: 'Dist. Systems Project (A+)' },
    { name: 'Linux Kernel & Systems', category: 'core', proficiency: 86, benchmark: 75, status: 'matched', verifiedBy: 'Advanced Unix Programming' },
    { name: 'Terraform & IaC', category: 'tools', proficiency: 84, benchmark: 78, status: 'matched', verifiedBy: 'DevOps Capstone Project' },
    { name: 'Kubernetes Orchestration', category: 'tools', proficiency: 62, benchmark: 82, status: 'gap', verifiedBy: 'Incomplete Lab' },
    { name: 'Distributed Consensus (Raft/Paxos)', category: 'core', proficiency: 54, benchmark: 75, status: 'gap', verifiedBy: 'Theoretical Assessment' },
    { name: 'Observability & OpenTelemetry', category: 'tools', proficiency: 58, benchmark: 80, status: 'gap', verifiedBy: 'Self-Assessment' },
    { name: 'Technical Communication & Leadership', category: 'soft', proficiency: 88, benchmark: 70, status: 'matched', verifiedBy: 'ACM Student Chapter Lead' },
  ],
};

export const INITIAL_JOBS: JobOpportunity[] = [
  {
    id: 'job_01',
    title: 'Cloud Infrastructure & SRE Intern',
    company: 'Microsoft Azure',
    roleType: 'internship',
    location: 'Bangalore (Hybrid)',
    isRemote: false,
    stipend: '₹65,000 / month',
    duration: '6 Months',
    startDate: 'Jan 2025',
    requiredSkills: ['Go / Python', 'Linux Kernel', 'Terraform', 'Kubernetes'],
    preferredSkills: ['Distributed Systems', 'Azure Resource Manager'],
    description: 'Scale core Azure high-availability control plane. Collaborate with cloud architects to build autonomous remediation and distributed microservices infrastructure.',
    facultyMentored: true,
    ppoAvailable: true,
    applicantsCount: 28,
    postedDate: '2024-10-04',
    deadline: '2024-11-15',
    industrySector: 'Cloud & Infrastructure',
  },
  {
    id: 'job_02',
    title: 'Distributed Systems & FinTech Backend Engineer',
    company: 'Razorpay',
    roleType: 'internship',
    location: 'Remote / Bangalore',
    isRemote: true,
    stipend: '₹55,000 / month',
    duration: '6 Months',
    startDate: 'Dec 2024',
    requiredSkills: ['Go / Python Backend', 'Data Structures & Algorithms', 'Linux Kernel & Systems'],
    preferredSkills: ['Kafka', 'Redis', 'High Throughput Transactions'],
    description: 'Design idempotent payment transaction engines and ledger processing at peak scale. Work directly with campus faculty advisors on fault-tolerance verification.',
    facultyMentored: true,
    ppoAvailable: true,
    applicantsCount: 42,
    postedDate: '2024-10-02',
    deadline: '2024-11-20',
    industrySector: 'FinTech',
  },
  {
    id: 'job_03',
    title: 'Full Stack AI Platform Engineer (Placement)',
    company: 'Atlassian',
    roleType: 'placement',
    location: 'Bengaluru (Hybrid)',
    isRemote: false,
    ctc: '₹54.0 LPA',
    startDate: 'July 2025',
    requiredSkills: ['Data Structures & Algorithms', 'Cloud Architecture & HA Design', 'Go / Python Backend'],
    preferredSkills: ['React', 'System Design', 'LLM Infrastructure'],
    description: 'Build enterprise collaborative software powered by next-generation generative AI and resilient cloud microservices.',
    facultyMentored: false,
    ppoAvailable: false,
    applicantsCount: 118,
    postedDate: '2024-09-28',
    deadline: '2024-10-30',
    industrySector: 'Enterprise SaaS',
  },
  {
    id: 'job_04',
    title: 'Autonomous Systems & Edge AI Intern',
    company: 'Tata Consultancy Services (TCS R&D)',
    roleType: 'internship',
    location: 'Pune / Innovation Lab',
    isRemote: false,
    stipend: '₹42,000 / month',
    duration: '4 Months',
    startDate: 'Jan 2025',
    requiredSkills: ['Linux Kernel & Systems', 'Data Structures & Algorithms', 'Go / Python Backend'],
    description: 'Collaborate with university researchers on deep edge inference models for industrial IoT robotics.',
    facultyMentored: true,
    ppoAvailable: true,
    applicantsCount: 19,
    postedDate: '2024-10-05',
    deadline: '2024-11-10',
    industrySector: 'DeepTech & R&D',
  },
  {
    id: 'job_05',
    title: 'Cloud Security & Compliance Associate',
    company: 'Palo Alto Networks',
    roleType: 'placement',
    location: 'Bangalore',
    isRemote: false,
    ctc: '₹32.0 LPA',
    startDate: 'July 2025',
    requiredSkills: ['Cloud Architecture & HA Design', 'Linux Kernel & Systems', 'Kubernetes Orchestration'],
    description: 'Defend multi-cloud perimeters with identity entitlement protection and automated container vulnerability pipelines.',
    facultyMentored: false,
    ppoAvailable: false,
    applicantsCount: 64,
    postedDate: '2024-10-01',
    deadline: '2024-11-05',
    industrySector: 'Cybersecurity',
  },
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app_01',
    jobId: 'job_01',
    studentId: 'std_01',
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.sharma@apex.edu',
    studentBranch: 'Computer Science & Cloud Systems',
    studentCgpa: 8.82,
    jobTitle: 'Cloud Infrastructure & SRE Intern',
    company: 'Microsoft Azure',
    appliedDate: '2024-10-05',
    status: 'interview',
    matchScore: 94,
    matchedSkills: ['Go / Python', 'Linux Kernel', 'Terraform'],
    gapSkills: ['Kubernetes Orchestration'],
    interviewDate: '2024-10-18T14:00:00Z',
    notes: 'Cleared Round 1 System Architecture. Technical round with Cloud SRE Principal Engineer scheduled.',
  },
  {
    id: 'app_02',
    jobId: 'job_02',
    studentId: 'std_01',
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.sharma@apex.edu',
    studentBranch: 'Computer Science & Cloud Systems',
    studentCgpa: 8.82,
    jobTitle: 'Distributed Systems & FinTech Backend Engineer',
    company: 'Razorpay',
    appliedDate: '2024-10-06',
    status: 'interview',
    matchScore: 91,
    matchedSkills: ['Go / Python Backend', 'Data Structures & Algorithms', 'Linux Kernel & Systems'],
    gapSkills: [],
    interviewDate: '2024-10-21T11:30:00Z',
    notes: 'Assigned Take-home Distributed Lock challenge (Scored 98/100). Final panel discussion pending.',
  },
  {
    id: 'app_03',
    jobId: 'job_03',
    studentId: 'std_01',
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.sharma@apex.edu',
    studentBranch: 'Computer Science & Cloud Systems',
    studentCgpa: 8.82,
    jobTitle: 'Full Stack AI Platform Engineer (Placement)',
    company: 'Atlassian',
    appliedDate: '2024-10-02',
    status: 'shortlisted',
    matchScore: 89,
    matchedSkills: ['Data Structures & Algorithms', 'Cloud Architecture & HA Design'],
    gapSkills: ['Observability & OpenTelemetry'],
    notes: 'Resume verified by TPO Cell. Coding assessment link dispatched.',
  },
];

export const INITIAL_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q_01',
    domain: 'Distributed Systems',
    skillTag: 'Distributed Consensus (Raft/Paxos)',
    question: 'In the Raft consensus algorithm, what condition must be true before a Leader node can safely commit a log entry to its state machine?',
    options: [
      'The entry must be acknowledged by all follower nodes without exception.',
      'The entry from the leader\'s current term must be replicated on a majority (quorum) of cluster nodes.',
      'The candidate must win a secondary heartbeat round from the preceding leader.',
      'The checksum of the log index must match the disk journal block size.'
    ],
    correctOptionIndex: 1,
    explanation: 'A leader in Raft commits an entry once it is replicated across a majority of nodes in its current term, guaranteeing safety against split-brain anomalies.'
  },
  {
    id: 'q_02',
    domain: 'Cloud Infrastructure',
    skillTag: 'Kubernetes Orchestration',
    question: 'Which Kubernetes controller manages stateful workloads requiring persistent storage identifiers, stable network DNS hostnames, and ordered deployment/scaling?',
    options: [
      'DaemonSet',
      'ReplicaSet',
      'StatefulSet',
      'HorizontalPodAutoscaler'
    ],
    correctOptionIndex: 2,
    explanation: 'StatefulSets provide unique ordinal index IDs, sticky identities, and persistent storage per pod instance, essential for distributed databases.'
  },
  {
    id: 'q_03',
    domain: 'Cloud Observability',
    skillTag: 'Observability & OpenTelemetry',
    question: 'In OpenTelemetry distributed tracing, what is the fundamental component that correlates individual spans across asynchronous RPC network boundaries?',
    options: [
      'W3C TraceContext (traceparent header containing TraceID and SpanID)',
      'TCP Sequence Number',
      'Prometheus Scrape Interval Gauge',
      'TLS Client Certificate Fingerprint'
    ],
    correctOptionIndex: 0,
    explanation: 'W3C TraceContext standardizes the `traceparent` HTTP header carrying the 128-bit TraceID across microservice hops.'
  },
  {
    id: 'q_04',
    domain: 'Algorithms',
    skillTag: 'Data Structures & Algorithms',
    question: 'What is the tightest worst-case time complexity of finding the Strongly Connected Components (SCCs) of a directed graph with V vertices and E edges using Tarjan\'s algorithm?',
    options: [
      'O(V * E)',
      'O(V + E)',
      'O(V log V)',
      'O(E^2)'
    ],
    correctOptionIndex: 1,
    explanation: 'Tarjan\'s SCC algorithm performs a single DFS traversal maintaining low-link values in O(V + E) linear time.'
  },
  {
    id: 'q_05',
    domain: 'Cloud Security',
    skillTag: 'Cloud Architecture & HA Design',
    question: 'Under the Cloud Shared Responsibility Model, which layer is strictly the customer\'s responsibility in an Infrastructure-as-a-Service (IaaS) deployment?',
    options: [
      'Hypervisor patch level',
      'Physical data center HVAC and perimeter access',
      'Guest Operating System updates, firewall rules, and IAM policies',
      'Host hardware replacement'
    ],
    correctOptionIndex: 2,
    explanation: 'In IaaS, the cloud provider manages physical hardware and virtualization, while the tenant is responsible for guest OS security, firewalls, and credential control.'
  }
];

export const INITIAL_LEARNING_PROGRAMS: LearningProgram[] = [
  {
    id: 'lp_01',
    title: 'Kubernetes Production Engineering & CKA Fast-Track',
    provider: 'Cloud Native Computing Foundation (CNCF) & Apex Academics',
    domain: 'Cloud Infrastructure',
    duration: '4 Weeks (20 Hours)',
    level: 'Intermediate',
    enrolledCount: 340,
    rating: 4.9,
    skillsTaught: ['Kubernetes Orchestration', 'Container Runtime', 'Ingress Controller'],
    isBridgeCourse: true,
    targetGapSkill: 'Kubernetes Orchestration',
    description: 'Hands-on lab bridging the gap between basic Docker containers and enterprise multi-cluster orchestration with Helm, CRDs, and network policies.',
  },
  {
    id: 'lp_02',
    title: 'Distributed Consensus & Fault-Tolerant Microservices',
    provider: 'Google Cloud & Indian Institute of Science (IISc)',
    domain: 'Distributed Systems',
    duration: '6 Weeks (30 Hours)',
    level: 'Advanced',
    enrolledCount: 180,
    rating: 4.8,
    skillsTaught: ['Distributed Consensus (Raft/Paxos)', 'Vector Clocks', 'Distributed Transactions'],
    isBridgeCourse: true,
    targetGapSkill: 'Distributed Consensus (Raft/Paxos)',
    description: 'Master building decentralized storage, Raft leaders, election timeout calibration, and partitioned cluster recovery.',
  },
  {
    id: 'lp_03',
    title: 'Full-Stack Observability with OpenTelemetry & Grafana',
    provider: 'Microsoft Azure Academic Initiative',
    domain: 'Cloud Observability',
    duration: '3 Weeks (15 Hours)',
    level: 'Intermediate',
    enrolledCount: 410,
    rating: 4.7,
    skillsTaught: ['Observability & OpenTelemetry', 'Prometheus Metrics', 'Distributed Tracing'],
    isBridgeCourse: true,
    targetGapSkill: 'Observability & OpenTelemetry',
    description: 'Instrument production Go and Python microservices with automatic OpenTelemetry spans, RED metrics, and synthetic monitors.',
  },
  {
    id: 'lp_04',
    title: 'Advanced System Design for Hyper-Scale Architectures',
    provider: 'Razorpay Engineering Academy',
    domain: 'Backend Engineering',
    duration: '5 Weeks (25 Hours)',
    level: 'Advanced',
    enrolledCount: 620,
    rating: 4.95,
    skillsTaught: ['High Availability', 'Database Sharding', 'Event-Driven Architectures'],
    isBridgeCourse: false,
    description: 'Real-world case studies in designing 99.999% SLA financial pipelines handling 100k TPS.',
  }
];

export const INITIAL_FACULTY_PROGRAMS: FacultyOpportunity[] = [
  {
    id: 'fac_01',
    type: 'sabbatical',
    title: 'NVIDIA AI & High-Performance Computing Faculty Fellowship',
    organization: 'NVIDIA Research India',
    fundingAmount: '₹3,50,000 / stipend + GPU cluster compute credits',
    duration: '6 Months Sabbatical',
    domain: 'AI / Accelerated Computing',
    deadline: '2024-11-30',
    status: 'open',
    slotsAvailable: 4,
    description: 'Immersion sabbatical for engineering faculty to work alongside NVIDIA CUDA kernel teams on generative AI tensor acceleration.',
  },
  {
    id: 'fac_02',
    type: 'consultancy',
    title: 'RFP: Autonomous Anomaly Detection in Smart Grid Telemetry',
    organization: 'Tata Power & L&T Electrical',
    fundingAmount: '₹24,00,000 sanctioned budget',
    duration: '9 Months Project',
    domain: 'Electrical / IoT Systems',
    deadline: '2024-11-15',
    status: 'open',
    slotsAvailable: 1,
    description: 'Corporate consultancy bid seeking university researchers to build edge sensor predictive maintenance algorithms.',
  },
  {
    id: 'fac_03',
    type: 'grant',
    title: 'Joint Applied R&D Grant: Resilient 6G Cloud-RAN Protocols',
    organization: 'Qualcomm & Department of Telecom (DoT)',
    fundingAmount: '₹1,20,00,000 (Sanctioned Pool)',
    duration: '24 Months Multi-phase',
    domain: 'Telecommunications & Cloud',
    deadline: '2024-12-15',
    status: 'open',
    slotsAvailable: 3,
    description: 'Co-funding partnership between industry and accredited academic labs to publish IEEE whitepapers and file joint patents.',
  },
  {
    id: 'fac_04',
    type: 'fdp',
    title: 'AICTE-Corporate FDP: Next-Gen Cloud Native & Microservices Curricula',
    organization: 'AWS Educate & AICTE',
    fundingAmount: 'All-inclusive boarding + Honorarium',
    duration: '2 Weeks Immersive',
    domain: 'Computer Science',
    deadline: '2024-11-08',
    status: 'open',
    slotsAvailable: 45,
    description: 'Faculty Development Program to align university syllabus with current Kubernetes, Serverless, and IaC engineering paradigms.',
  }
];

export const INITIAL_MENTORSHIPS: StudentMentorshipRecord[] = [
  {
    id: 'ment_01',
    studentId: 'std_01',
    studentName: 'Aarav Sharma',
    facultyName: 'Dr. Ramesh Rao (Head of Cloud Systems)',
    company: 'Microsoft Azure',
    projectTitle: 'Automated Chaos Engineering & Fault-Tolerant K8s Mesh',
    progressPercent: 75,
    status: 'In Progress',
    lastFeedback: 'Mid-term evaluation approved with Distinction. Whitepaper draft submitted for institutional symposium.',
    lastUpdated: '2024-10-09',
  },
  {
    id: 'ment_02',
    studentId: 'std_02',
    studentName: 'Priya Patel',
    facultyName: 'Dr. S. K. Kulkarni (Professor, AI Lab)',
    company: 'Razorpay',
    projectTitle: 'High-Throughput Distributed Fraud Scoring with Low Latency',
    progressPercent: 90,
    status: 'Mid-Term Review',
    lastFeedback: 'Benchmark test results validated against Razorpay staging datasets. Excellent code hygiene.',
    lastUpdated: '2024-10-08',
  },
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_01',
    targetRole: 'student',
    title: 'Interview Confirmed: Microsoft Azure',
    message: 'Your Cloud SRE technical interview is scheduled for Oct 18 at 2:00 PM IST via Teams.',
    timestamp: '10m ago',
    read: false,
    type: 'info',
    link: '/student/applications',
  },
  {
    id: 'notif_02',
    targetRole: 'student',
    title: 'Bridge Course Recommended',
    message: 'Kubernetes Production Engineering course has been matched to resolve your 62% gap.',
    timestamp: '2h ago',
    read: false,
    type: 'warning',
    link: '/student/learning',
  },
  {
    id: 'notif_03',
    targetRole: 'student',
    title: 'Skill Matrix Synthesized',
    message: 'Your recent DSA assessment score (95%) has been verified by the Academic Examination Cell.',
    timestamp: '1d ago',
    read: true,
    type: 'success',
    link: '/student/skills',
  },
  {
    id: 'notif_04',
    targetRole: 'industry',
    title: 'New High-Affinity Applicant',
    message: 'Aarav Sharma (94% Skill Match) applied for Cloud Infrastructure & SRE Intern.',
    timestamp: '1h ago',
    read: false,
    type: 'info',
    link: '/industry/applicants',
  },
  {
    id: 'notif_05',
    targetRole: 'faculty',
    title: 'New Consultancy RFP Open',
    message: 'Tata Power released a ₹24L RFP on smart grid telemetry anomaly detection.',
    timestamp: '3h ago',
    read: false,
    type: 'info',
    link: '/faculty/consultancy',
  },
  {
    id: 'notif_06',
    targetRole: 'institution',
    title: 'NIRF / NAAC Metric Update',
    message: 'B.Tech 2025 cohort has reached 75.9% placement rate with ₹14.8 LPA average package.',
    timestamp: '4h ago',
    read: false,
    type: 'success',
    link: '/institution/dashboard',
  },
];

// Helper to seed IndexedDB once
export async function initSeedData() {
  if (typeof window === 'undefined') return;

  try {
    const studentCount = await db.students.count();
    if (studentCount === 0) {
      await db.students.put(INITIAL_STUDENT);
      await db.jobs.bulkPut(INITIAL_JOBS);
      await db.applications.bulkPut(INITIAL_APPLICATIONS);
      await db.questions.bulkPut(INITIAL_QUESTIONS);
      await db.learningPrograms.bulkPut(INITIAL_LEARNING_PROGRAMS);
      await db.facultyPrograms.bulkPut(INITIAL_FACULTY_PROGRAMS);
      await db.mentorshipRecords.bulkPut(INITIAL_MENTORSHIPS);
      await db.notifications.bulkPut(INITIAL_NOTIFICATIONS);
      console.log('✅ NexusBridge IndexedDB successfully seeded with initial demo data.');
    }
  } catch (error) {
    console.error('Error seeding IndexedDB:', error);
  }
}
