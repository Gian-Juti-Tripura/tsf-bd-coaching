import React, { useState } from 'react';
import { Target, CheckCircle2, TrendingUp, Sparkles, BookOpen } from 'lucide-react';

interface AdmissionTrackerViewProps {
  lang: 'bn' | 'en';
}

interface SyllabusTopic {
  id: string;
  subject: string;
  topic: string;
  completed: boolean;
}

export const AdmissionTrackerView: React.FC<AdmissionTrackerViewProps> = ({ lang }) => {
  const [topics, setTopics] = useState<SyllabusTopic[]>([
    { id: '1', subject: 'Physics', topic: 'Vector & Coordinate Geometry', completed: true },
    { id: '2', subject: 'Physics', topic: 'Newtonian Mechanics & Momentum', completed: true },
    { id: '3', subject: 'Physics', topic: 'Work, Power & Energy', completed: false },
    { id: '4', subject: 'Chemistry', topic: 'Periodic Table & Periodicity', completed: true },
    { id: '5', subject: 'Chemistry', topic: 'Chemical Bonding & Hybridization', completed: true },
    { id: '6', subject: 'Chemistry', topic: 'Organic Reaction Mechanism', completed: false },
    { id: '7', subject: 'English', topic: 'Subject-Verb Agreement & Inversion', completed: true },
    { id: '8', subject: 'English', topic: 'Analogy & Vocabulary Recall', completed: false },
    { id: '9', subject: 'General Knowledge', topic: 'Liberation War & CHT History', completed: true },
    { id: '10', subject: 'Biology / Math', topic: 'Genetics / Calculus Integration', completed: false }
  ]);

  const [targetUni, setTargetUni] = useState('Dhaka University (Ka Unit)');

  const toggleTopic = (id: string) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = topics.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / topics.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900">
              {lang === 'bn' ? 'ভর্তি প্রস্তুতি ট্র্যাকার ও রিভিশন প্ল্যানার' : 'Admission Preparation Tracker & Progress'}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'bn'
              ? 'বিশ্ববিদ্যালয় লক্ষ্য নির্ধারণ এবং সাপ্তাহিক সিলেবাস সমাপ্তি পর্যবেক্ষণ'
              : 'Target university tracking, weekly revision milestones and syllabus coverage'}
          </p>
        </div>

        <div className="w-full sm:w-64">
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
            Target Dream University
          </label>
          <select
            value={targetUni}
            onChange={(e) => setTargetUni(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-blue-900"
          >
            <option value="Dhaka University (Ka Unit)">Dhaka University (Ka Unit - Science)</option>
            <option value="Dhaka University (Kha Unit)">Dhaka University (Kha Unit - Arts/Law)</option>
            <option value="Dhaka University (Ga Unit)">Dhaka University (Ga Unit - Business)</option>
            <option value="BUET / CUET / RUET">BUET / Engineering Cluster</option>
            <option value="Dhaka Medical College / Nursing">DMC / Top Nursing Colleges</option>
            <option value="Jahangirnagar University">Jahangirnagar University</option>
          </select>
        </div>
      </div>

      {/* Progress Metric Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white rounded-2xl p-6 shadow-md border border-blue-800">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs text-blue-200 font-semibold uppercase tracking-wider">
              Overall Syllabus Coverage
            </span>
            <h3 className="text-2xl font-extrabold text-white">
              {completedCount} of {topics.length} Core Modules Mastered
            </h3>
            <p className="text-xs text-blue-300">
              Targeting: <strong className="text-amber-300">{targetUni}</strong> (Session 2026–27)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-3xl font-extrabold text-amber-300">{progressPercent}%</span>
              <span className="text-[10px] text-blue-200 block">Readiness</span>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-amber-400/40 border-t-amber-400 flex items-center justify-center font-bold text-xs text-amber-300">
              {progressPercent}%
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden mt-6">
          <div
            className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Checklist of Modules */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Syllabus Mastery Checklist
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topics.map((t) => (
            <div
              key={t.id}
              onClick={() => toggleTopic(t.id)}
              className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                t.completed
                  ? 'border-emerald-300 bg-emerald-50/50 text-emerald-950 font-bold'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => {}} // handled by parent onClick
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">
                    {t.subject}
                  </span>
                  <span className="text-xs">{t.topic}</span>
                </div>
              </div>

              {t.completed && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
