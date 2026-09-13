import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // User-specified botanical & luxury organic palette:
        palette: {
          cream: "#f5f5d5",      // (245, 245, 213)
          sand: "#c7b793",       // (199, 183, 147)
          sage: "#a3b68a",       // (163, 182, 138)
          moss: "#5c724a",       // (92, 114, 74)
          forest: "#354a2f",     // (53, 74, 47)
        },
        background: {
          DEFAULT: "#090d08",    // Deep obsidian forest
          secondary: "#10170e",  // Deep pine card surface
          tertiary: "#182316",   // Muted moss acrylic
        },
        glass: {
          border: "rgba(199, 183, 147, 0.18)",
          "border-bright": "rgba(245, 245, 213, 0.35)",
          surface: "rgba(53, 74, 47, 0.15)",
          "surface-hover": "rgba(92, 114, 74, 0.22)",
          highlight: "rgba(245, 245, 213, 0.25)",
        },
      },
      backdropBlur: {
        xs: "2px",
        glass: "24px",
        "glass-heavy": "40px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
        "glass-lg": "0 16px 48px 0 rgba(0, 0, 0, 0.6)",
        "glow-sage": "0 0 40px -10px rgba(163, 182, 138, 0.35)",
        "glow-moss": "0 0 40px -10px rgba(92, 114, 74, 0.35)",
        "glow-sand": "0 0 35px -8px rgba(199, 183, 147, 0.3)",
      },
      keyframes: {
        "blob-float": {
          "0%, 100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(25px, -45px) scale(1.08)",
          },
          "66%": {
            transform: "translate(-20px, 25px) scale(0.96)",
          },
        },
        "blob-pulse": {
          "0%, 100%": {
            opacity: "0.35",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.65",
            transform: "scale(1.12)",
          },
        },
      },
      animation: {
        "blob-float-1": "blob-float 20s ease-in-out infinite",
        "blob-float-2": "blob-float 26s ease-in-out infinite reverse",
        "blob-pulse": "blob-pulse 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
