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
    .describe('The loan amount offered to the borrower. This must always be greater than 0.'),
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
  prompt: `You are a loan officer for a digital lending prototype. Your goal is to ALWAYS generate an attractive and valid loan offer to ensure the demo flow is successful.

Based on the borrower's profile, determine an appropriate loan amount, interest rate, and monthly payment.

Here is the borrower's information:
Credit Score: {{{creditScore}}}
Annual Income: {{{annualIncome}}}
Loan Amount Requested: {{{loanAmountRequested}}}
Loan Tenure (months): {{{loanTenureMonths}}}

IMPORTANT RULES FOR THE PROTOTYPE:
1.  **Always approve the loan.** The 'loanAmountOffered' must ALWAYS be a positive number greater than 0.
2.  The offered amount should be reasonable, ideally close to or slightly more than the requested amount.
3.  Calculate a realistic interest rate and monthly payment based on the offered amount and tenure.
4.  Provide a brief, positive reason for the offer.

Return the loan offer details in the required JSON format.`,
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
        const {output} = await prompt(input);
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
