import { getLoggedInUser } from "@/lib/appwrite/server";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const user = await getLoggedInUser();

  if (!user && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
