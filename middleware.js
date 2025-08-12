import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const cookieStore = request.cookies;
  const email = cookieStore.get('email')?.value;
  console.log('OUTSIDE email: ', email);

  // Skip middleware for login page, API routes, and static assets
  if (
    pathname.startsWith('/account/login') ||
    pathname.startsWith('/account/create-event') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(.*)$/) // Skip for files with extensions (e.g., .js, .css, .png)
  ) {
    return NextResponse.next();
  }

  // If email cookie is not present, redirect to /account/login
  if (!email) {
    console.log('inside email: ', email);
    return NextResponse.redirect(new URL('/account/login', request.url));
  }

  // If email cookie exists, proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|api|account/login).*)'],
};