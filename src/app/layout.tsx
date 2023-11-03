import "../styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { META_DATA_TITLE } from "@/config";
import { Toaster } from "@/components/ui/toaster";
import LoadingMask from "@/components/loading-mask";
import {
  SessionProvider,
  TanstackQueryProvider,
  ThemeProviders,
} from "@/components";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: META_DATA_TITLE,
  description: "Your One-Stop Destination for Premium Pet Supplies",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <SessionProvider session={session}>
            <TanstackQueryProvider>
              <ThemeProviders>
                <Toaster />
                <LoadingMask />
                {children}
              </ThemeProviders>
            </TanstackQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
