import { ReactNode } from "react";
import Analytics from "./components/common/Analytics";
import { Navbar } from "./components/common/Navbar";
import "./globals.css";
import { Providers } from "./Providers";

export const metadata = {
  title: "Senne Bels",
  generator: "Next.js",
  category: "Portfolio",
  description: "Your favourite frontend developer",
  robots: {
    googleBot: {
      index: true,
    },
    index: true,
  },
  twitter: {
    card: "summary_large_image",
    site: "https://www.sennebels.xyz",
    title: "Senne Bels Web Portfolio",
    description: "Your favourite frontend developer",
    creator: "@sennebels",
    images: [
      {
        url: "https://sennebels.xyz/assets/images/twitter-pic.png",
        width: 800,
        height: 600,
      },
    ],
  },
  applicationName: "Senne Bels",
  keywords: ["Senne Bels", "Frontend", "Portfolio", "Web Portfolio"],
  authors: [{ name: "Senne Bels", url: "https://sennebels.xyz" }],
  creator: "Senne Bels",
  publisher: "Senne Bels",
  openGraph: {
    title: "Senne Bels",
    creators: ["@sennebels"],
    siteName: "Senne Bels Portfolio",

    description:
      "Welcome to the portfolio of Senne Bels, a frontend developer with expertise in building responsive and user-friendly web applications. Explore a collection of Senne Bels' latest projects, featuring cutting-edge technologies such as React, Next.js, and Tailwind.",
    url: "https://www.sennebels.xyz",
    images: [
      {
        url: "https://sennebels.xyz/assets/images/twitter-pic.png",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Providers>
          <div className="w-screen scroll-smooth overflow-x-hidden text-light-secondary dark:text-dark-secondary flex flex-col bg-light-primary dark:bg-dark-primary">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
