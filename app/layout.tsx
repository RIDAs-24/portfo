import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/app/ThemeProvider";
import "./globals.css";
import { cn } from "@/lib/utils";
import PremiumBackground from "@/components/PremiumBackground";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rida Sbai - Full Stack Developer & UI Designer",
  description: "Full Stack Developer & UI Designer portfolio. Building modern, fast, and scalable web applications.",
  keywords: "developer, portfolio, full-stack, react, next.js, web development",
  authors: [{ name: "Rida Sbai" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={cn(inter.className, "bg-background text-foreground transition-colors duration-300 min-h-screen selection:bg-indigo-500/30")}>
        <PremiumBackground />
        <div className="fixed inset-0 z-[0] bg-grid opacity-10 pointer-events-none mix-blend-overlay"></div>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
