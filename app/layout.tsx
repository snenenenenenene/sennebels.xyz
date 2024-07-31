import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Navbar from "./components/navbar";
import Providers from "./components/providers";

export const metadata: Metadata = {
  title: "snenenenene - Creative Developer",
  description: "Creative developer who focuses on creating interactive, game-like websites",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-light-quaternary w-screen h-screen overflow-hidden ">
        <Providers>
          {children}
          <Navbar />
        </Providers>
      </body>
    </html>
  );
}
