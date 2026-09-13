"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Max degrees of tilt (default: 12)
  spotlightColor?: string;
  onClick?: () => void;
}

/**
 * TiltCard Component
 * 
 * Combines:
 * 1. 3D Parallax Tilt (`rotateX`, `rotateY`) reacting to cursor coordinates
 * 2. Real-time radial spotlight that follows the cursor across the card surface
 * 3. Liquid glass frosted background and specular top highlight
 * 
 * Physics parameters:
 * - damping & stiffness: control smooth rotational return and tilt dampening.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  maxTilt = 10,
  spotlightColor = "rgba(255, 255, 255, 0.06)",
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates from -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Pixel offsets for the surface spotlight
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  // Spring physics for tilt angles
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Derive 3D rotation angles
  // Moving mouse to the right tilts the card along the Y axis
  // Moving mouse up/down tilts along the X axis
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [maxTilt, -maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set normalized coordinates [-0.5 to 0.5]
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);

    // Set spotlight pixel coordinates
    spotlightX.set(x);
    spotlightY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative transition-transform duration-300"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`liquid-glass-card specular-top relative overflow-hidden rounded-2xl ${className}`}
      >
        {/* Dynamic Spotlight Glow that tracks the cursor on the glass surface */}
        <motion.div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${spotlightX.get()}px ${spotlightY.get()}px, ${spotlightColor}, transparent 60%)`,
          }}
        />

        {/* Content layer translated forward in 3D for parallax depth */}
        <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
