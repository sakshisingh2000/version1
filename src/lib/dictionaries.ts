
export type Language = 'en' | 'hi' | 'mr' | 'te' | 'kn';

export interface Dictionary {
  consent: {
    title: string;
    description: string;
    pan_verification: string;
    aadhaar_auth: string;
    digilocker_kyc: string;
    bureau_pull: string;
    bank_verification: string;
    data_sharing: string;
    agree_notice_title: string;
    agree_notice_text: string;
    accept_button: string;
    accept_button_native: string;
    all_consents_required: string;
  };
  personal_details: {
    title: string;
    full_name_label: string;
    full_name_placeholder: string;
    pan_label: string;
    pan_placeholder: string;
    dob_label: string;
    dob_placeholder: string;
    employment_label: string;
    employment_placeholder: string;
    income_label: string;
    income_placeholder: string;
    loan_amount_label: string;
    loan_amount_placeholder: string;
    address_label: string;
    address_placeholder: string;
    city_placeholder: string;
    pincode_placeholder: string;
    consent_label: string;
    consent_description: string;
    save_button: string;
    save_button_native: string;
  };
  kfs: {
    title: string;
    description: string;
    loan_amount: string;
    processing_fee: string;
    net_disbursed: string;
    monthly_emi: string;
    total_repayment: string;
    view_kfs_button: string;
    accept_consent: string;
    accept_button: string;
    accept_button_native: string;
  };
}


const en: Dictionary = {
  consent: {
    title: 'Consent Hub',
    description: 'As per RBI guidelines, we need your explicit consent for the following data processing activities.',
    pan_verification: 'I consent to verification of my PAN from issuing authority/NSDL.',
    aadhaar_auth: 'I consent to Aadhaar OTP-based offline verification / e-KYC through authorized partners.',
    digilocker_kyc: 'I consent to fetch KYC documents from DigiLocker using my DigiLocker account.',
    bureau_pull: 'I consent to pull my credit report from credit bureaus for the purpose of this loan.',
    bank_verification: 'I consent to verification of my bank account and registration of e-mandate for EMI debit.',
    data_sharing: 'I consent to processing of my data by the NBFC/BANK (RE) and its authorized service providers, in line with RBI digital lending guidelines.',
    agree_notice_title: 'I have read and agree to these consents and the privacy notice.',
    agree_notice_text: 'By checking the boxes above and clicking "Accept & Continue", I, the applicant, hereby provide my explicit consent to LoanSwift (the LSP) and its partner FairFinance NBFC (the RE) to access, process, and store my personal and financial information for the purpose of this loan application. This includes sharing data with credit bureaus (e.g., CIBIL), and using third-party services for PAN, Aadhaar, and bank account verification. This consent is voluntary and can be revoked as per the terms outlined in our privacy policy.',
    accept_button: 'Accept & Continue',
    accept_button_native: 'स्वीकार करें',
    all_consents_required: 'You must accept all consents to proceed.',
  },
  personal_details: {
    title: "Personal Details",
    full_name_label: 'Full Name (as per PAN)',
    full_name_placeholder: 'John Doe',
    pan_label: 'PAN Number',
    pan_placeholder: 'ABCDE1234F',
    dob_label: 'Date of Birth',
    dob_placeholder: 'Select your Date of Birth',
    employment_label: 'Employment Type',
    employment_placeholder: 'Select your employment type',
    income_label: 'Monthly Net Income (₹)',
    income_placeholder: '40000',
    loan_amount_label: 'Loan Amount Required (₹)',
    loan_amount_placeholder: '100000',
    address_label: 'Current Address',
    address_placeholder: 'Address Line',
    city_placeholder: 'City',
    pincode_placeholder: 'Pincode',
    consent_label: 'Explicit Consent',
    consent_description: 'I hereby consent to LoanSwift fetching my credit information and other details for the purpose of this loan application.',
    save_button: 'Save and Continue',
    save_button_native: 'सहेजें और जारी रखें',
  },
  kfs: {
    title: 'Your Loan Offer Summary',
    description: 'Please review and accept your final loan details.',
    loan_amount: 'Loan Amount',
    processing_fee: 'Processing Fee (2%)',
    net_disbursed: 'Net Disbursed Amount',
    monthly_emi: 'Monthly EMI',
    total_repayment: 'Total Repayment',
    view_kfs_button: 'View Detailed Key Facts Statement (KFS)',
    accept_consent: 'I have read and understood the Key Facts Statement and accept the loan offer.',
    accept_button: 'Accept Offer & Continue',
    accept_button_native: 'स्वीकार करें',
  }
};

