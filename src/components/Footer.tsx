"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

export default function Footer() {
  const handleWhatsApp = () => {
    window.open("https://wa.me/8801700000000", "_blank");
  };

  return (
    <footer className="w-full bg-[#000000] text-white pt-16 sm:pt-24 pb-12 select-none">
      <div className="w-full max-w-[2100px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28">
        {/* Top Grid matching AOD.svg exact layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-14 sm:pb-20 border-b border-white/15">
          {/* Left Column (Brand + WhatsApp) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] leading-[1.05] tracking-tight text-[#FF0022] uppercase">
              Fatiqul
              <br />
              Ferdush Asif
            </div>

            <p className="text-[#A0A0A0] text-sm sm:text-base lg:text-lg max-w-lg font-normal leading-relaxed">
              Level up your creative journey with real-world skills from industry professionals.
            </p>

            {/* WhatsApp Button matching AOD.svg exact 283.23 x 56 dimensions */}
            <div className="pt-2">
              <button
                onClick={handleWhatsApp}
                className="w-[283px] h-[56px] bg-white text-[#000000] rounded-[2px] font-sans font-bold text-sm sm:text-[15px] flex items-center justify-center gap-2.5 hover:bg-gray-100 active:scale-[0.98] transition-all cursor-pointer shadow-md"
              >
                <MessageSquare size={18} className="text-black fill-black" />
                <span>Need Help? WhatsApp Me</span>
              </button>
            </div>
          </div>

          {/* Right Navigation Columns matching AOD.svg */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 pt-2">
            {/* Column 1: NAVIGATION */}
            <div className="space-y-4">
              <span className="font-mono text-xs sm:text-sm font-black tracking-widest text-[#FF0022] uppercase block">
                NAVIGATION
              </span>
              <ul className="space-y-3 text-sm sm:text-base text-[#CCCCCC]">
                <li>
                  <Link href="/#courses" className="hover:text-white transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/#portfolios" className="hover:text-white transition-colors">
                    Portfolios
                  </Link>
                </li>
                <li>
                  <Link href="/#courses" className="hover:text-white transition-colors">
                    Masterclass
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: LEGAL */}
            <div className="space-y-4">
              <span className="font-mono text-xs sm:text-sm font-black tracking-widest text-[#FF0022] uppercase block">
                LEGAL
              </span>
              <ul className="space-y-3 text-sm sm:text-base text-[#CCCCCC]">
                <li>
                  <a href="#privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#refund" className="hover:text-white transition-colors">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: SOCIALS */}
            <div className="space-y-4">
              <span className="font-mono text-xs sm:text-sm font-black tracking-widest text-[#FF0022] uppercase block">
                SOCIALS
              </span>
              <ul className="space-y-3 text-sm sm:text-base text-[#CCCCCC]">
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Youtube
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Linkedin
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Credits Row matching AOD.svg */}
        <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-[#777777] gap-4">
          <span>Art of Design</span>
          <span>© 2026 Art of Design. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
