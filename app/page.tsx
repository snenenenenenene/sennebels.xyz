"use client"

import React, { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import type { ReactNode, MouseEvent as ReactMouseEvent } from 'react';
import { AnimatePresence, motion, PanInfo, useAnimation, useMotionValue, useSpring, animate } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Download, Activity, MapPin, LanguagesIcon, Sun, Moon, Sparkles, Cat, LayoutGrid, X, ChevronLeft, Apple, Smartphone, Globe, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "./constants";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import { Model as CalicoModel } from './components/models/calico'; // Import Calico Model
import type { Metadata } from 'next';

// Define Theme Type
type Theme = 'light' | 'dark' | 'calico' | 'immersive';

// Define Calico Palette Hexcodes
const CALICO_WHITE = '#FAF8F5';
const CALICO_ORANGE = '#D87A4A';
const CALICO_BROWN = '#8C6D5E';
const CALICO_BLACK = '#261F1C';

// Define Theme Colors (Updated Calico)
const THEME_COLORS = {
  light: { 
    bg: '#FFFFFF', 
    card: 'bg-neutral-100/90 dark:bg-neutral-800/90', 
    border: 'border-black/5 dark:border-white/10', 
    text: 'text-neutral-900 dark:text-neutral-100' // Base text color for theme
  }, 
  dark: { 
    bg: '#191919', 
    card: 'bg-[#2F2F2F]/90 dark:bg-[#2F2F2F]/90', 
    border: 'border-white/10 dark:border-white/10', 
    text: 'text-neutral-100 dark:text-neutral-100' // Dark theme uses light text
  }, 
  calico: { 
    bg: CALICO_WHITE, // Use Calico off-white for background
    card: `bg-white`, // Default card is white
    border: `border-[${CALICO_BLACK}]/20`, // Dark brown border, slightly more visible
    text: `text-[${CALICO_BLACK}]` // Dark brown text for Calico
  }, 
  immersive: { 
    bg: 'dynamic', 
    card: 'bg-neutral-100/80 dark:bg-[#1D1D1F]/80', 
    border: 'border-black/5 dark:border-white/10', 
    text: 'text-neutral-900 dark:text-neutral-100' // Default like light theme text
  } 
};

// Base Bento Card Styling
const BENTO_BASE_CLASSES = "bg-neutral-100/80 dark:bg-[#1D1D1F]/80 backdrop-blur-lg border border-black/5 dark:border-white/10 rounded-3xl shadow-sm transition-colors duration-300";

// Updated Bento Card Wrapper (Uses theme text color)
const BentoCard = ({ 
  children, 
  className = '', 
  href,
  theme = 'immersive',
  overrideBg, // Optional override for color blocking
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string; 
  href?: string; 
  theme?: Theme;
  overrideBg?: string; // e.g., 'bg-[#D87A4A]' 
  [key: string]: any; 
}) => {
  const themeConfig = THEME_COLORS[theme];
  // Use override or default card background
  const cardBg = overrideBg && theme === 'calico' ? overrideBg : themeConfig.card;
  const baseClassName = `${cardBg} ${themeConfig.border} backdrop-blur-lg rounded-3xl shadow-sm transition-colors duration-300 ${className}`;
  // Use theme's base text color
  const textClassName = overrideBg && theme === 'calico' ? `text-[${CALICO_WHITE}]` : themeConfig.text;
  const hoverClasses = theme !== 'immersive' 
      ? `hover:border-[${theme === 'calico' ? CALICO_BLACK : 'black'}]/25 dark:hover:border-white/25` 
      : 'hover:border-black/10 dark:hover:border-white/20';

  const combinedClassName = `${baseClassName} ${textClassName}`;

  const content = (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        className={`block h-full w-full ${combinedClassName} ${hoverClasses}`} 
        {...props}
      >
        {content}
      </Link>
    );
  }

  return content;
};

// --- Reusable Popover Component ---
const Popover = ({ 
  content, 
  x, 
  y, 
  visible 
}: { 
  content: React.ReactNode; 
  x: number; 
  y: number; 
  visible: boolean; 
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure component is mounted client-side before using portal
  }, []);

  if (!visible || !isMounted) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed z-[999] px-2 py-1 bg-black/80 dark:bg-white/90 text-white dark:text-black text-[11px] font-medium rounded-md shadow-lg pointer-events-none whitespace-nowrap transition-opacity duration-150"
      style={{
        top: `${y + 15}px`, // Position below cursor
        left: `${x}px`,    // Position at cursor X
        transform: 'translateX(-50%)', // Center horizontally
        opacity: visible ? 1 : 0, // Fade effect
      }}
    >
      {content}
    </div>,
    document.body // Render directly into the body element
  );
};

