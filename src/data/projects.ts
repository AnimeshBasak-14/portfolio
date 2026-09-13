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
    id: "autonomous-lane-changing-carla",
    title: "Autonomous Lane Changing Using Reinforcement Learning",
    subtitle: "Continuous Control & Multi-Modal Perception in CARLA",
    description: "Deep reinforcement learning framework enabling autonomous left-lane changing and collision avoidance in the CARLA simulator, comparing DDPG and TD3 with sensor fusion.",
    longDescription: "Investigated the challenge of performing safe and efficient lane changes in autonomous vehicles, addressing instability and overestimation in continuous actor-critic algorithms. Implemented and compared DDPG and TD3 in the CARLA simulator with multi-modal sensor fusion (radar, depth cameras, and obstacle sensors). TD3 achieved a 577.7% improvement in average episode reward (1277.3 vs. -267.4 for DDPG), 958.5% lower actor loss, 85%+ success rate over 5,000+ simulations, and reduced maneuver execution time by 20%.",
    tags: ["CARLA", "PyTorch", "TD3", "DDPG", "Sensor Fusion", "Reinforcement Learning", "Gymnasium"],
    githubUrl: "https://github.com/AnimeshBasak-14/carla-autonomous-driving-rl",
    liveUrl: "https://youtube.com/playlist?list=PLNy_bKEJyhIM&si=VP8HZBgkaJzIxzbY",
    videoUrl: "https://www.youtube.com/embed/W_Zf6kfbKO4?list=PLNy_bKEJyhIM",
    certificateUrl: "https://drive.google.com/file/d/1qKYa1k7J43_SlgI0YeybKruXTh_WqBZZ/view?usp=drive_link",
    featured: true,
    accentColor: "from-cyan-500/25 via-blue-600/20 to-indigo-600/25",
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
    id: "student-performance-prediction-aws",
    title: "Student Performance Prediction System",
    subtitle: "Production ML Deployment on AWS EC2 & Docker",
    description: "End-to-end real-time machine learning prediction pipeline deployed on AWS infrastructure to identify students needing academic intervention.",
    longDescription: "Engineered a production-ready machine learning system utilizing academic and socio-economic parameters to predict performance and detect at-risk students. Containerized with Docker and served via Flask on AWS EC2, leveraging Amazon ECR and IAM policies. Achieved 87.76% prediction accuracy while reducing infrastructure deployment costs by 40%.",
    tags: ["AWS (EC2, ECR)", "Docker", "Flask", "Scikit-Learn", "Python", "CI/CD"],
    githubUrl: "https://github.com/AnimeshBasak-14/MLProjects",
    liveUrl: "https://github.com/AnimeshBasak-14/MLProjects",
    featured: true,
    accentColor: "from-blue-500/25 via-indigo-600/20 to-purple-600/25",
    metrics: [
      { label: "Accuracy", value: "87.76%" },
      { label: "Cost Reduced", value: "40%" },
      { label: "Deployment", value: "AWS EC2 + Docker" },
    ],
    keyFeatures: [
      "Real-time prediction web interface with automated validation",
      "Scalable containerized deployment on AWS EC2 via Amazon ECR",
      "Automated feature engineering and model serialization pipeline",
      "Role-based security configuration with AWS IAM",
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
    liveUrl: "https://github.com/AnimeshBasak-14/ChatWithPDF-RAG",
    featured: true,
    accentColor: "from-purple-500/25 via-pink-600/20 to-cyan-600/25",
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
  {
    id: "enhanced-qa-chatbot-openai",
    title: "Enhanced Q&A Chatbot with OpenAI",
    subtitle: "Context-Aware Conversational Intelligence & RAG",
    description: "Scalable conversational assistant leveraging OpenAI models and LangChain with custom RAG strategies for accurate, low-latency responses.",
    longDescription: "Architected a conversational assistant designed for real-time Q&A. Benchmarked workflow metrics demonstrated a 1.28s median (P50) response latency, 6.18s 99th percentile (P99) latency, 0% API error rate, and an average token footprint of 553 tokens per interaction.",
    tags: ["OpenAI", "LangChain", "LLMs", "Streamlit", "Prompt Engineering"],
    githubUrl: "https://github.com/AnimeshBasak-14/Enhanced-Q-A-Chatbot-with-OpenAI",
    liveUrl: "https://github.com/AnimeshBasak-14/Enhanced-Q-A-Chatbot-with-OpenAI",
    featured: false,
    accentColor: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    metrics: [
      { label: "P50 Latency", value: "1.28s" },
      { label: "API Errors", value: "0.0%" },
      { label: "Median Tokens", value: "149" },
    ],
    keyFeatures: [
      "Adaptive prompt engineering strategies for hallucination reduction",
      "Dynamic token management and conversational context buffering",
      "Modular LLM orchestration built on LangChain primitives",
      "Responsive Streamlit frontend for multi-turn dialogue",
    ],
  },
  {
    id: "sign-sense-recognition",
    title: "SignSense: Real-Time Sign Language Recognition",
    subtitle: "Computer Vision & LSTM Gesture Classification (IOCL)",
    description: "Production computer vision system extracting MediaPipe hand keypoints and classifying gestures via LSTM neural networks with 99% accuracy.",
    longDescription: "Developed during engineering internship at Indian Oil Corporation Limited (IOCL). Extracted 21 3D hand keypoints from live webcam feeds using Google MediaPipe and classified sequential gestures with an LSTM recurrent neural network. Boosted inference speed by 25% compared to legacy TensorFlow approaches while ensuring robustness across diverse lighting conditions.",
    tags: ["MediaPipe", "LSTM", "OpenCV", "TensorFlow", "Python", "Computer Vision"],
    githubUrl: "https://github.com/AnimeshBasak-14/SignSense",
    liveUrl: "https://github.com/AnimeshBasak-14/SignSense",
    certificateUrl: "https://drive.google.com/file/d/1in79FJbNS_-q_D2LmV4ZjrHp9aD2FfFn/view",
    featured: false,
    accentColor: "from-amber-500/20 via-orange-500/20 to-red-500/20",
    metrics: [
      { label: "Accuracy", value: "99.0%" },
      { label: "Speed Gain", value: "+25%" },
      { label: "Inference", value: "Real-time Live" },
    ],
    keyFeatures: [
      "Real-time webcam video stream processing with MediaPipe landmarks",
      "Temporal sequential gesture classification with LSTM deep learning architecture",
      "Extensive affine data augmentation ensuring high generalization",
      "Evaluated across precision, recall, and F1-score in production deployment",
    ],
  },
  {
    id: "network-security-phishing",
    title: "Network Security Phishing Detection",
    subtitle: "High-Dimensional Cyber Threat Classification",
    description: "Automated machine learning classification system analyzing high-dimensional network features to accurately identify phishing attacks.",
    longDescription: "Engineered a robust threat detection pipeline extracting lexical, statistical, and domain security attributes. Integrated ensemble classifiers (XGBoost, Random Forest) with an automated training, validation, and containerized Docker serving architecture.",
    tags: ["Python", "Scikit-Learn", "XGBoost", "Docker", "MLOps", "Flask"],
    githubUrl: "https://github.com/AnimeshBasak-14/NetworkSecurity",
    liveUrl: "https://github.com/AnimeshBasak-14/NetworkSecurity",
    featured: false,
    accentColor: "from-rose-500/20 via-pink-500/20 to-purple-500/20",
    metrics: [
      { label: "Accuracy", value: "98.7%" },
      { label: "Latency", value: "< 5ms" },
      { label: "Packaging", value: "Docker" },
    ],
    keyFeatures: [
      "Automated feature extraction on URL lexical structure and host metadata",
      "Ensemble gradient boosting with stratified cross-validation tuning",
      "Production-ready Docker containerization with REST API interface",
      "Designed for integration into enterprise security gateway workflows",
    ],
  },
];
