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
      {/* Background ambient glow in soft sage tone */}
      <div className="pointer-events-none absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-palette-sage/15 blur-[130px] -z-10" />

      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-palette-moss/20 bg-white/80 px-4 py-1 text-xs font-mono tracking-widest text-palette-forest uppercase shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-palette-moss" />
            <span>Direct Inquiries & Research Dialogue</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold tracking-tight text-palette-forest sm:text-4xl md:text-5xl"
          >
            Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-palette-forest via-palette-moss to-palette-sage">extraordinary</span>.
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-palette-forest/80">
            Interested in research collaborations, autonomous systems discussions, or engineering roles? Send a message below.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-stretch">
          {/* Left Column: Direct Canonical Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <TiltCard
              maxTilt={6}
              spotlightColor="rgba(163, 182, 138, 0.25)"
              className="p-8 h-full flex flex-col justify-between border border-palette-moss/15 bg-white/85 shadow-glass hover:shadow-glass-lg transition-all"
            >
              <div>
                <h3 className="text-xl font-bold text-palette-forest mb-2">
                  Direct Channels
                </h3>
                <p className="text-xs text-palette-forest/80 mb-8 leading-relaxed">
                  Fast response guaranteed. Feel free to connect directly via email, phone, or professional networks.
                </p>

                {/* Channels List */}
                <div className="space-y-4">
                  {/* Email */}
                  <a
                    href={`mailto:${personalData.email}`}
                    className="group flex items-center justify-between rounded-xl border border-palette-moss/15 bg-palette-cream/40 p-4 transition-all hover:border-palette-moss/35 hover:bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-white p-2.5 text-palette-forest border border-palette-moss/20 shadow-sm">
                        <Mail className="h-4 w-4 text-palette-moss" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-palette-forest/60">Email</span>
                        <span className="text-sm font-semibold text-palette-forest group-hover:text-palette-moss">
                          {personalData.email}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-palette-forest/60 group-hover:text-palette-forest transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${personalData.phone.replace(/\s+/g, "")}`}
                    className="group flex items-center justify-between rounded-xl border border-palette-moss/15 bg-palette-cream/40 p-4 transition-all hover:border-palette-moss/35 hover:bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-white p-2.5 text-palette-forest border border-palette-moss/20 shadow-sm">
                        <Phone className="h-4 w-4 text-palette-moss" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-palette-forest/60">Phone</span>
                        <span className="text-sm font-semibold text-palette-forest group-hover:text-palette-moss">
                          {personalData.phone}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-palette-forest/60 group-hover:text-palette-forest transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={personalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-palette-moss/15 bg-palette-cream/40 p-4 transition-all hover:border-palette-moss/35 hover:bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-white p-2.5 text-palette-forest border border-palette-moss/20 shadow-sm">
                        <Linkedin className="h-4 w-4 text-palette-moss" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-palette-forest/60">LinkedIn</span>
                        <span className="text-sm font-semibold text-palette-forest group-hover:text-palette-moss">
                          in/animeshbasak03
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-palette-forest/60 group-hover:text-palette-forest transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* GitHub */}
                  <a
                    href={personalData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-palette-moss/15 bg-palette-cream/40 p-4 transition-all hover:border-palette-moss/35 hover:bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-white p-2.5 text-palette-forest border border-palette-moss/20 shadow-sm">
                        <Github className="h-4 w-4 text-palette-moss" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-palette-forest/60">GitHub</span>
                        <span className="text-sm font-semibold text-palette-forest group-hover:text-palette-moss">
                          github.com/AnimeshBasak-14
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-palette-forest/60 group-hover:text-palette-forest transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-8 rounded-xl border border-palette-moss/20 bg-palette-cream/50 p-4 text-xs font-mono text-palette-forest">
                <span className="text-palette-moss font-bold">● </span> Location: {personalData.location}
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Liquid Glass Contact Form */}
          <div className="lg:col-span-7">
            <TiltCard
              maxTilt={4}
              spotlightColor="rgba(199, 183, 147, 0.2)"
              className="p-8 sm:p-10 border border-palette-moss/15 bg-white/85 shadow-glass hover:shadow-glass-lg transition-all"
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
                    className="peer w-full rounded-xl border border-palette-moss/25 bg-white px-4 pt-6 pb-2 text-sm text-palette-forest placeholder-transparent outline-none transition-all duration-300 focus:border-palette-forest focus:ring-2 focus:ring-palette-moss/20 shadow-sm"
                  />
                  <label
                    htmlFor="name"
                    className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-palette-forest/60 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-palette-forest/60 peer-focus:top-2 peer-focus:text-xs peer-focus:text-palette-forest"
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
                    className="peer w-full rounded-xl border border-palette-moss/25 bg-white px-4 pt-6 pb-2 text-sm text-palette-forest placeholder-transparent outline-none transition-all duration-300 focus:border-palette-forest focus:ring-2 focus:ring-palette-moss/20 shadow-sm"
                  />
                  <label
                    htmlFor="email"
                    className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-palette-forest/60 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-palette-forest/60 peer-focus:top-2 peer-focus:text-xs peer-focus:text-palette-forest"
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
                    className="peer w-full resize-none rounded-xl border border-palette-moss/25 bg-white px-4 pt-6 pb-2 text-sm text-palette-forest placeholder-transparent outline-none transition-all duration-300 focus:border-palette-forest focus:ring-2 focus:ring-palette-moss/20 shadow-sm"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute top-2 left-4 text-xs font-medium text-palette-forest/60 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-palette-forest/60 peer-focus:top-2 peer-focus:text-xs peer-focus:text-palette-forest"
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
                          ? "border border-palette-moss/30 bg-palette-cream text-palette-forest shadow-sm"
                          : "border border-rose-300 bg-rose-50 text-rose-800"
                      }`}
                    >
                      {state === "success" ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-palette-moss" />
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
                      className="relative group flex w-full items-center justify-center gap-2 rounded-xl border border-palette-forest bg-palette-forest px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-palette-moss disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {state === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                          <span>Transmitting Signal...</span>
                        </>
                      ) : state === "success" ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-palette-cream" />
                          <span>Transmission Dispatched</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="h-4 w-4 text-white transition-transform group-hover:translate-x-1" />
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
