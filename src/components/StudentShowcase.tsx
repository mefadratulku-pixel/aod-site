"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StudentShowcaseProps {
  onExplorePortfolios?: () => void;
  onReadReviews?: () => void;
}

export default function StudentShowcase({
  onExplorePortfolios,
  onReadReviews,
}: StudentShowcaseProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 450;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const showcaseItems = [
    {
      id: "fardin-1",
      student: "FARDIN - VOL 2.0",
      image: "/images/showcase_1.jpg",
    },
    {
      id: "fardin-2",
      student: "FARDIN - VOL 2.0",
      image: "/images/showcase_2.jpg",
    },
    {
      id: "bappy-1",
      student: "BAPPY - VOL 2.0",
      image: "/images/showcase_3.jpg",
    },
  ];

  return (
    <section
      id="portfolios"
      className="py-12 sm:py-20 w-full max-w-[2100px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28"
    >
      {/* Section Header matching AOD.svg */}
      <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-[#CFC4C5]">
        <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl xl:text-[42px] tracking-tight text-[#0A0A0C] uppercase">
          AOD STUDENT DESIGN SHOWCASE
        </h2>

        {/* Small Navigation Arrows matching AOD.svg 24.4 x 29 dimensions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous showcase"
            className="w-[28px] h-[32px] sm:w-[32px] sm:h-[36px] border border-[#7E7576] flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors cursor-pointer select-none"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next showcase"
            className="w-[28px] h-[32px] sm:w-[32px] sm:h-[36px] border border-[#7E7576] flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors cursor-pointer select-none"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Showcase Cards matching AOD.svg */}
      <div
        ref={scrollContainerRef}
        className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-10 2xl:gap-12 pb-2"
      >
        {showcaseItems.map((item) => (
          <div
            key={item.id}
            className="border border-black relative aspect-[4/5] bg-[#EAEAEA] overflow-hidden group w-full"
          >
            <Image
              src={item.image}
              alt={item.student}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
            />

            {/* Student Name Badge at Bottom-Right matching AOD.svg */}
            <div className="absolute bottom-3.5 right-3.5 z-10 bg-white px-3.5 py-1 text-[11px] sm:text-xs font-extrabold tracking-wider text-[#0A0A0C] uppercase border border-black/30">
              {item.student}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons Below Showcase matching AOD.svg 248x40 & 247x39 dimensions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10 sm:mt-14">
        <button
          onClick={onExplorePortfolios}
          className="w-[248px] sm:w-[260px] h-[40px] sm:h-[44px] bg-[#000000] text-[#FFFFFF] font-heading font-extrabold text-[13px] tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-[#1F1F1F] active:scale-[0.98] transition-all cursor-pointer select-none"
        >
          <span>EXPLORE ALL PORTFOLIOS</span>
          <span className="text-base leading-none">↗</span>
        </button>

        <button
          onClick={onReadReviews}
          className="w-[247px] sm:w-[260px] h-[39px] sm:h-[43px] bg-white border border-black text-[#0A0A0C] font-heading font-extrabold text-[13px] tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-black hover:text-white active:scale-[0.98] transition-all cursor-pointer select-none"
        >
          <span>READ STUDENT REVIEWS</span>
          <span className="text-base leading-none">↗</span>
        </button>
      </div>
    </section>
  );
}
