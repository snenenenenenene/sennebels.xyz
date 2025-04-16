"use client"

import React, { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import type { ReactNode, MouseEvent as ReactMouseEvent } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Download, Activity, MapPin, LanguagesIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "./constants";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

// Base Bento Card Styling
const BENTO_BASE_CLASSES = "bg-neutral-100/80 dark:bg-[#1D1D1F]/80 backdrop-blur-lg border border-black/5 dark:border-white/10 rounded-3xl shadow-sm transition-colors duration-300";

// Refined Bento Card Wrapper
const BentoCard = ({ 
  children, 
  className = '', 
  href,
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string; 
  href?: string; 
  [key: string]: any; 
}) => {
  const baseClassName = `${BENTO_BASE_CLASSES} ${className}`;

  if (href) {
    // Apply hover styles directly to the link/card wrapper
    return (
      <Link 
        href={href} 
        className={`block h-full w-full ${baseClassName} hover:border-black/10 dark:hover:border-white/20`} 
        {...props}
        >
          {children}
      </Link>
    );
  }

  return (
    <div className={baseClassName} {...props}>
      {children}
    </div>
  );
};

// Profile Card (Integrating Links into Footer)
const ProfileCard = () => {
  const links = [
    { icon: Github, href: "https://github.com/snenenenenenene", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/sennebels", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@sennebels.xyz", label: "Email" },
    { icon: Download, href: "/assets/CV Senne Bels.pdf", label: "Resume", download: "CV Senne Bels.pdf" }
  ];

  return (
    <BentoCard className="h-full flex flex-col p-6 md:p-8 overflow-hidden">
      <div className="flex-grow"> {/* Wrapper to allow bio to push footer down */} 
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
            <Image src="/images/avatar.png" alt="Senne Bels Avatar" fill className="object-cover" sizes="64px" />
          </div>
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
        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
          Full-stack developer & creative tech enthusiast from Antwerp, Belgium. Founder of <strong className="font-medium text-black dark:text-white">Okapi Works, my freelance company</strong>. Focused on building interactive, scalable web experiences. Actively seeking international freelance/contract opportunities (remote/hybrid) in <strong className="font-medium text-black dark:text-white">North America, Japan, or the UK</strong>.
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
        {/* Links Section Added */}
        <div className="flex items-center justify-between border-t border-black/5 dark:border-white/10 pt-4">
           <span className="text-xs text-neutral-500 dark:text-neutral-400">Get in touch:</span>
           <div className="flex gap-3">
            {links.map(({ icon: Icon, href, label, download }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                download={download} // Add download attribute if present
                className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 dark:focus-visible:ring-offset-black rounded-lg" // Simpler styling, icon only visual
                whileTap={{ scale: 0.90 }} // Slightly stronger tap feedback
                aria-label={label} // Keep aria-label
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
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
  // Removed local currentProject state
  const [direction, setDirection] = React.useState(0);
  const [isScrollLocked, setIsScrollLocked] = React.useState(false);
  const projectContainerRef = React.useRef<HTMLDivElement>(null);

  const handleProjectChange = React.useCallback((index: number) => {
    if (isScrollLocked) return;
    setIsScrollLocked(true);
    onScrollingChange(true);
    
    // Use the passed-in state to determine direction
    setDirection(index > currentProject ? 1 : -1);
    setCurrentProject(index); // Call the setter from HomePage

    setTimeout(() => {
      setIsScrollLocked(false);
      onScrollingChange(false);
    }, 700);
  }, [isScrollLocked, onScrollingChange, currentProject, setCurrentProject]); // Added dependencies

  // Wheel Handler uses handleProjectChange which now uses lifted state
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isScrollLocked) {
      e.preventDefault();
      const dir = e.deltaY > 0 ? 1 : -1;
      const nextProjectIndex = (currentProject + dir + projects.length) % projects.length;
      handleProjectChange(nextProjectIndex);
    }
  }, [isScrollLocked, handleProjectChange, currentProject]); // Added currentProject

  // Keyboard Navigation uses handleProjectChange
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollLocked) return;
      let nextProjectIndex = -1;
      if (e.key === 'ArrowRight') {
        nextProjectIndex = (currentProject + 1 + projects.length) % projects.length;
      } else if (e.key === 'ArrowLeft') {
        nextProjectIndex = (currentProject - 1 + projects.length) % projects.length;
      }
      if (nextProjectIndex !== -1 && nextProjectIndex !== currentProject) {
        handleProjectChange(nextProjectIndex);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleProjectChange, isScrollLocked, currentProject]); // Added currentProject

  // Add useEffect for manual wheel listener attachment
  useEffect(() => {
    const element = projectContainerRef.current;
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleWheel]);

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
        ref={projectContainerRef}
        className="relative w-full h-full"
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
                className="object-cover rounded-3xl"
                    sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-3xl" />

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
      
      {/* Navigation Dots (Refined Focus) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20">
        {projects.map((project, index) => (
          <button
            key={index}
            onClick={() => handleProjectChange(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 outline-none ${
              currentProject === index 
                ? 'bg-white scale-150' 
                : 'bg-white/50 hover:bg-white/80'
            } focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50`}
            aria-label={`Go to project: ${project.title}`}
          />
        ))}
      </div>
    </div>
  );
};

// Refined GitHub Stats (Language bars removed)
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
        setError(err.message || 'Could not load stats.');
        setLoading(false);
      });
  }, []);

  return (
    <BentoCard className="h-full p-6 md:p-8 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="flex items-center gap-2 text-sm font-medium text-black dark:text-white">
          <Activity className="w-4 h-4" /> GitHub Activity
        </h3>
        {stats && !loading && (
          <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
            <Github className="w-3 h-3" /> {stats.totalContributions?.toLocaleString()} contributions
          </span>
        )}
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
  const controlsRef = useRef<any>(); // Ref for OrbitControls
  const [isRotating, setIsRotating] = React.useState(true); // State to control rotation

  const handleInteractionStart = () => {
    setIsRotating(false);
  };

  const handleInteractionEnd = () => {
    setIsRotating(true);
  };

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

// Main Page Component - Staggered Animations
export default function HomePage() {
  const [isProjectScrolling, setIsProjectScrolling] = React.useState(false);
  // Lifted currentProject state
  const [currentProject, setCurrentProject] = React.useState(0);
  // State for background style
  const [backgroundStyle, setBackgroundStyle] = React.useState({});

  // Effect to update background based on currentProject
  React.useEffect(() => {
    const project = projects[currentProject];
    if (project && project.gradientFrom && project.gradientVia && project.gradientTo) {
      setBackgroundStyle({
        background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientVia}, ${project.gradientTo})`,
      });
    } else {
      // Default background if colors not defined
      setBackgroundStyle({}); 
    }
  }, [currentProject]);

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
      className="min-h-screen w-full bg-neutral-100 dark:bg-black p-4 md:p-6 lg:p-8 overflow-hidden transition-background duration-700 ease-in-out" // Added transition class
      style={backgroundStyle} // Apply dynamic background
    >
      <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]">
        <motion.div 
          className="grid grid-cols-6 gap-4 md:gap-6 h-full auto-rows-[minmax(0,1fr)]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* --- Left Column (Profile Only) --- */}
          <motion.div 
            className="col-span-6 lg:col-span-2 row-span-4 flex flex-col gap-4 md:gap-6"
            variants={itemVariants}
          >
             {/* Profile Card Wrapper (Takes full column height) */}
             <div className="flex-1 min-h-0"> 
               <ProfileCard /> 
             </div>
          </motion.div>

          {/* --- Right Column (Unchanged) --- */}
          <motion.div 
            className="col-span-6 lg:col-span-4 row-span-4 grid grid-rows-[minmax(0,3fr)_minmax(0,1fr)] gap-4 md:gap-6"
            variants={itemVariants}
          >
            {/* Projects Carousel Wrapper */}
            <motion.div
              initial={false}
              animate={{ scale: isProjectScrolling ? 0.985 : 1 }} // Even subtler scale
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="row-span-1 w-full h-full overflow-hidden"
            >
              <BentoCard className="h-full overflow-hidden !p-0">
                <FeaturedProjects 
                  currentProject={currentProject} 
                  setCurrentProject={setCurrentProject} 
                  onScrollingChange={setIsProjectScrolling} 
                />
              </BentoCard>
                    </motion.div>

            {/* Bottom Row (GitHub & 3D Model) */}
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-12 md:col-span-7 min-h-0"> <GitHubStats /> </div>
              <div className="col-span-12 md:col-span-5 min-h-0"> <ShibaModelViewer /> </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}