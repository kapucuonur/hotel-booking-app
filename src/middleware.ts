export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/booking/:path*', '/my-bookings/:path*', '/api/bookings/:path*', '/api/user/:path*'],
};
