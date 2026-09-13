"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { personalData } from "@/data/personal";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  Car,
  Compass,
  GraduationCap,
  Cpu,
  Brain,
  ShieldCheck,
  FileText,
  ExternalLink,
} from "lucide-react";

export const About: React.FC = () => {
  const researchPillars = [
    {
      icon: <Car className="h-5 w-5 text-cyan-400" />,
      title: "Deep Reinforcement Learning in CARLA",
      desc: "Specialized in continuous actor-critic control (TD3, DDPG) for autonomous lane-changing, safety-critical emergency braking, and multi-modal sensor fusion in CARLA.",
    },
    {
      icon: <Brain className="h-5 w-5 text-purple-400" />,
      title: "LLMs, RAG & Conversational Systems",
      desc: "Designing low-latency retrieval-augmented generation architectures with FAISS, LangChain, and Streamlit for multi-document intelligence and conversational memory.",
    },
    {
      icon: <Cpu className="h-5 w-5 text-blue-400" />,
      title: "Production MLOps & Cloud Deployment",
      desc: "Deploying containerized machine learning services on AWS (EC2, ECR, IAM) with Docker, Flask, and automated CI/CD pipelines to ensure reproducible, cost-effective inference.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
      title: "Computer Vision & Edge Perception",
      desc: "Real-time webcam inference utilizing MediaPipe 3D hand keypoints and LSTM sequential gesture recognition developed for industrial deployment at IOCL.",
    },
  ];

  const floatingSkillTags = [
    "Python", "PyTorch", "CARLA", "TD3 / DDPG", "RAG & FAISS",
    "LangChain", "Docker", "AWS EC2", "MediaPipe", "FastAPI / Flask",
    "Scikit-learn", "Java & C++"
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
            <span>Profile & Academic Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Autonomous Intelligence, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Continuous Control</span> & Scalable AI.
          </motion.h2>
        </div>

        {/* Glass Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: Real Profile Photo & Credentials Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <TiltCard
              maxTilt={6}
              spotlightColor="rgba(56, 189, 248, 0.18)"
              className="p-8 h-full flex flex-col items-center text-center justify-center relative overflow-hidden"
            >
              {/* Photo Frame with Real Uploaded Photo */}
              <div className="relative mb-6">
                <div className="h-48 w-48 rounded-3xl p-1 bg-gradient-to-tr from-cyan-400 via-purple-500 to-blue-500 shadow-2xl">
                  <div className="relative h-full w-full rounded-[22px] overflow-hidden bg-[#0A0D14]">
                    <Image
                      src="/animesh-basak.jpg"
                      alt="Animesh Basak — Direct Ph.D. in CSE at IIT Roorkee"
                      fill
                      sizes="192px"
                      priority
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Institutional Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap liquid-glass px-3.5 py-1 rounded-full text-[11px] font-mono text-cyan-300 border border-white/20 shadow-md">
                  IIT Roorkee · Dept. of CSE
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mt-4">{personalData.name}</h3>
              <p className="text-xs text-purple-300 font-mono mt-1 font-semibold">
                Direct Ph.D. Scholar (Advisor: Dr. Neetish Kumar)
              </p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Department of Computer Science and Engineering, IITR
              </p>

              {/* Research & Tech Tags */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {floatingSkillTags.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.03 * idx, duration: 0.4 }}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Verified Profiles & External Outlets */}
              <div className="mt-6 w-full pt-4 border-t border-white/10 flex items-center justify-around text-xs font-mono text-slate-400">
                <a
                  href={personalData.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors"
                  title="LeetCode Profile (1700 Rating, 500+ Solved)"
                >
                  LeetCode ↗
                </a>
                <a
                  href={personalData.gfg}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                  title="GeeksforGeeks Profile"
                >
                  GfG ↗
                </a>
                <a
                  href={personalData.medium}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                  title="Medium Writer (20+ Articles)"
                >
                  Medium ↗
                </a>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Bio Narrative & Four Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <TiltCard
              maxTilt={4}
              spotlightColor="rgba(168, 85, 247, 0.15)"
              className="p-8 sm:p-10 flex-1 flex flex-col justify-center"
            >
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
                <GraduationCap className="h-4 w-4" />
                <span>Doctoral Research & Background</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Advancing Autonomous Systems & Continuous RL
              </h3>
              
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {personalData.bio.map((paragraph, index) => (
                  <p key={index} className="text-slate-300/90">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Four Pillars */}
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
