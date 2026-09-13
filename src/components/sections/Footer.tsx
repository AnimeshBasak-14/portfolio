"use client";

import React from "react";
import { personalData } from "@/data/personal";
import { Magnetic } from "@/components/ui/Magnetic";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-palette-sand/15 bg-background px-4 py-12 md:px-8">
      {/* Ambient background light beneath footer */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-40 w-3/4 rounded-full bg-palette-moss/10 blur-3xl -z-10" />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        {/* Identity & Copyright */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <span className="text-base font-bold tracking-wider text-palette-cream">
            {personalData.name}
          </span>
          <p className="mt-1 text-xs text-palette-sand/80">
            Autonomous Driving Perception & Continuous RL • IIT Roorkee
          </p>
          <p className="mt-1 text-[11px] font-mono text-palette-sand/60">
            © {currentYear} Animesh Basak. Supervised by Dr. Neetish Kumar.
          </p>
        </div>

        {/* Canonical Social Links */}
        <div className="flex items-center gap-3">
          {/* Canonical Email */}
          <Magnetic strength={0.3}>
            <a
              href={`mailto:${personalData.email}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-palette-sand/20 bg-palette-forest/20 text-palette-sand transition-all hover:border-palette-sage hover:bg-palette-moss/30 hover:text-palette-cream"
              title="Email Animesh Basak"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </Magnetic>

          {/* Canonical LinkedIn */}
          <Magnetic strength={0.3}>
            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-palette-sand/20 bg-palette-forest/20 text-palette-sand transition-all hover:border-palette-sage hover:bg-palette-moss/30 hover:text-palette-cream"
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-palette-sand/20 bg-palette-forest/20 text-palette-sand transition-all hover:border-palette-sage hover:bg-palette-moss/30 hover:text-palette-cream"
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
              className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full border border-palette-sand/30 bg-palette-forest/30 text-palette-sand transition-all hover:border-palette-sage hover:text-palette-cream hover:shadow-glow-sage ml-2"
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
