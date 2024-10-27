"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  const NavLink = ({ href, external = false, children }: { href: string, external?: boolean, children: React.ReactNode }) => (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
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
    <div className="fixed w-full top-0 z-50 bg-[#fdfcf9] md:bg-transparent px-2 sm:px-0 py-1">
      <div className="max-w-8xl px-8 mx-auto grid grid-cols-[1fr,auto,auto] md:grid-cols-[auto,1fr] items-center gap-4 md:gap-8">
        {/* Logo - Left on mobile, Right on desktop */}
        <Link
          href="/"
          className="flex items-center order-1 md:order-2 justify-self-start md:justify-self-end"
        >
          {/* <Image
            src="/images/okapi.png"
            alt="Logo"
            width={44}
            height={44}
            className="w-11"
          /> */}
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

            {/* Dropdown Menu */}
            {/* <div className="relative group hidden md:block">
              <div className={`
                rounded-xl 
                px-3 
                py-2.5 
                flex 
                items-center 
                cursor-pointer 
                transition-colors
                hover:bg-gradient-to-br 
                hover:from-white/20 
                hover:to-white/70
                ${(isActive('/contact') || isActive('/faq') || isActive('/notes')) ? 'font-bold' : 'font-medium'}
              `}>
                <span className="text-sm mr-1">More</span>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  className="w-2.5 h-2.5 ml-1"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="
                hidden 
                group-hover:block 
                absolute 
                top-full 
                left-0 
                bg-white 
                rounded-lg 
                shadow-lg 
                py-2 
                mt-2 
                min-w-[160px]
              ">
                <Link
                  href="/contact"
                  className={`block px-4 py-2 text-sm hover:bg-gray-50 ${isActive('/contact') ? 'font-bold' : ''}`}
                >
                  Contact me
                </Link>
                <Link
                  href="/faq"
                  className={`block px-4 py-2 text-sm hover:bg-gray-50 ${isActive('/faq') ? 'font-bold' : ''}`}
                >
                  FAQ
                </Link>
                <Link
                  href="/notes"
                  className={`block px-4 py-2 text-sm hover:bg-gray-50 ${isActive('/notes') ? 'font-bold' : ''}`}
                >
                  Notes
                </Link>
              </div>
            </div> */}
          </nav>
        </div>
      </div>
    </div>
  );
}