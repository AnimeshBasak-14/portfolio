"use client";

import React from "react";
import { personalData } from "@/data/personal";
import { Magnetic } from "@/components/ui/Magnetic";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

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

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-black px-4 py-12 md:px-8">
      {/* Ambient background light beneath footer */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-40 w-3/4 rounded-full bg-white/[0.02] blur-3xl -z-10" />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        {/* Identity & Copyright */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <span className="text-base font-black tracking-wider text-white">
            {personalData.name}
          </span>
          <p className="mt-1 text-xs text-neutral-400">
            Autonomous Driving Perception & Continuous RL • IIT Roorkee
          </p>
          <p className="mt-1 text-[11px] font-mono text-neutral-400">
            © {currentYear} Animesh Basak. Supervised by Dr. Neetesh Kumar (Dept. of CSE).
          </p>
        </div>

        {/* Canonical Social Links */}
        <div className="flex items-center gap-3">
          {/* Canonical Email */}
          <Magnetic strength={0.3}>
            <a
              href={`mailto:${personalData.email}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-neutral-300 transition-all hover:border-white hover:bg-white hover:text-black shadow-sm"
              title="Email Animesh Basak"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </Magnetic>

          {/* Canonical Hugging Face */}
          <Magnetic strength={0.3}>
            <a
              href={personalData.huggingface}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-neutral-300 transition-all hover:border-white hover:bg-white hover:text-black shadow-sm"
              title="Hugging Face Profile"
              aria-label="Hugging Face"
            >
              <HuggingFaceIcon className="h-4 w-4" />
            </a>
          </Magnetic>

          {/* Canonical LinkedIn */}
          <Magnetic strength={0.3}>
            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-neutral-300 transition-all hover:border-white hover:bg-white hover:text-black shadow-sm"
              title="LinkedIn Profile"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </Magnetic>

          {/* Canonical GitHub */}
          <Magnetic strength={0.3}>
            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-neutral-300 transition-all hover:border-white hover:bg-white hover:text-black shadow-sm"
              title="GitHub Profile"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </Magnetic>

          {/* Back to top button */}
          <Magnetic strength={0.3}>
            <button
              onClick={scrollToTop}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-neutral-300 transition-all hover:border-white hover:bg-white hover:text-black shadow-sm ml-2"
              title="Return to top"
              aria-label="Return to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
};
