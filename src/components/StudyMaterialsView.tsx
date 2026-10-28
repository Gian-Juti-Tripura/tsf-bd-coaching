import React, { useState } from 'react';
import { StudyMaterial, AdmissionUnit } from '../types';
import {
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle2,
  BookOpen,
  FolderArchive,
  Lock,
  Plus
} from 'lucide-react';

interface StudyMaterialsViewProps {
  materials: StudyMaterial[];
  lang: 'bn' | 'en';
}

export const StudyMaterialsView: React.FC<StudyMaterialsViewProps> = ({
  materials,
  lang
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<string>('All');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const filteredMaterials = materials.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUnit = selectedUnit === 'All' || m.unit === selectedUnit;
    return matchesSearch && matchesUnit;
  });

  const handleDownload = (material: StudyMaterial) => {
    setDownloadToast(`Downloaded: ${material.title}`);
    setTimeout(() => setDownloadToast(null), 3500);

    // Create a demo text blob to simulate an actual file download
    const dummyContent = `TSF.BD ADMISSION COACHING PROGRAM 2026–27\nResource: ${material.title}\nSubject: ${material.subject} (${material.unit})\nAuthor: ${material.uploadedBy}\n\n[TSF.BD Official Study Lecture Material & Question Bank Archive]`;
    const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${material.title.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {lang === 'bn' ? 'স্টাডি মেটেরিয়ালস ও বিগত বছরের প্রশ্নব্যাংক' : 'Study Materials & Question Bank Repository'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'bn'
              ? 'বিশ্ববিদ্যালয় ও নার্সিং ভর্তির জন্য লেকচার শিট, হ্যান্ডনোট ও সাজেশনের নিরাপদ সংরক্ষণাগার'
              : 'Downloadable PDF lecture notes, flowcharts, and 15-year university solved banks'}
          </p>
        </div>
      </div>

      {downloadToast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Search & Unit Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="relative md:col-span-8">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder={
              lang === 'bn'
                ? 'লেকচার শিট, বিষয় বা টপিক দিয়ে খুঁজুন...'
                : 'Search study sheets, subjects (e.g. Physics, Chemistry, English)...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        <div className="md:col-span-4">
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-sm"
          >
            <option value="All">{lang === 'bn' ? 'সকল ইউনিট (All Units)' : 'All Units'}</option>
            <option value="A Unit">A Unit (Science / Engineering)</option>
            <option value="B Unit">B Unit (Humanities & Arts)</option>
            <option value="C Unit">C Unit (Business Studies)</option>
            <option value="D Unit">D Unit (Integrated)</option>
            <option value="Nursing">Nursing & Midwifery</option>
          </select>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMaterials.map((mat) => (
          <div
            key={mat.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">
                  {mat.unit}
                </span>
                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {mat.fileType} • {mat.fileSize}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {lang === 'bn' && mat.titleBn ? mat.titleBn : mat.title}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">{mat.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="text-[11px] text-slate-400">
                Uploaded by <strong className="text-slate-700">{mat.uploadedBy}</strong>
              </div>

              <button
                onClick={() => handleDownload(mat)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download ({mat.downloadCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
