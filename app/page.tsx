"use client"

import React, { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import type { ReactNode, MouseEvent as ReactMouseEvent } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { MoveUpRight, ArrowUpRight, Github, Linkedin, Mail, X, Download, Moon, Sun, GitBranch, Layers3, Link2, Activity, CodeXml, Server, Database, Palette, Terminal as TerminalIcon, MapPin, LanguagesIcon, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects, NOW_ITEMS, TIMELINE_ITEMS, GEAR_ITEMS, ACHIEVEMENTS } from "./constants";
import { useSpring, animated } from '@react-spring/web';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

// Pastel color palette
const COLORS = {
  pink: '#ffd6e0',
  lavender: '#e6e6fa',
  mint: '#c1f0c1',
  peach: '#ffcba4',
  sky: '#bfe6ff',
  lilac: '#dcd0ff',
} as const;

// Tetris shapes
const SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1]],
  L: [[1, 0], [1, 0], [1, 1]],
  J: [[0, 1], [0, 1], [1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  Z: [[1, 1, 0], [0, 1, 1]],
} as const;

type TetrisBlock = {
  id: number;
  x: number;
  y: number;
  shape: keyof typeof SHAPES;
  color: keyof typeof COLORS;
  rotation: number;
};

// Terminal commands and responses
const TERMINAL_COMMANDS = {
  help: 'Available commands: help, about, skills, projects, contact, theme, clear',
  about: 'Full-stack developer & game dev from Antwerp. INFP-T. Creative tech enthusiast.',
  skills: 'TypeScript, Next.js, Prisma, Tailwind, ThreeJS, Python',
  projects: 'Type "projects" to see my latest work',
  contact: 'Email: contact@sennebels.xyz',
  theme: 'Usage: theme [light|dark] - Toggle or set theme',
  clear: 'Clear terminal history',
} as const;

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  year: string;
  link: string;
}

const ProjectCard = ({ title, description, image, year, link }: ProjectCardProps) => (
  <Link
    href={link}
    target="_blank"
    className="block w-full relative overflow-hidden h-[450px] rounded-[24px] hover:-translate-y-1 transition-transform duration-300 bg-[#F7F5F3]"
    aria-label={`View ${title} project`}
  >
    <Image
      src={image}
      alt={`Screenshot of ${title} project`}
      width={668}
      height={500}
      className="w-full absolute inset-0 -translate-y-1/3 translate-x-1/3 right-10 top-0 h-full aspect-[668/500] object-cover rounded-2xl"
    />
    <div className="absolute bottom-0 left-0 w-full p-6 rounded-b-2xl bg-gradient-to-t from-[#F7F5F3] via-[#F7F5F3] to-transparent">
      <div className="mb-3">
        <div className="inline-block">
          <div className="bg-[#6b6b6bb0] px-3 py-1 rounded-full text-sm" role="text">
            {year}
          </div>
        </div>
      </div>
      <div className="text-lg font-semibold mb-2">
        {title}
      </div>
      <div className="flex items-center text-[#6b6b6b] group">
        <div className="mr-2 group-hover:text-black transition-colors">
          View Project
        </div>
        <MoveUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </div>
    </div>
  </Link>
);

const ServiceCard = ({ title, description, link }: {
  title: string;
  description: string;
  link: string;
}) => (
  <Link
    href={link}
    style={{
      backdropFilter: "blur(5px)",
      backgroundColor: "#ffffff1f",
      border: "1px solid #e0e0e01c",
      borderRadius: "20px",
      padding: "20px 20px 0",
      transition: "box-shadow .35s, transform .35s",
    }}
    className="group focus:outline-none focus:ring-2 focus:ring-white/50"
    aria-label={`${title}: ${description}`}
  >
    <div className="text-white/70 text-xs sm:text-sm tracking-wider mb-4">{title}</div>
    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">{description}</h3>
    <div className="flex items-center text-white mt-4">
      <span className="mr-2 text-sm sm:text-base">Learn more</span>
      <MoveUpRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </div>
  </Link>
);

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  size?: "small" | "medium" | "large";
}

