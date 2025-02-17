"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { ReactNode, MouseEvent as ReactMouseEvent } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { MoveUpRight, ArrowUpRight, Github, Linkedin, Mail, X, Download, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects, NOW_ITEMS, TIMELINE_ITEMS, GEAR_ITEMS, ACHIEVEMENTS } from "./constants";
import { useSpring, animated } from '@react-spring/web';

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

const DevTerminal = () => {
  const [history, setHistory] = useState<Array<{ command: string; response: string }>>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isDark, setIsDark] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize theme on mount
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleThemeCommand = (args: string[]) => {
    const mode = args[0]?.toLowerCase();
    if (mode === 'light' || mode === 'dark') {
      setIsDark(mode === 'dark');
      document.documentElement.classList.toggle('dark', mode === 'dark');
      return `Theme set to ${mode} mode`;
    } else {
      const newTheme = !isDark;
      setIsDark(newTheme);
      document.documentElement.classList.toggle('dark', newTheme);
      return `Theme toggled to ${newTheme ? 'dark' : 'light'} mode`;
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const executeCommand = (cmd: string) => {
    const [command, ...args] = cmd.toLowerCase().trim().split(' ');
    
    let response = '';
    
    switch (command) {
      case 'theme':
        response = handleThemeCommand(args);
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        response = TERMINAL_COMMANDS[command as keyof typeof TERMINAL_COMMANDS] || 'Command not found. Type "help" for available commands.';
    }
    
    setHistory(prev => [...prev, { command: cmd, response }]);
    setCurrentCommand('');
    
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div 
      ref={containerRef}
      onClick={handleContainerClick}
      className="relative w-full h-full bg-[#1a1a1a] rounded-[2rem] overflow-hidden font-mono text-sm"
    >
      <div 
        ref={terminalRef}
        className="absolute inset-0 p-4 overflow-y-auto scrollbar-hide pb-[60px]"
      >
        <div className="text-[#27c93f] mb-4">
          Welcome! Type "help" to see available commands.
        </div>
        
        {history.map((entry, i) => (
          <div key={i} className="mb-2">
            <div className="flex items-center text-[#efefef]">
              <span className="text-[#27c93f]">❯</span>
              <span className="ml-2">{entry.command}</span>
            </div>
            <div className="text-[#efefef] ml-4 opacity-80">
              {entry.response}
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 flex items-center text-[#efefef] p-4 border-t border-[#3a3a3a] bg-[#2a2a2a]">
        <span className="text-[#27c93f]">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="ml-2 bg-transparent outline-none flex-1 caret-[#27c93f]"
        />
      </div>
    </div>
  );
};

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

const FeaturedProjects = ({ 
  onScrollingChange 
}: { 
  onScrollingChange: (isScrolling: boolean) => void 
}) => {
  const [currentProject, setCurrentProject] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [isScrollLocked, setIsScrollLocked] = React.useState(false);

  const handleProjectChange = (index: number) => {
    if (isScrollLocked) return;
    setIsScrollLocked(true);
    onScrollingChange(true);
    
    setDirection(index > currentProject ? 1 : -1);
    setCurrentProject(index);

    // Reset scroll lock and animation after transition
    setTimeout(() => {
      setIsScrollLocked(false);
      onScrollingChange(false);
    }, 700); // Increased from 500 to 700ms to ensure complete transition
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (isScrollLocked) return;

    const dir = e.deltaY > 0 ? 1 : -1;
    const nextProject = Math.min(Math.max(0, currentProject + dir), projects.length - 1);
    if (nextProject !== currentProject) {
      handleProjectChange(nextProject);
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
                <div className="flex items-center mb-4">
                  <span className="text-sm px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                    {projects[currentProject].year}
                  </span>
                </div>

                <h3 className="text-3xl font-medium tracking-tight mb-3">
                  {projects[currentProject].title}
                </h3>
                
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
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => handleProjectChange(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              currentProject === index 
                ? 'bg-white scale-150' 
                : 'bg-white/50 hover:bg-white/80'
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

// Enhanced Profile Card
interface ProfileCardProps {
  children: ReactNode;
  [key: string]: any;
}

const ProfileCard = ({ children, ...props }: ProfileCardProps) => {
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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.3s ease-out',
      }}
      className="shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.04)] backdrop-blur-sm"
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Enhanced GitHub Stats Card with animations
const GitHubStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState<{
    publicRepos: number;
    totalContributions: number;
    languages: Array<{ name: string; percentage: number }>;
    followers: number;
    contributionCalendar: {
      totalContributions: number;
      weeks: Array<{
        contributionDays: Array<{
          contributionCount: number;
          date: string;
        }>;
      }>;
    };
  } | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/github');
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
      }
    };

    fetchStats();
  }, []);

  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-neutral-100 dark:bg-neutral-800';
    if (count <= 3) return 'bg-green-200 dark:bg-green-900';
    if (count <= 6) return 'bg-green-300 dark:bg-green-800';
    if (count <= 9) return 'bg-green-400 dark:bg-green-700';
    return 'bg-green-500 dark:bg-green-600';
  };

  return (
    <div ref={statsRef} className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-medium text-sm text-black dark:text-white">Coding Activity</h2>
        <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
          <Github className="w-4 h-4" />
          <span>{stats?.totalContributions || '...'} contributions</span>
        </div>
      </div>

      {/* Contribution Calendar - More Compact */}
      <div className="flex-1 overflow-x-auto scrollbar-hide">
        <div className="inline-grid grid-cols-[repeat(53,1fr)] gap-[2px]">
          {stats?.contributionCalendar.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-[2px]">
              {week.contributionDays.map((day, dayIndex) => (
                <motion.div
                  key={day.date}
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                  className={`w-1.5 h-1.5 rounded-sm ${getContributionColor(day.contributionCount)}`}
                  title={`${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString()}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Language Stats - Horizontal */}
      <div className="flex gap-3 mt-3">
        {stats?.languages.map((lang) => (
          <div key={lang.name} className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-neutral-600 dark:text-neutral-300">{lang.name}</span>
              <span className="text-[10px] text-neutral-600 dark:text-neutral-300">{lang.percentage}%</span>
            </div>
            <div className="h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isVisible ? { width: `${lang.percentage}%` } : { width: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  lang.name === 'TypeScript' ? 'bg-blue-500' :
                  lang.name === 'JavaScript' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Contact Button with magnetic effect
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

  return (
    <main className="min-h-screen w-full bg-white dark:bg-black p-4 md:p-6 overflow-x-hidden">
      <ParticleEffect />
      <CustomCursor />
      
      <div className="max-w-[2000px] mx-auto h-[calc(100vh-3rem)]">
        <div className="grid grid-cols-6 gap-4 h-full auto-rows-[minmax(0,1fr)]">
          <div className="col-span-2 row-span-4 grid grid-rows-[3fr,1fr] gap-4">
            {/* Profile Card */}
            <ProfileCard className="row-span-1 bg-white/80 dark:bg-neutral-900/80 rounded-[2rem] p-6 md:p-8 border border-neutral-200/50 dark:border-neutral-800/50 hover:border-neutral-300/50 dark:hover:border-neutral-700/50 transition-all duration-300 ease-out">
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
                      <h1 className="text-xl md:text-2xl font-bold tracking-tight mb-1 gradient-text">Senne Bels</h1>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Full-stack Developer & Game Dev
                        </p>
                        <span className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full text-neutral-600 dark:text-neutral-300">24</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 leading-relaxed">
                    Hey, I&apos;m <span className="font-medium text-black dark:text-white">Senne</span>! <span className="font-medium text-black dark:text-white">INFP-T</span>, full-stack developer, and a creative tech enthusiast from <span className="font-medium text-black dark:text-white">Antwerp</span>.
                    I focus on building <span className="font-medium text-black dark:text-white">interactive and innovative web experiences</span>, blending functionality with fun.
                    Currently, I&apos;m diving into <span className="font-medium text-black dark:text-white">creative tech</span> while tackling projects like <span className="font-medium text-black dark:text-white">The Okapi Store</span>—my e-commerce platform to support okapi conservation.
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="mb-4">
                    <h2 className="font-medium text-xs mb-2 text-neutral-600 dark:text-neutral-400">PRIMARY STACK</h2>
                    <div className="flex flex-wrap gap-2">
                      {["TypeScript", "Next.js", "Prisma", "Tailwind", "ThreeJS", "Python"].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs text-neutral-600 dark:text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-xs text-neutral-600 dark:text-neutral-400">LOCATION</h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300">
                        🇧🇪 Antwerp, Belgium
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-xs text-neutral-600 dark:text-neutral-400">LANGUAGES</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-neutral-600 dark:text-neutral-300">🇬🇧 English</span>
                        <span className="text-xs text-neutral-600 dark:text-neutral-300">🇳🇱 Dutch</span>
                        <span className="text-xs text-neutral-600 dark:text-neutral-300">🇩🇪 German</span>
                        <span className="text-xs text-neutral-600 dark:text-neutral-300">🇫🇷 French</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 sophisticated-pulse" />
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">
                      Available for freelance projects
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[
                      { icon: Github, href: "https://github.com/snenenenenenene" },
                      { icon: Linkedin, href: "https://linkedin.com/in/sennebels" },
                      { icon: Mail, href: "mailto:contact@sennebels.xyz" }
                    ].map(({ icon: Icon, href }) => (
                      <motion.a
                        key={href}
                        href={href}
                        target="_blank"
                        className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-md hover:-translate-y-0.5 transition-transform"
                      >
                        <Icon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </ProfileCard>

            {/* Contact Button */}
            <BentoCard 
              href="/contact"
              size="medium" 
              className="!p-0 overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="w-full h-full bg-black dark:bg-white rounded-[2rem] border border-neutral-200 dark:border-neutral-800">
                <div className="w-full h-full flex items-center justify-between px-8">
                  <span className="text-base font-medium text-white dark:text-black">Let's work together</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-white dark:text-black" />
                  </motion.div>
                </div>
              </div>
            </BentoCard>
          </div>

          <div className="col-span-4 row-span-4 grid grid-rows-[4fr,1fr] gap-4">
            {/* Project Carousel */}
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

            <div className="grid grid-cols-12 gap-4">
              {/* GitHub Stats */}
              <BentoCard className="col-span-6 !p-4">
                <div className="h-full flex flex-col scrollbar-hide">
                  <GitHubStats />
                </div>
              </BentoCard>

              {/* Terminal (now includes theme control) */}
              <BentoCard className="col-span-6 !p-0 overflow-hidden">
                <DevTerminal />
              </BentoCard>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}