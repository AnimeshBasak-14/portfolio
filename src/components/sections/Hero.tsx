"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { personalData } from "@/data/personal";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowDown, Github, Linkedin, Mail, Sparkles, FolderGit2 } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

// Dynamically import 3D Canvas with ssr: false to prevent SSR hydration mismatches
const HeroGlassCanvas = dynamic(
  () => import("@/components/canvas/HeroGlassObject"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-48 w-48 animate-pulse rounded-full bg-cyan-500/10 blur-2xl" />
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
      {/* Dynamic Ambient Background Blobs that never stop moving */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-cyan-600/15 to-blue-700/10 blur-[130px] animate-blob-float-1" />
        <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-purple-600/15 via-indigo-600/10 to-pink-600/10 blur-[140px] animate-blob-float-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[120px] animate-blob-pulse" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row lg:items-center">
        {/* Left Column: Staggered Typography & CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left z-10"
        >
          {/* Status Capsule Badge */}
          <motion.div
            variants={itemVariants}
            className="liquid-glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-cyan-300 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
            </span>
            <span>{personalData.status}</span>
          </motion.div>

          {/* Staggered Name Reveal */}
          <h1 className="mb-4 text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
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

          {/* Subtitle / Role with Gradient */}
          <motion.h2
            variants={itemVariants}
            className="mb-6 max-w-2xl text-xl font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-cyan-200 to-purple-200 sm:text-2xl md:text-3xl"
          >
            {personalData.title}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="mb-10 max-w-xl text-base text-slate-400 sm:text-lg leading-relaxed"
          >
            {personalData.tagline}
          </motion.p>

          {/* Glass CTA Buttons & Canonical Socials */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            {/* CTA 1: View Projects */}
            <Magnetic strength={0.3}>
              <a
                href="#projects"
                className="liquid-glass specular-top group flex items-center gap-2 rounded-full border-cyan-500/30 bg-cyan-500/10 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(56,189,248,0.25)] transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_35px_rgba(56,189,248,0.4)]"
              >
                <FolderGit2 className="h-4 w-4 text-cyan-400 transition-transform group-hover:scale-110" />
                <span>View Projects</span>
              </a>
            </Magnetic>

            {/* CTA 2: Get in Touch */}
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className="liquid-glass specular-top group flex items-center gap-2 rounded-full border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <Mail className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5" />
                <span>Get in Touch</span>
              </a>
            </Magnetic>

            {/* Canonical GitHub & LinkedIn Icon Pair */}
            <div className="flex items-center gap-2 pl-2">
              <Magnetic strength={0.35}>
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Animesh Basak GitHub"
                  className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-all duration-300 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Magnetic>

              <Magnetic strength={0.35}>
                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Animesh Basak LinkedIn"
                  className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-all duration-300 hover:border-purple-400 hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D React Three Fiber Floating Glass Crystal */}
        <div className="relative flex h-[380px] w-full flex-1 items-center justify-center sm:h-[460px] lg:h-[540px]">
          {/* Ambient background light beneath 3D canvas */}
          <div className="absolute h-72 w-72 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-transparent blur-3xl" />
          <HeroGlassCanvas />
        </div>
      </div>

      {/* Scroll indicator prompt */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-cyan-400/80" />
        </motion.div>
      </motion.div>
    </section>
  );
};
