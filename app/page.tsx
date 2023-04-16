"use client";

import { useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { TfiEmail, TfiGithub, TfiLinkedin } from "react-icons/tfi";
import { Marquee } from "./components/common/Marquee";
import { Project } from "./components/common/Project";
import Tanuki from "./components/common/Tanuki";
import { ThreeDProjects } from "./components/common/ThreeDProjects";
import { MotionHover } from "./components/three/3d";
import { AppLoader } from "./utils/AppLoader";

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);
  const { progress } = useProgress();
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const modelRef: any = useRef();
  const [ThreeDHoverPath, setThreeDHoverPath] = useState<string>("");
  const { isLoaded, firstTransition } = useContext(AppLoader);

  useEffect(() => {
    if (progress === 100) {
      firstTransition();
    }
  }, [progress]);

  return (
    <div
      onMouseMove={(e) => {
        const x = e.pageX - e.currentTarget.offsetLeft;
        const y = e.pageY - e.currentTarget.offsetTop;
        setMousePos({ x: x, y: y });
        // setMousePos({ x: e.clientX, y: e.clientY });
      }}
      className="flex flex-col relative"
    >
      {!isLoaded && (
        <div
          id="loading"
          className="loading fixed flex inset-0 w-full h-full z-50 justify-center items-center bg-light-primary dark:bg-dark-primary text-9xl font-bold"
        >
          <span className="L" id="L">
            L
          </span>
          <span className="O" id="O">
            O
          </span>
          <span className="A" id="A">
            A
          </span>
          <span className="D" id="D">
            D
          </span>
          <span className="I" id="I">
            I
          </span>
          <span className="N" id="N">
            N
          </span>
          <span className="G" id="G">
            G
          </span>
        </div>
      )}

      <Canvas style={{ height: "100%", position: "absolute" }}>
        <Suspense fallback={null}>
          <pointLight position={[10, 10, 10]} color="#fff0f0" />
          <ambientLight intensity={1} />
          {/* <Model
            ref={modelRef}
            scale={2}
            rotation={[Math.PI / 2, -Math.PI / 4, Math.PI / 4]}
            position={[0, -210, -400]}
          /> */}
          <Tanuki
            ref={modelRef}
            scale={35}
            position={[130, 220, -500]}
            rotation={[
              Math.PI / 6 - mousePos.x / 5000,
              Math.PI / 1.3 + mousePos.y / 5000,
              0,
            ]}
          />

          {ThreeDHoverPath !== "" && (
            <MotionHover
              scale={0.1}
              image={ThreeDHoverPath}
              position={undefined}
            />
          )}
        </Suspense>
      </Canvas>
      <main className="sm:px-8 px-4 sm:pt-40 pt-20 flex h-full w-full relative">
        <h1 className="z-10 font-display 2xl:text-[44.2rem] 2xl:leading-[42rem] lg:text-[27.5rem] xl:text-[25.8rem] md:text-[15rem] xl:leading-[24.5rem] lg:leading-[26rem] xs:leading-[9.5rem] leading-[6.7rem] md:leading-[14rem] xs:text-[10rem] text-[7rem]">
          <div className="tracking-wide">Senne Bels</div>
          <div className="flex">
            <div className="font-body 2xl:text-[4rem] 2xl:leading-[4rem] sm:text-2xl text-xs 2xl:w-[39.2rem] xl:w-[24.8rem] xs:w-[8.9rem] w-[6.2rem] md:w-[13.3rem] xs:mt-[1.5rem]  flex flex-col justify-center">
              <p>Hi 🦝</p>
              <p>I&apos;m a frontend developer</p>
              <p>from Belgium</p>
            </div>
            <div className="tracking-wide">Portfolio</div>
          </div>
        </h1>
      </main>
      <Marquee
        wordList={[
          "WEB DEVELOPMENT",
          "WEB DEVELOPMENT",
          "WEB DEVELOPMENT",
          "WEB DEVELOPMENT",
        ]}
      />

      <main className="w-full h-full z-20 grid grid-cols-2 dark:divide-dark-secondary divide-light-secondary">
        <Project
          className="border-r"
          link={"/project/flanders"}
          title="Flanders AAB"
          image="assets/images/web/lynx-logo.svg"
        />
        <Project
          title={"MUSICIANS"}
          link={"/project/musicians"}
          image={"assets/images/web/musicians.png"}
        />
        <Project
          title={"PORTFOLIOS"}
          link={"/project/portfolios"}
          image={"assets/images/web/3d.png"}
          className="border-r border-t"
        />
        <Project
          title={"DND APP"}
          link={"/project/dnd-app"}
          image={"assets/images/web/dnd-app.png"}
          className="border-t"
        />
      </main>

      <Marquee
        wordList={[
          "3D MODELS",
          "3D MODELS",
          "3D MODELS",
          "3D MODELS",
          "3D MODELS",
        ]}
      />
      <main className="w-full h-[20rem] flex flex-col relative">
        <section
          onMouseLeave={() => {
            setThreeDHoverPath("");
          }}
          className="absolute inset-0"
        >
          <ThreeDProjects
            year={"2022"}
            setThreeDHoverPath={setThreeDHoverPath}
            image="assets/images/3D/velociraptor.png"
            title={"VELOCIRAPTOR"}
          />
          <ThreeDProjects
            year={"2022"}
            setThreeDHoverPath={setThreeDHoverPath}
            image="assets/images/3D/room.png"
            title={"MY ROOM"}
          />
          <ThreeDProjects
            year={"2023"}
            setThreeDHoverPath={setThreeDHoverPath}
            image="assets/images/3D/laptop.png"
            title={"LAPTOP"}
          />
          <ThreeDProjects
            year={"2023"}
            setThreeDHoverPath={setThreeDHoverPath}
            image="assets/images/3D/pangolin.png"
            title={"PANGOLIN"}
          />
        </section>
      </main>
      <main className="w-full h-[35rem] xs:h-[40rem] md:h-[55rem] sm:py-40 border-t dark:border-dark-secondary border-light-secondary relative">
        <h2 className="font-display leading-[7rem] sm:text-[10rem] 2xl:text-[30rem] text-[6rem] text-center absolute left-1/2 top-1/2 -translate-y-1/2  -translate-x-1/2 ">
          Reach out
        </h2>
        <section className="text-7xl flex sm:px-40 px-10 2xl:px-[42rem] justify-between gap-x-10 sm:mt-[37rem] mt-[32rem] pb-10 xs:pb-0">
          <div className="cursor-pointer hover:scale-110">
            <a href="https://www.linkedin.com/in/sennebels/">
              <TfiLinkedin />
            </a>
          </div>
          <div>
            <p
              className="cursor-pointer hover:scale-110"
              onClick={() => {
                navigator.clipboard.writeText("sennebels@gmail.com");
              }}
            >
              <TfiEmail />
            </p>
          </div>
          <div className="cursor-pointer hover:scale-110">
            <a href="https://github.com/snenenenenenene">
              <TfiGithub />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
