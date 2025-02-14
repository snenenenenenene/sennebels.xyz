"use client";

import { NOW_ITEMS, projects } from "../../constants";
import Image from "next/image";
import Link from "next/link";

export default function WorkModal() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-[2rem] font-semibold leading-[44px] mb-8">
        I build interactive experiences that make an impact.
      </h1>
      <p className="text-neutral-600 dark:text-neutral-300 mb-6">
        As a creative developer who specializes in interactive experiences,
        I build web applications that are not only functional but also engaging.
        From government platforms to creative side projects, each piece is crafted
        with attention to both user experience and code quality.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {NOW_ITEMS.map((item, index) => (
          <div key={index} className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-300">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={project.link}
            target="_blank"
            className="block group"
          >
            <div className="relative aspect-video mb-4 overflow-hidden rounded-xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{project.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 