import React, { useState } from 'react';
import { Student } from '../types';
import {
  X,
  Printer,
  Download,
  QrCode,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  Calendar,
  Phone,
  Droplet,
  CheckCircle2,
  Award,
  IdCard,
  FileCheck
} from 'lucide-react';
import { TSFLogo } from './TSFLogo';

interface StudentIDCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  lang: 'bn' | 'en';
}

export const StudentIDCardModal: React.FC<StudentIDCardModalProps> = ({
  isOpen,
  onClose,
  student,
  lang
}) => {
  const [cardType, setCardType] = useState<'id' | 'admit'>('id');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden print:shadow-none print:border-none print:max-w-none">
        {/* Header bar - Hidden in print */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400">
              {cardType === 'id' ? <IdCard className="w-5 h-5" /> : <FileCheck className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base font-bold">
                {cardType === 'id'
                  ? (lang === 'bn' ? 'ডিজিটাল স্মার্ট স্টুডেন্ট আইডি কার্ড' : 'Digital Smart Student ID Card')
                  : (lang === 'bn' ? 'ভর্তি মডেল টেস্ট এডমিট কার্ড ২০২৬' : 'Model Test Official Admit Card 2026')}
              </h2>
              <p className="text-xs text-slate-400">
                TSF.BD Central Admission Secretariat • Verified Credential
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'প্রিন্ট / PDF' : 'Print / PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher - Hidden in print */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 py-2.5 print:hidden gap-3">
          <button
            onClick={() => setCardType('id')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              cardType === 'id'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <IdCard className="w-4 h-4" />
            <span>{lang === 'bn' ? 'স্মার্ট আইডি কার্ড' : 'Student ID Card'}</span>
          </button>
          <button
            onClick={() => setCardType('admit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              cardType === 'admit'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>{lang === 'bn' ? 'পরীক্ষার এডমিট কার্ড' : 'Exam Admit Card'}</span>
          </button>
        </div>

        {/* Card Canvas Container */}
        <div className="p-6 flex justify-center bg-slate-100/70 print:p-0 print:bg-transparent">
          {cardType === 'id' ? (
            /* OFFICIAL SMART STUDENT ID CARD */
            <div className="w-[380px] sm:w-[420px] rounded-3xl bg-white shadow-xl border-2 border-blue-900 overflow-hidden relative font-sans flex flex-col print:shadow-none print:border-2">
              {/* Top Banner with Flag Colors */}
              <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-5 text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />
                <div className="flex items-center justify-between relative z-10">
                  <TSFLogo className="w-12 h-12 shadow-sm" />
                  <div className="text-right">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase tracking-wider block w-fit ml-auto">
                      SESSION 2026–27
                    </span>
                    <span className="text-[11px] font-bangla font-semibold text-sky-200 block mt-1">
                      ঐক্য • শিক্ষা • প্রগতি
                    </span>
                  </div>
                </div>

                <div className="mt-3 relative z-10 text-left">
                  <h3 className="text-sm font-extrabold tracking-tight text-white leading-tight">
                    ত্রিপুরা স্টুডেন্টস ফোরাম (টিএসএফ.বিডি)
                  </h3>
                  <p className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">
                    TSF.BD Central Admission Coaching Program
                  </p>
                </div>
              </div>

              {/* Photo & Main Details */}
              <div className="p-5 flex-1 space-y-4 bg-white relative">
                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                  <TSFLogo className="w-56 h-56" />
                </div>

                <div className="flex gap-4 items-start relative z-10">
                  {/* Photo & Blood Group */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-24 h-28 rounded-2xl bg-gradient-to-tr from-slate-200 to-slate-100 border-2 border-blue-900 overflow-hidden shadow-md flex items-center justify-center relative">
                      {student.avatarUrl ? (
                        <img
                          src={student.avatarUrl}
                          alt={student.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-2">
                          <GraduationCap className="w-10 h-10 text-blue-800 mx-auto" />
                          <span className="text-[9px] font-bold text-slate-600 block mt-1">VERIFIED</span>
                        </div>
                      )}
                      <div className="absolute bottom-0 inset-x-0 bg-blue-900/90 text-[8px] font-bold text-white text-center py-0.5">
                        {student.status.toUpperCase()}
                      </div>
                    </div>

                    {student.bloodGroup && (
                      <span className="mt-2 px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-extrabold rounded-full flex items-center gap-1">
                        <Droplet className="w-3 h-3 fill-rose-600 text-rose-600" />
                        {student.bloodGroup}
                      </span>
                    )}
                  </div>

                  {/* Identification Meta */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 leading-tight">
                        {student.name}
                      </h4>
                      <p className="text-[11px] font-mono font-bold text-blue-700 tracking-wider">
                        {student.studentUid}
                      </p>
                    </div>

                    <div className="pt-1 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Target Unit</span>
                        <span className="font-bold text-slate-900 px-2 py-0.5 rounded bg-blue-50 text-[11px] text-blue-900 border border-blue-100">
                          {student.admissionUnit}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Batch</span>
                        <span className="font-semibold text-slate-800 text-[11px] truncate max-w-[150px]">
                          {student.batchName}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Father's Name</span>
                        <span className="font-semibold text-slate-800 text-[11px] truncate max-w-[150px]">
                          {student.fatherName}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Emergency Phone</span>
                        <span className="font-mono text-slate-800 text-[11px]">
                          {student.guardianPhone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Barcode & Security Hologram */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between relative z-10">
                  <div className="space-y-1">
                    {/* Simulated Code-128 Barcode */}
                    <div className="flex items-end h-7 gap-[2px]">
                      {[4,2,3,1,4,2,1,3,2,4,1,3,2,1,4,3,2,1,3,4,2,1,3,2,4,1,3].map((w, idx) => (
                        <div
                          key={idx}
                          style={{ width: `${w}px` }}
                          className={`h-full ${idx % 2 === 0 ? 'bg-slate-900' : 'bg-transparent'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 block">
                      {student.studentUid}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="w-16 h-6 border-b border-slate-700 mx-auto" />
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
                      Authorized Signature
                    </span>
                    <span className="text-[8px] text-emerald-600 font-semibold flex items-center justify-end gap-0.5">
                      <ShieldCheck className="w-2.5 h-2.5" /> Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="bg-slate-900 text-white text-[9px] py-1.5 px-4 flex items-center justify-between font-medium">
                <span>TSF.BD Central Office, Dhaka</span>
                <span>Valid: Dec 2026 – Aug 2027</span>
              </div>
            </div>
          ) : (
            /* OFFICIAL MODEL TEST ADMIT CARD */
            <div className="w-full max-w-[500px] rounded-3xl bg-white shadow-xl border-2 border-slate-800 p-6 font-sans space-y-4 print:shadow-none print:border print:max-w-none">
              {/* Top Secretariat Header */}
              <div className="text-center border-b-2 border-slate-800 pb-3 space-y-1">
                <div className="flex items-center justify-center gap-3">
                  <TSFLogo className="w-10 h-10" />
                  <div>
                    <h3 className="text-base font-black text-slate-900 leading-tight">
                      ত্রিপুরা স্টুডেন্টস ফোরাম (টিএসএফ.বিডি)
                    </h3>
                    <p className="text-xs font-bold text-blue-900">
                      TSF.BD Central Admission Examination Board
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <span className="px-3 py-1 bg-slate-900 text-white text-[11px] font-extrabold rounded-full uppercase tracking-wider">
                    Official Model Test Admit Card • 2026
                  </span>
                </div>
              </div>

              {/* Student Identification Grid */}
              <div className="grid grid-cols-3 gap-4 py-2 border-b border-slate-200">
                <div className="col-span-2 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Candidate Name</span>
                    <span className="text-sm font-extrabold text-slate-900">{student.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Student UID</span>
                      <span className="font-mono font-bold text-blue-700">{student.studentUid}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Target Unit</span>
                      <span className="font-bold text-slate-900">{student.admissionUnit}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Enrolled Batch</span>
                    <span className="font-semibold text-slate-800">{student.batchName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Exam Center</span>
                    <span className="font-semibold text-slate-800">TSF Central Digital Lab / Live Online CBT</span>
                  </div>
                </div>

                {/* Photo & QR Code */}
                <div className="flex flex-col items-center justify-between border-l border-slate-200 pl-4 space-y-2">
                  <div className="w-20 h-24 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center overflow-hidden">
                    {student.avatarUrl ? (
                      <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                    ) : (
                      <GraduationCap className="w-8 h-8 text-slate-400" />
                    )}
                  </div>
                  <div className="p-1 bg-white border border-slate-300 rounded-lg shadow-sm">
                    <QrCode className="w-12 h-12 text-slate-800" />
                  </div>
                </div>
              </div>

              {/* Exam Rules & Instructions */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[10px] text-slate-600 space-y-1">
                <span className="font-bold text-slate-900 block uppercase">পরীক্ষার জরুরি নির্দেশনাবলী:</span>
                <ul className="list-disc pl-4 space-y-0.5 font-bangla">
                  <li>পরীক্ষা শুরু হওয়ার অন্তত ১৫ মিনিট পূর্বে উপস্থিত বা পোর্টালে লগইন করতে হবে।</li>
                  <li>প্রতিটি ভুল উত্তরের জন্য ০.২৫ নম্বর কর্তন (Negative Marking) করা হবে।</li>
                  <li>এডমিট কার্ডের কিউআর কোড স্ক্যান করে অনলাইন সত্যতা যাচাই করা যাবে।</li>
                </ul>
              </div>

              {/* Signature Blocks */}
              <div className="pt-4 flex items-end justify-between text-center">
                <div>
                  <div className="w-28 border-b border-slate-700 mb-1" />
                  <span className="text-[9px] font-bold text-slate-600 block">Candidate Signature</span>
                </div>
                <div>
                  <div className="w-28 border-b border-slate-700 mb-1" />
                  <span className="text-[9px] font-bold text-slate-600 block">Controller of Examinations</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info - Hidden in print */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 print:hidden">
          <span>Official TSF.BD Digital Document Engine</span>
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
