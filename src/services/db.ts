import {
  Student,
  Mentor,
  ClassRoutine,
  Exam,
  ExamAttempt,
  Notice,
  StudyMaterial,
  AuditLog,
  AttendanceRecord,
  FeePayment
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_MENTORS,
  INITIAL_ROUTINES,
  INITIAL_EXAMS,
  INITIAL_ATTEMPTS,
  INITIAL_NOTICES,
  INITIAL_STUDY_MATERIALS,
  INITIAL_AUDIT_LOGS,
  SUPER_ADMIN_ACCOUNT
} from '../data/mockData';

const STORAGE_KEYS = {
  STUDENTS: 'tsf_v2_students',
  MENTORS: 'tsf_v2_mentors',
  ROUTINES: 'tsf_v2_routines',
  EXAMS: 'tsf_v2_exams',
  ATTEMPTS: 'tsf_v2_attempts',
  NOTICES: 'tsf_v2_notices',
  MATERIALS: 'tsf_v2_materials',
  ATTENDANCE: 'tsf_v2_attendance',
  FEES: 'tsf_v2_fees',
  AUDIT_LOGS: 'tsf_v2_audit_logs',
};

const INITIAL_FEES: FeePayment[] = [
  {
    id: 'fee-001',
    receiptNo: 'TSF-REC-2026-001',
    studentUid: 'TSF-STU-2026-0001',
    studentName: 'Kiron Bikash Tripura',
    unit: 'A Unit (Science)',
    batchName: 'A-Unit Padma Batch (Science)',
    feeType: 'Admission Fee',
    amount: 5000,
    paymentMethod: 'bKash',
    transactionId: 'BK9X274810M',
    date: '2026-02-01',
    status: 'Paid',
    collectedBy: 'Finance Secretary, TSF',
    notes: 'Admission registration & full lecture pack'
  },
  {
    id: 'fee-002',
    receiptNo: 'TSF-REC-2026-002',
    studentUid: 'TSF-STU-2026-0002',
    studentName: 'Moumita Tripura',
    unit: 'B Unit (Arts/Humanities)',
    batchName: 'B-Unit Meghna Batch (Arts & Law)',
    feeType: 'Admission Fee',
    amount: 4500,
    paymentMethod: 'Nagad',
    transactionId: 'NG77219043K',
    date: '2026-02-03',
    status: 'Paid',
    collectedBy: 'Finance Secretary, TSF',
    notes: 'Arts & Law unit admission kit'
  },
  {
    id: 'fee-003',
    receiptNo: 'TSF-REC-2026-003',
    studentUid: 'TSF-STU-2026-0003',
    studentName: 'Sayan Tripura',
    unit: 'Nursing & Medical',
    batchName: 'Nursing & Medical Elite Batch',
    feeType: 'Model Test Fee',
    amount: 2500,
    paymentMethod: 'bKash',
    transactionId: 'BK33991207T',
    date: '2026-02-15',
    status: 'Paid',
    collectedBy: 'Exam Controller, TSF',
    notes: 'All-Bangladesh 10-Stage Model Test Series'
  }
];

function getStoredItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading key "${key}" from localStorage:`, err);
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing key "${key}" to localStorage:`, err);
  }
}

