'use server';

/**
 * @fileOverview This file defines a Genkit flow for assessing credit risk based on borrower data.
 *
 * The flow takes borrower data as input and returns a credit risk assessment.
 * It includes functions for:
 * - assessingCreditRisk: The main function that initiates the credit risk assessment flow.
 * - CreditRiskAssessmentInput: The input type for the assessingCreditRisk function.
 * - CreditRiskAssessmentOutput: The output type for the assessingCreditRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreditRiskAssessmentInputSchema = z.object({
  creditScore: z.number().describe('The credit score of the borrower.'),
  income: z.number().describe('The annual income of the borrower.'),
  loanAmount: z.number().describe('The amount of loan requested by the borrower.'),
  loanTenure: z.number().describe('The loan tenure in months.'),
  age: z.number().describe('The age of the borrower.'),
  employmentType: z
    .string()
    .describe('The employment type of the borrower (e.g., salaried, self-employed).'),
});
export type CreditRiskAssessmentInput = z.infer<typeof CreditRiskAssessmentInputSchema>;

const CreditRiskAssessmentOutputSchema = z.object({
  riskLevel: z
    .string()
    .describe(
      'The overall risk level assessment (e.g., low, medium, high) based on the input data.'
    ),
  interestRate: z.number().describe('The recommended interest rate based on the risk assessment.'),
  eligibleLoanAmount: z
    .number()
    .describe('The eligible loan amount based on the risk assessment.'),
  reason: z.string().describe('The reason behind the risk assessment decision.'),
});
export type CreditRiskAssessmentOutput = z.infer<typeof CreditRiskAssessmentOutputSchema>;

export async function assessCreditRisk(input: CreditRiskAssessmentInput): Promise<
  CreditRiskAssessmentOutput
> {
  return assessCreditRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'creditRiskAssessmentPrompt',
  input: {schema: CreditRiskAssessmentInputSchema},
  output: {schema: CreditRiskAssessmentOutputSchema},
  prompt: `You are an expert credit risk assessor. Given the following information about a borrower, determine their credit risk and recommend an appropriate interest rate and loan amount. Also, explain the reasoning for your decision.

Credit Score: {{{creditScore}}}
Income: {{{income}}}
Loan Amount Requested: {{{loanAmount}}}
Loan Tenure: {{{loanTenure}}} months
Age: {{{age}}}
Employment Type: {{{employmentType}}}

Consider these factors to provide the riskLevel, interestRate, eligibleLoanAmount, and reason. Use the Zod schema descriptions to guide your output. Be brief and specific.
`,
});

const assessCreditRiskFlow = ai.defineFlow(
  {
    name: 'assessCreditRiskFlow',
    inputSchema: CreditRiskAssessmentInputSchema,
    outputSchema: CreditRiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
