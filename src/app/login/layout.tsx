import { Card } from "@/components/ui/card";
import { META_DATA_TITLE } from "@/constant";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `${META_DATA_TITLE} - Login`,
  description: "Your One-Stop Destination for Premium Pet Supplies",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
