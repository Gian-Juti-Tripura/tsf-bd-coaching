import React, { useState } from 'react';
import { Exam, McqQuestion, AdmissionUnit } from '../types';
import {
  X,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  FileCheck,
  Clock,
  Award,
  BookOpen,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface ExamCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveExam: (exam: Exam) => void;
  lang: 'bn' | 'en';
}

export const ExamCreatorModal: React.FC<ExamCreatorModalProps> = ({
  isOpen,
  onClose,
  onSaveExam,
  lang
}) => {
  const [title, setTitle] = useState('');
  const [unit, setUnit] = useState<AdmissionUnit>('A Unit (Science)');
  const [subject, setSubject] = useState('Physics');
  const [syllabus, setSyllabus] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(20);
  const [negativeMarking, setNegativeMarking] = useState(0.25);
  const [questions, setQuestions] = useState<McqQuestion[]>([]);

  // Current question draft state
  const [qText, setQText] = useState('');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctIdx, setCorrectIdx] = useState(0);
  const [explanation, setExplanation] = useState('');

  if (!isOpen) return null;

  const handleAddQuestion = () => {
    if (!qText.trim() || !opt0.trim() || !opt1.trim() || !opt2.trim() || !opt3.trim()) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে প্রশ্ন এবং ৪টি অপশন সঠিকভাবে পূরণ করুন।' : 'Please fill question text and all 4 options.');
      return;
    }

    const newQ: McqQuestion = {
      id: `q-${Date.now()}-${questions.length + 1}`,
      questionText: qText,
      options: [opt0, opt1, opt2, opt3],
      correctOptionIndex: correctIdx,
      explanation: explanation || (lang === 'bn' ? 'সঠিক সমাধান বিশ্লেষণ।' : 'Correct solution analysis.'),
      subject,
      marks: 1
    };

    setQuestions([...questions, newQ]);
    // Reset draft fields
    setQText('');
    setOpt0('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setCorrectIdx(0);
    setExplanation('');
  };

  const handleRemoveQuestion = (idx: number) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleQuickAddSamples = () => {
    const sampleQuestions: McqQuestion[] = [
      {
        id: `q-sample-1`,
        questionText: 'একটি প্রিজমের প্রতিসরণ কোণ ৬০° এবং ন্যূনতম বিচ্যুতি কোণ ৩০° হলে প্রিজমের উপাদানের প্রতিসরাঙ্ক কত?',
        options: ['√2', '1.5', '√3', '2.0'],
        correctOptionIndex: 0,
        explanation: 'μ = sin((A + Dm)/2) / sin(A/2) = sin(45°) / sin(30°) = (1/√2) / (1/2) = 2/√2 = √2',
        subject: 'Physics',
        marks: 1
      },
      {
        id: `q-sample-2`,
        questionText: 'নিচের কোনটির বন্ধন কোণ সবচেয়ে ছোট?',
        options: ['CH4 (109.5°)', 'NH3 (107°)', 'H2O (104.5°)', 'H2S (92.1°)'],
        correctOptionIndex: 3,
        explanation: 'H2S এ কেন্দ্রীয় পরমাণুর আকার বড় এবং মুক্তজোড় ইলেকট্রন বিকর্ষণের কারণে বন্ধন কোণ মাত্র ৯২.১°।',
        subject: 'Chemistry',
        marks: 1
      },
      {
        id: `q-sample-3`,
        questionText: 'মাইটোকন্ড্রিয়ার অন্তর্বর্তী ঝিল্লির ভাঁজগুলোকে কী বলা হয়?',
        options: ['ম্যাট্রিক্স', 'ক্রিস্টি (Cristae)', 'অক্সিজোম', 'রাইবোসোম'],
        correctOptionIndex: 1,
        explanation: 'মাইটোকন্ড্রিয়ার অভ্যন্তরীণ ঝিল্লি ভেতরের দিকে আঙুলের মতো ভাঁজ তৈরি করে, এদের ক্রিস্টি বলে।',
        subject: 'Biology',
        marks: 1
      }
    ];

    setQuestions([...questions, ...sampleQuestions]);
    if (!title) setTitle('টিএসএফ সাপ্তাহিক মডেল টেস্ট - বিশেষ মূল্যায়ন');
    if (!syllabus) setSyllabus('পদার্থবিজ্ঞান, রসায়ন ও জীববিজ্ঞান সমন্বিত গুরুত্বপূর্ণ অধ্যায়সমূহ');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে পরীক্ষার নাম লিখুন।' : 'Please enter exam title.');
      return;
    }
    if (questions.length === 0) {
      alert(lang === 'bn' ? 'কমপক্ষে একটি প্রশ্ন যোগ করুন।' : 'Please add at least 1 question.');
      return;
    }

    const newExam: Exam = {
      id: `exam-${Date.now()}`,
      title,
      unit,
      subject,
      syllabus: syllabus || 'Comprehensive University Admission Syllabus',
      examType: 'Weekly Model Test',
      durationMinutes,
      totalMarks: questions.length,
      totalQuestions: questions.length,
      negativeMarking,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 7 * 86400000).toISOString(),
      isPublished: true,
      randomizeQuestions: true,
      createdBy: 'Faculty / Mentor',
      questions
    };

    onSaveExam(newExam);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                {lang === 'bn' ? 'নতুন অনলাইন মডেল টেস্ট তৈরি করুন' : 'Exam Authoring Studio'}
              </h2>
              <p className="text-xs text-slate-400">
                Create full-length MCQ exams with custom questions, marks & Bengali explanations
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Top Exam Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {lang === 'bn' ? 'পরীক্ষার শিরোনাম (Exam Title)' : 'Exam Title'}
              </label>
              <input
                type="text"
                placeholder={lang === 'bn' ? 'উদা: DU A-Unit Physics Special Model Test' : 'e.g. DU Physics Test'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {lang === 'bn' ? 'ভর্তি ইউনিট (Target Unit)' : 'Target Unit'}
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as AdmissionUnit)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="A Unit (Science)">A Unit (Science)</option>
                <option value="B Unit (Arts/Humanities)">B Unit (Arts/Humanities)</option>
                <option value="C Unit (Commerce/Business)">C Unit (Commerce/Business)</option>
                <option value="D Unit (Social/Combined)">D Unit (Social/Combined)</option>
                <option value="Nursing & Medical">Nursing & Medical</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {lang === 'bn' ? 'বিষয় (Subject)' : 'Subject'}
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Physics">পদার্থবিজ্ঞান (Physics)</option>
                <option value="Chemistry">রসায়ন (Chemistry)</option>
                <option value="Biology">জীববিজ্ঞান (Biology)</option>
                <option value="Higher Math">উচ্চতর গণিত (Higher Math)</option>
                <option value="English">English Language</option>
                <option value="Bangla">বাংলা ভাষা ও সাহিত্য</option>
                <option value="General Knowledge">সাধারণ জ্ঞান (GK)</option>
                <option value="Nursing Fundamentals">নার্সিং ফান্ডামেন্টালস</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {lang === 'bn' ? 'সময় (Duration in Minutes)' : 'Duration (Minutes)'}
              </label>
              <input
                type="number"
                min="5"
                max="180"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 20)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {lang === 'bn' ? 'ভুল উত্তরের জন্য কর্তন (Negative Mark)' : 'Negative Marking'}
              </label>
              <select
                value={negativeMarking}
                onChange={(e) => setNegativeMarking(parseFloat(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="0.25">-0.25 (DU / Medical Standard)</option>
                <option value="0.20">-0.20 (GST Cluster Standard)</option>
                <option value="0.50">-0.50</option>
                <option value="0.00">0.00 (No Negative Marking)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {lang === 'bn' ? 'সিলেবাস ও অধ্যায় (Syllabus)' : 'Syllabus & Topics'}
              </label>
              <input
                type="text"
                placeholder={lang === 'bn' ? 'উদা: গতিবিদ্যা, ভেক্টর, পর্যায়বৃত্ত গতি' : 'e.g. Mechanics, Vectors'}
                value={syllabus}
                onChange={(e) => setSyllabus(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* MCQ Question Builder Section */}
          <div className="border border-blue-200 bg-blue-50/40 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-blue-600" />
                <span>{lang === 'bn' ? 'প্রশ্ন তৈরি করুন (Add New Question)' : 'Add Question'}</span>
              </h3>
              <button
                type="button"
                onClick={handleQuickAddSamples}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ডেমো প্রশ্ন লোড করুন' : 'Insert Demo Questions'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {lang === 'bn' ? 'প্রশ্নের বিবরণ (Question Text)' : 'Question Text'}
              </label>
              <textarea
                rows={2}
                placeholder={lang === 'bn' ? 'এখানে প্রশ্ন লিখুন...' : 'Enter question...'}
                value={qText}
                onChange={(e) => setQText(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-bangla"
              />
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Option A', val: opt0, setVal: setOpt0, idx: 0 },
                { label: 'Option B', val: opt1, setVal: setOpt1, idx: 1 },
                { label: 'Option C', val: opt2, setVal: setOpt2, idx: 2 },
                { label: 'Option D', val: opt3, setVal: setOpt3, idx: 3 },
              ].map((opt) => (
                <div key={opt.idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">{opt.label}</span>
                    <label className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold cursor-pointer">
                      <input
                        type="radio"
                        name="correctOption"
                        checked={correctIdx === opt.idx}
                        onChange={() => setCorrectIdx(opt.idx)}
                        className="accent-emerald-600"
                      />
                      <span>{lang === 'bn' ? 'সঠিক উত্তর' : 'Correct Answer'}</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder={`Option ${String.fromCharCode(65 + opt.idx)}`}
                    value={opt.val}
                    onChange={(e) => opt.setVal(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none font-bangla ${
                      correctIdx === opt.idx
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : 'border-slate-300'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Solution Note / Explanation */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {lang === 'bn' ? 'ব্যাখ্যা / সমাধান নোট (Bengali Solution Note)' : 'Explanation / Solution Note'}
              </label>
              <input
                type="text"
                placeholder={lang === 'bn' ? 'শিক্ষার্থীদের জন্য সঠিক ব্যাখ্যার সংক্ষিপ্ত নোট...' : 'Explanation for students...'}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-bangla"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'bn' ? 'প্রশ্নটি তালিকায় যুক্ত করুন' : 'Add Question to Exam'}</span>
              </button>
            </div>
          </div>

          {/* List of Added Questions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-900">
                {lang === 'bn' ? `তালিকায় অন্তর্ভুক্ত প্রশ্নসমূহ (${questions.length})` : `Exam Questions (${questions.length})`}
              </span>
              <span className="text-slate-500 font-medium">Total Marks: {questions.length}</span>
            </div>

            {questions.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl text-xs text-slate-400">
                {lang === 'bn' ? 'এখনও কোনো প্রশ্ন যুক্ত করা হয়নি।' : 'No questions added yet.'}
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-3 bg-white border border-slate-200 rounded-xl flex items-start justify-between gap-3 shadow-sm text-xs"
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 font-bangla">
                        {idx + 1}. {q.questionText}
                      </div>
                      <div className="text-[11px] text-slate-600 font-bangla flex items-center gap-3 flex-wrap">
                        <span className="text-emerald-700 font-bold">
                          ✓ {String.fromCharCode(65 + q.correctOptionIndex)}: {q.options[q.correctOptionIndex]}
                        </span>
                        {q.explanation && (
                          <span className="text-slate-400 truncate max-w-sm">
                            Note: {q.explanation}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(idx)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              {lang === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-2 active:scale-95 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'bn' ? 'পরীক্ষাটি প্রকাশ করুন' : 'Publish Exam'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
