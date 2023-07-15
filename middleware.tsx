import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register") ||
    req.nextUrl.pathname.startsWith("/verify")
  ) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  const authMiddleware = await withAuth({
    pages: {
      signIn: `/login`,
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}

// tidak bisa digunakan karena terjadi bug jika menggunakan matcher "/login"
// export default withAuth(
//   async function middleware(req) {
//     const token = await getToken({ req });
//     console.log(token);
//     const isAuthenticated = !!token;

//     if (
//       req.nextUrl.pathname.startsWith("/login") ||
//       req.nextUrl.pathname.startsWith("/register") ||
//       req.nextUrl.pathname.startsWith("/verify")
//     ) {
//       if (isAuthenticated) {
//         return NextResponse.redirect(new URL("/", req.url));
//       }
//     }
//   },
//   {
//     callbacks: {
//       authorized: (params) => {
//         let { token } = params;
//         return !!token;
//       },
//     },
//     pages: {
//       signIn: "/login",
//     },
//   }
// );

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
