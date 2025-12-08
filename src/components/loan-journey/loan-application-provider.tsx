
"use client";

import type { LoanApplication } from '@/lib/types';
import { createContext, useContext, useState, useMemo, type Dispatch, type SetStateAction, type ReactNode } from 'react';
import { StepIndicator } from './step-indicator';
import { BankDetailsStep, CreditCheckStep, DigiLockerStep, DisbursementStep, EMandateStep, KfsStep, KycStep, EligibilityResultStep, PersonalDetailsStep, AgreementStep } from './steps';
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

const initialApplicationState: LoanApplication = {
  loanApplicationId: "mock-app-id-12345",
  personalDetails: {
    fullName: "Rohan Sharma",
    pan: "ABCDE1234F",
    birthDate: new Date("1990-05-15"),
    loanAmount: 150000,
    employmentType: "Salaried",
    monthlyIncome: 75000,
    addressLine1: "123, Tech Park",
    city: "Bengaluru",
    pincode: "560100",
    consent: true,
  },
  kyc: {
    panStatus: 'VERIFIED',
    aadhaarAuthStatus: 'OTP_SUCCESS',
    aadhaarMaskedNumber: 'XXXX-XXXX-8901',
    digilockerStatus: 'SUCCESS',
    digilockerDocuments: [
      { doc_type: 'AADHAAR_XML', doc_name: 'Aadhaar XML / e-KYC', verification_status: 'VERIFIED' },
      { doc_type: 'PAN_CARD', doc_name: 'PAN Card (e-PAN)', verification_status: 'VERIFIED' },
    ],
    addressVerified: true,
    kycCompleted: true,
  },
  bureauReport: undefined,
  application_status: "DRAFT",
};


export function LoanApplicationProvider({ children }: { children: ReactNode }) {
  const [application, setApplication] = useState<LoanApplication>(initialApplicationState);
  const [step, setStep] = useState(3); // Start at Credit Check (index 3)

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
  { title: "Eligibility Result", component: EligibilityResultStep },
  { title: "Key Facts", component: KfsStep },
  { title: "Bank Details", component: BankDetailsStep },
  { title: "e-Mandate", component: EMandateStep },
  { title: "e-Sign Agreement", component: AgreementStep },
  { title: "Disbursement", component: DisbursementStep },
];

export function LoanJourney() {
  const { step, nextStep, application } = useLoanApplication();
  
  const handleStepCompletion = () => {
    if(step === 3 && application.application_status === 'REJECTED') {
      // If rejected at credit check, we stay on the same component which shows the rejection message.
      // The "Continue" button won't be visible.
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
