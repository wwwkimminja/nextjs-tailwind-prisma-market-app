import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

// ユーザーをIDで検索する共通関数
export async function findUserById(id: number) {
  return await db.user.findUnique({
    where: { id },
  });
}

// ユーザーをemailで検索する共通関数
export async function findUserByEmail(email: string) {
  return await db.user.findUnique({
    where: { email },
    select: { id: true, password: true },
  });
}

// ユーザーをGitHub IDで検索する共通関数
export async function findUserByGithubId(githubId: number) {
  return await db.user.findUnique({
    where: { github_id: githubId },
    select: { id: true },
  });
}

// セッションにユーザーをログインさせる共通関数
export async function loginUser(userId: number) {
  const session = await getSession();
  session.id = userId;
  await session.save();
  redirect('/profile');
}

// ユーザーが存在するかチェックする共通関数
export async function checkUserExists(email: string) {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return Boolean(user);
}
