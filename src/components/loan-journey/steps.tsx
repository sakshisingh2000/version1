
"use client";

import { useLoanApplication } from "./loan-application-provider";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useTransition, useEffect, useMemo, useRef } from "react";
import { Loader2, FileCheck2, UserCheck, Landmark, Banknote, ShieldCheck, CheckCircle, Verified, Wallet, FileText, BadgeCheck, AlertCircle, UploadCloud, Info, XCircle, ChevronDown, FolderUp, Cloud, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser, useFirestore, errorEmitter, FirestorePermissionError } from "@/firebase";
import { doc, setDoc, serverTimestamp, writeBatch, collection, getDocs, query, updateDoc } from "firebase/firestore";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { addDocumentNonBlocking, setDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import type { TenureOption, PaymentScheduleItem, UploadableDocument } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DobPicker } from "@/components/ui/dob-picker";
import { addMonths, format, startOfMonth } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "../language-provider";
import { Slider } from "@/components/ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Image from 'next/image';

interface StepProps {
  onCompleted: () => void;
}

const englishOnly = /^[a-zA-Z0-9\s.,'-]*$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const pincodeRegex = /^\d{6}$/;

const personalDetailsSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters.").regex(englishOnly, "Please enter details in English"),
  pan: z.string().regex(panRegex, "Invalid PAN format.").regex(englishOnly, "Please enter details in English"),
  birthDate: z.date({ required_error: "A date of birth is required." }),
  gender: z.string({ required_error: "Please select a gender." }),
  aadhaarNumber: z.string().regex(/^\d{12}$/, "Invalid Aadhaar number."),
  loanAmount: z.coerce.number().min(10000, "Loan amount must be at least ₹10,000.").max(200000, "Maximum loan amount is ₹2,00,000."),
  employmentType: z.string({ required_error: "Please select an employment type." }),
  monthlyIncome: z.coerce.number().min(10000, "Monthly income must be at least ₹10,000."),
  addressLine1: z.string().min(5, "Address is too short.").regex(englishOnly, "Please enter details in English"),
  city: z.string().min(2, "City is too short.").regex(englishOnly, "Please enter details in English"),
  pincode: z.string().regex(pincodeRegex, "Invalid pincode."),
  consent: z.literal(true, { errorMap: () => ({ message: "You must accept the terms and conditions." }) }),
});

const BilingualLabel = ({ en, regional }: { en: string, regional: string }) => {
    const { language } = useLanguage();
    return (
        <FormLabel>
            {en}
            {language !== 'en' && <span className="block text-sm font-normal text-muted-foreground mt-1">{regional}</span>}
        </FormLabel>
    )
};

const BilingualText = ({ en, regional, isMuted = false }: { en: string, regional: string, isMuted?: boolean }) => {
  const { language } = useLanguage();
  const mainClass = isMuted ? "text-muted-foreground" : "";
  const regionalClass = "block text-sm font-normal text-muted-foreground mt-1";
  
  return (
    <div className={mainClass}>
        {en}
        {language !== 'en' && <span className={regionalClass}>{regional}</span>}
    </div>
  )
}

