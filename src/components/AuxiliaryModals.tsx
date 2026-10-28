import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FeeRecord, UnitType } from '../types';
import {
  X,
  IdCard,
  Calculator,
  Receipt,
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Building,
  Smartphone,
  ShieldCheck,
  Check
} from 'lucide-react';
import { TSFLogo } from './TSFLogo';

export const AuxiliaryModals: React.FC = () => {
  const {
    currentUser,
    isIdCardModalOpen,
    setIsIdCardModalOpen,
    isCalculatorModalOpen,
    setIsCalculatorModalOpen,
    isFeesModalOpen,
    setIsFeesModalOpen,
    isApkModalOpen,
    setIsApkModalOpen,
    fees,
    addFee,
    showToast
  } = useApp();

  // Admission Calculator State
  const [sscGpa, setSscGpa] = useState<number>(5.0);
  const [hscGpa, setHscGpa] = useState<number>(5.0);
  const [calcUnit, setCalcUnit] = useState<UnitType>('Science');

  // Fee Payment Form State
  const [feeAmount, setFeeAmount] = useState<number>(1000);
  const [feeType, setFeeType] = useState<FeeRecord['feeType']>('Monthly Tuition');
  const [paymentMethod, setPaymentMethod] = useState<FeeRecord['paymentMethod']>('bKash');
  const [trxId, setTrxId] = useState('');

  // 1. Digital Student ID Card Modal
  const renderIdCardModal = () => {
    if (!isIdCardModalOpen) return null;

    const studentName = currentUser?.name || 'শিক্ষার্থী (Student)';
    const studentEmail = currentUser?.email || 'student@tsf.org';
    const studentRole = currentUser?.role === 'super_admin' ? 'সুপার এডমিন' : currentUser?.role === 'teacher' ? 'শ্রদ্ধেয় শিক্ষক' : 'শিক্ষার্থী';
    const studentId = currentUser ? `TSF-2026-${currentUser.id.slice(-4).toUpperCase()}` : 'TSF-2026-DEMO';
    const units = currentUser?.enrolledUnits || ['Science', 'Nursing'];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-200">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <IdCard className="w-4 h-4 text-blue-400" />
              <span>ডিজিটাল স্মার্ট আইডি কার্ড</span>
            </span>
            <button
              onClick={() => setIsIdCardModalOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* ID Card Graphic */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white p-6 shadow-xl border border-blue-400/30 print:shadow-none">
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <div className="flex items-center gap-2.5">
                  <TSFLogo size={36} showText={false} />
                  <div>
                    <h3 className="text-xs font-black tracking-tight uppercase">Tripura Students Forum</h3>
                    <span className="text-[10px] text-blue-300 block font-bangla">এডমিশন কোচিং ২০২৬-২৭</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  SMART ID
                </span>
              </div>

              <div className="pt-5 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 border-2 border-white/30 text-white font-black text-2xl flex items-center justify-center shadow-md shrink-0">
                  {studentName.charAt(0)}
                </div>
                <div className="space-y-1 truncate">
                  <h4 className="font-extrabold text-base truncate">{studentName}</h4>
                  <div className="text-[11px] text-slate-300 font-mono">{studentId}</div>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    {studentRole}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                <div>
                  <span className="text-slate-400 block">জিমেইল এড্রেস:</span>
                  <span className="font-mono text-white truncate block">{studentEmail}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">এনরোল্ড ইউনিট:</span>
                  <span className="text-blue-300 font-semibold">{units.join(', ')}</span>
                </div>
              </div>

              {/* Barcode Graphic */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="font-mono text-[9px] tracking-widest text-slate-400">
                  ||||| | |||| ||| ||||||| ||| |||||
                </div>
                <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> ভেরিফায়েড সদস্য
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>আইডি কার্ড প্রিন্ট করুন</span>
              </button>
              <button
                onClick={() => setIsIdCardModalOpen(false)}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 2. Admission Score Calculator Modal
  const renderCalculatorModal = () => {
    if (!isCalculatorModalOpen) return null;

    // Formulas:
    // DU: SSC GPA * 2 + HSC GPA * 2 = 20 (Total 120 with 100 exam)
    // Medical: SSC GPA * 15 + HSC GPA * 25 = 200 (Total 300 with 100 exam)
    // Nursing: SSC GPA * 10 + HSC GPA * 10 = 100 (Total 200 with 100 exam)
    // GST General: SSC GPA * 10 + HSC GPA * 10 = 100 (or custom)
    const duScore = ((sscGpa || 0) * 2 + (hscGpa || 0) * 2).toFixed(2);
    const medicalScore = ((sscGpa || 0) * 15 + (hscGpa || 0) * 25).toFixed(2);
    const nursingScore = ((sscGpa || 0) * 10 + (hscGpa || 0) * 10).toFixed(2);
    const totalGpa = ((sscGpa || 0) + (hscGpa || 0)).toFixed(2);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>বিশ্ববিদ্যালয় ও নার্সিং ভর্তি ক্যালকুলেটর</span>
            </span>
            <button
              onClick={() => setIsCalculatorModalOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  SSC GPA (সর্বোচ্চ ৫.০০) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="1.0"
                  max="5.0"
                  value={sscGpa}
                  onChange={(e) => setSscGpa(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  HSC GPA (সর্বোচ্চ ৫.০০) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="1.0"
                  max="5.0"
                  value={hscGpa}
                  onChange={(e) => setHscGpa(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Calculated Results */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-blue-900">ঢাকা বিশ্ববিদ্যালয় (DU) GPA স্কোর</h4>
                  <span className="text-[10px] text-blue-600">SSC × 2 + HSC × 2 (পূর্ণমান ২০)</span>
                </div>
                <div className="text-xl font-black text-blue-700">{duScore} / ২০</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-purple-900">সরকারি নার্সিং ভর্তি পরীক্ষা GPA স্কোর</h4>
                  <span className="text-[10px] text-purple-600">SSC × 10 + HSC × 10 (পূর্ণমান ১০০)</span>
                </div>
                <div className="text-xl font-black text-purple-700">{nursingScore} / ১০০</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-emerald-900">মেডিকেল ও ডেন্টাল কলেজ GPA স্কোর</h4>
                  <span className="text-[10px] text-emerald-600">SSC × 15 + HSC × 25 (পূর্ণমান ২০০)</span>
                </div>
                <div className="text-xl font-black text-emerald-700">{medicalScore} / ২০০</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-amber-900">মোট সম্মিলিত GPA</h4>
                  <span className="text-[10px] text-amber-600">SSC + HSC (পূর্ণমান ১০.০০)</span>
                </div>
                <div className="text-xl font-black text-amber-700">{totalGpa} / ১০.০০</div>
              </div>
            </div>

            <button
              onClick={() => setIsCalculatorModalOpen(false)}
              className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 3. Tuition Fee Ledger Modal
  const renderFeesModal = () => {
    if (!isFeesModalOpen) return null;

    const handleAddPayment = (e: React.FormEvent) => {
      e.preventDefault();
      if (!trxId.trim()) {
        showToast('অনুগ্রহ করে ট্রানজেকশন আইডি (TrxID) লিখুন', 'warning');
        return;
      }

      const newRecord: FeeRecord = {
        id: `fee-${Date.now()}`,
        receiptNo: `TSF-REC-${Math.floor(1000 + Math.random() * 9000)}`,
        studentEmail: currentUser?.email || 'student@tsf.org',
        studentName: currentUser?.name || 'শিক্ষার্থী',
        unit: currentUser?.enrolledUnits?.[0] || 'Science',
        amount: Number(feeAmount),
        feeType,
        paymentMethod,
        transactionId: trxId.trim().toUpperCase(),
        date: new Date().toISOString().split('T')[0],
        status: 'Paid'
      };

      addFee(newRecord);
      showToast('পেমেন্ট রসিদ সফলভাবে সংরক্ষণ করা হয়েছে!', 'success');
      setTrxId('');
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <Receipt className="w-4 h-4 text-emerald-400" />
              <span>টিউশন ফি ট্র্যাকার ও পেমেন্ট রসিদ</span>
            </span>
            <button
              onClick={() => setIsFeesModalOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
            {/* Record Payment Form */}
            <form onSubmit={handleAddPayment} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                নতুন ফি জমা দিন / TrxID যুক্ত করুন
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">ফি টাইপ</label>
                  <select
                    value={feeType}
                    onChange={(e) => setFeeType(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-xl text-xs bg-white"
                  >
                    <option value="Admission Fee">ভর্তি ফি (Admission Fee)</option>
                    <option value="Monthly Tuition">মাসিক বেতন (Monthly Tuition)</option>
                    <option value="Model Test Fee">মডেল টেস্ট ফি</option>
                    <option value="Books">বই ও স্টাডি ম্যাটেরিয়ালস</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">টাকার পরিমাণ (৳)</label>
                  <input
                    type="number"
                    min={100}
                    value={feeAmount}
                    onChange={(e) => setFeeAmount(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-xl text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">পেমেন্ট মাধ্যম</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-xl text-xs bg-white"
                  >
                    <option value="bKash">bKash (বিকাশ)</option>
                    <option value="Nagad">Nagad (নগদ)</option>
                    <option value="Rocket">Rocket (রকেট)</option>
                    <option value="Bank">Bank Transfer</option>
                    <option value="Cash">Cash (নগদ)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="ট্রানজেকশন আইডি (TrxID) যেমন: 9J32K90"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-white uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  ফি যুক্ত করুন
                </button>
              </div>
            </form>

            {/* Fee History Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                পেমেন্ট রসিদ হিস্ট্রি ({fees.length} টি)
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                      <th className="py-2 px-2">রসিদ নং</th>
                      <th className="py-2 px-2">শিক্ষার্থী</th>
                      <th className="py-2 px-2">বাবদ</th>
                      <th className="py-2 px-2">মাধ্যম ও TrxID</th>
                      <th className="py-2 px-2 text-right">পরিমাণ (৳)</th>
                      <th className="py-2 px-2 text-center">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {fees.map((fee) => (
                      <tr key={fee.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-2 font-mono text-[11px] font-bold text-blue-600">
                          {fee.receiptNo}
                        </td>
                        <td className="py-2.5 px-2">
                          <div className="font-bold text-slate-800">{fee.studentName}</div>
                          <div className="text-[10px] text-slate-400">{fee.date}</div>
                        </td>
                        <td className="py-2.5 px-2 text-slate-600">{fee.feeType}</td>
                        <td className="py-2.5 px-2 font-mono text-[11px] text-slate-500">
                          {fee.paymentMethod}: {fee.transactionId || 'N/A'}
                        </td>
                        <td className="py-2.5 px-2 text-right font-black text-slate-900">
                          ৳{fee.amount}
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            {fee.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 4. Android APK Download Modal
  const renderApkModal = () => {
    if (!isApkModalOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-200">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <Download className="w-4 h-4 text-emerald-400" />
              <span>TSF কোচিং অ্যান্ড্রয়েড APK অ্যাপ</span>
            </span>
            <button
              onClick={() => setIsApkModalOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <Smartphone className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                TSF BD Coaching Android APK (2026)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                ভার্সন: 2.0.0 | সাইজ: ২.০ MB | প্যাকেজ: <span className="font-mono text-blue-600 font-bold">org.tsfbd.coaching</span>
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 text-left space-y-1">
              <strong className="block font-bold">ইনস্টলেশন নির্দেশিকা:</strong>
              <div>১. নিচের ডাউনলোড বাটনে চাপ দিয়ে APK ফাইলটি সংগ্রহ করুন।</div>
              <div>২. মোবাইলের সেটিংস থেকে "Install from unknown sources" অন করুন।</div>
              <div>৩. অ্যাপটি ইনস্টল করে সরাসরি ক্লাস ও পরীক্ষা শুরু করুন!</div>
            </div>

            <a
              href="/TSF_BD_Coaching_2026.apk"
              download="TSF_BD_Coaching_2026.apk"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>ডাউনলোড APK ফাইল (২.০ MB)</span>
            </a>

            <button
              onClick={() => setIsApkModalOpen(false)}
              className="text-xs text-slate-500 hover:underline"
            >
              বাতিল করুন
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderIdCardModal()}
      {renderCalculatorModal()}
      {renderFeesModal()}
      {renderApkModal()}
    </>
  );
};
