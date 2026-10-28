import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Notice, UnitType } from '../types';
import {
  Bell,
  Search,
  Plus,
  Trash2,
  X,
  AlertTriangle,
  Copy,
  Check,
  Calendar,
  User,
  Share2,
  Megaphone
} from 'lucide-react';

export const NoticesView: React.FC = () => {
  const {
    notices,
    addNotice,
    deleteNotice,
    currentUser,
    selectedUnit,
    setSelectedUnit,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New notice form state
  const [title, setTitle] = useState('');
  const [unit, setUnit] = useState<UnitType | 'All'>(selectedUnit !== 'All' ? selectedUnit : 'All');
  const [isUrgent, setIsUrgent] = useState(false);
  const [content, setContent] = useState('');

  const canPublish =
    currentUser?.role === 'super_admin' ||
    currentUser?.role === 'admin' ||
    currentUser?.role === 'teacher';

  const units: (UnitType | 'All')[] = ['All', 'Science', 'Commerce', 'Arts', 'Nursing'];

  const filteredNotices = notices.filter((n) => {
    const matchesUnit = selectedUnit === 'All' || n.unit === 'All' || n.unit === selectedUnit;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.authorName || n.author || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUnit && matchesSearch;
  });

  const handleCopyNotice = (notice: Notice) => {
    const author = notice.authorName || notice.author || 'Authority';
    const role = notice.authorRole || 'Admin';
    const text = `[TSF BD Coaching]\n${notice.title}\nইউনিট: ${notice.unit || 'All'}\nতারিখ: ${notice.createdAt || ''}\n\n${notice.content}\n\n- ${author} (${role})`;
    navigator.clipboard.writeText(text);
    setCopiedId(notice.id);
    showToast('নোটিশ ক্লিপবোর্ডে কপি করা হয়েছে!', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast('অনুগ্রহ করে শিরোনাম ও নোটিশের বিস্তারিত লিখুন', 'warning');
      return;
    }

    const newNotice: Notice = {
      id: `not-${Date.now()}`,
      title,
      content,
      unit,
      isUrgent,
      authorName: currentUser?.name || 'এডমিন প্যানেল',
      authorRole:
        currentUser?.role === 'super_admin'
          ? 'সুপার এডমিন'
          : currentUser?.role === 'teacher'
          ? 'বিষয়ভিত্তিক শিক্ষক'
          : 'এডমিন',
      createdAt: new Date().toISOString().split('T')[0]
    };

    addNotice(newNotice);
    showToast('নতুন নোটিশ প্রকাশিত হয়েছে!', 'success');
    setIsAddModalOpen(false);

    // Reset
    setTitle('');
    setContent('');
    setIsUrgent(false);
  };

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto px-3 sm:px-6 pt-4 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-amber-500" />
            <span>অফিসিয়াল নোটিশ বোর্ড ও ঘোষণা</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ক্লাসের সময়সূচি, পরীক্ষার রুটিন, অ্যাডমিট কার্ড ও জরুরি দিকনির্দেশনা
          </p>
        </div>

        {canPublish && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold px-4 py-2.5 rounded-2xl text-xs sm:text-sm shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ নতুন নোটিশ প্রকাশ করুন</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Unit tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {units.map((u) => {
            const isActive = selectedUnit === u;
            return (
              <button
                key={u}
                onClick={() => setSelectedUnit(u)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {u === 'All' ? 'সব নোটিশ' : u}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="নোটিশ খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
          />
        </div>
      </div>

      {/* Notice List */}
      {filteredNotices.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <Bell className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">কোনো নোটিশ পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            এই ক্যাটাগরিতে বর্তমানে কোনো নোটিশ নেই।
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotices.map((notice) => {
            const canDelete =
              currentUser?.role === 'super_admin' ||
              currentUser?.name === notice.authorName;

            return (
              <div
                key={notice.id}
                className={`p-5 rounded-3xl border transition-all ${
                  notice.isUrgent
                    ? 'bg-gradient-to-br from-rose-50/70 to-white border-rose-300 shadow-sm ring-1 ring-rose-200'
                    : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    {notice.isUrgent && (
                      <span className="flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-600 text-white shadow-xs animate-pulse">
                        <AlertTriangle className="w-3 h-3" />
                        জরুরি নোটিশ
                      </span>
                    )}

                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                      {notice.unit === 'All' ? 'সার্বজনীন (সকল ইউনিট)' : `${notice.unit} ইউনিট`}
                    </span>

                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {notice.createdAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <button
                      onClick={() => handleCopyNotice(notice)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      title="কপি করুন"
                    >
                      {copiedId === notice.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    {canDelete && (
                      <button
                        onClick={() => {
                          if (window.confirm('আপনি কি নিশ্চিত যে এই নোটিশটি মুছে ফেলতে চান?')) {
                            deleteNotice(notice.id);
                            showToast('নোটিশ মুছে ফেলা হয়েছে', 'info');
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="py-3 space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {notice.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {notice.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>প্রেরক: <strong>{notice.authorName}</strong> ({notice.authorRole})</span>
                  </div>
                  <span className="text-[11px] text-slate-400">ত্রিপুরা স্টুডেন্টস ফোরাম</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Publish Notice Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">নতুন নোটিশ প্রকাশ করুন</h3>
                  <span className="text-[11px] text-slate-500">শিক্ষক ও এডমিন প্যানেল</span>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNotice} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">নোটিশের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: আগামী শুক্রবারের বিশেষ মডেল টেস্ট ও রুটিন ঘোষণা"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">প্রযোজ্য ইউনিট *</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as UnitType | 'All')}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-white"
                  >
                    <option value="All">সকল ইউনিট (সার্বজনীন)</option>
                    <option value="Science">Science (বিজ্ঞান)</option>
                    <option value="Commerce">Commerce (বাণিজ্য)</option>
                    <option value="Arts">Arts (মানবিক)</option>
                    <option value="Nursing">Nursing (নার্সিং)</option>
                  </select>
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <input
                      type="checkbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                    />
                    <span className="text-xs font-bold text-rose-600">জরুরি নোটিশ হিসেবে চিহ্নিত করুন</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">নোটিশের বিস্তারিত বিবরণ *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="নোটিশের সম্পূর্ণ বিবরণ, নির্দেশনা, তারিখ ও সময়সূচি লিখুন..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
