"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Icons } from "@/components";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/config";
import { useLoadingStore } from "@/models";

export default function LoginAuthBtn() {
  const { setLoading } = useLoadingStore();

  const handleGithubSignIn = async () => {
    setLoading(true);
    signIn("github", { callbackUrl: PATHS.MAIN }).catch(() => {
      setLoading(false);
    });
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    signIn("google", { callbackUrl: PATHS.MAIN }).catch(() => {
      setLoading(false);
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleGoogleSignIn}
        className="w-full"
        variant="outline"
        type="button"
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button
        onClick={handleGithubSignIn}
        className="w-full"
        variant="outline"
        type="button"
      >
        <Icons.gitHub className="mr-2 h-4 w-4" />
        Github
      </Button>
    </div>
  );
}
