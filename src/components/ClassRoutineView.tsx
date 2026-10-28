import React, { useState } from 'react';
import { ClassRoutine, AdmissionUnit } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  User,
  Plus,
  AlertCircle,
  CheckCircle2,
  X,
  Filter
} from 'lucide-react';

interface ClassRoutineViewProps {
  routines: ClassRoutine[];
  onAddRoutine: (routine: ClassRoutine) => void;
  lang: 'bn' | 'en';
}

const DAYS = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

export const ClassRoutineView: React.FC<ClassRoutineViewProps> = ({
  routines,
  onAddRoutine,
  lang
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('Saturday');
  const [selectedUnit, setSelectedUnit] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  // Form fields
  const [dayOfWeek, setDayOfWeek] = useState<ClassRoutine['dayOfWeek']>('Saturday');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('10:30 AM');
  const [subject, setSubject] = useState('Physics');
  const [topic, setTopic] = useState('');
  const [batchName, setBatchName] = useState('A-Unit Padma Batch (Science)');
  const [unit, setUnit] = useState<AdmissionUnit>('A Unit');
  const [mentorName, setMentorName] = useState('Biplob Tripura');
  const [room, setRoom] = useState('Hall A (Science Lab)');
  const [isOnline, setIsOnline] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');

  const filteredRoutines = routines.filter((r) => {
    const matchesDay = selectedDay === 'All' || r.dayOfWeek === selectedDay;
    const matchesUnit = selectedUnit === 'All' || r.unit === selectedUnit;
    return matchesDay && matchesUnit;
  });

  const checkConflict = (day: string, time: string, rm: string, mName: string) => {
    const conflict = routines.find(
      (r) =>
        r.dayOfWeek === day &&
        r.startTime === time &&
        (r.room === rm || r.mentorName === mName)
    );
    if (conflict) {
      return `Conflict Alert: ${conflict.mentorName} or Room "${conflict.room}" is already scheduled for ${conflict.subject} at ${time} on ${day}!`;
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const conflict = checkConflict(dayOfWeek, startTime, room, mentorName);
    if (conflict) {
      setConflictWarning(conflict);
      return;
    }

    const newRoutine: ClassRoutine = {
      id: `rt-${Date.now()}`,
      dayOfWeek,
      startTime,
      endTime,
      subject,
      topic,
      batchId: `batch-${unit.toLowerCase().replace(' ', '-')}`,
      batchName,
      unit,
      mentorId: 'men-temp',
      mentorName,
      room: isOnline ? 'Virtual Classroom' : room,
      isOnline,
      meetingLink: isOnline ? meetingLink || 'https://meet.tsfbd.org/live' : undefined,
      status: 'Scheduled'
    };

    onAddRoutine(newRoutine);
    setIsModalOpen(false);
    setConflictWarning(null);
    setTopic('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {lang === 'bn' ? 'সাপ্তাহিক ক্লাস রুটিন ও সময়সূচি' : 'Weekly Class Routine & Schedule'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'bn'
              ? 'বিশ্ববিদ্যালয় ও নার্সিং ভর্তি প্রস্তুতি ২০২৬–২৭ এর সাপ্তাহিক ক্লাস ও অনলাইন লেকচার'
              : 'Class schedules with automated room and mentor conflict detection'}
          </p>
        </div>

        <button
          onClick={() => {
            setConflictWarning(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          {lang === 'bn' ? 'নতুন ক্লাস রুটিন যোগ করুন' : 'Add Class Routine'}
        </button>
      </div>

      {/* Days Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedDay('All')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedDay === 'All'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          {lang === 'bn' ? 'পুরো সপ্তাহ (All Week)' : 'All Days'}
        </button>
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedDay === day
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Routines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRoutines.length === 0 ? (
          <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
            {lang === 'bn'
              ? 'নির্ধারিত দিনে কোনো ক্লাসের সময়সূচি নেই।'
              : 'No scheduled classes found for this day.'}
          </div>
        ) : (
          filteredRoutines.map((routine) => (
            <div
              key={routine.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-900">
                    {routine.dayOfWeek}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                    {routine.unit}
                  </span>
                </div>

                {routine.isOnline ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                    <Video className="w-3.5 h-3.5" /> Online (Zoom)
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <MapPin className="w-3.5 h-3.5" /> {routine.room}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{routine.subject}</h3>
                <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{routine.topic}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-semibold">{routine.startTime} - {routine.endTime}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{routine.mentorName}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500 font-medium">{routine.batchName}</span>
                {routine.isOnline && routine.meetingLink && (
                  <a
                    href={routine.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    Join Class <Video className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Routine Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-5 flex items-center justify-between">
              <h2 className="text-base font-bold">
                {lang === 'bn' ? 'নতুন ক্লাস রুটিন যুক্ত করুন' : 'Add Class Routine'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              {conflictWarning && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-xs font-medium">{conflictWarning}</div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Day of Week</label>
                  <select
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg font-semibold"
                  >
                    {DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Admission Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => {
                      const u = e.target.value as AdmissionUnit;
                      setUnit(u);
                      if (u === 'A Unit') setBatchName('A-Unit Padma Batch (Science)');
                      if (u === 'B Unit') setBatchName('B-Unit Meghna Batch (Humanities & Arts)');
                      if (u === 'C Unit') setBatchName('C-Unit Jamuna Batch (Business Studies)');
                      if (u === 'D Unit') setBatchName('D-Unit Karnaphuli Batch (Integrated)');
                      if (u === 'Nursing') setBatchName('Nursing & Midwifery Sangu Batch');
                    }}
                    className="w-full px-3 py-2 border rounded-lg font-semibold"
                  >
                    <option value="A Unit">A Unit</option>
                    <option value="B Unit">B Unit</option>
                    <option value="C Unit">C Unit</option>
                    <option value="D Unit">D Unit</option>
                    <option value="Nursing">Nursing</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Time</label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="e.g. 09:00 AM"
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">End Time</label>
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="e.g. 10:30 AM"
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Physics / English"
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mentor Name</label>
                  <input
                    type="text"
                    value={mentorName}
                    onChange={(e) => setMentorName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Class Topic / Syllabus Segment</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Vector, Calculus or Preposition"
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="flex items-center gap-3 py-1">
                <input
                  type="checkbox"
                  id="isOnlineClass"
                  checked={isOnline}
                  onChange={(e) => setIsOnline(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isOnlineClass" className="font-semibold text-slate-700">
                  This is an Online Class (Zoom / Google Meet)
                </label>
              </div>

              {isOnline ? (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Meeting Link</label>
                  <input
                    type="url"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    placeholder="https://meet.tsfbd.org/..."
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Room / Hall</label>
                  <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              )}

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md"
                >
                  Save Routine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
