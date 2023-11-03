"use client";
import { useLoadingStore } from "@/models";
import React from "react";

export default function LoadingMask({ isLoading }: { isLoading?: boolean }) {
  const { loading } = useLoadingStore();

  if (loading || isLoading) {
    return (
      <div className="fixed top-0 w-screen h-screen bg-background opacity-5 cursor-progress z-50" />
    );
  } else {
    return <></>;
  }
}
