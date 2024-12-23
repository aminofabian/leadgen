import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  adminRoutes
} from "@/routes";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
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

  // Handle API routes
  if (isApiAuthRoute) {
    console.log("Allowing API auth route");
    return;
  }

  // Handle auth routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log("Redirecting logged-in user from auth route");
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    console.log("Allowing auth route");
    return;
  }

  // Handle non-logged in users
  if (!isLoggedIn && !isPublicRoute) {
    console.log("Redirecting non-logged in user to login");
    const callbackUrl = encodeURIComponent(nextUrl.pathname);
    return Response.redirect(new URL(`/auth/login?callbackUrl=${callbackUrl}`, nextUrl));
  }

  // Handle admin routes
  if (isAdminRoute) {
    const isAdmin = req.auth?.user?.role === "ADMIN";
    console.log("Checking admin access:", {
      isAdmin,
      userRole: req.auth?.user?.role,
      userEmail: req.auth?.user?.email
    });
    
    if (!isAdmin) {
      console.log("Unauthorized admin access attempt");
      return Response.redirect(new URL("/unauthorized", nextUrl));
    }
  }

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