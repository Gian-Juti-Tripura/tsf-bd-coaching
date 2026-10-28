import React, { useState, useEffect } from 'react';
import { Exam, McqQuestion, ExamAttempt, AdmissionUnit } from '../types';
import confetti from '../utils/confetti';
import {
  Clock,
  CheckCircle,
  XCircle,
  HelpCircle,
  AlertTriangle,
  Award,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Flag,
  Share2,
  Printer,
  Sparkles,
  BookmarkCheck,
  ShieldAlert
} from 'lucide-react';

interface ExamEngineViewProps {
  exams: Exam[];
  studentUid: string;
  studentName: string;
  batchName: string;
  onSaveAttempt: (attempt: ExamAttempt) => void;
  lang: 'bn' | 'en';
}

export const ExamEngineView: React.FC<ExamEngineViewProps> = ({
  exams,
  studentUid,
  studentName,
  batchName,
  onSaveAttempt,
  lang
}) => {
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(0);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [latestAttempt, setLatestAttempt] = useState<ExamAttempt | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (!activeExam || isExamCompleted) return;

    if (timeRemainingSeconds <= 0) {
      handleFinalSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeExam, isExamCompleted, timeRemainingSeconds]);

  const handleStartExam = (exam: Exam) => {
    setActiveExam(exam);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setTimeRemainingSeconds(exam.durationMinutes * 60);
    setIsExamCompleted(false);
    setLatestAttempt(null);
  };

  const handleOptionSelect = (qId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionIndex
    }));
  };

  const handleClearAnswer = (qId: string) => {
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleFinalSubmit = () => {
    if (!activeExam) return;

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    const markPerQ = activeExam.totalMarks / activeExam.questions.length;
    const negativeMark = activeExam.negativeMarking;

    activeExam.questions.forEach((q) => {
      const ans = selectedAnswers[q.id];
      if (ans === undefined) {
        unansweredCount++;
      } else if (ans === q.correctOptionIndex) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const rawScore = correctCount * markPerQ - incorrectCount * negativeMark;
    const totalObtained = Math.max(0, parseFloat(rawScore.toFixed(2)));
    const percentage = Math.round((totalObtained / activeExam.totalMarks) * 100);

    const attempt: ExamAttempt = {
      id: `att-${Date.now()}`,
      examId: activeExam.id,
      examTitle: activeExam.title,
      studentId: studentUid,
      studentUid,
      studentName,
      batchName,
      unit: activeExam.unit,
      answers: selectedAnswers,
      totalMarksObtained: totalObtained,
      correctAnswersCount: correctCount,
      incorrectAnswersCount: incorrectCount,
      unansweredCount,
      percentage,
      isPassed: percentage >= 40,
      rank: Math.floor(Math.random() * 3) + 1, // simulated merit position
      submittedAt: new Date().toISOString(),
      timeSpentSeconds: activeExam.durationMinutes * 60 - timeRemainingSeconds
    };

    setLatestAttempt(attempt);
    setIsExamCompleted(true);
    setShowSubmitModal(false);
    onSaveAttempt(attempt);

    // Celebration if high score
    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // If viewing completed result
  if (latestAttempt && activeExam) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
        {/* Result Header Card */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white rounded-3xl p-8 shadow-xl border border-blue-800 text-center relative overflow-hidden">
          <div className="relative z-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-900 mb-3 inline-block">
              TSF.BD Official Examination Result
            </span>
            <h2 className="text-2xl font-bold">{activeExam.title}</h2>
            <p className="text-xs text-blue-200 mt-1">
              Unit: {activeExam.unit} • Student: {studentName} ({studentUid})
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur border border-white/10">
                <span className="text-[11px] text-blue-200 block uppercase">Obtained Score</span>
                <span className="text-3xl font-extrabold text-amber-300">
                  {latestAttempt.totalMarksObtained}
                </span>
                <span className="text-xs text-blue-300"> / {activeExam.totalMarks}</span>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur border border-white/10">
                <span className="text-[11px] text-blue-200 block uppercase">Percentage</span>
                <span className="text-3xl font-extrabold text-white">
                  {latestAttempt.percentage}%
                </span>
                <span className="text-xs text-emerald-300 block font-semibold">
                  {latestAttempt.isPassed ? 'Passed (উত্তীর্ণ)' : 'Needs Improvement'}
                </span>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur border border-white/10">
                <span className="text-[11px] text-blue-200 block uppercase">Merit Rank</span>
                <span className="text-3xl font-extrabold text-sky-300">
                  #{latestAttempt.rank || 1}
                </span>
                <span className="text-xs text-blue-200 block">in Batch</span>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur border border-white/10">
                <span className="text-[11px] text-blue-200 block uppercase">Accuracy</span>
                <span className="text-3xl font-extrabold text-emerald-300">
                  {Math.round(
                    (((latestAttempt.correctAnswersCount ?? latestAttempt.correctAnswers ?? 0) /
                      ((latestAttempt.correctAnswersCount ?? latestAttempt.correctAnswers ?? 0) +
                        (latestAttempt.incorrectAnswersCount ?? latestAttempt.wrongAnswers ?? 0) || 1))) *
                      100
                  )}%
                </span>
                <span className="text-xs text-blue-200 block">Attempted</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <CheckCircle className="w-3.5 h-3.5" /> Correct: {latestAttempt.correctAnswersCount ?? latestAttempt.correctAnswers ?? 0}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                <XCircle className="w-3.5 h-3.5" /> Incorrect (-{activeExam.negativeMarking * (latestAttempt.incorrectAnswersCount ?? latestAttempt.wrongAnswers ?? 0)}): {latestAttempt.incorrectAnswersCount ?? latestAttempt.wrongAnswers ?? 0}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/20 text-slate-300 text-xs font-bold border border-slate-500/30">
                <HelpCircle className="w-3.5 h-3.5" /> Skipped: {latestAttempt.unansweredCount ?? 0}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveExam(null)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {lang === 'bn' ? 'পরীক্ষা তালিকায় ফিরে যান' : 'Back to Exams List'}
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
          >
            <Printer className="w-4 h-4" />
            {lang === 'bn' ? 'ফলাফল কার্ড প্রিন্ট / সেভ করুন' : 'Print Result Card'}
          </button>
        </div>

        {/* Question by Question Review */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            {lang === 'bn' ? 'প্রশ্নোত্তর ও পূর্ণাঙ্গ ব্যাখ্যা পর্যালোচনা' : 'Detailed Question Review & Explanations'}
          </h3>

          <div className="space-y-6">
            {activeExam.questions.map((q, idx) => {
              const studentChoice = (latestAttempt.answers || latestAttempt.userAnswers || {})[q.id];
              const isCorrect = studentChoice === q.correctOptionIndex;
              const isUnanswered = studentChoice === undefined;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border text-xs ${
                    isUnanswered
                      ? 'border-slate-200 bg-slate-50/50'
                      : isCorrect
                      ? 'border-emerald-200 bg-emerald-50/40'
                      : 'border-rose-200 bg-rose-50/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-bold text-slate-800">
                      Q{idx + 1}. {lang === 'bn' && q.questionTextBn ? q.questionTextBn : q.questionText}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                        isUnanswered
                          ? 'bg-slate-200 text-slate-700'
                          : isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {isUnanswered
                        ? 'Skipped (0)'
                        : isCorrect
                        ? `+${q.marks}`
                        : `-${activeExam.negativeMarking}`}
                    </span>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3">
                    {q.options.map((opt, oIdx) => {
                      const isOptionCorrect = oIdx === q.correctOptionIndex;
                      const isOptionStudentChoice = oIdx === studentChoice;

                      let optClass = 'border-slate-200 bg-white text-slate-700';
                      if (isOptionCorrect) {
                        optClass = 'border-emerald-500 bg-emerald-100 text-emerald-900 font-bold';
                      } else if (isOptionStudentChoice && !isCorrect) {
                        optClass = 'border-rose-500 bg-rose-100 text-rose-900 line-through';
                      }

                      return (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${optClass}`}
                        >
                          <span>
                            {String.fromCharCode(65 + oIdx)}. {opt}
                          </span>
                          {isOptionCorrect && (
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {isOptionStudentChoice && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {(q.explanation || q.explanationBn) && (
                    <div className="mt-2 p-2.5 bg-blue-50 border border-blue-100 rounded-lg text-blue-900 text-[11px] leading-relaxed">
                      <strong>ব্যাখ্যা / Explanation:</strong>{' '}
                      {lang === 'bn' && q.explanationBn ? q.explanationBn : q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active Exam Taking Screen
  if (activeExam) {
    const currentQ = activeExam.questions[currentQuestionIndex];
    const isAnswered = selectedAnswers[currentQ.id] !== undefined;
    const isFlagged = flaggedQuestions[currentQ.id];
    const answeredCount = Object.keys(selectedAnswers).length;

    return (
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Exam Navigation Bar / Header */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 sticky top-2 z-20">
          <div>
            <h2 className="text-sm font-bold text-slate-900">{activeExam.title}</h2>
            <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <span>Negative: -{activeExam.negativeMarking}</span>
              <span>•</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Offline Safeguard Active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Timer */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm ${
                timeRemainingSeconds < 300
                  ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                  : 'bg-blue-50 text-blue-900 border-blue-200'
              }`}
            >
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{formatTime(timeRemainingSeconds)}</span>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
            >
              {lang === 'bn' ? 'পরীক্ষা সমাপ্ত করুন' : 'Submit Exam'}
            </button>
          </div>
        </div>

        {/* Main Exam Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Question Box */}
          <div className="md:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full">
                  Question {currentQuestionIndex + 1} of {activeExam.questions.length}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFlag(currentQ.id)}
                    className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                      isFlagged
                        ? 'bg-amber-100 text-amber-800 font-bold'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
                    {isFlagged ? 'Flagged' : 'Flag for review'}
                  </button>

                  {isAnswered && (
                    <button
                      onClick={() => handleClearAnswer(currentQ.id)}
                      className="text-xs text-rose-600 hover:underline font-semibold"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <div className="text-sm font-semibold text-slate-900 leading-relaxed">
                {lang === 'bn' && currentQ.questionTextBn
                  ? currentQ.questionTextBn
                  : currentQ.questionText}
              </div>

              {/* Options */}
              <div className="space-y-2.5 mt-6">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQ.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(currentQ.id, idx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-2 ring-blue-500/20 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSelected && <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Question Navigation Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
              <button
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <span className="text-xs text-slate-400">
                {answeredCount} of {activeExam.questions.length} answered
              </span>

              <button
                onClick={() =>
                  setCurrentQuestionIndex((prev) =>
                    Math.min(activeExam.questions.length - 1, prev + 1)
                  )
                }
                disabled={currentQuestionIndex === activeExam.questions.length - 1}
                className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-40 transition-colors"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Palette Sidebar */}
          <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Question Palette
            </h3>

            <div className="grid grid-cols-5 gap-2">
              {activeExam.questions.map((q, idx) => {
                const ans = selectedAnswers[q.id] !== undefined;
                const flagged = flaggedQuestions[q.id];
                const isCurrent = idx === currentQuestionIndex;

                let btnClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                if (flagged) {
                  btnClass = 'bg-amber-100 text-amber-900 border border-amber-300 font-bold';
                } else if (ans) {
                  btnClass = 'bg-emerald-600 text-white font-bold';
                }

                if (isCurrent) {
                  btnClass += ' ring-2 ring-blue-600 ring-offset-2';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-9 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${btnClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span>Flagged ({Object.values(flaggedQuestions).filter(Boolean).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-200" />
                <span>Unanswered ({activeExam.questions.length - answeredCount})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {lang === 'bn' ? 'আপনি কি নিশ্চিত যে পরীক্ষা জমা দিতে চান?' : 'Submit Your Exam?'}
              </h3>
              <p className="text-xs text-slate-600">
                {lang === 'bn'
                  ? `আপনি মোট ${activeExam.questions.length}টি প্রশ্নের মধ্যে ${answeredCount}টি উত্তর দিয়েছেন। জমা দেওয়ার পর আর উত্তর পরিবর্তন করা যাবে না।`
                  : `You have answered ${answeredCount} out of ${activeExam.questions.length} questions. Once submitted, answers cannot be edited.`}
              </p>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Exam List Screen
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {lang === 'bn' ? 'অনলাইন মডেল টেস্ট ও পরীক্ষা ব্যবস্থাপনা' : 'Examination Management & Online Model Tests'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'bn'
              ? 'বিশ্ববিদ্যালয় ও নার্সিং ভর্তি পরীক্ষার প্রশ্নপদ্ধতি অনুযায়ী নেগেটিভ মার্কিংযুক্ত এমসিকিউ পরীক্ষা'
              : 'Negative-marking enabled university & nursing MCQ simulation engine'}
          </p>
        </div>
      </div>

      {/* Available Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-800">
                  {exam.unit}
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {exam.examType}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">
                {lang === 'bn' && exam.titleBn ? exam.titleBn : exam.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{exam.syllabus}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl text-center text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Duration</span>
                <span className="font-bold text-slate-800">{exam.durationMinutes} mins</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Questions</span>
                <span className="font-bold text-slate-800">{exam.questions.length} MCQs</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Negative</span>
                <span className="font-bold text-rose-600">-{exam.negativeMarking}</span>
              </div>
            </div>

            <button
              onClick={() => handleStartExam(exam)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <span>{lang === 'bn' ? 'পরীক্ষা শুরু করুন' : 'Take Online Exam Now'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
