
'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirebaseApp, useFirestore } from '@/firebase';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';
import { useLanguage } from '@/components/language-provider';

const otpSchema = z.object({
  otp: z.string().min(6, 'Please enter the 6-digit OTP.').max(6),
});

function OTPVerifyComponent() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mobileNumber = searchParams.get('mobile');
  const { dict, language } = useLanguage();
  const d = dict.otp_verify;

  const firebaseApp = useFirebaseApp();
  const firestore = useFirestore();
  const auth = getAuth(firebaseApp);

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onOtpSubmit = async (values: z.infer<typeof otpSchema>) => {
    if (!mobileNumber) {
      toast({ variant: 'destructive', title: 'Error', description: 'Mobile number not found.' });
      return;
    }

    setLoading(true);
    // OTP verification
    if (values.otp === '123456') {
      try {
        await auth.signOut();
        const userCredential = await signInAnonymously(auth);
        const user = userCredential.user;

        if (!user) {
            throw new Error("Could not create an anonymous user session.");
        }
        
        const borrowerRef = doc(firestore, 'borrowers', user.uid);
        const borrowerData = {
          id: user.uid,
          firebaseAuthUid: user.uid,
          mobileNumber: `+91${mobileNumber}`,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        await setDoc(borrowerRef, borrowerData);
        
        const auditLogData = {
            entityType: 'BORROWER',
            entityId: user.uid,
            action: 'MOBILE_OTP_VERIFIED',
            actorType: 'BORROWER',
            timestamp: serverTimestamp(),
            borrowerId: user.uid,
        };
        addDocumentNonBlocking(collection(firestore, 'borrowers', user.uid, 'audit_logs'), auditLogData);

        toast({
          title: d.success_title.en,
          description: d.success_description.en,
        });
        
        router.push('/consent');

      } catch (error: any) {
        console.error("OTP/Firestore error:", error);
        toast({
          variant: 'destructive',
          title: d.failure_title.en,
          description: error.message || d.failure_description.en,
        });
        setLoading(false);
      }
    } else {
      setTimeout(() => {
        toast({
          variant: 'destructive',
          title: d.invalid_otp_title.en,
          description: d.invalid_otp_description.en,
        });
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onBack={() => router.back()} />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>
                {d.title.en}
                {language !== 'en' && <span className="block text-xl font-normal text-muted-foreground mt-1">{d.title.regional}</span>}
            </CardTitle>
            <CardDescription>
              {d.description.en.replace('<mobile>', mobileNumber ? `******${mobileNumber.slice(-4)}` : 'your mobile')}
              {language !== 'en' && <span className="block text-sm text-muted-foreground mt-1">{d.description.regional.replace('<mobile>', mobileNumber ? `******${mobileNumber.slice(-4)}` : 'आपके मोबाइल पर')}</span>}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onOtpSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {d.otp_label.en}
                        {language !== 'en' && <span className="block text-sm font-normal text-muted-foreground mt-1">{d.otp_label.regional}</span>}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={language === 'en' ? d.otp_placeholder.en : `${d.otp_placeholder.en} / ${d.otp_placeholder.regional}`} maxLength={6} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading} className="w-full">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {d.button_text.en}
                  {language !== 'en' && ` / ${d.button_text.regional}`}
                </Button>
                 <div className="text-center text-sm">
                    <Button variant="link" type="button" onClick={() => toast({ title: d.resent_toast.en })}>
                        {d.resend_button.en}
                        {language !== 'en' && ` / ${d.resend_button.regional}`}
                    </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default function OTPVerifyPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <OTPVerifyComponent />
        </Suspense>
    )
}
