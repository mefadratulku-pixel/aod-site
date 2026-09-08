"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IndustryModulesProps {
  onEnroll?: (courseTitle: string) => void;
}

export default function IndustryModules({ onEnroll }: IndustryModulesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const courses = [
    {
      id: "vol-4",
      badge: "ON GOING",
      title: "THE ART OF DESIGN WITH MANIPULATION - VOL 4.0",
      originalPrice: "৳15,000",
      salePrice: "৳6,000",
      image: "/images/course_1.jpg",
    },
    {
      id: "creativity-reset",
      badge: "PUBLISHED",
      title: "CREATIVITY RESET 1.0 - WORKSHOP",
      originalPrice: "৳15,000",
      salePrice: "৳6,000",
      image: "/images/course_2.png",
    },
    {
      id: "survive-ai",
      badge: "PUBLISHED",
      title: "SURVIVE THE AI ERA - WORKSHOP",
      originalPrice: "৳15,000",
      salePrice: "৳6,000",
      image: "/images/course_3.jpg",
    },
  ];

  return (
    <section
      id="courses"
      className="py-12 sm:py-16 w-full max-w-[1280px] mx-auto px-4 sm:px-8"
    >
      {/* Section Header matching AOD.svg */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#CFC4C5]">
        <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-[38px] tracking-tight text-[#0A0A0C] uppercase">
          INDUSTRY-LEVEL MODULES
        </h2>

        {/* Small Navigation Arrows matching AOD.svg 24.4 x 29 dimensions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous module"
            className="w-[24.4px] h-[29px] border border-[#7E7576] flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors cursor-pointer select-none"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next module"
            className="w-[24.4px] h-[29px] border border-[#7E7576] flex items-center justify-center bg-white hover:bg-black hover:text-white transition-colors cursor-pointer select-none"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Cards Grid: 3 Columns matching AOD.svg exact layout */}
      <div
        ref={scrollContainerRef}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 pb-2"
      >
        {courses.map((item) => (
          <div
            key={item.id}
            className="border border-black bg-white flex flex-col justify-between overflow-hidden group w-full"
          >
            {/* Top Image Box (aspect-[4/5]) with 1px border and badge */}
            <Link
              href={`/courses/${item.id}`}
              className="relative w-full aspect-[4/5] bg-[#F5F5F5] overflow-hidden border-b border-black block cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                priority
              />

              {/* Status Badge: ON GOING or PUBLISHED */}
              <div className="absolute top-3 left-3 z-10 bg-white px-3 py-1 text-[11px] font-extrabold tracking-wider text-[#0A0A0C] uppercase border border-black/30">
                {item.badge}
              </div>
            </Link>

            {/* Card Body Information */}
            <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow bg-white">
              <Link href={`/courses/${item.id}`}>
                <h3 className="font-heading font-black text-base sm:text-lg leading-snug tracking-tight text-[#0A0A0C] uppercase min-h-[48px] hover:text-[#FF0022] transition-colors">
                  {item.title}
                </h3>
              </Link>

              {/* Price & Action Button matching AOD.svg exact 148x44 dimension */}
              <div className="flex items-center justify-between pt-5 mt-4 border-t border-black/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm sm:text-base text-[#FF0022] line-through font-bold">
                    {item.originalPrice}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#0A0A0C]">
                    {item.salePrice}
                  </span>
                </div>

                <button
                  onClick={() => onEnroll && onEnroll(item.title)}
                  className="w-[148px] h-[44px] bg-[#FF0022] text-[#FFFFFF] font-heading font-extrabold text-[13px] tracking-wider uppercase flex items-center justify-center hover:bg-[#E6001E] active:scale-[0.98] transition-all cursor-pointer select-none"
                >
                  ENROLL NOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
