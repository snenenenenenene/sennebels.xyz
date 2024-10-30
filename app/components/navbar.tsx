"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  const NavLink = ({ href, external = false, children }: { href: string, external?: boolean, children: React.ReactNode }) => (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      onClick={() => setIsOpen(false)}
      className={`
        text-center
        rounded-xl 
        px-3 
        py-5
        md:py-2.5 
        transition-colors
        hover:bg-gradient-to-br 
        hover:from-white/20 
        hover:to-white/70
        text-base
        md:text-sm
        ${isActive(href) ? 'font-bold' : 'font-medium'}
      `}
    >
      {children}
    </Link>
  )

  return (
    <div className="fixed w-full top-0 z-50 bg-[#fdfcf9] md:bg-transparent py-4 md:py-6">
      <div className="max-w-8xl px-6 md:px-8 mx-auto grid grid-cols-[1fr,auto,auto] md:grid-cols-[auto,1fr] items-center gap-4 md:gap-8">
        {/* Logo - Left on mobile, Right on desktop */}
        <Link
          href="/"
          className="flex items-center order-1 md:order-2 justify-self-start md:justify-self-end"
          onClick={() => setIsOpen(false)}
        >
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl md:font-extrabold md:text-gray-800">
            Senne Bels
          </h2>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="order-3 w-11 h-11 flex items-center justify-center rounded-lg md:hidden hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>

        {/* Navigation */}
        <div className={`
          order-2 
          ${isOpen ? 'flex' : 'hidden'} 
          md:flex 
          justify-end 
          w-full
          absolute 
          md:relative 
          top-full 
          md:top-auto 
          left-0 
          md:left-auto
          bg-[#fdfcf9] 
          md:bg-transparent
          shadow-lg
          md:shadow-none
          rounded-b-3xl
          md:rounded-none
          ${isOpen ? 'px-6 md:px-0' : ''}
        `}>
          <nav className="
            flex 
            flex-col 
            md:flex-row 
            w-full
            md:w-auto
            md:bg-[rgba(179,179,179,0.1)] 
            md:backdrop-blur-[18px] 
            md:rounded-xl 
            py-5
            md:py-[5px] 
            px-5
            md:px-2
          ">
            <NavLink href="https://read.cv/snenenenene" external>
              Resume
            </NavLink>

            <NavLink href="/about">
              About
            </NavLink>

            <NavLink href="/work">
              Work
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}