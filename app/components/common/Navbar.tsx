/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  // const currentTheme = theme === 'system' ? systemTheme : theme;

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
          ? "h-14 border-b dark:border-dark-secondary border-light-secondary"
          : "h-0"
      } fixed z-50 transition-all duration-500 dark:bg-dark-primary bg-light-primary overflow-hidden font-body w-full  flex`}
    >
      <section className="border-r text-5xl dark:border-dark-secondary border-light-secondary flex justify-center items-center sm:w-40 w-80 h-full">
        <Link href={"/"}>
          <h2 className="font-display tracking-wide">Senne Bels</h2>
        </Link>
      </section>
      <section className="flex items-center ml-auto gap-8 px-8">
        <Link
          href={"/"}
          className={`${
            activeSegment === "" || activeSegment === null
              ? "underline underline-offset-4"
              : ""
          }`}
        >
          PROJECTS
        </Link>
        <Link
          href={"/about"}
          className={`${
            activeSegment === "about" ? "underline underline-offset-4" : ""
          }`}
        >
          ABOUT
        </Link>
      </section>
      <div
        // onClick={() => toggleTheme()}
        className="w-40 border-l dark:border-dark-secondary border-light-secondary flex justify-center items-center"
      >
        <button
          title="Toggle Theme"
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
          className="
        w-10
        h-5
        rounded-full
        p-1
        ring-light-secondary
        dark:ring-dark-secondary
        relative
        transition-colors
        duration-500
        ease-in
        outline-none
        flex
        items-center
        ring-2

      "
        >
          <div
            id="toggle"
            className="
            rounded-full
            w-[0.8rem]
            h-[0.8rem]
            bg-light-secondary
            dark:bg-dark-secondary
            relative
            ml-[1.2rem]
            dark:ml-0
            pointer-events-none
            transition-all
            duration-300
            ease-out
            z-50
        "
          />
          <div className="text-light-secondary absolute top-o left-0 m-1">
            <FaSun className="w-3 h-3" />
          </div>
          <div className=" absolute top-o right-0 m-1 dark:text-dark-secondary">
            <FaMoon className="w-3 h-3" />
          </div>
        </button>
      </div>
    </nav>
  );
};
