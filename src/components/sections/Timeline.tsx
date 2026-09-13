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
  ExternalLink,
  MapPin,
  FileCheck,
} from "lucide-react";

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="relative py-28 px-4 md:px-8">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-[130px] -z-10" />

      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-mono tracking-widest text-cyan-300 uppercase"
          >
            <Milestone className="h-3.5 w-3.5" />
            <span>Verified Track Record</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Experience, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Research & Education</span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400">
            From industry QA automation and research internships to doctoral research at IIT Roorkee.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Central Vertical Glowing Light Beam */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-500/0 via-cyan-400/50 to-purple-500/0" />

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
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-[#0A0D14] shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                    {item.type === "education" ? (
                      <GraduationCap className="h-4 w-4 text-purple-400" />
                    ) : item.type === "research" ? (
                      <Briefcase className="h-4 w-4 text-cyan-400" />
                    ) : (
                      <Briefcase className="h-4 w-4 text-emerald-400" />
                    )}
                    {item.current && (
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
                      </span>
                    )}
                  </div>

                  {/* Card Container */}
                  <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                    <TiltCard
                      maxTilt={6}
                      spotlightColor="rgba(56, 189, 248, 0.15)"
                      className="p-6 sm:p-7"
                    >
                      {/* Year badge & location */}
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-0.5 font-mono text-xs font-semibold text-cyan-300">
                          <Calendar className="h-3 w-3" />
                          {item.year}
                        </span>

                        {item.current ? (
                          <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 font-mono text-[10px] text-cyan-300 border border-cyan-500/30">
                            Current Role
                          </span>
                        ) : item.location ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
                            <MapPin className="h-3 w-3 text-slate-500" />
                            {item.location}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="text-lg font-bold text-white mt-2">
                        {item.role}
                      </h3>
                      <p className="font-semibold text-xs text-cyan-300">
                        {item.organization}
                      </p>

                      <p className="mt-3 text-sm text-slate-300/90 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Certificate link if available */}
                      {item.certificateUrl && (
                        <div className="mt-3">
                          <a
                            href={item.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                          >
                            <FileCheck className="h-3.5 w-3.5" />
                            <span>View Verified Certificate ↗</span>
                          </a>
                        </div>
                      )}

                      {/* Technologies */}
                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-slate-400"
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
