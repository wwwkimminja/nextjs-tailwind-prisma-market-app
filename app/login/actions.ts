'use server';

import { redirect } from 'next/navigation';

export const handleSubmit = async (prevState: any, formData: FormData) => {
  await new Promise(resolve => setTimeout(resolve, 5000));

  const email = formData.get('email');
  const password = formData.get('password');


  if (password !== '12345') {
    return {
      error: ['Wrong password'],
    };
  }

  return {
    result: 'OK',
  };
};
