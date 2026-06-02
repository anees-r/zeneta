import { withAuth } from "next-auth/middleware";

export function middleware(req) {
  return withAuth()(req);
}

export const config = {
  matcher: ["/studio/:path*"],
};