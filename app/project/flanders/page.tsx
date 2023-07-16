import { Marquee } from "@/app/components/common/Marquee";
import { ProjectNavigation } from "@/app/components/common/ProjectNavigation";
import Image from "next/image";

export default function Flanders() {
  return (
    <div className="w-full min-h-screen h-full pt-20 flex-col">
      <main className="md:px-24 px-8 my-10 md:my-32 flex h-full flex-col md:flex-row relative">
        <div className="w-full md:w-1/2 md:pr-24 max-h-fit">
          <h1 className="font-bold text-8xl mb-8">AGENCY OF HOME AFFAIRS</h1>
          <p>
            After my last year of university, I was eager to gain more
            professional experience, so I applied to Open Summer of Code. I was
            thrilled to be placed in the group working for the Flemish Agency of
            Home Affairs, where we were tasked with creating an app called Lynx.
            The app gathers and harvests municipal (tax) data and visualizes it
            intuitively through a plethora of graphs as well as a map.
          </p>
          <p>
            I had such a great experience working on Lynx that I decided to keep
            working on it even after the hackathon ended. I continued to refine
            and develop the app, adding new features and improving its
            functionality.
          </p>
          <section className="flex font-body my-20 xs:mt-40">
            <span className="flex flex-col">
              <p>YEAR</p>
              <p> 2022</p>
            </span>
            <span className="flex flex-col ml-20">
              <p>ROLE</p>
              <p>Development</p>
            </span>
            <span className="flex flex-col justify-end ml-auto">
              <a
                href="https://lynx-osoc.netlify.app/"
                className="underline-offset-2"
              >
                View Demo
              </a>
              <a
                href="https://github.com/snenenenenenene/lynx-frontend"
                className="underline-offset-2"
              >
                View Project
              </a>
            </span>
          </section>
          <p>
            However, in February I was offered the opportunity to work on a new
            project called Bobcat. This project intends to inform users about
            the decisions their municipality took in Flanders, which is meant to
            inform voters for the upcoming Flemish election. It&apos;s a really
            important project that I&apos;m excited to be a part of.
          </p>
          <p>
            I&apos;ve learned so much through my experiences working on Lynx and
            now Bobcat. It&apos;s been amazing to work on projects that have
            real-world impact and help improve people&apos;s lives. I&apos;m
            excited to see where this journey takes me next and how I can
            continue to use my skills to make a difference.
          </p>

          <section className="flex font-body my-4 md:my-20 xs:mt-40">
            <span className="flex flex-col">
              <p>YEAR</p>
              <p> 2023</p>
            </span>
            <span className="flex flex-col ml-20">
              <p>ROLE</p>
              <p>Development</p>
            </span>
            <span className="flex flex-col justify-end ml-auto">
              <a
                href="https://lynx-osoc.netlify.app/"
                className="underline-offset-2"
              >
                View Demo
              </a>
              <a
                href="https://github.com/snenenenenenene/lynx-frontend"
                className="underline-offset-2"
              >
                View Project
              </a>
            </span>
          </section>
        </div>
        <div className="w-full md:w-1/2 h-full flex flex-col gap-y-4 md:gap-y-20">
          <section className="relative object-cover w-full h-[20rem]">
            <Image
              fill
              alt="image-1"
              src="/assets/images/web/lynx.png"
              className="w-full object-contain"
            />
          </section>
          <section className="relative object-cover w-full h-[20rem]">
            <Image
              fill
              alt="image-1"
              src="/assets/images/web/lynx-map.png"
              className="w-full object-contain"
            />
          </section>
          <section className="relative object-cover w-full h-[20rem]">
            <Image
              fill
              alt="image-1"
              src="/assets/images/web/lynx.png"
              className="w-full object-contain"
            />
          </section>
        </div>
      </main>

      <Marquee
        className="mt-auto border-b-0"
        wordList={[
          "MORE PROJECTS",
          "MORE PROJECTS",
          "MORE PROJECTS",
          "MORE PROJECTS",
          "MORE PROJECTS",
          "MORE PROJECTS",
          "MORE PROJECTS",
          "MORE PROJECTS",
          "MORE PROJECTS",
          "MORE PROJECTS",
          "MORE PROJECTS",
        ]}
      />
      <ProjectNavigation
        nextLink="/project/musicians"
        prevLink="/project/dnd-app"
      />
    </div>
  );
}
