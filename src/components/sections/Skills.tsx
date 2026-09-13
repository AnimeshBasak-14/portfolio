"use client";

import React from "react";
import { motion } from "framer-motion";
import { skillsData } from "@/data/skills";
import { TiltCard } from "@/components/ui/TiltCard";
import { Zap, Bot, Sparkles, Code2, Cloud } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

// Color Themes & Visual Identity for each Technical Domain
const categoryThemes = [
  {
    // Category 0: Reinforcement Learning & Autonomous Vehicles
    icon: Bot,
    tagline: "Continuous Control & Sensor Fusion",
    cardBorder: "border-cyan-500/35 hover:border-cyan-400/70",
    cardBg: "bg-gradient-to-br from-slate-900/95 via-cyan-950/20 to-slate-950/95",
    glowShadow: "hover:shadow-[0_0_35px_rgba(0,216,255,0.2)]",
    topGradient: "from-cyan-500 via-sky-400 to-cyan-300",
    spotlightColor: "rgba(0, 216, 255, 0.22)",
    iconBox: "border-cyan-500/40 bg-cyan-950/80 text-cyan-300 shadow-[0_0_15px_rgba(0,216,255,0.3)]",
    badgeClass: "border-cyan-500/40 bg-cyan-950/60 text-cyan-300",
    tileHighlight:
      "border-cyan-500/40 bg-slate-950/70 hover:border-cyan-400 hover:bg-cyan-950/30 hover:shadow-[0_0_15px_rgba(0,216,255,0.15)]",
    tileDefault:
      "border-slate-800/80 bg-slate-950/40 hover:border-cyan-500/30 hover:bg-cyan-950/15",
    dotClass: "bg-cyan-400 shadow-[0_0_8px_rgba(0,216,255,0.9)] ring-cyan-500/30",
  },
  {
    // Category 1: LLMs, NLP & Generative AI
    icon: Sparkles,
    tagline: "Retrieval-Augmented Generation & Agentic AI",
    cardBorder: "border-purple-500/35 hover:border-purple-400/70",
    cardBg: "bg-gradient-to-br from-slate-900/95 via-purple-950/25 to-slate-950/95",
    glowShadow: "hover:shadow-[0_0_35px_rgba(168,85,247,0.2)]",
    topGradient: "from-purple-500 via-fuchsia-400 to-violet-400",
    spotlightColor: "rgba(168, 85, 247, 0.22)",
    iconBox: "border-purple-500/40 bg-purple-950/80 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    badgeClass: "border-purple-500/40 bg-purple-950/60 text-purple-300",
    tileHighlight:
      "border-purple-500/40 bg-slate-950/70 hover:border-purple-400 hover:bg-purple-950/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]",
    tileDefault:
      "border-slate-800/80 bg-slate-950/40 hover:border-purple-500/30 hover:bg-purple-950/15",
    dotClass: "bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.9)] ring-purple-500/30",
  },
  {
    // Category 2: Core Technologies & Frameworks
    icon: Code2,
    tagline: "Deep Learning Foundations & System Core",
    cardBorder: "border-amber-500/35 hover:border-amber-400/70",
    cardBg: "bg-gradient-to-br from-slate-900/95 via-amber-950/20 to-slate-950/95",
    glowShadow: "hover:shadow-[0_0_35px_rgba(245,158,11,0.2)]",
    topGradient: "from-amber-500 via-yellow-400 to-orange-400",
    spotlightColor: "rgba(245, 158, 11, 0.22)",
    iconBox: "border-amber-500/40 bg-amber-950/80 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    badgeClass: "border-amber-500/40 bg-amber-950/60 text-amber-300",
    tileHighlight:
      "border-amber-500/40 bg-slate-950/70 hover:border-amber-400 hover:bg-amber-950/30 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]",
    tileDefault:
      "border-slate-800/80 bg-slate-950/40 hover:border-amber-500/30 hover:bg-amber-950/15",
    dotClass: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)] ring-amber-500/30",
  },
  {
    // Category 3: MLOps, Cloud & QA Deployment
    icon: Cloud,
    tagline: "Cloud Architecture, Containerization & CI/CD",
    cardBorder: "border-emerald-500/35 hover:border-emerald-400/70",
    cardBg: "bg-gradient-to-br from-slate-900/95 via-emerald-950/20 to-slate-950/95",
    glowShadow: "hover:shadow-[0_0_35px_rgba(16,185,129,0.2)]",
    topGradient: "from-emerald-500 via-teal-400 to-emerald-300",
    spotlightColor: "rgba(16, 185, 129, 0.22)",
    iconBox: "border-emerald-500/40 bg-emerald-950/80 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    badgeClass: "border-emerald-500/40 bg-emerald-950/60 text-emerald-300",
    tileHighlight:
      "border-emerald-500/40 bg-slate-950/70 hover:border-emerald-400 hover:bg-emerald-950/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    tileDefault:
      "border-slate-800/80 bg-slate-950/40 hover:border-emerald-500/30 hover:bg-emerald-950/15",
    dotClass: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)] ring-emerald-500/30",
  },
];

