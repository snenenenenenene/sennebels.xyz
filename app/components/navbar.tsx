"use client"
import { File, FolderOpen, Home, Mail, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const links = [
	{ href: "/", label: "Home", icon: <Home /> },
	{ href: "/about", label: "About", icon: <User /> },
	{ href: "/work", label: "Work", icon: <FolderOpen /> },
	{ href: "https://read.cv/snenenenene", label: "Resume", icon: <File /> },
	{ href: "mailto:sennebels@gmail.com", label: "Mail", icon: <Mail /> },


];

export default function Navbar() {
	const pathname = usePathname()

	return (<aside className="fixed rounded-full bottom-6 left-1/2 flex gap-[7px] h-fit p-1 w-fit bg-white dark:bg-dark-secondary -translate-x-1/2">
		{links.map(({ href, label, icon }) => (
			<>
				{label === "Resume" && <div className="h-8 my-2 w-[2px] mx-1 rounded-xl bg-gray-200" />}
				<Link
					key={href}
					href={href}
					className={` ${pathname === href ? 'bg-light-quaternary dark:bg-dark-accent' : ''} flex items-center justify-center h-12 w-12 aspect-square rounded-full bg-gray-200 dark:bg-slate-500 dark:text-white`}
				>
					{icon}
				</Link>
			</>
		)
		)}
	</aside>)
}