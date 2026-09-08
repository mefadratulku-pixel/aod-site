"use client";

import React, { useEffect, useRef } from "react";
import { animate } from "animejs";

export default function AnnouncementBar() {
  const beaconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (beaconRef.current) {
      animate(beaconRef.current, {
        scale: [1, 2.2],
        opacity: [0.9, 0],
        duration: 1400,
        ease: "outQuad",
        loop: true,
      });
    }
  }, []);

  return (
    <aside
      aria-label="Announcement"
      className="w-full bg-[#FF0022] text-[#000000] py-2.5 px-4 text-xs sm:text-sm font-bold tracking-wider uppercase select-none border-b border-black/10 relative overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-6 whitespace-nowrap">
        <span className="flex-1 text-center font-black hover:scale-[1.01] transition-transform cursor-pointer">
          LEARN THE MISSING INDUSTRY MODULES
        </span>

        <span className="hidden md:inline-block text-black/30 font-light">/</span>

        <span className="flex-1 text-center font-black hover:scale-[1.01] transition-transform cursor-pointer">
          WATCH FREE MASTERCLASS NOW
        </span>

        <span className="hidden md:inline-block text-black/30 font-light">/</span>

        <span className="flex-1 text-center font-black hover:scale-[1.01] transition-transform cursor-pointer inline-flex items-center justify-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span
              ref={beaconRef}
              className="absolute inline-flex h-full w-full rounded-full bg-black opacity-75"
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black" />
          </span>
          <span>BATCH 05 PRE-BOOKING IS LIVE</span>
        </span>
      </div>
    </aside>
  );
}
