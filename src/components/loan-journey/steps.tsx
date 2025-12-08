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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useTransition, useEffect } from "react";
import { assessCreditRisk } from "@/ai/flows/credit-risk-assessment";
import { getDynamicLoanOffers } from "@/ai/flows/dynamic-loan-offers";
import { Loader2, FileCheck2, UserCheck, Landmark, Banknote, ShieldCheck, CheckCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "../ui/separator";

interface StepProps {
  onCompleted: () => void;
}

const personalDetailsSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format."),
  birthDate: z.date({ required_error: "A date of birth is required." }),
  annualIncome: z.coerce.number().min(100000, "Annual income must be at least ₹1,00,000."),
  loanAmount: z.coerce.number().min(10000, "Loan amount must be at least ₹10,000.").max(5000000, "Maximum loan amount is ₹50,00,000."),
  consent: z.literal(true, { errorMap: () => ({ message: "You must accept the terms and conditions." }) }),
});

export function PersonalDetailsStep({ onCompleted }: StepProps) {
  const { application, setApplication } = useLoanApplication();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof personalDetailsSchema>>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: application.personalDetails || { consent: false },
  });

  function onSubmit(values: z.infer<typeof personalDetailsSchema>) {
    setApplication(prev => ({ ...prev, personalDetails: values }));
    startTransition(() => {
      // Mock PAN verification
      setTimeout(() => {
        toast({
          title: "PAN Verified",
          description: "Your PAN details have been successfully verified.",
        });
        onCompleted();
      }, 1500);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField control={form.control} name="fullName" render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name (as per PAN)</FormLabel>
              <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="pan" render={({ field }) => (
            <FormItem>
              <FormLabel>PAN Number</FormLabel>
              <FormControl><Input placeholder="ABCDE1234F" {...field} className="uppercase" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="birthDate" render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )} />
           <FormField control={form.control} name="annualIncome" render={({ field }) => (
            <FormItem>
              <FormLabel>Annual Income (₹)</FormLabel>
              <FormControl><Input type="number" placeholder="500000" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="loanAmount" render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Loan Amount Required (₹)</FormLabel>
              <FormControl><Input type="number" placeholder="100000" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
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
          {isPending ? "Verifying..." : "Save and Continue"}
        </Button>
      </form>
    </Form>
  );
}


const kycSchema = z.object({
  aadhaar: z.string().regex(/^\d{12}$/, "Invalid Aadhaar number."),
});

export function KycStep({ onCompleted }: StepProps) {
  const { application, setApplication } = useLoanApplication();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(application.kyc?.isVerified || false);
  const [isFetchingDocs, setIsFetchingDocs] = useState(false);
  const [docs, setDocs] = useState<{type:string, name: string, url: string}[]>(application.kyc?.documents || []);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof kycSchema>>({
    resolver: zodResolver(kycSchema),
    defaultValues: { aadhaar: application.kyc?.aadhaar || "" },
  });

  function onAadhaarSubmit(values: z.infer<typeof kycSchema>) {
    setIsVerifying(true);
    // Mock Aadhaar OTP sending
    setTimeout(() => {
      setApplication(prev => ({ ...prev, kyc: { ...prev.kyc!, aadhaar: values.aadhaar } }));
      setIsOtpSent(true);
      setIsVerifying(false);
      toast({ title: "OTP Sent", description: "An OTP has been sent to your Aadhaar-linked mobile number." });
    }, 1000);
  }

  function onOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsVerifying(true);
    // Mock OTP verification
    setTimeout(() => {
      if (otp === "123456") {
        setIsVerified(true);
        setApplication(prev => ({ ...prev, kyc: { ...prev.kyc!, isVerified: true } }));
        toast({ title: "Aadhaar Verified", description: "Your Aadhaar has been successfully verified." });
      } else {
        toast({ variant: "destructive", title: "Invalid OTP", description: "The OTP you entered is incorrect." });
      }
      setIsVerifying(false);
    }, 1500);
  }

  function fetchDigilockerDocs() {
    setIsFetchingDocs(true);
    // Mock DigiLocker document fetch
    setTimeout(() => {
      const fetchedDocs = [
        { type: "PAN Card", name: "pan-card.pdf", url: "#" },
        { type: "Aadhaar Card", name: "aadhaar-card.pdf", url: "#" },
      ];
      setDocs(fetchedDocs);
      setApplication(prev => ({ ...prev, kyc: { ...prev.kyc!, documents: fetchedDocs } }));
      setIsFetchingDocs(false);
      toast({ title: "Documents Fetched", description: "Successfully fetched documents from DigiLocker." });
    }, 2000);
  }

  if (!isVerified) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onAadhaarSubmit)} className="space-y-6">
          <FormField control={form.control} name="aadhaar" render={({ field }) => (
            <FormItem>
              <FormLabel>Aadhaar Number</FormLabel>
              <FormControl>
                <Input placeholder="1234 5678 9012" {...field} disabled={isOtpSent} />
              </FormControl>
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
              <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP (123456)" />
              <Button onClick={onOtpSubmit} disabled={isVerifying}>
                {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify OTP
              </Button>
            </div>
          )}
        </form>
      </Form>
    );
  }

  return (
    <div className="space-y-6">
      <Alert variant="default" className="bg-green-50 border-green-200">
        <UserCheck className="h-4 w-4 !text-green-600" />
        <AlertTitle className="text-green-800">Aadhaar Verified</AlertTitle>
        <AlertDescription className="text-green-700">
          Your Aadhaar verification is complete. You can now fetch your documents from DigiLocker.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>DigiLocker Documents</CardTitle>
          <CardDescription>Fetch your e-documents to complete KYC.</CardDescription>
        </CardHeader>
        <CardContent>
          {docs.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed p-12 text-center">
              <p className="text-muted-foreground">No documents fetched yet.</p>
              <Button onClick={fetchDigilockerDocs} disabled={isFetchingDocs}>
                {isFetchingDocs && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Fetch from DigiLocker
              </Button>
            </div>
          ) : (
            <ul className="space-y-2">
              {docs.map(doc => (
                <li key={doc.name} className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-3">
                    <FileCheck2 className="h-5 w-5 text-primary" />
                    <span>{doc.name}</span>
                  </div>
                  <Button variant="link" asChild><Link href={doc.url}>View</Link></Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      {docs.length > 0 && (
        <Button onClick={onCompleted} className="w-full md:w-auto">
          Continue
        </Button>
      )}
    </div>
  );
}

export function CreditCheckStep({ onCompleted }: StepProps) {
    const { application, setApplication } = useLoanApplication();
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
  
    useEffect(() => {
      startTransition(async () => {
        if (!application.personalDetails) {
          toast({ variant: "destructive", title: "Error", description: "Personal details are missing." });
          return;
        }
        
        try {
          // Mock Credit Bureau fetch and use AI for assessment
          await new Promise(resolve => setTimeout(resolve, 2000));
  
          const assessment = await assessCreditRisk({
            creditScore: Math.floor(Math.random() * (850 - 650 + 1)) + 650, // Mock score between 650-850
            income: application.personalDetails.annualIncome,
            loanAmount: application.personalDetails.loanAmount,
            loanTenure: 36, // Mock tenure
            age: new Date().getFullYear() - application.personalDetails.birthDate.getFullYear(),
            employmentType: 'Salaried' // Mock employment type
          });
          
          setApplication(prev => ({ ...prev, creditAssessment: assessment }));
          toast({ title: "Credit Assessment Complete", description: `Risk level assessed as ${assessment.riskLevel.toLowerCase()}.` });
          onCompleted();
        } catch (error) {
          console.error("Credit assessment failed:", error);
          toast({ variant: "destructive", title: "Error", description: "Failed to perform credit assessment." });
        }
      });
    }, []);
  
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-12 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h3 className="text-xl font-semibold">Performing Credit Assessment</h3>
        <p className="text-muted-foreground">Please wait while we securely fetch your credit report and assess your profile...</p>
      </div>
    );
  }

export function LoanOfferStep({ onCompleted }: StepProps) {
  const { application, setApplication } = useLoanApplication();
  const [offer, setOffer] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const [selectedTenure, setSelectedTenure] = useState("36");
  const { toast } = useToast();

  useEffect(() => {
    if (!application.creditAssessment || !application.personalDetails) return;
    
    startTransition(async () => {
      try {
        const dynamicOffer = await getDynamicLoanOffers({
          creditScore: Math.floor(Math.random() * (850 - 650 + 1)) + 650,
          annualIncome: application.personalDetails!.annualIncome,
          loanAmountRequested: application.personalDetails!.loanAmount,
          loanTenureMonths: parseInt(selectedTenure),
        });
        setOffer(dynamicOffer);
      } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Could not generate loan offers." });
      }
    });

  }, [selectedTenure]);

  const handleSelectOffer = () => {
    setApplication(prev => ({ ...prev, loanOffer: {...offer, tenureMonths: parseInt(selectedTenure)} }));
    onCompleted();
  };

  if (isPending && !offer) {
     return (
      <div className="flex flex-col items-center justify-center space-y-4 p-12 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h3 className="text-xl font-semibold">Generating Your Custom Offer</h3>
        <p className="text-muted-foreground">Based on your profile, we are crafting the best possible loan offers for you.</p>
      </div>
    );
  }
  
  if (!offer) {
    return <p>No offers available.</p>;
  }

  if (offer.loanAmountOffered === 0) {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-12 text-center">
            <h3 className="text-xl font-semibold text-destructive">Loan Application Not Approved</h3>
            <p className="text-muted-foreground max-w-md">{offer.reason}</p>
            <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
    )
  }

  return (
    <div className="space-y-6">
        <h3 className="text-center font-headline text-2xl font-bold">Your Personalised Loan Offer</h3>
        <Card className="bg-primary/5 border-primary shadow-lg">
            <CardContent className="pt-6">
                <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground">You are eligible for a loan up to</p>
                    <p className="text-4xl font-bold font-headline">₹{offer.loanAmountOffered.toLocaleString('en-IN')}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-sm text-muted-foreground">Interest Rate</p>
                        <p className="text-lg font-semibold">{offer.interestRate}% p.a.</p>
                    </div>
                     <div>
                        <p className="text-sm text-muted-foreground">Monthly EMI</p>
                        <p className="text-lg font-semibold">₹{offer.monthlyPayment.toLocaleString('en-IN')}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <Label>Select Tenure (Months)</Label>
                    <RadioGroup defaultValue="36" value={selectedTenure} onValueChange={setSelectedTenure} className="mt-2 grid grid-cols-3 gap-4">
                        {[12, 24, 36, 48, 60].map(t => (
                        <FormItem key={t} className="flex-1">
                            <FormControl>
                            <RadioGroupItem value={String(t)} id={`t-${t}`} className="sr-only" />
                            </FormControl>
                            <Label htmlFor={`t-${t}`} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            {t} months
                            </Label>
                        </FormItem>
                        ))}
                    </RadioGroup>
                </div>
                <Alert className="mt-6">
                  <Banknote className="h-4 w-4" />
                  <AlertTitle>Why this offer?</AlertTitle>
                  <AlertDescription>{offer.reason}</AlertDescription>
                </Alert>
            </CardContent>
        </Card>
        <Button onClick={handleSelectOffer} className="w-full">Accept Offer and Proceed</Button>
    </div>
  );
}

export function KfsStep({ onCompleted }: StepProps) {
    const { application, setApplication } = useLoanApplication();
    const [kfsConsent, setKfsConsent] = useState(false);
  
    if (!application.loanOffer) return <p>No loan offer found.</p>;
  
    const { loanAmountOffered, interestRate, tenureMonths } = application.loanOffer;
    const processingFee = loanAmountOffered * 0.02; // 2% processing fee
    const disbursedAmount = loanAmountOffered - processingFee;
    const totalInterest = (loanAmountOffered * (interestRate/100) * (tenureMonths/12));
    const totalRepayment = loanAmountOffered + totalInterest;
  
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-center text-2xl">Key Facts Statement (KFS)</CardTitle>
            <CardDescription className="text-center">Please review the loan details carefully before proceeding.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 border rounded-lg">
                <p className="text-muted-foreground">Loan Amount</p>
                <p className="font-semibold text-right">₹{loanAmountOffered.toLocaleString('en-IN')}</p>

                <p className="text-muted-foreground">Processing Fee (2%)</p>
                <p className="font-semibold text-right">- ₹{processingFee.toLocaleString('en-IN')}</p>

                <Separator className="col-span-2 my-1" />

                <p className="text-muted-foreground font-bold">Net Disbursed Amount</p>
                <p className="font-bold text-right">₹{disbursedAmount.toLocaleString('en-IN')}</p>
             </div>

             <div className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 border rounded-lg">
                <p className="text-muted-foreground">Annual Interest Rate</p>
                <p className="font-semibold text-right">{interestRate}%</p>
                
                <p className="text-muted-foreground">Loan Tenure</p>
                <p className="font-semibold text-right">{tenureMonths} months</p>

                <p className="text-muted-foreground">Total Interest Payable</p>
                <p className="font-semibold text-right">₹{totalInterest.toLocaleString('en-IN')}</p>

                <Separator className="col-span-2 my-1" />

                <p className="text-muted-foreground font-bold">Total Repayment Amount</p>
                <p className="font-bold text-right">₹{totalRepayment.toLocaleString('en-IN')}</p>
             </div>
          </CardContent>
        </Card>
        
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
            <Checkbox checked={kfsConsent} onCheckedChange={(checked) => setKfsConsent(checked as boolean)} />
            <div className="space-y-1 leading-none">
              <Label>I have read and agree to the Key Facts Statement and the terms of the loan.</Label>
            </div>
        </FormItem>

        <Button onClick={() => { setApplication(prev => ({ ...prev, kfsAccepted: true })); onCompleted(); }} disabled={!kfsConsent} className="w-full">
            Confirm and Continue
        </Button>
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
      defaultValues: application.bankDetails || {},
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
              <FormControl><Input placeholder="1234567890" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="ifsc" render={({ field }) => (
            <FormItem>
              <FormLabel>IFSC Code</FormLabel>
              <FormControl><Input placeholder="SBIN0001234" {...field} className="uppercase" /></FormControl>
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
              EMI Amount: ₹{application.loanOffer?.monthlyPayment.toLocaleString('en-IN')}
            </p>
            <Button onClick={handleMandate} disabled={isPending} size="lg">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Redirecting to bank..." : "Setup e-Mandate"}
            </Button>
        </div>
    );
}

export function DisbursementStep({ onCompleted: _ }: StepProps) {
    const { application } = useLoanApplication();

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
                        <span className="font-bold">₹{application.loanOffer?.loanAmountOffered.toLocaleString('en-IN')}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Bank Account:</span>
                        <span className="font-bold">...{application.bankDetails?.accountNumber.slice(-4)}</span>
                    </div>
                </CardContent>
            </Card>
            <p className="text-muted-foreground max-w-md">
                The amount will be credited to your account shortly. Your first EMI is due next month.
            </p>
            <Button asChild>
                <Link href="/">Back to Dashboard</Link>
            </Button>
        </div>
    );
}
