"use client";

import type { LoanApplication } from '@/lib/types';
import { createContext, useContext, useState, useMemo, type Dispatch, type SetStateAction, type ReactNode } from 'react';
import { StepIndicator } from './step-indicator';
import { BankDetailsStep, CreditCheckStep, DigiLockerStep, DisbursementStep, EMandateStep, KfsStep, KycStep, LoanOfferStep, PersonalDetailsStep, AgreementStep } from './steps';
import { Card, CardContent } from '../ui/card';

type LoanApplicationContextType = {
  application: LoanApplication;
  setApplication: Dispatch<SetStateAction<LoanApplication>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  nextStep: () => void;
  prevStep: () => void;
};

const LoanApplicationContext = createContext<LoanApplicationContextType | null>(null);

export function LoanApplicationProvider({ children }: { children: ReactNode }) {
  const [application, setApplication] = useState<LoanApplication>({});
  const [step, setStep] = useState(0);

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
  { title: "DigiLocker KYC", component: DigiLockerStep },
  { title: "Credit Check", component: CreditCheckStep },
  { title: "Loan Offer", component: LoanOfferStep },
  { title: "Key Facts", component: KfsStep },
  { title: "Bank Details", component: BankDetailsStep },
  { title: "e-Mandate", component: EMandateStep },
  { title: "e-Sign Agreement", component: AgreementStep },
  { title: "Disbursement", component: DisbursementStep },
];

export function LoanJourney() {
  const { step, nextStep } = useLoanApplication();
  const CurrentStepComponent = STEPS[step].component;

  return (
    <div className="max-w-4xl mx-auto">
      <StepIndicator current={step} total={STEPS.length} titles={STEPS.map(s => s.title)} />
      <Card className="mt-8">
        <CardContent className="p-4 sm:p-8">
          <CurrentStepComponent onCompleted={nextStep} />
        </CardContent>
      </Card>
    </div>
  );
}
