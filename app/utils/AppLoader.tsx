"use client";
import GSAP from "gsap";
import { createContext, ReactNode, useEffect, useState } from "react";
export const AppLoader = createContext<any>({});

function Context({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const timeline = GSAP.timeline();

  const animation = async () => {
    const letterYDuration: number = 0.2;
    const letterScaleAmplifier: number = 2;
    const letterY: number = 150;
    timeline
      .to(".L", {
        scaleX: 1,
        scaleY: letterScaleAmplifier,
        yPercent: letterY,
        duration: letterYDuration,
        ease: "back.out(1.7)",
      })
      .to(".O", {
        scaleX: 1,
        scaleY: letterScaleAmplifier,
        yPercent: letterY,
        duration: letterYDuration,
        ease: "back.out(1.7)",
      })
      .to(".A", {
        scaleX: 1,
        scaleY: letterScaleAmplifier,
        yPercent: letterY,
        duration: letterYDuration,
        ease: "back.out(1.7)",
      })
      .to(".D", {
        scaleX: 1,
        scaleY: letterScaleAmplifier,
        yPercent: letterY,
        duration: letterYDuration,
        ease: "back.out(1.7)",
      })
      .to(".I", {
        scaleX: 1,
        scaleY: letterScaleAmplifier,
        yPercent: letterY,
        duration: letterYDuration,
        ease: "back.out(1.7)",
      })
      .to(".N", {
        scaleX: 1,
        scaleY: letterScaleAmplifier,
        yPercent: letterY,
        duration: letterYDuration,
        ease: "back.out(1.7)",
      })
      .to(".G", {
        scaleX: 1,
        scaleY: letterScaleAmplifier,
        yPercent: letterY,
        duration: letterYDuration,
        ease: "back.out(1.7)",
      });
    timeline.to(".loading", {
      yPercent: 100,
      delay: 0.2,
      duration: 0.5,
    });
  };

  const firstTransition = async () => {
    await animation();
    setIsLoaded(true);
  };

  useEffect(() => {
    firstTransition();
  });

  return (
    <AppLoader.Provider
      value={{
        isLoaded: isLoaded,
        setIsLoaded: setIsLoaded,
        firstTransition: firstTransition,
      }}
    >
      {children}
    </AppLoader.Provider>
  );
}
export default Context;
