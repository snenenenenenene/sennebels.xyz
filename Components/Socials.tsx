import React from "react";
import { socials } from "../public/Data/Socials";
import Image from "next/image";

export default function Socials() {
  return (
    <section id="skills">
      <div className="container mx-auto mt-16">
        <div className="flex">
          <div className="p-2 "></div>
          <div className="flex text-white rounded-xl rounded bg-black p-8 flex-wrap">
            {socials.map((social, index) => (
              <div className="p-2 w-1/2" key={index}>
                <div key={social.name}>
                  <a
                    href={social.link}
                    className="rounded flex py-2 hover:underline hover:bg-gray-100"
                  >
                    <i className={`${social.icon} mx-4`}></i>
                    <p className="flex-shrink-0 mr-4">{social.name}</p>
                  </a>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="rounded w-80">
      <div className="w-100 h-100 md:w-150 md:h-150 ">
      <Image src="/profilepic.jpeg" width="200" height="200" className="rounded-full hover:opacity-50 transition-all"/>
      </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
