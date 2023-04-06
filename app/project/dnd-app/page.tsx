import { Marquee } from "@/app/components/common/Marquee";
import { ProjectNavigation } from "@/app/components/common/ProjectNavigation";
import Image from "next/image";

export default function Dnd() {
  return (
    <div className="w-full min-h-screen h-full pt-20 flex-col">
      <main className="md:px-24 px-8 my-10 md:my-32 flex h-full flex-col md:flex-row relative">
        <div className="w-full md:w-1/2 pr-24 max-h-fit">
          <h1 className="font-display text-8xl mb-8">DND APP</h1>
          <p>
            I am quite the avid Dungeons & Dragons enjoyer. Because of this I
            thought it would be a great idea to work on a project that would
            makethe creation and distribution of sheets and campaigns easier.
            This was the start of this project.{" "}
          </p>
          <section className="flex font-body my-20">
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
                href="https://dnd-character-tool.vercel.app/"
                className="underline-offset-2"
              >
                View Demo
              </a>
              <a
                href="https://github.com/snenenenenenene/dnd-character-tool"
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
              alt="image-1"
              src="/assets/images/web/dnd-app.png"
              className="w-full object-cover"
              fill
            />
          </section>
          <section className="relative object-contain w-full h-96">
            <Image
              fill
              alt="image-1"
              src="/assets/images/web/dnd-app.png"
              className="w-full object-contain"
            />
          </section>
          <section className="relative object-cover w-full h-96">
            <Image
              fill
              alt="image-1"
              src="/assets/images/web/dnd-app.png"
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
        prevLink="/project/portfolios"
        nextLink="/project/flanders"
      />
    </div>
  );
}
