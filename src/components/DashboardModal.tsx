"use client";

import React, { useState } from "react";
import { X, Lock, ArrowRight } from "lucide-react";

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardModal({ isOpen, onClose }: DashboardModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border-2 border-black max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 text-black hover:bg-black hover:text-white transition-colors border border-black/10"
        >
          <X size={18} />
        </button>

        {loggedIn ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-green-100 text-green-700 flex items-center justify-center mx-auto rounded-full">
              <Lock size={24} />
            </div>
            <h3 className="font-heading font-black text-xl uppercase tracking-tight text-[#0A0A0C]">
              WELCOME TO AOD PORTAL
            </h3>
            <p className="text-sm text-[#555]">
              Redirecting you to student dashboard with your active batch modules...
            </p>
            <button
              onClick={() => {
                setLoggedIn(false);
                onClose();
              }}
              className="btn-black px-6 py-2.5 text-xs tracking-wider mt-2"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold tracking-widest uppercase bg-[#0A0A0C] text-white px-2.5 py-1 inline-block mb-2">
                STUDENT & CREATIVE PORTAL
              </span>
              <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-[#0A0A0C]">
                SIGN IN TO DASHBOARD
              </h3>
              <p className="text-xs text-[#666] mt-1">
                Access your masterclasses, lesson recordings, and student project reviews.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0C] mb-1">
                  Registered Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF0022]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0C] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-[#FF0022]"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#555]">
                  <input type="checkbox" className="accent-[#FF0022]" />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="text-[#FF0022] font-semibold hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="btn-red w-full py-3 text-xs tracking-wider flex items-center justify-center gap-2 mt-4"
              >
                <span>ENTER DASHBOARD</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
