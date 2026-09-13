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
      {/* Background ambient glow in soft moss */}
      <div className="pointer-events-none absolute top-1/2 left-1/3 h-96 w-96 rounded-full bg-palette-moss/15 blur-[140px] -z-10" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-palette-sand/30 bg-palette-forest/30 px-4 py-1 text-xs font-mono tracking-widest text-palette-cream uppercase"
          >
            <Zap className="h-3.5 w-3.5 text-palette-sage" />
            <span>Technical Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold tracking-tight text-palette-cream sm:text-4xl md:text-5xl"
          >
            Technologies, <span className="text-transparent bg-clip-text bg-gradient-to-r from-palette-sage via-palette-sand to-palette-cream">Toolchains & Libraries</span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-palette-sand/90">
            A battle-tested stack spanning continuous reinforcement learning in CARLA, RAG architectures with LangChain, and production cloud MLOps on AWS.
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
                spotlightColor="rgba(163, 182, 138, 0.2)"
                className="h-full p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-palette-cream">
                      {category.category}
                    </h3>
                    <div className="rounded-lg bg-palette-forest/40 p-2 text-palette-sage border border-palette-sand/30">
                      <Cpu className="h-4 w-4" />
                    </div>
                  </div>

                  <p className="mb-6 text-xs text-palette-sand/80 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Glass Shelf Skill Badges */}
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className={`group relative flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all duration-300 ${
                          skill.highlight
                            ? "liquid-glass border-palette-sand/30 bg-palette-forest/40 text-palette-cream hover:border-palette-cream hover:shadow-glow-sage"
                            : "border border-palette-sand/20 bg-palette-forest/20 text-palette-sand hover:border-palette-sand/40 hover:text-palette-cream"
                        }`}
                      >
                        <span className="text-xs font-medium">
                          {skill.name}
                        </span>

                        <span
                          className={`rounded px-1.5 py-0.2 font-mono text-[9px] uppercase tracking-wider ${
                            skill.level === "Expert"
                              ? "bg-palette-moss/40 text-palette-cream border border-palette-sage/40"
                              : skill.level === "Advanced"
                              ? "bg-palette-forest/60 text-palette-sage border border-palette-sand/30"
                              : "bg-palette-forest/30 text-palette-sand"
                          }`}
                        >
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtle shelf bottom accent in sand */}
                <div className="mt-8 h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-palette-sand/30 to-transparent" />
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
