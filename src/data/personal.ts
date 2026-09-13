export interface PersonalInfo {
  name: string;
  tagline: string;
  title: string;
  institution: string;
  advisor: string;
  bio: string[];
  email: string;
  linkedin: string;
  github: string;
  location: string;
  status: string;
  driveUrl: string;
  youtubePlaylistUrl: string;
}

export const personalData: PersonalInfo = {
  name: "Animesh Basak",
  title: "Ph.D. Research Scholar in AI & Autonomous Systems",
  institution: "Indian Institute of Technology Roorkee (IITR)",
  advisor: "Dr. Neetish Kumar",
  tagline: "Pioneering Graph Neural Networks for Brain Connectomics and Deep Reinforcement Learning for Autonomous Cyber-Physical Systems.",
  bio: [
    "I am a Ph.D. Research Scholar at the Indian Institute of Technology Roorkee (IIT Roorkee), working under the supervision of Dr. Neetish Kumar in the Mehta Family School of Data Science and Artificial Intelligence (MFSDSAI).",
    "My research investigates the convergence of Geometric Deep Learning (Graph Neural Networks) and Continuous Deep Reinforcement Learning. I specialize in modeling complex relational topologies—from fMRI brain connectomes for early neurodegenerative biomarker discovery (Neuro-Neo4j) to robust multi-modal perception and control for autonomous vehicles in the CARLA simulator (TD3-RCO).",
    "Prior to my doctoral studies, I graduated with a Bachelor of Technology (B.Tech) in Computer Science & Engineering from the National Institute of Technology Arunachal Pradesh (NITAP). I am deeply passionate about building transparent, physics-grounded AI architectures that bridge biological neural networks with autonomous robotics."
  ],
  email: "basakanimesh49@gmail.com",
  linkedin: "https://linkedin.com/in/animeshbasak03/?skipRedirect=true",
  github: "https://github.com/AnimeshBasak-14",
  location: "IIT Roorkee, Uttarakhand, India",
  status: "Ph.D. Scholar @ IIT Roorkee under Dr. Neetish Kumar",
  driveUrl: "https://drive.google.com/drive/folders/1qji_Hst-NsBfZy-zAt3dG4JcmXceFPLc?usp=sharing",
  youtubePlaylistUrl: "https://youtube.com/playlist?list=PLNy_bKEJyhIM&si=VP8HZBgkaJzIxzbY",
};
