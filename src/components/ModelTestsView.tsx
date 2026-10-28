import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ModelTest, TestQuestion, TestAttempt, UnitType } from '../types';
import {
  FileCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  Trash2,
  Award,
  ChevronRight,
  ChevronLeft,
  X,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';

export const ModelTestsView: React.FC = () => {
  const {
    tests,
    addModelTest,
    deleteModelTest,
    attempts,
    saveAttempt,
    currentUser,
    selectedUnit,
    setSelectedUnit,
    showToast,
    setIsAuthModalOpen
  } = useApp();

  const [activeTest, setActiveTest] = useState<ModelTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [resultAttempt, setResultAttempt] = useState<TestAttempt | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Create Test Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUnit, setNewUnit] = useState<UnitType>(selectedUnit !== 'All' ? selectedUnit : 'Science');
  const [newSubject, setNewSubject] = useState('');
  const [newDuration, setNewDuration] = useState(15);
  const [newPassMarks, setNewPassMarks] = useState(8);
  const [newNegativeMarking, setNewNegativeMarking] = useState(0.25);
  const [newQuestions, setNewQuestions] = useState<TestQuestion[]>([
    {
      id: `q-${Date.now()}-1`,
      question: '',
      options: ['', '', '', ''],
      correctOption: 0,
      explanation: ''
    }
  ]);

  const canCreate = currentUser?.role === 'super_admin' || currentUser?.role === 'admin' || currentUser?.role === 'teacher';

  const units: (UnitType | 'All')[] = ['All', 'Science', 'Commerce', 'Arts', 'Nursing'];

  const filteredTests = tests.filter((t) => {
    return selectedUnit === 'All' || t.unit === selectedUnit;
  });

  // Start Exam
  const handleStartTest = (test: ModelTest) => {
    if (!currentUser) {
      showToast('পরীক্ষা দিতে অনুগ্রহ করে প্রথমে লগইন করুন', 'info');
      setIsAuthModalOpen(true);
      return;
    }
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeftSeconds(test.durationMinutes * 60);
    setIsTestActive(true);
  };

  // Timer Effect
  useEffect(() => {
    if (!isTestActive || timeLeftSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestActive, timeLeftSeconds]);

  // Submit Exam
  const handleSubmitTest = (auto = false) => {
    if (!activeTest || !currentUser) return;

    let correct = 0;
    let wrong = 0;

    activeTest.questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (selected !== undefined) {
        if (selected === q.correctOption) {
          correct += 1;
        } else {
          wrong += 1;
        }
      }
    });

    const marksPerQuestion = activeTest.totalMarks / activeTest.questions.length;
    const rawScore = correct * marksPerQuestion - wrong * activeTest.negativeMarking;
    const finalScore = Math.max(0, parseFloat(rawScore.toFixed(2)));

    const attempt: TestAttempt = {
      id: `att-${Date.now()}`,
      testId: activeTest.id,
      testTitle: activeTest.title,
      studentEmail: currentUser.email,
      studentName: currentUser.name,
      unit: activeTest.unit,
      score: finalScore,
      totalQuestions: activeTest.questions.length,
      correctAnswers: correct,
      wrongAnswers: wrong,
      answers: selectedAnswers,
      submittedAt: new Date().toLocaleString('bn-BD')
    };

    saveAttempt(attempt);
    setIsTestActive(false);
    setResultAttempt(attempt);
    setIsReviewOpen(true);

    if (auto) {
      showToast('সময় শেষ! আপনার উত্তরপত্র স্বয়ংক্রিয়ভাবে জমা হয়েছে।', 'warning');
    } else {
      showToast('পরীক্ষা সফলভাবে সম্পন্ন হয়েছে! আপনার স্কোর দেখুন।', 'success');
    }
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // Handle Question creation input
  const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
    const updated = [...newQuestions];
    updated[qIndex].options[optIndex] = value;
    setNewQuestions(updated);
  };

  const addAnotherQuestion = () => {
    setNewQuestions([
      ...newQuestions,
      {
        id: `q-${Date.now()}-${newQuestions.length + 1}`,
        question: '',
        options: ['', '', '', ''],
        correctOption: 0,
        explanation: ''
      }
    ]);
  };

  const removeQuestion = (index: number) => {
    if (newQuestions.length <= 1) {
      showToast('কমপক্ষে ১ টি প্রশ্ন থাকা আবশ্যক', 'warning');
      return;
    }
    const updated = newQuestions.filter((_, i) => i !== index);
    setNewQuestions(updated);
  };

  const handleSaveModelTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSubject) {
      showToast('পরীক্ষার নাম ও বিষয় আবশ্যক', 'warning');
      return;
    }

    for (let i = 0; i < newQuestions.length; i++) {
      const q = newQuestions[i];
      if (!q.question.trim()) {
        showToast(`প্রশ্ন নং ${i + 1} খালি রাখা যাবে না`, 'warning');
        return;
      }
      if (q.options.some((opt) => !opt.trim())) {
        showToast(`প্রশ্ন নং ${i + 1}-এর ৪টি অপশনই পূরণ করুন`, 'warning');
        return;
      }
    }

    const createdTest: ModelTest = {
      id: `test-${Date.now()}`,
      title: newTitle,
      unit: newUnit,
      subject: newSubject,
      durationMinutes: Number(newDuration),
      totalMarks: newQuestions.length,
      passMarks: Number(newPassMarks),
      negativeMarking: Number(newNegativeMarking),
      questions: newQuestions,
      teacherName: currentUser?.name || 'শিক্ষক প্যানেল',
      teacherEmail: currentUser?.email || 'admin@tsf.org',
      createdAt: new Date().toISOString().split('T')[0]
    };

    addModelTest(createdTest);
    showToast('নতুন মডেল টেস্ট সফলভাবে তৈরি ও প্রকাশিত হয়েছে!', 'success');
    setIsCreateModalOpen(false);

    // Reset Form
    setNewTitle('');
    setNewSubject('');
    setNewQuestions([
      {
        id: `q-${Date.now()}-1`,
        question: '',
        options: ['', '', '', ''],
        correctOption: 0,
        explanation: ''
      }
    ]);
  };

  // If Test is Currently Active (CBT Full-Screen Experience)
  if (isTestActive && activeTest) {
    const q = activeTest.questions[currentQuestionIndex];
    const isAnswered = selectedAnswers[q.id] !== undefined;

    return (
      <div className="fixed inset-0 z-50 bg-slate-100 flex flex-col overflow-y-auto">
        {/* CBT Header */}
        <header className="bg-slate-900 text-white px-4 py-3 border-b border-slate-800 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/30">
              {activeTest.unit} • {activeTest.subject}
            </span>
            <h1 className="text-sm sm:text-base font-bold truncate max-w-xs sm:max-w-md">
              {activeTest.title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-sm font-black border ${
              timeLeftSeconds < 120
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                : 'bg-slate-800 text-amber-300 border-slate-700'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeftSeconds)}</span>
            </div>

            <button
              onClick={() => {
                if (window.confirm('আপনি কি নিশ্চিত যে উত্তরপত্র জমা দিতে চান?')) {
                  handleSubmitTest(false);
                }
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-1.5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              সাবমিট করুন
            </button>
          </div>
        </header>

        {/* CBT Main Container */}
        <div className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left/Main Question Area */}
          <div className="md:col-span-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              {/* Question Number & Tags */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  প্রশ্ন {currentQuestionIndex + 1} / {activeTest.questions.length}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  মান: ১.০০ | নেগেটিভ: -{activeTest.negativeMarking}
                </span>
              </div>

              {/* Question Text */}
              <div className="py-5 text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                {q.question}
              </div>

              {/* 4 Options */}
              <div className="space-y-3">
                {q.options.map((option, idx) => {
                  const isChecked = selectedAnswers[q.id] === idx;
                  const labelLetters = ['ক', 'খ', 'গ', 'ঘ'];

                  return (
                    <label
                      key={idx}
                      onClick={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: idx })}
                      className={`flex items-center gap-3.5 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        isChecked
                          ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-bold shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isChecked ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {labelLetters[idx]}
                      </div>
                      <span className="text-sm flex-1">{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Bottom Question Controls */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>পূর্ববর্তী</span>
              </button>

              {isAnswered && (
                <button
                  onClick={() => {
                    const copy = { ...selectedAnswers };
                    delete copy[q.id];
                    setSelectedAnswers(copy);
                  }}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
                >
                  উত্তর মুছুন (Clear)
                </button>
              )}

              <button
                disabled={currentQuestionIndex === activeTest.questions.length - 1}
                onClick={() => setCurrentQuestionIndex(prev => Math.min(activeTest.questions.length - 1, prev + 1))}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-sm"
              >
                <span>পরবর্তী</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Question Palette */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4 h-fit">
            <h3 className="font-bold text-slate-900 text-sm">প্রশ্ন প্যালেট (Question Palette)</h3>

            <div className="grid grid-cols-4 gap-2">
              {activeTest.questions.map((ques, idx) => {
                const answered = selectedAnswers[ques.id] !== undefined;
                const isCurrent = currentQuestionIndex === idx;

                return (
                  <button
                    key={ques.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-10 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      isCurrent
                        ? 'ring-2 ring-blue-600 ring-offset-2'
                        : ''
                    } ${
                      answered
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-emerald-600 shrink-0" />
                <span className="text-slate-600">উত্তর দেওয়া হয়েছে ({Object.keys(selectedAnswers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-slate-200 shrink-0" />
                <span className="text-slate-600">উত্তর বাকি ({activeTest.questions.length - Object.keys(selectedAnswers).length})</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (window.confirm('আপনি কি এখনই পরীক্ষা শেষ করে ফলাফল দেখতে চান?')) {
                  handleSubmitTest(false);
                }
              }}
              className="w-full mt-2 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              পরীক্ষা সমাপ্ত করুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto px-3 sm:px-6 pt-4 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FileCheck className="w-6 h-6 text-emerald-600" />
            <span>অনলাইন মডেল টেস্ট ও পরীক্ষা কেন্দ্র</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ঢাকা বিশ্ববিদ্যালয় ও গুচ্ছ ভর্তি পরীক্ষার অনুরূপ সিবিটি এক্সাম ও তাৎক্ষণিক ফলাফল মূল্যায়ন
          </p>
        </div>

        {canCreate && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-4 py-2.5 rounded-2xl text-xs sm:text-sm shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ নতুন মডেল টেস্ট তৈরি করুন</span>
          </button>
        )}
      </div>

      {/* Unit Filter tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {units.map((u) => {
          const isActive = selectedUnit === u;
          return (
            <button
              key={u}
              onClick={() => setSelectedUnit(u)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {u === 'All' ? 'সব ইউনিট' : u}
            </button>
          );
        })}
      </div>

      {/* Tests Grid */}
      {filteredTests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <FileCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">কোনো মডেল টেস্ট পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            এই ইউনিটের জন্য এখনও কোনো নতুন মডেল টেস্ট তৈরি করা হয়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTests.map((test) => {
            const userAttempt = attempts.find(
              (a) => a.testId === test.id && a.studentEmail === currentUser?.email
            );

            const canDelete =
              currentUser?.role === 'super_admin' ||
              currentUser?.email === test.teacherEmail;

            return (
              <div
                key={test.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-300 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {test.unit} • {test.subject}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {test.createdAt}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {test.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                      <span>{test.questions.length} টি প্রশ্ন</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{test.durationMinutes} মিনিট</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-emerald-500" />
                      <span>পূর্ণমান: {test.totalMarks}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-600 font-semibold">
                      <span>নেগেটিভ: -{test.negativeMarking}</span>
                    </div>
                  </div>

                  {userAttempt && (
                    <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs flex items-center justify-between">
                      <div>
                        <span className="text-emerald-800 font-bold block">আপনার প্রাপ্ত নম্বর:</span>
                        <span className="text-[11px] text-emerald-600">
                          {userAttempt.correctAnswers} সঠিক, {userAttempt.wrongAnswers} ভুল
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-emerald-700">
                          {userAttempt.score}
                        </span>
                        <span className="text-[10px] text-emerald-600 block">/ {test.totalMarks}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-500 truncate">
                    শিক্ষক: {test.teacherName}
                  </div>

                  <div className="flex items-center gap-2">
                    {userAttempt && (
                      <button
                        onClick={() => {
                          setResultAttempt(userAttempt);
                          setActiveTest(test);
                          setIsReviewOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
                      >
                        ফলাফল
                      </button>
                    )}

                    <button
                      onClick={() => handleStartTest(test)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm shadow-emerald-600/20 cursor-pointer transition-all active:scale-95"
                    >
                      {userAttempt ? 'পুনরায় দিন' : 'পরীক্ষা দিন'}
                    </button>

                    {canDelete && (
                      <button
                        onClick={() => {
                          if (window.confirm('আপনি কি নিশ্চিত যে এই মডেল টেস্টটি মুছে ফেলতে চান?')) {
                            deleteModelTest(test.id);
                            showToast('মডেল টেস্ট মুছে ফেলা হয়েছে', 'info');
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
            );
          })}
        </div>
      )}

      {/* Result & Scorecard Modal */}
      {isReviewOpen && resultAttempt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 border border-white/20">
                  {resultAttempt.unit}
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  {resultAttempt.testTitle} - স্কোরকার্ড ও উত্তরমালা
                </h3>
              </div>
              <button
                onClick={() => setIsReviewOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white rounded-xl hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scorecard Stats Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-xs text-slate-500 block">প্রাপ্ত নম্বর</span>
                <span className="text-xl font-black text-blue-600">{resultAttempt.score}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-xs text-emerald-600 font-bold block">সঠিক উত্তর</span>
                <span className="text-xl font-black text-emerald-600">{resultAttempt.correctAnswers}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-xs text-rose-600 font-bold block">ভুল উত্তর</span>
                <span className="text-xl font-black text-rose-600">{resultAttempt.wrongAnswers}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-xs text-slate-500 block">মোট প্রশ্ন</span>
                <span className="text-xl font-black text-slate-700">{resultAttempt.totalQuestions}</span>
              </div>
            </div>

            {/* Detailed Question Review List */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                প্রশ্নের বিস্তারিত বিশ্লেষণ ও ব্যাখ্যা
              </h4>

              {(() => {
                const testObj = tests.find((t) => t.id === resultAttempt.testId);
                if (!testObj) return <p className="text-xs text-slate-500">প্রশ্নের ডাটা পাওয়া যায়নি।</p>;

                return testObj.questions.map((q, idx) => {
                  const studentAnswer = resultAttempt.answers[q.id];
                  const isCorrect = studentAnswer === q.correctOption;
                  const isUnanswered = studentAnswer === undefined;
                  const labelLetters = ['ক', 'খ', 'গ', 'ঘ'];

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border ${
                        isUnanswered
                          ? 'bg-slate-50 border-slate-200'
                          : isCorrect
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-rose-50/50 border-rose-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-slate-800">
                          {idx + 1}. {q.question}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          isUnanswered
                            ? 'bg-slate-200 text-slate-700'
                            : isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-600 text-white'
                        }`}>
                          {isUnanswered ? 'উত্তর দেননি' : isCorrect ? 'সঠিক' : 'ভুল'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mt-2">
                        {q.options.map((opt, optIdx) => {
                          const isOptCorrect = optIdx === q.correctOption;
                          const isOptSelected = optIdx === studentAnswer;

                          return (
                            <div
                              key={optIdx}
                              className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                                isOptCorrect
                                  ? 'bg-emerald-100/80 border-emerald-300 text-emerald-900 font-bold'
                                  : isOptSelected && !isCorrect
                                  ? 'bg-rose-100 border-rose-300 text-rose-900 font-semibold'
                                  : 'bg-white border-slate-200 text-slate-600'
                              }`}
                            >
                              <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px] font-bold">
                                {labelLetters[optIdx]}
                              </span>
                              <span>{opt}</span>
                            </div>
                          );
                        })}
                      </div>

                      {q.explanation && (
                        <div className="mt-3 p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600">
                          <strong className="text-blue-700">ব্যাখ্যা: </strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setIsReviewOpen(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teacher / Admin Create Model Test Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">নতুন মডেল টেস্ট তৈরি করুন</h3>
                  <span className="text-[11px] text-slate-500">প্রশ্নপত্র ও উত্তরমালা সেটিং</span>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModelTest} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">পরীক্ষার শিরোনাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: পদার্থবিজ্ঞান ১ম পত্র - গতিবিদ্যা ও বলবিদ্যা টেস্ট"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ভর্তি ইউনিট *</label>
                  <select
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value as UnitType)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 bg-white"
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
                    placeholder="যেমন: গণিত / Physics"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">সময় (মিনিট)</label>
                  <input
                    type="number"
                    min={1}
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পাস মার্কস</label>
                  <input
                    type="number"
                    min={0}
                    value={newPassMarks}
                    onChange={(e) => setNewPassMarks(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">নেগেটিভ মার্কিং</label>
                  <input
                    type="number"
                    step="0.05"
                    min={0}
                    value={newNegativeMarking}
                    onChange={(e) => setNewNegativeMarking(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Dynamic Questions Builder */}
              <div className="pt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    প্রশ্নপত্র তৈরি করুন ({newQuestions.length} টি প্রশ্ন)
                  </h4>
                  <button
                    type="button"
                    onClick={addAnotherQuestion}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ আরও প্রশ্ন যোগ করুন</span>
                  </button>
                </div>

                {newQuestions.map((q, qIdx) => (
                  <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-800">
                        প্রশ্ন নং {qIdx + 1}
                      </span>
                      {newQuestions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(qIdx)}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      required
                      placeholder={`প্রশ্ন নং ${qIdx + 1} লিখুন...`}
                      value={q.question}
                      onChange={(e) => {
                        const updated = [...newQuestions];
                        updated[qIdx].question = e.target.value;
                        setNewQuestions(updated);
                      }}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    />

                    {/* 4 Options with Radio for correct */}
                    <div className="space-y-2">
                      <span className="text-[11px] text-slate-500 font-semibold block">
                        ৪টি অপশন লিখুন এবং সঠিক উত্তরের বৃত্ত চিহ্নিত করুন:
                      </span>
                      {['ক', 'খ', 'গ', 'ঘ'].map((label, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${q.id}`}
                            checked={q.correctOption === optIdx}
                            onChange={() => {
                              const updated = [...newQuestions];
                              updated[qIdx].correctOption = optIdx;
                              setNewQuestions(updated);
                            }}
                            className="w-4 h-4 text-emerald-600 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-slate-600 w-4">{label}.</span>
                          <input
                            type="text"
                            required
                            placeholder={`অপশন ${label} এর মান`}
                            value={q.options[optIdx]}
                            onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                            className="flex-1 px-3 py-1.5 border border-slate-200 rounded-xl text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                          />
                        </div>
                      ))}
                    </div>

                    <input
                      type="text"
                      placeholder="ব্যাখ্যা (ঐচ্ছিক)"
                      value={q.explanation || ''}
                      onChange={(e) => {
                        const updated = [...newQuestions];
                        updated[qIdx].explanation = e.target.value;
                        setNewQuestions(updated);
                      }}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  মডেল টেস্ট প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
