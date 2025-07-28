'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { addTweet } from '@/tweets/actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-2 px-4 rounded-md transition-colors"
    >
      {pending ? 'Posting...' : 'Post Tweet'}
    </button>
  );
}

export default function AddTweet() {
  const [state, action] = useActionState(addTweet, {
    fieldErrors: {},
    formErrors: [],
  });

  return (
    <div className="p-4 border-b border-neutral-700">
      <form action={action} className="space-y-4">
        <div>
          <textarea
            name="tweet"
            placeholder="What's happening?"
            className="w-full p-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            maxLength={280}
          />
          {state?.fieldErrors.tweet && (
            <p className="text-red-500 text-sm mt-1">
              {state.fieldErrors.tweet[0]}
            </p>
          )}
        </div>

        {state?.formErrors && state.formErrors.length > 0 && (
          <div className="text-red-500 text-sm">
            {state.formErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
