'use server';

import { z } from 'zod';
import { getSession } from '@/lib/session';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

const tweetSchema = z.object({
  tweet: z
    .string()
    .min(1, 'Tweet is required')
    .max(280, 'Tweet must be less than 280 characters'),
});

export async function addTweet(prevState: any, formData: FormData) {
  const data = {
    tweet: formData.get('tweet'),
  };

  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();
  if (!session.id) {
    return {
      fieldErrors: {},
      formErrors: ['You must be logged in to create a tweet'],
    };
  }

  const tweet = await db.tweet.create({
    data: {
      tweet: result.data.tweet,
      user: {
        connect: {
          id: session.id,
        },
      },
    },
    select: {
      id: true,
    },
  });

  redirect(`/chat/${tweet.id}`);
}

export async function getTweets() {
  const tweets = await db.tweet.findMany({
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
    take: 20,
  });

  return tweets;
}
