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
  Phone,
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
        data.message || "Message dispatched successfully! Expect a reply promptly."
      );
      setFormData({ name: "", email: "", message: "", website_hp: "" });

      // Celebratory confetti burst in warm cream and sage tones
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#f5f5d5", "#c7b793", "#a3b68a", "#5c724a"],
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
      {/* Background ambient glow in forest tone */}
      <div className="pointer-events-none absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-palette-forest/20 blur-[130px] -z-10" />

      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-palette-sand/30 bg-palette-forest/30 px-4 py-1 text-xs font-mono tracking-widest text-palette-cream uppercase"
          >
            <Sparkles className="h-3.5 w-3.5 text-palette-sage" />
            <span>Direct Inquiries & Research Dialogue</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold tracking-tight text-palette-cream sm:text-4xl md:text-5xl"
          >
            Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-palette-cream via-palette-sand to-palette-sage">extraordinary</span>.
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-palette-sand/90">
            Interested in research collaborations, autonomous systems discussions, or engineering roles? Send a message below.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-stretch">
          {/* Left Column: Direct Canonical Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <TiltCard
              maxTilt={6}
              spotlightColor="rgba(163, 182, 138, 0.2)"
              className="p-8 h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-palette-cream mb-2">
                  Direct Channels
                </h3>
                <p className="text-xs text-palette-sand/80 mb-8 leading-relaxed">
                  Fast response guaranteed. Feel free to connect directly via email, phone, or professional networks.
                </p>

                {/* Channels List */}
                <div className="space-y-4">
                  {/* Email */}
                  <a
                    href={`mailto:${personalData.email}`}
                    className="group flex items-center justify-between rounded-xl border border-palette-sand/20 bg-palette-forest/20 p-4 transition-all hover:border-palette-sand/40 hover:bg-palette-forest/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-palette-forest/60 p-2 text-palette-cream border border-palette-sand/20">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-palette-sand">Email</span>
                        <span className="text-sm font-semibold text-palette-cream group-hover:text-palette-sage">
                          {personalData.email}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-palette-sand group-hover:text-palette-cream transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${personalData.phone.replace(/\s+/g, "")}`}
                    className="group flex items-center justify-between rounded-xl border border-palette-sand/20 bg-palette-forest/20 p-4 transition-all hover:border-palette-sand/40 hover:bg-palette-forest/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-palette-forest/60 p-2 text-palette-cream border border-palette-sand/20">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-palette-sand">Phone</span>
                        <span className="text-sm font-semibold text-palette-cream group-hover:text-palette-sage">
                          {personalData.phone}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-palette-sand group-hover:text-palette-cream transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={personalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-palette-sand/20 bg-palette-forest/20 p-4 transition-all hover:border-palette-sand/40 hover:bg-palette-forest/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-palette-forest/60 p-2 text-palette-cream border border-palette-sand/20">
                        <Linkedin className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-palette-sand">LinkedIn</span>
                        <span className="text-sm font-semibold text-palette-cream group-hover:text-palette-sage">
                          in/animeshbasak03
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-palette-sand group-hover:text-palette-cream transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* GitHub */}
                  <a
                    href={personalData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-palette-sand/20 bg-palette-forest/20 p-4 transition-all hover:border-palette-sand/40 hover:bg-palette-forest/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-palette-forest/60 p-2 text-palette-cream border border-palette-sand/20">
                        <Github className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-palette-sand">GitHub</span>
                        <span className="text-sm font-semibold text-palette-cream group-hover:text-palette-sage">
                          github.com/AnimeshBasak-14
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-palette-sand group-hover:text-palette-cream transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-8 rounded-xl border border-palette-sand/20 bg-palette-forest/15 p-4 text-xs font-mono text-palette-sand">
                <span className="text-palette-sage">● </span> Location: {personalData.location}
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Liquid Glass Contact Form */}
          <div className="lg:col-span-7">
            <TiltCard
              maxTilt={4}
              spotlightColor="rgba(199, 183, 147, 0.2)"
              className="p-8 sm:p-10"
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
                    className="peer w-full rounded-xl border border-palette-sand/25 bg-palette-forest/20 px-4 pt-6 pb-2 text-sm text-palette-cream placeholder-transparent backdrop-blur-md outline-none transition-all duration-300 focus:border-palette-cream focus:bg-palette-forest/35 focus:shadow-glow-sage"
                  />
                  <label
                    htmlFor="name"
                    className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-palette-sand transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-palette-sand peer-focus:top-2 peer-focus:text-xs peer-focus:text-palette-cream"
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
                    className="peer w-full rounded-xl border border-palette-sand/25 bg-palette-forest/20 px-4 pt-6 pb-2 text-sm text-palette-cream placeholder-transparent backdrop-blur-md outline-none transition-all duration-300 focus:border-palette-cream focus:bg-palette-forest/35 focus:shadow-glow-sage"
                  />
                  <label
                    htmlFor="email"
                    className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-palette-sand transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-palette-sand peer-focus:top-2 peer-focus:text-xs peer-focus:text-palette-cream"
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
                    className="peer w-full resize-none rounded-xl border border-palette-sand/25 bg-palette-forest/20 px-4 pt-6 pb-2 text-sm text-palette-cream placeholder-transparent backdrop-blur-md outline-none transition-all duration-300 focus:border-palette-cream focus:bg-palette-forest/35 focus:shadow-glow-sage"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-palette-sand transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-palette-sand peer-focus:top-2 peer-focus:text-xs peer-focus:text-palette-cream"
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
                          ? "border border-palette-sage/50 bg-palette-forest/40 text-palette-cream"
                          : "border border-rose-500/40 bg-rose-950/20 text-rose-300"
                      }`}
                    >
                      {state === "success" ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-palette-sage" />
                      ) : (
                        <AlertCircle className="h-4 w-4 shrink-0" />
                      )}
                      <span>{feedbackMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button in botanical palette */}
                <div className="pt-2">
                  <Magnetic strength={0.3}>
                    <button
                      type="submit"
                      disabled={state === "submitting"}
                      className="liquid-glass specular-top relative group flex w-full items-center justify-center gap-2 rounded-xl border border-palette-sand/40 bg-palette-moss/40 px-8 py-3.5 text-sm font-bold text-palette-cream shadow-glow-sage transition-all duration-300 hover:border-palette-cream hover:bg-palette-moss/60 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {state === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-palette-cream" />
                          <span>Transmitting Signal...</span>
                        </>
                      ) : state === "success" ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-palette-sage" />
                          <span>Transmission Dispatched</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="h-4 w-4 text-palette-cream transition-transform group-hover:translate-x-1" />
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