const BentoCard = ({ 
  children, 
  className = "", 
  href,
  size = "medium",
}: BentoCardProps) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setRotation({
      x: y * 7,
      y: x * 7,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  if (href) {
    return (
      <Link href={href} {...(href.startsWith('/') && !href.startsWith('//') ? {
        scroll: false,
        prefetch: true
      } : {
        target: "_blank"
      })}
      className="w-full h-full"
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          layoutId={`expandable-card-${href}`}
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: 'transform 0.3s ease-out',
          }}
          className={`relative rounded-[2rem] bg-white dark:bg-neutral-900 p-6 md:p-8 
            border border-neutral-200 dark:border-neutral-800 
            hover:border-neutral-300 dark:hover:border-neutral-700 
            transition-all duration-300 ease-out group 
            hover:shadow-lg hover:-translate-y-0.5
            w-full h-full 
            ${className}`}
        >
          {children}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.3s ease-out',
      }}
      className={`relative rounded-[2rem] bg-white dark:bg-neutral-900 p-6 md:p-8 
        border border-neutral-200 dark:border-neutral-800 
        hover:border-neutral-300 dark:hover:border-neutral-700 
        transition-all duration-300 ease-out group 
        hover:shadow-lg hover:-translate-y-0.5
        ${size === "small" ? "col-span-1" : size === "medium" ? "col-span-2" : "col-span-4"} 
        ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Featured Projects Card - Keyboard Navigation & useCallback
const FeaturedProjects = ({ onScrollingChange }: { onScrollingChange: (isScrolling: boolean) => void }) => {
  const [currentProject, setCurrentProject] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [isScrollLocked, setIsScrollLocked] = React.useState(false);

  // Wrap handleProjectChange in useCallback
  const handleProjectChange = React.useCallback((index: number) => {
    if (isScrollLocked) return;
    setIsScrollLocked(true);
    onScrollingChange(true);
    
    // Calculate direction based on current state
    // Need to use functional updates if relying on previous state inside useCallback without deps
    // OR include currentProject in dependency array
    setCurrentProject(prevCurrentProject => {
        setDirection(index > prevCurrentProject ? 1 : -1);
        return index;
    });

    setTimeout(() => {
      setIsScrollLocked(false);
      onScrollingChange(false);
    }, 700);
    // Dependencies for useCallback
  }, [isScrollLocked, onScrollingChange]); 

  // Keyboard Navigation Effect (dependencies updated)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollLocked) return; 
      
      let nextProjectIndex = -1; // Use a temp variable to avoid direct state check
      if (e.key === 'ArrowRight') {
        // Use functional update with setCurrentProject to get latest value
        setCurrentProject(prev => {
            nextProjectIndex = (prev + 1 + projects.length) % projects.length;
            return prev; // Don't change state here, handleProjectChange will do it
        });
      } else if (e.key === 'ArrowLeft') {
        setCurrentProject(prev => {
            nextProjectIndex = (prev - 1 + projects.length) % projects.length;
            return prev; // Don't change state here
        });
      }

      if (nextProjectIndex !== -1) {
        handleProjectChange(nextProjectIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleProjectChange, isScrollLocked]); // Dependency array updated

  // Wheel Handler (already seems okay, but ensure handleProjectChange is stable)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (isScrollLocked) return;
    const dir = e.deltaY > 0 ? 1 : -1;
    // Use functional update pattern here too for safety
    let nextProjectIndex = -1;
    setCurrentProject(prev => {
        nextProjectIndex = (prev + dir + projects.length) % projects.length;
        return prev; // Let handleProjectChange update the state
    });
    if(nextProjectIndex !== -1) {
        handleProjectChange(nextProjectIndex);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      scale: 1.05,
      opacity: 0,
    }),
    center: {
      scale: 1,
      opacity: 1,
    },
    exit: (direction: number) => ({
      scale: 0.95,
      opacity: 0,
    })
  };

  return (
      <div 
      className="relative w-full h-full"
        onWheel={handleWheel}
    >
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
            key={currentProject}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 1
            }}
            className="absolute inset-0 origin-center"
          >
            <div className="relative w-full h-full">
              {/* View Project Link - Now at top right */}
              <Link
                href={projects[currentProject].link}
                target="_blank"
                className="absolute top-8 right-8 z-10 text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1 group bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                View Project <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

                  <Image
                src={projects[currentProject].image}
                alt={projects[currentProject].title}
                    fill
                className="object-cover rounded-[2rem]"
                    sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-[2rem]" />

              {/* Project Info - Overlaid on image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-8 text-white"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-3xl font-medium tracking-tight">
                    {projects[currentProject].title}
                  </h3>
                  <span className="text-sm px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                    {projects[currentProject].year}
                    </span>
                </div>

                <p className="text-sm text-white/80 mb-4 leading-relaxed max-w-2xl">
                  {projects[currentProject].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {projects[currentProject].tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90"
                    >
                      {tech}
                    </span>
                  ))}
                  </div>
              </motion.div>
                </div>
              </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Project Navigation */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
        {projects.map((project, index) => (
          <button
            key={index}
            onClick={() => handleProjectChange(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              currentProject === index 
                ? 'bg-white scale-150' 
                : 'bg-white/50 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/30'
            }`}
            aria-label={`Go to project: ${project.title}`}
          />
        ))}
      </div>
    </div>
  );
};

