import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  if (req.nextUrl.pathname === "/") {
    const token = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    // You can only pass absolute url to redirect now, so use req.url.clone()
    // to get the absolute url, and set the relative pathname to "/home"
    const url = req.nextUrl.clone();
    url.pathname = "/home";
    if (!token) return NextResponse.redirect(url);
    // If user is authenticated, continue.
  }
}
