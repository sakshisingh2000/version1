
'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Loader2, CheckCircle, Circle, FileText, Landmark, ShieldCheck, User, Banknote } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useAppState } from '@/components/app-state-provider';
import { useEffect } from 'react';

const applicationSteps = [
  { id: 'profile', title: 'Profile & Loan Details', icon: User, status: 'COMPLETED' },
  { id: 'pan_aadhaar', title: 'PAN & Aadhaar KYC', icon: FileText, status: 'PENDING' },
  { id: 'digilocker', title: 'DigiLocker KYC', icon: ShieldCheck, status: 'PENDING' },
  { id: 'credit_check', title: 'Credit Check', icon: FileText, status: 'PENDING' },
  { id: 'bank_mandate', title: 'Bank Account & Mandate', icon: Landmark, status: 'PENDING' },
  { id: 'offer_kfs', title: 'Offer & KFS', icon: Banknote, status: 'PENDING' },
  { id: 'agreement_disbursement', title: 'Agreement & Disbursement', icon: CheckCircle, status: 'PENDING' },
];


export default function ApplicationOverviewPage() {
  const { user, isUserLoading } = useUser();
  const { borrower } = useAppState();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [isUserLoading, user, router]);

  if (isUserLoading || !user) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  const getStatusIcon = (status: string) => {
    if (status === 'COMPLETED') {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    return <Circle className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-headline">Loan Application</h1>
            <p className="text-muted-foreground">Complete the following steps to get your loan.</p>
          </div>

          <div className="space-y-4">
            {applicationSteps.map((step, index) => (
              <Card key={step.id} className={`transition-all ${step.status !== 'PENDING' ? 'bg-card' : 'bg-muted/50'}`}>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
                  <div className="flex-shrink-0">{<step.icon className="h-6 w-6 text-primary" />}</div>
                  <div className="flex-grow">
                    <CardTitle className="text-lg">{index + 1}. {step.title}</CardTitle>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusIcon(step.status)}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
            
          <div className="mt-8 text-center">
            <Button size="lg" onClick={() => router.push('/apply')}>Start Application</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
