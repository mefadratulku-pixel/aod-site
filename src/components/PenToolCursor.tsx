"use client";

import React, { useEffect, useState, useRef } from "react";

export default function PenToolCursor() {
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on pointer devices
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setCoords({ x, y });
      if (!isVisible) setIsVisible(true);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("select") ||
          target.closest(".brutalist-card") ||
          target.closest('[role="button"]') ||
          target.tagName === "BUTTON" ||
          target.tagName === "A")
      ) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("select") ||
          target.closest(".brutalist-card") ||
          target.closest('[role="button"]') ||
          target.tagName === "BUTTON" ||
          target.tagName === "A")
      ) {
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[999999] select-none will-change-transform hidden lg:block"
      style={{
        transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
      }}
    >
      <div
        className={`relative transition-transform duration-100 ease-out ${
          isClicking ? "scale-90 translate-x-[1px] translate-y-[1px]" : "scale-100"
        }`}
      >
        {/* Crisp Pen Tool Vector SVG */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`origin-top-left filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-150 ${
            isHovering ? "-rotate-6" : "rotate-0"
          }`}
        >
          {/* Contrast Border for Visibility */}
          <path
            d="M0 0 L4 12 L8 17 L13 18 L15 26 L26 26 L26 15 L18 13 L17 8 L12 4 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Dark Pen Barrel Body */}
          <path
            d="M13 18 L15 26 L26 26 L26 15 L18 13 Z"
            fill="#111113"
            stroke="#000000"
            strokeWidth="0.8"
          />

          {/* Red Collar Stripe Accent */}
          <path
            d="M8 17 L13 18 L18 13 L17 8 Z"
            fill={isHovering ? "#FF0022" : "#D4001A"}
            stroke="#000000"
            strokeWidth="0.6"
          />

          {/* Polished Steel Nib */}
          <path
            d="M0 0 L4 12 L8 17 L17 8 L12 4 Z"
            fill="#E5E5E7"
            stroke="#111113"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/* Center Slit */}
          <line
            x1="0"
            y1="0"
            x2="9"
            y2="9"
            stroke="#111113"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Breather Hole */}
          <circle
            cx="10"
            cy="10"
            r="1.6"
            fill={isHovering ? "#FF0022" : "#111113"}
            stroke={isHovering ? "#FFFFFF" : "#555"}
            strokeWidth="0.6"
          />

          {/* Red Anchor Dot on Hover */}
          {isHovering && (
            <circle
              cx="0"
              cy="0"
              r="2.2"
              fill="#FF0022"
              stroke="#FFFFFF"
              strokeWidth="0.8"
            />
          )}
        </svg>

        {/* Compact Brutalist Anchor Tag */}
        {isHovering && (
          <div className="absolute top-4 left-6 px-1.5 py-0.5 bg-black text-white border border-white/50 text-[8px] font-mono font-bold tracking-widest uppercase shadow-[2px_2px_0px_#FF0022]">
            +PT
          </div>
        )}
      </div>
    </div>
  );
}
