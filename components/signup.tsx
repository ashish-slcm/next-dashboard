'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type SignupFormValues = z.infer<typeof formSchema>;

export default function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, startTransition] = useTransition();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: SignupFormValues) => {
    setError(null);
    startTransition(async () => {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Something went wrong');
      }
    });
  };

  return (
    <>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    {...field}
                    placeholder="Your name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={loading}
                    {...field}
                    placeholder="you@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={loading}
                    {...field}
                    placeholder="Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>
      </Form>
    </>
  );
}
