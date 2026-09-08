"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "FREE MASTERCLASS", href: "/#hero" },
  { id: "courses", label: "COURSES", href: "/#courses" },
  { id: "portfolios", label: "STUDENT PORTFOLIOS", href: "/#portfolios" },
  { id: "workshops", label: "WORKSHOPS", href: "/#workshops" },
];

interface NavbarProps {
  onWatchMasterclass?: () => void;
}

export default function Navbar({ onWatchMasterclass }: NavbarProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, openLoginModal } = useAuth();

  const navContainerRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // 1. High-precision Real-time Scroll Spy for Section Tracking
  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== "/") return;

      const getSectionTop = (id: string) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      };

      const currentY = window.scrollY + 200; // Trigger line 200px below top
      const coursesTop = getSectionTop("courses");
      const portfoliosTop = getSectionTop("portfolios");
      const workshopsTop = getSectionTop("workshops");

      if (workshopsTop > 0 && currentY >= workshopsTop - 50) {
        setActiveSection("workshops");
      } else if (portfoliosTop > 0 && currentY >= portfoliosTop - 50) {
        setActiveSection("portfolios");
      } else if (coursesTop > 0 && currentY >= coursesTop - 50) {
        setActiveSection("courses");
      } else {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // 2. Liquid-smooth Sliding Pill Position & Width Calculator
  useEffect(() => {
    const updatePill = () => {
      const activeIndex = NAV_ITEMS.findIndex((item) => item.id === activeSection);
      const activeEl = navItemRefs.current[activeIndex];

      if (activeEl) {
        setPillStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1,
        });
      }
    };

    // Run immediately and also after next tick to ensure web fonts render
    updatePill();
    const timeout = setTimeout(updatePill, 50);
    window.addEventListener("resize", updatePill);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updatePill);
    };
  }, [activeSection, pathname]);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    setActiveSection(item.id);

    if (pathname !== "/") {
      router.push(item.href);
      return;
    }

    const el = document.getElementById(item.id);
    if (el) {
      const navHeight = 97;
      const targetY = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
  };

  const handleDashboardClick = () => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      openLoginModal();
    }
  };

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

        {/* Centered Navigation with Satisfying Animated Sliding Pill */}
        <nav
          ref={navContainerRef}
          aria-label="Main Navigation"
          className="relative hidden md:flex items-center justify-center p-1.5 rounded-full border border-black/15 bg-black/[0.03]"
        >
          {/* The Satisfying Spring-Animated Sliding Pill */}
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-[#0A0A0C] pointer-events-none transition-all duration-350 ease-[cubic-bezier(0.34,1.4,0.64,1)] z-0 shadow-[2px_2px_0px_#FF0022]"
            style={{
              transform: `translateX(${pillStyle.left}px)`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity,
            }}
          />

          {NAV_ITEMS.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <React.Fragment key={item.id}>
                <a
                  ref={(el) => {
                    navItemRefs.current[index] = el;
                  }}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative z-10 px-4 lg:px-5 py-2 text-xs lg:text-[13px] font-black tracking-wider uppercase transition-colors duration-200 select-none cursor-pointer ${
                    isActive ? "text-white" : "text-[#0A0A0C] hover:text-[#FF0022]"
                  }`}
                >
                  {item.label}
                </a>

                {index < NAV_ITEMS.length - 1 && (
                  <span className="relative z-10 text-black/20 font-bold px-0.5 select-none pointer-events-none">
                    /
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Right Action Button: Red #FF0022 Rectangle with Black DASHBOARD text */}
        <div className="hidden md:flex items-center justify-end w-[142px]">
          <button
            onClick={handleDashboardClick}
            className="w-[142px] h-[40px] bg-[#FF0022] text-[#000000] font-heading font-extrabold text-[13px] tracking-wider uppercase flex items-center justify-center hover:bg-[#E6001E] active:scale-[0.98] transition-all cursor-pointer select-none shadow-[2px_2px_0px_#000]"
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

      {/* Mobile Drawer with active state */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#CFC4C5] bg-[#F9F9F9] px-6 py-5 space-y-3">
          <div className="flex flex-col space-y-2 text-xs font-bold">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, item);
                  }}
                  className={`py-2.5 px-3 border flex items-center justify-between transition-colors ${
                    isActive
                      ? "bg-black text-white border-black font-black"
                      : "bg-white text-[#0A0A0C] border-black/10 hover:text-[#FF0022]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span>{isActive ? "●" : "↗"}</span>
                </a>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDashboardClick();
              }}
              className="w-full h-[40px] bg-[#FF0022] text-[#000000] font-black text-xs tracking-wider uppercase mt-2 flex items-center justify-center shadow-[2px_2px_0px_#000]"
            >
              DASHBOARD
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
