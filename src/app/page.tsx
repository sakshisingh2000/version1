'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/language-provider';
import type { Language } from '@/lib/dictionaries';

const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];

export default function LanguageSelectionPage() {
  const router = useRouter();
  const { setLanguage } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<Language>('en');

  const handleContinue = () => {
    setLanguage(selectedLang);
    router.push('/home');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="text-center mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
          Choose Your Preferred Language
        </h1>
        <p className="text-muted-foreground mt-2">You can change this later</p>
      </div>

      <div className="w-full max-w-lg">
        <div className="grid grid-cols-1 gap-4">
          {languages.map((lang) => (
            <Card
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={cn(
                'cursor-pointer transition-all',
                selectedLang === lang.code
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-border'
              )}
            >
              <CardContent className="p-4 text-center">
                <p className="font-semibold">{lang.nativeName}</p>
                <p className="text-sm text-muted-foreground">{lang.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button onClick={handleContinue} size="lg" className="w-full mt-8">
          Continue
        </Button>
      </div>
    </div>
  );
}
