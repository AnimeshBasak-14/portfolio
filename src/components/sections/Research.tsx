"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { researchData, ResearchPaper } from "@/data/research";
import { TiltCard } from "@/components/ui/TiltCard";
import { Magnetic } from "@/components/ui/Magnetic";
import {
  BookOpen,
  FileCheck,
  Sparkles,
  Youtube,
  Github,
  ChevronRight,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Play,
  X,
  ExternalLink,
} from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

export const Research: React.FC = () => {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <section id="research" className="relative py-28 px-4 md:px-8">
      {/* Background ambient glow in Sage / Forest */}
      <div className="pointer-events-none absolute top-1/4 left-10 h-96 w-96 rounded-full bg-palette-forest/20 blur-[130px] -z-10" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-palette-sand/30 bg-palette-forest/30 px-4 py-1 text-xs font-mono tracking-widest text-palette-cream uppercase"
          >
            <BookOpen className="h-3.5 w-3.5 text-palette-sage" />
            <span>Doctoral Research & Scientific Manuscripts</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight text-palette-cream sm:text-4xl md:text-5xl"
          >
            Research Papers <span className="text-transparent bg-clip-text bg-gradient-to-r from-palette-sage via-palette-sand to-palette-cream">(Currently Under Review)</span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-palette-sand/90 leading-relaxed">
            Doctoral research conducted at the Indian Institute of Technology Roorkee (IIT Roorkee) in the Department of Computer Science and Engineering, supervised by Dr. Neetish Kumar.
          </p>
        </div>

        {/* Papers Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {researchData.map((paper) => (
            <motion.div key={paper.id} variants={itemVariants}>
              <TiltCard
                maxTilt={6}
                spotlightColor="rgba(163, 182, 138, 0.25)"
                onClick={() => setSelectedPaper(paper)}
                className="group flex h-full flex-col justify-between p-7 sm:p-8 cursor-pointer"
              >
                <div>
                  {/* Status Banner */}
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-palette-sand/20 pb-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-0.5 font-mono text-[11px] font-semibold text-amber-200">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                      </span>
                      <span>{paper.status}</span>
                    </span>

                    <span className="font-mono text-xs text-palette-sand">
                      {paper.affiliation}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-palette-cream group-hover:text-palette-sage transition-colors leading-snug">
                    {paper.title}
                  </h3>

                  {/* Authors & Supervisor */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-palette-sand">
                    <span>
                      <strong className="text-palette-cream">Authors:</strong> {paper.authors.join(", ")}
                    </span>
                    <span>
                      <strong className="text-palette-cream">Supervisor:</strong> {paper.supervisor}
                    </span>
                  </div>

                  {/* Abstract preview */}
                  <p className="mt-4 text-sm text-palette-cream/80 leading-relaxed line-clamp-4">
                    {paper.abstract}
                  </p>

                  {/* Metrics grid */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-xl border border-palette-sand/20 bg-palette-forest/20 p-3 text-center">
                    {paper.metrics.map((m, idx) => (
                      <div key={idx}>
                        <div className="font-mono text-[10px] text-palette-sand">{m.label}</div>
                        <div className="font-bold text-sm text-palette-cream mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-palette-sand/20 bg-palette-forest/30 px-2 py-0.5 font-mono text-[11px] text-palette-sage"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer action bar */}
                <div className="mt-6 pt-4 border-t border-palette-sand/20 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-palette-sage group-hover:text-palette-cream transition-colors">
                    <span>Read Full Formulation & Contributions</span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {paper.videoPlaylistUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowVideoModal(true);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-palette-sand/30 bg-palette-forest/30 text-palette-cream hover:border-palette-sage hover:bg-palette-moss/30 transition-all"
                        title="Watch 48 Simulation Videos"
                        aria-label="Watch Simulation Videos"
                      >
                        <Youtube className="h-3.5 w-3.5" />
                      </button>
                    )}

                    {paper.codeUrl && (
                      <a
                        href={paper.codeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-palette-sand/30 bg-palette-forest/30 text-palette-cream hover:border-palette-sage hover:bg-palette-moss/30 transition-all"
                        title="View Research Codebase"
                        aria-label="View Research Codebase"
                      >
                        <Github className="h-3.5 w-3.5" />
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
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              className="liquid-glass specular-top relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-palette-sand/30 bg-background-secondary p-5 sm:p-6 shadow-glass-lg"
            >
              <div className="flex items-center justify-between pb-3 border-b border-palette-sand/20 mb-4">
                <div className="flex items-center gap-2">
                  <Youtube className="h-5 w-5 text-palette-sage" />
                  <span className="text-base font-bold text-palette-cream">
                    CARLA Simulation Runs — TD3 Continuous RL Lane-Changing (48 Scenarios)
                  </span>
                </div>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="rounded-full p-1 text-palette-sand hover:bg-palette-forest/30 hover:text-palette-cream"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-palette-sand/20 bg-black">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube-nocookie.com/embed/videoseries?list=PLNy_bKEJyhIM&autoplay=1"
                  title="CARLA Autonomous Driving TD3RL Scenarios"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-palette-sand font-mono">
                <span>Playlist: TD3RCO TESTCASE SCENARIOS</span>
                <a
                  href="https://youtube.com/playlist?list=PLNy_bKEJyhIM&si=VP8HZBgkaJzIxzbY"
                  target="_blank"
                  rel="noreferrer"
                  className="text-palette-sage hover:text-palette-cream flex items-center gap-1"
                >
                  <span>Open on YouTube</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Research Paper Modal with MOUSE WHEEL SCROLL SUPPORT */}
      <AnimatePresence>
        {selectedPaper && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPaper(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              className="liquid-glass specular-top relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto overscroll-contain rounded-3xl border border-palette-sand/30 bg-background-secondary p-6 sm:p-8 shadow-glass-lg"
            >
              <button
                onClick={() => setSelectedPaper(null)}
                className="sticky top-0 float-right -mr-2 -mt-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-palette-sand/30 bg-background-secondary text-palette-sand backdrop-blur-md hover:text-palette-cream hover:bg-palette-forest/40"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-4 pr-10">
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-0.5 font-mono text-[11px] font-semibold text-amber-200">
                  ● Status: {selectedPaper.status}
                </span>
                <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-palette-cream leading-tight">
                  {selectedPaper.title}
                </h3>
                <div className="mt-2 text-xs font-mono text-palette-sand">
                  <strong>Supervisor:</strong> {selectedPaper.supervisor} · {selectedPaper.affiliation}
                </div>
              </div>

              {/* Abstract */}
              <div className="mb-6 rounded-2xl border border-palette-sand/20 bg-palette-forest/20 p-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-palette-sage mb-2 font-semibold">
                  Executive Abstract
                </h4>
                <p className="text-sm text-palette-cream/90 leading-relaxed">
                  {selectedPaper.abstract}
                </p>
              </div>

              {/* Key Contributions */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-palette-sand mb-3">
                  Key Research Contributions
                </h4>
                <div className="space-y-2.5">
                  {selectedPaper.contributions.map((c, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-palette-cream/90">
                      <CheckCircle2 className="h-4 w-4 text-palette-sage mt-0.5 shrink-0" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl border border-palette-sand/20 bg-palette-forest/30 p-4 text-center">
                {selectedPaper.metrics.map((m, i) => (
                  <div key={i}>
                    <div className="text-xs text-palette-sand font-mono">{m.label}</div>
                    <div className="mt-1 text-lg font-bold text-palette-cream">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {selectedPaper.codeUrl && (
                  <Magnetic strength={0.25}>
                    <a
                      href={selectedPaper.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="liquid-glass specular-top flex items-center gap-2 rounded-full border border-palette-sand/30 bg-palette-forest/40 px-6 py-2.5 text-sm font-semibold text-palette-cream hover:bg-palette-moss/40"
                    >
                      <Github className="h-4 w-4" />
                      <span>Inspect Codebase</span>
                    </a>
                  </Magnetic>
                )}

                {selectedPaper.videoPlaylistUrl && (
                  <button
                    onClick={() => {
                      setSelectedPaper(null);
                      setShowVideoModal(true);
                    }}
                    className="liquid-glass specular-top flex items-center gap-2 rounded-full border border-palette-sage/40 bg-palette-moss/30 px-6 py-2.5 text-sm font-semibold text-palette-cream hover:bg-palette-moss/50"
                  >
                    <Play className="h-4 w-4 fill-current text-palette-sage" />
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
