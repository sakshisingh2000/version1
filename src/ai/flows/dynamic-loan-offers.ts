'use server';

/**
 * @fileOverview Dynamically adjusts loan offers based on the borrower's risk profile.
 *
 * - getDynamicLoanOffers - A function that returns personalized loan options.
 * - DynamicLoanOffersInput - The input type for the getDynamicLoanOffers function.
 * - DynamicLoanOffersOutput - The return type for the getDynamicLoanOffers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DynamicLoanOffersInputSchema = z.object({
  creditScore: z.number().describe('The credit score of the borrower.'),
  annualIncome: z.number().describe('The annual income of the borrower.'),
  loanAmountRequested: z
    .number()
    .describe('The amount of loan requested by the borrower.'),
  loanTenureMonths: z
    .number()
    .describe('The loan tenure in months requested by the borrower.'),
});
export type DynamicLoanOffersInput = z.infer<typeof DynamicLoanOffersInputSchema>;

const DynamicLoanOffersOutputSchema = z.object({
  loanAmountOffered: z
    .number()
    .describe('The loan amount offered to the borrower.'),
  interestRate: z.number().describe('The interest rate offered to the borrower.'),
  monthlyPayment: z.number().describe('The estimated monthly payment amount.'),
  reason: z
    .string()
    .describe('Explanation of why this particular loan offer was made.'),
});
export type DynamicLoanOffersOutput = z.infer<typeof DynamicLoanOffersOutputSchema>;

export async function getDynamicLoanOffers(input: DynamicLoanOffersInput): Promise<DynamicLoanOffersOutput> {
  return dynamicLoanOffersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dynamicLoanOffersPrompt',
  input: {schema: DynamicLoanOffersInputSchema},
  output: {schema: DynamicLoanOffersOutputSchema},
  prompt: `You are a loan officer at LoanSwift, a modern Indian lending service provider.

Based on the borrower's credit score, annual income, loan amount requested and loan tenure, determine the appropriate loan amount, interest rate and monthly payment.

Here is some information about the borrower:

Credit Score: {{{creditScore}}}
Annual Income: {{{annualIncome}}}
Loan Amount Requested: {{{loanAmountRequested}}}
Loan Tenure (months): {{{loanTenureMonths}}}

Consider these rules when generating the loan offer:

*   A higher credit score should result in a lower interest rate and potentially a higher loan amount offered.
*   A lower credit score may result in a higher interest rate and a lower loan amount offered, or even a rejection of the loan.
*   The monthly payment should be calculated based on the loan amount offered, interest rate, and loan tenure.
*   If the loan is not approved, the loanAmountOffered should be 0.
*   If the loan is approved, the loanAmountOffered should be no more than double the loanAmountRequested.

Return the loan offer details in the following JSON format:

{{output}}`,
});

const dynamicLoanOffersFlow = ai.defineFlow(
  {
    name: 'dynamicLoanOffersFlow',
    inputSchema: DynamicLoanOffersInputSchema,
    outputSchema: DynamicLoanOffersOutputSchema,
  },
  async input => {
    let retries = 3;
    while (retries > 0) {
      try {
        const {output} = await ai.generate({
            model: 'googleai/gemini-pro',
            prompt: prompt.compile(input),
            output: {
              schema: DynamicLoanOffersOutputSchema,
            },
          });
        return output!;
      } catch (e) {
        retries--;
        if (retries === 0) {
          throw e;
        }
        console.log(`Retrying dynamicLoanOffersFlow, ${retries} attempts left.`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    // This part should not be reachable due to the throw in the loop.
    throw new Error('Loan offer generation failed after multiple retries.');
  }
);
