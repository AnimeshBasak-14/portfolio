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
        background: {
          DEFAULT: "#05070B",
          secondary: "#0B0F19",
          tertiary: "#111726",
        },
        accent: {
          cyan: "#38bdf8",
          blue: "#3b82f6",
          indigo: "#6366f1",
          purple: "#a855f7",
          pink: "#ec4899",
        },
        glass: {
          border: "rgba(255, 255, 255, 0.12)",
          "border-bright": "rgba(255, 255, 255, 0.28)",
          surface: "rgba(255, 255, 255, 0.04)",
          "surface-hover": "rgba(255, 255, 255, 0.08)",
          highlight: "rgba(255, 255, 255, 0.18)",
        },
      },
      backdropBlur: {
        xs: "2px",
        glass: "24px",
        "glass-heavy": "40px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-lg": "0 12px 48px 0 rgba(0, 0, 0, 0.5)",
        "glow-cyan": "0 0 40px -10px rgba(56, 189, 248, 0.3)",
        "glow-purple": "0 0 40px -10px rgba(168, 85, 247, 0.3)",
        "inner-specular": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)",
      },
      keyframes: {
        "blob-float": {
          "0%, 100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.95)",
          },
        },
        "blob-pulse": {
          "0%, 100%": {
            opacity: "0.4",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.7",
            transform: "scale(1.15)",
          },
        },
      },
      animation: {
        "blob-float-1": "blob-float 18s ease-in-out infinite",
        "blob-float-2": "blob-float 24s ease-in-out infinite reverse",
        "blob-float-3": "blob-float 20s ease-in-out infinite 2s",
        "blob-pulse": "blob-pulse 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
