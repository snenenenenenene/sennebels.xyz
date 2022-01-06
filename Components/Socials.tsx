import React from "react";
import { socials } from "../public/Data/Socials";
import Image from "next/image";
import Container from "./Container";

export default function Socials() {
  return (
    <section id="skills">
      <Container className="mt-3 w-screen flex">
        <div className="flex mx-auto md:w-1/2">
          <div className="flex text-white rounded-xl rounded bg-black md:p-8 mx-2 p-4 flex-wrap">
            {socials.map((social, index) => (
              <div className="p-2 w-1/2" key={index}>
                <div key={social.name}>
                  <a
                    href={social.link}
                    className="rounded flex py-2 hover:underline rounded font-thin text-sm md:text-md"
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
      </Container>
    </section>
  );
}
