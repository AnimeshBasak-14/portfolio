"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { personalData } from "@/data/personal";
import { Github, Linkedin, Mail, Sparkles, Menu, X, BookOpen } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["hero", "about", "research", "projects", "skills", "timeline", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "/#about", id: "about" },
    { label: "Projects", href: "/#projects", id: "projects" },
    { label: "Skills", href: "/#skills", id: "skills" },
    { label: "Experience", href: "/#timeline", id: "timeline" },
    { label: "Contact", href: "/#contact", id: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 md:pt-6">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`liquid-glass specular-top relative flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 md:px-7 md:py-3 ${
          scrolled
            ? "w-full max-w-4xl border-cyan-500/25 bg-slate-900/90 shadow-glass-lg backdrop-blur-glass-heavy"
            : "w-full max-w-5xl border-slate-700/60 bg-slate-900/75 backdrop-blur-glass shadow-glass"
        }`}
      >
        {/* Brand / Logo */}
        <Magnetic strength={0.25}>
          <Link
            href="/"
            className="group flex items-center space-x-2 text-sm font-semibold tracking-wide text-slate-100 transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-xs font-extrabold text-slate-950 border border-cyan-300 shadow-glow-cyan">
              AB
            </div>
            <span className="hidden font-semibold text-slate-100 group-hover:text-cyan-400 sm:inline-block">
              {personalData.name}
            </span>
          </Link>
        </Magnetic>

        {/* Desktop Nav Links */}
        <div className="hidden items-center space-x-1 md:flex">
          {navItems.map((item) => (
            <Magnetic key={item.id} strength={0.3}>
              <a
                href={item.href}
                className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors duration-200 flex items-center gap-1.5 ${
                  activeSection === item.id
                    ? "text-cyan-300 font-bold"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 -z-10 rounded-full bg-cyan-500/15 backdrop-blur-xs border border-cyan-500/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{item.label}</span>
              </a>
            </Magnetic>
          ))}
        </div>

        {/* Social / Direct Actions */}
        <div className="flex items-center space-x-2">
          <Magnetic strength={0.3}>
            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 transition-colors hover:border-cyan-400 hover:text-cyan-300"
              aria-label="GitHub Profile"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
          </Magnetic>

          <Magnetic strength={0.3}>
            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 transition-colors hover:border-cyan-400 hover:text-cyan-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          </Magnetic>

          <Magnetic strength={0.3}>
            <a
              href="/#contact"
              className="hidden items-center space-x-1.5 rounded-full border border-cyan-400/50 bg-cyan-400 px-3.5 py-1 text-xs font-bold text-slate-950 shadow-glow-cyan transition-all duration-300 hover:bg-cyan-300 sm:flex"
            >
              <Sparkles className="h-3 w-3 text-slate-950 fill-current" />
              <span>Get in Touch</span>
            </a>
          </Magnetic>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-200 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="liquid-glass specular-top fixed top-20 left-4 right-4 z-40 rounded-3xl p-6 md:hidden shadow-2xl border border-cyan-500/25 bg-slate-950/95"
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium tracking-wide transition-colors flex items-center justify-between ${
                  activeSection === item.id ? "text-cyan-300 font-bold" : "text-slate-300 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <span className="h-2 w-2 rounded-full bg-cyan-400" />}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Verified Channels</span>
              <div className="flex space-x-3">
                <a href={personalData.github} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-cyan-400">
                  <Github className="h-4 w-4" />
                </a>
                <a href={personalData.linkedin} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-cyan-400">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href={`mailto:${personalData.email}`} className="text-slate-300 hover:text-cyan-400">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};
