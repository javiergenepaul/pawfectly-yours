"use client";
import { useLoadingStore } from "@/models";
import React from "react";

export default function LoadingMask() {
  const { loading } = useLoadingStore();

  if (!loading) {
    return <></>;
  } else {
    return (
      <div className="fixed top-0 w-screen h-screen bg-background opacity-5 cursor-progress z-50" />
    );
  }
}
