"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { personalData } from "@/data/personal";
import { Magnetic } from "@/components/ui/Magnetic";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  FolderGit2,
  Youtube,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

// Dynamically import 3D Canvas with ssr: false
const HeroGlassCanvas = dynamic(
  () => import("@/components/canvas/HeroGlassObject"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-48 w-48 animate-pulse rounded-full bg-palette-forest/20 blur-2xl" />
      </div>
    ),
  }
);

export const Hero: React.FC = () => {
  const nameLetters = Array.from(personalData.name);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 pt-28 pb-16 md:px-8 md:pt-32"
    >
      {/* Ambient Moving Blobs in Soft Warm Olive & Sage against White Canvas */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[550px] w-[550px] rounded-full bg-palette-sage/15 blur-[140px] animate-blob-float-1" />
        <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-palette-moss/10 blur-[150px] animate-blob-float-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-palette-cream/60 blur-[130px] animate-blob-pulse" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row lg:items-center">
        {/* Left Column: Typography & Action Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left z-10"
        >
          {/* Institutional Status Capsule */}
          <motion.div
            variants={itemVariants}
            className="liquid-glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-palette-forest shadow-sm border border-palette-moss/25 bg-palette-moss/10"
          >
            <GraduationCap className="h-3.5 w-3.5 text-palette-moss" />
            <span>Direct Ph.D. @ IIT Roorkee (Dept. of CSE) · Supervisor: Dr. Neetish Kumar</span>
          </motion.div>

          {/* Staggered Name Reveal */}
          <h1 className="mb-3 text-5xl font-black tracking-tight text-palette-forest sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="inline-flex overflow-hidden">
              {nameLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 + index * 0.035,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`inline-block ${char === " " ? "w-4 sm:w-6" : ""}`}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subtitle */}
          <motion.h2
            variants={itemVariants}
            className="mb-2 max-w-2xl text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-palette-forest via-palette-moss to-palette-sage sm:text-2xl md:text-3xl"
          >
            {personalData.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mb-4 font-mono text-xs text-palette-moss font-semibold"
          >
            {personalData.department} · {personalData.institution}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-xl text-base text-palette-forest/80 sm:text-lg leading-relaxed"
          >
            {personalData.tagline}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3.5 lg:justify-start"
          >
            {/* CTA 1: View Projects */}
            <Magnetic strength={0.3}>
              <a
                href="#projects"
                className="liquid-glass specular-top group flex items-center gap-2 rounded-full border border-palette-moss bg-palette-moss px-6 py-3 text-sm font-semibold text-white shadow-glow-moss transition-all duration-300 hover:bg-palette-forest"
              >
                <FolderGit2 className="h-4 w-4 text-palette-cream transition-transform group-hover:scale-110" />
                <span>Featured Projects</span>
              </a>
            </Magnetic>

            {/* CTA 2: CARLA RL Videos */}
            <Magnetic strength={0.3}>
              <a
                href={personalData.youtubePlaylistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass specular-top group flex items-center gap-2 rounded-full border border-palette-moss/25 bg-white/85 px-5 py-3 text-sm font-medium text-palette-forest transition-all duration-300 hover:border-palette-moss hover:bg-palette-moss/10"
              >
                <Youtube className="h-4 w-4 text-palette-moss transition-transform group-hover:scale-110" />
                <span>48 CARLA Simulations</span>
              </a>
            </Magnetic>

            {/* CTA 3: Get in Touch */}
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className="liquid-glass specular-top group flex items-center gap-2 rounded-full border border-palette-moss/25 bg-white/85 px-5 py-3 text-sm font-medium text-palette-forest transition-all duration-300 hover:border-palette-moss hover:bg-palette-moss/10"
              >
                <Mail className="h-4 w-4 text-palette-moss transition-transform group-hover:scale-110" />
                <span>Contact</span>
              </a>
            </Magnetic>

            {/* Canonical GitHub & LinkedIn */}
            <div className="flex items-center gap-2 pl-1">
              <Magnetic strength={0.35}>
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Animesh Basak GitHub"
                  className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full border border-palette-moss/20 bg-white/85 text-palette-forest transition-all duration-300 hover:border-palette-moss hover:bg-palette-moss/15"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Magnetic>

              <Magnetic strength={0.35}>
                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Animesh Basak LinkedIn"
                  className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full border border-palette-moss/20 bg-white/85 text-palette-forest transition-all duration-300 hover:border-palette-moss hover:bg-palette-moss/15"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Autonomous Vehicle Simulator Canvas */}
        <div className="relative flex h-[420px] w-full flex-1 items-center justify-center sm:h-[500px] lg:h-[580px]">
          <div className="absolute h-80 w-80 rounded-full bg-palette-sage/20 blur-3xl" />
          <HeroGlassCanvas />
        </div>
      </div>

      {/* Scroll prompt */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[10px] tracking-widest text-palette-forest/60 uppercase font-semibold">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-palette-moss" />
        </motion.div>
      </motion.div>
    </section>
  );
};
