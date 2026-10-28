export type UserRole = 'super_admin' | 'admin' | 'teacher' | 'mentor' | 'student';

export type UnitType = 'Science' | 'Commerce' | 'Arts' | 'Nursing';
export type AdmissionUnit =
  | 'A Unit'
  | 'B Unit'
  | 'C Unit'
  | 'D Unit'
  | 'Medical'
  | 'Nursing'
  | 'Science'
  | 'Commerce'
  | 'Arts'
  | 'A Unit (Science)'
  | 'B Unit (Arts/Humanities)'
  | 'C Unit (Commerce)'
  | 'Nursing & Medical'
  | string;

export type StudentStatus = 'Active' | 'Pending' | 'Inactive' | 'Probation';

export interface User {
  id: string;
  uid?: string;
  email: string;
  pin?: string; // 4-digit PIN
  name: string;
  role: UserRole;
  enrolledUnits?: UnitType[];
  phone?: string;
  avatar?: string;
  createdAt: string;
  isVerified?: boolean;
}

export interface Student {
  id: string;
  uid: string;
  studentUid: string;
  email: string;
  name: string;
  role: 'student';
  phone: string;
  admissionUnit: AdmissionUnit;
  status: StudentStatus;
  batchId?: string;
  batchName?: string;
  sscGpa?: number;
  sscBoard?: string;
  sscPassingYear?: number;
  hscGpa?: number;
  hscBoard?: string;
  hscPassingYear?: number;
  address?: string;
  fatherName?: string;
  guardianPhone?: string;
  targetUniversity?: string;
  enrolledDate?: string;
  createdAt: string;
  isVerified?: boolean;
  totalAttendanceRate?: number;
  avatarUrl?: string;
  bloodGroup?: string;
  totalFeePaid?: number;
}

export interface Mentor {
  id: string;
  uid: string;
  mentorUid: string;
  email: string;
  name: string;
  role: 'mentor' | 'teacher';
  phone: string;
  subjects: string[];
  assignedUnits: string[];
  assignedBatches: string[];
  educationInstitution: string;
  designation: string;
  rating: number;
  bio: string;
  createdAt: string;
  isVerified: boolean;
}

export interface Batch {
  id: string;
  name: string;
  unit: AdmissionUnit;
  year: string;
  maxCapacity: number;
  enrolledCount: number;
  scheduleSummary: string;
}

export interface ClassRoutine {
  id: string;
  dayOfWeek: 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  startTime: string;
  endTime: string;
  subject: string;
  topic: string;
  batchId?: string;
  batchName?: string;
  unit: AdmissionUnit;
  mentorId?: string;
  mentorName: string;
  room: string;
  isOnline: boolean;
  meetingLink?: string;
  status: 'Scheduled' | 'Live' | 'Completed' | 'Cancelled';
}

export interface CourseVideo {
  id: string;
  title: string;
  unit: UnitType;
  subject: string;
  videoUrl: string; // YouTube URL / embed or MP4
  duration: string; // e.g. "45m"
  teacherName: string;
  teacherEmail: string;
  description: string;
  createdAt: string;
}

export interface McqQuestion {
  id: string;
  questionText: string;
  questionTextBn?: string;
  options: string[];
  optionsBn?: string[];
  correctOptionIndex: number;
  explanation?: string;
  explanationBn?: string;
  subject?: string;
  marks?: number;
}

export interface Exam {
  id: string;
  title: string;
  titleBn?: string;
  unit: AdmissionUnit;
  subject: string;
  syllabus: string;
  examType: string;
  durationMinutes: number;
  totalMarks: number;
  totalQuestions: number;
  negativeMarking: number;
  startTime: string;
  endTime: string;
  isPublished: boolean;
  randomizeQuestions: boolean;
  createdBy: string;
  questions: McqQuestion[];
}

export interface ExamAttempt {
  id: string;
  examId: string;
  examTitle: string;
  studentId: string;
  studentUid?: string;
  studentName: string;
  unit: AdmissionUnit;
  batchName?: string;
  totalQuestions?: number;
  attemptedQuestions?: number;
  correctAnswers?: number;
  wrongAnswers?: number;
  score?: number;
  percentage?: number;
  submittedAt: string;
  userAnswers?: Record<string, number>;
  totalMarksObtained?: number;
  isPassed?: boolean;
  rank?: number;
  correctAnswersCount?: number;
  incorrectAnswersCount?: number;
  unansweredCount?: number;
  answers?: Record<string, number>;
  timeSpentSeconds?: number;
}

export interface TestQuestion {
  id: string;
  question: string;
  options: [string, string, string, string] | string[];
  correctOption: number; // 0, 1, 2, 3
  explanation?: string;
}

export interface ModelTest {
  id: string;
  title: string;
  unit: UnitType;
  subject: string;
  durationMinutes: number;
  totalMarks: number;
  passMarks: number;
  negativeMarking: number; // e.g. 0.25
  questions: TestQuestion[];
  teacherName: string;
  teacherEmail: string;
  createdAt: string;
}

export interface TestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  studentEmail: string;
  studentName: string;
  unit: UnitType;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  answers: Record<string, number>; // questionId -> selectedIndex
  submittedAt: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  titleBn?: string;
  unit: AdmissionUnit;
  subject: string;
  topic?: string;
  materialType?: 'Lecture Sheet' | 'Question Bank' | 'Suggestion' | 'Formula Book' | string;
  fileUrl?: string;
  fileSizeBytes?: number;
  downloadCount?: number;
  downloadUrl?: string;
  uploadedBy: string;
  uploadedAt?: string;
  uploadDate?: string;
  isFeatured?: boolean;
  isRestricted?: boolean;
  description?: string;
  fileType?: string;
  fileSize?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentUid?: string;
  studentName: string;
  routineId?: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  markedBy?: string;
}

export interface Notice {
  id: string;
  title: string;
  titleBn?: string;
  content: string;
  contentBn?: string;
  unit?: UnitType | 'All' | AdmissionUnit;
  authorName?: string;
  authorRole?: string;
  author?: string;
  category?: string;
  publishedAt?: string;
  isUrgent?: boolean;
  isPinned?: boolean;
  createdAt?: string;
}

export interface FeePayment {
  id: string;
  receiptNumber?: string;
  receiptNo?: string;
  studentId?: string;
  studentUid?: string;
  studentName: string;
  unit: AdmissionUnit;
  batchName?: string;
  feeType: string;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
  paymentDate?: string;
  date?: string;
  status: 'Completed' | 'Pending' | 'Failed' | 'Paid' | 'Partial' | 'Due';
  collectedBy?: string;
  notes?: string;
  remarks?: string;
}

export interface FeeRecord {
  id: string;
  receiptNo: string;
  receiptNumber?: string;
  studentEmail?: string;
  studentId?: string;
  studentName: string;
  unit: UnitType;
  amount: number;
  feeType: 'Admission Fee' | 'Monthly Tuition' | 'Model Test Fee' | 'Books' | string;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Bank' | 'Cash' | string;
  transactionId?: string;
  date: string;
  status: 'Paid' | 'Partial' | 'Due' | string;
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  performedByEmail?: string;
  targetResource?: string;
  ipAddress?: string;
  role: string;
  timestamp: string;
  details: string;
}
