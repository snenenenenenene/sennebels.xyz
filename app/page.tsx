"use client";

import { SoftShadows, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { Marquee } from "./components/common/Marquee";
import { Project } from "./components/common/Project";
import Tanuki from "./components/common/Tanuki";
import { ThreeDProjects } from "./components/common/ThreeDProjects";
import MotionHover from "./components/three/3d";
import { AppLoader } from "./utils/AppLoader";

// export function Backdrop() {
//   return (
//     <AccumulativeShadows
//       temporal
//       frames={60}
//       alphaTest={1}
//       scale={100}
//       color="#fafafa"
//       rotation={[-Math.PI / 2, 0, 0]}
//       position={[0, 0, 10]}
//     >
//       <RandomizedLight
//         amount={40}
//         radius={10}
//         intensity={4}
//         ambient={1}
//         position={[0, 10, 0]}
//       />
//     </AccumulativeShadows>
//   );
// }

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
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleProjectHover = (index: any) => {
    setHoverIndex(index);
  };
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
      <section className="w-full flex absolute inset-0 h-[50vh]">
        <Canvas
          shadows
          orthographic
          camera={{
            zoom: 30,
            position: [0, 0, -10],
          }}
          className="w-full h-[50vh] flex absolute inset-0"
        >
          {/* <OrbitControls /> */}

          <ambientLight intensity={0.2} />
          <pointLight castShadow receiveShadow position={[10, 10, 10]} />
          {/* <Backdrop /> */}
          <SoftShadows samples={100} />
          <Suspense fallback={null}>
            <Tanuki
              ref={modelRef}
              scale={5}
              position={[-20, -10, 100]}
              rotation={[
                Math.PI / 6 - mousePos.x / 5000,
                -Math.PI / 6 + mousePos.y / 5000,
                0,
              ]}
            />
          </Suspense>
        </Canvas>
      </section>
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
      <main className="md:px-8 pointer-events-none px-4 md:pt-40 sm:pt-20 pt-40 flex h-[50vh] w-full relative">
        <h1 className="z-10 flex flex-col font-bold  2xl:text-[8vw] 2xl:leading-[10.9vh] lg:text-[6rem] xl:text-[7rem] md:text-[5rem]  xl:leading-[9.5rem] lg:leading-[6rem] sm:leading-[12.5rem] sm:text-[13.2rem] xs:leading-[9.5rem] leading-[6.7rem] md:leading-[17rem] xs:text-[10rem] text-[7rem]">
          <div className="uppercase w-fit px-4 bg-light-secondary text-light-text">
            Senne.Bels
          </div>
          {/* <div className="uppercase tracking-[-10px] text-[10rem]"></div> */}
          <div className="flex px-4 mt-auto">
            <div className=" font-display lg:leading-[2.5rem] lg:text-[2vh] 2xl:text-[3vh] 2xl:leading-[2.8vh] sm:text-[1.5rem] sm:leading-[1.8rem] text-xs 2xl:w-[16vw] xl:w-[22.8rem] xs:w-[8.9rem] sm:w-[14rem] w-[6.2rem] md:w-[17.2rem] xs:mt-[1.5rem] lg:w-[18.8rem] flex flex-col justify-center">
              <p>Hi 🦝</p>
              <p>Im a frontend developer</p>
              <p>from Belgium</p>
            </div>
            <div className=" uppercase">Portfolio</div>
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
          title="Home Affairs"
          image="/assets/images/web/lynx-logo.svg"
        />
        <Project
          title={"MUSICIANS"}
          link={"/project/musicians"}
          image={"/assets/images/web/musicians.png"}
        />
        <Project
          title={"PORTFOLIOS"}
          link={"/project/portfolios"}
          image={"/assets/images/web/3d.png"}
          className="border-r border-t"
        />
        <Project
          title={"DND APP"}
          link={"/project/dnd-app"}
          image={"/assets/images/web/dnd-app.png"}
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
      <main className="w-full border-b border-light-secondary dark:border-dark-secondary h-[20rem] flex relative">
        <section
          className="w-full"
          onMouseLeave={() => {
            setThreeDHoverPath("");
          }}
        >
          <ThreeDProjects
            year={"2022"}
            index={0}
            setThreeDHoverPath={setThreeDHoverPath}
            handleProjectHover={handleProjectHover}
            isHovered={hoverIndex === 0}
            image="/assets/images/3D/velociraptor.png"
            title={"VELOCIRAPTOR"}
          />
          <ThreeDProjects
            year={"2022"}
            index={1}
            handleProjectHover={handleProjectHover}
            setThreeDHoverPath={setThreeDHoverPath}
            isHovered={hoverIndex === 1}
            image="/assets/images/3D/room.png"
            title={"MY ROOM"}
          />
          <ThreeDProjects
            year={"2023"}
            index={2}
            handleProjectHover={handleProjectHover}
            isHovered={hoverIndex === 2}
            setThreeDHoverPath={setThreeDHoverPath}
            image="/assets/images/3D/laptop.png"
            title={"LAPTOP"}
          />
          <ThreeDProjects
            year={"2023"}
            index={3}
            handleProjectHover={handleProjectHover}
            isHovered={hoverIndex === 3}
            setThreeDHoverPath={setThreeDHoverPath}
            image="/assets/images/3D/pangolin.png"
            title={"PANGOLIN"}
          />
        </section>
        <section className="w-full border-l border-dark-primary">
          <Canvas>
            <ambientLight intensity={0.5} />
            <Suspense fallback={null}>
              {ThreeDHoverPath !== "" && (
                <MotionHover
                  scale={2}
                  image={ThreeDHoverPath}
                  // position={[mousePos.x / 1000 - 0.3, -mousePos.y / 1000 + 1, 0]}
                  position={[0, 0, 0]}
                />
              )}
            </Suspense>
          </Canvas>
        </section>
      </main>
    </div>
  );
}
