"use client";

import Image from "next/image";
import React from "react";
import { ModeToggle } from "../ui/mode-toggle";

interface AuthContainer {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
}

export default function AuthContainer(props: AuthContainer) {
  const { imageSrc, imageAlt, children } = props;
  return (
    <section>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute right-4 top-4 md:right-8 md:top-8">
          <ModeToggle />
        </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <Image
            className="absolute inset-0 object-cover transition-opacity opacity-0 duration-[2s]"
            src={imageSrc}
            fill
            sizes="100vh"
            alt={imageAlt}
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          />
          <div className="absolute inset-0 bg-zinc-900/20" />

          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Pawfectly Yours
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