const hi: Dictionary = {
  consent: {
    title: 'सहमति हब',
    description: 'RBI दिशानिर्देशों के अनुसार, हमें निम्नलिखित डेटा प्रसंस्करण गतिविधियों के लिए आपकी स्पष्ट सहमति की आवश्यकता है।',
    pan_verification: 'मैं जारीकर्ता प्राधिकरण/NSDL से अपने पैन के सत्यापन के लिए सहमति देता/देती हूं।',
    aadhaar_auth: 'मैं अधिकृत भागीदारों के माध्यम से आधार ओटीपी-आधारित ऑफ़लाइन सत्यापन / ई-केवाईसी के लिए सहमति देता/देती हूं।',
    digilocker_kyc: 'मैं अपने डिजिलॉकर खाते का उपयोग करके डिजिलॉकर से केवाईसी दस्तावेज प्राप्त करने के लिए सहमति देता/देती हूं।',
    bureau_pull: 'मैं इस ऋण के उद्देश्य से क्रेडिट ब्यूरो से अपनी क्रेडिट रिपोर्ट खींचने के लिए सहमति देता/देती हूं।',
    bank_verification: 'मैं ईएमआई डेबिट के लिए अपने बैंक खाते के सत्यापन और ई-जनादेश के पंजीकरण के लिए सहमति देता/देती हूं।',
    data_sharing: 'मैं RBI डिजिटल ऋण दिशानिर्देशों के अनुरूप, NBFC/BANK (RE) और उसके अधिकृत सेवा प्रदाताओं द्वारा मेरे डेटा के प्रसंस्करण के लिए सहमति देता/देती हूं।',
    agree_notice_title: 'मैंने इन सहमतियों और गोपनीयता नोटिस को पढ़ लिया है और मैं इससे सहमत हूं।',
    agree_notice_text: 'ऊपर दिए गए बक्सों को चेक करके और "स्वीकार करें और जारी रखें" पर क्लिक करके, मैं, आवेदक, लोनस्विफ्ट (एलएसपी) और उसके सहयोगी फेयरफाइनेंस एनबीएफसी (आरई) को इस ऋण आवेदन के उद्देश्य से मेरी व्यक्तिगत और वित्तीय जानकारी तक पहुंचने, संसाधित करने और संग्रहीत करने के लिए अपनी स्पष्ट सहमति प्रदान करता/करती हूं। इसमें क्रेडिट ब्यूरो (जैसे, सिबिल) के साथ डेटा साझा करना और पैन, आधार और बैंक खाता सत्यापन के लिए तीसरे पक्ष की सेवाओं का उपयोग करना शामिल है। यह सहमति स्वैच्छिक है और हमारी गोपनीयता नीति में उल्लिखित शर्तों के अनुसार इसे रद्द किया जा सकता है।',
    accept_button: 'Accept & Continue',
    accept_button_native: 'स्वीकार करें और जारी रखें',
    all_consents_required: 'आगे बढ़ने के लिए आपको सभी सहमतियों को स्वीकार करना होगा।',
  },
  personal_details: {
    title: 'व्यक्तिगत विवरण',
    full_name_label: 'पूरा नाम (पैन के अनुसार)',
    full_name_placeholder: 'जॉन डो',
    pan_label: 'पैन नंबर',
    pan_placeholder: 'ABCDE1234F',
    dob_label: 'जन्म तिथि',
    dob_placeholder: 'अपनी जन्म तिथि चुनें',
    employment_label: 'रोजगार का प्रकार',
    employment_placeholder: 'अपने रोजगार का प्रकार चुनें',
    income_label: 'मासिक शुद्ध आय (₹)',
    income_placeholder: '40000',
    loan_amount_label: 'आवश्यक ऋण राशि (₹)',
    loan_amount_placeholder: '100000',
    address_label: 'वर्तमान पता',
    address_placeholder: 'पता पंक्ति',
    city_placeholder: 'शहर',
    pincode_placeholder: 'पिनकोड',
    consent_label: 'स्पष्ट सहमति',
    consent_description: 'मैं इस ऋण आवेदन के प्रयोजन के लिए लोनस्विफ्ट द्वारा मेरी क्रेडिट जानकारी और अन्य विवरण प्राप्त करने के लिए अपनी सहमति देता/देती हूं।',
    save_button: 'Save and Continue',
    save_button_native: 'सहेजें और जारी रखें',
  },
  kfs: {
    title: 'आपके ऋण प्रस्ताव का सारांश',
    description: 'कृपया अपने अंतिम ऋण विवरण की समीक्षा करें और स्वीकार करें।',
    loan_amount: 'ऋण राशि',
    processing_fee: 'प्रसंस्करण शुल्क (2%)',
    net_disbursed: 'शुद्ध वितरित राशि',
    monthly_emi: 'मासिक ईएमआई',
    total_repayment: 'कुल चुकौती',
    view_kfs_button: 'विस्तृत मुख्य तथ्य विवरण (KFS) देखें',
    accept_consent: 'मैंने मुख्य तथ्य विवरण को पढ़ और समझ लिया है और ऋण प्रस्ताव स्वीकार करता/करती हूं।',
    accept_button: 'Accept Offer & Continue',
    accept_button_native: 'प्रस्ताव स्वीकार करें और जारी रखें',
  }
};


