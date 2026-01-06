# LoanSwift Digital Lending Prototype

Welcome to LoanSwift, a functional prototype of a digital lending application. This document provides a step-by-step guide to the user journey, explaining each stage of the loan application process.

The entire flow is designed to be a "Straight-Through Process" (STP), meaning a user can go from application to disbursement without any manual intervention. All external checks (like PAN, Aadhaar, CIBIL, etc.) are mocked to ensure a smooth and predictable demonstration.

---

## The Borrower's Journey: A Step-by-Step Flow

### Step 1: Welcome & Loan Selection

*   **Screen:** Home Page
*   **What the user does:** The journey begins on the landing page where the user sees the available loan products. They click the **"Check My Eligibility"** button for the "Personal Loan".

### Step 2: Mobile Number Verification

*   **Screen:** Verify Your Mobile
*   **What the user does:** The user is asked to enter their 10-digit mobile number and click **"Get OTP"**.
*   **Behind the Scenes (Mock):** No real SMS is sent. The app simulates sending an OTP and prepares for the next step.

### Step 3: OTP Verification

*   **Screen:** Enter OTP
*   **What the user does:** The user enters the mock OTP, which is always **`123456`**, and clicks **"Verify OTP"**.
*   **Behind the Scenes (Mock):**
    *   Upon successful verification, Firebase Authentication creates a new **anonymous user session**. This gives the user a unique ID.
    *   A new `borrower` document is created in Firestore using this user ID, which is essential for the security rules to work correctly.

### Step 4: Providing Consent

*   **Screen:** Consent Hub
*   **What the user does:** In compliance with digital lending guidelines, the user is shown a series of consents required for data processing, KYC, and credit checks. They must check all the boxes, including the final agreement, and click **"Accept & Continue"**.
*   **Behind the Scenes (Mock):** The user's consent choices are saved to a `consent_logs` subcollection within their borrower document in Firestore.

### Step 5: The Loan Application Journey Begins

After consent, the user is navigated to the main multi-step loan application flow.

#### 5a. Personal & Loan Details

*   **Screen:** Step 1: Personal Details
*   **What the user does:** The user fills out a simple form with their full name, PAN, date of birth, income, address, and desired loan amount. They click **"Save and Continue"**.
*   **Behind the Scenes (Mock):**
    *   A new `loan_applications` document is created in Firestore under the user's borrower document.
    *   The personal details are saved to both the `borrower` and the `loan_applications` documents.

#### 5b. PAN & Aadhaar KYC

*   **Screen:** Step 2: KYC Verification
*   **What the user does:**
    1.  **PAN Verification:** The user confirms their PAN and clicks **"Verify PAN"**. The system shows a "Verified" success message.
    2.  **Aadhaar e-KYC:** The user enters their Aadhaar number and clicks **"Send OTP"**. They then enter the mock OTP **`123456`** and click **"Verify OTP"**.
*   **Behind the Scenes (Mock):** The system simulates successful verification against government databases (NSDL/UIDAI) and updates the application status.

#### 5c. DigiLocker KYC

*   **Screen:** Step 3: DigiLocker KYC
*   **What the user does:** The user clicks **"Connect to DigiLocker (Mock)"**. A popup appears where they select documents to share (e.g., Aadhaar, PAN) and click **"Share Selected Documents"**.
*   **Behind the Scenes (Mock):** The system simulates fetching documents from DigiLocker and marks the KYC as complete.

#### 5d. Credit Check & CIBIL Score

*   **Screen:** Step 4: Credit Check
*   **What the user does:**
    1.  The user clicks **"Pull My Credit Report (Mock)"**.
    2.  The system simulates a CIBIL check and **immediately displays a CIBIL Score Card** showing their mock credit score (e.g., 780), score band (e.g., "Excellent"), and key metrics.
    3.  After reviewing their score, the user clicks **"Continue to Eligibility Result"**.
*   **Behind the Scenes (Mock):** A mock CIBIL report is generated. Based on the score, an automated underwriting rule **always approves the loan** to ensure the prototype flow continues.

#### 5e. Eligibility & EMI Selection

*   **Screen:** Step 5: Eligibility Result
*   **What the user does:**
    1.  The app displays the final approved loan amount.
    2.  The user selects a repayment tenure (e.g., 6, 9, 12 months) from the available options.
    3.  As soon as they select a tenure, the screen updates to show the calculated **monthly EMI** and a **preview of the payment schedule** (first 3 and last installments).
    4.  The user checks the consent box and clicks **"Confirm Tenure & Continue"**.
*   **Behind the Scenes (Mock):** The app calculates the full amortization schedule and saves it to the loan application document in Firestore.

#### 5f. Review Offer & Key Facts Statement (KFS)

*   **Screen:** Step 6: Key Facts
*   **What the user does:**
    1.  The user reviews a summary of the loan offer, including the disbursed amount, processing fees, and total repayment.
    2.  They can click **"View Detailed Key Facts Statement (KFS)"** to see a popup with the full loan details and the complete payment schedule.
    3.  After reviewing, they check the box to accept the offer and click **"Accept Offer & Continue"**.

#### 5g. Bank Details & e-Mandate

*   **Screen:** Step 7 & 8: Bank Details & e-Mandate
*   **What the user does:**
    1.  **Bank Details:** The user enters their bank account number and IFSC code for disbursement. The system simulates a penny-drop verification.
    2.  **e-Mandate:** The user clicks **"Setup e-Mandate"** to authorize automatic EMI deductions. The system simulates a successful bank mandate registration.

#### 5h. e-Sign Loan Agreement

*   **Screen:** Step 9: e-Sign Agreement
*   **What the user does:** The user reviews a mock loan agreement and clicks **"Sign via Aadhaar OTP (Mock)"**. They enter the mock OTP **`123456`** to digitally sign the document.

#### 5i. Disbursement!

*   **Screen:** Step 10: Disbursement
*   **What the user does:** This is the final step. The system is now ready to disburse the loan. The user clicks **"Initiate Disbursement"**.
*   **Result:** A success screen appears, confirming that the loan amount has been transferred to their bank account. The journey is complete!
