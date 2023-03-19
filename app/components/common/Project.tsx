"use client";
import Image from "next/image";
import Link from "next/link";
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
  return (
    <section
      className={` ${className} w-full xl:h-[30rem] lg:h-[20rem] xs:h-[30rem] h-[10rem] dark:border-dark-secondary border-light-secondary`}
    >
      <Link
        href={link}
        className="border-2 border-light-primary dark:border-dark-primary dark:hover:border-dark-secondary overflow-hidden sm:p-8 p-2 xs:p-10 hover:border-light-secondary w-full h-full flex flex-col"
      >
        <section className="h-full relative">
          <Image
            src={image}
            className="w-full h-full object-cover"
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
