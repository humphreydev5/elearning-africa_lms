import { authMiddleware } from "@clerk/nextjs/server";

/**
 * Middleware configuration for authentication using Clerk.
 * Defines public routes that do not require authentication.
 */
export default authMiddleware({
  publicRoutes: ["/api/webhook", "/api/uploadthing"]
});

/**
 * Configuration for defining the routes and paths to be matched by the middleware.
 * Specifies paths to be included or excluded from the middleware's processing.
 */
export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
