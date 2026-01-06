
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirebaseApp, useFirestore } from '@/firebase';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const mobileSchema = z.object({
  mobileNumber: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit mobile number.'),
});

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  
  const form = useForm<z.infer<typeof mobileSchema>>({
    resolver: zodResolver(mobileSchema),
    defaultValues: {
      mobileNumber: '',
    },
  });

  // phone auth submission
  const onMobileSubmit = (values: z.infer<typeof mobileSchema>) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // In a real app, you'd integrate with Firebase Phone Auth here.
      // For this prototype, we'll just navigate to the OTP page with the number.
      toast({
        title: 'OTP Sent',
        description: `An OTP has been sent to +91 ${values.mobileNumber}.`,
      });
      router.push(`/otp-verify?mobile=${values.mobileNumber}`);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onBack={() => router.back()}/>
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Verify Your Mobile</CardTitle>
            <CardDescription>We'll send a one-time password (OTP) to your mobile number to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onMobileSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-10">
                          +91
                        </span>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            placeholder="Enter 10-digit mobile number"
                            className="rounded-l-none"
                            maxLength={10}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading} className="w-full">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Get OTP
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
