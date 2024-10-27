import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
	return (
		<footer className="footer border-t border-gray-200 font-satoshi">
			<div className="container mx-auto px-6">
				<div className="footer-wrapper py-16">
					<Link href="/" className="footer-brand inline-block">
						{/* <Image
							src="/images/okapi.png"
							width={56}
							height={56}
							alt="Logo"
							className="w-14"
						/> */}
						<h2 className="text-xl font-bold text-gray-900 md:text-3xl md:font-extrabold md:text-gray-800">
							Senne Bels
						</h2>
					</Link>

					<div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
						<div className="footer-block">
							<div className="footer-title-small text-xs font-medium tracking-wider text-gray-500 mb-4">
								NAVIGATION
							</div>
							<div className="flex flex-col space-y-3">
								<Link href="/about" className="footer-link text-gray-600 hover:text-black">
									About
								</Link>
								<Link href="/work" className="footer-link text-gray-600 hover:text-black">
									Work
								</Link>
								<Link href="/" className="footer-link text-gray-600 hover:text-black">
									Home
								</Link>
							</div>
						</div>

						<div className="footer-block">
							<div className="footer-title-small text-xs font-medium tracking-wider text-gray-500 mb-4">
								EXPERTISE
							</div>
							<div className="flex flex-col space-y-3">
								<span className="footer-link text-gray-600">
									Full Stack Development
								</span>
								<span className="footer-link text-gray-600">
									Creative Technologies
								</span>
								<span className="footer-link text-gray-600">
									Sustainable Solutions
								</span>
							</div>
						</div>

						<div className="footer-block">
							<div className="footer-title-small text-xs font-medium tracking-wider text-gray-500 mb-4">
								CURRENT WORK
							</div>
							<div className="flex flex-col space-y-3">
								<span className="footer-link text-gray-600">
									Specular Consulting
								</span>
								<span className="footer-link text-gray-600">
									The Okapi Shop
								</span>
								<Link href="/work" className="footer-link text-gray-600 hover:text-black">
									See all work <strong>→</strong>
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className="divider border-t border-gray-200"></div>

				<div className="footer-row flex flex-col md:flex-row justify-between items-center py-8">
					<div className="footer-2-left text-gray-600 text-sm mb-4 md:mb-0">
						© 2024 Senne Bels | Built with{' '}
						<a
							href="https://nextjs.org"
							target="_blank"
							rel="noopener noreferrer"
							className="text-link hover:text-black"
						>
							Next.js
						</a>
					</div>

					<div className="footer-2-right">
						<ul className="social-icons-list flex space-x-4 items-center">
							<li className="list-item">
								<a
									href="https://github.com/snenenenenenene"
									target="_blank"
									rel="noopener noreferrer"
									className="footersocialicons w-8 h-8 flex items-center justify-center hover:opacity-75 text-gray-600 hover:text-black"
								>
									<Github size={20} />
								</a>
							</li>
							<li className="list-item">
								<a
									href="https://linkedin.com/in/sennebels"
									target="_blank"
									rel="noopener noreferrer"
									className="footersocialicons w-8 h-8 flex items-center justify-center hover:opacity-75 text-gray-600 hover:text-black"
								>
									<Linkedin size={20} />
								</a>
							</li>
							<li className="list-item">
								<a
									href="mailto:sennebels@gmail.com"
									target="_blank"
									rel="noopener noreferrer"
									className="footersocialicons w-8 h-8 flex items-center justify-center hover:opacity-75 text-gray-600 hover:text-black"
								>
									<Mail size={20} />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;