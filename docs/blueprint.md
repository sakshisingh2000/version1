# **App Name**: LoanSwift

## Core Features:

- Borrower Onboarding: Collect user details, PAN, Aadhaar and bank details with explicit consent. Mock integrations for NSDL PAN verification and UIDAI Aadhaar OTP.
- KYC Verification: Fetch e-documents from DigiLocker (mock integration). Display fetched documents in UI.
- Credit Scoring: Mock credit bureau integration to fetch credit score and risk assessment.
- Loan Eligibility: Determine loan eligibility based on credit score, income and other factors. Dynamically adjust the offers available to the borrower
- KFS Display and Acceptance: Generate and display a Key Facts Statement (KFS) to the borrower. Require explicit acceptance before proceeding.
- Bank Account Verification: Verify borrower's bank account using penny drop method (mock API).
- e-Mandate Registration: Register e-mandate for loan repayment deductions (mock API for eNACH/eMandate).
- Disbursement and Repayment Simulation: Simulate loan disbursement and repayment flowing directly between borrower and RE accounts.
- RE Admin Console: Separate console for RE Admin to review logs, configurations, and perform audit.

## Style Guidelines:

- Primary color: Soft blue (#A0D2EB) to convey trust and stability, fitting for a financial app.
- Background color: Light, desaturated blue (#E5F1F7), a brighter backdrop appropriate for a light color scheme.
- Accent color: Muted green (#90EE90), analogous to blue and implying growth and forward motion.
- Font pairing: 'Inter' (sans-serif) for body text and 'Space Grotesk' (sans-serif) for headlines, conveying a modern, technical feel.
- Use clean and simple icons to represent different steps in the loan journey.
- Step-wise wizard layout to guide the borrower through the loan application process.
- Subtle animations to provide feedback during form filling and data processing.