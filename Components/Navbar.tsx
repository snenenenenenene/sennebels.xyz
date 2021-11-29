import React from "react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="bg-grey-transparent backdrop-filter backdrop-blur-sm md:sticky top-0 z-10">
      <div className="container mx-auto flex flex-wrap flex-row items-center">
        <a className="title-font font-medium hover:shadow-lg hover:text-cyan text-white mb-0">
          <Link href="/home">
            <div className="mx-1.5 text-xl flex">
            <img src="/minecraft.svg" className="w-10"/>
            <p className="my-auto">Senne Bels</p>
            </div>
          </Link>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center text-gray-300 body-font">
          <a href="#skills" className="mx-2.5 hover:text-change-light hover:underline hover:pb-10 hover:border-t-2 border-change-light">
            Skills
          </a>
          <a href="#contact" className="mx-2.5 hover:text-change-light hover:underline">
            Contact
          </a>
          <div className="mx-2.5 hover:text-change-light hover:underline">
          <Link href="/blog" >
            Blog
          </Link>
          </div>
          <a href="https://github.com/snenenenenenene/sennebels.xyz" className="mx-2.5 hover:text-change-light hover:underline">
            Source Code
          </a>
        </nav>

        <a
          href="/Files/resume.pdf"
          download
          className="inline-flex items-center inline-flex text-black bg-cyan border-0 py-2 px-6 focus:outline-none hover:bg-cyan-dark rounded text-lg">
          My Resume
        </a>
        <a
          className="inline-flex items-center inline-flex text-black bg-change-light border-0 p-3 m-2 sm:m-1 focus:outline-none hover:bg-change-lighthover rounded text-lg">
          <SunIcon/>
        </a>
      </div>
    </header>
  );
}
