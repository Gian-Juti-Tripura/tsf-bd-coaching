import React, { useState } from 'react';
import {
  Calculator,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  TrendingUp,
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface AdmissionCalculatorViewProps {
  lang: 'bn' | 'en';
}

export const AdmissionCalculatorView: React.FC<AdmissionCalculatorViewProps> = ({ lang }) => {
  const [targetCategory, setTargetCategory] = useState<'du' | 'medical' | 'nursing' | 'buet'>('du');
  const [sscGpa, setSscGpa] = useState<number>(5.0);
  const [hscGpa, setHscGpa] = useState<number>(5.0);
  const [expectedMcq, setExpectedMcq] = useState<number>(85);
  const [biologyGpa, setBiologyGpa] = useState<number>(5.0);
  const [isQuota, setIsQuota] = useState<boolean>(true); // TSF Tribal Quota default

  // Calculate scores based on authentic Bangladesh admission formulas
  const calculateDu = () => {
    // DU formula: SSC*2 + HSC*2 (Total 20) + Exam (100) = Total 120
    const gpaScore = sscGpa * 2 + hscGpa * 2;
    const totalScore = gpaScore + expectedMcq;
    const minGpaRequired = isQuota ? 7.5 : 8.0;
    const isEligible = sscGpa + hscGpa >= minGpaRequired && sscGpa >= 3.0 && hscGpa >= 3.0;

    return {
      gpaScore: gpaScore.toFixed(2),
      examScore: expectedMcq.toFixed(2),
      totalScore: totalScore.toFixed(2),
      maxTotal: 120,
      isEligible,
      minGpaText: isQuota ? 'ন্যূনতম ৭.৫০ (কোটা)' : 'ন্যূনতম ৮.০০ (সাধারণ)',
      notes: lang === 'bn'
        ? 'ঢাকা বিশ্ববিদ্যালয়ের আধুনিক নিয়ম অনুযায়ী এসএসসি ও এইচএসসি জিপিএ-কে ২ দিয়ে গুণ করে সর্বমোট ২০ নম্বর এবং ভর্তি পরীক্ষার ১০০ নম্বর সহ মোট ১২০ নম্বরে মূল্যায়ন করা হয়।'
        : 'According to DU admission circular, SSC & HSC GPA are multiplied by 2 (Max 20 points) + 100 marks MCQ test = Total 120 marks.'
    };
  };

  const calculateMedical = () => {
    // Medical formula: SSC*15 (75) + HSC*25 (125) = 200 from GPA + 100 Exam = Total 300
    const sscPoints = sscGpa * 15;
    const hscPoints = hscGpa * 25;
    const gpaScore = sscPoints + hscPoints;
    const totalScore = gpaScore + expectedMcq;
    const minCombinedGpa = isQuota ? 8.0 : 9.0;
    const isEligible = sscGpa + hscGpa >= minCombinedGpa && biologyGpa >= 4.0 && sscGpa >= 3.5 && hscGpa >= 3.5;

    return {
      gpaScore: gpaScore.toFixed(2),
      examScore: expectedMcq.toFixed(2),
      totalScore: totalScore.toFixed(2),
      maxTotal: 300,
      isEligible,
      minGpaText: isQuota ? 'মোট জিপিএ ৮.০০ ও বায়োলজিতে ৪.০০ (কোটা)' : 'মোট জিপিএ ৯.০০ ও বায়োলজিতে ৪.০০ (সাধারণ)',
      notes: lang === 'bn'
        ? 'সরকারি মেডিকেল ও ডেন্টাল কলেজে জিপিএ ২০০ (এসএসসি×১৫ + এইচএসসি×২৫) এবং লিখিত ১০০ নম্বরের পরীক্ষায় মোট ৩০০ নম্বরের ভিত্তিতে জাতীয় মেধা তালিকা তৈরি হয়।'
        : 'For Government Medical & Dental (MBBS/BDS), merit list is calculated out of 300 marks (SSC×15 + HSC×25 = 200 from GPA + 100 from Admission Test).'
    };
  };

  const calculateNursing = () => {
    // Nursing B.Sc formula: SSC*10 + HSC*10 (100) + 100 Exam = Total 200
    const gpaScore = sscGpa * 10 + hscGpa * 10;
    const totalScore = gpaScore + expectedMcq;
    const minGpa = isQuota ? 6.5 : 7.0;
    const isEligible = sscGpa + hscGpa >= minGpa && biologyGpa >= 3.0;

    return {
      gpaScore: gpaScore.toFixed(2),
      examScore: expectedMcq.toFixed(2),
      totalScore: totalScore.toFixed(2),
      maxTotal: 200,
      isEligible,
      minGpaText: isQuota ? 'মোট জিপিএ ৬.৫০ (কোটা)' : 'মোট জিপিএ ৭.০০ (বিজ্ঞান/বিএসসি)',
      notes: lang === 'bn'
        ? 'নার্সিং ও মিডওয়াইফারি অধিদপ্তরের অধীনে বিএসসি ইন নার্সিং-এ এসএসসি ও এইচএসসি জিপিএ ১০০ নম্বর (১০ গুণ করে) এবং ১০০ নম্বরের এমসিকিউ পরীক্ষায় মোট ২০০ নম্বরে মেধা তালিকা হয়।'
        : 'For B.Sc in Nursing, SSC & HSC GPA are multiplied by 10 (Total 100 from GPA) + 100 marks MCQ test = Total 200 marks.'
    };
  };

  const calculateBuet = () => {
    const isEligible = sscGpa === 5.0 && hscGpa === 5.0;
    return {
      gpaScore: (sscGpa + hscGpa).toFixed(2),
      examScore: expectedMcq.toFixed(2),
      totalScore: (expectedMcq * 4).toFixed(2),
      maxTotal: 400,
      isEligible,
      minGpaText: 'এসএসসি ও এইচএসসি উভয়টিতে জিপিএ ৫.০০ এবং পদার্থ, রসায়ন, গণিতে জিপিএ ৫.০০',
      notes: lang === 'bn'
        ? 'বুয়েটে প্রাক-নির্বাচনী পরীক্ষা এবং পরবর্তীতে চূড়ান্ত লিখিত পরীক্ষা (মূল্যায়ন ৪০০ নম্বর) অনুষ্ঠিত হয়।'
        : 'BUET pre-selection requires GPA 5.00 in Physics, Chemistry, and Math with final written exam of 400 marks.'
    };
  };

  const getResult = () => {
    switch (targetCategory) {
      case 'du':
        return calculateDu();
      case 'medical':
        return calculateMedical();
      case 'nursing':
        return calculateNursing();
      case 'buet':
        return calculateBuet();
    }
  };

  const res = getResult();

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-900 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 fill-slate-900" />
              Admission Intelligence Tool
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-sky-200 border border-white/20">
              Session 2026–27
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'bn' ? 'বিশ্ববিদ্যালয় ও নার্সিং ভর্তি স্কোর ক্যালকুলেটর' : 'Admission Eligibility & Merit Score Calculator'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200">
            {lang === 'bn'
              ? 'ঢাকা বিশ্ববিদ্যালয়, মেডিকেল (MBBS/BDS), নার্সিং ও বুয়েটের অফিসিয়াল নিয়মানুযায়ী জিপিএ নম্বর, ন্যূনতম যোগ্যতা এবং সামগ্রিক মেধা স্কোর যাচাই করুন।'
              : 'Calculate your official aggregate admission marks and verify eligibility for DU, Medical, Nursing & BUET.'}
          </p>
        </div>
      </div>

      {/* Target Category Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'du', label: lang === 'bn' ? 'ঢাকা বিশ্ববিদ্যালয় (DU)' : 'Dhaka University (DU)', icon: GraduationCap },
          { id: 'medical', label: lang === 'bn' ? 'মেডিকেল (MBBS / BDS)' : 'Medical (MBBS / BDS)', icon: Award },
          { id: 'nursing', label: lang === 'bn' ? 'নার্সিং (B.Sc / Diploma)' : 'Nursing (B.Sc / Diploma)', icon: BookOpen },
          { id: 'buet', label: lang === 'bn' ? 'বুয়েট (BUET)' : 'BUET (Engineering)', icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = targetCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setTargetCategory(tab.id as any)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 shadow-sm ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
              <span className="text-xs font-extrabold">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Calculator Form & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Panel */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>{lang === 'bn' ? 'একাডেমিক জিপিএ ও আনুমানিক নম্বর দিন' : 'Enter Academic GPA & Test Marks'}</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">Automatic Calculations</span>
          </div>

          {/* SSC GPA Slider & Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700">{lang === 'bn' ? 'এসএসসি জিপিএ (SSC GPA)' : 'SSC GPA'}</label>
              <span className="font-mono font-extrabold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-200">
                {sscGpa.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="3.00"
              max="5.00"
              step="0.05"
              value={sscGpa}
              onChange={(e) => setSscGpa(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* HSC GPA Slider & Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700">{lang === 'bn' ? 'এইচএসসি জিপিএ (HSC GPA)' : 'HSC GPA'}</label>
              <span className="font-mono font-extrabold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-200">
                {hscGpa.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="3.00"
              max="5.00"
              step="0.05"
              value={hscGpa}
              onChange={(e) => setHscGpa(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Biology GPA (if Medical or Nursing) */}
          {(targetCategory === 'medical' || targetCategory === 'nursing') && (
            <div className="space-y-1.5 bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-emerald-900">{lang === 'bn' ? 'জীববিজ্ঞান জিপিএ (Biology GPA)' : 'Biology GPA'}</label>
                <span className="font-mono font-extrabold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-lg text-sm border border-emerald-300">
                  {biologyGpa.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="3.00"
                max="5.00"
                step="0.25"
                value={biologyGpa}
                onChange={(e) => setBiologyGpa(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <span className="text-[10px] text-emerald-700 font-medium block">
                {lang === 'bn' ? 'মেডিকেলে ন্যূনতম ৪.০০ ও নার্সিংয়ে ৩.০০ থাকা আবশ্যক।' : 'Min 4.00 for Medical & 3.00 for Nursing required.'}
              </span>
            </div>
          )}

          {/* Expected MCQ Admission Marks */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700">
                {lang === 'bn' ? 'ভর্তি পরীক্ষায় আনুমানিক প্রাপ্ত নম্বর (MCQ Test Marks)' : 'Expected Admission Test Marks (100)'}
              </label>
              <span className="font-mono font-extrabold px-2 py-0.5 bg-amber-50 text-amber-700 rounded-lg text-sm border border-amber-200">
                {expectedMcq} / 100
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="1"
              value={expectedMcq}
              onChange={(e) => setExpectedMcq(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Quota Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={isQuota}
                onChange={(e) => setIsQuota(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded accent-blue-600"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  {lang === 'bn' ? 'ক্ষুদ্র নৃ-গোষ্ঠী / পার্বত্য জেলা কোটা (TSF Tribal Quota)' : 'Tribal / Hill Tracts Quota'}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {lang === 'bn' ? 'কোটার জন্য ন্যূনতম জিপিএ শিথিলযোগ্য।' : 'Relaxed minimum GPA eligibility criteria applied.'}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Right Output Results Panel */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                {lang === 'bn' ? 'আপনার মেধা স্কোর ও যোগ্যতার ফলাফল' : 'Eligibility & Merit Evaluation Result'}
              </h3>
              <div className="flex items-center gap-1.5">
                {res.isEligible ? (
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-extrabold rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {lang === 'bn' ? 'আবেদনের যোগ্য' : 'ELIGIBLE'}
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 text-[11px] font-extrabold rounded-full flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> {lang === 'bn' ? 'যোগ্যতা পূর্ণ হয়নি' : 'NOT ELIGIBLE'}
                  </span>
                )}
              </div>
            </div>

            {/* Big Aggregate Score Hero Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white shadow-lg space-y-3">
              <span className="text-[11px] font-extrabold text-blue-300 uppercase tracking-wider block">
                {lang === 'bn' ? 'সর্বমোট সামগ্রিক মেধা স্কোর' : 'Total Aggregate Merit Marks'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tight">
                  {res.totalScore}
                </span>
                <span className="text-sm font-bold text-slate-400">/ {res.maxTotal}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">GPA Points Contribution</span>
                  <span className="font-extrabold text-white text-base">{res.gpaScore}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Exam MCQ Score</span>
                  <span className="font-extrabold text-white text-base">{res.examScore}</span>
                </div>
              </div>
            </div>

            {/* Criteria & Explanation Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-bold">
                    {lang === 'bn' ? 'অফিসিয়াল ভর্তি পরীক্ষার নিয়ম:' : 'Official Admission Rules:'}
                  </strong>
                  <p className="text-slate-600 text-[11px] leading-relaxed mt-0.5 font-bangla">
                    {res.notes}
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">ন্যূনতম যোগ্যতা শর্ত:</span>
                <span className="font-bold text-slate-800">{res.minGpaText}</span>
              </div>
            </div>
          </div>

          {/* Footer Target Recommendation */}
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-blue-950 block">টিএসএফ পরামর্শ:</span>
              <span className="text-[11px] text-blue-700">
                {parseFloat(res.totalScore) > res.maxTotal * 0.75
                  ? 'আপনার স্কোর খুবই সন্তোষজনক! শীর্ষ বিশ্ববিদ্যালয়ে মেধা তালিকায় থাকার উজ্জ্বল সম্ভাবনা।'
                  : 'নিয়মিত মডেল টেস্ট ও ভুল প্রশ্নের রিভিউতে আরও বেশি নজর দিন।'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
