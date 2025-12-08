import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShieldCheck } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              LoanSwift
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Can add search here if needed */}
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/admin">
                <ShieldCheck className="mr-2 h-4 w-4" />
                RE Admin
              </Link>
            </Button>
          </nav>
        </div>

        <div className="flex items-center md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5"/>
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                        <Logo className="h-6 w-6 text-primary" />
                        <span className="font-bold font-headline">LoanSwift</span>
                    </Link>
                    <nav className="flex flex-col gap-4">
                        <Link href="/admin" className="flex items-center gap-2 text-sm font-medium">
                            <ShieldCheck className="h-5 w-5" />
                            RE Admin Console
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
        <div className="flex items-center md:hidden ml-auto">
             <Link href="/" className="flex items-center space-x-2">
                <Logo className="h-6 w-6 text-primary" />
            </Link>
        </div>

      </div>
    </header>
  );
}
