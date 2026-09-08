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
import MasterclassModal from "@/components/MasterclassModal";

export default function Home() {
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [masterclassModalOpen, setMasterclassModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>(
    "THE ART OF DESIGN WITH MANIPULATION - VOL 4.0"
  );

  const handleOpenEnroll = (courseTitle?: string) => {
    if (courseTitle) {
      setSelectedCourse(courseTitle);
    }
    setEnrollModalOpen(true);
  };

  const handleWatchMasterclass = () => {
    setMasterclassModalOpen(true);
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
      {/* Top Announcement Banner matching AOD.svg */}
      <AnnouncementBar onWatchMasterclass={handleWatchMasterclass} />

      {/* Main Navigation Header matching AOD.svg */}
      <Navbar onWatchMasterclass={handleWatchMasterclass} />

      {/* Hero Section matching AOD.svg */}
      <Hero
        onPreBook={() => handleOpenEnroll("THE ART OF DESIGN WITH MANIPULATION - VOL 4.0")}
        onWatchMasterclass={handleWatchMasterclass}
      />

      {/* Industry Modules Course Cards matching AOD.svg */}
      <IndustryModules onEnroll={handleOpenEnroll} />

      {/* Student Design Showcase Section matching AOD.svg */}
      <StudentShowcase
        onExplorePortfolios={handleExplorePortfolios}
        onReadReviews={handleReadReviews}
      />

      {/* Frequently Asked Questions matching AOD.svg */}
      <FAQ />

      {/* Footer matching AOD.svg */}
      <Footer />

      {/* Interactive Modals */}
      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        courseTitle={selectedCourse}
      />

      <MasterclassModal
        isOpen={masterclassModalOpen}
        onClose={() => setMasterclassModalOpen(false)}
        onPreBook={() => handleOpenEnroll("THE ART OF DESIGN WITH MANIPULATION - VOL 4.0")}
      />

      <DashboardModal />
    </main>
  );
}
