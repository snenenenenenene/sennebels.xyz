/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Logo from "./Logo";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const navbar = useRef<any>(null);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const activeSegment = useSelectedLayoutSegment();

  function controlNavbar() {
    if (typeof window !== "undefined") {
      if (window.scrollY < lastScrollY || window.scrollY < 32) {
        setShow(true);
      } else {
        setShow(false);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav
      ref={navbar}
      className={`${
        show
          ? "h-20 border-b dark:border-dark-primary border-light-primary"
          : "h-0"
      } fixed bg-light-secondary text-light-primary dark:text-light-secondary dark:bg-dark-secondary z-50 transition-all duration-500 overflow-hidden font-body w-full  flex`}
    >
      <section className="border-r text-5xl dark:border-dark-primary border-light-primary flex justify-center items-center w-20 h-full">
        <Link className="w-full p-2" href={"/"}>
          {/* <h2 className="font-display tracking-wide">Senne Bels</h2> */}
          <Logo />
        </Link>
      </section>
      <section className="flex items-center ml-auto gap-8 px-8">
        <Link
          href={"/"}
          className={`nav-item ${
            activeSegment === "" || activeSegment === null
              ? "underline underline-offset-4"
              : ""
          }`}
        >
          PROJECTS
        </Link>
        <Link
          href={"/about"}
          className={`nav-item ${
            activeSegment === "about" ? "underline underline-offset-4" : ""
          }`}
        >
          ABOUT
        </Link>
      </section>
      <div
        // onClick={() => toggleTheme()}
        className="w-40 border-l dark:border-dark-primary border-light-primary flex justify-center items-center"
      >
        <button
          title="Toggle Theme"
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
          className="
        w-12
        h-5
        rounded-full
        p-1
        ring-light-primary
        dark:ring-dark-primary
        relative
        transition-colors
        duration-500
        ease-in
        outline-none
        flex
        items-center
        ring-1
      "
        >
          <div
            id="toggle"
            className="
            rounded-full
            w-[0.9rem]
            h-[0.9rem]
            bg-light-primary
            dark:bg-dark-primary
            relative
            ml-[1.7rem]
            dark:ml-0
            pointer-events-none
            transition-all
            duration-300
            ease-out
            z-50
        "
          />
          <div className="dark:text-dark-primary text-light-primary absolute top-o left-0 m-1">
            <FaSun className="w-3 h-3" />
          </div>
          <div className=" absolute top-o right-0 m-1 text-light-primary dark:text-dark-primary">
            <FaMoon className="w-3 h-3" />
          </div>
        </button>
      </div>
    </nav>
  );
};
