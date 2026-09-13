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
      icon: <Car className="h-5 w-5 text-[#C9C9C9]" />,
      title: "Continuous RL in CARLA Simulator",
      desc: "Specialized in continuous actor-critic algorithms (Twin Delayed DDPG - TD3, DDPG, SAC) for autonomous left-lane changing, emergency collision avoidance, and sensor fusion in CARLA.",
    },
    {
      icon: <Brain className="h-5 w-5 text-[#C9C9C9]" />,
      title: "LLMs, RAG & Conversational AI",
      desc: "Designing low-latency retrieval-augmented generation architectures with FAISS, LangChain, and Streamlit for conversational memory and multi-document research retrieval.",
    },
    {
      icon: <Cpu className="h-5 w-5 text-[#C9C9C9]" />,
      title: "Cloud MLOps & Containerization",
      desc: "Deploying containerized machine learning microservices on AWS (EC2, ECR, IAM) with Docker, Flask, and automated CI/CD pipelines to ensure reproducible, cost-effective inference.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-[#C9C9C9]" />,
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
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-mono tracking-widest text-[#C9C9C9] uppercase font-semibold"
          >
            <Compass className="h-3.5 w-3.5 text-[#C9C9C9]" />
            <span>Profile & Doctoral Research</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight text-[#F2F2ED] sm:text-4xl md:text-5xl"
          >
            Autonomous Intelligence, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2F2ED] via-[#D4D4D4] to-[#9A9A9A]">Continuous Control</span> & Scalable AI.
          </motion.h2>
        </div>

        {/* Glass Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: Real Profile Photo & Credentials Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <TiltCard
              maxTilt={6}
              spotlightColor="rgba(255, 255, 255, 0.08)"
              className="p-8 h-full flex flex-col items-center text-center justify-center relative overflow-hidden bg-[#141414] border border-white/[0.08] shadow-glass hover:border-white/20"
            >
              {/* Photo Frame with Real Photo */}
              <div className="relative mb-6">
                <div className="h-48 w-48 rounded-3xl p-1 bg-gradient-to-tr from-[#333333] via-[#555555] to-[#222222] shadow-xl">
                  <div className="relative h-full w-full rounded-[22px] overflow-hidden bg-[#0A0A0A]">
                    <Image
                      src="/animesh-basak.jpg"
                      alt="Animesh Basak — Direct Ph.D. in CSE at IIT Roorkee"
                      fill
                      sizes="192px"
                      priority
                      className="object-cover object-top hover:scale-105 transition-transform duration-500 grayscale contrast-105"
                    />
                  </div>
                </div>

                {/* Institutional Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap liquid-glass px-3.5 py-1 rounded-full text-[11px] font-mono text-[#F2F2ED] border border-white/10 shadow-md font-semibold bg-[#141414]">
                  IIT Roorkee · Dept. of CSE
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#F2F2ED] mt-4">{personalData.name}</h3>
              <p className="text-xs text-[#C9C9C9] font-mono mt-1 font-semibold">
                Direct Ph.D. Scholar (Supervisor: Dr. Neetesh Kumar)
              </p>
              <p className="text-xs text-[#9A9A9A] font-mono mt-0.5">
                Department of Computer Science and Engineering, IITR
              </p>

              {/* Research & Tech Tags */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {floatingSkillTags.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 1, scale: 1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.02 * idx, duration: 0.3 }}
                    className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-xs font-semibold text-[#9A9A9A] transition-colors hover:border-white/20 hover:text-[#F2F2ED]"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Verified Profiles */}
              <div className="mt-6 w-full pt-4 border-t border-white/[0.08] flex items-center justify-around text-xs font-mono text-[#9A9A9A] font-semibold">
                <a
                  href={personalData.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F2F2ED] transition-colors"
                  title="LeetCode Profile (1700 Rating, 500+ Solved)"
                >
                  LeetCode ↗
                </a>
                <a
                  href={personalData.huggingface}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F2F2ED] transition-colors"
                  title="Hugging Face Profile (rohan700)"
                >
                  Hugging Face ↗
                </a>
                <a
                  href={personalData.gfg}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F2F2ED] transition-colors"
                  title="GeeksforGeeks Profile"
                >
                  GfG ↗
                </a>
                <a
                  href={personalData.medium}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F2F2ED] transition-colors"
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
              spotlightColor="rgba(255, 255, 255, 0.08)"
              className="p-8 sm:p-10 flex-1 flex flex-col justify-center bg-[#141414] border border-white/[0.08] shadow-glass hover:border-white/20"
            >
              <div className="flex items-center gap-2 text-[#C9C9C9] text-xs font-mono uppercase tracking-wider mb-2 font-bold">
                <GraduationCap className="h-4 w-4 text-[#C9C9C9]" />
                <span>Doctoral Research & Academic Background</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F2F2ED] mb-4">
                Advancing Autonomous Vehicles & Continuous Reinforcement Learning
              </h3>
              
              <div className="space-y-4 text-[#9A9A9A] text-sm sm:text-base leading-relaxed">
                {personalData.bio.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Bold Isolated Quantitative Stat Blocks Directly Above/Beside Focus Area */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
                  <div className="text-2xl font-black text-[#F2F2ED] tracking-tight font-mono">
                    +577.7%
                  </div>
                  <div className="mt-1 text-[11px] font-mono text-[#9A9A9A] font-medium leading-tight">
                    Reward Gain (TD3 vs DDPG)
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
                  <div className="text-2xl font-black text-[#F2F2ED] tracking-tight font-mono">
                    85%+
                  </div>
                  <div className="mt-1 text-[11px] font-mono text-[#9A9A9A] font-medium leading-tight">
                    Lane-Change Success Rate
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
                  <div className="text-2xl font-black text-[#F2F2ED] tracking-tight font-mono">
                    958.5%
                  </div>
                  <div className="mt-1 text-[11px] font-mono text-[#9A9A9A] font-medium leading-tight">
                    Lower Actor Loss
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
                  <div className="text-2xl font-black text-[#F2F2ED] tracking-tight font-mono">
                    -20%
                  </div>
                  <div className="mt-1 text-[11px] font-mono text-[#9A9A9A] font-medium leading-tight">
                    Maneuver Latency
                  </div>
                </div>
              </div>

              {/* Prominent Doctoral Research Spotlight Callout */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-[#C9C9C9]" />
                  <span className="font-mono text-xs font-bold text-[#F2F2ED] uppercase tracking-wider">
                    Core Doctoral Research Focus (Supervisor: Dr. Neetesh Kumar)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#9A9A9A] leading-relaxed">
                  Investigating continuous control algorithms (TD3 vs. DDPG) in the CARLA autonomous driving simulator with multi-modal sensor fusion (radar, depth perception, obstacle proximity). Benchmarked policies achieved a <strong className="text-[#F2F2ED] font-semibold">+577.7% improvement in average episode reward</strong>, <strong className="text-[#F2F2ED] font-semibold">85%+ lane-change success rate</strong> over 5,000+ simulation episodes, and reduced maneuver execution duration by 20%.
                </p>
              </div>

              {/* Four Pillars */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {researchPillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div className="rounded-lg bg-white/[0.05] border border-white/10 p-2">
                        {pillar.icon}
                      </div>
                      <h4 className="text-sm font-bold text-[#F2F2ED]">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#9A9A9A] leading-relaxed">
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
