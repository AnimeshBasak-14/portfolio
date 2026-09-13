"use client";

import React from "react";
import { motion } from "framer-motion";
import { skillsData } from "@/data/skills";
import { TiltCard } from "@/components/ui/TiltCard";
import { Zap, Bot, Sparkles, Code2, Cloud } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

// Technical domain categories with icons & cyber-physical accent metadata
const categoryMeta = [
  {
    icon: Bot,
    tagline: "Continuous Control & Sensor Fusion",
    badge: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    iconBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    topLine: "from-transparent via-emerald-500/50 to-transparent",
    hoverBorder: "hover:border-emerald-500/40",
    dot: "bg-emerald-400",
    expertBadge: "bg-emerald-400 text-black shadow-[0_0_10px_rgba(52,211,153,0.3)] font-black",
  },
  {
    icon: Sparkles,
    tagline: "Retrieval-Augmented Generation & Agentic AI",
    badge: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    iconBg: "bg-purple-500/15 border-purple-500/30 text-purple-400",
    topLine: "from-transparent via-purple-500/50 to-transparent",
    hoverBorder: "hover:border-purple-500/40",
    dot: "bg-purple-400",
    expertBadge: "bg-purple-400 text-black shadow-[0_0_10px_rgba(192,132,252,0.3)] font-black",
  },
  {
    icon: Code2,
    tagline: "Deep Learning Foundations & System Core",
    badge: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    iconBg: "bg-cyan-500/15 border-cyan-500/30 text-cyan-400",
    topLine: "from-transparent via-cyan-500/50 to-transparent",
    hoverBorder: "hover:border-cyan-500/40",
    dot: "bg-cyan-400",
    expertBadge: "bg-cyan-400 text-black shadow-[0_0_10px_rgba(34,211,238,0.3)] font-black",
  },
  {
    icon: Cloud,
    tagline: "Cloud Architecture, Containerization & CI/CD",
    badge: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    iconBg: "bg-amber-500/15 border-amber-500/30 text-amber-400",
    topLine: "from-transparent via-amber-500/50 to-transparent",
    hoverBorder: "hover:border-amber-500/40",
    dot: "bg-amber-400",
    expertBadge: "bg-amber-400 text-black shadow-[0_0_10px_rgba(251,191,36,0.3)] font-black",
  },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-28 px-4 md:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-xs font-mono tracking-widest text-white uppercase shadow-sm font-bold"
          >
            <Zap className="h-3.5 w-3.5 text-white" />
            <span>Technical Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Technologies,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
              Toolchains & Libraries
            </span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-neutral-300">
            A specialized engineering and research stack spanning continuous actor-critic reinforcement learning in CARLA, multi-modal RAG systems with LangChain, and production cloud MLOps on AWS.
          </p>
        </div>

        {/* 4 Cyber-Physical Domain Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {skillsData.map((category, idx) => {
            const meta = categoryMeta[idx % categoryMeta.length];
            const Icon = meta.icon;

            return (
              <motion.div key={idx} variants={itemVariants}>
                <TiltCard
                  maxTilt={3}
                  spotlightColor="rgba(255, 255, 255, 0.08)"
                  className={`group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B0B] p-7 sm:p-8 shadow-2xl transition-all duration-300 ${meta.hoverBorder}`}
                >
                  {/* Top Hairline Accent Line */}
                  <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${meta.topLine}`} />

                  <div>
                    {/* Category Header */}
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold ${meta.badge}`}>
                            <span>{meta.tagline}</span>
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-neutral-100 transition-colors">
                          {category.category}
                        </h3>
                      </div>

                      <div className={`rounded-2xl p-3 border shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105 ${meta.iconBg}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <p className="mb-6 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Attractive High-Contrast Skill Tiles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {category.skills.map((skill, sIdx) => {
                        const isExpert = skill.level.toLowerCase().includes("expert");
                        const isAdvanced = skill.level.toLowerCase().includes("advanced");

                        return (
                          <div
                            key={sIdx}
                            className="group/skill relative flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.03] p-3 sm:p-3.5 transition-all duration-200 hover:border-white/50 hover:bg-white/[0.07]"
                          >
                            {/* Left: Indicator Dot + Skill Name */}
                            <div className="flex items-center gap-2.5 min-w-0 mr-2">
                              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot} shrink-0 shadow-sm transition-transform duration-300 group-hover/skill:scale-125`} />
                              <span className="text-xs sm:text-sm font-bold text-white transition-colors truncate">
                                {skill.name}
                              </span>
                            </div>

                            {/* Right: Classy Level Badge */}
                            <span
                              className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider transition-all ${
                                isExpert
                                  ? meta.expertBadge
                                  : isAdvanced
                                  ? "border border-white/40 bg-white/10 text-white font-bold"
                                  : "border border-white/20 bg-white/[0.04] text-neutral-300 font-semibold"
                              }`}
                            >
                              {skill.level}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sleek bottom status footer showing skill count */}
                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 text-[11px] font-mono text-neutral-300">
                    <span className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                      <span>{category.skills.length} Specializations</span>
                    </span>
                    <span className="font-semibold text-neutral-400">IIT Roorkee Research</span>
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
