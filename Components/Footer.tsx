import React from "react";
// import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import Link from 'next/link'

export default function Footer() {
  return (
    <nav className="bg-black h-52 py-3 w-screen overflow-hidden">
      <div className="flex flex-wrap flex-row items-center h-full align-middle">
          <div className="text-white m-auto">
          <p >
          © 2022 Senne Bels. All Rights Reserved.
          </p>
          </div>
      </div>
    </nav>
  );
}
