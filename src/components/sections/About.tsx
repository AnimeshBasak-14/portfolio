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
  Award,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const About: React.FC = () => {
  const researchPillars = [
    {
      icon: <Car className="h-5 w-5 text-cyan-400" />,
      title: "Continuous RL in CARLA Simulator",
      desc: "Specialized in continuous actor-critic algorithms (Twin Delayed DDPG - TD3, DDPG, SAC) for autonomous left-lane changing, emergency collision avoidance, and sensor fusion in CARLA.",
    },
    {
      icon: <Brain className="h-5 w-5 text-cyan-400" />,
      title: "LLMs, RAG & Conversational AI",
      desc: "Designing low-latency retrieval-augmented generation architectures with FAISS, LangChain, and Streamlit for conversational memory and multi-document research retrieval.",
    },
    {
      icon: <Cpu className="h-5 w-5 text-cyan-400" />,
      title: "Cloud MLOps & Containerization",
      desc: "Deploying containerized machine learning microservices on AWS (EC2, ECR, IAM) with Docker, Flask, and automated CI/CD pipelines to ensure reproducible, cost-effective inference.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-cyan-400" />,
      title: "Computer Vision & Edge Perception",
      desc: "Real-time webcam inference utilizing MediaPipe 3D hand keypoints and LSTM sequential gesture classification developed for industrial deployment at IOCL (99% accuracy).",
    },
  ];

  const floatingSkillTags = [
    "Python", "PyTorch", "CARLA", "TD3 / DDPG", "RAG & FAISS",
    "LangChain", "Docker", "AWS EC2", "MediaPipe", "FastAPI / Flask",
    "Scikit-learn", "Java & C++"
  ];

  return (
    <section id="about" className="relative py-28 px-4 md:px-8">
      {/* Background ambient glow in electric cyan & emerald */}
      <div className="pointer-events-none absolute top-1/3 right-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px] -z-10" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[130px] -z-10" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold"
          >
            <Compass className="h-3.5 w-3.5 text-cyan-400" />
            <span>Profile & Doctoral Research</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Autonomous Intelligence, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">Continuous Control</span> & Scalable AI.
          </motion.h2>
        </div>

        {/* Glass Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: Real Profile Photo & Credentials Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <TiltCard
              maxTilt={6}
              spotlightColor="rgba(0, 216, 255, 0.18)"
              className="p-8 h-full flex flex-col items-center text-center justify-center relative overflow-hidden bg-slate-900/85 border border-slate-800 shadow-glass hover:border-cyan-500/30"
            >
              {/* Photo Frame with Real Photo */}
              <div className="relative mb-6">
                <div className="h-48 w-48 rounded-3xl p-1 bg-gradient-to-tr from-cyan-500 via-sky-400 to-emerald-500 shadow-xl shadow-cyan-500/10">
                  <div className="relative h-full w-full rounded-[22px] overflow-hidden bg-slate-950">
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
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap liquid-glass px-3.5 py-1 rounded-full text-[11px] font-mono text-cyan-300 border border-cyan-500/30 shadow-md font-semibold bg-slate-950/95">
                  IIT Roorkee · Dept. of CSE
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mt-4">{personalData.name}</h3>
              <p className="text-xs text-emerald-400 font-mono mt-1 font-bold">
                Direct Ph.D. Scholar (Supervisor: Dr. Neetish Kumar)
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
                    className="rounded-full border border-slate-800 bg-slate-950/60 px-3 py-1 text-xs font-semibold text-slate-300 transition-colors hover:border-cyan-500/40 hover:text-cyan-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Verified Profiles */}
              <div className="mt-6 w-full pt-4 border-t border-slate-800 flex items-center justify-around text-xs font-mono text-slate-400 font-semibold">
                <a
                  href={personalData.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                  title="LeetCode Profile (1700 Rating, 500+ Solved)"
                >
                  LeetCode ↗
                </a>
                <a
                  href={personalData.huggingface}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-yellow-400 transition-colors"
                  title="Hugging Face Profile (rohan700)"
                >
                  Hugging Face ↗
                </a>
                <a
                  href={personalData.gfg}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors"
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

          {/* Right Column: Bio Narrative, Isolated Key Metrics & Research Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <TiltCard
              maxTilt={4}
              spotlightColor="rgba(0, 216, 255, 0.15)"
              className="p-8 sm:p-10 flex-1 flex flex-col justify-center bg-slate-900/85 border border-slate-800 shadow-glass hover:border-cyan-500/30"
            >
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                <GraduationCap className="h-4 w-4 text-cyan-400" />
                <span>Doctoral Research & Academic Background</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Advancing Autonomous Vehicles & Continuous Reinforcement Learning
              </h3>
              
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {personalData.bio.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Bold Isolated Quantitative Stat Blocks Directly Above/Beside Focus Area */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-cyan-500/30 bg-slate-950/70 p-4 text-center">
                  <div className="text-2xl font-black text-cyan-400 tracking-tight font-mono">
                    +577.7%
                  </div>
                  <div className="mt-1 text-[11px] font-mono text-slate-400 font-medium leading-tight">
                    Reward Gain (TD3 vs DDPG)
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-500/30 bg-slate-950/70 p-4 text-center">
                  <div className="text-2xl font-black text-emerald-400 tracking-tight font-mono">
                    85%+
                  </div>
                  <div className="mt-1 text-[11px] font-mono text-slate-400 font-medium leading-tight">
                    Lane-Change Success Rate
                  </div>
                </div>

                <div className="rounded-xl border border-sky-500/30 bg-slate-950/70 p-4 text-center">
                  <div className="text-2xl font-black text-sky-400 tracking-tight font-mono">
                    958.5%
                  </div>
                  <div className="mt-1 text-[11px] font-mono text-slate-400 font-medium leading-tight">
                    Lower Actor Loss
                  </div>
                </div>

                <div className="rounded-xl border border-cyan-500/30 bg-slate-950/70 p-4 text-center">
                  <div className="text-2xl font-black text-cyan-300 tracking-tight font-mono">
                    -20%
                  </div>
                  <div className="mt-1 text-[11px] font-mono text-slate-400 font-medium leading-tight">
                    Maneuver Latency
                  </div>
                </div>
              </div>

              {/* Prominent Doctoral Research Spotlight Callout */}
              <div className="mt-6 rounded-2xl border border-cyan-500/30 bg-slate-950/70 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-cyan-400" />
                  <span className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    Core Doctoral Research Focus (Supervisor: Dr. Neetish Kumar)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Investigating continuous control algorithms (TD3 vs. DDPG) in the CARLA autonomous driving simulator with multi-modal sensor fusion (radar, depth perception, obstacle proximity). Benchmarked policies achieved a <strong className="text-cyan-400 font-semibold">+577.7% improvement in average episode reward</strong>, <strong className="text-emerald-400 font-semibold">85%+ lane-change success rate</strong> over 5,000+ simulation episodes, and reduced maneuver execution duration by 20%.
                </p>
              </div>

              {/* Four Pillars */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {researchPillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-800/50"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div className="rounded-lg bg-cyan-950/60 border border-cyan-500/30 p-2">
                        {pillar.icon}
                      </div>
                      <h4 className="text-sm font-bold text-white">
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