const mr: Dictionary = {
  consent: {
    title: 'संमती केंद्र',
    description: 'RBI मार्गदर्शक तत्त्वांनुसार, आम्हाला खालील डेटा प्रक्रिया क्रियाकलापांसाठी तुमची स्पष्ट संमती आवश्यक आहे.',
    pan_verification: 'मी जारी करणाऱ्या प्राधिकरणाकडून/NSDL कडून माझ्या पॅनच्या पडताळणीसाठी संमती देतो/देते.',
    aadhaar_auth: 'मी अधिकृत भागीदारांमार्फत आधार ओटीपी-आधारित ऑफलाइन पडताळणी / ई-केवायसीसाठी संमती देतो/देते.',
    digilocker_kyc: 'मी माझे डिजिलॉकर खाते वापरून डिजिलॉकरमधून केवायसी दस्तऐवज मिळवण्यासाठी संमती देतो/देते.',
    bureau_pull: 'मी या कर्जाच्या उद्देशाने क्रेडिट ब्युरोमधून माझा क्रेडिट रिपोर्ट काढण्यासाठी संमती देतो/देते.',
    bank_verification: 'मी माझ्या बँक खात्याची पडताळणी आणि ईएमआय डेबिटसाठी ई-मँडेटच्या नोंदणीसाठी संमती देतो/देते.',
    data_sharing: 'मी NBFC/BANK (RE) आणि त्याच्या अधिकृत सेवा प्रदात्यांद्वारे माझ्या डेटावर प्रक्रिया करण्यास, RBI डिजिटल कर्ज मार्गदर्शक तत्त्वांनुसार संमती देतो/देते.',
    agree_notice_title: 'मी या संमती आणि गोपनीयता सूचना वाचल्या आहेत आणि मला त्या मान्य आहेत.',
    agree_notice_text: 'वरील बॉक्स चेक करून आणि "स्वीकारा आणि सुरू ठेवा" वर क्लिक करून, मी, अर्जदार, याद्वारे लोनस्विफ्ट (LSP) आणि त्याचा भागीदार फेअर फायनान्स NBFC (RE) यांना या कर्ज अर्जाच्या उद्देशाने माझी वैयक्तिक आणि आर्थिक माहिती ऍक्सेस, प्रक्रिया आणि संग्रहित करण्यासाठी माझी स्पष्ट संमती देत आहे. यामध्ये क्रेडिट ब्युरो (उदा. CIBIL) सह डेटा सामायिक करणे आणि पॅन, आधार आणि बँक खाते पडताळणीसाठी तृतीय-पक्ष सेवा वापरणे समाविष्ट आहे. ही संमती ऐच्छिक आहे आणि आमच्या गोपनीयता धोरणामध्ये नमूद केलेल्या अटींनुसार ती रद्द केली जाऊ शकते.',
    accept_button: 'Accept & Continue',
    accept_button_native: 'स्वीकारा आणि सुरू ठेवा',
    all_consents_required: 'पुढे जाण्यासाठी तुम्हाला सर्व संमती स्वीकाराव्या लागतील.',
  },
   personal_details: {
    title: 'वैयक्तिक तपशील',
    full_name_label: 'पूर्ण नाव (पॅननुसार)',
    full_name_placeholder: 'जॉन डो',
    pan_label: 'पॅन नंबर',
    pan_placeholder: 'ABCDE1234F',
    dob_label: 'जन्म तारीख',
    dob_placeholder: 'तुमची जन्म तारीख निवडा',
    employment_label: 'रोजगाराचा प्रकार',
    employment_placeholder: 'तुमच्या रोजगाराचा प्रकार निवडा',
    income_label: 'मासिक निव्वळ उत्पन्न (₹)',
    income_placeholder: '40000',
    loan_amount_label: 'आवश्यक कर्जाची रक्कम (₹)',
    loan_amount_placeholder: '100000',
    address_label: 'वर्तमान पत्ता',
    address_placeholder: 'पत्त्याची ओळ',
    city_placeholder: 'शहर',
    pincode_placeholder: 'पिनकोड',
    consent_label: 'स्पष्ट संमती',
    consent_description: 'मी या कर्ज अर्जाच्या उद्देशाने लोनस्विफ्टला माझी क्रेडिट माहिती आणि इतर तपशील मिळवण्यासाठी याद्वारे संमती देतो.',
    save_button: 'Save and Continue',
    save_button_native: 'जतन करा आणि सुरू ठेवा',
  },
  kfs: {
    title: 'तुमच्या कर्ज प्रस्तावाचा सारांश',
    description: 'कृपया तुमच्या अंतिम कर्ज तपशीलांचे पुनरावलोकन करा आणि स्वीकारा.',
    loan_amount: 'कर्जाची रक्कम',
    processing_fee: 'प्रक्रिया शुल्क (2%)',
    net_disbursed: 'निव्वळ वितरित रक्कम',
    monthly_emi: 'मासिक EMI',
    total_repayment: 'एकूण परतफेड',
    view_kfs_button: 'तपशीलवार मुख्य तथ्य विधान (KFS) पहा',
    accept_consent: 'मी मुख्य तथ्य विधान वाचले आणि समजले आहे आणि कर्ज प्रस्ताव स्वीकारतो.',
    accept_button: 'Accept Offer & Continue',
    accept_button_native: 'प्रस्ताव स्वीकारा आणि सुरू ठेवा',
  }
};

