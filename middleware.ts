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

// The middleware automatically protects routes that are not matched by isPublicRoute
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internal paths (e.g., /_next/)
    '/((?!_next).*)',
    // Match all routes, api routes included
    '/',
    '/(api|trpc)(.*)',
  ],
}; 