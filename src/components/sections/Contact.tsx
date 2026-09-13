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
} from "lucide-react";
import confetti from "canvas-confetti";

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
        data.message || "Message dispatched successfully! Expect a reply shortly."
      );
      setFormData({ name: "", email: "", message: "", website_hp: "" });

      // Trigger celebratory confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#38bdf8", "#818cf8", "#c084fc", "#ffffff"],
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
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px] -z-10" />

      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-mono tracking-widest text-cyan-300 uppercase"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Initiate Transmission</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">extraordinary</span>.
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-slate-400">
            Have a project in mind, an engineering role, or a challenging problem? Send a direct message below.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-stretch">
          {/* Left Column: Direct Canonical Links & Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <TiltCard
              maxTilt={6}
              spotlightColor="rgba(56, 189, 248, 0.15)"
              className="p-8 h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Direct Channels
                </h3>
                <p className="text-xs text-slate-400 mb-8 leading-relaxed">
                  Fast response guaranteed. Feel free to connect directly via email, professional network, or explore my codebase.
                </p>

                {/* Canonical Links List */}
                <div className="space-y-4">
                  {/* Canonical Email */}
                  <a
                    href={`mailto:${personalData.email}`}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-cyan-500/20 p-2 text-cyan-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-slate-400">Email</span>
                        <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
                          {personalData.email}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* Canonical LinkedIn */}
                  <a
                    href={personalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-blue-400/40 hover:bg-blue-500/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-blue-500/20 p-2 text-blue-400">
                        <Linkedin className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-slate-400">LinkedIn</span>
                        <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
                          in/animeshbasak03
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-blue-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* Canonical GitHub */}
                  <a
                    href={personalData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-purple-400/40 hover:bg-purple-500/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-purple-500/20 p-2 text-purple-400">
                        <Github className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-slate-400">GitHub</span>
                        <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
                          github.com/AnimeshBasak-14
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-purple-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs font-mono text-slate-400">
                <span className="text-cyan-300">● </span> Location: {personalData.location}
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Liquid Glass Contact Form */}
          <div className="lg:col-span-7">
            <TiltCard
              maxTilt={4}
              spotlightColor="rgba(168, 85, 247, 0.15)"
              className="p-8 sm:p-10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field (hidden from human visitors) */}
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

                {/* Name Input with Floating Label */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full rounded-xl border border-white/15 bg-white/5 px-4 pt-6 pb-2 text-sm text-white placeholder-transparent backdrop-blur-md outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                  />
                  <label
                    htmlFor="name"
                    className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-slate-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400"
                  >
                    Your Name *
                  </label>
                </div>

                {/* Email Input with Floating Label */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full rounded-xl border border-white/15 bg-white/5 px-4 pt-6 pb-2 text-sm text-white placeholder-transparent backdrop-blur-md outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                  />
                  <label
                    htmlFor="email"
                    className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-slate-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400"
                  >
                    Your Email Address *
                  </label>
                </div>

                {/* Message Textarea with Floating Label */}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 pt-6 pb-2 text-sm text-white placeholder-transparent backdrop-blur-md outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-slate-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-400"
                  >
                    Project Details or Inquiry *
                  </label>
                </div>

                {/* Feedback Micro-animation Banner */}
                <AnimatePresence>
                  {feedbackMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex items-center gap-2 rounded-xl p-3.5 text-xs font-medium ${
                        state === "success"
                          ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                          : "border border-rose-500/30 bg-rose-500/10 text-rose-300"
                      }`}
                    >
                      {state === "success" ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 shrink-0" />
                      )}
                      <span>{feedbackMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animated Submit Button */}
                <div className="pt-2">
                  <Magnetic strength={0.3}>
                    <button
                      type="submit"
                      disabled={state === "submitting"}
                      className="liquid-glass specular-top relative group flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(56,189,248,0.25)] transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(56,189,248,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {state === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
                          <span>Dispatching Signal...</span>
                        </>
                      ) : state === "success" ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          <span>Transmission Sent</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="h-4 w-4 text-cyan-300 transition-transform group-hover:translate-x-1" />
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
