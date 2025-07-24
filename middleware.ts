import { getSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = [
  '/',
  '/login',
  '/sms',
  '/create-account',
  '/github/start',
  '/github/complete',
];

export async function middleware(request: NextRequest) {
  const session = await getSession();

  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  if (!session.id) {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (isPublicRoute) {
      return NextResponse.redirect(new URL('/products', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
