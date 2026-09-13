import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LiquidFilter } from "@/components/ui/LiquidFilter";
import { personalData } from "@/data/personal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://animeshbasak.vercel.app";

export const viewport: Viewport = {
  themeColor: "#05070B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personalData.name} — Ph.D. Scholar @ IIT Roorkee | AI, GNNs & Autonomous Systems`,
    template: `%s | ${personalData.name}`,
  },
  description: `${personalData.name} is a Ph.D. Research Scholar at IIT Roorkee (advised by Dr. Neetish Kumar), researching Graph Neural Networks for Brain Connectomics and Deep Reinforcement Learning for Autonomous Vehicles.`,
  keywords: [
    "Animesh Basak",
    "IIT Roorkee",
    "IITR",
    "Dr. Neetish Kumar",
    "Ph.D. Scholar",
    "Graph Neural Networks",
    "Brain Connectomics",
    "Neuro-Neo4j",
    "CARLA Simulator",
    "Autonomous Driving",
    "Reinforcement Learning",
    "TD3",
    "NIT Arunachal Pradesh",
    "Liquid Glass",
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
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#05070B] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
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
