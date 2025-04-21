// next-intl.config.ts
import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'da'] as const;
export const defaultLocale = 'en';

// Optional: Define pathnames for localized routes if needed
// export const pathnames = {
//   '/': '/',
//   '/about': {
//     en: '/about',
//     da: '/om-os'
//   }
// } satisfies Pathnames<typeof locales>;

export const localePrefix = 'as-needed'; // or 'always'

export default {
  locales,
  defaultLocale,
  // pathnames, // Uncomment if you have defined pathnames
  localePrefix
};

// Note: This file replaces the need for defining locales/defaultLocale
// directly within middleware or i18n.ts for routing purposes.
// The getRequestConfig in i18n.ts is still needed for loading messages. 