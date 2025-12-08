import Link from 'next/link';
import {
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-background py-12 sm:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
              Welcome to LoanSwift
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Your trusted lending partner. In partnership with <strong>RBI-approved NBFCs/Banks</strong>.
            </p>
            
            <div className="mt-12">
              <h2 className="font-headline text-3xl font-bold tracking-tight mb-6">
                Choose Your Loan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="text-left">
                  <CardHeader>
                    <CardTitle>Personal Loan</CardTitle>
                    <CardDescription>For your planned and unplanned financial needs. Quick approval and disbursal.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2">
                        <li>- Up to ₹5,00,000</li>
                        <li>- Flexible tenure</li>
                        <li>- 100% Digital</li>
                    </ul>
                    <Button asChild className="mt-4">
                      <Link href="/login">
                        Check My Eligibility <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="text-left opacity-50 cursor-not-allowed">
                  <CardHeader>
                    <CardTitle>Small Ticket Consumer Loan</CardTitle>
                    <CardDescription>Finance your next big purchase with easy EMIs. (Coming Soon)</CardDescription>
                  </CardHeader>
                   <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2">
                        <li>- Instant approval at checkout</li>
                        <li>- No-cost EMI options</li>
                        <li>- Wide range of products</li>
                    </ul>
                    <Button className="mt-4" disabled>
                        Check My Eligibility
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
