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
  Layers,
  Cpu,
  GitBranch,
  Activity,
  ArrowRight,
} from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

// Structured Architecture Data for System Modals
interface ArchitectureStep {
  title: string;
  category: string;
  description: string;
  specs?: string;
}

const projectArchitectures: Record<
  string,
  {
    pipelineName: string;
    pipelineSummary: string;
    steps: ArchitectureStep[];
  }
> = {
  "documentforge": {
    pipelineName: "100% Client-Side WebAssembly Document Execution Architecture",
    pipelineSummary:
      "Zero-knowledge browser runtime eliminating cloud file ingestion by executing QPDF WebAssembly binaries and complex-script DOM layout shaping directly in the client's tab with zero server bandwidth cost.",
    steps: [
      {
        category: "01 • Ingestion & Privacy Boundary",
        title: "Air-Gapped Local ArrayBuffer Streaming",
        description:
          "User files are loaded directly into browser memory (Uint8Array / ArrayBuffer) using HTML5 File API. Zero bytes of confidential tax returns or contracts are transmitted over the network.",
        specs: "0 KB Server Transfer • HTML5 File API • Zero-Knowledge",
      },
      {
        category: "02 • WebAssembly Engine",
        title: "QPDF C++ Compiled to WebAssembly (WASM)",
        description:
          "High-performance native document transformation binary compiled via Emscripten. Executes linearization, page extraction, AES-256 decryption/encryption, and object stream restructuring in memory.",
        specs: "Emscripten WASM • Client-side Sandbox • Linearization",
      },
      {
        category: "03 • Complex-Script Typography",
        title: "Offscreen DOM & Glyph Shaping Pipeline",
        description:
          "Bypasses standard open-source library limitations (which render '????' on Devanagari, Bengali, and ₹) by delegating bidirectional text and complex glyph shaping to native browser layout rendering.",
        specs: "HarfBuzz/Blink Parity • 1.5B Indic User Support • ₹ Native",
      },
      {
        category: "04 • Edge Distribution",
        title: "Cloudflare Pages Static Edge Architecture",
        description:
          "The web application itself is compiled as static assets deployed across 300+ Cloudflare edge PoPs. Zero server compute or container infrastructure required, resulting in $0 monthly bandwidth cost.",
        specs: "Cloudflare Pages • $0 Server Cost • Global Edge CDN",
      },
      {
        category: "05 • Local-First Resilience",
        title: "100% Offline-Capable Progressive Execution",
        description:
          "Service Worker caching enables full offline functionality. Users can load https://documentforge.in, turn off Wi-Fi entirely, and continue manipulating confidential documents with zero cloud dependency.",
        specs: "Offline PWA • Service Worker • Zero Network Latency",
      },
    ],
  },
  "autonomous-lane-changing-carla": {
    pipelineName: "Evidential Reinforcement Learning under Continuous POMDPs",
    pipelineSummary:
      "End-to-end perception to actuation framework utilizing Twin Delayed DDPG (TD3) and evidential uncertainty quantification under continuous partially observable environments (POMDPs) in CARLA.",
    steps: [
      {
        category: "01 • Environment",
        title: "CARLA 3D Autonomous Simulator",
        description:
          "High-fidelity simulation in Town04 highway featuring dynamic vehicle traffic, variable road friction, and 60 FPS synchronous tick rate.",
        specs: "Synchronous mode • Town04 • 60 FPS",
      },
      {
        category: "02 • Perception & Fusion",
        title: "Multi-Modal Sensor Array",
        description:
          "Synthesizes 360° LiDAR / Radar range returns, forward depth camera disparity, and ego inertial odometry into a cohesive perception stream.",
        specs: "360° Radar • Depth Cam • Inertial IMU",
      },
      {
        category: "03 • State Vector",
        title: "Continuous State Space (s_t ∈ ℝ²⁸)",
        description:
          "Encodes relative lateral/longitudinal distances, time-to-collision (TTC) bounds, lane centerline deviation d_lane, and heading error Δψ.",
        specs: "28-dim normalized state • Bounds: [-1, 1]",
      },
      {
        category: "04 • Policy Optimization",
        title: "Twin Delayed DDPG (TD3) Engine",
        description:
          "Actor π_φ computes continuous 3D actions [steer, throttle, brake] with Clipped Target Action Noise ϵ ~ clip(𝒩(0, σ), -c, c). Twin Critics (Q_θ1, Q_θ2) take min(Q1, Q2) to eradicate value overestimation. Delayed policy update frequency d=2.",
        specs: "Twin Critics • Clipped Double Q • d=2 Delay",
      },
      {
        category: "05 • Actuation & Performance",
        title: "Reward Function & Empirical Verification",
        description:
          "Dense multi-objective reward R = +v_x - 10|d_lane| - 100·collision - 5·jerk yielding +577.7% reward gain over DDPG, 958.5% lower actor loss, and 85%+ success rate over 5,000+ simulation episodes.",
        specs: "+577.7% Reward Gain • 85%+ Success • 48 Recorded Runs",
      },
    ],
  },
  "chat-with-pdf-rag": {
    pipelineName: "Sub-5ms Dense Retrieval & RAG Architecture",
    pipelineSummary:
      "High-throughput retrieval-augmented generation engine enabling real-time conversational dialogue over complex research papers.",
    steps: [
      {
        category: "01 • Ingestion",
        title: "Document Ingestion & Text Splitting",
        description:
          "PyPDFLoader multi-page extraction chunked with RecursiveCharacterTextSplitter at 1,000 characters with 200 token overlap.",
        specs: "PyPDF • Chunk: 1000 • Overlap: 200",
      },
      {
        category: "02 • Dense Vectors",
        title: "Hugging Face all-MiniLM-L6-v2 Embeddings",
        description:
          "Converts semantic document passages into 384-dimensional dense vectors capturing nuanced domain concepts.",
        specs: "384-dim Dense Embeddings • Hugging Face",
      },
      {
        category: "03 • Vector Indexing",
        title: "In-Memory FAISS Vector Index (IndexFlatL2)",
        description:
          "Ultra-fast local nearest neighbor search indexing passages and delivering an average retrieval latency of 4.72 ms.",
        specs: "FAISS IndexFlatL2 • 4.72 ms avg latency",
      },
      {
        category: "04 • Context Assembly",
        title: "Sliding Token Memory & Reranker",
        description:
          "Preserves conversational memory with LangChain conversation buffer, injecting top-k dense passages into system prompts.",
        specs: "Sliding Context Window • Prompt Buffer",
      },
      {
        category: "05 • Telemetry",
        title: "Streaming UI & LangSmith Observability",
        description:
          "Interactive Streamlit web frontend with real-time LangSmith token tracing, reducing query turnaround latency by 15%.",
        specs: "Streamlit Frontend • LangSmith Telemetry",
      },
    ],
  },
};

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalTab, setModalTab] = useState<"architecture" | "overview">("architecture");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showVideoModal, setShowVideoModal] = useState(false);

  const filterOptions = [
    { label: "All Projects", id: "all" },
    { label: "WebAssembly", id: "WebAssembly" },
    { label: "Reinforcement Learning", id: "Reinforcement Learning" },
    { label: "CARLA Simulation", id: "CARLA" },
    { label: "RAG & Document AI", id: "RAG" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="projects" className="relative py-28 px-4 md:px-8">
      {/* Ambient background glow in subtle monochrome */}
      <div className="pointer-events-none absolute bottom-10 left-10 h-96 w-96 rounded-full bg-white/[0.02] blur-[150px] -z-10" />
      <div className="pointer-events-none absolute top-1/4 right-10 h-80 w-80 rounded-full bg-white/[0.02] blur-[140px] -z-10" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div>
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-4 py-1.5 text-xs font-mono tracking-widest text-neutral-300 uppercase shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-white" />
              <span>Verified Engineering & Research Portfolio</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Projects & <span className="text-white">Deployments</span>
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
                    ? "bg-white text-black font-extrabold border border-white shadow-sm"
                    : "border border-white/15 bg-black/60 text-neutral-300 hover:border-white/40 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Video Simulation Showcase Banner */}
        <div className="mb-10 rounded-3xl liquid-glass specular-top border border-rose-500/25 bg-gradient-to-r from-rose-950/20 via-[#0B0B0B] to-[#0B0B0B] p-6 sm:p-7 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl hover:border-rose-500/40 transition-all">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-400 border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
              <Youtube className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-rose-400 uppercase tracking-wider font-bold">
                  CARLA Simulation Videos
                </span>
                <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-mono text-rose-300 border border-rose-500/30 font-bold">
                  48 Testcases Recorded
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                Autonomous Lane Changing & TD3 Policy Visualizations
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl leading-relaxed">
                Watch full continuous reinforcement learning runs across obstacle avoidance, emergency braking, and highway lane changes directly in the CARLA simulator.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowVideoModal(true)}
            className="flex items-center gap-2 rounded-full border border-white bg-white px-6 py-3 text-xs font-bold text-black transition-all hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] shrink-0"
          >
            <Play className="h-4 w-4 fill-current text-rose-600" />
            <span>Play Simulation Playlist</span>
          </button>
        </div>

        {/* Project Cards Grid — Clicking anywhere opens details, clicking 'View Architecture' opens architecture directly */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => {
            // Contextual theme per project
            const isWasm = project.id.includes("documentforge");
            const isCarla = project.id.includes("carla");
            const isRag = project.id.includes("rag");

            const bannerGradient = isWasm
              ? "from-cyan-950/40 via-[#0A161A] to-[#070707] border-cyan-500/25"
              : isCarla
              ? "from-emerald-950/40 via-[#0E1713] to-[#070707] border-emerald-500/20"
              : isRag
              ? "from-purple-950/35 via-[#130D1A] to-[#070707] border-purple-500/20"
              : "from-[#161616] via-[#0F0F0F] to-[#070707] border-white/10";

            return (
              <motion.div key={project.id} variants={itemVariants}>
                <TiltCard
                  maxTilt={5}
                  spotlightColor="rgba(255, 255, 255, 0.08)"
                  onClick={() => {
                    setSelectedProject(project);
                    setModalTab("overview");
                  }}
                  className="group flex h-full flex-col justify-between p-6 sm:p-7 cursor-pointer border border-white/10 bg-[#0B0B0B] hover:border-white/30 shadow-2xl transition-all rounded-3xl"
                >
                  <div>
                    {/* Visual Header Banner */}
                    <div
                      className={`relative mb-5 h-36 w-full overflow-hidden rounded-2xl bg-gradient-to-br ${bannerGradient} border flex flex-col justify-between p-4`}
                    >
                      <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-transform duration-500 group-hover:scale-125" />

                      <div className="relative z-10 flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                          {project.subtitle}
                        </span>
                        {project.featured && (
                          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className="relative z-10 mt-1 text-xl font-bold text-white group-hover:text-neutral-100 transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    {/* BOLD ISOLATED STAT BLOCKS DIRECTLY ABOVE DESCRIPTION */}
                    {project.metrics && (
                      <div className="mb-4 grid grid-cols-3 gap-2">
                        {project.metrics.map((m, i) => {
                          const isSuccessOrGain = m.value.includes("+") || m.value.includes("%") || m.value.includes("Acc");
                          const isLatency = m.value.includes("ms") || m.value.includes("s");
                          const isRed = m.value.includes("Loss") || m.value.includes("-");

                          const valueColor = isRed
                            ? "text-purple-400"
                            : isLatency
                            ? "text-amber-400"
                            : isSuccessOrGain
                            ? "text-emerald-400"
                            : "text-cyan-400";

                          return (
                            <div
                              key={i}
                              className="rounded-xl border border-white/10 bg-[#050505] p-2.5 text-center group-hover:border-white/25 transition-colors"
                            >
                              <div className={`text-sm font-black font-mono tracking-tight ${valueColor}`}>
                                {m.value}
                              </div>
                              <div className="text-[10px] font-mono text-neutral-400 truncate mt-0.5">
                                {m.label}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Project Description */}
                    <p className="mb-5 text-sm text-neutral-300 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-mono text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    {/* Dedicated Architecture Trigger */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                        setModalTab("architecture");
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-cyan-400 transition-colors group/btn"
                    >
                      <Layers className="h-3.5 w-3.5 text-cyan-400" />
                      <span>View Architecture</span>
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1 text-cyan-400" />
                    </button>

                    {/* External Links */}
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.liveUrl && project.liveUrl !== project.githubUrl && !project.liveUrl.includes("youtube.com") && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 transition-all hover:border-cyan-400 hover:bg-cyan-400 hover:text-black shadow-sm"
                          title="Launch Live Application"
                          aria-label="Launch Live Application"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-300 transition-all hover:border-white hover:bg-white hover:text-black shadow-sm"
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
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 transition-all hover:border-rose-500 hover:bg-rose-500 hover:text-white shadow-sm"
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
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 transition-all hover:border-emerald-500 hover:bg-emerald-500 hover:text-black shadow-sm"
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
            );
          })}
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
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-[#0B0B0B] p-4 sm:p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Youtube className="h-5 w-5 text-white" />
                  <span className="text-base font-bold text-white">
                    CARLA Autonomous Lane Changing & TD3 Simulation Runs (48 Videos)
                  </span>
                </div>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="rounded-full p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
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

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400 font-mono">
                <span>Playlist: TD3RCO TESTCASE SCENARIOS</span>
                <a
                  href="https://youtube.com/playlist?list=PLNy_bKEJyhIM&si=VP8HZBgkaJzIxzbY"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-neutral-300 flex items-center gap-1 font-bold"
                >
                  <span>Open Full Playlist on YouTube</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightweight Project Details & Architecture Diagram Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog with data-lenis-prevent to enable native mouse wheel scroll */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto overscroll-contain rounded-3xl border border-white/15 bg-[#080808]/98 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="sticky top-0 float-right -mr-2 -mt-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-neutral-400 hover:text-white hover:border-white/30 shadow-sm transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Header */}
              <div className="mb-4 pr-10">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  {selectedProject.subtitle}
                </span>
                <h3 className="mt-1 text-2xl sm:text-3xl font-black text-white">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Tab Switcher: Architecture Diagram vs Overview */}
              <div className="mt-4 mb-6 flex flex-wrap gap-2 border-b border-white/10 pb-3">
                <button
                  onClick={() => setModalTab("architecture")}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    modalTab === "architecture"
                      ? "bg-white text-black font-extrabold shadow-sm"
                      : "border border-white/15 bg-white/[0.04] text-neutral-300 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  <span>System Architecture Diagram</span>
                </button>
                <button
                  onClick={() => setModalTab("overview")}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    modalTab === "overview"
                      ? "bg-white text-black font-extrabold shadow-sm"
                      : "border border-white/15 bg-white/[0.04] text-neutral-300 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <Activity className="h-4 w-4" />
                  <span>Overview & Metrics</span>
                </button>
              </div>

              {/* Tab Content 1: System Architecture Diagram */}
              {/* Tab Content 1: System Architecture Diagram */}
              {modalTab === "architecture" && (
                <div className="space-y-6">
                  {projectArchitectures[selectedProject.id] ? (
                    <>
                      {/* High-level summary card */}
                      <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/[0.15] p-5 shadow-sm">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1.5">
                          <Cpu className="h-4 w-4 text-cyan-400" />
                          <span>
                            {projectArchitectures[selectedProject.id].pipelineName}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          {projectArchitectures[selectedProject.id].pipelineSummary}
                        </p>
                      </div>

                      {/* Interactive Flow Stages */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                          Pipeline Flow & Data Transformations
                        </h4>
                        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-400/60 before:via-emerald-400/40 before:to-white/5">
                          {projectArchitectures[selectedProject.id].steps.map(
                            (step, sIdx) => (
                              <div
                                key={sIdx}
                                className="relative rounded-2xl border border-white/10 bg-[#050505] p-4 transition-all hover:border-cyan-500/30 hover:bg-[#0A0A0A]"
                              >
                                {/* Node dot */}
                                <div className="absolute -left-[23px] top-4 h-3 w-3 rounded-full border-2 border-black bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />

                                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                  <span className="font-mono text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                                    {step.category}
                                  </span>
                                  {step.specs && (
                                    <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300 font-semibold">
                                      {step.specs}
                                    </span>
                                  )}
                                </div>

                                <h5 className="text-sm font-bold text-white mb-1">
                                  {step.title}
                                </h5>
                                <p className="text-xs text-neutral-300 leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-neutral-400">
                      System architecture details currently in compilation.
                    </p>
                  )}
                </div>
              )}

              {/* Tab Content 2: Overview & Empirical Results */}
              {modalTab === "overview" && (
                <div>
                  {/* Long Description */}
                  <p className="mb-6 text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>

                  {/* Bold Isolated Quantitative Stat Blocks */}
                  {selectedProject.metrics && (
                    <div className="mb-6 grid grid-cols-3 gap-3">
                      {selectedProject.metrics.map((metric, i) => {
                        const isSuccessOrGain = metric.value.includes("+") || metric.value.includes("%") || metric.value.includes("Acc");
                        const isLatency = metric.value.includes("ms") || metric.value.includes("s");
                        const isRed = metric.value.includes("Loss") || metric.value.includes("-");

                        const valueColor = isRed
                          ? "text-purple-400"
                          : isLatency
                          ? "text-amber-400"
                          : isSuccessOrGain
                          ? "text-emerald-400"
                          : "text-cyan-400";

                        return (
                          <div
                            key={i}
                            className="rounded-2xl border border-white/15 bg-[#000000] p-3.5 text-center"
                          >
                            <div className={`text-lg sm:text-xl font-black font-mono tracking-tight ${valueColor}`}>
                              {metric.value}
                            </div>
                            <div className="text-xs text-neutral-400 font-mono mt-0.5">
                              {metric.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Key Technical Capabilities */}
                  <div className="mb-6">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-3">
                      Technical Architecture & Key Results
                    </h4>
                    <div className="space-y-2.5">
                      {selectedProject.keyFeatures.map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-neutral-300"
                        >
                          <CheckCircle2 className="h-4 w-4 text-white mt-0.5 shrink-0" />
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
                        className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons Footer */}
              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
                {selectedProject.liveUrl && selectedProject.liveUrl !== selectedProject.githubUrl && !selectedProject.liveUrl.includes("youtube.com") && (
                  <Magnetic strength={0.25}>
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-white bg-white px-6 py-2.5 text-sm font-bold text-black transition-all hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Launch Live App</span>
                    </a>
                  </Magnetic>
                )}

                <Magnetic strength={0.25}>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-white hover:text-black"
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
                      className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-2.5 text-sm font-semibold text-neutral-300 transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white shadow-sm"
                    >
                      <FileCheck className="h-4 w-4 text-white" />
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
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-2.5 text-sm font-semibold text-neutral-300 transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white shadow-sm"
                  >
                    <Play className="h-4 w-4 fill-current text-white" />
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
