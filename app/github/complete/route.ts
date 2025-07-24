import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return notFound();
  }

  const acessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();

  const accessTokenURL = `https://github.com/login/oauth/access_token?${acessTokenParams}`;

  const response = await fetch(accessTokenURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  });

  const accessTokenData = await response.json();

  if ('error' in accessTokenData) {
    console.error(accessTokenData);
    return new Response(null, { status: 400 });
  }

  return Response.json({ accessTokenData });
}
