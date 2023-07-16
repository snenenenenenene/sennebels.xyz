import { Marquee } from "@/app/components/common/Marquee";
import { ProjectNavigation } from "@/app/components/common/ProjectNavigation";
import Image from "next/image";

export default function Musicians() {
  return (
    <div className="w-full min-h-screen h-full pt-20 flex-col">
      <main className="md:px-24 px-8 my-10 md:my-32 flex h-full flex-col md:flex-row relative">
        <div className="w-full md:w-1/2 pr-24 max-h-fit">
          <h1 className="font-bold text-8xl mb-8">MUSICIANS</h1>
          <p>
            Musicians is the brainchild of Jstack and me. This project was
            intended to create an intuitive and pragmatic way for young artists
            to sell demo&apos;s, tracks, and samples to potential investors.
            This is possible through the online interface, as well as through a
            scannable QR-code. As I was working on the project as a frontend
            developer most functionalities are wired through a mock API instead
            of an actual backend.
          </p>
          <section className="flex font-body my-20">
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
                href="https://musicians-blond.vercel.app/"
                className="underline-offset-2"
              >
                View Demo
              </a>
              <a
                href="https://github.com/snenenenenenene/musicians-frontend"
                className="underline-offset-2"
              >
                View Project
              </a>
            </span>
          </section>
        </div>
        <div className="w-full md:w-1/2 h-full flex flex-col gap-y-20">
          <section className="relative object-cover w-full h-96">
            <Image
              fill
              alt="image-1"
              src="/assets/images/web/musicians.png"
              className="w-full object-contain"
            />
          </section>
          <section className="relative object-cover w-full h-96">
            <Image
              fill
              alt="image-1"
              src="/assets/images/web/swiping.png"
              className="w-full object-contain"
            />
          </section>
          <section className="relative object-cover w-full h-96">
            <Image
              fill
              alt="image-1"
              src="/assets/images/web/artist.png"
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
        ]}
      />
      <ProjectNavigation
        prevLink="/project/flanders"
        nextLink="/project/portfolios"
      />
    </div>
  );
}
