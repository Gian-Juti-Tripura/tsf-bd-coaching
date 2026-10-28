import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UnitType } from '../types';
import {
  X,
  Mail,
  KeyRound,
  User,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { TSFLogo } from './TSFLogo';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    login,
    register,
    showToast
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  // Register fields
  const [name, setName] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<UnitType>('Science');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !pin) {
      showToast('অনুগ্রহ করে জিমেইল ও ৪-সংখ্যার পিন প্রদান করুন', 'warning');
      return;
    }

    if (pin.length !== 4 || isNaN(Number(pin))) {
      showToast('পিন অবশ্যই ৪-সংখ্যার সংখ্যাসূচক (numeric) হতে হবে', 'warning');
      return;
    }

    if (mode === 'login') {
      const success = login(email, pin);
      if (success) {
        setIsAuthModalOpen(false);
      }
    } else {
      if (!name.trim()) {
        showToast('অনুগ্রহ করে আপনার সম্পূর্ণ নাম লিখুন', 'warning');
        return;
      }
      register(name, email, pin, selectedUnit);
      setIsAuthModalOpen(false);
    }
  };

  const handleQuickDemo = (demoEmail: string, demoPin: string) => {
    setEmail(demoEmail);
    setPin(demoPin);
    login(demoEmail, demoPin);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="p-5 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-white rounded-xl hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <TSFLogo size={42} showText={false} />
            <div>
              <h2 className="text-base font-extrabold tracking-tight">TSF Coaching Hub</h2>
              <span className="text-[11px] text-blue-300 block font-bangla">
                ঐক্য • শিক্ষা • প্রগতি | এডমিশন ২০২৬
              </span>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-slate-800/80 p-1 rounded-2xl border border-slate-700/80 mt-4 text-xs font-bold">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-1.5 rounded-xl transition-all ${
                mode === 'login' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              লগইন (Login)
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-1.5 rounded-xl transition-all ${
                mode === 'register' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              নতুন রেজিস্ট্রেশন (Register)
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  শিক্ষার্থীর সম্পূর্ণ নাম *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="যেমন: রহিম ত্রিপুরা"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                জিমেইল এড্রেস (Gmail Address) *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  সহজ ৪-সংখ্যার গোপন পিন (4-Digit PIN) *
                </label>
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                >
                  {showPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPin ? 'লুকান' : 'দেখান'}</span>
                </button>
              </div>

              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPin ? 'text' : 'password'}
                  required
                  maxLength={4}
                  pattern="[0-9]{4}"
                  inputMode="numeric"
                  placeholder="যেমন: 1234 বা 2026"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                যে কোনো ৪টি সংখ্যা (যেমন: 1234 বা 2026) দিন
              </span>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  প্রাথমিক ভর্তি ইউনিট *
                </label>
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value as UnitType)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-white"
                >
                  <option value="Science">Science (বিজ্ঞান শাখা)</option>
                  <option value="Commerce">Commerce (ব্যবসায় শিক্ষা)</option>
                  <option value="Arts">Arts (মানবিক শাখা)</option>
                  <option value="Nursing">Nursing (নার্সিং প্রস্তুতি)</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{mode === 'login' ? 'লগইন সম্পন্ন করুন' : 'অ্যাকাউন্ট খুলুন'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Logins Section */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>১-ক্লিকে ডেমো লগইন টেস্ট করুন:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemo('dhamayantripura13@gmail.com', '2026')}
                className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100/70 text-left transition-colors cursor-pointer"
              >
                <div className="font-extrabold text-amber-900 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Dhamayan (Super Admin)</span>
                </div>
                <div className="text-[10px] text-amber-700 font-mono">PIN: 2026</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('gianjuti.csecu@gmail.com', '2026')}
                className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100/70 text-left transition-colors cursor-pointer"
              >
                <div className="font-extrabold text-amber-900 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Gian Juti (Super Admin)</span>
                </div>
                <div className="text-[10px] text-amber-700 font-mono">PIN: 2026</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('teacher.science@gmail.com', '1234')}
                className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100/70 text-left transition-colors cursor-pointer"
              >
                <div className="font-extrabold text-purple-900 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                  <span>Prof. Animesh (Teacher)</span>
                </div>
                <div className="text-[10px] text-purple-700 font-mono">PIN: 1234</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('student.rahim@gmail.com', '1234')}
                className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100/70 text-left transition-colors cursor-pointer"
              >
                <div className="font-extrabold text-blue-900 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Rahim Tripura (Student)</span>
                </div>
                <div className="text-[10px] text-blue-700 font-mono">PIN: 1234</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
