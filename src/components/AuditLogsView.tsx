import React from 'react';
import { AuditLog } from '../types';
import { ShieldCheck, Terminal, AlertCircle, Clock, Globe } from 'lucide-react';

interface AuditLogsViewProps {
  logs: AuditLog[];
  lang: 'bn' | 'en';
}

export const AuditLogsView: React.FC<AuditLogsViewProps> = ({ logs, lang }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h1 className="text-xl font-bold text-slate-900">
              {lang === 'bn' ? 'সিকিউরিটি অডিট ও সার্ভার অ্যাকশন লগ' : 'Security Audit & Server Action Logs'}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'bn'
              ? 'সুপার এডমিন ভেরিফিকেশন, স্টুডেন্ট ইউআইডি ও স্পর্শকাতর ডাটা ট্র্যাকিং'
              : 'Immutable record of privileged administrative actions, claims, and UID issuances'}
          </p>
        </div>

        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300 self-start sm:self-auto">
          Enforced by Firestore Rules
        </span>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Performed By</th>
                <th className="py-3 px-4">Target Resource</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-blue-700">
                    <span className="bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-sans">
                    <div className="font-bold text-slate-900">{log.performedBy}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{log.performedByEmail}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-semibold">{log.targetResource}</td>
                  <td className="py-3 px-4 font-sans text-slate-700 text-xs">{log.details}</td>
                  <td className="py-3 px-4 text-slate-500 text-[11px]">{log.ipAddress}</td>
                  <td className="py-3 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
