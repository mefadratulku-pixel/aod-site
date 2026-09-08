"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Will Fatiqul Ferdush Asif teach the class himself?",
    answer: "Yes, this course is made up of pre-recorded video lessons and live interactive sessions by Fatiqul Ferdush Asif.",
  },
  {
    id: 2,
    question: "Will I have access to the video once the course is over?",
    answer: "Yes, you get lifetime access to all course recordings, downloadable PSD files, and resources.",
  },
  {
    id: 3,
    question: "In which language will the course be taught?",
    answer: "The course is taught in Bengali, utilizing global industry-standard English terminology for design principles and software tools.",
  },
  {
    id: 4,
    question: "Facing problems in payment processing?",
    answer: "If you encounter any payment issues with bKash, Nagad, or cards, click the 'Need Help? WhatsApp Me' button below for immediate manual verification.",
  },
];

export default function FAQ() {
  // First item open by default matching AOD.svg
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 sm:py-24 w-full max-w-[1280px] mx-auto px-4 sm:px-8">
      {/* Centered Heading matching AOD.svg */}
      <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-[38px] tracking-tight text-[#0A0A0C] uppercase text-center mb-10 sm:mb-14">
        FREQUENTLY ASKED QUESTIONS
      </h2>

      {/* Accordion List matching AOD.svg exact layout */}
      <div className="max-w-4xl mx-auto space-y-0">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="border-b border-[#CFC4C5] transition-colors"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full py-5 sm:py-6 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span className="font-sans font-medium text-base sm:text-lg text-[#0A0A0C] group-hover:text-[#FF0022] transition-colors pr-4">
                  {faq.question}
                </span>
                <span className="shrink-0 text-black">
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>

              {isOpen && (
                <div className="pb-6 text-sm sm:text-base text-[#555555] font-normal leading-relaxed pr-8">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
