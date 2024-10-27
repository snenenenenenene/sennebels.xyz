"use client"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const TYPING_TEXTS = ["Websites", "Applications", "Side Projects"];

const projects = [
  {
    title: "Lokaal Beslist",
    description: "A platform for local governments",
    image: "/images/work/lokaalbeslist.png",
    year: "2023",
    link: "https://lokaalbeslist.lblod.info/",
  },
  {
    title: "Waddist",
    description: "Mobile App Development",
    image: "/images/work/waddist.webp",
    year: "2021",
    link: "https://play.google.com/store/apps/details?id=be.arteveldehogeschool.waddist&hl=en",
  },
  {
    title: "Skinhouse",
    description: "Website Development",
    image: "/images/work/skinhouse.png",
    year: "2024",
    link: "https://skinhouse.vercel.app/",
  },
];

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
    className="block w-full  relative overflow-hidden h-[450px] rounded-[24px] hover:-translate-y-1 transition-transform duration-300 bg-[#F7F5F3]"
  >
    <Image
      src={image}
      alt={title}
      width={668}
      height={500}
      className="w-full absolute inset-0 -translate-y-1/3 translate-x-1/3 right-10 top-0 h-full aspect-[668/500] object-cover rounded-2xl"
    />
    <div className="absolute bottom-0 left-0 w-full p-6 rounded-b-2xl">
      <div className="mb-3">
        <div className="inline-block">
          <div className="bg-[#6b6b6bb0] px-3 py-1 rounded-full text-sm">
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
        <MoveUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
    className="group"
  >
    <div className="text-white/70 text-xs sm:text-sm tracking-wider mb-4">{title}</div>
    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">{description}</h3>
    <div className="flex items-center text-white mt-4">
      <span className="mr-2 text-sm sm:text-base">Learn more</span>
      <MoveUpRight size={16} className="transition-transform group-hover:translate-x-1" />
    </div>
  </Link>
);

