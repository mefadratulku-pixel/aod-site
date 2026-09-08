"use client";

import React, { useState } from "react";
import { X, CheckCircle, ShieldCheck } from "lucide-react";

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
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bkash");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border-2 border-black max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 text-black hover:bg-black hover:text-white transition-colors border border-black/10"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="mx-auto text-[#FF0022]" size={56} />
            <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-[#0A0A0C]">
              PRE-BOOKING CONFIRMED!
            </h3>
            <p className="text-sm text-[#555] max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-black">{fullName}</strong>. Our student advisor will contact you on{" "}
              <strong className="text-black">{phone}</strong> within 15 minutes with enrollment instructions.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="btn-red px-8 py-3 text-xs tracking-wider mt-4"
            >
              CLOSE WINDOW
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold tracking-widest uppercase bg-[#FF0022] text-white px-2.5 py-1 inline-block mb-2">
                BATCH 05 PRE-BOOKING
              </span>
              <h3 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-[#0A0A0C]">
                {courseTitle}
              </h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-sm text-[#FF0022] line-through font-semibold">
                  ৳15,000
                </span>
                <span className="text-2xl font-black text-[#0A0A0C]">৳6,000</span>
                <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 border border-green-300 font-bold ml-2">
                  SAVE 60%
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0C] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF0022]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0C] mb-1">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF0022]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0C] mb-2">
                  Payment Option
                </label>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                  {["bkash", "nagad", "card"].map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`py-2 px-3 border uppercase transition-all ${
                        paymentMethod === m
                          ? "border-[#FF0022] bg-[#FF0022]/10 text-[#FF0022] font-black"
                          : "border-black/20 hover:border-black text-[#555]"
                      }`}
                    >
                      {m === "card" ? "Credit/Debit" : m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#666] pt-2">
                <ShieldCheck size={16} className="text-green-600 shrink-0" />
                <span>Instant access to dashboard + lifetime community support.</span>
              </div>

              <button
                type="submit"
                className="btn-red w-full py-3 text-xs tracking-wider mt-4"
              >
                CONFIRM PRE-BOOKING NOW ↗
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
