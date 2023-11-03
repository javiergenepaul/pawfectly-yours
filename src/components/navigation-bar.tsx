"use client";

import Image from "next/image";
import { ModeToggle } from "./ui/mode-toggle";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { PATHS } from "@/config";

export default function NavigationBar() {
  const { data: session } = useSession();
  return (
    <header className="w-full">
      <nav>
        <ul className="flex justify-between">
          <li>
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </li>
          <li>
            {session ? (
              <Button onClick={() => signOut({ callbackUrl: PATHS.LOGIN })}>
                Signout
              </Button>
            ) : (
              <Button onClick={() => signIn()}>signIn</Button>
            )}

            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
