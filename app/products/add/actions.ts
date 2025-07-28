'use server';

import db from '@/lib/db';
import { z } from 'zod';
import fs from 'fs/promises';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.coerce.number().min(1, 'Price is required'),
  description: z.string().min(1, 'Description is required'),
  photo: z.string().min(1, 'Photo is required'),
});

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

export async function addProduct(prevState: any, formData: FormData) {
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
