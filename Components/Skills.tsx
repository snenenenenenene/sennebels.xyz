import React from "react";
import { skills } from "../public/Data/Skills";

export default function Skills() {
  return (
    <section id="skills" className="text-gray-400 bg-grey body-font mx-auto mt-5">
      <div className="container mx-auto">
        <div className="text-justify mb-5">
          {/* <p className="w-10 inline-block mb-4" /> */}
          <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-4">
            Skills &amp; Technologies
          </h1>
          <p className="text-base leading-relaxed">
            As the title suggests these are my Skills &amp; Technologies I feel comfortable working with. Challenging myself with new technologies or obstacles is one of my main motivation drives so feel free to suggest ones not in this list.
          </p>
        </div>
        <div className="flex flex-wrap">
          {skills.map((skill) => (
            <div className="p-2 sm:w-1/2 w-full"
            key={skill.skill}>
              <div className="bg-grey-light rounded flex p-4 h-full items-center justify-center">
                <p className="text-green-400 flex-shrink-0">{skill.skill}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
