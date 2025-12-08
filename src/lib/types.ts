import type { User } from 'firebase/auth';

export type DigiLockerDocument = {
  doc_type: string;
  doc_name: string;
  verification_status: 'VERIFIED' | 'NOT_PROVIDED' | 'FAILED';
  expiry_date?: string;
};

export type LoanApplication = {
  personalDetails?: {
    fullName: string;
    pan: string;
    birthDate: Date;
    loanAmount: number;
    employmentType: string;
    monthlyIncome: number;
    addressLine1: string;
    city: string;
    pincode: string;
    consent: boolean;
  };
  kyc?: {
    panStatus?: 'VERIFIED' | 'MISMATCH' | 'FAILED';
    aadhaarAuthStatus?: 'OTP_SUCCESS' | 'FAILED';
    aadhaarMaskedNumber?: string;
    digilockerStatus?: 'SUCCESS' | 'FAILED' | 'PENDING';
    digilockerDocuments?: DigiLockerDocument[];
    addressVerified?: boolean;
    kycCompleted?: boolean;
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
    kfsDocumentUrl?: string;
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
  agreement?: {
    isSigned: boolean;
    agreementUrl: string;
    signedAt: Date;
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
