"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, Project } from "@/data/projects";
import { TiltCard } from "@/components/ui/TiltCard";
import { Magnetic } from "@/components/ui/Magnetic";
import { ExternalLink, Github, Sparkles, X, ChevronRight, CheckCircle2 } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterOptions = ["all", "Next.js", "Three.js", "TypeScript", "Tailwind CSS"];

  const filteredProjects = activeFilter === "all"
    ? projectsData
    : projectsData.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="projects" className="relative py-28 px-4 md:px-8">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute bottom-10 left-10 h-96 w-96 rounded-full bg-purple-600/10 blur-[130px] -z-10" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-xs font-mono tracking-widest text-purple-300 uppercase"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Selected Works</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Creations</span>
            </motion.h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all ${
                  activeFilter === filter
                    ? "liquid-glass border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                    : "border border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {filter === "all" ? "All Systems" : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <TiltCard
                maxTilt={12}
                spotlightColor="rgba(56, 189, 248, 0.2)"
                className="group flex h-full flex-col justify-between p-6 sm:p-7"
              >
                <div>
                  {/* Top Header & Visual Specular Banner */}
                  <div
                    className={`relative mb-6 h-40 w-full overflow-hidden rounded-xl bg-gradient-to-br ${project.accentColor} border border-white/10 flex flex-col justify-between p-4`}
                  >
                    {/* Abstract Glass Geometric Shape */}
                    <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-transform duration-500 group-hover:scale-125" />
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      {project.featured && (
                        <span className="rounded-full border border-cyan-400/40 bg-cyan-500/20 px-2.5 py-0.5 text-[10px] font-mono font-medium text-cyan-300">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="relative z-10">
                      <span className="font-mono text-xs font-medium text-slate-300 uppercase tracking-wider">
                        {project.subtitle}
                      </span>
                      <h3 className="mt-1 text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    {/* Metrics preview if available */}
                    {project.metrics && (
                      <div className="relative z-10 flex gap-4 border-t border-white/10 pt-2 text-[11px] font-mono text-slate-300">
                        {project.metrics.slice(0, 2).map((m, i) => (
                          <div key={i}>
                            <span className="text-slate-400">{m.label}: </span>
                            <span className="text-white font-semibold">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project Description */}
                  <p className="mb-6 text-sm text-slate-300/90 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-mono text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  {/* Detailed Modal Trigger */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
                  >
                    <span>Inspect Details</span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                  {/* Outgoing Links */}
                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                      title="View GitHub Repository"
                      aria-label="View GitHub Repository"
                    >
                      <Github className="h-3.5 w-3.5" />
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                        title="Live Preview"
                        aria-label="Live Preview"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Smooth Modal / Detail View */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Dialog with Liquid Glass */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass specular-top relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-[#0A0D14]/90 p-6 sm:p-8 shadow-glass-lg"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-400 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Header */}
              <div className="mb-4 pr-10">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  {selectedProject.subtitle}
                </span>
                <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Long Description */}
              <p className="mb-6 text-sm sm:text-base text-slate-300 leading-relaxed">
                {selectedProject.longDescription}
              </p>

              {/* Metrics Grid */}
              {selectedProject.metrics && (
                <div className="mb-6 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  {selectedProject.metrics.map((metric, i) => (
                    <div key={i}>
                      <div className="text-xs text-slate-400 font-mono">{metric.label}</div>
                      <div className="mt-1 text-lg font-bold text-white">{metric.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Key Architecture Features */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-3">
                  Key Technical Capabilities
                </h4>
                <div className="space-y-2">
                  {selectedProject.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="mb-8 flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic strength={0.25}>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass specular-top flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/20"
                  >
                    <Github className="h-4 w-4" />
                    <span>Explore GitHub Repo</span>
                  </a>
                </Magnetic>

                {selectedProject.liveUrl && (
                  <Magnetic strength={0.25}>
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="liquid-glass specular-top flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/20 px-6 py-2.5 text-sm font-semibold text-cyan-200 transition-all hover:bg-cyan-500/30 hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Launch Live Demo</span>
                    </a>
                  </Magnetic>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
