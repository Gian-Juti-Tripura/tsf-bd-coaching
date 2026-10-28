import React from 'react';
import { TSFLogo } from './TSFLogo';
import { UserRole } from '../types';
import { SUPER_ADMIN_ACCOUNT } from '../data/mockData';
import {
  Globe,
  Smartphone,
  Monitor,
  ShieldCheck,
  User,
  GraduationCap,
  BookOpen,
  ChevronDown,
  Layers,
  Download
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  lang: 'bn' | 'en';
  onToggleLang: () => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  onOpenExportModal: () => void;
  onOpenProfileModal: () => void;
  onNavigateToApk?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onChangeRole,
  lang,
  onToggleLang,
  isMobileFrame,
  onToggleMobileFrame,
  onOpenExportModal,
  onOpenProfileModal,
  onNavigateToApk
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <TSFLogo size={44} showText={true} />
        </div>

        {/* Right Navigation & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Frame Toggle */}
          <button
            onClick={onToggleMobileFrame}
            title={
              isMobileFrame
                ? lang === 'bn' ? 'ওয়েব ড্যাশবোর্ডে ফিরুন' : 'Switch to Full Dashboard'
                : lang === 'bn' ? 'অ্যান্ড্রয়েড মোবাইল ভিউ দেখুন' : 'Switch to Android Phone View'
            }
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isMobileFrame
                ? 'bg-blue-50 text-blue-800 border-blue-300'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-blue-600" />
                <span>{lang === 'bn' ? 'ওয়েব ভিউ' : 'Full Web'}</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-slate-600" />
                <span>{lang === 'bn' ? 'মোবাইল ভিউ' : 'Android View'}</span>
              </>
            )}
          </button>

          {/* Android APK Download Center Button */}
          <button
            onClick={() => {
              if (onNavigateToApk) onNavigateToApk();
              else onOpenExportModal();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-95 border border-emerald-500"
          >
            <Download className="w-3.5 h-3.5 text-white animate-pulse" />
            <span className="hidden sm:inline">
              {lang === 'bn' ? 'APK ডাউনলোড' : 'Download APK'}
            </span>
            <span className="sm:hidden">APK</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors border border-slate-200"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          {/* Role Simulation Switcher */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-blue-900 hover:bg-blue-100 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
              <span className="capitalize hidden sm:inline">
                {currentRole === 'super_admin'
                  ? lang === 'bn' ? 'সুপার এডমিন' : 'Super Admin'
                  : currentRole === 'admin'
                  ? lang === 'bn' ? 'কো-অর্ডিনেটর' : 'Coordinator'
                  : currentRole === 'mentor'
                  ? lang === 'bn' ? 'মেন্টর' : 'Mentor'
                  : lang === 'bn' ? 'শিক্ষার্থী' : 'Student'}
              </span>
              <ChevronDown className="w-3 h-3 text-blue-500" />
            </button>

            <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 hidden group-hover:block animate-in fade-in z-50 text-xs font-semibold">
              <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400">
                {lang === 'bn' ? 'রোল পরিবর্তন করুন' : 'Switch Role'}
              </div>
              <button
                onClick={() => onChangeRole('super_admin')}
                className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 ${
                  currentRole === 'super_admin' ? 'text-blue-700 font-bold bg-blue-50/50' : 'text-slate-700'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                {lang === 'bn' ? 'সুপার এডমিন' : 'Super Admin'}
              </button>
              <button
                onClick={() => onChangeRole('admin')}
                className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 ${
                  currentRole === 'admin' ? 'text-blue-700 font-bold bg-blue-50/50' : 'text-slate-700'
                }`}
              >
                <User className="w-3.5 h-3.5 text-blue-600" />
                {lang === 'bn' ? 'কো-অর্ডিনেটর' : 'Coordinator'}
              </button>
              <button
                onClick={() => onChangeRole('mentor')}
                className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 ${
                  currentRole === 'mentor' ? 'text-blue-700 font-bold bg-blue-50/50' : 'text-slate-700'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                {lang === 'bn' ? 'মেন্টর / শিক্ষক' : 'Mentor / Teacher'}
              </button>
              <button
                onClick={() => onChangeRole('student')}
                className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 flex items-center gap-2 ${
                  currentRole === 'student' ? 'text-blue-700 font-bold bg-blue-50/50' : 'text-slate-700'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                {lang === 'bn' ? 'শিক্ষার্থী' : 'Student Aspirant'}
              </button>
            </div>
          </div>

          {/* Profile Button */}
          <button
            onClick={onOpenProfileModal}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-800 text-white flex items-center justify-center font-bold text-xs shadow-sm hover:ring-2 hover:ring-blue-500/30 transition-all"
            title="Super Admin Profile"
          >
            DT
          </button>
        </div>
      </div>
    </header>
  );
};
