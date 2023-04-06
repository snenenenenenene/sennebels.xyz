import { ReactNode } from "react";
import Analytics from "./components/common/Analytics";
import { Navbar } from "./components/common/Navbar";
import "./globals.css";
import { Providers } from "./Providers";

export const metadata = {
  title: "Senne Bels",
  description: "Your favourite frontend developer",

  robots: {
    index: true,
  },

  openGraph: {
    title: "Senne Bels",
    description: "Your favourite frontend developer",
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
