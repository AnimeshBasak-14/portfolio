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
          backgroundColor: "#000000",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient Radial Highlights */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
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
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 70%)",
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
            color: "#FFFFFF",
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Direct Ph.D. Scholar • IIT Roorkee
        </div>

        {/* Center Typography */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.1,
            }}
          >
            {personalData.name}
          </div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 600,
              color: "#D4D4D8",
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
            color: "#A1A1AA",
            fontSize: "20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
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
