

export type Language = 'en' | 'hi' | 'mr' | 'te' | 'kn';

type BilingualText = {
  en: string;
  regional: string;
};

export interface Dictionary {
  login: {
    title: BilingualText;
    description: BilingualText;
    mobile_label: BilingualText;
    mobile_placeholder: BilingualText;
    button_text: BilingualText;
    otp_sent_title: BilingualText;
    otp_sent_description: BilingualText;
  },
  otp_verify: {
    title: BilingualText;
    description: BilingualText;
    otp_label: BilingualText;
    otp_placeholder: BilingualText;
    button_text: BilingualText;
    resend_button: BilingualText;
    resent_toast: BilingualText;
    success_title: BilingualText;
    success_description: BilingualText;
    failure_title: BilingualText;
    failure_description: BilingualText;
    invalid_otp_title: BilingualText;
    invalid_otp_description: BilingualText;
  },
  consent: {
    title: BilingualText;
    description: BilingualText;
    items: {
      PAN_VERIFICATION: BilingualText;
      AADHAAR_AUTH: BilingualText;
      DIGILOCKER_KYC: BilingualText;
      BUREAU_PULL: BilingualText;
      BANK_VERIFICATION: BilingualText;
      DATA_SHARING: BilingualText;
      AGREE_NOTICE: BilingualText;
    };
    agree_notice_text: BilingualText;
    accept_button: BilingualText;
    all_consents_required: BilingualText;
  };
  personal_details: {
    title: BilingualText;
    full_name_label: BilingualText;
    full_name_placeholder: BilingualText;
    pan_label: BilingualText;
    pan_placeholder: BilingualText;
    dob_label: BilingualText;
    dob_placeholder: BilingualText;
    employment_label: BilingualText;
    employment_placeholder: BilingualText;
    income_label: BilingualText;
    income_placeholder: BilingualText;
    loan_amount_label: BilingualText;
    loan_amount_placeholder: BilingualText;
    address_label: BilingualText;
    address_placeholder: BilingualText;
    city_placeholder: BilingualText;
    pincode_placeholder: BilingualText;
    consent_label: BilingualText;
    consent_description: BilingualText;
    save_button: BilingualText;
  };
  kyc: {
    pan_title: BilingualText;
    pan_description: BilingualText;
    pan_verified_title: BilingualText;
    pan_verified_description: BilingualText;
    pan_button: BilingualText;
    aadhaar_title: BilingualText;
    aadhaar_description: BilingualText;
    aadhaar_verified_title: BilingualText;
    aadhaar_verified_description: BilingualText;
    aadhaar_label: BilingualText;
    aadhaar_placeholder: BilingualText;
    send_otp_button: BilingualText;
    otp_label: BilingualText;
    otp_placeholder: BilingualText;
    verify_otp_button: BilingualText;
    continue_button: BilingualText;
  },
  doc_verification: {
      digilocker_title: BilingualText;
      digilocker_description: BilingualText;
      digilocker_button: BilingualText;
      manual_title: BilingualText;
      manual_description: BilingualText;
      upload_button: BilingualText;
      verifying_toast: BilingualText;
      verified_toast: BilingualText;
      upload_pending_badge: BilingualText;
      upload_uploaded_badge: BilingualText;
      upload_verified_ocr_badge: BilingualText;
      upload_verified_digital_badge: BilingualText;
      continue_button: BilingualText;
      digilocker_modal_title: BilingualText;
      digilocker_modal_description: BilingualText;
      digilocker_modal_share_button: BilingualText;
      processing_title: BilingualText;
      processing_description: BilingualText;
      summary_title: BilingualText;
      summary_description: BilingualText;
      summary_name_label: BilingualText;
      summary_dob_label: BilingualText;
      summary_address_label: BilingualText;
      summary_pan_label: BilingualText;
      summary_match_badge: BilingualText;
      summary_mismatch_badge: BilingualText;
      summary_partial_match_badge: BilingualText;
  },
   eligibility: {
    rejected_title: BilingualText;
    rejected_description: BilingualText;
    back_home_button: BilingualText;
    finalizing_title: BilingualText;
    finalizing_description: BilingualText;
    report_summary_title: BilingualText;
    score_band_excellent: BilingualText;
    score_band_good: BilingualText;
    score_band_fair: BilingualText;
    score_band_poor: BilingualText;
    cibil_score_label: BilingualText;
    active_loans_label: BilingualText;
    overdue_label: BilingualText;
    enquiries_label: BilingualText;
    upsell_title: BilingualText;
    upsell_description: BilingualText;
    select_amount_label: BilingualText;
    recommended_badge: BilingualText;
    lower_amount_requested: BilingualText;
    lower_amount_approved: BilingualText;
    lower_amount_reason: BilingualText;
    lower_amount_accept_button: BilingualText;
    lower_amount_decline_button: BilingualText;
    assisted_journey_title: BilingualText;
    assisted_journey_description: BilingualText;
    app_id_label: BilingualText;
    thank_you_message: BilingualText;
    tenure_label: BilingualText;
    tenure_description: BilingualText;
    plan_title: BilingualText;
    per_month_label: BilingualText;
    for_months_label: BilingualText;
    at_interest_label: BilingualText;
    schedule_preview_title: BilingualText;
    confirm_consent_label: BilingualText;
    confirm_button: BilingualText;
    validation_message: BilingualText;
    approved_amount_label: BilingualText;
  },
  kfs: {
    title: BilingualText;
    description: BilingualText;
    kfs_title: BilingualText;
    kfs_description: BilingualText;
    loan_amount: BilingualText;
    processing_fee: BilingualText;
    net_disbursed: BilingualText;
    monthly_emi: BilingualText;
    total_repayment: BilingualText;
    view_kfs_button: BilingualText;
    accept_consent: BilingualText;
    accept_button: BilingualText;
  };
  sanction_letter: {
    title: BilingualText;
    description: BilingualText;
    borrower_details: BilingualText;
    borrower_name: BilingualText;
    app_id: BilingualText;
    pan: BilingualText;
    sanction_date: BilingualText;
    loan_details: BilingualText;
    sanctioned_amount: BilingualText;
    loan_type: BilingualText;
    tenure: BilingualText;
    interest_rate: BilingualText;
    emi_amount: BilingualText;
    emi_start_date: BilingualText;
    fees_disbursal: BilingualText;
    processing_fee: BilingualText;
    gst: BilingualText;
    net_disbursal: BilingualText;
    key_terms: BilingualText;
    term1: BilingualText;
    term2: BilingualText;
    term3: BilingualText;
    lender_disclosure1: BilingualText;
    lender_disclosure2: BilingualText;
    lender_disclosure3: BilingualText;
    accept_button: BilingualText;
    decline_button: BilingualText;
    decline_title: BilingualText;
    decline_description: BilingualText;
    support_contact: BilingualText;
    esign_title: BilingualText;
    esign_description: BilingualText;
    otp_label: BilingualText;
    esign_button: BilingualText;
  };
  e_mandate: {
    title: BilingualText;
    description: BilingualText;
    mandate_details_title: BilingualText;
    account_label: BilingualText;
    emi_amount_label: BilingualText;
    frequency_label: BilingualText;
    start_date_label: BilingualText;
    setup_button: BilingualText;
    setup_button_pending: BilingualText;
    unable_button: BilingualText;
    success_title: BilingualText;
    success_description: BilingualText;
    unable_title: BilingualText;
    unable_description: BilingualText;
    app_id: BilingualText;
    sanctioned_amount: BilingualText;
    support_contact: BilingualText;
  };
   agreement: {
    title: BilingualText;
    description: BilingualText;
    borrower_details: BilingualText;
    borrower_name: BilingualText;
    app_id: BilingualText;
    pan: BilingualText;
    loan_details: BilingualText;
    sanctioned_amount: BilingualText;
    tenure: BilingualText;
    interest_rate: BilingualText;
    fees_disbursal: BilingualText;
    processing_fee: BilingualText;
    gst: BilingualText;
    net_disbursal: BilingualText;
    repayment_terms: BilingualText;
    emi_amount: BilingualText;
    emi_start_date: BilingualText;
    repayment_mode: BilingualText;
    legal_disclosure: BilingualText;
    lender_disclosure1: BilingualText;
    lender_disclosure2: BilingualText;
    lender_disclosure3: BilingualText;
    declaration_title: BilingualText;
    declaration_content: BilingualText;
    sign_button: BilingualText;
    otp_label: BilingualText;
    otp_placeholder: BilingualText;
    verify_button: BilingualText;
  };
  disbursement: {
    success_title: BilingualText;
    processing_message: BilingualText;
    credited_soon_message: BilingualText;
    details_title: BilingualText;
    amount_label: BilingualText;
    account_label: BilingualText;
    ref_label: BilingualText;
    back_to_dashboard_button: BilingualText;
    ready_title: BilingualText;
    ready_description: BilingualText;
    final_disbursement_title: BilingualText;
    net_amount_label: BilingualText;
    to_account_label: BilingualText;
    timeline_label: BilingualText;
    timeline_value: BilingualText;
    confirm_disbursement_button: BilingualText;
    not_ready_button: BilingualText;
    initiate_button: BilingualText;
    processing_button: BilingualText;
    assisted_title: BilingualText;
    assisted_description: BilingualText;
    app_id_label: BilingualText;
  };
}


const en: Dictionary = {
  login: {
    title: { en: 'Verify Your Mobile', regional: 'Verify Your Mobile' },
    description: { en: "We'll send a one-time password (OTP) to your mobile number to get started.", regional: "We'll send a one-time password (OTP) to your mobile number to get started." },
    mobile_label: { en: 'Mobile Number', regional: 'Mobile Number' },
    mobile_placeholder: { en: 'Enter 10-digit mobile number', regional: 'Enter 10-digit mobile number' },
    button_text: { en: 'Get OTP', regional: 'Get OTP' },
    otp_sent_title: { en: 'OTP Sent', regional: 'OTP Sent' },
    otp_sent_description: { en: 'An OTP has been sent to', regional: 'An OTP has been sent to' },
  },
  otp_verify: {
    title: { en: 'Enter OTP', regional: 'Enter OTP' },
    description: { en: 'An OTP has been sent to +91 <mobile>.', regional: 'An OTP has been sent to +91 <mobile>.' },
    otp_label: { en: '6-Digit OTP', regional: '6-Digit OTP' },
    otp_placeholder: { en: '123456', regional: '123456' },
    button_text: { en: 'Verify OTP', regional: 'Verify OTP' },
    resend_button: { en: 'Resend OTP', regional: 'Resend OTP' },
    resent_toast: { en: 'OTP Resent', regional: 'OTP Resent' },
    success_title: { en: 'Verification Successful', regional: 'Verification Successful' },
    success_description: { en: 'You have been successfully verified.', regional: 'You have been successfully verified.' },
    failure_title: { en: 'Verification Failed', regional: 'Verification Failed' },
    failure_description: { en: 'An unexpected error occurred.', regional: 'An unexpected error occurred.' },
    invalid_otp_title: { en: 'Invalid OTP', regional: 'Invalid OTP' },
    invalid_otp_description: { en: 'The OTP you entered is incorrect. Please try again.', regional: 'The OTP you entered is incorrect. Please try again.' },
  },
  consent: {
    title: { en: 'Consent Hub', regional: 'Consent Hub' },
    description: { en: 'As per RBI guidelines, we need your explicit consent for the following data processing activities.', regional: 'As per RBI guidelines, we need your explicit consent for the following data processing activities.' },
    items: {
      PAN_VERIFICATION: { en: 'I consent to verification of my PAN from issuing authority/NSDL.', regional: 'I consent to verification of my PAN from issuing authority/NSDL.' },
      AADHAAR_AUTH: { en: 'I consent to Aadhaar OTP-based offline verification / e-KYC through authorized partners.', regional: 'I consent to Aadhaar OTP-based offline verification / e-KYC through authorized partners.' },
      DIGILOCKER_KYC: { en: 'I consent to fetch KYC documents from DigiLocker using my DigiLocker account.', regional: 'I consent to fetch KYC documents from DigiLocker using my DigiLocker account.' },
      BUREAU_PULL: { en: 'I consent to pull my credit report from credit bureaus for the purpose of this loan.', regional: 'I consent to pull my credit report from credit bureaus for the purpose of this loan.' },
      BANK_VERIFICATION: { en: 'I consent to verification of my bank account and registration of e-mandate for EMI debit.', regional: 'I consent to verification of my bank account and registration of e-mandate for EMI debit.' },
      DATA_SHARING: { en: 'I consent to processing of my data by the NBFC/BANK (RE) and its authorized service providers, in line with RBI digital lending guidelines.', regional: 'I consent to processing of my data by the NBFC/BANK (RE) and its authorized service providers, in line with RBI digital lending guidelines.' },
      AGREE_NOTICE: { en: 'I have read and agree to these consents and the privacy notice.', regional: 'I have read and agree to these consents and the privacy notice.' },
    },
    agree_notice_text: { en: 'By checking the boxes above and clicking "Accept & Continue", I, the applicant, hereby provide my explicit consent to LoanSwift (the LSP) and its partner FairFinance NBFC (the RE) to access, process, and store my personal and financial information for the purpose of this loan application. This includes sharing data with credit bureaus (e.g., CIBIL), and using third-party services for PAN, Aadhaar, and bank account verification. This consent is voluntary and can be revoked as per the terms outlined in our privacy policy.', regional: 'By checking the boxes above and clicking "Accept & Continue", I, the applicant, hereby provide my explicit consent to LoanSwift (the LSP) and its partner FairFinance NBFC (the RE) to access, process, and store my personal and financial information for the purpose of this loan application. This includes sharing data with credit bureaus (e.g., CIBIL), and using third-party services for PAN, Aadhaar, and bank account verification. This consent is voluntary and can be revoked as per the terms outlined in our privacy policy.' },
    accept_button: { en: 'Accept & Continue', regional: 'Accept & Continue' },
    all_consents_required: { en: 'You must accept all consents to proceed.', regional: 'You must accept all consents to proceed.' },
  },
  personal_details: {
    title: { en: "Personal Details", regional: "Personal Details" },
    full_name_label: { en: 'Full Name (as per PAN)', regional: 'Full Name (as per PAN)' },
    full_name_placeholder: { en: 'John Doe', regional: 'John Doe' },
    pan_label: { en: 'PAN Number', regional: 'PAN Number' },
    pan_placeholder: { en: 'ABCDE1234F', regional: 'ABCDE1234F' },
    dob_label: { en: 'Date of Birth', regional: 'Date of Birth' },
    dob_placeholder: { en: 'Select your Date of Birth', regional: 'Select your Date of Birth' },
    employment_label: { en: 'Employment Type', regional: 'Employment Type' },
    employment_placeholder: { en: 'Select your employment type', regional: 'Select your employment type' },
    income_label: { en: 'Monthly Net Income (₹)', regional: 'Monthly Net Income (₹)' },
    income_placeholder: { en: '40000', regional: '40000' },
    loan_amount_label: { en: 'Loan Amount Required (₹)', regional: 'Loan Amount Required (₹)' },
    loan_amount_placeholder: { en: '100000', regional: '100000' },
    address_label: { en: 'Current Address', regional: 'Current Address' },
    address_placeholder: { en: 'Address Line', regional: 'Address Line' },
    city_placeholder: { en: 'City', regional: 'City' },
    pincode_placeholder: { en: 'Pincode', regional: 'Pincode' },
    consent_label: { en: 'Explicit Consent', regional: 'Explicit Consent' },
    consent_description: { en: 'I hereby consent to LoanSwift fetching my credit information and other details for the purpose of this loan application.', regional: 'I hereby consent to LoanSwift fetching my credit information and other details for the purpose of this loan application.' },
    save_button: { en: 'Save and Continue', regional: 'Save and Continue' },
  },
   kyc: {
    pan_title: { en: 'PAN Verification', regional: 'PAN Verification' },
    pan_description: { en: 'Pre-filled based on earlier details. Please review and edit if required.', regional: 'Pre-filled based on earlier details. Please review and edit if required.' },
    pan_verified_title: { en: 'PAN Verified', regional: 'PAN Verified' },
    pan_verified_description: { en: 'Your PAN has been successfully verified.', regional: 'Your PAN has been successfully verified.' },
    pan_button: { en: 'Verify PAN', regional: 'Verify PAN' },
    aadhaar_title: { en: 'Aadhaar e-KYC', regional: 'Aadhaar e-KYC' },
    aadhaar_description: { en: 'Enter your Aadhaar to perform e-KYC via OTP.', regional: 'Enter your Aadhaar to perform e-KYC via OTP.' },
    aadhaar_verified_title: { en: 'Aadhaar Verified', regional: 'Aadhaar Verified' },
    aadhaar_verified_description: { en: 'Your Aadhaar e-KYC is complete.', regional: 'Your Aadhaar e-KYC is complete.' },
    aadhaar_label: { en: 'Aadhaar Number', regional: 'Aadhaar Number' },
    aadhaar_placeholder: { en: '1234 5678 9012', regional: '1234 5678 9012' },
    send_otp_button: { en: 'Send OTP', regional: 'Send OTP' },
    otp_label: { en: 'Enter OTP', regional: 'Enter OTP' },
    otp_placeholder: { en: 'Enter 6-digit OTP (123456)', regional: 'Enter 6-digit OTP (123456)' },
    verify_otp_button: { en: 'Verify OTP', regional: 'Verify OTP' },
    continue_button: { en: 'Continue to Document Verification', regional: 'Continue to Document Verification' },
  },
  doc_verification: {
    digilocker_title: { en: 'Option 1: Use DigiLocker', regional: 'Option 1: Use DigiLocker' },
    digilocker_description: { en: 'Fetch your Aadhaar and PAN instantly for faster processing.', regional: 'Fetch your Aadhaar and PAN instantly for faster processing.' },
    digilocker_button: { en: 'Connect to DigiLocker', regional: 'Connect to DigiLocker' },
    manual_title: { en: 'Option 2: Manual Upload', regional: 'Option 2: Manual Upload' },
    manual_description: { en: "Upload your documents manually. We'll use OCR to verify them.", regional: "Upload your documents manually. We'll use OCR to verify them." },
    upload_button: { en: 'Upload', regional: 'Upload' },
    verifying_toast: { en: 'uploading and verifying...', regional: 'uploading and verifying...' },
    verified_toast: { en: 'Verified', regional: 'Verified' },
    upload_pending_badge: { en: 'Pending', regional: 'Pending' },
    upload_uploaded_badge: { en: 'Uploaded, Verifying...', regional: 'Uploaded, Verifying...' },
    upload_verified_ocr_badge: { en: 'Verified via OCR', regional: 'Verified via OCR' },
    upload_verified_digital_badge: { en: 'Digitally Verified', regional: 'Digitally Verified' },
    continue_button: { en: 'Continue to Eligibility', regional: 'Continue to Eligibility' },
    digilocker_modal_title: { en: 'Share Documents from DigiLocker', regional: 'Share Documents from DigiLocker' },
    digilocker_modal_description: { en: 'Select the documents you want to share for KYC verification.', regional: 'Select the documents you want to share for KYC verification.' },
    digilocker_modal_share_button: { en: 'Share Selected Documents', regional: 'Share Selected Documents' },
    processing_title: { en: 'Verifying Documents & Checking Credit...', regional: 'Verifying Documents & Checking Credit...' },
    processing_description: { en: 'Please wait while we securely process your information.', regional: 'Please wait while we securely process your information.' },
    summary_title: { en: 'KYC Matching Summary', regional: 'KYC Matching Summary' },
    summary_description: { en: "We've matched your provided details against your verified documents. Aadhaar is the primary source of truth.", regional: "We've matched your provided details against your verified documents. Aadhaar is the primary source of truth." },
    summary_name_label: { en: 'Full Name', regional: 'Full Name' },
    summary_dob_label: { en: 'Date of Birth', regional: 'Date of Birth' },
    summary_address_label: { en: 'Address', regional: 'Address' },
    summary_pan_label: { en: 'PAN', regional: 'PAN' },
    summary_match_badge: { en: 'Matches Aadhaar', regional: 'Matches Aadhaar' },
    summary_mismatch_badge: { en: 'Does Not Match', regional: 'Does Not Match' },
    summary_partial_match_badge: { en: 'Partial Match', regional: 'Partial Match' },
  },
  eligibility: {
    rejected_title: { en: 'Application Not Approved', regional: 'Application Not Approved' },
    rejected_description: { en: 'We are unable to proceed with your loan application at this time based on our current lending policies.', regional: 'We are unable to proceed with your loan application at this time based on our current lending policies.' },
    back_home_button: { en: 'Back to Home', regional: 'Back to Home' },
    finalizing_title: { en: 'Finalizing Eligibility...', regional: 'Finalizing Eligibility...' },
    finalizing_description: { en: 'This should only take a moment.', regional: 'This should only take a moment.' },
    report_summary_title: { en: 'Your Credit Report Summary', regional: 'Your Credit Report Summary' },
    score_band_excellent: { en: 'Excellent', regional: 'Excellent' },
    score_band_good: { en: 'Good', regional: 'Good' },
    score_band_fair: { en: 'Fair', regional: 'Fair' },
    score_band_poor: { en: 'Poor', regional: 'Poor' },
    cibil_score_label: { en: 'CIBIL Score', regional: 'CIBIL Score' },
    active_loans_label: { en: 'Active Loans', regional: 'Active Loans' },
    overdue_label: { en: 'Overdue', regional: 'Overdue' },
    enquiries_label: { en: 'Recent Enquiries', regional: 'Recent Enquiries' },
    upsell_title: { en: 'Great News!', regional: 'Great News!' },
    upsell_description: { en: "You applied for <requested>, but you're eligible for up to <eligible>.", regional: "You applied for <requested>, but you're eligible for up to <eligible>." },
    select_amount_label: { en: 'Select Your Loan Amount', regional: 'Select Your Loan Amount' },
    recommended_badge: { en: 'Recommended', regional: 'Recommended' },
    lower_amount_requested: { en: "You applied for: {amount}", regional: "You applied for: {amount}" },
    lower_amount_approved: { en: "Based on your profile, the approved loan amount is:", regional: "Based on your profile, the approved loan amount is:" },
    lower_amount_reason: { en: "This amount is approved based on your credit profile and repayment capacity.", regional: "This amount is approved based on your credit profile and repayment capacity." },
    lower_amount_accept_button: { en: "Continue with {amount}", regional: "Continue with {amount}" },
    lower_amount_decline_button: { en: "I do not wish to continue", regional: "I do not wish to continue" },
    assisted_journey_title: { en: "Assisted Journey", regional: "Assisted Journey" },
    assisted_journey_description: { en: "Your loan application has been successfully reviewed.\n\nWe noticed that the auto debit setup could not be completed digitally. Our relationship manager will contact you shortly to help you complete the next steps and guide you through alternate options.\n\nThank you for choosing LoanSwift.", regional: "Your loan application has been successfully reviewed.\n\nWe noticed that the auto debit setup could not be completed digitally. Our relationship manager will contact you shortly to help you complete the next steps and guide you through alternate options.\n\nThank you for choosing LoanSwift." },
    app_id_label: { en: 'Application ID', regional: 'Application ID' },
    thank_you_message: { en: 'Thank you for considering LoanSwift.', regional: 'Thank you for considering LoanSwift.' },
    tenure_label: { en: 'Choose your tenure', regional: 'Choose your tenure' },
    tenure_description: { en: 'Select a plan to see your monthly payment.', regional: 'Select a plan to see your monthly payment.' },
    plan_title: { en: 'Your Selected Plan', regional: 'Your Selected Plan' },
    per_month_label: { en: '/ month', regional: '/ month' },
    for_months_label: { en: 'months', regional: 'months' },
    at_interest_label: { en: '% p.a.', regional: '% p.a.' },
    schedule_preview_title: { en: 'Payment Schedule Preview', regional: 'Payment Schedule Preview' },
    confirm_consent_label: { en: 'I confirm that I have reviewed and chosen this loan tenure and EMI.', regional: 'I confirm that I have reviewed and chosen this loan tenure and EMI.' },
    confirm_button: { en: 'Confirm Loan Amount & Continue', regional: 'Confirm Loan Amount & Continue' },
    validation_message: { en: 'Please select a tenure and confirm your choice to proceed.', regional: 'Please select a tenure and confirm your choice to proceed.' },
    approved_amount_label: { en: 'Approved Loan Amount', regional: 'Approved Loan Amount' },
  },
  kfs: {
    title: { en: 'Your Loan Offer Summary', regional: 'Your Loan Offer Summary' },
    description: { en: 'Please review and accept your final loan details.', regional: 'Please review and accept your final loan details.' },
    kfs_title: { en: 'Key Facts Statement', regional: 'Key Facts Statement' },
    kfs_description: { en: 'This document summarizes all terms of your loan offer.', regional: 'This document summarizes all terms of your loan offer.' },
    loan_amount: { en: 'Loan Amount', regional: 'Loan Amount' },
    processing_fee: { en: 'Processing Fee (2%)', regional: 'Processing Fee (2%)' },
    net_disbursed: { en: 'Net Disbursed Amount', regional: 'Net Disbursed Amount' },
    monthly_emi: { en: 'Monthly EMI', regional: 'Monthly EMI' },
    total_repayment: { en: 'Total Repayment', regional: 'Total Repayment' },
    view_kfs_button: { en: 'View Detailed Key Facts Statement (KFS)', regional: 'View Detailed Key Facts Statement (KFS)' },
    accept_consent: { en: 'I have read and understood the Key Facts Statement and accept the loan offer.', regional: 'I have read and understood the Key Facts Statement and accept the loan offer.' },
    accept_button: { en: 'Accept Offer & Continue', regional: 'Accept Offer & Continue' },
  },
  sanction_letter: {
    title: { en: 'Loan Sanction Letter', regional: 'Loan Sanction Letter' },
    description: { en: 'Subject to terms and conditions.', regional: 'Subject to terms and conditions.' },
    borrower_details: { en: 'Borrower Details', regional: 'Borrower Details' },
    borrower_name: { en: 'Borrower Name', regional: 'Borrower Name' },
    app_id: { en: 'Application ID', regional: 'Application ID' },
    pan: { en: 'PAN', regional: 'PAN' },
    sanction_date: { en: 'Date of Sanction', regional: 'Date of Sanction' },
    loan_details: { en: 'Loan Details', regional: 'Loan Details' },
    sanctioned_amount: { en: 'Sanctioned Amount', regional: 'Sanctioned Amount' },
    loan_type: { en: 'Loan Type', regional: 'Loan Type' },
    tenure: { en: 'Tenure', regional: 'Tenure' },
    interest_rate: { en: 'Interest Rate', regional: 'Interest Rate' },
    emi_amount: { en: 'EMI Amount', regional: 'EMI Amount' },
    emi_start_date: { en: 'EMI Start Date', regional: 'EMI Start Date' },
    fees_disbursal: { en: 'Fees & Disbursal', regional: 'Fees & Disbursal' },
    processing_fee: { en: 'Processing Fee (2%)', regional: 'Processing Fee (2%)' },
    gst: { en: 'GST (18%)', regional: 'GST (18%)' },
    net_disbursal: { en: 'Net Disbursal Amount', regional: 'Net Disbursal Amount' },
    key_terms: { en: 'Key Terms', regional: 'Key Terms' },
    term1: { en: 'Sanction is subject to successful e-Mandate registration.', regional: 'Sanction is subject to successful e-Mandate registration.' },
    term2: { en: 'Loan is subject to execution of final loan agreement.', regional: 'Loan is subject to execution of final loan agreement.' },
    term3: { en: 'You may cancel the loan before disbursement.', regional: 'You may cancel the loan before disbursement.' },
    lender_disclosure1: { en: 'Loan provided by FairFinance NBFC (Regulated Entity - RE).', regional: 'Loan provided by FairFinance NBFC (Regulated Entity - RE).' },
    lender_disclosure2: { en: 'Loan facilitated by LoanSwift (Lending Service Provider - LSP).', regional: 'Loan facilitated by LoanSwift (Lending Service Provider - LSP).' },
    lender_disclosure3: { en: 'Grievance Contact', regional: 'Grievance Contact' },
    accept_button: { en: 'Accept & e-Sign', regional: 'Accept & e-Sign' },
    decline_button: { en: 'Do Not Accept', regional: 'Do Not Accept' },
    decline_title: { en: 'Application Paused', regional: 'Application Paused' },
    decline_description: { en: 'Your application ID is <ID>. Our relationship manager will contact you shortly to assist you further or clarify any questions.', regional: 'Your application ID is <ID>. Our relationship manager will contact you shortly to assist you further or clarify any questions.' },
    support_contact: { en: 'You can also reach us at support@loanswift.com', regional: 'You can also reach us at support@loanswift.com' },
    esign_title: { en: 'e-Sign Sanction Letter', regional: 'e-Sign Sanction Letter' },
    esign_description: { en: 'Enter the OTP sent to your Aadhaar-linked mobile number to sign.', regional: 'Enter the OTP sent to your Aadhaar-linked mobile number to sign.' },
    otp_label: { en: 'Enter 6-digit OTP', regional: 'Enter 6-digit OTP' },
    esign_button: { en: 'Verify & e-Sign', regional: 'Verify & e-Sign' },
  },
  e_mandate: {
    title: { en: 'e-Mandate for Repayments', regional: 'e-Mandate for Repayments' },
    description: { en: 'To automate your monthly EMI payments, please set up an e-mandate. This is a secure process handled by your bank.', regional: 'To automate your monthly EMI payments, please set up an e-mandate. This is a secure process handled by your bank.' },
    mandate_details_title: { en: 'Mandate Details', regional: 'Mandate Details' },
    account_label: { en: 'Account', regional: 'Account' },
    emi_amount_label: { en: 'EMI Amount', regional: 'EMI Amount' },
    frequency_label: { en: 'Frequency', regional: 'Frequency' },
    start_date_label: { en: 'First Debit', regional: 'First Debit' },
    setup_button: { en: 'Set up Auto Debit', regional: 'Set up Auto Debit' },
    setup_button_pending: { en: 'Redirecting to bank...', regional: 'Redirecting to bank...' },
    unable_button: { en: 'I am unable to set up auto debit', regional: 'I am unable to set up auto debit' },
    success_title: { en: 'e-Mandate Registered', regional: 'e-Mandate Registered' },
    success_description: { en: 'Auto-debit has been set up for your EMIs.', regional: 'Auto-debit has been set up for your EMIs.' },
    unable_title: { en: 'Assisted Journey Required', regional: 'Assisted Journey Required' },
    unable_description: { en: 'Your loan application has been successfully reviewed. We noticed that the auto debit setup could not be completed digitally. Our relationship manager will contact you shortly to help you complete the next steps and guide you through alternate options.', regional: 'Your loan application has been successfully reviewed. We noticed that the auto debit setup could not be completed digitally. Our relationship manager will contact you shortly to help you complete the next steps and guide you through alternate options.' },
    app_id: { en: 'Application ID', regional: 'Application ID' },
    sanctioned_amount: { en: 'Approved Loan Amount', regional: 'Approved Loan Amount' },
    support_contact: { en: 'Thank you for choosing LoanSwift.', regional: 'Thank you for choosing LoanSwift.' },
  },
  agreement: {
    title: { en: 'Digital Loan Agreement (e-Sign)', regional: 'Digital Loan Agreement (e-Sign)' },
    description: { en: 'Review the terms and sign the agreement using an Aadhaar-based OTP.', regional: 'Review the terms and sign the agreement using an Aadhaar-based OTP.' },
    borrower_details: { en: 'Borrower Details', regional: 'Borrower Details' },
    borrower_name: { en: 'Borrower Name', regional: 'Borrower Name' },
    app_id: { en: 'Application ID', regional: 'Application ID' },
    pan: { en: 'PAN', regional: 'PAN' },
    loan_details: { en: 'Loan Details', regional: 'Loan Details' },
    sanctioned_amount: { en: 'Sanctioned Amount', regional: 'Sanctioned Amount' },
    tenure: { en: 'Tenure', regional: 'Tenure' },
    interest_rate: { en: 'Interest Rate', regional: 'Interest Rate' },
    fees_disbursal: { en: 'Fees & Charges', regional: 'Fees & Charges' },
    processing_fee: { en: 'Processing Fee (2%)', regional: 'Processing Fee (2%)' },
    gst: { en: 'GST (18%) on Fee', regional: 'GST (18%) on Fee' },
    net_disbursal: { en: 'Net Disbursal Amount', regional: 'Net Disbursal Amount' },
    repayment_terms: { en: 'Repayment Terms', regional: 'Repayment Terms' },
    emi_amount: { en: 'EMI Amount', regional: 'EMI Amount' },
    emi_start_date: { en: 'EMI Start Date', regional: 'EMI Start Date' },
    repayment_mode: { en: 'Repayment Mode', regional: 'Repayment Mode' },
    legal_disclosure: { en: 'Legal & Regulatory Disclosures', regional: 'Legal & Regulatory Disclosures' },
    lender_disclosure1: { en: 'Loan provided by FairFinance NBFC (Regulated Entity - RE).', regional: 'Loan provided by FairFinance NBFC (Regulated Entity - RE).' },
    lender_disclosure2: { en: 'Loan facilitated by LoanSwift (Lending Service Provider - LSP).', regional: 'Loan facilitated by LoanSwift (Lending Service Provider - LSP).' },
    lender_disclosure3: { en: 'Grievance Contact', regional: 'Grievance Contact' },
    declaration_title: { en: 'Declaration & Consent', regional: 'Declaration & Consent' },
    declaration_content: { en: 'I have read, understood, and agree to the terms and conditions of this loan agreement.', regional: 'I have read, understood, and agree to the terms and conditions of this loan agreement.' },
    sign_button: { en: 'Sign via Aadhaar OTP', regional: 'Sign via Aadhaar OTP' },
    otp_label: { en: 'Enter OTP sent to your Aadhaar-linked mobile', regional: 'Enter OTP sent to your Aadhaar-linked mobile' },
    otp_placeholder: { en: 'Enter 6-digit OTP', regional: 'Enter 6-digit OTP' },
    verify_button: { en: 'Verify & e-Sign', regional: 'Verify & e-Sign' },
  },
  disbursement: {
    success_title: { en: 'Disbursement Initiated', regional: 'Disbursement Initiated' },
    processing_message: { en: 'Your loan request has been successfully processed.', regional: 'Your loan request has been successfully processed.' },
    credited_soon_message: { en: 'The approved amount will be credited to your bank account shortly (within 10-15 minutes).', regional: 'The approved amount will be credited to your bank account shortly (within 10-15 minutes).' },
    details_title: { en: 'Disbursement Details', regional: 'Disbursement Details' },
    amount_label: { en: 'Amount:', regional: 'Amount:' },
    account_label: { en: 'Bank Account:', regional: 'Bank Account:' },
    ref_label: { en: 'Transaction Ref:', regional: 'Transaction Ref:' },
    back_to_dashboard_button: { en: 'Back to Dashboard', regional: 'Back to Dashboard' },
    ready_title: { en: 'Ready for Disbursement', regional: 'Ready for Disbursement' },
    ready_description: { en: 'All formalities are complete. Please confirm to receive the net loan amount in your verified bank account.', regional: 'All formalities are complete. Please confirm to receive the net loan amount in your verified bank account.' },
    final_disbursement_title: { en: 'Final Disbursement', regional: 'Final Disbursement' },
    net_amount_label: { en: 'Net Amount to be Credited:', regional: 'Net Amount to be Credited:' },
    to_account_label: { en: 'To Account:', regional: 'To Account:' },
    timeline_label: { en: 'Timeline:', regional: 'Timeline:' },
    timeline_value: { en: '10-15 mins', regional: '10-15 mins' },
    confirm_disbursement_button: { en: 'Confirm & Proceed', regional: 'Confirm & Proceed' },
    not_ready_button: { en: 'I am not ready to proceed', regional: 'I am not ready to proceed' },
    initiate_button: { en: 'Initiate Disbursement', regional: 'Initiate Disbursement' },
    processing_button: { en: 'Processing Disbursement...', regional: 'Processing Disbursement...' },
    assisted_title: { en: 'Application Paused', regional: 'Application Paused' },
    assisted_description: { en: 'Your loan application is almost complete. If you need more time or assistance before disbursement, our relationship manager will contact you shortly to guide you further.', regional: 'Your loan application is almost complete. If you need more time or assistance before disbursement, our relationship manager will contact you shortly to guide you further.' },
    app_id_label: { en: 'Application ID', regional: 'Application ID' },
  },
};


