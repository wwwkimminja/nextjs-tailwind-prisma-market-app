'use server';

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const checkUsername = async (username: string) => {
  const existingUser = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });
  return !Boolean(existingUser);
};

const checkEmail = async (email: string) => {
  const existingEmail = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return Boolean(existingEmail) === false;
};

const formSchema = z
  .object({
    username: z
      .string()
      .min(5, 'Username must be at least 5 characters long')
      .trim()
      .refine(checkUsername, 'Username is already taken'),
    email: z
      .string()
      .email({ message: 'Invalid email format' })
      .trim()
      .refine(
        checkEmail,
        'There is an account already registered with that email.'
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
  console.log(user);

  //log the user in
  const cookie = await getIronSession(await cookies(), {
    cookieName: 'carrot-market-reloaded',
    password: process.env.COOKIE_PASSWORD!,
  });
  //@ts-ignore
  cookie.id = user.id;
  await cookie.save();

  redirect('/profile');
};
