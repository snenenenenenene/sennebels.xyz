'use client';

import Image from 'next/image';
import { projects } from '../constants';

export default function HiddenImagePreloader() {
  return (
    <div className="hidden" aria-hidden="true">
      {/* Force load all project images */}
      {projects.map((project) => (
        <div key={project.title} className="relative w-1 h-1">
          <Image
            src={project.image}
            alt=""
            fill
            priority={true}
            loading="eager"
            quality={100}
            sizes="1px"
          />
        </div>
      ))}
      {/* Force load avatar and other assets */}
      <div className="relative w-1 h-1">
        <Image
          src="/images/avatar.png"
          alt=""
          fill
          priority={true}
          loading="eager"
          quality={100}
          sizes="1px"
        />
      </div>
      <div className="relative w-1 h-1">
        <Image
          src="/assets/Brie.png"
          alt=""
          fill
          priority={true}
          loading="eager"
          quality={100}
          sizes="1px"
        />
      </div>
    </div>
  );
}