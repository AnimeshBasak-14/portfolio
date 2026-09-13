"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, Project } from "@/data/projects";
import { TiltCard } from "@/components/ui/TiltCard";
import { Magnetic } from "@/components/ui/Magnetic";
import {
  ExternalLink,
  Github,
  Sparkles,
  X,
  ChevronRight,
  CheckCircle2,
  Youtube,
  Play,
  FileCheck,
} from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showVideoModal, setShowVideoModal] = useState(false);

  const filterOptions = [
    { label: "All Projects", id: "all" },
    { label: "Reinforcement Learning", id: "Reinforcement Learning" },
    { label: "CARLA", id: "CARLA" },
    { label: "RAG & LLMs", id: "RAG" },
    { label: "AWS & Docker", id: "AWS (EC2, ECR)" },
    { label: "Computer Vision", id: "Computer Vision" },
  ];

  const filteredProjects =
    activeFilter === "all"
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
              <span>Verified Engineering & Research Portfolio</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Projects & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Deployments</span>
            </motion.h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all ${
                  activeFilter === filter.id
                    ? "liquid-glass border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                    : "border border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Video Simulation Showcase Banner (Directly viewable without giving full drive access) */}
        <div className="mb-10 rounded-2xl liquid-glass specular-top border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-[#0A0D14]/70 p-6 sm:p-7 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-glass-lg">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30">
              <Youtube className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-red-400 uppercase tracking-wider font-semibold">
                  CARLA Simulation Videos
                </span>
                <span className="rounded-full bg-cyan-500/20 px-2 py-0.2 text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                  48 Testcases Recorded
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                Autonomous Lane Changing & TD3 Policy Visualizations
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Watch full continuous reinforcement learning runs across obstacle avoidance, emergency braking, and highway lane changes directly in the simulator.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowVideoModal(true)}
            className="liquid-glass specular-top flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/20 px-6 py-3 text-xs font-semibold text-white transition-all hover:bg-red-500/30 hover:shadow-[0_0_25px_rgba(239,68,68,0.35)] shrink-0"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>Play Simulation Playlist</span>
          </button>
        </div>

        {/* Project Cards Grid — Clicking anywhere on the card opens the details */}
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
                maxTilt={8}
                spotlightColor="rgba(56, 189, 248, 0.2)"
                onClick={() => setSelectedProject(project)}
                className="group flex h-full flex-col justify-between p-6 sm:p-7 cursor-pointer"
              >
                <div>
                  {/* Visual Specular Header Banner */}
                  <div
                    className={`relative mb-6 h-40 w-full overflow-hidden rounded-xl bg-gradient-to-br ${project.accentColor} border border-white/10 flex flex-col justify-between p-4`}
                  >
                    <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-transform duration-500 group-hover:scale-125" />
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        {project.subtitle}
                      </span>
                      {project.featured && (
                        <span className="rounded-full border border-cyan-400/40 bg-cyan-500/20 px-2 py-0.5 text-[10px] font-mono font-medium text-cyan-300">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="relative z-10 mt-1 text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Metrics preview */}
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
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 transition-colors group-hover:text-cyan-300">
                    <span>View Details</span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>

                  {/* External Links — stopPropagation prevents double opening modal */}
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                      title="GitHub Repository"
                      aria-label="GitHub Repository"
                    >
                      <Github className="h-3.5 w-3.5" />
                    </a>

                    {project.videoUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowVideoModal(true);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-400 transition-colors hover:border-red-400 hover:text-white"
                        title="Watch Simulation Videos"
                        aria-label="Watch Simulation Videos"
                      >
                        <Youtube className="h-3.5 w-3.5" />
                      </button>
                    )}

                    {project.certificateUrl && (
                      <a
                        href={project.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 transition-colors hover:border-emerald-400 hover:text-white"
                        title="View Certificate"
                        aria-label="View Certificate"
                      >
                        <FileCheck className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Simulation Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVideoModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              className="liquid-glass specular-top relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-[#0A0D14] p-4 sm:p-6 shadow-glass-lg"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Youtube className="h-5 w-5 text-red-400" />
                  <span className="text-base font-bold text-white">
                    CARLA Autonomous Lane Changing & TD3 Simulation Runs (48 Videos)
                  </span>
                </div>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
                  aria-label="Close video player"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* YouTube Player */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube-nocookie.com/embed/videoseries?list=PLNy_bKEJyhIM&autoplay=1"
                  title="CARLA Autonomous Driving Simulation Videos"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono">
                <span>Playlist: TD3RCO TESTCASE SCENARIOS</span>
                <a
                  href="https://youtube.com/playlist?list=PLNy_bKEJyhIM&si=VP8HZBgkaJzIxzbY"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Open Full Playlist on YouTube</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Project Details Modal with FULL MOUSE-WHEEL SCROLLING SUPPORT */}
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

            {/* Modal Dialog with data-lenis-prevent to enable native mouse wheel scroll */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              className="liquid-glass specular-top relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto overscroll-contain rounded-3xl border border-white/20 bg-[#0A0D14]/95 p-6 sm:p-8 shadow-glass-lg"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="sticky top-0 float-right -mr-2 -mt-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#0A0D14]/90 text-slate-300 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
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

              {/* Key Technical Capabilities */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-3">
                  Technical Architecture & Key Results
                </h4>
                <div className="space-y-2.5">
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
                    <span>View GitHub Repository</span>
                  </a>
                </Magnetic>

                {selectedProject.certificateUrl && (
                  <Magnetic strength={0.25}>
                    <a
                      href={selectedProject.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="liquid-glass specular-top flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-6 py-2.5 text-sm font-semibold text-emerald-200 transition-all hover:bg-emerald-500/30 hover:text-white"
                    >
                      <FileCheck className="h-4 w-4" />
                      <span>View Official Certificate</span>
                    </a>
                  </Magnetic>
                )}

                {selectedProject.videoUrl && (
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setShowVideoModal(true);
                    }}
                    className="liquid-glass specular-top flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/20 px-6 py-2.5 text-sm font-semibold text-red-200 transition-all hover:bg-red-500/30 hover:text-white"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>Watch Simulation Videos</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
