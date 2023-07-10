import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // console.log("withauth jalan");
    // console.log(req.nextauth);
    // if (
    //   (req.nextUrl.pathname === "/register" ||
    //     req.nextUrl.pathname === "/login") &&
    //   req.nextauth.token !== null
    // ) {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }
    // if (req.nextUrl.pathname === "/settings" && req.nextauth.token === null) {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/settings", "/skills", "/dashboard"],
};
