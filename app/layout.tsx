import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inyeon - Agentic AI Git Companion",
  description:
    "Multi-agent AI assistant for git workflows. Split commits, resolve conflicts, generate PRs and changelogs with one command. Powered by Gemini and Ollama.",
  keywords: [
    "AI",
    "git",
    "commit",
    "LangGraph",
    "Gemini",
    "Ollama",
    "RAG",
    "FastAPI",
    "code review",
    "developer tools",
    "PR generation",
    "conflict resolution",
    "changelog",
    "git hooks",
  ],
  authors: [{ name: "Inyeon" }],
  openGraph: {
    title: "Inyeon - Agentic AI Git Companion",
    description:
      "Multi-agent AI assistant for git workflows. Split commits, resolve conflicts, generate PRs and changelogs with one command.",
    url: "https://inyeon-upstream.vercel.app",
    siteName: "Inyeon",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inyeon - Agentic AI Git Companion",
    description:
      "Multi-agent AI assistant for git workflows. Split commits, resolve conflicts, generate PRs and changelogs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
