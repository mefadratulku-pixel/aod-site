"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Ticket,
  ArrowRight,
  CreditCard,
  Smartphone,
  Lock,
  Tag,
  Check,
  Copy,
  Printer,
  Clock,
  Flame,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
}

export default function EnrollModal({
  isOpen,
  onClose,
  courseTitle = "THE ART OF DESIGN WITH MANIPULATION - VOL 4.0",
}: EnrollModalProps) {
  const router = useRouter();
  const { login } = useAuth();

  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [trxId, setTrxId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "card">("bkash");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);

  // Live Urgency Countdown Timer (e.g. 03h 48m 12s)
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 48, s: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: 59, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return { h: 3, m: 48, s: 12 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  // Determine course thumbnail based on courseTitle
  let courseImage = "/images/course_1.jpg";
  if (courseTitle.includes("CREATIVITY") || courseTitle.includes("RESET")) {
    courseImage = "/images/course_2.png";
  } else if (courseTitle.includes("AI") || courseTitle.includes("AESTHETIC") || courseTitle.includes("SURVIVE")) {
    courseImage = "/images/course_survive_ai.png";
  }

  const basePrice = 15000;
  const regularSalePrice = 6000;
  const discountAmount = couponApplied ? 500 : 0;
  const finalPrice = regularSalePrice - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === "AODVIP" || cleanCode === "ASIF" || cleanCode === "DOMINATE") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid code. Try 'AODVIP'");
    }
  };

  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      login(email || "student@artofdesign.academy");
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleGoToDashboard = () => {
    onClose();
    router.push("/dashboard");
  };

  const handlePrintTicket = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-lg overflow-y-auto animate-fadeIn">
      <div className="bg-white border-2 border-black max-w-4xl w-full shadow-[12px_12px_0px_#000] relative overflow-hidden my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 border border-black bg-white flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
        >
          <X size={18} />
        </button>

        {submitted ? (
          /* ========================================================
             CELEBRATION: DIGITAL ADMISSION PASS (JAW-DROPPING TICKET)
             ======================================================== */
          <div className="p-6 sm:p-10 lg:p-12 text-center bg-white space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFF2F4] border border-[#FF0022] text-[#FF0022] text-xs font-mono font-bold uppercase tracking-widest">
              <Sparkles size={14} />
              <span>SEAT RESERVED • BATCH 05 OFFICIAL ADMISSION</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#0A0A0C]">
                WELCOME TO ART OF DESIGN
              </h2>
              <p className="text-sm sm:text-base text-[#555] max-w-lg mx-auto font-medium">
                Congratulations, <strong className="text-black">{fullName || "Designer"}</strong>! Your seat in Batch 05 is officially secured.
              </p>
            </div>

            {/* Tactile Boarding Pass / Ticket */}
            <div className="max-w-xl mx-auto border-2 border-black bg-[#FBFBFB] p-6 sm:p-8 shadow-[6px_6px_0px_#FF0022] relative text-left">
              <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono font-black uppercase text-[#FF0022] tracking-widest block">
                    OFFICIAL ADMISSION PASS
                  </span>
                  <div className="font-heading font-black text-xl text-black">
                    ART OF DESIGN ACADEMY
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-black/50 uppercase block">TICKET ID</span>
                  <span className="font-mono font-black text-sm text-black">#AOD-B05-8492</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-black/50 uppercase block">STUDENT NAME</span>
                  <span className="font-bold text-black text-sm">{fullName || "Tanvir Ahmed"}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-black/50 uppercase block">PHONE / WHATSAPP</span>
                  <span className="font-bold text-black text-sm">{phone || "01700000000"}</span>
                </div>
                <div className="col-span-2 pt-2">
                  <span className="text-[10px] font-mono text-black/50 uppercase block">ENROLLED MASTERCLASS</span>
                  <span className="font-black text-black text-sm uppercase">{courseTitle}</span>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-black/50 uppercase block">PAYMENT STATUS</span>
                  <span className="inline-block font-bold text-green-700 bg-green-100 px-2 py-0.5 border border-green-300">
                    VERIFIED • ৳{finalPrice.toLocaleString()} BDT
                  </span>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-black/50 uppercase block">BATCH ACCESS</span>
                  <span className="font-bold text-black">BATCH 05 (ACTIVE)</span>
                </div>
              </div>

              {/* Barcode Strip Graphic */}
              <div className="mt-6 pt-4 border-t-2 border-dashed border-black/30 flex items-center justify-between">
                <div className="h-8 flex items-center gap-1 opacity-70">
                  {[2, 4, 1, 3, 2, 5, 1, 4, 2, 1, 3, 5, 2, 4, 1, 3, 2, 4, 3, 1, 4].map((w, i) => (
                    <div key={i} className="h-full bg-black" style={{ width: `${w * 2}px` }} />
                  ))}
                </div>
                <span className="text-[10px] font-mono font-bold text-black/50">TOKEN: 9948-VALIDATED</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleGoToDashboard}
                className="w-full sm:w-[260px] h-[50px] bg-[#FF0022] text-white font-heading font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#E6001E] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <span>ENTER DASHBOARD</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => window.open("https://chat.whatsapp.com", "_blank")}
                className="w-full sm:w-[260px] h-[50px] bg-white text-black font-heading font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-black hover:text-white active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <span>JOIN BATCH 05 WHATSAPP</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={handlePrintTicket}
                className="w-full sm:w-[160px] h-[50px] bg-black text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 border-2 border-black hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <Printer size={16} />
                <span>PRINT PASS</span>
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================
             TWO-COLUMN ULTRA-LUXURY CHECKOUT ARCHITECTURE
             ======================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* LEFT COLUMN: COURSE SUMMARY & ADMISSION PASS */}
            <div className="lg:col-span-5 bg-[#0A0A0C] text-white p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r-2 border-black relative overflow-hidden">
              {/* Subtle Ambient Red Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF0022]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black uppercase bg-[#FF0022] text-white px-2.5 py-1 tracking-wider border border-black shadow-[2px_2px_0px_#FFF]">
                    BATCH 05 PRE-BOOKING
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-red-400">
                    <Flame size={12} className="fill-current animate-pulse" />
                    <span>4 SEATS REMAINING</span>
                  </div>
                </div>

                {/* Course Poster Thumbnail */}
                <div className="border border-white/20 relative aspect-[16/10] w-full overflow-hidden bg-black shadow-lg">
                  <Image
                    src={courseImage}
                    alt={courseTitle}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute bottom-2 left-2 bg-black/90 px-2 py-0.5 text-[9px] font-mono font-bold uppercase text-white border border-white/20">
                    MASTERCLASS VAULT
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-black text-lg sm:text-xl uppercase leading-tight text-white">
                    {courseTitle}
                  </h3>
                  <p className="text-xs text-white/60 mt-1 font-medium">
                    Mentored by Fatiqul Ferdush Asif
                  </p>
                </div>

                {/* What's Unlocked List */}
                <div className="space-y-2.5 pt-2 border-t border-white/15 text-xs text-white/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#FF0022] shrink-0" />
                    <span>24 Live Masterclasses & Lifetime Recordings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#FF0022] shrink-0" />
                    <span>1.4 GB Uncompressed Raw Layered PSDs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#FF0022] shrink-0" />
                    <span>Private Portfolio Critique by Fatiqul Ferdush Asif</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#FF0022] shrink-0" />
                    <span>Verified AOD Graduate Certificate</span>
                  </div>
                </div>
              </div>

              {/* Price Tag Box with Urgency Timer */}
              <div className="mt-6 pt-4 border-t border-white/15 relative z-10 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-white/70 bg-white/[0.05] p-2 border border-white/10">
                  <div className="flex items-center gap-1.5 text-[#FF0022]">
                    <Clock size={13} />
                    <span className="font-bold">PRICE EXPIRES IN:</span>
                  </div>
                  <span className="font-bold text-white tracking-widest">
                    {String(timeLeft.h).padStart(2, "0")}:{String(timeLeft.m).padStart(2, "0")}:{String(timeLeft.s).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-white/50 uppercase block">
                      TOTAL INVESTMENT
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-white">
                        ৳{finalPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-[#FF0022] line-through font-bold">
                        ৳{basePrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-green-400 bg-green-950/60 px-2 py-1 border border-green-500/40">
                    {couponApplied ? "63% SAVINGS" : "SAVE 60%"}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE FORM & CONTROLS */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-white flex flex-col justify-between">
              <div>
                <div className="mb-5">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-black/50 block">
                    STEP 1 OF 1 // INSTANT ADMISSION PORTAL
                  </span>
                  <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#0A0A0C]">
                    SECURE YOUR SEAT
                  </h2>
                  <p className="text-xs text-[#666] mt-1">
                    Enter your details below to activate your student ID and gain immediate portal access.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Full Name Field */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#0A0A0C] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-black text-sm bg-[#FAFAFA] focus:bg-white focus:outline-none focus:shadow-[3px_3px_0px_#FF0022] transition-all font-medium"
                    />
                  </div>

                  {/* Contact Grid: Phone + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-[#0A0A0C] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="017XXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-black text-sm bg-[#FAFAFA] focus:bg-white focus:outline-none focus:shadow-[3px_3px_0px_#FF0022] transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-[#0A0A0C] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-black text-sm bg-[#FAFAFA] focus:bg-white focus:outline-none focus:shadow-[3px_3px_0px_#FF0022] transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector Cards */}
                  <div className="pt-1">
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#0A0A0C] mb-1.5">
                      Select Payment Channel *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {/* bKash */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("bkash")}
                        className={`p-2.5 border-2 text-left transition-all cursor-pointer relative ${
                          paymentMethod === "bkash"
                            ? "border-[#E2136E] bg-[#E2136E]/10 shadow-[3px_3px_0px_#000]"
                            : "border-black/20 hover:border-black bg-[#FAFAFA]"
                        }`}
                      >
                        {paymentMethod === "bkash" && (
                          <div className="absolute top-2 right-2 w-4 h-4 bg-[#E2136E] rounded-full flex items-center justify-center">
                            <Check size={10} className="text-white" />
                          </div>
                        )}
                        <span className="font-heading font-black text-xs block text-[#E2136E]">
                          bKash
                        </span>
                        <span className="text-[10px] text-black/60 font-medium block">
                          Personal / Merch
                        </span>
                      </button>

                      {/* Nagad */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("nagad")}
                        className={`p-2.5 border-2 text-left transition-all cursor-pointer relative ${
                          paymentMethod === "nagad"
                            ? "border-[#F7941D] bg-[#F7941D]/10 shadow-[3px_3px_0px_#000]"
                            : "border-black/20 hover:border-black bg-[#FAFAFA]"
                        }`}
                      >
                        {paymentMethod === "nagad" && (
                          <div className="absolute top-2 right-2 w-4 h-4 bg-[#F7941D] rounded-full flex items-center justify-center">
                            <Check size={10} className="text-white" />
                          </div>
                        )}
                        <span className="font-heading font-black text-xs block text-[#F7941D]">
                          Nagad
                        </span>
                        <span className="text-[10px] text-black/60 font-medium block">
                          Instant App/PIN
                        </span>
                      </button>

                      {/* Card / Bank */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-2.5 border-2 text-left transition-all cursor-pointer relative ${
                          paymentMethod === "card"
                            ? "border-black bg-black/10 shadow-[3px_3px_0px_#000]"
                            : "border-black/20 hover:border-black bg-[#FAFAFA]"
                        }`}
                      >
                        {paymentMethod === "card" && (
                          <div className="absolute top-2 right-2 w-4 h-4 bg-black rounded-full flex items-center justify-center">
                            <Check size={10} className="text-white" />
                          </div>
                        )}
                        <span className="font-heading font-black text-xs block text-[#0A0A0C]">
                          Card / Bank
                        </span>
                        <span className="text-[10px] text-black/60 font-medium block">
                          Visa / Mastercard
                        </span>
                      </button>
                    </div>

                    {/* Dynamic Channel Instructions */}
                    {paymentMethod === "bkash" && (
                      <div className="mt-2 p-2.5 bg-[#E2136E]/10 border border-[#E2136E] text-xs space-y-1 font-mono">
                        <div className="flex items-center justify-between text-[#E2136E] font-bold">
                          <span>bKash Send Money:</span>
                          <button
                            type="button"
                            onClick={() => handleCopyNumber("01711000000")}
                            className="bg-white px-2 py-0.5 border border-[#E2136E] text-black flex items-center gap-1 hover:bg-[#E2136E] hover:text-white transition-colors cursor-pointer"
                          >
                            <span>01711-000000</span>
                            <Copy size={11} />
                          </button>
                        </div>
                        <p className="text-[10px] text-black/70">
                          {copiedNumber ? "✓ Number copied to clipboard!" : "Send ৳6,000 as Send Money. Instant automated confirmation."}
                        </p>
                      </div>
                    )}

                    {paymentMethod === "nagad" && (
                      <div className="mt-2 p-2.5 bg-[#F7941D]/10 border border-[#F7941D] text-xs space-y-1 font-mono">
                        <div className="flex items-center justify-between text-[#F7941D] font-bold">
                          <span>Nagad Send Money:</span>
                          <button
                            type="button"
                            onClick={() => handleCopyNumber("01822000000")}
                            className="bg-white px-2 py-0.5 border border-[#F7941D] text-black flex items-center gap-1 hover:bg-[#F7941D] hover:text-white transition-colors cursor-pointer"
                          >
                            <span>01822-000000</span>
                            <Copy size={11} />
                          </button>
                        </div>
                        <p className="text-[10px] text-black/70">
                          {copiedNumber ? "✓ Number copied to clipboard!" : "Send ৳6,000 as Send Money. Instant automated confirmation."}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Promo Code Input */}
                  <div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                        <input
                          type="text"
                          placeholder="Coupon Code (try 'AODVIP')"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          disabled={couponApplied}
                          className="w-full pl-8 pr-3 py-1.5 border border-black text-xs uppercase bg-[#FAFAFA] font-mono focus:outline-none focus:bg-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={couponApplied || !couponCode.trim()}
                        className="px-3.5 py-1.5 bg-black text-white text-xs font-bold uppercase border border-black hover:bg-neutral-800 disabled:opacity-50 cursor-pointer"
                      >
                        {couponApplied ? "APPLIED ✓" : "APPLY"}
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="text-[11px] text-green-700 font-bold mt-1">
                        🎉 VIP Coupon Applied! ৳500 Additional Discount.
                      </p>
                    )}
                    {couponError && (
                      <p className="text-[11px] text-red-600 font-bold mt-1">
                        {couponError}
                      </p>
                    )}
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center gap-2 text-xs text-[#555] pt-0.5">
                    <ShieldCheck size={15} className="text-[#FF0022] shrink-0" />
                    <span className="text-[11px] font-medium">
                      256-Bit SSL Encrypted • Instant Admission Pass & Portal Access
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-[50px] bg-[#FF0022] text-white font-heading font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#E6001E] hover:shadow-[6px_6px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer mt-2 select-none"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>SECURING ADMISSION SEAT...</span>
                      </span>
                    ) : (
                      <>
                        <Zap size={16} className="fill-current" />
                        <span>CONFIRM PRE-BOOKING (৳{finalPrice.toLocaleString()})</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
