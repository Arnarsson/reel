import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale, localePrefix } from '../next-intl.config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix
}); 