interface ExpandedCardProps {
  onClose: () => void;
  children: React.ReactNode;
  originRect: DOMRect | null;
}

const ExpandedCard = ({ onClose, children, originRect }: ExpandedCardProps) => {
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ 
        position: 'fixed',
        top: originRect?.top ?? 0,
        left: originRect?.left ?? 0,
        width: originRect?.width ?? 0,
        height: originRect?.height ?? 0,
        opacity: 0,
      }}
      animate={{ 
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 1,
      }}
      exit={{ 
        top: originRect?.top ?? 0,
        left: originRect?.left ?? 0,
        width: originRect?.width ?? 0,
        height: originRect?.height ?? 0,
        opacity: 0,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-50 p-4 md:p-6"
    >
      <div className="relative w-full h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.1 }}
          className="w-full h-full bg-white dark:bg-neutral-900 rounded-[2rem] p-8 overflow-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {children}
        </motion.div>
          </div>
    </motion.div>
  );
};

// Particle animation component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[url('/images/Noise Background.webp')] opacity-[0.02] mix-blend-overlay" />
        </div>
  );
};

// Add Particle Effect Component
const ParticleEffect = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; speed: number }>>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 50 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 0.5 + 0.1
      }));
      setParticles(newParticles);
    };

    createParticles();
    window.addEventListener('resize', createParticles);
    return () => window.removeEventListener('resize', createParticles);
  }, []);

  useEffect(() => {
    const moveParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y + particle.speed > window.innerHeight ? 0 : particle.y + particle.speed
      })));
    };

    const interval = setInterval(moveParticles, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="particles" ref={particlesRef}>
      {particles.map((particle, index) => (
        <div
          key={index}
          className="particle"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Custom Cursor
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: globalThis.MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const handleMouseOver = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
    />
  );
};

// Tech Stack Card Component - with Icon
const TechStackCard = () => {
  const stack = [
    { name: "TypeScript", color: "bg-blue-500" },
    { name: "Next.js", color: "bg-gray-700" },
    { name: "Prisma", color: "bg-teal-500" },
    { name: "Tailwind", color: "bg-sky-500" },
    { name: "ThreeJS", color: "bg-purple-500" },
    { name: "Python", color: "bg-yellow-500" },
  ];

  return (
    <BentoCard className="h-full py-4 px-6 md:px-8">
      <h3 className="flex items-center gap-2 font-medium text-sm mb-3 text-black dark:text-white">
        <Layers3 className="w-4 h-4" /> Primary Stack
      </h3>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech.name}
            className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs text-neutral-600 dark:text-neutral-300"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${tech.color || 'bg-gray-400'}`}></span> {/* Placeholder Icon */}
            {tech.name}
          </span>
        ))}
      </div>
    </BentoCard>
  );
};

