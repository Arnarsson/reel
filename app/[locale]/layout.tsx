// This is the locale-specific layout, moved from the original app/layout.tsx
import { ReactNode } from "react"
import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from "@/components/providers"
import { Header } from "@/components/header"
import { CustomCursor } from "@/components/custom-cursor"
import localFont from "next/font/local"
import "@/styles/globals.css"
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n'; // Import locales from your config

// Font configuration (assuming it was here)
const fontSatoshi = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
})

// Generate static paths for supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

interface LocaleLayoutPropsAsync {
  children: ReactNode;
  // `params` is now **a Promise**
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutPropsAsync) {
  // Unwrap the promise before accessing the value
  const { locale } = await params;

  // Tell next‑intl which locale to use for this request
  setRequestLocale(locale);

  // Fetch the translated messages for this locale
  const { getMessages } = await import('next-intl/server');
  const messages = await getMessages();

  return (
    <ClerkProvider>
      <html lang={locale} suppressHydrationWarning>
        <body className={`${fontSatoshi.variable} font-satoshi antialiased min-h-svh bg-background text-foreground`}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Providers>
              <Header />
              <main className="pt-16">{children}</main>
              <CustomCursor />
            </Providers>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

// TODO: Add Metadata generation based on locale if needed
// export async function generateMetadata({ params: { locale } }: Omit<Props, 'children'>) {
//   const t = await getTranslator(locale, 'LocaleLayout'); 
//   return {
//     title: t('title')
//   };
// } 