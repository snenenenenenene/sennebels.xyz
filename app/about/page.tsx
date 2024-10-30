"use client"
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { link } from "fs";

const TIMELINE_ITEMS = [
	{
		year: "2024",
		description: "Started at Specular Consulting, building sustainable tech solutions"
	},
	{
		year: "2022 - 2024",
		description: "Software Engineer at Flanders Agency of Home Affairs, leading development of Lokaal Beslist"
	},
	{
		year: "2022",
		description: "Graduated Cum Laude in Computer Science & Started Creative Technologies"
	},
	{
		year: "2021",
		description: "First role as Software Engineer at Inuits, building surveying applications"
	},
	{
		year: "2019",
		description: "Started Computer Science journey at AP College University"
	}
];

const NOW_ITEMS = [
	{
		title: "Full Stack Developer at Specular",
		description: "Building a sustainability assessment platform using React Flow and TypeScript.",
		link: "#"
	},
	{
		title: "The Okapi Shop",
		description: "Creating an e-commerce platform to support Okapi preservation.",
		link: "https://the-okapi-webstore.vercel.app/",
	},
	{
		title: "Studying Creative Technologies",
		description: "Expanding knowledge in 3D Development, VFX, and Creative Coding.",
		link: "#"
	}
];

const GEAR_ITEMS = [
	"MacBook Pro 14\" M1",
	"iPhone 13",
	"Keycool Custom 60% Keyboard",
	"MSI G27 Display"
];

const ACHIEVEMENTS = [
	"Graduated Cum Laude, AP University College Antwerp (2022)",
	"IELTS Overall Score 8.0, British Consulate Brussels (2021)",
	"Chinese A1 Certification, Linguapolis Antwerp (2020)"
];

