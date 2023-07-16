export const Hero = () => {
  return (
    <main className="md:px-8 px-4 md:pt-40 sm:pt-24 pt-20 flex h-full w-full relative">
      <h1 className="z-10 font-display 2xl:text-[44.2rem] 2xl:leading-[42rem] lg:text-[19.5rem] xl:text-[25.8rem] md:text-[17.9rem]  xl:leading-[24.5rem] lg:leading-[18.5rem] sm:leading-[12.5rem] sm:text-[13.2rem] xs:leading-[9.5rem] leading-[6.7rem] md:leading-[17rem] xs:text-[10rem] text-[7rem]">
        <div className="tracking-wide">
          <span className="s">S</span>
          <span className="e">e</span>
          <span className="n">n</span>
          <span className="n2">n</span>
          <span className="e2">e</span>
          <span className="b">B</span>
          <span className="e3">e</span>
          <span className="l">l</span>
          <span className="s2">s</span>
        </div>
        <div className="flex">
          <div className="font-body lg:leading-[2.5rem] lg:text-[1.8rem] 2xl:text-[4rem] 2xl:leading-[4rem] sm:text-[1.5rem] sm:leading-[1.8rem] text-xs 2xl:w-[39.2rem] xl:w-[24.8rem] xs:w-[8.9rem] sm:w-[14rem] w-[6.2rem] md:w-[17.2rem] xs:mt-[1.5rem] lg:w-[18.8rem] flex flex-col justify-center">
            <p>Hi 🦝</p>
            <p>I&apos;m a frontend developer</p>
            <p>from Belgium</p>
          </div>
          <div className="tracking-wide">Portfolio</div>
        </div>
      </h1>
    </main>
  );
};
