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
    category: "Frontend & Creative Engineering",
    description: "Building responsive, liquid-smooth user interfaces and immersive 3D graphics.",
    skills: [
      { name: "React 18 / Next.js", level: "Expert", highlight: true },
      { name: "TypeScript", level: "Expert", highlight: true },
      { name: "Tailwind CSS", level: "Expert", highlight: true },
      { name: "Three.js / React Three Fiber", level: "Advanced", highlight: true },
      { name: "GSAP & ScrollTrigger", level: "Advanced", highlight: true },
      { name: "Framer Motion", level: "Expert", highlight: true },
      { name: "HTML5 Canvas / WebGL", level: "Proficient" },
      { name: "CSS Architecture & Glassmorphism", level: "Expert" },
    ],
  },
  {
    category: "Backend & Systems",
    description: "Architecting resilient APIs, distributed services, and high-performance databases.",
    skills: [
      { name: "Node.js & Express", level: "Advanced", highlight: true },
      { name: "Next.js App Router (Server Actions & Route Handlers)", level: "Expert", highlight: true },
      { name: "REST & GraphQL APIs", level: "Advanced" },
      { name: "PostgreSQL & Prisma", level: "Advanced", highlight: true },
      { name: "Redis & Caching", level: "Proficient" },
      { name: "WebSockets & SSE", level: "Advanced" },
      { name: "Python / FastAPI", level: "Proficient" },
    ],
  },
  {
    category: "DevOps & Cloud Architecture",
    description: "Automating zero-downtime deployment pipelines and serverless infrastructure.",
    skills: [
      { name: "Vercel & Edge Functions", level: "Expert", highlight: true },
      { name: "Docker & Containerization", level: "Advanced" },
      { name: "Git & GitHub CI/CD", level: "Expert", highlight: true },
      { name: "AWS (S3, CloudFront, Lambda)", level: "Proficient" },
      { name: "Linux Administration", level: "Advanced" },
      { name: "Security & Rate Limiting", level: "Advanced" },
    ],
  },
  {
    category: "Architecture & Methodologies",
    description: "Principles and patterns governing resilient software engineering.",
    skills: [
      { name: "Micro-frontends & Monorepos", level: "Advanced" },
      { name: "Component-Driven Architecture", level: "Expert", highlight: true },
      { name: "Performance Profiling & Web Vitals", level: "Expert", highlight: true },
      { name: "Type-Driven Design", level: "Expert" },
      { name: "Accessible UI (WCAG 2.1)", level: "Advanced" },
    ],
  },
];