export const dbService = {
  getStudents(): Student[] {
    return getStoredItem<Student[]>(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS as any);
  },
  saveStudents(students: Student[]): void {
    setStoredItem(STORAGE_KEYS.STUDENTS, students);
  },
  addStudent(student: Student): void {
    const students = this.getStudents();
    this.saveStudents([student, ...students]);
    this.addAuditLog(
      'STUDENT_REGISTERED',
      `Registered ${student.name} (${student.admissionUnit}) with UID ${student.studentUid}.`,
      'Admin',
      'super_admin'
    );
  },
  updateStudent(student: Student): void {
    const students = this.getStudents().map((s) => (s.id === student.id ? student : s));
    this.saveStudents(students);
    this.addAuditLog(
      'STUDENT_UPDATED',
      `Updated details for student ${student.name} (${student.studentUid}).`,
      'Admin',
      'super_admin'
    );
  },
  deleteStudent(id: string): void {
    const target = this.getStudents().find((s) => s.id === id);
    const students = this.getStudents().filter((s) => s.id !== id);
    this.saveStudents(students);
    if (target) {
      this.addAuditLog(
        'STUDENT_DELETED',
        `Deleted student profile ${target.name} (${target.studentUid}).`,
        'Admin',
        'super_admin'
      );
    }
  },

  getMentors(): Mentor[] {
    return getStoredItem<Mentor[]>(STORAGE_KEYS.MENTORS, INITIAL_MENTORS as any);
  },
  saveMentors(mentors: Mentor[]): void {
    setStoredItem(STORAGE_KEYS.MENTORS, mentors);
  },

  getRoutines(): ClassRoutine[] {
    return getStoredItem<ClassRoutine[]>(STORAGE_KEYS.ROUTINES, INITIAL_ROUTINES as any);
  },
  saveRoutines(routines: ClassRoutine[]): void {
    setStoredItem(STORAGE_KEYS.ROUTINES, routines);
  },
  addRoutine(routine: ClassRoutine): void {
    const routines = this.getRoutines();
    this.saveRoutines([routine, ...routines]);
    this.addAuditLog(
      'ROUTINE_SCHEDULED',
      `Scheduled ${routine.subject}: ${routine.topic} on ${routine.dayOfWeek} for ${routine.batchName}.`,
      routine.mentorName,
      'mentor'
    );
  },
  deleteRoutine(id: string): void {
    const routines = this.getRoutines().filter((r) => r.id !== id);
    this.saveRoutines(routines);
  },

  getExams(): Exam[] {
    return getStoredItem<Exam[]>(STORAGE_KEYS.EXAMS, INITIAL_EXAMS as any);
  },
  saveExams(exams: Exam[]): void {
    setStoredItem(STORAGE_KEYS.EXAMS, exams);
  },
  addExam(exam: Exam): void {
    const exams = this.getExams();
    this.saveExams([exam, ...exams]);
    this.addAuditLog(
      'EXAM_CREATED',
      `Created new exam: "${exam.title}" (${exam.unit}) with ${exam.questions.length} questions.`,
      exam.createdBy || 'Teacher / Admin',
      'mentor'
    );
  },
  deleteExam(id: string): void {
    const exams = this.getExams().filter((e) => e.id !== id);
    this.saveExams(exams);
  },

  getAttempts(): ExamAttempt[] {
    return getStoredItem<ExamAttempt[]>(STORAGE_KEYS.ATTEMPTS, INITIAL_ATTEMPTS as any);
  },
  saveAttempt(attempt: ExamAttempt): void {
    const attempts = this.getAttempts();
    this.setAttempts([attempt, ...attempts]);
    this.addAuditLog(
      'EXAM_ATTEMPT_SUBMITTED',
      `Student ${attempt.studentName} (${attempt.studentUid}) scored ${attempt.totalMarksObtained} in ${attempt.examTitle}.`,
      attempt.studentName,
      'student'
    );
  },
  setAttempts(attempts: ExamAttempt[]): void {
    setStoredItem(STORAGE_KEYS.ATTEMPTS, attempts);
  },

  getAttendance(): AttendanceRecord[] {
    return getStoredItem<AttendanceRecord[]>(STORAGE_KEYS.ATTENDANCE, []);
  },
  saveAttendance(records: AttendanceRecord[]): void {
    const existing = this.getAttendance();
    const newKeys = new Set(records.map((r) => `${r.date}_${r.studentUid}_${r.routineId}`));
    const filtered = existing.filter((r) => !newKeys.has(`${r.date}_${r.studentUid}_${r.routineId}`));
    setStoredItem(STORAGE_KEYS.ATTENDANCE, [...records, ...filtered]);
    this.addAuditLog(
      'ATTENDANCE_MARKED',
      `Marked attendance for ${records.length} students on ${records[0]?.date || 'today'}.`,
      'Faculty Member',
      'mentor'
    );
  },

  getFees(): FeePayment[] {
    return getStoredItem<FeePayment[]>(STORAGE_KEYS.FEES, INITIAL_FEES);
  },
  saveFees(fees: FeePayment[]): void {
    setStoredItem(STORAGE_KEYS.FEES, fees);
  },
  addFeePayment(payment: FeePayment): void {
    const fees = this.getFees();
    this.saveFees([payment, ...fees]);
    const students = this.getStudents().map((s) => {
      if (s.studentUid === payment.studentUid) {
        const totalPaid = (s.totalFeePaid || 0) + payment.amount;
        return {
          ...s,
          feeStatus: 'Paid' as const,
          totalFeePaid: totalPaid
        };
      }
      return s;
    });
    this.saveStudents(students);
    this.addAuditLog(
      'FEE_PAYMENT_COLLECTED',
      `Recorded payment of ৳${payment.amount} for ${payment.studentName} via ${payment.paymentMethod} (Receipt: ${payment.receiptNo}).`,
      payment.collectedBy,
      'super_admin'
    );
  },

  getNotices(): Notice[] {
    return getStoredItem<Notice[]>(STORAGE_KEYS.NOTICES, INITIAL_NOTICES);
  },
  saveNotices(notices: Notice[]): void {
    setStoredItem(STORAGE_KEYS.NOTICES, notices);
  },
  addNotice(notice: Notice): void {
    const notices = this.getNotices();
    this.saveNotices([notice, ...notices]);
    this.addAuditLog(
      'NOTICE_PUBLISHED',
      `Published announcement: "${notice.title}". Category: ${notice.category}.`,
      notice.author,
      notice.authorRole
    );
  },
  deleteNotice(id: string): void {
    const notices = this.getNotices().filter((n) => n.id !== id);
    this.saveNotices(notices);
  },

  getMaterials(): StudyMaterial[] {
    return getStoredItem<StudyMaterial[]>(STORAGE_KEYS.MATERIALS, INITIAL_STUDY_MATERIALS as any);
  },
  saveMaterials(materials: StudyMaterial[]): void {
    setStoredItem(STORAGE_KEYS.MATERIALS, materials);
  },
  addMaterial(material: StudyMaterial): void {
    const materials = this.getMaterials();
    this.saveMaterials([material, ...materials]);
    this.addAuditLog(
      'STUDY_MATERIAL_UPLOADED',
      `Uploaded resource: "${material.title}" for ${material.unit} (${material.subject}).`,
      material.uploadedBy,
      'mentor'
    );
  },

  getAuditLogs(): AuditLog[] {
    return getStoredItem<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  },
  addAuditLog(action: string, details: string, performedBy: string = 'Super Admin', role: string = 'super_admin'): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      action,
      performedBy,
      performedByEmail: SUPER_ADMIN_ACCOUNT.email,
      role,
      targetResource: 'system/database',
      timestamp: new Date().toISOString(),
      details,
      ipAddress: '103.145.12.88'
    };
    setStoredItem(STORAGE_KEYS.AUDIT_LOGS, [newLog, ...logs].slice(0, 200));
  },

  exportDatabaseJson(): string {
    const backup = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      app: 'TSF.BD Admission Coaching Platform',
      data: {
        students: this.getStudents(),
        mentors: this.getMentors(),
        routines: this.getRoutines(),
        exams: this.getExams(),
        attempts: this.getAttempts(),
        attendance: this.getAttendance(),
        fees: this.getFees(),
        notices: this.getNotices(),
        materials: this.getMaterials(),
        auditLogs: this.getAuditLogs(),
      }
    };
    return JSON.stringify(backup, null, 2);
  },

  importDatabaseJson(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.data) throw new Error('Invalid backup structure: missing data key.');
      if (parsed.data.students) setStoredItem(STORAGE_KEYS.STUDENTS, parsed.data.students);
      if (parsed.data.mentors) setStoredItem(STORAGE_KEYS.MENTORS, parsed.data.mentors);
      if (parsed.data.routines) setStoredItem(STORAGE_KEYS.ROUTINES, parsed.data.routines);
      if (parsed.data.exams) setStoredItem(STORAGE_KEYS.EXAMS, parsed.data.exams);
      if (parsed.data.attempts) setStoredItem(STORAGE_KEYS.ATTEMPTS, parsed.data.attempts);
      if (parsed.data.attendance) setStoredItem(STORAGE_KEYS.ATTENDANCE, parsed.data.attendance);
      if (parsed.data.fees) setStoredItem(STORAGE_KEYS.FEES, parsed.data.fees);
      if (parsed.data.notices) setStoredItem(STORAGE_KEYS.NOTICES, parsed.data.notices);
      if (parsed.data.materials) setStoredItem(STORAGE_KEYS.MATERIALS, parsed.data.materials);
      if (parsed.data.auditLogs) setStoredItem(STORAGE_KEYS.AUDIT_LOGS, parsed.data.auditLogs);
      this.addAuditLog('DATABASE_RESTORED', 'Successfully restored database from JSON backup file.', 'Super Admin', 'super_admin');
      return true;
    } catch (e) {
      console.error('Failed to import database JSON:', e);
      return false;
    }
  },

  resetToFactoryDefaults(): void {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    this.addAuditLog('FACTORY_RESET', 'Reset all platform databases to initial factory seeds.', 'Super Admin', 'super_admin');
  }
};
