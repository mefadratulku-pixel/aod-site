"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Users,
  Star,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { COURSES } from "@/data/courses";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import DashboardModal from "@/components/DashboardModal";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.id;
  const course = COURSES[courseId] || COURSES["vol-4"];

  if (!course) {
    notFound();
  }

  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);

  const toggleModule = (index: number) => {
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#F9F9F9] text-[#0A0A0C]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Persistent Sticky Navbar */}
      <Navbar />

      {/* Breadcrumb Bar */}
      <div className="border-b border-[#CFC4C5] bg-[#F3F3F3]">
        <div className="w-full max-w-[2100px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 py-3 flex items-center gap-2 text-xs font-mono uppercase text-black/60">
          <Link href="/" className="hover:text-black hover:underline">
            HOME
          </Link>
          <span>/</span>
          <Link href="/#courses" className="hover:text-black hover:underline">
            COURSES
          </Link>
          <span>/</span>
          <span className="text-[#0A0A0C] font-bold truncate max-w-md">
            {course.title}
          </span>
        </div>
      </div>

      {/* Main Course Content Container with Fluid Fit-To-Width Scaling */}
      <div className="w-full max-w-[2100px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 py-10 sm:py-16 flex-grow">
        {/* Course Header Banner */}
        <div className="pb-8 sm:pb-10 border-b border-[#CFC4C5]">
          <div className="inline-block bg-black text-white px-3.5 py-1 text-[11px] sm:text-xs font-black tracking-widest uppercase mb-4 border border-black">
            {course.badge}
          </div>

          <h1 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight uppercase text-[#0A0A0C] max-w-5xl">
            {course.title}
          </h1>

          <p className="text-base sm:text-lg xl:text-xl text-[#555] mt-3 sm:mt-4 max-w-4xl font-medium leading-relaxed">
            {course.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-black/10 text-xs sm:text-sm font-semibold">
            <div className="flex items-center gap-2 text-black">
              <span className="text-black/50 uppercase font-mono text-[11px]">INSTRUCTOR:</span>
              <span className="font-bold underline">{course.instructor}</span>
            </div>

            <div className="flex items-center gap-1.5 text-black">
              <Star size={16} className="text-[#FF0022] fill-[#FF0022]" />
              <span className="font-black">{course.rating}</span>
              <span className="text-black/50">({course.reviewsCount} reviews)</span>
            </div>

            <div className="flex items-center gap-2 text-black">
              <Users size={16} className="text-black/60" />
              <span>{course.studentsCount} Students Enrolled</span>
            </div>

            <div className="flex items-center gap-2 text-black">
              <Clock size={16} className="text-black/60" />
              <span>{course.level}</span>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Curriculum / Details & Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 mt-10 sm:mt-12">
          {/* Left Column: Media, Description, Learnings, Modules */}
          <div className="lg:col-span-8 space-y-12 sm:space-y-14">
            {/* High-Resolution Course Poster with 1px border matching AOD.svg */}
            <div className="border border-black relative w-full aspect-[16/9] sm:aspect-[21/9] bg-black overflow-hidden shadow-sm">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute top-4 left-4 bg-white px-3.5 py-1 text-xs font-black tracking-wider uppercase border border-black shadow-[2px_2px_0px_#000]">
                OFFICIAL CURRICULUM
              </div>
            </div>

            {/* Course Overview */}
            <div className="space-y-4">
              <h2 className="font-heading font-black text-xl sm:text-2xl xl:text-3xl uppercase tracking-tight text-[#0A0A0C] border-b border-black pb-2">
                OVERVIEW & PHILOSOPHY
              </h2>
              <p className="text-sm sm:text-base xl:text-lg text-[#333] leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* What You Will Learn */}
            <div className="space-y-4">
              <h2 className="font-heading font-black text-xl sm:text-2xl xl:text-3xl uppercase tracking-tight text-[#0A0A0C] border-b border-black pb-2">
                WHAT YOU WILL MASTER
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {course.learnings.map((learning, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-4 bg-white border border-black shadow-[2px_2px_0px_#000]"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-[#FF0022] shrink-0 mt-0.5"
                    />
                    <span className="text-xs sm:text-sm font-semibold text-[#111] leading-snug">
                      {learning}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Curriculum Syllabus Accordion */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-black pb-2">
                <h2 className="font-heading font-black text-xl sm:text-2xl xl:text-3xl uppercase tracking-tight text-[#0A0A0C]">
                  COURSE SYLLABUS & MODULES
                </h2>
                <span className="text-xs sm:text-sm font-mono font-bold text-black/60 uppercase">
                  {course.modules.length} MODULES
                </span>
              </div>

              <div className="space-y-3.5 pt-2">
                {course.modules.map((mod, index) => {
                  const isOpen = openModuleIndex === index;
                  return (
                    <div
                      key={mod.number}
                      className="border border-black bg-white shadow-[3px_3px_0px_#000] overflow-hidden"
                    >
                      <button
                        onClick={() => toggleModule(index)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#F9F9F9] transition-colors"
                      >
                        <div className="flex items-center gap-3.5 sm:gap-4">
                          <span className="w-8 h-8 sm:w-9 sm:h-9 bg-black text-white font-mono text-xs sm:text-sm font-black flex items-center justify-center">
                            {mod.number}
                          </span>
                          <div>
                            <h3 className="font-heading font-black text-sm sm:text-base xl:text-lg uppercase text-[#0A0A0C]">
                              {mod.title}
                            </h3>
                            <span className="text-[11px] sm:text-xs font-mono text-black/50">
                              Duration: {mod.duration} • {mod.lessons.length} Lessons
                            </span>
                          </div>
                        </div>

                        <span className="p-1 border border-black">
                          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-2 border-t border-black/10 bg-[#FAFAFA]">
                          <ul className="space-y-3">
                            {mod.lessons.map((lesson, lIdx) => (
                              <li
                                key={lIdx}
                                className="flex items-center justify-between text-xs sm:text-sm text-[#222] py-1.5 border-b border-black/5"
                              >
                                <span className="flex items-center gap-2.5">
                                  <span className="text-[#FF0022] font-mono font-bold">
                                    0{lIdx + 1}.
                                  </span>
                                  <span>{lesson}</span>
                                </span>
                                <span className="text-[11px] font-mono text-black/40">
                                  HD Video
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructor Bio Box */}
            <div className="border border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_#000] space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-black text-white font-black text-xl flex items-center justify-center uppercase border border-black">
                  AOD
                </div>
                <div>
                  <span className="text-[10px] font-mono font-black uppercase text-[#FF0022] tracking-widest block">
                    COURSE CREATOR & MENTOR
                  </span>
                  <h3 className="font-heading font-black text-xl sm:text-2xl uppercase text-[#0A0A0C]">
                    {course.instructor}
                  </h3>
                  <p className="text-xs text-black/60 font-medium">
                    {course.instructorRole}
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm xl:text-base text-[#444] leading-relaxed">
                Fatiqul Ferdush Asif has directed commercial brand campaigns and trained hundreds of visual creatives in Bangladesh to transition from entry-level freelancers into high-earning art directors and commercial designers.
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Enrollment Box */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 border-2 border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_#000] space-y-6">
              <div>
                <span className="text-[10px] font-mono font-black uppercase bg-[#FF0022] text-white px-2.5 py-1 inline-block mb-3">
                  LIMITED SEATS • BATCH 05
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl xl:text-5xl font-black text-[#0A0A0C]">
                    {course.salePrice}
                  </span>
                  <span className="text-base sm:text-lg xl:text-xl text-[#FF0022] line-through font-bold">
                    {course.originalPrice}
                  </span>
                  <span className="text-xs font-mono font-bold text-green-700 bg-green-100 px-2 py-0.5 border border-green-300">
                    60% OFF
                  </span>
                </div>
                <p className="text-[11px] text-black/60 font-mono mt-1">
                  Inclusive of all live sessions & digital assets
                </p>
              </div>

              {/* Solid Red ENROLL NOW Button */}
              <button
                onClick={() => setEnrollModalOpen(true)}
                className="w-full h-[52px] bg-[#FF0022] text-white font-heading font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 border border-black shadow-[3px_3px_0px_#000] hover:bg-[#E6001E] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <span>ENROLL IN THIS BATCH</span>
                <ArrowRight size={18} />
              </button>

              {/* Guarantee & Specs */}
              <div className="space-y-3.5 pt-4 border-t border-black/10 text-xs sm:text-sm font-medium text-[#222]">
                <div className="flex items-center gap-2.5">
                  <BookOpen size={16} className="text-[#FF0022] shrink-0" />
                  <span>24+ Comprehensive Video Masterclasses</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock size={16} className="text-[#FF0022] shrink-0" />
                  <span>Lifetime Access to Class Vault</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award size={16} className="text-[#FF0022] shrink-0" />
                  <span>Verified AOD Graduate Certificate</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-[#FF0022] shrink-0" />
                  <span>Direct Portfolio Feedback & Reviews</span>
                </div>
              </div>

              <div className="p-3.5 bg-[#FFF2F4] border border-black/20 text-center text-xs font-mono font-semibold text-[#FF0022]">
                ⚡ 42 of 50 Seats Already Booked!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        courseTitle={course.title}
      />
      <DashboardModal />
    </main>
  );
}
