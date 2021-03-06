import React from "react";
import { skills } from "../public/Data/Skills";
import ReactTooltip from 'react-tooltip';
import Container from "./Container";

export default function Skills() {
  return (
    <section id="skills" className="body-font mx-auto">
      <div className="container mx-auto">
        <Container className="text-center mb-5">
          <h2 className="sm:text-4xl text-3xl font-medium title-font mb-4">
            Skills
          </h2>
          <p className="leading-relaxed my-2 font-light">
            A shortlist of the different technologies I&apos;ve worked with I can think of off the top of my head.
          </p>
        </Container>
        <div className="flex flex-wrap">
          {skills.map((skill, index) => (
            <div className="p-2 w-1/3" key={index}>
              <Container className="hover:bg-gray-100 rounded flex p-2 h-full items-center justify-center">
                <a data-tip={skill.skill} className="md:text-6xl text-4xl">{skill.icon}</a>
                <ReactTooltip place="top" type="dark" effect="solid"/>
              </Container>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
