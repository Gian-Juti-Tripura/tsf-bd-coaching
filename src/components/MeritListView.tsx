import React, { useState } from 'react';
import { ExamAttempt, Exam } from '../types';
import {
  Trophy,
  Medal,
  Award,
  Filter,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';

interface MeritListViewProps {
  attempts: ExamAttempt[];
  exams: Exam[];
  lang: 'bn' | 'en';
}

export const MeritListView: React.FC<MeritListViewProps> = ({
  attempts,
  exams,
  lang
}) => {
  const [selectedExamId, setSelectedExamId] = useState<string>('exam-01');

  // Filter attempts for selected exam and apply server-standard tie-breaking rule:
  // 1. Total marks obtained (Descending)
  // 2. Least incorrect answers count (Ascending)
  // 3. Time spent in seconds (Ascending)
  const sortedAttempts = [...attempts]
    .filter((a) => a.examId === selectedExamId)
    .sort((a, b) => {
      const bMarks = b.totalMarksObtained ?? b.score ?? 0;
      const aMarks = a.totalMarksObtained ?? a.score ?? 0;
      if (bMarks !== aMarks) {
        return bMarks - aMarks;
      }
      const aWrong = a.incorrectAnswersCount ?? a.wrongAnswers ?? 0;
      const bWrong = b.incorrectAnswersCount ?? b.wrongAnswers ?? 0;
      if (aWrong !== bWrong) {
        return aWrong - bWrong;
      }
      const aTime = a.timeSpentSeconds ?? 0;
      const bTime = b.timeSpentSeconds ?? 0;
      return aTime - bTime;
    });

  const activeExam = exams.find((e) => e.id === selectedExamId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <h1 className="text-xl font-bold text-slate-900">
              {lang === 'bn' ? 'অফিসিয়াল মেধা তালিকা ও র‍্যাংকিং' : 'Official Merit List & Batch Rankings'}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'bn'
              ? 'টাই-ব্রেকিং পলিসি: প্রাপ্ত নম্বর > সর্বনিম্ন ভুল উত্তর > দ্রুততম সাবমিশন'
              : 'Consistent tie-breaking policy: Highest Marks > Least Negative Marks > Time Spent'}
          </p>
        </div>

        {/* Exam Selector */}
        <div className="w-full sm:w-72">
          <select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
          >
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top 3 Podium Highlights */}
      {sortedAttempts.length >= 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Rank 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-center relative flex flex-col justify-between order-2 sm:order-1">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 border border-slate-300 flex items-center justify-center mx-auto font-extrabold text-lg">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900">{sortedAttempts[1].studentName}</h3>
              <p className="font-mono text-xs text-blue-700 font-bold">{sortedAttempts[1].studentUid}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-around text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Marks</span>
                <span className="font-bold text-slate-800">{sortedAttempts[1].totalMarksObtained}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Accuracy</span>
                <span className="font-bold text-emerald-600">{sortedAttempts[1].percentage}%</span>
              </div>
            </div>
          </div>

          {/* Rank 1 */}
          <div className="bg-gradient-to-b from-amber-50 to-white rounded-2xl border-2 border-amber-300 p-6 shadow-md text-center relative flex flex-col justify-between order-1 sm:order-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 font-extrabold text-[11px] px-3 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow">
              <Sparkles className="w-3 h-3" /> Champion
            </div>
            <div className="space-y-2 mt-1">
              <div className="w-14 h-14 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center mx-auto font-extrabold text-xl shadow">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900">{sortedAttempts[0].studentName}</h3>
              <p className="font-mono text-xs text-blue-700 font-bold">{sortedAttempts[0].studentUid}</p>
              <span className="text-xs text-slate-500 font-medium">{sortedAttempts[0].batchName}</span>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-around text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Marks</span>
                <span className="font-extrabold text-amber-700 text-base">
                  {sortedAttempts[0].totalMarksObtained}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Percentage</span>
                <span className="font-extrabold text-emerald-600 text-base">
                  {sortedAttempts[0].percentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Rank 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-center relative flex flex-col justify-between order-3 sm:order-3">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center justify-center mx-auto font-extrabold text-lg">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900">{sortedAttempts[2].studentName}</h3>
              <p className="font-mono text-xs text-blue-700 font-bold">{sortedAttempts[2].studentUid}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-around text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Marks</span>
                <span className="font-bold text-slate-800">{sortedAttempts[2].totalMarksObtained}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Accuracy</span>
                <span className="font-bold text-emerald-600">{sortedAttempts[2].percentage}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rankings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Merit Rank</th>
                <th className="py-3 px-4">Student UID</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Batch</th>
                <th className="py-3 px-4 text-center">Correct / Wrong</th>
                <th className="py-3 px-4">Obtained Marks</th>
                <th className="py-3 px-4">Percentage</th>
                <th className="py-3 px-4">Time Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedAttempts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No examination submissions published for this test yet.
                  </td>
                </tr>
              ) : (
                sortedAttempts.map((attempt, index) => {
                  const rank = index + 1;
                  return (
                    <tr
                      key={attempt.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        rank === 1
                          ? 'bg-amber-50/30'
                          : rank <= 3
                          ? 'bg-blue-50/20'
                          : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold">
                        <div className="flex items-center gap-1.5">
                          {rank === 1 && <span className="text-amber-500 font-extrabold">🥇 1st</span>}
                          {rank === 2 && <span className="text-slate-500 font-extrabold">🥈 2nd</span>}
                          {rank === 3 && <span className="text-amber-700 font-extrabold">🥉 3rd</span>}
                          {rank > 3 && <span className="text-slate-700 font-bold">#{rank}</span>}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                        {attempt.studentUid}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {attempt.studentName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {attempt.batchName}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="text-emerald-700 font-bold">{attempt.correctAnswersCount}</span>
                        {' / '}
                        <span className="text-rose-600 font-bold">{attempt.incorrectAnswersCount}</span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-blue-900 text-sm">
                        {attempt.totalMarksObtained}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-emerald-700">{attempt.percentage}%</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono">
                        {Math.floor((attempt.timeSpentSeconds ?? 0) / 60)}m {(attempt.timeSpentSeconds ?? 0) % 60}s
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
