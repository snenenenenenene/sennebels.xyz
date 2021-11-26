import React from "react";

export default function Socials() {
  return (
    <section id="skills" className="text-gray-400 bg-grey body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="text-center mb-20">
          {/* <p className="w-10 inline-block mb-4" /> */}
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            As the title suggests these are my Skills &amp; Technologies I feel comfortable working with. Challenging myself with new technologies or obstacles is one of my main motivation drives so feel free to suggest ones not in this list.
          </p>
        </div>
        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">

            <div className="p-2 w-full">
              <div className="bg-grey-light rounded flex p-4 h-full items-center">
                <p className="text-green-400 flex-shrink-0 mr-4">Github</p>
              </div>
              <div className="bg-grey-light rounded flex p-4 h-full items-center">
                <p className="text-green-400 flex-shrink-0 mr-4">Spotify</p>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
