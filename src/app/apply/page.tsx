
'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LoanJourney, LoanApplicationProvider, useLoanApplication } from "@/components/loan-journey/loan-application-provider";

function ApplyPageContent() {
  const { prevStep, step } = useLoanApplication();
  
  // The header should only have a working back button if we are not on the first step.
  const showBackButton = step > 0;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header onBack={showBackButton ? prevStep : undefined} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <LoanJourney />
      </main>
      <Footer />
    </div>
  );
}


export default function ApplyPage() {
  return (
    <LoanApplicationProvider>
      <ApplyPageContent />
    </LoanApplicationProvider>
  );
}
