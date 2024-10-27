"use client"
import { GoogleTagManager } from "@next/third-parties/google";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider, useTheme } from "next-themes";

export default function Providers({ children }: {
	children: React.ReactNode;
}) {
	return (
		<AnimatePresence>
			<ThemeProvider>
				<GoogleTagManager gtmId="GTM-TDQ9KLMR" />
				{children}
			</ThemeProvider>
		</AnimatePresence>
	);
}