const te: Dictionary = {
  consent: {
    title: 'సమ్మతి కేంద్రం',
    description: 'RBI మార్గదర్శకాల ప్రకారం, కింది డేటా ప్రాసెసింగ్ కార్యకలాపాలకు మాకు మీ స్పష్టమైన సమ్మతి అవసరం.',
    pan_verification: 'జారీచేసే అధికారం/NSDL నుండి నా పాన్ యొక్క ధృవీకరణకు నేను సమ్మతిస్తున్నాను.',
    aadhaar_auth: 'అధీకృత భాగస్వాముల ద్వారా ఆధార్ OTP-ఆధారిత ఆఫ్‌లైన్ ధృవీకరణ / ఇ-కెవైసికి నేను సమ్మతిస్తున్నాను.',
    digilocker_kyc: 'నా డిజిలాకర్ ఖాతాను ఉపయోగించి డిజిలాకర్ నుండి కెవైసి పత్రాలను పొందడానికి నేను సమ్మతిస్తున్నాను.',
    bureau_pull: 'ఈ లోన్ ప్రయోజనం కోసం క్రెడిట్ బ్యూరోల నుండి నా క్రెడిట్ నివేదికను లాగడానికి నేను సమ్మతిస్తున్నాను.',
    bank_verification: 'EMI డెబిట్ కోసం నా బ్యాంక్ ఖాతా యొక్క ధృవీకరణ మరియు ఇ-మాండేట్ నమోదుకు నేను సమ్మతిస్తున్నాను.',
    data_sharing: 'RBI డిజిటల్ లెండింగ్ మార్గదర్శకాలకు అనుగుణంగా, NBFC/BANK (RE) మరియు దాని అధీకృత సేవా ప్రదాతల ద్వారా నా డేటాను ప్రాసెస్ చేయడానికి నేను సమ్మతిస్తున్నాను.',
    agree_notice_title: 'నేను ఈ సమ్మతులను మరియు గోప్యతా నోటీసును చదివి, అంగీకరిస్తున్నాను.',
    agree_notice_text: 'పైన ఉన్న పెట్టెలను తనిఖీ చేసి, "అంగీకరించి కొనసాగించు" పై క్లిక్ చేయడం ద్వారా, నేను, దరఖాస్తుదారు, ఈ లోన్ దరఖాస్తు ప్రయోజనం కోసం నా వ్యక్తిగత మరియు ఆర్థిక సమాచారాన్ని యాక్సెస్ చేయడానికి, ప్రాసెస్ చేయడానికి మరియు నిల్వ చేయడానికి లోన్‌స్విఫ్ట్ (LSP) మరియు దాని భాగస్వామి ఫెయిర్‌ఫైనాన్స్ NBFC (RE)కి నా స్పష్టమైన సమ్మతిని ఇస్తున్నాను. ఇందులో క్రెడిట్ బ్యూరోలతో (ఉదా., సిబిల్) డేటాను పంచుకోవడం మరియు పాన్, ఆధార్ మరియు బ్యాంక్ ఖాతా ధృవీకరణ కోసం మూడవ పక్ష సేవల ఉపయోగం ఉన్నాయి. ఈ సమ్మతి స్వచ్ఛందమైనది మరియు మా గోప్యతా విధానంలో పేర్కొన్న నిబంధనల ప్రకారం ఉపసంహరించుకోవచ్చు.',
    accept_button: 'Accept & Continue',
    accept_button_native: 'అంగీకరించి కొనసాగించండి',
    all_consents_required: 'ముందుకు సాగడానికి మీరు అన్ని సమ్మతులను అంగీకరించాలి.',
  },
  personal_details: {
    title: 'వ్యక్తిగత వివరాలు',
    full_name_label: 'పూర్తి పేరు (పాన్ ప్రకారం)',
    full_name_placeholder: 'జాన్ డో',
    pan_label: 'పాన్ నంబర్',
    pan_placeholder: 'ABCDE1234F',
    dob_label: 'పుట్టిన తేది',
    dob_placeholder: 'మీ పుట్టిన తేదీని ఎంచుకోండి',
    employment_label: 'ఉద్యోగ రకం',
    employment_placeholder: 'మీ ఉద్యోగ రకాన్ని ఎంచుకోండి',
    income_label: 'నెలవారీ నికర ఆదాయం (₹)',
    income_placeholder: '40000',
    loan_amount_label: 'అవసరమైన లోన్ మొత్తం (₹)',
    loan_amount_placeholder: '100000',
    address_label: 'ప్రస్తుత చిరునామా',
    address_placeholder: 'చిరునామా లైన్',
    city_placeholder: 'నగరం',
    pincode_placeholder: 'పిన్‌కోడ్',
    consent_label: 'స్పష్టమైన సమ్మతి',
    consent_description: 'ఈ లోన్ దరఖాస్తు ప్రయోజనం కోసం నా క్రెడిట్ సమాచారం మరియు ఇతర వివరాలను పొందడానికి నేను లోన్‌స్విఫ్ట్‌కు సమ్మతిస్తున్నాను.',
    save_button: 'Save and Continue',
    save_button_native: 'సేవ్ చేసి కొనసాగించండి',
  },
  kfs: {
    title: 'మీ లోన్ ఆఫర్ సారాంశం',
    description: 'దయచేసి మీ తుది లోన్ వివరాలను సమీక్షించి, అంగీకరించండి.',
    loan_amount: 'లోన్ మొత్తం',
    processing_fee: 'ప్రాసెసింగ్ ఫీజు (2%)',
    net_disbursed: 'నికర పంపిణీ మొత్తం',
    monthly_emi: 'నెలవారీ EMI',
    total_repayment: 'మొత్తం తిరిగి చెల్లింపు',
    view_kfs_button: 'వివరణాత్మక కీ ఫ్యాక్ట్స్ స్టేట్‌మెంట్ (KFS) చూడండి',
    accept_consent: 'నేను కీ ఫ్యాక్ట్స్ స్టేట్‌మెంట్‌ను చదివి, అర్థం చేసుకున్నాను మరియు లోన్ ఆఫర్‌ను అంగీకరిస్తున్నాను.',
    accept_button: 'Accept Offer & Continue',
    accept_button_native: 'ఆఫర్‌ను అంగీకరించి కొనసాగించండి',
  }
};

