export interface SkillItem {
  name: string;
  type: string;
  highlight?: boolean;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Reinforcement Learning & Autonomous Vehicles",
    description: "Continuous control algorithms, multi-modal perception, and autonomous simulation in CARLA.",
    skills: [
      { name: "CARLA Simulator", type: "Simulator", highlight: true },
      { name: "RL Models & Algorithms", type: "TD3 / DDPG", highlight: true },
      { name: "Sensor Fusion (Radar/Depth)", type: "Perception", highlight: true },
      { name: "Gymnasium & Custom Envs", type: "Environment", highlight: true },
      { name: "Autonomous Lane Changing", type: "Control Policy", highlight: true },
      { name: "TensorBoard & Evaluation", type: "Telemetry" },
    ],
  },
  {
    category: "LLMs, NLP & Generative AI",
    description: "Modern retrieval-augmented generation architectures, prompt engineering, and conversational models.",
    skills: [
      { name: "RAG Architectures", type: "Architecture", highlight: true },
      { name: "LangChain", type: "Framework", highlight: true },
      { name: "FAISS & ChromaDB", type: "Vector Store", highlight: true },
      { name: "Hugging Face Ecosystem", type: "Model Hub", highlight: true },
      { name: "Prompt Engineering", type: "System Design", highlight: true },
      { name: "GPT, BERT, LLaMA", type: "Foundation Models" },
      { name: "Ollama Local Serving", type: "Inference Engine" },
      { name: "Streamlit UI", type: "Framework" },
    ],
  },
  {
    category: "Core Technologies & Frameworks",
    description: "Deep learning libraries, backend frameworks, and programming languages.",
    skills: [
      { name: "Python", type: "Language", highlight: true },
      { name: "PyTorch", type: "Deep Learning", highlight: true },
      { name: "Scikit-learn", type: "ML Framework", highlight: true },
      { name: "TensorFlow", type: "Deep Learning" },
      { name: "FastAPI & Flask", type: "Backend API", highlight: true },
      { name: "Java", type: "Language" },
      { name: "SQL & Relational DBs", type: "Database" },
      { name: "HTML / CSS & JavaScript", type: "Frontend" },
    ],
  },
  {
    category: "MLOps, Cloud & QA Deployment",
    description: "Production pipelines, cloud containerization, and continuous delivery.",
    skills: [
      { name: "Docker", type: "Containers", highlight: true },
      { name: "AWS (EC2, S3, ECR, IAM)", type: "Cloud Infra", highlight: true },
      { name: "Git & GitHub CI/CD", type: "DevOps & CI/CD", highlight: true },
      { name: "CI/CD Pipelines (Jenkins)", type: "Automation", highlight: true },
      { name: "Sonarqube & Quality Assurance", type: "Code Quality" },
      { name: "MLflow Tracking", type: "MLOps" },
      { name: "Linux Administration", type: "Operating System" },
    ],
  },
];
