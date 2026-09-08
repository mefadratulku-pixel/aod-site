"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, openLoginModal } = useAuth();

  const handleDashboardClick = () => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      openLoginModal();
    }
  };

  const navItems = [
    { label: "FREE MASTERCLASS", href: "/#courses", active: pathname === "/" },
    { label: "COURSES", href: "/#courses" },
    { label: "STUDENT PORTFOLIOS", href: "/#portfolios" },
    { label: "WORKSHOPS", href: "/#courses" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F9F9F9]/95 backdrop-blur-md border-b border-[#CFC4C5] w-full transition-all">
      <div className="w-full max-w-[2100px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 h-[97px] flex items-center justify-between relative">
        {/* Left: Minimal AOD Brand anchor */}
        <div className="w-[142px] flex items-center">
          <Link
            href="/"
            className="font-heading font-black text-xl tracking-tighter text-[#0A0A0C] hover:opacity-80 transition-opacity flex items-center"
          >
            <span>AOD</span>
            <span className="text-[#FF0022] text-2xl leading-none">.</span>
          </Link>
        </div>

        {/* Centered Navigation Links matching AOD.svg */}
        <nav className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8 xl:space-x-10 text-[13px] lg:text-[14px] font-bold tracking-wider text-[#0A0A0C]">
          {navItems.map((item, index) => (
            <React.Fragment key={item.label}>
              <div className="relative py-1">
                <Link
                  href={item.href}
                  className={`hover:text-[#FF0022] transition-colors ${
                    item.active ? "font-black text-[#0A0A0C]" : "text-[#0A0A0C]"
                  }`}
                >
                  {item.label}
                </Link>
                {item.active && (
                  <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#000000]" />
                )}
              </div>
              {index < navItems.length - 1 && (
                <span className="text-black/30 font-light select-none">/</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Right Action Button: Red #FF0022 Rectangle with Black DASHBOARD text */}
        <div className="hidden md:flex items-center justify-end w-[142px]">
          <button
            onClick={handleDashboardClick}
            className="w-[142px] h-[40px] bg-[#FF0022] text-[#000000] font-heading font-extrabold text-[13px] tracking-wider uppercase flex items-center justify-center hover:bg-[#E6001E] active:scale-[0.98] transition-all cursor-pointer select-none"
          >
            DASHBOARD
          </button>
        </div>

        {/* Mobile Hamburger Toggle & Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={handleDashboardClick}
            className="px-3.5 h-[36px] bg-[#FF0022] text-[#000000] font-extrabold text-[11px] tracking-wider uppercase cursor-pointer"
          >
            DASHBOARD
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="p-2 text-[#0A0A0C] border border-[#CFC4C5] bg-white cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#CFC4C5] bg-[#F9F9F9] px-6 py-5 space-y-3">
          <div className="flex flex-col space-y-2 text-xs font-bold">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 border-b border-black/5 flex items-center justify-between text-[#0A0A0C] hover:text-[#FF0022]"
              >
                <span>{item.label}</span>
                <span>↗</span>
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDashboardClick();
              }}
              className="w-full h-[40px] bg-[#FF0022] text-[#000000] font-black text-xs tracking-wider uppercase mt-2 flex items-center justify-center"
            >
              DASHBOARD
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