const hi: Dictionary = {
  login: {
    title: { en: 'Verify Your Mobile', regional: 'अपना मोबाइल सत्यापित करें' },
    description: { en: "We'll send a one-time password (OTP) to your mobile number to get started.", regional: 'शुरू करने के लिए हम आपके मोबाइल नंबर पर एक बार का पासवर्ड (OTP) भेजेंगे।' },
    mobile_label: { en: 'Mobile Number', regional: 'मोबाइल नंबर' },
    mobile_placeholder: { en: 'Enter 10-digit mobile number', regional: '10 अंकों का मोबाइल नंबर दर्ज करें' },
    button_text: { en: 'Get OTP', regional: 'OTP प्राप्त करें' },
    otp_sent_title: { en: 'OTP Sent', regional: 'OTP भेजा गया' },
    otp_sent_description: { en: 'An OTP has been sent to', regional: 'एक OTP भेजा गया है' },
  },
  otp_verify: {
    title: { en: 'Enter OTP', regional: 'OTP दर्ज करें' },
    description: { en: 'An OTP has been sent to +91 <mobile>.', regional: '+91 <mobile> पर एक OTP भेजा गया है।' },
    otp_label: { en: '6-Digit OTP', regional: '6-अंकीय OTP' },
    otp_placeholder: { en: '123456', regional: '१२३४५६' },
    button_text: { en: 'Verify OTP', regional: 'OTP सत्यापित करें' },
    resend_button: { en: 'Resend OTP', regional: 'पुनः OTP भेजें' },
    resent_toast: { en: 'OTP Resent', regional: 'OTP पुनः भेजा गया' },
    success_title: { en: 'Verification Successful', regional: 'सत्यापन सफल' },
    success_description: { en: 'You have been successfully verified.', regional: 'आपका सफलतापूर्वक सत्यापन हो गया है।' },
    failure_title: { en: 'Verification Failed', regional: 'सत्यापन विफल' },
    failure_description: { en: 'An unexpected error occurred.', regional: 'एक अप्रत्याशित त्रुटि हुई।' },
    invalid_otp_title: { en: 'Invalid OTP', regional: 'अमान्य OTP' },
    invalid_otp_description: { en: 'The OTP you entered is incorrect. Please try again.', regional: 'आपके द्वारा दर्ज किया गया OTP गलत है। कृपया पुनः प्रयास करें।' },
  },
  consent: {
    title: { en: 'Consent Hub', regional: 'सहमति हब' },
    description: { en: 'As per RBI guidelines, we need your explicit consent for the following data processing activities.', regional: 'RBI दिशानिर्देशों के अनुसार, हमें निम्नलिखित डेटा प्रसंस्करण गतिविधियों के लिए आपकी स्पष्ट सहमति की आवश्यकता है।' },
    items: {
      PAN_VERIFICATION: { en: 'I consent to verification of my PAN from issuing authority/NSDL.', regional: 'मैं जारीकर्ता प्राधिकरण/NSDL से अपने पैन के सत्यापन के लिए सहमति देता/देती हूं।' },
      AADHAAR_AUTH: { en: 'I consent to Aadhaar OTP-based offline verification / e-KYC through authorized partners.', regional: 'मैं अधिकृत भागीदारों के माध्यम से आधार ओटीपी-आधारित ऑफ़लाइन सत्यापन / ई-केवाईसी के लिए सहमति देता/देती हूं।' },
      DIGILOCKER_KYC: { en: 'I consent to fetch KYC documents from DigiLocker using my DigiLocker account.', regional: 'मैं अपने डिजिलॉकर खाते का उपयोग करके डिजिलॉकर से केवाईसी दस्तावेज प्राप्त करने के लिए सहमति देता/देती हूं।' },
      BUREAU_PULL: { en: 'I consent to pull my credit report from credit bureaus for the purpose of this loan.', regional: 'मैं इस ऋण के उद्देश्य से क्रेडिट ब्यूरो से अपनी क्रेडिट रिपोर्ट खींचने के लिए सहमति देता/देती हूं।' },
      BANK_VERIFICATION: { en: 'I consent to verification of my bank account and registration of e-mandate for EMI debit.', regional: 'मैं ईएमआई डेबिट के लिए अपने बैंक खाते के सत्यापन और ई-जनादेश के पंजीकरण के लिए सहमति देता/देती हूं।' },
      DATA_SHARING: { en: 'I consent to processing of my data by the NBFC/BANK (RE) and its authorized service providers, in line with RBI digital lending guidelines.', regional: 'मैं RBI डिजिटल ऋण दिशानिर्देशों के अनुरूप, NBFC/BANK (RE) और उसके अधिकृत सेवा प्रदाताओं द्वारा मेरे डेटा के प्रसंस्करण के लिए सहमति देता/देती हूं।' },
      AGREE_NOTICE: { en: 'I have read and agree to these consents and the privacy notice.', regional: 'मैंने इन सहमतियों और गोपनीयता नोटिस को पढ़ लिया है और मैं इससे सहमत हूं।' },
    },
    agree_notice_text: { en: 'By checking the boxes above and clicking "Accept & Continue", I, the applicant, hereby provide my explicit consent to LoanSwift (the LSP) and its partner FairFinance NBFC (the RE) to access, process, and store my personal and financial information for the purpose of this loan application. This includes sharing data with credit bureaus (e.g., CIBIL), and using third-party services for PAN, Aadhaar, and bank account verification. This consent is voluntary and can be revoked as per the terms outlined in our privacy policy.', regional: 'ऊपर दिए गए बक्सों को चेक करके और "स्वीकार करें और जारी रखें" पर क्लिक करके, मैं, आवेदक, लोनस्विफ्ट (एलएसपी) और उसके सहयोगी फेयरफाइनेंस एनबीएफसी (आरई) को इस ऋण आवेदन के उद्देश्य से मेरी व्यक्तिगत और वित्तीय जानकारी तक पहुंचने, संसाधित करने और संग्रहीत करने के लिए अपनी स्पष्ट सहमति प्रदान करता/करती हूं। इसमें क्रेडिट ब्यूरो (जैसे, सिबिल) के साथ डेटा साझा करना और पैन, आधार और बैंक खाता सत्यापन के लिए तीसरे पक्ष की सेवाओं का उपयोग करना शामिल है। यह सहमति स्वैच्छिक है और हमारी गोपनीयता नीति में उल्लिखित शर्तों के अनुसार इसे रद्द किया जा सकता है।' },
    accept_button: { en: 'Accept & Continue', regional: 'स्वीकार करें और जारी रखें' },
    all_consents_required: { en: 'You must accept all consents to proceed.', regional: 'आगे बढ़ने के लिए आपको सभी सहमतियों को स्वीकार करना होगा।' },
  },
  personal_details: {
    title: { en: 'Personal Details', regional: 'व्यक्तिगत विवरण' },
    full_name_label: { en: 'Full Name (as per PAN)', regional: 'पूरा नाम (पैन के अनुसार)' },
    full_name_placeholder: { en: 'John Doe', regional: 'जॉन डो' },
    pan_label: { en: 'PAN Number', regional: 'पैन नंबर' },
    pan_placeholder: { en: 'ABCDE1234F', regional: 'ABCDE1234F' },
    dob_label: { en: 'Date of Birth', regional: 'जन्म तिथि' },
    dob_placeholder: { en: 'Select your Date of Birth', regional: 'अपनी जन्म तिथि चुनें' },
    employment_label: { en: 'Employment Type', regional: 'रोजगार का प्रकार' },
    employment_placeholder: { en: 'Select your employment type', regional: 'अपने रोजगार का प्रकार चुनें' },
    income_label: { en: 'Monthly Net Income (₹)', regional: 'मासिक शुद्ध आय (₹)' },
    income_placeholder: { en: '40000', regional: '40000' },
    loan_amount_label: { en: 'Loan Amount Required (₹)', regional: 'आवश्यक ऋण राशि (₹)' },
    loan_amount_placeholder: { en: '100000', regional: '100000' },
    address_label: { en: 'Current Address', regional: 'वर्तमान पता' },
    address_placeholder: { en: 'Address Line', regional: 'पता पंक्ति' },
    city_placeholder: { en: 'City', regional: 'शहर' },
    pincode_placeholder: { en: 'Pincode', regional: 'पिनकोड' },
    consent_label: { en: 'Explicit Consent', regional: 'स्पष्ट सहमति' },
    consent_description: { en: 'I hereby consent to LoanSwift fetching my credit information and other details for the purpose of this loan application.', regional: 'मैं इस ऋण आवेदन के प्रयोजन के लिए लोनस्विफ्ट द्वारा मेरी क्रेडिट जानकारी और अन्य विवरण प्राप्त करने के लिए अपनी सहमति देता/देती हूं।' },
    save_button: { en: 'Save and Continue', regional: 'सहेजें और जारी रखें' },
  },
   kyc: {
    pan_title: { en: 'PAN Verification', regional: 'पैन सत्यापन' },
    pan_description: { en: 'Pre-filled based on earlier details. Please review and edit if required.', regional: 'पहले के विवरण के आधार पर पहले से भरा हुआ। कृपया समीक्षा करें और यदि आवश्यक हो तो संपादित करें।' },
    pan_verified_title: { en: 'PAN Verified', regional: 'पैन सत्यापित' },
    pan_verified_description: { en: 'Your PAN has been successfully verified.', regional: 'आपका पैन सफलतापूर्वक सत्यापित हो गया है।' },
    pan_button: { en: 'Verify PAN', regional: 'पैन सत्यापित करें' },
    aadhaar_title: { en: 'Aadhaar e-KYC', regional: 'आधार ई-केवाईसी' },
    aadhaar_description: { en: 'Enter your Aadhaar to perform e-KYC via OTP.', regional: 'OTP के माध्यम से ई-केवाईसी करने के लिए अपना आधार दर्ज करें।' },
    aadhaar_verified_title: { en: 'Aadhaar Verified', regional: 'आधार सत्यापित' },
    aadhaar_verified_description: { en: 'Your Aadhaar e-KYC is complete.', regional: 'आपका आधार ई-केवाईसी पूरा हो गया है।' },
    aadhaar_label: { en: 'Aadhaar Number', regional: 'आधार संख्या' },
    aadhaar_placeholder: { en: '1234 5678 9012', regional: '१२३४ ५६७८ ९०१२' },
    send_otp_button: { en: 'Send OTP', regional: 'OTP भेजें' },
    otp_label: { en: 'Enter OTP', regional: 'OTP दर्ज करें' },
    otp_placeholder: { en: 'Enter 6-digit OTP (123456)', regional: '6-अंकीय OTP दर्ज करें (१२३४५६)' },
    verify_otp_button: { en: 'Verify OTP', regional: 'OTP सत्यापित करें' },
    continue_button: { en: 'Continue to Document Verification', regional: 'दस्तावेज़ सत्यापन के लिए जारी रखें' },
  },
  doc_verification: {
    digilocker_title: { en: 'Option 1: Use DigiLocker', regional: 'विकल्प 1: डिजिलॉकर का उपयोग करें' },
    digilocker_description: { en: 'Fetch your Aadhaar and PAN instantly for faster processing.', regional: 'तेजी से प्रसंस्करण के लिए तुरंत अपना आधार और पैन प्राप्त करें।' },
    digilocker_button: { en: 'Connect to DigiLocker', regional: 'डिजिलॉकर से कनेक्ट करें' },
    manual_title: { en: 'Option 2: Manual Upload', regional: 'विकल्प 2: मैनुअल अपलोड' },
    manual_description: { en: "Upload your documents manually. We'll use OCR to verify them.", regional: 'अपने दस्तावेज़ मैन्युअल रूप से अपलोड करें। हम उन्हें सत्यापित करने के लिए ओसीआर का उपयोग करेंगे।' },
    upload_button: { en: 'Upload', regional: 'अपलोड' },
    verifying_toast: { en: 'uploading and verifying...', regional: 'अपलोड और सत्यापन हो रहा है...' },
    verified_toast: { en: 'Verified', regional: 'सत्यापित' },
    upload_pending_badge: { en: 'Pending', regional: 'लंबित' },
    upload_uploaded_badge: { en: 'Uploaded, Verifying...', regional: 'अपलोड किया गया, सत्यापन हो रहा है...' },
    upload_verified_ocr_badge: { en: 'Verified via OCR', regional: 'ओसीआर के माध्यम से सत्यापित' },
    upload_verified_digital_badge: { en: 'Digitally Verified', regional: 'डिजिटल रूप से सत्यापित' },
    continue_button: { en: 'Continue to Eligibility', regional: 'पात्रता के लिए जारी रखें' },
    digilocker_modal_title: { en: 'Share Documents from DigiLocker', regional: 'डिजिलॉकर से दस्तावेज़ साझा करें' },
    digilocker_modal_description: { en: 'Select the documents you want to share for KYC verification.', regional: 'केवाईसी सत्यापन के लिए आप जो दस्तावेज़ साझा करना चाहते हैं उन्हें चुनें।' },
    digilocker_modal_share_button: { en: 'Share Selected Documents', regional: 'चयनित दस्तावेज़ साझा करें' },
    processing_title: { en: 'Verifying Documents & Checking Credit...', regional: 'दस्तावेज़ों का सत्यापन और क्रेडिट की जाँच हो रही है...' },
    processing_description: { en: 'Please wait while we securely process your information.', regional: 'कृपया प्रतीक्षा करें जब तक हम आपकी जानकारी को सुरक्षित रूप से संसाधित करते हैं।' },
    summary_title: { en: 'KYC Matching Summary', regional: 'केवाईसी मिलान सारांश' },
    summary_description: { en: "We've matched your provided details against your verified documents. Aadhaar is the primary source of truth.", regional: 'हमने आपके द्वारा प्रदान किए गए विवरणों को आपके सत्यापित दस्तावेज़ों के विरुद्ध मिलाया है। आधार सत्य का प्राथमिक स्रोत है।' },
    summary_name_label: { en: 'Full Name', regional: 'पूरा नाम' },
    summary_dob_label: { en: 'Date of Birth', regional: 'जन्म तिथि' },
    summary_address_label: { en: 'Address', regional: 'पता' },
    summary_pan_label: { en: 'PAN', regional: 'पैन' },
    summary_match_badge: { en: 'Matches Aadhaar', regional: 'आधार से मेल खाता है' },
    summary_mismatch_badge: { en: 'Does Not Match', regional: 'मेल नहीं खाता' },
    summary_partial_match_badge: { en: 'Partial Match', regional: 'आंशिक मेल' },
  },
  eligibility: {
    rejected_title: { en: 'Application Not Approved', regional: 'आवेदन स्वीकृत नहीं' },
    rejected_description: { en: 'We are unable to proceed with your loan application at this time based on our current lending policies.', regional: 'हमारी वर्तमान ऋण नीतियों के आधार पर हम इस समय आपके ऋण आवेदन के साथ आगे बढ़ने में असमर्थ हैं।' },
    back_home_button: { en: 'Back to Home', regional: 'होम पर वापस जाएं' },
    finalizing_title: { en: 'Finalizing Eligibility...', regional: 'पात्रता को अंतिम रूप दिया जा रहा है...' },
    finalizing_description: { en: 'This should only take a moment.', regional: 'इसमें केवल एक क्षण लगना चाहिए।' },
    report_summary_title: { en: 'Your Credit Report Summary', regional: 'आपकी क्रेडिट रिपोर्ट का सारांश' },
    score_band_excellent: { en: 'Excellent', regional: 'उत्कृष्ट' },
    score_band_good: { en: 'Good', regional: 'अच्छा' },
    score_band_fair: { en: 'Fair', regional: 'ठीक' },
    score_band_poor: { en: 'Poor', regional: 'खराब' },
    cibil_score_label: { en: 'CIBIL Score', regional: 'सिबिल स्कोर' },
    active_loans_label: { en: 'Active Loans', regional: 'सक्रिय ऋण' },
    overdue_label: { en: 'Overdue', regional: 'अतिदेय' },
    enquiries_label: { en: 'Recent Enquiries', regional: 'हाल की पूछताछ' },
    upsell_title: { en: 'Great News!', regional: 'खुशखबरी!' },
    upsell_description: { en: "You applied for <requested>, but you're eligible for up to <eligible>.", regional: 'आपने <requested> के लिए आवेदन किया था, लेकिन आप <eligible> तक के लिए पात्र हैं।' },
    select_amount_label: { en: 'Select Your Loan Amount', regional: 'अपनी ऋण राशि चुनें' },
    recommended_badge: { en: 'Recommended', regional: 'अनुशंसित' },
    lower_amount_requested: { en: "You applied for: {amount}", regional: "आपने इसके लिए आवेदन किया: {amount}" },
    lower_amount_approved: { en: "Based on your profile, the approved loan amount is:", regional: "आपकी प्रोफ़ाइल के आधार पर, स्वीकृत ऋण राशि है:" },
    lower_amount_reason: { en: "This amount is approved based on your credit profile and repayment capacity.", regional: "यह राशि आपकी क्रेडिट प्रोफ़ाइल और चुकौती क्षमता के आधार पर स्वीकृत की गई है।" },
    lower_amount_accept_button: { en: "Continue with {amount}", regional: "{amount} के साथ जारी रखें" },
    lower_amount_decline_button: { en: "I do not wish to continue", regional: "मैं जारी नहीं रखना चाहता/चाहती" },
    assisted_journey_title: { en: "Assisted Journey", regional: "सहायता प्राप्त यात्रा" },
    assisted_journey_description: { en: "Your loan application has been successfully reviewed.\n\nWe noticed that the auto debit setup could not be completed digitally. Our relationship manager will contact you shortly to help you complete the next steps and guide you through alternate options.\n\nThank you for choosing LoanSwift.", regional: "आपका ऋण आवेदन सफलतापूर्वक समीक्षित हो गया है।\n\nहमने देखा कि ऑटो डेबिट सेटअप डिजिटल रूप से पूरा नहीं किया जा सका। हमारे संबंध प्रबंधक अगले चरणों को पूरा करने में आपकी सहायता करने और वैकल्पिक विकल्पों के माध्यम से आपका मार्गदर्शन करने के लिए शीघ्र ही आपसे संपर्क करेंगे।\n\nलोनस्विफ्ट चुनने के लिए धन्यवाद।" },
    app_id_label: { en: 'Application ID', regional: 'आवेदन आईडी' },
    thank_you_message: { en: 'Thank you for considering LoanSwift.', regional: 'लोनस्विफ्ट पर विचार करने के लिए धन्यवाद।' },
    tenure_label: { en: 'Choose your tenure', regional: 'अपनी अवधि चुनें' },
    tenure_description: { en: 'Select a plan to see your monthly payment.', regional: 'अपना मासिक भुगतान देखने के लिए एक योजना चुनें।' },
    plan_title: { en: 'Your Selected Plan', regional: 'आपकी चयनित योजना' },
    per_month_label: { en: '/ month', regional: '/ माह' },
    for_months_label: { en: 'months', regional: 'महीने' },
    at_interest_label: { en: '% p.a.', regional: '% प्रति वर्ष' },
    schedule_preview_title: { en: 'Payment Schedule Preview', regional: 'भुगतान अनुसूची पूर्वावलोकन' },
    confirm_consent_label: { en: 'I confirm that I have reviewed and chosen this loan tenure and EMI.', regional: 'मैं पुष्टि करता/करती हूं कि मैंने इस ऋण अवधि और ईएमआई की समीक्षा की है और चुना है।' },
    confirm_button: { en: 'Confirm Loan Amount & Continue', regional: 'ऋण राशि की पुष्टि करें और जारी रखें' },
    validation_message: { en: 'Please select a tenure and confirm your choice to proceed.', regional: 'आगे बढ़ने के लिए कृपया एक अवधि चुनें और अपनी पसंद की पुष्टि करें।' },
    approved_amount_label: { en: 'Approved Loan Amount', regional: 'स्वीकृत ऋण राशि' },
  },
  kfs: {
    title: { en: 'Your Loan Offer Summary', regional: 'आपके ऋण प्रस्ताव का सारांश' },
    description: { en: 'Please review and accept your final loan details.', regional: 'कृपया अपने अंतिम ऋण विवरण की समीक्षा करें और स्वीकार करें।' },
    kfs_title: { en: 'Key Facts Statement', regional: 'मुख्य तथ्य विवरण' },
    kfs_description: { en: 'This document summarizes all terms of your loan offer.', regional: 'यह दस्तावेज़ आपके ऋण प्रस्ताव की सभी शर्तों का सारांश प्रस्तुत करता है।' },
    loan_amount: { en: 'Loan Amount', regional: 'ऋण राशि' },
    processing_fee: { en: 'Processing Fee (2%)', regional: 'प्रसंस्करण शुल्क (2%)' },
    net_disbursed: { en: 'Net Disbursed Amount', regional: 'शुद्ध वितरित राशि' },
    monthly_emi: { en: 'Monthly EMI', regional: 'मासिक ईएमआई' },
    total_repayment: { en: 'Total Repayment', regional: 'कुल चुकौती' },
    view_kfs_button: { en: 'View Detailed Key Facts Statement (KFS)', regional: 'विस्तृत मुख्य तथ्य विवरण (KFS) देखें' },
    accept_consent: { en: 'I have read and understood the Key Facts Statement and accept the loan offer.', regional: 'मैंने मुख्य तथ्य विवरण को पढ़ और समझ लिया है और ऋण प्रस्ताव स्वीकार करता/करती हूं।' },
    accept_button: { en: 'Accept Offer & Continue', regional: 'प्रस्ताव स्वीकार करें और जारी रखें' },
  },
  sanction_letter: {
    title: { en: 'Loan Sanction Letter', regional: 'ऋण स्वीकृति पत्र' },
    description: { en: 'Subject to terms and conditions.', regional: 'नियम और शर्तें लागू' },
    borrower_details: { en: 'Borrower Details', regional: 'उधारकर्ता विवरण' },
    borrower_name: { en: 'Borrower Name', regional: 'उधारकर्ता का नाम' },
    app_id: { en: 'Application ID', regional: 'आवेदन आईडी' },
    pan: { en: 'PAN', regional: 'पैन' },
    sanction_date: { en: 'Date of Sanction', regional: 'स्वीकृति की तारीख' },
    loan_details: { en: 'Loan Details', regional: 'ऋण विवरण' },
    sanctioned_amount: { en: 'Sanctioned Amount', regional: 'स्वीकृत राशि' },
    loan_type: { en: 'Loan Type', regional: 'ऋण का प्रकार' },
    tenure: { en: 'Tenure', regional: 'अवधि' },
    interest_rate: { en: 'Interest Rate', regional: 'ब्याज दर' },
    emi_amount: { en: 'EMI Amount', regional: 'ईएमआई राशि' },
    emi_start_date: { en: 'EMI Start Date', regional: 'ईएमआई प्रारंभ तिथि' },
    fees_disbursal: { en: 'Fees & Disbursal', regional: 'शुल्क और संवितरण' },
    processing_fee: { en: 'Processing Fee (2%)', regional: 'प्रसंस्करण शुल्क (2%)' },
    gst: { en: 'GST (18%)', regional: 'जीएसटी (18%)' },
    net_disbursal: { en: 'Net Disbursal Amount', regional: 'शुद्ध संवितरण राशि' },
    key_terms: { en: 'Key Terms', regional: 'मुख्य शर्तें' },
    term1: { en: 'Sanction is subject to successful e-Mandate registration.', regional: 'स्वीकृति सफल ई-जनादेश पंजीकरण के अधीन है।' },
    term2: { en: 'Loan is subject to execution of final loan agreement.', regional: 'ऋण अंतिम ऋण समझौते के निष्पादन के अधीन है।' },
    term3: { en: 'You may cancel the loan before disbursement.', regional: 'आप संवितरण से पहले ऋण रद्द कर सकते हैं।' },
    lender_disclosure1: { en: 'Loan provided by FairFinance NBFC (Regulated Entity - RE).', regional: 'फेयरफाइनेंस एनबीएफसी (विनियमित इकाई - आरई) द्वारा प्रदान किया गया ऋण।' },
    lender_disclosure2: { en: 'Loan facilitated by LoanSwift (Lending Service Provider - LSP).', regional: 'लोनस्विफ्ट (उधार सेवा प्रदाता - एलएसपी) द्वारा सुगम ऋण।' },
    lender_disclosure3: { en: 'Grievance Contact', regional: 'शिकायत संपर्क' },
    accept_button: { en: 'Accept & e-Sign', regional: 'स्वीकार करें और ई-साइन करें' },
    decline_button: { en: 'Do Not Accept', regional: 'स्वीकार न करें' },
    decline_title: { en: 'Application Paused', regional: 'आवेदन रोका गया' },
    decline_description: { en: 'Your application ID is <ID>. Our relationship manager will contact you shortly to assist you further or clarify any questions.', regional: 'आपकी आवेदन आईडी <ID> है। हमारे संबंध प्रबंधक जल्द ही आपसे संपर्क करेंगे ताकि आपकी आगे सहायता कर सकें या किसी भी प्रश्न का समाधान कर सकें।' },
    support_contact: { en: 'You can also reach us at support@loanswift.com', regional: 'आप हमें support@loanswift.com पर भी संपर्क कर सकते हैं' },
    esign_title: { en: 'e-Sign Sanction Letter', regional: 'स्वीकृति पत्र ई-साइन करें' },
    esign_description: { en: 'Enter the OTP sent to your Aadhaar-linked mobile number to sign.', regional: 'हस्ताक्षर करने के लिए अपने आधार-लिंक्ड मोबाइल नंबर पर भेजा गया ओटीपी दर्ज करें।' },
    otp_label: { en: 'Enter 6-digit OTP', regional: '6-अंकीय ओटीपी दर्ज करें' },
    esign_button: { en: 'Verify & e-Sign', regional: 'सत्यापित करें और ई-साइन करें' },
  },
  e_mandate: {
    title: { en: 'e-Mandate for Repayments', regional: 'चुकौती के लिए ई-जनादेश' },
    description: { en: 'To automate your monthly EMI payments, please set up an e-mandate. This is a secure process handled by your bank.', regional: 'अपने मासिक ईएमआई भुगतानों को स्वचालित करने के लिए, कृपया एक ई-जनादेश स्थापित करें। यह आपके बैंक द्वारा नियंत्रित एक सुरक्षित प्रक्रिया है।' },
    mandate_details_title: { en: 'Mandate Details', regional: 'जनादेश विवरण' },
    account_label: { en: 'Account', regional: 'खाता' },
    emi_amount_label: { en: 'EMI Amount', regional: 'ईएमआई राशि' },
    frequency_label: { en: 'Frequency', regional: 'आवृत्ति' },
    start_date_label: { en: 'First Debit', regional: 'पहली कटौती' },
    setup_button: { en: 'Set up Auto Debit', regional: 'ऑटो डेबिट सेट करें' },
    setup_button_pending: { en: 'Redirecting to bank...', regional: 'बैंक को पुनः निर्देशित किया जा रहा है...' },
    unable_button: { en: 'I am unable to set up auto debit', regional: 'मैं ऑटो डेबिट सेट करने में असमर्थ हूं' },
    success_title: { en: 'e-Mandate Registered', regional: 'ई-जनादेश पंजीकृत' },
    success_description: { en: 'Auto-debit has been set up for your EMIs.', regional: 'आपके ईएमआई के लिए ऑटो-डेबिट सेट कर दिया गया है।' },
    unable_title: { en: 'Assisted Journey Required', regional: 'सहायता प्राप्त यात्रा आवश्यक' },
    unable_description: { en: 'Your loan application has been successfully reviewed. We noticed that the auto debit setup could not be completed digitally. Our relationship manager will contact you shortly to help you complete the next steps and guide you through alternate options.', regional: 'आपका ऋण आवेदन सफलतापूर्वक समीक्षित हो गया है। हमने देखा कि ऑटो डेबिट सेटअप डिजिटल रूप से पूरा नहीं किया जा सका। हमारे संबंध प्रबंधक अगले चरणों को पूरा करने में आपकी सहायता करने और वैकल्पिक विकल्पों के माध्यम से आपका मार्गदर्शन करने के लिए शीघ्र ही आपसे संपर्क करेंगे।' },
    app_id: { en: 'Application ID', regional: 'आवेदन आईडी' },
    sanctioned_amount: { en: 'Approved Loan Amount', regional: 'स्वीकृत ऋण राशि' },
    support_contact: { en: 'Thank you for choosing LoanSwift.', regional: 'लोनस्विफ्ट चुनने के लिए धन्यवाद।' },
  },
  agreement: {
    title: { en: 'Digital Loan Agreement (e-Sign)', regional: 'डिजिटल ऋण समझौता (ई-हस्ताक्षर)' },
    description: { en: 'Review the terms and sign the agreement using an Aadhaar-based OTP.', regional: 'शर्तों की समीक्षा करें और आधार-आधारित ओटीपी का उपयोग करके समझौते पर हस्ताक्षर करें।' },
    borrower_details: { en: 'Borrower Details', regional: 'उधारकर्ता का विवरण' },
    borrower_name: { en: 'Borrower Name', regional: 'उधारकर्ता का नाम' },
    app_id: { en: 'Application ID', regional: 'आवेदन आईडी' },
    pan: { en: 'PAN', regional: 'पैन' },
    loan_details: { en: 'Loan Details', regional: 'ऋण विवरण' },
    sanctioned_amount: { en: 'Sanctioned Amount', regional: 'स्वीकृत राशि' },
    tenure: { en: 'Tenure', regional: 'अवधि' },
    interest_rate: { en: 'Interest Rate', regional: 'ब्याज दर' },
    fees_disbursal: { en: 'Fees & Charges', regional: 'शुल्क और शुल्क' },
    processing_fee: { en: 'Processing Fee (2%)', regional: 'प्रसंस्करण शुल्क (2%)' },
    gst: { en: 'GST (18%) on Fee', regional: 'शुल्क पर जीएसटी (18%)' },
    net_disbursal: { en: 'Net Disbursal Amount', regional: 'शुद्ध संवितरण राशि' },
    repayment_terms: { en: 'Repayment Terms', regional: 'चुकौती की शर्तें' },
    emi_amount: { en: 'EMI Amount', regional: 'ईएमआई राशि' },
    emi_start_date: { en: 'EMI Start Date', regional: 'ईएमआई प्रारंभ तिथि' },
    repayment_mode: { en: 'Repayment Mode', regional: 'चुकौती मोड' },
    legal_disclosure: { en: 'Legal & Regulatory Disclosures', regional: 'कानूनी और नियामक प्रकटीकरण' },
    lender_disclosure1: { en: 'Loan provided by FairFinance NBFC (Regulated Entity - RE).', regional: 'फेयरफाइनेंस एनबीएफसी (विनियमित इकाई - आरई) द्वारा प्रदान किया गया ऋण।' },
    lender_disclosure2: { en: 'Loan facilitated by LoanSwift (Lending Service Provider - LSP).', regional: 'लोनस्विफ्ट (उधार सेवा प्रदाता - एलएसपी) द्वारा सुगम ऋण।' },
    lender_disclosure3: { en: 'Grievance Contact', regional: 'शिकायत संपर्क' },
    declaration_title: { en: 'Declaration & Consent', regional: 'घोषणा और सहमति' },
    declaration_content: { en: 'I have read, understood, and agree to the terms and conditions of this loan agreement.', regional: 'मैंने इस ऋण समझौते के नियमों और शर्तों को पढ़, समझ लिया है और उनसे सहमत हूं।' },
    sign_button: { en: 'Sign via Aadhaar OTP', regional: 'आधार ओटीपी के माध्यम से हस्ताक्षर करें' },
    otp_label: { en: 'Enter OTP sent to your Aadhaar-linked mobile', regional: 'अपने आधार-लिंक्ड मोबाइल पर भेजा गया ओटीपी दर्ज करें' },
    otp_placeholder: { en: 'Enter 6-digit OTP', regional: '6-अंकीय ओटीपी दर्ज करें' },
    verify_button: { en: 'Verify & e-Sign', regional: 'सत्यापित करें और ई-हस्ताक्षर करें' },
  },
  disbursement: {
    success_title: { en: 'Disbursement Initiated', regional: 'संवितरण शुरू किया गया' },
    processing_message: { en: 'Your loan request has been successfully processed.', regional: 'आपका ऋण अनुरोध सफलतापूर्वक संसाधित हो गया है।' },
    credited_soon_message: { en: 'The approved amount will be credited to your bank account shortly (within 10-15 minutes).', regional: 'स्वीकृत राशि शीघ्र ही (10-15 मिनट के भीतर) आपके बैंक खाते में जमा कर दी जाएगी।' },
    details_title: { en: 'Disbursement Details', regional: 'संवितरण विवरण' },
    amount_label: { en: 'Amount:', regional: 'राशि:' },
    account_label: { en: 'Bank Account:', regional: 'बैंक खाता:' },
    ref_label: { en: 'Transaction Ref:', regional: 'लेन-देन संदर्भ:' },
    back_to_dashboard_button: { en: 'Back to Dashboard', regional: 'डैशबोर्ड पर वापस जाएं' },
    ready_title: { en: 'Ready for Disbursement', regional: 'संवितरण के लिए तैयार' },
    ready_description: { en: 'All formalities are complete. Please confirm to receive the net loan amount in your verified bank account.', regional: 'सभी औपचारिकताएं पूरी हो चुकी हैं। कृपया अपने सत्यापित बैंक खाते में शुद्ध ऋण राशि प्राप्त करने की पुष्टि करें।' },
    final_disbursement_title: { en: 'Final Disbursement', regional: 'अंतिम संवितरण' },
    net_amount_label: { en: 'Net Amount to be Credited:', regional: 'जमा की जाने वाली शुद्ध राशि:' },
    to_account_label: { en: 'To Account:', regional: 'खाते में:' },
    timeline_label: { en: 'Timeline:', regional: 'समयरेखा:' },
    timeline_value: { en: '10-15 mins', regional: '10-15 मिनट' },
    confirm_disbursement_button: { en: 'Confirm & Proceed', regional: 'पुष्टि करें और आगे बढ़ें' },
    not_ready_button: { en: 'I am not ready to proceed', regional: 'मैं आगे बढ़ने के लिए तैयार नहीं हूं' },
    initiate_button: { en: 'Initiate Disbursement', regional: 'संवितरण आरंभ करें' },
    processing_button: { en: 'Processing Disbursement...', regional: 'संवितरण संसाधित हो रहा है...' },
    assisted_title: { en: 'Application Paused', regional: 'आवेदन रोका गया' },
    assisted_description: { en: 'Your loan application is almost complete. If you need more time or assistance before disbursement, our relationship manager will contact you shortly to guide you further.', regional: 'आपका ऋण आवेदन लगभग पूरा हो गया है। यदि आपको संवितरण से पहले अधिक समय या सहायता की आवश्यकता है, तो हमारे संबंध प्रबंधक आपको आगे मार्गदर्शन करने के लिए शीघ्र ही आपसे संपर्क करेंगे।' },
    app_id_label: { en: 'Application ID', regional: 'आवेदन आईडी' },
  },
};


