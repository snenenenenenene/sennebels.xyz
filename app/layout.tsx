// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  metadataBase: new URL('https://sennebels.xyz'),
  title: {
    default: "Senne Bels - Creative Developer",
    template: "%s | Senne Bels"
  },
  description: "Creative developer focused on building interactive and innovative digital experiences. Specializing in web development and creative technologies.",
  keywords: [
    "Creative Developer",
    "Web Development",
    "UI/UX Design",
    "Interactive Websites",
    "Full Stack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "Senne Bels",
    "Belgium Developer",
    "Antwerp Developer"
  ],
  authors: [{ name: "Senne Bels", url: "https://sennebels.xyz" }],
  creator: "Senne Bels",
  publisher: "Senne Bels",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_UK",
    url: "https://sennebels.xyz",
    siteName: "Senne Bels",
    title: "Senne Bels - Creative Developer",
    description: "Creative developer focused on building interactive, game-like websites and innovative digital experiences.",
    images: [
      {
        url: "/assets/screenshot.png",
        width: 1200,
        height: 630,
        alt: "Senne Bels - Creative Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Senne Bels - Creative Developer",
    description: "Creative developer focused on building interactive websites and innovative digital experiences.",
    creator: "@snenenenene",
    images: ["/assets/screenshot.png"],
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/icon.ico", type: "image/x-icon" },
      { url: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/images/logo.png" },
    ],
    other: [
      { rel: "mask-icon", url: "/images/safari-pinned-tab.svg", color: "#000000" },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: "your-google-site-verification",
    yandex: "yandex-verification",
    me: ["mailto:contact@sennebels.xyz"],
  },
  alternates: {
    canonical: "https://sennebels.xyz",
    languages: {
      'en-US': 'https://sennebels.xyz',
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/circletype@2.3.0/dist/circletype.min.js" defer />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full">
        <Analytics />
        {children}
        {modal}
      </body>
    </html>
  );
}