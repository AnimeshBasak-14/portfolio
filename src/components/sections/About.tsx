"use client";

import React from "react";
import { motion } from "framer-motion";
import { personalData } from "@/data/personal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Code2, Compass, Cpu, Layers, Sparkles, Terminal } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

export const About: React.FC = () => {
  const highlightPillars = [
    {
      icon: <Terminal className="h-5 w-5 text-cyan-400" />,
      title: "Full-Stack Architecture",
      desc: "Robust Next.js App Router applications, REST & GraphQL endpoints, and resilient database schemas.",
    },
    {
      icon: <Sparkles className="h-5 w-5 text-purple-400" />,
      title: "Liquid Glass Aesthetics",
      desc: "Spatial UI inspired by Apple Vision Pro, featuring dynamic SVG refraction and sub-pixel spring physics.",
    },
    {
      icon: <Cpu className="h-5 w-5 text-blue-400" />,
      title: "Real-Time Systems",
      desc: "WebSocket streaming, edge rate limiting, and low-latency distributed event pipelines.",
    },
    {
      icon: <Layers className="h-5 w-5 text-emerald-400" />,
      title: "Performance & DX",
      desc: "Sub-second Web Vitals, modular monorepos, and type-driven architecture with TypeScript & Zod.",
    },
  ];

  const floatingSkillTags = [
    "Next.js 14", "TypeScript", "Three.js", "Tailwind CSS",
    "Framer Motion", "GSAP", "Resend API", "Node.js",
    "PostgreSQL", "Docker", "Redis", "Apple Spatial Glass"
  ];

  return (
    <section id="about" className="relative py-28 px-4 md:px-8">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-1/3 right-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-mono tracking-widest text-cyan-300 uppercase"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Identity & Philosophy</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">living software</span> with tactile precision.
          </motion.h2>
        </div>

        {/* Glass Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: Portrait & Floating Badges */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <TiltCard
              maxTilt={8}
              spotlightColor="rgba(56, 189, 248, 0.18)"
              className="p-8 h-full flex flex-col items-center text-center justify-center relative overflow-hidden"
            >
              {/* Photo Avatar Placeholder with Specular Ring */}
              <div className="relative mb-6">
                <div className="h-44 w-44 rounded-3xl p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 shadow-2xl">
                  <div className="h-full w-full rounded-[22px] bg-[#0A0D14] flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Abstract artistic portrait graphic */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 mix-blend-overlay" />
                    <Code2 className="h-16 w-16 text-cyan-300/80 mb-2 animate-pulse" />
                    <span className="font-mono text-xs font-semibold text-slate-300">
                      Animesh Basak
                    </span>
                  </div>
                </div>
                {/* Floating mini glass status pill */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap liquid-glass px-3.5 py-1 rounded-full text-[11px] font-mono text-cyan-300 border border-white/20">
                  Engineer & Builder
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mt-4">{personalData.name}</h3>
              <p className="text-xs text-slate-400 font-mono mt-1">{personalData.location}</p>

              {/* Floating Skill Badges */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {floatingSkillTags.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * idx, duration: 0.4 }}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Bio Narrative & Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <TiltCard
              maxTilt={6}
              spotlightColor="rgba(168, 85, 247, 0.15)"
              className="p-8 sm:p-10 flex-1 flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Architecture, Physics & Visual Fluidity
              </h3>
              
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {personalData.bio.map((paragraph, index) => (
                  <p key={index} className="text-slate-300/90">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Four Pillars */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlightPillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div className="rounded-lg bg-white/5 p-2">
                        {pillar.icon}
                      </div>
                      <h4 className="text-sm font-semibold text-white">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