const mr: Dictionary = {
  login: {
    title: { en: 'Verify Your Mobile', regional: 'तुमचा मोबाईल सत्यापित करा' },
    description: { en: "We'll send a one-time password (OTP) to your mobile number to get started.", regional: 'सुरुवात करण्यासाठी आम्ही तुमच्या मोबाइल नंबरवर एक-वेळचा पासवर्ड (OTP) पाठवू.' },
    mobile_label: { en: 'Mobile Number', regional: 'मोबाइल नंबर' },
    mobile_placeholder: { en: 'Enter 10-digit mobile number', regional: '१०-अंकी मोबाइल नंबर प्रविष्ट करा' },
    button_text: { en: 'Get OTP', regional: 'OTP मिळवा' },
    otp_sent_title: { en: 'OTP Sent', regional: 'OTP पाठवला' },
    otp_sent_description: { en: 'An OTP has been sent to', regional: 'एक OTP पाठवण्यात आला आहे' },
  },
  otp_verify: {
    title: { en: 'Enter OTP', regional: 'OTP प्रविष्ट करा' },
    description: { en: 'An OTP has been sent to +91 <mobile>.', regional: '+९१ <mobile> वर एक OTP पाठवण्यात आला आहे.' },
    otp_label: { en: '6-Digit OTP', regional: '६-अंकी OTP' },
    otp_placeholder: { en: '123456', regional: '१२३४५६' },
    button_text: { en: 'Verify OTP', regional: 'OTP सत्यापित करा' },
    resend_button: { en: 'Resend OTP', regional: 'पुन्हा OTP पाठवा' },
    resent_toast: { en: 'OTP Resent', regional: 'OTP पुन्हा पाठवला' },
    success_title: { en: 'Verification Successful', regional: 'सत्यापन यशस्वी' },
    success_description: { en: 'You have been successfully verified.', regional: 'तुम्ही यशस्वीरित्या सत्यापित झाला आहात.' },
    failure_title: { en: 'Verification Failed', regional: 'सत्यापन अयशस्वी' },
    failure_description: { en: 'An unexpected error occurred.', regional: 'एक अनपेक्षित त्रुटी आली.' },
    invalid_otp_title: { en: 'Invalid OTP', regional: 'अवैध OTP' },
    invalid_otp_description: { en: 'The OTP you entered is incorrect. Please try again.', regional: 'तुम्ही प्रविष्ट केलेला OTP चुकीचा आहे. कृपया पुन्हा प्रयत्न करा.' },
  },
  consent: {
    title: { en: 'Consent Hub', regional: 'संमती केंद्र' },
    description: { en: 'As per RBI guidelines, we need your explicit consent for the following data processing activities.', regional: 'RBI मार्गदर्शक तत्त्वांनुसार, आम्हाला खालील डेटा प्रक्रिया क्रियाकलापांसाठी तुमची स्पष्ट संमती आवश्यक आहे.' },
    items: {
        PAN_VERIFICATION: { en: 'I consent to verification of my PAN from issuing authority/NSDL.', regional: 'मी जारी करणाऱ्या प्राधिकरणाकडून/NSDL कडून माझ्या पॅनच्या पडताळणीसाठी संमती देतो/देते.' },
        AADHAAR_AUTH: { en: 'I consent to Aadhaar OTP-based offline verification / e-KYC through authorized partners.', regional: 'मी अधिकृत भागीदारांमार्फत आधार ओटीपी-आधारित ऑफलाइन पडताळणी / ई-केवायसीसाठी संमती देतो/देते.' },
        DIGILOCKER_KYC: { en: 'I consent to fetch KYC documents from DigiLocker using my DigiLocker account.', regional: 'मी माझे डिजिलॉकर खाते वापरून डिजिलॉकरमधून केवायसी दस्तऐवज मिळवण्यासाठी संमती देतो/देते.' },
        BUREAU_PULL: { en: 'I consent to pull my credit report from credit bureaus for the purpose of this loan.', regional: 'मी या कर्जाच्या उद्देशाने क्रेडिट ब्युरोमधून माझा क्रेडिट रिपोर्ट काढण्यासाठी संमती देतो/देते.' },
        BANK_VERIFICATION: { en: 'I consent to verification of my bank account and registration of e-mandate for EMI debit.', regional: 'मी माझ्या बँक खात्याची पडताळणी आणि ईएमआय डेबिटसाठी ई-मँडेटच्या नोंदणीसाठी संमती देतो/देते.' },
        DATA_SHARING: { en: 'I consent to processing of my data by the NBFC/BANK (RE) and its authorized service providers, in line with RBI digital lending guidelines.', regional: 'मी NBFC/BANK (RE) आणि त्याच्या अधिकृत सेवा प्रदात्यांद्वारे माझ्या डेटावर प्रक्रिया करण्यास, RBI डिजिटल कर्ज मार्गदर्शक तत्त्वांनुसार संमती देतो/देते.' },
        AGREE_NOTICE: { en: 'I have read and agree to these consents and the privacy notice.', regional: 'मी या संमती आणि गोपनीयता सूचना वाचल्या आहेत आणि मला त्या मान्य आहेत.' },
    },
    agree_notice_text: { en: 'By checking the boxes above and clicking "Accept & Continue", I, the applicant, hereby provide my explicit consent to LoanSwift (the LSP) and its partner FairFinance NBFC (the RE) to access, process, and store my personal and financial information for the purpose of this loan application. This includes sharing data with credit bureaus (e.g., CIBIL), and using third-party services for PAN, Aadhaar, and bank account verification. This consent is voluntary and can be revoked as per the terms outlined in our privacy policy.', regional: 'वरील बॉक्स चेक करून आणि "स्वीकारा आणि सुरू ठेवा" वर क्लिक करून, मी, अर्जदार, याद्वारे लोनस्विफ्ट (LSP) आणि त्याचा भागीदार फेअर फायनान्स NBFC (RE) यांना या कर्ज अर्जाच्या उद्देशाने माझी वैयक्तिक आणि आर्थिक माहिती ऍक्सेस, प्रक्रिया आणि संग्रहित करण्यासाठी माझी स्पष्ट संमती देत आहे. यामध्ये क्रेडिट ब्युरो (उदा. CIBIL) सह डेटा सामायिक करणे आणि पॅन, आधार आणि बँक खाते पडताळणीसाठी तृतीय-पक्ष सेवा वापरणे समाविष्ट आहे. ही संमती ऐच्छिक आहे आणि आमच्या गोपनीयता धोरणामध्ये नमूद केलेल्या अटींनुसार ती रद्द केली जाऊ शकते.' },
    accept_button: { en: 'Accept & Continue', regional: 'स्वीकारा आणि सुरू ठेवा' },
    all_consents_required: { en: 'You must accept all consents to proceed.', regional: 'पुढे जाण्यासाठी तुम्हाला सर्व संमती स्वीकाराव्या लागतील.' },
  },
   personal_details: {
    title: { en: 'Personal Details', regional: 'वैयक्तिक तपशील' },
    full_name_label: { en: 'Full Name (as per PAN)', regional: 'पूर्ण नाव (पॅननुसार)' },
    full_name_placeholder: { en: 'John Doe', regional: 'जॉन डो' },
    pan_label: { en: 'PAN Number', regional: 'पॅन नंबर' },
    pan_placeholder: { en: 'ABCDE1234F', regional: 'ABCDE1234F' },
    dob_label: { en: 'Date of Birth', regional: 'जन्म तारीख' },
    dob_placeholder: { en: 'Select your Date of Birth', regional: 'तुमची जन्म तारीख निवडा' },
    employment_label: { en: 'Employment Type', regional: 'रोजगाराचा प्रकार' },
    employment_placeholder: { en: 'Select your employment type', regional: 'तुमच्या रोजगाराचा प्रकार निवडा' },
    income_label: { en: 'Monthly Net Income (₹)', regional: 'मासिक निव्वळ उत्पन्न (₹)' },
    income_placeholder: { en: '40000', regional: '40000' },
    loan_amount_label: { en: 'Loan Amount Required (₹)', regional: 'आवश्यक कर्जाची रक्कम (₹)' },
    loan_amount_placeholder: { en: '100000', regional: '100000' },
    address_label: { en: 'Current Address', regional: 'वर्तमान पत्ता' },
    address_placeholder: { en: 'Address Line', regional: 'पत्त्याची ओळ' },
    city_placeholder: { en: 'City', regional: 'शहर' },
    pincode_placeholder: { en: 'Pincode', regional: 'पिनकोड' },
    consent_label: { en: 'Explicit Consent', regional: 'स्पष्ट संमती' },
    consent_description: { en: 'I hereby consent to LoanSwift fetching my credit information and other details for the purpose of this loan application.', regional: 'मी या कर्ज अर्जाच्या उद्देशाने लोनस्विफ्टला माझी क्रेडिट माहिती आणि इतर तपशील मिळवण्यासाठी याद्वारे संमती देतो.' },
    save_button: { en: 'Save and Continue', regional: 'जतन करा आणि सुरू ठेवा' },
  },
  kyc: {
    pan_title: { en: 'PAN Verification', regional: 'पॅन पडताळणी' },
    pan_description: { en: 'Pre-filled based on earlier details. Please review and edit if required.', regional: 'पूर्वीच्या तपशिलांवर आधारित पूर्व-भरलेले. कृपया पुनरावलोकन करा आणि आवश्यक असल्यास संपादित करा.' },
    pan_verified_title: { en: 'PAN Verified', regional: 'पॅन सत्यापित' },
    pan_verified_description: { en: 'Your PAN has been successfully verified.', regional: 'तुमचा पॅन यशस्वीरित्या सत्यापित झाला आहे.' },
    pan_button: { en: 'Verify PAN', regional: 'पॅन सत्यापित करा' },
    aadhaar_title: { en: 'Aadhaar e-KYC', regional: 'आधार ई-केवायसी' },
    aadhaar_description: { en: 'Enter your Aadhaar to perform e-KYC via OTP.', regional: 'OTP द्वारे ई-केवायसी करण्यासाठी तुमचा आधार प्रविष्ट करा.' },
    aadhaar_verified_title: { en: 'Aadhaar Verified', regional: 'आधार सत्यापित' },
    aadhaar_verified_description: { en: 'Your Aadhaar e-KYC is complete.', regional: 'तुमचे आधार ई-केवायसी पूर्ण झाले आहे.' },
    aadhaar_label: { en: 'Aadhaar Number', regional: 'आधार क्रमांक' },
    aadhaar_placeholder: { en: '1234 5678 9012', regional: '१२३४ ५६७८ ९०१२' },
    send_otp_button: { en: 'Send OTP', regional: 'OTP पाठवा' },
    otp_label: { en: 'Enter OTP', regional: 'OTP प्रविष्ट करा' },
    otp_placeholder: { en: 'Enter 6-digit OTP (123456)', regional: '६-अंकी OTP प्रविष्ट करा (१२३४५६)' },
    verify_otp_button: { en: 'Verify OTP', regional: 'OTP सत्यापित करा' },
    continue_button: { en: 'Continue to Document Verification', regional: 'दस्तऐवज पडताळणीसाठी सुरू ठेवा' },
  },
  doc_verification: {
    digilocker_title: { en: 'Option 1: Use DigiLocker', regional: 'पर्याय १: डिजिलॉकर वापरा' },
    digilocker_description: { en: 'Fetch your Aadhaar and PAN instantly for faster processing.', regional: 'जलद प्रक्रियेसाठी तुमचा आधार आणि पॅन त्वरित मिळवा.' },
    digilocker_button: { en: 'Connect to DigiLocker', regional: 'डिजिलॉकरशी कनेक्ट करा' },
    manual_title: { en: 'Option 2: Manual Upload', regional: 'पर्याय २: मॅन्युअल अपलोड' },
    manual_description: { en: "Upload your documents manually. We'll use OCR to verify them.", regional: 'तुमचे दस्तऐवज मॅन्युअली अपलोड करा. आम्ही त्यांना सत्यापित करण्यासाठी ओसीआर वापरू.' },
    upload_button: { en: 'Upload', regional: 'अपलोड करा' },
    verifying_toast: { en: 'uploading and verifying...', regional: 'अपलोड आणि सत्यापित करत आहे...' },
    verified_toast: { en: 'Verified', regional: 'सत्यापित' },
    upload_pending_badge: { en: 'Pending', regional: 'प्रलंबित' },
    upload_uploaded_badge: { en: 'Uploaded, Verifying...', regional: 'अपलोड केले, सत्यापित करत आहे...' },
    upload_verified_ocr_badge: { en: 'Verified via OCR', regional: 'ओसीआरद्वारे सत्यापित' },
    upload_verified_digital_badge: { en: 'Digitally Verified', regional: 'डिजिटल सत्यापित' },
    continue_button: { en: 'Continue to Eligibility', regional: 'पात्रतेसाठी पुढे जा' },
    digilocker_modal_title: { en: 'Share Documents from DigiLocker', regional: 'डिजिलॉकरमधून दस्तऐवज सामायिक करा' },
    digilocker_modal_description: { en: 'Select the documents you want to share for KYC verification.', regional: 'केवायसी पडताळणीसाठी तुम्ही शेअर करू इच्छित असलेले दस्तऐवज निवडा.' },
    digilocker_modal_share_button: { en: 'Share Selected Documents', regional: ' निवडलेले दस्तऐवज सामायिक करा' },
    processing_title: { en: 'Verifying Documents & Checking Credit...', regional: 'दस्तऐवज पडताळणी आणि क्रेडिट तपासणी करत आहे...' },
    processing_description: { en: 'Please wait while we securely process your information.', regional: 'आम्ही तुमची माहिती सुरक्षितपणे प्रक्रिया करत असताना कृपया प्रतीक्षा करा.' },
    summary_title: { en: 'KYC Matching Summary', regional: 'केवायसी जुळणी सारांश' },
    summary_description: { en: "We've matched your provided details against your verified documents. Aadhaar is the primary source of truth.", regional: 'आम्ही तुमच्या प्रदान केलेल्या तपशिलांना तुमच्या सत्यापित दस्तऐवजांशी जुळवले आहे. आधार हे सत्याचे प्राथमिक स्त्रोत आहे.' },
    summary_name_label: { en: 'Full Name', regional: 'पूर्ण नाव' },
    summary_dob_label: { en: 'Date of Birth', regional: 'जन्म तारीख' },
    summary_address_label: { en: 'Address', regional: 'पत्ता' },
    summary_pan_label: { en: 'PAN', regional: 'पॅन' },
    summary_match_badge: { en: 'Matches Aadhaar', regional: 'आधारशी जुळते' },
    summary_mismatch_badge: { en: 'Does Not Match', regional: 'जुळत नाही' },
    summary_partial_match_badge: { en: 'Partial Match', regional: 'आंशिक जुळणी' },
  },
   eligibility: {
    rejected_title: { en: 'Application Not Approved', regional: 'अर्ज मंजूर नाही' },
    rejected_description: { en: 'We are unable to proceed with your loan application at this time based on our current lending policies.', regional: 'आमच्या सध्याच्या कर्ज धोरणांवर आधारित आम्ही यावेळी तुमच्या कर्ज अर्जासोबत पुढे जाऊ शकत नाही.' },
    back_home_button: { en: 'Back to Home', regional: 'घरी परत जा' },
    finalizing_title: { en: 'Finalizing Eligibility...', regional: 'पात्रता अंतिम करत आहे...' },
    finalizing_description: { en: 'This should only take a moment.', regional: 'याला फक्त एक क्षण लागेल.' },
    report_summary_title: { en: 'Your Credit Report Summary', regional: 'तुमचा क्रेडिट रिपोर्ट सारांश' },
    score_band_excellent: { en: 'Excellent', regional: 'उत्कृष्ट' },
    score_band_good: { en: 'Good', regional: 'चांगले' },
    score_band_fair: { en: 'Fair', regional: 'ठीक' },
    score_band_poor: { en: 'Poor', regional: 'खराब' },
    cibil_score_label: { en: 'CIBIL Score', regional: 'सिबिल स्कोर' },
    active_loans_label: { en: 'Active Loans', regional: 'सक्रिय कर्ज' },
    overdue_label: { en: 'Overdue', regional: 'थकबाकी' },
    enquiries_label: { en: 'Recent Enquiries', regional: 'अलीकडील चौकशी' },
    upsell_title: { en: 'Great News!', regional: 'उत्तम बातमी!' },
    upsell_description: { en: "You applied for <requested>, but you're eligible for up to <eligible>.", regional: 'तुम्ही <requested> साठी अर्ज केला होता, परंतु तुम्ही <eligible> पर्यंत पात्र आहात.' },
    select_amount_label: { en: 'Select Your Loan Amount', regional: 'तुमची कर्ज रक्कम निवडा' },
    recommended_badge: { en: 'Recommended', regional: 'शिफारस केलेले' },
    lower_amount_requested: { en: "You applied for: {amount}", regional: "तुम्ही यासाठी अर्ज केला: {amount}" },
    lower_amount_approved: { en: "Based on your profile, the approved loan amount is:", regional: "तुमच्या प्रोफाइलवर आधारित, मंजूर कर्ज रक्कम आहे:" },
    lower_amount_reason: { en: "This amount is approved based on your credit profile and repayment capacity.", regional: "ही रक्कम तुमच्या क्रेडिट प्रोफाइल आणि परतफेड क्षमतेवर आधारित मंजूर केली आहे." },
    lower_amount_accept_button: { en: "Continue with {amount}", regional: "{amount} सह सुरू ठेवा" },
    lower_amount_decline_button: { en: "I do not wish to continue", regional: "मला सुरू ठेवायचे नाही" },
    assisted_journey_title: { en: "Assisted Journey", regional: "सहाय्यक प्रवास" },
    assisted_journey_description: { en: "Your loan application has been successfully reviewed.\n\nWe noticed that the auto debit setup could not be completed digitally. Our relationship manager will contact you shortly to help you complete the next steps and guide you through alternate options.\n\nThank you for choosing LoanSwift.", regional: "तुमचा कर्ज अर्ज यशस्वीरित्या पुनरावलोकन केला गेला आहे.\n\nआम्ही पाहिले की ऑटो डेबिट सेटअप डिजिटल पद्धतीने पूर्ण होऊ शकला नाही. आमचे रिलेशनशिप मॅनेजर पुढील चरण पूर्ण करण्यात मदत करण्यासाठी आणि पर्यायी पर्यायांमधून तुम्हाला मार्गदर्शन करण्यासाठी लवकरच तुमच्याशी संपर्क साधतील.\n\nलोनस्विफ्ट निवडल्याबद्दल धन्यवाद." },
    app_id_label: { en: 'Application ID', regional: 'अर्ज आयडी' },
    thank_you_message: { en: 'Thank you for considering LoanSwift.', regional: 'लोनस्विफ्टचा विचार केल्याबद्दल धन्यवाद.' },
    tenure_label: { en: 'Choose your tenure', regional: 'तुमचा कालावधी निवडा' },
    tenure_description: { en: 'Select a plan to see your monthly payment.', regional: 'तुमचे मासिक पेमेंट पाहण्यासाठी एक योजना निवडा.' },
    plan_title: { en: 'Your Selected Plan', regional: 'तुमची निवडलेली योजना' },
    per_month_label: { en: '/ month', regional: '/ महिना' },
    for_months_label: { en: 'months', regional: 'महिने' },
    at_interest_label: { en: '% p.a.', regional: '% प्रतिवर्ष' },
    schedule_preview_title: { en: 'Payment Schedule Preview', regional: 'पेमेंट शेड्यूल पूर्वावलोकन' },
    confirm_consent_label: { en: 'I confirm that I have reviewed and chosen this loan tenure and EMI.', regional: 'मी पुष्टी करतो/करते की मी या कर्जाचा कालावधी आणि ईएमआयचे पुनरावलोकन केले आहे आणि निवडले आहे.' },
    confirm_button: { en: 'Confirm Loan Amount & Continue', regional: 'कर्ज रक्कम निश्चित करा आणि पुढे जा' },
    validation_message: { en: 'Please select a tenure and confirm your choice to proceed.', regional: 'कृपया एक कालावधी निवडा आणि पुढे जाण्यासाठी तुमच्या निवडीची पुष्टी करा.' },
    approved_amount_label: { en: 'Approved Loan Amount', regional: 'मंजूर कर्ज रक्कम' },
  },
  kfs: {
    title: { en: 'Your Loan Offer Summary', regional: 'तुमच्या कर्ज प्रस्तावाचा सारांश' },
    description: { en: 'Please review and accept your final loan details.', regional: 'कृपया तुमच्या अंतिम कर्ज तपशीलांचे पुनरावलोकन करा आणि स्वीकारा.' },
    kfs_title: { en: 'Key Facts Statement', regional: 'मुख्य तथ्य विधान' },
    kfs_description: { en: 'This document summarizes all terms of your loan offer.', regional: 'हा दस्तऐवज तुमच्या कर्ज प्रस्तावाच्या सर्व अटींचा सारांश देतो.' },
    loan_amount: { en: 'Loan Amount', regional: 'कर्जाची रक्कम' },
    processing_fee: { en: 'Processing Fee (2%)', regional: 'प्रक्रिया शुल्क (2%)' },
    net_disbursed: { en: 'Net Disbursed Amount', regional: 'निव्वळ वितरित रक्कम' },
    monthly_emi: { en: 'Monthly EMI', regional: 'मासिक EMI' },
    total_repayment: { en: 'Total Repayment', regional: 'एकूण परतफेड' },
    view_kfs_button: { en: 'View Detailed Key Facts Statement (KFS)', regional: 'तपशीलवार मुख्य तथ्य विधान (KFS) पहा' },
    accept_consent: { en: 'I have read and understood the Key Facts Statement and accept the loan offer.', regional: 'मी मुख्य तथ्य विधान वाचले आणि समजले आहे आणि कर्ज प्रस्ताव स्वीकारतो.' },
    accept_button: { en: 'Accept Offer & Continue', regional: 'प्रस्ताव स्वीकारा आणि सुरू ठेवा' },
  },
  sanction_letter: {
    title: { en: 'Loan Sanction Letter', regional: 'कर्ज मंजूरी पत्र' },
    description: { en: 'Subject to terms and conditions.', regional: 'अटी आणि शर्तींच्या अधीन' },
    borrower_details: { en: 'Borrower Details', regional: 'कर्जदार तपशील' },
    borrower_name: { en: 'Borrower Name', regional: 'कर्जदाराचे नाव' },
    app_id: { en: 'Application ID', regional: 'अर्ज आयडी' },
    pan: { en: 'PAN', regional: 'पॅन' },
    sanction_date: { en: 'Date of Sanction', regional: 'मंजुरीची तारीख' },
    loan_details: { en: 'Loan Details', regional: 'कर्ज तपशील' },
    sanctioned_amount: { en: 'Sanctioned Amount', regional: 'मंजूर रक्कम' },
    loan_type: { en: 'Loan Type', regional: 'कर्जाचा प्रकार' },
    tenure: { en: 'Tenure', regional: 'कालावधी' },
    interest_rate: { en: 'Interest Rate', regional: 'व्याज दर' },
    emi_amount: { en: 'EMI Amount', regional: 'ईएमआई रक्कम' },
    emi_start_date: { en: 'EMI Start Date', regional: 'ईएमआई सुरू होण्याची तारीख' },
    fees_disbursal: { en: 'Fees & Disbursal', regional: 'शुल्क आणि वितरण' },
    processing_fee: { en: 'Processing Fee (2%)', regional: 'प्रक्रिया शुल्क (2%)' },
    gst: { en: 'GST (18%)', regional: 'जीएसटी (18%)' },
    net_disbursal: { en: 'Net Disbursal Amount', regional: 'निव्वळ वितरण रक्कम' },
    key_terms: { en: 'Key Terms', regional: 'मुख्य अटी' },
    term1: { en: 'Sanction is subject to successful e-Mandate registration.', regional: 'मंजूरी यशस्वी ई-मँडेट नोंदणीच्या अधीन आहे.' },
    term2: { en: 'Loan is subject to execution of final loan agreement.', regional: 'कर्ज अंतिम कर्ज कराराच्या अंमलबजावणीच्या अधीन आहे.' },
    term3: { en: 'You may cancel the loan before disbursement.', regional: 'तुम्ही वितरणापूर्वी कर्ज रद्द करू शकता.' },
    lender_disclosure1: { en: 'Loan provided by FairFinance NBFC (Regulated Entity - RE).', regional: 'फेअर फायनान्स एनबीएफसी (नियामक संस्था - आरई) द्वारे प्रदान केलेले कर्ज.' },
    lender_disclosure2: { en: 'Loan facilitated by LoanSwift (Lending Service Provider - LSP).', regional: 'लोनस्विफ्ट (कर्ज सेवा प्रदाता - एलएसपी) द्वारे सुलभ कर्ज.' },
    lender_disclosure3: { en: 'Grievance Contact', regional: 'तक्रार संपर्क' },
    accept_button: { en: 'Accept & e-Sign', regional: 'स्वीकारा आणि ई-सही करा' },
    decline_button: { en: 'Do Not Accept', regional: 'स्वीकारू नका' },
    decline_title: { en: 'Application Paused', regional: 'अर्ज थांबवला' },
    decline_description: { en: 'Your application ID is <ID>. Our relationship manager will contact you shortly to assist you further or clarify any questions.', regional: 'तुमचा अर्ज आयडी <ID> आहे. आमचे रिलेशनशिप मॅनेजर तुम्हाला अधिक मदत करण्यासाठी किंवा कोणतेही प्रश्न स्पष्ट करण्यासाठी लवकरच तुमच्याशी संपर्क साधतील.' },
    support_contact: { en: 'You can also reach us at support@loanswift.com', regional: 'तुम्ही आम्हाला support@loanswift.com वर देखील संपर्क साधू शकता' },
    esign_title: { en: 'e-Sign Sanction Letter', regional: 'मंजुरी पत्र ई-सही करा' },
    esign_description: { en: 'Enter the OTP sent to your Aadhaar-linked mobile number to sign.', regional: 'सही करण्यासाठी तुमच्या आधार-लिंक्ड मोबाइल नंबरवर पाठवलेला OTP टाका.' },
    otp_label: { en: 'Enter 6-digit OTP', regional: '6-अंकी OTP टाका' },
    esign_button: { en: 'Verify & e-Sign', regional: 'सत्यापित करा आणि ई-सही करा' },
  },
  e_mandate: {
    title: { en: 'e-Mandate for Repayments', regional: 'परतफेडीसाठी ई-मँडेट' },
    description: { en: 'To automate your monthly EMI payments, please set up an e-mandate. This is a secure process handled by your bank.', regional: 'तुमचे मासिक ईएमआय पेमेंट स्वयंचलित करण्यासाठी, कृपया ई-मँडेट सेट करा. ही तुमच्या बँकेद्वारे हाताळली जाणारी एक सुरक्षित प्रक्रिया आहे.' },
    mandate_details_title: { en: 'Mandate Details', regional: 'मँडेट तपशील' },
    account_label: { en: 'Account', regional: 'खाते' },
    emi_amount_label: { en: 'EMI Amount', regional: 'ईएमआय रक्कम' },
    frequency_label: { en: 'Frequency', regional: 'वारंवारता' },
    start_date_label: { en: 'First Debit', regional: 'पहिली डेबिट' },
    setup_button: { en: 'Set up Auto Debit', regional: 'ऑटो डेबिट सेट करा' },
    setup_button_pending: { en: 'Redirecting to bank...', regional: 'बँकेकडे पुनर्निर्देशित करत आहे...' },
    unable_button: { en: 'I am unable to set up auto debit', regional: 'मी ऑटो डेबिट सेट करू शकत नाही' },
    success_title: { en: 'e-Mandate Registered', regional: 'ई-मँडेट नोंदणीकृत' },
    success_description: { en: 'Auto-debit has been set up for your EMIs.', regional: 'तुमच्या ईएमआयसाठी ऑटो-डेबिट सेट केले आहे.' },
    unable_title: { en: 'Assisted Journey Required', regional: 'सहाय्यित प्रवासाची आवश्यकता' },
    unable_description: { en: 'Your loan application has been successfully reviewed. We noticed that the auto debit setup could not be completed digitally. Our relationship manager will contact you shortly to help you complete the next steps and guide you through alternate options.', regional: 'तुमचा कर्ज अर्ज यशस्वीरित्या पुनरावलोकन केला गेला आहे. आम्ही पाहिले की ऑटो डेबिट सेटअप डिजिटल पद्धतीने पूर्ण होऊ शकला नाही. आमचे रिलेशनशिप मॅनेजर पुढील चरण पूर्ण करण्यात मदत करण्यासाठी आणि पर्यायी पर्यायांमधून तुम्हाला मार्गदर्शन करण्यासाठी लवकरच तुमच्याशी संपर्क साधतील.' },
    app_id: { en: 'Application ID', regional: 'अर्ज आयडी' },
    sanctioned_amount: { en: 'Approved Loan Amount', regional: 'मंजूर कर्ज रक्कम' },
    support_contact: { en: 'Thank you for choosing LoanSwift.', regional: 'लोनस्विफ्ट निवडल्याबद्दल धन्यवाद.' },
  },
  agreement: {
    title: { en: 'Digital Loan Agreement (e-Sign)', regional: 'डिजिटल कर्ज करार (ई-सही)' },
    description: { en: 'Review the terms and sign the agreement using an Aadhaar-based OTP.', regional: 'अटींचे पुनरावलोकन करा आणि आधार-आधारित ओटीपी वापरून करारावर सही करा.' },
    borrower_details: { en: 'Borrower Details', regional: 'कर्जदाराचे तपशील' },
    borrower_name: { en: 'Borrower Name', regional: 'कर्जदाराचे नाव' },
    app_id: { en: 'Application ID', regional: 'अर्ज आयडी' },
    pan: { en: 'PAN', regional: 'पॅन' },
    loan_details: { en: 'Loan Details', regional: 'कर्ज तपशील' },
    sanctioned_amount: { en: 'Sanctioned Amount', regional: 'मंजूर रक्कम' },
    tenure: { en: 'Tenure', regional: 'कालावधी' },
    interest_rate: { en: 'Interest Rate', regional: 'व्याज दर' },
    fees_disbursal: { en: 'Fees & Charges', regional: 'शुल्क आणि आकार' },
    processing_fee: { en: 'Processing Fee (2%)', regional: 'प्रक्रिया शुल्क (2%)' },
    gst: { en: 'GST (18%) on Fee', regional: 'शुल्कावर जीएसटी (18%)' },
    net_disbursal: { en: 'Net Disbursal Amount', regional: 'निव्वळ वितरण रक्कम' },
    repayment_terms: { en: 'Repayment Terms', regional: 'परतफेड अटी' },
    emi_amount: { en: 'EMI Amount', regional: 'ईएमआई रक्कम' },
    emi_start_date: { en: 'EMI Start Date', regional: 'ईएमआई सुरू होण्याची तारीख' },
    repayment_mode: { en: 'Repayment Mode', regional: 'परतफेड मोड' },
    legal_disclosure: { en: 'Legal & Regulatory Disclosures', regional: 'कायदेशीर आणि नियामक प्रकटीकरण' },
    lender_disclosure1: { en: 'Loan provided by FairFinance NBFC (Regulated Entity - RE).', regional: 'फेअर फायनान्स एनबीएफसी (नियामक संस्था - आरई) द्वारे प्रदान केलेले कर्ज.' },
    lender_disclosure2: { en: 'Loan facilitated by LoanSwift (Lending Service Provider - LSP).', regional: 'लोनस्विफ्ट (कर्ज सेवा प्रदाता - एलएसपी) द्वारे सुलभ कर्ज.' },
    lender_disclosure3: { en: 'Grievance Contact', regional: 'तक्रार संपर्क' },
    declaration_title: { en: 'Declaration & Consent', regional: 'घोषणा आणि संमती' },
    declaration_content: { en: 'I have read, understood, and agree to the terms and conditions of this loan agreement.', regional: 'मी या कर्ज कराराच्या अटी आणि शर्ती वाचल्या, समजून घेतल्या आहेत आणि त्यांना सहमत आहे.' },
    sign_button: { en: 'Sign via Aadhaar OTP', regional: 'आधार ओटीपीद्वारे सही करा' },
    otp_label: { en: 'Enter OTP sent to your Aadhaar-linked mobile', regional: 'तुमच्या आधार-लिंक्ड मोबाइलवर पाठवलेला ओटीपी प्रविष्ट करा' },
    otp_placeholder: { en: 'Enter 6-digit OTP', regional: '६-अंकी ओटीपी प्रविष्ट करा' },
    verify_button: { en: 'Verify & e-Sign', regional: 'सत्यापित करा आणि ई-सही करा' },
  },
  disbursement: {
    success_title: { en: 'Disbursement Initiated', regional: 'वितरण सुरू केले' },
    processing_message: { en: 'Your loan request has been successfully processed.', regional: 'तुमचा कर्ज विनंती यशस्वीरित्या प्रक्रिया केली गेली आहे.' },
    credited_soon_message: { en: 'The approved amount will be credited to your bank account shortly (within 10-15 minutes).', regional: 'मंजूर रक्कम लवकरच (10-15 मिनिटांत) तुमच्या बँक खात्यात जमा केली जाईल.' },
    details_title: { en: 'Disbursement Details', regional: 'वितरण तपशील' },
    amount_label: { en: 'Amount:', regional: 'रक्कम:' },
    account_label: { en: 'Bank Account:', regional: 'बँक खाते:' },
    ref_label: { en: 'Transaction Ref:', regional: 'व्यवहार संदर्भ:' },
    back_to_dashboard_button: { en: 'Back to Dashboard', regional: 'डॅशबोर्डवर परत जा' },
    ready_title: { en: 'Ready for Disbursement', regional: 'वितरणासाठी सज्ज' },
    ready_description: { en: 'All formalities are complete. Please confirm to receive the net loan amount in your verified bank account.', regional: 'सर्व औपचारिकता पूर्ण झाल्या आहेत. कृपया तुमच्या सत्यापित बँक खात्यात निव्वळ कर्ज रक्कम प्राप्त करण्यासाठी पुष्टी करा.' },
    final_disbursement_title: { en: 'Final Disbursement', regional: 'अंतिम वितरण' },
    net_amount_label: { en: 'Net Amount to be Credited:', regional: 'जमा होणारी निव्वळ रक्कम:' },
    to_account_label: { en: 'To Account:', regional: 'खात्यात:' },
    timeline_label: { en: 'Timeline:', regional: 'टाइमलाइन:' },
    timeline_value: { en: '10-15 mins', regional: '10-15 मिनिटे' },
    confirm_disbursement_button: { en: 'Confirm & Proceed', regional: 'पुष्टी करा आणि पुढे जा' },
    not_ready_button: { en: 'I am not ready to proceed', regional: 'मी पुढे जाण्यासाठी तयार नाही' },
    initiate_button: { en: 'Initiate Disbursement', regional: 'वितरण सुरू करा' },
    processing_button: { en: 'Processing Disbursement...', regional: 'वितरण प्रक्रिया करत आहे...' },
    assisted_title: { en: 'Application Paused', regional: 'अर्ज थांबवला आहे' },
    assisted_description: { en: 'Your loan application is almost complete. If you need more time or assistance before disbursement, our relationship manager will contact you shortly to guide you further.', regional: 'तुमचा कर्ज अर्ज जवळजवळ पूर्ण झाला आहे. वितरणापूर्वी तुम्हाला अधिक वेळ किंवा मदतीची आवश्यकता असल्यास, आमचे संबंध व्यवस्थापक तुम्हाला पुढील मार्गदर्शन करण्यासाठी लवकरच संपर्क साधतील.' },
    app_id_label: { en: 'Application ID', regional: 'अर्ज आयडी' },
  },
};

