import { NextResponse } from "next/server";
 
 
export const config = {
  matcher: [
    "/profile/:path*",
    "/previousPractices/:path*",
    "/feedback",
    "/payment/:path*",
    "/peer/:path*",
    "/settings",
    "/startPractice/:path*",
    "/subscriptionDetails",
    "/videoCall/:path*",
   
  ],
};
export default async function middleware(req) {
  let token = req.cookies.get("token");
  if (!token) {
    return NextResponse.redirect(`http://localhost:3000/login`);
  } else {
      return NextResponse.next();
    } 
  
}
