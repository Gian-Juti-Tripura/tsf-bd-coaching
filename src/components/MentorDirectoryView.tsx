import React from 'react';
import { Mentor } from '../types';
import { Award, Mail, Phone, BookOpen, Star, GraduationCap } from 'lucide-react';

interface MentorDirectoryViewProps {
  mentors: Mentor[];
  lang: 'bn' | 'en';
}

export const MentorDirectoryView: React.FC<MentorDirectoryViewProps> = ({
  mentors,
  lang
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">
          {lang === 'bn' ? 'সম্মানিত মেন্টর ও শিক্ষক প্যানেল' : 'Mentors & Faculty Directory'}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {lang === 'bn'
            ? 'বুয়েট, ঢাবি, মেডিকেল ও শীর্ষ বিশ্ববিদ্যালয়ের অভিজ্ঞ মেন্টরদের তালিকা'
            : 'BUET, DU, and Medical College alumni guiding TSF.BD aspirants'}
        </p>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-500 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                  {mentor.name.charAt(0)}
                </div>
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-xs font-bold text-amber-800">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{mentor.rating || 4.9}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{mentor.name}</h3>
                <div className="text-xs text-blue-700 font-semibold">{mentor.educationInstitution}</div>
                <div className="text-[11px] text-slate-500 font-medium">{mentor.designation}</div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Specialized Subjects</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {mentor.subjects.map((sub, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-semibold">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Assigned Admission Units</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {mentor.assignedUnits.map((u, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[11px] font-bold">
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {mentor.bio && (
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl italic">
                  "{mentor.bio}"
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span className="font-mono font-bold text-blue-700">{mentor.mentorUid}</span>
              <span>{mentor.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
