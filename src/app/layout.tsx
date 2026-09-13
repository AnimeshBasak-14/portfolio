import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LiquidFilter } from "@/components/ui/LiquidFilter";
import { personalData } from "@/data/personal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://animeshbasak.vercel.app";

export const viewport: Viewport = {
  themeColor: "#0f172a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personalData.name} — Ph.D. Scholar @ IIT Roorkee | Autonomous Driving, Continuous RL & Perception`,
    template: `%s | ${personalData.name}`,
  },
  description: `${personalData.name} is a Direct Ph.D. Research Scholar at IIT Roorkee (supervised by Dr. Neetish Kumar), researching Deep Reinforcement Learning for Autonomous Vehicles, Continuous Control, and Multi-Modal Sensor Perception.`,
  keywords: [
    "Animesh Basak",
    "IIT Roorkee",
    "IITR",
    "Department of Computer Science and Engineering",
    "Dr. Neetish Kumar",
    "Ph.D. Scholar",
    "Autonomous Driving",
    "CARLA Simulator",
    "Reinforcement Learning",
    "TD3",
    "DDPG",
    "Continuous Control",
    "Sensor Fusion",
    "NIT Arunachal Pradesh",
    "Portfolio",
  ],
  authors: [{ name: personalData.name, url: personalData.github }],
  creator: personalData.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${personalData.name} — Ph.D. Scholar @ IIT Roorkee`,
    description: personalData.tagline,
    siteName: `${personalData.name} Portfolio & Research`,
    images: [
      {
        url: "/animesh-basak.jpg",
        width: 800,
        height: 800,
        alt: `${personalData.name} — Ph.D. Scholar @ IIT Roorkee`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalData.name} — Ph.D. Scholar @ IIT Roorkee`,
    description: personalData.tagline,
    creator: "@animeshbasak03",
    images: ["/animesh-basak.jpg"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="bg-background text-cyber-text antialiased selection:bg-cyber-cyan/25 selection:text-cyber-cyan">
        <SmoothScroll>
          {/* SVG liquid distortion filter definition */}
          <LiquidFilter />

          {/* Site-wide custom cursor with liquid droplet trail & spotlight */}
          <CustomCursor />

          {/* Main page content */}
          <div className="relative min-h-screen bg-noise">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
