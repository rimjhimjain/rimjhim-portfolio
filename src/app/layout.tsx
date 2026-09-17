import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
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
  title: name,
  description: profile.summary,
  authors: [{ name, url: links.github }],
  openGraph: {
    title: name,
    description: `${profile.role}. ${profile.claim.lead} ${profile.claim.turn}`,
    type: "profile",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0710",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
