'use server';

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { checkUserExists, loginUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

const formSchema = z
  .object({
    username: z
      .string()
      .min(5, 'Username must be at least 5 characters long')
      .trim(),
    email: z.string().email({ message: 'Invalid email format' }).trim(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, 'Password must be at least 10 characters long')
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z.string(),
  })
  .superRefine(async ({ email }, ctx) => {
    const userExists = await checkUserExists(email);
    if (userExists) {
      ctx.addIssue({
        code: 'custom',
        message: 'This email is already taken',
        path: ['email'],
        fatal: true,
      });
      return z.NEVER;
    }
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

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
      data: data,
    };
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 12);

  const user = await db.user.create({
    data: {
      username: result.data.username,
      email: result.data.email,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });

  await loginUser(user.id);
  redirect('/profile');
};
