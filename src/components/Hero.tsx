"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import ThinkDesignDominate from "./ThinkDesignDominate";

interface HeroProps {
  onPreBook?: () => void;
  onWatchMasterclass?: () => void;
}

export default function Hero({ onPreBook, onWatchMasterclass }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const headingWordsRef = useRef<HTMLSpanElement[]>([]);
  const taglineRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // 1. Pill badge drop-in
    if (pillRef.current) {
      animate(pillRef.current, {
        translateY: [-24, 0],
        opacity: [0, 1],
        duration: 800,
        ease: "outBack",
      });
    }

    // 2. Staggered heading reveal
    if (headingWordsRef.current.length > 0) {
      animate(headingWordsRef.current, {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 900,
        delay: stagger(60, { start: 150 }),
        ease: "outExpo",
      });
    }

    // 3. Tagline reveal and subtle floating breath
    if (taglineRef.current) {
      animate(taglineRef.current, {
        scale: [0.92, 1],
        opacity: [0, 1],
        duration: 1100,
        delay: 450,
        ease: "outElastic(1, .75)",
      });
    }

    // 4. CTA buttons stagger
    if (buttonsRef.current) {
      const btns = buttonsRef.current.querySelectorAll("button");
      animate(btns, {
        translateY: [25, 0],
        opacity: [0, 1],
        duration: 800,
        delay: stagger(100, { start: 600 }),
        ease: "outBack",
      });
    }
  }, []);

  // Magnetic button physics with Anime.js
  const handleButtonMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    targetBtn: HTMLButtonElement | null
  ) => {
    if (!targetBtn) return;
    const rect = targetBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    animate(targetBtn, {
      translateX: x * 0.25,
      translateY: y * 0.25,
      duration: 200,
      ease: "outQuad",
    });
  };

  const handleButtonMouseLeave = (targetBtn: HTMLButtonElement | null) => {
    if (!targetBtn) return;
    animate(targetBtn, {
      translateX: 0,
      translateY: 0,
      duration: 600,
      ease: "outElastic(1, .5)",
    });
  };

  const line1 = ["CRACK", "THE", "VISUAL"];
  const line2 = ["LOGIC", "MISSING", "IN", "BANGLADESH"];

  return (
    <section
      ref={containerRef}
      className="relative pt-12 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 text-center max-w-[1280px] mx-auto flex flex-col items-center select-none overflow-hidden"
    >
      {/* Decorative Technical Crosshairs */}
      <div className="absolute top-10 left-6 text-[10px] tracking-widest text-black/30 font-mono hidden md:block select-none">
        [AOD // ARCHITECTURE 2026]
      </div>
      <div className="absolute top-10 right-6 text-[10px] tracking-widest text-black/30 font-mono hidden md:block select-none">
        +23.8103° N, 90.4125° E
      </div>

      {/* Pill Badge */}
      <div
        ref={pillRef}
        className="opacity-0 inline-flex items-center justify-center px-6 py-2 rounded-full border border-black/70 mb-8 sm:mb-10 bg-white/60 backdrop-blur-xs hover:border-[#FF0022] hover:text-[#FF0022] transition-colors cursor-default"
      >
        <span className="text-xs sm:text-sm font-semibold tracking-[0.08em] text-[#1A1C1C] uppercase">
          FOR NEXT-LEVEL DESIGNERS
        </span>
      </div>

      {/* Main Massive Heading with Staggered Word Reveal */}
      <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-tight text-[#0A0A0C] uppercase max-w-4xl mx-auto mb-3 sm:mb-4">
        <span className="block overflow-hidden">
          {line1.map((word, i) => (
            <span
              key={word}
              ref={(el) => {
                if (el) headingWordsRef.current[i] = el;
              }}
              className="inline-block mx-1.5 sm:mx-2 opacity-0"
            >
              {word}
            </span>
          ))}
        </span>
        <span className="block overflow-hidden">
          {line2.map((word, i) => (
            <span
              key={word}
              ref={(el) => {
                if (el) headingWordsRef.current[line1.length + i] = el;
              }}
              className="inline-block mx-1.5 sm:mx-2 opacity-0"
            >
              {word}
            </span>
          ))}
        </span>
      </h1>

      {/* Stylized Red Vector Tagline: THINK. DESIGN. DOMINATE. */}
      <div
        ref={taglineRef}
        className="opacity-0 w-full max-w-[620px] px-4 my-2 sm:my-3 filter drop-shadow-xs"
      >
        <ThinkDesignDominate className="hover:scale-[1.03] transition-transform duration-300 cursor-pointer" />
      </div>

      {/* Call To Action Buttons with Magnetic Anime.js Physics */}
      <div
        ref={buttonsRef}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10 w-full max-w-md sm:max-w-none"
      >
        {/* Red Primary Button */}
        <button
          ref={btn1Ref}
          onClick={onPreBook}
          onMouseMove={(e) => handleButtonMouseMove(e, btn1Ref.current)}
          onMouseLeave={() => handleButtonMouseLeave(btn1Ref.current)}
          className="opacity-0 btn-red w-full sm:w-[250px] h-[46px] text-xs sm:text-sm tracking-wider shadow-sm hover:shadow-lg active:scale-95 transition-all gap-2"
        >
          <span>PRE-BOOK NOW - VOL 5.0</span>
          <span className="text-base leading-none">↗</span>
        </button>

        {/* Outline Secondary Button */}
        <button
          ref={btn2Ref}
          onClick={onWatchMasterclass}
          onMouseMove={(e) => handleButtonMouseMove(e, btn2Ref.current)}
          onMouseLeave={() => handleButtonMouseLeave(btn2Ref.current)}
          className="opacity-0 btn-outline w-full sm:w-[250px] h-[46px] text-xs sm:text-sm tracking-wider shadow-sm hover:shadow-lg active:scale-95 transition-all gap-2"
        >
          <span>WATCH FREE MASTERCLASS</span>
          <span className="text-base leading-none">↗</span>
        </button>
      </div>
    </section>
  );
}
