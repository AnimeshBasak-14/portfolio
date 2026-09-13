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
} from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

// Custom Hugging Face Icon
const HuggingFaceIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3.5 7.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S7 11.83 7 11s.67-1.5 1.5-1.5zm7 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-3.5 8c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
  </svg>
);

// Dynamically import 3D Canvas with ssr: false
const HeroGlassCanvas = dynamic(
  () => import("@/components/canvas/HeroGlassObject"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-48 w-48 animate-pulse rounded-full bg-white/[0.05] blur-2xl" />
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
      {/* Ambient Moving Sheen against Black Canvas with Subtle Atmospheric Hues */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[550px] w-[550px] rounded-full bg-cyan-500/[0.04] blur-[170px] animate-blob-float-1" />
        <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/[0.03] blur-[170px] animate-blob-float-2" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row lg:items-center">
        {/* Left Column: Typography & Action Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left z-10"
        >
          {/* Institutional Status Capsule with Live Emerald Beacon */}
          <motion.div
            variants={itemVariants}
            className="liquid-glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-sm border border-white/20 bg-white/[0.06]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <GraduationCap className="h-3.5 w-3.5 text-cyan-300" />
            <span>Direct Ph.D. @ IIT Roorkee (Dept. of CSE) · Supervisor: Dr. Neetesh Kumar</span>
          </motion.div>

          {/* Staggered Name Reveal */}
          <h1 className="mb-3 text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="inline-flex overflow-hidden">
              {nameLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.05 + index * 0.025,
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
            className="mb-2 max-w-2xl text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-cyan-200"
          >
            {personalData.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mb-4 font-mono text-xs text-neutral-300 font-semibold"
          >
            {personalData.department} · {personalData.institution}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-xl text-base text-neutral-200 sm:text-lg leading-relaxed"
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
                className="group flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-neutral-200 hover:scale-[1.02]"
              >
                <FolderGit2 className="h-4 w-4 text-black transition-transform group-hover:scale-110" />
                <span>Featured Projects</span>
              </a>
            </Magnetic>

            {/* CTA 2: CARLA RL Videos */}
            <Magnetic strength={0.3}>
              <a
                href={personalData.youtubePlaylistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass specular-top group flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
              >
                <Youtube className="h-4 w-4 text-rose-500 group-hover:text-rose-600 transition-transform group-hover:scale-110" />
                <span>48 CARLA Simulations</span>
              </a>
            </Magnetic>

            {/* CTA 3: Get in Touch */}
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className="liquid-glass specular-top group flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
              >
                <Mail className="h-4 w-4 text-cyan-400 group-hover:text-black transition-transform group-hover:scale-110" />
                <span>Contact</span>
              </a>
            </Magnetic>

            {/* Canonical Hugging Face, GitHub & LinkedIn */}
            <div className="flex items-center gap-2 pl-1">
              <Magnetic strength={0.35}>
                <a
                  href={personalData.huggingface}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Animesh Basak Hugging Face"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-neutral-300 transition-all duration-300 hover:border-amber-400/50 hover:text-amber-300 hover:bg-amber-400/10 hover:scale-105 shadow-sm"
                  title="Hugging Face Profile"
                >
                  <HuggingFaceIcon className="h-4 w-4" />
                </a>
              </Magnetic>

              <Magnetic strength={0.35}>
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Animesh Basak GitHub"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-neutral-300 transition-all duration-300 hover:border-white hover:text-white hover:bg-white/10 hover:scale-105 shadow-sm"
                  title="GitHub Profile"
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
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-neutral-300 transition-all duration-300 hover:border-sky-400/50 hover:text-sky-400 hover:bg-sky-400/10 hover:scale-105 shadow-sm"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Autonomous Vehicle Simulator Canvas */}
        <div className="relative flex h-[420px] w-full flex-1 items-center justify-center sm:h-[500px] lg:h-[580px]">
          <div className="absolute h-80 w-80 rounded-full bg-white/[0.02] blur-3xl" />
          <HeroGlassCanvas />
        </div>
      </div>

      {/* Scroll prompt */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-white" />
        </motion.div>
      </motion.div>
    </section>
  );
};
