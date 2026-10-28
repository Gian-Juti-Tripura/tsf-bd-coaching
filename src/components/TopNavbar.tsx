import React from 'react';
import { useApp } from '../context/AppContext';
import { UnitType } from '../types';
import {
  Menu,
  Download,
  User,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  LogIn,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { TSFLogo } from './TSFLogo';

export const TopNavbar: React.FC = () => {
  const {
    currentUser,
    selectedUnit,
    setSelectedUnit,
    setIsDrawerOpen,
    setIsAuthModalOpen,
    canInstall,
    installApp
  } = useApp();

  const units: (UnitType | 'All')[] = ['All', 'Science', 'Commerce', 'Arts', 'Nursing'];

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: 3-Bar Menu + Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* 3-Bar Hamburger Menu Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors active:scale-95 cursor-pointer"
            title="মেনু খুলুন (Menu)"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo & Coaching Brand */}
          <div className="flex items-center gap-2 select-none">
            <TSFLogo size={36} showText={false} />
            <div className="leading-tight">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white block">
                TSF <span className="text-blue-400">Coaching Hub</span>
              </span>
              <span className="text-[10px] text-blue-300 font-medium hidden sm:block">
                ঐক্য • শিক্ষা • প্রগতি | Session 2026–27
              </span>
            </div>
          </div>
        </div>

        {/* Center: Unit Filter Pills (Desktop & Tablet) */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-2xl border border-slate-700/60">
          {units.map((unit) => {
            const isActive = selectedUnit === unit;
            return (
              <button
                key={unit}
                onClick={() => setSelectedUnit(unit)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {unit === 'All' ? 'সকল ইউনিট' : unit}
              </button>
            );
          })}
        </div>

        {/* Right: Small Single "Install App" Button + User Status */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Small Single PWA Install Button */}
          <button
            onClick={installApp}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black rounded-xl shadow-md transition-all active:scale-95 cursor-pointer border border-emerald-400"
            title="অ্যাপ ইনস্টল করুন (Install PWA App)"
          >
            <Download className="w-3.5 h-3.5 text-slate-950 animate-bounce" />
            <span className="text-[11px] font-bold">ইনস্টল</span>
          </button>

          {/* User Profile / Login Button */}
          {currentUser ? (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              {currentUser.role === 'super_admin' ? (
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              ) : currentUser.role === 'teacher' ? (
                <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <GraduationCap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              )}
              <span className="max-w-[75px] sm:max-w-[120px] truncate text-white text-xs">
                {currentUser.name}
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-700 text-blue-300 font-mono uppercase hidden sm:inline">
                {currentUser.role === 'super_admin' ? 'Super Admin' : currentUser.role}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>লগইন</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
