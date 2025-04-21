import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

// Match all pathnames except for
// - /api routes
// - /_next (Next.js internals)
// - /_vercel (Vercel internals)
// - All files in the public folder
export const config = {
  // Matcher entries are linked with a logical "or"
  matcher: [
    // Match all pathnames except for
    // - /api routes
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - All files in the public folder
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
}; 