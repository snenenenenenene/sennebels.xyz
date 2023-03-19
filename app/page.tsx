"use client";

import { useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { trackGoal } from "fathom-client";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { TfiEmail, TfiGithub, TfiLinkedin } from "react-icons/tfi";
import { House } from "./components/common/House";
import { Marquee } from "./components/common/Marquee";
import { Model } from "./components/common/Model";
import { Project } from "./components/common/Project";
import { ThreeDProjects } from "./components/common/ThreeDProjects";
import { MotionHover } from "./components/three/3d";
import { AppLoader } from "./utils/AppLoader";

export default function Home() {
  const { progress } = useProgress();
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const modelRef: any = useRef();
  const [ThreeDHoverPath, setThreeDHoverPath] = useState<string>("");
  const { isLoaded, firstTransition } = useContext(AppLoader);

  useEffect(() => {
    console.log(progress);
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
      className="w-full h-full flex flex-col relative"
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
          <ambientLight intensity={1} />
          <pointLight intensity={2} />
          <Model
            ref={modelRef}
            scale={3}
            position={[130, 260, -500]}
            rotation={[
              0 - mousePos.x / 5000,
              -Math.PI / 3 + mousePos.y / 5000,
              -Math.PI / 8,
            ]}
          />

          {ThreeDHoverPath !== "" && (
            <MotionHover
              scale={0.1}
              position={[mousePos.x / 1000 - 0.3, -mousePos.y / 1000 + 1, 0]}
              image={ThreeDHoverPath}
            />
          )}
          <House scale={7} position={[0, -250, -400]} rotation={[0, 0, 0]} />
        </Suspense>
      </Canvas>
      <main className="sm:px-8 px-4 sm:pt-40 pt-20 flex w-full relative">
        <h1 className="z-10 font-display lg:text-[27.5rem] xl:text-[27.5rem] md:text-[15rem] xl:leading-[26.2rem] lg:leading-[26rem] xs:leading-[9.5rem] leading-[6.7rem] md:leading-[14rem] xs:text-[10rem] text-[7rem]">
          <div>Senne Bels</div>
          <div className="flex">
            <div className="font-body sm:text-2xl text-xs xl:w-[24.4rem] xs:w-[8.9rem] w-[6.2rem] md:w-[13.3rem] xs:mt-[1.5rem]  flex flex-col justify-center">
              <p>Hi 🦝</p>
              <p>I&apos;m a frontend developer</p>
              <p>from Belgium</p>
            </div>
            <div>Portfolio</div>
          </div>
        </h1>
      </main>
      {/* <Marquee
        wordList={[
          "Welcome",
          "🦝",
          "欢迎",
          "🦥",
          "Bienvenue",
          "🦦",
          "いらっしゃいませ",
          "🦨",
          "Willkommen",
          "🐉",
          "مرحباً",
          "🦕",
          "Bienvenido",
          "🍄",
          "добро пожаловать",
          "🍁",
          "Benvenuto",
          "🐌",
          "स्वागत",
          "🐢",
        ]}
      />
      <main className="w-full h-20 sm:h-96 sm:py-40"></main> */}
      <Marquee
        wordList={[
          "WEB DEVELOPMENT",
          "🍁",
          "WEB DEVELOPMENT",
          "🐌",
          "WEB DEVELOPMENT",
          "🐢",
          "WEB DEVELOPMENT",
          "🦥",
          "WEB DEVELOPMENT",
          "🦦",
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
          image={"assets/images/web/20s-portfolio-dark.png"}
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
          "🍁",
          "3D MODELS",
          "🐌",
          "3D MODELS",
          "🐢",
          "3D MODELS",
          "🦥",
          "3D MODELS",
          "🦦",
          "3D MODELS",
          "🦥",
          "3D MODELS",
          "🦦",
          "3D MODELS",
          "🦥",
          "3D MODELS",
          "🦦",
          "3D MODELS",
          "🦥",
          "3D MODELS",
          "🦦",
          "3D MODELS",
          "🦥",
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
        <h2 className="font-bold sm:text-[13rem] text-[6rem] text-center absolute left-1/2 top-1/2 -translate-y-1/2  -translate-x-1/2 dark:font-outline-4 font-outline-dark-4 ">
          Reach out
        </h2>
        <section className="text-7xl flex sm:px-40 px-10 justify-between gap-x-10 sm:mt-[37rem] mt-[32rem] pb-10 xs:pb-0">
          <div>
            <a
              onClick={() => {
                trackGoal("WCZORUSQ", 1);
              }}
              href="https://www.linkedin.com/in/sennebels/"
            >
              <TfiLinkedin />
            </a>
          </div>
          <div>
            <p
              className="cursor-pointer"
              onClick={() => {
                trackGoal("8NISL3IS", 1);

                navigator.clipboard.writeText("sennebels@gmail.com");
              }}
            >
              <TfiEmail />
            </p>
          </div>
          <div>
            <a
              onClick={() => {
                trackGoal("GBJADGK1", 1);
              }}
              href="https://github.com/snenenenenenene"
            >
              <TfiGithub />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
