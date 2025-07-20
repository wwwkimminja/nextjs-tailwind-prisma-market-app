'use server';

import { z } from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';

const phoneSchema = z
  .string()
  .trim()
  .refine(
    value => validator.isMobilePhone(value, 'ja-JP'),
    'Wrong phone format'
  );

const tokenSchema = z.coerce.number().int().min(100000).max(999999);

interface ActionState {
  token: boolean;
}

export const smsLogin = async (prevState: ActionState, formData: FormData) => {
  const phone = formData.get('phone');
  const token = formData.get('token');

  if (prevState.token === false) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    }
    return {
      token: true,
    };
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    }
    redirect('/');
  }
};
