"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { animate } from "animejs";

interface FooterProps {
  onWhatsAppClick?: () => void;
}

export default function Footer({ onWhatsAppClick }: FooterProps) {
  const waBtnRef = useRef<HTMLButtonElement>(null);

  const handleWhatsApp = () => {
    if (onWhatsAppClick) {
      onWhatsAppClick();
    } else {
      window.open(
        "https://wa.me/8801700000000?text=Hello%20AOD%20Team!%20I%20need%20help%20with%20courses.",
        "_blank"
      );
    }
  };

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!waBtnRef.current) return;
    const rect = waBtnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    animate(waBtnRef.current, {
      translateX: x * 0.2,
      translateY: y * 0.2,
      duration: 180,
      ease: "outQuad",
    });
  };

  const handleButtonMouseLeave = () => {
    if (!waBtnRef.current) return;
    animate(waBtnRef.current, {
      translateX: 0,
      translateY: 0,
      duration: 500,
      ease: "outElastic(1, .6)",
    });
  };

  return (
    <footer className="bg-[#000000] text-[#F9F9F9] pt-16 sm:pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Decorative technical accent line */}
      <div className="absolute top-0 left-0 w-32 h-[2px] bg-[#FF0022]" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16">
          {/* Brand & WhatsApp (Spans 2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="font-heading font-black text-3xl sm:text-4xl lg:text-[44px] leading-none tracking-tight text-[#FF0022]">
                Fatiqul
                <br />
                Ferdush Asif
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#A0A0A0] max-w-sm leading-relaxed">
              Level up your creative journey with real-world skills from industry
              professionals.
            </p>

            {/* WhatsApp CTA with Magnetic Anime.js Physics */}
            <div>
              <button
                ref={waBtnRef}
                onClick={handleWhatsApp}
                onMouseMove={handleButtonMouseMove}
                onMouseLeave={handleButtonMouseLeave}
                className="bg-white text-[#0A0A0C] font-bold text-xs sm:text-sm px-6 py-3.5 flex items-center gap-3 hover:bg-[#FF0022] hover:text-white transition-colors duration-200 shadow-xl active:scale-95 cursor-pointer"
              >
                <MessageSquare size={18} className="shrink-0" />
                <span>Need Help? WhatsApp Me</span>
              </button>
            </div>
          </div>

          {/* Column: NAVIGATION */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-xs sm:text-sm tracking-[0.15em] text-[#FF0022] uppercase">
              NAVIGATION
            </h4>
            <ul className="space-y-3 text-sm text-[#A0A0A0]">
              <li>
                <Link href="#courses" className="hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="#portfolios" className="hover:text-white transition-colors">
                  Portfolios
                </Link>
              </li>
              <li>
                <Link href="#masterclass" className="hover:text-white transition-colors">
                  Masterclass
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: LEGAL */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-xs sm:text-sm tracking-[0.15em] text-[#FF0022] uppercase">
              LEGAL
            </h4>
            <ul className="space-y-3 text-sm text-[#A0A0A0]">
              <li>
                <Link href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#refund" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: SOCIALS */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-xs sm:text-sm tracking-[0.15em] text-[#FF0022] uppercase">
              SOCIALS
            </h4>
            <ul className="space-y-3 text-sm text-[#A0A0A0]">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Youtube
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#707070] gap-4">
          <p className="font-medium text-[#909090]">Art of Design</p>
          <p>© 2026 Art of Design. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
