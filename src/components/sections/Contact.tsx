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

      // Celebratory confetti burst in electric cyan, azure, emerald, and white
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.7 },
        colors: ["#00d8ff", "#38bdf8", "#10b981", "#f8fafc"],
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
      {/* Background ambient glow in electric cyan & emerald */}
      <div className="pointer-events-none absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px] -z-10" />
      <div className="pointer-events-none absolute top-1/4 left-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[130px] -z-10" />

      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-mono tracking-widest text-cyan-400 uppercase shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Direct Inquiries & Research Dialogue</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">extraordinary</span>.
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-slate-300">
            Interested in research collaborations, autonomous systems discussions, or engineering roles? Send a message below.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-stretch">
          {/* Left Column: Direct Canonical Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <TiltCard
              maxTilt={6}
              spotlightColor="rgba(0, 216, 255, 0.18)"
              className="p-8 h-full flex flex-col justify-between border border-slate-800 bg-slate-900/85 shadow-glass hover:border-cyan-500/30 hover:shadow-glass-lg transition-all"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-cyan-400" />
                  <span>Canonical Channels</span>
                </h3>
                <p className="text-xs text-slate-400 mb-8 leading-relaxed">
                  Fast response guaranteed. Feel free to connect directly via email, professional profiles, or open-source hubs.
                </p>

                {/* Channels List */}
                <div className="space-y-3.5">
                  {/* Email */}
                  <a
                    href={`mailto:${personalData.email}`}
                    className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-all hover:border-cyan-500/40 hover:bg-slate-800/80 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-slate-800 p-2.5 text-cyan-400 border border-slate-700/60 shadow-sm group-hover:border-cyan-500/40">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-slate-400">Direct Email</span>
                        <span className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                          {personalData.email}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* Hugging Face (Replaces phone number) */}
                  <a
                    href={personalData.huggingface}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-all hover:border-yellow-500/40 hover:bg-slate-800/80 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-slate-800 p-2.5 text-yellow-400 border border-slate-700/60 shadow-sm group-hover:border-yellow-500/40">
                        <HuggingFaceIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-slate-400">Hugging Face</span>
                        <span className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors">
                          huggingface.co/rohan700
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-yellow-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={personalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-all hover:border-sky-500/40 hover:bg-slate-800/80 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-slate-800 p-2.5 text-sky-400 border border-slate-700/60 shadow-sm group-hover:border-sky-500/40">
                        <Linkedin className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-slate-400">LinkedIn Profile</span>
                        <span className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">
                          in/animeshbasak03
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-sky-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* GitHub */}
                  <a
                    href={personalData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-all hover:border-cyan-500/40 hover:bg-slate-800/80 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-slate-800 p-2.5 text-cyan-400 border border-slate-700/60 shadow-sm group-hover:border-cyan-500/40">
                        <Github className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-slate-400">GitHub Repositories</span>
                        <span className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                          github.com/AnimeshBasak-14
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs font-mono text-slate-300">
                <span className="text-emerald-400 font-bold">● </span> Location: {personalData.location}
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Liquid Glass Contact Form */}
          <div className="lg:col-span-7">
            <TiltCard
              maxTilt={4}
              spotlightColor="rgba(0, 216, 255, 0.15)"
              className="p-8 sm:p-10 border border-slate-800 bg-slate-900/85 shadow-glass hover:border-cyan-500/30 hover:shadow-glass-lg transition-all"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="peer w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 pt-6 pb-2 text-sm text-white placeholder-transparent outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 shadow-sm"
                  />
                  <label
                    htmlFor="name"
                    className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-slate-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400"
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
                    className="peer w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 pt-6 pb-2 text-sm text-white placeholder-transparent outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 shadow-sm"
                  />
                  <label
                    htmlFor="email"
                    className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-slate-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400"
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
                    className="peer w-full resize-none rounded-xl border border-slate-800 bg-slate-950/70 px-4 pt-6 pb-2 text-sm text-white placeholder-transparent outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 shadow-sm"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-slate-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400"
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
                      className={`flex items-center gap-2 rounded-xl p-3.5 text-xs font-medium ${
                        state === "success"
                          ? "border border-emerald-500/30 bg-emerald-950/50 text-emerald-300 shadow-sm"
                          : "border border-rose-500/30 bg-rose-950/50 text-rose-300"
                      }`}
                    >
                      {state === "success" ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                      ) : (
                        <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                      )}
                      <span>{feedbackMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button in Cyber-Physical styling */}
                <div className="pt-2">
                  <Magnetic strength={0.3}>
                    <button
                      type="submit"
                      disabled={state === "submitting"}
                      className="relative group flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/50 bg-cyan-500 px-8 py-3.5 text-sm font-bold text-slate-950 shadow-glow-cyan transition-all duration-300 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {state === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
                          <span>Transmitting Signal...</span>
                        </>
                      ) : state === "success" ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-slate-950" />
                          <span>Transmission Dispatched</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="h-4 w-4 text-slate-950 transition-transform group-hover:translate-x-1" />
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
