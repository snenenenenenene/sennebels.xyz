import React from "react";
// import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import Link from 'next/link'

export default function Footer() {
  return (
    <header className="backdrop-filter backdrop-blur-sm py-3">
      <div className="container mx-auto flex flex-wrap flex-row items-center">
          <div className="text-white mx-auto">
          <p >
          © 2021 Senne Bels. All Rights Reserved.
          </p>
          </div>
      </div>
    </header>
  );
}