// Consolidated Contact Info Card - Enhanced Hover
const ContactInfoCard = () => {
  const links = [
    { icon: Github, href: "https://github.com/snenenenenenene", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/sennebels", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@sennebels.xyz", label: "Email" }
    // { icon: Download, href: "/resume.pdf", label: "Resume" }
  ];

  return (
    <BentoCard className="h-full p-6 md:p-8">
      <div className="flex flex-col gap-1">
        {links.map(({ icon: Icon, href, label }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 text-xs text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
          >
            <Icon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span className="transition-transform duration-200 group-hover:-translate-y-0.5">{label}</span>
          </a>
        ))}
         {/* Resume Link Placeholder - Enhanced Hover */}
         <a
            href="#" // Replace with actual resume path
            className="group flex items-center gap-2 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 text-xs text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
          >
            <Download className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span className="transition-transform duration-200 group-hover:-translate-y-0.5">Download Resume</span>
          </a>
      </div>
    </BentoCard>
  );
};

// Modified Profile Card Component
const ProfileCard = () => {
  return (
    <BentoCard className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4 mb-6">
          {/* Avatar */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
            <Image src="/images/avatar.png" alt="Senne Bels Avatar" fill className="object-cover" sizes="64px" />
          </div>
          <div>
            <h1 className="text-2xl font-medium tracking-tight text-black dark:text-white">
              Senne Bels
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Full-stack Developer & Game Dev
            </p>
          </div>
        </div>

        {/* Updated Bio */}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          Hey, I&apos;m <span className="font-medium text-black dark:text-white">Senne</span>! INFP-T, founder of the freelance company <strong className="text-black dark:text-white">Okapi Works</strong>, full-stack developer, and creative tech enthusiast from Antwerp. I focus on building <strong className="text-black dark:text-white">interactive, scalable web experiences</strong>, blending functionality with fun. Currently, I&apos;m diving into creative tech like ThreeJS while building robust applications with modern frameworks. I am actively seeking opportunities internationally, particularly in <strong className="text-black dark:text-white">North America, Japan, or the UK</strong>, and thrive in remote and hybrid environments.
        </p>

        {/* Location & Languages */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <h3 className="font-medium text-xs text-neutral-600 dark:text-neutral-400">LOCATION</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              🇪 Antwerp, Belgium (Open to relocate/remote)
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-xs text-neutral-600 dark:text-neutral-400">LANGUAGES</h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-neutral-600 dark:text-neutral-300">🇬🇧 English (Fluent)</span>
              <span className="text-xs text-neutral-600 dark:text-neutral-300">🇳🇱 Dutch (Native)</span>
              <span className="text-xs text-neutral-600 dark:text-neutral-300">🇩🇪 German</span>
              <span className="text-xs text-neutral-600 dark:text-neutral-300">🇫🇷 French</span>
              {/* Add Japanese here if applicable */}
            </div>
          </div>
        </div>
      </div>

      {/* Updated Availability & Socials */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 sophisticated-pulse" />
          <span className="text-xs text-neutral-600 dark:text-neutral-400">
            Available via Okapi Works (Intl. freelance/contracts)
          </span>
        </div>
        {/* Socials moved to QuickLinksCard */}
      </div>
    </BentoCard>
  );
};

// Utility function for language colors (can be expanded)
const getLanguageColor = (language: string): string => {
  const colors: { [key: string]: string } = {
    TypeScript: 'bg-blue-500',
    JavaScript: 'bg-yellow-400',
    Python: 'bg-green-500',
    HTML: 'bg-orange-500',
    CSS: 'bg-purple-500',
    Shell: 'bg-lime-500',
    CSharp: 'bg-teal-500', // Added C# as it appeared in screenshot
    // Add more languages and colors as needed
  };
  return colors[language] || 'bg-gray-400'; // Default color
};

// Simplified Contribution Graph Component
const ContributionGraph = ({ contributions }: { contributions: any }) => {
  if (!contributions || !contributions.weeks) {
    return <div className="text-xs text-gray-400">Contribution data not available.</div>;
  }

  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-neutral-100 dark:bg-neutral-800';
    if (count <= 3) return 'bg-green-200 dark:bg-green-900';
    if (count <= 6) return 'bg-green-300 dark:bg-green-800';
    if (count <= 9) return 'bg-green-400 dark:bg-green-700';
    return 'bg-green-500 dark:bg-green-600';
  };

  return (
    <div className="overflow-x-auto scrollbar-hide pb-2">
      <div className="inline-grid grid-flow-col auto-cols-max gap-[3px]">
        {contributions.weeks.map((week: any, weekIndex: number) => (
          <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
            {week.contributionDays.map((day: any, dayIndex: number) => (
              <div
                key={day.date || dayIndex}
                className={`w-2.5 h-2.5 rounded-sm ${getContributionColor(day.contributionCount)}`}
                  title={`${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString()}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
  );
};

// Enhanced GitHub Stats Card with animations
const GitHubStats = () => {
  const [stats, setStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch('/api/github')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.error || 'Failed to fetch GitHub stats');
        }
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching GitHub stats:', err);
        setError(err.message || 'Could not load GitHub stats.');
        setLoading(false);
      });
  }, []);

  return (
    <BentoCard className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="flex items-center gap-2 text-lg font-medium text-black dark:text-white">
          <Activity className="w-5 h-5" /> Coding Activity
        </h3>
        {stats && !loading && (
          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <GitBranch className="w-4 h-4" /> {stats.totalContributions?.toLocaleString()} contributions
          </span>
        )}
            </div>

      {loading && (
        <div className="flex items-center justify-center h-32">
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading GitHub stats...</p>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-32">
          <p className="text-sm text-red-600 dark:text-red-400">Error: {error}</p>
        </div>
      )}

      {stats && !loading && !error && (
        <div>
          {/* Contribution Graph (Simplified representation) */}
          <div className="mb-4">
            <ContributionGraph contributions={stats.contributionCalendar} />
          </div>

          {/* Language Stats */}
          <div className="flex space-x-4">
            {stats.languages?.map((lang: any, index: number) => (
              <div key={index} className="flex-1">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>{lang.name}</span>
                  <span>{lang.percentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getLanguageColor(lang.name)}`}
                    style={{ width: `${lang.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
      )}
    </BentoCard>
  );
};

// Magnetic Contact Button Component
const ContactButton = ({ children }: { children: React.ReactNode }) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setPosition({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="magnetic"
    >
      {children}
    </motion.div>
  );
};

// --- Shiba 3D Model Component ---

function ShibaModel(props: any) {
  const { scene } = useGLTF('/models/shiba/scene.gltf');
  const modelRef = useRef<THREE.Group>(null);

  // Traverse the model to set castShadow on all meshes
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          // Optional: set receiveShadow if needed, e.g., parts of the model itself
          // child.receiveShadow = true; 
        }
      });
    }
  }, [scene]);

  // You might need to scale or position the model depending on its origin
  return <primitive ref={modelRef} object={scene} scale={2.5} position-y={-1} {...props} />;
}

// Preload the model for smoother loading
useGLTF.preload('/models/shiba/scene.gltf');

const ShibaModelViewer = () => {
  return (
    <BentoCard className="h-full !p-0 overflow-hidden relative"> 
      <Canvas 
        camera={{ position: [0, 1, 5], fov: 50 }} // Raised camera slightly
        shadows // Ensure shadows are enabled
      >
        <ambientLight intensity={0.6} /> {/* Slightly increased ambient light */}
        <directionalLight 
          position={[5, 8, 5]} // Adjusted light position
          intensity={1.5} 
          castShadow 
          shadow-mapSize-width={1024} // Increase shadow map resolution
          shadow-mapSize-height={1024}
        />
        {/* Optional: Add a soft hemisphere light */}
        {/* <hemisphereLight groundColor="#444444" intensity={0.3} /> */}
        
        <Suspense fallback={
          <Html center className="text-xs text-neutral-500">
            Loading Model...
          </Html>
        }>
          <group position={[0, 0, 0]}> {/* Group to hold model and plane */}
            <ShibaModel />
            {/* Simple ground plane */}
            <mesh 
              rotation={[-Math.PI / 2, 0, 0]} // Rotate plane to be horizontal
              position={[0, -1, 0]} // Position it below the model
              receiveShadow // Plane receives shadows
            >
              <planeGeometry args={[10, 10]} />
              <shadowMaterial opacity={0.4} /> {/* Use shadowMaterial for soft shadows */}
            </mesh>
          </group>
          <Environment preset="city" /> 
        </Suspense>
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.5} // Slightly slower rotation
          minPolarAngle={Math.PI / 2.8} // Adjusted rotation limits slightly
          maxPolarAngle={Math.PI / 1.8}
          target={[0, 0.2, 0]} // Adjust target slightly higher
        />
      </Canvas>
    </BentoCard>
  );
};

// Main Page Component - Staggered Animations
export default function HomePage() {
  const [isDark, setIsDark] = React.useState(false);
  const [isAvailable, setIsAvailable] = React.useState(true);
  const [isProjectScrolling, setIsProjectScrolling] = React.useState(false);

  React.useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Animation Variants for Staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger delay between columns
        delayChildren: 0.1 // Initial delay before staggering starts
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <main className="min-h-screen w-full bg-neutral-100 dark:bg-black p-4 md:p-6 lg:p-8 overflow-hidden">
      <ParticleEffect />
      <CustomCursor />
      
      <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]">
                  <motion.div 
          className="grid grid-cols-6 gap-4 md:gap-6 h-full auto-rows-[minmax(0,1fr)]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* --- Left Column --- */}
          <motion.div 
            className="col-span-6 lg:col-span-2 row-span-4 flex flex-col gap-4 md:gap-6"
            variants={itemVariants} // Apply item variant to the column itself
          >
             {/* Profile Card Wrapper */}
             <div className="flex-[2_1_0%] min-h-0">
               <ProfileCard />
                    </div>
             {/* Tech Stack Card Wrapper */}
             <div className="flex-[1_1_0%] min-h-0">
               <TechStackCard />
                  </div>
             {/* Contact Info Card Wrapper */}
             <div className="flex-[1_1_0%] min-h-0">
               <ContactInfoCard />
                    </div>
          </motion.div>

          {/* --- Right Column --- */}
          <motion.div 
            className="col-span-6 lg:col-span-4 row-span-4 grid grid-rows-[minmax(0,3fr)_minmax(0,1fr)] gap-4 md:gap-6"
            variants={itemVariants} // Apply item variant to the column itself
          >
            {/* Projects Carousel Wrapper */}
                  <motion.div
              initial={false}
              animate={{ scale: isProjectScrolling ? 0.97 : 1 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="row-span-1 w-full h-full"
            >
              <BentoCard className="h-full overflow-hidden !p-0">
              <div className="relative w-full h-full">
                  <FeaturedProjects onScrollingChange={setIsProjectScrolling} />
              </div>
            </BentoCard>
            </motion.div>

            {/* Bottom Row (GitHub & 3D Model) */}
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              {/* GitHub Stats */}
              <div className="col-span-12 md:col-span-7">
                  <GitHubStats />
                </div>
              {/* 3D Model Viewer (Replacing Terminal) */}
              <div className="col-span-12 md:col-span-5">
                 <ShibaModelViewer />
                    </div>
                    </div>
          </motion.div>

                    </motion.div>
      </div>
    </main>
  );
}