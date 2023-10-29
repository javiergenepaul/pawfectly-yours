import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import ThemeProviders from "@/components/theme-provider";
import { META_DATA_TITLE } from "@/config";
import { Toaster } from "@/components/ui/toaster";

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
      <body className={inter.className}>
        <ThemeProviders>{children}</ThemeProviders>
        <Toaster />
      </body>
    </html>
  );
}
