import Image from "next/image";
import Link from "next/link";

const projects = [
	{ title: "Lokaal Beslist", redirect: "https://lokaalbeslist.lblod.info/", thumbnail: "/images/work/lokaalbeslist.png", year: 2023, description: "A platform for local governments to make decisions together with their citizens" },
	{
		title: "Waddist", redirect:
			"https://apps.apple.com/be/app/waddist/id1548427323", thumbnail: "/images/work/waddist.webp", year: 2023, description: "A platform for local governments to make decisions together with their citizens"
	}
]

const Project = (project: any) => {
	return (
		<Link href={project.redirect} className="flex hover:scale-105 duration-200 transition-all ease-in-out relative w-full rounded-xl overflow-hidden bg-light-accent h-full md:h-80">
			<Image className="w-full object-cover left-0 top-0 h-full absolute" src={project.thumbnail} alt={project.title} width={1000} height={1000} />
			<span className="absolute text-white flex justify-between p-4 h-32 items-end bottom-0 left-0 w-full bg-gradient-to-t pointer-events-none from-[#00000090] to-transparent">
				<h1>{project.title}</h1>
				<p>{project.year}</p>
			</span>
		</Link>
	);
}

export default function Work() {
	return (
		<main className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center h-full p-6">
			{projects.map((project) => (
				<Project key={project.title} {...project
				} />
			))}
		</main>
	);
}