'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestore, useUser } from '@/firebase';
import { collection, writeBatch, serverTimestamp } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Loader2 } from 'lucide-react';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { doc } from 'firebase/firestore';


const consentTypes = {
  PAN_VERIFICATION: "I consent to verification of my PAN from issuing authority/NSDL.",
  AADHAAR_AUTH: "I consent to Aadhaar OTP-based offline verification / e-KYC through authorized partners.",
  DIGILOCKER_KYC: "I consent to fetch KYC documents from DigiLocker using my DigiLocker account.",
  BUREAU_PULL: "I consent to pull my credit report from credit bureaus for the purpose of this loan.",
  BANK_VERIFICATION: "I consent to verification of my bank account and registration of e-mandate for EMI debit.",
  DATA_SHARING: "I consent to processing of my data by the NBFC/BANK (RE) and its authorized service providers, in line with RBI digital lending guidelines.",
};

const consentSchema = z.object({
  PAN_VERIFICATION: z.literal(true),
  AADHAAR_AUTH: z.literal(true),
  DIGILOCKER_KYC: z.literal(true),
  BUREAU_PULL: z.literal(true),
  BANK_VERIFICATION: z.literal(true),
  DATA_SHARING: z.literal(true),
}).catchall(z.boolean());


export default function ConsentPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof consentSchema>>({
    resolver: zodResolver(consentSchema),
    defaultValues: {
      PAN_VERIFICATION: false,
      AADHAAR_AUTH: false,
      DIGILOCKER_KYC: false,
      BUREAU_PULL: false,
      BANK_VERIFICATION: false,
      DATA_SHARING: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof consentSchema>) => {
    if (!user) {
      toast({ variant: 'destructive', title: 'You are not logged in.' });
      return;
    }
    setLoading(true);

    try {
      const batch = writeBatch(firestore);
      const consentLogCollection = collection(firestore, 'borrowers', user.uid, 'consent_logs');

      Object.entries(values).forEach(([key, value]) => {
        if (value === true) {
          const logRef = doc(consentLogCollection);
          batch.set(logRef, {
            borrowerId: user.uid,
            consentType: key,
            consentGiven: true,
            timestamp: serverTimestamp(),
            channel: 'WEB_APP',
          });
        }
      });
      
      const borrowerRef = doc(firestore, 'borrowers', user.uid);
      batch.update(borrowerRef, { consents: values, updatedAt: serverTimestamp() });

      await batch.commit();

      toast({ title: 'Consents Saved', description: 'Your preferences have been recorded.' });
      router.push('/application');
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setLoading(false);
    }
  };
  
  if (isUserLoading) {
      return (
          <div className="flex h-screen items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      )
  }

  if (!user) {
    router.push('/login');
    return null;
  }


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Consent Hub</CardTitle>
            <CardDescription>
              As per RBI guidelines, we need your explicit consent for the following.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                {Object.entries(consentTypes).map(([key, label]) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name={key as keyof typeof consentTypes}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>{label}</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
                 <FormMessage>
                    {Object.values(form.formState.errors).length > 0 && "You must accept all consents to proceed."}
                </FormMessage>
                <ScrollArea className="h-32 w-full rounded-md border p-4 text-xs text-muted-foreground">
                    <h3 className="font-bold mb-2">Detailed Consent & Privacy Notice</h3>
                    <p>
                        By checking the boxes above and clicking &quot;Accept & Continue&quot;, I, the applicant, hereby provide my explicit consent to LoanSwift (the LSP) and its partner NBFC/Bank (the RE) to... [Full legal text would go here, covering data collection, processing, storage, sharing with credit bureaus, third-party service providers for verification, purposes of use, user rights to revoke consent, data retention policy, etc., in compliance with all relevant regulations.] This consent is voluntary...
                    </p>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Accept & Continue
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
