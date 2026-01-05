

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
import { useState, useTransition, useEffect, useMemo } from "react";
import { Loader2, FileCheck2, UserCheck, Landmark, Banknote, ShieldCheck, CheckCircle, Verified, Wallet, FileText, BadgeCheck, AlertCircle } from "lucide-react";
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
import type { TenureOption, PaymentScheduleItem } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DobPicker } from "@/components/ui/dob-picker";
import { addMonths, format, startOfMonth } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


interface StepProps {
  onCompleted: () => void;
}

const personalDetailsSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format."),
  birthDate: z.date({ required_error: "A date of birth is required." }),
  loanAmount: z.coerce.number().min(10000, "Loan amount must be at least ₹10,000.").max(200000, "Maximum loan amount is ₹2,00,000."),
  employmentType: z.string({ required_error: "Please select an employment type." }),
  monthlyIncome: z.coerce.number().min(10000, "Monthly income must be at least ₹10,000."),
  addressLine1: z.string().min(5, "Address is too short."),
  city: z.string().min(2, "City is too short."),
  pincode: z.string().regex(/^\d{6}$/, "Invalid pincode."),
  consent: z.literal(true, { errorMap: () => ({ message: "You must accept the terms and conditions." }) }),
});

export function PersonalDetailsStep({ onCompleted }: StepProps) {
  const { application, setApplication } = useLoanApplication();
  const { user } = useUser();
  const firestore = useFirestore();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof personalDetailsSchema>>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      fullName: "",
      pan: "",
      birthDate: undefined,
      loanAmount: undefined,
      employmentType: "",
      monthlyIncome: undefined,
      addressLine1: "",
      city: "",
pincode: "",
      consent: false
    },
  });

  function onSubmit(values: z.infer<typeof personalDetailsSchema>) {
    if (!user) {
      toast({ variant: "destructive", title: "You are not logged in." });
      return;
    }
    
    startTransition(() => {
      setApplication(prev => ({ ...prev, personalDetails: values, requested_amount: values.loanAmount }));
      
      const borrowerRef = doc(firestore, 'borrowers', user.uid);
      const loanAppCollection = collection(firestore, 'borrowers', user.uid, 'loan_applications');
      const loanAppRef = doc(loanAppCollection);

      const borrowerData = {
        fullName: values.fullName,
        pan: values.pan,
        dateOfBirth: values.birthDate,
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
        id: loanAppRef.id,
        borrowerId: user.uid,
        requested_amount: values.loanAmount,
        requested_tenure_months: 12, // Defaulting tenure, can be changed
        product_type: 'PERSONAL_LOAN',
        application_status: 'DRAFT',
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      };
      setDocumentNonBlocking(loanAppRef, loanAppData, {});
      
      setApplication(prev => ({ ...prev, loanApplicationId: loanAppRef.id }));

      toast({
        title: "Details Saved",
        description: "Your personal and loan details have been saved.",
      });
      onCompleted();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField control={form.control} name="fullName" render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name (as per PAN)</FormLabel>
              <FormControl><Input placeholder="John Doe" {...field} value={field.value ?? ''} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="pan" render={({ field }) => (
            <FormItem>
              <FormLabel>PAN Number</FormLabel>
              <FormControl><Input placeholder="ABCDE1234F" {...field} value={field.value ?? ''} className="uppercase" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                    <DobPicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField control={form.control} name="employmentType" render={({ field }) => (
            <FormItem>
              <FormLabel>Employment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="Select your employment type" /></SelectTrigger>
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
              <FormLabel>Monthly Net Income (₹)</FormLabel>
              <FormControl><Input type="number" placeholder="40000" {...field} value={field.value ?? ''} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="loanAmount" render={({ field }) => (
            <FormItem>
              <FormLabel>Loan Amount Required (₹)</FormLabel>
              <FormControl><Input type="number" placeholder="100000" {...field} value={field.value ?? ''} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-sm font-medium">Current Address</h3>
            <FormField control={form.control} name="addressLine1" render={({ field }) => (
              <FormItem><FormControl><Input placeholder="Address Line" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem><FormControl><Input placeholder="City" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="pincode" render={({ field }) => (
                <FormItem><FormControl><Input placeholder="Pincode" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
          </div>
        </div>
        <FormField control={form.control} name="consent" render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Explicit Consent</FormLabel>
              <FormDescription>I hereby consent to LoanSwift fetching my credit information and other details for the purpose of this loan application.</FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )} />
        <Button type="submit" disabled={isPending} className="w-full md:w-auto">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Saving..." : "Save and Continue"}
        </Button>
      </form>
    </Form>
  );
}


const panSchema = z.object({
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format."),
  fullName: z.string().min(2, "Full name is required."),
});

const aadhaarSchema = z.object({
  aadhaar: z.string().regex(/^\d{12}$/, "Invalid Aadhaar number."),
});

export function KycStep({ onCompleted }: StepProps) {
  const { application, setApplication } = useLoanApplication();
  const { user } = useUser();
  const firestore = useFirestore();
  const [isPanVerified, setIsPanVerified] = useState(application.kyc?.panStatus === 'VERIFIED');
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(application.kyc?.aadhaarAuthStatus === 'OTP_SUCCESS');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifying, startTransition] = useTransition();
  const { toast } = useToast();

  const panForm = useForm<z.infer<typeof panSchema>>({
    resolver: zodResolver(panSchema),
    defaultValues: { pan: application.personalDetails?.pan || "", fullName: application.personalDetails?.fullName || "" },
  });

  const aadhaarForm = useForm<z.infer<typeof aadhaarSchema>>({
    resolver: zodResolver(aadhaarSchema),
    defaultValues: { aadhaar: "" },
  });

  async function onPanSubmit(values: z.infer<typeof panSchema>) {
    if (!user || !application.loanApplicationId) return;
    startTransition(() => {
      setTimeout(() => {
        setIsPanVerified(true);
        const kycUpdate = { ...application.kyc, panStatus: 'VERIFIED' };
        setApplication(prev => ({ ...prev, kyc: kycUpdate }));
        
        const kycRef = doc(firestore, 'borrowers', user.uid, 'kyc_records', application.loanApplicationId);
        const kycData = { borrowerId: user.uid, panStatus: 'VERIFIED', kycCompleted: false, applicationId: application.loanApplicationId };
        setDocumentNonBlocking(kycRef, kycData, { merge: true });
        
        const auditData = { 
            entityType: 'KYC', entityId: kycRef.id, action: 'PAN_VERIFIED_MOCK', 
            actorType: 'SYSTEM', timestamp: serverTimestamp(), borrowerId: user.uid
        };
        addDocumentNonBlocking(collection(firestore, 'borrowers', user.uid, 'audit_logs'), auditData);
        
        toast({ title: "PAN Verified Successfully" });
      }, 1500);
    });
  }

  function onAadhaarSubmit(values: z.infer<typeof aadhaarSchema>) {
    startTransition(() => {
      setTimeout(() => {
        setIsOtpSent(true);
        toast({ title: "OTP Sent", description: "Mock OTP sent to your Aadhaar-linked mobile (use 123456)." });
      }, 1000);
    });
  }

  async function onOtpSubmit(e: React.MouseEvent<HTMLButtonElement>) {
     e.preventDefault();
    if (!user || !application.loanApplicationId) return;
    startTransition(() => {
        setTimeout(async () => {
            if (otp === "123456") {
                setIsAadhaarVerified(true);
                const maskedAadhaar = `XXXX-XXXX-${aadhaarForm.getValues("aadhaar").slice(-4)}`;
                const kycUpdate = { ...application.kyc, aadhaarAuthStatus: 'OTP_SUCCESS', aadhaarMaskedNumber: maskedAadhaar };
                setApplication(prev => ({ ...prev, kyc: kycUpdate }));

                const kycRef = doc(firestore, 'borrowers', user.uid, 'kyc_records', application.loanApplicationId);
                const kycData = { aadhaarAuthStatus: 'OTP_SUCCESS', aadhaarMaskedNumber: maskedAadhaar, borrowerId: user.uid };
                updateDocumentNonBlocking(kycRef, kycData);

                const auditData = { 
                    entityType: 'KYC', entityId: kycRef.id, action: 'AADHAAR_OTP_AUTH_SUCCESS_MOCK', 
                    actorType: 'SYSTEM', timestamp: serverTimestamp(), borrowerId: user.uid
                };
                addDocumentNonBlocking(collection(firestore, 'borrowers', user.uid, 'audit_logs'), auditData);
                
                toast({ title: "Aadhaar Verified" });
            } else {
                toast({ variant: "destructive", title: "Invalid OTP" });
            }
        }, 1500);
    });
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>1. PAN Verification (Mock)</CardTitle>
        </CardHeader>
        <CardContent>
          {isPanVerified ? (
            <Alert variant="default" className="bg-green-50 border-green-200">
                <Verified className="h-4 w-4 !text-green-600" />
                <AlertTitle className="text-green-800">PAN Verified</AlertTitle>
                <AlertDescription className="text-green-700">
                    Your PAN has been successfully verified against mock NSDL records.
                </AlertDescription>
            </Alert>
          ) : (
            <Form {...panForm}>
              <form onSubmit={panForm.handleSubmit(onPanSubmit)} className="space-y-4">
                <FormField control={panForm.control} name="pan" render={({ field }) => (
                  <FormItem><FormLabel>PAN</FormLabel><FormControl><Input {...field} className="uppercase" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={panForm.control} name="fullName" render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={isVerifying}>
                  {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify PAN
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>2. Aadhaar e-KYC (Mock)</CardTitle>
        </CardHeader>
        <CardContent>
          {!isPanVerified ? (
            <p className="text-sm text-muted-foreground">Please complete PAN verification first.</p>
          ) : isAadhaarVerified ? (
            <Alert variant="default" className="bg-green-50 border-green-200">
                <UserCheck className="h-4 w-4 !text-green-600" />
                <AlertTitle className="text-green-800">Aadhaar Verified</AlertTitle>
                <AlertDescription className="text-green-700">
                    Your Aadhaar e-KYC is complete.
                </AlertDescription>
            </Alert>
          ) : (
            <Form {...aadhaarForm}>
              <form onSubmit={aadhaarForm.handleSubmit(onAadhaarSubmit)} className="space-y-4">
                <FormField control={aadhaarForm.control} name="aadhaar" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aadhaar Number</FormLabel>
                    <FormControl><Input placeholder="1234 5678 9012" {...field} disabled={isOtpSent} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                {!isOtpSent ? (
                  <Button type="submit" disabled={isVerifying}>
                    {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send OTP
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Label>Enter OTP</Label>
                    <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" />
                    <Button type="button" onClick={onOtpSubmit} disabled={isVerifying}>
                      {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Verify OTP
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          )}
        </CardContent>
      </Card>

      {(isPanVerified && isAadhaarVerified) && (
        <Button onClick={onCompleted} className="w-full md:w-auto">
          Continue to DigiLocker KYC
        </Button>
      )}
    </div>
  );
}

const availableDocs = [
    { id: 'AADHAAR_XML', label: 'Aadhaar XML / e-KYC' },
    { id: 'DRIVING_LICENSE', label: 'Driving License' },
    { id: 'PAN_CARD', label: 'PAN Card (e-PAN)' },
    { id: 'PASSPORT', label: 'Passport' },
    { id: 'VOTER_ID', label: 'Voter ID' },
    { id: 'UTILITY_BILL', label: 'Utility Bill (e.g., Electricity)' },
    { id: 'BANK_STATEMENT', label: 'Bank Statement (last 3 months)' },
];

const digilockerSchema = z.object({
  selectedDocs: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one document.",
  })
});

export function DigiLockerStep({ onCompleted }: StepProps) {
  const { application, setApplication } = useLoanApplication();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifying, startTransition] = useTransition();
  const [digilockerStatus, setDigilockerStatus] = useState(application.kyc?.digilockerStatus);
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof digilockerSchema>>({
    resolver: zodResolver(digilockerSchema),
    defaultValues: { selectedDocs: [] },
  });

  const onSubmit = (data: z.infer<typeof digilockerSchema>) => {
    startTransition(async () => {
        if (!user || !application.loanApplicationId) return;

        setIsModalOpen(false);
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const mockDocuments = data.selectedDocs.map(docId => {
            const docInfo = availableDocs.find(d => d.id === docId);
            return {
                doc_type: docId,
                doc_name: docInfo?.label || "Unknown Document",
                verification_status: "VERIFIED",
                ...(docId === 'DRIVING_LICENSE' && { expiry_date: "2030-12-31" })
            };
        });

        // Mock address verification
        const aadhaarInDocs = mockDocuments.some(d => d.doc_type === 'AADHAAR_XML');
        const addressVerified = aadhaarInDocs && application.personalDetails?.pincode;

        const kycCompleted = application.kyc?.panStatus === 'VERIFIED' && application.kyc?.aadhaarAuthStatus === 'OTP_SUCCESS' && !!addressVerified;

        const kycUpdate = {
            ...application.kyc,
            digilockerStatus: 'SUCCESS',
            digilockerDocuments: mockDocuments,
            addressVerified: !!addressVerified,
            kycCompleted: kycCompleted
        };
        
        setApplication(prev => ({ ...prev, kyc: kycUpdate, kyc_completed: kycCompleted }));
        
        const kycDocRef = doc(firestore, 'borrowers', user.uid, 'kyc_records', application.loanApplicationId);
        
        const kycData = {
            digilockerStatus: 'SUCCESS',
            digilockerDocuments: mockDocuments,
            addressVerified: !!addressVerified,
            kycCompleted: kycCompleted,
            borrowerId: user.uid
        };

        updateDocumentNonBlocking(kycDocRef, kycData);

        const auditData = {
            entityType: 'KYC', entityId: kycDocRef.id, action: 'DIGILOCKER_KYC_SUCCESS_MOCK',
            actorType: 'SYSTEM', timestamp: serverTimestamp(), borrowerId: user.uid
        };
        addDocumentNonBlocking(collection(firestore, 'borrowers', user.uid, 'audit_logs'), auditData);
        setDigilockerStatus('SUCCESS');
        toast({ title: "DigiLocker KYC Successful", description: "Documents have been fetched and verified." });
    });
  }
  
  if (digilockerStatus === 'SUCCESS') {
    const kycCompleted = application.kyc?.kycCompleted;
    return (
        <div className="space-y-6">
             <Alert variant="default" className="bg-green-50 border-green-200">
                <Verified className="h-4 w-4 !text-green-600" />
                <AlertTitle className="text-green-800">DigiLocker Connected</AlertTitle>
                <AlertDescription className="text-green-700">
                    We have successfully fetched your documents from DigiLocker.
                </AlertDescription>
            </Alert>
            <Card>
                <CardHeader><CardTitle>Fetched Documents</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                    {application.kyc?.digilockerDocuments?.map(doc => (
                        <div key={doc.doc_type} className="flex justify-between items-center p-2 border rounded-md">
                            <span>{doc.doc_name}</span>
                            <Badge variant={doc.verification_status === 'VERIFIED' ? 'default' : 'destructive'} className={doc.verification_status === 'VERIFIED' ? 'bg-accent text-accent-foreground' : ''}>
                                {doc.verification_status}
                            </Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>
            {kycCompleted && (
                 <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>KYC Completed!</AlertTitle>
                    <AlertDescription>
                       All your KYC steps including PAN, Aadhaar, and Address verification are complete.
                    </AlertDescription>
                </Alert>
            )}
            <Button onClick={onCompleted} className="w-full">Continue to Credit Check</Button>
        </div>
    )
  }

  return (
    <div className="space-y-6">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share Documents from DigiLocker (Mock)</DialogTitle>
                    <DialogDescription>
                        Select the documents you want to share for KYC verification.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="selectedDocs"
                        render={() => (
                            <FormItem>
                            {availableDocs.map((item) => (
                                <FormField
                                key={item.id}
                                control={form.control}
                                name="selectedDocs"
                                render={({ field }) => {
                                    return (
                                    <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                        <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([...(field.value ?? []), item.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                    (value) => value !== item.id
                                                    )
                                                )
                                            }}
                                        />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        {item.label}
                                        </FormLabel>
                                    </FormItem>
                                    )
                                }}
                                />
                            ))}
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" disabled={isVerifying} className="w-full">
                            {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            Share Selected Documents (Mock)
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

        {isVerifying ? (
            <div className="flex flex-col items-center justify-center space-y-4 p-12 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <h3 className="text-xl font-semibold">Connecting to DigiLocker...</h3>
                <p className="text-muted-foreground">Please wait while we securely connect and fetch your documents.</p>
            </div>
        ) : (
             <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
                <Wallet className="h-16 w-16 text-primary"/>
                <h3 className="text-2xl font-headline font-bold">Connect with DigiLocker</h3>
                <p className="text-muted-foreground max-w-md">
                    To complete your KYC, we need to fetch your official documents (like Aadhaar, PAN) from your DigiLocker account with your consent. This is a secure and RBI-approved method.
                </p>
                <Button onClick={() => setIsModalOpen(true)} size="lg">
                    Connect to DigiLocker (Mock)
                </Button>
            </div>
        )}
    </div>
  );
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
      const mockReport = {
        bureau_name: "CIBIL (Mock)",
        score: Math.floor(Math.random() * (850 - 680 + 1)) + 680,
        total_active_loans: Math.floor(Math.random() * 3) + 1,
        total_overdue_amount: 0,
        max_dpd: 0,
        recent_enquiries_count: Math.floor(Math.random() * 3),
        decision_summary: "ELIGIBLE",
        bureau_raw_mock_json: JSON.stringify({ "tradelines": 5, "inquiries_last_6m": 2, "mockData": true }, null, 2),
      };

      // 2. Perform Automated Underwriting Logic
      const { monthlyIncome, loanAmount } = application.personalDetails!;
      const randomEMILoad = mockReport.total_active_loans * 3000;
      const fixedObligations = 5000;
      const foir = (randomEMILoad + fixedObligations) / monthlyIncome;
      const foirThreshold = 0.55;

      let underwritingDecision: {
          status: 'APPROVED' | 'REJECTED' | 'PENDING_REVIEW';
          reason: string;
          risk_score: 'LOW_RISK' | 'MEDIUM_RISK' | 'HIGH_RISK';
          approved_amount: number | null;
          approved_tenure_options: { tenure_months: number }[] | null;
      };
      
      if (mockReport.score >= 700 && mockReport.total_overdue_amount === 0 && foir <= foirThreshold) {
          underwritingDecision = { 
              status: 'APPROVED', 
              reason: `Strong credit profile (score: ${mockReport.score}) and low FOIR (${(foir * 100).toFixed(2)}%).`,
              risk_score: 'LOW_RISK',
              approved_amount: loanAmount, // Approve requested amount
              approved_tenure_options: [{ tenure_months: 6 }, { tenure_months: 9 }, { tenure_months: 12 }, { tenure_months: 18 }]
          };
      } else if (mockReport.score >= 650) {
          underwritingDecision = { 
            status: 'PENDING_REVIEW', 
            reason: 'Credit score is fair. Requires manual underwriting review.',
            risk_score: 'MEDIUM_RISK',
            approved_amount: null,
            approved_tenure_options: null,
          };
      } else {
          underwritingDecision = { 
            status: 'REJECTED', 
            reason: 'Credit score below minimum threshold.',
            risk_score: 'HIGH_RISK',
            approved_amount: null,
            approved_tenure_options: null,
          };
      }

      // 3. Update application state and Firestore
      const appUpdate = {
        bureauReport: mockReport,
        application_status: underwritingDecision.status,
        internal_risk_score: underwritingDecision.risk_score,
        bureau_score: mockReport.score,
        eligibility_decision_reason: underwritingDecision.reason,
        approved_amount: underwritingDecision.approved_amount,
        approved_tenure_options: underwritingDecision.approved_tenure_options,
      };
      setApplication(prev => ({ ...prev, ...appUpdate }));

      const loanAppRef = doc(firestore, 'borrowers', user.uid, 'loan_applications', application.loanApplicationId);
      
      const loanAppUpdateData = {
        application_status: underwritingDecision.status,
        bureau_score: mockReport.score,
        bureau_decision_summary: mockReport.decision_summary,
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
        action: 'BUREAU_PULL_MOCK',
        actorType: 'SYSTEM',
        timestamp: serverTimestamp(),
        details: { score: mockReport.score },
        borrowerId: user.uid,
      };
      addDocumentNonBlocking(collection(firestore, 'borrowers', user.uid, 'audit_logs'), auditLog1Data);
      
      const auditLog2Data = {
        entityType: 'LOAN_APPLICATION',
        entityId: application.loanApplicationId,
        action: 'UNDERWRITING_DECISION_MOCK',
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
                  Your credit profile has been reviewed. Here is your mock CIBIL score.
              </AlertDescription>
          </Alert>
          <Card>
              <CardHeader>
                  <CardTitle className="text-center">Your Credit Report Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="text-center p-4 rounded-lg bg-muted/50 overflow-hidden relative flex flex-col items-center">
                    <div className={cn("flex items-center justify-center w-40 h-40 rounded-full border-8", 
                        score >= 750 ? "border-green-600" :
                        score >= 700 ? "border-lime-600" :
                        score >= 650 ? "border-yellow-500" : "border-red-500"
                    )}>
                        <div className="text-center">
                            <p className={cn("text-5xl font-bold", getScoreColor())}>{score}</p>
                            <p className="font-semibold">{scoreBand}</p>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">CIBIL Score (Mock) - Decision: {application.bureauReport?.decision_summary}</p>
                </Card>
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
                          <AccordionTrigger>View detailed report (mock)</AccordionTrigger>
                          <AccordionContent>
                              <pre className="text-xs bg-gray-100 p-2 rounded-md overflow-x-auto">
                                  {application.bureauReport?.bureau_raw_mock_json}
                              </pre>
                          </AccordionContent>
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
        Pull My Credit Report (Mock)
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

    const [selectedTenure, setSelectedTenure] = useState<number | null>(null);
    const [calculatedEmi, setCalculatedEmi] = useState<number | null>(null);
    const [paymentSchedulePreview, setPaymentSchedulePreview] = useState<PaymentScheduleItem[]>([]);
    const [consentChecked, setConsentChecked] = useState(false);
    
    const ANNUAL_INTEREST_RATE = 24; // 24% p.a.
    const tenureOptions = application.approved_tenure_options?.map(opt => opt.tenure_months) || [3, 6, 9, 12];

    const calculateEmiAndSchedule = (tenure: number) => {
      if (application.approved_amount) {
        const P = application.approved_amount;
        const r = (ANNUAL_INTEREST_RATE / 12) / 100; // Monthly interest rate
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
      calculateEmiAndSchedule(tenure);
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
              application.approved_amount!,
              ANNUAL_INTEREST_RATE,
              selectedTenure,
              firstEmiDate
            );

            const appUpdate = {
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
                action: 'PAYMENT_SCHEDULE_GENERATED_MOCK',
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
    
    if (application.application_status === 'REJECTED') {
      return (
         <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
              <AlertCircle className="h-16 w-16 text-destructive"/>
              <h3 className="text-2xl font-headline font-bold">Application Not Approved</h3>
              <p className="text-muted-foreground max-w-md">
                  {application.eligibility_decision_reason || 'We are unable to proceed with your loan application at this time.'}
              </p>
              <Button asChild><Link href="/">Back to Home</Link></Button>
          </div>
      );
    }
    
    if (application.application_status !== 'APPROVED' || !application.approved_amount) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 p-12 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h3 className="text-xl font-semibold">Finalizing Eligibility...</h3>
          <p className="text-muted-foreground">This should only take a moment.</p>
        </div>
      );
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <p className="text-muted-foreground">You are eligible for a loan up to</p>
                <h3 className="font-headline text-4xl font-bold text-primary">₹{application.approved_amount.toLocaleString('en-IN')}</h3>
            </div>
            
             <div>
                <Label className="font-semibold">Choose your tenure</Label>
                <p className="text-sm text-muted-foreground mb-4">Select a plan to see your monthly payment.</p>
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
                          <p className="font-bold text-lg">{tenure}</p>
                          <p className="text-sm text-muted-foreground">Months</p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
            </div>


            {selectedTenure && calculatedEmi ? (
                <Card className="bg-muted/50">
                    <CardHeader className="p-4">
                        <CardTitle className="text-center text-lg">Your Selected Plan</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-center">
                        <p className="text-3xl font-bold font-headline">₹{calculatedEmi.toLocaleString('en-IN')} <span className="text-base font-normal text-muted-foreground">/ month</span></p>
                        <p className="text-sm text-muted-foreground">for {selectedTenure} months at {ANNUAL_INTEREST_RATE}% p.a. (mock)</p>
                    </CardContent>
                </Card>
            ) : null}

            {paymentSchedulePreview.length > 0 && (
                <div className="space-y-2">
                    <h4 className="font-semibold">Payment Schedule Preview</h4>
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
                    <Button variant="link" className="p-0 h-auto" onClick={() => toast({ title: "Mock Action", description: "This would show the full payment schedule." })}>
                        View Full Payment Schedule (Mock)
                    </Button>
                </div>
            )}

            <div className="flex items-center space-x-2 rounded-md border p-4 shadow-sm">
                <Checkbox id="terms" checked={consentChecked} onCheckedChange={(checked) => setConsentChecked(checked as boolean)} />
                <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I confirm that I have reviewed and chosen this loan tenure and EMI.
                </label>
            </div>
            
            <Button 
                onClick={handleConfirmAndContinue} 
                className="w-full" 
                disabled={isPending || !selectedTenure || !consentChecked}
                size="lg"
            >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm Tenure & Continue
            </Button>
            {(!selectedTenure || !consentChecked) && (
                 <p className="text-sm text-destructive text-center">Please select a tenure and confirm your choice to proceed.</p>
            )}
        </div>
    );
}


export function KfsStep({ onCompleted }: StepProps) {
  const { application, setApplication } = useLoanApplication();
  const [isKfsOpen, setIsKfsOpen] = useState(false);
  const [kfsViewed, setKfsViewed] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(z.object({ consent: z.literal(true) })),
    defaultValues: { consent: false },
  });

  if (!application.approved_amount || !application.selected_tenure_months || !application.selected_emi_amount) {
    return <p>Loan offer details not found. Please go back and select a tenure.</p>;
  }

  const { approved_amount, selected_tenure_months, selected_emi_amount } = application;
  const processingFee = approved_amount * 0.02; // 2% processing fee
  const disbursedAmount = approved_amount - processingFee;
  const totalInterest = (application.totalInterestPayable) || 0;
  const totalRepayment = (application.totalPaymentDue) || 0;
  const apr = (((totalInterest + processingFee) / approved_amount) / (selected_tenure_months/12)) * 100;

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
            kfs_document_url: '/mock/kfs.pdf',
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
            <DialogTitle className="font-headline text-2xl text-center">Key Facts Statement</DialogTitle>
            <DialogDescription className="text-center">This document summarizes all terms of your loan offer.</DialogDescription>
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
          <CardTitle className="font-headline text-center text-2xl">Your Loan Offer Summary</CardTitle>
          <p className="text-sm text-muted-foreground text-center">Please review and accept your final loan details.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 border rounded-lg bg-muted/50">
            <p className="text-muted-foreground">Loan Amount</p>
            <p className="font-semibold text-right">₹{approved_amount.toLocaleString('en-IN')}</p>
            <p className="text-muted-foreground">Processing Fee (2%)</p>
            <p className="font-semibold text-right">- ₹{processingFee.toLocaleString('en-IN')}</p>
            <Separator className="col-span-2 my-1" />
            <p className="text-muted-foreground font-bold">Net Disbursed Amount</p>
            <p className="font-bold text-right text-lg">₹{disbursedAmount.toLocaleString('en-IN')}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 border rounded-lg">
            <p className="text-muted-foreground">Monthly EMI</p>
            <p className="font-semibold text-right">₹{selected_emi_amount.toLocaleString('en-IN')}</p>
            <p className="text-muted-foreground">Total Repayment</p>
            <p className="font-semibold text-right">₹{Math.round(totalRepayment).toLocaleString('en-IN')}</p>
          </div>
          <Button variant="link" onClick={openKfs} className="p-0 h-auto">View Detailed Key Facts Statement (KFS)</Button>
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
                    I have read and understood the Key Facts Statement and accept the loan offer.
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
            Accept Offer & Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}

const bankDetailsSchema = z.object({
    accountNumber: z.string().min(9, "Invalid account number").max(18, "Invalid account number"),
    ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format."),
});
  
export function BankDetailsStep({ onCompleted }: StepProps) {
    const { application, setApplication } = useLoanApplication();
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
  
    const form = useForm<z.infer<typeof bankDetailsSchema>>({
      resolver: zodResolver(bankDetailsSchema),
      defaultValues: {
        accountNumber: "",
        ifsc: "",
      },
    });
  
    function onSubmit(values: z.infer<typeof bankDetailsSchema>) {
      startTransition(() => {
        // Mock Penny Drop verification
        setTimeout(() => {
          setApplication(prev => ({ ...prev, bankDetails: { ...values, isVerified: true } }));
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
              <FormControl><Input placeholder="SBIN0001234" {...field} value={field.value ?? ''} className="uppercase" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Verifying..." : "Verify Account"}
          </Button>
        </form>
      </Form>
    );
}

export function EMandateStep({ onCompleted }: StepProps) {
    const [isPending, startTransition] = useTransition();
    const { setApplication, application } = useLoanApplication();
    const { toast } = useToast();

    const handleMandate = () => {
        startTransition(() => {
            // Mock eNACH/eMandate registration
            setTimeout(() => {
                setApplication(prev => ({ ...prev, eMandate: { isRegistered: true } }));
                toast({
                  title: "e-Mandate Registered",
                  description: "Auto-debit has been set up for your EMIs.",
                });
                onCompleted();
            }, 2500);
        });
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
            <ShieldCheck className="h-16 w-16 text-primary"/>
            <h3 className="text-2xl font-headline font-bold">e-Mandate for Repayments</h3>
            <p className="text-muted-foreground max-w-md">
                To automate your monthly EMI payments, please set up an e-mandate. This is a secure process handled by your bank.
            </p>
            <p className="font-semibold">
              EMI Amount: ₹{application.selected_emi_amount?.toLocaleString('en-IN')}
            </p>
            <Button onClick={handleMandate} disabled={isPending} size="lg">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Redirecting to bank..." : "Setup e-Mandate"}
            </Button>
        </div>
    );
}

export function AgreementStep({ onCompleted }: StepProps) {
  const { setApplication, application } = useLoanApplication();
  const [isSigning, startTransition] = useTransition();
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { toast } = useToast();

  const handleSendOtp = () => {
    startTransition(() => {
      setTimeout(() => {
        setIsOtpSent(true);
        toast({ title: "OTP Sent (Mock)", description: "Enter 123456 to sign." });
      }, 1000);
    });
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      setTimeout(() => {
        if (otp === '123456') {
          setApplication(prev => ({ 
            ...prev,
            agreement: {
              isSigned: true,
              agreementUrl: '/mock/agreement.pdf',
              signedAt: new Date(),
            }
          }));
          toast({ title: "Agreement Signed Successfully" });
          onCompleted();
        } else {
          toast({ variant: "destructive", title: "Invalid OTP" });
        }
      }, 1500);
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Digital Loan Agreement (e-Sign)</CardTitle>
          <CardDescription>Review the terms and sign the agreement using an Aadhaar-based OTP.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 w-full rounded-md border p-4 text-xs text-muted-foreground">
            <h3 className="font-bold mb-2">Mock Loan Agreement</h3>
            <p className="mb-2">This is a legally binding agreement between you (the Borrower) and LoanSwift Partner NBFC (the Lender)...</p>
            <p>1. Loan Amount: ₹{application.approved_amount?.toLocaleString('en-IN')}</p>
            <p>2. Tenure: {application.selected_tenure_months} months</p>
            <p>3. Repayment: You agree to repay the loan via monthly EMIs of ₹{application.selected_emi_amount?.toLocaleString('en-IN')} as per the e-mandate.</p>
            <p className="mt-4">By signing, you confirm your acceptance of all terms...</p>
          </ScrollArea>
        </CardContent>
      </Card>
      
      {!isOtpSent ? (
        <Button onClick={handleSendOtp} disabled={isSigning} className="w-full">
          {isSigning ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <FileCheck2 className="mr-2 h-4 w-4" />}
          Sign via Aadhaar OTP (Mock)
        </Button>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4 p-4 border rounded-lg">
          <Label htmlFor="otp">Enter OTP sent to your Aadhaar-linked mobile</Label>
          <Input id="otp" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" />
          <Button type="submit" disabled={isSigning} className="w-full">
            {isSigning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify & e-Sign
          </Button>
        </form>
      )}
    </div>
  );
}

export function DisbursementStep({ onCompleted: _ }: StepProps) {
    const { application, setApplication } = useLoanApplication();
    const [isDisbursing, setIsDisbursing] = useState(false);
    const [isDisbursed, setIsDisbursed] = useState(application.isDisbursed);
    const { toast } = useToast();

    const handleDisburse = () => {
        setIsDisbursing(true);
        // Mock disbursement process
        setTimeout(() => {
            setApplication(prev => ({ ...prev, isDisbursed: true, application_status: 'DISBURSED' }));
            setIsDisbursed(true);
            setIsDisbursing(false);
            toast({ title: "Loan Disbursed!", description: "The amount has been sent to your bank account." });
        }, 2000);
    }

    if (isDisbursed) {
         return (
            <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
                <CheckCircle className="h-20 w-20 text-green-500"/>
                <h3 className="text-3xl font-headline font-bold">Congratulations!</h3>
                <p className="text-xl font-semibold text-muted-foreground">
                    Your loan has been disbursed.
                </p>
                <Card className="text-left w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Disbursement Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Amount:</span>
                            <span className="font-bold">₹{(application.approved_amount! - (application.approved_amount! * 0.02)).toLocaleString('en-IN')}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Bank Account:</span>
                            <span className="font-bold">...{application.bankDetails?.accountNumber.slice(-4)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Transaction Ref:</span>
                            <span className="font-bold">TXN123MOCK</span>
                        </div>
                    </CardContent>
                </Card>
                <p className="text-muted-foreground max-w-md">
                    The amount will be credited to your account shortly. Your first EMI is due next month.
                </p>
                <div className="flex gap-4">
                    <Button asChild variant="outline"><Link href="/mock/agreement.pdf" download>Download Agreement</Link></Button>
                    <Button asChild><Link href="/application">Back to Dashboard</Link></Button>
                </div>
            </div>
        );
    }

    return (
       <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
            <Wallet className="h-16 w-16 text-primary"/>
            <h3 className="text-2xl font-headline font-bold">Ready for Disbursement</h3>
            <p className="text-muted-foreground max-w-md">
                All formalities are complete. The net loan amount will be transferred to your verified bank account.
            </p>
             <Card className="text-left w-full max-w-sm">
                <CardHeader><CardTitle>Final Disbursement</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Net Amount:</span>
                        <span className="font-bold">₹{(application.approved_amount! - (application.approved_amount! * 0.02)).toLocaleString('en-IN')}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">To Account:</span>
                        <span className="font-bold">...{application.bankDetails?.accountNumber.slice(-4)}</span>
                    </div>
                </CardContent>
            </Card>
            <Button onClick={handleDisburse} disabled={isDisbursing} size="lg">
                {isDisbursing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isDisbursing ? "Processing..." : "Initiate Disbursement"}
            </Button>
        </div>
    )
}

    

    
