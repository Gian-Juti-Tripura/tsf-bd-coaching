import React, { useState } from 'react';
import { TSFLogo } from './TSFLogo';
import confetti from '../utils/confetti';
import {
  Download,
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  FileCheck,
  ArrowDownCircle,
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface ApkDownloadViewProps {
  lang: 'bn' | 'en';
}

export const ApkDownloadView: React.FC<ApkDownloadViewProps> = ({ lang }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch('/TSF_BD_Coaching_2026.apk');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'TSF_BD_Coaching_2026.apk';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      setTimeout(() => setDownloadSuccess(false), 6000);
    } catch (err) {
      console.error('Download error:', err);
      // Fallback
      window.location.href = '/TSF_BD_Coaching_2026.apk';
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/TSF_BD_Coaching_2026.apk`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
      {/* Primary APK Download Hero Card */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-blue-700/80 text-center relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-white/10 rounded-3xl border border-white/20 shadow-inner backdrop-blur">
              <TSFLogo size={90} showText={false} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'অফিসিয়াল অ্যান্ড্রয়েড APK প্রস্তুত' : 'Official Android APK Ready'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2">
              {lang === 'bn' ? 'টিএসএফ.বিডি ভর্তি কোচিং প্রোগ্রাম' : 'TSF.BD Coaching 2026–27'}
            </h1>
            <p className="text-xs sm:text-sm text-blue-200">
              ঐক্য • শিক্ষা • প্রগতি | Better Preparation, Brighter Future
            </p>
          </div>

          {/* APK Specs Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/10 rounded-2xl p-3.5 max-w-xl mx-auto border border-white/10 text-xs">
            <div>
              <span className="text-blue-300 block text-[10px] uppercase font-bold">Package</span>
              <span className="font-mono font-bold text-white text-[11px]">org.tsfbd.coaching</span>
            </div>
            <div>
              <span className="text-blue-300 block text-[10px] uppercase font-bold">সংস্করণ / Version</span>
              <span className="font-bold text-white">2.0.0 (2026–27)</span>
            </div>
            <div>
              <span className="text-blue-300 block text-[10px] uppercase font-bold">ফাইল সাইজ</span>
              <span className="font-bold text-amber-300">2.0 MB (নেটিভ সাইন্ড)</span>
            </div>
            <div>
              <span className="text-blue-300 block text-[10px] uppercase font-bold">ডিভাইস সাপোর্ট</span>
              <span className="font-bold text-emerald-300 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Android 8.0+
              </span>
            </div>
          </div>

          {/* Big Download Button */}
          <div className="pt-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-base sm:text-lg font-black rounded-2xl shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 mx-auto border border-emerald-400 cursor-pointer"
            >
              <Download className={`w-6 h-6 ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>
                {isDownloading
                  ? (lang === 'bn' ? 'APK ডাউনলোড হচ্ছে...' : 'Downloading APK...')
                  : (lang === 'bn' ? 'এখনই APK ডাউনলোড করুন (2.0 MB)' : 'Download APK Now (2.0 MB)')}
              </span>
            </button>
          </div>

          {/* Direct File Link & Copy */}
          <div className="flex items-center justify-center gap-3 pt-1 text-xs">
            <a
              href="/TSF_BD_Coaching_2026.apk"
              download="TSF_BD_Coaching_2026.apk"
              className="text-sky-300 hover:text-white underline font-semibold flex items-center gap-1"
            >
              <span>{lang === 'bn' ? 'সরাসরি .apk ডাউনলোড লিংক' : 'Direct .apk Download Link'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-blue-400">•</span>
            <button
              onClick={handleCopyLink}
              className="text-sky-300 hover:text-white underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">{lang === 'bn' ? 'লিংক কপি হয়েছে!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>{lang === 'bn' ? 'ডাউনলোড লিংক কপি করুন' : 'Copy APK Link'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {downloadSuccess && (
        <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-900 p-4 rounded-2xl shadow-lg flex items-center justify-between animate-in slide-in-from-top">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm">
                {lang === 'bn'
                  ? 'TSF_BD_Coaching_2026.apk ডাউনলোড সফল হয়েছে!'
                  : 'TSF_BD_Coaching_2026.apk Download Successful!'}
              </h4>
              <p className="text-xs text-emerald-700 mt-0.5">
                {lang === 'bn'
                  ? 'আপনার ফোনের নোটিফিকেশন বার অথবা Downloads ফোল্ডার থেকে ফাইলটিতে ক্লিক করে সরাসরি ইনস্টল করুন।'
                  : 'Tap the downloaded file from your notification bar or Downloads folder to install.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3-Step Phone Installation Guide */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <h3 className="text-base sm:text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-blue-600" />
          <span>
            {lang === 'bn'
              ? 'মোবাইল ফোনে APK ইনস্টল করার সহজ ৩টি ধাপ:'
              : 'Easy 3 Steps to Install APK on Your Phone:'}
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm">
              ১
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {lang === 'bn' ? 'ফাইল ডাউনলোড করুন' : 'Download File'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'উপরের "এখনই APK ডাউনলোড করুন" বাটনে চাপুন। ৫ সেকেন্ডের মধ্যে আপনার ফোনে TSF_BD_Coaching_2026.apk নেমে যাবে।'
                : 'Click the green button above. TSF_BD_Coaching_2026.apk will download in seconds.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm">
              ২
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {lang === 'bn' ? 'ফাইলে ট্যাপ করুন' : 'Tap to Open'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'ফোনের নোটিফিকেশন বার অথবা ফাইল ম্যানেজারের Downloads ফোল্ডারে গিয়ে নামানো ফাইলটিতে চাপ দিন।'
                : 'Open the downloaded file from your notification bar or Downloads folder.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
              ৩
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              {lang === 'bn' ? '"Install" চাপুন' : 'Click Install'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'ফোনে "Install" বাটন চাপুন। অনুমতি চাইলে "Allow from this source" অন করে দিন। অ্যাপটি ইনস্টল হয়ে যাবে।'
                : 'Tap "Install". If prompted, allow "Install from this source". Done!'}
            </p>
          </div>
        </div>
      </div>

      {/* Key Features Breakdown in Bengali */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-base sm:text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>
            {lang === 'bn' ? 'টিএসএফ.বিডি অ্যাপের প্রধান সুবিধাসমূহ' : 'Key App Features'}
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold">✓</div>
            <div>
              <h5 className="font-bold text-slate-900">অনলাইন MCQ পরীক্ষা ও নেগেটিভ মার্কিং</h5>
              <p className="text-slate-600 mt-0.5">টাইমার সহ লাইভ মডেল টেস্ট এবং পরীক্ষার পরপরই বিস্তারিত মূল্যায়ন ও সমাধান।</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold">✓</div>
            <div>
              <h5 className="font-bold text-slate-900">ক্লাস রুটিন ও কনফ্লিক্ট ডিটেকশন</h5>
              <p className="text-slate-600 mt-0.5">সপ্তাহভিত্তিক ক্লাস সিডিউল, রুম নম্বর, অনলাইন/অফলাইন ক্লাসের লিংক ও নোটিশ।</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">✓</div>
            <div>
              <h5 className="font-bold text-slate-900">মেধা তালিকা ও র‍্যাঙ্কিং</h5>
              <p className="text-slate-600 mt-0.5">ব্যাচভিত্তিক শীর্ষ স্থান এবং টাই-ব্রেকিং নীতি অনুযায়ী সঠিক পজিশন নির্ণয়।</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100 flex items-start gap-3">
            <div className="w-6 h-6 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 font-bold">✓</div>
            <div>
              <h5 className="font-bold text-slate-900">ডিজিটাল লেকচার শিট ও পিডিএফ</h5>
              <p className="text-slate-600 mt-0.5">বিষয় ও ইউনিট অনুযায়ী সাজানো লেকচার নোটস যা অফলাইনেও পড়া যাবে।</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
