import React from "react";
import Socials from "./Socials";
import Typewriter from "typewriter-effect";

const Button = ({ text, link, ...props }) => {
  return (
    <div className="flex justify-center">
      <a href={link}>
        <h3 className="text-4xl font-bold">{text}</h3>
      </a>
    </div>
  );
};

export default function About() {

  return (
    <section id="about" className="body-font mt-10">
      <div className="flex justify-center m-5">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
          .changeDelay(100)
            .pauseFor(1000)
            .changeDeleteSpeed(100)
            .deleteAll()
            .start();
        }}
      options={{
        cursor:"&#9646",
        wrapperClassName:"typed",
        strings: ['Hello World!',
      "你好世界!", "こんにちは世界！", "مرحبا بالعالم!", "Chào thế giới!" ,"Привет мир!", "नमस्ते दुनिया!","Ciao mondo!", "Բարեւ աշխարհ!", "გამარჯობა მსოფლიო!", "Здравей свят!", "ሰላም ልዑል!", "Përshendetje Botë!", "හෙලෝ වර්ල්ඩ්!", "สวัสดีชาวโลก!", "سلام دنیا", "Сайн уу дэлхий!", "Hàlo a Shaoghail!"],
        autoStart: true,
        loop: true,
      }}
      />
      </div>
      <div className="container mx-auto flex flex-col">
        <div className=" flex flex-col items-center mb-16 md:mb-0">
          <p className="mb-8 leading-relaxed text-center">
            I&apos;m Senne Bels, a fullstack developer from Antwerp, Belgium. I love using
            Javascript and Python! Frontend development is definitely my passion
            because it allows me to still be somewhat creative while profusely
            console.logging. Outside of web development I&apos;m also into
            Machine Learning &amp; Data Mining. Though I was born and raised in
            Belgium, it&apos;s always been my main ambition &amp; dream to move
            to Australia or Canada. A work permit or visa sponsorship is hence
            my number one must-have in a job.
          </p>
          <Button text={"My Resume"} link={"/Files/resume.pdf"} />
        </div>
      </div>
      <Socials />
    </section>
  );
}
