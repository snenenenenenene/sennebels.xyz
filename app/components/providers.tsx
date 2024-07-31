"use client"
import { AnimatePresence } from "framer-motion";
import { ThemeProvider, useTheme } from "next-themes";

export default function Providers({ children }: {
	children: React.ReactNode;
}) {
	return (
		<AnimatePresence>
			<ThemeProvider>
				{children}
			</ThemeProvider>
		</AnimatePresence>
	);
}