"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import CircularClipPath from "./components/circularClipPath";

export default function Home() {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000); // Duration of the animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative w-full h-screen bg-light-quaternary dark:bg-dark-accent overflow-hidden">
      <CircularClipPath />

      <span className="absolute top-[5rem] left-1/2 -translate-x-1/2 uppercase text-[5rem] leading-[5rem]  md:text-[8rem] md:leading-[8rem] text-center font-anton text-dark-quaternary dark:text-dark-accent">
        <h1>Creative<br /> Developer</h1>
      </span>
      <div className="bg-dark-quaternary dark:bg-dark-accent h-80 w-80 aspect-square absolute top-[45%] rounded-full left-1/2 -translate-x-1/2">
        <Image
          src="/images/okapi.png"
          alt="Picture of the author"
          width={320}
          height={320}
          className="rounded-full p-10"
        />
      </div>
    </main>
  );
}
