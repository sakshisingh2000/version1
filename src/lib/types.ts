

import type { User } from 'firebase/auth';

export type DigiLockerDocument = {
  doc_type: string;
  doc_name: string;
  verification_status: 'VERIFIED' | 'NOT_PROVIDED' | 'FAILED';
  expiry_date?: string;
};

export type UploadableDocument = {
  id: string;
  name: string;
  status: 'PENDING' | 'UPLOADED' | 'VERIFIED_OCR' | 'VERIFIED_DIGITALLY' | 'FAILED';
  category: 'Identity' | 'Financial' | 'Other';
  optional?: boolean;
  file?: File;
  source?: 'device' | 'dropbox';
};


export type TenureOption = {
  tenure_months: number;
};

export type PaymentScheduleItem = {
  installmentNo: number;
  dueDate: string; // ISO string "YYYY-MM-DD"
  totalPayment: number;
  principal: number;
  interest: number;
  outstandingPrincipal: number;
  cumulativeInterest: number;
};

export type LoanApplication = {
  loanApplicationId: string;
  borrowerId?: string;
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
    panStatus?: 'PENDING' | 'VERIFIED' | 'MISMATCH' | 'FAILED';
    aadhaarAuthStatus?: 'PENDING' | 'OTP_SENT' | 'OTP_SUCCESS' | 'FAILED';
    aadhaarMaskedNumber?: string;
    digilockerStatus?: 'PENDING' | 'SUCCESS' | 'FAILED';
    digilockerDocuments?: DigiLockerDocument[];
    documentVerificationStatus?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
    addressVerified?: boolean;
    kycCompleted?: boolean;
  };
   uploadedDocuments?: UploadableDocument[];
  bureauReport?: {
    bureau_name: string;
    score: number;
    total_active_loans: number;
    total_overdue_amount: number;
    max_dpd: number;
    recent_enquiries_count: number;
    decision_summary: string;
    bureau_raw_json: string;
  } | null;
  // Fields from your new spec
  requested_amount?: number;
  requested_tenure_months?: number;
  product_type?: 'PERSONAL_LOAN' | 'CONSUMER_DURABLE';
  application_status?: 'DRAFT' | 'UNDERWRITING' | 'APPROVED' | 'REJECTED' | 'DISBURSED' | 'PENDING_REVIEW' | 'APPROVED_ASSISTED_COMPLETION_REQUIRED' | 'DISBURSEMENT_PENDING_CONFIRMATION' | 'DISBURSEMENT_IN_PROGRESS';
  internal_risk_score?: 'LOW_RISK' | 'MEDIUM_RISK' | 'HIGH_RISK';
  bureau_score?: number;
  kyc_completed?: boolean;
  eligibility_decision_reason?: string;

  approved_amount?: number | null;
  eligible_amount?: number;
  approved_tenure_options?: TenureOption[] | null;
  selected_tenure_months?: number;
  selected_emi_amount?: number;
  offer_status?: 'NONE' | 'OFFER_GENERATED' | 'OFFER_ACCEPTED' | 'OFFER_REJECTED';
  
  // Payment Schedule fields
  paymentSchedule?: PaymentScheduleItem[];
  totalInterestPayable?: number;
  totalPaymentDue?: number;
  firstEmiDate?: string;
  lastEmiDate?: string;

  kfs_document_url?: string;
  loan_agreement_url?: string;
  disbursement_details_id?: string;

  sanctionLetter?: {
    isSigned?: boolean;
    signedAt?: string;
  };

  // Legacy fields for compatibility - can be removed later
  underwritingResult?: {
      status: 'APPROVED' | 'REJECTED' | 'PENDING_REVIEW';
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
    bankName: string;
    branch: string;
  };
  eMandate?: {
    isRegistered: boolean;
    mandateStatus?: 'PENDING' | 'ACTIVE' | 'FAILED';
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
