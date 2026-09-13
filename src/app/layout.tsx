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
    default: `${personalData.name} — Full-Stack Software Engineer & Creative Developer`,
    template: `%s | ${personalData.name}`,
  },
  description: `${personalData.name} is a software engineer specializing in modern web applications, interactive 3D computing, and resilient cloud architectures.`,
  keywords: [
    "Animesh Basak",
    "Software Engineer",
    "Creative Developer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "Three.js",
    "TypeScript",
    "Tailwind CSS",
    "Liquid Glass",
    "Portfolio",
  ],
  authors: [{ name: personalData.name, url: personalData.github }],
  creator: personalData.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${personalData.name} — Full-Stack Software Engineer`,
    description: personalData.tagline,
    siteName: `${personalData.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${personalData.name} — Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalData.name} — Software Engineer`,
    description: personalData.tagline,
    creator: "@animeshbasak03",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
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
