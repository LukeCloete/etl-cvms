import { NextRequest, NextResponse } from "next/server";
import auth from "./auth";

export async function middleware(request: NextRequest) {
  const user = await auth.getUser();
  if (!user) {
    request.cookies.delete("session");
    const response = NextResponse.redirect(new URL("/log-in", request.url));
    return response;
  }
  console.log("middleware ran");
  return NextResponse.next();
}

export const config = {
  //defines which paths the middleware should run on
  matcher: ["/"],
};
