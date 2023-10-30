"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useLoadingStore } from "@/models";
import React from "react";

export default function RegisterForm() {
  const { setLoading } = useLoadingStore();
  const { toast } = useToast();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast({
        variant: "destructive",
        description:
          "Oops. There is something wrong with the server, please try again later.",
      });
      setLoading(false);
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
          />
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Password
          </Label>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect="off"
          />
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect="off"
          />
        </div>

        <Button hasLoadingFeedback>Sign Up</Button>
      </div>
    </form>
  );
}
