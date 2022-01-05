import React from "react";
import '../styles/globals.css'
import Home from "./home/index.tsx"
import 'tailwindcss/tailwind.css'
import Head from 'next/head'

function MyApp() {
  return (
    <main>
      <Home/>
    </main>
  );
}

export default MyApp;
