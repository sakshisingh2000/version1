
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
import { useLanguage } from '@/components/language-provider';

const consentKeys = [
  "PAN_VERIFICATION",
  "AADHAAR_AUTH",
  "DIGILOCKER_KYC",
  "BUREAU_PULL",
  "BANK_VERIFICATION",
  "DATA_SHARING",
] as const;

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
  const { dict } = useLanguage();

  const form = useForm<z.infer<typeof consentSchema>>({
    resolver: zodResolver(consentSchema),
    defaultValues: Object.fromEntries(consentKeys.map(key => [key, false]).concat([['AGREE_NOTICE', false]]))
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
            <CardTitle>{dict.consent.title}</CardTitle>
            <CardDescription>{dict.consent.description}</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {consentKeys.map((key) => (
                    <FormField
                      key={key}
                      control={form.control}
                      name={key}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>{dict.consent[key.toLowerCase() as keyof typeof dict.consent]}</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                 <FormMessage>
                    {Object.values(form.formState.errors).length > 0 && dict.consent.all_consents_required}
                </FormMessage>
                <ScrollArea className="h-32 w-full rounded-md border p-4 text-xs text-muted-foreground">
                    <p>{dict.consent.agree_notice_text}</p>
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
                          <FormLabel>{dict.consent.agree_notice_title}</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading || !form.formState.isValid} className="w-full">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {dict.consent.accept_button} / {dict.consent.accept_button_native}
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
