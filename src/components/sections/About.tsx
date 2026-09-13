"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { personalData } from "@/data/personal";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  Brain,
  Car,
  Compass,
  GraduationCap,
  Network,
  ShieldCheck,
  Sparkles,
  Terminal,
  ExternalLink,
} from "lucide-react";

export const About: React.FC = () => {
  const researchPillars = [
    {
      icon: <Network className="h-5 w-5 text-purple-400" />,
      title: "Graph Neural Networks & Connectomics",
      desc: "Topological graph modeling of fMRI brain connectomes (AAL-116 atlas) using Neo4j Graph Data Science and hybrid GCN+GAT for neurodegenerative biomarker discovery.",
    },
    {
      icon: <Car className="h-5 w-5 text-cyan-400" />,
      title: "Continuous Deep RL & CARLA Control",
      desc: "Autonomous cyber-physical control in CARLA 0.9.8. Benchmarking TD3, SAC-Auto, PPO with multi-modal radar, depth, and kinematic sensor fusion.",
    },
    {
      icon: <Brain className="h-5 w-5 text-blue-400" />,
      title: "Neuro-Digital Behavioral Systems",
      desc: "Investigating digital habits and dopamine regulation (DCS) via real-time phone sensor fusion, accelerometer bed detection, and machine learning relapse prediction.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
      title: "Resilient Systems & Cyber Intelligence",
      desc: "MLOps pipelines for automated network threat classification, high-dimensional phishing detection, and containerized microservice serving.",
    },
  ];

  const floatingSkillTags = [
    "PyTorch Geometric", "Neo4j GDS", "CARLA 0.9.8", "TD3 / SAC / PPO",
    "GCN + GAT", "fMRI Connectomics", "GNNExplainer", "Python",
    "Kotlin & Compose", "Docker", "Gymnasium", "FastAPI"
  ];

  return (
    <section id="about" className="relative py-28 px-4 md:px-8">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-1/3 right-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-mono tracking-widest text-cyan-300 uppercase"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Research & Identity</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Decoding <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400">neural topologies</span> and physical autonomy.
          </motion.h2>
        </div>

        {/* Glass Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: Real Profile Photo & Credentials Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <TiltCard
              maxTilt={8}
              spotlightColor="rgba(56, 189, 248, 0.18)"
              className="p-8 h-full flex flex-col items-center text-center justify-center relative overflow-hidden"
            >
              {/* Photo Frame with Specular Ring and Real Photo */}
              <div className="relative mb-6">
                <div className="h-48 w-48 rounded-3xl p-1 bg-gradient-to-tr from-cyan-400 via-purple-500 to-blue-500 shadow-2xl">
                  <div className="relative h-full w-full rounded-[22px] overflow-hidden bg-[#0A0D14]">
                    <Image
                      src="/animesh-basak.jpg"
                      alt="Animesh Basak — Ph.D. Scholar at IIT Roorkee"
                      fill
                      sizes="192px"
                      priority
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Institutional Status Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap liquid-glass px-3.5 py-1 rounded-full text-[11px] font-mono text-cyan-300 border border-white/20 shadow-md">
                  IIT Roorkee · Ph.D. Scholar
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mt-4">{personalData.name}</h3>
              <p className="text-xs text-purple-300 font-mono mt-1">
                Advised by Dr. Neetish Kumar
              </p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Mehta Family School of Data Science & AI, IITR
              </p>

              {/* Research Tags */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {floatingSkillTags.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.04 * idx, duration: 0.4 }}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Coding Profiles Quick Bar */}
              <div className="mt-6 w-full pt-4 border-t border-white/10 flex items-center justify-around text-xs font-mono text-slate-400">
                <a
                  href="https://www.leetcode.com/basakanimesh16/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  LeetCode ↗
                </a>
                <a
                  href="https://www.codechef.com/users/animesh9807"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  CodeChef ↗
                </a>
                <a
                  href="https://codeforces.com/profile/Animesh_Basak"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Codeforces ↗
                </a>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Bio Narrative & Four Research Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <TiltCard
              maxTilt={6}
              spotlightColor="rgba(168, 85, 247, 0.15)"
              className="p-8 sm:p-10 flex-1 flex flex-col justify-center"
            >
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
                <GraduationCap className="h-4 w-4" />
                <span>Doctoral Research Overview</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Bridging Biological Graph Topologies & Autonomous Robotics
              </h3>
              
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {personalData.bio.map((paragraph, index) => (
                  <p key={index} className="text-slate-300/90">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Research Pillars Grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {researchPillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div className="rounded-lg bg-white/5 p-2">
                        {pillar.icon}
                      </div>
                      <h4 className="text-sm font-semibold text-white">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
