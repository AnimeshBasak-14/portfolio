"use client";

import React from "react";
import { motion } from "framer-motion";
import { skillsData } from "@/data/skills";
import { TiltCard } from "@/components/ui/TiltCard";
import { Cpu, Layers, Sparkles, Check, Zap } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-28 px-4 md:px-8">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px] -z-10" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-mono tracking-widest text-blue-300 uppercase"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Capability Index</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Technologies & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Toolchains</span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-slate-400">
            A battle-tested stack spanning hardware-accelerated frontend experiences to distributed backend microservices.
          </p>
        </div>

        {/* Categories Grid on Glass Shelves */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {skillsData.map((category, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <TiltCard
                maxTilt={6}
                spotlightColor="rgba(59, 130, 246, 0.15)"
                className="h-full p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">
                      {category.category}
                    </h3>
                    <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400 border border-blue-500/20">
                      <Cpu className="h-4 w-4" />
                    </div>
                  </div>

                  <p className="mb-6 text-xs text-slate-400 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Glass Shelf Skill Badges */}
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className={`group relative flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all duration-300 ${
                          skill.highlight
                            ? "liquid-glass border-white/20 bg-white/[0.08] text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                            : "border border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <span className="text-xs font-medium">
                          {skill.name}
                        </span>

                        <span
                          className={`rounded px-1.5 py-0.2 font-mono text-[9px] uppercase tracking-wider ${
                            skill.level === "Expert"
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                              : skill.level === "Advanced"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                              : "bg-white/10 text-slate-400"
                          }`}
                        >
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtle shelf bottom accent */}
                <div className="mt-8 h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
