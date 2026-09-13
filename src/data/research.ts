export interface ResearchPaper {
  id: string;
  title: string;
  status: "Under Review" | "Published" | "In Preparation";
  venue: string;
  authors: string[];
  supervisor: string;
  affiliation: string;
  abstract: string;
  contributions: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  videoPlaylistUrl?: string;
  codeUrl?: string;
}

export const researchData: ResearchPaper[] = [
  {
    id: "carla-td3-lane-changing",
    title: "Autonomous Lane-Changing in Dense Traffic Using Twin Delayed DDPG and Multi-Modal Sensor Fusion",
    status: "Under Review",
    venue: "International Journal / IEEE Conference Submission",
    authors: ["Animesh Basak", "Dr. Neetesh Kumar"],
    supervisor: "Dr. Neetesh Kumar",
    affiliation: "Department of Computer Science and Engineering, Indian Institute of Technology Roorkee",
    abstract: "Autonomous vehicle lane changing in high-density corridors presents severe safety challenges due to continuous state-action spaces, dynamic surrounding vehicles, and value overestimation in standard actor-critic algorithms. In this work, we design a continuous reinforcement learning framework in the CARLA simulator integrating Twin Delayed DDPG (TD3) with multi-modal sensor fusion (radar, depth cameras, and obstacle proximity sensors). We demonstrate that TD3 significantly mitigates policy degradation and instability, achieving reliable, collision-free maneuvers in complex traffic conditions.",
    contributions: [
      "Formulated a multi-modal observation space combining 500-ray radar arrays, depth image features, and 9-dimensional ego-vehicle kinematics in CARLA.",
      "Conducted extensive comparative benchmarking between DDPG and TD3, demonstrating that clipped double Q-learning prevents catastrophic policy collapses during aggressive lane shifts.",
      "Achieved a 577.7% improvement in cumulative episode reward (1277.3 vs. -267.4) and a 958.5% reduction in actor gradient loss.",
      "Validated policy robustness over 5,000+ simulation episodes and 48 safety-critical test scenarios including emergency braking and tight merges.",
    ],
    metrics: [
      { label: "Reward Improvement", value: "+577.7%" },
      { label: "Actor Loss Cut", value: "-958.5%" },
      { label: "Success Rate", value: "85%+" },
      { label: "Execution Time", value: "-20%" },
    ],
    tags: ["Reinforcement Learning", "CARLA", "TD3", "Autonomous Vehicles", "Sensor Fusion", "PyTorch"],
    videoPlaylistUrl: "https://youtube.com/playlist?list=PLNy_bKEJyhIM&si=VP8HZBgkaJzIxzbY",
    codeUrl: "https://github.com/AnimeshBasak-14/carla-autonomous-driving-rl",
  },
  {
    id: "conformance-constraint-discovery",
    title: "Low-Variance Projections for Robust Conformance Constraint Discovery in High-Dimensional Systems",
    status: "Under Review",
    venue: "Peer-Reviewed Data Engineering / AI Venue",
    authors: ["Animesh Basak", "Research Collaborators"],
    supervisor: "Research Faculty",
    affiliation: "IIT Guwahati & IIT Roorkee",
    abstract: "Detecting data non-conformance and out-of-distribution unsafe tuples in mission-critical data pipelines is essential for verifiable AI deployments. This research investigates low-variance projection algorithms to synthesize verifiable conformance boundaries, elevating non-conformance anomaly detection by 40% and cutting false positive rates by 30% across heterogeneous evaluation domains.",
    contributions: [
      "Designed structured analysis protocols for high-dimensional tuple verification.",
      "Synthesized low-variance boundary projections that reduce false alarm rates by 30%.",
      "Enhanced detection sensitivity for out-of-conformance data states by 40%.",
    ],
    metrics: [
      { label: "Detection Gain", value: "+40%" },
      { label: "False Positives", value: "-30%" },
      { label: "Status", value: "Under Review" },
    ],
    tags: ["Data Conformance", "Anomaly Detection", "Trustworthy AI", "Statistical Modeling"],
    codeUrl: "https://github.com/AnimeshBasak-14/ConformanceConstraintsReproducibility",
  },
];
