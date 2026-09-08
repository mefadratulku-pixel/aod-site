"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle2, ChevronDown, ChevronUp, Sparkles, Layers, ArrowUpRight } from "lucide-react";

interface IndustryModulesProps {
  onEnroll?: (courseTitle: string) => void;
}

export default function IndustryModules({ onEnroll }: IndustryModulesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [expandedSyllabus, setExpandedSyllabus] = useState<string | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 450;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const toggleSyllabus = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedSyllabus(expandedSyllabus === id ? null : id);
  };

  const courses = [
    {
      id: "vol-4",
      badge: "ON GOING // BATCH 05",
      title: "THE ART OF DESIGN WITH MANIPULATION - VOL 4.0",
      instructor: "Mentored by Fatiqul Ferdush Asif",
      originalPrice: "৳15,000",
      salePrice: "৳6,000",
      discountBadge: "60% OFF",
      image: "/images/course_1.jpg",
      modulesCount: "24 Modules",
      duration: "60+ Hours",
      syllabus: [
        "Light Direction & Complex Shadow Physics",
        "Photorealistic Composite Blending & Match-Color",
        "High-End Commercial Advertising Architecture",
        "1.4 GB Uncompressed Raw Layered PSDs Included",
      ],
    },
    {
      id: "creativity-reset",
      badge: "PUBLISHED // ON-DEMAND",
      title: "CREATIVITY RESET 1.0 - WORKSHOP",
      instructor: "Mentored by Fatiqul Ferdush Asif",
      originalPrice: "৳15,000",
      salePrice: "৳6,000",
      discountBadge: "60% OFF",
      image: "/images/course_2.png",
      modulesCount: "16 Modules",
      duration: "40+ Hours",
      syllabus: [
        "Deconstructing Creative Mental Blocks & Burnout",
        "Rapid Ideation: Mind-Mapping to Finished Poster",
        "Grid Disruption & Modern Swiss Brutalism",
        "International Client Pitching & Case Study Deck",
      ],
    },
    {
      id: "survive-ai",
      badge: "PUBLISHED // ON-DEMAND",
      title: "SURVIVE THE AI ERA - WORKSHOP",
      instructor: "Mentored by Fatiqul Ferdush Asif",
      originalPrice: "৳15,000",
      salePrice: "৳6,000",
      discountBadge: "60% OFF",
      image: "/images/course_survive_ai.png",
      modulesCount: "18 Modules",
      duration: "45+ Hours",
      syllabus: [
        "Leveraging Midjourney & ComfyUI Without Looking AI",
        "Bespoke Typography & Manual Retouching Mastery",
        "Developing an Un-replaceable Artistic Signature",
        "Agency-Grade AI Workflow Integration Guide",
      ],
    },
  ];

  return (
    <section
      id="courses"
      className="py-12 sm:py-20 w-full max-w-[2100px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 select-none relative"
    >
      {/* Section Header matching AOD.svg */}
      <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-[#CFC4C5]">
        <div className="flex items-center gap-3">
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl xl:text-[42px] tracking-tight text-[#0A0A0C] uppercase">
            INDUSTRY-LEVEL MODULES
          </h2>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FF0022] text-white text-[10px] font-mono font-bold uppercase tracking-wider border border-black shadow-[2px_2px_0px_#000]">
            <Sparkles size={12} />
            <span>ENROLLMENT LIVE</span>
          </span>
        </div>

        {/* Navigation Arrows matching AOD.svg */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous module"
            className="w-[28px] h-[32px] sm:w-[32px] sm:h-[36px] border border-[#7E7576] flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors cursor-pointer select-none shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next module"
            className="w-[28px] h-[32px] sm:w-[32px] sm:h-[36px] border border-[#7E7576] flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors cursor-pointer select-none shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Cards Grid: 3 Columns with Ultra-Tactile Depth */}
      <div
        ref={scrollContainerRef}
        className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-10 2xl:gap-12 pb-2"
      >
        {courses.map((item) => (
          <div
            key={item.id}
            className="border-2 border-black bg-white flex flex-col justify-between overflow-hidden group w-full shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#FF0022] hover:-translate-y-1.5 transition-all duration-300"
          >
            {/* Top Image Box (aspect-[4/5]) */}
            <Link
              href={`/courses/${item.id}`}
              className="relative w-full aspect-[4/5] bg-[#0A0A0C] overflow-hidden border-b-2 border-black block cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                priority
              />

              {/* Status Badge */}
              <div className="absolute top-3.5 left-3.5 z-10 bg-white px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-black tracking-wider text-[#0A0A0C] uppercase border border-black shadow-[2px_2px_0px_#000]">
                {item.badge}
              </div>

              {/* Discount Badge */}
              <div className="absolute top-3.5 right-3.5 z-10 bg-[#FF0022] text-white px-2.5 py-1 text-[11px] font-mono font-black uppercase tracking-wider border border-black shadow-[2px_2px_0px_#000]">
                {item.discountBadge}
              </div>

              {/* Bottom Specs Pill */}
              <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between bg-black/85 backdrop-blur-md px-3 py-1.5 border border-white/20 text-white text-[11px] font-mono font-bold uppercase">
                <span>{item.modulesCount}</span>
                <span>•</span>
                <span>{item.duration}</span>
                <span>•</span>
                <span className="text-[#FF0022]">RAW PSDS</span>
              </div>
            </Link>

            {/* Card Body Information */}
            <div className="p-5 sm:p-7 flex flex-col justify-between flex-grow bg-white space-y-4">
              <div>
                <Link href={`/courses/${item.id}`}>
                  <h3 className="font-heading font-black text-base sm:text-lg xl:text-xl leading-snug tracking-tight text-[#0A0A0C] uppercase min-h-[48px] hover:text-[#FF0022] transition-colors">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-xs text-[#666] font-medium mt-1">
                  {item.instructor}
                </p>
              </div>

              {/* Interactive Syllabus Peek Accordion */}
              <div className="border border-black/15 bg-[#FBFBFB] p-2.5 transition-all">
                <button
                  onClick={(e) => toggleSyllabus(item.id, e)}
                  className="w-full flex items-center justify-between text-[11px] font-mono font-black text-black uppercase hover:text-[#FF0022] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Layers size={13} className="text-[#FF0022]" />
                    <span>CURRICULUM SYLLABUS</span>
                  </span>
                  {expandedSyllabus === item.id ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {expandedSyllabus === item.id && (
                  <ul className="mt-2.5 pt-2 border-t border-black/10 space-y-1.5 text-xs text-[#444] font-sans animate-fadeIn">
                    {item.syllabus.map((topic, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-[#FF0022] shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Price & Action Button matching AOD.svg */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-black/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm sm:text-base xl:text-lg text-[#FF0022] line-through font-bold">
                    {item.originalPrice}
                  </span>
                  <span className="text-xl sm:text-2xl xl:text-3xl font-black text-[#0A0A0C]">
                    {item.salePrice}
                  </span>
                </div>

                <button
                  onClick={() => onEnroll && onEnroll(item.title)}
                  className="w-[148px] sm:w-[160px] h-[44px] bg-[#FF0022] text-[#FFFFFF] font-heading font-extrabold text-[13px] tracking-wider uppercase flex items-center justify-center gap-1 hover:bg-[#E6001E] border border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer select-none"
                >
                  <span>PRE-BOOK</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
