import type { Metadata } from "next";
import {
  Stack_Sans_Headline,
  Google_Sans_Flex,
  JetBrains_Mono,
  Mulish,
} from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// --- Fonts ---
// To restyle: swap any of these for another next/font/google family and
// update the matching --font-* token in app/globals.css (@theme).

// Headings + UI (variable font, 200-700 weight axis)
const stackSansHeadline = Stack_Sans_Headline({
  variable: "--font-heading-family",
  subsets: ["latin"],
});

// Labels, tags, meta text (font-label utility)
const googleSansFlex = Google_Sans_Flex({
  variable: "--font-label-family",
  subsets: ["latin"],
});

// Code blocks and inline code in Markdown posts (font-mono utility)
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Body copy
const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alejandro Endo - Game Developer",
  description:
    "Portfolio of Alejandro Endo - Game developer and QA engineer. Selected games, skills, and a devlog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${stackSansHeadline.variable} ${googleSansFlex.variable} ${jetbrainsMono.variable} ${mulish.variable}`}
    >
      <body className="min-h-screen">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
