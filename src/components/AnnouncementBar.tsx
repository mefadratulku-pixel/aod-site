"use client";

import React from "react";
import { Sparkles, Play } from "lucide-react";

interface AnnouncementBarProps {
  onWatchMasterclass?: () => void;
}

export default function AnnouncementBar({ onWatchMasterclass }: AnnouncementBarProps) {
  return (
    <aside
      aria-label="Announcement"
      className="w-full bg-[#FF0022] text-[#000000] h-[44px] flex items-center select-none relative z-40 border-b border-black/15"
    >
      <div className="w-full max-w-[2100px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 flex items-center justify-between text-[11px] sm:text-[13px] md:text-[14px] font-black tracking-wider uppercase">
        <div className="hidden md:flex items-center gap-2">
          <Sparkles size={14} className="text-black" />
          <span>LEARN THE MISSING INDUSTRY MODULES</span>
        </div>

        <button
          onClick={onWatchMasterclass}
          className="hidden sm:inline-flex items-center gap-1.5 text-center flex-1 md:flex-none justify-center hover:text-white transition-colors cursor-pointer group"
        >
          <Play size={12} className="fill-current group-hover:scale-110 transition-transform" />
          <span className="underline underline-offset-4 decoration-black/40 group-hover:decoration-white">
            WATCH FREE MASTERCLASS NOW
          </span>
        </button>

        <div className="flex items-center gap-2 text-right sm:text-right w-full sm:w-auto justify-end">
          <span className="w-2 h-2 rounded-full bg-black animate-ping" />
          <span>BATCH 05 PRE-BOOKING IS LIVE</span>
        </div>
      </div>
    </aside>
  );
}
