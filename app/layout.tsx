// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import Providers from "./components/providers";
import Footer from "./components/footer";
import SmoothScrolling from "./components/smoothScrolling";

export const metadata: Metadata = {
  title: "Senne Bels - Creative Developer",
  description: "Creative developer who focuses on creating interactive, game-like websites",
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