// Profile Card (Using Popover Component)
const ProfileCard = () => {
  const links = [
    { icon: Github, href: "https://github.com/snenenenenenene", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/sennebels", label: "LinkedIn" },
    { icon: Mail, href: "mailto:sennebels@gmail.com", label: "Email" },
    { icon: Download, href: "/assets/CV Senne Bels.pdf", label: "Resume", download: "CV Senne Bels.pdf" }
  ];

  // State for icon popovers
  const [iconPopover, setIconPopover] = React.useState<{
    visible: boolean; 
    content: string; 
    x: number; 
    y: number; 
  } | null>(null);

  const handleIconMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    setIconPopover({ visible: true, content: label, x: e.clientX, y: e.clientY });
  };

  const handleIconMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (iconPopover?.visible) {
      setIconPopover(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
    }
  };

  const handleIconMouseLeave = () => {
    setIconPopover(prev => prev ? { ...prev, visible: false } : null);
  };

  return (
    <BentoCard className="h-full flex flex-col p-6 md:p-8 overflow-hidden">
      <div className="flex-grow"> {/* Wrapper to allow bio to push footer down */} 
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <motion.div 
            className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Image src="/images/avatar.png" alt="Senne Bels profile picture" fill className="object-cover" sizes="64px" />
          </motion.div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-black dark:text-white mb-0.5">
              Senne Bels
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Full-stack Developer & Game Dev
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
          Full-stack developer & creative tech enthusiast from Antwerp, Belgium. Founder of <strong className="font-medium text-black dark:text-white">Okapi Works, my freelance company</strong>, and enjoy collaborating with startups. Focused on building interactive, scalable web experiences.
        </p>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
          Currently developing <strong className="font-medium text-black dark:text-white">ORNITHO</strong>, a dinosaur horror game set in Antwerp, in my free time. Actively seeking international contract opportunities in <strong className="font-medium text-black dark:text-white">North America, Japan, or the UK</strong>. Also, a big fan of cats.
        </p>
      </div>

      {/* Footer Info (Location, Languages, Links) */}
      <div className="mt-auto border-t border-black/5 dark:border-white/10 pt-4">
        <div className="grid grid-cols-2 gap-4 text-xs mb-4">
          <div>
            <h3 className="flex items-center gap-1.5 font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
              <MapPin className="w-3 h-3" /> LOCATION
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              🇧🇪 Antwerp, Belgium
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">(Open to relocate)</p>
          </div>
          <div>
            <h3 className="flex items-center gap-1.5 font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
              <LanguagesIcon className="w-3 h-3" /> LANGUAGES
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">🇬🇧 English (Fluent)</p>
            <p className="text-neutral-600 dark:text-neutral-300">🇳🇱 Dutch (Native)</p>
          </div>
        </div>
        {/* Links Section */}
        <div className="flex items-center justify-between border-t border-black/5 dark:border-white/10 pt-4 mb-4"> {/* Added mb-4 */} 
           <span className="text-xs text-neutral-500 dark:text-neutral-400">Get in touch:</span>
           <div className="flex gap-3">
            {links.map(({ icon: Icon, href, label, download }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                download={download}
                className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 dark:focus-visible:ring-offset-black rounded-lg"
                whileTap={{ scale: 0.90 }}
                whileHover={{ 
                  rotate: [0, -8, 8, -8, 8, 0],
                  transition: { duration: 0.4, ease: "easeInOut" } 
                }}
                aria-label={label}
                onMouseEnter={(e) => handleIconMouseEnter(e, label)}
                onMouseMove={handleIconMouseMove}
                onMouseLeave={handleIconMouseLeave}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
        
        {/* --- Cats Section --- */} 
        {/* {(() => {
          // Define cat data inside an IIFE to keep it scoped
          const catImages = [
            { src: '/assets/Brie.png', alt: 'Brie' },
            { src: '/assets/placeholder-cat-2.png', alt: 'Cat 2' },
            { src: '/assets/placeholder-cat-3.png', alt: 'Cat 3' },
            { src: '/assets/placeholder-cat-4.png', alt: 'Cat 4' },
          ];
          return (
            <div className="border-t border-black/5 dark:border-white/10 pt-4">
              <h3 className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2 text-center">Supervisors</h3>
              <div className="flex justify-center gap-2">
                {catImages.map((cat) => (
                  <div key={cat.alt} className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-black/10 dark:ring-white/10">
                    <Image
                      src={cat.src}
                      alt={cat.alt}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })()} */}
      </div>

      {/* Use Popover Component - Renders via Portal */}
      <Popover 
        visible={!!iconPopover?.visible} 
        content={iconPopover?.content || ''} 
        x={iconPopover?.x || 0} 
        y={iconPopover?.y || 0} 
      />
    </BentoCard>
  );
};

// Map platform names to icons (Ensure type safety)
const platformIcons: { [key: string]: React.ElementType | undefined } = {
  iOS: Apple,
  Android: Smartphone,
  Web: Globe,
  Mobile: Smartphone,
  Desktop: Activity, // Placeholder, maybe Laptop icon?
  Dashboard: LayoutDashboard,
};

// Featured Projects Card (Matching Border Radius)
const FeaturedProjects = ({ 
  currentProject, 
  setCurrentProject, 
  onScrollingChange 
}: { 
  currentProject: number;
  setCurrentProject: React.Dispatch<React.SetStateAction<number>>;
  onScrollingChange: (isScrolling: boolean) => void 
}) => {
  const [direction, setDirection] = React.useState(0);
  const [isScrollLocked, setIsScrollLocked] = React.useState(false);
  const [showOverview, setShowOverview] = React.useState(false); // State for overview modal
  const [showNudgeHint, setShowNudgeHint] = React.useState(true); // State for hint visibility
  const projectContainerRef = React.useRef<HTMLDivElement>(null);
  const dragThreshold = 50; // Min drag distance in pixels to trigger change
  const dragVelocityThreshold = 300; // Min velocity to trigger change

  // State for platform icon popovers
  const [platformPopover, setPlatformPopover] = React.useState<{
    visible: boolean; 
    content: string; 
    x: number; 
    y: number; 
  } | null>(null);

  const handleProjectChange = React.useCallback((index: number) => {
    if (isScrollLocked || index === currentProject) return; // Don't change if locked or same index
    setIsScrollLocked(true);
    onScrollingChange(true);
    
    // Use the passed-in state to determine direction
    setDirection(index > currentProject ? 1 : -1);
    setCurrentProject(index); // Call the setter from HomePage

    setTimeout(() => {
      setIsScrollLocked(false);
      onScrollingChange(false);
    }, 500); // Reduced timeout slightly to match faster animation
  }, [isScrollLocked, onScrollingChange, currentProject, setCurrentProject]); // Added dependencies

  // Drag End Handler for Kinetic Swipe
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    let nextProjectIndex = currentProject;

    if (Math.abs(offset) > dragThreshold || Math.abs(velocity) > dragVelocityThreshold) {
      if (offset < -dragThreshold || velocity < -dragVelocityThreshold) {
        // Swiped Left
        nextProjectIndex = (currentProject + 1 + projects.length) % projects.length;
      } else if (offset > dragThreshold || velocity > dragVelocityThreshold) {
        // Swiped Right
        nextProjectIndex = (currentProject - 1 + projects.length) % projects.length;
      }
    }
    
    // Only trigger change if the index is different
    if (nextProjectIndex !== currentProject) {
       handleProjectChange(nextProjectIndex);
    }
  };

  // Handle clicking project in overview
  const handleOverviewClick = (index: number) => {
    if (index !== currentProject) {
      handleProjectChange(index);
    }
    setShowOverview(false); // Close modal
  };

  // Effect to hide nudge hint after a delay
  React.useEffect(() => {
    const hintTimeout = setTimeout(() => {
      setShowNudgeHint(false);
    }, 3500); // Corresponds to hint animation duration + delay
    return () => clearTimeout(hintTimeout);
  }, []);

  // Platform Popover Handlers
  const handlePlatformMouseEnter = (e: React.MouseEvent<HTMLDivElement>, label: string) => {
    setPlatformPopover({ visible: true, content: label, x: e.clientX, y: e.clientY });
  };

  const handlePlatformMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (platformPopover?.visible) {
      setPlatformPopover(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
    }
  };

  const handlePlatformMouseLeave = () => {
    setPlatformPopover(prev => prev ? { ...prev, visible: false } : null);
  };

  // Updated variants for slide transition
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%', // Start off-screen
      opacity: 0
    }),
    center: {
      x: 0, // Center position
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%', // Exit off-screen
      opacity: 0
    })
  };

  return (
      <div 
        ref={projectContainerRef}
        className="relative w-full h-full cursor-grab active:cursor-grabbing" // Added grab cursors
      >
      <div className="absolute inset-0 overflow-hidden"> {/* Added overflow hidden here */} 
        {/* Animated Nudge Hint */} 
        <AnimatePresence>
          {showNudgeHint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0], // Fade in, stay, fade out
                x: [0, 0, -10, -10], // Stay, nudge left, stay nudged
                transition: {
                  duration: 2.5, // Total duration
                  times: [0, 0.2, 0.8, 1], // Timing points for keyframes
                  delay: 0.8, // Start after initial load
                  ease: "easeInOut"
                }
              }}
              exit={{ opacity: 0 }} // Optional exit animation
              className="absolute top-1/2 right-4 -translate-y-1/2 z-10 pointer-events-none"
            >
              <ChevronLeft className="w-6 h-6 text-white/60" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
            key={currentProject}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 origin-center"
            // Drag properties
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            // Add styles during drag
            whileDrag={{ scale: 0.97, opacity: 0.85 }} 
          >
            <div className="relative w-full h-full flex flex-col"> {/* Changed to flex column */} 
              {/* Image Container (Takes up most space) */} 
              <div className="relative flex-grow overflow-hidden rounded-t-3xl"> {/* Added rounding */} 
                <Image
                  src={projects[currentProject].image}
                  alt={projects[currentProject].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  // Prevent native image dragging
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                />
                {/* Removed gradient overlay div */} 
              </div>

              {/* Info Panel Container (Bottom section) */} 
              <div className="flex-shrink-0 p-6 md:p-8 text-black dark:text-white bg-neutral-50/80 dark:bg-black/30 rounded-b-3xl"> {/* Added padding, background, rounding */} 
                <div className="flex items-start justify-between mb-3 gap-4"> {/* Use start align, add gap */} 
                  <div> {/* Wrap title/year */} 
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-1"> {/* Adjusted size */} 
                      {projects[currentProject].title}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-sm font-medium text-neutral-600 dark:text-neutral-400"> {/* Adjusted styling */} 
                      {projects[currentProject].year}
                    </span>
                  </div>
                  {/* Moved View Project Link here */} 
                  <Link
                    href={projects[currentProject].link}
                    target="_blank"
                    className="flex-shrink-0 text-xs text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 group bg-black/10 dark:bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium whitespace-nowrap" // Adjusted styling
                  >
                    View Project <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>

                <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed max-w-2xl"> {/* Adjusted text color */} 
                  {projects[currentProject].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {projects[currentProject].tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-400" // Adjusted styling
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Conditionally render Platform Icons */} 
                {((projects[currentProject] as any).platforms && (projects[currentProject] as any).platforms.length > 0) && (
                  <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-black/5 dark:border-white/10"> 
                    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mr-1">Platforms:</span>
                    {(projects[currentProject] as any).platforms?.map((platform: string) => { 
                      const IconComponent = platformIcons[platform]; 
                      // Check if it's a valid component type (function or object)
                      if (typeof IconComponent !== 'function' && typeof IconComponent !== 'object') {
                        return null; 
                      }
                      return (
                        <motion.div
                          key={platform}
                          className="flex items-center justify-center p-1.5 bg-black/5 dark:bg-white/5 rounded-md cursor-default"
                          onMouseEnter={(e) => handlePlatformMouseEnter(e, platform)}
                          onMouseMove={handlePlatformMouseMove}
                          onMouseLeave={handlePlatformMouseLeave}
                        >
                          {/* Render the component */}
                          <IconComponent className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Page Number Indicator & Overview Trigger */} 
                <div className="flex justify-center items-center gap-4 mt-4">
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {currentProject + 1} / {projects.length}
                  </span>
                  <button 
                    onClick={() => setShowOverview(true)}
                    className="p-1 rounded-md text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors" 
                    aria-label="Show all projects"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Project Overview Modal */} 
      <AnimatePresence>
        {showOverview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOverview(false)} // Click backdrop to close
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */} 
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
              className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-4 md:p-6" // Reduced padding (Re-applying)
            >
              <h3 className="text-lg font-medium text-black dark:text-white mb-6 text-center">All Projects</h3>
              {/* Close Button */} 
              <button 
                onClick={() => setShowOverview(false)} 
                className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                aria-label="Close project overview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Grid of Projects */} 
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {projects.map((project, index) => (
                  <button 
                    key={project.title}
                    onClick={() => handleOverviewClick(index)}
                    className={`relative group block w-full aspect-square rounded-lg overflow-hidden transition-all duration-200 ${currentProject === index ? 'ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-neutral-800' : 'hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-800'}`}
                  >
                    <Image 
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    {/* Subtle overlay for title */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                      <h4 className="text-xs font-medium text-white truncate">{project.title}</h4>
                    </div>
                     {/* Selection indicator */}
                    {currentProject === index && (
                      <div className="absolute inset-0 bg-sky-500/20"></div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Platform Icon Popover */} 
      <Popover 
        visible={!!platformPopover?.visible} 
        content={platformPopover?.content || ''} 
        x={platformPopover?.x || 0} 
        y={platformPopover?.y || 0} 
      />
    </div>
  );
};

// Refined GitHub Stats (Language bars removed)
const GitHubStats = ({ theme, overrideBg }: { theme?: Theme; overrideBg?: string }) => {
  const [stats, setStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  // Animation for contribution count
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 100, damping: 30, mass: 1 });

  React.useEffect(() => {
    let animationControls: ReturnType<typeof animate> | null = null;

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
        // Animate the count when data arrives
        if (data.totalContributions) {
          animationControls = animate(count, data.totalContributions, {
             type: "spring",
             duration: 1.5 // Duration for the count-up
          });
        }
      })
      .catch(err => {
        console.error('Error fetching GitHub stats:', err);
        setError(err.message || 'Could not load stats.');
        setLoading(false);
      });

    // Cleanup function to stop animation if component unmounts
    return () => {
       animationControls?.stop();
    };
  }, [count]); // Dependency array includes count

  // Use state for the display count to ensure re-renders
  const [displayCount, setDisplayCount] = React.useState("0");
  React.useEffect(() => {
    return rounded.on("change", (latest) => {
      // Update state with the formatted number
      setDisplayCount(latest.toLocaleString("en-US", { maximumFractionDigits: 0 }));
    });
  }, [rounded]);

  return (
    <BentoCard theme={theme} overrideBg={overrideBg} className="h-full p-6 md:p-8 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="flex items-center gap-2 text-sm font-medium text-black dark:text-white">
          <Activity className="w-4 h-4" /> GitHub Activity
        </h3>
        {/* Display loading/error or the animated count */} 
        <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
          <Github className="w-3 h-3" /> 
          {loading ? (
            'Loading...'
          ) : error ? (
            'Error'
          ) : (
            // Use motion.span to display animated value from state
            <motion.span>{displayCount}</motion.span>
          )}
          { !loading && !error && ' contributions'} 
        </span>
      </div>

      {/* Main Content Area (Graph or Status) */}
      <div className="flex-grow flex items-center justify-center">
        {loading && <p className="text-xs text-neutral-500 dark:text-neutral-400">Loading stats...</p>}
        {error && <p className="text-xs text-red-600 dark:text-red-400">Error: {error}</p>}
        {stats && !loading && !error && (
          <div className="w-full">
            <ContributionGraph contributions={stats.contributionCalendar} />
        </div>
        )}
      </div>
    </BentoCard>
  );
};

// Contribution Graph Component (Using Popover Component)
const ContributionGraph = ({ contributions }: { contributions: any }) => {
  const [popover, setPopover] = React.useState<{ visible: boolean; content: string; x: number; y: number; } | null>(null);

  if (!contributions || !contributions.weeks) {
    return <div className="text-xs text-gray-400">Contribution data not available.</div>;
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, day: any) => {
    const content = `${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString()}`;
    setPopover({ visible: true, content, x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (popover?.visible) {
      setPopover(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
    }
  };

  const handleMouseLeave = () => {
    setPopover(prev => prev ? { ...prev, visible: false } : null);
  };

  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-neutral-100 dark:bg-neutral-800';
    if (count <= 3) return 'bg-green-200 dark:bg-green-900';
    if (count <= 6) return 'bg-green-300 dark:bg-green-800';
    if (count <= 9) return 'bg-green-400 dark:bg-green-700';
    return 'bg-green-500 dark:bg-green-600';
  };

  return (
    <div className="relative"> {/* Added relative positioning context */}
      {/* Contribution Grid */}
      <div className="overflow-x-auto scrollbar-hide pb-1">
        <div className="inline-grid grid-flow-col auto-cols-max gap-[2px]">
          {contributions.weeks.map((week: any, weekIndex: number) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-[2px]">
              {week.contributionDays.map((day: any, dayIndex: number) => (
                <motion.div
                  key={day.date || dayIndex}
                  className={`w-2 h-2 rounded-sm ${getContributionColor(day.contributionCount)} transition-colors cursor-default`}
                  onMouseEnter={(e) => handleMouseEnter(e, day)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Use Popover Component - Renders via Portal */}
      <Popover 
        visible={!!popover?.visible} 
        content={popover?.content || ''} 
        x={popover?.x || 0} 
        y={popover?.y || 0} 
      />
    </div>
  );
};

// --- Renamed to Generic Model Viewer ---
const ModelViewer = ({ theme }: { theme?: Theme }) => {
  const controlsRef = useRef<any>(); // Ref for OrbitControls
  const [isRotating, setIsRotating] = React.useState(true); // State to control rotation

  const handleInteractionStart = () => {
    setIsRotating(false);
  };

  const handleInteractionEnd = () => {
    setIsRotating(true);
  };

  return (
    <BentoCard theme={theme} className="h-full !p-0 overflow-hidden relative">
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
            {/* Render Calico Model instead of Shiba - Increased Scale */}
            <CalicoModel scale={1.5} position-y={-1} /> 
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
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          autoRotate={isRotating}
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 1.8}
          target={[0, 0.2, 0]}
          onStart={handleInteractionStart}
          onEnd={handleInteractionEnd}
        />
      </Canvas>
    </BentoCard>
  );
};

// --- Theme Switcher Component (with Cat Icon and Popover) ---
const ThemeSwitcher = ({ currentTheme, setTheme }: { currentTheme: Theme; setTheme: (theme: Theme) => void }) => {
  const themes: Theme[] = ['light', 'dark', 'calico', 'immersive'];
  const icons = { light: Sun, dark: Moon, calico: Cat, immersive: Sparkles };

  const [popover, setPopover] = useState<{ visible: boolean; content: string; x: number; y: number } | null>(null);

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
    // Hide popover on click
    setPopover(prev => prev ? { ...prev, visible: false } : null);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextThemeName = themes[nextIndex];
    const content = `Switch to ${nextThemeName.charAt(0).toUpperCase() + nextThemeName.slice(1)}`;
    setPopover({ visible: true, content, x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (popover?.visible) {
      setPopover(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
    }
  };

  const handleMouseLeave = () => {
    setPopover(prev => prev ? { ...prev, visible: false } : null);
  };

  const Icon = icons[currentTheme];

  return (
    <>
      <button
        onClick={cycleTheme}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="fixed bottom-6 left-6 z-50 p-2 w-9 h-9 flex items-center justify-center rounded-full bg-neutral-200/70 dark:bg-neutral-800/70 backdrop-blur-sm border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:scale-110 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        aria-label={`Current theme: ${currentTheme}. Switch theme.`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentTheme} // Key change triggers animation
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-5 h-5" />
          </motion.span>
        </AnimatePresence>
      </button>
      {/* Popover for Theme Switcher */}
      <Popover 
        visible={!!popover?.visible} 
        content={popover?.content || ''} 
        x={popover?.x || 0} 
        y={popover?.y || 0} 
      />
    </>
  );
};

// Main Page Component - Staggered Animations
export default function HomePage() {
  const [isProjectScrolling, setIsProjectScrolling] = React.useState(false);
  const [currentProject, setCurrentProject] = React.useState(0);
  const [backgroundStyle, setBackgroundStyle] = React.useState({});
  
  // Define themes array *before* using it in useState
  const themes: Theme[] = ['light', 'dark', 'calico', 'immersive']; 

  // Theme State
  const [theme, setTheme] = useState<Theme>(() => {
    // Check local storage or system preference on initial load
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
      // Now themes is accessible here
      if (savedTheme && themes.includes(savedTheme)) return savedTheme;
    }
    return 'immersive'; // Default theme
  });

  // Effect to update background based on theme and currentProject
  React.useEffect(() => {
    const themeConfig = THEME_COLORS[theme];
    if (theme === 'immersive') {
      const project = projects[currentProject];
      if (project && project.gradientFrom && project.gradientVia && project.gradientTo) {
        setBackgroundStyle({ background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientVia}, ${project.gradientTo})` });
      } else {
        setBackgroundStyle({ background: THEME_COLORS.dark.bg }); // Fallback for immersive
      }
    } else {
      setBackgroundStyle({ background: themeConfig.bg });
    }

    // Apply dark class for Tailwind dark: variants
    if (theme === 'dark' || theme === 'immersive') { // Apply dark styles for dark and immersive themes
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Persist theme choice
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-theme', theme);
    }

  }, [theme, currentProject]);

  // Animation Variants for Staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <main 
      className={`min-h-screen w-full p-4 md:p-6 lg:p-8 overflow-hidden transition-background duration-1000 ease-in-out`} // Increased duration
      style={backgroundStyle} 
    >
      {/* Grain Overlay - Moved outside main for fixed positioning */} 
      <div className="grain-overlay"></div> 
      
      {/* Removed fixed height, allowing content to grow. Added min-height for viewport height */}
      {/* Reverted: Set fixed height on md+ screens, min-height only for mobile */}
      <div className="relative z-10 max-w-7xl mx-auto min-h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]"> 
                  <motion.div 
           // Changed to 1 column by default, 6 columns on large screens
           className="grid grid-cols-1 lg:grid-cols-6 gap-4 md:gap-6 h-full"
           variants={containerVariants}
           initial="hidden"
           animate="visible"
        >
          {/* --- Left Column (Profile) --- */}
          {/* Changed to span 1 column by default, 2 on large screens */}
          {/* Removed row-span, should fill height automatically */}
          {/* Added overflow-hidden to enforce grid cell boundary */}
          {/* Added lift on hover */} 
          <motion.div 
            className="col-span-1 lg:col-span-2 flex flex-col gap-4 md:gap-6 overflow-hidden"
            variants={itemVariants}
            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }} 
          >
             {/* Profile Card Wrapper (Takes full column height) */}
             <div className="flex-1 min-h-0"> 
               <ProfileCard /> 
                    </div>
                  </motion.div>
                  
          {/* --- Right Column (Projects, Stats, Model) --- */}
          {/* Changed to span 1 column by default, 4 on large screens */}
          {/* Removed row-span, should fill height automatically */}
          {/* Added overflow-hidden to enforce grid cell boundary */}
          <motion.div 
            className="col-span-1 lg:col-span-4 grid grid-rows-[auto_auto] lg:grid-rows-[minmax(0,3fr)_minmax(0,1fr)] gap-4 md:gap-6 overflow-hidden"
            variants={itemVariants}
          >
            {/* Projects Carousel Wrapper */}
                  <motion.div
              initial={false}
              animate={{ scale: isProjectScrolling ? 0.985 : 1 }} // Even subtler scale
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="row-span-1 w-full h-[50vh] lg:h-full overflow-hidden" // Added default height for mobile project view
            >
              <BentoCard className="h-full overflow-hidden !p-0" theme={theme}>
                <FeaturedProjects 
                  currentProject={currentProject} 
                  setCurrentProject={setCurrentProject} 
                  onScrollingChange={setIsProjectScrolling} 
                />
            </BentoCard>
                    </motion.div>

            {/* Bottom Row (GitHub & 3D Model) - Reverted */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              {/* GitHub Stats - Reverted */} 
              {/* Added lift on hover */} 
              <motion.div 
                className="col-span-1 md:col-span-7 min-h-0 overflow-hidden"
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }} 
              >
                <GitHubStats theme={theme} /> 
              </motion.div>
              {/* REMOVED Cat Gallery Container */} 
              {/* Model Viewer - Updated Usage */} 
              {/* Added lift on hover */} 
              <motion.div 
                className="col-span-1 md:col-span-5 min-h-0 overflow-hidden"
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }} 
              >
                <ModelViewer theme={theme} /> 
              </motion.div>
            </div>
          </motion.div>

                    </motion.div>
                </div>
      {/* Theme Switcher UI */}
      <ThemeSwitcher currentTheme={theme} setTheme={setTheme} />
    </main>
  );
}