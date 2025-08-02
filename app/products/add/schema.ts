import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.coerce.number().min(1, 'Price is required'),
  description: z.string().min(1, 'Description is required'),
  photo: z.string().min(1, 'Photo is required'),
});

export type ProductType = z.infer<typeof productSchema>;
