'use server';

import db from '@/lib/db';
import fs from 'fs/promises';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { productSchema } from './schema';

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

export async function addProduct(formData: FormData) {
  const data = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    price: formData.get('price'),
    description: formData.get('description'),
  };

  if (data.photo instanceof File) {
    // Check file size on server side first
    if (data.photo.size > MAX_FILE_SIZE) {
      return {
        fieldErrors: {
          photo: ['File size must be less than 3MB'],
        },
        formErrors: [],
      };
    }

    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }

  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();
  if (!session.id) {
    return {
      fieldErrors: {},
      formErrors: ['You must be logged in to create a product'],
    };
  }

  const product = await db.product.create({
    data: {
      title: result.data.title,
      description: result.data.description,
      price: result.data.price,
      photo: result.data.photo,
      user: {
        connect: {
          id: session.id,
        },
      },
    },
    select: {
      id: true,
    },
  });

  redirect(`/products/${product.id}`);
}

export async function getUploadURL() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  const hash = process.env.CLOUDFLARE_HASH;

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v2/direct_upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );
  const data = await response.json();

  return { ...data, hash };
}
