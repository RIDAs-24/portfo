import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/app/ThemeProvider";
import "./globals.css";
import { cn } from "@/lib/utils";
import PremiumBackground from "@/components/PremiumBackground";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rida Sbai - Full Stack Developer & UI Designer",
  description: "Full Stack Developer & UI Designer portfolio. Building modern, fast, and scalable web applications.",
  keywords: ["developer", "portfolio", "full-stack", "react", "next.js", "web development", "UI designer", "Rida Sbai"],
  authors: [{ name: "Rida Sbai", url: "https://rida-sbai.dev" }],
  creator: "Rida Sbai",
  openGraph: {
    title: "Rida Sbai - Full Stack Developer",
    description: "Full Stack Developer & UI Designer portfolio. Building modern, fast, and scalable web applications.",
    url: "https://rida-sbai.dev",
    siteName: "Rida Sbai Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rida Sbai - Full Stack Developer",
    description: "Full Stack Developer & UI Designer portfolio. Building modern, fast, and scalable web applications.",
    creator: "@rida_sbai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={cn(inter.className, "bg-background text-foreground transition-colors duration-300 min-h-screen selection:bg-indigo-500/30 overflow-x-hidden antialiased")}>
        <CustomCursor />
        <PremiumBackground />
        <div className="fixed inset-0 z-[0] bg-grid opacity-10 pointer-events-none mix-blend-overlay"></div>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
