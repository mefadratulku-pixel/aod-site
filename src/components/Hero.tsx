"use client";

import React from "react";
import ThinkDesignDominate from "./ThinkDesignDominate";

interface HeroProps {
  onPreBook?: () => void;
  onWatchMasterclass?: () => void;
}

export default function Hero({ onPreBook, onWatchMasterclass }: HeroProps) {
  return (
    <section className="pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 text-center w-full max-w-[1280px] mx-auto flex flex-col items-center select-none">
      {/* Centered Pill Badge matching AOD.svg exact 242.5 x 37.5 dimensions */}
      <div className="inline-flex items-center justify-center w-[242.5px] h-[37.5px] rounded-full border border-black/70 bg-white mb-6 sm:mb-8">
        <span className="text-[12px] font-bold tracking-[0.06em] text-[#0A0A0C] uppercase">
          FOR NEXT-LEVEL DESIGNERS
        </span>
      </div>

      {/* Main Headline matching AOD.svg exact 2-line break */}
      <h1 className="font-heading font-black text-[32px] sm:text-[46px] md:text-[54px] lg:text-[60px] leading-[1.08] tracking-tight text-[#0A0A0C] uppercase max-w-5xl mx-auto mb-3">
        CRACK THE VISUAL
        <br />
        <span className="sm:whitespace-nowrap">LOGIC MISSING IN BANGLADESH</span>
      </h1>

      {/* Stylized Red Vector Tagline: THIИK. DESIGИ. DOMIИATE. */}
      <div className="w-full max-w-[min(90vw,620px)] my-2 sm:my-3">
        <ThinkDesignDominate />
      </div>

      {/* Two Action Buttons matching AOD.svg exact 248x40 & 247x39 dimensions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">
        <button
          onClick={onPreBook}
          className="w-[248px] h-[40px] bg-[#FF0022] text-[#FFFFFF] font-heading font-extrabold text-[13px] tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-[#E6001E] active:scale-[0.98] transition-all cursor-pointer select-none"
        >
          <span>PRE-BOOK NOW - VOL 5.0</span>
          <span className="text-base leading-none">↗</span>
        </button>

        <button
          onClick={onWatchMasterclass}
          className="w-[247px] h-[39px] bg-white border border-black text-[#0A0A0C] font-heading font-extrabold text-[13px] tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-black hover:text-white active:scale-[0.98] transition-all cursor-pointer select-none"
        >
          <span>WATCH FREE MASTERCLASS</span>
          <span className="text-base leading-none">↗</span>
        </button>
      </div>
    </section>
  );
}
