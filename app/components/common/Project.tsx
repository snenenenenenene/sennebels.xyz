import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { v4 as uuid } from "uuid";

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
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const id = uuid();

  const noiseFilter = (
    <svg style={{ display: "none" }}>
      <defs>
        <filter id={`noise-${id}`}>
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
              begin="mouseover"
            />
          </feTurbulence>
          <feDisplacementMap
            scale={isHovered ? 10 : 0}
            in="SourceGraphic"
            in2="static"
          >
            <animate
              attributeName="scale"
              values="0;60;0"
              dur="800ms"
              repeatCount="1"
              begin="mouseover"
            />
          </feDisplacementMap>
        </filter>
      </defs>
    </svg>
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const { clientX, clientY } = event;
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width) * 2 - 1;
    const y = ((clientY - top) / height) * 2 - 1;
    setImagePosition({ x, y });
  };

  return (
    <>
      {noiseFilter}
      <section
        className={` ${className} w-full 2xl:h-[45rem] xl:h-[30rem] lg:h-[30rem] md:h-[30rem] xs:h-[30rem] h-[10rem] dark:border-dark-secondary border-light-secondary`}
      >
        <Link
          href={link}
          className="border-2 border-light-primary dark:border-dark-primary dark:hover:border-dark-secondary overflow-hidden sm:p-8 p-2 xs:p-10 hover:border-light-secondary w-full h-full flex flex-col"
        >
          <section className="h-full card w-full overflow-hidden relative">
            <Image
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleMouseMove}
              src={image}
              className="w-5/6 card h-5/6 scale-95 object-cover transition-all z-50 duration-200 hover:opacity-60"
              alt=""
              fill
            />
            {isHovered && (
              <Image
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                src={image}
                className="w-full card h-full object-cover  transition-all duration-200 opacity-60"
                alt=""
                style={{
                  filter: `url(#noise-${id})`,
                  transform: `translate(${imagePosition.x * 20}px, ${
                    imagePosition.y * 20
                  }px)`,
                }}
                fill
              />
            )}
          </section>
          <p className="sm:text-6xl text-3xl font-display ml-auto mt-2 xs:mt-5">
            {title}
          </p>
        </Link>
      </section>
    </>
  );
};
