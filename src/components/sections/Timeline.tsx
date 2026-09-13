"use client";

import React from "react";
import { motion } from "framer-motion";
import { timelineData } from "@/data/timeline";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  Briefcase,
  Calendar,
  GraduationCap,
  Milestone,
  MapPin,
  FileCheck,
} from "lucide-react";

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="relative py-28 px-4 md:px-8">
      {/* Background ambient glow in electric cyan & emerald */}
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px] -z-10" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-[140px] -z-10" />

      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-mono tracking-widest text-cyan-400 uppercase shadow-sm"
          >
            <Milestone className="h-3.5 w-3.5 text-cyan-400" />
            <span>Academic & Professional Path</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">Milestones</span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-300">
            From industry QA automation and research internships to doctoral studies at IIT Roorkee.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Central Vertical Light Beam in Electric Cyan */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-500/0 via-cyan-500/40 to-cyan-500/0" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Center Glass Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/40 bg-slate-900 shadow-glow-cyan text-cyan-400">
                    {item.type === "education" ? (
                      <GraduationCap className="h-4 w-4 text-cyan-300" />
                    ) : item.type === "research" ? (
                      <Briefcase className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Briefcase className="h-4 w-4 text-sky-400" />
                    )}
                    {item.current && (
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                    )}
                  </div>

                  {/* Card Container */}
                  <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                    <TiltCard
                      maxTilt={4}
                      spotlightColor="rgba(0, 216, 255, 0.15)"
                      className="p-6 sm:p-7 border border-slate-800 bg-slate-900/85 shadow-glass hover:border-cyan-500/30 hover:shadow-glass-lg transition-all"
                    >
                      {/* Year badge & location */}
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/50 px-3 py-0.5 font-mono text-xs font-semibold text-cyan-300">
                          <Calendar className="h-3 w-3 text-cyan-400" />
                          {item.year}
                        </span>

                        {item.current ? (
                          <span className="rounded-full border border-emerald-500/40 bg-emerald-950/50 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400 font-semibold">
                            Current Role
                          </span>
                        ) : item.location ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
                            <MapPin className="h-3 w-3 text-cyan-400" />
                            {item.location}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="text-lg font-bold text-white mt-2">
                        {item.role}
                      </h3>
                      <p className="font-semibold text-xs text-emerald-400 font-mono">
                        {item.organization}
                      </p>

                      <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Certificate link */}
                      {item.certificateUrl && (
                        <div className="mt-3">
                          <a
                            href={item.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-500/40 underline-offset-4"
                          >
                            <FileCheck className="h-3.5 w-3.5 text-cyan-400" />
                            <span>View Verified Certificate ↗</span>
                          </a>
                        </div>
                      )}

                      {/* Technologies */}
                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-800 pt-3">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-slate-800 bg-slate-950/60 px-2 py-0.5 text-[10px] font-mono text-slate-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </TiltCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
