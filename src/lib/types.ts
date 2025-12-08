import type { User } from 'firebase/auth';

export type LoanApplication = {
  personalDetails?: {
    fullName: string;
    pan: string;
    birthDate: Date;
    annualIncome: number;
    loanAmount: number;
    consent: boolean;
  };
  kyc?: {
    aadhaar: string;
    isVerified: boolean;
    documents: { type: string; name: string; url: string }[];
  };
  creditAssessment?: {
    riskLevel: string;
    interestRate: number;
    eligibleLoanAmount: number;
    reason: string;
  };
  loanOffer?: {
    loanAmountOffered: number;
    interestRate: number;
    monthlyPayment: number;
    tenureMonths: number;
    reason: string;
  };
  kfsAccepted?: boolean;
  bankDetails?: {
    accountNumber: string;
    ifsc: string;
    isVerified: boolean;
  };
  eMandate?: {
    isRegistered: boolean;
  };
  isDisbursed?: boolean;
  consents?: Record<string, boolean>;
};


export type AppState = {
  user: User | null;
  borrower: Borrower | null;
  loanApplication: LoanApplication | null;
  loading: boolean;
  error: Error | null;
};


export type Borrower = {
    id: string;
    firebaseAuthUid: string;
    fullName: string;
    mobileNumber: string;
    email?: string;
    isIndianResident: boolean;
    createdAt: Date;
    updatedAt: Date;
}
