import React from 'react';
import { useApp, ActiveTabType } from '../context/AppContext';
import {
  Menu,
  Home,
  LayoutDashboard,
  Download,
  Users,
  Calendar,
  CheckSquare,
  FileCheck,
  Trophy,
  Bell,
  PlaySquare,
  BookOpen,
  Target,
  GraduationCap,
  ShieldCheck,
  User,
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { ALL_MENU_ITEMS } from './MainMenuView';

export const BottomNavbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    notices,
    isMainMenuOpen,
    setIsMainMenuOpen
  } = useApp();

  const urgentNoticeCount = notices.filter((n) => n.isUrgent).length;

  // The 14 official coaching modules
  const modulesList: { id: ActiveTabType; label: string; icon: React.ElementType; badge?: string | number | null }[] = [
    { id: 'home', label: 'হোম পেজ', icon: Home },
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
    { id: 'apk', label: 'APK ডাউনলোড', icon: Download, badge: 'APK' },
    { id: 'videos', label: 'লাইভ ক্লাস', icon: PlaySquare },
    { id: 'tests', label: 'পরীক্ষা ও টেস্ট', icon: FileCheck },
    { id: 'routine', label: 'ক্লাস রুটিন', icon: Calendar },
    { id: 'materials', label: 'স্টাডি মেটেরিয়ালস', icon: BookOpen },
    { id: 'students', label: 'শিক্ষার্থীবৃন্দ', icon: Users },
    { id: 'attendance', label: 'উপস্থিতি', icon: CheckSquare },
    { id: 'merit', label: 'ফলাফল ও মেধা তালিকা', icon: Trophy },
    { id: 'tracker', label: 'প্রস্তুতি ট্র্যাকার', icon: Target },
    { id: 'notices', label: 'নোটিশ বোর্ড', icon: Bell, badge: urgentNoticeCount > 0 ? urgentNoticeCount : null },
    { id: 'mentors', label: 'মেন্টর ও শিক্ষক', icon: GraduationCap },
    { id: 'audit', label: 'অডিট লগ ও নিরাপত্তা', icon: ShieldCheck }
  ];

  // Mobile 5 primary bottom tabs
  const mobileTabs = [
    {
      id: 'home' as ActiveTabType,
      label: 'হোম',
      icon: Home,
      isActive: activeTab === 'home' || activeTab === 'dashboard'
    },
    {
      id: 'videos' as ActiveTabType,
      label: 'ক্লাস',
      icon: PlaySquare,
      isActive: activeTab === 'videos'
    },
    {
      id: 'tests' as ActiveTabType,
      label: 'পরীক্ষা',
      icon: FileCheck,
      isActive: activeTab === 'tests'
    },
    {
      id: 'notices' as ActiveTabType,
      label: 'নোটিশ',
      icon: Bell,
      badge: urgentNoticeCount > 0 ? urgentNoticeCount : null,
      isActive: activeTab === 'notices'
    },
    {
      id: 'menu' as ActiveTabType,
      label: 'মেনু',
      icon: Menu,
      badge: '১৪টি',
      isSpecial: true,
      isActive: isMainMenuOpen || activeTab === 'menu'
    }
  ];

  return (
    <>
      {/* 14-Module Bottom Sheet Modal */}
      {isMainMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsMainMenuOpen(false)}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-xl max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Menu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base">প্রধান মেনু (সকল ১৪টি সেবা)</h3>
                  <span className="text-[10px] text-blue-300 block">টিএসএফ কোচিং প্ল্যাটফর্ম ২০২৬</span>
                </div>
              </div>
              <button
                onClick={() => setIsMainMenuOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white rounded-xl hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid of All 14 Modules */}
            <div className="p-4 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[60vh]">
              {modulesList.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMainMenuOpen(false);
                    }}
                    className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer active:scale-95 ${
                      isActive
                        ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm ring-1 ring-blue-600'
                        : 'bg-slate-50 hover:bg-blue-50/50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isActive ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 shadow-xs'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="font-bold text-xs block leading-tight truncate">
                        {item.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50">
              <span className="text-slate-500 text-[11px]">১৪টি মডিউলের যে কোনোটিতে ট্যাপ করুন</span>
              <button
                onClick={() => setIsMainMenuOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-slate-700 text-xs cursor-pointer active:scale-95"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Navigation Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)]">
        {/* Mobile View: High-End 5-Slot Fixed Bottom Bar */}
        <div className="flex md:hidden items-center justify-around h-16 px-1">
          {mobileTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'menu') {
                    setIsMainMenuOpen(true);
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`flex-1 flex flex-col items-center justify-center py-1 relative transition-transform active:scale-90 cursor-pointer ${
                  tab.isActive
                    ? 'text-blue-600 font-black'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className="relative">
                  <div
                    className={`p-1.5 rounded-xl transition-all ${
                      tab.isSpecial
                        ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm'
                        : tab.isActive
                        ? 'bg-blue-100 text-blue-600'
                        : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {tab.badge && (
                    <span className="absolute -top-1 -right-2 px-1 min-w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                      {tab.badge}
                    </span>
                  )}
                </div>

                <span
                  className={`text-[10px] mt-0.5 tracking-tight ${
                    tab.isActive ? 'font-black text-blue-600' : 'font-semibold text-slate-500'
                  }`}
                >
                  {tab.label}
                </span>

                {tab.isActive && !tab.isSpecial && (
                  <span className="w-1 h-1 rounded-full bg-blue-600 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop / Tablet View: Complete 14-Module Navigation Rail */}
        <div className="hidden md:flex max-w-7xl mx-auto px-4 h-16 items-center overflow-x-auto scrollbar-none gap-1">
          {modulesList.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center px-2 py-1 relative transition-all active:scale-95 cursor-pointer shrink-0 rounded-2xl ${
                  isActive
                    ? 'text-blue-600 font-black'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <div className="relative">
                  <div
                    className={`p-1 rounded-xl transition-all ${
                      isActive ? 'bg-blue-100 text-blue-600' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {item.badge && (
                    <span className="absolute -top-1 -right-2 px-1 min-w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>

                <span
                  className={`text-[10px] mt-0.5 tracking-tight truncate max-w-[70px] ${
                    isActive ? 'font-black text-blue-700' : 'font-semibold'
                  }`}
                >
                  {item.label}
                </span>

                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-0.5" />
                )}
              </button>
            );
          })}

          {/* User Profile tab at the end */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center px-2 py-1 relative transition-all active:scale-95 cursor-pointer shrink-0 rounded-2xl ${
              activeTab === 'profile' ? 'text-blue-600 font-black' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <div className={`p-1 rounded-xl ${activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : ''}`}>
              <User className="w-4 h-4" />
            </div>
            <span
              className={`text-[10px] mt-0.5 tracking-tight truncate max-w-[70px] ${
                activeTab === 'profile' ? 'font-black text-blue-700' : 'font-semibold'
              }`}
            >
              {currentUser?.role === 'super_admin' ? 'এডমিন' : currentUser?.role === 'teacher' ? 'শিক্ষক' : 'প্রোফাইল'}
            </span>
            {activeTab === 'profile' && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-0.5" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