const kn: Dictionary = {
  consent: {
    title: 'ಸಮ್ಮತಿ ಕೇಂದ್ರ',
    description: 'RBI ಮಾರ್ಗಸೂಚಿಗಳ ಪ್ರಕಾರ, ಈ ಕೆಳಗಿನ ಡೇಟಾ ಸಂಸ್ಕರಣಾ ಚಟುವಟಿಕೆಗಳಿಗೆ ನಮಗೆ ನಿಮ್ಮ ಸ್ಪಷ್ಟ ಸಮ್ಮತಿ ಬೇಕು.',
    pan_verification: 'ನನ್ನ ಪ್ಯಾನ್ ಅನ್ನು ನೀಡುವ ಪ್ರಾಧಿಕಾರ/NSDL ನಿಂದ ಪರಿಶೀಲಿಸಲು ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ.',
    aadhaar_auth: 'ಅಧಿಕೃತ ಪಾಲುದಾರರ ಮೂಲಕ ಆಧಾರ್ ಒಟಿಪಿ-ಆಧಾರಿತ ಆಫ್‌ಲೈನ್ ಪರಿಶೀಲನೆ / ಇ-ಕೆವೈಸಿಗೆ ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ.',
    digilocker_kyc: 'ನನ್ನ ಡಿಜಿಲಾಕರ್ ಖಾತೆಯನ್ನು ಬಳಸಿಕೊಂಡು ಡಿಜಿಲಾಕರ್‌ನಿಂದ ಕೆವೈಸಿ ದಾಖಲೆಗಳನ್ನು ಪಡೆಯಲು ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ.',
    bureau_pull: 'ಈ ಸಾಲದ ಉದ್ದೇಶಕ್ಕಾಗಿ ಕ್ರೆಡಿಟ್ ಬ್ಯೂರೋಗಳಿಂದ ನನ್ನ ಕ್ರೆಡಿಟ್ ವರದಿಯನ್ನು ಎಳೆಯಲು ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ.',
    bank_verification: 'ನನ್ನ ಬ್ಯಾಂಕ್ ಖಾತೆಯ ಪರಿಶೀಲನೆಗೆ ಮತ್ತು ಇಎಂಐ ಡೆಬಿಟ್‌ಗಾಗಿ ಇ-ಮ್ಯಾಂಡೇಟ್ ನೋಂದಣಿಗೆ ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ.',
    data_sharing: 'RBI ಡಿಜಿಟಲ್ ಸಾಲ ಮಾರ್ಗಸೂಚಿಗಳಿಗೆ ಅನುಗುಣವಾಗಿ, NBFC/BANK (RE) ಮತ್ತು ಅದರ ಅಧಿಕೃತ ಸೇವಾ ಪೂರೈಕೆದಾರರಿಂದ ನನ್ನ ಡೇಟಾವನ್ನು ಸಂಸ್ಕರಿಸಲು ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ.',
    agree_notice_title: 'ನಾನು ಈ ಸಮ್ಮತಿಗಳನ್ನು ಮತ್ತು ಗೌಪ್ಯತೆ ಸೂಚನೆಯನ್ನು ಓದಿದ್ದೇನೆ ಮತ್ತು ಒಪ್ಪುತ್ತೇನೆ.',
    agree_notice_text: 'ಮೇಲಿನ ಬಾಕ್ಸ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸುವ ಮೂಲಕ ಮತ್ತು "ಒಪ್ಪಿ ಮತ್ತು ಮುಂದುವರಿಸಿ" ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ, ನಾನು, ಅರ್ಜಿದಾರ, ಈ ಸಾಲದ ಅರ್ಜಿಯ ಉದ್ದೇಶಕ್ಕಾಗಿ ನನ್ನ ವೈಯಕ್ತಿಕ ಮತ್ತು ಹಣಕಾಸು ಮಾಹಿತಿಯನ್ನು ಪ್ರವೇಶಿಸಲು, ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು ಮತ್ತು ಸಂಗ್ರಹಿಸಲು ಲೋನ್‌ಸ್ವಿಫ್ಟ್ (LSP) ಮತ್ತು ಅದರ ಪಾಲುದಾರ ಫೇರ್‌ಫೈನಾನ್ಸ್ NBFC (RE) ಗೆ ನನ್ನ ಸ್ಪಷ್ಟ ಸಮ್ಮತಿಯನ್ನು ನೀಡುತ್ತೇನೆ. ಇದು ಕ್ರೆಡಿಟ್ ಬ್ಯೂರೋಗಳೊಂದಿಗೆ (ಉದಾಹರಣೆಗೆ, ಸಿಬಿಲ್) ಡೇಟಾವನ್ನು ಹಂಚಿಕೊಳ್ಳುವುದು ಮತ್ತು ಪ್ಯಾನ್, ಆಧಾರ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಖಾತೆ ಪರಿಶೀಲನೆಗಾಗಿ ತೃತೀಯ ಸೇವೆಗಳನ್ನು ಬಳಸುವುದು ಒಳಗೊಂಡಿರುತ್ತದೆ. ಈ ಸಮ್ಮತಿ ಸ್ವಯಂಪ್ರೇರಿತವಾಗಿದೆ ಮತ್ತು ನಮ್ಮ ಗೌಪ್ಯತೆ ನೀತಿಯಲ್ಲಿ ವಿವರಿಸಿದ ನಿಯಮಗಳ ಪ್ರಕಾರ ಅದನ್ನು ಹಿಂತೆಗೆದುಕೊಳ್ಳಬಹುದು.',
    accept_button: 'Accept & Continue',
    accept_button_native: 'ಒಪ್ಪಿ ಮತ್ತು ಮುಂದುವರಿಸಿ',
    all_consents_required: 'ಮುಂದುವರಿಯಲು ನೀವು ಎಲ್ಲಾ ಸಮ್ಮತಿಗಳನ್ನು ಒಪ್ಪಿಕೊಳ್ಳಬೇಕು.',
  },
  personal_details: {
    title: 'ವೈಯಕ್ತಿಕ ವಿವರಗಳು',
    full_name_label: 'ಪೂರ್ಣ ಹೆಸರು (ಪ್ಯಾನ್ ಪ್ರಕಾರ)',
    full_name_placeholder: 'ಜಾನ್ ಡೋ',
    pan_label: 'ಪ್ಯಾನ್ ಸಂಖ್ಯೆ',
    pan_placeholder: 'ABCDE1234F',
    dob_label: 'ಹುಟ್ಟಿದ ದಿನಾಂಕ',
    dob_placeholder: 'ನಿಮ್ಮ ಜನ್ಮ ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    employment_label: 'ಉದ್ಯೋಗದ ಪ್ರಕಾರ',
    employment_placeholder: 'ನಿಮ್ಮ ಉದ್ಯೋಗದ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    income_label: 'ಮಾಸಿಕ ನಿವ್ವಳ ಆದಾಯ (₹)',
    income_placeholder: '40000',
    loan_amount_label: 'ಅಗತ್ಯವಿರುವ ಸಾಲದ ಮೊತ್ತ (₹)',
    loan_amount_placeholder: '100000',
    address_label: 'ಪ್ರಸ್ತುತ ವಿಳಾಸ',
    address_placeholder: 'ವಿಳಾಸದ ಸಾಲು',
    city_placeholder: 'ನಗರ',
    pincode_placeholder: 'ಪಿನ್‌ಕೋಡ್',
    consent_label: 'ಸ್ಪಷ್ಟ ಸಮ್ಮತಿ',
    consent_description: 'ಈ ಸಾಲದ ಅರ್ಜಿಯ ಉದ್ದೇಶಕ್ಕಾಗಿ ನನ್ನ ಕ್ರೆಡಿಟ್ ಮಾಹಿತಿ ಮತ್ತು ಇತರ ವಿವರಗಳನ್ನು ಪಡೆಯಲು ನಾನು ಲೋನ್‌ಸ್ವಿಫ್ಟ್‌ಗೆ ಈ ಮೂಲಕ ಸಮ್ಮತಿಸುತ್ತೇನೆ.',
    save_button: 'Save and Continue',
    save_button_native: 'ಉಳಿಸಿ ಮತ್ತು ಮುಂದುವರಿಸಿ',
  },
  kfs: {
    title: 'ನಿಮ್ಮ ಸಾಲದ ಕೊಡುಗೆಯ ಸಾರಾಂಶ',
    description: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಅಂತಿಮ ಸಾಲದ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಒಪ್ಪಿಕೊಳ್ಳಿ.',
    loan_amount: 'ಸಾಲದ ಮೊತ್ತ',
    processing_fee: 'ಸಂಸ್ಕರಣಾ ಶುಲ್ಕ (2%)',
    net_disbursed: 'ನಿವ್ವಳ ವಿತರಿಸಲಾದ ಮೊತ್ತ',
    monthly_emi: 'ಮಾಸಿಕ ಇಎಂಐ',
    total_repayment: 'ಒಟ್ಟು ಮರುಪಾವತಿ',
    view_kfs_button: 'ವಿವರವಾದ ಪ್ರಮುಖ ವಾಸ್ತವಗಳ ಹೇಳಿಕೆ (KFS) ವೀಕ್ಷಿಸಿ',
    accept_consent: 'ನಾನು ಪ್ರಮುಖ ವಾಸ್ತವಗಳ ಹೇಳಿಕೆಯನ್ನು ಓದಿದ್ದೇನೆ ಮತ್ತು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ ಮತ್ತು ಸಾಲದ ಕೊಡುಗೆಯನ್ನು ಒಪ್ಪಿಕೊಳ್ಳುತ್ತೇನೆ.',
    accept_button: 'Accept Offer & Continue',
    accept_button_native: 'ಕೊಡುಗೆಯನ್ನು ಒಪ್ಪಿ ಮತ್ತು ಮುಂದುವರಿಸಿ',
  }
};

export const dictionaries = {
  en,
  hi,
  mr,
  te,
  kn,
};
