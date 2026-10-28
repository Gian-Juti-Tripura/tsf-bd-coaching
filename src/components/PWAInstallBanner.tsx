import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import {
  Smartphone,
  Download,
  Share2,
  CheckCircle2,
  HelpCircle,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface PWAInstallBannerProps {
  lang: 'bn' | 'en';
  onOpenProjectExport: () => void;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({
  lang,
  onOpenProjectExport,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);

  // If already running standalone as an installed app
  if (isInstalled) {
    return (
      <div className="bg-emerald-600 text-white px-4 py-1 text-center text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-inner">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>
          {lang === 'bn'
            ? 'টিএসএফ.বিডি অ্যান্ড্রয়েড অ্যাপ সফলভাবে আপনার ডিভাইসে সক্রিয় আছে!'
            : 'TSF.BD Android App is actively installed on your device!'}
        </span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success) setShowGuideModal(true);
    } else {
      setShowGuideModal(true);
    }
  };

  return (
    <>
      {/* Prominent Banner across Top of Dashboard */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 text-white px-4 py-2.5 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center border border-white/30 shrink-0">
            <Smartphone className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs sm:text-sm">
                {lang === 'bn'
                  ? 'স্মার্টফোনে সরাসরি অ্যাপ (APK) ইনস্টল করুন'
                  : 'Install TSF.BD Native Android App'}
              </span>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900 uppercase">
                {lang === 'bn' ? '১-ক্লিক ইনস্টল' : '1-Click'}
              </span>
            </div>
            <p className="text-[11px] text-emerald-100">
              {lang === 'bn'
                ? 'ফোনে কোনো কম্পিউটার ছাড়াই সরাসরি ইনস্টল করুন অথবা অ্যান্ড্রয়েড স্টুডিও সোর্স কোড ডাউনলোড করুন'
                : 'Directly install on Android phone without PC or download Android Studio project'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
          <a
            href="/TSF_BD_Coaching_2026.apk"
            download="TSF_BD_Coaching_2026.apk"
            className="flex-1 sm:flex-none px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5 border border-amber-300"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>{lang === 'bn' ? 'সরাসরি APK ফাইল ডাউনলোড (.apk)' : 'Download .APK File'}</span>
          </a>
          <button
            onClick={handleInstallClick}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-white text-slate-900 hover:bg-emerald-50 text-xs font-bold rounded-xl shadow transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'bn' ? '১-ক্লিকে ইনস্টল' : '1-Click Install'}</span>
          </button>
          <button
            onClick={onOpenProjectExport}
            className="px-3 py-2 bg-black/25 hover:bg-black/35 text-white text-xs font-bold rounded-xl border border-white/20 transition-colors flex items-center justify-center gap-1"
          >
            <span>{lang === 'bn' ? 'স্টুডিও সোর্স (.ZIP)' : 'Studio Source (.ZIP)'}</span>
          </button>
        </div>
      </div>

      {/* Installation Instructions Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-5 h-5 text-sky-300" />
                <h3 className="font-bold text-sm">
                  {lang === 'bn'
                    ? 'স্মার্টফোনে সরাসরি অ্যাপটি ইনস্টল করার পদ্ধতি'
                    : 'How to Install on Your Smartphone'}
                </h3>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              {/* Option 1: Chrome on Android */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 text-sm">
                    {lang === 'bn' ? '১. অ্যান্ড্রয়েড ফোনের ব্রাউজার থেকে (Chrome):' : '1. On Android Phone (Chrome):'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-900">
                    {lang === 'bn' ? 'সবচেয়ে সহজ' : 'Easiest'}
                  </span>
                </div>
                <p className="text-emerald-800 leading-relaxed">
                  {lang === 'bn'
                    ? 'আপনার মোবাইল ফোনের গুগল ক্রোম (Google Chrome) ব্রাউজারের উপরে ডানে থাকা ৩-ডট (⋮) মেনুতে চাপ দিন এবং "Install app" অথবা "Add to Home screen" (হোম স্ক্রিনে যোগ করুন) চাপুন। অ্যাপটি সরাসরি আপনার ফোনে আসল অ্যাপের মতো ইনস্টল হয়ে যাবে!'
                    : 'Tap the 3 dots (⋮) in Google Chrome on your Android phone, then tap "Install App" or "Add to Home screen". Android will create a native WebAPK app icon on your device!'}
                </p>
              </div>

              {/* Option 2: Android Studio Build */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                <span className="font-bold text-blue-900 text-sm">
                  {lang === 'bn' ? '২. অ্যান্ড্রয়েড স্টুডিও দিয়ে APK ফাইল তৈরি:' : '2. Build APK with Android Studio:'}
                </span>
                <p className="text-blue-800 leading-relaxed">
                  {lang === 'bn'
                    ? 'আপনি যদি সরাসরি app-debug.apk ফাইল তৈরি করে অন্যদের পেনড্রাইভ বা ব্লুটুথে দিতে চান, তবে সম্পূর্ণ সোর্স কোড ডাউনলোড করে Android Studio-তে `./gradlew assembleDebug` রান করুন।'
                    : 'If you want to compile the standalone .apk binary to share via USB/Bluetooth, download the Android Studio ZIP and run `./gradlew assembleDebug`.'}
                </p>
                <button
                  onClick={() => {
                    setShowGuideModal(false);
                    onOpenProjectExport();
                  }}
                  className="mt-1 flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'অ্যান্ড্রয়েড স্টুডিও প্রজেক্ট দেখুন (.ZIP)' : 'View Android Studio Project (.ZIP)'}</span>
                </button>
              </div>

              {/* Option 3: iPhone / iOS Safari */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-slate-600">
                <span className="font-bold text-slate-800">
                  {lang === 'bn' ? 'আইফোন / আইপ্যাডের জন্য (iOS Safari):' : 'For iPhone / iPad (Safari):'}
                </span>
                <p className="text-[11px]">
                  {lang === 'bn'
                    ? 'সাফারির Share (শেয়ার) আইকনে ট্যাপ করে "Add to Home Screen" নির্বাচন করুন।'
                    : 'Tap the Share icon in Safari and select "Add to Home Screen".'}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl"
              >
                {lang === 'bn' ? 'ঠিক আছে' : 'Got it'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
