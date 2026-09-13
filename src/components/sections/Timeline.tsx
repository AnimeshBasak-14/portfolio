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
      {/* Background ambient glow in subtle monochrome */}
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-white/[0.02] blur-[150px] -z-10" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full bg-white/[0.02] blur-[140px] -z-10" />

      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-mono tracking-widest text-[#9A9A9A] uppercase shadow-sm"
          >
            <Milestone className="h-3.5 w-3.5 text-[#F2F2ED]" />
            <span>Academic & Professional Path</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight text-[#F2F2ED] sm:text-4xl md:text-5xl"
          >
            Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2F2ED] via-[#C9C9C9] to-[#9A9A9A]">Milestones</span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[#9A9A9A]">
            From industry QA automation and research internships to doctoral studies at IIT Roorkee.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Central Vertical Light Beam in Monochrome Silver */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-white/0 via-white/20 to-white/0" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Center Glass Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#141414] shadow-sm text-[#F2F2ED]">
                    {item.type === "education" ? (
                      <GraduationCap className="h-4 w-4 text-[#F2F2ED]" />
                    ) : item.type === "research" ? (
                      <Briefcase className="h-4 w-4 text-[#F2F2ED]" />
                    ) : (
                      <Briefcase className="h-4 w-4 text-[#F2F2ED]" />
                    )}
                    {item.current && (
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2F2ED] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F2F2ED]" />
                      </span>
                    )}
                  </div>

                  {/* Card Container */}
                  <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                    <TiltCard
                      maxTilt={4}
                      spotlightColor="rgba(255, 255, 255, 0.05)"
                      className="p-6 sm:p-7 border border-white/[0.08] bg-[#141414] shadow-glass hover:border-white/20 hover:shadow-glass-lg transition-all"
                    >
                      {/* Year badge & location */}
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-0.5 font-mono text-xs font-semibold text-[#F2F2ED]">
                          <Calendar className="h-3 w-3 text-[#9A9A9A]" />
                          {item.year}
                        </span>

                        {item.current ? (
                          <span className="rounded-full border border-white/20 bg-white/[0.08] px-2.5 py-0.5 font-mono text-[10px] text-[#F2F2ED] font-semibold">
                            Current Role
                          </span>
                        ) : item.location ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#9A9A9A]">
                            <MapPin className="h-3 w-3 text-[#9A9A9A]" />
                            {item.location}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="text-lg font-bold text-[#F2F2ED] mt-2">
                        {item.role}
                      </h3>
                      <p className="font-semibold text-xs text-[#9A9A9A] font-mono">
                        {item.organization}
                      </p>

                      <p className="mt-3 text-sm text-[#9A9A9A] leading-relaxed">
                        {item.description}
                      </p>

                      {/* Certificate link */}
                      {item.certificateUrl && (
                        <div className="mt-3">
                          <a
                            href={item.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F2F2ED] hover:text-[#C9C9C9] transition-colors underline decoration-white/20 underline-offset-4"
                          >
                            <FileCheck className="h-3.5 w-3.5 text-[#F2F2ED]" />
                            <span>View Verified Certificate ↗</span>
                          </a>
                        </div>
                      )}

                      {/* Technologies */}
                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/[0.08] pt-3">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-white/[0.06] bg-[#0A0A0A]/60 px-2 py-0.5 text-[10px] font-mono text-[#9A9A9A]"
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
