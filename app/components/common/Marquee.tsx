export const Marquee = ({
  wordList,
  className = "",
}: {
  wordList: string[];
  className?: string;
}) => {
  return (
    <main
      className={`${className} relative  flex overflow-x-hidden border-y h-12 xs:h-16 sm:h-24 dark:border-dark-secondary border-light-secondary sm:text-7xl xs:text-5xl text-4xl items-center w-auto overflow-hidden font-minecraft `}
    >
      <div className="py-12 animate-marquee align-bottom whitespace-nowrap items-center flex gap-x-4">
        {wordList.map((word: string, i: number) => (
          <p className="translate-y-2" key={word + i}>
            {word}
          </p>
        ))}
      </div>

      <div className="absolute px-2 animate-marquee2 items-center whitespace-nowrap flex gap-x-4">
        {wordList.map((word: string, i: number) => (
          <p key={word + i} className=" text-center translate-y-2">
            {word}
          </p>
        ))}
      </div>
    </main>
  );
};
