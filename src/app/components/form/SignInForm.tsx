'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase/config';

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be 8 characters'),
});

const SignInForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues:{
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            const { email, password } = values;
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error signing up:', error);
        }

        console.log(values);
    };

      return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className='space-y-2'>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="khyrenegwapa@example.com" {...field} />
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
                                    <Input type= 'password' placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className='w-full mt-6' type="submit">Sign In</Button>
            </form>
            <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                or
            </div>
            <p className='text-center text-sm text-grey-600 mt-2'>
                If you don&apos;t have an account, please&nbsp;
                <Link className='text-blue-500 hover:underline' href='/sign-up'>Sign Up</Link>
            </p>
        </Form>
    );
};

export default SignInForm;
