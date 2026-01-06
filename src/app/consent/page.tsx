
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore, useUser } from '@/firebase';
import { collection, writeBatch, serverTimestamp, doc } from 'firebase/firestore';
import type * as z from 'zod';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { ConsentForm } from '@/components/consent/consent-form';

// The schema is now inferred from the form component
type ConsentFormSchema = Parameters<React.ComponentProps<typeof ConsentForm>['onSubmit']>[0];


export default function ConsentPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, setPending] = useState(false);
  const { dict } = useLanguage();
  const d = dict.consent;

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [isUserLoading, user, router]);

  const handleConsentSubmit = async (values: ConsentFormSchema) => {
    if (!user) {
      toast({ variant: 'destructive', title: 'You are not logged in.' });
      return;
    }
    setPending(true);

    try {
      const batch = writeBatch(firestore);
      const consentLogCollectionRef = collection(firestore, 'borrowers', user.uid, 'consent_logs');
      const borrowerRef = doc(firestore, 'borrowers', user.uid);

      Object.entries(values).forEach(([key, value]) => {
        if (value === true && key !== 'AGREE_NOTICE') {
          const logRef = doc(consentLogCollectionRef); // Create a new doc ref for each log
          batch.set(logRef, {
            borrowerId: user.uid,
            consentType: key,
            consentGiven: true,
            timestamp: serverTimestamp(),
            channel: 'WEB_APP',
          });
        }
      });
      
      batch.update(borrowerRef, { consentsGiven: true, consents: values, updatedAt: serverTimestamp() });

      await batch.commit();

      toast({ title: 'Consents Saved', description: 'Your preferences have been recorded.' });
      router.push('/application');
    } catch (error: any) {
      console.error("Error saving consents: ", error);
      toast({ variant: 'destructive', title: 'Error', description: error.message || "Could not save your consent preferences." });
    } finally {
      setPending(false);
    }
  };
  
  if (isUserLoading || !user) {
      return (
          <div className="flex h-screen items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>
              {d.title.en}
              <span className="block text-xl font-normal text-muted-foreground mt-1">{d.title.regional}</span>
            </CardTitle>
            <CardDescription>
              {d.description.en}
              <span className="block text-sm text-muted-foreground mt-1">{d.description.regional}</span>
            </CardDescription>
          </CardHeader>
          <ConsentForm onSubmit={handleConsentSubmit} isPending={isPending} />
        </Card>
      </main>
      <Footer />
    </div>
  );
}
