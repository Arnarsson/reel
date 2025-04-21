import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define routes that should be public (accessible without logging in)
const isPublicRoute = createRouteMatcher([
  '/', 
  '/sign-in(.*)', 
  '/sign-up(.*)',
  // Add any other public routes here, like API endpoints or marketing pages
]);

// Define routes that should be protected (require login)
// By default, if it's not public, it's protected.
// You could create an isProtectedRoute matcher if needed for more complex rules.

export default clerkMiddleware((auth, req) => {
  // Protect routes that are not public
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internal paths (e.g., /_next/)
    '/((?!_next).*)',
    // Match all routes, api routes included
    '/',
    '/(api|trpc)(.*)',
  ],
}; 