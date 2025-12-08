
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestore, useUser } from '@/firebase';
import { collection, writeBatch, serverTimestamp, doc } from 'firebase/firestore';

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

const consentTypes = {
  PAN_VERIFICATION: "I consent to verification of my PAN from issuing authority/NSDL.",
  AADHAAR_AUTH: "I consent to Aadhaar OTP-based offline verification / e-KYC through authorized partners.",
  DIGILOCKER_KYC: "I consent to fetch KYC documents from DigiLocker using my DigiLocker account.",
  BUREAU_PULL: "I consent to pull my credit report from credit bureaus for the purpose of this loan.",
  BANK_VERIFICATION: "I consent to verification of my bank account and registration of e-mandate for EMI debit.",
  DATA_SHARING: "I consent to processing of my data by the NBFC/BANK (RE) and its authorized service providers, in line with RBI digital lending guidelines.",
};

const consentSchema = z.object({
  PAN_VERIFICATION: z.literal(true, { errorMap: () => ({ message: "This consent is required." }) }),
  AADHAAR_AUTH: z.literal(true, { errorMap: () => ({ message: "This consent is required." }) }),
  DIGILOCKER_KYC: z.literal(true, { errorMap: () => ({ message: "This consent is required." }) }),
  BUREAU_PULL: z.literal(true, { errorMap: () => ({ message: "This consent is required." }) }),
  BANK_VERIFICATION: z.literal(true, { errorMap: () => ({ message: "This consent is required." }) }),
  DATA_SHARING: z.literal(true, { errorMap: () => ({ message: "This consent is required." }) }),
  AGREE_NOTICE: z.literal(true, { errorMap: () => ({ message: "You must agree to the notice." }) })
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
      AGREE_NOTICE: false,
    },
  });

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [isUserLoading, user, router]);

  const onSubmit = async (values: z.infer<typeof consentSchema>) => {
    if (!user) {
      toast({ variant: 'destructive', title: 'You are not logged in.' });
      return;
    }
    setLoading(true);

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
      setLoading(false);
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
            <CardTitle>Consent Hub</CardTitle>
            <CardDescription>
              As per RBI guidelines, we need your explicit consent for the following data processing activities.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="space-y-3">
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
                </div>
                 <FormMessage>
                    {Object.values(form.formState.errors).length > 0 && "You must accept all consents to proceed."}
                </FormMessage>
                <ScrollArea className="h-32 w-full rounded-md border p-4 text-xs text-muted-foreground">
                    <h3 className="font-bold mb-2">Detailed Consent & Privacy Notice</h3>
                    <p>
                        By checking the boxes above and clicking &quot;Accept & Continue&quot;, I, the applicant, hereby provide my explicit consent to LoanSwift (the LSP) and its partner FairFinance NBFC (the RE) to access, process, and store my personal and financial information for the purpose of this loan application. This includes sharing data with credit bureaus (e.g., CIBIL), and using third-party services for PAN, Aadhaar, and bank account verification. This consent is voluntary and can be revoked as per the terms outlined in our privacy policy.
                    </p>
                </ScrollArea>
                 <FormField
                    control={form.control}
                    name="AGREE_NOTICE"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>I have read and agree to these consents and the privacy notice.</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading || !form.formState.isValid} className="w-full">
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
