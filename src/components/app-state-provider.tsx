'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import type { AppState, Borrower, LoanApplication } from '@/lib/types';
import { useUser, useFirestore } from '@/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const AppStateContext = createContext<AppState | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [borrower, setBorrower] = useState<Borrower | null>(null);
  const [loanApplication, setLoanApplication] = useState<LoanApplication | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (user?.uid) {
      const borrowerRef = doc(firestore, 'borrowers', user.uid);
      const unsubscribe = onSnapshot(borrowerRef, 
        (docSnap) => {
          if (docSnap.exists()) {
            setBorrower(docSnap.data() as Borrower);
          } else {
            setBorrower(null);
          }
        },
        (err) => {
          console.error("Error fetching borrower data:", err);
          setError(err);
        }
      );
      return () => unsubscribe();
    } else {
      setBorrower(null);
    }
  }, [user, firestore]);

  const value = useMemo(() => ({
    user,
    borrower,
    loanApplication,
    loading: isUserLoading,
    error,
  }), [user, borrower, loanApplication, isUserLoading, error]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