const te: Dictionary = {
  login: {
    title: { en: 'Verify Your Mobile', regional: 'మీ మొబైల్‌ను ధృవీకరించండి' },
    description: { en: "We'll send a one-time password (OTP) to your mobile number to get started.", regional: 'ప్రారంభించడానికి మేము మీ మొబైల్ నంబర్‌కు ఒక-సారి పాస్‌వర్డ్ (OTP) పంపుతాము.' },
    mobile_label: { en: 'Mobile Number', regional: 'మొబైల్ నంబర్' },
    mobile_placeholder: { en: 'Enter 10-digit mobile number', regional: '10-అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి' },
    button_text: { en: 'Get OTP', regional: 'OTPని పొందండి' },
    otp_sent_title: { en: 'OTP Sent', regional: 'OTP పంపబడింది' },
    otp_sent_description: { en: 'An OTP has been sent to', regional: 'ఒక OTP పంపబడింది' },
  },
  otp_verify: {
    title: { en: 'Enter OTP', regional: 'OTPని నమోదు చేయండి' },
    description: { en: 'An OTP has been sent to +91 <mobile>.', regional: '+91 <mobile>కు ఒక OTP పంపబడింది.' },
    otp_label: { en: '6-Digit OTP', regional: '6-అంకెల OTP' },
    otp_placeholder: { en: '123456', regional: '౧౨౩౪౫౬' },
    button_text: { en: 'Verify OTP', regional: 'OTPని ధృవీకరించండి' },
    resend_button: { en: 'Resend OTP', regional: 'OTPని మళ్ళీ పంపండి' },
    resent_toast: { en: 'OTP Resent', regional: 'OTP మళ్ళీ పంపబడింది' },
    success_title: { en: 'Verification Successful', regional: 'ధృవీకరణ విజయవంతం' },
    success_description: { en: 'You have been successfully verified.', regional: 'మీరు విజయవంతంగా ధృవీకరించబడ్డారు.' },
    failure_title: { en: 'Verification Failed', regional: 'ధృవీకరణ విఫలమైంది' },
    failure_description: { en: 'An unexpected error occurred.', regional: 'ఒక ఊహించని లోపం సంభవించింది.' },
    invalid_otp_title: { en: 'Invalid OTP', regional: 'చెల్లని OTP' },
    invalid_otp_description: { en: 'The OTP you entered is incorrect. Please try again.', regional: 'మీరు నమోదు చేసిన OTP తప్పు. దయచేసి మళ్ళీ ప్రయత్నించండి.' },
  },
  consent: {
    title: { en: 'Consent Hub', regional: 'సమ్మతి కేంద్రం' },
    description: { en: 'As per RBI guidelines, we need your explicit consent for the following data processing activities.', regional: 'RBI మార్గదర్శకాల ప్రకారం, కింది డేటా ప్రాసెసింగ్ కార్యకలాపాలకు మాకు మీ స్పష్టమైన సమ్మతి అవసరం.' },
    items: {
        PAN_VERIFICATION: { en: 'I consent to verification of my PAN from issuing authority/NSDL.', regional: 'జారీచేసే అధికారం/NSDL నుండి నా పాన్ యొక్క ధృవీకరణకు నేను సమ్మతిస్తున్నాను.' },
        AADHAAR_AUTH: { en: 'I consent to Aadhaar OTP-based offline verification / e-KYC through authorized partners.', regional: 'అధీకృత భాగస్వాముల ద్వారా ఆధార్ OTP-ఆధారిత ఆఫ్‌లైన్ ధృవీకరణ / ఇ-కెవైసికి నేను సమ్మతిస్తున్నాను.' },
        DIGILOCKER_KYC: { en: 'I consent to fetch KYC documents from DigiLocker using my DigiLocker account.', regional: 'నా డిజిలాకర్ ఖాతాను ఉపయోగించి డిజిలాకర్ నుండి కెవైసి పత్రాలను పొందడానికి నేను సమ్మతిస్తున్నాను.' },
        BUREAU_PULL: { en: 'I consent to pull my credit report from credit bureaus for the purpose of this loan.', regional: 'ఈ లోన్ ప్రయోజనం కోసం క్రెడిట్ బ్యూరోల నుండి నా క్రెడిట్ నివేదికను లాగడానికి నేను సమ్మతిస్తున్నాను.' },
        BANK_VERIFICATION: { en: 'I consent to verification of my bank account and registration of e-mandate for EMI debit.', regional: 'EMI డెబిట్ కోసం నా బ్యాంక్ ఖాతా యొక్క ధృవీకరణ మరియు ఇ-మాండేట్ నమోదుకు నేను సమ్మతిస్తున్నాను.' },
        DATA_SHARING: { en: 'I consent to processing of my data by the NBFC/BANK (RE) and its authorized service providers, in line with RBI digital lending guidelines.', regional: 'RBI డిజిటల్ లెండింగ్ మార్గదర్శకాలకు అనుగుణంగా, NBFC/BANK (RE) మరియు దాని అధీకృత సేవా ప్రదాతల ద్వారా నా డేటాను ప్రాసెస్ చేయడానికి నేను సమ్మతిస్తున్నాను.' },
        AGREE_NOTICE: { en: 'I have read and agree to these consents and the privacy notice.', regional: 'నేను ఈ సమ్మతులను మరియు గోప్యతా నోటీసును చదివి, అంగీకరిస్తున్నాను.' },
    },
    agree_notice_text: { en: 'By checking the boxes above and clicking "Accept & Continue", I, the applicant, hereby provide my explicit consent to LoanSwift (the LSP) and its partner FairFinance NBFC (the RE) to access, process, and store my personal and financial information for the purpose of this loan application. This includes sharing data with credit bureaus (e.g., CIBIL), and using third-party services for PAN, Aadhaar, and bank account verification. This consent is voluntary and can be revoked as per the terms outlined in our privacy policy.', regional: 'పైన ఉన్న పెట్టెలను తనిఖీ చేసి, "అంగీకరించి కొనసాగించు" పై క్లిక్ చేయడం ద్వారా, నేను, దరఖాస్తుదారు, ఈ లోన్ దరఖాస్తు ప్రయోజనం కోసం నా వ్యక్తిగత మరియు ఆర్థిక సమాచారాన్ని యాక్సెస్ చేయడానికి, ప్రాసెస్ చేయడానికి మరియు నిల్వ చేయడానికి లోన్‌స్విఫ్ట్ (LSP) మరియు దాని భాగస్వామి ఫెయిర్‌ఫైనాన్స్ NBFC (RE)కి నా స్పష్టమైన సమ్మతిని ఇస్తున్నాను. ఇందులో క్రెడిట్ బ్యూరోలతో (ఉదా., సిబిల్) డేటాను పంచుకోవడం మరియు పాన్, ఆధార్ మరియు బ్యాంక్ ఖాతా ధృవీకరణ కోసం మూడవ పక్ష సేవల ఉపయోగం ఉన్నాయి. ఈ సమ్మతి స్వచ్ఛందమైనది మరియు మా గోప్యతా విధానంలో పేర్కొన్న నిబంధనల ప్రకారం ఉపసంహరించుకోవచ్చు.' },
    accept_button: { en: 'Accept & Continue', regional: 'అంగీకరించి కొనసాగించండి' },
    all_consents_required: { en: 'You must accept all consents to proceed.', regional: 'ముందుకు సాగడానికి మీరు అన్ని సమ్మతులను అంగీకరించాలి.' },
  },
  personal_details: {
    title: { en: 'Personal Details', regional: 'వ్యక్తిగత వివరాలు' },
    full_name_label: { en: 'Full Name (as per PAN)', regional: 'పూర్తి పేరు (పాన్ ప్రకారం)' },
    full_name_placeholder: { en: 'John Doe', regional: 'జాన్ డో' },
    pan_label: { en: 'PAN Number', regional: 'పాన్ నంబర్' },
    pan_placeholder: { en: 'ABCDE1234F', regional: 'ABCDE1234F' },
    dob_label: { en: 'Date of Birth', regional: 'పుట్టిన తేది' },
    dob_placeholder: { en: 'Select your Date of Birth', regional: 'మీ పుట్టిన తేదీని ఎంచుకోండి' },
    employment_label: { en: 'Employment Type', regional: 'ఉద్యోగ రకం' },
    employment_placeholder: { en: 'Select your employment type', regional: 'మీ ఉద్యోగ రకాన్ని ఎంచుకోండి' },
    income_label: { en: 'Monthly Net Income (₹)', regional: 'నెలవారీ నికర ఆదాయం (₹)' },
    income_placeholder: { en: '40000', regional: '40000' },
    loan_amount_label: { en: 'Loan Amount Required (₹)', regional: 'అవసరమైన లోన్ మొత్తం (₹)' },
    loan_amount_placeholder: { en: '100000', regional: '100000' },
    address_label: { en: 'Current Address', regional: 'ప్రస్తుత చిరునామా' },
    address_placeholder: { en: 'Address Line', regional: 'చిరునామా లైన్' },
    city_placeholder: { en: 'City', regional: 'నగరం' },
    pincode_placeholder: { en: 'Pincode', regional: 'పిన్‌కోడ్' },
    consent_label: { en: 'Explicit Consent', regional: 'స్పష్టమైన సమ్మతి' },
    consent_description: { en: 'I hereby consent to LoanSwift fetching my credit information and other details for the purpose of this loan application.', regional: 'ఈ లోన్ దరఖాస్తు ప్రయోజనం కోసం నా క్రెడిట్ సమాచారం మరియు ఇతర వివరాలను పొందడానికి నేను లోన్‌స్విఫ్ట్‌కు సమ్మతిస్తున్నాను.' },
    save_button: { en: 'Save and Continue', regional: 'సేవ్ చేసి కొనసాగించండి' },
  },
  kyc: {
    pan_title: { en: 'PAN Verification', regional: 'పాన్ ధృవీకరణ' },
    pan_description: { en: 'Pre-filled based on earlier details. Please review and edit if required.', regional: 'మునుపటి వివరాల ఆధారంగా ముందుగా నింపబడింది. దయచేసి సమీక్షించి, అవసరమైతే సవరించండి.' },
    pan_verified_title: { en: 'PAN Verified', regional: 'పాన్ ధృవీకరించబడింది' },
    pan_verified_description: { en: 'Your PAN has been successfully verified.', regional: 'మీ పాన్ విజయవంతంగా ధృవీకరించబడింది.' },
    pan_button: { en: 'Verify PAN', regional: 'పాన్‌ను ధృవీకరించండి' },
    aadhaar_title: { en: 'Aadhaar e-KYC', regional: 'ఆధార్ ఇ-కెవైసి' },
    aadhaar_description: { en: 'Enter your Aadhaar to perform e-KYC via OTP.', regional: 'OTP ద్వారా ఇ-కెవైసి చేయడానికి మీ ఆధార్‌ను నమోదు చేయండి.' },
    aadhaar_verified_title: { en: 'Aadhaar Verified', regional: 'ఆధార్ ధృవీకరించబడింది' },
    aadhaar_verified_description: { en: 'Your Aadhaar e-KYC is complete.', regional: 'మీ ఆధార్ ఇ-కెవైసి పూర్తయింది.' },
    aadhaar_label: { en: 'Aadhaar Number', regional: 'ఆధార్ నంబర్' },
    aadhaar_placeholder: { en: '1234 5678 9012', regional: '౧౨౩౪ ౫౬౭౮ ౯౦౧౨' },
    send_otp_button: { en: 'Send OTP', regional: 'OTP పంపండి' },
    otp_label: { en: 'Enter OTP', regional: 'OTP నమోదు చేయండి' },
    otp_placeholder: { en: 'Enter 6-digit OTP (123456)', regional: '6-అంకెల OTPని నమోదు చేయండి (౧౨౩౪౫౬)' },
    verify_otp_button: { en: 'Verify OTP', regional: 'OTPని ధృవీకరించండి' },
    continue_button: { en: 'Continue to Document Verification', regional: 'పత్రాల ధృవీకరణకు కొనసాగండి' },
  },
  doc_verification: {
    digilocker_title: { en: 'Option 1: Use DigiLocker', regional: 'ఎంపిక 1: డిజిలాకర్‌ను ఉపయోగించండి' },
    digilocker_description: { en: 'Fetch your Aadhaar and PAN instantly for faster processing.', regional: 'వేగవంతమైన ప్రాసెసింగ్ కోసం మీ ఆధార్ మరియు పాన్‌ను తక్షణమే పొందండి.' },
    digilocker_button: { en: 'Connect to DigiLocker', regional: 'డిజిలాకర్‌కు కనెక్ట్ అవ్వండి' },
    manual_title: { en: 'Option 2: Manual Upload', regional: 'ఎంపిక 2: మాన్యువల్ అప్‌లోడ్' },
    manual_description: { en: "Upload your documents manually. We'll use OCR to verify them.", regional: 'మీ పత్రాలను మాన్యువల్‌గా అప్‌లోడ్ చేయండి. మేము వాటిని ధృవీకరించడానికి OCRను ఉపయోగిస్తాము.' },
    upload_button: { en: 'Upload', regional: 'అప్‌లోడ్' },
    verifying_toast: { en: 'uploading and verifying...', regional: 'అప్‌లోడ్ మరియు ధృవీకరిస్తోంది...' },
    verified_toast: { en: 'Verified', regional: 'ధృవీకరించబడింది' },
    upload_pending_badge: { en: 'Pending', regional: 'పెండింగ్‌లో ఉంది' },
    upload_uploaded_badge: { en: 'Uploaded, Verifying...', regional: 'అప్‌లోడ్ చేయబడింది, ధృవీకరిస్తోంది...' },
    upload_verified_ocr_badge: { en: 'Verified via OCR', regional: 'OCR ద్వారా ధృవీకరించబడింది' },
    upload_verified_digital_badge: { en: 'Digitally Verified', regional: 'డిజిటల్‌గా ధృవీకరించబడింది' },
    continue_button: { en: 'Continue to Eligibility', regional: 'అర్హతకు కొనసాగండి' },
    digilocker_modal_title: { en: 'Share Documents from DigiLocker', regional: 'డిజిలాకర్ నుండి పత్రాలను పంచుకోండి' },
    digilocker_modal_description: { en: 'Select the documents you want to share for KYC verification.', regional: 'కెవైసి ధృవీకరణ కోసం మీరు పంచుకోవాలనుకుంటున్న పత్రాలను ఎంచుకోండి.' },
    digilocker_modal_share_button: { en: 'Share Selected Documents', regional: 'ఎంచుకున్న పత్రాలను పంచుకోండి' },
    processing_title: { en: 'Verifying Documents & Checking Credit...', regional: 'పత్రాలను ధృవీకరించడం & క్రెడిట్ తనిఖీ చేస్తోంది...' },
    processing_description: { en: 'Please wait while we securely process your information.', regional: 'మేము మీ సమాచారాన్ని సురక్షితంగా ప్రాసెస్ చేస్తున్నప్పుడు దయచేసి వేచి ఉండండి.' },
    summary_title: { en: 'KYC Matching Summary', regional: 'కెవైసి సరిపోలిక సారాంశం' },
    summary_description: { en: "We've matched your provided details against your verified documents. Aadhaar is the primary source of truth.", regional: 'మేము మీ అందించిన వివరాలను మీ ధృవీకరించబడిన పత్రాలతో సరిపోల్చాము. ఆధార్ నిజం యొక్క ప్రాథమిక మూలం.' },
    summary_name_label: { en: 'Full Name', regional: 'పూర్తి పేరు' },
    summary_dob_label: { en: 'Date of Birth', regional: 'పుట్టిన తేది' },
    summary_address_label: { en: 'Address', regional: 'చిరునామా' },
    summary_pan_label: { en: 'PAN', regional: 'పాన్' },
    summary_match_badge: { en: 'Matches Aadhaar', regional: 'ఆధార్‌తో సరిపోలుతుంది' },
    summary_mismatch_badge: { en: 'Does Not Match', regional: 'సరిపోలడం లేదు' },
    summary_partial_match_badge: { en: 'Partial Match', regional: 'పాక్షిక సరిపోలిక' },
  },
  eligibility: {
    rejected_title: { en: 'Application Not Approved', regional: 'అప్లికేషన్ ఆమోదించబడలేదు' },
    rejected_description: { en: 'We are unable to proceed with your loan application at this time based on our current lending policies.', regional: 'మా ప్రస్తుత రుణ విధానాల ఆధారంగా మేము ఈ సమయంలో మీ రుణ దరఖాస్తుతో ముందుకు సాగలేకపోతున్నాము.' },
    back_home_button: { en: 'Back to Home', regional: 'హోమ్‌కు తిరిగి వెళ్ళు' },
    finalizing_title: { en: 'Finalizing Eligibility...', regional: 'అర్హతను ఖరారు చేస్తోంది...' },
    finalizing_description: { en: 'This should only take a moment.', regional: 'దీనికి ఒక్క క్షణం మాత్రమే పట్టాలి.' },
    report_summary_title: { en: 'Your Credit Report Summary', regional: 'మీ క్రెడిట్ నివేదిక సారాంశం' },
    score_band_excellent: { en: 'Excellent', regional: 'అద్భుతమైన' },
    score_band_good: { en: 'Good', regional: 'మంచి' },
    score_band_fair: { en: 'Fair', regional: 'ఫర్వాలేదు' },
    score_band_poor: { en: 'Poor', regional: 'పేలవమైన' },
    cibil_score_label: { en: 'CIBIL Score', regional: 'సిబిల్ స్కోర్' },
    active_loans_label: { en: 'Active Loans', regional: 'క్రియాశీల రుణాలు' },
    overdue_label: { en: 'Overdue', regional: 'గడువు ముగిసింది' },
    enquiries_label: { en: 'Recent Enquiries', regional: 'ఇటీవలి విచారణలు' },
    upsell_title: { en: 'Great News!', regional: 'శుభవార్త!' },
    upsell_description: { en: "You applied for <requested>, but you're eligible for up to <eligible>.", regional: 'మీరు <requested> కోసం దరఖాస్తు చేసారు, కానీ మీరు <eligible> వరకు అర్హులు.' },
    select_amount_label: { en: 'Select Your Loan Amount', regional: 'మీ రుణ మొత్తాన్ని ఎంచుకోండి' },
    recommended_badge: { en: 'Recommended', regional: 'సిఫార్సు చేయబడింది' },
    lower_amount_requested: { en: "You applied for: {amount}", regional: "మీరు దీని కోసం దరఖాస్తు చేసారు: {amount}" },
    lower_amount_approved: { en: "Based on your profile, the approved loan amount is:", regional: "మీ ప్రొఫైల్ ఆధారంగా, ఆమోదించబడిన రుణ మొత్తం:" },
    lower_amount_reason: { en: "This amount is approved based on your credit profile and repayment capacity.", regional: "ఈ మొత్తం మీ క్రెడిట్ ప్రొఫైల్ మరియు తిరిగి చెల్లించే సామర్థ్యం ఆధారంగా ఆమోదించబడింది." },
    lower_amount_accept_button: { en: "Continue with {amount}", regional: "{amount}తో కొనసాగండి" },
    lower_amount_decline_button: { en: "I do not wish to continue", regional: "నేను కొనసాగించాలనుకోవడం లేదు" },
    assisted_journey_title: { en: "Assisted Journey", regional: "సహాయక ప్రయాణం" },
    assisted_journey_description: { en: "Your loan application has been successfully reviewed.\n\nWe noticed that the auto debit setup could not be completed digitally. Our relationship manager will contact you shortly to help you complete the next steps and guide you through alternate options.\n\nThank you for choosing LoanSwift.", regional: "మీ లోన్ దరఖాస్తు విజయవంతంగా సమీక్షించబడింది.\n\nఆటో డెబిట్ సెటప్ డిజిటల్‌గా పూర్తి కాలేదని మేము గమనించాము. మా రిలేషన్‌షిప్ మేనేజర్ తదుపరి దశలను పూర్తి చేయడంలో మీకు సహాయం చేయడానికి మరియు ప్రత్యామ్నాయ ఎంపికల ద్వారా మీకు మార్గనిర్దేశం చేయడానికి త్వరలో మిమ్మల్ని సంప్రదిస్తారు.\n\nలోన్‌స్విఫ్ట్‌ను ఎంచుకున్నందుకు ధన్యవాదాలు." },
    app_id_label: { en: 'Application ID', regional: 'అప్లికేషన్ ఐడి' },
    thank_you_message: { en: 'Thank you for considering LoanSwift.', regional: 'లోన్‌స్విఫ్ట్‌ను పరిగణనలోకి తీసుకున్నందుకు ధన్యవాదాలు.' },
    tenure_label: { en: 'Choose your tenure', regional: 'మీ కాలపరిమితిని ఎంచుకోండి' },
    tenure_description: { en: 'Select a plan to see your monthly payment.', regional: 'మీ నెలవారీ చెల్లింపును చూడటానికి ఒక ప్రణాళికను ఎంచుకోండి.' },
    plan_title: { en: 'Your Selected Plan', regional: 'మీరు ఎంచుకున్న ప్రణాళిక' },
    per_month_label: { en: '/ month', regional: '/ నెలకు' },
    for_months_label: { en: 'months', regional: 'నెలలు' },
    at_interest_label: { en: '% p.a.', regional: '% సంవత్సరానికి' },
    schedule_preview_title: { en: 'Payment Schedule Preview', regional: 'చెల్లింపు షెడ్యూల్ ప్రివ్యూ' },
    confirm_consent_label: { en: 'I confirm that I have reviewed and chosen this loan tenure and EMI.', regional: 'నేను ఈ రుణ కాలపరిమితి మరియు EMIని సమీక్షించి, ఎంచుకున్నానని నేను నిర్ధారిస్తున్నాను.' },
    confirm_button: { en: 'Confirm Loan Amount & Continue', regional: 'రుణ మొత్తాన్ని నిర్ధారించి కొనసాగించండి' },
    validation_message: { en: 'Please select a tenure and confirm your choice to proceed.', regional: 'ముందుకు సాగడానికి దయచేసి ఒక కాలపరిమితిని ఎంచుకుని, మీ ఎంపికను నిర్ధారించండి.' },
    approved_amount_label: { en: 'Approved Loan Amount', regional: 'ఆమోదించబడిన రుణ మొత్తం' },
  },
  kfs: {
    title: { en: 'Your Loan Offer Summary', regional: 'మీ లోన్ ఆఫర్ సారాంశం' },
    description: { en: 'Please review and accept your final loan details.', regional: 'దయచేసి మీ తుది లోన్ వివరాలను సమీక్షించి, అంగీకరించండి.' },
    kfs_title: { en: 'Key Facts Statement', regional: 'కీ ఫ్యాక్ట్స్ స్టేట్‌మెంట్' },
    kfs_description: { en: 'This document summarizes all terms of your loan offer.', regional: 'ఈ పత్రం మీ లోన్ ఆఫర్ యొక్క అన్ని నిబంధనలను సంగ్రహిస్తుంది.' },
    loan_amount: { en: 'Loan Amount', regional: 'లోన్ మొత్తం' },
    processing_fee: { en: 'Processing Fee (2%)', regional: 'ప్రాసెసింగ్ ఫీజు (2%)' },
    net_disbursed: { en: 'Net Disbursed Amount', regional: 'నికర పంపిణీ మొత్తం' },
    monthly_emi: { en: 'Monthly EMI', regional: 'నెలవారీ EMI' },
    total_repayment: { en: 'Total Repayment', regional: 'మొత్తం తిరిగి చెల్లింపు' },
    view_kfs_button: { en: 'View Detailed Key Facts Statement (KFS)', regional: 'వివరణాత్మక కీ ఫ్యాక్ట్స్ స్టేట్‌మెంట్ (KFS) చూడండి' },
    accept_consent: { en: 'I have read and understood the Key Facts Statement and accept the loan offer.', regional: 'నేను కీ ఫ్యాక్ట్స్ స్టేట్‌మెంట్‌ను చదివి, అర్థం చేసుకున్నాను మరియు లోన్ ఆఫర్‌ను అంగీకరిస్తున్నాను.' },
    accept_button: { en: 'Accept Offer & Continue', regional: 'ఆఫర్‌ను అంగీకరించి కొనసాగించండి' },
  },
  sanction_letter: {
    title: { en: 'Loan Sanction Letter', regional: 'లోన్ మంజూరు లేఖ' },
    description: { en: 'Subject to terms and conditions.', regional: 'నిబంధనలు మరియు షరతులకు లోబడి' },
    borrower_details: { en: 'Borrower Details', regional: 'రుణగ్రహీత వివరాలు' },
    borrower_name: { en: 'Borrower Name', regional: 'రుణగ్రహీత పేరు' },
    app_id: { en: 'Application ID', regional: 'అప్లికేషన్ ఐడి' },
    pan: { en: 'PAN', regional: 'పాన్' },
    sanction_date: { en: 'Date of Sanction', regional: 'మంజూరు తేదీ' },
    loan_details: { en: 'Loan Details', regional: 'లోన్ వివరాలు' },
    sanctioned_amount: { en: 'Sanctioned Amount', regional: 'మంజూరు చేయబడిన మొత్తం' },
    loan_type: { en: 'Loan Type', regional: 'లోన్ రకం' },
    tenure: { en: 'Tenure', regional: 'కాలపరిమితి' },
    interest_rate: { en: 'Interest Rate', regional: 'వడ్డీ రేటు' },
    emi_amount: { en: 'EMI Amount', regional: 'EMI మొత్తం' },
    emi_start_date: { en: 'EMI Start Date', regional: 'EMI ప్రారంభ తేదీ' },
    fees_disbursal: { en: 'Fees & Disbursal', regional: 'రుసుములు & పంపిణీ' },
    processing_fee: { en: 'Processing Fee (2%)', regional: 'ప్రాసెసింగ్ ఫీజు (2%)' },
    gst: { en: 'GST (18%)', regional: 'జీఎస్టీ (18%)' },
    net_disbursal: { en: 'Net Disbursal Amount', regional: 'నికర పంపిణీ మొత్తం' },
    key_terms: { en: 'Key Terms', regional: 'ముఖ్య నిబంధనలు' },
    term1: { en: 'Sanction is subject to successful e-Mandate registration.', regional: 'మంజూరు విజయవంతమైన ఇ-మాండేట్ నమోదుకు లోబడి ఉంటుంది.' },
    term2: { en: 'Loan is subject to execution of final loan agreement.', regional: 'లోన్ తుది లోన్ ఒప్పందం అమలుకు లోబడి ఉంటుంది.' },
    term3: { en: 'You may cancel the loan before disbursement.', regional: 'మీరు పంపిణీకి ముందు లోన్‌ను రద్దు చేసుకోవచ్చు.' },
    lender_disclosure1: { en: 'Loan provided by FairFinance NBFC (Regulated Entity - RE).', regional: 'ఫెయిర్‌ఫైనాన్స్ NBFC (నియంత్రిత సంస్థ - RE) ద్వారా అందించబడిన లోన్.' },
    lender_disclosure2: { en: 'Loan facilitated by LoanSwift (Lending Service Provider - LSP).', regional: 'లోన్‌స్విఫ్ట్ (లెండింగ్ సర్వీస్ ప్రొవైడర్ - LSP) ద్వారా సులభతరం చేయబడిన లోన్.' },
    lender_disclosure3: { en: 'Grievance Contact', regional: 'ఫిర్యాదుల సంప్రదింపు' },
    accept_button: { en: 'Accept & e-Sign', regional: 'అంగీకరించి ఇ-సైన్ చేయండి' },
    decline_button: { en: 'Do Not Accept', regional: 'అంగీకరించవద్దు' },
    decline_title: { en: 'Application Paused', regional: 'అప్లికేషన్ పాజ్ చేయబడింది' },
    decline_description: { en: 'Your application ID is <ID>. Our relationship manager will contact you shortly to assist you further or clarify any questions.', regional: 'మీ అప్లికేషన్ ఐడి <ID>. మా రిలేషన్‌షిప్ మేనేజర్ మీకు మరింత సహాయం చేయడానికి లేదా ఏవైనా ప్రశ్నలను స్పష్టం చేయడానికి త్వరలో మిమ్మల్ని సంప్రదిస్తారు.' },
    support_contact: { en: 'You can also reach us at support@loanswift.com', regional: 'మీరు మమ్మల్ని support@loanswift.com వద్ద కూడా సంప్రదించవచ్చు' },
    esign_title: { en: 'e-Sign Sanction Letter', regional: 'మంజూరు లేఖను ఇ-సైన్ చేయండి' },
    esign_description: { en: 'Enter the OTP sent to your Aadhaar-linked mobile number to sign.', regional: 'సంతకం చేయడానికి మీ ఆధార్-లింక్ చేయబడిన మొబైల్ నంబర్‌కు పంపిన OTPని నమోదు చేయండి.' },
    otp_label: { en: 'Enter 6-digit OTP', regional: '6-అంకెల OTPని నమోదు చేయండి' },
    esign_button: { en: 'Verify & e-Sign', regional: 'ధృవీకరించి ఇ-సైన్ చేయండి' },
  },
  e_mandate: {
    title: { en: 'e-Mandate for Repayments', regional: 'తిరిగి చెల్లింపుల కోసం ఇ-మాండేట్' },
    description: { en: 'To automate your monthly EMI payments, please set up an e-mandate. This is a secure process handled by your bank.', regional: 'మీ నెలవారీ EMI చెల్లింపులను ఆటోమేట్ చేయడానికి, దయచేసి ఒక ఇ-మాండేట్‌ను సెటప్ చేయండి. ఇది మీ బ్యాంక్ ద్వారా నిర్వహించబడే ఒక సురక్షిత ప్రక్రియ.' },
    mandate_details_title: { en: 'Mandate Details', regional: 'మాండేట్ వివరాలు' },
    account_label: { en: 'Account', regional: 'ఖాతా' },
    emi_amount_label: { en: 'EMI Amount', regional: 'EMI మొత్తం' },
    frequency_label: { en: 'Frequency', regional: 'ఫ్రీక్వెన్సీ' },
    start_date_label: { en: 'First Debit', regional: 'మొదటి డెబిట్' },
    setup_button: { en: 'Set up Auto Debit', regional: 'ఆటో డెబిట్‌ను సెటప్ చేయండి' },
    setup_button_pending: { en: 'Redirecting to bank...', regional: 'బ్యాంక్‌కు మళ్లిస్తోంది...' },
    unable_button: { en: 'I am unable to set up auto debit', regional: 'నేను ఆటో డెబిట్‌ను సెటప్ చేయలేకపోతున్నాను' },
    success_title: { en: 'e-Mandate Registered', regional: 'ఇ-మాండేట్ నమోదు చేయబడింది' },
    success_description: { en: 'Auto-debit has been set up for your EMIs.', regional: 'మీ EMIల కోసం ఆటో-డెబిట్ సెటప్ చేయబడింది.' },
    unable_title: { en: 'Assisted Journey Required', regional: 'సహాయక ప్రయాణం అవసరం' },
    unable_description: { en: 'Your loan application has been successfully reviewed. We noticed that the auto debit setup could not be completed digitally. Our relationship manager will contact you shortly to help you complete the next steps and guide you through alternate options.', regional: 'మీ లోన్ దరఖాస్తు విజయవంతంగా సమీక్షించబడింది. ఆటో డెబిట్ సెటప్ డిజిటల్‌గా పూర్తి కాలేదని మేము గమనించాము. మా రిలేషన్‌షిప్ మేనేజర్ తదుపరి దశలను పూర్తి చేయడంలో మీకు సహాయం చేయడానికి మరియు ప్రత్యామ్నాయ ఎంపికల ద్వారా మీకు మార్గనిర్దేశం చేయడానికి త్వరలో మిమ్మల్ని సంప్రదిస్తారు.' },
    app_id: { en: 'Application ID', regional: 'అప్లికేషన్ ఐడి' },
    sanctioned_amount: { en: 'Approved Loan Amount', regional: 'ఆమోదించబడిన రుణ మొత్తం' },
    support_contact: { en: 'Thank you for choosing LoanSwift.', regional: 'లోన్‌స్విఫ్ట్‌ను ఎంచుకున్నందుకు ధన్యవాదాలు.' },
  },
  agreement: {
    title: { en: 'Digital Loan Agreement (e-Sign)', regional: 'డిజిటల్ లోన్ ఒప్పందం (ఇ-సైన్)' },
    description: { en: 'Review the terms and sign the agreement using an Aadhaar-based OTP.', regional: 'నిబంధనలను సమీక్షించి, ఆధార్-ఆధారిత OTPని ఉపయోగించి ఒప్పందంపై సంతకం చేయండి.' },
    borrower_details: { en: 'Borrower Details', regional: 'రుణగ్రహీత వివరాలు' },
    borrower_name: { en: 'Borrower Name', regional: 'రుణగ్రహీత పేరు' },
    app_id: { en: 'Application ID', regional: 'అప్లికేషన్ ఐడి' },
    pan: { en: 'PAN', regional: 'పాన్' },
    loan_details: { en: 'Loan Details', regional: 'లోన్ వివరాలు' },
    sanctioned_amount: { en: 'Sanctioned Amount', regional: 'మంజూరు చేయబడిన మొత్తం' },
    tenure: { en: 'Tenure', regional: 'కాలపరిమితి' },
    interest_rate: { en: 'Interest Rate', regional: 'వడ్డీ రేటు' },
    fees_disbursal: { en: 'Fees & Charges', regional: 'రుసుములు & ఛార్జీలు' },
    processing_fee: { en: 'Processing Fee (2%)', regional: 'ప్రాసెసింగ్ ఫీజు (2%)' },
    gst: { en: 'GST (18%) on Fee', regional: 'ఫీజుపై జీఎస్టీ (18%)' },
    net_disbursal: { en: 'Net Disbursal Amount', regional: 'నికర పంపిణీ మొత్తం' },
    repayment_terms: { en: 'Repayment Terms', regional: 'తిరిగి చెల్లింపు నిబంధనలు' },
    emi_amount: { en: 'EMI Amount', regional: 'EMI మొత్తం' },
    emi_start_date: { en: 'EMI Start Date', regional: 'EMI ప్రారంభ తేదీ' },
    repayment_mode: { en: 'Repayment Mode', regional: 'తిరిగి చెల్లింపు విధానం' },
    legal_disclosure: { en: 'Legal & Regulatory Disclosures', regional: 'చట్టపరమైన & నియంత్రణ బహిర్గతం' },
    lender_disclosure1: { en: 'Loan provided by FairFinance NBFC (Regulated Entity - RE).', regional: 'ఫెయిర్‌ఫైనాన్స్ NBFC (నియంత్రిత సంస్థ - RE) ద్వారా అందించబడిన లోన్.' },
    lender_disclosure2: { en: 'Loan facilitated by LoanSwift (Lending Service Provider - LSP).', regional: 'లోన్‌స్విఫ్ట్ (లెండింగ్ సర్వీస్ ప్రొవైడర్ - LSP) ద్వారా సులభతరం చేయబడిన లోన్.' },
    lender_disclosure3: { en: 'Grievance Contact', regional: 'ఫిర్యాదుల సంప్రదింపు' },
    declaration_title: { en: 'Declaration & Consent', regional: 'ప్రకటన & సమ్మతి' },
    declaration_content: { en: 'I have read, understood, and agree to the terms and conditions of this loan agreement.', regional: 'నేను ఈ లోన్ ఒప్పందం యొక్క నిబంధనలు మరియు షరతులను చదివి, అర్థం చేసుకుని, అంగీకరిస్తున్నాను.' },
    sign_button: { en: 'Sign via Aadhaar OTP', regional: 'ఆధార్ OTP ద్వారా సైన్ చేయండి' },
    otp_label: { en: 'Enter OTP sent to your Aadhaar-linked mobile', regional: 'మీ ఆధార్-లింక్ చేయబడిన మొబైల్‌కు పంపిన OTPని నమోదు చేయండి' },
    otp_placeholder: { en: 'Enter 6-digit OTP', regional: '6-అంకెల OTPని నమోదు చేయండి' },
    verify_button: { en: 'Verify & e-Sign', regional: 'ధృవీకరించి ఇ-సైన్ చేయండి' },
  },
  disbursement: {
    success_title: { en: 'Disbursement Initiated', regional: 'పంపిణీ ప్రారంభించబడింది' },
    processing_message: { en: 'Your loan request has been successfully processed.', regional: 'మీ లోన్ అభ్యర్థన విజయవంతంగా ప్రాసెస్ చేయబడింది.' },
    credited_soon_message: { en: 'The approved amount will be credited to your bank account shortly (within 10-15 minutes).', regional: 'ఆమోదించబడిన మొత్తం త్వరలో (10-15 నిమిషాల్లో) మీ బ్యాంక్ ఖాతాలో జమ చేయబడుతుంది.' },
    details_title: { en: 'Disbursement Details', regional: 'పంపిణీ వివరాలు' },
    amount_label: { en: 'Amount:', regional: 'మొత్తం:' },
    account_label: { en: 'Bank Account:', regional: 'బ్యాంక్ ఖాతా:' },
    ref_label: { en: 'Transaction Ref:', regional: 'లావాదేవీ రిఫరెన్స్:' },
    back_to_dashboard_button: { en: 'Back to Dashboard', regional: 'డాష్‌బోర్డ్‌కు తిరిగి వెళ్ళు' },
    ready_title: { en: 'Ready for Disbursement', regional: 'పంపిణీకి సిద్ధంగా ఉంది' },
    ready_description: { en: 'All formalities are complete. Please confirm to receive the net loan amount in your verified bank account.', regional: 'అన్ని లాంఛనాలు పూర్తయ్యాయి. దయచేసి మీ ధృవీకరించబడిన బ్యాంక్ ఖాతాలో నికర రుణ మొత్తాన్ని స్వీకరించడానికి నిర్ధారించండి.' },
    final_disbursement_title: { en: 'Final Disbursement', regional: 'తుది పంపిణీ' },
    net_amount_label: { en: 'Net Amount to be Credited:', regional: 'జమ చేయవలసిన నికర మొత్తం:' },
    to_account_label: { en: 'To Account:', regional: 'ఖాతాకు:' },
    timeline_label: { en: 'Timeline:', regional: 'కాలక్రమం:' },
    timeline_value: { en: '10-15 mins', regional: '10-15 నిమిషాలు' },
    confirm_disbursement_button: { en: 'Confirm & Proceed', regional: 'నిర్ధారించి ముందుకు సాగండి' },
    not_ready_button: { en: 'I am not ready to proceed', regional: 'నేను ముందుకు సాగడానికి సిద్ధంగా లేను' },
    initiate_button: { en: 'Initiate Disbursement', regional: 'పంపిణీని ప్రారంభించండి' },
    processing_button: { en: 'Processing Disbursement...', regional: 'పంపిణీ ప్రాసెస్ చేస్తోంది...' },
    assisted_title: { en: 'Application Paused', regional: 'అప్లికేషన్ పాజ్ చేయబడింది' },
    assisted_description: { en: 'Your loan application is almost complete. If you need more time or assistance before disbursement, our relationship manager will contact you shortly to guide you further.', regional: 'మీ లోన్ దరఖాస్తు దాదాపు పూర్తయింది. పంపిణీకి ముందు మీకు ఎక్కువ సమయం లేదా సహాయం అవసరమైతే, మా రిలేషన్‌షిప్ మేనేజర్ మీకు తదుపరి మార్గనిర్దేశం చేయడానికి త్వరలో మిమ్మల్ని సంప్రదిస్తారు.' },
    app_id_label: { en: 'Application ID', regional: 'అప్లికేషన్ ఐడి' },
  },
};

