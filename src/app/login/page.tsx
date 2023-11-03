"use client";

import { PATHS } from "@/config";
import { cn } from "@/lib";
import LoginForm from "./components/login-form";
import Link from "next/link";
import LoginAuthBtn from "./components/login-auth-btn";

interface LoginProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Login({ className, ...props }: LoginProps) {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Log in to you Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Wellcome back! Select method to log in
        </p>
      </div>

      <div className={cn("grid gap-6", className)} {...props}>
        <LoginAuthBtn />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs ">
            <span className="bg-background px-2 text-muted-foreground">
              or continue with email
            </span>
          </div>
        </div>

        <LoginForm />
      </div>

      <p className="text-sm text-muted-foreground text-center">
        Don't have an account?{" "}
        <Link
          href={PATHS.REGISTER}
          className="font-semibold  hover:text-primary hover:underline hover:underline-offset-4"
        >
          Sign Up Now
        </Link>
      </p>
    </>
  );
}
