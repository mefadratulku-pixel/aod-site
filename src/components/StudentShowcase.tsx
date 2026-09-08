"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { animate, stagger } from "animejs";

interface StudentShowcaseProps {
  onExplorePortfolios?: () => void;
  onReadReviews?: () => void;
}

export default function StudentShowcase({
  onExplorePortfolios,
  onReadReviews,
}: StudentShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(cardsRef.current, {
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 850,
              delay: stagger(150),
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

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    card: HTMLDivElement
  ) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

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

  const handleButtonMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    targetBtn: HTMLButtonElement | null
  ) => {
    if (!targetBtn) return;
    const rect = targetBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    animate(targetBtn, {
      translateX: x * 0.2,
      translateY: y * 0.2,
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
      ref={sectionRef}
      id="portfolios"
      className="py-12 sm:py-16 max-w-[1280px] mx-auto px-4 sm:px-8 perspective-1000"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#CFC4C5]">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#FF0022]" />
          <h2 className="font-heading font-black text-lg sm:text-3xl md:text-[40px] tracking-tight text-[#0A0A0C] uppercase">
            AOD STUDENT DESIGN SHOWCASE
          </h2>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            ref={prevBtnRef}
            onClick={() => scroll("left", prevBtnRef.current)}
            aria-label="Previous showcase"
            className="w-7 h-8 sm:w-8 sm:h-9 border border-[#7E7576] flex items-center justify-center bg-white hover:bg-black hover:text-white hover:border-black transition-colors select-none"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            ref={nextBtnRef}
            onClick={() => scroll("right", nextBtnRef.current)}
            aria-label="Next showcase"
            className="w-7 h-8 sm:w-8 sm:h-9 border border-[#7E7576] flex items-center justify-center bg-white hover:bg-black hover:text-white hover:border-black transition-colors select-none"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Showcase Cards */}
      <div
        ref={scrollContainerRef}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto no-scrollbar pb-4"
      >
        {showcaseItems.map((item, index) => (
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
            className="opacity-0 aod-card relative aspect-[4/5] sm:h-[480px] bg-[#111] overflow-hidden group cursor-pointer"
          >
            <Image
              src={item.image}
              alt={item.student}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />

            {/* Subtle Gradient Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity" />

            {/* Student Name Pill at Bottom Right */}
            <div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-xs px-3.5 py-1 text-[11px] font-bold tracking-wider text-[#0A0A0C] uppercase border border-black/30 shadow-md group-hover:bg-[#FF0022] group-hover:text-white transition-colors duration-300">
              {item.student}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons Below Showcase with Magnetic Physics */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10 sm:mt-12">
        <button
          ref={btn1Ref}
          onClick={onExplorePortfolios}
          onMouseMove={(e) => handleButtonMouseMove(e, btn1Ref.current)}
          onMouseLeave={() => handleButtonMouseLeave(btn1Ref.current)}
          className="btn-black w-full sm:w-[240px] h-[46px] text-xs sm:text-sm tracking-wider shadow-sm hover:shadow-lg active:scale-95 transition-all gap-2"
        >
          <span>EXPLORE ALL PORTFOLIOS</span>
          <span className="text-base leading-none">↗</span>
        </button>

        <button
          ref={btn2Ref}
          onClick={onReadReviews}
          onMouseMove={(e) => handleButtonMouseMove(e, btn2Ref.current)}
          onMouseLeave={() => handleButtonMouseLeave(btn2Ref.current)}
          className="btn-outline w-full sm:w-[240px] h-[46px] text-xs sm:text-sm tracking-wider shadow-sm hover:shadow-lg active:scale-95 transition-all gap-2"
        >
          <span>READ STUDENT REVIEWS</span>
          <span className="text-base leading-none">↗</span>
        </button>
      </div>
    </section>
  );
}
