"use client";
import { useEffect, useState } from "react";

export const Marquee = ({
  wordList,
  className = "",
}: {
  wordList: string[];
  className?: string;
}) => {
  return (
    <main
      className={`${className} font-bold relative  flex overflow-x-hidden border-y h-12 xs:h-16 md:h-24 sm:h-12 dark:border-dark-secondary border-light-secondary md:text-7xl xs:text-5xl text-4xl items-center w-auto overflow-hidden`}
    >
      <div className="py-12 animate-marquee align-bottom whitespace-nowrap items-center flex md:gap-x-4">
        {wordList.map((word: string, i: number) => (
          <>
            <p key={word + i}>{word}</p>
            <ChangingEmoji emojiList={["🦥", "🍁", "🐌", "🐢"]} />
          </>
        ))}
      </div>

      <div className="absolute px-2 animate-marquee2 items-center whitespace-nowrap flex md:gap-x-4">
        {wordList.map((word: string, i: number) => (
          <>
            <p key={word + i}>{word}</p>
            <ChangingEmoji emojiList={["🦥", "🍁", "🐌", "🐢"]} />
          </>
        ))}
      </div>
    </main>
  );
};

export const ChangingEmoji = ({
  emojiList,
  className = "",
}: {
  emojiList: string[];
  className?: string;
}) => {
  const [emoji, setEmoji] = useState(emojiList[0]);
  const [fadeClass, setFadeClass] = useState("");

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, [emojiList]);

  // iterate through the emojiList array and set the emoji state to the next emoji in the array by the index,while adding and removing the fade-in and fade-out classes

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setEmoji(emojiList[i]);
        setFadeClass("fade-in");
      }, 1000); // adjust this timeout to control the duration of the animation
      i++;
      if (i === emojiList.length) {
        i = 0;
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [emojiList]);

  // useEffect(() => {
  //   setFadeClass("fade-out");
  //   const timeout = setTimeout(() => {
  //     setEmoji(emojiList[Math.floor(Math.random() * emojiList.length)]);
  //     setFadeClass("fade-in");
  //   }, 1000); // adjust this timeout to control the duration of the animation
  //   return () => clearTimeout(timeout);
  // }, [emoji]);

  return (
    <p
      className={`${className} md:px-8 px-3 -translate-y-1 text-3xl md:text-6xl xs:text-5xl ${fadeClass}`}
    >
      {emoji}
    </p>
  );
};