const kn: Dictionary = {
  login: {
    title: { en: 'Verify Your Mobile', regional: 'ನಿಮ್ಮ ಮೊಬೈಲ್ ಪರಿಶೀಲಿಸಿ' },
    description: { en: "We'll send a one-time password (OTP) to your mobile number to get started.", regional: 'ಪ್ರಾರಂಭಿಸಲು ನಾವು ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಒಂದು-ಬಾರಿ ಪಾಸ್‌ವರ್ಡ್ (OTP) ಕಳುಹಿಸುತ್ತೇವೆ.' },
    mobile_label: { en: 'Mobile Number', regional: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ' },
    mobile_placeholder: { en: 'Enter 10-digit mobile number', regional: '10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ' },
    button_text: { en: 'Get OTP', regional: 'OTP ಪಡೆಯಿರಿ' },
    otp_sent_title: { en: 'OTP Sent', regional: 'OTP ಕಳುಹಿಸಲಾಗಿದೆ' },
    otp_sent_description: { en: 'An OTP has been sent to', regional: 'ಒಂದು OTP ಕಳುಹಿಸಲಾಗಿದೆ' },
  },
  otp_verify: {
    title: { en: 'Enter OTP', regional: 'OTP ನಮೂದಿಸಿ' },
    description: { en: 'An OTP has been sent to +91 <mobile>.', regional: '+91 <mobile> ಗೆ ಒಂದು OTP ಕಳುಹಿಸಲಾಗಿದೆ.' },
    otp_label: { en: '6-Digit OTP', regional: '6-ಅಂಕಿಯ OTP' },
    otp_placeholder: { en: '123456', regional: '೧೨೩೪೫೬' },
    button_text: { en: 'Verify OTP', regional: 'OTP ಪರಿಶೀಲಿಸಿ' },
    resend_button: { en: 'Resend OTP', regional: 'OTP ಮರುಕಳುಹಿಸಿ' },
    resent_toast: { en: 'OTP Resent', regional: 'OTP ಮರುಕಳುಹಿಸಲಾಗಿದೆ' },
    success_title: { en: 'Verification Successful', regional: 'ಪರಿಶೀಲನೆ ಯಶಸ್ವಿಯಾಗಿದೆ' },
    success_description: { en: 'You have been successfully verified.', regional: 'ನೀವು ಯಶಸ್ವಿಯಾಗಿ ಪರಿಶೀಲಿಸಲ್ಪಟ್ಟಿದ್ದೀರಿ.' },
    failure_title: { en: 'Verification Failed', regional: 'ಪರಿಶೀಲನೆ ವಿಫಲವಾಗಿದೆ' },
    failure_description: { en: 'An unexpected error occurred.', regional: 'ಒಂದು ಅನಿರೀಕ್ಷಿತ ದೋಷ ಸಂಭವಿಸಿದೆ.' },
    invalid_otp_title: { en: 'Invalid OTP', regional: 'ಅಮಾನ್ಯ OTP' },
    invalid_otp_description: { en: 'The OTP you entered is incorrect. Please try again.', regional: 'ನೀವು ನಮೂದಿಸಿದ OTP ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' },
  },
  consent: {
    title: { en: 'Consent Hub', regional: 'ಸಮ್ಮತಿ ಕೇಂದ್ರ' },
    description: { en: 'As per RBI guidelines, we need your explicit consent for the following data processing activities.', regional: 'RBI ಮಾರ್ಗಸೂಚಿಗಳ ಪ್ರಕಾರ, ಈ ಕೆಳಗಿನ ಡೇಟಾ ಸಂಸ್ಕರಣಾ ಚಟುವಟಿಕೆಗಳಿಗೆ ನಮಗೆ ನಿಮ್ಮ ಸ್ಪಷ್ಟ ಸಮ್ಮತಿ ಬೇಕು.' },
    items: {
        PAN_VERIFICATION: { en: 'I consent to verification of my PAN from issuing authority/NSDL.', regional: 'ನನ್ನ ಪ್ಯಾನ್ ಅನ್ನು ನೀಡುವ ಪ್ರಾಧಿಕಾರ/NSDL ನಿಂದ ಪರಿಶೀಲಿಸಲು ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ.' },
        AADHAAR_AUTH: { en: 'I consent to Aadhaar OTP-based offline verification / e-KYC through authorized partners.', regional: 'ಅಧಿಕೃತ ಪಾಲುದಾರರ ಮೂಲಕ ಆಧಾರ್ ಒಟಿಪಿ-ಆಧಾರಿತ ಆಫ್‌ಲೈನ್ ಪರಿಶೀಲನೆ / ಇ-ಕೆವೈಸಿಗೆ ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ.' },
        DIGILOCKER_KYC: { en: 'I consent to fetch KYC documents from DigiLocker using my DigiLocker account.', regional: 'ನನ್ನ ಡಿಜಿಲಾಕರ್ ಖಾತೆಯನ್ನು ಬಳಸಿಕೊಂಡು ಡಿಜಿಲಾಕರ್‌ನಿಂದ ಕೆವೈಸಿ ದಾಖಲೆಗಳನ್ನು ಪಡೆಯಲು ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ.' },
        BUREAU_PULL: { en: 'I consent to pull my credit report from credit bureaus for the purpose of this loan.', regional: 'ಈ ಸಾಲದ ಉದ್ದೇಶಕ್ಕಾಗಿ ಕ್ರೆಡಿಟ್ ಬ್ಯೂರೋಗಳಿಂದ ನನ್ನ ಕ್ರೆಡಿಟ್ ವರದಿಯನ್ನು ಎಳೆಯಲು ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ.' },
        BANK_VERIFICATION: { en: 'I consent to verification of my bank account and registration of e-mandate for EMI debit.', regional: 'ನನ್ನ ಬ್ಯಾಂಕ್ ಖಾತೆಯ ಪರಿಶೀಲನೆಗೆ ಮತ್ತು ಇಎಂಐ ಡೆಬಿಟ್‌ಗಾಗಿ ಇ-ಮ್ಯಾಂಡೇಟ್ ನೋಂದಣಿಗೆ ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ.' },
        DATA_SHARING: { en: 'I consent to processing of my data by the NBFC/BANK (RE) and its authorized service providers, in line with RBI digital lending guidelines.', regional: 'RBI ಡಿಜಿಟಲ್ ಸಾಲ ಮಾರ್ಗಸೂಚಿಗಳಿಗೆ ಅನುಗುಣವಾಗಿ, NBFC/BANK (RE) ಮತ್ತು ಅದರ ಅಧಿಕೃತ ಸೇವಾ ಪೂರೈಕೆದಾರರಿಂದ ನನ್ನ ಡೇಟಾವನ್ನು ಸಂಸ್ಕರಿಸಲು ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ.' },
        AGREE_NOTICE: { en: 'I have read and agree to these consents and the privacy notice.', regional: 'ನಾನು ಈ ಸಮ್ಮತಿಗಳನ್ನು ಮತ್ತು ಗೌಪ್ಯತೆ ಸೂಚನೆಯನ್ನು ಓದಿದ್ದೇನೆ ಮತ್ತು ಒಪ್ಪುತ್ತೇನೆ.' },
    },
    agree_notice_text: { en: 'By checking the boxes above and clicking "Accept & Continue", I, the applicant, hereby provide my explicit consent to LoanSwift (the LSP) and its partner FairFinance NBFC (the RE) to access, process, and store my personal and financial information for the purpose of this loan application. This includes sharing data with credit bureaus (e.g., CIBIL), and using third-party services for PAN, Aadhaar, and bank account verification. This consent is voluntary and can be revoked as per the terms outlined in our privacy policy.', regional: 'ಮೇಲಿನ ಬಾಕ್ಸ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸುವ ಮೂಲಕ ಮತ್ತು "ಒಪ್ಪಿ ಮತ್ತು ಮುಂದುವರಿಸಿ" ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ, ನಾನು, ಅರ್ಜಿದಾರ, ಈ ಸಾಲದ ಅರ್ಜಿಯ ಉದ್ದೇಶಕ್ಕಾಗಿ ನನ್ನ ವೈಯಕ್ತಿಕ ಮತ್ತು ಹಣಕಾಸು ಮಾಹಿತಿಯನ್ನು ಪ್ರವೇಶಿಸಲು, ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು ಮತ್ತು ಸಂಗ್ರಹಿಸಲು ಲೋನ್‌ಸ್ವಿಫ್ಟ್ (LSP) ಮತ್ತು ಅದರ ಪಾಲುದಾರ ಫೇರ್‌ಫೈನಾನ್ಸ್ NBFC (RE) ಗೆ ನನ್ನ ಸ್ಪಷ್ಟ ಸಮ್ಮತಿಯನ್ನು ನೀಡುತ್ತೇನೆ. ಇದು ಕ್ರೆಡಿಟ್ ಬ್ಯೂರೋಗಳೊಂದಿಗೆ (ಉದಾಹರಣೆಗೆ, ಸಿಬಿಲ್) ಡೇಟಾವನ್ನು ಹಂಚಿಕೊಳ್ಳುವುದು ಮತ್ತು ಪ್ಯಾన్, ಆಧಾರ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಖಾತೆ ಪರಿಶೀಲನೆಗಾಗಿ ತೃತೀಯ ಸೇವೆಗಳನ್ನು ಬಳಸುವುದು ಒಳಗೊಂಡಿರುತ್ತದೆ. ಈ ಸಮ್ಮತಿ ಸ್ವಯಂಪ್ರೇರಿತವಾಗಿದೆ ಮತ್ತು ನಮ್ಮ ಗೌಪ್ಯತೆ ನೀತಿಯಲ್ಲಿ ವಿವರಿಸಿದ ನಿಯಮಗಳ ಪ್ರಕಾರ ಅದನ್ನು ಹಿಂತೆಗೆದುಕೊಳ್ಳಬಹುದು.' },
    accept_button: { en: 'Accept & Continue', regional: 'ಒಪ್ಪಿ ಮತ್ತು ಮುಂದುವರಿಸಿ' },
    all_consents_required: { en: 'You must accept all consents to proceed.', regional: 'ಮುಂದುವರಿಯಲು ನೀವು ಎಲ್ಲಾ ಸಮ್ಮತಿಗಳನ್ನು ಒಪ್ಪಿಕೊಳ್ಳಬೇಕು.' },
  },
  personal_details: {
    title: { en: 'Personal Details', regional: 'ವೈಯಕ್ತಿಕ ವಿವರಗಳು' },
    full_name_label: { en: 'Full Name (as per PAN)', regional: 'ಪೂರ್ಣ ಹೆಸರು (ಪ್ಯಾನ್ ಪ್ರಕಾರ)' },
    full_name_placeholder: { en: 'John Doe', regional: 'ಜಾನ್ ಡೋ' },
    pan_label: { en: 'PAN Number', regional: 'ಪ್ಯಾನ್ ಸಂಖ್ಯೆ' },
    pan_placeholder: { en: 'ABCDE1234F', regional: 'ABCDE1234F' },
    dob_label: { en: 'Date of Birth', regional: 'ಹುಟ್ಟಿದ ದಿನಾಂಕ' },
    dob_placeholder: { en: 'Select your Date of Birth', regional: 'ನಿಮ್ಮ ಜನ್ಮ ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ' },
    employment_label: { en: 'Employment Type', regional: 'ಉದ್ಯೋಗದ ಪ್ರಕಾರ' },
    employment_placeholder: { en: 'Select your employment type', regional: 'ನಿಮ್ಮ ಉದ್ಯೋಗದ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ' },
    income_label: { en: 'Monthly Net Income (₹)', regional: 'ಮಾಸಿಕ ನಿವ್ವಳ ಆದಾಯ (₹)' },
    income_placeholder: { en: '40000', regional: '40000' },
    loan_amount_label: { en: 'Loan Amount Required (₹)', regional: 'ಅಗತ್ಯವಿರುವ ಸಾಲದ ಮೊತ್ತ (₹)' },
    loan_amount_placeholder: { en: '100000', regional: '100000' },
    address_label: { en: 'Current Address', regional: 'ಪ್ರಸ್ತುತ ವಿಳಾಸ' },
    address_placeholder: { en: 'Address Line', regional: 'ವಿಳಾಸದ ಸಾಲು' },
    city_placeholder: { en: 'City', regional: 'ನಗರ' },
    pincode_placeholder: { en: 'Pincode', regional: 'ಪಿನ್‌ಕೋಡ್' },
    consent_label: { en: 'Explicit Consent', regional: 'ಸ್ಪಷ್ಟ ಸಮ್ಮತಿ' },
    consent_description: { en: 'I hereby consent to LoanSwift fetching my credit information and other details for the purpose of this loan application.', regional: 'ಈ ಸಾಲದ ಅರ್ಜಿಯ ಉದ್ದೇಶಕ್ಕಾಗಿ ನನ್ನ ಕ್ರೆಡಿಟ್ ಮಾಹಿತಿ ಮತ್ತು ಇತರ ವಿವರಗಳನ್ನು ಪಡೆಯಲು ನಾನು ಲೋన్‌ಸ್ವಿಫ್ಟ್‌ಗೆ ಈ ಮೂಲಕ ಸಮ್ಮತಿಸುತ್ತೇನೆ.' },
    save_button: { en: 'Save and Continue', regional: 'ಉಳಿಸಿ ಮತ್ತು ಮುಂದುವರಿಸಿ' },
  },
  kyc: {
    pan_title: { en: 'PAN Verification', regional: 'ಪ್ಯಾన్ ಪರಿಶೀಲನೆ' },
    pan_description: { en: 'Pre-filled based on earlier details. Please review and edit if required.', regional: 'ಹಿಂದಿನ ವಿವರಗಳ ಆಧಾರದ ಮೇಲೆ ಪೂರ್ವ-ಭರ್ತಿ ಮಾಡಲಾಗಿದೆ. ದಯವಿಟ್ಟು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಅಗತ್ಯವಿದ್ದರೆ ಸಂಪಾದಿಸಿ.' },
    pan_verified_title: { en: 'PAN Verified', regional: 'ಪ್ಯಾన్ ಪರಿಶೀಲಿಸಲಾಗಿದೆ' },
    pan_verified_description: { en: 'Your PAN has been successfully verified.', regional: 'ನಿಮ್ಮ ಪ್ಯಾన్ ಯಶಸ್ವಿಯಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ.' },
    pan_button: { en: 'Verify PAN', regional: 'ಪ್ಯಾన్ ಪರಿಶೀಲಿಸಿ' },
    aadhaar_title: { en: 'Aadhaar e-KYC', regional: 'ಆಧಾರ್ ಇ-ಕೆವೈಸಿ' },
    aadhaar_description: { en: 'Enter your Aadhaar to perform e-KYC via OTP.', regional: 'ಒಟಿಪಿ ಮೂಲಕ ಇ-ಕೆವೈಸಿ ಮಾಡಲು ನಿಮ್ಮ ಆಧಾರ್ ಅನ್ನು ನಮೂದಿಸಿ.' },
    aadhaar_verified_title: { en: 'Aadhaar Verified', regional: 'ಆಧಾರ್ ಪರಿಶೀಲಿಸಲಾಗಿದೆ' },
    aadhaar_verified_description: { en: 'Your Aadhaar e-KYC is complete.', regional: 'ನಿಮ್ಮ ಆಧಾರ್ ಇ-ಕೆವೈಸಿ ಪೂರ್ಣಗೊಂಡಿದೆ.' },
    aadhaar_label: { en: 'Aadhaar Number', regional: 'ಆಧಾರ್ ಸಂಖ್ಯೆ' },
    aadhaar_placeholder: { en: '1234 5678 9012', regional: '೧೨೩೪ ೫೬೭೮ ೯೦೧೨' },
    send_otp_button: { en: 'Send OTP', regional: 'ಒಟಿಪಿ ಕಳುಹಿಸಿ' },
    otp_label: { en: 'Enter OTP', regional: 'ಒಟಿಪಿ ನಮೂದಿಸಿ' },
    otp_placeholder: { en: 'Enter 6-digit OTP (123456)', regional: '6-ಅಂಕಿಯ ಒಟಿಪಿ ನಮೂದಿಸಿ (೧೨೩೪೫೬)' },
    verify_otp_button: { en: 'Verify OTP', regional: 'ಒಟಿಪಿ ಪರಿಶೀಲಿಸಿ' },
    continue_button: { en: 'Continue to Document Verification', regional: 'ದಾಖಲೆ ಪರಿಶೀಲನೆಗೆ ಮುಂದುವರಿಸಿ' },
  },
  doc_verification: {
    digilocker_title: { en: 'Option 1: Use DigiLocker', regional: 'ಆಯ್ಕೆ 1: ಡಿಜಿಲಾಕರ್ ಬಳಸಿ' },
    digilocker_description: { en: 'Fetch your Aadhaar and PAN instantly for faster processing.', regional: 'ವೇಗದ ಪ್ರಕ್ರಿಯೆಗಾಗಿ ನಿಮ್ಮ ಆಧಾರ್ ಮತ್ತು ಪ್ಯಾನ್ ಅನ್ನು ತಕ್ಷಣವೇ ಪಡೆಯಿರಿ.' },
    digilocker_button: { en: 'Connect to DigiLocker', regional: 'ಡಿಜಿಲಾಕರ್‌ಗೆ ಸಂಪರ್ಕಿಸಿ' },
    manual_title: { en: 'Option 2: Manual Upload', regional: 'ಆಯ್ಕೆ 2: ಹಸ್ತಚಾಲಿತ ಅಪ್‌ಲೋಡ್' },
    manual_description: { en: "Upload your documents manually. We'll use OCR to verify them.", regional: 'ನಿಮ್ಮ ದಾಖಲೆಗಳನ್ನು ಹಸ್ತಚಾಲಿತವಾಗಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ನಾವು ಅವುಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಓಸಿಆರ್ ಬಳಸುತ್ತೇವೆ.' },
    upload_button: { en: 'Upload', regional: 'ಅಪ್‌ಲೋಡ್' },
    verifying_toast: { en: 'uploading and verifying...', regional: 'ಅಪ್‌ಲೋಡ್ ಮತ್ತು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...' },
    verified_toast: { en: 'Verified', regional: 'ಪರಿಶೀಲಿಸಲಾಗಿದೆ' },
    upload_pending_badge: { en: 'Pending', regional: 'ಬಾಕಿ ಉಳಿದಿದೆ' },
    upload_uploaded_badge: { en: 'Uploaded, Verifying...', regional: 'ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ, ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...' },
    upload_verified_ocr_badge: { en: 'Verified via OCR', regional: 'ಓಸಿಆರ್ ಮೂಲಕ ಪರಿಶೀಲಿಸಲಾಗಿದೆ' },
    upload_verified_digital_badge: { en: 'Digitally Verified', regional: 'ಡಿಜಿಟಲ್ ಆಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ' },
    continue_button: { en: 'Continue to Eligibility', regional: 'ಅರ್ಹತೆಗೆ ಮುಂದುವರಿಸಿ' },
    digilocker_modal_title: { en: 'Share Documents from DigiLocker', regional: 'ಡಿಜಿಲಾಕರ್‌ನಿಂದ ದಾಖಲೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ' },
    digilocker_modal_description: { en: 'Select the documents you want to share for KYC verification.', regional: 'ಕೆವೈಸಿ ಪರಿಶೀಲನೆಗಾಗಿ ನೀವು ಹಂಚಿಕೊಳ್ಳಲು ಬಯಸುವ ದಾಖಲೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.' },
    digilocker_modal_share_button: { en: 'Share Selected Documents', regional: 'ಆಯ್ದ ದಾಖಲೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ' },
    processing_title: { en: 'Verifying Documents & Checking Credit...', regional: 'ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ ಮತ್ತು ಕ್ರೆಡಿಟ್ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...' },
    processing_description: { en: 'Please wait while we securely process your information.', regional: 'ನಾವು ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುವಾಗ ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ.' },
    summary_title: { en: 'KYC Matching Summary', regional: 'ಕೆವೈಸಿ ಹೊಂದಾಣಿಕೆ ಸಾರಾಂಶ' },
    summary_description: { en: "We've matched your provided details against your verified documents. Aadhaar is the primary source of truth.", regional: 'ನಾವು ನಿಮ್ಮ ಒದಗಿಸಿದ ವಿವರಗಳನ್ನು ನಿಮ್ಮ ಪರಿಶೀಲಿಸಿದ ದಾಖಲೆಗಳೊಂದಿಗೆ ಹೊಂದಿಸಿದ್ದೇವೆ. ಆಧಾರ್ ಸತ್ಯದ ಪ್ರಾಥಮಿಕ ಮೂಲವಾಗಿದೆ.' },
    summary_name_label: { en: 'Full Name', regional: 'ಪೂರ್ಣ ಹೆಸರು' },
    summary_dob_label: { en: 'Date of Birth', regional: 'ಹುಟ್ಟಿದ ದಿನಾಂಕ' },
    summary_address_label: { en: 'Address', regional: 'ವಿಳಾಸ' },
    summary_pan_label: { en: 'PAN', regional: 'ಪ್ಯಾನ್' },
    summary_match_badge: { en: 'Matches Aadhaar', regional: 'ಆಧಾರ್‌ಗೆ ಹೊಂದುತ್ತದೆ' },
    summary_mismatch_badge: { en: 'Does Not Match', regional: 'ಹೊಂದುವುದಿಲ್ಲ' },
    summary_partial_match_badge: { en: 'Partial Match', regional: 'ಭಾಗಶಃ ಹೊಂದಾಣಿಕೆ' },
  },
  eligibility: {
    rejected_title: { en: 'Application Not Approved', regional: 'ಅರ್ಜಿ ಅಂಗೀಕರಿಸಲಾಗಿಲ್ಲ' },
    rejected_description: { en: 'We are unable to proceed with your loan application at this time based on our current lending policies.', regional: 'ನಮ್ಮ ಪ್ರಸ್ತುತ ಸಾಲ ನೀತಿಗಳ ಆಧಾರದ ಮೇಲೆ ಈ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮ ಸಾಲದ ಅರ್ಜಿಯೊಂದಿಗೆ ಮುಂದುವರಿಯಲು ನಮಗೆ ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ.' },
    back_home_button: { en: 'Back to Home', regional: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ' },
    finalizing_title: { en: 'Finalizing Eligibility...', regional: 'ಅರ್ಹತೆಯನ್ನು ಅಂತಿಮಗೊಳಿಸಲಾಗುತ್ತಿದೆ...' },
    finalizing_description: { en: 'This should only take a moment.', regional: 'ಇದಕ್ಕೆ ಕೇವಲ ಒಂದು ಕ್ಷಣ ಬೇಕು.' },
    report_summary_title: { en: 'Your Credit Report Summary', regional: 'ನಿಮ್ಮ ಕ್ರೆಡಿಟ್ ವರದಿ ಸಾರಾಂಶ' },
    score_band_excellent: { en: 'Excellent', regional: 'ಅತ್ಯುತ್ತಮ' },
    score_band_good: { en: 'Good', regional: 'ಒಳ್ಳೆಯದು' },
    score_band_fair: { en: 'Fair', regional: 'ಸಾಧಾರಣ' },
    score_band_poor: { en: 'Poor', regional: 'ಕಳಪೆ' },
    cibil_score_label: { en: 'CIBIL Score', regional: 'ಸಿಬಿಲ್ ಸ್ಕೋರ್' },
    active_loans_label: { en: 'Active Loans', regional: 'ಸಕ್ರಿಯ ಸಾಲಗಳು' },
    overdue_label: { en: 'Overdue', regional: 'ಬಾಕಿ' },
    enquiries_label: { en: 'Recent Enquiries', regional: 'ಇತ್ತೀಚಿನ ವಿಚಾರಣೆಗಳು' },
    upsell_title: { en: 'Great News!', regional: 'ಒಳ್ಳೆಯ ಸುದ್ದಿ!' },
    upsell_description: { en: "You applied for <requested>, but you're eligible for up to <eligible>.", regional: 'ನೀವು <requested> ಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ್ದೀರಿ, ಆದರೆ ನೀವು <eligible> ವರೆಗೆ ಅರ್ಹರಾಗಿದ್ದೀರಿ.' },
    select_amount_label: { en: 'Select Your Loan Amount', regional: 'ನಿಮ್ಮ ಸಾಲದ ಮೊತ್ತವನ್ನು ಆಯ್ಕೆಮಾಡಿ' },
    recommended_badge: { en: 'Recommended', regional: 'ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ' },
    lower_amount_requested: { en: "You applied for: {amount}", regional: "ನೀವು ಇದಕ್ಕಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ್ದೀರಿ: {amount}" },
    lower_amount_approved: { en: "Based on your profile, the approved loan amount is:", regional: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಆಧರಿಸಿ, ಅನುಮೋದಿತ ಸಾಲದ ಮೊತ್ತ:" },
    lower_amount_reason: { en: "This amount is approved based on your credit profile and repayment capacity.", regional: "ಈ ಮೊತ್ತವನ್ನು ನಿಮ್ಮ ಕ್ರೆಡಿಟ್ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಮರುಪಾವತಿ ಸಾಮರ್ಥ್ಯದ ಆಧಾರದ ಮೇಲೆ ಅನುಮೋದಿಸಲಾಗಿದೆ." },
    lower_amount_accept_button: { en: "Continue with {amount}", regional: "{amount} ನೊಂದಿಗೆ ಮುಂದುವರಿಸಿ" },
    lower_amount_decline_button: { en: "I do not wish to continue", regional: "ನಾನು ಮುಂದುವರಿಯಲು ಇಷ್ಟಪಡುವುದಿಲ್ಲ" },
    assisted_journey_title: { en: "Assisted Journey", regional: "ಸಹಾಯದ ಪ್ರಯಾಣ" },
    assisted_journey_description: { en: "Your loan application has been successfully reviewed.\n\nWe noticed that the auto debit setup could not be completed digitally. Our relationship manager will contact you shortly to help you complete the next steps and guide you through alternate options.\n\nThank you for choosing LoanSwift.", regional: "ನಿಮ್ಮ ಸಾಲದ ಅರ್ಜಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ.\n\nಆಟೋ ಡೆಬಿಟ್ ಸೆಟಪ್ ಅನ್ನು ಡಿಜಿಟಲ್ ಆಗಿ ಪೂರ್ಣಗೊಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ ಎಂದು ನಾವು ಗಮನಿಸಿದ್ದೇವೆ. ಮುಂದಿನ ಹಂತಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ಮತ್ತು ಪರ್ಯಾಯ ಆಯ್ಕೆಗಳ ಮೂಲಕ ನಿಮಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಲು ನಮ್ಮ ಸಂಬಂಧ ವ್ಯವಸ್ಥಾಪಕರು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.\n\nಲೋನ್‌ಸ್ವಿಫ್ಟ್ ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು." },
    app_id_label: { en: 'Application ID', regional: 'ಅರ್ಜಿ ಐಡಿ' },
    thank_you_message: { en: 'Thank you for considering LoanSwift.', regional: 'ಲೋನ್‌ಸ್ವಿಫ್ಟ್ ಅನ್ನು ಪರಿಗಣಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು.' },
    tenure_label: { en: 'Choose your tenure', regional: 'ನಿಮ್ಮ ಅವಧಿಯನ್ನು ಆರಿಸಿ' },
    tenure_description: { en: 'Select a plan to see your monthly payment.', regional: 'ನಿಮ್ಮ ಮಾಸಿಕ ಪಾವತಿಯನ್ನು ನೋಡಲು ಒಂದು ಯೋಜನೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.' },
    plan_title: { en: 'Your Selected Plan', regional: 'ನಿಮ್ಮ ಆಯ್ಕೆ ಮಾಡಿದ ಯೋಜನೆ' },
    per_month_label: { en: '/ month', regional: '/ ತಿಂಗಳು' },
    for_months_label: { en: 'months', regional: 'ತಿಂಗಳುಗಳು' },
    at_interest_label: { en: '% p.a.', regional: '% ವಾರ್ಷಿಕ' },
    schedule_preview_title: { en: 'Payment Schedule Preview', regional: 'ಪಾವತಿ ವೇಳಾಪಟ್ಟಿ ಪೂರ್ವವೀಕ್ಷಣೆ' },
    confirm_consent_label: { en: 'I confirm that I have reviewed and chosen this loan tenure and EMI.', regional: 'ನಾನು ಈ ಸಾಲದ ಅವಧಿ ಮತ್ತು ಇಎಂಐ ಅನ್ನು ಪರಿಶೀಲಿಸಿದ್ದೇನೆ ಮತ್ತು ಆಯ್ಕೆ ಮಾಡಿದ್ದೇನೆ ಎಂದು ನಾನು ಖಚಿತಪಡಿಸುತ್ತೇನೆ.' },
    confirm_button: { en: 'Confirm Loan Amount & Continue', regional: 'ಸಾಲದ ಮೊತ್ತವನ್ನು ಖಚಿತಪಡಿಸಿ ಮತ್ತು ಮುಂದುವರಿಸಿ' },
    validation_message: { en: 'Please select a tenure and confirm your choice to proceed.', regional: 'ಮುಂದುವರಿಯಲು ದಯವಿಟ್ಟು ಅವಧಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಆಯ್ಕೆಯನ್ನು ಖಚಿತಪಡಿಸಿ.' },
    approved_amount_label: { en: 'Approved Loan Amount', regional: 'ಅನುಮೋದಿತ ಸಾಲದ ಮೊತ್ತ' },
  },
  kfs: {
    title: { en: 'Your Loan Offer Summary', regional: 'ನಿಮ್ಮ ಸಾಲದ ಕೊಡುಗೆಯ ಸಾರಾಂಶ' },
    description: { en: 'Please review and accept your final loan details.', regional: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಅಂತಿಮ ಸಾಲದ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಒಪ್ಪಿಕೊಳ್ಳಿ.' },
    kfs_title: { en: 'Key Facts Statement', regional: 'ಪ್ರಮುಖ ವಾಸ್ತವಗಳ ಹೇಳಿಕೆ' },
    kfs_description: { en: 'This document summarizes all terms of your loan offer.', regional: 'ಈ ಡಾಕ್ಯುಮೆಂಟ್ ನಿಮ್ಮ ಸಾಲದ ಕೊಡುಗೆಯ ಎಲ್ಲಾ ನಿಯಮಗಳನ್ನು ಸಾರಾಂಶಿಸುತ್ತದೆ.' },
    loan_amount: { en: 'Loan Amount', regional: 'ಸಾಲದ ಮೊತ್ತ' },
    processing_fee: { en: 'Processing Fee (2%)', regional: 'ಸಂಸ್ಕರಣಾ ಶುಲ್ಕ (2%)' },
    net_disbursed: { en: 'Net Disbursed Amount', regional: 'ನಿವ್ವಳ ವಿತರಿಸಲಾದ ಮೊತ್ತ' },
    monthly_emi: { en: 'Monthly EMI', regional: 'ಮಾಸಿಕ ಇಎಂಐ' },
    total_repayment: { en: 'Total Repayment', regional: 'ಒಟ್ಟು ಮರುಪಾವತಿ' },
    view_kfs_button: { en: 'View Detailed Key Facts Statement (KFS)', regional: 'ವಿವರವಾದ ಪ್ರಮುಖ ವಾಸ್ತವಗಳ ಹೇಳಿಕೆ (KFS) ವೀಕ್ಷಿಸಿ' },
    accept_consent: { en: 'I have read and understood the Key Facts Statement and accept the loan offer.', regional: 'ನಾನು ಪ್ರಮುಖ ವಾస్తವಗಳ ಹೇಳಿಕೆಯನ್ನು ಓದಿದ್ದೇನೆ ಮತ್ತು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ ಮತ್ತು ಸಾಲದ ಕೊಡುಗೆಯನ್ನು ಒಪ್ಪಿಕೊಳ್ಳುತ್ತೇನೆ.' },
    accept_button: { en: 'Accept Offer & Continue', regional: 'ಕೊಡುಗೆಯನ್ನು ಒಪ್ಪಿ ಮತ್ತು ಮುಂದುವರಿಸಿ' },
  },
  sanction_letter: {
    title: { en: 'Loan Sanction Letter', regional: 'ಸಾಲ ಮಂಜೂರಾತಿ ಪತ್ರ' },
    description: { en: 'Subject to terms and conditions.', regional: 'ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳಿಗೆ ಒಳಪಟ್ಟಿರುತ್ತದೆ' },
    borrower_details: { en: 'Borrower Details', regional: 'ಸಾಲಗಾರರ ವಿವರಗಳು' },
    borrower_name: { en: 'Borrower Name', regional: 'ಸಾಲಗಾರರ ಹೆಸರು' },
    app_id: { en: 'Application ID', regional: 'ಅರ್ಜಿ ಐಡಿ' },
    pan: { en: 'PAN', regional: 'ಪ್ಯಾನ್' },
    sanction_date: { en: 'Date of Sanction', regional: 'ಮಂಜೂರಾತಿ ದಿನಾಂಕ' },
    loan_details: { en: 'Loan Details', regional: 'ಸಾಲದ ವಿವರಗಳು' },
    sanctioned_amount: { en: 'Sanctioned Amount', regional: 'ಮಂಜೂರಾದ ಮೊತ್ತ' },
    loan_type: { en: 'Loan Type', regional: 'ಸಾಲದ ಪ್ರಕಾರ' },
    tenure: { en: 'Tenure', regional: 'ಅವಧಿ' },
    interest_rate: { en: 'Interest Rate', regional: 'ಬಡ್ಡಿ ದರ' },
    emi_amount: { en: 'EMI Amount', regional: 'ಇಎಂಐ ಮೊತ್ತ' },
    emi_start_date: { en: 'EMI Start Date', regional: 'ಇಎಂಐ ಪ್ರಾರಂಭ ದಿನಾಂಕ' },
    fees_disbursal: { en: 'Fees & Disbursal', regional: 'ಶುಲ್ಕಗಳು ಮತ್ತು ವಿತರಣೆ' },
    processing_fee: { en: 'Processing Fee (2%)', regional: 'ಸಂಸ್ಕರಣಾ ಶುಲ್ಕ (2%)' },
    gst: { en: 'GST (18%)', regional: 'ಜಿಎಸ್ಟಿ (18%)' },
    net_disbursal: { en: 'Net Disbursal Amount', regional: 'ನಿವ್ವಳ ವಿತರಣಾ ಮೊತ್ತ' },
    key_terms: { en: 'Key Terms', regional: 'ಪ್ರಮುಖ ನಿಯಮಗಳು' },
    term1: { en: 'Sanction is subject to successful e-Mandate registration.', regional: 'ಮಂಜೂರಾತಿ ಯಶಸ್ವಿ ಇ-ಮ್ಯಾಂಡೇಟ್ ನೋಂದಣಿಗೆ ಒಳಪಟ್ಟಿರುತ್ತದೆ.' },
    term2: { en: 'Loan is subject to execution of final loan agreement.', regional: 'ಸಾಲವು ಅಂತಿಮ ಸಾಲ ಒಪ್ಪಂದದ εκτέλεσηςಗೆ ಒಳಪಟ್ಟಿರುತ್ತದೆ.' },
    term3: { en: 'You may cancel the loan before disbursement.', regional: 'ವಿತರಣೆಯ ಮೊದಲು ನೀವು ಸಾಲವನ್ನು ರದ್ದುಗೊಳಿಸಬಹುದು.' },
    lender_disclosure1: { en: 'Loan provided by FairFinance NBFC (Regulated Entity - RE).', regional: 'ಫೇರ್‌ಫೈನಾನ್ಸ್ ಎನ್‌ಬಿಎಫ್‌ಸಿ (ನಿಯಂತ್ರಿತ ಘಟಕ - ಆರ್‌ಇ) ಒದಗಿಸಿದ ಸಾಲ.' },
    lender_disclosure2: { en: 'Loan facilitated by LoanSwift (Lending Service Provider - LSP).', regional: 'ಲೋನ್‌ಸ್ವಿಫ್ಟ್ (ಸಾಲ ಸೇವಾ ಪೂರೈಕೆದಾರ - ಎಲ್‌ಎಸ್‌ಪಿ) ಮೂಲಕ ಸುಗಮಗೊಳಿಸಿದ ಸಾಲ.' },
    lender_disclosure3: { en: 'Grievance Contact', regional: 'ದೂರು ಸಂಪರ್ಕ' },
    accept_button: { en: 'Accept & e-Sign', regional: 'ಒಪ್ಪಿ ಮತ್ತು ಇ-ಸಹಿ ಮಾಡಿ' },
    decline_button: { en: 'Do Not Accept', regional: 'ಒಪ್ಪಬೇಡಿ' },
    decline_title: { en: 'Application Paused', regional: 'ಅರ್ಜಿ ವಿರಾಮಗೊಳಿಸಲಾಗಿದೆ' },
    decline_description: { en: 'Your application ID is <ID>. Our relationship manager will contact you shortly to assist you further or clarify any questions.', regional: 'ನಿಮ್ಮ ಅರ್ಜಿ ಐಡಿ <ID> ಆಗಿದೆ. ನಮ್ಮ ಸಂಬಂಧ ವ್ಯವಸ್ಥಾಪಕರು ನಿಮಗೆ ಮತ್ತಷ್ಟು ಸಹಾಯ ಮಾಡಲು ಅಥವಾ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳನ್ನು ಸ್ಪಷ್ಟಪಡಿಸಲು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.' },
    support_contact: { en: 'You can also reach us at support@loanswift.com', regional: 'ನೀವು ನಮ್ಮನ್ನು support@loanswift.com ನಲ್ಲಿಯೂ ಸಂಪರ್ಕಿಸಬಹುದು' },
    esign_title: { en: 'e-Sign Sanction Letter', regional: 'ಮಂಜೂರಾತಿ ಪತ್ರವನ್ನು ಇ-ಸಹಿ ಮಾಡಿ' },
    esign_description: { en: 'Enter the OTP sent to your Aadhaar-linked mobile number to sign.', regional: 'ಸಹಿ ಮಾಡಲು ನಿಮ್ಮ ಆಧಾರ್-ಸಂಯೋಜಿತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಕಳುಹಿಸಿದ OTPಯನ್ನು ನಮೂದಿಸಿ.' },
    otp_label: { en: 'Enter 6-digit OTP', regional: '6-ಅಂಕಿಯ OTP ನಮೂದಿಸಿ' },
    esign_button: { en: 'Verify & e-Sign', regional: 'ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಇ-ಸಹಿ ಮಾಡಿ' },
  },
  e_mandate: {
    title: { en: 'e-Mandate for Repayments', regional: 'ಮರುಪಾವತಿಗಾಗಿ ಇ-ಮ್ಯಾಂಡೇಟ್' },
    description: { en: 'To automate your monthly EMI payments, please set up an e-mandate. This is a secure process handled by your bank.', regional: 'ನಿಮ್ಮ ಮಾಸಿಕ ಇಎಂಐ ಪಾವತಿಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸಲು, ದಯವಿಟ್ಟು ಇ-ಮ್ಯಾಂಡೇಟ್ ಅನ್ನು ಸ್ಥಾಪಿಸಿ. ಇದು ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ನಿರ್ವಹಿಸುವ ಸುರಕ್ಷಿತ ಪ್ರಕ್ರಿಯೆಯಾಗಿದೆ.' },
    mandate_details_title: { en: 'Mandate Details', regional: 'ಮ್ಯಾಂಡೇಟ್ ವಿವರಗಳು' },
    account_label: { en: 'Account', regional: 'ಖಾತೆ' },
    emi_amount_label: { en: 'EMI Amount', regional: 'ಇಎಂಐ ಮೊತ್ತ' },
    frequency_label: { en: 'Frequency', regional: 'ಆವರ್ತನ' },
    start_date_label: { en: 'First Debit', regional: 'ಮೊದಲ ಡೆಬಿಟ್' },
    setup_button: { en: 'Set up Auto Debit', regional: 'ಆಟೋ ಡೆಬಿಟ್ ಸ್ಥಾಪಿಸಿ' },
    setup_button_pending: { en: 'Redirecting to bank...', regional: 'ಬ್ಯಾಂಕ್‌ಗೆ ಮರುನಿರ್ದೇಶಿಸಲಾಗುತ್ತಿದೆ...' },
    unable_button: { en: 'I am unable to set up auto debit', regional: 'ನಾನು ಆಟೋ ಡೆಬಿಟ್ ಸ್ಥಾಪಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ' },
    success_title: { en: 'e-Mandate Registered', regional: 'ಇ-ಮ್ಯಾಂಡೇಟ್ ನೋಂದಾಯಿಸಲಾಗಿದೆ' },
    success_description: { en: 'Auto-debit has been set up for your EMIs.', regional: 'ನಿಮ್ಮ ಇಎಂಐಗಳಿಗಾಗಿ ಆಟೋ-ಡೆಬಿಟ್ ಅನ್ನು ಸ್ಥಾಪಿಸಲಾಗಿದೆ.' },
    unable_title: { en: 'Assisted Journey Required', regional: 'ಸಹಾಯದ ಪ್ರಯಾಣ ಅಗತ್ಯವಿದೆ' },
    unable_description: { en: 'Your loan application has been successfully reviewed. We noticed that the auto debit setup could not be completed digitally. Our relationship manager will contact you shortly to help you complete the next steps and guide you through alternate options.', regional: 'ನಿಮ್ಮ ಸಾಲದ ಅರ್ಜಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ. ಆಟೋ ಡೆಬಿಟ್ ಸೆಟಪ್ ಅನ್ನು ಡಿಜಿಟಲ್ ಆಗಿ ಪೂರ್ಣಗೊಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ ಎಂದು ನಾವು ಗಮನಿಸಿದ್ದೇವೆ. ಮುಂದಿನ ಹಂತಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ಮತ್ತು ಪರ್ಯಾಯ ಆಯ್ಕೆಗಳ ಮೂಲಕ ನಿಮಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಲು ನಮ್ಮ ಸಂಬಂಧ ವ್ಯವಸ್ಥಾಪಕರು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.' },
    app_id: { en: 'Application ID', regional: 'ಅರ್ಜಿ ಐಡಿ' },
    sanctioned_amount: { en: 'Approved Loan Amount', regional: 'ಅನುಮೋದಿತ ಸಾಲದ ಮೊತ್ತ' },
    support_contact: { en: 'Thank you for choosing LoanSwift.', regional: 'ಲೋನ್‌ಸ್ವಿಫ್ಟ್ ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು.' },
  },
  agreement: {
    title: { en: 'Digital Loan Agreement (e-Sign)', regional: 'ಡಿಜಿಟల్ ಸಾಲ ಒಪ್ಪಂದ (ಇ-ಸಹಿ)' },
    description: { en: 'Review the terms and sign the agreement using an Aadhaar-based OTP.', regional: 'ನಿಯಮಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಆಧಾರ್-ಆಧಾರಿತ ಒಟಿಪಿ ಬಳಸಿ ಒಪ್ಪಂದಕ್ಕೆ ಸಹಿ ಮಾಡಿ.' },
    borrower_details: { en: 'Borrower Details', regional: 'ಸಾಲಗಾರರ ವಿವರಗಳು' },
    borrower_name: { en: 'Borrower Name', regional: 'ಸಾಲಗಾರರ ಹೆಸರು' },
    app_id: { en: 'Application ID', regional: 'ಅರ್ಜಿ ಐಡಿ' },
    pan: { en: 'PAN', regional: 'ಪ್ಯಾన్' },
    loan_details: { en: 'Loan Details', regional: 'ಸಾಲದ ವಿವರಗಳು' },
    sanctioned_amount: { en: 'Sanctioned Amount', regional: 'ಮಂಜೂರಾದ ಮೊತ್ತ' },
    tenure: { en: 'Tenure', regional: 'ಅವಧಿ' },
    interest_rate: { en: 'Interest Rate', regional: 'ಬಡ್ಡಿ ದರ' },
    fees_disbursal: { en: 'Fees & Charges', regional: 'ಶುಲ್ಕಗಳು ಮತ್ತು ಶುಲ್ಕಗಳು' },
    processing_fee: { en: 'Processing Fee (2%)', regional: 'ಸಂಸ್ಕರಣಾ ಶುಲ್ಕ (2%)' },
    gst: { en: 'GST (18%) on Fee', regional: 'ಶುಲ್ಕದ ಮೇಲೆ ಜಿಎಸ್ಟಿ (18%)' },
    net_disbursal: { en: 'Net Disbursal Amount', regional: 'ನಿವ್ವಳ ವಿತರಣಾ ಮೊತ್ತ' },
    repayment_terms: { en: 'Repayment Terms', regional: 'ಮರುಪಾವತಿ ನಿಯಮಗಳು' },
    emi_amount: { en: 'EMI Amount', regional: 'ಇಎಂಐ ಮೊತ್ತ' },
    emi_start_date: { en: 'EMI Start Date', regional: 'ಇಎಂಐ ಪ್ರಾರಂಭ ದಿನಾಂಕ' },
    repayment_mode: { en: 'Repayment Mode', regional: 'ಮರುಪಾವತಿ ವಿಧಾನ' },
    legal_disclosure: { en: 'Legal & Regulatory Disclosures', regional: 'ಕಾನೂನು ಮತ್ತು ನಿಯಂತ್ರಕ ಪ್ರಕಟಣೆಗಳು' },
    lender_disclosure1: { en: 'Loan provided by FairFinance NBFC (Regulated Entity - RE).', regional: 'ಫೇರ್‌ಫೈನಾನ್ಸ್ ಎನ್‌ಬಿಎಫ್‌ಸಿ (ನಿಯಂತ್ರಿತ ಘಟಕ - ಆರ್‌ಇ) ಒದಗಿಸಿದ ಸಾಲ.' },
    lender_disclosure2: { en: 'Loan facilitated by LoanSwift (Lending Service Provider - LSP).', regional: 'ಲೋನ್‌ಸ್ವಿಫ್ಟ್ (ಸಾಲ ಸೇವಾ ಪೂರೈಕೆದಾರ - ಎಲ್‌ಎಸ್‌ಪಿ) ಮೂಲಕ ಸುಗಮಗೊಳಿಸಿದ ಸಾಲ.' },
    lender_disclosure3: { en: 'Grievance Contact', regional: 'ದೂರು ಸಂಪರ್ಕ' },
    declaration_title: { en: 'Declaration & Consent', regional: 'ಘೋಷಣೆ ಮತ್ತು ಸಮ್ಮತಿ' },
    declaration_content: { en: 'I have read, understood, and agree to the terms and conditions of this loan agreement.', regional: 'ನಾನು ಈ ಸಾಲ ಒಪ್ಪಂದದ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳನ್ನು ಓದಿದ್ದೇನೆ, ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ ಮತ್ತು ಒಪ್ಪುತ್ತೇನೆ.' },
    sign_button: { en: 'Sign via Aadhaar OTP', regional: 'ಆಧಾರ್ ಒಟಿಪಿ ಮೂಲಕ ಸಹಿ ಮಾಡಿ' },
    otp_label: { en: 'Enter OTP sent to your Aadhaar-linked mobile', regional: 'ನಿಮ್ಮ ಆಧಾರ್-ಸಂಯೋಜಿತ ಮೊಬೈಲ್‌ಗೆ ಕಳುಹಿಸಿದ ಒಟಿಪಿ ನಮೂದಿಸಿ' },
    otp_placeholder: { en: 'Enter 6-digit OTP', regional: '6-ಅಂಕಿಯ ಒಟಿಪಿ ನಮೂದಿಸಿ' },
    verify_button: { en: 'Verify & e-Sign', regional: 'ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಇ-ಸಹಿ ಮಾಡಿ' },
  },
  disbursement: {
    success_title: { en: 'Disbursement Initiated', regional: 'ವಿತರಣೆ ಪ್ರಾರಂಭಿಸಲಾಗಿದೆ' },
    processing_message: { en: 'Your loan request has been successfully processed.', regional: 'ನಿಮ್ಮ ಸಾಲದ ವಿನಂತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗಿದೆ.' },
    credited_soon_message: { en: 'The approved amount will be credited to your bank account shortly (within 10-15 minutes).', regional: 'ಅನುಮೋದಿತ ಮೊತ್ತವು ಶೀಘ್ರದಲ್ಲೇ (10-15 ನಿಮಿಷಗಳಲ್ಲಿ) ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮಾ ಆಗಲಿದೆ.' },
    details_title: { en: 'Disbursement Details', regional: 'ವಿತರಣಾ ವಿವರಗಳು' },
    amount_label: { en: 'Amount:', regional: 'ಮೊತ್ತ:' },
    account_label: { en: 'Bank Account:', regional: 'ಬ್ಯಾಂಕ್ ಖಾತೆ:' },
    ref_label: { en: 'Transaction Ref:', regional: 'ವಹಿವಾಟು ಉಲ್ಲೇಖ:' },
    back_to_dashboard_button: { en: 'Back to Dashboard', regional: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ' },
    ready_title: { en: 'Ready for Disbursement', regional: 'ವಿತರಣೆಗೆ ಸಿದ್ಧವಾಗಿದೆ' },
    ready_description: { en: 'All formalities are complete. Please confirm to receive the net loan amount in your verified bank account.', regional: 'ಎಲ್ಲಾ ಔಪಚಾರಿಕತೆಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪರಿಶೀಲಿಸಿದ ಬ್ಯಾಂಕ್ ಖಾತೆಯಲ್ಲಿ ನಿವ್ವಳ ಸಾಲದ ಮೊತ್ತವನ್ನು ಸ್ವೀಕರಿಸಲು ಖಚಿತಪಡಿಸಿ.' },
    final_disbursement_title: { en: 'Final Disbursement', regional: 'ಅಂತಿಮ ವಿತರಣೆ' },
    net_amount_label: { en: 'Net Amount to be Credited:', regional: 'ಜಮಾ ಮಾಡಬೇಕಾದ ನಿವ್ವಳ ಮೊತ್ತ:' },
    to_account_label: { en: 'To Account:', regional: 'ಖಾತೆಗೆ:' },
    timeline_label: { en: 'Timeline:', regional: 'ጊዜ ሰሌዳ:' },
    timeline_value: { en: '10-15 mins', regional: '10-15 ನಿಮಿಷಗಳು' },
    confirm_disbursement_button: { en: 'Confirm & Proceed', regional: 'ಖಚಿತಪಡಿಸಿ ಮತ್ತು ಮುಂದುವರಿಸಿ' },
    not_ready_button: { en: 'I am not ready to proceed', regional: 'ನಾನು ಮುಂದುವರಿಯಲು ಸಿದ್ಧವಾಗಿಲ್ಲ' },
    initiate_button: { en: 'Initiate Disbursement', regional: 'ವಿತರಣೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ' },
    processing_button: { en: 'Processing Disbursement...', regional: 'ವಿತರಣೆ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...' },
    assisted_title: { en: 'Application Paused', regional: 'ಅರ್ಜಿ ವಿರಾಮಗೊಳಿಸಲಾಗಿದೆ' },
    assisted_description: { en: 'Your loan application is almost complete. If you need more time or assistance before disbursement, our relationship manager will contact you shortly to guide you further.', regional: 'ನಿಮ್ಮ ಸಾಲದ ಅರ್ಜಿ ಬಹುತೇಕ ಪೂರ್ಣಗೊಂಡಿದೆ. ವಿತರಣೆಯ ಮೊದಲು ನಿಮಗೆ ಹೆಚ್ಚಿನ ಸಮಯ ಅಥವಾ ಸಹಾಯ ಬೇಕಾದರೆ, ನಮ್ಮ ಸಂಬಂಧ ವ್ಯವಸ್ಥಾಪಕರು ನಿಮಗೆ ಮತ್ತಷ್ಟು ಮಾರ್ಗದರ್ಶನ ನೀಡಲು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.' },
    app_id_label: { en: 'Application ID', regional: 'ಅರ್ಜಿ ಐಡಿ' },
  },
};

export const dictionaries = {
  en,
  hi,
  mr,
  te,
  kn,
};
