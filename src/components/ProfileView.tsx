import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UnitType, UserRole } from '../types';
import {
  User,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Award,
  Layers,
  Phone,
  Mail,
  Calendar,
  LogOut,
  LogIn,
  IdCard,
  Calculator,
  Receipt,
  Download,
  CheckCircle2,
  Users,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    users,
    updateUserRole,
    toggleEnrollment,
    attempts,
    logout,
    setIsAuthModalOpen,
    setIsIdCardModalOpen,
    setIsCalculatorModalOpen,
    setIsFeesModalOpen,
    setIsApkModalOpen,
    showToast
  } = useApp();

  const [roleSearch, setRoleSearch] = useState('');

  const allUnits: UnitType[] = ['Science', 'Commerce', 'Arts', 'Nursing'];

  // Permanent super admins list
  const permanentSuperAdmins = ['dhamayantripura13@gmail.com', 'gianjuti.csecu@gmail.com'];

  const filteredUsers = users.filter((u) => {
    return (
      u.name.toLowerCase().includes(roleSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(roleSearch.toLowerCase()) ||
      u.role.toLowerCase().includes(roleSearch.toLowerCase())
    );
  });

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-md">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">লগইন প্রয়োজন</h2>
        <p className="text-xs text-slate-500">
          আপনার প্রোফাইল, এনরোলমেন্ট, পরীক্ষার রেজাল্ট ও পদবি দেখতে অনুগ্রহ করে জিমেইল ও ৪-সংখ্যার পিন দিয়ে লগইন করুন।
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-2xl text-xs sm:text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
        >
          লগইন / রেজিস্ট্রেশন করুন
        </button>
      </div>
    );
  }

  const isSuperAdmin = currentUser.role === 'super_admin';

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto px-3 sm:px-6 pt-4 animate-in fade-in duration-200">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg border-2 border-white/20">
              {currentUser.name.charAt(0)}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {currentUser.name}
                </h1>
                <span className={`text-[11px] font-extrabold px-3 py-0.5 rounded-full border ${
                  currentUser.role === 'super_admin'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                    : currentUser.role === 'teacher'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-400/30'
                    : currentUser.role === 'admin'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                    : 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                }`}>
                  {currentUser.role === 'super_admin'
                    ? '★ সুপার এডমিন (Super Admin)'
                    : currentUser.role === 'teacher'
                    ? 'শ্রদ্ধেয় শিক্ষক (Teacher)'
                    : currentUser.role === 'admin'
                    ? 'এডমিন (Admin)'
                    : 'শিক্ষার্থী (Student)'}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-300 flex-wrap pt-1 font-mono">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  {currentUser.email}
                </span>
                {currentUser.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    {currentUser.phone}
                  </span>
                )}
                <span className="text-[11px] text-slate-400 font-sans">
                  যোগদান: {currentUser.createdAt}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              অ্যাকাউন্ট পরিবর্তন
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>লগআউট</span>
            </button>
          </div>
        </div>

        {/* Quick Tools Bar inside Profile */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => setIsIdCardModalOpen(true)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <IdCard className="w-4 h-4 text-blue-400" />
            <span>স্মার্ট স্টুডেন্ট আইডি কার্ড</span>
          </button>
          <button
            onClick={() => setIsCalculatorModalOpen(true)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>ভর্তি জিপিএ ক্যালকুলেটর</span>
          </button>
          <button
            onClick={() => setIsFeesModalOpen(true)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Receipt className="w-4 h-4 text-emerald-400" />
            <span>টিউশন ফি ও পেমেন্ট হিস্ট্রি</span>
          </button>
          <button
            onClick={() => setIsApkModalOpen(true)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>অ্যান্ড্রয়েড APK ইনস্টলার</span>
          </button>
        </div>
      </div>

      {/* Enrolled Units Manager */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <span>আপনার এনরোল্ড ভর্তি প্রস্তুতি ইউনিটসমূহ</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            যে ইউনিটগুলোতে আপনি অংশ নিতে চান সেগুলোতে ক্লিক করে এনরোল করুন
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {allUnits.map((unit) => {
            const isEnrolled = currentUser.enrolledUnits?.includes(unit);

            return (
              <div
                key={unit}
                onClick={() => toggleEnrollment(unit)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  isEnrolled
                    ? 'border-blue-600 bg-blue-50/60 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{unit} Unit</h4>
                  <span className="text-[11px] text-slate-500">
                    {unit === 'Science' && 'বিজ্ঞান শাখা'}
                    {unit === 'Commerce' && 'ব্যবসায় শিক্ষা'}
                    {unit === 'Arts' && 'মানবিক শাখা'}
                    {unit === 'Nursing' && 'নার্সিং ভর্তি'}
                  </span>
                </div>

                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isEnrolled ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'
                }`}>
                  {isEnrolled ? <CheckCircle2 className="w-4 h-4" /> : '+'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Super Admin Control Panel: User & Role Management */}
      {isSuperAdmin && (
        <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>সুপার এডমিন প্যানেল (Super Admin Panel)</span>
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                শিক্ষক ও এডমিন পদবি বণ্টন (User & Role Management)
              </h2>
              <p className="text-xs text-slate-500">
                যেকোনো শিক্ষার্থীকে শিক্ষক বা এডমিন হিসেবে পদায়ন বা পরিবর্তন করুন
              </p>
            </div>

            <input
              type="text"
              placeholder="নাম বা ইমেইল খুঁজুন..."
              value={roleSearch}
              onChange={(e) => setRoleSearch(e.target.value)}
              className="px-3.5 py-1.5 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          {/* Creators Notice */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-extrabold">স্থায়ী সুপার এডমিন সৃষ্টিকর্তা: </strong>
              <span className="font-mono">dhamayantripura13@gmail.com</span> এবং <span className="font-mono">gianjuti.csecu@gmail.com</span> সর্বদাই সর্বোচ্চ ক্ষমতাপ্রাপ্ত সুপার এডমিন থাকবেন এবং তাদের পদবি পরিবর্তনযোগ্য নয়।
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">নাম ও ইমেইল</th>
                  <th className="py-2.5 px-3">বর্তমান পদবি</th>
                  <th className="py-2.5 px-3">এনরোল্ড ইউনিট</th>
                  <th className="py-2.5 px-3 text-right">পদবি পরিবর্তন করুন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => {
                  const isPermanent = permanentSuperAdmins.includes(user.email);

                  return (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{user.name}</div>
                        <div className="font-mono text-[11px] text-slate-500">{user.email}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          user.role === 'super_admin'
                            ? 'bg-amber-100 text-amber-800'
                            : user.role === 'teacher'
                            ? 'bg-purple-100 text-purple-800'
                            : user.role === 'admin'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1 flex-wrap">
                          {user.enrolledUnits?.map((eu) => (
                            <span key={eu} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                              {eu}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {isPermanent ? (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                            সৃষ্টিকর্তা (স্থায়ী)
                          </span>
                        ) : (
                          <select
                            value={user.role}
                            onChange={(e) => {
                              const newRole = e.target.value as UserRole;
                              updateUserRole(user.email, newRole);
                              showToast(`${user.name}-কে ${newRole} পদবিতে স্থানান্তর করা হয়েছে!`, 'success');
                            }}
                            className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                          >
                            <option value="student">শিক্ষার্থী (student)</option>
                            <option value="teacher">শিক্ষক (teacher)</option>
                            <option value="admin">এডমিন (admin)</option>
                            <option value="super_admin">সুপার এডমিন (super_admin)</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student's Past Exam Attempts */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-600" />
          <span>আপনার মডেল টেস্টের ফলাফল ও ইতিহাস</span>
        </h2>

        {(() => {
          const userAttempts = attempts.filter((a) => a.studentEmail === currentUser.email);

          if (userAttempts.length === 0) {
            return (
              <div className="text-center py-10 bg-slate-50 rounded-2xl p-6 text-slate-500 text-xs">
                আপনি এখনও কোনো মডেল টেস্টে অংশ নেননি। মডেল টেস্ট ট্যাব থেকে পরীক্ষায় অংশ নিন!
              </div>
            );
          }

          return (
            <div className="space-y-3">
              {userAttempts.map((attempt) => (
                <div
                  key={attempt.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {attempt.unit}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {attempt.testTitle}
                      </h4>
                    </div>
                    <div className="text-xs text-slate-500">
                      তারিখ: {attempt.submittedAt} • সঠিক: {attempt.correctAnswers} • ভুল: {attempt.wrongAnswers}
                    </div>
                  </div>

                  <div className="text-right flex items-center justify-between sm:justify-end gap-3">
                    <div>
                      <span className="text-xs text-slate-400 block">প্রাপ্ত নম্বর</span>
                      <span className="text-lg font-black text-emerald-600">
                        {attempt.score}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
};
