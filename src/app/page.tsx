"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IndustryModules from "@/components/IndustryModules";
import StudentShowcase from "@/components/StudentShowcase";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import DashboardModal from "@/components/DashboardModal";
import PenToolCursor from "@/components/PenToolCursor";

export default function Home() {
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>(
    "THE ART OF DESIGN WITH MANIPULATION - VOL 4.0"
  );
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);

  const handleOpenEnroll = (courseTitle?: string) => {
    if (courseTitle) {
      setSelectedCourse(courseTitle);
    }
    setEnrollModalOpen(true);
  };

  const handleWatchMasterclass = () => {
    // Scrolls to courses or opens video preview
    const element = document.getElementById("courses");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExplorePortfolios = () => {
    const element = document.getElementById("portfolios");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReadReviews = () => {
    window.open("https://facebook.com", "_blank");
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#F9F9F9] text-[#0A0A0C]">
      {/* Interactive Custom Pen Tool Pointer */}
      <PenToolCursor />

      {/* Top Announcement Banner */}
      <AnnouncementBar />

      {/* Main Navigation Header */}
      <Navbar onOpenDashboard={() => setDashboardModalOpen(true)} />

      {/* Hero Section */}
      <Hero
        onPreBook={() => handleOpenEnroll("THE ART OF DESIGN WITH MANIPULATION - VOL 4.0")}
        onWatchMasterclass={handleWatchMasterclass}
      />

      {/* Industry Modules Course Cards */}
      <IndustryModules onEnroll={handleOpenEnroll} />

      {/* Student Design Showcase Section */}
      <StudentShowcase
        onExplorePortfolios={handleExplorePortfolios}
        onReadReviews={handleReadReviews}
      />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        courseTitle={selectedCourse}
      />

      <DashboardModal
        isOpen={dashboardModalOpen}
        onClose={() => setDashboardModalOpen(false)}
      />
    </main>
  );
}
