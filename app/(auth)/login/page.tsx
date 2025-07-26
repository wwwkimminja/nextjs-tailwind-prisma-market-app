'use client';
import FormInput from '@/components/form-input';
import FormButton from '@/components/form-button';
import SocialLogin from '@/components/social-login';
import { login } from './actions';
import { useActionState } from 'react';

export default function Login() {
  const [state, formAction] = useActionState(login, null);

  return (
    <div className="flex flex-col gap-10 p-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1>Hello, again!</h1>
        <h2>Log in to your account!</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-3">
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
        <FormButton text="Log in" />
        {state?.result === 'OK' && (
          <div className="text-green-500 text-sm">
            <p>Welcome back!</p>
          </div>
        )}
      </form>
      <div className="w-full h-px bg-neutral-500" />
      <SocialLogin />
    </div>
  );
}
