import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    // You can customize further here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // If no token, not authenticated
        return !!token;
      },
    },
    pages: {
      signIn: "/api/auth/signin", // Default NextAuth sign-in page
    },
  }
);
