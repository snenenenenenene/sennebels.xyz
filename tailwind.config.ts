import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        nunito: ["Nunito", "serif"],
      },
      colors: {
        light: {
          primary: "#ccd5ae",
          secondary: "#e9edc9",
          tertiary: "#fefae0",
          quaternary: "#faedcd",
          accent: "#d4a373"
        },
          dark: {
            primary: "#606c38",
            secondary: "#283618",
            tertiary: "#fefae0",
            quaternary: "#dda15e",
            accent: "#bc6c25"
          },
    },
    },
},
  plugins: [],
};
export default config;
