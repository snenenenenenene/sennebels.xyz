// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import Providers from "./components/providers";
import Footer from "./components/footer";
import SmoothScrolling from "./components/smoothScrolling";

export const metadata: Metadata = {
  metadataBase: new URL('https://sennebels.xyz'), // Replace with your domain
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
    "Senne Bels"
  ],
  authors: [{ name: "Senne Bels" }],
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
        url: "/images/logo.png", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Senne Bels - Creative Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Senne Bels - Creative Developer",
    description: "Creative developer focused on building interactive websites and innovative digital experiences.",
    creator: "@snenenenene", // Add your Twitter handle
    images: ["/images/twitter-image.png"], // Add your Twitter card image
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
      // { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      // { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  assets: [
    "https://cdn.jsdelivr.net/npm/circletype@2.3.0/dist/circletype.min.js"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/circletype@2.3.0/dist/circletype.min.js" defer />
      </head>
      <SmoothScrolling>
        <body className="min-h-full">
          <Providers>
            {children}
            <Navbar />
          </Providers>
          <Footer />
        </body>
      </SmoothScrolling>
    </html>
  );
}