// app/contact/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

export default function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		company: "",
		email: "",
		services: [] as string[],
		budget: "",
		message: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setIsSuccess(true);
				setFormData({
					name: "",
					company: "",
					email: "",
					services: [],
					budget: "",
					message: "",
				});
			} else {
				throw new Error('Failed to send message');
			}
		} catch (err) {
			setError('Something went wrong. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleServiceChange = (service: string) => {
		setFormData(prev => ({
			...prev,
			services: prev.services.includes(service)
				? prev.services.filter(s => s !== service)
				: [...prev.services, service]
		}));
	};

	return (
		<div className="min-h-screen font-satoshi text-[#222227] p-[60px] sm:p-[80px] md:p-[100px] lg:p-[120px] px-4 sm:px-6 md:px-8">
			<div className="container max-w-[1200px] bg-white rounded-[32px] py-[40px] px-[60px] mx-auto shadow-[3px_3px_40px_#00000014]">
				<div className="grid grid-cols-1 gap-12">
					{/* Left Column */}
					<div>
						<h1 className="text-[2.5rem] font-semibold leading-[140%] mb-4">
							Let&apos;s get in touch!
						</h1>
						<p className="text-[#494949] mb-6">
							For business inquiries, <a href="mailto:sennebels@gmail.com" className="text-black font-medium hover:opacity-80">email me</a>
							{" "}or complete the form.
							<br /><br />
							For questions about my services:<br />
							- Check out my <Link href="/about" className="text-black font-medium hover:opacity-80">About page</Link> for more info<br />
							- View my <Link href="/work" className="text-black font-medium hover:opacity-80">previous work</Link><br />
						</p>
					</div>

					{/* Right Column - Form */}
					<div className="">
						<form onSubmit={handleSubmit} className="space-y-6 w-1/2">
							{/* Name Field */}
							<div>
								<label htmlFor="name" className="block text-sm font-medium mb-2">
									My name is
								</label>
								<input
									type="text"
									id="name"
									required
									className="block h-[50px] px-0 bg-white text-[#333] w-full border-b border-gray-200 focus:border-gray-900 outline-none transition-colors"
									placeholder="Your name"
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								/>
							</div>

							{/* Company Field */}
							<div>
								<label htmlFor="company" className="block text-sm font-medium mb-2">
									I work at
								</label>
								<input
									type="text"
									id="company"
									className="block h-[50px] px-0 bg-white text-[#333] w-full border-b border-gray-200 focus:border-gray-900 outline-none transition-colors"
									placeholder="Company"
									value={formData.company}
									onChange={(e) => setFormData({ ...formData, company: e.target.value })}
								/>
							</div>

							{/* Email Field */}
							<div>
								<label htmlFor="email" className="block text-sm font-medium mb-2">
									My email is
								</label>
								<input
									type="email"
									id="email"
									required
									className="block h-[50px] px-0 bg-white text-[#333] w-full border-b border-gray-200 focus:border-gray-900 outline-none transition-colors"
									placeholder="Your email"
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								/>
							</div>

							{/* Services Checkboxes */}
							<div>
								<label className="block text-sm font-medium mb-4">
									I&apos;m looking for:
								</label>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{[
										"Web Development",
										"UI/UX Design",
										"Consultation",
										"Job Opportunities"
									].map((service) => (
										<label key={service} className="flex mb-[5px] space-x-3 bg-white border border-[.5px_solid_#cacaca] px-[10px] pt-[22px] pb-[24px] rounded-[20px]">
											<input
												type="checkbox"
												checked={formData.services.includes(service)}
												onChange={() => handleServiceChange(service)}
												className="form-checkbox h-5 w-5 text-black rounded border-gray-300"
											/>
											<span className="text-sm">{service}</span>
										</label>
									))}
								</div>
							</div>

							{/* Message Field */}
							<div>
								<label htmlFor="message" className="block text-sm font-medium mb-2">
									More details about the project (brief summary, deadline etc)
								</label>
								<textarea
									id="message"
									required
									rows={4}
									className="w-full text-[14px] bg-white text-[#333] px-[12px] py-[8px] border border-[1px_solid_#ecebea] rounded-[8px] outline-none transition-colors"
									placeholder="Your message"
									value={formData.message}
									onChange={(e) => setFormData({ ...formData, message: e.target.value })}
								/>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								disabled={isSubmitting}
								className="bg-black block text-white rounded-[10px] py-[12px] px-[20px] hover:bg-gray-800 transition-colors disabled:opacity-50"
								style={{
									fontWeight: 500
								}}
							>
								{isSubmitting ? "Sending..." : "Get in touch"}
							</button>

							{/* Success/Error Messages */}
							{isSuccess && (
								<div className="text-green-600 text-start" >
									Thank you! Your message has been sent.
								</div>
							)}
							{error && (
								<div className="text-red-600 text-start">
									{error}
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}