"use client";

import React from "react";
import { motion } from "framer-motion";
import { skillsData } from "@/data/skills";
import { TiltCard } from "@/components/ui/TiltCard";
import { Cpu, Zap } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

export const Skills: React.FC = () => {
  const getLevelPercentage = (level: string) => {
    switch (level.toLowerCase()) {
      case "expert":
        return 95;
      case "advanced":
        return 85;
      case "research":
        return 90;
      case "proficient":
        return 75;
      default:
        return 80;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "expert":
        return "from-cyan-500 to-cyan-400";
      case "advanced":
        return "from-sky-500 to-cyan-400";
      case "research":
        return "from-emerald-500 to-cyan-400";
      case "proficient":
        return "from-slate-500 to-sky-400";
      default:
        return "from-cyan-500 to-emerald-400";
    }
  };

  return (
    <section id="skills" className="relative py-28 px-4 md:px-8">
      {/* Background ambient glow in electric cyan & emerald */}
      <div className="pointer-events-none absolute top-1/2 left-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px] -z-10" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-[140px] -z-10" />

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
            Technologies, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">Toolchains & Libraries</span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-slate-300">
            A battle-tested stack spanning continuous reinforcement learning in CARLA, RAG architectures with LangChain, and production cloud MLOps on AWS.
          </p>
        </div>

        {/* Categories Grid on Glass Shelves */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {skillsData.map((category, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <TiltCard
                maxTilt={4}
                spotlightColor="rgba(0, 216, 255, 0.15)"
                className="h-full p-8 flex flex-col justify-between border border-slate-800 bg-slate-900/85 shadow-glass hover:border-cyan-500/30 hover:shadow-glass-lg transition-all"
              >
                <div>
                  {/* Category Header */}
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">
                      {category.category}
                    </h3>
                    <div className="rounded-xl bg-slate-800 p-2.5 text-cyan-400 border border-slate-700/60 shadow-sm">
                      <Cpu className="h-4 w-4" />
                    </div>
                  </div>

                  <p className="mb-6 text-xs text-slate-400 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Visual Progress Meters to Break Up Text Density */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.skills.map((skill, sIdx) => {
                      const percentage = getLevelPercentage(skill.level);
                      const colorGradient = getLevelColor(skill.level);

                      return (
                        <div
                          key={sIdx}
                          className={`group flex flex-col justify-between rounded-xl border p-3 transition-all duration-300 ${
                            skill.highlight
                              ? "border-cyan-500/30 bg-slate-950/70 hover:border-cyan-500/50 hover:bg-slate-900"
                              : "border-slate-800/80 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/60"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors truncate mr-2">
                              {skill.name}
                            </span>
                            <span
                              className={`rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider shrink-0 ${
                                skill.level === "Expert"
                                  ? "bg-cyan-950 text-cyan-400 border border-cyan-500/40 font-bold"
                                  : skill.level === "Advanced"
                                  ? "bg-sky-950 text-sky-400 border border-sky-500/40 font-semibold"
                                  : skill.level === "Research"
                                  ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-semibold"
                                  : "bg-slate-800 text-slate-300 font-medium"
                              }`}
                            >
                              {skill.level}
                            </span>
                          </div>

                          {/* Minimalist Progress Meter Bar */}
                          <div className="space-y-1 mt-1">
                            <div className="h-1.5 w-full rounded-full bg-slate-800/80 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${percentage}%` }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.8,
                                  delay: 0.04 * sIdx,
                                  ease: "easeOut",
                                }}
                                className={`h-full rounded-full bg-gradient-to-r ${colorGradient}`}
                              />
                            </div>
                            <div className="flex justify-between text-[9px] font-mono text-slate-500">
                              <span>Proficiency</span>
                              <span className="text-slate-400">{percentage}%</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Subtle shelf bottom accent */}
                <div className="mt-8 h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
