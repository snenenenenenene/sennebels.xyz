"use client"

import React from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { MoveUpRight, ArrowUpRight, Github, Linkedin, Mail, X, Download, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects, NOW_ITEMS, TIMELINE_ITEMS, GEAR_ITEMS, ACHIEVEMENTS } from "./constants";

const TYPING_TEXTS = ["Websites", "Applications", "Side Projects"];

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
  if (href) {
    return (
      <Link href={href} {...(href.startsWith('/') && !href.startsWith('//') ? {
        scroll: false,
        prefetch: true
      } : {
        target: "_blank"
      })}>
        <motion.div
          layoutId={`expandable-card-${href}`}
          className={`relative rounded-[2rem] bg-white dark:bg-neutral-900 p-6 md:p-8 
            border border-neutral-200 dark:border-neutral-800 
            hover:border-neutral-300 dark:hover:border-neutral-700 
            transition-all duration-300 ease-out group 
            hover:shadow-lg hover:-translate-y-0.5
            ${size === "small" ? "col-span-1" : size === "medium" ? "col-span-2" : "col-span-3"} 
            ${className}`}
        >
          {children}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div
      className={`relative rounded-[2rem] bg-white dark:bg-neutral-900 p-6 md:p-8 
        border border-neutral-200 dark:border-neutral-800 
        hover:border-neutral-300 dark:hover:border-neutral-700 
        transition-all duration-300 ease-out group 
        hover:shadow-lg hover:-translate-y-0.5
        ${size === "small" ? "col-span-1" : size === "medium" ? "col-span-2" : "col-span-3"} 
        ${className}`}
    >
      {children}
    </motion.div>
  );
};

