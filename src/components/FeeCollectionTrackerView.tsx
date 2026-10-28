import React, { useState } from 'react';
import { FeePayment, Student } from '../types';
import {
  CreditCard,
  Plus,
  Search,
  Download,
  Printer,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  Receipt,
  ShieldCheck,
  X,
  FileText
} from 'lucide-react';
import { TSFLogo } from './TSFLogo';

interface FeeCollectionTrackerViewProps {
  fees: FeePayment[];
  students: Student[];
  onRecordPayment: (payment: FeePayment) => void;
  lang: 'bn' | 'en';
}

export const FeeCollectionTrackerView: React.FC<FeeCollectionTrackerViewProps> = ({
  fees,
  students,
  onRecordPayment,
  lang
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<FeePayment | null>(null);

  // New payment form state
  const [selectedStudentUid, setSelectedStudentUid] = useState(students[0]?.studentUid || '');
  const [feeType, setFeeType] = useState<FeePayment['feeType']>('Admission Fee');
  const [amount, setAmount] = useState<number>(5000);
  const [paymentMethod, setPaymentMethod] = useState<FeePayment['paymentMethod']>('bKash');
  const [transactionId, setTransactionId] = useState('');
  const [notes, setNotes] = useState('');

  const totalCollected = fees.reduce((sum, f) => sum + f.amount, 0);
  const totalPaidStudents = new Set(fees.map((f) => f.studentUid || f.studentId)).size;

  const filteredFees = fees.filter(
    (f) =>
      f.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.studentUid || f.studentId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.receiptNo || f.receiptNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.transactionId && f.transactionId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stu = students.find((s) => s.studentUid === selectedStudentUid);
    if (!stu) {
      alert('Student not found');
      return;
    }

    const newPayment: FeePayment = {
      id: `fee-${Date.now()}`,
      receiptNo: `TSF-REC-2026-${String(fees.length + 1).padStart(3, '0')}`,
      studentUid: stu.studentUid,
      studentName: stu.name,
      unit: stu.admissionUnit,
      batchName: stu.batchName,
      feeType,
      amount,
      paymentMethod,
      transactionId: transactionId || `TXN${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().slice(0, 10),
      status: 'Paid',
      collectedBy: 'Central Admission Secretariat',
      notes
    };

    onRecordPayment(newPayment);
    setIsModalOpen(false);
    // Reset
    setTransactionId('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Summary */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow-sm">
              <Receipt className="w-3.5 h-3.5 fill-slate-950" />
              Financial Management
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-sky-200 border border-white/20">
              Verified Ledger
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'bn' ? 'ফি ও টিউশন ফি ব্যবস্থাপনা' : 'Fee & Tuition Collection Ledger'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 max-w-xl">
            {lang === 'bn'
              ? 'শিক্ষার্থীদের ভর্তি ফি, মাসিক বেতন, মডেল টেস্ট ফি সংগ্রহ এবং স্বয়ংক্রিয় ভাউচার রশিদ প্রস্তুত করুন।'
              : 'Track admission fees, monthly tuition, model test receipts and generate verified vouchers.'}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-xs sm:text-sm shrink-0"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>{lang === 'bn' ? 'নতুন ফি জমা নিন' : 'Record New Payment'}</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Collected</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
            ৳{totalCollected.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400">Total BDT deposited to TSF account</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Paid Students</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
            {totalPaidStudents} <span className="text-sm text-slate-400">/ {students.length}</span>
          </div>
          <span className="text-[11px] text-slate-400">Registered students with confirmed payment</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">Payment Channels</span>
          <div className="text-xs font-bold text-slate-700 flex items-center gap-2 pt-2">
            <span className="px-2 py-0.5 rounded bg-pink-100 text-pink-700 font-mono">bKash</span>
            <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-700 font-mono">Nagad</span>
            <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-mono">Rocket</span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-mono">Cash</span>
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">All standard mobile financial services</span>
        </div>
      </div>

      {/* Transactions Table & Search */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'bn' ? 'রশিদ নম্বর, নাম বা ট্রানজেকশন আইডি...' : 'Search receipt, student or TrxID...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <span className="text-xs font-bold text-slate-500">
            {filteredFees.length} {lang === 'bn' ? 'টি লেনদেন পাওয়া গেছে' : 'transactions found'}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-y border-slate-100">
              <tr>
                <th className="py-3 px-4">Receipt No</th>
                <th className="py-3 px-4">Student & UID</th>
                <th className="py-3 px-4">Unit & Batch</th>
                <th className="py-3 px-4">Fee Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Info</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Voucher</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-700">
                    {fee.receiptNo}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{fee.studentName}</span>
                    <span className="font-mono text-[10px] text-slate-400">{fee.studentUid}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800 block">{fee.unit}</span>
                    <span className="text-[10px] text-slate-500 truncate max-w-[150px] block">
                      {fee.batchName}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-md font-bold text-[10px]">
                      {fee.feeType}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-extrabold text-slate-900 text-sm">৳{fee.amount.toLocaleString()}</span>
                  </td>
                  <td className="py-3 px-4 space-y-0.5">
                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-bold">
                      {fee.paymentMethod}
                    </span>
                    {fee.transactionId && (
                      <span className="font-mono text-[10px] text-slate-500 block truncate max-w-[120px]">
                        {fee.transactionId}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                    {fee.date}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedReceipt(fee)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-bold rounded-lg transition-colors inline-flex items-center gap-1 text-[11px]"
                    >
                      <Receipt className="w-3 h-3" />
                      <span>{lang === 'bn' ? 'রশিদ' : 'Receipt'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold">
                  {lang === 'bn' ? 'নতুন ফি আদায় নিবন্ধন' : 'Record Student Fee Payment'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'bn' ? 'শিক্ষার্থী নির্বাচন করুন' : 'Select Student'}
                </label>
                <select
                  value={selectedStudentUid}
                  onChange={(e) => setSelectedStudentUid(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.studentUid}>
                      {s.name} ({s.studentUid}) - {s.admissionUnit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Fee Type</label>
                  <select
                    value={feeType}
                    onChange={(e) => setFeeType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Admission Fee">Admission Fee</option>
                    <option value="Monthly Tuition">Monthly Tuition</option>
                    <option value="Model Test Fee">Model Test Fee</option>
                    <option value="Books & Materials">Books & Materials</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Amount (BDT)</label>
                  <input
                    type="number"
                    min="100"
                    step="100"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="bKash">bKash (বিকাশ)</option>
                    <option value="Nagad">Nagad (নগদ)</option>
                    <option value="Rocket">Rocket (রকেট)</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash (নগদ ক্যাশ)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Transaction ID</label>
                  <input
                    type="text"
                    placeholder="e.g. BK9X274810M"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Notes / Remarks</label>
                <input
                  type="text"
                  placeholder="e.g. Full admission & study pack"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Confirm & Generate Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Receipt Voucher Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-slate-900 overflow-hidden p-6 font-sans space-y-4 print:shadow-none print:max-w-none">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <div className="flex items-center gap-3">
                <TSFLogo className="w-10 h-10" />
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    ত্রিপুরা স্টুডেন্টস ফোরাম (টিএসএফ.বিডি)
                  </h3>
                  <p className="text-[10px] font-bold text-blue-900">
                    Official Fee Deposit Money Receipt
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-bold text-slate-900 block">
                  {selectedReceipt.receiptNo}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Date: {selectedReceipt.date}
                </span>
              </div>
            </div>

            {/* Receipt Table */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Student Name:</span>
                <strong className="text-slate-900">{selectedReceipt.studentName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Student UID:</span>
                <span className="font-mono font-bold text-blue-700">{selectedReceipt.studentUid}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Unit & Batch:</span>
                <span className="font-semibold text-slate-800">{selectedReceipt.unit} • {selectedReceipt.batchName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Fee Purpose:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.feeType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Payment Channel:</span>
                <span className="font-semibold text-slate-800">{selectedReceipt.paymentMethod} ({selectedReceipt.transactionId})</span>
              </div>
              <div className="flex justify-between py-2 border-t-2 border-slate-900 text-sm">
                <strong className="text-slate-900">Total Paid Amount:</strong>
                <strong className="text-emerald-700 font-black text-base">
                  ৳{selectedReceipt.amount.toLocaleString()} BDT
                </strong>
              </div>
            </div>

            {/* Signature & Seal */}
            <div className="pt-6 flex items-end justify-between text-center">
              <div>
                <div className="w-24 border-b border-slate-700 mb-1" />
                <span className="text-[9px] font-bold text-slate-600 block">Depositor / Student</span>
              </div>
              <div className="text-right">
                <div className="w-28 border-b border-slate-700 mb-1" />
                <span className="text-[9px] font-bold text-slate-600 block">Authorized Cashier</span>
                <span className="text-[8px] text-emerald-600 font-bold">✓ Verified by TSF</span>
              </div>
            </div>

            {/* Actions - Hidden in Print */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between print:hidden">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt Voucher</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
