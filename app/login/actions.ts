'use server';

import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { findUserByEmail, loginUser, checkUserExists } from '@/lib/auth';

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkUserExists, 'An account with that email does not exist'),
  password: z.string({
    error: 'Password is required',
  }),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
      data: data,
    };
  }

  const user = await findUserByEmail(result.data.email);

  if (user) {
    const isPasswordValid = await bcrypt.compare(
      result.data.password,
      user.password
    );

    if (isPasswordValid) {
      await loginUser(user.id);
    } else {
      return {
        fieldErrors: { password: ['Wrong password'] },
        data: data,
      };
    }
  }
};
