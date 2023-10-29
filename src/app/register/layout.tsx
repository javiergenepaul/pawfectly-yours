import { AuthContainer } from "@/components";
import { META_DATA_TITLE } from "@/config";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `${META_DATA_TITLE} - Register`,
  description: "Your One-Stop Destination for Premium Pet Supplies",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContainer
      imageSrc={"/examples/authentication-light.png"}
      imageAlt={"Authentication"}
      darkImageSrc={"/examples/authentication-light.png"}
      darkImageAlt={"Authentication"}
    >
      {children}
    </AuthContainer>
  );
}
