"use client";

import React, { useState } from "react";
import { X, Play, Clock, Sparkles, CheckCircle2, Volume2, Maximize2 } from "lucide-react";

interface MasterclassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPreBook: () => void;
}

export default function MasterclassModal({
  isOpen,
  onClose,
  onPreBook,
}: MasterclassModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  if (!isOpen) return null;

  const chapters = [
    {
      time: "00:00",
      title: "The Death of Flat Graphics & Rise of Visual Logic",
      desc: "Why 95% of Bangladeshi designs look generic and how to break the mold.",
    },
    {
      time: "07:35",
      title: "Lighting Realism: Direction, Falloff & Ambient Bounce",
      desc: "Deconstructing composite highlights, atmospheric perspective, and depth cues.",
    },
    {
      time: "18:20",
      title: "Raw Layered PSD Anatomy Breakdown",
      desc: "Step-by-step masterclass walkthrough of commercial client manipulation.",
    },
    {
      time: "32:10",
      title: "High-Ticket Client Negotiation & Portfolio Positioning",
      desc: "How AOD graduates secure 4x higher rates from international agencies.",
    },
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-lg overflow-y-auto animate-fadeIn">
      <div className="bg-[#0A0A0C] border-2 border-[#FF0022] max-w-5xl w-full shadow-[12px_12px_0px_#000] relative overflow-hidden my-auto text-white">
        {/* Top Header Bar */}
        <div className="bg-black px-5 py-3.5 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#FF0022] rounded-full animate-pulse" />
            <span className="text-xs font-mono font-black uppercase tracking-widest text-[#FF0022]">
              FREE EXCLUSIVE MASTERCLASS // 45 MIN SESSION
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close masterclass"
            className="w-8 h-8 border border-white/30 bg-white/10 hover:bg-[#FF0022] hover:border-[#FF0022] flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Video Canvas Player Area */}
        <div className="relative w-full aspect-video bg-black overflow-hidden group">
          {isPlaying ? (
            <iframe
              className="w-full h-full border-0"
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
              title="AOD Masterclass"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-tr from-black via-[#111115] to-[#1A1A22]">
              {/* Background Poster Texture & Grid */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#FF0022 1px, transparent 1px), radial-gradient(#FFF 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                  backgroundPosition: "0 0, 12px 12px",
                }}
              />

              {/* Central Play Badge */}
              <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-4">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FF0022] text-white flex items-center justify-center border-4 border-white shadow-[0_0_40px_rgba(255,0,34,0.6)] hover:scale-110 active:scale-95 transition-all cursor-pointer group"
                >
                  <Play size={36} className="ml-1 fill-current" />
                </button>

                <div className="space-y-1 max-w-xl">
                  <h3 className="font-heading font-black text-xl sm:text-3xl uppercase tracking-tight text-white">
                    CRACK THE VISUAL LOGIC // MASTERCLASS
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 font-sans">
                    Conducted by <strong className="text-white">Fatiqul Ferdush Asif</strong> • 45 Mins Commercial Breakdown
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-[11px] font-mono uppercase tracking-wider text-white/80">
                  <Clock size={13} className="text-[#FF0022]" />
                  <span>Full 1080p 60FPS • Free Unlocked Access</span>
                </div>
              </div>

              {/* Bottom HUD Controls Strip */}
              <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-md px-4 py-2 flex items-center justify-between border-t border-white/10 text-xs font-mono text-white/60">
                <div className="flex items-center gap-3">
                  <span className="text-[#FF0022]">● 1080P HD</span>
                  <span>45:20 TOTAL RUNTIME</span>
                </div>
                <div className="flex items-center gap-3">
                  <Volume2 size={14} />
                  <Maximize2 size={14} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Masterclass Chapters & Key Insights */}
        <div className="p-5 sm:p-7 bg-[#0E0F14] border-t border-white/15">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono text-[#FF0022] uppercase tracking-widest block font-bold">
                CURRICULUM BREAKDOWN
              </span>
              <h4 className="font-heading font-black text-lg sm:text-xl uppercase text-white">
                What You Will Master In This Session
              </h4>
            </div>

            <button
              onClick={() => {
                onClose();
                onPreBook();
              }}
              className="px-6 h-[44px] bg-[#FF0022] text-white font-heading font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 border border-black shadow-[3px_3px_0px_#FFF] hover:bg-[#E6001E] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer shrink-0"
            >
              <span>PRE-BOOK BATCH 05 NOW (৳6,000)</span>
              <span>↗</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-4">
            {chapters.map((ch, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveChapter(idx);
                  setIsPlaying(true);
                }}
                className={`p-3 sm:p-4 border transition-all cursor-pointer ${
                  activeChapter === idx
                    ? "bg-[#FF0022]/10 border-[#FF0022]"
                    : "bg-white/[0.03] border-white/10 hover:border-white/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-[#FF0022]">
                    CHAPTER 0{idx + 1} // {ch.time}
                  </span>
                  <CheckCircle2 size={14} className="text-white/40" />
                </div>
                <h5 className="font-heading font-bold text-xs sm:text-sm uppercase text-white mb-1">
                  {ch.title}
                </h5>
                <p className="text-xs text-white/60 line-clamp-2">{ch.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
