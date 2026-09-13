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
        // Cyber-Physical Scholar palette:
        cyber: {
          slate: "#0f172a",       // Deep Slate background
          dark: "#090d16",        // Terminal Charcoal background
          cyan: "#00d8ff",        // Electric Cyan (LIDAR Blue)
          azure: "#38bdf8",       // Azure accent
          blue: "#3b82f6",        // Deep Azure
          emerald: "#10b981",     // Muted Emerald (Success Metrics)
          text: "#f8fafc",        // Off-white primary text
          muted: "#94a3b8",       // Slate-400 secondary text
          subtle: "#64748b",      // Slate-500 muted text
        },
        palette: {
          cream: "#f8fafc",      // Off-white primary text
          sand: "#38bdf8",       // Azure accent
          sage: "#10b981",       // Muted Emerald (Success Metrics)
          moss: "#00d8ff",       // Electric Cyan (LIDAR Blue)
          forest: "#0f172a",     // Deep Slate
          cyan: "#00d8ff",
          emerald: "#10b981",
        },
        background: {
          DEFAULT: "#0f172a",    // Deep Slate
          secondary: "#111a2e",  // Elevated Terminal Card surface
          tertiary: "#1e293b",   // Slate-800 subtle
        },
        glass: {
          border: "rgba(0, 216, 255, 0.16)",
          "border-bright": "rgba(0, 216, 255, 0.45)",
          surface: "rgba(15, 23, 42, 0.75)",
          "surface-hover": "rgba(22, 33, 58, 0.85)",
          highlight: "rgba(0, 216, 255, 0.08)",
        },
      },
      backdropBlur: {
        xs: "2px",
        glass: "24px",
        "glass-heavy": "40px",
      },
      boxShadow: {
        glass: "0 10px 30px -5px rgba(0, 0, 0, 0.4), 0 4px 12px -2px rgba(0, 216, 255, 0.05)",
        "glass-lg": "0 20px 45px -10px rgba(0, 0, 0, 0.6), 0 8px 16px -4px rgba(0, 216, 255, 0.1)",
        "glow-cyan": "0 0 35px -5px rgba(0, 216, 255, 0.45)",
        "glow-emerald": "0 0 35px -5px rgba(16, 185, 129, 0.45)",
        "glow-azure": "0 0 30px -5px rgba(56, 189, 248, 0.4)",
        "glow-sage": "0 0 35px -5px rgba(16, 185, 129, 0.4)",
        "glow-moss": "0 0 35px -5px rgba(0, 216, 255, 0.4)",
        "glow-sand": "0 0 30px -5px rgba(56, 189, 248, 0.4)",
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
