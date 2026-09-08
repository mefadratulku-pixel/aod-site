"use client";

import React from "react";

export default function AnnouncementBar() {
  return (
    <aside
      aria-label="Announcement"
      className="w-full bg-[#FF0022] text-[#000000] h-[44px] flex items-center select-none relative z-40 border-b border-black/10"
    >
      <div className="w-full max-w-[2100px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 flex items-center justify-between text-[11px] sm:text-[13px] md:text-[14px] font-black tracking-wider uppercase">
        <span className="hidden md:inline-block">
          LEARN THE MISSING INDUSTRY MODULES
        </span>

        <span className="hidden sm:inline-block text-center flex-1 md:flex-none">
          WATCH FREE MASTERCLASS NOW
        </span>

        <span className="text-right sm:text-right w-full sm:w-auto">
          BATCH 05 PRE-BOOKING IS LIVE
        </span>
      </div>
    </aside>
  );
}
