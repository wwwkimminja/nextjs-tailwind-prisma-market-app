'use client';
import FormButton from '@/components/form-button';
import FormInput from '@/components/form-input';
import { smsLogin } from './actions';
import { useActionState } from 'react';

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useActionState(smsLogin, initialState);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log in</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <FormInput
            name="token"
            type="number"
            placeholder="Verification code"
            required
            min={100000}
            max={999999}
            errors={state?.error?.formErrors}
          />
        ) : (
          <FormInput
            name="phone"
            type="text"
            placeholder="Phone number"
            required
            errors={state?.error?.formErrors}
          />
        )}
        <FormButton
          text={state.token ? 'Verify Token' : 'Send Verification SMS'}
        />
      </form>
    </div>
  );
}
