// import { clerkMiddleware } from "@clerk/nextjs/server"
import { authMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware(
// );
export default authMiddleware({
  publicRoutes: ["/api/webhook", "/api/uploadthing"]
}
);


export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};