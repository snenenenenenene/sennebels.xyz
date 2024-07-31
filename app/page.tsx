"use client"
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="">
      <span className="absolute top-[5rem] left-1/2 -translate-x-1/2 uppercase text-[5rem] leading-[5rem]  md:text-[8rem] md:leading-[8rem] text-center font-anton text-dark-quaternary">
        <h1>Creative<br /> Developer</h1>
      </span>
      <div className="bg-dark-quaternary h-80 w-80 aspect-square absolute top-[45%] rounded-full left-1/2 -translate-x-1/2">
        <Image
          src="/images/okapi.png"
          alt="Picture of the author"
          width={320}
          height={320}
          className="rounded-full p-10"
        />
      </div>
      {/* <section className="md:visible invisible"> */}
      {/* <div className="h-80 w-80 aspect-square absolute top-[45%] rounded-full right-1/2 -translate-x-1/2">
          <Image width={320} height={320} src="/images/desk.webp" />
        </div> */}
      {/* </section> */}
    </main>
  );
}
