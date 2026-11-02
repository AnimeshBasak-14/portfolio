export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  videoUrl?: string;
  certificateUrl?: string;
  featured: boolean;
  accentColor: string;
  metrics?: { label: string; value: string }[];
  keyFeatures: string[];
}

export const projectsData: Project[] = [
  {
    id: "documentforge",
    title: "DocumentForge: Client-Side WASM Document Engine",
    subtitle: "Zero-Knowledge Local Processing & Indic Script Shaping",
    description: "100% in-browser document utility running QPDF and complex typography shaping entirely client-side via WebAssembly with zero server file uploads.",
    longDescription: "Engineered DocumentForge (https://documentforge.in) to replace legacy cloud document SaaS models with a zero-knowledge, local-first browser architecture. Standard PDF utilities routinely upload sensitive tax returns, contracts, and financial records to third-party S3 buckets while failing to shape complex Indic scripts (Devanagari, Bengali, Tamil, and the ₹ Rupee symbol). DocumentForge solves both challenges by compiling QPDF to WebAssembly for local cryptographic operations and offloading font shaping to the browser's native DOM layout engine. Achieves $0 server bandwidth overhead on Cloudflare Pages static edge and operates seamlessly offline.",
    tags: ["WebAssembly", "QPDF WASM", "Next.js", "Cloudflare Pages", "Canvas API", "Indic Typography", "Local-First"],
    githubUrl: "https://documentforge.in/",
    liveUrl: "https://documentforge.in/",
    featured: true,
    accentColor: "from-cyan-500/30 via-emerald-500/25 to-blue-500/20",
    metrics: [
      { label: "Server Uploads", value: "0 KB (Zero)" },
      { label: "Privacy Model", value: "100% Local" },
      { label: "Edge Bandwidth", value: "$0.00 Cost" },
      { label: "Indic Scripts", value: "Native Shaping & ₹" },
    ],
    keyFeatures: [
      "100% client-side execution via WebAssembly (QPDF WASM) — files never leave the user's browser",
      "Solves complex-script breakdown (Devanagari, Bengali, ₹) using offscreen DOM layout pipelines",
      "Zero server bandwidth overhead distributed globally via Cloudflare Pages static edge network",
      "Offline-first resilience: load once, disconnect Wi-Fi, and process documents indefinitely without cloud latency",
    ],
  },
  {
    id: "autonomous-lane-changing-carla",
    title: "Evidential Reinforcement Learning for Safe Autonomous Navigation",
    subtitle: "Continuous POMDPs, TD3 Policy Optimization & Multi-Modal CARLA Perception",
    description: "Evidential reinforcement learning framework under continuous POMDPs enabling provably safe navigation, lane-changing, and collision avoidance in the CARLA simulator.",
    longDescription: "Investigated safe autonomous vehicle navigation under continuous partially observable Markov decision processes (POMDPs), addressing epistemic perception uncertainty and value overestimation in continuous actor-critic algorithms. Implemented and benchmarked TD3 and evidential policies in the CARLA simulator with multi-modal sensor fusion (radar, depth cameras, and obstacle sensors). TD3 achieved a 577.7% improvement in average episode reward (1277.3 vs. -267.4 for DDPG), 958.5% lower actor loss, 85%+ success rate over 5,000+ simulations, and reduced maneuver execution time by 20%.",
    tags: ["Evidential RL", "Continuous POMDPs", "CARLA", "PyTorch", "TD3", "Sensor Fusion", "Safe Navigation", "Gymnasium"],
    githubUrl: "https://github.com/AnimeshBasak-14/TD3RCO",
    liveUrl: "https://youtube.com/playlist?list=PLNy_bKEJyhIM&si=VP8HZBgkaJzIxzbY",
    videoUrl: "https://www.youtube.com/embed/W_Zf6kfbKO4?list=PLNy_bKEJyhIM",
    certificateUrl: "https://drive.google.com/file/d/1qKYa1k7J43_SlgI0YeybKruXTh_WqBZZ/view?usp=drive_link",
    featured: true,
    accentColor: "from-palette-moss/30 via-palette-forest/30 to-palette-sand/20",
    metrics: [
      { label: "Reward Gain", value: "+577.7%" },
      { label: "Success Rate", value: "85%+" },
      { label: "Simulations", value: "5,000+" },
    ],
    keyFeatures: [
      "Benchmarked DDPG vs. TD3 with Twin Critics and Clipped Target Noise",
      "Sensor fusion integrating radar, depth camera, and vehicle kinematics in CARLA",
      "Cut actor loss by 958.5% and boosted policy performance by up to 108.06%",
      "Validated over 48 testcase scenarios with live simulation recordings",
    ],
  },
  {
    id: "chat-with-pdf-rag",
    title: "ChatWithPDF-RAG Document Intelligence",
    subtitle: "Sub-5ms Dense Retrieval & Conversational Q&A",
    description: "High-performance retrieval-augmented generation engine enabling real-time conversational question-answering over multi-page PDF documents.",
    longDescription: "Constructed an efficient RAG system in Streamlit utilizing FAISS vector indexing and Hugging Face embedding models. Achieved an average response latency of 4.72 ms and reduced query turnaround time by 15% through LangSmith-monitored retrieval pipelines.",
    tags: ["RAG", "FAISS", "Hugging Face", "Streamlit", "LangChain", "Python"],
    githubUrl: "https://github.com/AnimeshBasak-14/ChatWithPDF-RAG",
    liveUrl: "https://chatwithpdf-rag-b6wpkqmqhc29qwlcbadkry.streamlit.app/",
    featured: true,
    accentColor: "from-palette-sage/25 via-palette-moss/30 to-palette-forest/30",
    metrics: [
      { label: "Latency", value: "4.72 ms" },
      { label: "Retrieval", value: "FAISS Vector" },
      { label: "Optimization", value: "15% Lower Latency" },
    ],
    keyFeatures: [
      "Ultra-fast local vector search over dense research document passages",
      "Context-preserving conversational memory with sliding token window",
      "Comprehensive telemetry tracking and monitoring powered by LangSmith",
      "Streamlit user interface for seamless PDF upload and interactive dialogue",
    ],
  },
];
