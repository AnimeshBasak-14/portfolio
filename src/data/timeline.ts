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
    role: "Full-Stack Software Engineer & Creative Developer",
    organization: "Independent & Open Source",
    description: "Architecting interactive cloud-native web applications, building high-throughput API microservices, and crafting sensory-rich web experiences combining React Three Fiber, GSAP, and Tailwind CSS.",
    technologies: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS", "Resend", "PostgreSQL"],
    type: "work",
    current: true,
  },
  {
    year: "2023 — 2024",
    role: "Frontend Systems Developer",
    organization: "Distributed Tech Projects",
    description: "Spearheaded design system modernization, engineered reusable component libraries with strict accessibility standards, and reduced client bundle sizes by 38% through aggressive code-splitting and dynamic asset loading.",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "Node.js", "WebSockets"],
    type: "work",
  },
  {
    year: "2022 — 2023",
    role: "Full-Stack Engineering & Cloud Specialization",
    organization: "Technical Research & Prototyping",
    description: "Built scalable backend services, implemented real-time communication protocols with WebSockets, and designed relational databases with automated migration pipelines.",
    technologies: ["TypeScript", "Express.js", "Docker", "PostgreSQL", "Redis"],
    type: "milestone",
  },
  {
    year: "2020 — 2024",
    role: "Bachelor of Technology in Computer Science",
    organization: "University",
    description: "Graduated with honors. In-depth studies in Data Structures & Algorithms, Distributed Systems, Database Management Systems, Object-Oriented Design, and Computer Graphics.",
    technologies: ["C++", "Java", "Python", "SQL", "Computer Networks"],
    type: "education",
  },
];
