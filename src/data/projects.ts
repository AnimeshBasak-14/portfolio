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
  driveUrl?: string;
  featured: boolean;
  accentColor: string;
  metrics?: { label: string; value: string }[];
  keyFeatures: string[];
}

export const projectsData: Project[] = [
  {
    id: "carla-autonomous-driving-rl",
    title: "CARLA Autonomous RL Suite & TD3-RCO",
    subtitle: "End-to-End Continuous Control & Multi-Modal Perception",
    description: "An industrial-grade deep reinforcement learning framework for autonomous vehicle navigation, collision avoidance, and safety-critical control in CARLA 0.9.8.",
    longDescription: "Engineered a comprehensive continuous control framework evaluating 8 state-of-the-art RL algorithms across 7 challenging urban and highway driving scenarios. Features multi-modal sensor fusion integrating 500-ray Radar, 4-channel Depth maps, and 9-dim vehicle kinematics. Benchmarked with Twin Delayed DDPG (TD3) with Prioritized Experience Replay (PER), SAC-Auto entropy tuning, and PPO with Generalized Advantage Estimation (GAE).",
    tags: ["CARLA 0.9.8", "PyTorch", "TD3 / SAC / PPO", "Reinforcement Learning", "LiDAR/Radar Fusion", "Python", "Gymnasium"],
    githubUrl: "https://github.com/AnimeshBasak-14/carla-autonomous-driving-rl",
    liveUrl: "https://youtube.com/playlist?list=PLNy_bKEJyhIM&si=VP8HZBgkaJzIxzbY",
    videoUrl: "https://www.youtube.com/embed/W_Zf6kfbKO4?list=PLNy_bKEJyhIM",
    driveUrl: "https://drive.google.com/drive/folders/1qji_Hst-NsBfZy-zAt3dG4JcmXceFPLc?usp=sharing",
    featured: true,
    accentColor: "from-cyan-500/25 via-blue-600/20 to-indigo-600/25",
    metrics: [
      { label: "Algorithms", value: "8 Models" },
      { label: "Scenarios", value: "7 Critical" },
      { label: "Test Cases", value: "48 Videos" },
    ],
    keyFeatures: [
      "Tested on 7 complex scenarios: Emergency Braking, Intersection Yielding, Lane Following, Overtaking, and Crosswalks",
      "Multi-modal observation processor: Radar 500, Depth 4, and Kinematics 9",
      "Comparative benchmark suite across TD3, SAC-Auto, DDPG+HER, PPO, and TRPO",
      "SumTree Prioritized Experience Replay (PER) for sampling safety-critical edge cases",
    ],
  },
  {
    id: "neuro-neo4j-gnn",
    title: "Neuro-Neo4j: Explainable GNN Pipeline",
    subtitle: "Brain Biomarker Discovery in Neurodegenerative Disorders",
    description: "Hybrid knowledge graph database and geometric deep learning framework mapping fMRI connectome topology for early diagnosis of neurodegenerative disease.",
    longDescription: "Neuro-Neo4j treats patient fMRI scans as relational graphs—where brain regions are nodes (AAL-116 atlas) and Pearson functional connectivity defines edges. Combines Neo4j 5.x Graph Data Science (PageRank, betweenness, degree centrality) with a hybrid GCN + Multi-Head GAT architecture in PyTorch Geometric. Uses GNNExplainer to extract interpretable biomarker subgraphs for clinical validation.",
    tags: ["Neo4j 5.x", "PyTorch Geometric", "GCN + GAT", "Graph Data Science", "GNNExplainer", "FastAPI", "fMRI"],
    githubUrl: "https://github.com/AnimeshBasak-14/Neuro-Neo4j",
    liveUrl: "https://github.com/AnimeshBasak-14/Neuro-Neo4j",
    featured: true,
    accentColor: "from-purple-500/25 via-pink-600/20 to-blue-600/25",
    metrics: [
      { label: "Atlas", value: "AAL-116" },
      { label: "GAT Heads", value: "4 Multi-Head" },
      { label: "Evaluation", value: "Macro-F1 & Jaccard" },
    ],
    keyFeatures: [
      "Relational fMRI graph projection using Neo4j GDS plugin with Cypher constraints",
      "Hybrid deep model: 2 GCN layers + 4-head GAT + Global Mean Pooling",
      "Explainable AI: GNNExplainer extracts compact biomarker subgraphs for medical transparency",
      "Production-ready FastAPI service with sliding-window drift monitoring and Prometheus metrics",
    ],
  },
  {
    id: "dopamine-control-system",
    title: "Dopamine Control System (DCS)",
    subtitle: "Sensor-Driven Neuro-Digital Behavioral Architecture",
    description: "An intelligent behavioral regulation system leveraging machine learning to predict relapse and enforce discipline via Android Accessibility and hardware sensors.",
    longDescription: "Engineered with Clean Architecture and Jetpack Compose, DCS intercepts high-dopamine habits before they occur. Employs an on-device ML predictor analyzing screen-on frequencies and session intervals, a high-priority Accessibility enforcement service, accelerometer-based bed detection for automated nighttime lockouts, and physical reset requirements.",
    tags: ["Kotlin", "Jetpack Compose", "Android A11y", "Machine Learning", "Room DB", "Firebase", "Coroutines"],
    githubUrl: "https://github.com/AnimeshBasak-14/Dopamine-Control-System",
    liveUrl: "https://github.com/AnimeshBasak-14/Dopamine-Control-System",
    featured: true,
    accentColor: "from-emerald-500/25 via-teal-600/20 to-cyan-600/25",
    metrics: [
      { label: "Architecture", value: "Clean Jetpack" },
      { label: "Detection", value: "Sensors + ML" },
      { label: "Enforcement", value: "A11y Hard Lock" },
    ],
    keyFeatures: [
      "Rule engine evaluating dynamic JSON logic against real-time phone usage stats",
      "ML predictor anticipating compulsive app launches based on historical intervals",
      "Hardware sensor fusion utilizing accelerometers for nocturnal bed detection lockouts",
      "Physical challenge verification gates (pushups/mindful breaks) before unlocking",
    ],
  },
  {
    id: "network-security-phishing",
    title: "Network Security Threat Pipeline",
    subtitle: "Machine Learning Detection for High-Dimensional Attacks",
    description: "Production-grade MLOps system detecting phishing attempts and anomalous network traffic using advanced ensemble classifiers and feature extraction.",
    longDescription: "Architected an automated threat analysis pipeline processing high-dimensional cyber telemetry. Features automated data ingestion, custom statistical feature extractors, cross-validation tuning, and modular inference deployment with Docker.",
    tags: ["Python", "Scikit-Learn", "XGBoost", "MLOps", "Docker", "Flask", "Network Security"],
    githubUrl: "https://github.com/AnimeshBasak-14/NetworkSecurity",
    liveUrl: "https://github.com/AnimeshBasak-14/NetworkSecurity",
    featured: false,
    accentColor: "from-blue-500/20 via-indigo-500/20 to-cyan-500/20",
    metrics: [
      { label: "Accuracy", value: "98.7%" },
      { label: "Inference", value: "< 5ms" },
      { label: "Deployment", value: "Docker CI/CD" },
    ],
    keyFeatures: [
      "End-to-end automated MLOps training and model artifact serialization",
      "Feature engineering on lexical, host-based, and domain security attributes",
      "Robust cross-validation pipeline mitigating adversarial data drift",
      "Modular containerized serving with REST API endpoints",
    ],
  },
  {
    id: "chat-with-pdf-rag",
    title: "Enhanced RAG Conversational Engine",
    subtitle: "High-Accuracy Document Retrieval & Semantic Reasoning",
    description: "A retrieval-augmented generation platform combining vector embeddings with conversational LLMs for multi-document question answering.",
    longDescription: "Developed an enterprise document intelligence assistant leveraging dense vector representations and hybrid search. Implements chunking strategies, semantic similarity scoring, and conversational memory for hallucination-resistant query synthesis.",
    tags: ["Python", "LangChain", "OpenAI / HuggingFace", "FAISS / ChromaDB", "Streamlit", "RAG"],
    githubUrl: "https://github.com/AnimeshBasak-14/ChatWithPDF-RAG",
    liveUrl: "https://github.com/AnimeshBasak-14/Enhanced-Q-A-Chatbot-with-OpenAI",
    featured: false,
    accentColor: "from-amber-500/20 via-orange-500/20 to-rose-500/20",
    metrics: [
      { label: "Retrieval", value: "Dense Vector" },
      { label: "Context Window", value: "128k Tokens" },
      { label: "Precision", value: "High Recall" },
    ],
    keyFeatures: [
      "Semantic similarity search over multi-hundred-page research PDF documents",
      "Context-aware conversational retrieval with sliding chat memory",
      "Source citation highlighting matching reference passages",
      "Plug-and-play architecture for both proprietary and open-weights LLMs",
    ],
  },
  {
    id: "arunachal-academic-exam-app",
    title: "Arunachal Examination Portal",
    subtitle: "Scalable Educational & Academic Utility",
    description: "Robust mobile and web platform deployed for students across Arunachal Pradesh and NITAP for academic management and exam preparation.",
    longDescription: "Engineered a high-concurrency educational platform providing examination schedules, syllabus tracking, mock tests, and institutional utilities. Built with modern Kotlin and clean UI paradigms.",
    tags: ["Kotlin", "Android SDK", "Firebase", "Room DB", "REST APIs"],
    githubUrl: "https://github.com/AnimeshBasak-14/arunachal_exam_app",
    liveUrl: "https://github.com/AnimeshBasak-14/arunachal_exam_app",
    featured: false,
    accentColor: "from-teal-500/20 via-emerald-500/20 to-blue-500/20",
    metrics: [
      { label: "Platform", value: "Android Native" },
      { label: "Concurrency", value: "Real-time Sync" },
      { label: "Storage", value: "Offline First" },
    ],
    keyFeatures: [
      "Offline-first caching architecture for low-connectivity regions",
      "Instantaneous push notifications for academic notifications and alerts",
      "Secure user profile management with role-based access",
      "Integrated institutional utilities developed during undergraduate studies at NITAP",
    ],
  },
];
