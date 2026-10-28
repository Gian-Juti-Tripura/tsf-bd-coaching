import React from 'react';
import { useApp, ActiveTabType } from '../context/AppContext';
import {
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
  Menu,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export interface MenuItem {
  id: ActiveTabType;
  title: string;
  titleEn: string;
  category: 'core' | 'academic' | 'students' | 'admin';
  icon: React.ElementType;
  badge?: string;
  desc: string;
  color: string;
}

export const ALL_MENU_ITEMS: MenuItem[] = [
  // 1. প্রধান ও সিস্টেম
  {
    id: 'dashboard',
    title: 'ড্যাশবোর্ড',
    titleEn: 'Dashboard Overview',
    category: 'core',
    icon: LayoutDashboard,
    desc: 'ভর্তি কোচিংয়ের সামগ্রিক পরিসংখ্যান, অ্যাক্টিভিটি ও সারসংক্ষেপ',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'apk',
    title: 'APK ডাউনলোড',
    titleEn: 'Download APK',
    category: 'core',
    icon: Download,
    badge: '4.0 MB',
    desc: 'অফলাইন ও অনলাইন ব্যবহারের জন্য অ্যান্ড্রয়েড মোবাইল অ্যাপ',
    color: 'from-emerald-600 to-teal-600'
  },

  // 2. একাডেমিক কার্যক্রম
  {
    id: 'videos',
    title: 'লাইভ ক্লাস ও ভিডিও',
    titleEn: 'Live Classes & Videos',
    category: 'academic',
    icon: PlaySquare,
    desc: 'বিজ্ঞান, বাণিজ্য, মানবিক ও নার্সিং শাখার পূর্ণাঙ্গ ক্লাস লাইব্রেরি',
    color: 'from-rose-600 to-pink-600'
  },
  {
    id: 'tests',
    title: 'পরীক্ষা ও টেস্ট',
    titleEn: 'Exams & Model Tests',
    category: 'academic',
    icon: FileCheck,
    desc: 'সিবিটি অনলাইন মডেল টেস্ট, প্রশ্নব্যাংক ও অটো স্কোরিং',
    color: 'from-emerald-600 to-green-600'
  },
  {
    id: 'routine',
    title: 'ক্লাস রুটিন',
    titleEn: 'Class Routine',
    category: 'academic',
    icon: Calendar,
    desc: 'সাপ্তাহিক ও দৈনিক অফলাইন এবং অনলাইন ক্লাসের সময়সূচি',
    color: 'from-amber-600 to-orange-600'
  },
  {
    id: 'materials',
    title: 'স্টাডি মেটেরিয়ালস',
    titleEn: 'Study Materials',
    category: 'academic',
    icon: BookOpen,
    desc: 'অধ্যায়ভিত্তিক লেকচার শিট, হ্যান্ডনোট ও প্রশ্ন সমাধানের পিডিএফ',
    color: 'from-cyan-600 to-blue-600'
  },

  // 3. শিক্ষার্থী ও মূল্যায়ন
  {
    id: 'students',
    title: 'শিক্ষার্থীবৃন্দ',
    titleEn: 'Student Directory',
    category: 'students',
    icon: Users,
    desc: 'সকল শিক্ষার্থীর তালিকা, ব্যাচ ও স্মার্ট আইডি কার্ড',
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 'attendance',
    title: 'উপস্থিতি',
    titleEn: 'Attendance Tracker',
    category: 'students',
    icon: CheckSquare,
    desc: 'ডিজিটাল হাজিরা ট্র্যাকিং ও ক্লাসে উপস্থিতির পার্সেন্টেজ',
    color: 'from-teal-600 to-emerald-600'
  },
  {
    id: 'merit',
    title: 'ফলাফল ও মেধা তালিকা',
    titleEn: 'Merit List & Results',
    category: 'students',
    icon: Trophy,
    desc: 'মডেল টেস্টের সম্মিলিত মেধা ক্রম, জিপিএ ও র‍্যাঙ্কিং',
    color: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'tracker',
    title: 'প্রস্তুতি ট্র্যাকার',
    titleEn: 'Admission Tracker',
    category: 'students',
    icon: Target,
    desc: 'ঢাবি, রাবি, চবি, বুয়েট ও মেডিকেল ভর্তি লক্ষ্য ও অগ্রগতি',
    color: 'from-rose-600 to-orange-600'
  },

  // 4. প্রশাসন ও শিক্ষক
  {
    id: 'notices',
    title: 'নোটিশ বোর্ড',
    titleEn: 'Notice Board',
    category: 'admin',
    icon: Bell,
    badge: 'জরুরি',
    desc: 'অফিসিয়াল ঘোষণা, পরীক্ষার বিজ্ঞপ্তি ও সাধারণ দিকনির্দেশনা',
    color: 'from-violet-600 to-purple-600'
  },
  {
    id: 'mentors',
    title: 'মেন্টর ও শিক্ষক',
    titleEn: 'Mentors & Faculty',
    category: 'admin',
    icon: GraduationCap,
    desc: 'বুয়েট, ঢাবি, চবি ও মেডিকেল উত্তীর্ণ অভিজ্ঞ শিক্ষক মণ্ডলী',
    color: 'from-sky-600 to-blue-600'
  },
  {
    id: 'audit',
    title: 'অডিট লগ ও নিরাপত্তা',
    titleEn: 'Audit Logs & Security',
    category: 'admin',
    icon: ShieldCheck,
    desc: 'সুপার এডমিন ও শিক্ষকদের কার্যক্রম এবং নিরাপত্তা ট্র্যাকিং',
    color: 'from-slate-700 to-slate-900'
  }
];

export const MainMenuView: React.FC = () => {
  const { setActiveTab } = useApp();

  const categories = [
    { id: 'core', name: 'প্রধান মেনু ও সিস্টেম', items: ALL_MENU_ITEMS.filter((i) => i.category === 'core') },
    { id: 'academic', name: 'একাডেমিক ও ক্লাস কার্যক্রম', items: ALL_MENU_ITEMS.filter((i) => i.category === 'academic') },
    { id: 'students', name: 'শিক্ষার্থী ও পারফরম্যান্স মূল্যায়ন', items: ALL_MENU_ITEMS.filter((i) => i.category === 'students') },
    { id: 'admin', name: 'প্রশাসন, শিক্ষক ও নিরাপত্তা', items: ALL_MENU_ITEMS.filter((i) => i.category === 'admin') }
  ];

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto px-3 sm:px-6 pt-4 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <Menu className="w-3.5 h-3.5 text-blue-400" />
            <span>সেন্ট্রাল ন্যাভিগেশন হাব • ১৪টি মডিউল</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            প্রধান মেনু ও সকল সেবা
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            টিএসএফ কোচিং প্ল্যাটফর্মের সমস্ত মডিউল, একাডেমিক টুলস, পরীক্ষা, মেধা তালিকা ও প্রশাসনিক নিয়ন্ত্রণ এক নজরে।
          </p>
        </div>
      </div>

      {/* Categorized Modules List */}
      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-3">
            <h2 className="text-sm font-extrabold text-slate-500 uppercase tracking-wider px-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>{cat.name}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cat.items.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="group bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer active:scale-[0.98]"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {item.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          {item.titleEn}
                        </span>
                        <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                      <span>প্রবেশ করুন</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
