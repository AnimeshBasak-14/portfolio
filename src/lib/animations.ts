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

// Fade up stagger container
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Item reveal with slight vertical translate and subtle scale
export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: EXPO_OUT,
    },
  },
};

// Hero letter reveal variant
export const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: EXPO_OUT,
    },
  },
};
