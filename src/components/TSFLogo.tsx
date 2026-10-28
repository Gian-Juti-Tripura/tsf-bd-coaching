import React from 'react';

interface TSFLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const TSFLogo: React.FC<TSFLogoProps> = ({
  className = '',
  size = 64,
  showText = false
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="tsfBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="bookGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <filter id="tsfGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Outer Circle Ring */}
        <circle cx="100" cy="100" r="95" fill="#FFFFFF" stroke="#2563EB" strokeWidth="4" />
        <circle cx="100" cy="100" r="88" fill="#F0F7FF" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Top Text Arc Background / Guidelines */}
        <path
          id="textArcTop"
          d="M 28 100 A 72 72 0 1 1 172 100"
          fill="none"
        />
        <text fill="#1E3A8A" fontSize="9.5" fontWeight="800" letterSpacing="0.8">
          <textPath href="#textArcTop" startOffset="50%" textAnchor="middle">
            TSF.BD ADMISSION COACHING PROGRAM
          </textPath>
        </text>

        {/* Bottom Text Arc */}
        <path
          id="textArcBottom"
          d="M 172 100 A 72 72 0 0 1 28 100"
          fill="none"
        />
        <text fill="#1E40AF" fontSize="9" fontWeight="700" letterSpacing="1.2">
          <textPath href="#textArcBottom" startOffset="50%" textAnchor="middle">
            ✦ UNIVERSITY & NURSING ✦
          </textPath>
        </text>

        {/* Inner Circle Border */}
        <circle cx="100" cy="100" r="62" fill="#FFFFFF" stroke="#60A5FA" strokeWidth="2" />

        {/* 3 Golden Stars on top of inner emblem */}
        <g fill="#F59E0B">
          {/* Center Star */}
          <polygon points="100,45 102.5,51 109,51.5 104,55.5 105.5,62 100,58 94.5,62 96,55.5 91,51.5 97.5,51" />
          {/* Left Star */}
          <polygon points="86,49 87.5,53.5 92.5,54 88.5,57 89.5,62 86,59 82.5,62 83.5,57 79.5,54 84.5,53.5" transform="scale(0.8) translate(18, 9)" />
          {/* Right Star */}
          <polygon points="114,49 115.5,53.5 120.5,54 116.5,57 117.5,62 114,59 110.5,62 111.5,57 107.5,54 112.5,53.5" transform="scale(0.8) translate(33, 9)" />
        </g>

        {/* Two Joyful Graduate Figures holding hands */}
        {/* Left Graduate (Crimson Red / Orange) */}
        <g id="studentLeft" fill="#DC2626">
          <circle cx="82" cy="74" r="7" />
          {/* Graduation Cap */}
          <polygon points="82,64 74,68 82,71 90,68" fill="#1E293B" />
          <line x1="88" y1="69" x2="88" y2="74" stroke="#F59E0B" strokeWidth="1" />
          {/* Body */}
          <path d="M 82 82 C 72 84 66 94 65 104 C 74 100 86 94 88 88 Z" />
        </g>

        {/* Right Graduate (Cyan / Blue) */}
        <g id="studentRight" fill="#0284C7">
          <circle cx="118" cy="74" r="7" />
          {/* Graduation Cap */}
          <polygon points="118,64 110,68 118,71 126,68" fill="#1E293B" />
          <line x1="124" y1="69" x2="124" y2="74" stroke="#F59E0B" strokeWidth="1" />
          {/* Body */}
          <path d="M 118 82 C 128 84 134 94 135 104 C 126 100 114 94 112 88 Z" />
        </g>

        {/* Central Mini Crest (TSF Bangladesh Estd 1992) */}
        <circle cx="100" cy="98" r="14" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="100" cy="98" r="11" fill="#FFFFFF" />
        <path d="M96 95 L100 91 L104 95 L102 103 L98 103 Z" fill="#DC2626" />
        <text x="100" y="101" fill="#1E3A8A" fontSize="4.5" fontWeight="900" textAnchor="middle">TSF</text>

        {/* Open Book in Cyan and Deep Blue */}
        <g id="openBook">
          {/* Left Page Layer 1 */}
          <path d="M 100 135 C 85 130 65 132 50 120 C 52 136 75 146 100 152 Z" fill="#0284C7" />
          {/* Right Page Layer 1 */}
          <path d="M 100 135 C 115 130 135 132 150 120 C 148 136 125 146 100 152 Z" fill="#0369A1" />

          {/* Left Page Layer 2 */}
          <path d="M 100 128 C 85 123 68 126 55 116 C 57 128 78 138 100 144 Z" fill="#38BDF8" />
          {/* Right Page Layer 2 */}
          <path d="M 100 128 C 115 123 132 126 145 116 C 143 128 122 138 100 144 Z" fill="#0EA5E9" />

          {/* Top Page Base (White/Light Blue) */}
          <path d="M 100 122 C 86 117 72 120 62 112 C 64 122 82 130 100 136 C 118 130 136 122 138 112 C 128 120 114 117 100 122 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="0.8" />

          {/* Central Mini Globe in Book Spine */}
          <circle cx="100" cy="118" r="6" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1" />
          <ellipse cx="100" cy="118" rx="3.5" ry="5.5" fill="none" stroke="#0284C7" strokeWidth="0.7" />
          <line x1="94" y1="118" x2="106" y2="118" stroke="#0284C7" strokeWidth="0.7" />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-blue-900 tracking-tight text-lg leading-tight">TSF.BD</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800 border border-blue-200">2026–27</span>
          </div>
          <span className="text-xs font-semibold text-slate-700 leading-tight">Admission Coaching Program</span>
          <span className="text-[11px] font-bangla text-blue-700 font-medium">ঐক্য • শিক্ষা • প্রগতি</span>
        </div>
      )}
    </div>
  );
};
