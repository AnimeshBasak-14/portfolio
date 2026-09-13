export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  accentColor: string;
  metrics?: { label: string; value: string }[];
  keyFeatures: string[];
}

export const projectsData: Project[] = [
  {
    id: "liquid-canvas-engine",
    title: "NeuroFlow Engine",
    subtitle: "Real-time AI Pipeline Orchestrator & Dashboard",
    description: "An ultra-low latency event-driven orchestration system with real-time telemetry, interactive flow graphs, and predictive scaling.",
    longDescription: "NeuroFlow provides a high-throughput workflow orchestrator built to manage distributed deep-learning inference pipelines. Features custom WebGL node canvas, sub-10ms telemetry streaming via WebSockets, and automated failover recovery.",
    tags: ["Next.js", "TypeScript", "Three.js", "WebSockets", "Node.js", "Tailwind CSS"],
    githubUrl: "https://github.com/AnimeshBasak-14/neuroflow-engine",
    liveUrl: "https://neuroflow-demo.vercel.app",
    featured: true,
    accentColor: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
    metrics: [
      { label: "Throughput", value: "25k req/s" },
      { label: "Latency", value: "< 8ms" },
      { label: "Uptime", value: "99.98%" },
    ],
    keyFeatures: [
      "Custom WebGL interactive workflow canvas",
      "Dynamic token-bucket rate limiting & backpressure",
      "Edge caching with instant state synchronization",
      "End-to-end type safety with Zod and TypeScript",
    ],
  },
  {
    id: "prism-os-design-system",
    title: "Prism Glass UI",
    subtitle: "Apple Vision Pro Inspired Liquid Glass Component System",
    description: "A hardware-accelerated design system combining SVG displacement shaders, spring dynamics, and dynamic optical refraction.",
    longDescription: "A comprehensive UI component library modeled after spatial computing aesthetics. Features frosted multi-layer acrylic glassmorphism, dynamic specular ray highlights, cursor magnetic physics, and accessible keyboard navigability.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "GLSL"],
    githubUrl: "https://github.com/AnimeshBasak-14/prism-glass-ui",
    liveUrl: "https://prism-ui-showcase.vercel.app",
    featured: true,
    accentColor: "from-purple-500/20 via-pink-500/20 to-blue-500/20",
    metrics: [
      { label: "Bundle Size", value: "< 14kB" },
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Components", value: "35+" },
    ],
    keyFeatures: [
      "Dynamic SVG refraction & displacement maps",
      "Cursor-reactive spotlight tracking & 3D tilt",
      "Hardware-accelerated sub-pixel glass filters",
      "Pre-configured accessible dark & light modes",
    ],
  },
  {
    id: "omni-search-vector-db",
    title: "OmniSearch Vector",
    subtitle: "Hybrid Semantic Search & High-Dimensional Vector Store",
    description: "Distributed semantic search platform integrating dense vector embeddings with BM25 keyword scoring for millisecond document retrieval.",
    longDescription: "Engineered a high-performance vector retrieval platform capable of indexing millions of document embeddings. Built with Rust and Next.js, featuring real-time cluster visualization and sub-millisecond similarity queries.",
    tags: ["Next.js", "Rust", "TypeScript", "Tailwind CSS", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com/AnimeshBasak-14/omnisearch-vector",
    liveUrl: "https://omnisearch-demo.vercel.app",
    featured: true,
    accentColor: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    metrics: [
      { label: "Index Capacity", value: "5M+ Docs" },
      { label: "Recall Rate", value: "98.4%" },
      { label: "P99 Latency", value: "12ms" },
    ],
    keyFeatures: [
      "HNSW approximate nearest neighbor index",
      "Multi-modal embedding generation pipeline",
      "Live cluster topological visualizer",
      "Streaming responses with SSE",
    ],
  },
  {
    id: "sentinel-cloud-monitor",
    title: "Sentinel Mesh",
    subtitle: "Autonomous Cloud Infrastructure & Security Telemetry",
    description: "Multi-cloud infrastructure observer offering automated vulnerability scanning, distributed tracing, and anomaly detection.",
    longDescription: "Designed an observability dashboard aggregating metrics across Kubernetes clusters and serverless fleets. Delivers real-time topology mapping, automated incident triage, and automated Slack alert dispatch.",
    tags: ["React", "TypeScript", "Go", "Docker", "Kubernetes", "Tailwind CSS"],
    githubUrl: "https://github.com/AnimeshBasak-14/sentinel-mesh",
    liveUrl: "https://sentinel-mesh.vercel.app",
    featured: false,
    accentColor: "from-emerald-500/20 via-teal-500/20 to-blue-500/20",
    metrics: [
      { label: "Nodes Monitored", value: "1,200+" },
      { label: "Alert Latency", value: "1.2s" },
      { label: "False Positives", value: "< 0.1%" },
    ],
    keyFeatures: [
      "Distributed tracing visualization",
      "Autonomous policy drift detection",
      "Zero-overhead eBPF metric collection",
      "Encrypted TLS 1.3 telemetry tunnels",
    ],
  },
  {
    id: "aurora-crypto-terminal",
    title: "Aurora Terminal",
    subtitle: "High-Frequency Algorithmic Execution & Orderbook",
    description: "Institutional-grade financial terminal with low-latency WebSocket orderbook streaming and custom technical analysis charts.",
    longDescription: "A specialized web-based trading workstation featuring millisecond Level 2 market data, execution routing, and interactive multi-timeframe candlestick visualizers powered by HTML5 Canvas.",
    tags: ["Next.js", "TypeScript", "Canvas API", "WebSockets", "Tailwind CSS"],
    githubUrl: "https://github.com/AnimeshBasak-14/aurora-terminal",
    liveUrl: "https://aurora-terminal.vercel.app",
    featured: false,
    accentColor: "from-amber-500/20 via-orange-500/20 to-red-500/20",
    metrics: [
      { label: "Feed Latency", value: "4ms" },
      { label: "Chart Render", value: "120Hz" },
      { label: "Memory Footprint", value: "< 35MB" },
    ],
    keyFeatures: [
      "High-frequency orderbook depth chart",
      "Custom WebGL candlestick visualizer",
      "Real-time spread arbitrage alerts",
      "Fully customizable keyboard-first controls",
    ],
  },
  {
    id: "sync-note-collaborative",
    title: "SyncNote Pro",
    subtitle: "Local-First CRDT Collaborative Knowledge Base",
    description: "Real-time collaborative markdown editor with peer-to-peer synchronization, conflict-free replicated data types, and offline-first storage.",
    longDescription: "A productivity workspace engineered with Yjs CRDTs and IndexedDB for instantaneous offline-first editing and peer-to-peer sync with cryptographic integrity verification.",
    tags: ["React", "TypeScript", "CRDTs (Yjs)", "WebRTC", "Tailwind CSS"],
    githubUrl: "https://github.com/AnimeshBasak-14/syncnote-pro",
    liveUrl: "https://syncnote-pro.vercel.app",
    featured: false,
    accentColor: "from-violet-500/20 via-purple-500/20 to-pink-500/20",
    metrics: [
      { label: "Sync Latency", value: "< 20ms" },
      { label: "Offline Support", value: "100%" },
      { label: "Conflict Rate", value: "0.00%" },
    ],
    keyFeatures: [
      "P2P WebRTC data channels with relay fallback",
      "Bi-directional graph link visualization",
      "AES-GCM client-side end-to-end encryption",
      "Rich WYSIWYG and syntax-highlighted code blocks",
    ],
  },
];
