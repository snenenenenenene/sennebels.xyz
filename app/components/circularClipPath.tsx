import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

const CircularClipPath: React.FC = () => {
	const [gradientValue, setGradientValue] = useState(0);
	const [isAnimationDone, setIsAnimationDone] = useState(false);

	useEffect(() => {
		gsap.to({}, {
			duration: 1,
			onUpdate: () => {
				setGradientValue((prevValue) => {
					const newValue = prevValue + .3;
					if (newValue <= 100) {
						return newValue;
					} else {
						setIsAnimationDone(true);
						return 100; // Ensure it stops at 100
					}
				});
			},
			repeat: 33, // Reduced to match the 3 increment steps
			ease: "power4.inOut"
		});
	}, []);

	return (
		<div
			style={{
				maskImage: `radial-gradient(circle, transparent ${gradientValue}%, black ${gradientValue}%)`,
				WebkitMaskImage: `radial-gradient(circle, transparent ${gradientValue}%, black ${gradientValue}%)`,
				pointerEvents: isAnimationDone ? 'none' : 'auto'
			}}
			className="fixed top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-[10%] scale-[500%] z-40 bg-dark-accent transition-all duration-500 ease-in-out"
		/>
	);
};

export default CircularClipPath;
