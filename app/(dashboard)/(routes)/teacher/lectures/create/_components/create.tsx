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
import { Server } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  title: z.string().min(1, 'Это поле должно быть заполеным'),
  date: z.string().min(1, 'Это поле должно быть заполеным'),
  time: z.string().min(1, 'Время не может быть пустым')
});

function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('.').map(Number);
  return new Date(year, month - 1, day);
}

function parseTime(timeString: string): Date {
  // Проверяем, что входная строка не пуста
  if (!timeString) {
    return new Date();
  }

  const timeParts = timeString.split(':');
  if (timeParts.length !== 2) {
    return new Date();
  }

  const [hoursString, minutesString] = timeParts;
  const hours = parseInt(hoursString, 10);
  const minutes = parseInt(minutesString, 10);

  const currentDate = new Date();
  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    hours,
    minutes,
    0
  );
}

type Props = {
  userId: string;
};

export function LectureCreate({ userId }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      date: '',
      time: ''
    }
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit({ time, date, title }: z.infer<typeof formSchema>) {
    const payload = {
      title,
      date: parseDate(date),
      time: parseTime(time),
      link: '',
      userId
    };

    try {
      await Server.post('/lecture', payload);
      toast.success('Лекция создана');
    } catch (err) {
      toast.error('Лекция создана');
      console.log(err);
    }
  }

  return (
    <div className="flex h-full max-w-5xl p-6 mx-auto md:items-center md:justify-center">
      <Form {...form}>
        <form className="mt-8 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название лекции</FormLabel>

                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Название"
                    {...field}
                  />
                </FormControl>

                <FormDescription>Какое название у лекции?</FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="date"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Дата проведения</FormLabel>

                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="22.11.2020"
                    {...field}
                  />
                </FormControl>

                <FormDescription>Какая дата проведения лекции?</FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="time"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Время проведения</FormLabel>

                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="19:30"
                    {...field}
                  />
                </FormControl>

                <FormDescription>
                  Какое время проведения лекции?
                </FormDescription>

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
    </div>
  );
}
