

"use client";

import type { LoanApplication } from '@/lib/types';
import { createContext, useContext, useState, useMemo, type Dispatch, type SetStateAction, type ReactNode, useEffect } from 'react';
import { StepIndicator } from './step-indicator';
import { BankDetailsStep, CreditCheckStep, DocumentVerificationStep, DisbursementStep, EMandateStep, KfsStep, KycStep, EligibilityResultStep, PersonalDetailsStep, AgreementStep, SanctionLetterStep } from './steps';
import { Card, CardContent } from '../ui/card';
import { useUser, useFirestore } from '@/firebase';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { addDays, subYears } from 'date-fns';
import { generateReadableId } from '@/lib/utils';

type LoanApplicationContextType = {
  application: LoanApplication;
  setApplication: Dispatch<SetStateAction<LoanApplication>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  nextStep: () => void;
  prevStep: () => void;
};

const LoanApplicationContext = createContext<LoanApplicationContextType | null>(null);

const initialApplicationState: LoanApplication = {
  loanApplicationId: "15", 
  personalDetails: undefined,
  requested_amount: 0,
  kyc: {
    panStatus: 'PENDING',
    aadhaarAuthStatus: 'PENDING',
    digilockerStatus: 'PENDING',
    documentVerificationStatus: 'PENDING',
  },
  bureauReport: null,
  application_status: "DRAFT",
  approved_tenure_options: null,
};


export function LoanApplicationProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const firestore = useFirestore();
  const [application, setApplication] = useState<LoanApplication>(initialApplicationState);
  const [step, setStep] = useState(0); // Start at personal details (index 0)

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const contextValue = useMemo(() => ({
    application,
    setApplication,
    step,
    setStep,
    nextStep,
    prevStep
  }), [application, step]);

  return (
    <LoanApplicationContext.Provider value={contextValue}>
      {children}
    </LoanApplicationContext.Provider>
  );
}

export function useLoanApplication() {
  const context = useContext(LoanApplicationContext);
  if (!context) {
    throw new Error('useLoanApplication must be used within a LoanApplicationProvider');
  }
  return context;
}

const STEPS = [
  { title: "Personal Details", component: PersonalDetailsStep },
  { title: "KYC Verification", component: KycStep },
  { title: "Document Verification", component: DocumentVerificationStep },
  { title: "Eligibility Result", component: EligibilityResultStep },
  { title: "Key Facts", component: KfsStep },
  { title: "Loan Sanction Letter", component: SanctionLetterStep },
  { title: "Bank Details", component: BankDetailsStep },
  { title: "e-Mandate", component: EMandateStep },
  { title: "e-Sign Agreement", component: AgreementStep },
  { title: "Disbursement", component: DisbursementStep },
];

export function LoanJourney() {
  const { step, nextStep, prevStep, application } = useLoanApplication();
  
  const handleStepCompletion = () => {
    if(step === 2 && application.application_status === 'REJECTED') { // Step 2 is now Doc Verification
      // If rejected, we move to the next step (Eligibility) which will show the rejection message.
      nextStep();
      return; 
    }
    nextStep();
  }
  
  const CurrentStepComponent = STEPS[step].component;

  return (
    <div className="max-w-4xl mx-auto">
      <StepIndicator current={step} total={STEPS.length} titles={STEPS.map(s => s.title)} />
      <Card className="mt-8">
        <CardContent className="p-4 sm:p-8">
          <CurrentStepComponent onCompleted={handleStepCompletion} />
        </CardContent>
      </Card>
    </div>
  );
}
