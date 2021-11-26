import React from "react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export default function Navbar() {
  return (
    <header className="bg-grey-transparent backdrop-filter backdrop-blur-sm md:sticky top-0 z-10">
      <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <a className="title-font font-medium text-white mb-4 md:mb-0">
          <a href="#about" className="ml-3 text-xl">
            Senne Bels
          </a>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center text-gray-300 body-font">
          {/* <a href="#projects" className="mr-5 hover:text-white">
            Past Work
          </a> */}
          <a href="#skills" className="mr-5 hover:text-white">
            Skills
          </a>
          <a href="#contact" className="mr-5 hover:text-white">
            Contact
          </a>
        </nav>

        <a
          href="/Files/resume.pdf"
          download
          className="inline-flex items-center inline-flex text-black bg-cyan border-0 py-2 px-6 focus:outline-none hover:bg-cyan-dark rounded text-lg">
          My Resume
        </a>
        <a
          className="inline-flex items-center inline-flex text-black bg-change-light border-0 py-3 px-3 md:m-2 focus:outline-none hover:bg-change-lighthover rounded text-lg">
          <SunIcon/>
        </a>
      </div>
    </header>
  );
}
