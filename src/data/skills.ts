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
    category: "Reinforcement Learning & Autonomous Vehicles",
    description: "Continuous control algorithms, multi-modal perception, and autonomous simulation in CARLA.",
    skills: [
      { name: "CARLA Simulator", level: "Expert", highlight: true },
      { name: "Twin Delayed DDPG (TD3)", level: "Expert", highlight: true },
      { name: "DDPG & Actor-Critic", level: "Expert", highlight: true },
      { name: "Soft Actor-Critic (SAC)", level: "Advanced", highlight: true },
      { name: "Sensor Fusion (Radar/Depth)", level: "Expert", highlight: true },
      { name: "Gymnasium & Custom Envs", level: "Expert", highlight: true },
      { name: "Autonomous Lane Changing", level: "Research", highlight: true },
      { name: "TensorBoard & Evaluation", level: "Expert" },
    ],
  },
  {
    category: "LLMs, NLP & Generative AI",
    description: "Modern retrieval-augmented generation architectures, prompt engineering, and conversational models.",
    skills: [
      { name: "RAG Architectures", level: "Expert", highlight: true },
      { name: "LangChain", level: "Advanced", highlight: true },
      { name: "FAISS & ChromaDB", level: "Advanced", highlight: true },
      { name: "Hugging Face Ecosystem", level: "Advanced", highlight: true },
      { name: "Prompt Engineering", level: "Expert", highlight: true },
      { name: "GPT, BERT, LLaMA", level: "Advanced" },
      { name: "Ollama Local Serving", level: "Proficient" },
      { name: "Streamlit UI", level: "Expert" },
    ],
  },
  {
    category: "Core Technologies & Frameworks",
    description: "Deep learning libraries, backend frameworks, and programming languages.",
    skills: [
      { name: "Python", level: "Expert", highlight: true },
      { name: "PyTorch", level: "Expert", highlight: true },
      { name: "Scikit-learn", level: "Expert", highlight: true },
      { name: "TensorFlow", level: "Advanced" },
      { name: "FastAPI & Flask", level: "Advanced", highlight: true },
      { name: "Java", level: "Advanced" },
      { name: "SQL & Relational DBs", level: "Advanced" },
      { name: "HTML / CSS & JavaScript", level: "Advanced" },
    ],
  },
  {
    category: "MLOps, Cloud & QA Deployment",
    description: "Production pipelines, cloud containerization, and continuous delivery.",
    skills: [
      { name: "Docker", level: "Advanced", highlight: true },
      { name: "AWS (EC2, S3, ECR, IAM)", level: "Advanced", highlight: true },
      { name: "Git & GitHub CI/CD", level: "Expert", highlight: true },
      { name: "CI/CD Pipelines (Jenkins)", level: "Proficient", highlight: true },
      { name: "Sonarqube & Quality Assurance", level: "Proficient" },
      { name: "MLflow Tracking", level: "Proficient" },
      { name: "Linux Administration", level: "Advanced" },
    ],
  },
];
