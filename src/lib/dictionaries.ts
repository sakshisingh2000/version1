

export type Language = 'en' | 'hi' | 'mr' | 'te' | 'kn';

type BilingualText = {
  en: string;
  regional: string;
};

export interface Dictionary {
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
}


const en: Dictionary = {
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
  }
};

const hi: Dictionary = {
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
  }
};


const mr: Dictionary = {
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
  }
};

const te: Dictionary = {
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
  }
};

const kn: Dictionary = {
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
    agree_notice_text: { en: 'By checking the boxes above and clicking "Accept & Continue", I, the applicant, hereby provide my explicit consent to LoanSwift (the LSP) and its partner FairFinance NBFC (the RE) to access, process, and store my personal and financial information for the purpose of this loan application. This includes sharing data with credit bureaus (e.g., CIBIL), and using third-party services for PAN, Aadhaar, and bank account verification. This consent is voluntary and can be revoked as per the terms outlined in our privacy policy.', regional: 'ಮೇಲಿನ ಬಾಕ್ಸ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸುವ ಮೂಲಕ ಮತ್ತು "ಒಪ್ಪಿ ಮತ್ತು ಮುಂದುವರಿಸಿ" ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ, ನಾನು, ಅರ್ಜಿದಾರ, ಈ ಸಾಲದ ಅರ್ಜಿಯ ಉದ್ದೇಶಕ್ಕಾಗಿ ನನ್ನ ವೈಯಕ್ತಿಕ ಮತ್ತು ಹಣಕಾಸು ಮಾಹಿತಿಯನ್ನು ಪ್ರವೇಶಿಸಲು, ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು ಮತ್ತು ಸಂಗ್ರಹಿಸಲು ಲೋನ್‌ಸ್ವಿಫ್ಟ್ (LSP) ಮತ್ತು ಅದರ ಪಾಲುದಾರ ಫೇರ್‌ಫೈನಾನ್ಸ್ NBFC (RE) ಗೆ ನನ್ನ ಸ್ಪಷ್ಟ ಸಮ್ಮತಿಯನ್ನು ನೀಡುತ್ತೇನೆ. ಇದು ಕ್ರೆಡಿಟ್ ಬ್ಯೂರೋಗಳೊಂದಿಗೆ (ಉದಾಹರಣೆಗೆ, ಸಿಬಿಲ್) ಡೇಟಾವನ್ನು ಹಂಚಿಕೊಳ್ಳುವುದು ಮತ್ತು ಪ್ಯಾನ್, ಆಧಾರ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಖಾತೆ ಪರಿಶೀಲನೆಗಾಗಿ ತೃತೀಯ ಸೇವೆಗಳನ್ನು ಬಳಸುವುದು ಒಳಗೊಂಡಿರುತ್ತದೆ. ಈ ಸಮ್ಮತಿ ಸ್ವಯಂಪ್ರೇರಿತವಾಗಿದೆ ಮತ್ತು ನಮ್ಮ ಗೌಪ್ಯತೆ ನೀತಿಯಲ್ಲಿ ವಿವರಿಸಿದ ನಿಯಮಗಳ ಪ್ರಕಾರ ಅದನ್ನು ಹಿಂತೆಗೆದುಕೊಳ್ಳಬಹುದು.' },
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
    esign_description: { en: 'Enter the OTP sent to your Aadhaar-linked mobile number to sign.', regional: 'ಸಹಿ ಮಾಡಲು ನಿಮ್ಮ ಆಧಾರ್-ಸಂಯೋಜಿತ ಮೊಬೈల్ ಸಂಖ್ಯೆಗೆ ಕಳುಹಿಸಿದ OTPಯನ್ನು ನಮೂದಿಸಿ.' },
    otp_label: { en: 'Enter 6-digit OTP', regional: '6-അക്ക OTP ನಮೂದಿಸಿ' },
    esign_button: { en: 'Verify & e-Sign', regional: 'ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಇ-ಸಹಿ ಮಾಡಿ' },
  }
};

export const dictionaries = {
  en,
  hi,
  mr,
  te,
  kn,
};
