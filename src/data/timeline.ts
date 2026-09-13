export interface TimelineEvent {
  year: string;
  role: string;
  organization: string;
  description: string;
  technologies: string[];
  type: "work" | "education" | "milestone";
  current?: boolean;
}

export const timelineData: TimelineEvent[] = [
  {
    year: "2024 — Present",
    role: "Ph.D. Research Scholar (Artificial Intelligence & Autonomous Systems)",
    organization: "Indian Institute of Technology Roorkee (IIT Roorkee)",
    description: "Doctoral research under the supervision of Dr. Neetish Kumar in the Mehta Family School of Data Science and Artificial Intelligence (MFSDSAI). Investigating Graph Neural Networks (GNNs) for brain connectome topological modeling, explainable biomarker discovery in neurodegenerative diseases, and continuous deep reinforcement learning for autonomous vehicles.",
    technologies: [
      "PyTorch Geometric",
      "Neo4j GDS",
      "CARLA 0.9.8",
      "TD3 / SAC / PPO",
      "fMRI Connectomics",
      "FastAPI",
    ],
    type: "education",
    current: true,
  },
  {
    year: "2023 — 2024",
    role: "Autonomous Systems & Reinforcement Learning Researcher",
    organization: "Independent Research & Open-Source Projects",
    description: "Architected the CARLA Autonomous Driving Reinforcement Learning Suite. Implemented and benchmarked 8 continuous control algorithms across 7 critical driving scenarios with multi-modal sensor fusion (Radar 500, Depth maps, and kinematics). Developed the Dopamine Control System utilizing ML relapse prediction and sensor fusion.",
    technologies: [
      "CARLA Simulator",
      "PyTorch",
      "Twin Delayed DDPG (TD3)",
      "Gymnasium",
      "Kotlin",
      "Sensor Fusion",
    ],
    type: "work",
  },
  {
    year: "2022 — 2023",
    role: "Machine Learning & Systems Developer",
    organization: "Undergraduate Research Initiatives",
    description: "Engineered high-throughput machine learning pipelines including the Network Security phishing detection suite, computer vision detectors, and institutional platforms for academic administration.",
    technologies: [
      "Python",
      "Scikit-Learn",
      "XGBoost",
      "Docker",
      "SQL",
      "REST APIs",
    ],
    type: "milestone",
  },
  {
    year: "2020 — 2024",
    role: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
    organization: "National Institute of Technology Arunachal Pradesh (NITAP)",
    description: "Completed undergraduate degree with honors. Focused on Data Structures & Algorithms, Operating Systems, Database Management Systems, Theory of Computation, and Software Engineering. Active competitive programmer on LeetCode, CodeChef, and Codeforces.",
    technologies: [
      "C++",
      "Java",
      "Python",
      "Data Structures & Algorithms",
      "Competitive Coding",
    ],
    type: "education",
  },
];
