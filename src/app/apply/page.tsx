import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LoanJourney, LoanApplicationProvider } from "@/components/loan-journey/loan-application-provider";

export default function ApplyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <LoanApplicationProvider>
          <LoanJourney />
        </LoanApplicationProvider>
      </main>
      <Footer />
    </div>
  );
}
