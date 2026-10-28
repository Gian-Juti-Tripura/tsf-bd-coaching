import React, { useState } from 'react';
import { Student, AttendanceRecord } from '../types';
import {
  UserCheck,
  UserX,
  Clock,
  Calendar,
  CheckCircle2,
  Save,
  Filter,
  Users,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AttendanceViewProps {
  students: Student[];
  lang: 'bn' | 'en';
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  students,
  lang
}) => {
  const { saveAttendanceRecords, showToast } = useApp();
  const [selectedBatch, setSelectedBatch] = useState('A-Unit Padma Batch (Science)');
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [attendanceState, setAttendanceState] = useState<
    Record<string, 'Present' | 'Absent' | 'Late'>
  >(() => {
    const initial: Record<string, 'Present' | 'Absent' | 'Late'> = {};
    students.forEach((s) => {
      initial[s.studentUid] = 'Present';
    });
    return initial;
  });

  const batchStudents = students.filter(
    (s) => s.batchName === selectedBatch || selectedBatch === 'All'
  );

  const handleStatusChange = (
    studentUid: string,
    status: 'Present' | 'Absent' | 'Late'
  ) => {
    setAttendanceState((prev) => ({
      ...prev,
      [studentUid]: status
    }));
  };

  const handleMarkAll = (status: 'Present' | 'Absent' | 'Late') => {
    setAttendanceState((prev) => {
      const updated = { ...prev };
      batchStudents.forEach((s) => {
        updated[s.studentUid] = status;
      });
      return updated;
    });
    showToast(
      lang === 'bn'
        ? `সকল শিক্ষার্থীকে ${status === 'Present' ? 'উপস্থিত' : status === 'Absent' ? 'অনুপস্থিত' : 'দেরি'} চিহ্নিত করা হয়েছে`
        : `Marked all students as ${status}`
    );
  };

  const handleSave = () => {
    const records: AttendanceRecord[] = batchStudents.map((s) => ({
      id: `att-${Date.now()}-${s.studentUid}`,
      routineId: 'routine-session',
      date: attendanceDate,
      batchId: s.batchId || 'batch-01',
      batchName: s.batchName,
      studentId: s.id,
      studentUid: s.studentUid,
      studentName: s.name,
      status: attendanceState[s.studentUid] || 'Present'
    }));

    saveAttendanceRecords(records);
  };

  const presentCount = batchStudents.filter(
    (s) => (attendanceState[s.studentUid] || 'Present') === 'Present'
  ).length;
  const absentCount = batchStudents.filter(
    (s) => attendanceState[s.studentUid] === 'Absent'
  ).length;
  const lateCount = batchStudents.filter(
    (s) => attendanceState[s.studentUid] === 'Late'
  ).length;
  const attendanceRate = batchStudents.length
    ? Math.round((presentCount / batchStudents.length) * 100)
    : 100;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-900 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 fill-slate-900" />
              Teacher Workbench
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-sky-200 border border-white/20">
              Live Attendance Register
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'bn' ? 'দৈনিক ও ব্যাচভিত্তিক শিক্ষার্থী উপস্থিতি' : 'Daily & Batch Student Attendance'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200">
            {lang === 'bn'
              ? 'শিক্ষকদের জন্য ১-ক্লিকে দ্রুত হাজিরা গ্রহণ, অনুপস্থিতি পর্যবেক্ষণ ও ডাটাবেসে স্থায়ী সংরক্ষণ।'
              : 'Rapid 1-click batch attendance logging with persistent database synchronization.'}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-black rounded-2xl shadow-lg transition-all active:scale-95 shrink-0"
        >
          <Save className="w-4 h-4 text-slate-950" />
          <span>{lang === 'bn' ? 'উপস্থিতি ডাটাবেসে সেভ করুন' : 'Save Attendance to Database'}</span>
        </button>
      </div>

      {/* Control Bar: Date & Batch Filter */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="A-Unit Padma Batch (Science)">A-Unit Padma Batch (Science)</option>
              <option value="B-Unit Meghna Batch (Arts & Law)">B-Unit Meghna Batch (Arts & Law)</option>
              <option value="C-Unit Jamuna Batch (Business)">C-Unit Jamuna Batch (Business)</option>
              <option value="Nursing & Medical Elite Batch">Nursing & Medical Elite Batch</option>
              <option value="All">All Batches (সকল ব্যাচ)</option>
            </select>
          </div>
        </div>

        {/* 1-Click Quick Action Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="text-[11px] font-bold text-slate-400 uppercase hidden sm:inline">1-Click:</span>
          <button
            onClick={() => handleMarkAll('Present')}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 transition-colors"
          >
            ✓ Mark All Present
          </button>
          <button
            onClick={() => handleMarkAll('Absent')}
            className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors"
          >
            ✕ Mark All Absent
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Enrolled In Batch</span>
          <div className="text-2xl font-extrabold text-slate-900">{batchStudents.length}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase text-emerald-600">Present (উপস্থিত)</span>
          <div className="text-2xl font-extrabold text-emerald-600">{presentCount}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase text-rose-600">Absent (অনুপস্থিত)</span>
          <div className="text-2xl font-extrabold text-rose-600">{absentCount}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase text-blue-600">Attendance Rate</span>
          <div className="text-2xl font-extrabold text-blue-600">{attendanceRate}%</div>
        </div>
      </div>

      {/* Attendance Register Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>{selectedBatch} • Roster</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Date: {attendanceDate}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-y border-slate-100">
              <tr>
                <th className="py-3 px-4">Student & UID</th>
                <th className="py-3 px-4">Unit</th>
                <th className="py-3 px-4">Overall Rate</th>
                <th className="py-3 px-4 text-center">Attendance Marking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {batchStudents.map((s) => {
                const currentStatus = attendanceState[s.studentUid] || 'Present';
                const isLowAttendance = (s.totalAttendanceRate || 90) < 75;

                return (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">{s.name}</span>
                      <span className="font-mono text-[10px] text-blue-700">{s.studentUid}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 font-bold text-[10px]">
                        {s.admissionUnit}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-bold ${isLowAttendance ? 'text-rose-600' : 'text-slate-800'}`}>
                          {s.totalAttendanceRate || 95}%
                        </span>
                        {isLowAttendance && (
                          <span className="px-1.5 py-0.5 bg-rose-100 text-rose-700 text-[9px] font-extrabold rounded flex items-center gap-0.5">
                            <AlertTriangle className="w-2.5 h-2.5" /> Low
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                        <button
                          onClick={() => handleStatusChange(s.studentUid, 'Present')}
                          className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                            currentStatus === 'Present'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleStatusChange(s.studentUid, 'Late')}
                          className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                            currentStatus === 'Late'
                              ? 'bg-amber-500 text-white shadow-sm'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Late
                        </button>
                        <button
                          onClick={() => handleStatusChange(s.studentUid, 'Absent')}
                          className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                            currentStatus === 'Absent'
                              ? 'bg-rose-600 text-white shadow-sm'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
