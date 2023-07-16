import { ReactNode, SVGProps } from "react";
import {
  FaChevronRight,
  FaGithubAlt,
  FaLinkedinIn,
  FaMapPin,
} from "react-icons/fa";
import Logo from "./Logo";

export function ConnectIcon({ href, icon }: { href: string; icon: ReactNode }) {
  return (
    <li className="text-5xl p-3 flex justify-center items-center hover:scale-110 cursor-pointer transition-all duration-200 bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-primary">
      <a target="_blank" href={href}>
        {icon}
      </a>
    </li>
  );
}

export const FooterImage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="997.38mm"
    height="134.4mm"
    data-name="Laag 2"
    viewBox="0 0 2827.22 380.98"
    {...props}
  >
    <path
      d="M0 380.98V31.22L518.09 0l615.25 42.78 651.51-11.56 368.23 22.84 674.14-22.84-.45 349.76H0z"
      data-name="Laag 1"
    />
  </svg>
);

export function FooterSection({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col gap-y-4">
      <h3 className="text-3xl uppercase font-bold">{children}</h3>
      <ul className="flex flex-col gap-y-4 mt-4 text-xl uppercase font-bold"></ul>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="w-full flex min-h-[20rem] h-fit relative dark:text-dark-secondary text-light-secondary">
      {/* <FooterImage className="z-20 select-none h-full w-full absolute top-0 bottom-0" /> */}
      <section className="flex md:flex-row flex-col z-20 w-full justify-between items-start gap-y-10 md:gap-y-0 md:items-center px-10 pt-32 md:pt-0">
        <Logo className="select-none" width={150} height={150} />
        <section>
          <h3 className="text-3xl uppercase h-8 md:h-16 font-bold">Find me</h3>
          <ul className="flex gap-x-4 h-16 mt-2 text-xl uppercase font-bold">
            <ConnectIcon
              href="https://www.google.com/maps/place/Brugsesteenweg+101,+8520+Kuurne/"
              icon={<FaMapPin />}
            />
            <span className="flex flex-col h-16 justify-center items-center">
              <h5 className="text-sm">2000, Antwerp</h5>
              <h3 className="text-[1.65rem]">Belgium</h3>
            </span>
          </ul>
        </section>
        <section>
          <h3 className="text-3xl uppercase h-8 md:h-16 font-bold">
            Connect with me
          </h3>
          <ul className="flex gap-x-4 mt-2 h-16 text-xl uppercase font-bold">
            <ConnectIcon
              href="https://www.linkedin.com/in/sennebels/"
              icon={<FaLinkedinIn />}
            />
            <ConnectIcon
              href="https://github.com/snenenenenenene"
              icon={<FaGithubAlt />}
            />
          </ul>
        </section>
        <section>
          <h3 className="text-3xl uppercase h-8 md:h-16 font-bold">Keep up</h3>
          <ul className="flex gap-x-4 mt-4 h-16 text-xl uppercase font-bold">
            <input
              placeholder="minecraftsteveboiiii@gmail.com"
              className="font-sans border-light-secondary dark:border-dark-secondary border text-light-secondary dark:text-dark-secondary h-12 py-2 px-4 w-56 text-sm"
            />
            <button className="bg-light-secondary h-12 text-light-text dark:bg-light-primary dark:text-light-secondary px-4 py-2 text-2xl">
              <FaChevronRight />
            </button>
          </ul>
        </section>
      </section>
    </footer>
  );
}
