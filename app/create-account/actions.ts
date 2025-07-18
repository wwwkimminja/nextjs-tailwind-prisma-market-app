'use server';

import {
  EMAIL_REGEX,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import { z } from 'zod';

const formSchema = z
  .object({
    username: z
      .string()
      .min(5, 'Username must be at least 5 characters long')
      .trim(),
    email: z
      .string()
      .email({ message: 'Invalid email format' })
      .trim()
      .refine(
        email => EMAIL_REGEX.test(email),
        'Only @zod.com emails are allowed'
      ),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, 'Password must be at least 10 characters long')
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z.string(),
  })
  .refine(
    ({ password, confirmPassword }) =>
      confirmPassword && password === confirmPassword,
    {
      message: 'Two passwords should be equal',
      path: ['confirmPassword'],
    }
  );

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
      data: data,
    };
  }
  await new Promise(resolve => setTimeout(resolve, 3000));
  return {
    result: 'OK',
  };
};
