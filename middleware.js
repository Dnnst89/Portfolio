import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    const {
      nextUrl: { pathname },
      cookies,
    } = request;
    const cookie = cookies.get("userData");
    const userData = JSON.parse(cookie.value);
    if (userData && userData !== "null" && userData.user?.id) {
      // check if the user is logued
      if (
        pathname === "/register/signemail" ||
        pathname === "/register/singname"
      ) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.log(error);
  }
}

export const config = {
  matcher: ["/cart", "/checkout", "/register/singname", "/register/signemail"],
};
