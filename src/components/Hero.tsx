"use client";

import React, { useState } from "react";
import ThinkDesignDominate from "./ThinkDesignDominate";
import { Sparkles, Play, Flame, Star, ShieldCheck, ArrowUpRight } from "lucide-react";

interface HeroProps {
  onPreBook?: () => void;
  onWatchMasterclass?: () => void;
}

export default function Hero({ onPreBook, onWatchMasterclass }: HeroProps) {
  return (
    <section
      id="hero"
      className="pt-8 sm:pt-14 pb-16 sm:pb-24 px-4 text-center w-full max-w-[2100px] mx-auto flex flex-col items-center select-none relative"
    >
      {/* Subtle Architectural Corner Registration Crosshairs */}
      <div className="hidden 2xl:flex items-center justify-between w-full absolute top-4 px-12 pointer-events-none text-[10px] font-mono text-black/30">
        <span>+ [ SYSTEM: ART_OF_DESIGN_ACADEMY // BATCH_05 ]</span>
        <span>[ DHAKA: 23°46&apos;N 90°22&apos;E // 60FPS ] +</span>
      </div>

      {/* Centered Pill Badge matching AOD.svg exact 242.5 x 37.5 dimensions with Pulsing Live Dot */}
      <div className="inline-flex items-center justify-center gap-2 px-4 h-[38px] rounded-full border border-black/70 bg-white mb-6 sm:mb-8 shadow-[2px_2px_0px_#000]">
        <span className="w-2 h-2 rounded-full bg-[#FF0022] animate-ping inline-block" />
        <span className="text-[12px] font-bold tracking-[0.06em] text-[#0A0A0C] uppercase">
          FOR NEXT-LEVEL DESIGNERS
        </span>
      </div>

      {/* Main Headline with fluid clamp scaling */}
      <h1 className="font-heading font-black text-[clamp(2.2rem,5vw,6rem)] leading-[1.05] tracking-tight text-[#0A0A0C] uppercase max-w-6xl 2xl:max-w-7xl mx-auto mb-3">
        CRACK THE VISUAL
        <br />
        <span className="sm:whitespace-nowrap">LOGIC MISSING IN BANGLADESH</span>
      </h1>

      {/* Stylized Red Vector Tagline: THIИK. DESIGИ. DOMIИATE. matching AOD.svg */}
      <div className="w-full max-w-[min(92vw,740px)] lg:max-w-[820px] xl:max-w-[920px] my-2 sm:my-3">
        <ThinkDesignDominate />
      </div>

      {/* Two Action Buttons matching AOD.svg exact 248x40 & 247x39 dimensions with Tactile Shadows */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">
        <button
          onClick={onPreBook}
          className="w-[248px] sm:w-[260px] h-[44px] bg-[#FF0022] text-[#FFFFFF] font-heading font-black text-[13px] tracking-wider uppercase flex items-center justify-center gap-1.5 border border-black shadow-[4px_4px_0px_#000] hover:bg-[#E6001E] hover:shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer select-none"
        >
          <span>PRE-BOOK NOW - VOL 5.0</span>
          <ArrowUpRight size={18} />
        </button>

        <button
          onClick={onWatchMasterclass}
          className="w-[247px] sm:w-[260px] h-[43px] bg-white border-2 border-black text-[#0A0A0C] font-heading font-black text-[13px] tracking-wider uppercase flex items-center justify-center gap-2 shadow-[3px_3px_0px_#000] hover:bg-black hover:text-white hover:shadow-[5px_5px_0px_#FF0022] hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer select-none"
        >
          <Play size={14} className="fill-current text-[#FF0022]" />
          <span>WATCH FREE MASTERCLASS</span>
        </button>
      </div>

      {/* Ultra-Luxury Proof Ribbon */}
      <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] sm:text-xs font-mono font-bold uppercase text-[#555] border-t border-b border-black/10 py-3.5 px-4 w-full max-w-4xl">
        <div className="flex items-center gap-1.5">
          <Star size={14} className="text-[#FF0022] fill-[#FF0022]" />
          <span>4.98/5.0 ALUMNI RATING</span>
        </div>
        <span className="hidden sm:inline text-black/30">•</span>
        <div className="flex items-center gap-1.5">
          <Flame size={14} className="text-[#FF0022] fill-[#FF0022]" />
          <span>1,200+ WORKING GRADUATES</span>
        </div>
        <span className="hidden sm:inline text-black/30">•</span>
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-[#FF0022]" />
          <span>100% UNCOMPRESSED RAW PSDS</span>
        </div>
      </div>
    </section>
  );
}
