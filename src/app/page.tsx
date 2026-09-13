"use client";

import React, { useState } from "react";
import { LoadingScreen } from "@/components/sections/LoadingScreen";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
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
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: About */}
        <About />

        {/* Section 3: Projects */}
        <Projects />

        {/* Section 4: Skills / Tech Stack */}
        <Skills />

        {/* Section 5: Experience / Timeline */}
        <Timeline />

        {/* Section 6: Contact */}
        <Contact />
      </main>

      {/* Section 7: Footer */}
      <Footer />
    </>
  );
}
