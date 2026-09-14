export interface TimelineEvent {
  year: string;
  role: string;
  organization: string;
  location?: string;
  description: string;
  technologies: string[];
  certificateUrl?: string;
  type: "work" | "education" | "research";
  current?: boolean;
}

export const timelineData: TimelineEvent[] = [
  {
    year: "July 2026 — Present",
    role: "Direct Ph.D. in Computer Science and Engineering",
    organization: "Indian Institute of Technology Roorkee (IIT Roorkee)",
    location: "Roorkee, Uttarakhand",
    description: "Pursuing doctoral research under the supervision of Dr. Neetesh Kumar in the Department of Computer Science and Engineering. Specializing in Artificial Intelligence, Deep Reinforcement Learning, and Autonomous Vehicles.",
    technologies: [
      "Reinforcement Learning",
      "CARLA Simulator",
      "TD3 / DDPG",
      "Autonomous Vehicles",
      "Sensor Fusion",
      "PyTorch",
    ],
    type: "education",
    current: true,
  },
  {
    year: "June 2025 — Jan 2026",
    role: "Graduate Engineer Trainee – QA Team",
    organization: "L&T Construction — PT&D IC",
    location: "Indore, Madhya Pradesh",
    description: "Executed deployment of products and digital energy solutions in the Power Transmission & Distribution unit. Streamlined deployment processes, implementing CI/CD pipelines, automation tools, and QA frameworks to ensure seamless project rollouts.",
    technologies: [
      "QA Frameworks",
      "CI/CD Pipelines",
      "Jenkins",
      "Sonarqube",
      "Automation",
    ],
    type: "work",
  },
  {
    year: "Dec 2024 — Mar 2025",
    role: "Machine Learning Engineer Intern",
    organization: "Datafoundry",
    location: "Bengaluru, Karnataka",
    description: "Engineered and optimized AI solutions, including LLM deployment pipelines, performance tuning, and Explainable AI (XAI) to improve model transparency. Automated data workflows in Python, cutting manual effort by 30% and reducing inference latency by 18%.",
    technologies: [
      "LLM Deployment",
      "Explainable AI (XAI)",
      "Python Workflows",
      "Model Optimization",
    ],
    certificateUrl: "https://drive.google.com/file/d/17IaQi9EciAaroqY8qEtyG8GGh-5yjOTV/view?usp=sharing",
    type: "work",
  },
  {
    year: "Jan 2024 — June 2024",
    role: "Google Research RL Intern",
    organization: "Indian Institute of Technology Roorkee (IIT Roorkee)",
    location: "Roorkee, Uttarakhand",
    description: "Designed and trained deep reinforcement learning models enabling autonomous lane-changing in CARLA, achieving an 85%+ success rate over 5,000+ simulations and 20% faster execution. Upgraded the RL framework from DDPG to TD3, improving training stability by 25%, boosting cumulative rewards by 10%, and cutting training time by 15%.",
    technologies: [
      "CARLA Simulator",
      "Twin Delayed DDPG (TD3)",
      "DDPG",
      "PyTorch",
      "Sensor Fusion",
    ],
    certificateUrl: "https://drive.google.com/file/d/1qKYa1k7J43_SlgI0YeybKruXTh_WqBZZ/view?usp=drive_link",
    type: "research",
  },
  {
    year: "Jan 2024 — Feb 2024",
    role: "Machine Learning Intern",
    organization: "Indian Oil Corporation Limited (IOCL)",
    location: "Digboi, Assam",
    description: "Developed a real-time sign language recognition system using LSTM neural networks, achieving 99% accuracy for live gesture classification via webcam in production. Integrated MediaPipe for hand keypoint extraction, increasing processing speed by 25% compared to TensorFlow methods.",
    technologies: [
      "MediaPipe",
      "LSTM",
      "Computer Vision",
      "OpenCV",
      "Python",
    ],
    certificateUrl: "https://drive.google.com/file/d/1in79FJbNS_-q_D2LmV4ZjrHp9aD2FfFn/view",
    type: "work",
  },
  {
    year: "Dec 2023 — Jan 2024",
    role: "Research Intern",
    organization: "Indian Institute of Technology Guwahati (IIT Guwahati)",
    location: "Guwahati, Assam",
    description: "Executed structured analysis protocols for the Conformance Constraint Discovery project, enhancing detection of data non-conformance by 40%. Synthesized low-variance projections to develop robust conformance constraints, achieving a 30% reduction in false positives for unsafe tuple identification.",
    technologies: [
      "Data Conformance",
      "Statistical Analysis",
      "Tuple Identification",
      "Python",
    ],
    certificateUrl: "https://drive.google.com/file/d/1PSKcm_dN4U56aKE1h_Ee4OLiHiPeJyWA/view",
    type: "research",
  },
  {
    year: "Oct 2021 — May 2025",
    role: "Bachelor of Technology in Computer Science & Engineering",
    organization: "National Institute of Technology Arunachal Pradesh (NITAP)",
    location: "Itanagar, Arunachal Pradesh",
    description: "Graduated with a CGPA of 8.19 / 10. Completed rigorous foundational coursework in Algorithms, Operating Systems, Database Management, and Artificial Intelligence.",
    technologies: [
      "C / C++",
      "Java",
      "Python",
      "Data Structures & Algorithms",
      "DBMS",
    ],
    type: "education",
  },
  {
    year: "Aug 2018 — May 2020",
    role: "Senior Secondary Education (Class 12 - Science)",
    organization: "Kendriya Vidyalaya No. 2 Itanagar",
    location: "Itanagar, Arunachal Pradesh",
    description: "Graduated with 91.8% in CBSE Board Examination. Ranked 1st in school (School Rank 1) and placed within the National Top 10% percentile.",
    technologies: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
    type: "education",
  },
];
