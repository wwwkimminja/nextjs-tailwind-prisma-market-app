'use client';
import FormInput from '@/components/form-input';
import FormButton from '@/components/form-button';
import SocialLogin from '@/components/social-login';
import { createAccount } from './actions';
import { useActionState } from 'react';

export default function CreateAccount() {
  const [state, dispatch] = useActionState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 p-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1>Create Account</h1>
        <h2>Fill in the form below to create your account!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required={true}
          errors={state?.fieldErrors?.username}
          defaultValue={state?.data?.username?.toString()}
        />
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required={true}
          errors={state?.fieldErrors?.email}
          defaultValue={state?.data?.email?.toString()}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required={true}
          errors={state?.fieldErrors?.password}
          defaultValue={state?.data?.password?.toString()}
        />
        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required={true}
          errors={state?.fieldErrors?.confirmPassword}
          defaultValue={state?.data?.confirmPassword?.toString()}
        />

        <FormButton text="Create Account" />
      </form>
      <div className="w-full h-px bg-neutral-500" />
      <SocialLogin />
    </div>
  );
}
