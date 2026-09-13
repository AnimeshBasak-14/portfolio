"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

/**
 * CustomCursor Component
 * 
 * Renders:
 * 1. A glowing liquid droplet cursor tip.
 * 2. An elastic trailing droplet that fades out over ~0.5s.
 * 3. A large soft ambient spotlight that follows the cursor across the entire viewport.
 * 
 * Physics parameters:
 * - stiffness / damping: controls the snap and trailing delay of the follower droplet.
 */
export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [trails, setTrails] = useState<TrailPoint[]>([]);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring coordinates for trailing drop
  const springConfig = { damping: 24, stiffness: 280, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Wider ambient spotlight spring coordinates
  const ambientSpringConfig = { damping: 35, stiffness: 120, mass: 1 };
  const ambientX = useSpring(mouseX, ambientSpringConfig);
  const ambientY = useSpring(mouseY, ambientSpringConfig);

  useEffect(() => {
    // Disable on touch devices or small screens
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    let nextId = 0;
    let lastTrailTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest("[role='button']") ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA"
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }

      // Generate subtle fluid droplets trailing behind cursor
      const now = performance.now();
      if (now - lastTrailTime > 60) {
        lastTrailTime = now;
        const newPoint = { x: e.clientX, y: e.clientY, id: nextId++ };
        setTrails((prev) => [...prev.slice(-6), newPoint]);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  // Periodic cleanup for fading trail points
  useEffect(() => {
    if (trails.length === 0) return;
    const timer = setTimeout(() => {
      setTrails((prev) => prev.slice(1));
    }, 100);
    return () => clearTimeout(timer);
  }, [trails]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* 1. Viewport Ambient Spotlight Glow - illuminates glass surfaces from underneath */}
      <motion.div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl transition-opacity duration-300"
        style={{
          left: ambientX,
          top: ambientY,
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(163, 182, 138, 0.15) 0%, rgba(92, 114, 74, 0.08) 45%, transparent 70%)",
        }}
      />

      {/* 2. Trailing liquid droplets fading out */}
      {trails.map((t, idx) => {
        const opacity = (idx + 1) / (trails.length + 1) * 0.4;
        const scale = (idx + 1) / (trails.length + 1) * 0.8;
        return (
          <motion.div
            key={t.id}
            initial={{ scale: scale, opacity: opacity }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-palette-sage/70 blur-[1px]"
            style={{
              left: t.x,
              top: t.y,
              width: 8,
              height: 8,
            }}
          />
        );
      })}

      {/* 3. Smooth elastic follower ring */}
      <motion.div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-palette-sand/40 backdrop-blur-xs transition-colors duration-200"
        style={{
          left: smoothX,
          top: smoothY,
          width: isPointer ? 48 : 28,
          height: isPointer ? 48 : 28,
          backgroundColor: isPointer
            ? "rgba(199, 183, 147, 0.12)"
            : "rgba(163, 182, 138, 0.05)",
          boxShadow: isPointer
            ? "0 0 20px rgba(163, 182, 138, 0.4)"
            : "0 0 10px rgba(199, 183, 147, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />

      {/* 4. Sharp center cursor dot */}
      <motion.div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-palette-cream shadow-[0_0_8px_#a3b68a]"
        style={{
          left: mouseX,
          top: mouseY,
          width: isPointer ? 6 : 4,
          height: isPointer ? 6 : 4,
        }}
      />
    </div>
  );
};
