import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CourseVideo, UnitType } from '../types';
import {
  PlaySquare,
  Search,
  Plus,
  Clock,
  User,
  Trash2,
  X,
  Play,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Layers,
  Sparkles
} from 'lucide-react';

export const VideosView: React.FC = () => {
  const {
    videos,
    addVideo,
    deleteVideo,
    currentUser,
    selectedUnit,
    setSelectedUnit,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<CourseVideo | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New video form state
  const [title, setTitle] = useState('');
  const [unit, setUnit] = useState<UnitType>(selectedUnit !== 'All' ? selectedUnit : 'Science');
  const [subject, setSubject] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState('45m');
  const [description, setDescription] = useState('');

  const canPublish = currentUser?.role === 'super_admin' || currentUser?.role === 'admin' || currentUser?.role === 'teacher';

  const units: (UnitType | 'All')[] = ['All', 'Science', 'Commerce', 'Arts', 'Nursing'];

  const filteredVideos = videos.filter((video) => {
    const matchesUnit = selectedUnit === 'All' || video.unit === selectedUnit;
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUnit && matchesSearch;
  });

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subject || !videoUrl) {
      showToast('অনুগ্রহ করে শিরোনাম, বিষয় এবং ভিডিও লিংক প্রদান করুন', 'warning');
      return;
    }

    const newVideo: CourseVideo = {
      id: `vid-${Date.now()}`,
      title,
      unit,
      subject,
      videoUrl,
      duration,
      teacherName: currentUser?.name || 'শ্রদ্ধেয় শিক্ষক',
      teacherEmail: currentUser?.email || 'teacher@tsf.org',
      description,
      createdAt: new Date().toISOString().split('T')[0]
    };

    addVideo(newVideo);
    showToast('নতুন ভিডিও লেকচার সফলভাবে আপলোড হয়েছে!', 'success');
    setIsAddModalOpen(false);

    // Reset fields
    setTitle('');
    setSubject('');
    setVideoUrl('');
    setDescription('');
  };

  // Convert regular YouTube link to embed link
  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes('youtube.com/watch?v=')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto px-3 sm:px-6 pt-4 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <PlaySquare className="w-6 h-6 text-rose-500" />
            <span>কোর্স ভিডিও লেকচার লাইব্রেরি</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            বিজ্ঞান, বাণিজ্য, মানবিক ও নার্সিং বিভাগের বিষয়ভিত্তিক পূর্ণাঙ্গ ভিডিও ক্লাস
          </p>
        </div>

        {canPublish && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-4 py-2.5 rounded-2xl text-xs sm:text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ নতুন ভিডিও যুক্ত করুন</span>
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
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {u === 'All' ? 'সব ইউনিট' : u}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="বিষয়, অধ্যায় বা শিক্ষক খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Videos Grid */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <PlaySquare className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">কোনো ভিডিও ক্লাস পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            নির্বাচিত ফিল্টারের আওতায় কোনো ভিডিও ক্লাস আপলোড করা হয়নি অথবা অনুসন্ধানটি সঠিক নয়।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVideos.map((video) => {
            const canDelete =
              currentUser?.role === 'super_admin' ||
              currentUser?.email === video.teacherEmail;

            return (
              <div
                key={video.id}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-blue-300 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Thumbnail Preview Banner */}
                <div
                  onClick={() => setActiveVideo(video)}
                  className="relative aspect-video bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 flex items-center justify-center cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors" />

                  {/* Play Button Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                      {video.unit}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/80 backdrop-blur-md text-white border border-blue-400/20">
                      {video.subject}
                    </span>
                  </div>

                  {/* Bottom Duration Badge */}
                  <div className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/75 text-white flex items-center gap-1 backdrop-blur-sm">
                    <Clock className="w-3 h-3 text-amber-300" />
                    <span>{video.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3
                      onClick={() => setActiveVideo(video)}
                      className="font-bold text-slate-900 text-sm line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      {video.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  {/* Teacher & Actions Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 truncate">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px] shrink-0">
                        {video.teacherName.charAt(0)}
                      </div>
                      <span className="text-slate-600 text-[11px] truncate font-medium">
                        {video.teacherName}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => setActiveVideo(video)}
                        className="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        ক্লাস দেখুন
                      </button>

                      {canDelete && (
                        <button
                          onClick={() => {
                            if (window.confirm('আপনি কি নিশ্চিত যে এই ভিডিওটি মুছে ফেলতে চান?')) {
                              deleteVideo(video.id);
                              showToast('ভিডিও ক্লাস মুছে ফেলা হয়েছে', 'info');
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 text-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3">
              <div className="truncate">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/30 mr-2">
                  {activeVideo.unit} • {activeVideo.subject}
                </span>
                <span className="text-sm font-bold text-slate-200 truncate">
                  {activeVideo.title}
                </span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Video Player */}
            <div className="relative aspect-video bg-black w-full">
              <iframe
                src={getEmbedUrl(activeVideo.videoUrl)}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Modal Details & Meta */}
            <div className="p-5 overflow-y-auto space-y-3 bg-slate-900">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">{activeVideo.title}</h2>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                    <span>শিক্ষক: <strong className="text-slate-200">{activeVideo.teacherName}</strong></span>
                    <span>•</span>
                    <span>সময়কাল: {activeVideo.duration}</span>
                    <span>•</span>
                    <span>তারিখ: {activeVideo.createdAt}</span>
                  </div>
                </div>
                <a
                  href={activeVideo.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-blue-400 font-semibold transition-colors shrink-0"
                >
                  <span>ইউটিউবে খুলুন</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed space-y-1">
                <span className="font-bold text-slate-400 block uppercase text-[10px] tracking-wider">ক্লাসের বিবরণ ও নির্দেশনা:</span>
                <p>{activeVideo.description || 'এই ক্লাসের জন্য কোনো অতিরিক্ত বিবরণ প্রদান করা হয়নি।'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Publish Video Modal (Teachers / Admins) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <PlaySquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">নতুন ভিডিও ক্লাস প্রকাশ করুন</h3>
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

            <form onSubmit={handleAddVideo} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ক্লাসের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: নিউটনীয় বলবিদ্যা - শর্টকাট ও প্রশ্নব্যাংক"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ভর্তি ইউনিট *</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as UnitType)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-white"
                  >
                    <option value="Science">Science (বিজ্ঞান)</option>
                    <option value="Commerce">Commerce (বাণিজ্য)</option>
                    <option value="Arts">Arts (মানবিক)</option>
                    <option value="Nursing">Nursing (নার্সিং)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">বিষয় (Subject) *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: পদার্থবিজ্ঞান ১ম পত্র"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ভিডিও লিংক (YouTube / MP4) *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://youtu.be/... বা embed url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">সময়কাল (Duration)</label>
                  <input
                    type="text"
                    placeholder="যেমন: 45m বা 1h 10m"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ক্লাসের বিবরণ ও গুরুত্বপূর্ণ টপিক</label>
                <textarea
                  rows={3}
                  placeholder="এই ক্লাসে আলোচিত মূল বিষয়বস্তু ও শিক্ষার্থীদের জন্য প্রয়োজনীয় দিকনির্দেশনা..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
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
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
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
