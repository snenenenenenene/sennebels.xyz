"use client"
import { motion } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
	[
		{ title: "Lokaal Beslist", projectType: "Website", redirect: "https://lokaalbeslist.lblod.info/", thumbnail: "/images/work/lokaalbeslist.png", year: 2023, description: "A platform for local governments to make decisions together with their citizens" },
		{
			title: "Waddist", projectType: "Mobile App", redirect: "https://apps.apple.com/be/app/waddist/id1548427323", thumbnail: "/images/work/waddist.webp", year: 2023, description: "A platform for local governments to make decisions together with their citizens"
		}
	],
	[
		{ title: "Aroy", projectType: "Website", redirect: "https://aroy.vercel.app/", thumbnail: "/images/work/aroy.png", year: 2024, description: "A platform for local governments to make decisions together with their citizens" }
	],
	[
		{ title: "Musicians", projectType: "Prototype", redirect: "https://musicians-blond.vercel.app/", thumbnail: "/images/work/musicians.png", year: 2022, description: "A platform for local governments to make decisions together with their citizens" }
	]
]

const Project = (project: any) => {
	return (
		<Link target={project.redirect.startsWith("http") ? "_blank" : "_self"}
			href={project.redirect} className="group flex duration-200 transition-all ease-in-out relative w-full rounded-xl overflow-hidden bg-light-accent md:h-80 aspect-video hover:!brightness-100">
			<Image className="w-full object-cover left-0 top-0 h-full absolute" src={project.thumbnail} alt={project.title} width={1000} height={1000} />
			<section className="absolute text-md text-white flex p-4 h-32 bottom-0 justify-end left-0 w-full flex-col bg-gradient-to-t pointer-events-none from-[#00000090] via-[#00000060] to-transparent">
				<motion.span className="flex gap-2 opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
					<div className="bg-dark-secondary px-2 py-1 rounded-full text-xs">{project.projectType}</div>
					<button className="bg-white text-black rounded-full h-full aspect-square flex justify-center items-center"> <MoveUpRight size={14} /> </button>
				</motion.span>
				<span className="flex justify-between w-full">
					<h1>{project.title}</h1>
					<p>{project.year}</p>
				</span>
			</section>
		</Link>
	);
}

export default function Work() {
	return (
		<motion.main
			initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeInOut", staggerChildren: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 overflow-y-scroll lg:grid-cols-3 gap-6 h-full md:pb-0 pb-40 min-h-screen p-6 auto-rows-min group">
			{projects.map((gridNumber: any, i: number) => (
				<div key={i} className="grid grid-cols-1 gap-6">
					{gridNumber.map((project: any) => (
						<div key={project.title} className="group/item">
							<Project {...project} />
						</div>
					))}
				</div>
			))}
		</motion.main>
	);
}
