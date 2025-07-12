import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1>Create Account</h1>
        <h2>Fill in the form below to create your account!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <input
            className="bg-transparent rounded-md w-full h-10 p-2 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none  placeholder:text-neutral-400"
            type="text"
            placeholder="Username"
          />
          <span className="text-red-500 text-sm">Input error</span>
        </div>
        <button className="primary-btn h-10" type="submit">
          Create Account
        </button>
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
          <span>Sine up with SMS</span>
        </Link>
      </div>
    </div>
  );
}
