import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Mulish } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// --- Fonts ---
// To restyle: swap any of these for another next/font/google family and
// update the matching --font-* token in app/globals.css (@theme).

// Headings + UI
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// Labels, tags, meta text
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
  title: "Alejandro Endo — Game Developer",
  description:
    "Portfolio of Alejandro Endo — interactive-media designer and solo Unity game developer (VR & mobile). Selected games, skills, and a devlog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${mulish.variable}`}
    >
      <body className="min-h-screen">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
