"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { animate, stagger } from "animejs";

interface IndustryModulesProps {
  onEnroll?: (courseTitle: string) => void;
}

export default function IndustryModules({ onEnroll }: IndustryModulesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Staggered card entrance using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(cardsRef.current, {
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 850,
              delay: stagger(160),
              ease: "outCubic",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scroll = (direction: "left" | "right", btn: HTMLButtonElement | null) => {
    if (btn) {
      animate(btn, {
        scale: [0.85, 1],
        duration: 300,
        ease: "outBack",
      });
    }

    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // 3D Card tilt on mouse move
  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    card: HTMLDivElement
  ) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    animate(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 150,
      ease: "linear",
    });
  };

  const handleCardMouseLeave = (card: HTMLDivElement) => {
    animate(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 500,
      ease: "outElastic(1, .6)",
    });
  };

  const modules = [
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
      image: "/images/course_2.jpg",
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
      ref={sectionRef}
      id="courses"
      className="py-12 sm:py-16 max-w-[1280px] mx-auto px-4 sm:px-8 perspective-1000"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#CFC4C5]">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#FF0022]" />
          <h2 className="font-heading font-black text-lg sm:text-3xl md:text-[40px] tracking-tight text-[#0A0A0C] uppercase">
            INDUSTRY-LEVEL MODULES
          </h2>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            ref={prevBtnRef}
            onClick={() => scroll("left", prevBtnRef.current)}
            aria-label="Previous module"
            className="w-7 h-8 sm:w-8 sm:h-9 border border-[#7E7576] flex items-center justify-center bg-white hover:bg-black hover:text-white hover:border-black transition-colors select-none"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            ref={nextBtnRef}
            onClick={() => scroll("right", nextBtnRef.current)}
            aria-label="Next module"
            className="w-7 h-8 sm:w-8 sm:h-9 border border-[#7E7576] flex items-center justify-center bg-white hover:bg-black hover:text-white hover:border-black transition-colors select-none"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Cards Grid / Carousel */}
      <div
        ref={scrollContainerRef}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto no-scrollbar pb-4"
      >
        {modules.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            onMouseMove={(e) => {
              if (cardsRef.current[index]) {
                handleCardMouseMove(e, cardsRef.current[index]);
              }
            }}
            onMouseLeave={() => {
              if (cardsRef.current[index]) {
                handleCardMouseLeave(cardsRef.current[index]);
              }
            }}
            className="opacity-0 aod-card flex flex-col justify-between overflow-hidden group cursor-pointer"
          >
            {/* Card Thumbnail Box */}
            <div className="relative w-full aspect-[4/5] sm:h-[450px] bg-[#111] overflow-hidden border-b border-black">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                priority
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10 bg-white px-3 py-1 text-[11px] font-bold tracking-wider text-[#0A0A0C] uppercase border border-black/20 shadow-sm group-hover:bg-[#FF0022] group-hover:text-white transition-colors duration-300">
                {item.badge}
              </div>
            </div>

            {/* Card Body Information */}
            <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow bg-white">
              <h3 className="font-heading font-extrabold text-base sm:text-lg leading-snug tracking-tight text-[#0A0A0C] uppercase min-h-[50px] group-hover:text-[#FF0022] transition-colors duration-200">
                {item.title}
              </h3>

              {/* Price & Action Button */}
              <div className="flex items-center justify-between pt-6 mt-4 border-t border-black/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm sm:text-base text-[#FF0022] line-through font-semibold">
                    {item.originalPrice}
                  </span>
                  <span className="text-lg sm:text-xl font-black text-[#0A0A0C]">
                    {item.salePrice}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onEnroll) onEnroll(item.title);
                  }}
                  className="btn-red px-5 py-2.5 text-xs sm:text-sm tracking-wider active:scale-95 hover:shadow-md transition-all"
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
