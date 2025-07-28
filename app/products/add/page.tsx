'use client';

import Button from '@/components/form-button';
import Input from '@/components/form-input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { addProduct } from './actions';
import { useFormState } from 'react-dom';

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

export default function AddProduct() {
  const [preview, setPreview] = useState('');
  const [state, action] = useFormState(addProduct, {
    fieldErrors: {},
    formErrors: [],
  });

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert(
          `File size must be less than 3MB. Current file size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`
        );
        event.target.value = ''; // Clear the input
        return;
      }

      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

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
          errors={state.fieldErrors.title}
        />
        <Input
          name="price"
          type="number"
          required
          placeholder="price"
          errors={state.fieldErrors.price}
        />
        <Input
          name="description"
          type="text"
          required
          placeholder="description"
          errors={state.fieldErrors.description}
        />
        <Button text="Add product" />
      </form>
    </div>
  );
}
