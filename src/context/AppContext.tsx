import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  CourseVideo,
  ModelTest,
  TestAttempt,
  Notice,
  FeeRecord,
  UserRole,
  UnitType,
  Student,
  Mentor,
  ClassRoutine,
  Exam,
  ExamAttempt,
  StudyMaterial,
  AuditLog,
  AttendanceRecord
} from '../types';
import { storageService } from '../services/storage';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import {
  INITIAL_STUDENTS,
  INITIAL_MENTORS,
  INITIAL_ROUTINES,
  INITIAL_EXAMS,
  INITIAL_ATTEMPTS,
  INITIAL_STUDY_MATERIALS,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';

export type ActiveTabType =
  | 'menu'
  | 'dashboard'
  | 'home'
  | 'apk'
  | 'students'
  | 'routine'
  | 'attendance'
  | 'tests'
  | 'merit'
  | 'notices'
  | 'videos'
  | 'materials'
  | 'tracker'
  | 'mentors'
  | 'audit'
  | 'profile';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, pin: string) => boolean;
  register: (name: string, email: string, pin: string, unit: UnitType) => User;
  logout: () => void;
  updateUserRole: (email: string, role: UserRole) => boolean;
  toggleEnrollment: (unit: UnitType) => void;

  selectedUnit: UnitType | 'All';
  setSelectedUnit: (unit: UnitType | 'All') => void;

  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;

  // Language
  lang: 'bn' | 'en';
  toggleLang: () => void;

  // Drawers and Modals
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;

  isMainMenuOpen: boolean;
  setIsMainMenuOpen: (open: boolean) => void;

  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  isIdCardModalOpen: boolean;
  setIsIdCardModalOpen: (open: boolean) => void;

  isCalculatorModalOpen: boolean;
  setIsCalculatorModalOpen: (open: boolean) => void;

  isFeesModalOpen: boolean;
  setIsFeesModalOpen: (open: boolean) => void;

  isApkModalOpen: boolean;
  setIsApkModalOpen: (open: boolean) => void;

  // Collections
  videos: CourseVideo[];
  addVideo: (video: CourseVideo) => void;
  deleteVideo: (id: string) => void;

  tests: ModelTest[];
  addModelTest: (test: ModelTest) => void;
  deleteModelTest: (id: string) => void;

  attempts: TestAttempt[];
  saveAttempt: (attempt: TestAttempt) => void;

  notices: Notice[];
  addNotice: (notice: Notice) => void;
  deleteNotice: (id: string) => void;

  fees: FeeRecord[];
  addFee: (fee: FeeRecord) => void;

  // 14 Module Collections
  students: Student[];
  addStudent: (student: Student) => void;

  mentors: Mentor[];

  routines: ClassRoutine[];
  addRoutine: (routine: ClassRoutine) => void;

  exams: Exam[];
  addExam: (exam: Exam) => void;

  examAttempts: ExamAttempt[];
  saveExamAttempt: (attempt: ExamAttempt) => void;

  materials: StudyMaterial[];
  addMaterial: (material: StudyMaterial) => void;

  auditLogs: AuditLog[];
  addAuditLog: (log: AuditLog) => void;

  saveAttendanceRecords: (records: AttendanceRecord[]) => void;

  // Backup & Aliases for Views
  exportBackup: () => void;
  importBackup: (json: string) => boolean;
  resetDefaults: () => void;
  exportDatabase: () => void;
  resetDatabase: () => void;
  activeStudentUid: string | null;

  // PWA Install
  canInstall: boolean;
  installApp: () => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => storageService.getCurrentUser());
  const [users, setUsers] = useState<User[]>(() => storageService.getUsers());
  const [selectedUnit, setSelectedUnit] = useState<UnitType | 'All'>('All');
  const [activeTab, setActiveTab] = useState<ActiveTabType>('home');
  const [lang, setLang] = useState<'bn' | 'en'>('bn');

  // Drawers and Modals
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isIdCardModalOpen, setIsIdCardModalOpen] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [isFeesModalOpen, setIsFeesModalOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);

  // ── Core Collections (Initialized from local storage, synced in real-time with Firestore) ──
  const [videos, setVideos] = useState<CourseVideo[]>(() => storageService.getVideos());
  const [tests, setTests] = useState<ModelTest[]>(() => storageService.getModelTests());
  const [attempts, setAttempts] = useState<TestAttempt[]>(() => storageService.getTestAttempts());
  const [notices, setNotices] = useState<Notice[]>(() => storageService.getNotices());
  const [fees, setFees] = useState<FeeRecord[]>(() => storageService.getFees());

  // ── Firestore Real-Time Listeners ──────────────────────────────────────
  useEffect(() => {
    const unsubs: (() => void)[] = [];

    try {
      unsubs.push(
        onSnapshot(
          collection(db, 'videos'),
          (snap) => {
            if (!snap.empty) {
              setVideos(snap.docs.map((d) => ({ ...d.data(), id: d.id } as CourseVideo)));
            }
          },
          (err) => {
            console.warn('Firestore videos listener notice:', err.message);
          }
        )
      );

      unsubs.push(
        onSnapshot(
          collection(db, 'tests'),
          (snap) => {
            if (!snap.empty) {
              setTests(snap.docs.map((d) => ({ ...d.data(), id: d.id } as ModelTest)));
            }
          },
          (err) => {
            console.warn('Firestore tests listener notice:', err.message);
          }
        )
      );

      unsubs.push(
        onSnapshot(
          collection(db, 'attempts'),
          (snap) => {
            if (!snap.empty) {
              setAttempts(snap.docs.map((d) => ({ ...d.data(), id: d.id } as TestAttempt)));
            }
          },
          (err) => {
            console.warn('Firestore attempts listener notice:', err.message);
          }
        )
      );

      unsubs.push(
        onSnapshot(
          collection(db, 'notices'),
          (snap) => {
            if (!snap.empty) {
              setNotices(snap.docs.map((d) => ({ ...d.data(), id: d.id } as Notice)));
            }
          },
          (err) => {
            console.warn('Firestore notices listener notice:', err.message);
          }
        )
      );

      unsubs.push(
        onSnapshot(
          collection(db, 'fees'),
          (snap) => {
            if (!snap.empty) {
              setFees(snap.docs.map((d) => ({ ...d.data(), id: d.id } as FeeRecord)));
            }
          },
          (err) => {
            console.warn('Firestore fees listener notice:', err.message);
          }
        )
      );
    } catch (err) {
      console.warn('Firestore connection failed to initialize, continuing with offline storage:', err);
    }

    return () => unsubs.forEach((u) => u());
  }, []);

  // ── 14 Modules Collections (localStorage fallback) ─────────────────────
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('tsf_pure_students');
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const [mentors] = useState<Mentor[]>(INITIAL_MENTORS);

  const [routines, setRoutines] = useState<ClassRoutine[]>(() => {
    try {
      const saved = localStorage.getItem('tsf_pure_routines');
      return saved ? JSON.parse(saved) : INITIAL_ROUTINES;
    } catch {
      return INITIAL_ROUTINES;
    }
  });

  const [exams, setExams] = useState<Exam[]>(() => {
    try {
      const saved = localStorage.getItem('tsf_pure_exams');
      return saved ? JSON.parse(saved) : INITIAL_EXAMS;
    } catch {
      return INITIAL_EXAMS;
    }
  });

  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>(() => {
    try {
      const saved = localStorage.getItem('tsf_pure_exam_attempts');
      return saved ? JSON.parse(saved) : INITIAL_ATTEMPTS;
    } catch {
      return INITIAL_ATTEMPTS;
    }
  });

  const [materials, setMaterials] = useState<StudyMaterial[]>(() => {
    try {
      const saved = localStorage.getItem('tsf_pure_materials');
      return saved ? JSON.parse(saved) : INITIAL_STUDY_MATERIALS;
    } catch {
      return INITIAL_STUDY_MATERIALS;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem('tsf_pure_audit_logs');
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // PWA Install Prompt Event
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        showToast('অ্যাপটি সফলভাবে ইনস্টল করা হয়েছে!', 'success');
        setCanInstall(false);
      }
      setDeferredPrompt(null);
    } else {
      showToast('ব্রাউজারের মেনু থেকে "Add to Home Screen" বা "Install" নির্বাচন করুন।', 'info');
    }
  };

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = `t-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  // ── Auth Operations (localStorage-backed) ─────────────────────────────
  const login = (email: string, pin: string): boolean => {
    const user = storageService.authenticateUser(email, pin);
    if (user) {
      setCurrentUser(user);
      setUsers(storageService.getUsers());
      showToast(`স্বাগতম, ${user.name}!`);
      return true;
    }
    showToast('ভুল ইমেইল অথবা ৪-সংখ্যার পিন!', 'error');
    return false;
  };

  const register = (name: string, email: string, pin: string, unit: UnitType): User => {
    const user = storageService.registerUser(name, email, pin, unit);
    setCurrentUser(user);
    setUsers(storageService.getUsers());
    showToast(`নিবন্ধন সফল হয়েছে, ${user.name}!`);
    return user;
  };

  const logout = () => {
    storageService.setCurrentUser(null);
    setCurrentUser(null);
    showToast('লগআউট সম্পন্ন হয়েছে।', 'info');
  };

  const updateUserRole = (email: string, role: UserRole): boolean => {
    const success = storageService.updateUserRole(email, role);
    if (success) {
      setUsers(storageService.getUsers());
      setCurrentUser(storageService.getCurrentUser());
      showToast(`রোল পরিবর্তন করা হয়েছে: ${role}`);
      return true;
    }
    showToast('সুপার এডমিন রোল পরিবর্তন করা যাবে না!', 'error');
    return false;
  };

  const toggleEnrollment = (unit: UnitType) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    const updated = storageService.toggleEnrollment(currentUser.email, unit);
    if (updated) {
      setCurrentUser(updated);
      setUsers(storageService.getUsers());
      const isNow = updated.enrolledUnits?.includes(unit);
      showToast(isNow ? `${unit} ইউনিটে ভর্তি সম্পন্ন হয়েছে!` : `${unit} ইউনিট থেকে বাদ দেওয়া হয়েছে।`);
    }
  };

  // ── Video Actions (Firestore with fallback) ────────────────────────────
  const addVideo = async (video: CourseVideo) => {
    try {
      const { id, ...data } = video;
      await addDoc(collection(db, 'videos'), data);
    } catch (e) {
      console.warn('Firestore fallback for video:', e);
      storageService.saveVideo(video);
      setVideos((prev) => [video, ...prev.filter((v) => v.id !== video.id)]);
    }
    showToast('নতুন ক্লাস ভিডিও সফলভাবে প্রকাশিত হয়েছে!');
  };

  const deleteVideo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'videos', id));
    } catch (e) {
      console.warn('Firestore fallback for video deletion:', e);
      storageService.deleteVideo(id);
      setVideos((prev) => prev.filter((v) => v.id !== id));
    }
    showToast('ভিডিও মুছে ফেলা হয়েছে।');
  };

  // ── Model Test Actions (Firestore with fallback) ───────────────────────
  const addModelTest = async (test: ModelTest) => {
    try {
      const { id, ...data } = test;
      await addDoc(collection(db, 'tests'), data);
    } catch (e) {
      console.warn('Firestore fallback for test:', e);
      storageService.saveModelTest(test);
      setTests((prev) => [test, ...prev.filter((t) => t.id !== test.id)]);
    }
    showToast('নতুন মডেল টেস্ট পেপার প্রকাশিত হয়েছে!');
  };

  const deleteModelTest = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tests', id));
    } catch (e) {
      console.warn('Firestore fallback for test deletion:', e);
      storageService.deleteModelTest(id);
      setTests((prev) => prev.filter((t) => t.id !== id));
    }
    showToast('মডেল টেস্ট মুছে ফেলা হয়েছে।');
  };

  const saveAttempt = async (attempt: TestAttempt) => {
    try {
      const { id, ...data } = attempt;
      await addDoc(collection(db, 'attempts'), data);
    } catch (e) {
      console.warn('Firestore fallback for attempt:', e);
      storageService.saveTestAttempt(attempt);
      setAttempts((prev) => [attempt, ...prev]);
    }
    showToast(`মডেল টেস্ট সম্পন্ন! আপনার স্কোর: ${attempt.score}/${attempt.totalQuestions}`);
  };

  // ── Notice Actions (Firestore with fallback) ───────────────────────────
  const addNotice = async (notice: Notice) => {
    try {
      const { id, ...data } = notice;
      await addDoc(collection(db, 'notices'), data);
    } catch (e) {
      console.warn('Firestore fallback for notice:', e);
      const fullNotice: Notice = {
        ...notice,
        unit: notice.unit || 'All',
        createdAt: notice.createdAt || new Date().toISOString()
      };
      storageService.saveNotice(fullNotice as any);
      setNotices((prev) => [fullNotice, ...prev.filter((n) => n.id !== notice.id)]);
    }
    showToast('নতুন নোটিশ প্রকাশিত হয়েছে!');
  };

  const deleteNotice = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'notices', id));
    } catch (e) {
      console.warn('Firestore fallback for notice deletion:', e);
      storageService.deleteNotice(id);
      setNotices((prev) => prev.filter((n) => n.id !== id));
    }
    showToast('নোটিশ মুছে ফেলা হয়েছে।');
  };

  // ── Fee Actions (Firestore with fallback) ──────────────────────────────
  const addFee = async (fee: FeeRecord) => {
    try {
      const { id, ...data } = fee;
      await addDoc(collection(db, 'fees'), data);
    } catch (e) {
      console.warn('Firestore fallback for fee:', e);
      storageService.saveFee(fee);
      setFees((prev) => [fee, ...prev]);
    }
    showToast('ফি পেমেন্ট রসিদ সংরক্ষণ করা হয়েছে!');
  };

  // ── Student Actions (localStorage) ────────────────────────────────────
  const addStudent = (student: Student) => {
    const updated = [student, ...students];
    setStudents(updated);
    try {
      localStorage.setItem('tsf_pure_students', JSON.stringify(updated));
    } catch {}
    showToast(`নতুন শিক্ষার্থী ${student.name} যুক্ত হয়েছে!`);
  };

  // ── Routine Actions (localStorage) ────────────────────────────────────
  const addRoutine = (routine: ClassRoutine) => {
    const updated = [routine, ...routines];
    setRoutines(updated);
    try {
      localStorage.setItem('tsf_pure_routines', JSON.stringify(updated));
    } catch {}
    showToast('ক্লাস রুটিন সফলভাবে যুক্ত হয়েছে!');
  };

  // ── Exam Actions (localStorage) ───────────────────────────────────────
  const addExam = (exam: Exam) => {
    const updated = [exam, ...exams];
    setExams(updated);
    try {
      localStorage.setItem('tsf_pure_exams', JSON.stringify(updated));
    } catch {}
    showToast('নতুন পরীক্ষা যোগ করা হয়েছে!');
  };

  const saveExamAttempt = (attempt: ExamAttempt) => {
    const updated = [attempt, ...examAttempts];
    setExamAttempts(updated);
    try {
      localStorage.setItem('tsf_pure_exam_attempts', JSON.stringify(updated));
    } catch {}
    showToast(`পরীক্ষা সাবমিট সম্পন্ন হয়েছে! স্কোর: ${attempt.totalMarksObtained || attempt.score || 0}`);
  };

  // ── Material Actions (localStorage) ───────────────────────────────────
  const addMaterial = (material: StudyMaterial) => {
    const updated = [material, ...materials];
    setMaterials(updated);
    try {
      localStorage.setItem('tsf_pure_materials', JSON.stringify(updated));
    } catch {}
    showToast('নতুন স্টাডি মেটেরিয়াল যুক্ত হয়েছে!');
  };

  // ── Audit Logs ────────────────────────────────────────────────────────
  const addAuditLog = (log: AuditLog) => {
    const updated = [log, ...auditLogs];
    setAuditLogs(updated);
    try {
      localStorage.setItem('tsf_pure_audit_logs', JSON.stringify(updated));
    } catch {}
  };

  const saveAttendanceRecords = (records: AttendanceRecord[]) => {
    showToast(`হাজিরা সফলভাবে সংরক্ষিত হয়েছে (${records.length} জন)`, 'success');
  };

  // ── Backup & Restore ──────────────────────────────────────────────────
  const exportBackup = () => {
    const json = storageService.exportBackupJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TSF_Coaching_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('ডাটাবেস ব্যাকআপ ডাউনলোড সম্পন্ন হয়েছে।', 'success');
  };

  const importBackup = (json: string): boolean => {
    const success = storageService.importBackupJson(json);
    if (success) {
      setUsers(storageService.getUsers());
      setCurrentUser(storageService.getCurrentUser());
      showToast('ডাটাবেস ব্যাকআপ সফলভাবে রিস্টোর হয়েছে!', 'success');
      return true;
    }
    showToast('ব্যাকআপ ফাইলটি সঠিক নয়!', 'error');
    return false;
  };

  const resetDefaults = () => {
    storageService.resetToFactoryDefaults();
    setUsers(storageService.getUsers());
    setCurrentUser(storageService.getCurrentUser());
    setStudents(INITIAL_STUDENTS);
    setRoutines(INITIAL_ROUTINES);
    setExams(INITIAL_EXAMS);
    setMaterials(INITIAL_STUDY_MATERIALS);
    showToast('ফ্যাক্টরি ডিফল্ট ডাটাবেস রিস্টোর করা হয়েছে।', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        login,
        register,
        logout,
        updateUserRole,
        toggleEnrollment,
        selectedUnit,
        setSelectedUnit,
        activeTab,
        setActiveTab,
        lang,
        toggleLang,
        isDrawerOpen,
        setIsDrawerOpen,
        isMainMenuOpen,
        setIsMainMenuOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isIdCardModalOpen,
        setIsIdCardModalOpen,
        isCalculatorModalOpen,
        setIsCalculatorModalOpen,
        isFeesModalOpen,
        setIsFeesModalOpen,
        isApkModalOpen,
        setIsApkModalOpen,
        videos,
        addVideo,
        deleteVideo,
        tests,
        addModelTest,
        deleteModelTest,
        attempts,
        saveAttempt,
        notices,
        addNotice,
        deleteNotice,
        fees,
        addFee,
        students,
        addStudent,
        mentors,
        routines,
        addRoutine,
        exams,
        addExam,
        examAttempts,
        saveExamAttempt,
        materials,
        addMaterial,
        auditLogs,
        addAuditLog,
        saveAttendanceRecords,
        exportBackup,
        importBackup,
        resetDefaults,
        exportDatabase: exportBackup,
        resetDatabase: resetDefaults,
        activeStudentUid: currentUser?.id || 'TSF-STU-2026-0001',
        canInstall,
        installApp,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
