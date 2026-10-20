import type { Metadata, Viewport } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/inter-tight";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"
  ),
  title: "Vinothini S — Fashion, Branding & Marketing",
  description:
    "Selected works 2026 by Vinothini S: Koskii × Bridgerton, Zouk, NIRVAA, SNITCH and SkillKart — fashion business, branding and marketing projects.",
  authors: [{ name: "Vinothini S" }],
  openGraph: {
    title: "Vinothini S — Fashion, Branding & Marketing",
    description: "Selected works 2026: brand collaboration, retail strategy, brand extension, launch campaign and product concept.",
    type: "website",
    images: ["/media/window-display.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinothini S — Fashion, Branding & Marketing",
    description: "Selected works 2026: brand collaboration, retail strategy, brand extension, launch campaign and product concept.",
    images: ["/media/window-display.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f3ede2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/media/avatar.webp" />
      </head>
      <body>{children}</body>
    </html>
  );
}
