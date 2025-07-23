import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface Session {
  id?: number;
}

export const getSession = async () => {
  const session = await getIronSession<Session>(await cookies(), {
    cookieName: 'carrot-market-reloaded',
    password: process.env.COOKIE_PASSWORD!,
  });

  return session;
};
