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
  "autonomous-lane-changing-carla": {
    pipelineName: "Continuous TD3 Closed-Loop Control & Sensor Fusion Pipeline",
    pipelineSummary:
      "End-to-end perception to actuation framework utilizing Twin Delayed DDPG (TD3) with clipped target policy smoothing noise to overcome value overestimation in high-speed highway lane changes.",
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
  "student-performance-prediction-aws": {
    pipelineName: "Production Machine Learning Deployment on AWS EC2",
    pipelineSummary:
      "Scalable containerized ML prediction microservice served via Flask and Docker on AWS EC2, leveraging Amazon ECR and IAM role governance.",
    steps: [
      {
        category: "01 • Client Layer",
        title: "Interactive Web UI & REST API",
        description:
          "Handles incoming academic, demographic, and socioeconomic indicators with automated schema validation and sanity checks.",
        specs: "REST API Endpoint • JSON Schema Validation",
      },
      {
        category: "02 • Feature Transformation",
        title: "Scikit-Learn ColumnTransformer",
        description:
          "Automated feature engineering pipeline executing median imputation, one-hot categorical encoding, and standard feature scaling.",
        specs: "ColumnTransformer • Standard Scaler",
      },
      {
        category: "03 • Model Inference",
        title: "Ensemble Gradient Boosting (87.76% Accuracy)",
        description:
          "High-accuracy ensemble classifier evaluated across precision/recall to identify at-risk students for proactive intervention.",
        specs: "87.76% Accuracy • Low-latency inference",
      },
      {
        category: "04 • Containerization",
        title: "Multi-Stage Docker Packaging",
        description:
          "Lightweight Docker container bundling Flask application, Gunicorn WSGI workers, and serialized joblib model artifacts.",
        specs: "Docker • Multi-stage Build • Gunicorn WSGI",
      },
      {
        category: "05 • Cloud Hosting",
        title: "AWS EC2 + Amazon ECR + IAM Roles",
        description:
          "Continuous container delivery through Amazon ECR onto AWS EC2 instances, reducing overall infrastructure deployment costs by 40%.",
        specs: "AWS EC2 • Amazon ECR • 40% Cost Reduction",
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
  "enhanced-qa-chatbot-openai": {
    pipelineName: "Context-Aware Conversational Intelligence & RAG",
    pipelineSummary:
      "Resilient conversational assistant with prompt token optimization, zero error circuit-breaking, and LangChain orchestration.",
    steps: [
      {
        category: "01 • Prompt Engine",
        title: "Dynamic Prompt Template & Hallucination Guard",
        description:
          "Adaptive prompt engineering strategies reducing token overhead to a median of 149 tokens per response.",
        specs: "Median 149 tokens • Anti-Hallucination Guard",
      },
      {
        category: "02 • Context Buffer",
        title: "LangChain Conversation Memory",
        description:
          "Context-preserving conversational memory buffer preventing context drift across multi-turn interactions.",
        specs: "ConversationBufferWindow • Turn Memory",
      },
      {
        category: "03 • API Gateway",
        title: "OpenAI Model Gateway with Exponential Backoff",
        description:
          "Engineered with automated retry backoff circuits achieving a 0.0% API failure rate under sustained load.",
        specs: "0.0% API Error Rate • Automated Retry",
      },
      {
        category: "04 • Performance",
        title: "Low-Latency Response Generation",
        description:
          "Delivers a 1.28s median (P50) response time and 6.18s 99th percentile (P99) latency in production testing.",
        specs: "P50 Latency: 1.28s • P99: 6.18s",
      },
    ],
  },
  "sign-sense-recognition": {
    pipelineName: "Edge Computer Vision & Sequential LSTM Gesture Pipeline",
    pipelineSummary:
      "Real-time webcam inference system extracting MediaPipe 3D hand keypoints and classifying sequential gestures for industrial deployment at IOCL.",
    steps: [
      {
        category: "01 • Video Capture",
        title: "OpenCV 60 FPS Video Stream",
        description:
          "Real-time frame ingestion with dynamic contrast normalization and hand region localization.",
        specs: "60 FPS RGB • OpenCV Capture",
      },
      {
        category: "02 • Landmark Extraction",
        title: "Google MediaPipe 3D Hand Tracking",
        description:
          "Extracts 21 3D hand landmarks (x, y, z coordinates) per frame with robust spatial invariance.",
        specs: "21 3D Landmarks • Google MediaPipe",
      },
      {
        category: "03 • Sequence Buffer",
        title: "30-Timestep Temporal Frame Window",
        description:
          "Buffers temporal keypoint coordinate sequences to capture dynamic gesture velocities and acceleration.",
        specs: "T = 30 timesteps • Normalized [0, 1]",
      },
      {
        category: "04 • Recurrent Network",
        title: "Two-Layer Bidirectional LSTM",
        description:
          "Sequential deep recurrent neural network modeling bidirectional dependencies across gesture trajectories.",
        specs: "Bi-LSTM • 99.0% Accuracy",
      },
      {
        category: "05 • Production Serving",
        title: "Industrial Deployment at IOCL",
        description:
          "Achieved 99.0% classification accuracy and 25% faster inference than legacy TensorFlow models.",
        specs: "99.0% Accuracy • +25% Speed Gain",
      },
    ],
  },
  "network-security-phishing": {
    pipelineName: "High-Dimensional Threat Classification Pipeline",
    pipelineSummary:
      "Automated cybersecurity machine learning classifier analyzing high-dimensional network features to accurately identify phishing vectors.",
    steps: [
      {
        category: "01 • Ingestion",
        title: "Network Packet & URL Stream",
        description:
          "Continuous threat intelligence ingestion capturing live URL requests and host headers.",
        specs: "High-throughput Stream • Threat Intel",
      },
      {
        category: "02 • Feature Engine",
        title: "High-Dimensional Feature Extraction",
        description:
          "Extracts lexical, structural, statistical, and domain security attributes from incoming request metadata.",
        specs: "30+ High-dimensional features",
      },
      {
        category: "03 • Classification",
        title: "Tuned XGBoost & Random Forest Ensemble",
        description:
          "Ensemble classifier tuned via stratified cross-validation delivering 98.7% classification accuracy.",
        specs: "98.7% Accuracy • Stratified K-Fold",
      },
      {
        category: "04 • Microservice",
        title: "Dockerized Container API Serving",
        description:
          "Containerized Docker microservice with sub-5ms latency for enterprise security gateway integration.",
        specs: "< 5ms Latency • Docker Container",
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
      {/* Ambient background glow in electric cyan & emerald */}
      <div className="pointer-events-none absolute bottom-10 left-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px] -z-10" />
      <div className="pointer-events-none absolute top-1/4 right-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[140px] -z-10" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-mono tracking-widest text-cyan-400 uppercase shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Verified Engineering & Research Portfolio</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Projects & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">Deployments</span>
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
                    ? "bg-cyan-500 text-slate-950 font-bold border border-cyan-400 shadow-glow-cyan"
                    : "border border-slate-800 bg-slate-900/80 text-slate-300 hover:border-cyan-500/40 hover:bg-slate-800 hover:text-white shadow-sm"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Video Simulation Showcase Banner */}
        <div className="mb-10 rounded-3xl liquid-glass specular-top border border-slate-800 bg-slate-900/85 p-6 sm:p-7 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-glass hover:border-cyan-500/30 transition-all">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-red-500 border border-slate-700 shadow-sm">
              <Youtube className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider font-bold">
                  CARLA Simulation Videos
                </span>
                <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/30 font-semibold">
                  48 Testcases Recorded
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                Autonomous Lane Changing & TD3 Policy Visualizations
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Watch full continuous reinforcement learning runs across obstacle avoidance, emergency braking, and highway lane changes directly in the CARLA simulator.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowVideoModal(true)}
            className="flex items-center gap-2 rounded-full border border-cyan-500/50 bg-cyan-500 px-6 py-3 text-xs font-bold text-slate-950 transition-all hover:bg-cyan-400 shadow-glow-cyan shrink-0"
          >
            <Play className="h-4 w-4 fill-current" />
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
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <TiltCard
                maxTilt={5}
                spotlightColor="rgba(0, 216, 255, 0.15)"
                onClick={() => {
                  setSelectedProject(project);
                  setModalTab("overview");
                }}
                className="group flex h-full flex-col justify-between p-6 sm:p-7 cursor-pointer border border-slate-800 bg-slate-900/85 hover:border-cyan-500/40 shadow-glass hover:shadow-glass-lg transition-all"
              >
                <div>
                  {/* Visual Header Banner */}
                  <div
                    className={`relative mb-5 h-36 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 border border-slate-800 flex flex-col justify-between p-4`}
                  >
                    <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full border border-cyan-500/10 bg-cyan-500/5 backdrop-blur-sm transition-transform duration-500 group-hover:scale-125" />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        {project.subtitle}
                      </span>
                      {project.featured && (
                        <span className="rounded-full border border-cyan-500/40 bg-cyan-950/60 px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-300">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="relative z-10 mt-1 text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* BOLD ISOLATED STAT BLOCKS DIRECTLY ABOVE DESCRIPTION */}
                  {project.metrics && (
                    <div className="mb-4 grid grid-cols-3 gap-2">
                      {project.metrics.map((m, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-slate-800 bg-slate-950/70 p-2.5 text-center group-hover:border-cyan-500/30 transition-colors"
                        >
                          <div className="text-sm font-black text-cyan-400 font-mono tracking-tight">
                            {m.value}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Project Description */}
                  <p className="mb-5 text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-slate-800 bg-slate-950/60 px-2 py-0.5 text-[11px] font-mono text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                  {/* Dedicated Architecture Trigger */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                      setModalTab("architecture");
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/btn"
                  >
                    <Layers className="h-3.5 w-3.5 text-cyan-400" />
                    <span>View Architecture</span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
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
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-950/60 text-emerald-400 transition-all hover:border-emerald-400 hover:bg-emerald-900/60 hover:text-emerald-300 shadow-sm"
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
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-800 bg-slate-950 text-slate-300 transition-all hover:border-cyan-500/40 hover:bg-slate-800 hover:text-cyan-400 shadow-sm"
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
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-800 bg-slate-950 text-red-500 transition-all hover:border-red-500/40 hover:bg-slate-800 shadow-sm"
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
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-800 bg-slate-950 text-emerald-400 transition-all hover:border-emerald-500/40 hover:bg-slate-800 shadow-sm"
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
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-4 sm:p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <Youtube className="h-5 w-5 text-red-500" />
                  <span className="text-base font-bold text-white">
                    CARLA Autonomous Lane Changing & TD3 Simulation Runs (48 Videos)
                  </span>
                </div>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                  aria-label="Close video player"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* YouTube Player */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 bg-black">
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
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
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
              className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto overscroll-contain rounded-3xl border border-slate-800 bg-slate-900/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="sticky top-0 float-right -mr-2 -mt-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 shadow-sm transition-colors"
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

              {/* Tab Switcher: Architecture Diagram vs Overview */}
              <div className="mt-4 mb-6 flex flex-wrap gap-2 border-b border-slate-800 pb-3">
                <button
                  onClick={() => setModalTab("architecture")}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    modalTab === "architecture"
                      ? "bg-cyan-500 text-slate-950 shadow-glow-cyan font-bold"
                      : "border border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  <span>System Architecture Diagram</span>
                </button>
                <button
                  onClick={() => setModalTab("overview")}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    modalTab === "overview"
                      ? "bg-cyan-500 text-slate-950 shadow-glow-cyan font-bold"
                      : "border border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <Activity className="h-4 w-4" />
                  <span>Overview & Metrics</span>
                </button>
              </div>

              {/* Tab Content 1: System Architecture Diagram */}
              {modalTab === "architecture" && (
                <div className="space-y-6">
                  {projectArchitectures[selectedProject.id] ? (
                    <>
                      {/* High-level summary card */}
                      <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-5 shadow-sm">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1.5">
                          <Cpu className="h-4 w-4 text-cyan-400" />
                          <span>
                            {projectArchitectures[selectedProject.id].pipelineName}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {projectArchitectures[selectedProject.id].pipelineSummary}
                        </p>
                      </div>

                      {/* Interactive Flow Stages */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                          Pipeline Flow & Data Transformations
                        </h4>
                        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-sky-400 before:to-emerald-500">
                          {projectArchitectures[selectedProject.id].steps.map(
                            (step, sIdx) => (
                              <div
                                key={sIdx}
                                className="relative rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition-all hover:border-cyan-500/40 hover:bg-slate-950/90"
                              >
                                {/* Node dot */}
                                <div className="absolute -left-[23px] top-4 h-3 w-3 rounded-full border-2 border-slate-900 bg-cyan-400 shadow-glow-cyan" />

                                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                  <span className="font-mono text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                                    {step.category}
                                  </span>
                                  {step.specs && (
                                    <span className="rounded-md border border-slate-800 bg-slate-900 px-2 py-0.5 font-mono text-[10px] text-slate-300">
                                      {step.specs}
                                    </span>
                                  )}
                                </div>

                                <h5 className="text-sm font-bold text-white mb-1">
                                  {step.title}
                                </h5>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-slate-400">
                      System architecture details currently in compilation.
                    </p>
                  )}
                </div>
              )}

              {/* Tab Content 2: Overview & Empirical Results */}
              {modalTab === "overview" && (
                <div>
                  {/* Long Description */}
                  <p className="mb-6 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>

                  {/* Bold Isolated Quantitative Stat Blocks */}
                  {selectedProject.metrics && (
                    <div className="mb-6 grid grid-cols-3 gap-3">
                      {selectedProject.metrics.map((metric, i) => (
                        <div
                          key={i}
                          className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3.5 text-center"
                        >
                          <div className="text-lg sm:text-xl font-black text-cyan-400 font-mono tracking-tight">
                            {metric.value}
                          </div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Key Technical Capabilities */}
                  <div className="mb-6">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3">
                      Technical Architecture & Key Results
                    </h4>
                    <div className="space-y-2.5">
                      {selectedProject.keyFeatures.map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-slate-300"
                        >
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
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
                        className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 font-mono text-xs text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons Footer */}
              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-800 pt-6">
                {selectedProject.liveUrl && selectedProject.liveUrl !== selectedProject.githubUrl && !selectedProject.liveUrl.includes("youtube.com") && (
                  <Magnetic strength={0.25}>
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-500/15 px-6 py-2.5 text-sm font-bold text-emerald-400 transition-all hover:bg-emerald-500/25 hover:border-emerald-400 shadow-glow-emerald"
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
                    className="flex items-center gap-2 rounded-full border border-cyan-500/50 bg-cyan-500 px-6 py-2.5 text-sm font-bold text-slate-950 transition-all hover:bg-cyan-400 shadow-glow-cyan"
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
                      className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-6 py-2.5 text-sm font-semibold text-slate-200 transition-all hover:border-emerald-500/40 hover:bg-slate-750 hover:text-white shadow-sm"
                    >
                      <FileCheck className="h-4 w-4 text-emerald-400" />
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
                    className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-6 py-2.5 text-sm font-semibold text-slate-200 transition-all hover:border-cyan-500/40 hover:bg-slate-750 hover:text-white shadow-sm"
                  >
                    <Play className="h-4 w-4 fill-current text-red-500" />
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
