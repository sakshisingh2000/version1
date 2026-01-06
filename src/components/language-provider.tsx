
'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { Language, Dictionary } from '@/lib/dictionaries';
import { dictionaries } from '@/lib/dictionaries';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  
  const dict = useMemo(() => dictionaries[language], [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    dict,
  }), [language, dict]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
