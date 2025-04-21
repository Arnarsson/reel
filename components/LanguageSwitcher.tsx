'use client';

import { useLocale } from 'next-intl';
// Use standard next/link, router will handle locale
import Link from 'next/link'; 
import { useRouter, usePathname } from 'next/navigation'; // Use standard next/navigation hooks
import { locales } from '@/i18n';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname(); // This will NOT include the locale prefix now
  const currentLocale = useLocale();

  const switchLocale = (nextLocale: string) => {
    // Manually construct the new path WITH the locale prefix
    // Note: This simple approach assumes the pathname doesn't contain the locale already
    // A more robust solution might be needed for complex path structures
    let newPath = `/${nextLocale}${pathname}`;
    
    // Special case for root path
    if (pathname === '/') {
        newPath = `/${nextLocale}`;
    }
    
    router.replace(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem 
            key={locale}
            onClick={() => switchLocale(locale)}
            disabled={currentLocale === locale}
          >
            {locale.toUpperCase()} {currentLocale === locale ? '(Current)' : ''}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 