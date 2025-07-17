import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import FormInput from '@/components/form-input';
import FormButton from '@/components/form-button';

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1>Create Account</h1>
        <h2>Fill in the form below to create your account!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          type="text"
          placeholder="Username"
          required={true}
          errors={[]}
        />
        <FormInput
          type="email"
          placeholder="Email"
          required={true}
          errors={[]}
        />
        <FormInput
          type="password"
          placeholder="Password"
          required={true}
          errors={[]}
        />
        <FormInput
          type="password"
          placeholder="Confirm Password"
          required={true}
          errors={[]}
        />

        <FormButton text="Create Account" type="submit" loading={false} />
      </form>
      <div className="w-full h-px bg-neutral-500" />
      <div>
        <Link
          className="primary-btn flex h-10 item-center justify-center gap-2"
          href="/sms"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
          </span>
          <span>Sign up with SMS</span>
        </Link>
      </div>
    </div>
  );
}
