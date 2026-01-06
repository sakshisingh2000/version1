
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

const nonBilingualRootPages = ['/'];

interface HeaderProps {
  onBack?: () => void;
}

export function Header({ onBack }: HeaderProps) {
  const [isClient, setIsClient] = useState(false);
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showInlineSelector = isClient && nonBilingualRootPages.includes(pathname);
  
  // The presence of the onBack function determines if the back button should be shown.
  // This gives parent components control over its visibility.
  const showBackButton = typeof onBack === 'function';

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as Language);
  };
  
  const handleBackClick = () => {
    if (showBackButton) {
      onBack();
    } else {
      router.back();
    }
  }

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
           {showBackButton ? (
              <Button variant="ghost" size="icon" onClick={handleBackClick} className="mr-2">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
              </Button>
          ) : (
            // This div is a placeholder to keep the layout consistent when the back button is not shown.
            <div style={{ width: '40px' }} />
          )}
        </div>

        <div className="flex flex-1 items-center justify-end">
           {showInlineSelector && <InlineLanguageSelector />}
        </div>
      </div>
    </header>
  );
}
