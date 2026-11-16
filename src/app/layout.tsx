import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import { profile, links } from "@/content/profile";
import "./globals.css";

/* Archivo carries a width axis, which the display type leans on hard —
   the name is set at wdth 125, small labels at wdth 84–92. */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const name = `${profile.firstName} ${profile.lastName}`;

export const metadata: Metadata = {
  title: `${name} | Software & AI Engineer`,
  description: profile.summary,
  authors: [{ name, url: links.github }],
  openGraph: {
    title: `${name} | Software & AI Engineer`,
    description: `${profile.role}. ${profile.claim.lead} ${profile.claim.turn}`,
    type: "profile",
  },
};

export const viewport: Viewport = {
  themeColor: "#11110f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
