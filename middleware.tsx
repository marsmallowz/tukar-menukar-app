import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// export default async function middleware(
//   req: NextRequest,
//   event: NextFetchEvent
// ) {
//   const token = await getToken({ req });
//   const isAuthenticated = !!token;

//   if (
//     req.nextUrl.pathname.startsWith("/login")
//     // ||
//     // req.nextUrl.pathname.startsWith("/register") ||
//     // req.nextUrl.pathname.startsWith("/verify")
//   ) {
//     console.log(req.url);
//     if (isAuthenticated) {
//       return NextResponse.redirect(new URL("/dashboard", req.url));
//     }
//     //  else {
//     //   if (req.nextUrl.pathname.startsWith("/login")) {
//     //     return NextResponse.redirect(new URL("/login", req.url));
//     //   } else if (req.nextUrl.pathname.startsWith("/register")) {
//     //     return NextResponse.redirect(new URL("/register", req.url));
//     //   } else if (req.nextUrl.pathname.startsWith("/verify")) {
//     //     return NextResponse.redirect(new URL("/verify", req.url));
//     //   }
//     // }
//   }
//   const authMiddleware = await withAuth({
//     pages: {
//       signIn: `/login`,
//     },
//   });

//   // @ts-expect-error
//   return authMiddleware(req, event);
// }

export default withAuth(async function middleware(req) {}, {
  callbacks: {
    authorized: (params) => {
      let { token, req } = params;
      // console.log(req.nextUrl.pathname.startsWith("/register"));
      // console.log(!!token);

      if (!!token) {
        if (
          req.nextUrl.pathname.startsWith("/register") ||
          req.nextUrl.pathname.startsWith("/login") ||
          req.nextUrl.pathname.startsWith("/verify")
        ) {
          return false;
        }
      } else {
        return true;
      }
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/login",
    "/register",
    "/verify",
    "/settings",
    "/skills",
    "/dashboard",
  ],
};
