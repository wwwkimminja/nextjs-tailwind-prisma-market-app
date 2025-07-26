import db from '@/lib/db';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import {
  getGitHubAccessToken,
  getGitHubUserEmail,
  getGitHubUserProfile,
} from '@/lib/github';
import { findUserByGithubId, loginUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return notFound();
  }

  try {
    const accessToken = await getGitHubAccessToken(code);
    const { id, avatar_url, login } = await getGitHubUserProfile(accessToken);

    const email = await getGitHubUserEmail(accessToken);

    const user = await findUserByGithubId(id);
    const sameUserName = await db.user.findUnique({
      where: {
        username: login,
      },
      select: {
        id: true,
      },
    });

    if (user) {
      await loginUser(user.id);
      return NextResponse.redirect(new URL('/profile', request.url));
    }

    const newUser = await db.user.create({
      data: {
        github_id: id,
        avatar: avatar_url,
        username: sameUserName ? login + id : login,
        email,
        password: '',
      },
      select: {
        id: true,
      },
    });


    await loginUser(newUser.id);
    return NextResponse.redirect(new URL('/profile', request.url));
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 400 });
  }
}
