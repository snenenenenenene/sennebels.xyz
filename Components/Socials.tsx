import React from "react";
import { socials } from "../public/Data/Socials";

export default function Socials() {
  return (
    <section id="skills" className="text-gray-400 bg-grey body-font">
      <div className="container mx-auto">
      <h1 className="title-font sm:text-2xl text-1xl mb-4 font-medium text-gray-400">
            Socials
          </h1>
        <div className="flex">

            <div className="p-2 w-full rounded">
            {socials.map((social) => (
            <div
            key={social.name}>
              <a href={social.link} className="rounded flex py-2 hover:underline hover:bg-grey-transparent">
              <i className={`${social.icon} mx-4 text-change-light`}></i>
                <p className="text-cyan hover:text-cyan-dark flex-shrink-0 mr-4">{social.name}</p>
              </a>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
