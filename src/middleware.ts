import { NextRequest, NextResponse } from "next/server";
import React from "react";

export default function middleware(request: NextRequest) {
  // const cookie = request.cookies.get("auth")?.valueOf();
  // console.log("cookie", cookie);

  // return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
