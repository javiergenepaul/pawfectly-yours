import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/config";
import Link from "next/link";
import React from "react";
import RegisterForm from "./components/register-form";

export default function Register() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>

      <div className={"grid gap-6"}>
        <div className="flex gap-2">
          <Button className="w-full" variant="outline" type="button">
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button className="w-full" variant="outline" type="button">
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Facebook
          </Button>
        </div>

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

        <RegisterForm />
      </div>

      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href={PATHS.TERMS}
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href={PATHS.PRIVACY_POLICY}
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <p className="text-sm text-muted-foreground text-center pt-8">
        Already have an account?{" "}
        <Link
          href={PATHS.LOGIN}
          className="font-semibold  hover:text-primary hover:underline hover:underline-offset-4"
        >
          Login Now
        </Link>
      </p>
    </>
  );
}
