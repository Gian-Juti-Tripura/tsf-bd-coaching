import React, { useState } from 'react';
import { Notice } from '../types';
import {
  Bell,
  Pin,
  Plus,
  AlertCircle,
  Clock,
  User,
  X,
  Send
} from 'lucide-react';

interface NoticeBoardViewProps {
  notices: Notice[];
  onAddNotice: (notice: Notice) => void;
  lang: 'bn' | 'en';
}

export const NoticeBoardView: React.FC<NoticeBoardViewProps> = ({
  notices,
  onAddNotice,
  lang
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Notice['category']>('General');
  const [isPinned, setIsPinned] = useState(false);

  const filteredNotices = notices.filter(
    (n) => selectedCategory === 'All' || n.category === selectedCategory
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice: Notice = {
      id: `not-${Date.now()}`,
      title,
      titleBn: title,
      content,
      contentBn: content,
      author: 'Dhamayan Tripura (Super Admin)',
      authorRole: 'Super Admin',
      category,
      isPinned,
      publishedAt: new Date().toISOString()
    };
    onAddNotice(newNotice);
    setIsModalOpen(false);
    setTitle('');
    setContent('');
    setIsPinned(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900">
              {lang === 'bn' ? 'অফিসিয়াল নোটিশ বোর্ড ও পুশ বিজ্ঞপ্তি' : 'Official Notice Board & Announcements'}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'bn'
              ? 'ভর্তি পরীক্ষার রুটিন, মডেল টেস্ট ও শিক্ষক-শিক্ষার্থীদের জরুরি বিজ্ঞপ্তি'
              : 'Admin-controlled notice board synchronized with Firebase Cloud Messaging'}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          {lang === 'bn' ? 'নতুন নোটিশ প্রকাশ করুন' : 'Publish Notice'}
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Urgent', 'Student', 'Mentor', 'General'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notices Feed */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className={`bg-white rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md space-y-3 ${
              notice.isPinned
                ? 'border-amber-300 ring-1 ring-amber-300/40 bg-gradient-to-r from-amber-50/20 to-white'
                : 'border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                {notice.isPinned && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
                    <Pin className="w-3 h-3 fill-amber-700 text-amber-700" /> Pinned Notice
                  </span>
                )}
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    notice.category === 'Urgent'
                      ? 'bg-rose-100 text-rose-800'
                      : notice.category === 'Student'
                      ? 'bg-sky-100 text-sky-800'
                      : notice.category === 'Mentor'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {notice.category}
                </span>
                <span className="text-[11px] text-slate-400">
                  {new Date(notice.publishedAt || notice.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>

              <span className="text-xs text-slate-500 font-medium shrink-0">
                {notice.author}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {lang === 'bn' && notice.titleBn ? notice.titleBn : notice.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn' && notice.contentBn ? notice.contentBn : notice.content}
            </p>
          </div>
        ))}
      </div>

      {/* New Notice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-5 flex items-center justify-between">
              <h2 className="text-base font-bold">
                {lang === 'bn' ? 'নতুন জরুরি নোটিশ লিখুন' : 'Compose New Notice'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule for Grand Model Test 02"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg font-semibold"
                  >
                    <option value="General">General (সকলের জন্য)</option>
                    <option value="Student">Students Only</option>
                    <option value="Mentor">Mentors / Teachers</option>
                    <option value="Urgent">Urgent / Emergency</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <input
                    type="checkbox"
                    id="pinNotice"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="pinNotice" className="ml-2 font-bold text-slate-700">
                    Pin to top of board
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notice Content *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write full announcement details..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Publish & Notify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
