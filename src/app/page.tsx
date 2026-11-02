"use client";

import React, { useState } from "react";
import { LoadingScreen } from "@/components/sections/LoadingScreen";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Articles } from "@/components/sections/Articles";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      {/* Liquid Glass Initial Loading Screen */}
      <LoadingScreen onLoaded={() => setLoadingComplete(true)} />

      {/* Floating Frosted Glass Navigation Capsule */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative flex flex-col">
        {/* Section 1: Hero with Autonomous Vehicle 3D Perception Simulator */}
        <Hero />

        {/* Section 2: About & Academic Background */}
        <About />

        {/* Section 3: Projects & Systems */}
        <Projects />

        {/* Section 4: Engineering Articles & Technical Essays */}
        <Articles />

        {/* Section 5: Skills / Tech Stack */}
        <Skills />

        {/* Section 6: Experience / Timeline */}
        <Timeline />

        {/* Section 7: Contact Form */}
        <Contact />
      </main>

      {/* Section 8: Footer */}
      <Footer />
    </>
  );
}
