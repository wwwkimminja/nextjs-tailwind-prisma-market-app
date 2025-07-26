import { getSession } from '@/lib/session';
import { findUserById } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await findUserById(session.id);
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();

  const logout = async () => {
    'use server';
    const session = await getSession();
    await session.destroy();
    redirect('/');
  };

  return (
    <div>
      <h1>Welcome! {user?.username}</h1>
      <form action={logout}>
        <button type="submit">Log out</button>
      </form>
    </div>
  );
}
