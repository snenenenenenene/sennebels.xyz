"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
	{
		title: "Lokaal Beslist",
		image: "/images/work/lokaalbeslist.png",
		description: "Full Stack Development of a citizen participation platform, built with Ember.js and Linked Open Data, focusing on government transparency and civic engagement.",
		redirect: "https://lokaalbeslist.lblod.info/"
	},
	{
		title: "Waddist",
		image: "/images/work/waddist.webp",
		description: "Mobile application development focusing on community engagement and social interaction, built with React Native and Django.",
		redirect: "https://apps.apple.com/be/app/waddist/id1548427323"
	},
	{
		title: "Skinhouse",
		image: "/images/work/skinhouse.png",
		description: "Skincare portfolio developed with Next.js, featuring a custom CMS for product management.",
		redirect: "https://skinhouse.vercel.app/"
	},
	{
		title: "Aroy",
		image: "/images/work/aroy.png",
		description: "Thai Restaurant website, built with Next.js and Tailwind CSS.",
		redirect: "https://aroy.vercel.app/"
	},
	{
		title: "DND Character Creator",
		image: "/images/work/dnd.png",
		description: "Interactive D&D character creation tool, built using React and TypeScript.",
		redirect: "https://dnd-character-tool.vercel.app/"
	},
	{
		title: "Open Summer of Code",
		image: "/images/work/osoc.png",
		description: "Website development & maintenance for the Belgian open-source initiative, featuring project showcases and participant information, built with Next.js.",
		redirect: "https://osoc.be/"
	}
];

export default function Work() {
	return (
		<>
			<header className="section">
				<div className="container w-container px-6">
					<div className="mt-[113px] mb-14">
						<h1 className="text-[2rem] font-semibold leading-[44px] font-inter mb-4" style={{
							fontWeight: 600
						}}>
							I build interactive experiences that make an impact.
						</h1>
						<p className="w-[50%] mb-4 text-[#494949]">
							Here&#x27;s a portfolio of my development work.<br />
						</p>
						<p className="w-[80%] text-[#6b6b6b]">
							As a creative developer who specializes in interactive experiences,
							I build web applications that are not only functional but also engaging.
							From government platforms to creative side projects, each piece is crafted
							with attention to both user experience and code quality.
						</p>
					</div>

					<div className="w-layout-grid design-work-grid grid grid-cols-1 md:grid-cols-2 gap-6">
						{PROJECTS.map((project, index) => (
							<div key={index} className="card---design-work relative">
								<Link
									href={project.redirect}
									target="_blank"
									className="block"
								>
									<Image
										src={project.image}
										alt={project.title}
										width={1368}
										height={800}
										className="designprojectthumbnail w-full aspect-video object-cover rounded-xl mb-4"
									/>
									<h2 className="project-title text-lg font-semibold mb-2">{project.title}</h2>
									<div className="caption text-[#494949] text-sm">{project.description}</div>
								</Link>
							</div>
						))}
					</div>
				</div>
			</header>

			<div className="section">
				<div className="container">
					<div className="work-contact-cta-section flex flex-col items-center pt-20">
						<Image
							src="/images/squigle.svg"
							alt="Squigle"
							width={100}
							height={100}
							className="mb-8"
						/>
						<h4 className="cs-title text-[3.9rem] leading-[120%] font-inter font-semibold mb-4">
							Got a project?
						</h4>
						<p className="light text-center mb-20 text-[#494949]">
							Discover how we could work together :)<br />
						</p>
						<Link
							href="/contact"
							className="button-circle w-button bg-black text-white rounded-full w-48 h-48 flex items-center justify-center text-lg font-medium hover:scale-110 transition-transform duration-300"
						>
							Get in touch
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}