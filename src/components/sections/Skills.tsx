"use client";

import React from "react";
import { motion } from "framer-motion";
import { skillsData } from "@/data/skills";
import { TiltCard } from "@/components/ui/TiltCard";
import { Zap, Bot, Sparkles, Code2, Cloud } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

// Technical domain categories with icons & editorial taglines (grayscale differentiated)
const categoryMeta = [
  {
    icon: Bot,
    tagline: "Continuous Control & Sensor Fusion",
  },
  {
    icon: Sparkles,
    tagline: "Retrieval-Augmented Generation & Agentic AI",
  },
  {
    icon: Code2,
    tagline: "Deep Learning Foundations & System Core",
  },
  {
    icon: Cloud,
    tagline: "Cloud Architecture, Containerization & CI/CD",
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
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-mono tracking-widest text-[#C9C9C9] uppercase shadow-sm font-semibold"
          >
            <Zap className="h-3.5 w-3.5 text-[#C9C9C9]" />
            <span>Technical Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight text-[#F2F2ED] sm:text-4xl md:text-5xl"
          >
            Technologies,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2F2ED] via-[#D4D4D4] to-[#9A9A9A]">
              Toolchains & Libraries
            </span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-[#9A9A9A]">
            A specialized engineering and research stack spanning continuous actor-critic reinforcement learning in CARLA, multi-modal RAG systems with LangChain, and production cloud MLOps on AWS.
          </p>
        </div>

        {/* 4 Monochrome Grayscale Cards Grid */}
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
                  spotlightColor="rgba(255, 255, 255, 0.05)"
                  className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.08] bg-[#141414] p-7 sm:p-8 shadow-glass transition-all duration-300 hover:border-white/20"
                >
                  {/* Top Hairline Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  <div>
                    {/* Category Header */}
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold text-[#9A9A9A]">
                            <span>{meta.tagline}</span>
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#F2F2ED] group-hover:text-white transition-colors">
                          {category.category}
                        </h3>
                      </div>

                      <div className="rounded-2xl p-3 border border-white/10 bg-white/[0.04] text-[#F2F2ED] shrink-0 transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <p className="mb-6 text-xs sm:text-sm text-[#9A9A9A] leading-relaxed">
                      {category.description}
                    </p>

                    {/* Attractive Grayscale Skill Tiles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {category.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className={`group/skill relative flex items-center justify-between rounded-xl border p-3 sm:p-3.5 transition-all duration-300 ${
                            skill.highlight
                              ? "border-white/[0.12] bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]"
                              : "border-white/[0.06] bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.04]"
                          }`}
                        >
                          {/* Left: Indicator Dot + Skill Name */}
                          <div className="flex items-center gap-2.5 min-w-0 mr-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#C9C9C9] shrink-0 transition-transform duration-300 group-hover/skill:scale-125" />
                            <span className="text-xs sm:text-sm font-semibold text-[#F2F2ED] group-hover/skill:text-white transition-colors truncate">
                              {skill.name}
                            </span>
                          </div>

                          {/* Right: Level Pill Badge */}
                          <span className="shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold border border-white/10 bg-white/[0.04] text-[#9A9A9A]">
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sleek bottom status footer showing skill count */}
                  <div className="mt-8 flex items-center justify-between border-t border-white/[0.08] pt-4 text-[11px] font-mono text-[#9A9A9A]">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C9C9C9]" />
                      <span>{category.skills.length} Specializations</span>
                    </span>
                    <span className="text-[#9A9A9A] font-semibold tracking-wider uppercase">
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
