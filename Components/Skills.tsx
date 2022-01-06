import React from "react";
import { skills } from "../public/Data/Skills";
import ReactTooltip from 'react-tooltip';
import Container from "./Container";

export default function Skills() {
  return (
    <section id="skills" className="body-font mx-auto mt-5">
      <div className="container mx-auto">
        <Container className="text-center mb-5">
          {/* <p className="w-10 inline-block mb-4" /> */}
          <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-4">
            Skills &amp; Technologies
          </h1>
          <p className="text-base leading-relaxed">
            As the title suggests these are my Skills &amp; Technologies I feel
            comfortable working with. Challenging myself with new technologies
            or obstacles is one of my main motivation drives so feel free to
            suggest ones not in this list.
          </p>
        </Container>
        <div className="flex flex-wrap">
          {skills.map((skill, index) => (
            <div className="p-2 w-1/3" key={index}>
              <Container className="hover:bg-gray-100 rounded flex p-2 h-full items-center justify-center">
                {/* <p className="text-green-400 flex-shrink-0">{skill.skill}</p> */}
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
