export default function About() {
	return (
		<main className="flex text-lg flex-col font-nunito items-center px-8 pb-40 h-full overflow-y-scroll">
			<section className="flex flex-col md:flex-row md:gap-x-6 mt-16 w-full">
				<div className="h-60 w-60 bg-dark-accent rounded-full" />
				<span className="mt-8">
					<h1 className="text-4xl" style={{ fontWeight: "900" }}>snenenenene</h1>
					<p className="text-xl text-dark-accent" style={{ fontWeight: "700" }}>Senne Bels</p>
					<p className="mt-4 text-xl">Creative Developer</p>
				</span>
			</section>
			<span className="mt-8 w-full">
				I&apos;m&nbsp;
				<b className="text-light-desktop font-bold">Senne Bels</b>, a&nbsp;
				{new Date().getFullYear() -
					2000 -
					(new Date().getMonth() < 10 ? 1 : 0)}
				-year-old IT-graduate - and human.
				<br />
				<br />
				After having graduated in 2022, I started working as a frontend
				developer at the Agency of Home Affairs of Flanders, Belgium. However,
				my hunger for knowledge and my passion for technology led me to
				combine my job with another degree in Multimedia and Creative
				Technologies.
				<br />
				<br />
				It&apos;s always been my main ambition & dream to move abroad! -- and
				I&apos;m hoping to find a job that will allow me to do so.
				<br />
				<br />
				I&apos;m specialised as a web developer, but I majored in Big Data
				&amp; Artificial Intelligence. This, as well as the myriad business
				&amp; management courses I took, has blessed me with a very broad view
				on the world of IT.
				<br />
				<br />
				Outside of IT, I&apos;m a passionate gamer, and I love to create.
				Whether it&apos;s 3D, 2D, or even music, I&apos;m always looking for
				new ways to express myself. I&apos;m also a huge fan of the outdoors,
				and I am a huge zoology and history nerd.
				<br />
				<br />
				<b className="font-bold">Fun fact</b>: I love Okapi&apos;s and visit
				them in my local zoo whenever I can. This is what inspired my logo.
			</span>
		</main>
	);
}