import { NextResponse } from 'next/server';

export function middleware() {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
