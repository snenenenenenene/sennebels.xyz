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
    <>
      <section
        className={` ${className} w-full 2xl:h-[45rem] xl:h-[30rem] lg:h-[30rem] md:h-[27rem] sm:h-[16rem] xs:h-[30rem] h-[10rem] dark:border-dark-secondary border-light-secondary`}
      >
        <Link
          href={link}
          className="border-2 border-light-primary dark:border-dark-primary dark:hover:border-dark-secondary overflow-hidden sm:py-4 sm:px-5 p-2 md:p-10 hover:border-light-secondary w-full h-full flex flex-col"
        >
          <section className="h-full card w-full overflow-hidden relative">
            <Image
              src={image}
              className="w-5/6 card h-5/6 md:scale-95 object-cover transition-all z-50 duration-700 md:hover:opacity-60"
              alt=""
              fill
            />
          </section>
          <p className="uppercase md:text-6xl text-3xl font-bold ml-auto mt-2 md:mt-5">
            {title}
          </p>
        </Link>
      </section>
    </>
  );
};
