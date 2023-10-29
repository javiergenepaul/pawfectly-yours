"use client";

import Image from "next/image";
import { ModeToggle } from "./ui/mode-toggle";

export default function NavigationBar() {
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
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
