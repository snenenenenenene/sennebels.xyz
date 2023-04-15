"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export const Project = ({
  title,
  link,
  image,
  className,
}: {
  title: string;
  link: string;
  image: string;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <section
      className={` ${className} w-full 2xl:h-[45rem] xl:h-[30rem] lg:h-[30rem] md:h-[30rem] xs:h-[30rem] h-[10rem] dark:border-dark-secondary border-light-secondary`}
    >
      <svg style={{ display: "none" }}>
        <defs>
          <filter id="noise">
            <feTurbulence
              baseFrequency="0.7,0.8"
              seed="0"
              type="fractalNoise"
              result="static"
            >
              <animate
                attributeName="seed"
                values="0;100"
                dur="800ms"
                repeatCount="1"
                begin="card.mouseenter"
              />
            </feTurbulence>
            <feDisplacementMap
              scale={isHovered ? 10 : 0}
              in="SourceGraphic"
              in2="static"
            >
              <animate
                attributeName="scale"
                values="0;60;"
                dur="800ms"
                repeatCount="1"
                begin="card.mouseenter"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>
      <Link
        href={link}
        className="border-2 border-light-primary dark:border-dark-primary dark:hover:border-dark-secondary overflow-hidden sm:p-8 p-2 xs:p-10 hover:border-light-secondary w-full h-full flex flex-col"
      >
        <section className="h-full card w-full overflow-hidden relative">
          <Image
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            src={image}
            className="w-full card noise h-full object-cover hover:scale-110 transition-all duration-200"
            alt=""
            unoptimized
            fill
          />
        </section>
        <p className="sm:text-6xl text-3xl font-display ml-auto mt-2 xs:mt-5">
          {title}
        </p>
      </Link>
    </section>
  );
};
