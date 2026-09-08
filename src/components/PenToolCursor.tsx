"use client";

import React, { useEffect, useState, useRef } from "react";
import { animate } from "animejs";

export default function PenToolCursor() {
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const cursorContainerRef = useRef<HTMLDivElement>(null);
  const penSvgRef = useRef<SVGSVGElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on pointer devices (desktop mouse)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setCoords({ x: mouseX, y: mouseY });
      if (!isVisible) setIsVisible(true);

      if (cursorContainerRef.current) {
        cursorContainerRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-4), newRipple]);

      if (penSvgRef.current) {
        animate(penSvgRef.current, {
          scale: 0.88,
          rotate: -6,
          duration: 120,
          ease: "outQuad",
        });
      }
    };

    const onMouseUp = () => {
      setIsClicking(false);
      if (penSvgRef.current) {
        animate(penSvgRef.current, {
          scale: 1,
          rotate: 0,
          duration: 350,
          ease: "outElastic(1, .5)",
        });
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("select") ||
          target.closest(".aod-card") ||
          target.closest('[role="button"]') ||
          target.tagName === "BUTTON" ||
          target.tagName === "A")
      ) {
        setIsHovering(true);
        if (badgeRef.current) {
          animate(badgeRef.current, {
            scale: [0, 1],
            opacity: [0, 1],
            duration: 200,
            ease: "outBack",
          });
        }
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
          target.closest(".aod-card") ||
          target.closest('[role="button"]') ||
          target.tagName === "BUTTON" ||
          target.tagName === "A")
      ) {
        setIsHovering(false);
        if (badgeRef.current) {
          animate(badgeRef.current, {
            scale: 0,
            opacity: 0,
            duration: 150,
            ease: "easeInQuad",
          });
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

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

  // Clean up ripples after animation
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  if (!isVisible) return null;

  return (
    <>
      {/* Click Ink Ripple Rings */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="fixed pointer-events-none z-[99998] rounded-full border border-[#FF0022] animate-ping"
          style={{
            left: `${r.x - 12}px`,
            top: `${r.y - 12}px`,
            width: "24px",
            height: "24px",
            animationDuration: "500ms",
            animationIterationCount: "1",
          }}
        />
      ))}

      {/* Main Pen Tool Cursor Container (Pinned exactly at mouse tip) */}
      <div
        ref={cursorContainerRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999] select-none will-change-transform hidden lg:block"
        style={{
          transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
        }}
      >
        <div className="relative">
          {/* Vector Pen Tool SVG Icon */}
          <svg
            ref={penSvgRef}
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="origin-top-left filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.45)] transition-transform duration-100"
          >
            {/* White Contrast Border for crisp visibility on black, red & white backgrounds */}
            <path
              d="M0 0 L4 13 L8 18 L13 19 L16 28 L28 28 L28 16 L19 13 L18 8 L13 4 Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Dark Pen Barrel Body */}
            <path
              d="M13 19 L16 28 L28 28 L28 16 L19 13 Z"
              fill="#18181B"
              stroke="#27272A"
              strokeWidth="0.75"
            />

            {/* Red Collar Stripe Accent */}
            <path
              d="M8 18 L13 19 L19 13 L18 8 Z"
              fill={isHovering ? "#FF0022" : "#D4001A"}
              stroke="#0A0A0C"
              strokeWidth="0.5"
            />

            {/* Polished Metallic Nib */}
            <path
              d="M0 0 L4 13 L8 18 L18 8 L13 4 Z"
              fill="#E4E4E7"
              stroke="#18181B"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />

            {/* Inner Metallic Bevel Shading */}
            <path
              d="M0 0 L8 18 L18 8 Z"
              fill="#F4F4F5"
              opacity="0.6"
            />

            {/* Center Slit */}
            <line
              x1="0"
              y1="0"
              x2="9.5"
              y2="9.5"
              stroke="#09090B"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Breather Hole */}
            <circle
              cx="11"
              cy="11"
              r="1.75"
              fill={isHovering ? "#FF0022" : "#09090B"}
              stroke={isHovering ? "#FFFFFF" : "#71717A"}
              strokeWidth="0.6"
            />

            {/* Tip Cross-Indicator when hovering */}
            {isHovering && (
              <circle
                cx="0"
                cy="0"
                r="2.5"
                fill="#FF0022"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
            )}
          </svg>

          {/* Interactive Illustrator Anchor Indicator Badge */}
          <div
            ref={badgeRef}
            className={`absolute top-4 left-6 flex items-center gap-1 px-1.5 py-0.5 bg-black/90 text-white border border-white/40 shadow-md font-mono text-[9px] font-bold tracking-wider uppercase transition-opacity duration-150 ${
              isHovering ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <span className="text-[#FF0022] font-black text-xs leading-none">+</span>
            <span className="text-[8px] text-zinc-300">ANCHOR</span>
          </div>
        </div>
      </div>
    </>
  );
}
