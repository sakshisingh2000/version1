

"use client";

import type { LoanApplication } from '@/lib/types';
import { createContext, useContext, useState, useMemo, type Dispatch, type SetStateAction, type ReactNode, useEffect } from 'react';
import { StepIndicator } from './step-indicator';
import { BankDetailsStep, CreditCheckStep, DigiLockerStep, DisbursementStep, EMandateStep, KfsStep, KycStep, EligibilityResultStep, PersonalDetailsStep, AgreementStep } from './steps';
import { Card, CardContent } from '../ui/card';
import { useUser, useFirestore } from '@/firebase';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

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
  loanApplicationId: "", // Will be set after personal details are submitted
  personalDetails: {
    fullName: "Rohan Sharma",
    pan: "ABCDE1234F",
    birthDate: new Date("1990-05-15"),
    loanAmount: 150000,
    employmentType: "Salaried",
    monthlyIncome: 60000,
    addressLine1: "123, Tech Park Road",
    city: "Bengaluru",
    pincode: "560001",
    consent: true,
  },
  kyc: {
    panStatus: 'VERIFIED',
    aadhaarAuthStatus: 'OTP_SUCCESS',
    aadhaarMaskedNumber: 'XXXX-XXXX-8765',
    digilockerStatus: 'SUCCESS',
    digilockerDocuments: [
      { doc_type: 'AADHAAR_XML', doc_name: 'Aadhaar XML / e-KYC', verification_status: 'VERIFIED' },
      { doc_type: 'PAN_CARD', doc_name: 'PAN Card (e-PAN)', verification_status: 'VERIFIED' },
    ],
    addressVerified: true,
    kycCompleted: true,
  },
  kyc_completed: true,
  bureauReport: null,
  application_status: "DRAFT",
  requested_amount: 150000,
};


export function LoanApplicationProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const firestore = useFirestore();
  const [application, setApplication] = useState<LoanApplication>(initialApplicationState);
  const [step, setStep] = useState(3); // Start at Credit Check (index 3)

  // This effect will run once to create the mock application in Firestore
  // which is needed to satisfy security rules for subsequent updates.
  useEffect(() => {
    if (user?.uid) {
      const loanAppCollection = collection(firestore, 'borrowers', user.uid, 'loan_applications');
      const loanAppRef = doc(loanAppCollection);
      
      const newApplicationId = loanAppRef.id;

      const loanAppData = {
        ...initialApplicationState,
        loanApplicationId: newApplicationId,
        id: newApplicationId, // for rules
        borrowerId: user.uid,
        requested_amount: initialApplicationState.personalDetails?.loanAmount,
        application_status: 'DRAFT',
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      };
      
      // Update state and Firestore
      setApplication(loanAppData);
      // We don't use merge here because we are setting the complete initial document.
      setDocumentNonBlocking(loanAppRef, loanAppData, {});
    }
  }, [user, firestore]);

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

  // Prevent rendering if the application ID hasn't been set yet.
  if (!application.loanApplicationId) {
    return null; 
  }

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