const getLevelBadge = (level: string) => {
  switch (level.toLowerCase()) {
    case "expert":
      return "bg-cyan-950/80 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(0,216,255,0.2)] font-bold";
    case "advanced":
      return "bg-indigo-950/80 text-indigo-300 border-indigo-500/40 font-semibold";
    case "research":
      return "bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)] font-semibold";
    case "proficient":
      return "bg-slate-800/80 text-slate-300 border-slate-700/60 font-medium";
    default:
      return "bg-slate-800 text-slate-300 border-slate-700 font-medium";
  }
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-28 px-4 md:px-8 overflow-hidden">
      {/* Dynamic 4-Quadrant Ambient Lighting */}
      <div className="pointer-events-none absolute top-10 left-10 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[160px] -z-10" />
      <div className="pointer-events-none absolute top-10 right-10 h-[450px] w-[450px] rounded-full bg-purple-500/10 blur-[160px] -z-10" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-[450px] w-[450px] rounded-full bg-amber-500/8 blur-[160px] -z-10" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[160px] -z-10" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-mono tracking-widest text-cyan-400 uppercase shadow-sm"
          >
            <Zap className="h-3.5 w-3.5 text-cyan-400" />
            <span>Technical Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Technologies,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
              Toolchains & Libraries
            </span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-300">
            A specialized engineering and research stack spanning continuous actor-critic reinforcement learning in CARLA, multi-modal RAG systems with LangChain, and production cloud MLOps on AWS.
          </p>
        </div>

        {/* 4 Thematic Color Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {skillsData.map((category, idx) => {
            const theme = categoryThemes[idx % categoryThemes.length];
            const Icon = theme.icon;

            return (
              <motion.div key={idx} variants={itemVariants}>
                <TiltCard
                  maxTilt={3}
                  spotlightColor={theme.spotlightColor}
                  className={`group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border ${theme.cardBorder} ${theme.cardBg} ${theme.glowShadow} p-7 sm:p-8 shadow-glass transition-all duration-300`}
                >
                  {/* Top Colorful Accent Line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.topGradient}`}
                  />

                  <div>
                    {/* Category Header */}
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold ${theme.badgeClass}`}
                          >
                            <span>{theme.tagline}</span>
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors">
                          {category.category}
                        </h3>
                      </div>

                      <div
                        className={`rounded-2xl p-3 border shrink-0 transition-transform duration-300 group-hover:scale-110 ${theme.iconBox}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <p className="mb-6 text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Attractive Colorful Skill Tiles (No filler bar, No %) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {category.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className={`group/skill relative flex items-center justify-between rounded-xl border p-3 sm:p-3.5 transition-all duration-300 ${
                            skill.highlight
                              ? theme.tileHighlight
                              : theme.tileDefault
                          }`}
                        >
                          {/* Left: Glowing Accent Dot + Skill Name */}
                          <div className="flex items-center gap-2.5 min-w-0 mr-2">
                            <span
                              className={`h-2 w-2 rounded-full shrink-0 ring-2 transition-transform duration-300 group-hover/skill:scale-125 ${theme.dotClass}`}
                            />
                            <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover/skill:text-white transition-colors truncate">
                              {skill.name}
                            </span>
                          </div>

                          {/* Right: Colored Level Pill Badge */}
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider border ${getLevelBadge(
                              skill.level
                            )}`}
                          >
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sleek bottom status footer showing skill count */}
                  <div className="mt-8 flex items-center justify-between border-t border-slate-800/80 pt-4 text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${theme.dotClass}`} />
                      <span>{category.skills.length} Specializations</span>
                    </span>
                    <span className="text-slate-400 font-semibold tracking-wider uppercase">
                      Production & Research Ready
                    </span>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
