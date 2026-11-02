export interface PersonalInfo {
  name: string;
  tagline: string;
  title: string;
  institution: string;
  department: string;
  supervisor: string;
  advisor?: string;
  specialization: string;
  bio: string[];
  email: string;
  huggingface: string;
  linkedin: string;
  github: string;
  medium: string;
  location: string;
  status: string;
  youtubePlaylistUrl: string;
}

export const personalData: PersonalInfo = {
  name: "Animesh Basak",
  title: "Direct Ph.D. in Computer Science and Engineering",
  institution: "Indian Institute of Technology Roorkee (IIT Roorkee)",
  department: "Department of Computer Science and Engineering",
  supervisor: "Dr. Neetesh Kumar",
  advisor: "Dr. Neetesh Kumar",
  specialization: "Evidential Reinforcement Learning under Continuous POMDPs, Safe Autonomous Navigation, and Cyber-Physical Systems",
  tagline: "Evidential Reinforcement Learning under Continuous POMDPs for Safe Autonomous Navigation · Direct Ph.D. @ IIT Roorkee.",
  bio: [
    "I am pursuing a Direct Doctor of Philosophy (Ph.D.) in Computer Science and Engineering at the Indian Institute of Technology Roorkee (IIT Roorkee), working under the supervision of Dr. Neetesh Kumar in the Department of Computer Science and Engineering.",
    "My doctoral research title is 'Evidential Reinforcement Learning under Continuous POMDPs for Safe Autonomous Navigation'. I specialize in designing and training continuous control models for autonomous vehicle navigation, lane-changing, and multi-modal sensor fusion (radar, depth cameras, obstacle sensors) in the CARLA simulator under partial observability and epistemic uncertainty.",
    "Previously, I graduated with a B.Tech in Computer Science & Engineering from NIT Arunachal Pradesh (CGPA: 8.19/10). My professional trajectory includes research and engineering roles at IIT Roorkee (Google Research Mentorship Program), L&T Construction PT&D, Datafoundry, Indian Oil Corporation Limited (IOCL), and IIT Guwahati, alongside authoring 20+ technical articles on Medium."
  ],
  email: "Direct Transmission (Encrypted Relay)",
  huggingface: "https://huggingface.co/rohan700",
  linkedin: "https://linkedin.com/in/animeshbasak03/",
  github: "https://github.com/AnimeshBasak-14",
  medium: "https://medium.com/@basakanimesh16",
  location: "IIT Roorkee, Uttarakhand / South Delhi, India",
  status: "Direct Ph.D. @ IIT Roorkee (Dept. of CSE) under Dr. Neetesh Kumar",
  youtubePlaylistUrl: "https://youtube.com/playlist?list=PLNy_bKEJyhIM&si=VP8HZBgkaJzIxzbY",
};
