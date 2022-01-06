import React from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import Container from "./Container";

const Button = ({ text, link, ...props }) => {
  return (
    <div className="flex justify-center">
      <a href={link} className="clickMe">
        <h3 className="relative text-4xl font-bold">{text}</h3>
      </a>
    </div>
  );
};

const Introduction = () => {
  return (
    <section id="about" className="body-font my-5">
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
            cursor: "&#9646",
            wrapperClassName: "typed",
            strings: [
              "Hello World!",
              "你好世界!",
              "こんにちは世界！",
              "مرحبا بالعالم!",
              "Chào thế giới!",
              "Привет мир!",
              "नमस्ते दुनिया!",
              "Ciao mondo!",
              "Բարեւ աշխարհ!",
              "გამარჯობა მსოფლიო!",
              "Здравей свят!",
              "ሰላም ልዑል!",
              "Përshendetje Botë!",
              "හෙලෝ වර්ල්ඩ්!",
              "สวัสดีชาวโลก!",
              "سلام دنیا",
              "Сайн уу дэлхий!",
              "Hàlo a Shaoghail!",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <Container className="container mx-auto flex flex-col">
        <div className=" flex flex-col w-2/3 mx-auto items-center mb-16 md:mb-0">
          <p className="mb-24 leading-relaxed text-center">
          I&apos;m Senne Bels. This is my homepage, so I have to say something about myself.
            Sometimes it is hard to introduce yourself because you know yourself
            so well that you don&apos;t know where to start with. Let&apos;s give this the old college try
            and see what kind of image you have about me through my
            self-description/mini autobiography.
            I&apos;ve always been a very creative - or at least more so than logical - person.
            All of my present hobbies, talents and skills are a retroactive consequence of that.
          </p>
          <Button text={"My Resume"} link={"/Files/resume.pdf"} />
        </div>
      </Container>
    </section>
  );
}

export default Introduction;