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
        // Classy, Stylish, Formal Black & White palette:
        editorial: {
          bg: "#000000",          // Deep obsidian black
          card: "#0D0D0D",        // Elevated obsidian card
          surface: "#141414",     // Deep glass surface
          text: "#FFFFFF",        // Pure brilliant white
          secondary: "#E4E4E7",   // High-contrast platinum silver
          muted: "#A1A1AA",       // Muted secondary
          border: "rgba(255, 255, 255, 0.12)", // Razor-sharp hairline divider
          borderBright: "rgba(255, 255, 255, 0.28)", // Prominent white border
          accent: "#FFFFFF",      // Pure white accent
          subtle: "#71717A",      // Subtle text
        },
        background: {
          DEFAULT: "#000000",     // Pure obsidian background
          secondary: "#0D0D0D",   // Elevated card background
          tertiary: "#141414",    // Higher elevated surface
        },
        glass: {
          border: "rgba(255, 255, 255, 0.12)",
          "border-bright": "rgba(255, 255, 255, 0.28)",
          surface: "rgba(255, 255, 255, 0.04)",
          "surface-hover": "rgba(255, 255, 255, 0.08)",
          highlight: "rgba(255, 255, 255, 0.12)",
        },
      },
      backdropBlur: {
        xs: "2px",
        glass: "24px",
        "glass-heavy": "40px",
      },
      boxShadow: {
        glass: "0 10px 30px -5px rgba(0, 0, 0, 0.7), 0 4px 12px -2px rgba(255, 255, 255, 0.02)",
        "glass-lg": "0 20px 45px -10px rgba(0, 0, 0, 0.85), 0 8px 16px -4px rgba(255, 255, 255, 0.04)",
        "glow-accent": "0 0 25px -5px rgba(201, 201, 201, 0.18)",
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
