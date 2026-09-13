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
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`liquid-glass specular-top relative flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 md:px-7 md:py-3 ${
          scrolled
            ? "w-full max-w-4xl border-white/15 bg-black/85 shadow-2xl backdrop-blur-xl"
            : "w-full max-w-5xl border-white/10 bg-black/75 backdrop-blur-xl shadow-2xl"
        }`}
      >
        {/* Brand / Logo */}
        <Magnetic strength={0.25}>
          <Link
            href="/"
            className="group flex items-center space-x-2.5 text-sm font-bold tracking-wide text-white transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-black shadow-sm">
              AB
            </div>
            <span className="hidden font-bold tracking-tight text-white group-hover:text-neutral-300 sm:inline-block">
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
                className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors duration-200 flex items-center gap-1.5 ${
                  activeSection === item.id
                    ? "text-white font-bold"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-xs"
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
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-neutral-300 transition-all hover:border-white hover:text-white"
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
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-neutral-300 transition-all hover:border-white hover:text-white"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          </Magnetic>

          <Magnetic strength={0.3}>
            <a
              href="/#contact"
              className="hidden items-center space-x-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-black shadow-md transition-all duration-300 hover:bg-neutral-200 sm:flex"
            >
              <Sparkles className="h-3 w-3 text-black fill-current" />
              <span>Get in Touch</span>
            </a>
          </Magnetic>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="liquid-glass specular-top fixed top-20 left-4 right-4 z-40 rounded-3xl p-6 md:hidden shadow-2xl border border-white/15 bg-black/95 backdrop-blur-2xl"
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold tracking-wide transition-colors flex items-center justify-between ${
                  activeSection === item.id ? "text-white font-bold" : "text-neutral-300 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <span className="h-2 w-2 rounded-full bg-white shadow-sm" />}
              </a>
            ))}
            <div className="pt-4 border-t border-white/15 flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-mono">Connect Directly</span>
              <div className="flex space-x-3">
                <a href={personalData.github} target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-white">
                  <Github className="h-4 w-4" />
                </a>
                <a href={personalData.linkedin} target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-white">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href={`mailto:${personalData.email}`} className="text-neutral-300 hover:text-white">
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
