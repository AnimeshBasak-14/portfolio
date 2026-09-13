"use client";

import React from "react";

/**
 * LiquidFilter Component
 * 
 * Provides an SVG displacement map filter that creates subtle optical refraction
 * reminiscent of liquid glass, Apple Vision Pro OS, and water ripples.
 * 
 * Adjustable parameters:
 * - baseFrequency: Controls the frequency of the turbulence ripples (lower = wider waves, higher = tighter ripples).
 * - scale: Controls the displacement strength in pixels (subtle: 3-8, strong: 15-30).
 * - dur: Duration of the animation loop (e.g. 10s for slow ambient pulse).
 */
export const LiquidFilter: React.FC = () => {
  return (
    <svg
      className="pointer-events-none fixed inset-0 -z-50 h-0 w-0 opacity-0"
      aria-hidden="true"
    >
      <defs>
        {/* Subtle Liquid Glass Refraction Filter */}
        <filter
          id="liquid-distortion-subtle"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          filterUnits="objectBoundingBox"
        >
          {/* Generates organic fluid noise */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.02"
            numOctaves="2"
            result="noise"
          >
            {/* Animates the noise pattern slowly over time for dynamic refraction */}
            <animate
              attributeName="baseFrequency"
              dur="16s"
              values="0.015 0.02; 0.025 0.035; 0.015 0.02"
              repeatCount="indefinite"
            />
          </feTurbulence>

          {/* Displaces pixels based on the red/green channels of the noise */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Medium Ripple Refraction Filter for Interactive Hover States */}
        <filter
          id="liquid-distortion-hover"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03 0.04"
            numOctaves="2"
            result="noiseHover"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noiseHover"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
};
