import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });

    // Check if user is accessing admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!token) {
            // Not logged in, redirect to signin
            return NextResponse.redirect(new URL('/auth/signin', request.url));
        }

        // Check if user has admin role
        if (token.role !== 'admin') {
            // Not an admin, redirect to home
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
