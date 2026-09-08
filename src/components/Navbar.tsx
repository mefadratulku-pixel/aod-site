"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenDashboard?: () => void;
}

export default function Navbar({ onOpenDashboard }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "FREE MASTERCLASS", href: "#masterclass", active: true },
    { label: "COURSES", href: "#courses" },
    { label: "STUDENT PORTFOLIOS", href: "#portfolios" },
    { label: "WORKSHOPS", href: "#workshops" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F9F9F9]/95 backdrop-blur-md border-b border-black/5 transition-all">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Mobile Brand / Logo */}
        <div className="lg:hidden flex items-center gap-2">
          <Link href="/" className="font-heading font-extrabold text-xl tracking-tight text-[#0A0A0C]">
            AOD<span className="text-[#FF0022]">.</span>
          </Link>
        </div>

        {/* Desktop Centered Navigation Items with Slashes */}
        <nav className="hidden lg:flex items-center mx-auto space-x-6 text-sm font-semibold tracking-wide text-[#0A0A0C]">
          {navItems.map((item, index) => (
            <React.Fragment key={item.label}>
              <div className="relative py-2">
                <Link
                  href={item.href}
                  className={`hover:text-[#FF0022] transition-colors ${
                    item.active ? "font-bold text-[#0A0A0C]" : "text-[#1A1C1C]"
                  }`}
                >
                  {item.label}
                </Link>
                {item.active && (
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#0A0A0C]" />
                )}
              </div>
              {index < navItems.length - 1 && (
                <span className="text-[#A09A9B] font-normal select-none">/</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Right CTA Button: DASHBOARD */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={onOpenDashboard}
            className="btn-red px-7 py-2.5 text-xs tracking-wider border border-black/20 shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            DASHBOARD
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={onOpenDashboard}
            className="btn-red px-4 py-1.5 text-xs tracking-wider"
          >
            DASHBOARD
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="p-2 text-[#0A0A0C] border border-black/20 hover:bg-black/5"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-black/10 bg-[#F9F9F9] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-4 text-sm font-bold">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-2 border-b border-black/5 flex items-center justify-between ${
                  item.active ? "text-[#FF0022]" : "text-[#0A0A0C]"
                }`}
              >
                <span>{item.label}</span>
                {item.active && <span className="text-xs bg-[#FF0022] text-white px-2 py-0.5">ACTIVE</span>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
