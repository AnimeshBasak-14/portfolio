"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { articlesData, Article } from "@/data/articles";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  BookOpen,
  ExternalLink,
  Sparkles,
  X,
  Clock,
  Calendar,
  Share2,
  Check,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Terminal,
} from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

export const Articles: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Lock body scroll when modal is open to ensure mouse wheel scrolls modal content
  React.useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedArticle]);

  const handleShare = (article: Article) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(article.canonicalUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section id="articles" className="relative w-full py-24 md:py-32 px-4 md:px-8">
      {/* Background Subtle Gradient Accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.03] blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 h-[450px] w-[450px] rounded-full bg-emerald-500/[0.03] blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <motion.div
            variants={itemVariants}
            className="liquid-glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-sm border border-white/20 bg-white/[0.06]"
          >
            <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
            <span>Technical Essays & Systems Architecture</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Engineering Articles
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-2xl text-base text-neutral-400 font-sans"
          >
            Deep-dive technical essays on systems engineering, local-first architectures,
            WebAssembly performance, and building uncompromising software.
          </motion.p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 gap-8">
          {articlesData.map((article) => (
            <TiltCard key={article.slug} className="group h-full">
              <div className="liquid-glass relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-neutral-900/60 p-6 md:p-10 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40">
                {/* Top Meta Bar */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 px-3 py-1 text-[11px] font-mono font-bold text-cyan-300 shadow-sm">
                        <Sparkles className="h-3 w-3 text-cyan-400" />
                        <span>Featured Essay</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs font-mono text-neutral-400">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </span>
                      <span className="text-neutral-600 hidden sm:inline">•</span>
                      <span className="hidden sm:flex items-center gap-1 text-xs font-mono text-neutral-400">
                        <Calendar className="h-3 w-3" />
                        <span>{article.date}</span>
                      </span>
                    </div>

                    <a
                      href={article.canonicalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-neutral-300 hover:border-cyan-400/40 hover:text-white transition-all"
                    >
                      <span>documentforge.in</span>
                      <ExternalLink className="h-3 w-3 text-cyan-400" />
                    </a>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl leading-tight group-hover:text-cyan-200 transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-base text-neutral-300 leading-relaxed font-sans">
                    {article.subtitle}
                  </p>

                  {/* Highlight Metrics */}
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {article.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-white/10 bg-black/40 p-3.5 backdrop-blur-md"
                      >
                        <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">
                          {h.label}
                        </p>
                        <p className="mt-1 font-mono text-sm font-extrabold text-cyan-400">
                          {h.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Excerpt Body */}
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5 font-sans text-sm text-neutral-300 leading-relaxed">
                    <p className="italic text-neutral-200">
                      &ldquo;{article.excerpt}&rdquo;
                    </p>
                  </div>

                  {/* Tag Cloud */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-neutral-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(article)}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-mono text-xs font-extrabold uppercase tracking-wider text-black shadow-lg hover:bg-neutral-200 transition-all"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>Read Full Article</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShare(article)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-mono text-xs text-neutral-300 hover:border-white/30 hover:text-white transition-all"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="h-3.5 w-3.5 text-neutral-400" />
                          <span>Share</span>
                        </>
                      )}
                    </button>
                  </div>

                  <a
                    href={article.canonicalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Launch DocumentForge App</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* FULL ARTICLE MODAL READER */}
      <AnimatePresence>
        {selectedArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative my-8 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-[#0C101A] p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.95)] z-10"
              style={{ backgroundColor: "rgba(12, 16, 26, 0.98)" }}
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 z-20 rounded-full border border-white/15 bg-white/5 p-2 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close article modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header Info */}
              <div className="border-b border-white/10 pb-6 pr-12">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-cyan-400 mb-3">
                  <span className="rounded-full border border-cyan-500/40 bg-cyan-950/60 px-3 py-1 font-bold">
                    Technical Article
                  </span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  {selectedArticle.title}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                  {selectedArticle.subtitle}
                </p>

                {/* Author Capsule */}
                <div className="mt-5 flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center font-bold text-xs text-cyan-300">
                      AB
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Animesh Basak</p>
                      <p className="text-[11px] font-mono text-neutral-400">
                        Direct Ph.D. Scholar @ IIT Roorkee
                      </p>
                    </div>
                  </div>

                  <a
                    href={selectedArticle.canonicalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/60 px-3 py-1 text-xs font-mono font-bold text-cyan-300 hover:bg-cyan-900/60 transition-colors"
                  >
                    <span>Visit https://documentforge.in</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Article Content Scroll Container */}
              <div
                className="mt-6 space-y-8 max-h-[65vh] overflow-y-auto pr-3 sm:pr-5 font-sans text-neutral-200 leading-relaxed text-sm sm:text-base overscroll-contain select-text"
                data-lenis-prevent
                onWheel={(e) => e.stopPropagation()}
              >
                {/* Intro */}
                <p className="text-neutral-200 leading-relaxed font-normal first-letter:text-4xl first-letter:font-bold first-letter:text-cyan-400 first-letter:mr-1">
                  {selectedArticle.content.intro}
                </p>

                {/* Content Sections */}
                {selectedArticle.content.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-4 pt-4 border-t border-white/5">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {sec.heading}
                    </h3>

                    {sec.body.map((p, pIdx) => (
                      <p key={pIdx} className="text-neutral-300 leading-relaxed">
                        {p}
                      </p>
                    ))}

                    {sec.callout && (
                      <div className="my-4 rounded-2xl border border-cyan-500/30 bg-cyan-950/30 p-4 sm:p-5 backdrop-blur-md">
                        <div className="flex items-start gap-3">
                          <ShieldCheck className="h-5 w-5 text-cyan-400 mt-0.5 shrink-0" />
                          <p className="font-sans text-xs sm:text-sm font-semibold text-cyan-100 italic leading-relaxed">
                            {sec.callout.text}
                          </p>
                        </div>
                      </div>
                    )}

                    {sec.codeSnippet && (
                      <div className="my-4 overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-4 font-mono text-xs text-cyan-300 shadow-inner">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-3 text-neutral-400 text-[10px]">
                          <Terminal className="h-3 w-3 text-cyan-400" />
                          <span>ARCHITECTURE FLOW PIPELINE</span>
                        </div>
                        <pre className="overflow-x-auto whitespace-pre font-mono text-[11px] leading-relaxed text-neutral-200">
                          {sec.codeSnippet}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}

                {/* Conclusion */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
                  <h4 className="text-base font-bold text-white">Conclusion</h4>
                  <p className="text-neutral-300 leading-relaxed">
                    {selectedArticle.content.conclusion}
                  </p>
                </div>

                {/* Maker Discussion Question */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <Cpu className="h-4 w-4" />
                    <span>To the Developer Community & Fellow Makers:</span>
                  </div>
                  <p className="text-neutral-200 italic leading-relaxed text-sm">
                    {selectedArticle.content.makerQuestion}
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => handleShare(selectedArticle)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs text-neutral-300 hover:text-white transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3.5 w-3.5 text-neutral-400" />
                      <span>Share Article</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(null)}
                    className="rounded-xl border border-white/15 px-4 py-2 font-mono text-xs text-neutral-300 hover:bg-white/10 transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href={selectedArticle.canonicalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2 font-mono text-xs font-bold text-black shadow-lg hover:bg-cyan-300 transition-colors"
                  >
                    <span>Open DocumentForge</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Articles;

