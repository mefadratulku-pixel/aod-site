"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { animate, stagger } from "animejs";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const faqItemsRef = useRef<HTMLDivElement[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const faqs = [
    {
      question: "Will Rajeev Mehta teach the class himself?",
      answer:
        "Yes, this course is made up of pre-recorded video lessons by Rajeev Mehta.",
    },
    {
      question: "Will I have access to the video once the course is over?",
      answer:
        "Yes, you will receive lifetime access to all recorded video lessons, project source files, and community updates.",
    },
    {
      question: "In which language will the course be taught?",
      answer:
        "The course is conducted in Bengali and Hindi, using international graphic design terminology so you can compete globally.",
    },
    {
      question: "Facing problems in payment processing?",
      answer:
        "We support bKash, Nagad, Rocket, and all major debit/credit cards. If you experience any payment gateway issue, click 'Need Help? WhatsApp Me' in the footer for instant support.",
    },
  ];

  useEffect(() => {
    // Staggered reveal of questions when entering viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(faqItemsRef.current, {
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 700,
              delay: stagger(100),
              ease: "outCubic",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleIndex = (index: number) => {
    const isCurrentlyOpen = openIndex === index;
    const nextIndex = isCurrentlyOpen ? null : index;
    setOpenIndex(nextIndex);

    // Animate the clicked icon
    const iconEl = iconRefs.current[index];
    if (iconEl) {
      animate(iconEl, {
        rotate: isCurrentlyOpen ? 0 : 180,
        duration: 350,
        ease: "outCubic",
      });
    }

    // If closing another item, reset its icon
    if (openIndex !== null && openIndex !== index) {
      const prevIcon = iconRefs.current[openIndex];
      if (prevIcon) {
        animate(prevIcon, {
          rotate: 0,
          duration: 300,
          ease: "outCubic",
        });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 max-w-[900px] mx-auto px-4 sm:px-8"
    >
      <div className="flex flex-col items-center mb-12 sm:mb-16">
        <div className="w-8 h-1 bg-[#FF0022] mb-4" />
        <h2 className="font-heading font-black text-2xl sm:text-4xl md:text-[42px] tracking-tight text-[#0A0A0C] uppercase text-center">
          FREQUENTLY ASKED QUESTIONS
        </h2>
      </div>

      <div className="divide-y divide-black/15 border-y border-black/15">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              ref={(el) => {
                if (el) faqItemsRef.current[index] = el;
              }}
              className="py-5 sm:py-6 opacity-0 transition-colors"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
              >
                <span className="font-heading font-semibold text-base sm:text-lg md:text-xl text-[#0A0A0C] group-hover:text-[#FF0022] transition-colors">
                  {faq.question}
                </span>
                <span
                  ref={(el) => {
                    iconRefs.current[index] = el;
                  }}
                  className="text-[#0A0A0C] group-hover:text-[#FF0022] transition-colors shrink-0 inline-block transform origin-center"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <ChevronDown size={22} />
                </span>
              </button>

              <div
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  isOpen ? "max-h-48 opacity-100 mt-3" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm sm:text-base text-[#444] leading-relaxed pr-8">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
