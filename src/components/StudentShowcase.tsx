"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
  X,
  ExternalLink,
  Layers,
  Eye,
  Share2,
} from "lucide-react";

interface StudentShowcaseProps {
  onExplorePortfolios?: () => void;
  onReadReviews?: () => void;
}

export default function StudentShowcase({
  onExplorePortfolios,
  onReadReviews,
}: StudentShowcaseProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<any | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const showcaseItems = [
    {
      id: "fardin-1",
      student: "FARDIN - VOL 2.0",
      title: "SYNERGY // AURALIS 3D FORM",
      category: "Futuristic Art Direction",
      tools: "Adobe Photoshop • Cinema 4D • Octane",
      description:
        "Commercial visual manipulation exploring dynamic fluid chrome mechanics, high-contrast atmospheric rim lighting, and typographic harmony.",
      image: "/images/showcase_1.jpg",
    },
    {
      id: "fardin-2",
      student: "FARDIN - VOL 2.0",
      title: "CRACKED HELMET // PHOTOREALISM",
      category: "Complex Photo Manipulation",
      tools: "Photoshop • Substance 3D • Camera Raw",
      description:
        "Hyper-realistic composite studying cracked composite glass refraction, dynamic smoke emitters, and multi-source ambient lighting.",
      image: "/images/showcase_2.jpg",
    },
    {
      id: "bappy-1",
      student: "BAPPY - VOL 2.0",
      title: "NEO-TOKYO // CYBER TYPOGRAPHY",
      category: "Editorial Brutalism",
      tools: "Photoshop • Illustrator • Grid Systems",
      description:
        "High-density brutalist editorial poster exploring Japanese kanji typography, distressed photocopy textures, and micro-grid architecture.",
      image: "/images/showcase_3.jpg",
    },
    {
      id: "shahed-1",
      student: "SHAHED - VOL 3.0",
      title: "ASTRA NOVA // SURREAL COSMOS",
      category: "Commercial Glass Physics",
      tools: "Photoshop • Blender 4.2 • Lightroom",
      description:
        "Cosmic glass sphere refraction and volumetric planetary lighting crafted for high-ticket luxury cosmetics branding.",
      image: "/images/showcase_4.jpg",
    },
    {
      id: "rohan-1",
      student: "ROHAN - VOL 4.0",
      title: "LIQUID FORM // CHROME SCULPTURE",
      category: "Luxury Exhibition Branding",
      tools: "Photoshop • Cinema 4D • Redshift",
      description:
        "Monolithic chrome fluid sculpture exploring high-gloss Fresnel reflections, caustic dispersion, and minimalist museum typography.",
      image: "/images/showcase_5.jpg",
    },
    {
      id: "saif-1",
      student: "SAIF - VOL 4.0",
      title: "CYBERNETIC OPTIC AUGMENTATION",
      category: "Technical Neural Interface",
      tools: "Photoshop • Illustrator • DCI-P3 Color",
      description:
        "Biotech neural HUD schematics overlaid on photorealistic human eye macro composition with chromatic aberration tuning.",
      image: "/images/showcase_6.jpg",
    },
  ];

  // Duplicated array for seamless infinite marquee
  const infiniteItems = [...showcaseItems, ...showcaseItems];

  const handleManualShift = (direction: "left" | "right") => {
    if (scrollTrackRef.current) {
      const shiftAmount = direction === "left" ? -400 : 400;
      scrollTrackRef.current.scrollBy({
        left: shiftAmount,
        behavior: "smooth",
      });
    }
  };

  const handleArtworkClick = (item: any) => {
    setSelectedArtwork(item);
  };

  const handleNavigateArtwork = (direction: "prev" | "next") => {
    if (!selectedArtwork) return;
    const currentIndex = showcaseItems.findIndex((x) => x.id === selectedArtwork.id);
    if (direction === "prev") {
      const prevIndex = (currentIndex - 1 + showcaseItems.length) % showcaseItems.length;
      setSelectedArtwork(showcaseItems[prevIndex]);
    } else {
      const nextIndex = (currentIndex + 1) % showcaseItems.length;
      setSelectedArtwork(showcaseItems[nextIndex]);
    }
  };

  return (
    <section
      id="portfolios"
      className="py-14 sm:py-24 w-full overflow-hidden select-none bg-[#F9F9F9] relative"
    >
      {/* Background Micro Coordinates Grid Decoration */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="w-full max-w-[2100px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 relative z-10">
        {/* Section Header matching AOD.svg with Curated Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-5 border-b border-[#CFC4C5] gap-3">
          <div className="flex items-center gap-3">
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl xl:text-[42px] tracking-tight text-[#0A0A0C] uppercase">
              AOD STUDENT DESIGN SHOWCASE
            </h2>
            <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 bg-black text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-[2px_2px_0px_#FF0022]">
              <Sparkles size={12} className="text-[#FF0022]" />
              <span>PINTEREST CURATED // CLICK TO INSPECT</span>
            </span>
          </div>

          {/* Controls: Manual Arrows & Pause/Play */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? "Resume Auto-scroll" : "Pause Auto-scroll"}
              className="px-2.5 h-[32px] sm:h-[36px] border border-[#7E7576] flex items-center gap-1.5 bg-white text-[11px] font-mono font-bold uppercase hover:bg-black hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
            >
              {isPaused ? (
                <Play size={14} className="fill-current text-[#FF0022]" />
              ) : (
                <Pause size={14} className="fill-current text-black" />
              )}
              <span className="hidden sm:inline">{isPaused ? "RESUME" : "PAUSE"}</span>
            </button>

            <button
              onClick={() => handleManualShift("left")}
              aria-label="Previous showcase"
              className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] border border-[#7E7576] flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleManualShift("right")}
              aria-label="Next showcase"
              className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] border border-[#7E7576] flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Satisfying Auto-Moving Infinite Pinterest Gallery */}
      <div
        ref={scrollTrackRef}
        className="mt-8 sm:mt-12 overflow-x-auto no-scrollbar w-full py-4 relative"
      >
        <div
          className={`animate-portfolio-auto gap-6 sm:gap-8 px-4 sm:px-8 ${
            isPaused ? "!animation-play-state-paused" : ""
          }`}
          style={isPaused ? { animationPlayState: "paused" } : {}}
        >
          {infiniteItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => handleArtworkClick(item)}
              className="w-[280px] sm:w-[340px] md:w-[380px] lg:w-[410px] xl:w-[440px] shrink-0 border-2 border-black bg-[#EAEAEA] relative aspect-[3/4] overflow-hidden group transition-all duration-300 hover:-translate-y-2 shadow-[5px_5px_0px_#000] hover:shadow-[8px_8px_0px_#FF0022] cursor-pointer"
            >
              {/* High-Resolution Artwork */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 280px, (max-width: 1200px) 380px, 440px"
                className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                priority={index < 4}
              />

              {/* Student Tag Badge matching AOD.svg */}
              <div className="absolute bottom-3.5 right-3.5 z-20 bg-white px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-black tracking-wider text-[#0A0A0C] uppercase border border-black shadow-[2px_2px_0px_#000]">
                {item.student}
              </div>

              {/* Top Quick Inspect Eye Pill */}
              <div className="absolute top-3 left-3 z-20 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold text-white uppercase border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5">
                <Eye size={12} className="text-[#FF0022]" />
                <span>INSPECT POSTER</span>
              </div>

              {/* Hover Dark Overlay with Pinterest-style Metadata */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6 z-10 text-white">
                <span className="text-[10px] font-mono font-bold text-[#FF0022] uppercase tracking-widest mb-1">
                  {item.category}
                </span>
                <h3 className="font-heading font-black text-sm sm:text-base lg:text-lg uppercase leading-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-[11px] text-white/70 font-sans line-clamp-2 mb-3">
                  {item.description}
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FF0022]">
                  <span>OPEN FULL-SCREEN INSPECTOR</span>
                  <span>↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons Below Showcase matching AOD.svg */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10 sm:mt-14 px-4 relative z-10">
        <button
          onClick={onExplorePortfolios}
          className="w-[248px] sm:w-[260px] h-[40px] sm:h-[44px] bg-[#000000] text-[#FFFFFF] font-heading font-extrabold text-[13px] tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-[#1F1F1F] active:scale-[0.98] transition-all cursor-pointer select-none shadow-[4px_4px_0px_#FF0022]"
        >
          <span>EXPLORE ALL PORTFOLIOS</span>
          <span className="text-base leading-none">↗</span>
        </button>

        <button
          onClick={onReadReviews}
          className="w-[247px] sm:w-[260px] h-[39px] sm:h-[43px] bg-white border-2 border-black text-[#0A0A0C] font-heading font-extrabold text-[13px] tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-black hover:text-white active:scale-[0.98] transition-all cursor-pointer select-none shadow-[3px_3px_0px_#000]"
        >
          <span>READ STUDENT REVIEWS</span>
          <span className="text-base leading-none">↗</span>
        </button>
      </div>

      {/* ========================================================
          JAW-DROPPING ARTWORK LIGHTBOX INSPECTOR MODAL
          ======================================================== */}
      {selectedArtwork && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
          <div className="bg-[#0A0A0C] border-2 border-white/20 max-w-6xl w-full shadow-[16px_16px_0px_#000] relative overflow-hidden my-auto grid grid-cols-1 lg:grid-cols-12 text-white">
            {/* Close Button */}
            <button
              onClick={() => setSelectedArtwork(null)}
              aria-label="Close artwork inspector"
              className="absolute top-4 right-4 z-30 w-9 h-9 border border-white/30 bg-black text-white hover:bg-[#FF0022] hover:border-[#FF0022] flex items-center justify-center transition-colors cursor-pointer shadow-[2px_2px_0px_#FFF]"
            >
              <X size={18} />
            </button>

            {/* Left: Full Poster Artboard */}
            <div className="lg:col-span-7 bg-black p-4 sm:p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/15 relative min-h-[380px] sm:min-h-[500px]">
              <div className="relative w-full max-w-[420px] aspect-[3/4] border-2 border-white/20 shadow-2xl overflow-hidden bg-[#111]">
                <Image
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>

              {/* Prev / Next Navigation Arrows */}
              <button
                onClick={() => handleNavigateArtwork("prev")}
                aria-label="Previous artwork"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 border border-white/30 text-white hover:bg-[#FF0022] hover:border-[#FF0022] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => handleNavigateArtwork("next")}
                aria-label="Next artwork"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 border border-white/30 text-white hover:bg-[#FF0022] hover:border-[#FF0022] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Right: Technical Spec Sheet & Designer Notes */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#0E0F14]">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[10px] font-mono font-bold text-[#FF0022] uppercase tracking-widest">
                    PINTEREST EDITORIAL CURATION
                  </span>
                  <span className="text-[10px] font-mono text-white/50 uppercase">
                    ORIGINAL PSD ARCHIVE
                  </span>
                </div>

                <div>
                  <span className="inline-block px-2.5 py-0.5 bg-[#FF0022]/15 border border-[#FF0022] text-[#FF0022] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                    {selectedArtwork.student}
                  </span>
                  <h3 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-white">
                    {selectedArtwork.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 mt-2 font-sans leading-relaxed">
                    {selectedArtwork.description}
                  </p>
                </div>

                {/* Technical Stack */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers size={13} className="text-[#FF0022]" />
                    <span>SOFTWARE & PIPELINE</span>
                  </span>
                  <div className="p-3 bg-white/[0.04] border border-white/10 text-xs font-mono text-white/90">
                    {selectedArtwork.tools}
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
                    KEY MASTERY HIGHLIGHTS
                  </span>
                  <ul className="text-xs text-white/80 space-y-1.5 font-sans">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#FF0022] rounded-full" />
                      <span>Advanced Color Harmonization & Split Toning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#FF0022] rounded-full" />
                      <span>Custom Displacement & Procedural Noise Maps</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#FF0022] rounded-full" />
                      <span>High-Ticket Editorial Layout Execution</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/15 flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedArtwork(null);
                    if (onExplorePortfolios) onExplorePortfolios();
                  }}
                  className="flex-1 h-[46px] bg-[#FF0022] text-white font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-black shadow-[3px_3px_0px_#FFF] hover:bg-[#E6001E] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <span>SEE ALL FROM THIS BATCH</span>
                  <span>↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
