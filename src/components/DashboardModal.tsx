"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardModal() {
  const { loginModalOpen, closeLoginModal, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  if (!loginModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || "student@artofdesign.academy", password);
    closeLoginModal();
    router.push("/dashboard");
  };

  const handleDemoLogin = () => {
    login("tanvir.aod@artofdesign.academy", "student2026");
    closeLoginModal();
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white border-2 border-black max-w-md w-full p-6 sm:p-8 shadow-[8px_8px_0px_#000] relative">
        {/* Close button */}
        <button
          onClick={closeLoginModal}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 text-black hover:bg-black hover:text-white transition-colors border border-black cursor-pointer shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
        >
          <X size={18} />
        </button>

        <div>
          <div className="mb-6">
            <span className="text-[11px] font-black tracking-widest uppercase bg-black text-white px-2.5 py-1 inline-block mb-3 border border-black shadow-[2px_2px_0px_#FF0022]">
              STUDENT & CREATIVE PORTAL
            </span>
            <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-[#0A0A0C]">
              SIGN IN TO DASHBOARD
            </h3>
            <p className="text-xs text-[#555] mt-1.5 font-medium leading-relaxed">
              Access your enrolled masterclasses, private lesson recordings, and student project reviews.
            </p>
          </div>

          {/* 1-Click Quick Demo Login Button */}
          <div className="mb-5 p-3.5 bg-[#FFF2F4] border border-black shadow-[3px_3px_0px_#000]">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF0022]">
                QUICK ACCESS DEMO
              </span>
              <span className="text-[10px] font-bold text-black/60">NO PASSWORD REQUIRED</span>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="btn-red w-full py-2.5 text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 size={14} />
              <span>1-CLICK INSTANT DEMO LOGIN</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="relative my-4 flex items-center justify-center">
            <div className="border-t border-black/20 w-full" />
            <span className="bg-white px-3 text-[11px] font-mono text-black/50 uppercase tracking-widest absolute">
              OR EMAIL SIGN IN
            </span>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 pt-1">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#0A0A0C] mb-1">
                Registered Email
              </label>
              <input
                type="email"
                required
                placeholder="student@artofdesign.academy"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 border-2 border-black text-sm bg-[#FAFAFA] focus:outline-none focus:bg-white shadow-[2px_2px_0px_#000]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#0A0A0C] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 border-2 border-black text-sm bg-[#FAFAFA] focus:outline-none focus:bg-white shadow-[2px_2px_0px_#000]"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#444] font-medium">
                <input type="checkbox" defaultChecked className="accent-[#FF0022] w-4 h-4" />
                <span>Keep session active</span>
              </label>
              <span className="text-[#777] cursor-pointer hover:text-black hover:underline">
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              className="btn-black w-full py-3 text-xs tracking-wider flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              <Lock size={14} />
              <span>ENTER STUDENT DASHBOARD</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
