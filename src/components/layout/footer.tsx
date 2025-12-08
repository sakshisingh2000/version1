export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-muted-foreground">
          <p className="font-semibold">LoanSwift - Lending Service Provider (LSP)</p>
          <p>
            Partnered with RBI-approved Regulated Entities (RE) like NBFCs/Banks.
          </p>
          <p className="mt-2">
            All loans are disbursed and repaid directly between the borrower and the RE.
          </p>
          <p className="mt-4">
            &copy; {new Date().getFullYear()} LoanSwift. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
