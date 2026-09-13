"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Increment loading progress smoothly
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            onLoaded?.();
          }, 400);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 8;
        return Math.min(prev + increment, 100);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
          {/* Ambient background glow */}
          <div className="pointer-events-none absolute h-[350px] w-[350px] rounded-full bg-white/[0.04] blur-3xl" />

          {/* Liquid Glass Orb Container */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass specular-top relative flex h-36 w-36 flex-col items-center justify-center rounded-3xl p-6 shadow-2xl border border-white/15 bg-[#0B0B0B]"
          >
            {/* Specular Edge Ring */}
            <div className="absolute inset-0 rounded-3xl border border-white/15" />

            {/* Monogram */}
            <div className="relative mb-2 flex items-center justify-center">
              <span className="text-3xl font-black tracking-widest text-white">
                AB
              </span>
            </div>

            {/* Progress Percentage */}
            <span className="font-mono text-xs font-bold text-white">
              {progress}%
            </span>

            {/* Liquid Progress Bar */}
            <div className="mt-3 h-1 w-20 overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 font-mono text-xs font-semibold tracking-widest text-neutral-400 uppercase"
          >
            Autonomous Driving • Continuous RL • IIT Roorkee
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
