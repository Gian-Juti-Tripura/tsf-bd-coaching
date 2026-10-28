import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopNavbar } from './components/TopNavbar';
import { SideDrawer } from './components/SideDrawer';
import { BottomNavbar } from './components/BottomNavbar';

// 14 Module Views
import { MainMenuView } from './components/MainMenuView';
import { DashboardView } from './components/DashboardView';
import { HomeView } from './components/HomeView';
import { ApkDownloadView } from './components/ApkDownloadView';
import { StudentDirectoryView } from './components/StudentDirectoryView';
import { ClassRoutineView } from './components/ClassRoutineView';
import { AttendanceView } from './components/AttendanceView';
import { ModelTestsView } from './components/ModelTestsView';
import { MeritListView } from './components/MeritListView';
import { NoticesView } from './components/NoticesView';
import { VideosView } from './components/VideosView';
import { StudyMaterialsView } from './components/StudyMaterialsView';
import { AdmissionTrackerView } from './components/AdmissionTrackerView';
import { MentorDirectoryView } from './components/MentorDirectoryView';
import { AuditLogsView } from './components/AuditLogsView';
import { ProfileView } from './components/ProfileView';

// Modals
import { AuthModal } from './components/AuthModal';
import { AuxiliaryModals } from './components/AuxiliaryModals';
import { X, CheckCircle2, AlertTriangle, Info, AlertCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    students,
    addStudent,
    mentors,
    routines,
    addRoutine,
    exams,
    examAttempts,
    materials,
    auditLogs,
    notices,
    lang,
    setIsApkModalOpen,
    setIsIdCardModalOpen,
    toasts,
    dismissToast
  } = useApp();

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Professional Sticky Navbar with 3-bar menu & Small PWA Install button */}
      <TopNavbar />

      {/* 3-Bar Slide-Over Drawer containing all 14 modules & auxiliary tools */}
      <SideDrawer />

      {/* Main Content Area - Renders the selected module */}
      <main className="flex-1 pb-24 sm:pb-20">
        {/* 1. প্রধান মেনু */}
        {activeTab === 'menu' && <MainMenuView />}

        {/* 2. হোম ও ড্যাশবোর্ড */}
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-4">
            <DashboardView
              students={students}
              mentors={mentors}
              routines={routines}
              exams={exams}
              notices={notices}
              currentRole={currentUser?.role || 'student'}
              onNavigate={(t) => setActiveTab(t as any)}
              onOpenExportModal={() => setIsApkModalOpen(true)}
              onOpenProfileModal={() => setActiveTab('profile')}
              onOpenIdCardModal={() => setIsIdCardModalOpen(true)}
              lang={lang}
            />
          </div>
        )}

        {/* 3. APK ডাউনলোড */}
        {activeTab === 'apk' && (
          <div className="max-w-5xl mx-auto px-3 sm:px-6 pt-4">
            <ApkDownloadView lang={lang} />
          </div>
        )}

        {/* 4. শিক্ষার্থীবৃন্দ */}
        {activeTab === 'students' && (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-4">
            <StudentDirectoryView
              students={students}
              onAddStudent={addStudent}
              lang={lang}
            />
          </div>
        )}

        {/* 5. ক্লাস রুটিন */}
        {activeTab === 'routine' && (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-4">
            <ClassRoutineView
              routines={routines}
              onAddRoutine={addRoutine}
              lang={lang}
            />
          </div>
        )}

        {/* 6. উপস্থিতি */}
        {activeTab === 'attendance' && (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-4">
            <AttendanceView students={students} lang={lang} />
          </div>
        )}

        {/* 7. পরীক্ষা ও টেস্ট */}
        {activeTab === 'tests' && <ModelTestsView />}

        {/* 8. ফলাফল ও মেধা তালিকা */}
        {activeTab === 'merit' && (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-4">
            <MeritListView
              attempts={examAttempts}
              exams={exams}
              lang={lang}
            />
          </div>
        )}

        {/* 9. নোটিশ বোর্ড */}
        {activeTab === 'notices' && <NoticesView />}

        {/* 10. লাইভ ক্লাস ও ভিডিও */}
        {activeTab === 'videos' && <VideosView />}

        {/* 11. স্টাডি মেটেরিয়ালস */}
        {activeTab === 'materials' && (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-4">
            <StudyMaterialsView materials={materials} lang={lang} />
          </div>
        )}

        {/* 12. প্রস্তুতি ট্র্যাকার */}
        {activeTab === 'tracker' && (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-4">
            <AdmissionTrackerView lang={lang} />
          </div>
        )}

        {/* 13. মেন্টর ও শিক্ষক */}
        {activeTab === 'mentors' && (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-4">
            <MentorDirectoryView mentors={mentors} lang={lang} />
          </div>
        )}

        {/* 14. অডিট লগ ও নিরাপত্তা */}
        {activeTab === 'audit' && (
          <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-4">
            <AuditLogsView logs={auditLogs} lang={lang} />
          </div>
        )}

        {/* প্রোফাইল ও ইউজার রোল ম্যানেজমেন্ট */}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Bottom Sticky Mobile/Desktop Navigation Bar with all 14 modules */}
      <BottomNavbar />

      {/* Modals */}
      <AuthModal />
      <AuxiliaryModals />

      {/* Toast Notification Container */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => {
          const icon =
            toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : toast.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-blue-500 shrink-0" />
            );

          return (
            <div
              key={toast.id}
              className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-800 text-xs font-semibold animate-in slide-in-from-top-2 duration-200"
            >
              <div className="flex items-center gap-2.5">
                {icon}
                <span className="leading-snug">{toast.message}</span>
              </div>
              <button
                onClick={() => dismissToast(toast.id)}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
