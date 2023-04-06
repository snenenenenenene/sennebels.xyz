"use client";

import { Marquee } from "@/app/components/common/Marquee";
import { ProjectNavigation } from "@/app/components/common/ProjectNavigation";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ThreePortfolio() {
  const { theme } = useTheme();

  return (
    <div className="w-full min-h-screen h-full pt-20 flex-col">
      <main className="md:px-24 px-8 my-10 md:my-32 flex h-full flex-col md:flex-row relative">
        <div className="w-full md:w-1/2 pr-24 max-h-fit">
          <h1 className="font-display text-8xl mb-8">PORTFOLIOS</h1>
          <p className="mb-20">
            Hey there! I just wanted to share with you something I&apos;m really
            proud of - I created multiple portfolio websites throughout my time
            in university and work.
            <br />
            <br /> My first website was a modern one built with NextJS. I wanted
            to keep it simple and professional, showcasing my work and
            achievements in a clean and easy-to-navigate design.
            <br />
            <section className="flex font-body my-20">
              <span className="flex flex-col">
                <p>YEAR</p>
                <p> 2021-2023</p>
              </span>
              <span className="flex flex-col ml-20">
                <p>ROLE</p>
                <p>Development</p>
              </span>
              <span className="flex flex-col justify-end ml-auto">
                <a
                  href="https://www.sennebels.xyz"
                  className="underline-offset-2"
                >
                  View Demo
                </a>
              </span>
            </section>
            <br /> For my next website, I was inspired by the 20s art style of
            Cuphead, so I decided to create a website in that style using React.
            I wanted to show off my creativity and have some fun with the
            design, while still maintaining a professional edge.
            <br />
            <br />
            <section className="flex font-body my-20">
              <span className="flex flex-col">
                <p>YEAR</p>
                <p> 2021-2023</p>
              </span>
              <span className="flex flex-col ml-20">
                <p>ROLE</p>
                <p>Development</p>
              </span>
              <span className="flex flex-col justify-end ml-auto">
                <a
                  href="https://20s-portfolio.vercel.app/"
                  className="underline-offset-2"
                >
                  View Demo
                </a>
              </span>
            </section>
            The third website I made features a 3D model of a room, created
            using ThreeJS and GSAP. I was really interested in 3D modeling and
            animation, so I wanted to incorporate that into my portfolio.
            I&apos;m really proud of how this one turned out - it&apos;s a great
            showcase of my skills and my passion for the craft.
            <br />
            <br />
            <section className="flex font-body my-20">
              <span className="flex flex-col">
                <p>YEAR</p>
                <p> 2021-2023</p>
              </span>
              <span className="flex flex-col ml-20">
                <p>ROLE</p>
                <p>Development</p>
              </span>
              <span className="flex flex-col justify-end ml-auto">
                <a
                  href="https://3d-portfolio-seven-alpha.vercel.app/"
                  className="underline-offset-2"
                >
                  View Demo
                </a>
              </span>
            </section>
            Finally, my latest website is another 3D one, but this time it
            features a ramen shop with sound effects. I wanted to create an
            immersive experience for visitors, and I thought sound effects would
            really enhance the overall feel of the website.
            <br />
            <br />
            <section className="flex font-body my-20">
              <span className="flex flex-col">
                <p>YEAR</p>
                <p> 2021-2023</p>
              </span>
              <span className="flex flex-col ml-20">
                <p>ROLE</p>
                <p>Development</p>
              </span>
              <span className="flex flex-col justify-end ml-auto">
                <a
                  href="https://sennes-ramenshop-portfolio.vercel.app/"
                  className="underline-offset-2"
                >
                  View Demo
                </a>
              </span>
            </section>
            I&apos;m really proud of the fact that I was able to create multiple
            websites with different themes and styles. It shows that I&apos;m
            versatile and able to adapt to different technologies and design
            trends. I&apos;m excited to keep learning and growing in this field
            and see what other projects I can tackle in the future!
          </p>
        </div>
        <div className="w-full md:w-1/2 h-full flex flex-col gap-y-20">
          <section className="relative object-cover w-full h-96">
            {theme === "dark" ? (
              <Image
                fill
                alt="image-1"
                src={"/assets/images/web/current-portfolio-dark.png"}
                className="w-full object-contain"
              />
            ) : (
              <Image
                fill
                alt="image-1"
                src={"/assets/images/web/current-portfolio.png"}
                className="w-full object-contain"
              />
            )}
          </section>
          <section className="relative object-cover w-full h-96">
            {theme === "dark" ? (
              <Image
                fill
                alt="image-1"
                src="/assets/images/web/20s-portfolio-dark.png"
                className="w-full object-contain"
              />
            ) : (
              <Image
                fill
                alt="image-1"
                src="/assets/images/web/20s-portfolio.png"
                className="w-full object-contain"
              />
            )}
          </section>
          <section className="relative object-cover w-full h-96">
            {theme === "dark" ? (
              <Image
                fill
                alt="image-1"
                src="/assets/images/web/room-portfolio-dark.png"
                className="w-full object-contain"
              />
            ) : (
              <Image
                fill
                alt="image-1"
                src="/assets/images/web/room-portfolio.png"
                className="w-full object-contain"
              />
            )}
          </section>
          <section className="relative object-cover w-full h-96">
            <Image
              fill
              alt="image-1"
              src="/assets/images/web/3d.png"
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
        prevLink="/project/musicians"
        nextLink="/project/dnd-app"
      />
    </div>
  );
}