export default function Home() {
  const [textIndex, setTextIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Separate scroll ranges for each sentence group
  const introColor = useTransform(
    scrollY,
    [0, 100],
    ["rgb(207, 207, 207)", "rgb(0, 0, 0)"]
  );

  const roleColor = useTransform(
    scrollY,
    [100, 200],
    ["rgb(207, 207, 207)", "rgb(0, 0, 0)"]
  );

  const craftingColor = useTransform(
    scrollY,
    [200, 300],
    ["rgb(207, 207, 207)", "rgb(0, 0, 0)"]
  );

  const creatingColor = useTransform(
    scrollY,
    [300, 400],
    ["rgb(207, 207, 207)", "rgb(0, 0, 0)"]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((current) => (current + 1) % TYPING_TEXTS.length);
    }, 3000);

    if (typeof window !== 'undefined' && document.getElementById('circletext')) {
      // @ts-ignore
      new CircleType(document.getElementById('circletext'));
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <header
        ref={heroRef}
        className="pt-[10px] pb-16 sm:pt-[120px] md:pt-[100px] lg:pt-[80px] px-4 sm:px-6 md:px-8"
      >     <div className="container mx-auto max-w-[728px] lg:max-w-full xl:max-w-[1140px]">
          <div className="hero-text-wrapper flex flex-wrap items-baseline gap-x-4">
            {/* Introduction sentence */}
            <span className="text-[2.6rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[7rem] leading-none">👋</span>
            <motion.span
              style={{ color: introColor }}
              className="text-[2.1rem] sm:text-[3.1rem] md:text-[4.2rem] lg:text-[5rem] leading-[150%]"
            >
              Hi,
            </motion.span>
            <motion.span
              style={{ color: introColor }}
              className="text-[2.1rem] sm:text-[3.1rem] md:text-[4.2rem] lg:text-[5rem] leading-[150%]"
            >
              I&apos;m
            </motion.span>
            <motion.span
              style={{ color: introColor }}
              className="text-[2.1rem] sm:text-[3.1rem] md:text-[4.2rem] lg:text-[5rem] leading-[150%]"
            >
              Senne&nbsp;Bels,
            </motion.span>

            {/* Role sentence */}
            <span className="text-[2.6rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[7rem] leading-none">💻</span>
            <motion.span
              style={{ color: roleColor }}
              className="text-[2.1rem] sm:text-[3.1rem] md:text-[4.2rem] lg:text-[5rem] leading-[150%]"
            >
              Creative
            </motion.span>
            <motion.span
              style={{ color: roleColor }}
              className="text-[2.1rem] sm:text-[3.1rem] md:text-[4.2rem] lg:text-[5rem] leading-[150%]"
            >
              Full&nbsp;Stack
            </motion.span>
            <motion.span
              style={{ color: roleColor }}
              className="text-[2.1rem] sm:text-[3.1rem] md:text-[4.2rem] lg:text-[5rem] leading-[150%]"
            >
              Developer
            </motion.span>
            {/* Creating sentence */}
            <span className="text-[2.6rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[7rem] leading-none">🚀</span>
            <motion.span
              style={{ color: creatingColor }}
              className="text-[2.1rem] sm:text-[3.1rem] md:text-[4.2rem] lg:text-[5rem] leading-[150%]"
            >
              Building
            </motion.span>
            <motion.span
              style={{ color: creatingColor }}
              className="text-[2.1rem] sm:text-[3.1rem] md:text-[4.2rem] lg:text-[5rem] leading-[150%]"
            >
              Impactful
            </motion.span>
            <motion.span
              style={{ color: creatingColor }}
              className="text-[2.1rem] sm:text-[3.1rem] md:text-[4.2rem] lg:text-[5rem] leading-[150%]"
            >
              &amp;
            </motion.span>
            <motion.span
              style={{ color: creatingColor }}
              className="text-[2.1rem] sm:text-[3.1rem] md:text-[4.2rem] lg:text-[5rem] leading-[150%]"
            >
              Sustainable
            </motion.span>
            <motion.span
              style={{ color: creatingColor }}
              className="text-[2.1rem] sm:text-[3.1rem] md:text-[4.2rem] lg:text-[5rem] leading-[150%]"
            >
              Experiences
            </motion.span>
            <span className="text-[2.6rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[7rem] leading-none">🌳</span>

          </div>
        </div>
      </header>

      {/* Profile Image Section */}
      <div className="mt-8 sm:mt-12 md:mt-0 mx-4 sm:mx-6 md:mx-8">
        <div className="rounded-[36px] sm:rounded-[40px] md:rounded-[80px] h-[360px] sm:h-[320px] md:h-[500px] overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full"
          >
            <Image
              src="/images/hero.jpg"
              alt="Hero image"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Featured Work Section */}
      <section className="section">
        <div className="container justify-center w-container">
          <div className="resources-section-heading flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <h2 className="section-heading text-[1.8rem] sm:text-[2rem] md:text-[2.2rem] font-semibold">Featured</h2>
            <div className="textswitcher-overflow relative w-full sm:w-[300px] h-[88px]">
              <div className="absolute inset-0 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={textIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="section-heading text-[1.8rem] sm:text-[2rem] md:text-[2.2rem] font-semibold absolute"
                  >
                    {TYPING_TEXTS[textIndex]}
                  </motion.h2>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div id="w-node-_11f600ed-5ac9-d115-fdd4-b4825d287daf-edfc6c6c"
            className="w-layout-layout grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1140px]">
            {projects.map((project) => (
              <div key={project.title} className="w-layout-cell">
                <ProjectCard {...project} />
              </div>
            ))}

            {/* Optional: Add a "View All Projects" button at the bottom */}
            <div className="h-20 col-span-full text-center">
              <Link
                href="/work"
                className="button center mt-10 inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
              >
                View all projects →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{
        backgroundImage: "url('/images/starry-bg.png')",
        backgroundPosition: "50%",
        backgroundSize: "cover"
      }} className="py-[60px] sm:py-[72px] md:py-[150px] px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-[728px] lg:max-w-full xl:max-w-[1140px]">
          <h2 className="text-center text-white text-[1.8rem] sm:text-[2rem] md:text-[2.2rem] font-semibold mb-11 max-w-3xl mx-auto">
            I turn complex ideas into intuitive experiences.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            <ServiceCard
              title="ABOUT ME"
              description="Creative developer focused on interactive experiences"
              link="/about"
            />
            <ServiceCard
              title="MY WORK"
              description="Building high-quality websites with modern technologies"
              link="/work"
            />
          </div>
        </div>
      </section>

      {/* Circle Text
      <div className="fixed bottom-[3%] left-[3%] z-[5] w-24 h-24 hidden md:block">
        <div id="circletext" className="text-sm font-medium text-dark-accent dark:text-white opacity-80">
          ✦ THINK LESS ✦ CREATE MORE
        </div>
      </div> */}
    </main>
  );
}