"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { PATHS } from "@/config";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      toast({
        variant: "destructive",
        description:
          "Oops. There is something wrong with the server, please try again later.",
      });
      setIsLoading(false);
    }, 3000);
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="password"
            placeholder="Password"
            type="passwrd"
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center mb-8">
            <Checkbox id="rememberMe" />
            <label
              htmlFor="rememberMe"
              className="text-sm text-muted-foreground cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember Me
            </label>
          </div>
          <Link
            href={PATHS.FORGOT_PASSWORD}
            className="text-sm text-muted-foreground hover:text-primary hover:underline hover:underline-offset-4"
          >
            Forget Password
          </Link>
        </div>

        <Button disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </div>
    </form>
  );
}
