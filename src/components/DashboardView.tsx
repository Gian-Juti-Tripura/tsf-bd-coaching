import React, { useState, useEffect } from 'react';
import {
  Student,
  Mentor,
  ClassRoutine,
  Exam,
  Notice,
  UserRole,
  APK_DOWNLOAD_URL
} from '../types';
import { SUPER_ADMIN_ACCOUNT } from '../data/mockData';
import {
  Users,
  GraduationCap,
  Calendar,
  FileCheck,
  TrendingUp,
  Award,
  Bell,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Sparkles,
  BookOpen,
  Download,
  Clock,
  IdCard,
  Calculator,
  Receipt,
  Database,
  RefreshCw,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface DashboardViewProps {
  students: Student[];
  mentors: Mentor[];
  routines: ClassRoutine[];
  exams: Exam[];
  notices: Notice[];
  currentRole: UserRole;
  onNavigate: (tab: string) => void;
  onOpenExportModal: () => void;
  onOpenProfileModal: () => void;
  onOpenIdCardModal?: () => void;
  onOpenExamCreator?: () => void;
  lang: 'bn' | 'en';
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  students,
  mentors,
  routines,
  exams,
  notices,
  currentRole,
  onNavigate,
  onOpenExportModal,
  onOpenProfileModal,
  onOpenIdCardModal,
  onOpenExamCreator,
  lang
}) => {
  const { fees, exportDatabase, resetDatabase, activeStudentUid } = useApp();
  const activeStudent = students.find((s) => s.studentUid === activeStudentUid) || students[0];

  // Admission Exam Countdown calculations
  const [countdown, setCountdown] = useState({
    duDays: 48,
    medicalDays: 32,
    nursingDays: 65
  });

  const avgAttendance = 94;
  const totalFeesCollected = fees.reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="space-y-6">
      {/* Hero Banner with Role Badge */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-800/60 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                Session 2026–27
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-sky-200 border border-white/20">
                ঐক্য • শিক্ষা • প্রগতি
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {currentRole === 'student' ? 'Student Portal' : currentRole === 'mentor' ? 'Faculty Portal' : 'Admin Control Tower'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {lang === 'bn'
                ? 'টিএসএফ.বিডি ভর্তি কোচিং প্ল্যাটফর্ম'
                : 'TSF.BD Admission Coaching Platform'}
            </h1>

            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
              {lang === 'bn'
                ? 'ঢাকা বিশ্ববিদ্যালয়, মেডিকেল (MBBS/BDS), বুয়েট ও নার্সিং ভর্তি প্রস্তুতি। লাইভ ক্লাস, মডেল টেস্ট ও পূর্ণাঙ্গ ফলাফল।'
                : 'Bangladesh University & Nursing Admission Coaching Program. Live Classes, Exam Engine & Verified Result Ledger.'}
            </p>

            {/* Quick Status / Profile Badge */}
            <div className="pt-2 flex items-center gap-3 flex-wrap">
              {currentRole === 'student' ? (
                <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-2 text-xs">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>
                    Student: <strong>{activeStudent?.name}</strong>
                  </span>
                  <span className="font-mono text-[11px] text-sky-300">({activeStudent?.studentUid})</span>
                </div>
              ) : (
                <div
                  onClick={onOpenProfileModal}
                  className="cursor-pointer bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-2 text-xs"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>
                    Admin: <strong>{SUPER_ADMIN_ACCOUNT.name}</strong>
                  </span>
                  <span className="font-mono text-[11px] text-sky-300">({SUPER_ADMIN_ACCOUNT.uid.slice(0, 10)}...)</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions (Direct Offline APK) */}
          <div className="flex flex-col gap-2.5 shrink-0">
            <a
              href={APK_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              download="TSF_BD_Coaching_2026.apk"
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-xs sm:text-sm border border-amber-300 cursor-pointer"
            >
              <Download className="w-5 h-5 text-slate-950" />
              <span>
                {lang === 'bn' ? 'অফলাইন APK ডাউনলোড (২.০ MB)' : 'Download Offline APK (2.0 MB)'}
              </span>
            </a>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-blue-200 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>org.tsfbd.coaching • v2.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Admission Countdown Strip */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-200 p-4 rounded-3xl grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex items-center gap-3 bg-white/80 p-3 rounded-2xl border border-amber-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm shrink-0">
            {countdown.medicalDays}d
          </div>
          <div className="space-y-0.5 min-w-0">
            <span className="text-[11px] font-bold text-slate-900 block truncate">Medical (MBBS) Admission</span>
            <span className="text-[10px] text-amber-700 font-semibold block">Countdown to Final Exam</span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/80 p-3 rounded-2xl border border-blue-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0">
            {countdown.duDays}d
          </div>
          <div className="space-y-0.5 min-w-0">
            <span className="text-[11px] font-bold text-slate-900 block truncate">Dhaka University (DU Ka/Kha)</span>
            <span className="text-[10px] text-blue-700 font-semibold block">Countdown to Final Exam</span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/80 p-3 rounded-2xl border border-emerald-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shrink-0">
            {countdown.nursingDays}d
          </div>
          <div className="space-y-0.5 min-w-0">
            <span className="text-[11px] font-bold text-slate-900 block truncate">Nursing & Midwifery Admission</span>
            <span className="text-[10px] text-emerald-700 font-semibold block">B.Sc & Diploma Test</span>
          </div>
        </div>
      </div>

      {/* Role-Specific Quick Action Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {currentRole === 'student' ? (
          <>
            <button
              onClick={() => onOpenIdCardModal && onOpenIdCardModal()}
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left flex flex-col justify-between gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <IdCard className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">Smart ID & Admit Card</span>
                <span className="text-[10px] text-slate-500">View & print digital card</span>
              </div>
            </button>

            <button
              onClick={() => onNavigate('calculator')}
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left flex flex-col justify-between gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">Admission Calculator</span>
                <span className="text-[10px] text-slate-500">Calculate DU/Medical merit</span>
              </div>
            </button>

            <button
              onClick={() => onNavigate('exams')}
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left flex flex-col justify-between gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">Take Online Exam</span>
                <span className="text-[10px] text-slate-500">Timed MCQ CBT simulator</span>
              </div>
            </button>

            <button
              onClick={() => onNavigate('routine')}
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left flex flex-col justify-between gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">Class Routine</span>
                <span className="text-[10px] text-slate-500">Live Meet & Room links</span>
              </div>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onNavigate('attendance')}
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left flex flex-col justify-between gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">1-Click Attendance</span>
                <span className="text-[10px] text-slate-500">Mark batch attendance</span>
              </div>
            </button>

            <button
              onClick={() => (onOpenExamCreator ? onOpenExamCreator() : onNavigate('exams'))}
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left flex flex-col justify-between gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">Exam Creator Studio</span>
                <span className="text-[10px] text-slate-500">Add custom MCQ questions</span>
              </div>
            </button>

            <button
              onClick={() => onNavigate('fees')}
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left flex flex-col justify-between gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">Fee Collection Ledger</span>
                <span className="text-[10px] text-slate-500">Record BDT & print receipt</span>
              </div>
            </button>

            <button
              onClick={exportDatabase}
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left flex flex-col justify-between gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">Backup Database</span>
                <span className="text-[10px] text-slate-500">Export JSON snapshot</span>
              </div>
            </button>
          </>
        )}
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div
          onClick={() => onNavigate('students')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Students</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{students.length}</span>
            <span className="text-[11px] font-bold text-emerald-600">+100% Verified</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">A, B, C, D & Nursing Units</span>
        </div>

        {/* Mentors */}
        <div
          onClick={() => onNavigate('mentors')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Faculty Mentors</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{mentors.length}</span>
            <span className="text-[11px] font-bold text-purple-600">DU / BUET / DMC</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Specialized subject leads</span>
        </div>

        {/* Live Model Tests */}
        <div
          onClick={() => onNavigate('exams')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Live Model Tests</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{exams.length}</span>
            <span className="text-[11px] font-bold text-amber-600">Active CBT</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">With negative marking (-0.25)</span>
        </div>

        {/* Average Attendance or Fee Collection */}
        <div
          onClick={() => onNavigate('attendance')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Avg Attendance</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{avgAttendance}%</span>
            <span className="text-[11px] font-bold text-emerald-600">Excellent</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">৳{totalFeesCollected.toLocaleString()} fees collected</span>
        </div>
      </div>

      {/* Main Two-Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upcoming Classes */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">
                  {lang === 'bn' ? 'আসন্ন ক্লাস ও লেকচার শিডিউল' : 'Upcoming Classes & Routines'}
                </h3>
              </div>
              <button
                onClick={() => onNavigate('routine')}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                {lang === 'bn' ? 'সব রুটিন দেখুন' : 'View All'} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {routines.slice(0, 4).map((rt) => (
                <div
                  key={rt.id}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        {rt.dayOfWeek}
                      </span>
                      <span className="font-bold text-xs text-slate-900">{rt.subject}</span>
                    </div>
                    <div className="text-xs text-slate-600 truncate max-w-sm font-bangla">{rt.topic}</div>
                    <div className="text-[11px] text-slate-400">
                      {rt.mentorName} • {rt.startTime}
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                      rt.isOnline
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {rt.isOnline ? 'Online Meet' : rt.room}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Notices & Quick Links */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base text-slate-900">
                  {lang === 'bn' ? 'জরুরি নোটিশসমূহ' : 'Recent Announcements'}
                </h3>
              </div>
              <button
                onClick={() => onNavigate('notices')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                {lang === 'bn' ? 'সকল নোটিশ' : 'View All'}
              </button>
            </div>

            <div className="space-y-3">
              {notices.slice(0, 3).map((notice) => (
                <div
                  key={notice.id}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-blue-700">{notice.category}</span>
                    <span className="text-slate-400 font-mono">
                      {new Date(notice.publishedAt || notice.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-800 leading-snug font-bangla">
                    {lang === 'bn' && notice.titleBn ? notice.titleBn : notice.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Practice Banner */}
          <div className="bg-gradient-to-br from-indigo-950 to-blue-900 text-white rounded-3xl p-6 shadow-md space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-300" />
              <h3 className="font-bold text-base">All-Bangladesh Model Test</h3>
            </div>
            <p className="text-xs text-blue-200 leading-relaxed font-bangla">
              প্রকৃত ভর্তি পরীক্ষার অনুরূপ ১০০ নম্বরের নেগেটিভ মার্কিং সহ কম্পিউটার-বেজড টেস্ট দিন।
            </p>
            <button
              onClick={() => onNavigate('exams')}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2 active:scale-95"
            >
              <span>{lang === 'bn' ? 'এখনই অনলাইন পরীক্ষা শুরু করুন' : 'Launch Online MCQ Exam'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
