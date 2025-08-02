'use client';

import Button from '@/components/form-button';
import Input from '@/components/form-input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { addProduct, getUploadURL } from './actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductType } from './schema';

export default function AddProduct() {
  const [preview, setPreview] = useState('');
  const [uploadURL, setUploadURL] = useState('');
  const [mounted, setMounted] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }

    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);

    // Only fetch upload URL after component is mounted
    if (mounted) {
      try {
        const { success, result, hash: cloudflareHash } = await getUploadURL();

        if (success) {
          const photoUrl = `https://imagedelivery.net/${cloudflareHash}/${result.id}`;
          setUploadURL(result.uploadURL);
          setValue('photo', photoUrl);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSubmit = handleSubmit(async (data: ProductType) => {
    if (!file) {
      return;
    }
    const cloudflareForm = new FormData();
    cloudflareForm.append('file', file);
    const response = await fetch(uploadURL, {
      method: 'post',
      body: cloudflareForm,
    });
    const responseData = await response.json();
    console.log(responseData);
    if (response.status !== 200) {
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price.toString());
    formData.append('description', data.description);
    formData.append('photo', data.photo);
    return addProduct(formData);
  });

  const onValid = async () => {
    await onSubmit();
  };

  return (
    <div>
      <form action={onValid} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          style={{ backgroundImage: `url(${preview})` }}
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-cover bg-center"
        >
          {!preview && (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                Add a photo{errors.photo?.message}
              </div>
            </>
          )}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />
        <Input
          required
          placeholder="title"
          type="text"
          {...register('title')}
          errors={[errors.title?.message ?? '']}
        />
        <Input
          type="number"
          required
          placeholder="price"
          {...register('price')}
          errors={[errors.price?.message ?? '']}
        />
        <Input
          type="text"
          required
          placeholder="description"
          {...register('description')}
          errors={[errors.description?.message ?? '']}
        />
        <Button text="Add product" />
      </form>
    </div>
  );
}
