import React from "react";
import Socials from "./Socials";
import Image from "next/image";
export default function About() {
  return (
    <section id="about" className="text-gray-400 bg-grey body-font mt-10">
      <div className="w-150 h-150 absolute top-70 right-40">
      <Image src="/profilepic.jpeg" width="150" height="150" className="rounded-full"/>
      </div>
      <div className="container mx-auto flex flex-col">
        <div className=" flex flex-col items-start mb-16 md:mb-0">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Hi, I&apos;m Senne!
          </h1>
          <p className="mb-8 leading-relaxed text-justify">
            Technology is all around us! I live to put even more software out there. You might think: Why does this 21-year old act as if he were a seasoned senior developer. To that I say:&quot;I might not be as experienced as the developer next door. However, I do and will do my best to make software that reaches your expectations and more. Adding the extra spice wherever needed.&quot;
          </p>
          <div className="flex justify-center m-auto">
            <a
              href="#contact"
              className="inline-flex text-black bg-cyan border-0 py-2 px-6 focus:outline-none hover:bg-cyan-dark rounded text-lg">
              Contact Me
            </a>
          </div>
        </div>
      </div>
      <Socials/>
    </section>
  );
}
