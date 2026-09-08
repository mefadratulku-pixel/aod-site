"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  Play,
  Download,
  UploadCloud,
  CheckCircle2,
  Clock,
  ArrowRight,
  LogOut,
  Sparkles,
  BookOpen,
  FolderDown,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const { isLoggedIn, user, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"lessons" | "resources" | "assignments">("lessons");
  const [selectedLesson, setSelectedLesson] = useState("07 — Atmospheric Lighting & Volumetric Painting");
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || "tanvir.aod@artofdesign.academy", password);
  };

  const handleDemoLogin = () => {
    login("tanvir.aod@artofdesign.academy", "student2026");
  };

  // 1. UNPROTECTED / NOT LOGGED IN STATE
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex flex-col bg-[#F9F9F9] text-[#0A0A0C]">
        <AnnouncementBar />
        <Navbar />

        <div className="flex-grow flex items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-md bg-white border-2 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000]">
            <div className="text-center space-y-3 mb-6">
              <div className="w-14 h-14 bg-[#FFF2F4] border-2 border-black text-[#FF0022] flex items-center justify-center mx-auto shadow-[3px_3px_0px_#000]">
                <Lock size={26} />
              </div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#FF0022] uppercase block">
                RESTRICTED AREA // AUTHENTICATION REQUIRED
              </span>
              <h1 className="font-heading font-black text-2xl uppercase tracking-tight text-[#0A0A0C]">
                STUDENT DASHBOARD
              </h1>
              <p className="text-xs text-[#555] leading-relaxed">
                You must be logged in with an active AOD student account to view class video archives, PSD files, and assignments.
              </p>
            </div>

            {/* 1-Click Demo Login Box */}
            <div className="mb-6 p-4 bg-[#FFF2F4] border border-black shadow-[3px_3px_0px_#000]">
              <span className="text-[10px] font-mono font-bold uppercase text-[#FF0022] tracking-wider block mb-1">
                EVALUATOR & DEMO ACCESS
              </span>
              <p className="text-xs text-black/70 mb-3">
                Click below to instantly sign in as an active Batch 05 student.
              </p>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full h-[44px] bg-[#FF0022] text-white font-heading font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-black hover:bg-[#E6001E] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
              >
                <CheckCircle2 size={16} />
                <span>1-CLICK DEMO LOGIN</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="relative my-4 flex items-center justify-center">
              <div className="border-t border-black/20 w-full" />
              <span className="bg-white px-3 text-[11px] font-mono text-black/40 uppercase tracking-widest absolute">
                OR SIGN IN WITH EMAIL
              </span>
            </div>

            <form onSubmit={handleManualLogin} className="space-y-4 pt-1">
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
                  className="w-full px-3.5 py-2.5 border border-black text-xs sm:text-sm bg-[#FAFAFA] focus:outline-none focus:bg-white"
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
                  className="w-full px-3.5 py-2.5 border border-black text-xs sm:text-sm bg-[#FAFAFA] focus:outline-none focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full h-[46px] bg-black text-white font-heading font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-black hover:bg-neutral-800 transition-all cursor-pointer"
              >
                <span>LOG IN TO PORTAL</span>
                <ArrowRight size={14} />
              </button>
            </form>

            <div className="pt-5 mt-5 border-t border-black/10 text-center">
              <Link href="/" className="text-xs font-bold text-[#FF0022] hover:underline">
                ← Return to Homepage
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  // 2. PROTECTED / LOGGED IN STUDENT DASHBOARD
  return (
    <main className="min-h-screen flex flex-col bg-[#F9F9F9] text-[#0A0A0C]">
      <AnnouncementBar />
      <Navbar />

      {/* Student Welcome Header Bar */}
      <div className="border-b-2 border-black bg-white">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-black text-white font-black text-xl flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_#FF0022]">
              TA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase bg-[#FF0022] text-white px-2 py-0.5">
                  STUDENT PORTAL
                </span>
                <span className="text-xs font-mono text-black/60 font-bold">
                  BATCH 05 (ACTIVE)
                </span>
              </div>
              <h1 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-[#0A0A0C]">
                WELCOME BACK, {user?.name || "TANVIR AHMED"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="h-[40px] px-5 bg-white border border-black text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              <span>SIGN OUT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Main Container */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-8 sm:py-12 flex-grow space-y-8">
        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="border border-black p-4 sm:p-5 bg-white shadow-[3px_3px_0px_#000]">
            <span className="text-[10px] font-mono font-bold text-black/50 uppercase">ENROLLED</span>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0C] mt-1">03 Modules</div>
            <span className="text-[11px] text-[#FF0022] font-semibold">Active Batch 05</span>
          </div>

          <div className="border border-black p-4 sm:p-5 bg-white shadow-[3px_3px_0px_#000]">
            <span className="text-[10px] font-mono font-bold text-black/50 uppercase">LESSONS COMPLETED</span>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0C] mt-1">18 / 24</div>
            <span className="text-[11px] text-green-700 font-semibold">68% Curriculum Done</span>
          </div>

          <div className="border border-black p-4 sm:p-5 bg-white shadow-[3px_3px_0px_#000]">
            <span className="text-[10px] font-mono font-bold text-black/50 uppercase">ASSETS DOWNLOADED</span>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0C] mt-1">1.4 GB</div>
            <span className="text-[11px] text-black/60 font-semibold">PSD & Brushes Vault</span>
          </div>

          <div className="border border-black p-4 sm:p-5 bg-white shadow-[3px_3px_0px_#000]">
            <span className="text-[10px] font-mono font-bold text-black/50 uppercase">PROJECT SCORE</span>
            <div className="text-2xl sm:text-3xl font-black text-[#FF0022] mt-1">96%</div>
            <span className="text-[11px] text-black/60 font-semibold">Ranked Top 5%</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b-2 border-black pb-2">
          <button
            onClick={() => setActiveTab("lessons")}
            className={`px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wider cursor-pointer border ${
              activeTab === "lessons"
                ? "bg-black text-white border-black"
                : "bg-white text-black border-transparent hover:border-black"
            }`}
          >
            Video Classroom
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wider cursor-pointer border ${
              activeTab === "resources"
                ? "bg-black text-white border-black"
                : "bg-white text-black border-transparent hover:border-black"
            }`}
          >
            Resource Vault (PSD/Brushes)
          </button>
          <button
            onClick={() => setActiveTab("assignments")}
            className={`px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wider cursor-pointer border ${
              activeTab === "assignments"
                ? "bg-black text-white border-black"
                : "bg-white text-black border-transparent hover:border-black"
            }`}
          >
            Assignment Critique & Upload
          </button>
        </div>

        {/* TAB 1: VIDEO CLASSROOM */}
        {activeTab === "lessons" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Video Player Simulator */}
            <div className="lg:col-span-8 space-y-4">
              <div className="border-2 border-black bg-black aspect-[16/9] relative flex flex-col justify-between p-6 text-white shadow-[4px_4px_0px_#000]">
                {/* Top overlay */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-[11px] font-mono font-bold bg-[#FF0022] px-2.5 py-0.5 text-white">
                    HD 1080P • CLASSROOM RECORDING
                  </span>
                  <span className="text-xs font-mono text-white/70">
                    AOD MASTERCLASS VOL 4.0
                  </span>
                </div>

                {/* Center Play Button Simulator */}
                <div className="self-center text-center cursor-pointer group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FF0022] rounded-full flex items-center justify-center mx-auto border-2 border-white group-hover:scale-105 transition-transform">
                    <Play size={28} className="text-white fill-white ml-1" />
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase mt-3 block text-white/90">
                    RESUME PLAYBACK
                  </span>
                </div>

                {/* Bottom Timeline bar */}
                <div className="space-y-2 z-10">
                  <div className="flex items-center justify-between text-xs font-mono text-white/80">
                    <span>{selectedLesson}</span>
                    <span>24:18 / 38:50</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-[62%] h-full bg-[#FF0022]" />
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white border border-black shadow-[2px_2px_0px_#000]">
                <h3 className="font-heading font-black text-lg uppercase text-[#0A0A0C]">
                  Lesson Description & Key Concepts
                </h3>
                <p className="text-xs sm:text-sm text-[#444] mt-2 leading-relaxed">
                  In this masterclass session, Fatiqul Ferdush Asif breaks down how light rays bend through atmospheric dust and smog in commercial advertising. We explore how to paint volumetric rim light using Soft Round brushes with Color Dodge and Overlay blend modes without blowing out pixel details.
                </p>
              </div>
            </div>

            {/* Right: Playlist Lessons */}
            <div className="lg:col-span-4 border border-black bg-white p-5 shadow-[4px_4px_0px_#000] space-y-4">
              <div className="flex items-center justify-between border-b border-black/10 pb-3">
                <h3 className="font-heading font-black text-sm uppercase text-[#0A0A0C]">
                  Course Curriculum Lessons
                </h3>
                <span className="text-[10px] font-mono text-black/50">24 SESSIONS</span>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {[
                  { num: "05", title: "Complex Pen Tool Masking", dur: "32m", completed: true },
                  { num: "06", title: "Anatomy of Light & Shadow Math", dur: "45m", completed: true },
                  { num: "07", title: "Atmospheric Lighting & Volumetric Painting", dur: "38m", active: true },
                  { num: "08", title: "Contact Shadows vs Specular Reflections", dur: "41m" },
                  { num: "09", title: "Dual-Tone Color Harmonization", dur: "30m" },
                  { num: "10", title: "Camera Raw High-Pass Retouching", dur: "28m" },
                  { num: "11", title: "Client Art Direction Presentation", dur: "52m" },
                ].map((item) => (
                  <button
                    key={item.num}
                    onClick={() => setSelectedLesson(`${item.num} — ${item.title}`)}
                    className={`w-full p-3 text-left border flex items-center justify-between transition-colors cursor-pointer ${
                      item.active
                        ? "border-[#FF0022] bg-[#FFF2F4]"
                        : "border-black/10 hover:border-black bg-[#FAFAFA]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.completed ? (
                        <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                      ) : (
                        <Play size={14} className={item.active ? "text-[#FF0022]" : "text-black/40"} />
                      )}
                      <div>
                        <div className="text-xs font-bold text-[#0A0A0C] line-clamp-1">
                          {item.num}. {item.title}
                        </div>
                        <span className="text-[10px] font-mono text-black/50">
                          {item.dur}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RESOURCE VAULT */}
        {activeTab === "resources" && (
          <div className="space-y-4">
            <div className="p-4 bg-[#FFF2F4] border border-black shadow-[3px_3px_0px_#000] flex items-center justify-between">
              <div>
                <span className="font-bold text-xs uppercase text-[#FF0022]">
                  STUDENT DOWNLOAD VAULT
                </span>
                <p className="text-xs text-black/70">
                  All raw plates, brush packs, and color LUTs for Vol 4.0 and Workshop assignments.
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-white px-2 py-1 border border-black">
                FREE FOR ENROLLED STUDENTS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Vol_4_Lesson_07_Commercial_Plate.psd", size: "450 MB", type: "Photoshop Layered PSD" },
                { name: "AOD_Master_Brush_Kit_2026.abr", size: "85 MB", type: "Custom Photoshop Brushes" },
                { name: "Cinematic_Atmospheric_LUTs_Pack.cube", size: "14 MB", type: "3D LUT Grading Files" },
                { name: "Commercial_High_Ticket_Pitch_Deck.pdf", size: "22 MB", type: "Client Presentation Template" },
              ].map((res, idx) => (
                <div
                  key={idx}
                  className="border border-black bg-white p-4 flex items-center justify-between shadow-[3px_3px_0px_#000]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
                      <FolderDown size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0A0A0C]">{res.name}</div>
                      <span className="text-[11px] font-mono text-black/50">
                        {res.size} • {res.type}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Downloading ${res.name}...`)}
                    className="px-3 py-1.5 bg-[#FF0022] text-white text-xs font-extrabold uppercase flex items-center gap-1.5 border border-black hover:bg-[#E6001E] cursor-pointer"
                  >
                    <Download size={14} />
                    <span>GET FILE</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ASSIGNMENT UPLOAD */}
        {activeTab === "assignments" && (
          <div className="max-w-2xl mx-auto border-2 border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_#000] space-y-6">
            <div className="border-b border-black pb-4">
              <span className="text-[10px] font-mono font-bold bg-black text-white px-2 py-0.5 uppercase">
                ASSIGNMENT 03 // BATCH 05
              </span>
              <h2 className="font-heading font-black text-xl uppercase mt-2 text-[#0A0A0C]">
                Commercial Light Painting Challenge
              </h2>
              <p className="text-xs text-[#555] mt-1">
                Due: Next Sunday at 11:59 PM BST. Must submit final high-res JPEG and PSD link.
              </p>
            </div>

            {assignmentSubmitted ? (
              <div className="p-6 bg-green-50 border-2 border-green-600 text-center space-y-3">
                <CheckCircle2 size={32} className="text-green-600 mx-auto" />
                <h3 className="font-bold text-sm text-green-900 uppercase">
                  ASSIGNMENT SUBMITTED SUCCESSFULLY!
                </h3>
                <p className="text-xs text-green-700 max-w-sm mx-auto">
                  Fatiqul Ferdush Asif and the reviewing mentors will critique your plate in the upcoming live feedback session.
                </p>
                <button
                  onClick={() => setAssignmentSubmitted(false)}
                  className="px-4 py-1.5 text-xs font-bold border border-green-700 bg-white text-green-800 uppercase cursor-pointer"
                >
                  Upload New Version
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-black/40 p-8 text-center bg-[#FBFBFB] space-y-2 cursor-pointer hover:border-black transition-colors">
                  <UploadCloud size={32} className="text-[#FF0022] mx-auto" />
                  <div className="text-xs font-bold uppercase text-[#0A0A0C]">
                    Drag and drop your project work (.jpg, .png, .zip)
                  </div>
                  <span className="text-[11px] font-mono text-black/50 block">
                    Maximum file size: 250 MB
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#0A0A0C] mb-1">
                    Google Drive or Behance Plate Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full px-3.5 py-2.5 border border-black text-xs bg-[#FAFAFA]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setAssignmentSubmitted(true)}
                  className="w-full h-[46px] bg-[#FF0022] text-white font-heading font-extrabold text-xs tracking-wider uppercase border border-black shadow-[3px_3px_0px_#000] hover:bg-[#E6001E] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
                >
                  SUBMIT FOR INSTRUCTOR REVIEW
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
