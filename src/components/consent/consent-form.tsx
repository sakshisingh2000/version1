
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

const consentKeys = [
  "PAN_VERIFICATION",
  "AADHAAR_AUTH",
  "DIGILOCKER_KYC",
  "BUREAU_PULL",
  "BANK_VERIFICATION",
  "DATA_SHARING",
] as const;

const consentSchema = z.object({
  PAN_VERIFICATION: z.literal(true, { errorMap: () => ({ message: "This consent is required." }) }),
  AADHAAR_AUTH: z.literal(true, { errorMap: () => ({ message: "This consent is required." }) }),
  DIGILOCKER_KYC: z.literal(true, { errorMap: () => ({ message: "This consent is required." }) }),
  BUREAU_PULL: z.literal(true, { errorMap: () => ({ message: "This consent is required." }) }),
  BANK_VERIFICATION: z.literal(true, { errorMap: () => ({ message: "This consent is required." }) }),
  DATA_SHARING: z.literal(true, { errorMap: () => ({ message: "This consent is required." }) }),
  AGREE_NOTICE: z.literal(true, { errorMap: () => ({ message: "You must agree to the notice." }) })
}).catchall(z.boolean());

interface ConsentFormProps {
    onSubmit: (values: z.infer<typeof consentSchema>) => void;
    isPending: boolean;
}

export function ConsentForm({ onSubmit, isPending }: ConsentFormProps) {
  const { dict, language } = useLanguage();
  const d = dict.consent;

  const form = useForm<z.infer<typeof consentSchema>>({
    resolver: zodResolver(consentSchema),
    defaultValues: Object.fromEntries(consentKeys.map(key => [key, false]).concat([['AGREE_NOTICE', false]]))
  });

  const BilingualLabel = ({ translationKey }: { translationKey: keyof typeof d['items'] }) => (
    <div>
        <span className="font-medium">{d.items[translationKey].en}</span>
        {language !== 'en' && <p className="text-sm text-muted-foreground">{d.items[translationKey].regional}</p>}
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {consentKeys.map((key) => (
              <FormField
                key={key}
                control={form.control}
                name={key}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                       <BilingualLabel translationKey={key as keyof typeof d['items']} />
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
           <FormMessage>
              {Object.values(form.formState.errors).length > 0 && (
                <div>
                  <p>{d.all_consents_required.en}</p>
                  {language !== 'en' && <p className="text-sm text-muted-foreground">{d.all_consents_required.regional}</p>}
                </div>
              )}
          </FormMessage>
          <ScrollArea className="h-32 w-full rounded-md border p-4 text-xs">
              <p className="text-foreground">{d.agree_notice_text.en}</p>
              {language !== 'en' && <p className="mt-2 text-muted-foreground">{d.agree_notice_text.regional}</p>}
          </ScrollArea>
           <FormField
              control={form.control}
              name="AGREE_NOTICE"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <BilingualLabel translationKey="AGREE_NOTICE" />
                  </div>
                </FormItem>
              )}
            />
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending || !form.formState.isValid} className="w-full">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {d.accept_button.en}
            {language !== 'en' && ` / ${d.accept_button.regional}`}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
