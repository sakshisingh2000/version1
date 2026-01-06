'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShieldCheck, Globe, ArrowLeft } from 'lucide-react';
import { useUser } from '@/firebase';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/language-provider';
import type { Language } from '@/lib/dictionaries';
import { usePathname, useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];

const multilingualPages = ['/consent', '/apply', '/kfs']; // Add other paths as needed

export function Header() {
  const { user } = useUser();
  const auth = getAuth();
  const [isClient, setIsClient] = useState(false);
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showLanguageToggle = multilingualPages.some(p => pathname.startsWith(p));
  
  const showBackButton = ![ '/', '/home', '/application'].includes(pathname);


  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as Language);
  };

  const LanguageSwitcher = () => (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-auto border-0 gap-2 focus:ring-0">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.nativeName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex items-center">
          {showBackButton && (
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
              </Button>
          )}
          <Link href="/home" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              LoanSwift
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Can add search here if needed */}
          </div>
          <nav className="hidden md:flex items-center gap-2">
            {showLanguageToggle && <LanguageSwitcher />}
            {user ? (
                <Button variant="ghost" onClick={() => auth.signOut()}>Sign Out</Button>
            ) : (
                <Button asChild>
                    <Link href="/login">Sign In</Link>
                </Button>
            )}
            <Button variant="ghost" asChild>
              <Link href="/admin">
                <ShieldCheck className="mr-2 h-4 w-4" />
                RE Admin
              </Link>
            </Button>
          </nav>
        </div>

        <div className="flex items-center md:hidden">
          {isClient && (
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5"/>
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <Link href="/home" className="mr-6 flex items-center space-x-2 mb-6">
                        <Logo className="h-6 w-6 text-primary" />
                        <span className="font-bold font-headline">LoanSwift</span>
                    </Link>
                    <nav className="flex flex-col gap-4">
                        {user ? (
                            <Button variant="ghost" onClick={() => auth.signOut()}>Sign Out</Button>
                        ) : (
                            <Link href="/login" className="flex items-center gap-2 text-sm font-medium">Sign In</Link>
                        )}
                        <Link href="/admin" className="flex items-center gap-2 text-sm font-medium">
                            <ShieldCheck className="h-5 w-5" />
                            RE Admin Console
                        </Link>
                        {showLanguageToggle && <div className="pt-4"><LanguageSwitcher /></div>}
                    </nav>
                </SheetContent>
            </Sheet>
          )}
        </div>
        <div className="flex items-center md:hidden ml-auto">
             <Link href="/home" className="flex items-center space-x-2">
                <Logo className="h-6 w-6 text-primary" />
            </Link>
        </div>

      </div>
    </header>
  );
}
