import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle .htm extensions in URLs
  if (pathname.endsWith('.htm')) {
    // Remove .htm from pathname
    const newPathname = pathname.replace(/\.htm$/, '');
    const url = request.nextUrl.clone();
    url.pathname = newPathname;

    // Keep any query parameters and hash
    return NextResponse.redirect(url);
  }

  // Handle book chapter URLs like /bibles/gb/43/1.htm
  if (pathname.match(/\/bibles\/gb\/\d+\/\d+\.htm$/)) {
    const newPathname = pathname.replace(/\.htm$/, '');
    const url = request.nextUrl.clone();
    url.pathname = newPathname;

    return NextResponse.redirect(url);
  }

  // Handle audio player URLs
  if (pathname.match(/\/bibles\/audio\/\d+_[\w-]+\/b\d+\.htm$/)) {
    const newPathname = pathname.replace(/\.htm$/, '');
    const url = request.nextUrl.clone();
    url.pathname = newPathname;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Only run the middleware on paths that might contain .htm extensions
export const config = {
  matcher: [
    '/bibles/:path*',
  ],
};
