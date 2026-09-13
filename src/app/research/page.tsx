"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Research } from "@/components/sections/Research";
import { Footer } from "@/components/sections/Footer";
import { ArrowLeft, BookOpen, GraduationCap } from "lucide-react";
import { personalData } from "@/data/personal";

export default function ResearchPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 pb-16">
        {/* Header Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 md:px-8 mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-palette-sand hover:text-palette-cream transition-colors rounded-full border border-palette-sand/20 bg-palette-forest/20 px-4 py-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Overview</span>
          </Link>
        </div>

        {/* Dedicated Research Component */}
        <Research />
      </main>

      <Footer />
    </>
  );
}
