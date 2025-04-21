import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from './i18n/routing';

// Define the locales you support - these should match next-intl.config.ts
export const locales = ['en', 'da'];
export const defaultLocale = 'en'; // Align with next-intl.config.ts

export default getRequestConfig(async ({requestLocale}) => {
  // Wait for the locale to be resolved in Next.js 15
  const locale = await requestLocale;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound(); // Use notFound() for invalid locales

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
}); 