import React from 'react';
import { useApp } from '../context/AppContext';
import { UnitType } from '../types';
import {
  GraduationCap,
  PlaySquare,
  FileCheck,
  Bell,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Award,
  Clock,
  Download,
  IdCard,
  Calculator,
  UserCheck,
  Layers,
  ChevronRight
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    currentUser,
    selectedUnit,
    setSelectedUnit,
    setActiveTab,
    videos,
    tests,
    notices,
    toggleEnrollment,
    setIsAuthModalOpen,
    setIsApkModalOpen,
    setIsIdCardModalOpen,
    setIsCalculatorModalOpen
  } = useApp();

  const allUnits: { id: UnitType; name: string; desc: string; color: string; badgeColor: string }[] = [
    {
      id: 'Science',
      name: 'বিজ্ঞান ইউনিট (Science)',
      desc: 'ঢাকা বিশ্ববিদ্যালয় A ইউনিট, বুয়েট, চুয়েট, কুয়েট ও রাবি সমন্বিত প্রস্তুতি। পদার্থ, রসায়ন ও গণিত।',
      color: 'from-blue-600 to-cyan-600',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      id: 'Commerce',
      name: 'ব্যবসায় শিক্ষা ইউনিট (Commerce)',
      desc: 'ঢাবি C ইউনিট ও গুচ্ছ ব্যবসায় শিক্ষা। হিসাববিজ্ঞান, ব্যবসায় সংগঠন, ফাইন্যান্স ও বিপণন।',
      color: 'from-emerald-600 to-teal-600',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    },
    {
      id: 'Arts',
      name: 'মানবিক ইউনিট (Arts / B Unit)',
      desc: 'ঢাবি B ইউনিট, জাবি, চবি ও গুচ্ছ মানবিক। বাংলা, ইংরেজি, সাধারণ জ্ঞান ও আইসিটি স্পেশাল কোর্স।',
      color: 'from-amber-600 to-orange-600',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
    },
    {
      id: 'Nursing',
      name: 'নার্সিং ভর্তি প্রস্তুতি (B.Sc & Diploma)',
      desc: 'সরকারি নার্সিং কলেজ ভর্তি পরীক্ষা ২০২৬। বায়োলজি, সাধারণ বিজ্ঞান, সাধারণ জ্ঞান ও ইংরেজি।',
      color: 'from-purple-600 to-pink-600',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
    }
  ];

  // Filter based on selectedUnit if not All
  const filteredVideos = selectedUnit === 'All'
    ? videos.slice(0, 3)
    : videos.filter(v => v.unit === selectedUnit).slice(0, 3);

  const filteredTests = selectedUnit === 'All'
    ? tests.slice(0, 3)
    : tests.filter(t => t.unit === selectedUnit).slice(0, 3);

  const filteredNotices = selectedUnit === 'All'
    ? notices.slice(0, 4)
    : notices.filter(n => n.unit === 'All' || n.unit === selectedUnit).slice(0, 4);

  return (
    <div className="space-y-5 pb-6 max-w-7xl mx-auto px-3 sm:px-6 pt-3 animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white p-4 sm:p-8 shadow-xl border border-blue-900/50">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[11px] sm:text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="truncate">ত্রিপুরা স্টুডেন্টস ফোরাম (TSF) এডমিশন কোচিং ২০২৬</span>
          </div>

          <h1 className="text-xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            উচ্চশিক্ষা স্বপ্নজয়ের <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-400">বিশ্বস্ত সঙ্গী</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            বিজ্ঞান, ব্যবসায় শিক্ষা, মানবিক ও নার্সিং ইউনিটের সম্পূর্ণ লাইভ/রেকর্ডেড ক্লাস, বিষয়ভিত্তিক অধ্যায়ভিত্তিক মডেল টেস্ট এবং বিশ্ববিদ্যালয় ভর্তির পূর্ণাঙ্গ দিকনির্দেশনা।
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            {currentUser ? (
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>স্বাগতম, {currentUser.name}! ({currentUser.role === 'super_admin' ? 'সুপার এডমিন' : currentUser.role === 'teacher' ? 'শিক্ষক' : 'শিক্ষার্থী'})</span>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-2xl text-xs sm:text-sm shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>শিক্ষার্থী / শিক্ষক লগইন করুন</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('tests')}
              className="bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-semibold px-4 py-2.5 rounded-2xl text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FileCheck className="w-4 h-4 text-blue-400" />
              <span>মডেল টেস্টে অংশ নিন</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="text-xl sm:text-2xl font-black text-blue-400">{videos.length}+</div>
            <div className="text-[11px] text-slate-400">কোর্স ভিডিও লেকচার</div>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="text-xl sm:text-2xl font-black text-emerald-400">{tests.length} টি</div>
            <div className="text-[11px] text-slate-400">লাইভ ও আর্কাইভ টেস্ট</div>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="text-xl sm:text-2xl font-black text-amber-400">৪ টি ইউনিট</div>
            <div className="text-[11px] text-slate-400">বিজ্ঞান • বাণিজ্য • কলা • নার্সিং</div>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="text-xl sm:text-2xl font-black text-purple-400">১০০% ফ্রি</div>
            <div className="text-[11px] text-slate-400">সকল প্রান্তিক শিক্ষার্থীদের জন্য</div>
          </div>
        </div>
      </div>

      {/* 4 Unit Enrollment Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>ভর্তি প্রস্তুতি ইউনিটসমূহ</span>
            </h2>
            <p className="text-xs text-slate-500">আপনার পছন্দের ইউনিটে ক্লিক করে ফিল্টার করুন অথবা এনরোল করুন</p>
          </div>
          {selectedUnit !== 'All' && (
            <button
              onClick={() => setSelectedUnit('All')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 transition-colors cursor-pointer"
            >
              সব ইউনিট দেখুন
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allUnits.map((u) => {
            const isSelected = selectedUnit === u.id;
            const isEnrolled = currentUser?.enrolledUnits?.includes(u.id);

            return (
              <div
                key={u.id}
                className={`relative rounded-3xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-50/50 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${u.badgeColor}`}>
                      {u.id}
                    </span>
                    {isEnrolled && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        এনরোল্ড
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{u.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{u.desc}</p>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setSelectedUnit(u.id);
                      setActiveTab('videos');
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>ক্লাস দেখুন</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {currentUser ? (
                    <button
                      onClick={() => toggleEnrollment(u.id)}
                      className={`text-xs px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                        isEnrolled
                          ? 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600'
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                      }`}
                    >
                      {isEnrolled ? 'বাতিল' : '+ এনরোল'}
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="text-xs px-2.5 py-1 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                    >
                      লগইন
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Action Shortcuts Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setIsApkModalOpen(true)}
          className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 hover:border-emerald-300 hover:shadow-sm text-left transition-all active:scale-95 cursor-pointer flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-slate-900">APK ডাউনলোড</div>
            <div className="text-[10px] text-emerald-700 font-medium">অফলাইন অ্যান্ড্রয়েড অ্যাপ</div>
          </div>
        </button>

        <button
          onClick={() => setIsIdCardModalOpen(true)}
          className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 hover:border-blue-300 hover:shadow-sm text-left transition-all active:scale-95 cursor-pointer flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <IdCard className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-slate-900">ডিজিটাল আইডি কার্ড</div>
            <div className="text-[10px] text-blue-700 font-medium">স্মার্ট স্টুডেন্ট কার্ড</div>
          </div>
        </button>

        <button
          onClick={() => setIsCalculatorModalOpen(true)}
          className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 hover:border-amber-300 hover:shadow-sm text-left transition-all active:scale-95 cursor-pointer flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-slate-900">ভর্তি ক্যালকুলেটর</div>
            <div className="text-[10px] text-amber-700 font-medium">GPA ও স্কোর হিসাব</div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/80 hover:border-purple-300 hover:shadow-sm text-left transition-all active:scale-95 cursor-pointer flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-slate-900">স্কোর ও রিপোর্ট</div>
            <div className="text-[10px] text-purple-700 font-medium">অংশগ্রহণ ও অগ্রগতি</div>
          </div>
        </button>
      </div>

      {/* Main Grid: Course Videos + Model Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Course Videos */}
        <section className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <PlaySquare className="w-4 h-4 text-rose-500" />
              <span>সাম্প্রতিক ভিডিও ক্লাস</span>
            </h2>
            <button
              onClick={() => setActiveTab('videos')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>সব দেখুন ({videos.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveTab('videos')}
                className="group p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/70 hover:border-blue-200 transition-all flex items-start gap-3 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <PlaySquare className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                      {video.unit}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {video.duration}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate">
                      • {video.subject}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {video.teacherName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming / Active Model Tests */}
        <section className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>লাইভ ও প্র্যাকটিস মডেল টেস্ট</span>
            </h2>
            <button
              onClick={() => setActiveTab('tests')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>সব টেস্ট ({tests.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                onClick={() => setActiveTab('tests')}
                className="group p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/70 hover:border-emerald-200 transition-all flex items-start gap-3 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      {test.unit}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {test.questions.length} টি MCQ
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {test.durationMinutes} মি.
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {test.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    মোট নম্বর: {test.totalMarks} | নেগেটিভ: {test.negativeMarking}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Notice Board Preview */}
      <section className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" />
            <span>গুরুত্বপূর্ণ নোটিশ ও নির্দেশনা</span>
          </h2>
          <button
            onClick={() => setActiveTab('notices')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>সকল নোটিশ ({notices.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => setActiveTab('notices')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                notice.isUrgent
                  ? 'bg-rose-50/50 border-rose-200 hover:border-rose-300'
                  : 'bg-slate-50 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  notice.isUrgent
                    ? 'bg-rose-500 text-white'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {notice.isUrgent ? 'জরুরি নোটিশ' : notice.unit}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">{notice.createdAt}</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                {notice.title}
              </h4>
              <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                {notice.content}
              </p>
              <div className="mt-2 text-[10px] text-slate-400 font-medium">
                প্রেরক: {notice.authorName} ({notice.authorRole})
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
