"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // Distance multiplier (default: 0.35)
  className?: string;
}

/**
 * Magnetic Component
 * 
 * Applies an Apple-style magnetic physics pull toward the cursor when hovering
 * within the element's bounding box.
 * 
 * Physics attributes:
 * - damping & stiffness: provide a subtle rubbery elasticity without oscillating excessively.
 */
export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.35,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for natural smooth return
  const springConfig = { damping: 15, stiffness: 150, mass: 0.2 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
