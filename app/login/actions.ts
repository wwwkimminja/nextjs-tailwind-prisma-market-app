'use server';

import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';

const checkEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmail, 'An account with that email does not exist'),
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
  } else {
    //find a user with the email
    const user = await db.user.findUnique({
      where: { email: result.data.email },
      select: { id: true, password: true },
    });

    if (user) {
      const isPasswordValid = await bcrypt.compare(
        result.data.password,
        user.password
      );

      if (isPasswordValid) {
        const session = await getSession();
        session.id = user.id;
        await session.save();
        redirect('/profile');
      } else {
        return {
          fieldErrors: { password: ['Wrong password'] },
          data: data,
        };
      }
    }
  }
};
