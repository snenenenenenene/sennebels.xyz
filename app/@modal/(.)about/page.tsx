"use client";

import { TIMELINE_ITEMS, GEAR_ITEMS, ACHIEVEMENTS } from "../../constants";
import Image from "next/image";

export default function AboutModal() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-[36px] sm:rounded-[40px] md:rounded-[80px] h-[360px] sm:h-[320px] md:h-[500px] overflow-hidden mb-12">
        <Image
          src="/images/me.png"
          alt="Senne Bels"
          width={2048}
          height={1365}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      <section className="mb-12">
        <h1 className="text-[1.8rem] sm:text-[2rem] md:text-[2.5rem] font-semibold leading-[140%] mb-6">
          About Me
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 mt-0 mb-10">
          Hey, I&apos;m Senne! INFP-T, full-stack developer, and a creative tech enthusiast from Antwerp.
          I focus on building interactive and innovative web experiences, blending functionality with fun.
          Currently, I&apos;m diving into creative tech while tackling projects like *The Okapi Store*—my e-commerce platform to support okapi conservation.<br /><br />

          Outside of work, you&apos;ll find me adventuring with my pets, enjoying gaming classics (Minecraft, Zelda), and exploring cities like Munich and Bergen.
          My tech setup keeps me efficient, including:
          <span className="block pl-4 border-l-2 border-[#ff8564] mt-4">
            {GEAR_ITEMS.map((gear, index) => (
              <span key={index} className="block mb-1">{gear}</span>
            ))}
          </span>
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[1.5rem] sm:text-[1.8rem] font-semibold mb-6">Timeline</h2>
        <div className="space-y-6">
          {TIMELINE_ITEMS.map((item, index, array) => (
            <div key={index} className="relative py-4 pl-8">
              <div className="absolute left-0 top-[1.15rem] w-4 h-4 rounded-full bg-neutral-800 dark:bg-neutral-200" />
              {index !== array.length - 1 && (
                <div className="absolute left-[7px] top-6 w-[1px] h-[calc(100%-20px)] bg-neutral-800 dark:bg-neutral-200" />
              )}
              <h3 className="text-base font-bold inline">{item.year}</h3>
              <p className="text-neutral-600 dark:text-neutral-300 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-[1.5rem] sm:text-[1.8rem] font-semibold mb-6">Achievements</h2>
        <ul className="list-disc pl-5 text-neutral-600 dark:text-neutral-300 space-y-2">
          {ACHIEVEMENTS.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </section>
    </div>
  );
} 