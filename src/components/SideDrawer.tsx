import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Download,
  IdCard,
  Calculator,
  Receipt,
  ShieldCheck,
  Database,
  Upload,
  RefreshCw,
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
  LayoutDashboard,
  ExternalLink,
  Menu,
  ChevronRight
} from 'lucide-react';
import { TSFLogo } from './TSFLogo';
import { ALL_MENU_ITEMS } from './MainMenuView';

export const SideDrawer: React.FC = () => {
  const {
    currentUser,
    isDrawerOpen,
    setIsDrawerOpen,
    setIsIdCardModalOpen,
    setIsCalculatorModalOpen,
    setIsFeesModalOpen,
    setIsApkModalOpen,
    activeTab,
    setActiveTab,
    exportBackup,
    importBackup,
    resetDefaults,
    showToast
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isDrawerOpen) return null;

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importBackup(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200 border-r border-slate-200">
        {/* Top Header */}
        <div className="p-5 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white relative shrink-0">
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <TSFLogo size={42} showText={false} />
            <div>
              <h2 className="text-base font-extrabold tracking-tight">TSF Coaching Hub</h2>
              <span className="text-[11px] text-blue-300 block font-bangla font-semibold">
                ঐক্য • শিক্ষা • প্রগতি
              </span>
            </div>
          </div>

          {/* Creators / Super Admin Card */}
          <div className="mt-4 p-3 rounded-2xl bg-white/10 border border-white/15 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-amber-300 font-extrabold text-[11px] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Super Admin Creators:</span>
            </div>
            <div className="space-y-0.5 font-mono text-[11px] text-slate-200">
              <div className="flex items-center gap-1 truncate">
                <span className="text-blue-300">1.</span> dhamayantripura13@gmail.com
              </div>
              <div className="flex items-center gap-1 truncate">
                <span className="text-blue-300">2.</span> gianjuti.csecu@gmail.com
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items List */}
        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          {/* Main 14 Modules Navigation */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
              <span>প্রধান মেনু (১৪টি মডিউল)</span>
              <span className="text-blue-600 font-mono text-[9px]">All 14 Modules</span>
            </div>

            <button
              onClick={() => {
                setIsDrawerOpen(false);
                setActiveTab('menu');
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-2xl border text-left transition-colors cursor-pointer ${
                activeTab === 'menu'
                  ? 'bg-blue-600 text-white font-bold border-blue-600'
                  : 'bg-blue-50/80 hover:bg-blue-100/80 border-blue-200 text-blue-900 font-extrabold'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Menu className="w-4 h-4 text-blue-600" />
                <span className="text-xs">প্রধান মেনু হাব (সকল সেবা)</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            {ALL_MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setActiveTab(item.id);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'hover:bg-slate-100 text-slate-700 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span className="text-xs truncate">{item.title}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Auxiliary Tools Section */}
          <div className="pt-3 border-t border-slate-100 space-y-1.5">
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-2 py-1">
              অতিরিক্ত টুলস (Auxiliary Tools)
            </div>

            {/* Smart Student ID Card */}
            <button
              onClick={() => {
                setIsDrawerOpen(false);
                setIsIdCardModalOpen(true);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <IdCard className="w-4 h-4 text-blue-600" />
                <span>ডিজিটাল আইডি ও এডমিট কার্ড</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Admission Calculator */}
            <button
              onClick={() => {
                setIsDrawerOpen(false);
                setIsCalculatorModalOpen(true);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Calculator className="w-4 h-4 text-amber-600" />
                <span>ভর্তি জিপিএ ও স্কোর ক্যালকুলেটর</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Tuition Fees Ledger */}
            <button
              onClick={() => {
                setIsDrawerOpen(false);
                setIsFeesModalOpen(true);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Receipt className="w-4 h-4 text-emerald-600" />
                <span>টিউশন ফি ট্র্যাকার ও পেমেন্ট রসিদ</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Database Backup & Restore */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-2 py-1">
              ডাটাবেস ও ব্যাকআপ (Database)
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={exportBackup}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Database className="w-3.5 h-3.5 text-blue-600" />
                <span>JSON ব্যাকআপ</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-600" />
                <span>ডাটা রিস্টোর</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileImport}
                accept=".json"
                className="hidden"
              />
            </div>

            <button
              onClick={() => {
                if (window.confirm('আপনি কি ডাটাবেস সম্পূর্ণ ফ্যাক্টরি ডিফল্টে ফিরিয়ে নিতে চান?')) {
                  resetDefaults();
                }
              }}
              className="w-full p-2 rounded-xl text-[11px] font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>ফ্যাক্টরি ডিফল্ট রিস্টোর করুন</span>
            </button>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[10px] text-slate-400">
          TSF BD Coaching Hub © 2026 • v2.0
        </div>
      </div>
    </div>
  );
};
