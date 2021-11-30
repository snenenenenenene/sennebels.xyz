import React from "react";
import Socials from "./Socials";
import Image from "next/image";
export default function About() {
  return (
    <section id="about" className="text-gray-400 bg-grey body-font mt-10">
      <div className="image-container">
      <div className="w-150 h-150 relative invisible md:visible ">
      <Image src="/profilepic.jpeg" width="150" height="150" className="rounded-full hover:opacity-50 transition-all"/>
      </div>
      </div>
      <div className="container mx-auto flex flex-col">
        <div className=" flex flex-col items-start mb-16 md:mb-0">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Hi, I&apos;m Senne!
          </h1>
          <p className="mb-8 leading-relaxed text-justify">
            I&apos;m a fullstack developer from Antwerp, Belgium. I love using Javascript and Python! Frontend development is definitely my passion because it allows me to still be somewhat creative while profusely console.logging. Outside of web development I&apos;m also into Machine Learning &amp; Data Mining.
            Though I was born and raised in Belgium, it&apos;s always been my main ambition &amp; dream to move to Australia or Canada. A work permit or visa sponsorship is hence my number one must-have in a job.
          </p>
          <div className="flex justify-center mb-5">
            <a
              href="/Files/resume.pdf"
              download
              className="inline-flex text-black bg-cyan border-0 py-2 px-6 focus:outline-none hover:bg-cyan-dark rounded text-lg">
              My Resume
            </a>
          </div>
        </div>
      </div>
      <Socials/>
    </section>
  );
}
