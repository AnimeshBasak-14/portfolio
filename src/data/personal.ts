export interface PersonalInfo {
  name: string;
  tagline: string;
  title: string;
  bio: string[];
  email: string;
  linkedin: string;
  github: string;
  location: string;
  status: string;
}

export const personalData: PersonalInfo = {
  name: "Animesh Basak",
  title: "Full-Stack Software Engineer & Creative Developer",
  tagline: "Crafting fluid digital experiences, resilient architectures, and modern web applications.",
  bio: [
    "I am a software engineer driven by the intersection of elegant UI design, distributed systems, and real-time computing.",
    "Specializing in modern web applications, interactive 3D interfaces, and resilient cloud backends. Constantly experimenting with modern frontend physics, generative interfaces, and high-throughput microservices.",
    "Passionate about open-source collaboration, minimalist human-computer interactions, and building software that feels alive."
  ],
  email: "basakanimesh49@gmail.com",
  linkedin: "https://linkedin.com/in/animeshbasak03/?skipRedirect=true",
  github: "https://github.com/AnimeshBasak-14",
  location: "India / Remote",
  status: "Available for high-impact opportunities",
};
