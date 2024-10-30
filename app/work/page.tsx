"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
	{
		title: "The Okapi Store",
		image: "/images/work/theokapistore.png",
		description: "Homebrew E-commerce platform development for a sustainable fashion brand based on Okapi's, built with NextJS, Printful API, and Stripe.",
		redirect: "https://the-okapi-webstore.vercel.app/",
		tags: ["Next.js", "Stripe", "E-commerce"]
	},
	{
		title: "VSCode Calico Theme",
		image: "/images/work/calico.png",
		description: "Custom VSCode theme development, based on the Calico colour palette.",
		redirect: "https://marketplace.visualstudio.com/items?itemName=snenenenenenene.calico",
		tags: ["VSCode", "Theme", "2023"]
	},
	{
		title: "Waddist",
		image: "/images/work/waddist.png",
		description: "Mobile application development focusing on community engagement and social interaction, built with React Native and Django.",
		redirect: "https://apps.apple.com/be/app/waddist/id1548427323",
		tags: ["React Native", "Django", "Mobile"]
	},
	{
		title: "Lokaal Beslist",
		image: "/images/work/lokaalbeslist.png",
		description: "Full Stack Development of a citizen participation platform, built with Ember.js and Linked Open Data, focusing on government transparency and civic engagement.",
		redirect: "https://lokaalbeslist.lblod.info/",
		tags: ["Ember.js", "Linked Data", "2024"]
	},
	{
		title: "Skinhouse",
		image: "/images/work/skinhouse.png",
		description: "Skincare portfolio developed with Next.js, featuring a custom CMS for product management.",
		redirect: "https://skinhouse.vercel.app/",
		tags: ["Next.js", "Portfolio"]
	},
	{
		title: "Aroy",
		image: "/images/work/aroy.png",
		description: "Thai Restaurant website, built with Next.js and Tailwind CSS.",
		redirect: "https://aroy.vercel.app/",
		tags: ["Next.js", "Tailwind", "Restaurant"]
	},
	{
		title: "DND Character Creator",
		image: "/images/work/dnd.png",
		description: "Interactive D&D character creation tool, built using React and TypeScript.",
		redirect: "https://dnd-character-tool.vercel.app/",
		tags: ["React", "Side Project", "D&D"]
	},
	{
		title: "Open Summer of Code",
		image: "/images/work/osoc.png",
		description: "Website development & maintenance for the Belgian open-source initiative, featuring project showcases and participant information, built with Next.js.",
		redirect: "https://osoc.be/",
		tags: ["Next.js", "Open Source", "Belgium"]
	}
];

const ProjectCard = ({ project, index }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.5,
				delay: index * 0.1
			}}
			className="h-full"
		>
			<Link
				href={project.redirect}
				target="_blank"
				className="block h-full"
			>
				<motion.div
					className="h-full rounded-xl transition-all duration-300 relative group hover:-translate-y-1"
				>
					<div className="overflow-hidden rounded-xl mb-8">
						<Image
							src={project.image}
							alt={project.title}
							width={1368}
							height={800}
							className="w-full aspect-video object-cover"
						/>
					</div>
					<div className="px-2">
						<div className="flex gap-2 flex-wrap mb-4">
							{project.tags.map((tag, i) => (
								<span key={i} className="bg-[#6b6b6b20] px-3 py-1 rounded-full text-sm text-[#6b6b6b]">
									{tag}
								</span>
							))}
						</div>
						<div className="flex items-center gap-2 mb-3">
							<div className="relative">
								<h2 className="text-lg transition-all duration-300 group-hover:font-bold">
									{project.title}
								</h2>
								<div className="absolute bottom-0 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300 origin-left" />
							</div>
							<ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
						</div>
						<p className="text-[#494949] text-sm mb-4">{project.description}</p>
					</div>
				</motion.div>
			</Link>
		</motion.div>
	);
};



export default function Work() {
	return (
		<>
			<header className="section">
				<div className="container w-container px-6 xl:max-w-[80%]">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="mt-[113px] mb-14"
					>
						<motion.h1
							initial={{ x: -20 }}
							animate={{ x: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="text-[2rem] font-semibold leading-[44px] font-inter mb-4"
							style={{ fontWeight: 600 }}
						>
							I build interactive experiences that make an impact.
						</motion.h1>
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="w-[50%] mb-4 text-[#494949]"
						>
							Here&#x27;s a portfolio of my development work.<br />
						</motion.p>
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.6 }}
							className="w-[80%] text-[#6b6b6b]"
						>
							As a creative developer who specializes in interactive experiences,
							I build web applications that are not only functional but also engaging.
							From government platforms to creative side projects, each piece is crafted
							with attention to both user experience and code quality.
						</motion.p>
					</motion.div>

					<div className="w-layout-grid design-work-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
						{PROJECTS.map((project, index) => (
							<ProjectCard key={index} project={project} index={index} />
						))}
					</div>
				</div>
			</header>

			<div className="section">
				<div className="container">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="work-contact-cta-section flex flex-col items-center pt-20"
					>
						<motion.div
							animate={{
								rotate: [0, 360],
							}}
							transition={{
								duration: 20,
								repeat: Infinity,
								ease: "linear"
							}}
						>
							<Image
								src="/images/squigle.svg"
								alt="Squigle"
								width={100}
								height={100}
								className="mb-8"
							/>
						</motion.div>
						<motion.h4
							initial={{ scale: 0.9 }}
							whileInView={{ scale: 1 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
							className="cs-title text-[3.9rem] leading-[120%] font-inter font-semibold mb-4"
						>
							Got a project?
						</motion.h4>
						<motion.p
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							viewport={{ once: true }}
							className="light text-center mb-20 text-[#494949]"
						>
							Discover how we could work together :)<br />
						</motion.p>
						<motion.div
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							transition={{ duration: 0.2 }}
						>
							<Link
								href="/contact"
								className="button-circle w-button bg-black text-white rounded-full w-48 h-48 flex items-center justify-center text-lg font-medium transition-transform duration-300"
							>
								Get in touch
							</Link>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</>
	);
}