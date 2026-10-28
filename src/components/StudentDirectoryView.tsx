import React, { useState } from 'react';
import { Student, AdmissionUnit, StudentStatus } from '../types';
import {
  Search,
  Filter,
  Download,
  Plus,
  UserCheck,
  GraduationCap,
  Eye,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  X,
  FileSpreadsheet,
  IdCard
} from 'lucide-react';
import { StudentIDCardModal } from './StudentIDCardModal';

interface StudentDirectoryViewProps {
  students: Student[];
  onAddStudent: (newStudent: Student) => void;
  lang: 'bn' | 'en';
}

export const StudentDirectoryView: React.FC<StudentDirectoryViewProps> = ({
  students,
  onAddStudent,
  lang
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);

  // Registration Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [admissionUnit, setAdmissionUnit] = useState<AdmissionUnit>('A Unit');
  const [batchName, setBatchName] = useState('A-Unit Padma Batch (Science)');
  const [sscGpa, setSscGpa] = useState('5.00');
  const [sscBoard, setSscBoard] = useState('Chittagong');
  const [hscGpa, setHscGpa] = useState('5.00');
  const [hscBoard, setHscBoard] = useState('Chittagong');
  const [address, setAddress] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [targetUniversity, setTargetUniversity] = useState('Dhaka University');

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentUid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.phone || '').includes(searchQuery) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUnit = selectedUnit === 'All' || s.admissionUnit === selectedUnit;
    const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;
    return matchesSearch && matchesUnit && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = 'Student UID,Full Name,Email,Phone,Unit,Batch,Status,SSC GPA,HSC GPA,Target University\n';
    const rows = filteredStudents
      .map(
        (s) =>
          `"${s.studentUid}","${s.name}","${s.email}","${s.phone}","${s.admissionUnit}","${s.batchName}","${s.status}","${s.sscGpa}","${s.hscGpa}","${s.targetUniversity || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tsf_students_list_2026_27_${selectedUnit.replace(' ', '_')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextIndex = students.length + 1;
    const padded = String(nextIndex).padStart(4, '0');
    const newUid = `TSF-STU-2026-${padded}`;

    const newStudent: Student = {
      id: `stu-${Date.now()}`,
      uid: newUid,
      studentUid: newUid,
      name,
      email: email || `${newUid.toLowerCase()}@tsfbd.student`,
      phone,
      role: 'student',
      admissionUnit,
      status: 'Active',
      batchId: `batch-${admissionUnit.toLowerCase().replace(' ', '-')}`,
      batchName,
      sscGpa: parseFloat(sscGpa) || 5.0,
      sscBoard,
      sscPassingYear: 2024,
      hscGpa: parseFloat(hscGpa) || 5.0,
      hscBoard,
      hscPassingYear: 2026,
      address,
      fatherName,
      guardianPhone,
      targetUniversity,
      enrolledDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      isVerified: true,
      totalAttendanceRate: 100
    };

    onAddStudent(newStudent);
    setIsRegisterModalOpen(false);
    // Reset fields
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setFatherName('');
    setGuardianPhone('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">
              {lang === 'bn' ? 'শিক্ষার্থী ব্যবস্থাপনা ডিরেক্টরি' : 'Student Management Directory'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              {filteredStudents.length} {lang === 'bn' ? 'জন শিক্ষার্থী' : 'Enrolled'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'bn'
              ? 'ভর্তি পরীক্ষা ২০২৬–২৭ সেশনের নিবন্ধিত শিক্ষার্থী ও ব্যাচভিত্তিক রেকর্ড'
              : 'Academic Session 2026–27 registered aspirants and unit-wise profiles'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-300"
          >
            <Download className="w-4 h-4 text-slate-600" />
            {lang === 'bn' ? 'CSV এক্সপোর্ট' : 'Export CSV'}
          </button>
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            {lang === 'bn' ? 'নতুন শিক্ষার্থী নিবন্ধন' : 'Register Student'}
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="relative md:col-span-6">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder={
              lang === 'bn'
                ? 'নাম, স্টুডেন্ট UID, ফোন নম্বর বা ইমেইল দিয়ে সার্চ করুন...'
                : 'Search by Student Name, UID (e.g. TSF-STU-2026-0001), phone...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        <div className="md:col-span-3">
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            <option value="All">{lang === 'bn' ? 'সকল ইউনিট (All Units)' : 'All Admission Units'}</option>
            <option value="A Unit">A Unit (Science / Engineering)</option>
            <option value="B Unit">B Unit (Humanities & Arts)</option>
            <option value="C Unit">C Unit (Business Studies)</option>
            <option value="D Unit">D Unit (Integrated)</option>
            <option value="Nursing">Nursing & Midwifery</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            <option value="All">{lang === 'bn' ? 'সকল অবস্থা (All Status)' : 'All Status'}</option>
            <option value="Active">Active (সক্রিয়)</option>
            <option value="Pending">Pending (অনুমোদন অপেক্ষমাণ)</option>
            <option value="Inactive">Inactive (নিষ্ক্রিয়)</option>
            <option value="Graduated">Graduated (উত্তীর্ণ)</option>
          </select>
        </div>
      </div>

      {/* Student Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">UID</th>
                <th className="py-3 px-4">{lang === 'bn' ? 'শিক্ষার্থীর নাম' : 'Student Name'}</th>
                <th className="py-3 px-4">{lang === 'bn' ? 'ভর্তি ইউনিট' : 'Admission Unit'}</th>
                <th className="py-3 px-4">{lang === 'bn' ? 'ব্যাচ' : 'Batch'}</th>
                <th className="py-3 px-4">SSC / HSC GPA</th>
                <th className="py-3 px-4">{lang === 'bn' ? 'উপস্থিতি হার' : 'Attendance'}</th>
                <th className="py-3 px-4">{lang === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-3 px-4 text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    {lang === 'bn'
                      ? 'কোনো শিক্ষার্থী পাওয়া যায়নি।'
                      : 'No students matching the current search and filter.'}
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">
                      {student.studentUid}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{student.name}</div>
                      <div className="text-[11px] text-slate-500">{student.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-slate-100 text-slate-800">
                        {student.admissionUnit}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">
                      {student.batchName}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-emerald-700">
                        {(student.sscGpa ?? 5.0).toFixed(2)}
                      </span>{' '}
                      /{' '}
                      <span className="font-semibold text-blue-700">
                        {(student.hscGpa ?? 5.0).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full"
                            style={{ width: `${student.totalAttendanceRate || 85}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700">
                          {student.totalAttendanceRate || 85}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          student.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : student.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {lang === 'bn' ? 'প্রোফাইল' : 'View'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-2xl text-sky-300">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedStudent.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-xs bg-white/20 px-2 py-0.5 rounded text-sky-200 font-semibold">
                      {selectedStudent.studentUid}
                    </span>
                    <span className="text-xs bg-emerald-500/80 text-white px-2 py-0.5 rounded-full font-bold">
                      {selectedStudent.status}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
                <div>
                  <span className="text-slate-500 block">Admission Unit</span>
                  <span className="font-bold text-slate-800 text-sm">{selectedStudent.admissionUnit}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Assigned Batch</span>
                  <span className="font-bold text-slate-800 text-sm">{selectedStudent.batchName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Target University</span>
                  <span className="font-bold text-blue-700">{selectedStudent.targetUniversity || 'General University'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Attendance Rate</span>
                  <span className="font-bold text-emerald-600">{selectedStudent.totalAttendanceRate || 90}%</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-slate-800 text-sm">Academic Qualifications</h4>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-slate-500">SSC GPA:</span>{' '}
                    <strong className="text-slate-900">{(selectedStudent.sscGpa ?? 5.0).toFixed(2)}</strong> ({selectedStudent.sscBoard || 'All'})
                  </div>
                  <div>
                    <span className="text-slate-500">HSC GPA:</span>{' '}
                    <strong className="text-slate-900">{(selectedStudent.hscGpa ?? 5.0).toFixed(2)}</strong> ({selectedStudent.hscBoard || 'All'})
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-slate-800 text-sm">Personal & Guardian Details</h4>
                <div className="space-y-1.5 text-slate-700">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Student Phone: <strong>{selectedStudent.phone}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email: <strong>{selectedStudent.email}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Father: <strong>{selectedStudent.fatherName}</strong> (Guardian: {selectedStudent.guardianPhone})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Address: {selectedStudent.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setIsIdModalOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <IdCard className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'স্মার্ট আইডি ও এডমিট কার্ড' : 'Smart ID & Admit Card'}</span>
              </button>
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student ID Card Modal */}
      {selectedStudent && (
        <StudentIDCardModal
          isOpen={isIdModalOpen}
          onClose={() => setIsIdModalOpen(false)}
          student={selectedStudent}
          lang={lang}
        />
      )}

      {/* New Student Registration Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-sky-300" />
                <h2 className="text-base font-bold">
                  {lang === 'bn' ? 'নতুন শিক্ষার্থী ভর্তি নিবন্ধন ২০২৬–২৭' : 'New Student Admission Registration 2026–27'}
                </h2>
              </div>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-blue-900 flex items-center justify-between">
                <div>
                  <span className="font-bold">Next Generated UID:</span>
                  <span className="font-mono ml-2 font-bold text-blue-700">
                    TSF-STU-2026-{String(students.length + 1).padStart(4, '0')}
                  </span>
                </div>
                <span className="text-[10px] bg-blue-200/80 px-2 py-0.5 rounded font-bold">
                  Auto-Sequential
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'শিক্ষার্থীর পূর্ণ নাম *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rupayan Tripura"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +880 1812-345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'ভর্তি ইউনিট *' : 'Admission Unit *'}
                  </label>
                  <select
                    value={admissionUnit}
                    onChange={(e) => {
                      const u = e.target.value as AdmissionUnit;
                      setAdmissionUnit(u);
                      if (u === 'A Unit') setBatchName('A-Unit Padma Batch (Science)');
                      if (u === 'B Unit') setBatchName('B-Unit Meghna Batch (Humanities & Arts)');
                      if (u === 'C Unit') setBatchName('C-Unit Jamuna Batch (Business Studies)');
                      if (u === 'D Unit') setBatchName('D-Unit Karnaphuli Batch (Integrated)');
                      if (u === 'Nursing') setBatchName('Nursing & Midwifery Sangu Batch');
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-semibold"
                  >
                    <option value="A Unit">A Unit (Science / Engineering)</option>
                    <option value="B Unit">B Unit (Humanities & Arts)</option>
                    <option value="C Unit">C Unit (Business Studies)</option>
                    <option value="D Unit">D Unit (Integrated)</option>
                    <option value="Nursing">Nursing & Midwifery</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Batch</label>
                  <input
                    type="text"
                    value={batchName}
                    readOnly
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-700 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target University</label>
                  <input
                    type="text"
                    placeholder="e.g. Dhaka University / BUET / DMC"
                    value={targetUniversity}
                    onChange={(e) => setTargetUniversity(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">SSC GPA (out of 5.00)</label>
                  <input
                    type="text"
                    value={sscGpa}
                    onChange={(e) => setSscGpa(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">HSC GPA (out of 5.00)</label>
                  <input
                    type="text"
                    value={hscGpa}
                    onChange={(e) => setHscGpa(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Father's Name</label>
                  <input
                    type="text"
                    placeholder="Father's Name"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Guardian Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+880 17..."
                    value={guardianPhone}
                    onChange={(e) => setGuardianPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Permanent / Present Address</label>
                <textarea
                  rows={2}
                  placeholder="Village, Thana, District (e.g. Khagrachhari / Rangamati / Bandarban)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md"
                >
                  Confirm & Generate Student UID
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
