"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalData } from "@/data/personal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Magnetic } from "@/components/ui/Magnetic";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  Linkedin,
  Github,
  Loader2,
  Sparkles,
  ArrowUpRight,
  Terminal,
  Radio,
} from "lucide-react";
import confetti from "canvas-confetti";

// Custom Hugging Face Icon
const HuggingFaceIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3.5 7.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S7 11.83 7 11s.67-1.5 1.5-1.5zm7 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-3.5 8c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
  </svg>
);

type SubmissionState = "idle" | "submitting" | "success" | "error";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website_hp: "", // Honeypot field
  });

  const [state, setState] = useState<SubmissionState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (state === "error") {
      setState("idle");
      setFeedbackMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setFeedbackMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit message");
      }

      setState("success");
      setFeedbackMessage(
        data.message || "Message dispatched successfully! Expect a reply promptly."
      );
      setFormData({ name: "", email: "", message: "", website_hp: "" });

      // Celebratory confetti burst with cyber-physical accents
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.7 },
        colors: ["#00F0FF", "#10B981", "#FFFFFF", "#F59E0B", "#A855F7"],
      });
    } catch (err: any) {
      setState("error");
      setFeedbackMessage(
        err.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <section id="contact" className="relative py-28 px-4 md:px-8">
      {/* Background ambient glow in subtle monochrome */}
      <div className="pointer-events-none absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-cyan-500/[0.02] blur-[140px] -z-10" />
      <div className="pointer-events-none absolute top-1/4 left-10 h-80 w-80 rounded-full bg-emerald-500/[0.02] blur-[130px] -z-10" />

      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-4 py-1.5 text-xs font-mono tracking-widest text-neutral-300 uppercase shadow-sm font-bold"
          >
            <Sparkles className="h-3.5 w-3.5 text-white" />
            <span>Direct Inquiries & Research Dialogue</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Let&apos;s build something <span className="text-white">extraordinary</span>.
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-neutral-300">
            Interested in research collaborations, autonomous systems discussions, or engineering roles? Send a message below.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-stretch">
          {/* Left Column: Direct Canonical Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <TiltCard
              maxTilt={6}
              spotlightColor="rgba(255, 255, 255, 0.08)"
              className="p-8 h-full flex flex-col justify-between border border-white/10 bg-[#0B0B0B] shadow-2xl hover:border-white/30 transition-all rounded-3xl"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-cyan-400" />
                  <span>Canonical Channels</span>
                </h3>
                <p className="text-xs text-neutral-300 mb-8 leading-relaxed">
                  Fast response guaranteed. Feel free to connect directly via verified research hubs and professional networks.
                </p>

                {/* Channels List */}
                <div className="space-y-3.5">

                  {/* Hugging Face */}
                  <a
                    href={personalData.huggingface}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-[#050505] p-4 transition-all hover:border-amber-500/40 hover:bg-amber-950/20 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-[#FFD21E]/10 p-2.5 text-[#FFD21E] border border-[#FFD21E]/30 shadow-sm">
                        <HuggingFaceIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-neutral-400">Hugging Face</span>
                        <span className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                          huggingface.co/rohan700
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-amber-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={personalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-[#050505] p-4 transition-all hover:border-sky-500/40 hover:bg-sky-950/20 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-sky-500/10 p-2.5 text-sky-400 border border-sky-500/30 shadow-sm">
                        <Linkedin className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-neutral-400">LinkedIn Profile</span>
                        <span className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                          in/animeshbasak03
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-sky-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* GitHub */}
                  <a
                    href={personalData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-[#050505] p-4 transition-all hover:border-white/40 hover:bg-white/[0.06] shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-white/[0.08] p-2.5 text-white border border-white/15 shadow-sm">
                        <Github className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-neutral-400">GitHub Repositories</span>
                        <span className="text-sm font-bold text-white group-hover:text-white transition-colors">
                          github.com/AnimeshBasak-14
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-8 rounded-xl border border-white/10 bg-[#050505] p-4 text-xs font-mono text-neutral-300 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Location: {personalData.location}</span>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Liquid Glass Contact Form */}
          <div className="lg:col-span-7">
            <TiltCard
              maxTilt={4}
              spotlightColor="rgba(255, 255, 255, 0.08)"
              className="p-8 sm:p-10 border border-white/10 bg-[#0B0B0B] shadow-2xl hover:border-white/30 transition-all rounded-3xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Direct Transmission Relay Active Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-2.5 text-xs font-mono text-emerald-300">
                  <div className="flex items-center gap-2">
                    <Radio className="h-4 w-4 shrink-0 text-emerald-400 animate-pulse" />
                    <span>Direct Transmission Relay • Secure server dispatch straight to researcher inbox</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-0.5 text-[9px] font-mono text-emerald-300 font-bold tracking-wider">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    ACTIVE
                  </span>
                </div>

                {/* Honeypot field */}
                <input
                  type="text"
                  name="website_hp"
                  value={formData.website_hp}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full rounded-xl border border-white/15 bg-[#050505] px-4 pt-6 pb-2 text-sm text-white placeholder-transparent outline-none transition-all duration-300 focus:border-white focus:ring-2 focus:ring-white/20 shadow-sm"
                  />
                  <label
                    htmlFor="name"
                    className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-neutral-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-white"
                  >
                    Your Name *
                  </label>
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full rounded-xl border border-white/15 bg-[#050505] px-4 pt-6 pb-2 text-sm text-white placeholder-transparent outline-none transition-all duration-300 focus:border-white focus:ring-2 focus:ring-white/20 shadow-sm"
                  />
                  <label
                    htmlFor="email"
                    className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-neutral-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-white"
                  >
                    Your Email Address *
                  </label>
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full resize-none rounded-xl border border-white/15 bg-[#050505] px-4 pt-6 pb-2 text-sm text-white placeholder-transparent outline-none transition-all duration-300 focus:border-white focus:ring-2 focus:ring-white/20 shadow-sm"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-neutral-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-white"
                  >
                    Message or Collaboration Details *
                  </label>
                </div>

                {/* Feedback banner */}
                <AnimatePresence>
                  {feedbackMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 rounded-xl p-3.5 text-xs font-medium border border-white/20 bg-white/[0.08] text-white shadow-sm"
                    >
                      {state === "success" ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-white" />
                      ) : (
                        <AlertCircle className="h-4 w-4 shrink-0 text-white" />
                      )}
                      <span>{feedbackMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button in Stark Solid White */}
                <div className="pt-2">
                  <Magnetic strength={0.3}>
                    <button
                      type="submit"
                      disabled={state === "submitting"}
                      className="relative group flex w-full items-center justify-center gap-2 rounded-xl border border-white bg-white px-8 py-3.5 text-sm font-extrabold text-black shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {state === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-black" />
                          <span>Transmitting Signal...</span>
                        </>
                      ) : state === "success" ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-black" />
                          <span>Transmission Dispatched</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="h-4 w-4 text-black transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </Magnetic>
                </div>
              </form>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
