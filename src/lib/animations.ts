import { Variants } from "framer-motion";

// Custom Apple-style exponential ease out
export const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

// Transition presets
export const smoothTransition = {
  duration: 0.8,
  ease: EXPO_OUT,
};

export const springTransition = {
  type: "spring",
  stiffness: 160,
  damping: 18,
  mass: 0.8,
};

// Fade up stagger container - Default opacity 1 to prevent gating content behind scroll
export const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Item reveal with subtle vertical nudge while preserving initial opacity: 1
export const itemVariants: Variants = {
  hidden: {
    opacity: 1,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EXPO_OUT,
    },
  },
};

// Hero letter reveal variant - Initial opacity: 1 to ensure instant accessibility
export const letterVariants: Variants = {
  hidden: {
    opacity: 1,
    y: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EXPO_OUT,
    },
  },
};
