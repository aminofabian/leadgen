import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  adminRoutes
} from "@/routes";

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  // Add debug logging
  console.log("Debug middleware:", {
    pathname: nextUrl.pathname,
    isLoggedIn,
    userRole: req.auth?.user?.role,
    userEmail: req.auth?.user?.email,
    isApiAuthRoute: nextUrl.pathname.startsWith(apiAuthPrefix),
    isPublicRoute: publicRoutes.includes(nextUrl.pathname),
    isAuthRoute: authRoutes.includes(nextUrl.pathname),
    isAdminRoute: adminRoutes.some(route => nextUrl.pathname.startsWith(route))
  });

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  );

  // Check if it's the Instagram API endpoint
  const isInstagramApi = nextUrl.pathname.startsWith('/api/instagram');
  if (isInstagramApi) {
    console.log("Allowing Instagram API route");
    return;
  }

  // Handle API routes
  if (isApiAuthRoute) {
    console.log("Allowing API auth route");
    return;
  }

  // Handle public routes
  if (isPublicRoute) {
    console.log("Allowing public route");
    return;
  }

  // Handle auth routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log("Redirecting logged-in user from auth route");
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin));
    }
    console.log("Allowing auth route");
    return;
  }

  // Handle admin routes
  if (isAdminRoute) {
    if (!isLoggedIn) {
      console.log("Redirecting non-logged-in user from admin route");
      return Response.redirect(new URL("/auth/login", nextUrl.origin));
    }

    const userRole = req.auth?.user?.role;
    if (userRole !== "ADMIN") {
      console.log("Redirecting non-admin user from admin route");
      return Response.redirect(new URL("/", nextUrl.origin));
    }

    console.log("Allowing admin route");
    return;
  }

  // Handle protected routes
  if (!isLoggedIn) {
    console.log("Redirecting to login");
    return Response.redirect(new URL("/auth/login", nextUrl.origin));
  }

  console.log("Allowing protected route");
  return;
});

// Update the config to ensure it catches all admin routes
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/reddit-analytics/:path*"  // Add specific admin route patterns
  ]
};