"use client";

import React from "react";
import { ThemeProvider } from "next-themes";

export default function ThemeProviders(props: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {props.children}
    </ThemeProvider>
  );
}