export function PersonalDetailsStep({ onCompleted }: StepProps) {
  const { application, setApplication } = useLoanApplication();
  const { user } = useUser();
  const firestore = useFirestore();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { dict, language } = useLanguage();
  const d = dict.personal_details;

  const form = useForm<z.infer<typeof personalDetailsSchema>>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      fullName: application.personalDetails?.fullName || "",
      pan: application.personalDetails?.pan || "",
      birthDate: application.personalDetails?.birthDate || undefined,
      gender: application.personalDetails?.gender || undefined,
      aadhaarNumber: application.personalDetails?.aadhaarNumber || "",
      loanAmount: undefined,
      employmentType: undefined,
      monthlyIncome: undefined,
      addressLine1: application.personalDetails?.addressLine1 || "",
      city: application.personalDetails?.city || "",
      pincode: application.personalDetails?.pincode || "",
      consent: false
    },
  });

  // Prefill effect in case state changed
  useEffect(() => {
    if (application.personalDetails) {
      form.reset({
        ...form.getValues(),
        ...application.personalDetails,
        birthDate: application.personalDetails.birthDate ? new Date(application.personalDetails.birthDate) : undefined,
      });
    }
  }, [application.personalDetails, form]);

  function onSubmit(values: z.infer<typeof personalDetailsSchema>) {
    if (!user) {
      toast({ variant: "destructive", title: "You are not logged in." });
      return;
    }
    
    startTransition(() => {
      setApplication(prev => ({ ...prev, personalDetails: values, requested_amount: values.loanAmount }));
      
      const borrowerRef = doc(firestore, 'borrowers', user.uid);
      const loanAppCollection = collection(firestore, 'borrowers', user.uid, 'loan_applications');
      const loanAppRef = doc(loanAppCollection, application.loanApplicationId);

      const borrowerData = {
        fullName: values.fullName,
        pan: values.pan,
        aadhaarNumber: values.aadhaarNumber,
        dateOfBirth: values.birthDate,
        gender: values.gender,
        employmentType: values.employmentType,
        monthlyIncome: values.monthlyIncome,
        currentAddress: {
          addressLine1: values.addressLine1,
          city: values.city,
          pincode: values.pincode
        },
        updatedAt: serverTimestamp(),
      };
      setDocumentNonBlocking(borrowerRef, borrowerData, { merge: true });
      
      const loanAppData = {
        id: application.loanApplicationId,
        borrowerId: user.uid,
        requested_amount: values.loanAmount,
        requested_tenure_months: 12,
        product_type: 'PERSONAL_LOAN',
        application_status: 'DRAFT',
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        bureauReport: null,
      };
      setDocumentNonBlocking(loanAppRef, loanAppData, {});
      
      toast({
        title: "Details Saved",
        description: "Your personal and loan details have been saved.",
      });
      onCompleted();
    });
  }

  return (
    <div className="space-y-6">
      {application.prefilledFromKyc && (
        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary text-sm font-medium">
            Prefilled from Aadhaar / PAN verification
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField control={form.control} name="fullName" render={({ field }) => (
              <FormItem>
                <BilingualLabel en={d.full_name_label.en} regional={d.full_name_label.regional} />
                <FormControl><Input placeholder={d.full_name_placeholder.en} {...field} value={field.value ?? ''} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="pan" render={({ field }) => (
              <FormItem>
                <BilingualLabel en={d.pan_label.en} regional={d.pan_label.regional} />
                <FormControl><Input placeholder={d.pan_placeholder.en} {...field} value={field.value ?? ''} className="uppercase" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="aadhaarNumber" render={({ field }) => (
              <FormItem>
                <BilingualLabel en="Aadhaar Number" regional="आधार संख्या" />
                <FormControl><Input placeholder="XXXX XXXX XXXX" {...field} value={field.value ?? ''} maxLength={12} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <BilingualLabel en={d.dob_label.en} regional={d.dob_label.regional} />
                      <DobPicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={language === 'en' ? d.dob_placeholder.en : `${d.dob_placeholder.en} / ${d.dob_placeholder.regional}`}
                      />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="gender" render={({ field }) => (
              <FormItem>
                <BilingualLabel en={d.gender_label.en} regional={d.gender_label.regional} />
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder={language === 'en' ? d.gender_placeholder.en : `${d.gender_placeholder.en} / ${d.gender_placeholder.regional}`} /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="employmentType" render={({ field }) => (
              <FormItem>
                <BilingualLabel en={d.employment_label.en} regional={d.employment_label.regional} />
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder={language === 'en' ? d.employment_placeholder.en : `${d.employment_placeholder.en} / ${d.employment_placeholder.regional}`} /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Salaried">Salaried</SelectItem>
                    <SelectItem value="Self-employed">Self-employed</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="monthlyIncome" render={({ field }) => (
              <FormItem>
                <BilingualLabel en={d.income_label.en} regional={d.income_label.regional} />
                <FormControl><Input type="number" placeholder={d.income_placeholder.en} {...field} value={field.value ?? ''} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="loanAmount" render={({ field }) => (
              <FormItem>
                <BilingualLabel en={d.loan_amount_label.en} regional={d.loan_amount_label.regional} />
                <FormControl><Input type="number" placeholder={d.loan_amount_placeholder.en} {...field} value={field.value ?? ''} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="md:col-span-2 space-y-4">
              <h3 className="font-semibold">{d.address_label.en}{language !== 'en' && <span className="block text-sm font-normal text-muted-foreground mt-1">{d.address_label.regional}</span>}</h3>
              <FormField control={form.control} name="addressLine1" render={({ field }) => (
                <FormItem><FormControl><Input placeholder={d.address_placeholder.en} {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem><FormControl><Input placeholder={d.city_placeholder.en} {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="pincode" render={({ field }) => (
                  <FormItem><FormControl><Input placeholder={d.pincode_placeholder.en} {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            </div>
          </div>
          <FormField control={form.control} name="consent" render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
              <div className="space-y-1 leading-none">
                <Label>
                  {d.consent_label.en}
                  {language !== 'en' && <span className="block text-sm font-normal text-muted-foreground mt-1">{d.consent_label.regional}</span>}
                </Label>
                <FormDescription>
                  {d.consent_description.en}
                  {language !== 'en' && <span className="block text-sm font-normal text-muted-foreground mt-1">{d.consent_description.regional}</span>}
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )} />
          <Button type="submit" disabled={isPending} className="w-full md:w-auto">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Saving..." : `${d.save_button.en}${language !== 'en' ? ` / ${d.save_button.regional}` : ''}`}
          </Button>
        </form>
      </Form>
    </div>
  );
}


export function KycStep({ onCompleted }: StepProps) {
  const { application, setApplication } = useLoanApplication();
  const { user } = useUser();
  const firestore = useFirestore();
  const [isVerifying, startTransition] = useTransition();
  const { toast } = useToast();
  const { dict, language } = useLanguage();
  const d = dict.kyc;

  const [aadhaar, setAadhaar] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);

  const [pan, setPan] = useState("");
  const [isPanVerified, setIsPanVerified] = useState(false);
  const [isPanMatching, setIsPanMatching] = useState(false);

  const handleSendOtp = () => {
    if (aadhaar.length !== 12) {
      toast({ variant: "destructive", title: "Invalid Aadhaar", description: "Please enter a 12-digit Aadhaar number." });
      return;
    }
    startTransition(() => {
      setTimeout(() => {
        setIsOtpSent(true);
        toast({ title: "OTP Sent", description: "An OTP has been sent to your Aadhaar-linked mobile (use 123456)." });
      }, 1000);
    });
  };

  const handleVerifyOtp = () => {
    startTransition(() => {
      setTimeout(() => {
        if (otp === "123456") {
          setIsAadhaarVerified(true);
          toast({ title: "Aadhaar Verified Successfully" });
        } else {
          toast({ variant: "destructive", title: "Invalid OTP" });
        }
      }, 1500);
    });
  };

  const handleVerifyPan = () => {
    if (!panRegex.test(pan.toUpperCase())) {
      toast({ variant: "destructive", title: "Invalid PAN", description: "Please enter a valid PAN format." });
      return;
    }
    startTransition(() => {
      setTimeout(() => {
        setIsPanMatching(true);
        setIsPanVerified(true);
        toast({ title: "PAN Verified Successfully" });
      }, 1500);
    });
  };

  const handleContinue = () => {
    if (!user || !application.loanApplicationId) return;

    const isSakshi = aadhaar === '123412341234' && pan.toUpperCase() === 'VXMPK2553Y';
    
    const prefillData = {
      fullName: isSakshi ? "Sakshi Singh" : "Rahul Sharma",
      pan: pan.toUpperCase(),
      birthDate: isSakshi ? new Date(1971, 11, 16) : new Date(1985, 7, 15),
      gender: (isSakshi ? "Female" : "Male") as any,
      addressLine1: isSakshi ? "Patna, Bihar" : "Bandra, Mumbai",
      city: isSakshi ? "Patna" : "Mumbai",
      pincode: isSakshi ? "800001" : "400050",
      aadhaarNumber: aadhaar,
    };

    setApplication(prev => ({
      ...prev,
      prefilledFromKyc: true,
      personalDetails: {
        ...prev.personalDetails,
        ...prefillData,
        consent: false,
        loanAmount: prev.personalDetails?.loanAmount || 0,
        employmentType: prev.personalDetails?.employmentType || "",
        monthlyIncome: prev.personalDetails?.monthlyIncome || 0,
      },
      kyc: {
        ...prev.kyc,
        panStatus: 'VERIFIED',
        aadhaarAuthStatus: 'OTP_SUCCESS',
        aadhaarMaskedNumber: `XXXX-XXXX-${aadhaar.slice(-4)}`
      }
    }));

    const kycRef = doc(firestore, 'borrowers', user.uid, 'kyc_records', application.loanApplicationId);
    setDocumentNonBlocking(kycRef, { 
      borrowerId: user.uid, 
      panStatus: 'VERIFIED', 
      aadhaarAuthStatus: 'OTP_SUCCESS',
      applicationId: application.loanApplicationId,
      updatedAt: serverTimestamp() 
    }, { merge: true });

    onCompleted();
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Aadhaar & PAN Verification</CardTitle>
          <CardDescription>Verify your identity to pre-fill your loan application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-10">
          {/* Aadhaar Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="rounded-full h-6 w-6 p-0 flex items-center justify-center bg-primary text-primary-foreground">1</Badge>
              <h3 className="font-semibold text-lg">Aadhaar Verification</h3>
            </div>
            
            {isAadhaarVerified ? (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700 font-medium">Aadhaar Verified: XXXX-XXXX-{aadhaar.slice(-4)}</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
                <div className="space-y-2">
                  <Label htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input 
                    id="aadhaar" 
                    placeholder="1234 5678 9012" 
                    value={aadhaar} 
                    onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    disabled={isOtpSent || isVerifying}
                  />
                </div>
                {!isOtpSent ? (
                  <Button onClick={handleSendOtp} disabled={isVerifying || aadhaar.length !== 12}>
                    {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send OTP
                  </Button>
                ) : (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter 6-digit OTP (123456)</Label>
                      <Input 
                        id="otp" 
                        placeholder="123456" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        maxLength={6}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleVerifyOtp} disabled={isVerifying || otp.length !== 6}>
                        {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Verify OTP
                      </Button>
                      <Button variant="ghost" onClick={() => setIsOtpSent(false)} disabled={isVerifying}>Change Number</Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <Separator />

          {/* PAN Section */}
          <div className={cn("space-y-4", !isAadhaarVerified && "opacity-50 pointer-events-none")}>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="rounded-full h-6 w-6 p-0 flex items-center justify-center bg-primary text-primary-foreground">2</Badge>
              <h3 className="font-semibold text-lg">PAN Verification</h3>
            </div>

            {isPanVerified ? (
              <div className="space-y-3">
                <Alert className="bg-green-50 border-green-200">
                  <Verified className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700 font-medium">PAN Verified: {pan.toUpperCase()}</AlertDescription>
                </Alert>
                {isPanMatching && (
                  <p className="text-xs text-green-600 flex items-center gap-1 font-medium px-1">
                    <CheckCircle className="h-3 w-3" /> PAN details matched with Aadhaar records.
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
                <div className="space-y-2">
                  <Label htmlFor="pan">PAN Number</Label>
                  <Input 
                    id="pan" 
                    placeholder="ABCDE1234F" 
                    value={pan} 
                    onChange={(e) => setPan(e.target.value.toUpperCase().slice(0, 10))}
                    className="uppercase"
                    disabled={isVerifying}
                  />
                </div>
                <Button onClick={handleVerifyPan} disabled={isVerifying || pan.length !== 10}>
                  {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify PAN
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full h-12 text-lg" 
            disabled={!isAadhaarVerified || !isPanVerified || isVerifying}
            onClick={handleContinue}
          >
            Continue to Personal Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

const availableDigiLockerDocs = [
    { id: 'AADHAAR', label: 'Aadhaar Card' },
    { id: 'PAN_CARD', label: 'PAN Card' },
];

const manualUploadDocs: UploadableDocument[] = [
    { id: 'AADHAAR_FRONT', name: 'Aadhaar Card (Front)', status: 'PENDING', category: 'Identity' },
    { id: 'AADHAAR_BACK', name: 'Aadhaar Card (Back)', status: 'PENDING', category: 'Identity' },
    { id: 'PAN_CARD', name: 'PAN Card', status: 'PENDING', category: 'Identity' },
    { id: 'BANK_STATEMENT', name: 'Bank Statement (Last 6 months)', status: 'PENDING', category: 'Financial' },
    { id: 'SALARY_SLIP', name: 'Salary Slips (Last 3 months)', status: 'PENDING', category: 'Financial', optional: true },
];

export function DocumentVerificationStep({ onCompleted }: StepProps) {
    const { application, setApplication } = useLoanApplication();
    const { user } = useUser();
    const firestore = useFirestore();
    const [isDigiLockerModalOpen, setIsDigiLockerModalOpen] = useState(false);
    const [isProcessing, startProcessing] = useTransition();
    const [isUploading, startUploading] = useTransition();
    const [uploadedDocs, setUploadedDocs] = useState<UploadableDocument[]>(
        application.uploadedDocuments || manualUploadDocs
    );
    const { toast } = useToast();
    const { dict, language } = useLanguage();
    const d = dict.doc_verification;
    const fileInputRefs = useRef<{[key: string]: HTMLInputElement | null}>({});

    // DigiLocker Logic
    const handleDigiLockerFetch = (selectedDocIds: string[]) => {
        setIsDigiLockerModalOpen(false);
        startProcessing(() => {
            setTimeout(() => {
                const fetchedDocs = selectedDocIds.map(id => ({
                    id,
                    name: availableDigiLockerDocs.find(d => d.id === id)?.label || 'Document',
                    status: 'VERIFIED_DIGITALLY' as const,
                    category: 'Identity' as const,
                }));

                const newUploadedDocs = uploadedDocs.map(doc => {
                    const fetched = fetchedDocs.find(f => f.id === doc.id || (doc.id.startsWith('AADHAAR') && f.id === 'AADHAAR'));
                    return fetched ? { ...doc, status: 'VERIFIED_DIGITALLY' as const } : doc;
                });
                
                setUploadedDocs(newUploadedDocs);
                setApplication(prev => ({
                    ...prev,
                    uploadedDocuments: newUploadedDocs,
                    kyc: { ...prev.kyc, digilockerStatus: 'SUCCESS' }
                }));

                toast({ title: 'Documents Fetched' });
            }, 1500);
        });
    };

    // Manual Upload Logic
    const handleFileUpload = (docId: string, file: File, source: 'device' | 'dropbox') => {
        startUploading(() => {
            setTimeout(() => {
                setUploadedDocs(prev => prev.map(doc =>
                    doc.id === docId ? { ...doc, status: 'UPLOADED', file, source } : doc
                ));
                toast({ title: `${file.name} uploaded${source === 'dropbox' ? ' from Dropbox' : ''}.` });

                setTimeout(() => {
                    setUploadedDocs(prev => prev.map(doc =>
                        doc.id === docId ? { ...doc, status: 'VERIFIED_OCR' } : doc
                    ));
                     setApplication(prev => ({
                        ...prev,
                        uploadedDocuments: uploadedDocs.map(d => d.id === docId ? { ...d, status: 'VERIFIED_OCR' } : d),
                    }));
                    toast({ title: `${d.verified_toast.en} ${file.name}` });
                }, 1500);
            }, 1000);
        });
    };
    
    // Mock Dropbox upload
    const handleDropboxUpload = (docId: string) => {
        toast({ title: "Opening Dropbox..." });
        startUploading(() => {
            setTimeout(() => {
                const mockFile = new File(["mock content"], "document_from_dropbox.pdf", { type: "application/pdf" });
                handleFileUpload(docId, mockFile, 'dropbox');
            }, 2000);
        });
    };

    const isStepComplete = useMemo(() => {
        const requiredDocs = uploadedDocs.filter(doc => !doc.optional);
        return requiredDocs.every(doc => doc.status === 'VERIFIED_DIGITALLY' || doc.status === 'VERIFIED_OCR');
    }, [uploadedDocs]);

    const handleVerificationAndCreditCheck = () => {
      if (!user || !application.loanApplicationId || !application.personalDetails) {
        toast({ variant: 'destructive', title: 'Error', description: 'User or application context is missing.' });
        return;
      }
  
      startProcessing(async () => {
        // 1. Simulate Bureau Pull
        await new Promise(resolve => setTimeout(resolve, 2000));
        const simReport = {
          bureau_name: "CIBIL",
          score: Math.floor(Math.random() * (850 - 680 + 1)) + 680,
          total_active_loans: Math.floor(Math.random() * 3) + 1,
          total_overdue_amount: 0,
          max_dpd: 0,
          recent_enquiries_count: Math.floor(Math.random() * 3),
          decision_summary: "ELIGIBLE",
          bureau_raw_json: JSON.stringify({ "tradelines": 5, "inquiries_last_6m": 2, "simulatedData": true }, null, 2),
        };
  
        // 2. Perform Automated Underwriting Logic
        const { monthlyIncome, loanAmount } = application.personalDetails!;
        const existingMonthlyEmis = 5000;
        const foir = ((existingMonthlyEmis + (loanAmount / 12)) / monthlyIncome) * 100;
        
        let underwritingDecision: {
            status: 'APPROVED' | 'REJECTED' | 'PENDING_REVIEW';
            reason: string;
            risk_score: 'LOW_RISK' | 'MEDIUM_RISK' | 'HIGH_RISK';
            approved_amount: number | null;
            eligible_amount: number;
            approved_tenure_options: TenureOption[] | null;
        };
        
        // Mock LOS logic for demo
        let eligibleAmountRaw: number;
        if (loanAmount <= 100000) {
            eligibleAmountRaw = 150000;
        } else {
            eligibleAmountRaw = 75000;
        }


        // Force APPROVED status for prototype demo, but respect LOS calculation
        underwritingDecision = { 
            status: 'APPROVED', 
            reason: `Strong credit profile (score: ${simReport.score}) and low FOIR (${foir.toFixed(2)}%).`,
            risk_score: 'LOW_RISK',
            approved_amount: Math.min(loanAmount, eligibleAmountRaw), // Default to lower of requested or eligible
            eligible_amount: eligibleAmountRaw,
            approved_tenure_options: [{ tenure_months: 6 }, { tenure_months: 9 }, { tenure_months: 12 }, { tenure_months: 18 }]
        };
  
        // 3. Update application state and Firestore
        const appUpdate = {
          bureauReport: simReport,
          application_status: underwritingDecision.status,
          internal_risk_score: underwritingDecision.risk_score,
          bureau_score: simReport.score,
          eligibility_decision_reason: underwritingDecision.reason,
          approved_amount: underwritingDecision.approved_amount,
          eligible_amount: underwritingDecision.eligible_amount,
          approved_tenure_options: underwritingDecision.approved_tenure_options,
        };
        setApplication(prev => ({ ...prev, ...appUpdate }));
  
        const loanAppRef = doc(firestore, 'borrowers', user.uid, 'loan_applications', application.loanApplicationId);
        
        const loanAppUpdateData = {
          application_status: underwritingDecision.status,
          bureau_score: simReport.score,
          bureau_decision_summary: simReport.decision_summary,
          eligibility_decision_reason: underwritingDecision.reason,
          internal_risk_score: underwritingDecision.risk_score,
          approved_amount: underwritingDecision.approved_amount, // initially set
          eligible_amount: underwritingDecision.eligible_amount,
          approved_tenure_options: underwritingDecision.approved_tenure_options,
          updated_at: serverTimestamp(),
        };
  
        setDocumentNonBlocking(loanAppRef, loanAppUpdateData, { merge: true });
        
        const auditLog1Data = {
          entityType: 'LOAN_APPLICATION',
          entityId: application.loanApplicationId,
          action: 'BUREAU_PULL',
          actorType: 'SYSTEM',
          timestamp: serverTimestamp(),
          details: { score: simReport.score },
          borrowerId: user.uid,
        };
        addDocumentNonBlocking(collection(firestore, 'borrowers', user.uid, 'audit_logs'), auditLog1Data);
        
        const auditLog2Data = {
          entityType: 'LOAN_APPLICATION',
          entityId: application.loanApplicationId,
          action: 'UNDERWRITING_DECISION',
          actorType: 'SYSTEM',
          timestamp: serverTimestamp(),
          details: { decision: underwritingDecision.status, reason: underwritingDecision.reason },
          borrowerId: user.uid,
        };
        addDocumentNonBlocking(collection(firestore, 'borrowers', user.uid, 'audit_logs'), auditLog2Data);
  
        toast({ title: 'Credit Check Complete', description: `Your application is ${underwritingDecision.status}.` });
        
        onCompleted();
      });
    };

    const getVerificationStatus = (doc: UploadableDocument) => {
        let text: React.ReactNode;
        switch(doc.status) {
            case 'VERIFIED_DIGITALLY': text = d.upload_verified_digital_badge.en; break;
            case 'VERIFIED_OCR': text = doc.source === 'dropbox' ? 'Verified (from Dropbox)' : d.upload_verified_ocr_badge.en; break;
            case 'UPLOADED': text = d.upload_uploaded_badge.en; break;
            default: text = d.upload_pending_badge.en; break;
        }

        return <Badge variant={doc.status === 'VERIFIED_DIGITALLY' ? 'default' : doc.status === 'VERIFIED_OCR' ? 'secondary' : 'outline'}
                className={cn({
                    'bg-green-600': doc.status === 'VERIFIED_DIGITALLY',
                    'bg-blue-500 text-white': doc.status === 'VERIFIED_OCR'
                })}>
                    {text}
               </Badge>;
    };
    
    if (isProcessing) {
         return (
            <div className="flex flex-col items-center justify-center space-y-4 p-12 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <h3 className="text-xl font-semibold">
                    {d.processing_title.en}
                    {language !== 'en' && <span className="block text-lg font-normal text-muted-foreground mt-1">{d.processing_title.regional}</span>}
                </h3>
                <p className="text-muted-foreground">
                    {d.processing_description.en}
                    {language !== 'en' && <span className="block text-sm text-muted-foreground mt-1">{d.processing_description.regional}</span>}
                </p>
            </div>
        );
    }
    
    const VerificationSummary = () => {
        const { personalDetails } = application;
        if (!personalDetails) return null;

        const { fullName, birthDate, addressLine1, city, pincode, pan, gender } = personalDetails;

        const aadhaarData = {
            name: fullName.toUpperCase(),
            dob: birthDate,
            address: `${addressLine1}, ${city}, ${pincode}`
        };
        const panData = {
            name: fullName.toUpperCase(),
            dob: birthDate,
            pan: pan
        };
        
        let photoUrl: string;
        let photoHint: string;

        switch (gender) {
            case 'Male':
                photoUrl = 'https://storage.googleapis.com/project-magnolia-build-results-prod/images/503f752a-9038-4859-99a3-585a7304192b.png';
                photoHint = 'male avatar';
                break;
            case 'Female':
                photoUrl = 'https://storage.googleapis.com/project-magnolia-build-results-prod/images/422329e4-c5a4-4424-a74c-4740e69b910b.png';
                photoHint = 'female avatar';
                break;
            default:
                photoUrl = 'https://avatar.iran.liara.run/public';
                photoHint = 'neutral avatar';
                break;
        }


        const nameMatch = fullName.toLowerCase() === aadhaarData.name.toLowerCase();
        const dobMatch = birthDate.toDateString() === aadhaarData.dob.toDateString();
        const addressMatch = `${addressLine1}, ${city}, ${pincode}`.toLowerCase() === aadhaarData.address.toLowerCase();
        const panMatch = pan === panData.pan;
        
        const MatchIndicator = ({ isMatch }: { isMatch: boolean }) => (
           isMatch 
              ? <CheckCircle className="h-5 w-5 text-green-600" />
              : <XCircle className="h-5 w-5 text-destructive" />
        );

        return (
            <Card>
                <CardHeader>
                    <CardTitle>
                        {d.summary_title.en}
                        {language !== 'en' && <span className="block text-xl font-normal text-muted-foreground mt-1">{d.summary_title.regional}</span>}
                    </CardTitle>
                    <CardDescription>
                        {d.summary_description.en}
                        {language !== 'en' && <span className="block text-sm text-muted-foreground mt-1">{d.summary_description.regional}</span>}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="border rounded-lg p-3 space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                             <CheckCircle className="h-4 w-4 text-green-600" />
                             <span>Details verified against trusted and creditable sources such as Aadhaar or PAN</span>
                        </div>
                         <div className="flex items-center gap-2">
                             <XCircle className="h-4 w-4 text-destructive" />
                             <span>Details do not match or could not be verified against official records</span>
                        </div>
                    </div>
                
                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="relative h-24 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                           <Image 
                                src={photoUrl}
                                alt="Aadhaar Photo"
                                width={80}
                                height={96}
                                style={{ objectFit: "cover" }}
                                data-ai-hint={photoHint}
                            />
                        </div>
                        <div className="space-y-1 flex-grow">
                             <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{d.summary_name_label.en}</p>
                                    <p className="text-sm text-muted-foreground">{fullName}</p>
                                </div>
                                <MatchIndicator isMatch={nameMatch} />
                            </div>
                            <Separator />
                             <div className="flex justify-between items-center pt-2">
                                <div>
                                    <p className="font-semibold">{d.summary_dob_label.en}</p>
                                    <p className="text-sm text-muted-foreground">{birthDate.toLocaleDateString()}</p>
                                </div>
                                <MatchIndicator isMatch={dobMatch} />
                            </div>
                             <p className="text-xs text-muted-foreground pt-2">Photo fetched from Aadhaar (Mock)</p>
                        </div>
                    </div>
                
                    <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 border rounded-md">
                            <div>
                                <p className="font-semibold">{d.summary_address_label.en}</p>
                                <p className="text-sm text-muted-foreground max-w-xs truncate">{`${addressLine1}, ${city}`}</p>
                            </div>
                            <MatchIndicator isMatch={addressMatch} />
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-md">
                            <div>
                                <p className="font-semibold">{d.summary_pan_label.en}</p>
                                <p className="text-sm text-muted-foreground">{pan}</p>
                            </div>
                            <MatchIndicator isMatch={panMatch} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-8">
            <DigiLockerModal
                isOpen={isDigiLockerModalOpen}
                onOpenChange={setIsDigiLockerModalOpen}
                onFetch={handleDigiLockerFetch}
            />

            <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="flex-row items-center gap-4">
                     <Wallet className="h-10 w-10 text-blue-600 flex-shrink-0" />
                    <div>
                        <CardTitle className="text-blue-900">
                            {d.digilocker_title.en}
                            {language !== 'en' && <span className="block text-lg font-normal text-muted-foreground mt-1">{d.digilocker_title.regional}</span>}
                        </CardTitle>
                        <CardDescription className="text-blue-800">
                            {d.digilocker_description.en}
                            {language !== 'en' && <span className="block text-sm text-muted-foreground mt-1">{d.digilocker_description.regional}</span>}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => setIsDigiLockerModalOpen(true)} disabled={isProcessing}>
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        {d.digilocker_button.en}
                        {language !== 'en' && ` / ${d.digilocker_button.regional}`}
                    </Button>
                </CardContent>
            </Card>

            <div className="relative text-center">
                <Separator />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">OR</span>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        {d.manual_title.en}
                        {language !== 'en' && <span className="block text-xl font-normal text-muted-foreground mt-1">{d.manual_title.regional}</span>}
                    </CardTitle>
                    <CardDescription>
                        {d.manual_description.en}
                        {language !== 'en' && <span className="block text-sm text-muted-foreground mt-1">{d.manual_description.regional}</span>}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {uploadedDocs.map(doc => (
                        <div key={doc.id} className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <p className="font-semibold">{doc.name} {doc.optional && <span className="text-xs font-normal text-muted-foreground">(Optional)</span>}</p>
                                <div className="mt-1">{getVerificationStatus(doc)}</div>
                            </div>
                            {doc.status === 'PENDING' && (
                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">
                                            {d.upload_button.en}
                                            {language !== 'en' && ` / ${d.upload_button.regional}`}
                                            <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onSelect={() => fileInputRefs.current[doc.id]?.click()}>
                                            <FolderUp className="mr-2 h-4 w-4" />
                                            <span>Upload from device</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => handleDropboxUpload(doc.id)}>
                                            <Cloud className="mr-2 h-4 w-4" />
                                            <span>Upload from Dropbox</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                    <input 
                                        type="file" 
                                        ref={(el) => fileInputRefs.current[doc.id] = el}
                                        className="hidden"
                                        accept="image/*,application/pdf"
                                        onChange={(e) => e.target.files?.[0] && handleFileUpload(doc.id, e.target.files[0], 'device')}
                                    />
                                </DropdownMenu>
                            )}
                        </div>
                    ))}
                    {isUploading && (
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            {d.verifying_toast.en}
                            {language !== 'en' && ` / ${d.verifying_toast.regional}`}
                        </div>
                    )}
                </CardContent>
            </Card>
            
            {isStepComplete && <VerificationSummary />}

            {isStepComplete && (
                <Button onClick={handleVerificationAndCreditCheck} className="w-full" disabled={isProcessing}>
                    {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {d.continue_button.en}
                    {language !== 'en' && ` / ${d.continue_button.regional}`}
                </Button>
            )}
        </div>
    );
}


function DigiLockerModal({ isOpen, onOpenChange, onFetch }: { isOpen: boolean, onOpenChange: (open: boolean) => void, onFetch: (docs: string[]) => void }) {
    const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
    const { dict, language } = useLanguage();
    const d = dict.doc_verification;
    
    return (
         <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {d.digilocker_modal_title.en}
                        {language !== 'en' && <span className="block text-xl font-normal text-muted-foreground mt-1">{d.digilocker_modal_title.regional}</span>}
                    </DialogTitle>
                    <DialogDescription>
                        {d.digilocker_modal_description.en}
                        {language !== 'en' && <span className="block text-sm text-muted-foreground mt-1">{d.digilocker_modal_description.regional}</span>}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    {availableDigiLockerDocs.map(doc => (
                        <div key={doc.id} className="flex items-center space-x-2 p-3 border rounded-md">
                           <Checkbox
                                id={doc.id}
                                onCheckedChange={(checked) => {
                                    setSelectedDocs(prev => 
                                        checked ? [...prev, doc.id] : prev.filter(id => id !== doc.id)
                                    )
                                }}
                            />
                            <label htmlFor={doc.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {doc.label}
                            </label>
                        </div>
                    ))}
                </div>
                <Button onClick={() => onFetch(selectedDocs)} disabled={selectedDocs.length === 0}>
                    {d.digilocker_modal_share_button.en}
                    {language !== 'en' && ` / ${d.digilocker_modal_share_button.regional}`}
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export function CreditCheckStep({ onCompleted }: StepProps) {
  const { application, setApplication } = useLoanApplication();
  const { user } = useUser();
  const firestore = useFirestore();
  const [isProcessing, startTransition] = useTransition();
  const [reportReady, setReportReady] = useState(!!application.bureauReport);
  const { toast } = useToast();

  const handlePullReport = () => {
    if (!user || !application.loanApplicationId || !application.personalDetails) {
      toast({ variant: 'destructive', title: 'Error', description: 'User or application context is missing.' });
      return;
    }

    startTransition(async () => {
      // 1. Simulate Bureau Pull
      await new Promise(resolve => setTimeout(resolve, 2000));
      const simReport = {
        bureau_name: "CIBIL",
        score: Math.floor(Math.random() * (850 - 680 + 1)) + 680,
        total_active_loans: Math.floor(Math.random() * 3) + 1,
        total_overdue_amount: 0,
        max_dpd: 0,
        recent_enquiries_count: Math.floor(Math.random() * 3),
        decision_summary: "ELIGIBLE",
        bureau_raw_json: JSON.stringify({ "tradelines": 5, "inquiries_last_6m": 2, "simulatedData": true }, null, 2),
      };

      // 2. Perform Automated Underwriting Logic
      const { monthlyIncome, loanAmount } = application.personalDetails!;
      const existingMonthlyEmis = 5000; // existing EMIs
      const foir = ((existingMonthlyEmis + (loanAmount / 12)) / monthlyIncome) * 100;
      
      let underwritingDecision: {
          status: 'APPROVED' | 'REJECTED' | 'PENDING_REVIEW';
          reason: string;
          risk_score: 'LOW_RISK' | 'MEDIUM_RISK' | 'HIGH_RISK';
          approved_amount: number | null;
          approved_tenure_options: TenureOption[] | null;
      };
      
      // Force APPROVED status for prototype demo
      underwritingDecision = { 
          status: 'APPROVED', 
          reason: `Strong credit profile (score: ${simReport.score}) and low FOIR (${foir.toFixed(2)}%).`,
          risk_score: 'LOW_RISK',
          approved_amount: loanAmount, // Approve requested amount
          approved_tenure_options: [{ tenure_months: 6 }, { tenure_months: 9 }, { tenure_months: 12 }, { tenure_months: 18 }]
      };


      // 3. Update application state and Firestore
      const appUpdate = {
        bureauReport: simReport,
        application_status: underwritingDecision.status,
        internal_risk_score: underwritingDecision.risk_score,
        bureau_score: simReport.score,
        eligibility_decision_reason: underwritingDecision.reason,
        approved_amount: underwritingDecision.approved_amount,
        approved_tenure_options: underwritingDecision.approved_tenure_options,
      };
      setApplication(prev => ({ ...prev, ...appUpdate }));

      const loanAppRef = doc(firestore, 'borrowers', user.uid, 'loan_applications', application.loanApplicationId);
      
      const loanAppUpdateData = {
        application_status: underwritingDecision.status,
        bureau_score: simReport.score,
        bureau_decision_summary: simReport.decision_summary,
        eligibility_decision_reason: underwritingDecision.reason,
        internal_risk_score: underwritingDecision.risk_score,
        approved_amount: underwritingDecision.approved_amount,
        approved_tenure_options: underwritingDecision.approved_tenure_options,
        updated_at: serverTimestamp(),
      };

      setDocumentNonBlocking(loanAppRef, loanAppUpdateData, { merge: true });
      
      const auditLog1Data = {
        entityType: 'LOAN_APPLICATION',
        entityId: application.loanApplicationId,
        action: 'BUREAU_PULL',
        actorType: 'SYSTEM',
        timestamp: serverTimestamp(),
        details: { score: simReport.score },
        borrowerId: user.uid,
      };
      addDocumentNonBlocking(collection(firestore, 'borrowers', user.uid, 'audit_logs'), auditLog1Data);
      
      const auditLog2Data = {
        entityType: 'LOAN_APPLICATION',
        entityId: application.loanApplicationId,
        action: 'UNDERWRITING_DECISION',
        actorType: 'SYSTEM',
        timestamp: serverTimestamp(),
        details: { decision: underwritingDecision.status, reason: underwritingDecision.reason },
        borrowerId: user.uid,
      };
      addDocumentNonBlocking(collection(firestore, 'borrowers', user.uid, 'audit_logs'), auditLog2Data);

      toast({ title: 'Credit Check Complete', description: `Your application is ${underwritingDecision.status}.` });
      
      setReportReady(true);
    });
  };

  if (isProcessing) {
     return (
      <div className="flex flex-col items-center justify-center space-y-4 p-12 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h3 className="text-xl font-semibold">Performing Credit Assessment</h3>
        <p className="text-muted-foreground">Please wait while we securely fetch your credit report and assess your profile...</p>
      </div>
    );
  }

  if (reportReady) {
    if (application.application_status === 'REJECTED') {
      return (
         <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
              <AlertCircle className="h-16 w-16 text-destructive"/>
              <h3 className="text-2xl font-headline font-bold">Application Not Approved</h3>
              <p className="text-muted-foreground max-w-md">
                  {application.eligibility_decision_reason} We are unable to proceed with your loan application at this time based on our current lending policies.
              </p>
               <Button asChild><Link href="/">Back to Home</Link></Button>
          </div>
      );
    }
    
    const score = application.bureauReport?.score || 0;
    const getScoreColor = () => {
        if (score >= 750) return 'text-green-600';
        if (score >= 700) return 'text-lime-600';
        if (score >= 650) return 'text-yellow-500';
        return 'text-red-500';
    }
    const scoreBand = score >= 750 ? "Excellent" : score >= 700 ? "Good" : score >= 650 ? "Fair" : "Poor";

    return (
      <div className="space-y-6">
          <Alert variant="default" className="bg-green-50 border-green-200">
              <BadgeCheck className="h-4 w-4 !text-green-600" />
              <AlertTitle className="text-green-800">Credit Check Complete!</AlertTitle>
              <AlertDescription className="text-green-700">
                  Your credit profile has been reviewed. Here is your CIBIL score.
              </AlertDescription>
          </Alert>
          <Card>
              <CardHeader>
                  <CardTitle className="text-center">Your Credit Report Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 rounded-lg bg-muted/50 overflow-hidden relative flex flex-col items-center">
                    <div className={cn("flex items-center justify-center w-40 h-40 rounded-full border-8", 
                        score >= 750 ? "border-green-600" :
                        score >= 700 ? "border-lime-600" :
                        score >= 650 ? "border-yellow-500" : "border-red-500"
                    )}>
                        <div className="text-center">
                            <div className={cn("text-5xl font-bold", getScoreColor())}>{score}</div>
                            <div className="font-semibold">{scoreBand}</div>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">CIBIL Score - Decision: {application.bureauReport?.decision_summary}</p>
                </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-background rounded-md">
                        <p className="font-bold text-lg">{application.bureauReport?.total_active_loans}</p>
                        <p className="text-xs text-muted-foreground">Active Loans</p>
                      </div>
                      <div className="p-2 bg-background rounded-md">
                        <p className="font-bold text-lg">₹{application.bureauReport?.total_overdue_amount}</p>
                        <p className="text-xs text-muted-foreground">Overdue</p>
                      </div>
                      <div className="p-2 bg-background rounded-md">
                        <p className="font-bold text-lg">{application.bureauReport?.recent_enquiries_count}</p>
                        <p className="text-xs text-muted-foreground">Recent Enquiries</p>
                      </div>
                  </div>
                  <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                          <AccordionTrigger>View detailed report</AccordionTrigger>
                          <AccordionContent>
                              <pre className="text-xs bg-gray-100 p-2 rounded-md overflow-x-auto">
                                  {application.bureauReport?.bureau_raw_json}
                              </pre>                          </AccordionContent>
                      </AccordionItem>
                  </Accordion>
              </CardContent>
          </Card>
          <Button onClick={onCompleted} className="w-full">Continue to Eligibility Result</Button>
      </div>
    );
  }

  // Initial view before pulling the report
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
      <FileText className="h-16 w-16 text-primary"/>
      <h3 className="text-2xl font-headline font-bold">Credit Bureau Check</h3>
      <p className="text-muted-foreground max-w-md">
        As a final step before making an offer, we need to check your credit history with your consent. This is a secure, soft inquiry and will not affect your score.
      </p>
      <Button onClick={handlePullReport} disabled={isProcessing} size="lg">
        {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
        Pull My Credit Report
      </Button>
    </div>
  );
}


function generatePaymentSchedule(
  principal: number,
  annualRate: number,
  tenureMonths: number,
  firstEmiDate: Date
): { schedule: PaymentScheduleItem[], summary: any } {
  if (principal <= 0 || annualRate <= 0 || tenureMonths <= 0) return { schedule: [], summary: {} };

  const monthlyRate = annualRate / 12 / 100;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  let balance = principal;
  let cumulativeInterest = 0;
  const schedule: PaymentScheduleItem[] = [];
  let totalPayment = 0;

  for (let i = 1; i <= tenureMonths; i++) {
    const interestComponent = Math.round(balance * monthlyRate * 100) / 100;
    let principalComponent = Math.round((emi - interestComponent) * 100) / 100;
    let currentEmi = Math.round(emi * 100) / 100;

    if (i === tenureMonths) {
      principalComponent = balance;
      currentEmi = principalComponent + interestComponent;
    }
    
    balance = Math.round((balance - principalComponent) * 100) / 100;
    cumulativeInterest = Math.round((cumulativeInterest + interestComponent) * 100) / 100;
    totalPayment = Math.round((totalPayment + currentEmi) * 100) / 100;

    schedule.push({
      installmentNo: i,
      dueDate: addMonths(firstEmiDate, i - 1).toISOString(),
      principal: principalComponent,
      interest: interestComponent,
      totalPayment: currentEmi,
      outstandingPrincipal: balance,
      cumulativeInterest: cumulativeInterest,
    });
  }
  
  // Final adjustment if balance is not zero due to rounding
  if(balance !== 0 && schedule.length > 0) {
      const lastItem = schedule[schedule.length-1];
      lastItem.principal += balance;
      lastItem.totalPayment += balance;
      lastItem.outstandingPrincipal = 0;
      totalPayment += balance;
  }
  
  const totalInterestPayable = totalPayment - principal;

  return {
    schedule,
    summary: {
      totalInterestPayable: Math.round(totalInterestPayable * 100) / 100,
      totalPaymentDue: Math.round(totalPayment * 100) / 100,
      numInstallments: tenureMonths,
      firstEmiDate: firstEmiDate.toISOString(),
      lastEmiDate: addMonths(firstEmiDate, tenureMonths - 1).toISOString(),
    }
  };
}


export function EligibilityResultStep({ onCompleted }: StepProps) {
    const { application, setApplication } = useLoanApplication();
    const { user } = useUser();
    const firestore = useFirestore();
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const { dict, language } = useLanguage();
    const d = dict.eligibility;

    const [finalLoanAmount, setFinalLoanAmount] = useState(application.approved_amount || 0);
    const [amountError, setAmountError] = useState<string | null>(null);
    const [selectedTenure, setSelectedTenure] = useState<number | null>(null);
    const [calculatedEmi, setCalculatedEmi] = useState<number | null>(null);
    const [paymentSchedulePreview, setPaymentSchedulePreview] = useState<PaymentScheduleItem[]>([]);
    const [consentChecked, setConsentChecked] = useState(false);
    const [view, setView] = useState<'offer' | 'assisted_closure'>('offer');

    const ANNUAL_INTEREST_RATE = 10; // 10% p.a.
    const tenureOptions = application.approved_tenure_options?.map(opt => opt.tenure_months) || [3, 6, 9, 12];
    const requestedAmount = application.requested_amount || 0;
    const eligibleAmount = application.eligible_amount || 0;
    
    useEffect(() => {
        if (eligibleAmount > 0 && finalLoanAmount === 0) {
           setFinalLoanAmount(application.approved_amount || eligibleAmount);
        }
    }, [eligibleAmount, application.approved_amount, finalLoanAmount]);

    useEffect(() => {
      if (selectedTenure && finalLoanAmount > 0) {
        calculateEmiAndSchedule(finalLoanAmount, selectedTenure);
      } else {
        setCalculatedEmi(null);
        setPaymentSchedulePreview([]);
      }
    }, [finalLoanAmount, selectedTenure]);

    const handleAmountChange = (value: number[]) => {
      const newAmount = value[0];
      setFinalLoanAmount(newAmount);
      setAmountError(null);
    };
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value.replace(/[^0-9]/g, '');
        let newAmount = Number(rawValue);
        if (isNaN(newAmount)) newAmount = 0;
        setFinalLoanAmount(newAmount);
    };

    const handleInputBlur = () => {
        let clampedAmount = finalLoanAmount;
        if (clampedAmount < requestedAmount) {
            clampedAmount = requestedAmount;
            setAmountError(d.amount_validation_error.en.replace('<min>', `₹${requestedAmount.toLocaleString('en-IN')}`).replace('<max>', `₹${eligibleAmount.toLocaleString('en-IN')}`));
        } else if (clampedAmount > eligibleAmount) {
            clampedAmount = eligibleAmount;
            setAmountError(d.amount_validation_error.en.replace('<min>', `₹${requestedAmount.toLocaleString('en-IN')}`).replace('<max>', `₹${eligibleAmount.toLocaleString('en-IN')}`));
        } else {
            setAmountError(null);
        }
        setFinalLoanAmount(clampedAmount);
    };

    const calculateEmiAndSchedule = (amount: number, tenure: number) => {
      if (amount > 0) {
        const P = amount;
        const r = (ANNUAL_INTEREST_RATE / 12) / 100;
        const n = tenure;
        const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setCalculatedEmi(Math.round(emiValue));
        
        const firstEmiDate = addMonths(new Date(), 1);
        const { schedule } = generatePaymentSchedule(P, ANNUAL_INTEREST_RATE, tenure, firstEmiDate);
        
        if (schedule.length > 4) {
            setPaymentSchedulePreview([schedule[0], schedule[1], schedule[2], schedule[schedule.length - 1]]);
        } else {
            setPaymentSchedulePreview(schedule);
        }
      }
    }

    const handleTenureChange = (tenureStr: string) => {
      const tenure = parseInt(tenureStr);
      setSelectedTenure(tenure);
    };

    const handleConfirmAndContinue = () => {
        if (!user || !application.loanApplicationId) {
            toast({ variant: "destructive", title: "User session expired." });
            return;
        }
        if (!selectedTenure || !calculatedEmi) {
            toast({ variant: "destructive", title: "Please select a tenure." });
            return;
        }
        if (!consentChecked) {
            toast({ variant: "destructive", title: "Please confirm your choice." });
            return;
        }

        startTransition(() => {
            const firstEmiDate = addMonths(new Date(), 1);
            const { schedule, summary } = generatePaymentSchedule(
              finalLoanAmount,
              ANNUAL_INTEREST_RATE,
              selectedTenure,
              firstEmiDate
            );

            const appUpdate = {
                approved_amount: finalLoanAmount,
                selected_tenure_months: selectedTenure,
                selected_emi_amount: calculatedEmi,
                offer_status: 'OFFER_GENERATED' as const,
                paymentSchedule: schedule,
                totalInterestPayable: summary.totalInterestPayable,
                totalPaymentDue: summary.totalPaymentDue,
                firstEmiDate: summary.firstEmiDate,
                lastEmiDate: summary.lastEmiDate
            };
            setApplication(prev => ({ ...prev, ...appUpdate }));

            const loanAppRef = doc(firestore, 'borrowers', user.uid, 'loan_applications', application.loanApplicationId);
            updateDocumentNonBlocking(loanAppRef, { ...appUpdate, updated_at: serverTimestamp() });
            
            const auditLogData = {
                entityType: 'LOAN_APP',
                entityId: application.loanApplicationId,
                action: 'PAYMENT_SCHEDULE_GENERATED',
                actorType: 'SYSTEM',
                timestamp: serverTimestamp(),
                new_value: {
                    selected_tenure_months: selectedTenure,
                    selected_emi_amount: calculatedEmi,
                    num_installments: summary.numInstallments,
                    total_interest_payable: summary.totalInterestPayable,
                    total_payment: summary.totalPaymentDue,
                },
                borrowerId: user.uid,
            };
            addDocumentNonBlocking(collection(firestore, 'borrowers', user.uid, 'audit_logs'), auditLogData);
            
            toast({ title: "Tenure Confirmed", description: "Proceeding to Key Facts Statement." });
            onCompleted();
        });
    };
    
    if (view === 'assisted_closure') {
        return (
            <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
                <Info className="h-16 w-16 text-primary"/>
                <h3 className="text-2xl font-headline font-bold">
                    {d.assisted_journey_title.en}
                    {language !== 'en' && <span className="block text-xl font-normal text-muted-foreground mt-1">{d.assisted_journey_title.regional}</span>}
                </h3>
                <p className="text-muted-foreground max-w-md whitespace-pre-wrap">
                    {d.assisted_journey_description.en}
                    {language !== 'en' && <span className="block text-sm text-muted-foreground mt-1">{d.assisted_journey_description.regional}</span>}
                </p>
                 <div className="space-y-2 text-left w-full max-w-sm rounded-lg border p-4 bg-muted/50">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{d.app_id_label.en}:</span>
                        <span className="font-mono font-bold">{application.loanApplicationId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{d.approved_amount_label.en}:</span>
                        <span className="font-bold">₹{finalLoanAmount.toLocaleString('en-IN')}</span>
                    </div>
                </div>
                <Button asChild><Link href="/">{d.back_home_button.en}</Link></Button>
            </div>
        );
    }
    
    if (application.application_status === 'REJECTED') {
      return (
         <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
              <AlertCircle className="h-16 w-16 text-destructive"/>
              <h3 className="text-2xl font-headline font-bold">
                {d.rejected_title.en}
                {language !== 'en' && <span className="block text-xl font-normal text-muted-foreground mt-1">{d.rejected_title.regional}</span>}
              </h3>
              <p className="text-muted-foreground max-w-md">
                  {application.eligibility_decision_reason || d.rejected_description.en}
                  {language !== 'en' && application.eligibility_decision_reason && <span className="block text-sm text-muted-foreground mt-1">{d.rejected_description.regional}</span>}
              </p>
              <Button asChild><Link href="/">{d.back_home_button.en}</Link></Button>
          </div>
      );
    }
    
    if (!application.bureauReport) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 p-12 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h3 className="text-xl font-semibold">
            {d.finalizing_title.en}
            {language !== 'en' && <span className="block text-lg font-normal text-muted-foreground mt-1">{d.finalizing_title.regional}</span>}
            </h3>
          <p className="text-muted-foreground">
            {d.finalizing_description.en}
            {language !== 'en' && <span className="block text-sm text-muted-foreground mt-1">{d.finalizing_description.regional}</span>}
            </p>
        </div>
      );
    }

    const score = application.bureauReport?.score || 0;
    const scoreBand = score >= 750 ? "Excellent" : score >= 700 ? "Good" : score >= 650 ? "Fair" : "Poor";
    
    const getScoreBandTranslation = () => {
        switch(scoreBand) {
            case 'Excellent': return d.score_band_excellent;
            case 'Good': return d.score_band_good;
            case 'Fair': return d.score_band_fair;
            case 'Poor': return d.score_band_poor;
        }
    }

    const getScoreColor = () => {
        if (score >= 750) return 'text-green-600';
        if (score >= 700) return 'text-lime-600';
        if (score >= 650) return 'text-yellow-500';
        return 'text-red-500';
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">
                        {d.report_summary_title.en}
                        {language !== 'en' && <span className="block text-xl font-normal text-muted-foreground mt-1">{d.report_summary_title.regional}</span>}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 rounded-lg bg-muted/50 overflow-hidden relative flex flex-col items-center">
                      <div className={cn("flex items-center justify-center w-40 h-40 rounded-full border-8", getScoreColor())}>
                          <div className="text-center">
                              <div className={cn("text-5xl font-bold", getScoreColor())}>{score}</div>
                              <div className="font-semibold">
                                  {getScoreBandTranslation().en}
                                  {language !== 'en' && <span className="block text-sm font-normal text-muted-foreground mt-1">{getScoreBandTranslation().regional}</span>}
                              </div>
                          </div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        {d.cibil_score_label.en} - Decision: {application.bureauReport?.decision_summary}
                        {language !== 'en' && <span className="block text-xs font-normal mt-1">{d.cibil_score_label.regional} - Decision: {application.bureauReport?.decision_summary}</span>}
                        </div>
                  </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-background rounded-md">
                          <div className="font-bold text-lg">{application.bureauReport?.total_active_loans}</div>
                          <div className="text-xs text-muted-foreground">{d.active_loans_label.en}{language !== 'en' && `/${d.active_loans_label.regional}`}</div>
                        </div>
                        <div className="p-2 bg-background rounded-md">
                          <div className="font-bold text-lg">₹{application.bureauReport?.total_overdue_amount}</div>
                          <div className="text-xs text-muted-foreground">{d.overdue_label.en}{language !== 'en' && `/${d.overdue_label.regional}`}</div>
                        </div>
                        <div className="p-2 bg-background rounded-md">
                          <div className="font-bold text-lg">{application.bureauReport?.recent_enquiries_count}</div>
                          <div className="text-xs text-muted-foreground">{d.enquiries_label.en}{language !== 'en' && `/${d.enquiries_label.regional}`}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Separator />
            
            {eligibleAmount > requestedAmount ? (
                <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-blue-900">
                            {d.upsell_title.en}
                            {language !== 'en' && <span className="block text-lg font-normal text-muted-foreground mt-1">{d.upsell_title.regional}</span>}
                        </CardTitle>
                        <CardDescription className="text-blue-800">
                           {d.upsell_description.en.replace('<requested>', `₹${requestedAmount.toLocaleString('en-IN')}`).replace('<eligible>', `₹${eligibleAmount.toLocaleString('en-IN')}`)}
                            {language !== 'en' && <span className="block text-sm mt-1">{d.upsell_description.regional.replace('<requested>', `₹${requestedAmount.toLocaleString('en-IN')}`).replace('<eligible>', `₹${eligibleAmount.toLocaleString('en-IN')}`)}</span>}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                             <BilingualText en={d.select_amount_label.en} regional={d.select_amount_label.regional}/>
                            {finalLoanAmount === eligibleAmount && (
                                <div>
                                    <Badge variant="default" className="bg-green-600">
                                    {d.recommended_badge.en}
                                    {language !== 'en' && ` / ${d.recommended_badge.regional}`}
                                    </Badge>
                                </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <Slider
                                id="loan-amount-slider"
                                min={requestedAmount}
                                max={eligibleAmount}
                                step={1000}
                                value={[finalLoanAmount]}
                                onValueChange={handleAmountChange}
                                className="flex-1"
                            />
                             <div className="relative w-32">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                                <Input
                                    type="text"
                                    value={finalLoanAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                    onBlur={handleInputBlur}
                                    onChange={handleInputChange}
                                    className="w-full font-bold pl-6"
                                />
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>₹{requestedAmount.toLocaleString('en-IN')}</span>
                            <span>₹{eligibleAmount.toLocaleString('en-IN')}</span>
                          </div>
                          {amountError && <p className="text-sm text-destructive mt-2">{amountError}</p>}
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="text-center">
                    <div className="text-muted-foreground">
                        {d.lower_amount_requested.en.replace('{amount}', `₹${requestedAmount.toLocaleString('en-IN')}`)}
                        {language !== 'en' && <span className="block text-sm mt-1">{d.lower_amount_requested.regional.replace('{amount}', `₹${requestedAmount.toLocaleString('en-IN')}`)}</span>}
                    </div>
                    <div className="text-muted-foreground font-semibold mt-2">
                        {d.lower_amount_approved.en}
                        {language !== 'en' && <span className="block text-sm mt-1">{d.lower_amount_approved.regional}</span>}
                    </div>
                    <h3 className="font-headline text-4xl font-bold text-primary">₹{finalLoanAmount.toLocaleString('en-IN')}</h3>
                    <div className="text-xs text-muted-foreground mt-1">
                        {d.lower_amount_reason.en}
                        {language !== 'en' && <span className="block text-xs mt-1">{d.lower_amount_reason.regional}</span>}
                    </div>
                    <div className="flex gap-4 justify-center mt-6">
                        <Button variant="outline" onClick={() => setView('assisted_closure')}>
                            {d.lower_amount_decline_button.en}
                            {language !== 'en' && ` / ${d.lower_amount_decline_button.regional}`}
                        </Button>
                        <Button onClick={handleConfirmAndContinue}>
                            {d.lower_amount_accept_button.en.replace('{amount}', `₹${finalLoanAmount.toLocaleString('en-IN')}`)}
                            {language !== 'en' && ` / ${d.lower_amount_accept_button.regional.replace('{amount}', `₹${finalLoanAmount.toLocaleString('en-IN')}`)}`}
                        </Button>
                    </div>
                </div>
            )}
            
            {eligibleAmount >= requestedAmount && (
                <>
                    <div>
                        <div><BilingualText en={d.tenure_label.en} regional={d.tenure_label.regional}/></div>
                        <p className="text-sm text-muted-foreground mb-4">
                            {d.tenure_description.en}
                            {language !== 'en' && <span className="block text-xs mt-1">{d.tenure_description.regional}</span>}
                        </p>
                        <RadioGroup 
                            onValueChange={handleTenureChange}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                        {tenureOptions.map((tenure) => (
                            <div key={tenure}>
                            <RadioGroupItem value={tenure.toString()} id={`tenure-${tenure}`} className="sr-only" />
                            <Label htmlFor={`tenure-${tenure}`} className={cn(
                                "cursor-pointer rounded-lg border-2 p-4 text-center transition-all flex flex-col justify-center h-full",
                                selectedTenure === tenure 
                                    ? "border-primary bg-primary/10 shadow-lg" 
                                    : "border-border hover:border-primary/50"
                            )}>
                                <div className="font-bold text-lg">{tenure}</div>
                                <div className="text-sm text-muted-foreground">{d.for_months_label.en}</div>
                            </Label>
                            </div>
                        ))}
                        </RadioGroup>
                    </div>


                    {selectedTenure && calculatedEmi ? (
                        <Card className="bg-muted/50">
                            <CardHeader className="p-4">
                                <CardTitle className="text-center text-lg">{d.plan_title.en}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 text-center">
                                <div className="text-3xl font-bold font-headline">₹{calculatedEmi.toLocaleString('en-IN')} <span className="text-base font-normal text-muted-foreground">{d.per_month_label.en}</span></div>
                                <div className="text-sm text-muted-foreground">{selectedTenure} {d.for_months_label.en} at {ANNUAL_INTEREST_RATE}{d.at_interest_label.en}</div>
                            </CardContent>
                        </Card>
                    ) : null}

                    {paymentSchedulePreview.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="font-semibold">{d.schedule_preview_title.en}</h4>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Due Date</TableHead>
                                        <TableHead className="text-right">EMI</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paymentSchedulePreview.map(item => (
                                        <TableRow key={item.installmentNo}>
                                            <TableCell>{item.installmentNo}</TableCell>
                                            <TableCell>{format(new Date(item.dueDate), 'dd MMM yyyy')}</TableCell>
                                            <TableCell className="text-right">₹{Math.round(item.totalPayment).toLocaleString('en-IN')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    <div className="flex items-center space-x-2 rounded-md border p-4 shadow-sm">
                        <Checkbox id="terms" checked={consentChecked} onCheckedChange={(checked) => setConsentChecked(checked as boolean)} />
                        <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                           {d.confirm_consent_label.en}
                           {language !== 'en' && <span className="block text-xs text-muted-foreground mt-1">{d.confirm_consent_label.regional}</span>}
                        </label>
                    </div>
                    
                    <Button 
                        onClick={handleConfirmAndContinue} 
                        className="w-full" 
                        disabled={isPending || !selectedTenure || !consentChecked}
                        size="lg"
                    >
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {d.confirm_button.en}
                        {language !== 'en' && ` / ${d.confirm_button.regional}`}
                    </Button>
                    {(!selectedTenure || !consentChecked) && (
                         <div className="text-sm text-destructive text-center"><p>{d.validation_message.en}</p></div>
                    )}
                </>
            )}
        </div>
    );
}


export function KfsStep({ onCompleted }: StepProps) {
  const { application, setApplication } = useLoanApplication();
  const [isKfsOpen, setIsKfsOpen] = useState(false);
  const [kfsViewed, setKfsViewed] = useState(false);
  const { toast } = useToast();
  const { dict, language } = useLanguage();
  const d = dict.kfs;


  const form = useForm({
    resolver: zodResolver(z.object({ consent: z.literal(true) })),
    defaultValues: { consent: false },
  });

  if (!application.approved_amount || !application.selected_tenure_months || !application.selected_emi_amount) {
    return <p>Loan offer details not found. Please go back and select a tenure.</p>;
  }

  const { approved_amount, selected_tenure_months, selected_emi_amount } = application;
  const processingFee = approved_amount * 0.02; // 2% processing fee
  const gst = processingFee * 0.18; // 18% GST
  const disbursedAmount = approved_amount - processingFee - gst;
  const totalInterest = (application.totalInterestPayable) || 0;
  const totalRepayment = (application.totalPaymentDue) || 0;
  const apr = (((totalInterest + processingFee + gst) / approved_amount) / (selected_tenure_months/12)) * 100;

  const handleAccept = (data: { consent: boolean }) => {
    if (!kfsViewed) {
        toast({
            variant: "destructive",
            title: "Please View KFS",
            description: "You must view the Key Facts Statement before accepting.",
        });
        return;
    }
    if (data.consent) {
        setApplication(prev => ({
            ...prev,
            offer_status: 'OFFER_ACCEPTED',
            kfs_document_url: '/simulated/kfs.pdf',
        }));
        onCompleted();
    }
  };

  const openKfs = () => {
    setIsKfsOpen(true);
    setKfsViewed(true);
  }

  return (
    <div className="space-y-6">
      <Dialog open={isKfsOpen} onOpenChange={setIsKfsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-center">
                {d.kfs_title.en}
                {language !== 'en' && <span className="block text-xl font-normal text-muted-foreground mt-1">{d.kfs_title.regional}</span>}
            </DialogTitle>
            <DialogDescription className="text-center">
                {d.kfs_description.en}
                 {language !== 'en' && <span className="block text-sm text-muted-foreground mt-1">{d.kfs_description.regional}</span>}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-96 w-full rounded-md border p-4">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-semibold">Loan Details</h3>
                  <div className="grid grid-cols-2 text-sm">
                    <p>Loan Amount:</p><p className="font-medium">₹{approved_amount.toLocaleString('en-IN')}</p>
                    <p>Net Disbursed Amount:</p><p className="font-medium">₹{disbursedAmount.toLocaleString('en-IN')}</p>
                    <p>Tenure:</p><p className="font-medium">{selected_tenure_months} months</p>
                    <p>EMI:</p><p className="font-medium">₹{selected_emi_amount.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <Separator/>
                <div className="space-y-1">
                  <h3 className="font-semibold">Fees & Charges</h3>
                  <div className="grid grid-cols-2 text-sm">
                    <p>Processing Fee:</p><p className="font-medium">₹{processingFee.toLocaleString('en-IN')}</p>
                    <p>GST on Fee:</p><p className="font-medium">₹{gst.toLocaleString('en-IN')}</p>
                    <p>Annual Percentage Rate (APR):</p><p className="font-medium">{apr.toFixed(2)}%</p>
                    <p>Penal Charges:</p><p className="font-medium">2% per month on overdue amount</p>
                  </div>
                </div>
                <Separator/>
                 {application.paymentSchedule && (
                  <div className="space-y-2">
                      <h3 className="font-semibold">Full Payment Schedule</h3>
                      <Table>
                          <TableHeader>
                              <TableRow>
                                  <TableHead>#</TableHead>
                                  <TableHead>Due Date</TableHead>
                                  <TableHead>Principal</TableHead>
                                  <TableHead>Interest</TableHead>
                                  <TableHead className="text-right">Total EMI</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {application.paymentSchedule.map(item => (
                                  <TableRow key={item.installmentNo}>
                                      <TableCell>{item.installmentNo}</TableCell>
                                      <TableCell>{format(new Date(item.dueDate), 'dd MMM yyyy')}</TableCell>
                                      <TableCell>₹{item.principal.toFixed(2)}</TableCell>
                                      <TableCell>₹{item.interest.toFixed(2)}</TableCell>
                                      <TableCell className="text-right">₹{item.totalPayment.toFixed(2)}</TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </div>
                )}
                <Separator/>
                <div className="space-y-1 text-sm">
                  <h3 className="font-semibold">Grievance Redressal</h3>
                  <p>Contact: grievance@loanswift-re.com</p>
                  <p>Phone: +91-22-12345678</p>
                </div>
              </div>
          </ScrollArea>
           <Button onClick={() => setIsKfsOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
        
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-center text-2xl">
            {d.title.en}
            {language !== 'en' && <span className="block text-xl font-normal text-muted-foreground mt-1">{d.title.regional}</span>}
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            {d.description.en}
            {language !== 'en' && <span className="block text-sm text-muted-foreground mt-1">{d.description.regional}</span>}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 border rounded-lg bg-muted/50">
            <p className="text-muted-foreground">{d.loan_amount.en}{language !== 'en' && <><br/><span className="text-xs">{d.loan_amount.regional}</span></> }</p>
            <p className="font-semibold text-right">₹{approved_amount.toLocaleString('en-IN')}</p>
            <p className="text-muted-foreground">{d.processing_fee.en}{language !== 'en' && <><br/><span className="text-xs">{d.processing_fee.regional}</span></> }</p>
            <p className="font-semibold text-right">- ₹{processingFee.toLocaleString('en-IN')}</p>
            <p className="text-muted-foreground">GST (18% on fee)</p>
            <p className="font-semibold text-right">- ₹{gst.toLocaleString('en-IN')}</p>
            <Separator className="col-span-2 my-1" />
            <p className="text-muted-foreground font-bold">{d.net_disbursed.en}{language !== 'en' && <><br/><span className="text-xs">{d.net_disbursed.regional}</span></> }</p>
            <p className="font-bold text-right text-lg">₹{disbursedAmount.toLocaleString('en-IN')}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 border rounded-lg">
            <p className="text-muted-foreground">{d.monthly_emi.en}{language !== 'en' && <><br/><span className="text-xs">{d.monthly_emi.regional}</span></> }</p>
            <p className="font-semibold text-right">₹{selected_emi_amount.toLocaleString('en-IN')}</p>
            <p className="text-muted-foreground">{d.total_repayment.en}{language !== 'en' && <><br/><span className="text-xs">{d.total_repayment.regional}</span></> }</p>
            <p className="font-semibold text-right">₹{Math.round(totalRepayment).toLocaleString('en-IN')}</p>
          </div>
          <Button variant="link" onClick={openKfs} className="p-0 h-auto">
            {d.view_kfs_button.en}
            {language !== 'en' && <span className="text-sm font-normal text-muted-foreground ml-1">/ {d.view_kfs_button.regional}</span>}
            </Button>
        </CardContent>
      </Card>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAccept)} className="space-y-4">
           <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={!kfsViewed}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <Label className={!kfsViewed ? 'text-muted-foreground' : ''}>
                    {d.accept_consent.en}
                    {language !== 'en' && <span className="block text-sm font-normal text-muted-foreground mt-1">{d.accept_consent.regional}</span>}
                  </Label>
                  {!kfsViewed && (
                    <p className="text-sm text-muted-foreground">Please view the KFS document before accepting.</p>
                  )}
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!form.formState.isValid} className="w-full mt-6">
            {d.accept_button.en}
            {language !== 'en' && ` / ${d.accept_button.regional}`}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export function SanctionLetterStep({ onCompleted }: StepProps) {
  const { application, setApplication } = useLoanApplication();
  const { user } = useUser();
  const { dict, language } = useLanguage();
  const d = dict.sanction_letter;

  const [view, setView] = useState<'letter' | 'declined'>('letter');
  const [isSigning, startSigning] = useTransition();
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const { toast } = useToast();

  const {
    personalDetails,
    loanApplicationId,
    approved_amount,
    selected_tenure_months,
    selected_emi_amount,
  } = application;

  if (!personalDetails || !approved_amount || !selected_tenure_months || !selected_emi_amount) {
    return <p>Sanction details are not available. Please complete previous steps.</p>;
  }

  const processingFee = approved_amount * 0.02;
  const gst = processingFee * 0.18;
  const netDisbursalAmount = approved_amount - processingFee - gst;

  const handleAccept = () => {
    setIsSignModalOpen(true);
  };

  const handleDecline = () => {
    setView('declined');
    setApplication(prev => ({ ...prev, application_status: 'REJECTED' }));
    // In a real app, update Firestore status to 'REJECTED_BY_BORROWER'
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startSigning(() => {
      setTimeout(() => {
        if (otp === '123456') {
          toast({ title: 'Sanction Letter e-Signed Successfully' });
          setApplication(prev => ({
            ...prev,
            sanctionLetter: {
              ...prev.sanctionLetter,
              isSigned: true,
              signedAt: new Date().toISOString(),
            }
          }));
          setIsSignModalOpen(false);
          onCompleted();
        } else {
          toast({ variant: 'destructive', title: 'Invalid OTP' });
        }
      }, 1500);
    });
  };

  if (view === 'declined') {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
        <XCircle className="h-16 w-16 text-muted-foreground"/>
        <h3 className="text-2xl font-headline font-bold">
            {d.decline_title.en}
            {language !== 'en' && <span className="block text-xl font-normal text-muted-foreground mt-1">{d.decline_title.regional}</span>}
        </h3>
        <p className="text-muted-foreground max-w-md">
          Your application ID is <span className="font-bold font-mono">15</span>. Our relationship manager will contact you shortly to assist you further or clarify any questions.
          {language !== 'en' && <span className="block text-sm text-muted-foreground mt-1">{d.decline_description.regional.replace('<ID>', "15")}</span>}
        </p>
        <p className="text-sm text-muted-foreground">
          {d.support_contact.en}
          {language !== 'en' && <span className="block text-xs text-muted-foreground mt-1">{d.support_contact.regional}</span>}
        </p>
        <Button asChild><Link href="/">Back to Home</Link></Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Dialog open={isSignModalOpen} onOpenChange={setIsSignModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
                {d.esign_title.en}
                {language !== 'en' && <span className="block text-xl font-normal text-muted-foreground mt-1">{d.esign_title.regional}</span>}
            </DialogTitle>
            <DialogDescription>
                {d.esign_description.en}
                {language !== 'en' && <span className="block text-sm text-muted-foreground mt-1">{d.esign_description.regional}</span>}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <Label htmlFor="otp">
                {d.otp_label.en}
                {language !== 'en' && <span className="block text-sm font-normal text-muted-foreground mt-1">{d.otp_label.regional}</span>}
            </Label>
            <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" maxLength={6} />
            <Button type="submit" disabled={isSigning} className="w-full">
              {isSigning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {d.esign_button.en}
              {language !== 'en' && ` / ${d.esign_button.regional}`}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      
      <Card className="border-2 border-primary/50 shadow-lg">
        <CardHeader className="text-center bg-muted/50 p-4">
          <CardTitle className="font-headline text-2xl">
            {d.title.en}
            {language !== 'en' && <span className="block text-xl font-normal text-muted-foreground mt-1">{d.title.regional}</span>}
          </CardTitle>
          <CardDescription>
            {d.description.en}
            {language !== 'en' && <span className="block text-sm text-muted-foreground mt-1">{d.description.regional}</span>}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6 text-sm">
          {/* Borrower Details */}
          <div className="space-y-2">
            <h3 className="font-semibold text-base">{d.borrower_details.en}{language !== 'en' && <span className="block text-sm font-normal text-muted-foreground">{d.borrower_details.regional}</span>}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <span>{d.borrower_name.en}{language !== 'en' && <span className="block text-xs text-muted-foreground">{d.borrower_name.regional}</span>}</span>
              <span className="text-right font-medium">{personalDetails.fullName}</span>
              <span>{d.app_id.en}{language !== 'en' && <span className="block text-xs text-muted-foreground">{d.app_id.regional}</span>}</span>
              <span className="text-right font-bold font-mono">15</span>
              <span>{d.pan.en}{language !== 'en' && <span className="block text-xs text-muted-foreground">{d.pan.regional}</span>}</span>
              <span className="text-right font-medium">XXXXXX{personalDetails.pan.slice(-4)}</span>
              <span>{d.sanction_date.en}{language !== 'en' && <span className="block text-xs text-muted-foreground">{d.sanction_date.regional}</span>}</span>
              <span className="text-right font-medium">{format(new Date(), 'dd-MMM-yyyy')}</span>
            </div>
          </div>
          <Separator />
          {/* Loan Details */}
          <div className="space-y-2">
            <h3 className="font-semibold text-base">{d.loan_details.en}{language !== 'en' && <span className="block text-sm font-normal text-muted-foreground">{d.loan_details.regional}</span>}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <span>{d.sanctioned_amount.en}{language !== 'en' && <span className="block text-xs text-muted-foreground">{d.sanctioned_amount.regional}</span>}</span>
              <span className="text-right font-medium">₹{approved_amount.toLocaleString('en-IN')}</span>
              <span>{d.loan_type.en}{language !== 'en' && <span className="block text-xs text-muted-foreground">{d.loan_type.regional}</span>}</span>
              <span className="text-right font-medium">Personal Loan</span>
              <span>{d.tenure.en}{language !== 'en' && <span className="block text-xs text-muted-foreground">{d.tenure.regional}</span>}</span>
              <span className="text-right font-medium">{selected_tenure_months} Months</span>
              <span>{d.interest_rate.en}{language !== 'en' && <span className="block text-xs text-muted-foreground">{d.interest_rate.regional}</span>}</span>
              <span className="text-right font-medium">10.00% p.a.</span>
              <span>{d.emi_amount.en}{language !== 'en' && <span className="block text-xs text-muted-foreground">{d.emi_amount.regional}</span>}</span>
              <span className="text-right font-medium">₹{selected_emi_amount.toLocaleString('en-IN')}</span>
              <span>{d.emi_start_date.en}{language !== 'en' && <span className="block text-xs text-muted-foreground">{d.emi_start_date.regional}</span>}</span>
              <span className="text-right font-medium">{format(addMonths(new Date(), 1), 'dd-MMM-yyyy')}</span>
            </div>
          </div>
          <Separator />
           {/* Fees & Disbursal */}
          <div className="space-y-2">
            <h3 className="font-semibold text-base">{d.fees_disbursal.en}{language !== 'en' && <span className="block text-sm font-normal text-muted-foreground">{d.fees_disbursal.regional}</span>}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <span>{d.processing_fee.en}{language !== 'en' && <span className="block text-xs text-muted-foreground">{d.processing_fee.regional}</span>}</span>
              <span className="text-right font-medium">- ₹{processingFee.toLocaleString('en-IN')}</span>
              <span>{d.gst.en}{language !== 'en' && <span className="block text-xs text-muted-foreground">{d.gst.regional}</span>}</span>
              <span className="text-right font-medium">- ₹{gst.toLocaleString('en-IN')}</span>
              <Separator className="col-span-2 my-1" />
              <span className="font-bold">{d.net_disbursal.en}{language !== 'en' && <span className="block text-xs text-muted-foreground">{d.net_disbursal.regional}</span>}</span>
              <span className="text-right font-bold">₹{netDisbursalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <Separator />
          {/* Key Terms */}
          <div className="space-y-2">
            <h3 className="font-semibold text-base">{d.key_terms.en}{language !== 'en' && <span className="block text-sm font-normal text-muted-foreground">{d.key_terms.regional}</span>}</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>{d.term1.en}{language !== 'en' && <span className="block text-xs text-muted-foreground">{d.term1.regional}</span>}</li>
              <li>{d.term2.en}{language !== 'en' && <span className="block text-xs text-muted-foreground">{d.term2.regional}</span>}</li>
              <li>{d.term3.en}{language !== 'en' && <span className="block text-xs text-muted-foreground">{d.term3.regional}</span>}</li>
            </ul>
          </div>
           <Separator />
           {/* Lender Disclosure */}
          <div className="p-2 bg-muted/50 rounded-md text-xs text-muted-foreground">
            <p>{d.lender_disclosure1.en}{language !== 'en' && <span className="block">{d.lender_disclosure1.regional}</span>}</p>
            <p>{d.lender_disclosure2.en}{language !== 'en' && <span className="block">{d.lender_disclosure2.regional}</span>}</p>
            <p className="mt-1">{d.lender_disclosure3.en}: grievance@fairfinance.com{language !== 'en' && <span className="block">{d.lender_disclosure3.regional}: grievance@fairfinance.com</span>}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Button variant="outline" size="lg" onClick={handleDecline}>
            {d.decline_button.en}
            {language !== 'en' && ` / ${d.decline_button.regional}`}
        </Button>
        <Button size="lg" onClick={handleAccept}>
          {d.accept_button.en}
          {language !== 'en' && ` / ${d.accept_button.regional}`}
        </Button>
      </div>
    </div>
  );
}


const bankDetailsSchema = z.object({
    accountNumber: z.string().min(9, "Invalid account number").max(18, "Invalid account number"),
    ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format.").length(11, "IFSC code must be 11 characters."),
});

type BankInfo = {
  bankName: string;
  branch: string;
  address: string;
  city: string;
  state: string;
};

// Simulated IFSC lookup service
const getBankDetailsFromIFSC = (ifsc: string): Promise<BankInfo | null> => {
    const mockDb: Record<string, BankInfo> = {
        "SBIN0001234": { bankName: "State Bank of India", branch: "Parliament Street", address: "11, Parliament Street", city: "New Delhi", state: "Delhi" },
        "HDFC0000060": { bankName: "HDFC Bank", branch: "Sandoz House", address: "Dr. Annie Besant Road, Worli", city: "Mumbai", state: "Maharashtra" },
        "ICIC0000104": { bankName: "ICICI Bank", branch: "Bandra West", address: "123, Linking Road, Bandra (W)", city: "Mumbai", state: "Maharashtra" },
        "UTIB0000009": { bankName: "Axis Bank", branch: "Jubilee Hills", address: "Plot No. 123, Road No. 36, Jubilee Hills", city: "Hyderabad", state: "Telangana" },
        "PUNB0024400": { bankName: "Punjab National Bank", branch: "Sector 17, Chandigarh", address: "SCO 45-47, Sector 17-C", city: "Chandigarh", state: "Chandigarh" },
    };

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockDb[ifsc.toUpperCase()] || null);
        }, 1000);
    });
};
  
export function BankDetailsStep({ onCompleted }: StepProps) {
    const { application, setApplication } = useLoanApplication();
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const [ifsc, setIfsc] = useState("");
    const [bankInfo, setBankInfo] = useState<BankInfo | null>(null);
    const [isFetchingBank, setIsFetchingBank] = useState(false);
  
    const form = useForm<z.infer<typeof bankDetailsSchema>>({
      resolver: zodResolver(bankDetailsSchema),
      defaultValues: {
        accountNumber: "",
        ifsc: "",
      },
    });

    useEffect(() => {
      const currentIfsc = form.getValues("ifsc").toUpperCase();
      if (currentIfsc.length === 11) {
          setIsFetchingBank(true);
          setBankInfo(null);
          getBankDetailsFromIFSC(currentIfsc).then(info => {
              setIsFetchingBank(false);
              if (info) {
                  setBankInfo(info);
                  form.clearErrors("ifsc");
              } else {
                  form.setError("ifsc", { type: "custom", message: "IFSC code not found." });
              }
          });
      } else {
          setBankInfo(null);
      }
    }, [ifsc, form]);
  
    function onSubmit(values: z.infer<typeof bankDetailsSchema>) {
      if (!bankInfo) {
          toast({ variant: "destructive", title: "Invalid IFSC", description: "Please enter a valid IFSC code to fetch bank details."});
          return;
      }
      startTransition(() => {
        // Penny Drop verification
        setTimeout(() => {
          setApplication(prev => ({ ...prev, bankDetails: { ...values, ...bankInfo, isVerified: true } }));
          toast({
            title: "Bank Account Verified",
            description: "We've successfully deposited ₹1 in your account.",
          });
          onCompleted();
        }, 2000);
      });
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Alert>
                <Landmark className="h-4 w-4" />
                <AlertTitle>Bank Account Verification</AlertTitle>
                <AlertDescription>
                    Please provide the account where you'd like to receive the loan amount. We'll verify it by depositing ₹1.
                </AlertDescription>
            </Alert>
          <FormField control={form.control} name="accountNumber" render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Account Number</FormLabel>
              <FormControl><Input placeholder="1234567890" {...field} value={field.value ?? ''} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="ifsc" render={({ field }) => (
            <FormItem>
              <FormLabel>IFSC Code</FormLabel>
              <FormControl>
                <Input 
                  placeholder="SBIN0001234" 
                  {...field} 
                  value={field.value ?? ''}
                  onChange={(e) => {
                      field.onChange(e);
                      setIfsc(e.target.value);
                  }}
                  className="uppercase" 
                  maxLength={11}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {isFetchingBank && (
              <div className="flex items-center text-sm text-muted-foreground p-2">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Fetching bank details...
              </div>
          )}

          {bankInfo && (
              <Card className="bg-muted/50">
                  <CardHeader className="p-4">
                      <CardTitle className="text-base">Bank Details</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-sm space-y-1">
                      <p><span className="font-semibold">Bank:</span> {bankInfo.bankName}</p>
                      <p><span className="font-semibold">Branch:</span> {bankInfo.branch}</p>
                      <p><span className="font-semibold">City:</span> {bankInfo.city}</p>
                  </CardContent>
              </Card>
          )}

          <Button type="submit" disabled={isPending || isFetchingBank} className="w-full">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Verifying..." : "Verify Account"}
          </Button>
        </form>
      </Form>
    );
}

export function EMandateStep({ onCompleted }: StepProps) {
    const { application, setApplication } = useLoanApplication();
    const { toast } = useToast();
    const { dict, language } = useLanguage();
    const d = dict.e_mandate;
    const [view, setView] = useState<'setup' | 'unable'>('setup');
    const [isPending, startTransition] = useTransition();

    if (!application.bankDetails || !application.selected_emi_amount) {
        return <p>e-Mandate details cannot be displayed. Please complete previous steps.</p>;
    }

    const handleMandate = () => {
        startTransition(() => {
            // eNACH/eMandate registration simulation
            setTimeout(() => {
                setApplication(prev => ({ ...prev, eMandate: { isRegistered: true, mandateStatus: 'ACTIVE' } }));
                toast({
                    title: d.success_title.en,
                    description: language === 'en' ? d.success_description.en : d.success_description.regional,
                });
                onCompleted();
            }, 2500);
        });
    };
    
    const handleUnableToSetup = () => {
        setView('unable');
        setApplication(prev => ({ 
            ...prev, 
            eMandate: { isRegistered: false, mandateStatus: 'FAILED' },
            application_status: 'APPROVED_ASSISTED_COMPLETION_REQUIRED',
        }));
    };

    if (view === 'unable') {
        return (
            <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
                <Info className="h-16 w-16 text-primary" />
                <h3 className="text-2xl font-headline font-bold">
                    {d.unable_title.en}
                    {language !== 'en' && <span className="block text-xl font-normal text-muted-foreground mt-1">{d.unable_title.regional}</span>}
                </h3>
                <p className="text-muted-foreground max-w-md whitespace-pre-wrap">
                    {d.unable_description.en.replace('<Application ID>', "15")}
                    {language !== 'en' && <span className="block text-sm text-muted-foreground mt-1">{d.unable_description.regional.replace('<Application ID>', "15")}</span>}
                </p>
                <div className="space-y-2 text-left w-full max-w-sm rounded-lg border p-4 bg-muted/50">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{d.app_id.en}:</span>
                      <span className="font-mono font-bold">15</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{d.sanctioned_amount.en}:</span>
                        <span className="font-bold">₹{application.approved_amount?.toLocaleString('en-IN')}</span>
                    </div>
                </div>
                 <p className="text-sm text-muted-foreground pt-4">
                    {d.support_contact.en}
                    {language !== 'en' && <span className="block text-xs text-muted-foreground mt-1">{d.support_contact.regional}</span>}
                </p>
            </div>
        );
    }
    
    const { bankDetails, selected_emi_amount, firstEmiDate } = application;

    return (
        <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
            <ShieldCheck className="h-16 w-16 text-primary"/>
            <h3 className="text-2xl font-headline font-bold">
                {d.title.en}
                {language !== 'en' && <span className="block text-xl font-normal text-muted-foreground mt-1">{d.title.regional}</span>}
            </h3>
            <p className="text-muted-foreground max-w-md">
                {d.description.en}
                {language !== 'en' && <span className="block text-sm text-muted-foreground mt-1">{d.description.regional}</span>}
            </p>
            
            <Card className="text-left w-full max-w-sm">
                <CardHeader>
                    <CardTitle>
                        {d.mandate_details_title.en}
                        {language !== 'en' && <span className="block text-lg font-normal text-muted-foreground mt-1">{d.mandate_details_title.regional}</span>}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{d.account_label.en}</span>
                        <span className="font-mono">XXXX...{bankDetails.accountNumber.slice(-4)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{d.emi_amount_label.en}</span>
                        <span className="font-bold">₹{selected_emi_amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{d.frequency_label.en}</span>
                        <span>Monthly</span>
                    </div>
                    {firstEmiDate && <div className="flex justify-between">
                        <span className="text-muted-foreground">{d.start_date_label.en}</span>
                        <span>{format(new Date(firstEmiDate), 'dd MMM yyyy')}</span>
                    </div>}
                </CardContent>
            </Card>

            <Button onClick={handleMandate} disabled={isPending} size="lg" className="w-full max-w-sm">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? d.setup_button_pending.en : d.setup_button.en}
                {language !== 'en' && !isPending && ` / ${d.setup_button.regional}`}
            </Button>
            <Button variant="link" onClick={handleUnableToSetup} className="text-muted-foreground">
                {d.unable_button.en}
                {language !== 'en' && ` / ${d.unable_button.regional}`}
            </Button>
        </div>
    );
}

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

export function AgreementStep({ onCompleted }: StepProps) {
  const { setApplication, application } = useLoanApplication();
  const [isSigning, startTransition] = useTransition();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { toast } = useToast();
  const { dict, language } = useLanguage();
  const d = dict.agreement;

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const handleSendOtp = () => {
    startTransition(() => {
      setTimeout(() => {
        setIsOtpSent(true);
        toast({ title: "OTP Sent", description: "Enter 123456 to sign." });
      }, 1000);
    });
  };

  const handleVerifyOtp = (values: z.infer<typeof otpSchema>) => {
    startTransition(() => {
      setTimeout(() => {
        if (values.otp === '123456') {
          setApplication(prev => ({
            ...prev,
            application_status: 'DISBURSEMENT_PENDING_CONFIRMATION',
            agreement: {
              isSigned: true,
              agreementUrl: '/simulated/agreement.pdf',
              signedAt: new Date(),
            }
          }));
          toast({ title: "Agreement Signed Successfully" });
          onCompleted();
        } else {
          toast({ variant: "destructive", title: "Invalid OTP" });
          form.setError("otp", { message: "Invalid OTP" });
        }
      }, 1500);
    });
  };

  const {
    personalDetails,
    loanApplicationId,
    approved_amount,
    selected_tenure_months,
    selected_emi_amount,
    firstEmiDate
  } = application;

  if (!personalDetails || !approved_amount || !selected_tenure_months || !selected_emi_amount || !firstEmiDate) {
    return <p>Agreement details are not available. Please complete previous steps.</p>;
  }

  const processingFee = approved_amount * 0.02;
  const gst = processingFee * 0.18;
  const netDisbursalAmount = approved_amount - processingFee - gst;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {d.title.en}
            {language !== 'en' && <span className="block text-xl font-normal text-muted-foreground mt-1">{d.title.regional}</span>}
          </CardTitle>
          <CardDescription>
            {d.description.en}
            {language !== 'en' && <span className="block text-sm text-muted-foreground mt-1">{d.description.regional}</span>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80 w-full rounded-md border p-4 text-sm">
            <div className="space-y-6">
               {/* Borrower Details */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base">{d.borrower_details.en}</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
                  <span>{d.borrower_name.en}</span><span className="text-right font-medium text-foreground">{personalDetails.fullName}</span>
                  <span>{d.app_id.en}</span><span className="text-right font-bold text-foreground font-mono">15</span>
                  <span>{d.pan.en}</span><span className="text-right font-medium text-foreground">XXXXXX{personalDetails.pan.slice(-4)}</span>
                </div>
              </div>

               {/* Loan Details */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base">{d.loan_details.en}</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
                  <span>{d.sanctioned_amount.en}</span><span className="text-right font-medium text-foreground">₹{approved_amount.toLocaleString('en-IN')}</span>
                  <span>{d.tenure.en}</span><span className="text-right font-medium text-foreground">{selected_tenure_months} Months</span>
                  <span>{d.interest_rate.en}</span><span className="text-right font-medium text-foreground">10.00% p.a.</span>
                </div>
              </div>
              
              {/* Fees & Charges */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base">{d.fees_disbursal.en}</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
                  <span>{d.processing_fee.en}</span><span className="text-right font-medium text-foreground">- ₹{processingFee.toLocaleString('en-IN')}</span>
                  <span>{d.gst.en}</span><span className="text-right font-medium text-foreground">- ₹{gst.toLocaleString('en-IN')}</span>
                  <Separator className="col-span-2 my-1" />
                  <span className="font-bold">{d.net_disbursal.en}</span><span className="text-right font-bold text-foreground">₹{netDisbursalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
              
                {/* Repayment Terms */}
              <div className="space-y-2">
                <h3 className="font-semibold text-base">{d.repayment_terms.en}</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
                  <span>{d.emi_amount.en}</span><span className="text-right font-medium text-foreground">₹{selected_emi_amount.toLocaleString('en-IN')}</span>
                  <span>{d.emi_start_date.en}</span><span className="text-right font-medium text-foreground">{format(new Date(firstEmiDate), 'dd-MMM-yyyy')}</span>
                   <span>{d.repayment_mode.en}</span><span className="text-right font-medium text-foreground">e-Mandate / Auto-Debit</span>
                </div>
              </div>
              
                {/* Legal & Regulatory */}
              <div className="space-y-2">
                 <h3 className="font-semibold text-base">{d.legal_disclosure.en}</h3>
                 <p className="text-xs text-muted-foreground">
                    {d.lender_disclosure1.en}<br/>
                    {d.lender_disclosure2.en}<br/>
                    {d.lender_disclosure3.en}: grievance@fairfinance.com<br/>
                    Governing Law: India
                 </p>
              </div>

               {/* Declaration */}
              <div className="space-y-2 pt-4">
                 <h3 className="font-semibold text-base">{d.declaration_title.en}</h3>
                 <p className="text-xs text-muted-foreground">
                    {d.declaration_content.en}
                 </p>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      {!isOtpSent ? (
        <Button onClick={handleSendOtp} disabled={isSigning} className="w-full">
          {isSigning ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <FileCheck2 className="mr-2 h-4 w-4" />}
          {d.sign_button.en}
          {language !== 'en' && ` / ${d.sign_button.regional}`}
        </Button>
      ) : (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleVerifyOtp)} className="space-y-4 p-4 border rounded-lg">
                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem>
                            <BilingualLabel en={d.otp_label.en} regional={d.otp_label.regional} />
                            <FormControl>
                                <Input {...field} placeholder={language === 'en' ? d.otp_placeholder.en : `${d.otp_placeholder.en} / ${d.otp_placeholder.regional}`} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
              <Button type="submit" disabled={isSigning} className="w-full">
                {isSigning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {d.verify_button.en}
                {language !== 'en' && ` / ${d.verify_button.regional}`}
              </Button>
            </form>
        </Form>
      )}
    </div>
  );
}

export function DisbursementStep({ onCompleted: _ }: StepProps) {
    const { application, setApplication } = useLoanApplication();
    const [view, setView] = useState<'confirmation' | 'processing' | 'assisted'>(application.isDisbursed ? 'processing' : 'confirmation');
    const [isDisbursing, setIsDisbursing] = useState(application.isDisbursed || false);
    const { toast } = useToast();
    const { dict, language } = useLanguage();
    const d = dict.disbursement;

    const approved_amount = application.approved_amount || 0;
    const processingFee = approved_amount * 0.02;
    const gst = processingFee * 0.18;
    const netDisbursalAmount = approved_amount - processingFee - gst;

    const handleConfirm = () => {
        setIsDisbursing(true);
        setView('processing');
        setApplication(prev => ({ ...prev, application_status: 'DISBURSEMENT_IN_PROGRESS' }));

        // Simulate disbursement process
        setTimeout(() => {
            setApplication(prev => ({ ...prev, isDisbursed: true, application_status: 'DISBURSED' }));
            toast({ title: "Loan Disbursed!", description: "The amount has been sent to your bank account." });
        }, 3000);
    };

    const handleNotReady = () => {
        setView('assisted');
        setApplication(prev => ({ ...prev, application_status: 'APPROVED_ASSISTED_COMPLETION_REQUIRED' }));
    };

    if (view === 'assisted') {
        return (
             <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
                <Info className="h-16 w-16 text-primary"/>
                <h3 className="text-2xl font-headline font-bold">{d.assisted_title.en}</h3>
                <p className="text-muted-foreground max-w-md whitespace-pre-wrap">
                    {d.assisted_description.en}
                </p>
                 <div className="space-y-2 text-left w-full max-w-sm rounded-lg border p-4 bg-muted/50">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">{d.app_id_label.en}:</span>
                        <span className="font-mono font-bold">15</span>
                    </div>
                </div>
            </div>
        )
    }

    if (isDisbursing) {
        return (
            <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
                {application.isDisbursed ? (
                    <>
                        <CheckCircle className="h-20 w-20 text-green-500" />
                        <h3 className="text-3xl font-headline font-bold">{d.success_title.en}</h3>
                        <p className="text-xl font-semibold text-muted-foreground">{d.credited_soon_message.en}</p>
                    </>
                ) : (
                    <>
                        <Loader2 className="h-20 w-20 animate-spin text-primary" />
                        <h3 className="text-3xl font-headline font-bold">{d.processing_button.en}</h3>
                        <p className="text-xl font-semibold text-muted-foreground">{d.processing_message.en}</p>
                    </>
                )}
                 <div className="space-y-2 text-left w-full max-w-sm rounded-lg border p-4 bg-muted/50 mb-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Application ID:</span>
                        <span className="font-mono font-bold">15</span>
                    </div>
                </div>
                 <Card className="text-left w-full max-w-sm">
                    <CardHeader><CardTitle>{d.details_title.en}</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between"><span className="text-muted-foreground">{d.amount_label.en}</span><span className="font-bold">₹{netDisbursalAmount.toLocaleString('en-IN')}</span></div>
                         <div className="flex justify-between"><span className="text-muted-foreground">{d.account_label.en}</span><span className="font-bold">...{application.bankDetails?.accountNumber.slice(-4)}</span></div>
                    </CardContent>
                </Card>
                 <Button asChild className="mt-6"><Link href="/application">{d.back_to_dashboard_button.en}</Link></Button>
            </div>
        );
    }
    
    return (
       <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
            <Wallet className="h-16 w-16 text-primary"/>
            <h3 className="text-2xl font-headline font-bold">{d.ready_title.en}</h3>
            <p className="text-muted-foreground max-w-md">{d.ready_description.en}</p>
            
             <Card className="text-left w-full max-w-sm">
                <CardHeader><CardTitle>{d.final_disbursement_title.en}</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">{d.net_amount_label.en}</span>
                        <span className="font-bold">₹{netDisbursalAmount.toLocaleString('en-IN')}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">{d.to_account_label.en}</span>
                        <span className="font-bold">...{application.bankDetails?.accountNumber.slice(-4)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-muted-foreground">{d.timeline_label.en}</span>
                        <Badge variant="outline"><Clock className="mr-2 h-4 w-4"/>{d.timeline_value.en}</Badge>
                    </div>
                </CardContent>
            </Card>

            <div className="w-full max-w-sm space-y-2">
                <Button onClick={handleConfirm} size="lg" className="w-full">
                    {d.confirm_disbursement_button.en}
                </Button>
                 <Button variant="ghost" onClick={handleNotReady} className="w-full text-muted-foreground">
                    {d.not_ready_button.en}
                </Button>
            </div>
        </div>
    )
}
