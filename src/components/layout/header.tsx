
'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Language } from '@/lib/dictionaries';
import { useLanguage } from '../language-provider';

const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'EN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];

const nonBilingualRootPages = ['/', '/login', '/otp-verify'];

export function Header() {
  const [isClient, setIsClient] = useState(false);
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showInlineSelector = isClient && nonBilingualRootPages.includes(pathname);
  
  const showBackButton = !['/', '/application'].includes(pathname);

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as Language);
  };

  const InlineLanguageSelector = () => (
    <div className="flex items-center gap-2 text-sm">
      {languages.map((lang, index) => (
        <React.Fragment key={lang.code}>
          <button 
            onClick={() => handleLanguageChange(lang.code)} 
            className={cn(
              "hover:text-primary transition-colors",
              language === lang.code ? "text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            {lang.nativeName}
          </button>
          {index < languages.length - 1 && <span className="text-muted-foreground/50">|</span>}
        </React.Fragment>
      ))}
    </div>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-start">
           {showBackButton && (
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
              </Button>
          )}
        </div>

        <div className="flex flex-1 items-center justify-end">
           {showInlineSelector && <InlineLanguageSelector />}
        </div>
      </div>
    </header>
  );
}