const FeaturedProjects = () => {
  const [currentProject, setCurrentProject] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const lastScrollTime = React.useRef(Date.now());

  // Create an infinite array by repeating projects three times
  const infiniteProjects = [...projects, ...projects, ...projects];

  React.useEffect(() => {
    if (containerRef.current) {
      // Set initial scroll position to show the first set of projects
      containerRef.current.scrollTop = containerRef.current.offsetHeight;
    }
  }, []);

  const scrollToProject = (index: number, behavior: ScrollBehavior = 'smooth') => {
    if (!containerRef.current || isScrolling) return;
    
    setIsScrolling(true);
    const container = containerRef.current;
    const targetScroll = (index + 1) * container.offsetHeight;
    
    container.scrollTo({
      top: targetScroll,
      behavior
    });
    
    setCurrentProject(index);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  const handleScroll = () => {
    if (!containerRef.current || isDragging) return;

    const container = containerRef.current;
    const itemHeight = container.offsetHeight;
    const currentScroll = container.scrollTop;
    const totalHeight = itemHeight * infiniteProjects.length;

    // Handle infinite scroll wrapping
    if (currentScroll < itemHeight) {
      // When scrolling up past the first project
      container.scrollTop = currentScroll + (itemHeight * projects.length);
    } else if (currentScroll > totalHeight - (itemHeight * 2)) {
      // When scrolling down past the last project
      container.scrollTop = currentScroll - (itemHeight * projects.length);
    }

    // Update current project index
    const newIndex = Math.round((container.scrollTop / itemHeight) - 1) % projects.length;
    if (newIndex !== currentProject && newIndex >= 0 && newIndex < projects.length) {
      setCurrentProject(newIndex);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!containerRef.current || isScrolling) return;

    const now = Date.now();
    if (now - lastScrollTime.current < 500) return; // Debounce scroll events
    lastScrollTime.current = now;

    const direction = e.deltaY > 0 ? 1 : -1;
    const nextProject = (currentProject + direction + projects.length) % projects.length;
    scrollToProject(nextProject);
  };

  return (
    <div className="absolute inset-0">
      <div 
        ref={containerRef}
        className="w-full h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        onScroll={handleScroll}
        onWheel={handleWheel}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        style={{
          scrollSnapType: 'y mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {infiniteProjects.map((project, index) => (
          <div
            key={`${project.title}-${index}`}
            className="w-full h-full snap-center relative group"
            style={{ scrollSnapAlign: 'center', scrollSnapStop: 'always' }}
          >
            <Link
              href={project.link}
              target="_blank"
              className="absolute inset-0"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm text-neutral-200 mb-2 tracking-wider">{project.year}</p>
                <h3 className="text-xl font-medium mb-2 tracking-tight">{project.title}</h3>
                <p className="text-sm text-neutral-300 max-w-md leading-relaxed">{project.description}</p>
              </div>
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1">
                <ArrowUpRight className="w-6 h-6 text-white" />
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToProject(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              currentProject === index 
                ? 'bg-white scale-150' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to project ${index + 1}`}
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

// Custom cursor component
const CustomCursor = () => {
  const cursorRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    const moveCursor = (e: globalThis.MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed w-3 h-3 bg-black dark:bg-white rounded-full pointer-events-none mix-blend-difference z-50 transition-transform duration-100 ease-out"
      style={{ transform: 'translate3d(-50%, -50%, 0)' }}
    />
  );
};

export default function HomePage() {
  const [isDark, setIsDark] = React.useState(false);
  const [isAvailable, setIsAvailable] = React.useState(true);

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

  return (
    <main className="min-h-screen w-full bg-white dark:bg-black p-4 md:p-6 overflow-x-hidden">
      <CustomCursor />
      
      <div className="max-w-[2000px] mx-auto h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 h-full auto-rows-[minmax(0,1fr)]">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="fixed top-6 right-6 p-2 rounded-full bg-white/80 dark:bg-neutral-900/80 shadow-sm backdrop-blur-sm z-50 border border-neutral-200 dark:border-neutral-800"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>

          {/* Profile Card */}
          <BentoCard size="large" className="row-span-3 col-span-2 md:col-span-2 lg:col-span-2">
            <div className="h-full flex flex-col justify-between group">
              <div>
                <motion.div 
                  className="flex items-center gap-4 mb-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
                    src="/images/me.png"
                    alt="Senne Bels"
                    width={56}
                    height={56}
                    className="rounded-full ring-1 ring-neutral-200 dark:ring-neutral-800"
                  />
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight mb-1">Senne Bels</h1>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Full-stack Developer & Game Dev
                      </p>
                      <span className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">24</span>
                    </div>
                  </div>
          </motion.div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  Quick-working team player with 4 years of web dev experience. Currently at Specular Consulting, building innovative solutions. Co-founding an indie game studio in 2025, working on ORNITHO - a multiplayer dinosaur horror game set in Antwerp.
                </p>
                
                {/* Tech Stack */}
                <div className="mb-4">
                  <h2 className="font-medium text-xs mb-2 text-neutral-600 dark:text-neutral-400">PRIMARY STACK</h2>
                  <div className="flex flex-wrap gap-2">
                    {["TypeScript", "Next.js", "Prisma", "Tailwind", "ThreeJS", "Python"].map((tech) => (
                      <motion.span
                        key={tech}
                        className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-md text-xs"
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
        </div>
      </div>

                {/* Social Links */}
                <div className="flex gap-2">
                  <motion.a 
                    href="https://github.com/snenenenenenene" 
                    target="_blank"
                    whileHover={{ y: -2 }}
                    className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-md"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                  <motion.a 
                    href="https://linkedin.com/in/sennebels" 
                    target="_blank"
                    whileHover={{ y: -2 }}
                    className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-md"
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                  <motion.a 
                    href="mailto:contact@sennebels.xyz"
                    whileHover={{ y: -2 }}
                    className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-md"
                  >
                    <Mail className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                  Available for freelance projects
                </span>
              </div>
            </div>
          </BentoCard>

          {/* Current Work */}
          <BentoCard size="medium" className="row-span-2 col-span-2 md:col-span-2 lg:col-span-2">
            <h2 className="font-medium text-sm mb-3">Current Work</h2>
            <div className="space-y-3">
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                <h3 className="font-medium text-sm mb-1">Specular Consulting</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Building a drag-and-drop questionnaire dashboard in Brussels</p>
              </div>
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                <h3 className="font-medium text-sm mb-1">ORNITHO Game</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Developing a multiplayer dinosaur horror game set in Antwerp, launching indie studio in 2025</p>
              </div>
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                <h3 className="font-medium text-sm mb-1">The Okapi Store</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">E-commerce platform supporting okapi conservation through themed merchandise</p>
            </div>
          </div>
          </BentoCard>

          {/* Notable Projects */}
          <BentoCard size="large" className="row-span-2 col-span-2 md:col-span-2 lg:col-span-2">
            <h2 className="font-medium text-sm mb-3">Notable Projects</h2>
            <div className="space-y-3">
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                <h3 className="font-medium text-sm mb-1">ABB - Lokaal Beslist</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Reduced loading times by 89%, developed citizen engagement platform, created GeoJSON shapefiles for interactive maps</p>
              </div>
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                <h3 className="font-medium text-sm mb-1">BubblyDoo</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Built ThreeJS book preview tool, automated Adobe workflow with NextJS, improving efficiency</p>
              </div>
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                <h3 className="font-medium text-sm mb-1">Go Getter</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Integrated chatbot with Gainsight (40% UX improvement), developed Python migration scripts</p>
              </div>
            </div>
          </BentoCard>

          {/* Project Carousel */}
          <BentoCard size="medium" className="row-span-2 col-span-2 md:col-span-2 lg:col-span-2 overflow-hidden p-0">
            <div className="relative w-full h-full">
              <div className="absolute top-0 left-0 right-0 p-6 pb-2 z-50 bg-gradient-to-b from-white via-white to-transparent dark:from-neutral-900 dark:via-neutral-900">
                <h2 className="font-medium text-sm">Projects</h2>
              </div>
              <FeaturedProjects />
            </div>
          </BentoCard>

          {/* GitHub Stats */}
          <BentoCard size="medium" className="row-span-2 col-span-2 md:col-span-2 lg:col-span-2">
            <div className="h-full flex flex-col">
              <h2 className="font-medium text-sm mb-4">Coding Activity</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                  <h3 className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Repositories</h3>
                  <p className="text-2xl font-semibold">54</p>
                </div>
                <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                  <h3 className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Contributions</h3>
                  <p className="text-2xl font-semibold">2.4k</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">TypeScript</span>
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">65%</span>
                  </div>
                  <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">JavaScript</span>
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">20%</span>
                  </div>
                  <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">Python</span>
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">15%</span>
                  </div>
                  <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-xs text-neutral-600 dark:text-neutral-400">Quickdraw</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs text-neutral-600 dark:text-neutral-400">Pull Shark ×2</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-neutral-600 dark:text-neutral-400">YOLO</span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Contact */}
          <Link 
            href="/contact"
            className="row-span-1 col-span-2 bg-white dark:bg-neutral-900 rounded-[2rem] border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 ease-out group hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="h-full flex items-center gap-2 px-6">
              <span className="text-sm font-medium">Let's work together</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}