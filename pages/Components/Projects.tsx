import React from "react";
import { projects } from "../../public/Data/Projects";

export default function Projects() {
  return (
    <section id="projects" className="text-gray-400 bg-grey body-font">
      <div className="container px-5 py-10 mx-auto text-center lg:px-40">
        <div className="flex flex-col w-full mb-20">
          {/* <p className="mx-auto inline-block w-10 mb-4" />  ICON */}
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white">
            Apps I&apos;ve Built
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            These are the projects I&apos;ve been involved with since I started studying Computer Science.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {projects.map((project) => (
            <a
            key={project.title}
              href={project.link}
              className="sm:w-1/2 w-100 p-4">
              <div className="flex relative">
                <div className="absolute inset-0 w-full h-full object-cover object-center">
                <h3
                  // className="absolute inset-0 w-full h-full object-cover object-center"
                  className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white"
                >
                  {project.title}
                </h3>
                <div className="project-icon">
                {project.image}
                </div>
                </div>
                <div className="px-8 py-10 relative z-10 w-full border-4 border-change-light bg-grey-light opacity-0 hover:opacity-100">
                  <h2 className="tracking-widest text-sm title-font font-medium text-green-400 mb-1">
                    {project.subtitle}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3">
                    {project.title}
                  </h1>
                  <p className="leading-relaxed">{project.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
