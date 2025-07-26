'use server';

import { z } from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import crypto from 'crypto';
import { loginUser } from '@/lib/auth';

const phoneSchema = z
  .string()
  .trim()
  .refine(
    value => validator.isMobilePhone(value, 'ja-JP'),
    'Wrong phone format'
  );

async function tokenExists(token: number) {
  const exist = await db.sMSToken.findUnique({
    where: {
      token: token.toString(),
    },
  });
  return Boolean(exist);
}
const tokenSchema = z.coerce
  .number()
  .int()
  .min(100000)
  .max(999999)
  .refine(tokenExists, 'Invalid token');

interface ActionState {
  token: boolean;
}

async function generateToken() {
  const token = crypto.randomInt(100000, 999999).toString();
  const exist = await db.sMSToken.findUnique({
    where: {
      token: token,
    },
    select: {
      id: true,
    },
  });
  if (exist) {
    return generateToken();
  }
  return token;
}

export const smsLogin = async (prevState: ActionState, formData: FormData) => {
  const phone = formData.get('phone');
  const token = formData.get('token');

  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    }
    await db.sMSToken.deleteMany({
      where: {
        user: {
          phone: result.data,
        },
      },
    });

    const token = await generateToken();
    await db.sMSToken.create({
      data: {
        token,
        user: {
          connectOrCreate: {
            where: {
              phone: result.data,
            },
            create: {
              username: crypto.randomBytes(10).toString('hex'),
              phone: result.data,
            },
          },
        },
      },
    });

    return {
      token: true,
    };
  } else {
    const result = await tokenSchema.safeParseAsync(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data.toString(),
        },
        select: {
          id: true,
          user_id: true,
        },
      });

      if (token) {
        await loginUser(token.user_id);
        await db.sMSToken.delete({
          where: {
            id: token.id,
          },
        });
      }
      redirect('/profile');
    }
  }
};
