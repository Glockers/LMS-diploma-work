'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'name is required'),
  lastname: z.string().min(1, 'lastname is required'),
  surname: z.string().min(1, 'surname is required'),
  mobilePhone: z
    .string()
    .refine((value) => /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value)),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.')
});

export default function FormProfile() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      lastname: '',
      surname: '',
      mobilePhone: '',
      email: ''
    }
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.success('Контактная информация была изменена!');
    console.log(values);
  };

  return (
    <Form {...form}>
      <form className="mt-8 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>

              <FormControl>
                <Input disabled={isSubmitting} placeholder="Maxim" {...field} />
              </FormControl>

              <FormDescription>What is your name?</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="lastname"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>LastName</FormLabel>

              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Litvishko"
                  {...field}
                />
              </FormControl>

              <FormDescription>What is your last name?</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="surname"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>

              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Yurievich"
                  {...field}
                />
              </FormControl>

              <FormDescription>What is your surname?</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="mobilePhone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Phone</FormLabel>

              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="375294325962"
                  {...field}
                />
              </FormControl>

              <FormDescription>What is your phone?</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="glockerswork@gmail.com"
                  {...field}
                />
              </FormControl>

              <FormDescription>What is your mail?</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-2">
          <Link href="/">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </Link>

          <Button type="submit" disabled={!isValid || isSubmitting}>
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}
