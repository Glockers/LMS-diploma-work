'use client';

import { saveUser } from '@/actions/save-user';
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
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Это поле должно быть заполеным'),
  lastname: z.string().min(1, 'Это поле должно быть заполеным'),
  surname: z.string().min(1, 'Это поле должно быть заполеным'),
  mobilePhone: z
    .string()
    .refine((value) => /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value)),
  email: z
    .string()
    .min(1, { message: 'Это поле должно быть заполеным.' })
    .email('Не валидная форма почты.')
});

export default function FormProfile({ userId }: { userId: string }) {
  const router = useRouter();

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
    try {
      const user = {
        id: userId,
        ...values
      };
      await saveUser(user);
      router.replace('/');
      toast.success('Контактная информация была изменена!');
    } catch (err: any) {
      if (err.response.status === 409) {
        toast.error('Данные о пользователи уже заполнены!');
      } else {
        toast.error('Ошибка при создании профиля!');
      }
    }
  };

  return (
    <Form {...form}>
      <form className="mt-8 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>

              <FormControl>
                <Input disabled={isSubmitting} placeholder="Maxim" {...field} />
              </FormControl>

              <FormDescription>Ваше имя?</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="lastname"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фамилия</FormLabel>

              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Litvishko"
                  {...field}
                />
              </FormControl>

              <FormDescription>Ваша фамилия?</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="surname"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Отчество</FormLabel>

              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Yurievich"
                  {...field}
                />
              </FormControl>

              <FormDescription>Ваше отчество?</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="mobilePhone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Контактный телефон</FormLabel>

              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="375294325962"
                  {...field}
                />
              </FormControl>

              <FormDescription>Ваш контактный телефон?</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Контактная Почта</FormLabel>

              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="glockerswork@gmail.com"
                  {...field}
                />
              </FormControl>

              <FormDescription>Ваша контактная почта?</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-2">
          <Link href="/">
            <Button type="button" variant="ghost">
              Отменить
            </Button>
          </Link>

          <Button type="submit" disabled={!isValid || isSubmitting}>
            Продолжить
          </Button>
        </div>
      </form>
    </Form>
  );
}
