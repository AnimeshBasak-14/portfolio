import { ImageResponse } from "next/og";
import { personalData } from "@/data/personal";

export const runtime = "edge";
export const alt = `${personalData.name} — Full-Stack Software Engineer`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#05070B",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient Gradient Glows */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)",
          }}
        />

        {/* Top Header Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 24px",
            borderRadius: "9999px",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "#38bdf8",
            fontSize: "18px",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Liquid Glass Experience
        </div>

        {/* Center Typography */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            {personalData.name}
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 600,
              color: "#94a3b8",
            }}
          >
            {personalData.title}
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            color: "#64748b",
            fontSize: "20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
            width: "100%",
          }}
        >
          <span>github.com/AnimeshBasak-14</span>
          <span>•</span>
          <span>linkedin.com/in/animeshbasak03</span>
          <span>•</span>
          <span>{personalData.email}</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
