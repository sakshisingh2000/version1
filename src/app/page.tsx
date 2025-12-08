import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Rocket,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const features = [
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: 'Lightning Fast',
    description:
      'Get a decision in minutes. Our automated process means no waiting around.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Bank-Level Security',
    description:
      'Your data is encrypted and secure. We respect your privacy and information.',
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'Fully Transparent',
    description:
      'No hidden fees. Understand all terms upfront with our clear Key Facts Statement.',
  },
];

const steps = [
  'Provide PAN & Aadhaar',
  'Complete e-KYC & Bank Details',
  'Accept Loan Offer',
  'Funds Disbursed Instantly',
];

export default function Home() {
  const heroImage = placeholderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-background py-12 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
              <div className="text-center lg:text-left">
                <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
                  Fast, Fair, and Transparent Digital Loans.
                </h1>
                <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-lg text-muted-foreground md:text-xl">
                  Get the funds you need in minutes with LoanSwift&apos;s
                  seamless online process. 100% digital, no paperwork, no
                  hassle.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild size="lg">
                    <Link href="/apply">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                {heroImage && (
                  <Image
                    data-ai-hint={heroImage.imageHint}
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={600}
                    height={400}
                    className="rounded-xl shadow-2xl"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
                Why Choose LoanSwift?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                We are committed to providing a borrowing experience that is simple,
                secure, and straightforward.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-background py-12 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
                Get Your Loan in 4 Easy Steps
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Our Straight-Through-Process (STP) is designed for speed and convenience.
              </p>
            </div>
            <div className="relative">
               <div
                className="absolute left-1/2 top-4 hidden h-full w-0.5 -translate-x-1/2 bg-border md:block"
                aria-hidden="true"
              ></div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                     <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <span className="font-bold">{index + 1}</span>
                      </div>
                    <div className="pt-1.5">
                      <h3 className="text-lg font-semibold">{step}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