export default function About() {
	const [activeSection, setActiveSection] = useState('about');

	useEffect(() => {
		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
					setActiveSection(entry.target.id);
				}
			});
		};

		const observer = new IntersectionObserver(observerCallback, {
			threshold: 0.5,
			rootMargin: '-10% 0px -45% 0px'
		});

		document.querySelectorAll('section[id]').forEach((section) => {
			observer.observe(section);
		});

		return () => observer.disconnect();
	}, []);

	const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
		e.preventDefault();
		const element = document.getElementById(sectionId);
		if (element) {
			const yOffset = -100;
			const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
			window.scrollTo({ top: y, behavior: 'smooth' });
		}
	};

	const sidebarLinks = [
		{ id: 'about', label: 'About me in 10 seconds' },
		{ id: 'now', label: 'Now' },
		{ id: 'features', label: 'Features & Awards' },
		{ id: 'timeline', label: 'Timeline' },
		{ id: 'find', label: 'Find me online' },
	];

	return (
		<div
			className="min-h-screen bg-[#fdfcf9] font-satoshi text-[#222227] text-base font-normal leading-[155%] pt-[160px] sm:pt-[120px] md:pt-[100px] lg:pt-[80px] px-4 sm:px-6 md:px-8"
			style={{
				backgroundImage: "url('/images/Noise Background.webp')",
				backgroundPosition: "0 0",
				backgroundSize: "contain",
			}}
		>
			<div className="max-w-[1200px] mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-[185px,1fr] gap-8">
					{/* Left Sidebar */}
					<div className="hidden md:block self-start sticky top-[100px]">
						<div className="flex flex-col">
							{sidebarLinks.map((link) => (
								<Link
									key={link.id}
									href={`#${link.id}`}
									onClick={(e) => scrollToSection(e, link.id)}
									className={`
                    block py-1 px-0 text-sm font-medium transition-all duration-200
                    ${activeSection === link.id
											? 'text-[#222227] font-bold'
											: 'text-[#6b6b6b] hover:text-[#222227]'
										}
                  `}
								>
									{link.label}
								</Link>
							))}
						</div>
					</div>
					{/* Main Content */}
					<div className="w-full max-w-[650px]">
						<div className="rounded-[36px] sm:rounded-[40px] md:rounded-[80px] h-[360px] sm:h-[320px] md:h-[500px] overflow-hidden mb-12">
							<Image
								src="/images/me.jpg"
								alt="Senne Bels"
								width={2048}
								height={1365}
								className="object-cover w-full h-full"
								priority
							/>
						</div>

						<section id="about" className="scroll-mt-24">
							<h1 className="text-[1.8rem] sm:text-[2rem] md:text-[2.5rem] font-semibold leading-[140%] mb-2">
								About me in 10 seconds
							</h1>
							<p className="text-[#494949] mt-0 mb-10">
								Hey! I&apos;m Senne, a Creative Full Stack Developer based in Antwerp.<br /><br />

								I create interactive web experiences focused on innovation and user experience.
								My unique background in Big Data & AI, combined with my time studying
								Multimedia and Creative Technologies, allows me to approach problems from multiple angles.<br /><br />

								As an INFP-T individual, I strive to build meaningful applications that make a difference.
								This passion extends beyond coding – I&apos;m an active WWF volunteer, deeply committed to
								environmental conservation. At home, I&apos;m surrounded by my four cats and a chihuahua, who
								keep me company during coding sessions.<br /><br />

								When I&apos;m not coding, you&apos;ll find me climbing walls, hiking trails, or exploring new
								cities – Vancouver, Munich, and Bergen have all captured my heart. I&apos;m also an avid gamer,
								particularly enjoying Minecraft, Zelda, Pokémon, Sea of Thieves, and Europa Universalis 4.
								In my downtime, I play guitar and work on perfecting my setup:<br /><br />

								<span className="block pl-4 border-l-2 border-[#ff8564]">
									{GEAR_ITEMS.map((gear, index) => (
										<span key={index} className="block mb-1">{gear}</span>
									))}
								</span><br />

								<strong>Think Different, Code Better.</strong>
							</p>
						</section>

						<section id="now" className="scroll-mt-24 pt-10">
							<h2 className="text-[1.8rem] sm:text-[2rem] md:text-[2.5rem] font-semibold leading-[140%] mb-2">
								Now
							</h2>
							{NOW_ITEMS.map((item, index) => (
								<div key={index} className="py-1">
									<Link href={item.link} className="flex items-center group">
										<div className="text-base font-semibold inline">{item.title}</div>
										<MoveUpRight className="ml-2 h-4 w-4 text-current transition-transform group-hover:translate-x-1" />
									</Link>
									<p className="text-[#494949] mt-0 mb-10">{item.description}</p>
								</div>
							))}
						</section>

						<section id="features" className="scroll-mt-24 pt-10">
							<h2 className="text-[1.8rem] sm:text-[2rem] md:text-[2.5rem] font-semibold leading-[140%] mb-2">
								Features & Awards
							</h2>
							<div className="py-3">
								{ACHIEVEMENTS.map((achievement, index) => (
									<p key={index} className="text-[#494949] mb-4">{achievement}</p>
								))}
							</div>
						</section>

						<section id="timeline" className="scroll-mt-24 pt-10">
							<h2 className="text-[1.8rem] sm:text-[2rem] md:text-[2.5rem] font-semibold leading-[140%] mb-2">
								Timeline
							</h2>
							{TIMELINE_ITEMS.map((item, index, array) => (
								<div key={index} className="flex">
									<div className="flex flex-col items-center">
										<div className="w-2 h-2 rounded-full bg-[#ff8564] flex-none mt-1.5 mb-0.5"></div>
										<div className={`w-0.5 flex-1 bg-[#f0dbd6] ${index === array.length - 1 ? 'opacity-0' : ''}`}></div>
									</div>
									<div className="ml-5">
										<div className="mb-1 font-semibold">{item.year}</div>
										<p className="mb-6 text-[#494949]">{item.description}</p>
									</div>
								</div>
							))}
						</section>

						<section id="find" className="scroll-mt-24 pt-10 pb-20">
							<h2 className="text-[1.8rem] sm:text-[2rem] md:text-[2.5rem] font-semibold leading-[140%] mb-2">
								Find me online
							</h2>
							<p className="text-[#494949] mt-0">
								You can find me on{" "}
								<Link href="https://github.com/snenenenenenene" target="_blank" className="font-medium hover:opacity-80 transition-opacity">
									GitHub
								</Link>
								,{" "}
								<Link href="https://linkedin.com/in/sennebels" target="_blank" className="font-medium hover:opacity-80 transition-opacity">
									LinkedIn
								</Link>
								, or{" "}
								<Link href="mailto:sennebels@gmail.com" className="font-medium hover:opacity-80 transition-opacity">
									Email
								</Link>
								.
							</p>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}