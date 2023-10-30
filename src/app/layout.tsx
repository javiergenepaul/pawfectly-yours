import "../styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProviders from "@/components/theme-provider";
import { META_DATA_TITLE } from "@/config";
import { Toaster } from "@/components/ui/toaster";
import LoadingMask from "@/components/loading-mask";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: META_DATA_TITLE,
  description: "Your One-Stop Destination for Premium Pet Supplies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <ThemeProviders>
          <Toaster />
          <LoadingMask />
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
