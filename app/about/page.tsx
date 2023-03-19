"use client";

export default function About() {
  return (
    <div className="min-h-screen mt-20 xs:mt-32 px-8 xs:px-24 flex flex-col">
      <h1 className=" font-display text-8xl flex flex-col">
        <span>Hey!</span>
        <span> I&apos;m Senne</span>
      </h1>
      <section className=" my-8 xs:my-20 text-body">
        <p>Hello there fellow web explorer!</p>
      </section>
      <div className="flex flex-col gap-y-4">
        <section className="flex gap-x-10 xs:gap-x-40">
          <p className="w-20">About</p>
          <span className="flex flex-col">
            <p>
              Front-end developer from Belgium looking for a challenge abroad
            </p>
          </span>
        </section>
        <section className="flex gap-x-10 xs:gap-x-40">
          <p className="w-20">Roles</p>
          <span className="flex flex-col">
            <p>Frontend</p>
            <p>3D Development</p>
            <p>Data science</p>
            <p>Artificial Intelligence</p>
          </span>
        </section>
        <section className="flex gap-x-10 xs:gap-x-40">
          <p className="w-20">Hobbies</p>
          <span className="flex flex-col">
            <p>Football</p>
            <p>History</p>
            <p>Linguistics</p>
            <p>Videogames</p>
            <p>Zoology</p>
          </span>
        </section>
        <section className="flex gap-x-10 xs:gap-x-40">
          <p className="w-20">Contact</p>
          <span className="flex flex-col">
            <p
              className="cursor-pointer underline underline-offset-2"
              onClick={() =>
                navigator.clipboard.writeText("sennebels@gmail.com")
              }
            >
              sennebels@gmail.com
            </p>
            <a
              href="https://www.linkedin.com/in/sennebels/"
              className="underline underline-offset-2"
            >
              Linkedin
            </a>
            <a
              href="https://github.com/snenenenenenene"
              className="underline underline-offset-2"
            >
              Github
            </a>
          </span>
        </section>
      </div>
    </div>
  );
}
