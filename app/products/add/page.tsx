'use client';

import Button from '@/components/form-button';
import Input from '@/components/form-input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState, useActionState, useEffect } from 'react';
import { addProduct, getUploadURL } from './actions';

export default function AddProduct() {
  const [preview, setPreview] = useState('');

  const [uploadURL, setUploadURL] = useState('');
  const [imageId, setImageId] = useState('');
  const [hash, setHash] = useState('');
  const [mounted, setMounted] = useState(false);

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

    // Only fetch upload URL after component is mounted
    if (mounted) {
      const { success, result, hash: cloudflareHash } = await getUploadURL();
      if (success) {
        setUploadURL(result.uploadURL);
        setImageId(result.id);
        setHash(cloudflareHash);
      }
    }
  };

  const interceptAction = async (_: any, formData: FormData) => {
    const file = formData.get('photo');
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

    const photoUrl = `https://imagedelivery.net/${hash}/${imageId}`;
    formData.set('photo', photoUrl);
    return addProduct(_, formData);
  };

  const [state, action] = useActionState(interceptAction, {
    fieldErrors: {},
    formErrors: [],
  });

  return (
    <div>
      <form action={action} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          style={{ backgroundImage: `url(${preview})` }}
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-cover bg-center"
        >
          {!preview && (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                Add a photo{state?.fieldErrors.photo}
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
          name="title"
          required
          placeholder="title"
          type="text"
          errors={state?.fieldErrors.title}
        />
        <Input
          name="price"
          type="number"
          required
          placeholder="price"
          errors={state?.fieldErrors.price}
        />
        <Input
          name="description"
          type="text"
          required
          placeholder="description"
          errors={state?.fieldErrors.description}
        />
        <Button text="Add product" />
      </form>
    </div>
  );
}
