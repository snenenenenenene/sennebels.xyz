"use client";
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const TIMELINE_ITEMS = [
	{ year: "2024", description: "Joined Specular Consulting" },
	{ year: "2022 - 2024", description: "Flanders Agency of Home Affairs, Lokaal Beslist project" },
	{ year: "2022", description: "Graduated Cum Laude in Computer Science" },
	{ year: "2021", description: "Software Engineer at Inuits" },
	{ year: "2019", description: "Started Computer Science at AP University College" },
];

const NOW_ITEMS = [
	{ title: "Full Stack Developer @ Specular", description: "Developing a sustainability platform with React and TypeScript.", link: "#" },
	{ title: "The Okapi Shop", description: "My e-commerce project for Okapi preservation.", link: "#" },
	{ title: "Creative Technologies", description: "Exploring 3D Dev, VFX, and Creative Coding.", link: "#" },
];

const GEAR_ITEMS = [
	'MacBook Pro 14&quot; M1',
	"iPhone 13",
	"Keycool 60% Keyboard",
	"MSI G27 Display",
];

const ACHIEVEMENTS = [
	"Graduated Cum Laude, AP University College Antwerp (2022)",
	"IELTS 8.0, British Consulate Brussels (2021)",
	"Chinese A1 Certification, Linguapolis Antwerp (2020)",
];

export default function About() {
	const [activeSection, setActiveSection] = useState("about");

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
			rootMargin: "-10% 0px -45% 0px",
		});

		document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	}, []);

	const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
		e.preventDefault();
		const element = document.getElementById(sectionId);
		if (element) {
			const yOffset = -100;
			const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
			window.scrollTo({ top: y, behavior: "smooth" });
		}
	};

	const sidebarLinks = [
		{ id: "about", label: "About Me" },
		{ id: "now", label: "Now" },
		{ id: "features", label: "Achievements" },
		{ id: "timeline", label: "Timeline" },
		{ id: "find", label: "Find Me Online" },
	];

	return (
		<div
			className="min-h-screen bg-[#fdfcf9] font-satoshi text-[#222227] text-base leading-[155%] pt-[160px] sm:pt-[120px] md:pt-[100px] lg:pt-[80px] px-4 sm:px-6 md:px-8"
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
											? "text-[#222227] font-bold"
											: "text-[#6b6b6b] hover:text-[#222227]"
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
								About Me
							</h1>
							<p className="text-[#494949] mt-0 mb-10">
								Hey, I&apos;m Senne! INFP-T, full-stack developer, and a creative tech enthusiast from Antwerp.
								I focus on building interactive and innovative web experiences, blending functionality with fun.
								Currently, I&apos;m diving into creative tech while tackling projects like *The Okapi Store*—my e-commerce platform to support okapi conservation.<br /><br />

								Outside of work, you&apos;ll find me adventuring with my pets, enjoying gaming classics (Minecraft, Zelda), and exploring cities like Munich and Bergen.
								My tech setup keeps me efficient, including:
								<span className="block pl-4 border-l-2 border-[#ff8564]">
									{GEAR_ITEMS.map((gear, index) => (
										<span key={index} className="block mb-1">{gear}</span>
									))}
								</span>
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
									<p className="text-[#494949] mt-0 mb-6">{item.description}</p>
								</div>
							))}
						</section>

						<section id="features" className="scroll-mt-24 pt-10">
							<h2 className="text-[1.8rem] sm:text-[2rem] md:text-[2.5rem] font-semibold leading-[140%] mb-2">
								Achievements
							</h2>
							<ul className="list-disc pl-5 text-[#494949] mb-10">
								{ACHIEVEMENTS.map((achievement, index) => (
									<li key={index} className="mb-2">{achievement}</li>
								))}
							</ul>
						</section>

						<section id="timeline" className="scroll-mt-24 pt-10">
							<h2 className="text-[1.8rem] sm:text-[2rem] md:text-[2.5rem] font-semibold leading-[140%] mb-2">
								Timeline
							</h2>
							{TIMELINE_ITEMS.map((item, index, array) => (
								<div key={index} className="relative py-4 pl-8">
									<div className="absolute left-0 top-[1.15rem] w-4 h-4 rounded-full bg-[#222227]" />
									{index !== array.length - 1 && (
										<div className="absolute left-[7px] top-6 w-[1px] h-[calc(100%-20px)] bg-[#222227]" />
									)}
									<h3 className="text-base font-bold inline">{item.year}</h3>
									<p className="text-[#494949] mt-0">{item.description}</p>
								</div>
							))}
						</section>

						<section id="find" className="scroll-mt-24 pt-10">
							<h2 className="text-[1.8rem] sm:text-[2rem] md:text-[2.5rem] font-semibold leading-[140%] mb-2">
								Find Me Online
							</h2>
							<p className="text-[#494949] mt-0 mb-10">
								Reach out to me on{" "}
								<Link href="https://github.com/username" target="_blank" className="underline text-current">
									GitHub
								</Link>
								,{" "}
								<Link href="https://www.linkedin.com/in/username/" target="_blank" className="underline text-current">
									LinkedIn
								</Link>
								, or{" "}
								<Link href="https://twitter.com/username" target="_blank" className="underline text-current">
									Twitter
								</Link>{" "}
								for a quick chat or collaboration!
							</p>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}
