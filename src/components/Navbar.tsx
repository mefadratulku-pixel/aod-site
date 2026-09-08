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
  const [underlineStyle, setUnderlineStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, openLoginModal } = useAuth();

  const navContainerRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // 1. High-precision Real-time Scroll Spy for Section Tracking matching AOD.svg
  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // When near the top, always highlight FREE MASTERCLASS (hero)
      if (scrollY < 220) {
        setActiveSection("hero");
        return;
      }

      const getElementCenter = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          top: rect.top + scrollY,
          bottom: rect.bottom + scrollY,
          height: rect.height,
        };
      };

      const heroPos = getElementCenter("hero");
      const coursesPos = getElementCenter("courses");
      const portfoliosPos = getElementCenter("portfolios");
      const workshopsPos = getElementCenter("workshops");

      const viewportFocusY = scrollY + 120; // 120px below top of viewport

      if (workshopsPos && viewportFocusY >= workshopsPos.top - 60) {
        setActiveSection("workshops");
      } else if (portfoliosPos && viewportFocusY >= portfoliosPos.top - 60) {
        setActiveSection("portfolios");
      } else if (coursesPos && viewportFocusY >= coursesPos.top - 60) {
        setActiveSection("courses");
      } else {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // 2. Liquid-smooth Sliding Solid Black Underline Calculator matching AOD.svg
  useEffect(() => {
    const updateUnderline = () => {
      const activeIndex = NAV_ITEMS.findIndex((item) => item.id === activeSection);
      const activeEl = navItemRefs.current[activeIndex];

      if (activeEl) {
        setUnderlineStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1,
        });
      }
    };

    updateUnderline();
    const timeout = setTimeout(updateUnderline, 50);
    window.addEventListener("resize", updateUnderline);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateUnderline);
    };
  }, [activeSection, pathname]);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    setActiveSection(item.id);

    if (pathname !== "/") {
      router.push(item.href);
      return;
    }

    if (item.id === "hero") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const el = document.getElementById(item.id);
    if (el) {
      const navHeight = 73;
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
      <div className="w-full max-w-[2100px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 h-[73px] flex items-center justify-between relative">
        {/* Left: Balanced Anchor matching AOD.svg spacing */}
        <div className="w-[142px] hidden md:flex items-center">
          <Link
            href="/"
            className="font-heading font-black text-xl tracking-tighter text-[#0A0A0C] hover:opacity-80 transition-opacity flex items-center select-none"
          >
            <span>AOD</span>
            <span className="text-[#FF0022] text-2xl leading-none">.</span>
          </Link>
        </div>

        {/* Center: Minimalist Navigation Links matching AOD.svg exact layout */}
        <nav
          ref={navContainerRef}
          aria-label="Main Navigation"
          className="relative hidden md:flex items-center justify-center py-1"
        >
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
                  className={`relative py-1.5 px-3 lg:px-4 text-[13px] font-heading font-black tracking-wider uppercase transition-colors duration-200 select-none cursor-pointer ${
                    isActive ? "text-[#000000]" : "text-[#0A0A0C] hover:text-[#FF0022]"
                  }`}
                >
                  {item.label}
                </a>

                {/* Slanted Slash Separator matching AOD.svg exact line */}
                {index < NAV_ITEMS.length - 1 && (
                  <span className="text-black/35 font-light text-base px-1 lg:px-2 select-none pointer-events-none">
                    /
                  </span>
                )}
              </React.Fragment>
            );
          })}

          {/* Liquid-smooth Sliding Solid Black Underline matching AOD.svg <path d="M475 93V91H325V93V95H475V93Z" fill="black"/> */}
          <div
            className="absolute left-0 bottom-0 h-[2px] bg-[#000000] pointer-events-none transition-all duration-350 ease-[cubic-bezier(0.34,1.4,0.64,1)] z-10"
            style={{
              transform: `translateX(${underlineStyle.left}px)`,
              width: `${underlineStyle.width}px`,
              opacity: underlineStyle.opacity,
            }}
          />
        </nav>

        {/* Right: DASHBOARD Red Rectangle matching AOD.svg exact 142x40 transform="translate(1114 60)" fill="#FF0022" */}
        <div className="hidden md:flex items-center justify-end w-[142px]">
          <button
            onClick={handleDashboardClick}
            className="w-[142px] h-[40px] bg-[#FF0022] text-[#000000] font-heading font-black text-[13px] tracking-wider uppercase flex items-center justify-center hover:bg-[#E6001E] active:scale-[0.98] transition-all cursor-pointer select-none"
          >
            DASHBOARD
          </button>
        </div>

        {/* Mobile View: Logo + Dashboard + Hamburger */}
        <div className="md:hidden flex items-center justify-between w-full">
          <Link
            href="/"
            className="font-heading font-black text-lg tracking-tighter text-[#0A0A0C] flex items-center"
          >
            <span>AOD</span>
            <span className="text-[#FF0022] text-xl leading-none">.</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDashboardClick}
              className="px-3.5 h-[36px] bg-[#FF0022] text-[#000000] font-heading font-black text-[11px] tracking-wider uppercase cursor-pointer"
            >
              DASHBOARD
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="p-2 text-[#0A0A0C] border border-[#CFC4C5] bg-white cursor-pointer"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#CFC4C5] bg-[#F9F9F9] px-6 py-4 space-y-2 animate-fadeIn">
          <div className="flex flex-col space-y-2 text-xs font-heading font-black uppercase">
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
                  className={`py-2 border-b border-black/5 flex items-center justify-between ${
                    isActive ? "text-[#FF0022]" : "text-[#0A0A0C]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-[#FF0022]">●</span>}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
