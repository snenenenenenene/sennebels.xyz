import Link from "next/link";

export const ProjectNavigation = ({
  prevLink,
  nextLink,
}: {
  prevLink: string;
  nextLink: string;
}) => {
  return (
    <nav className="w-full h-[28rem] flex font-display text-[13rem]">
      <section className="w-1/2 h-full border-y border-light-secondary dark:border-dark-secondary  border-r">
        <Link
          href={prevLink}
          className="w-full h-full dark:font-outline-dark-2 dark:text-dark-primary font-outline-2 text-light-primary dark:hover:font-outline-dark-0 hover:text-light-secondary dark:hover:text-dark-secondary hover:border-2 hover:font-outline-0 border-light-secondary flex justify-center items-center"
        >
          <h2>PREV</h2>
        </Link>
      </section>
      <section className="w-1/2 h-full border-y border-light-secondary dark:border-dark-secondary">
        <Link
          href={nextLink}
          className="w-full h-full dark:font-outline-dark-2 dark:text-dark-primary font-outline-2 text-light-primary dark:hover:font-outline-dark-0 hover:text-light-secondary dark:hover:text-dark-secondary hover:border-2 hover:font-outline-0 border-light-secondary flex justify-center items-center"
        >
          <h2>NEXT</h2>
        </Link>
      </section>
    </nav>
  );
};
