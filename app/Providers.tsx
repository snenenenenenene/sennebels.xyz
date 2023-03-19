"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import Context from "./utils/AppLoader";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Context>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </Context>
  );
}
