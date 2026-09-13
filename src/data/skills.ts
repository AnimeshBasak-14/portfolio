export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: string;
    highlight?: boolean;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Geometric Deep Learning & GNNs",
    description: "Modeling topological and relational graphs for brain connectomics and complex networks.",
    skills: [
      { name: "Graph Neural Networks (GNN)", level: "Advanced", highlight: true },
      { name: "PyTorch Geometric (PyG)", level: "Advanced", highlight: true },
      { name: "GCN & Multi-Head GAT", level: "Advanced", highlight: true },
      { name: "GNNExplainer & XAI", level: "Advanced", highlight: true },
      { name: "Neo4j & Cypher Querying", level: "Expert", highlight: true },
      { name: "Neo4j Graph Data Science (GDS)", level: "Advanced", highlight: true },
      { name: "fMRI Connectomics & Atlases", level: "Research", highlight: true },
      { name: "NetworkX & Graph Centrality", level: "Expert" },
    ],
  },
  {
    category: "Reinforcement Learning & Robotics",
    description: "Continuous control, multi-modal perception, and autonomous navigation in simulated worlds.",
    skills: [
      { name: "CARLA 0.9.8 Simulator", level: "Expert", highlight: true },
      { name: "TD3 / Twin Delayed DDPG", level: "Expert", highlight: true },
      { name: "Soft Actor-Critic (SAC-Auto)", level: "Advanced", highlight: true },
      { name: "Proximal Policy Opt (PPO)", level: "Advanced", highlight: true },
      { name: "Prioritized Replay (PER)", level: "Advanced", highlight: true },
      { name: "Multi-Modal Sensor Fusion", level: "Advanced", highlight: true },
      { name: "Radar & Depth Perception", level: "Advanced" },
      { name: "Gymnasium / Custom Envs", level: "Expert", highlight: true },
    ],
  },
  {
    category: "Core AI, Machine Learning & MLOps",
    description: "Deep learning frameworks, model evaluation, and production deployment pipelines.",
    skills: [
      { name: "PyTorch", level: "Expert", highlight: true },
      { name: "Python", level: "Expert", highlight: true },
      { name: "FastAPI & REST APIs", level: "Advanced", highlight: true },
      { name: "Docker & Containerization", level: "Advanced", highlight: true },
      { name: "Scikit-Learn & XGBoost", level: "Expert" },
      { name: "LangChain & RAG Architectures", level: "Advanced" },
      { name: "Data Drift & Prometheus", level: "Proficient" },
      { name: "Git & GitHub CI/CD", level: "Expert" },
    ],
  },
  {
    category: "Software Engineering & Competitive Coding",
    description: "Foundational computer science, algorithmic problem solving, and software craftsmanship.",
    skills: [
      { name: "Data Structures & Algorithms", level: "Expert", highlight: true },
      { name: "LeetCode / CodeChef / Codeforces", level: "Advanced", highlight: true },
      { name: "Android Jetpack Compose & Kotlin", level: "Advanced", highlight: true },
      { name: "Next.js & TypeScript", level: "Advanced" },
      { name: "C / C++ & Java", level: "Advanced" },
      { name: "SQL & Relational Databases", level: "Advanced" },
    ],
  },
];
